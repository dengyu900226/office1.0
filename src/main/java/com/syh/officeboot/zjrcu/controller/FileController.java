package com.syh.officeboot.zjrcu.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.List;

@Slf4j
@Controller
public class FileController {
    @RequestMapping(value="/upload")
    @ResponseBody
    public String upload(HttpServletRequest request){
        List<MultipartFile> files = ((MultipartHttpServletRequest)request).getFiles("fileName");
        for (MultipartFile file : files) {
                if(file.isEmpty()){
                    return "上传失败:文件为空";
                }
                String filename = file.getOriginalFilename();
                File dest = new File(new File("").getAbsolutePath() + File.separator+"doc"+File.separator+filename);
                try {
                    file.transferTo(dest);
                    log.info(filename+"上传成功");
                } catch (IOException e) {
                    e.printStackTrace();
                }
        }
        return "上传成功";
    }
}
