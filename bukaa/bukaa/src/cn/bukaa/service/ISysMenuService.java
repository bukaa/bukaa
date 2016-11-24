package cn.bukaa.service;

import java.util.List;

import cn.bukaa.dao.entity.sys.SysMenu;

public interface ISysMenuService {
	
	public List<SysMenu> findAll();

}
