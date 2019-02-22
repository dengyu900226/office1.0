package com.syh.officeboot.zjrcu.service;

import com.syh.officeboot.zjrcu.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Calendar;

@Service
@Slf4j
public class PubResourceService {
    public String fileUpload(HttpServletRequest request, HttpSession session) {
        String name = request.getParameter("name");
        String content = request.getParameter("content");
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        File projectPath = new File("");
        String rootpath = projectPath.getAbsolutePath().substring(0,projectPath.getAbsolutePath().lastIndexOf(File.separator));
        File tempParent = new File(rootpath + File.separator + "xmls"+ File.separator +  sdf.format(Calendar.getInstance().getTime())  + File.separator + ((User) session.getAttribute("loginer")).getLoginname() );
        if(!tempParent.exists()){
            tempParent.mkdirs();
        }
        File temp = new File(tempParent+ File.separator + name + ".temp");
        OutputStreamWriter osw = null;
        BufferedWriter bw = null;
        FileOutputStream fos = null;
        try {
            fos = new FileOutputStream(temp);
            osw = new OutputStreamWriter(fos, "UTF-8");
            bw = new BufferedWriter(osw);
            bw.write(content);
        } catch (FileNotFoundException e) {
            log.info(temp.getAbsolutePath() + "路径不存在");
        } catch (UnsupportedEncodingException e) {
            log.info(e.getMessage());
        } catch (IOException e) {
            log.info(e.getMessage());
        } finally {
            if(null != bw){
                try {
                    bw.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if(null != osw){
                try {
                    osw.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if(null != fos){
                try {
                    fos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return "成功";
    }
}
