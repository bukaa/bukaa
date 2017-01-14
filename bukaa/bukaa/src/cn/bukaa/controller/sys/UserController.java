package cn.bukaa.controller.sys;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import cn.bukaa.controller.common.CommonController;
import cn.bukaa.dao.entity.sys.SysUser;
import cn.bukaa.service.ISysUserService;

import com.github.pagehelper.PageInfo;


/**
 * 
 * @author BUKAA
 *
 */
@Controller
@RequestMapping(value="/system/user")
public class UserController extends CommonController<SysUser>{

	@Autowired
	private ISysUserService uService;
	
	public Logger logger = LoggerFactory.getLogger(this.getClass());

	@ResponseBody
	@RequestMapping(value="/findByWhereStr", method=RequestMethod.GET)
	public PageInfo<SysUser> findAll(@RequestParam("start") int start, @RequestParam("size") int size){
		StringBuilder whereStr = new StringBuilder("1 = 1 ");
		whereStr.append("and p.is_disabled='0' and p.is_del='0'");
		return new PageInfo<SysUser>(uService.findByWhereStr(whereStr.toString(), "", "", start, size));
	}
	
	@ResponseBody
	@RequestMapping(value="/test2", method=RequestMethod.GET)
	public SysUser test2(){
		StringBuilder whereStr = new StringBuilder("1 = 1 ");
		whereStr.append("and p.is_disabled='0' and p.is_del='0'");
		return uService.findByWhereStr(whereStr.toString(), "", "", 1, 10).get(0);
	}

	/**
	 * 转向到列表页面
	 * @param request HttpServletRequest
	 * @return ModelAndView
	 */
	@RequestMapping(value="/list", method=RequestMethod.GET)
	public ModelAndView list(HttpServletRequest request){
		ModelAndView mv = new ModelAndView("/sys/user/userList");
		mv.addObject(uService.findByWhereStr("", "", "", 1, 10).get(0));
		return mv;
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
	@ResponseBody
	@RequestMapping(value="/findById", method = RequestMethod.GET)
	public SysUser findById(String id, HttpServletResponse response){
		return uService.findById(id);
	}
	
	@RequestMapping(value="/add", method=RequestMethod.POST)
	public ModelAndView add(@RequestBody SysUser u){
		ModelAndView mv = new ModelAndView(new MappingJackson2JsonView());
		//int i = service.save(u);
		return mv;
	}
	
	@ResponseBody
	@RequestMapping(value="/test", method=RequestMethod.GET)
	public void test(){
		SysUser user = new SysUser();
		try {
			uService.saveUser(user);
		} catch (Exception e) {
			logger.error("roooooooooooooooooooooo");
			e.printStackTrace();
		}
	}
	
}
