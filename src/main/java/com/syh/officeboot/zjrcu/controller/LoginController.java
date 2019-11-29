package com.syh.officeboot.zjrcu.controller;

import com.alibaba.fastjson.JSON;
import com.syh.officeboot.zjrcu.entity.MyUser;
import com.syh.officeboot.zjrcu.entity.User;
import com.syh.officeboot.zjrcu.mapper.UserMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Controller
@RequestMapping("/zjrc")
public class LoginController {
    @Autowired
    private UserMapper userMapper;
    @RequestMapping(value = "/login", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String loginAction(HttpServletRequest request, HttpSession session){
        String loginname = request.getParameter("loginname");
        String password = request.getParameter("password");
//        String checkcode = request.getParameter("check_code");
        User loginer = new User();
        MyUser user = userMapper.getUserByName(loginname);
        if(null == user){
            loginer.setMsg("用户名不存在,请联系管理员");
            loginer.setResult("error");
            return JSON.toJSON(loginer).toString();
        }
        int postid = user.getPostid();
        //验证码校验
//        if(!checkcode.equals(""+session.getAttribute("SCheckCode"))){
//            loginer.setMsg("验证码错误");
//            loginer.setResult("error");
//            return JSON.toJSON(loginer).toString();
//        }
        if(!loginname.equals(user.getName())){
            loginer.setMsg("用户名错误");
            loginer.setResult("error");
            return JSON.toJSON(loginer).toString();
        }
        loginer.setLoginname(loginname);
        if(!password.equals(user.getPwd())){
            loginer.setMsg("登陆密码错误");
            loginer.setResult("error");
            return JSON.toJSON(loginer).toString();
        }
        loginer.setResult("success");
//        loginer.setCheck_code(checkcode);
        loginer.setPostid(postid);
        loginer.setDetail(user.getDetail());
        userMapper.updateIntime(loginname);
        loginer.setIntime(user.getIntime());
        session.setAttribute("loginer", loginer);
        return JSON.toJSON(loginer).toString();
    }
    @RequestMapping("/main" )
    public String goToMain(HttpServletRequest request){
        log.info("跳转主页面");
        return "main";
    }

    @RequestMapping("/logout")
    @ResponseBody
    public String logout(HttpSession session){
        //注销session
        session.invalidate();
        Map<String,Object> result = new HashMap<String,Object>();
        result.put("result","success");
        return JSON.toJSON(result).toString();
    }
}
