package cn.bukaa.service;

import java.util.List;

import cn.bukaa.dao.entity.sys.SysUser;

public interface ISysUserService {
	
	public List<SysUser> findByWhereStr(String whereStr, String orderField, String order, int start, int size);
	
	public SysUser findById(String id);
	
	public SysUser findUserByLoginId(String loginId);

	public int saveUser(SysUser u);

}
