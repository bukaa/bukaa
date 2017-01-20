package cn.bukaa.controller.common;

import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import cn.bukaa.service.sys.ISysUserService;


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

	
}
