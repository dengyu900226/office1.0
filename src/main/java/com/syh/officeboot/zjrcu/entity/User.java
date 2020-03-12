package com.syh.officeboot.zjrcu.entity;

import lombok.Data;

import java.io.Serializable;
import java.sql.Date;
import java.sql.Timestamp;

@Data
public class User implements Serializable {
    String loginname;
    String password;
    String check_code;
    String msg;
    String result;
    int postid;
    String detail;
    Timestamp intime;
}
