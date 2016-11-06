package cn.bukaa.dao.Mapper.sys;

import java.util.List;

import cn.bukaa.dao.entity.sys.SysUser;

public interface SysUserMapper{
	
	public SysUser findById(String id);
	
	public int save(SysUser user);
	
	public int update(SysUser user);
	
	public int deleteById(String id);
	
	public int deleteByIds(String[] ids);
	
	public int deletePhoto(String id);
	
	public List<SysUser> findAll();
	
	
	
}