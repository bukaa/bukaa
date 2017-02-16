package cn.bukaa.service.common.impl;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.bukaa.dao.Mapper.mysql.common.MovieMapper;
import cn.bukaa.dao.entity.common.Movie;
import cn.bukaa.service.common.IMovieService;

@Service
public class MovieServiceImpl implements IMovieService{
	
	@Autowired
	private MovieMapper dao;

	@Override
	public Movie findById(String id) {
		return dao.findById(id);
	}

	@Override
	public Movie findByBh(String bh) {
		return dao.findByBh(bh);
	}

	@Override
	public List<Movie> findByWhereStr(String whereStr, String orderField, String order, int page, int size) {
		return dao.findByWhereStr(whereStr, orderField, order, new RowBounds(page, size));
	}

	@Override
	public List<Movie> findCommonInfo(String whereStr, String orderField, String orderBy, int size) {
		return dao.findCommonInfo(whereStr, orderField, orderBy, new RowBounds(0, size));
	}

}
