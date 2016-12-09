package cn.bukaa.dao.Mapper.mysql.sys;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import cn.bukaa.dao.entity.sys.SysUser;

public interface UserMapper{
	
	public SysUser findById(String id);
	
	public int save(SysUser user);
	
	public int update(SysUser user);
	
	public int deleteById(String id);
	
	public int deleteByIds(String[] ids);
	
	public List<SysUser> findByWhereStr(@Param("whereStr") String whereStr, @Param("orderField") String orderField, @Param("order") String order, RowBounds rowBounds);

	public SysUser findUserByLoginId(String loginId);
	
}