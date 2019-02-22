package com.syh.officeboot.zjrcu.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Random;

@Slf4j
@Controller
public class Checker {
    @RequestMapping(value = "/images/PictureCheckCode.jpeg", method = RequestMethod.GET, produces = "image/jpeg")
    @ResponseBody
    public void createCheckCode(HttpServletResponse response, HttpSession session) throws IOException {
        //定义图片的宽和高
        int w=60;
        int h=30;
        //声明一个RGB格式的内存中的图片
        BufferedImage img = new BufferedImage(w, h, BufferedImage.TYPE_INT_RGB);
        Graphics g = img.getGraphics();
        //把背景变白色
        g.setColor(Color.white);
        g.fillRect(0, 0, w, h);
        //设置字体
        g.setFont(new Font("aa",Font.BOLD,18));
        Random r = new Random();
        //画几条干扰线
        Color c = new Color(r.nextInt(256),r.nextInt(256),r.nextInt(256));
        g.setColor(c);
        for(int i=0;i<100;i++){
            //产生随机颜色
            g.drawLine(0, 0, r.nextInt(60), r.nextInt(30));
        }
        //产生并draw出4个随机数字
        StringBuffer SCheckCode = new StringBuffer();
        for(int i=0;i<4;i++){
            int a = r.nextInt(10);//生成0~9之间的随机整数
            int y = 15+r.nextInt(20);//产生随机的垂直位置
            //产生随机颜色
            c = new Color(0,0,0);
            g.setColor(c);
            g.drawString(""+a, i*15, y);
            SCheckCode.append(a);
        }
        g.dispose();//类似于IO中的flush(),把图形数据刷到img中
        session.setAttribute("SCheckCode",SCheckCode);
        //把内存图片img对象保存到一个jpg文件
        ImageIO.write(img, "JPEG", response.getOutputStream());
    }
}
