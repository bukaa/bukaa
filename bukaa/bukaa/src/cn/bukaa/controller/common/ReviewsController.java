package cn.bukaa.controller.common;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.Cache.ValueWrapper;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.CacheManager;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.bukaa.dao.entity.common.Movie;
import cn.bukaa.dao.entity.common.Reviews;
import cn.bukaa.service.common.IReviewsService;
import cn.bukaa.util.StringUtil;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.PageInfo;


@Controller
@RequestMapping(value="/common/reviews/")
public class ReviewsController extends CommonController<Movie>{

	@Autowired
	private IReviewsService biz;
	
	@Autowired
	private CacheManager cacheManager;
	
	@Autowired
	private RedisTemplate<String, Reviews> redisTemplate;
	
	@ResponseBody
	@RequestMapping("find")
	public PageInfo<Reviews> find(String page, String size, String orderField, HttpServletResponse response){
		if(StringUtil.isEmpty(orderField)){
			orderField = "time";
		}
		Map<String, String> param = initPageAndSize(page, size, 5);
		StringBuilder whereStr = new StringBuilder("1 = 1 ");
		List<Reviews> reviewsList = biz.findByWhereStr(whereStr.toString(), orderField, "desc", Integer.valueOf(param.get("page")), Integer.valueOf(param.get("size")));
		String title = "";
		for (Reviews m : reviewsList) {
			title = m.getTitle();
			if(StringUtil.isNotEmpty(title) && title.length() > 6){
				m.setTitle(title.substring(0, 6)+"...");
			}
		}
		return new PageInfo<Reviews>(reviewsList);
	}
	
	@ResponseBody
	@RequestMapping("{bh}")
	public Reviews findByBh(@PathVariable String bh){
		Reviews reviews = biz.findByBh(bh);
		if(reviews != null){
			String title = reviews.getTitle();
			if(StringUtil.isNotEmpty(title) && title.length() > 6){
				reviews.setTitle(title.substring(0, 6)+"...");
			}
			redisTemplate.opsForValue().set(bh, reviews);
		}
		Reviews rev = cacheManager.getCache("reviews").get(bh, Reviews.class);
		logger.info("cache =====>>>>>>>>>>>>>>>>>>>>>===================>>"+rev);
		return reviews;
	}
	
	@ResponseBody
	@RequestMapping("findByMovie/{bh}")	
	public void findByMovieBh(@PathVariable String bh, String page, String size, String orderField, String order, HttpServletResponse response){
		//默认按照有用数倒序排列
		if(StringUtil.isEmpty(orderField)){
			orderField = "useful_count";
		}if(StringUtil.isEmpty(order)){
			order = "desc";
		}
		Map<String, String> param = initPageAndSize(page, size, 5);
		List<Reviews> reviewsList = biz.findByMovieBh("p.movie_bh='"+bh+"'", orderField, order, Integer.valueOf(param.get("page")), Integer.valueOf(param.get("size")));
		renderToJson(JSONObject.toJSONString(new PageInfo<Reviews>(reviewsList)), response);
	}
	
	@ResponseBody
	@RequestMapping("findById")
	public Reviews findById(String id){
		return biz.findById(id);
	}
}
