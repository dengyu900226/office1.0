package com.syh.officeboot.zjrcu.filter;

import com.syh.officeboot.zjrcu.entity.User;
import lombok.extern.slf4j.Slf4j;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Slf4j
@WebFilter(urlPatterns = "/zjrc/*")
public class LoginFilter implements Filter {
    private  static final Set<String> ALLOWED_PATHS = Collections.unmodifiableSet(new HashSet<>(Arrays.asList("/login.html","/zjrc/login")));

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        //可以防止Xss攻击
        HttpServletRequest req = (HttpServletRequest) servletRequest;
        HttpServletResponse resp = (HttpServletResponse) servletResponse;
//        log.info(req.getRequestURI()+"---"+req.getContextPath());
        String path = req.getRequestURI().substring(req.getContextPath().length()).replaceAll("[/]+$", "");
        boolean allow = ALLOWED_PATHS.contains(path);
        if(allow){
            filterChain.doFilter(req,resp);
        }else{
            User loginer = (User)req.getSession().getAttribute("loginer");
            if(null == loginer){
//                req.getRequestDispatcher("/login.html").forward(req,resp);
              resp.sendRedirect("/login.html");
                return;
            }
            if ("success".equals(loginer.getResult())){
                filterChain.doFilter(req,resp);
            }else{
                req.getRequestDispatcher("/login.html").forward(req,resp);
            }

        }
    }
    @Override
    public void destroy() {

    }
}
