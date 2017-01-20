package cn.bukaa.service.common;

import java.util.List;

import cn.bukaa.dao.entity.common.Movie;

public interface IMovieService {
	
	Movie findById(String id);
	
	Movie findByBh(String bh);
	
	List<Movie> findByWhereStr(String whereStr, String orderField, String order, int start, int size);

	List<Movie> findCommonInfo(String keyword, String orderField, String orderBy, int size);

}
