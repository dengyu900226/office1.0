package com.syh.officeboot.zjrcu.controller;

import com.alibaba.fastjson.JSON;
import com.syh.officeboot.zjrcu.entity.*;
import com.syh.officeboot.zjrcu.mapper.StatetrackMapper;
import com.syh.officeboot.zjrcu.mapper.TaskdetailedMapper;
import com.syh.officeboot.zjrcu.mapper.UserMapper;
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
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Slf4j
@Controller
@RequestMapping(value = "/data")
public class DataController {
    @Autowired
    DataService ds;
    @Autowired
    TaskdetailedMapper TMD;
    @Autowired
    StatetrackMapper SM;
    @Autowired
    UserMapper UM;

    /**
     * 创建XML文件
     *
     * @param request
     * @param response
     * @throws Exception
     */
    @RequestMapping(value = "/xml")
    @ResponseBody
    public void createXml(HttpServletRequest request, HttpServletResponse response) throws Exception {
        ds.createXml(request, response);
    }

    /**
     * 查询所有任务
     *
     * @return
     */
    @RequestMapping(value = "/alltaskb")
    @ResponseBody
    public String queryAllTaskbasic() {
        return ds.queryAllTaskbasic();
    }

    /**
     * 根据名称查询任务
     *
     * @param session
     * @return
     */
    @RequestMapping(value = "/alltaskd")
    @ResponseBody
    public String queryAllTaskdetailed(HttpSession session) {
        User loginer = (User) session.getAttribute("loginer");
        if (9999 == loginer.getPostid()) {
            return ds.queryAllTaskdetailed();
        } else {
            return ds.reqByname(loginer.getDetail());
        }
    }

    /**
     * 查询超期未登录
     *
     * @return
     */
    @RequestMapping(value = "/overdue")
    @ResponseBody
    public String queryOverdueUser() {
        long loginTime = 0, currentTime = 0, day = 0;
        List<MyUser> list = ds.querUserData();
        List<MyUser> overdueUserList = new ArrayList<>();
        Date date = new Date();
        for (MyUser user : list) {
            loginTime = user.getIntime().getTime();
            currentTime = date.getTime();
            day = workDays(loginTime, currentTime);
            if ("0".equals(user.getStatus()) && day >= 5) {
                overdueUserList.add(user);
            }
        }
        return JSON.toJSONString(overdueUserList);
    }

    /**
     * 计算两个日期间的工作日
     *
     * @param startDate
     * @param endDate
     * @return
     */
    public int workDays(long startDate, long endDate) {

        Calendar start = Calendar.getInstance();
        Calendar end = Calendar.getInstance();
        start.setTimeInMillis(startDate);
        end.setTimeInMillis(endDate);
        int count = 0;
        while (start.compareTo(end) <= 0) {
            if (start.get(Calendar.DAY_OF_WEEK) != 7 && start.get(Calendar.DAY_OF_WEEK) != 1)
                count++;
            start.add(Calendar.DAY_OF_MONTH, 1);
        }
        return count;

    }

    /**
     * 查询超期未登录
     *
     * @param session
     * @return
     */
    @RequestMapping(value = "/abnormalTask")
    @ResponseBody
    public String queryabnormalTask(HttpSession session) throws Exception {
        List<String> list = new ArrayList<>();
        list.add("需求分析");
        long initTime = 0, updateTime = 0, currentTime = 0, day = 0, kfDays = 0, kfStart = 0;
        List<Taskdetailed> allTask = TMD.alltaskdetailed();
        List<Taskdetailed> abnormalallTask = new ArrayList<Taskdetailed>();
        String state = "", xqid = "";
        Date date = new Date();
        for (Taskdetailed task : allTask) {
            state = task.getState();
            String kfday = task.getKfDays();
            if (kfday == null || kfday.isEmpty()) {
                continue;
            }
            xqid = task.getXqid();
            List<Timestamp> init = SM.queryInitTime(xqid, task.getQdname());
            if (init == null || init.isEmpty()) {
                initTime = 0;
            } else {
                initTime = init.get(0).getTime();//需求分析
            }
            List<Timestamp> kfstartList = SM.queryStartKfTime(xqid, task.getQdname());
            if (kfstartList == null || kfstartList.isEmpty()) {
                kfStart = initTime;//开始开发时间
            } else {
                kfStart = kfstartList.get(0).getTime();
            }
            kfDays = (Long.valueOf(kfday)) * 24 * 60 * 60 * 1000;
            String update_time = task.getUpdate_time();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            updateTime = sdf.parse(update_time).getTime();
//            updateTime = task.getUpdate_time();
            currentTime = date.getTime();
            if (!list.contains(state)) {//非需求分析
                day = workDays(updateTime, currentTime);
                if (day >= 5 && (kfStart + kfDays < currentTime) && !abnormalallTask.contains(task)) {
                    abnormalallTask.add(task);
                }
                if (kfStart + kfDays < currentTime && !abnormalallTask.contains(task)) {
                    abnormalallTask.add(task);
                }
            } else {//需求分析
                day = workDays(initTime, currentTime);
                if (day >= 5 && !abnormalallTask.contains(task)) {
                    abnormalallTask.add(task);
                }
            }
        }
        abnormalallTask.size();
        return JSON.toJSONString(abnormalallTask);
    }

    @RequestMapping(value = "/updateOneTask")
    @ResponseBody
    @Transactional
    public int updateOneTask(HttpServletRequest request) {
        String jstr = request.getParameter("rowone");
        Map map = (Map) JSON.parse(jstr);
        Statetrack statetrack = new Statetrack();
        statetrack.setQdname("" + map.get("qdname"));
        statetrack.setState("" + map.get("state"));
        statetrack.setXqid("" + map.get("xqid"));
        int a = ds.addOneState(statetrack);
        if (a != 1) {
            throw new RuntimeException("更新状态表异常");
        }
        return ds.updateOneTask("" + map.get("xqquestion"), "" + map.get("jkquestion"), "" + map.get("csquestion"), "" + map.get("xqid"), "" + map.get("state"), "" + map.get("qdname"));
    }

    @RequestMapping(value = "/addtask")
    @ResponseBody
    @Transactional
    public void addOneTask(HttpServletRequest request) {
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
        t.setKfDays(request.getParameter("kfDays"));
        int a = ds.addOneTask(t);
        if (a != 1) {
            throw new RuntimeException("插入任务详表异常");
        }
        Statetrack statetrack = new Statetrack();
        statetrack.setQdname(request.getParameter("qdname"));
        statetrack.setState(request.getParameter("state"));
        statetrack.setXqid(request.getParameter("xqid"));
        int b = ds.addOneState(statetrack);
        if (b != 1) {
            throw new RuntimeException("更新状态表异常");
        }
    }

    @RequestMapping(value = "/state")
    @ResponseBody
    public String queryStatetrack(HttpServletRequest request) {
        List<Map> list = new ArrayList<Map>();
        List<Statetrack> datas = ds.queryStatetrack(request.getParameter("xqid"));
        datas.forEach((S) -> {
            Map map = new HashMap();
            List l = new ArrayList();
            l.add(S.getUpdate_time());
            l.add(S.getState());
            map.put("value", l);
            list.add(map);
        });
        return JSON.toJSON(list).toString();
    }

    @RequestMapping(value = "/count")
    @ResponseBody
    public String onlinecount(HttpSession session, HttpServletResponse response) {
        try {
            Cookie c = new Cookie("JSESSIONID", URLEncoder.encode(session.getId(), "UTF-8"));
            c.setPath("/");
            c.setMaxAge(60 * 60 * 48);
            response.addCookie(c);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        return "在线人数:" + session.getServletContext().getAttribute("count");
    }

    /**
     * 查询超期未登录
     *
     * @return
     */
    @RequestMapping(value = "/queryKfUser")
    @ResponseBody
    public String queryKfUserName() {
        return ds.queryKfUserName();
    }

    @RequestMapping(value = "/queryScreenData")
    @ResponseBody
    public String queryScreenData(HttpServletRequest request) {
        String jstr = request.getParameter("condition");
        Map map = (Map) JSON.parse(jstr);
        String kfName = (String) map.get("kfName");
        String kfState = (String) map.get("kfState");
        if (isNullOrEmpty(kfName) && isNullOrEmpty(kfState)) {
            return ds.queryAllTaskdetailed();
        }
        if (!isNullOrEmpty(kfName) && isNullOrEmpty(kfState)) {
            return ds.reqByname(kfName);
        }
        if (isNullOrEmpty(kfName) && !isNullOrEmpty(kfState)) {
            return ds.reqByState(kfState);
        }
        if (!isNullOrEmpty(kfName) && !isNullOrEmpty(kfState)) {
            return ds.reqByNameState(kfState, kfName);
        }
        return "";
    }


    /**
     * 如果字符串为null或者空字符串那么返回真
     *
     * @param str 要判断的字符串
     * @return 是否符合
     */
    public boolean isNullOrEmpty(String str) {
        if (str == null)
            return true;

        if (str.isEmpty())
            return true;

        return false;
    }

    @RequestMapping(value = "/queryKfNums")
    @ResponseBody
    public String queryKfNums(HttpServletRequest request) {
        List<MyUser> list = UM.getUserNames();
        List<Map<String, Object>> reList = new ArrayList<Map<String, Object>>();
        String qdname = "", kfNums = "";
        Map<String, Object> map = null;
        for (MyUser user : list) {
            map = new HashMap<String, Object>();
            qdname = user.getDetail();
            kfNums = ds.queryHistogramNums(qdname, "开发中", "联调中");
            map.put("qdname", qdname);
            map.put("nums", kfNums);
            reList.add(map);
        }
        return JSON.toJSONString(reList);
    }

    @RequestMapping(value = "/queryTestNums")
    @ResponseBody
    public String queryTestNums(HttpServletRequest request) {
        List<MyUser> list = UM.getUserNames();
        List<Map<String, Object>> reList = new ArrayList<Map<String, Object>>();
        String qdname = "", testNums = "";
        Map<String, Object> map = null;
        for (MyUser user : list) {
            map = new HashMap<String, Object>();
            qdname = user.getDetail();
            testNums = ds.queryHistogramNums(qdname, "一轮测试中", "验证测试中");
            map.put("qdname", qdname);
            map.put("nums", testNums);
            reList.add(map);
        }
        return JSON.toJSONString(reList);
    }

    @RequestMapping(value = "/queryTotleNums")
    @ResponseBody
    public String queryTotleNums(HttpServletRequest request) {
        List<MyUser> list = UM.getUserNames();
        List<Map<String, Object>> reList = new ArrayList<Map<String, Object>>();
        String qdname = "", testNums = "", kfNums = "";
        ;
        Map<String, Object> map = null;
        for (MyUser user : list) {
            map = new HashMap<String, Object>();
            qdname = user.getDetail();
            kfNums = ds.queryHistogramNums(qdname, "开发中", "联调中");
            testNums = ds.queryHistogramNums(qdname, "一轮测试中", "验证测试中");
            map.put("qdname", qdname);
            map.put("nums", Integer.parseInt(testNums) + Integer.parseInt(kfNums));
            reList.add(map);
        }
        return JSON.toJSONString(reList);
    }
}
