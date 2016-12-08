package cn.bukaa.service.impl;

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
	public int save(SysUser u) {
		
		/*TransactionDefinition txDefinition = new TransactionDefinition();
        TransactionStatus txStatus = txManager.getTransaction(txDefinition);
		int result = 0;
		try {
            result = biz.save(u);
            if(result > 0){
                return result;
            }
            //result = addressDao.save(user.getId(), user.getAddress());
            transactionDefinition.commit(status);
        } catch (Exception e) {
            result = 0;
            transactionDefinition.rollback(status);
        }
        return result;*/
		return 0;
	}


}
