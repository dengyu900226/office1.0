package com.syh.officeboot.zjrcu.mapper;

import com.syh.officeboot.zjrcu.entity.Taskbasic;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface TaskbasicMapper {
    @Select("select * from taskbasic ")
    @Results({
            @Result(property = "id",column = "id"),
            @Result(property = "name",column = "name"),
            @Result(property = "counts",column = "counts"),
            @Result(property = "update_time",column = "update_time"),
    })
    List<Taskbasic>  queryAllTaskbasic();

}
