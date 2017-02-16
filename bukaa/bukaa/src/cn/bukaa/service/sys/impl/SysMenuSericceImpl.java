package cn.bukaa.service.sys.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.bukaa.dao.Mapper.mysql.sys.MenuMapper;
import cn.bukaa.dao.entity.sys.SysMenu;
import cn.bukaa.service.sys.ISysMenuService;

@Service
public class SysMenuSericceImpl implements ISysMenuService {
	
	@Autowired
	private MenuMapper dao;

	@Override
	public List<SysMenu> findAll() {
		return dao.findAll();
	}

}
