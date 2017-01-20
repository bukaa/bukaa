package cn.bukaa.service.common.impl;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.bukaa.dao.Mapper.mysql.common.ReviewsMapper;
import cn.bukaa.dao.entity.common.Reviews;
import cn.bukaa.service.common.IReviewsService;

@Service
public class ReviewsService implements IReviewsService{
	
	@Autowired
	private ReviewsMapper dao;

	@Override
	public Reviews findById(String id) {
		return dao.findById(id);
	}

	@Override
	public Reviews findByBh(String bh) {
		return dao.findByBh(bh);
	}

	@Override
	public List<Reviews> findByWhereStr(String whereStr, String orderField, String order, int page, int size) {
		return dao.findByWhereStr(whereStr, orderField, order, new RowBounds(page, size));
	}

}
