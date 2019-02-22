package com.syh.officeboot.zjrcu.mapper;

import com.syh.officeboot.zjrcu.entity.MyUser;
import org.apache.ibatis.annotations.*;

@Mapper
public interface UserMapper {
    @Select("select * from user where name = #{name}")
    @Results({
            @Result(property = "id",column = "id"),
            @Result(property = "name",column = "name"),
            @Result(property = "postid",column = "postid"),
            @Result(property = "status",column = "status"),
            @Result(property = "detail",column = "detail"),
    })
    MyUser getUserByName(@Param("name") String name);

    @Update("update user set intime = now() where name = #{name}")
    void updateIntime(@Param("name") String name);
}
