package com.syh.officeboot.zjrcu.entity;

import lombok.Data;

import java.io.Serializable;
import java.sql.Date;

@Data
public class Taskbasic implements Serializable {
    private String id;
    private String name;
    private int counts;
    private Date update_time;
}
