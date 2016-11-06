package cn.bukaa.controller.sys;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import cn.bukaa.dao.entity.sys.SysUser;
import cn.bukaa.service.ISysUserService;
import cn.bukaa.util.MD5;
import cn.bukaa.util.SessionUtil;
import cn.bukaa.util.StringUtil;


@Controller
public class LoginController {
	
	@Autowired
	private ISysUserService userBiz;
	
	@RequestMapping(value="/login")
	public ModelAndView login(){
		ModelAndView mv = new ModelAndView();
		if(SessionUtil.getSessionUser() != null){
			mv.setViewName("index");
		}else{
			mv.setViewName("login");
		}
		return mv;
	}
	
	@RequestMapping(value="/loginCheck", method = RequestMethod.POST)
	public ModelAndView loginCheck(HttpServletRequest request, HttpServletResponse response){
		ModelAndView mv = new ModelAndView("login");
		String loginId = request.getParameter("loginId");
		String loginPass = request.getParameter("loginPass");
		if(StringUtil.isNotEmpty(loginId) && StringUtil.isNotEmpty(loginPass)){
			SysUser u = userBiz.findUserByLoginId(loginId);
			if(u == null){
				mv.setViewName("login");
				mv.addObject("errorMessage", "用户名不存在！");
				return mv;
			}
			if(MD5.hex_md5(loginPass).equals(u.getLoginPass())){
				request.getSession().setAttribute("loginUser", u);
				String fromUrl = request.getParameter("fromUrl");
				if(StringUtil.isNotEmpty(fromUrl)){
					mv.setViewName(fromUrl);
				}else{
					try {
						response.sendRedirect("index.h");
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
		}
		return mv;
	}
	
	
	@RequestMapping(value="/index")
	public ModelAndView index(){
		ModelAndView mv = new ModelAndView();
		mv.setViewName("index");
		mv.addObject("user", SessionUtil.getSessionUser());
		return mv;
	}
	
	@RequestMapping(value="/loginOut", method = RequestMethod.GET)
	public ModelAndView loginOut(HttpServletRequest request, HttpServletResponse response){
		request.getSession().invalidate();
		return new ModelAndView("login");
		
	}
	
}
