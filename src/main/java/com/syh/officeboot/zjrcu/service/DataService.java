package com.syh.officeboot.zjrcu.service;

import com.alibaba.fastjson.JSON;
import com.syh.officeboot.zjrcu.entity.Statetrack;
import com.syh.officeboot.zjrcu.entity.Taskdetailed;
import com.syh.officeboot.zjrcu.entity.MyUser;
import com.syh.officeboot.zjrcu.mapper.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;

@Slf4j
@Service
public class DataService {

    @Autowired
    TaskdetailedMapper TMD;
    @Autowired
    StatetrackMapper STM;
    @Autowired
    TaskbasicMapper TM;
    @Autowired
    UserMapper UM;

    public void createXml(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String type = request.getParameter("type");
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        File projectPath = new File("");
        String rootpath = projectPath.getAbsolutePath().substring(0, projectPath.getAbsolutePath().lastIndexOf(File.separator));
        File tempParent = new File(rootpath + File.separator + "xmls" + File.separator + sdf.format(Calendar.getInstance().getTime()));
        if (!tempParent.exists()) {
            return;
        }
        MyFilter mf = new MyFilter();
        File[] temps = null;
        File[] userF = tempParent.listFiles();
        File collectF = new File(tempParent + File.separator + type + ".xml");
        FileWriter fw = new FileWriter(collectF, true);
        InputStreamReader fr = null;
        FileInputStream fis = null;
        BufferedReader br = null;
        String tempstr = null;
        for (File f : userF) {
            if (f.isDirectory()) {
                temps = f.listFiles(mf);
                for (File f1 : temps) {
                    fis = new FileInputStream(f1);
                    fr = new InputStreamReader(fis, "UTF-8");
                    br = new BufferedReader(fr);
                    while ((tempstr = br.readLine()) != null) {
                        fw.append(tempstr);
                        fw.append("\n");
                    }
                    br.close();
                    fr.close();
                    fis.close();
                }
            }
        }
        if (fw != null) {
            fw.close();
        }
        fr = new FileReader(collectF);
        br = new BufferedReader(fr);
        OutputStreamWriter osw = new OutputStreamWriter(response.getOutputStream(), "UTF-8");
        String a = null;
        while ((a = br.readLine()) != null) {
            osw.write(a);
            osw.write("\n");
        }
        osw.flush();
        osw.close();
        br.close();
        fr.close();
    }

    public String queryAllTaskbasic() {
        return JSON.toJSONString(TM.queryAllTaskbasic());
    }

    public String queryKfUserName() {
        return JSON.toJSONString(UM.getUserNames());
    }

    public String queryKNums(String qdName) {
        return TMD.queryDevelopNum(qdName);
    }

    public String queryAllTaskdetailed() {
        return JSON.toJSONString(TMD.alltaskdetailed());
    }

    public List<MyUser> querUserData() {
        return UM.getUserData();
    }

    public String reqByname(String qdname) {
        return JSON.toJSONString(TMD.reqByname(qdname));
    }

    public String reqByState(String state) {
        return JSON.toJSONString(TMD.reqByState(state));
    }

    public String reqByNameState(String state, String qdname) {
        return JSON.toJSONString(TMD.reqByNameState(state, qdname));
    }

    public int updateOneTask(String xqquestion, String jkquestion, String csquestion, String xqid, String state, String qdname) {
        return TMD.updateOneTask(xqquestion, jkquestion, csquestion, xqid, state, qdname);
    }

    public int addOneTask(Taskdetailed taskdetailed) {
        return TMD.addOneTask(taskdetailed);
    }

    public List<Statetrack> queryStatetrack(String xqid) {
        return STM.queryStatetrack(xqid);
    }

    public int addOneState(Statetrack statetrack) {
        return STM.addOneState(statetrack);
    }
}

class MyFilter implements FileFilter {
    @Override
    public boolean accept(File pathname) {
        return pathname.getName().endsWith(".temp");
    }
}
