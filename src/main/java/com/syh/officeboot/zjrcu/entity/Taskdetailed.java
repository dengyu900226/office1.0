package com.syh.officeboot.zjrcu.entity;

import lombok.Data;

import java.sql.Timestamp;
import java.util.Date;


@Data
public class Taskdetailed {
    private String xqid;
    private String bgid;
    private String taskname;
    private String begintime;
    private String endtime;
    private String ywname;
    private String hdname;
    private String qdname;
    private String state;
    private String xqquestion;
    private String jkquestion;
    private String csquestion;
    private String update_time;
    private String kfDays;
    private String kfNums;
}
