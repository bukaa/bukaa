package cn.bukaa.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.bukaa.dao.Mapper.sys.SysUserMapper;
import cn.bukaa.dao.entity.sys.SysUser;
import cn.bukaa.service.ISysUserService;

@Service
public class SysUserService implements ISysUserService {
	
	@Autowired
	private SysUserMapper biz;

	public SysUser findById(String id) {
		return biz.findById(id);
	}


}
