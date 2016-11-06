package cn.bukaa.controller.sys;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import cn.bukaa.controller.common.CommonController;
import cn.bukaa.dao.entity.sys.SysUser;
import cn.bukaa.service.ISysUserService;


/**
 * 用户管理控制器
 * @author GZR
 *
 */

@Controller
@RequestMapping(value="/system/user")
public class UserController extends CommonController<SysUser>{

	@Resource
	private ISysUserService service;
	
	public ISysUserService getService() {
		return service;
	}

	/**
	 * 转向到列表页面
	 * @param request HttpServletRequest
	 * @return ModelAndView
	 */
	@RequestMapping(value="/list", method=RequestMethod.GET)
	public ModelAndView list(HttpServletRequest request){
		ModelAndView mav = new ModelAndView("/sys/user/userList");
		return mav;
	}
	
	/**
	 * 打开添加页面
	 * @return ModelAndView
	 */
	@RequestMapping(value="/add", method = RequestMethod.GET)
	public ModelAndView add(HttpServletRequest request){
		ModelAndView mav = new ModelAndView("sys/user/userForm");
		
		SysUser user = new SysUser();
		user.setIsDisabled(false);
		
		mav.addObject("user", user);
		
		return mav;
	}
	
	/**
	 * 打开添加页面
	 * @return ModelAndView
	 */
	@RequestMapping(value="/findById", method = RequestMethod.GET)
	public SysUser findById(String id){
		return service.findById(id);
	}
	
}
