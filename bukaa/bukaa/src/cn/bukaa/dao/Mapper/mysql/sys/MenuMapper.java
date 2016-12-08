package cn.bukaa.dao.Mapper.mysql.sys;

import java.util.List;

import cn.bukaa.dao.entity.sys.SysMenu;


public interface MenuMapper {
	
	public SysMenu findById(String id);
	
	public int save(SysMenu menu);
	
	public int update(SysMenu menu);
	
	public int deleteById(String id);
	
	public int deleteByIds(String[] ids);
	
	public List<SysMenu> findAll();

}
