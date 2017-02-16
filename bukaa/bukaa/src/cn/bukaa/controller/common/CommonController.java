package cn.bukaa.controller.common;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import cn.bukaa.service.sys.ISysUserService;
import cn.bukaa.util.StringUtil;


@Controller
@RequestMapping(value="/common/")
public class CommonController<T>{

	Logger logger = Logger.getLogger(this.getClass());
	
	public ISysUserService getService() {
		return null;
	}
	
	public void renderToView(String type, String text, HttpServletResponse response){
		try {
			response.setContentType(type + ";charset=UTF-8");
			response.getWriter().write(text);
		} catch (Exception e) {
			logger.error("向response中写入数据失败，失败原因："+e.getMessage());
		}
	}
	
	public void renderToText(String text, HttpServletResponse response){
		renderToView("text/plain", text, response);
	}
	
	public void renderToJson(String text, HttpServletResponse response){
		renderToView("application/json", text, response);
	}
	
	/**
	 * 初始化page和size参数
	 * @param page 传入的page
	 * @param size 传入的size
	 * @param maxSize 每页最大的记录数
	 */
	public Map<String, String> initPageAndSize(String page, String size, int maxSize){
		Map<String, String> param = new HashMap<String, String>();
		if(StringUtil.isEmpty(page)){
			param.put("size", ""+maxSize);
		}else{
			try {
				if(Integer.valueOf(size)>maxSize){
					param.put("size", ""+maxSize);
				}
			} catch (Exception e) {
				param.put("size", ""+maxSize);
			}
		}
		if(StringUtil.isEmpty(page)){
			param.put("page", "1");
		}else{
			try {
				Integer.valueOf(page);
			} catch (Exception e) {
				param.put("page", "1");
			}
		}
		return param;
	}

	
}
