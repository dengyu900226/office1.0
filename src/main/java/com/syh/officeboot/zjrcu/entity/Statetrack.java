package com.syh.officeboot.zjrcu.entity;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class Statetrack {
    private String xqid;
    private String qdname;
    private String state;
    private String update_time;
    private Timestamp totaltime;
}
