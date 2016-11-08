package cn.bukaa.controller.common;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import cn.bukaa.service.ISysUserService;


@Controller
@RequestMapping(value="/system/user")
public class CommonController<T>{

	public ISysUserService getService() {
		return null;
	}

	
}
