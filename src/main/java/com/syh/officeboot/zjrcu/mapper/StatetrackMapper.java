package com.syh.officeboot.zjrcu.mapper;

import com.syh.officeboot.zjrcu.entity.Statetrack;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface StatetrackMapper {
    @Insert("insert into statetrack values(#{xqid},#{qdname},#{state},now(),'')")
    int addOneState(Statetrack statetrack);
    @Select("select state,date_format(update_time,'%Y/%m/%d %H:%i:%s') as update_time from statetrack where xqid=#{xqid} order by update_time asc")
    @Results(
            {
                    @Result(property = "xqid",column = "xqid"),
                    @Result(property = "qdname",column = "qdname"),
                    @Result(property = "state",column = "state"),
                    @Result(property = "update_time",column = "update_time"),
                    @Result(property = "totaltime",column = "totaltime"),
            }
    )
    List<Statetrack> queryStatetrack(@Param("xqid") String xqid);
}
