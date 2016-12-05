package cn.bukaa.service.impl;


import javax.annotation.Resource;
import javax.transaction.TransactionManager;

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

	public SysUser findUserByLoginId(String loginId) {
		return biz.findUserByLoginId(loginId);
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
