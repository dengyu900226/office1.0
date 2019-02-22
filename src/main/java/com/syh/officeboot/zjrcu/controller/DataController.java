package com.syh.officeboot.zjrcu.controller;

import com.alibaba.fastjson.JSON;
import com.syh.officeboot.zjrcu.entity.Statetrack;
import com.syh.officeboot.zjrcu.entity.Taskdetailed;
import com.syh.officeboot.zjrcu.entity.User;
import com.syh.officeboot.zjrcu.service.DataService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Controller
@RequestMapping(value = "/data")
public class DataController {
    @Autowired
    DataService ds;

    /**
     * 创建XML文件
     * @param request
     * @param response
     * @throws Exception
     */
    @RequestMapping(value = "/xml")
    @ResponseBody
    public void createXml(HttpServletRequest request, HttpServletResponse response) throws Exception {
        ds.createXml(request,response);
    }

    /**
     * 查询所有任务
     * @return
     */
    @RequestMapping(value = "/alltaskb")
    @ResponseBody
    public String queryAllTaskbasic(){
        return ds.queryAllTaskbasic();
    }

    /**
     * 根据名称查询任务
     * @param session
     * @return
     */
    @RequestMapping(value = "/alltaskd")
    @ResponseBody
    public String queryAllTaskdetailed(HttpSession session){
        User loginer = (User) session.getAttribute("loginer");
        if(9999 == loginer.getPostid()){
            return ds.queryAllTaskdetailed();
        }else {
            return ds.reqByname(loginer.getDetail());
        }
    }
    @RequestMapping(value = "/updateOneTask")
    @ResponseBody
    @Transactional
    public int updateOneTask(HttpServletRequest request){
        String jstr = request.getParameter("rowone");
        Map map = (Map) JSON.parse(jstr);
        Statetrack statetrack = new Statetrack();
        statetrack.setQdname(""+map.get("qdname"));
        statetrack.setState(""+map.get("state"));
        statetrack.setXqid(""+map.get("xqid"));
        int a = ds.addOneState(statetrack);
        if(a != 1){
            throw new RuntimeException("更新状态表异常");
        }
        return ds.updateOneTask(""+map.get("xqquestion"),""+map.get("jkquestion"),""+map.get("csquestion"),""+map.get("xqid"),""+map.get("state"));
    }
    @RequestMapping(value = "/addtask")
    @ResponseBody
    @Transactional
    public void addOneTask(HttpServletRequest request){
        Taskdetailed t = new Taskdetailed();
        t.setXqid(request.getParameter("xqid"));
        t.setBgid(request.getParameter("bgid"));
        t.setTaskname(request.getParameter("taskname"));
        t.setBegintime(request.getParameter("begintime"));
        t.setEndtime(request.getParameter("endtime"));
        t.setYwname(request.getParameter("ywname"));
        t.setHdname(request.getParameter("hdname"));
        t.setQdname(request.getParameter("qdname"));
        t.setState(request.getParameter("state"));
        t.setXqquestion(request.getParameter("xqquestion"));
        t.setJkquestion(request.getParameter("jkquestion"));
        t.setCsquestion(request.getParameter("csquestion"));
        int a = ds.addOneTask(t);
        if(a != 1){
            throw new RuntimeException("插入任务详表异常");
        }
        Statetrack statetrack = new Statetrack();
        statetrack.setQdname(request.getParameter("qdname"));
        statetrack.setState(request.getParameter("state"));
        statetrack.setXqid(request.getParameter("xqid"));
        int b = ds.addOneState(statetrack);
        if(b != 1){
            throw new RuntimeException("更新状态表异常");
        }
    }
    @RequestMapping(value = "/state")
    @ResponseBody
    public String queryStatetrack(HttpServletRequest request){
        List<Map> list = new ArrayList<Map>();
        List<Statetrack> datas = ds.queryStatetrack(request.getParameter("xqid"));
        datas.forEach((S) -> {
            Map map = new HashMap();
            List l = new ArrayList();
            l.add(S.getUpdate_time());
            l.add(S.getState());
            map.put("value" ,l);
            list.add(map);
        });
    return  JSON.toJSON(list).toString();
    }
    @RequestMapping(value = "/count")
    @ResponseBody
    public String onlinecount(HttpSession session,HttpServletResponse response){
        try {
            Cookie c = new Cookie("JSESSIONID", URLEncoder.encode(session.getId(), "UTF-8"));
            c.setPath("/");
            c.setMaxAge(60*60*48);
            response.addCookie(c);
        }catch (Exception e){
            log.error(e.getMessage());
        }
        return "在线人数:"+session.getServletContext().getAttribute("count");
    }
}
