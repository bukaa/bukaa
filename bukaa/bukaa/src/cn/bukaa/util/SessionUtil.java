package cn.bukaa.util;

import javax.servlet.http.HttpSession;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import cn.bukaa.dao.entity.sys.SysUser;

public class SessionUtil {
	
	public static SysUser getSessionUser(){
		HttpSession session =  ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest().getSession();
		return (SysUser) session.getAttribute("loginUser");
	}

}
