package cn.bukaa.controller.common;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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
	
	@RequestMapping("find")
	public void find(int page, int size, String orderField, HttpServletResponse response){
		if(StringUtil.isEmpty(orderField)){
			orderField = "time";
		}
		StringBuilder whereStr = new StringBuilder("1 = 1 ");
		List<Reviews> reviewsList = biz.findByWhereStr(whereStr.toString(), orderField, "desc", page, size);
		String title = "";
		for (Reviews m : reviewsList) {
			title = m.getTitle();
			if(StringUtil.isNotEmpty(title) && title.length() > 6){
				m.setTitle(title.substring(0, 6)+"...");
			}
		}
		renderToJson(JSONObject.toJSONString(new PageInfo<Reviews>(reviewsList)), response);
	}
	
	@ResponseBody
	@RequestMapping("findByBh")
	public void findByBh(String bh, HttpServletResponse response){
		Reviews reviews = biz.findByBh(bh);
		Document doc = null;
		if(reviews != null && StringUtil.isNotEmpty(reviews.getHtml())){
			doc = Jsoup.parse(reviews.getHtml());
			renderToJson(JSONObject.toJSONString(doc), response);
		}
		renderToJson(JSONObject.toJSONString(biz.findByBh(bh)), response);
	}
	
	public void findByMovieBh(String movie_bh,int page, int size, HttpServletResponse response){
		if(StringUtil.isEmpty(movie_bh)){
			return;
		}
		List<Reviews> reviewsList = biz.findByWhereStr("p.movie_bh='"+movie_bh+"'", "time", "desc", page, size);
		renderToJson(JSONObject.toJSONString(new PageInfo<Reviews>(reviewsList)), response);
	}
	
	@ResponseBody
	@RequestMapping("findById")
	public Reviews findById(String id){
		return biz.findById(id);
	}
}
