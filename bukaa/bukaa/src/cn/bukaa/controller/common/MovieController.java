package cn.bukaa.controller.common;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.bukaa.dao.entity.common.Movie;
import cn.bukaa.service.common.IMovieService;
import cn.bukaa.util.StringUtil;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.PageInfo;


@Controller
@RequestMapping(value="/common/movie/")
public class MovieController extends CommonController<Movie>{

	@Autowired
	private IMovieService biz;
	
	@RequestMapping(value="find",method=RequestMethod.GET,produces=MediaType.APPLICATION_JSON_VALUE)
	public void find(int page, int size, String orderField,String keyword, HttpServletResponse response){
		if(StringUtil.isEmpty(orderField)){
			orderField = "time";
		}
		StringBuilder whereStr = new StringBuilder("1 = 1");
		if(StringUtil.isNotEmpty(keyword)){
			whereStr.append(" and p.title like '" + keyword + "'");
		}
		whereStr.append(" and p.is_del='0'");
		List<Movie> movieList = biz.findByWhereStr(whereStr.toString(), orderField, "desc", page, size);
		String title = "";
		for (Movie m : movieList) {
			title = m.getTitle();
			if(StringUtil.isNotEmpty(title) && title.length() > 6){
				m.setTitle(title.substring(0, 6)+"...");
			}
		}
		renderToJson(JSONObject.toJSONString(new PageInfo<Movie>(movieList)), response);
	}
	
	@ResponseBody
	@RequestMapping(value="findCommonInfo",produces=MediaType.APPLICATION_JSON_VALUE)
	public List<Movie> findCommonInfo(String keyword, String orderField, int size, HttpServletResponse response){
		return biz.findCommonInfo(" p.title like '%" + keyword + "%'", StringUtil.isNotEmpty(orderField)?orderField:"time", "desc" , size<20 ? size : 20);
	}
	
	@ResponseBody
	@RequestMapping("findByBh")
	public Movie findByBh(String bh){
		return biz.findByBh(bh);
	}
	
	@ResponseBody
	@RequestMapping("findById")
	public Movie findById(String id){
		return biz.findById(id);
	}
	
	@RequestMapping("findByBh2")
	public void findByBh2(String bh, HttpServletResponse response){
		renderToJson(JSONObject.toJSONString(biz.findByBh(bh)), response);
	}
	
}
