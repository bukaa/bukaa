package cn.bukaa.dao.Mapper.mysql.common;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Repository;

import cn.bukaa.dao.entity.common.Movie;


@Repository(value="movieMapper")
public interface MovieMapper {

	List<Movie> findByWhereStr(@Param("whereStr") String whereStr, @Param("orderField") String orderField, @Param("order") String order, RowBounds rowBounds);

	Movie findByBh(@Param("bh") String bh);

	Movie findById(@Param("id") String id);
	
	List<Movie> findCommonInfo(@Param("whereStr") String whereStr, @Param("orderField") String orderField, @Param("order") String order, RowBounds rowBounds);

}
