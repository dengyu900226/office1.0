package com.syh.officeboot.zjrcu.mapper;

import com.syh.officeboot.zjrcu.entity.Taskdetailed;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface TaskdetailedMapper {
    @Select("select * from taskdetailed where state != '已上线'")
    @Results({
            @Result(property = "xqid", column = "xqid"),
            @Result(property = "bgid", column = "bgid"),
            @Result(property = "taskname", column = "taskname"),
            @Result(property = "begintime", column = "begintime"),
            @Result(property = "endtime", column = "endtime"),
            @Result(property = "ywname", column = "ywname"),
            @Result(property = "hdname", column = "hdname"),
            @Result(property = "qdname", column = "qdname"),
            @Result(property = "state", column = "state"),
            @Result(property = "xqquestion", column = "xqquestion"),
            @Result(property = "jkquestion", column = "jkquestion"),
            @Result(property = "csquestion", column = "csquestion"),
            @Result(property = "update_time", column = "update_time"),
    })
    List<Taskdetailed> alltaskdetailed();

    @Select("select * from taskdetailed where qdname = #{qdname} and state != '已上线'")
    @Results({
            @Result(property = "xqid", column = "xqid"),
            @Result(property = "bgid", column = "bgid"),
            @Result(property = "taskname", column = "taskname"),
            @Result(property = "begintime", column = "begintime"),
            @Result(property = "endtime", column = "endtime"),
            @Result(property = "ywname", column = "ywname"),
            @Result(property = "hdname", column = "hdname"),
            @Result(property = "qdname", column = "qdname"),
            @Result(property = "state", column = "state"),
            @Result(property = "xqquestion", column = "xqquestion"),
            @Result(property = "jkquestion", column = "jkquestion"),
            @Result(property = "csquestion", column = "csquestion"),
            @Result(property = "update_time", column = "update_time"),
    })
    List<Taskdetailed> reqByname(@Param("qdname") String qdname);

    @Update("update  taskdetailed set xqquestion= #{xqquestion} , jkquestion= #{jkquestion} ," +
            "csquestion= #{csquestion} ,state= #{state} where xqid=#{xqid}")
    int updateOneTask(@Param("xqquestion") String xqquestion, @Param("jkquestion") String jkquestion, @Param("csquestion") String csquestion, @Param("xqid") String xqid,@Param("state") String state);

    @Insert("insert into taskdetailed values(#{xqid},#{bgid},#{taskname},#{begintime},#{endtime},#{ywname},#{hdname},#{qdname},#{state},#{xqquestion},#{jkquestion},#{csquestion},now())")
    int addOneTask(Taskdetailed taskdetailed);
}
