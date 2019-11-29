<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page import="com.syh.officeboot.zjrcu.entity.User" %>

<!DOCTYPE html>
<!-- saved from url=(0036)http://219.143.38.251/yusys/main.asp -->
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <!-- <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"> -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>资源管理系统</title>
    <link rel="stylesheet" type="text/css" href="../../css/jquery.mCustomScrollbar.css">
    <link rel="stylesheet" type="text/css" href="../../css/public.css">
    <link rel="SHORTCUT ICON" href="../images/office.ico">
    <style id="rekeyframes"></style>
</head>
<body>
<div class="research-header">
    <div class="research-losea">
        <div class="research-logo"><img src="../../images/logo.png" width="284" height="30"></div>
        <div class="research-search">
            <input type="text" id="gover_search_key" class="form-control" placeholder="搜索：功能名称">
            <i class="img-search"></i>
            <i class="close-search"></i>
        </div>
        <div class="research-search-background"></div>
        <div class="gov-search-suggest" id="gov_search_suggest">
            <ul class="research-search-list">
            </ul>
        </div>
    </div>
    <div class="research-user-tag" id="research-user-tag" style="width: 1285px;">
        <div class="research-user">
            <ul class="user-list">
                <li id="userPortraitLiSmall"><img name="userPortraitImg" id="userPortraitImgSmall"
                                                  src="../../images/user.png" width="43" height="43"></li>
            </ul>
            <div class="research-user-app-setting-help-all" id="research-user-app-setting-help-all">
                <div class="research-user-app-setting-help" style="height: 640px;"><!-- 个人信息 -->
                    <div class="user-img-info">
                        <div class="user-img" id="userPortraitLiBig"><img name="userPortraitImg" id="userPortraitImgBig"
                                                                          src="../../images/defalut.png" width="120"
                                                                          height="120"></div>
                        <div class="user-info">
                            <ul>
                                <li>
                                    <h2>${loginer.loginname}</h2>
                                    <span></span>
                                </li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                    </div>
                    <button class="btn" id="research-user-logout">注 销</button>
                </div>
            </div>
        </div>
        <div class="research-tag-all" style="width: 1285px;">
            <ul class="research-tag-home">
                <li class="current">首页</li>
            </ul>
            <ul class="research-tag" id="research-tag" style="width: 0px;"></ul>
            <div class="research-tag-last" id="research-tag-last" style="left: 49px;">
                <div class="tag-last-down"></div>
                <div class="tag-last-list-all" id="tag-last-list-all">
                    <ul class="tag-last-close">
                        <li class="tag-last-close-all"><span>关闭全部</span><i></i></li>
                        <li class="list_line"></li>
                        <li class="tag-last-close-home"><span>首页</span><i></i></li>
                        <li class="list_line"></li>
                    </ul>
                    <ul class="tag-last-list"></ul>
                </div>
            </div>
        </div>
        <div class="research-tag-all-background" style="width: 1285px;"></div>
    </div>
</div>

<div class="research-wrapper" style="height: 613px;">
    <div class="research-menu" id="research-menu" style="height: 613px; width: 250px;">
        <div class="research-animation" id="research-animation"></div>
        <!-- 应用名称 -->
        <div class="research-menu-title">
            <span>功能</span>
            <i></i>
        </div>
        <!-- 左边菜单 -->
        <div class="research-content" id="research-content" style="height: 539px; display: block;">
            <!-- 应用菜单 -->
            <div class="research-single rescrollbar open" id="menu_tree">
                <div class="research-first" id="peranalysis" style="padding-left: 0px; width: auto;">
                    <i></i><span>公共资源</span>
                </div>

                <div class="research-second" style="display: none; width: auto;">
                    <ul>
                        <%--<c:set var="user" scope="session" value="${loginname.loginname}" />--%>
                        <c:choose>
                            <c:when test="${loginer.postid == 9999}">
                                <li id="collectData" onclick="getResource(&#39;dataxml&#39;)">
                                    <span>收集数据</span>
                                        <%--<em onclick="collectEm(this,event)" style="right: 0px; display: none;"></em>--%>
                                </li>
                            </c:when>
                            <c:otherwise>
                                <li id="Permap_skillmaintain" onclick="openTabPage(&#39;ple_jfgz&#39;)">
                                    <span>数据源</span>
                                        <%--<em onclick="collectEm(this,event)" style="right: 0px; display: none;"></em>--%>
                                </li>
                            </c:otherwise>
                        </c:choose>
                    </ul>
                </div>
                <div class="research-first" id="peran" style="padding-left: 0px; width: auto;">
                    <i></i><span>工具箱</span>
                </div>
                <div class="research-second" style="display: none; width: auto;">
                    <ul>
                        <li id="cdataresource" onclick="openTabPage(&#39;cdataresource&#39;)">
                            <span>数据源查漏</span>
                            <%--<em onclick="collectEm(this,event)" style="right: 0px; display: none;"></em>--%>
                        </li>
                        <li id="c2m" onclick="openTabPage(&#39;c2m&#39;)">
                            <span>C2M查漏</span>
                            <%--<em onclick="collectEm(this,event)" style="right: 0px; display: none;"></em>--%>
                        </li>
                    </ul>
                </div>


                <div class="research-first" id="pies" style="padding-left: 0px; width: auto;">
                    <i></i><span>管理</span>
                </div>
                <div class="research-second" style="display: none; width: auto;">
                    <ul>
                        <li id="cdataresource"
                            onclick="openTabPage(&#39;files&#124;${loginer.loginname}&#124;${loginer.postid}&#39;)">
                            <span>任务</span>
                        </li>
                        <c:choose>
                            <c:when test="${loginer.postid == 9999}">
                                <li id="cdataresource1"
                                    onclick="openTabPage(&#39;multifile&#124;${loginer.loginname}&#124;${loginer.postid}&#39;)">
                                    <span>详设</span>
                                </li>
                                <li id="cdataresource" onclick="openTabPage(&#39;pies&#39;)">
                                    <span>图表</span>
                                </li>
                            </c:when>
                        </c:choose>
                    </ul>
                </div>
            </div>
        </div>

    </div>
    <!-- 工作区 -->
    <div class="research-main" id="research-main" style="width: 1285px; height: 613px; left: 251px;">
        <iframe class="research-home-iframe" id="research-home-iframe" src="../../html/news-integral.html" width="100%"
                height="100%" frameborder="0" style="height: 614px; display: block;"></iframe>
        <iframe id="infoFrame" style="display: none; height: 614px;" src="./资源管理系统_files/saved_resource.html"></iframe>
    </div>
    <script>
        var contextPath = '/zjrc/';
    </script>
    <script type="text/javascript" src="../../js/jquery.min.js" charset="utf-8"></script>
    <script type="text/javascript" src="../../js/vue.min.js" charset="utf-8"></script>
    <script type="text/javascript" src="../../js/vue-resource.min.js" charset="utf-8"></script>
    <script type="text/javascript" src="../../js/commons.js" charset="utf-8"></script>
    <script type="text/javascript" src="../../js/contract.js" charset="utf-8"></script>
    <script type="text/javascript" src="../../js/public-js.js" charset="utf-8"></script>

    <div id="_my97DP" style="position: absolute; top: -1970px; left: -1970px; display: none;">
        <iframe style="width: 180px; height: 213px;" src="../../html/My97DatePicker.html" frameborder="0" border="0"
                scrolling="no"></iframe>
    </div>
</div>
>
</body>
</html>