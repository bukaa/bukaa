package cn.bukaa.controller.sys;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import cn.bukaa.dao.entity.sys.SysMenu;
import cn.bukaa.service.ISysMenuService;
import cn.bukaa.util.redis.RedisUtil;

@Controller
@RequestMapping(value="/sys")
public class SystemController {
	
	@Autowired
	private ISysMenuService menuService;
	
	@RequestMapping(value="/initCache", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> initCache(){
		Map<String, Object> result = new HashMap<String, Object>();
		Jedis jedis = RedisUtil.getJedis();
		
		List<SysMenu> menuList = menuService.findAll();
		if(jedis.exists("menu")){
			jedis.del("menu");
		}
		for (SysMenu m : menuList) {
			jedis.lpush("menu."+m.getId()+".name", m.getName()+"");
			jedis.lpush("menu."+m.getId()+".parentId", m.getParentId()+"");
		}
		result.put("message", "成功加入菜单");
		return result;
	}

}
