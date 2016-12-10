package cn.bukaa.service.impl;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.bukaa.dao.Mapper.mysql.sys.UserMapper;
import cn.bukaa.dao.Mapper.orcl.sys.SysUserMapper;
import cn.bukaa.dao.entity.sys.SysUser;
import cn.bukaa.service.ISysUserService;

@Service
public class SysUserService implements ISysUserService {
	
	@Autowired
	private UserMapper dao;
	
	@Autowired
	private SysUserMapper dao_orcl;
	
	@Override
	public List<SysUser> findByWhereStr(String whereStr, String orderField, String order, int start, int size){
		List<SysUser> user_orcl = dao_orcl.findByWhereStr(whereStr, orderField, order, new RowBounds(start, size));
		List<SysUser> user_mysql = dao.findByWhereStr(whereStr, orderField, order, new RowBounds(start, size));
		if(user_orcl.size()>user_mysql.size()){
			for (SysUser u : user_mysql) {
				user_orcl.add(u);
			}
			return user_orcl;
		}else{
			for (SysUser u : user_orcl) {
				user_mysql.add(u);
			}
			return user_mysql;
		}
	}
	

	public SysUser findById(String id) {
		return dao.findById(id);
	}

	public SysUser findUserByLoginId(String loginId) {
		return dao.findUserByLoginId(loginId);
	}

	@Override
	public int saveUser(SysUser u) {
		for (int i = 0; i < 9; i++) {
			SysUser user = new SysUser();
			user.setId("3984265ff40c4aadb5999d1d35b9623"+i);
			user.setLoginId("admin");
			user.setLoginPass("202cb962ac59075b964b07152d234b70");
			user.setNo(i+"");
			user.setAddTime(new Date());
			user.setAdmin(true);
			user.setEmail("940446879@qq.com");
			user.setSex("1");
			
			if(i % 2 == 0){
				dao.save(user);
			}else{
				dao_orcl.save(user);
			}
		}
		return 0;
	}

}
