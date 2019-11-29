package com.syh.officeboot.zjrcu.entity;

import lombok.Data;
import java.sql.Timestamp;
import java.io.Serializable;
@Data
public class MyUser implements Serializable {
    private int id;
    private String name;
    private String pwd;
    private String status;
    private int postid;
    private String detail;
    private Timestamp intime;
}
