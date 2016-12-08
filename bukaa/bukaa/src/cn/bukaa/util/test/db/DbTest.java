package cn.bukaa.util.test.db;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import cn.bukaa.dao.Mapper.orcl.sys.SysUserMapper;
import cn.bukaa.dao.entity.sys.SysUser;
import cn.bukaa.service.ISysUserService;
import cn.bukaa.util.test.BaseTest;

public class DbTest extends BaseTest{
	
	@Autowired
	private ISysUserService uService;
	
	@Autowired
	private SysUserMapper uDao;
	
	@Test
	public void test(){
		List<SysUser> list = uService.findByWhereStr("", "", "", 1, 10);
		toJsonString(list);
		toJsonString(uDao.findByWhereStr("", "", "", new RowBounds(1, 10)));
	}

}
