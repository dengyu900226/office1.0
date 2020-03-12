package com.syh.officeboot.zjrcu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@ServletComponentScan
@EnableTransactionManagement
public class ZjrcuApplication {
    public static void main(String[] args) {
        SpringApplication.run(ZjrcuApplication.class, args);
    }
}
