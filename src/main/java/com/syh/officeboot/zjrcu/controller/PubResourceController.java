package com.syh.officeboot.zjrcu.controller;

import com.syh.officeboot.zjrcu.service.PubResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/zjrc")
public class PubResourceController {
    @Autowired
    PubResourceService ps;
    @RequestMapping(value = "/fileUpload", method = RequestMethod.POST)
    @ResponseBody
    public String fileUpload(HttpServletRequest request, HttpSession session) {
        return ps.fileUpload(request,session);
    }
}
