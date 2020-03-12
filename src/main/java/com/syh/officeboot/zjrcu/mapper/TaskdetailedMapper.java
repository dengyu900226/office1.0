package com.syh.officeboot.zjrcu.mapper;

import com.syh.officeboot.zjrcu.entity.Taskdetailed;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface TaskdetailedMapper {
    @Select("select * from taskdetailed where state not in ( '已上线','关停') order by qdname")
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
            @Result(property = "kfDays", column = "kfDays"),
    })
    List<Taskdetailed> alltaskdetailed();

    @Select("select * from taskdetailed where qdname = #{qdname} and state not in ( '已上线','关停')")
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
            @Result(property = "kfDays", column = "kfDays"),
    })
    List<Taskdetailed> reqByname(@Param("qdname") String qdname);

    @Select("select * from taskdetailed where state = #{state} order by qdname")
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
            @Result(property = "kfDays", column = "kfDays"),
    })
    List<Taskdetailed> reqByState(@Param("state") String state);

    @Select("select * from taskdetailed where state = #{state} and  qdname = #{qdname}")
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
            @Result(property = "kfDays", column = "kfDays"),
    })
    List<Taskdetailed> reqByNameState(@Param("state") String state, @Param("qdname") String qdname);

    @Update("update  taskdetailed set xqquestion= #{xqquestion} , jkquestion= #{jkquestion} ," +
            "csquestion= #{csquestion} ,state= #{state} ,qdname = #{qdname} where xqid=#{xqid} and qdname = #{qdname}")
    int updateOneTask(@Param("xqquestion") String xqquestion, @Param("jkquestion") String jkquestion, @Param("csquestion") String csquestion, @Param("xqid") String xqid, @Param("state") String state, @Param("qdname") String qdname);

    @Insert("insert into taskdetailed values(#{xqid},#{bgid},#{taskname},#{begintime},#{endtime},#{ywname},#{hdname},#{qdname},#{state},#{xqquestion},#{jkquestion},#{csquestion},now(),#{kfDays})")
    int addOneTask(Taskdetailed taskdetailed);

    @Select("select count(*) as kfNums from taskdetailed where state in ('开发中','联调中') and qdname = #{qdname}")
    @Results({
            @Result(property = "kfNums", column = "kfNums"),
    })
    String queryDevelopNum(@Param("qdname") String qdname);

    @Select("select count(*) as kfNums from taskdetailed where state in (#{state1},#{state2}) and qdname = #{qdname}")
    @Results({
            @Result(property = "kfNums", column = "kfNums"),
    })
    String queryHistogramNums(@Param("qdname") String qdname,@Param("state1") String state1,@Param("state2") String state2);
}
