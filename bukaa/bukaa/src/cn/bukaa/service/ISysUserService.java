package cn.bukaa.service;

import cn.bukaa.dao.entity.sys.SysUser;

public interface ISysUserService {
	
	public SysUser findById(String id);
	
	public SysUser findUserByLoginId(String loginId);
	

}
