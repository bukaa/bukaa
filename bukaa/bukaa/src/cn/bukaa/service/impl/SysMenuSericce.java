package cn.bukaa.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.bukaa.dao.Mapper.sys.SysMenuMapper;
import cn.bukaa.dao.entity.sys.SysMenu;
import cn.bukaa.service.ISysMenuService;

@Service
public class SysMenuSericce implements ISysMenuService {
	
	@Autowired
	private SysMenuMapper dao;

	@Override
	public List<SysMenu> findAll() {
		return dao.findAll();
	}

}
