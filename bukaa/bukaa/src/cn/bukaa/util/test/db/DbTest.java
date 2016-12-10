package cn.bukaa.util.test.db;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.defaults.DefaultSqlSessionFactory;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import cn.bukaa.dao.Mapper.mysql.sys.UserMapper;
import cn.bukaa.dao.Mapper.orcl.sys.SysUserMapper;
import cn.bukaa.dao.entity.sys.SysUser;
import cn.bukaa.service.ISysUserService;
import cn.bukaa.util.test.BaseTest;

import com.alibaba.fastjson.JSON;
public class DbTest extends BaseTest{
	
	@Autowired
	private ISysUserService uService;
	
	@Autowired
	private SysUserMapper uDao;
	
	@Autowired
	private DefaultSqlSessionFactory sqlSessionFactory;
	
	@Autowired
	private DefaultSqlSessionFactory sqlSessionFactory_orcl;
	
	@Test
	public void test(){
		List<SysUser> list = uService.findByWhereStr("", "", "", 1, 10);
		toJsonString(list);
		toJsonString(uDao.findByWhereStr("", "", "", new RowBounds(1, 10)));
	}
	
	
	@Test
	public void transTest(){
		
		SqlSession sqlSession = sqlSessionFactory.openSession(false);
		SqlSession sqlSession_orcl = sqlSessionFactory_orcl.openSession(false);
		UserMapper uMapper = sqlSession.getMapper(UserMapper.class);
		SysUserMapper sysUserMapper = sqlSession_orcl.getMapper(SysUserMapper.class);
		try {
			SysUser user = new SysUser();
			user.setId("3984265ff40c4aadb5999d1d35b96270");
			user.setLoginId("admin");
			user.setLoginPass("202cb962ac59075b964b07152d234b70");
			
			uMapper.save(user);
			sysUserMapper.save(user);
			logger.info("插入成功，执行提交操作。。。");
			sqlSession.commit();
			sqlSession_orcl.commit();
		} catch (Exception e) {
			sqlSession.rollback(true);
			sqlSession_orcl.rollback(true);
			logger.error("插入错误，执行回滚操作。。。");
			e.printStackTrace();
		}
		try {
		} catch (Exception e) {
			e.printStackTrace();
		}
		toJsonString(sysUserMapper.findByWhereStr("", "", "", new RowBounds(1, 10)));
		toJsonString(uMapper.findByWhereStr("", "", "", new RowBounds(1, 10)));
	}
	
	@Test
	public void testAtomis(){
		JSON.parseObject("", new SysUser().getClass());
	}

}
