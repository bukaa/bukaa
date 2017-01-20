package cn.bukaa.dao.Mapper.mysql.common;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Repository;

import cn.bukaa.dao.entity.common.Reviews;


@Repository(value="reviewsMapper")
public interface ReviewsMapper {
	
	public List<Reviews> findByWhereStr(@Param("whereStr") String whereStr, @Param("orderField") String orderField, @Param("order") String order, RowBounds rowBounds);

	public Reviews findByBh(@Param("bh") String bh);

	public Reviews findById(@Param("id") String id);

}
