package com.syh.officeboot.zjrcu.mapper;

import com.syh.officeboot.zjrcu.entity.MyUser;
import com.syh.officeboot.zjrcu.entity.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserMapper {
    @Select("select * from user where name = #{name}")
    @Results({
            @Result(property = "id",column = "id"),
            @Result(property = "name",column = "name"),
            @Result(property = "postid",column = "postid"),
            @Result(property = "status",column = "status"),
            @Result(property = "detail",column = "detail"),
            @Result(property = "intime",column = "intime"),
    })
    MyUser getUserByName(@Param("name") String name);

    @Select("select * from user")
    @Results({
            @Result(property = "id",column = "id"),
            @Result(property = "name",column = "name"),
            @Result(property = "postid",column = "postid"),
            @Result(property = "status",column = "status"),
            @Result(property = "detail",column = "detail"),
            @Result(property = "intime",column = "intime"),
    })
    List<MyUser> getUserData();

    @Update("update user set intime = now() where name = #{name}")
    void updateIntime(@Param("name") String name);

    @Select("select * from user where status = '0'")
    @Results({
            @Result(property = "id",column = "id"),
            @Result(property = "name",column = "name"),
            @Result(property = "postid",column = "postid"),
            @Result(property = "status",column = "status"),
            @Result(property = "detail",column = "detail"),
            @Result(property = "intime",column = "intime"),
    })
    List<MyUser> getUserNames();
}
