package com.syh.officeboot.zjrcu.listener;

import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

@WebListener
public class OnLineCount  implements HttpSessionListener {
    public int count = 0;
    public synchronized void sessionCreated(HttpSessionEvent event){
        count++;
        event.getSession().getServletContext().setAttribute("count",count);
    }

    public synchronized void sessionDestroyed(HttpSessionEvent event) {
        count--;
        event.getSession().getServletContext().setAttribute("count",count);
    }
}
