package cn.bukaa.service.common;

import java.util.List;

import cn.bukaa.dao.entity.common.Reviews;

public interface IReviewsService {
	
	Reviews findById(String id);
	
	Reviews findByBh(String bh);
	
	List<Reviews> findByWhereStr(String whereStr, String orderField, String order, int start, int size);

}
