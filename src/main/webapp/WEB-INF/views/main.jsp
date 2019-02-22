<%@ page language="java"  pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page import="com.syh.officeboot.zjrcu.entity.User" %>

	<!DOCTYPE html>
<!-- saved from url=(0036)http://219.143.38.251/yusys/main.asp -->
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"> -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>资源管理系统</title>
<link rel="stylesheet" type="text/css" href="../../css/jquery.mCustomScrollbar.css">
<link rel="stylesheet" type="text/css" href="../../css/public.css"><link rel="SHORTCUT ICON" href="../images/office.ico">
<style id="rekeyframes"></style>
</head>
<body>
	<div class="research-header">
		<div class="research-losea">
			<div class="research-logo"><img src="../../images/logo.png" width="110" height="30"></div>
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
					<li class="research-user-app" title="宇信协同办公APP">
						<i></i>
					</li>
					<li class="research-user-setup" title="设置">
						<i></i>
					</li>
					<li class="research-user-help" title="帮助">
						<i></i>
					</li>
					<li id="userPortraitLiSmall"><img name="userPortraitImg" id="userPortraitImgSmall" src="../../images/user.png" width="43" height="43"></li>
				</ul>
				<div class="research-user-app-setting-help-all" id="research-user-app-setting-help-all">
					<div class="research-user-app-setting-help" style="height: 640px;">
						<div class="research-help-title">宇信协同办公APP</div>
						<div class="research-app-img"><img src="../../images/yxapp.png"><span>扫一扫二维码下载安装</span></div>
					</div>
					<div class="research-user-app-setting-help" style="height: 640px;"><!-- 设置 -->
						<div class="research-help-title">默认展示功能</div>
						<div class="research-setting-info-all">
							<ul class="research-setting-info infopdmb" id="default-show-function" style="width: 276px;">
								<li value="system" class="info-current">
									<i></i>
									<span>系统菜单</span>
									<img src="../../images/menu.png">
								</li>
								<li value="todo">
									<i></i>
									<span>待办提醒</span>
									<img src="../../images/dealt.png">
								</li>
								<li value="collection">
									<i></i>
									<span>我的收藏</span>
									<img src="../../images/collection.png">
								</li>
							</ul>
						</div>
						<div class="research-help-title">默认展示系统</div>
						<ul class="research-setting-info" id="default-show-system"><li value="xdglxt" onclick="settingDefaultShow(&quot;system&quot;,this)" class="info-current"><i></i><span>考勤管理</span><img src="../../images/xdglxt.png"></li><li value="xszcxt" onclick="settingDefaultShow(&quot;system&quot;,this)"><i></i><span>售前支持</span><img src="../../images/xszcxt.png"></li><li value="bxxt" onclick="settingDefaultShow(&quot;system&quot;,this)"><i></i><span>报销管理</span><img src="../../images/bxxt.png"></li><li value="pmassess" onclick="settingDefaultShow(&quot;system&quot;,this)"><i></i><span>员工绩效考核</span><img src="../../images/pmassess.png"></li><li value="leavems" onclick="settingDefaultShow(&quot;system&quot;,this)"><i></i><span>请销假管理</span><img src="../../images/leavems.png"></li><li value="licglxt" onclick="settingDefaultShow(&quot;system&quot;,this)"><i></i><span>License管理</span><img src="../../images/licglxt.png"></li><li value="person_develop" onclick="settingDefaultShow(&quot;system&quot;,this)"><i></i><span>名字没想好</span><img src="../../images/person_develop.png"></li><li value="asset_manage_system" onclick="settingDefaultShow(&quot;system&quot;,this)"><i></i><span>资产管理</span><img src="../../images/asset_manage_system.png"></li><li value="ehrlxt" onclick="settingDefaultShow(&quot;system&quot;,this)"><i></i><span>人事管理</span><img src="../../images/ehrlxt.png"></li><li value="user_service_platform" onclick="settingDefaultShow(&quot;system&quot;,this)"><i></i><span>员工服务</span><img src="../../images/user_service_platform.png"></li><li value="recruitment_system" onclick="settingDefaultShow(&quot;system&quot;,this)"><i></i><span>社招管理</span><img src="../../images/recruitment_system.png"></li><li value="eln_system" onclick="settingDefaultShow(&quot;system&quot;,this)"><i></i><span>在线学习中心</span><img src="../../images/eln_system.png"></li><li value="taskManager_root" onclick="settingDefaultShow(&quot;system&quot;,this)"><i></i><span>任务管理</span><img src="../../images/taskManager_root.png"></li><li value="product_system" onclick="settingDefaultShow(&quot;system&quot;,this)"><i></i><span>产品问题管理</span><img src="../../images/roduct_system.png"></li><li value="marketing_system" onclick="settingDefaultShow(&quot;system&quot;,this)"><i></i><span>市场宣传</span><img src="../../images/marketing_system.png"></li></ul>
					</div>
					<div class="research-user-app-setting-help" style="height: 640px;"><!-- 帮助 -->

<ul class="research-help-title-content">
	<li>
		<div class="research-help-title">客服电话</div>
		<div class="research-help-content">010-59137700-520</div>
	</li>
	<li>
		<div class="research-help-title">支持邮箱</div>
		<div class="research-help-content research-mail"><a href="mailto:it_support@yusys.com.cn">it_support@yusys.com.cn</a></div>
	</li>
</ul>
<div class="research-help-all">
	<div class="research-help-title">用户手册</div>
	<div class="research-help-height" style="height: 412px;">
		<table width="100%" class="research-help">
			<tbody>
				<tr>
					<td><a href="javascript:void(0)" id="help-quick-start" onclick="openHelpOperationManual(this)">快速入门</a></td>
					<td></td>
				</tr>
				<tr>
					<td><a href="javascript:void(0)" id="help-payroll" onclick="openHelpOperationManual(this)">修改薪资密码手册</a></td>
					<td></td>
				</tr>
				<tr>
					<td><a href="javascript:void(0)" id="help-user-service-platform" onclick="openHelpOperationManual(this)">员工服务平台-租房补助工资发放用户手册</a></td>
					<td></td>
				</tr>
				<tr>
					<td><a href="javascript:void(0)" id="help-dormitory" onclick="openHelpOperationManual(this)">员工服务平台-宿舍管理用户手册</a></td>
					<td></td>
				</tr>
				<tr>
					<td><a href="javascript:void(0)" id="help-quick-start-ehr" onclick="openHelpOperationManual(this)">EHR系统用户手册</a></td>
					<td></td>
				</tr>
				<tr>
					<td><a href="http://219.143.38.251/yusys/help/file/PaQuarterAssessV1.0.zip" target="_blank">季度绩效填报和评审用户手册</a></td>
					<td>3.86MB</td>
				</tr>
				<tr>
					<td><a href="http://219.143.38.251/yusys/help/file/yxappUserManual.zip" target="_blank">宇信协同办公移动APP用户手册</a></td>
					<td>0.90MB</td>
				</tr>
				<tr>
					<td><a href="http://219.143.38.251/ycoms/download/documents/ResourceSystemUserGuide.zip" target="_blank">资源管理系统用户手册（含请销假）</a></td>
					<td>4.09MB</td>
				</tr>
				<tr>
					<td><a href="http://219.143.38.251/ycoms/download/documents/ContractAndPaymentSystemUserGuide.zip" target="_blank">合同及收款管理系统用户手册</a></td>
					<td>7.01MB</td>
				</tr>
				<tr>
					<td><a href="http://219.143.38.251/yusys/attachmentFile/contract/ContractAndPaymentSystemChange.zip" target="_blank">合同收款系统-合同变更功能-操作手册-V1.0</a></td>
					<td>1.00MB</td>
				</tr>
				<tr>
					<td><a href="http://219.143.38.251/ycoms/download/documents/PreSalesSystemUserGuide.zip" target="_blank">售前支持系统用户手册</a></td>
					<td>7.42MB</td>
				</tr>
				<tr>
					<td><a href="http://219.143.38.251/ycoms/download/documents/ProjectSystemUserGuide.zip" target="_blank">项目管理系统用户手册</a></td>
					<td>6.35MB</td>
				</tr>
				<tr>
					<td><a href="http://219.143.38.251/ycoms/download/documents/ExpenseSystemUserGuide.zip" target="_blank">报销管理系统用户手册</a></td>
					<td>3.95MB</td>
				</tr>
				<tr>
					<td><a href="http://219.143.38.251/ycoms/download/documents/EmployeePerformanceSystemUserGuide.zip" target="_blank">员工绩效考核系统用户手册</a></td>
					<td>5.12MB</td>
				</tr>
				<tr>
					<td><a href="http://219.143.38.251/ycoms/download/documents/AssetSystemUserGuide.zip" target="_blank">资产管理系统用户手册</a></td>
					<td>3.02MB</td>
				</tr>
				<tr>
					<td><a href="http://219.143.38.251/ycoms/download/documents/EmployeeRankEvaluationSystemUserGuide.zip" target="_blank">员工职级评定系统用户手册</a></td>
					<td>11.1MB</td>
				</tr>
				<tr>
					<td><a href="http://219.143.38.251/yusys/attachmentFile/recruitment/shezhaoshouce_v1.0.zip" target="_blank">社招系统用户手册</a></td>
					<td>5.2MB</td>
				</tr>
				<tr>
					<td><a href="http://219.143.38.251/yusys/attachmentFile/ehr/ehrshouce_v1.0.zip" target="_blank">人事管理系统用户手册</a></td>
					<td>13.2MB</td>
				</tr>
				<tr>
					<td><a href="http://219.143.38.251/yusys/attachmentFile/ehr/actorPayroll.zip" target="_blank">薪酬系统工资条查看用户手册</a></td>
					<td>1.46MB</td>
				</tr>
				<tr>
					<td><a href="http://219.143.38.251/yusys/attachmentFile/ehr/projectCompete.zip" target="_blank">人才发展-重点项目竞聘操作手册</a></td>
					<td>9.73MB</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
					</div>
					<div class="research-user-app-setting-help" style="height: 640px;"><!-- 个人信息 -->
						<div class="user-img-info">
							<div class="user-img" id="userPortraitLiBig"><img name="userPortraitImg" id="userPortraitImgBig" src="../../images/defalut.png" width="120" height="120"><span>点击更换头像</span></div>
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
						<ul class="info-pass-config">
							<li id="info-personal"></li>
							<li id="info-password"></li>
							<li id="info-mail"></li>
						</ul>
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
									<c:choose >
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
			<li id="cdataresource" onclick="openTabPage(&#39;files&#124;${loginer.loginname}&#124;${loginer.postid}&#39;)">
			<span>任务</span>
			</li>
			<li id="cdataresource1" onclick="openTabPage(&#39;multifile&#124;${loginer.loginname}&#124;${loginer.postid}&#39;)">
			<span>详设</span>
	</li>
	<c:choose >
		<c:when test="${loginer.postid == 9999}">
			<li id="cdataresource" onclick="openTabPage(&#39;pies&#39;)">
			<span>图表</span>
			</li>
		</c:when>
	</c:choose>
			</ul>
			</div>
        </div>
		</div>

		<!-- 应用切换图标 -->
		<div class="research-system-content" id="research-system-content" style="display: none; bottom: 36px; width: 0px; height: 0px;">
			<ul class="research-system-list"><li value="null" name="考勤管理" id="xdglxt" onclick="switchSystem(this)"><img src="../../images/xdglxt.png">考勤管理</li><li value="null" name="售前支持" id="xszcxt" onclick="switchSystem(this)"><img src="../../images/xszcxt.png">售前支持</li><li value="null" name="报销管理" id="bxxt" onclick="switchSystem(this)"><img src="../../images/bxxt.png">报销管理</li><li value="null" name="员工绩效考核" id="pmassess" onclick="switchSystem(this)"><img src="../../images/pmassess.png">员工绩效考核</li><li value="null" name="请销假管理" id="leavems" onclick="switchSystem(this)"><img src="../../images/leavems.png">请销假管理</li><li value="null" name="License管理" id="licglxt" onclick="switchSystem(this)"><img src="../../images/licglxt.png">License管理</li><li value="null" name="人才发展" id="person_develop" onclick="switchSystem(this)"><img src="../../images/person_develop.png">人才发展</li><li value="null" name="资产管理" id="asset_manage_system" onclick="switchSystem(this)"><img src="../../images/asset_manage_system.png">资产管理</li><li value="null" name="人事管理" id="ehrlxt" onclick="switchSystem(this)"><img src="../../images/ehrlxt.png">人事管理</li><li value="null" name="员工服务" id="user_service_platform" onclick="switchSystem(this)"><img src="../../images/user_service_platform.png">员工服务</li><li value="null" name="社招管理" id="recruitment_system" onclick="switchSystem(this)"><img src="../../images/recruitment_system.png">社招管理</li><li value="null" name="在线学习中心" id="eln_system" onclick="switchSystem(this)"><img src="../../images/eln_system.png">在线学习中心</li><li value="null" name="任务管理" id="taskManager_root" onclick="switchSystem(this)"><img src="../../images/taskManager_root.png">任务管理</li><li value="null" name="产品问题管理" id="product_system" onclick="switchSystem(this)"><img src="../../images/product_system.png">产品问题管理</li><li value="null" name="市场宣传" id="marketing_system" onclick="switchSystem(this)"><img src="../../images/marketing_system.png">市场宣传</li></ul>
			<div class="research-system-t" id="research-system-t" style="width: 580px;"></div>
			<div class="research-system-r" id="research-system-r" style="height: 330px;"></div>
			<div class="research-system-b" id="research-system-b" style="left: 65px; width: 515px;"></div>
			<div class="research-system-l" id="research-system-l" style="height: 330px;"></div>
		</div>
	</div>
	<!-- 工作区 -->
	<div class="research-main" id="research-main" style="width: 1285px; height: 613px; left: 251px;">
	<iframe class="research-home-iframe" id="research-home-iframe" src="../../html/news-integral.html" width="100%" height="100%" frameborder="0" style="height: 614px; display: block;"></iframe>
	<iframe id="infoFrame" style="display: none; height: 614px;" src="./资源管理系统_files/saved_resource.html"></iframe>
	</div>
	<div class="prompt"></div>
	<div class="prompt-mask"></div>

    <input type="hidden" id="yusysSystemParam1" value="762f334d352f42516a4a383d">
    <input type="hidden" id="userMobile" value="13732261867">
    <!-- 用户更换头像 -->
	<iframe class="research-upload-img" id="research-upload-img" src="./资源管理系统_files/upload_img.html" width="100%" height="100%" frameborder="0"></iframe>
	<!-- 修改个人信息 -->


<div class="research-modifyInformation-bg" id="modify-password">
	<div class="research-modifyInformation-all">
		<div class="research-modifyInformation-title">
			<i></i>
			<span>修改密码</span>
			<em class="open" onclick="researchModifyInformationBg()"></em>
		</div>
		<div class="research-modifyInformation-content">
			<ul class="research-modifyInformation-password">
				<li>
					<h3>现密码 :</h3>
					<input type="password" id="oldPassword" class="form-control">
					<span class="input-ast">*</span>
				</li>
				<li>
					<h3>新密码 :</h3>
					<input type="password" id="newPassword" class="form-control">
					<span class="input-ast">*</span>
				</li>
				<li>
					<h3>确认新密码 :</h3>
					<input type="password" id="repeatNewPassword" class="form-control">
					<span class="input-ast">*</span>
				</li>
				<li class="research-modifyInformation-password-error">
					<i></i>
					<p></p>
				</li>
			</ul>
			<div class="research-modifyInformation-btn">
				<input type="button" class="btn" onclick="toUpdateUserPasswordPage(this)" value="修改">
				<input type="button" class="btn" onclick="cleanUpdatePasswordInfo()" value="清空">
			</div>
			<div class="research-modifyInformation-prompt">
				<h2>注意事项 :</h2>
				<p>· 一天内只能修改3次密码。</p>
				<p>· 密码长度至少8位字符。</p>
				<p>· 密码字符需包含至少3种不同类型的组合(字符类型包括：数字、小写字母、大写字母、特殊字符)。</p>
			</div>
		</div>
	</div>
</div>
	<!-- 重置邮箱密码 -->


<div class="research-modifyInformation-bg" id="reset-mailbox-password">
	<div class="research-modifyInformation-all">
		<div class="research-modifyInformation-title reset-mailbox-password-title">
			<i></i>
			<span>重置邮箱密码</span>
			<em class="open" onclick="researchModifyInformationBg()"></em>
		</div>
		<div class="research-modifyInformation-content">
			<div class="reset-mailbox-password-content" id="reset-mailbox-password-content">
			</div>
			<div class="research-modifyInformation-btn">
				<input type="button" id="research-modifyInformation-btn1" class="btn" onclick="resetMailPassword()" value="确定">
				<input type="button" id="research-modifyInformation-btn2" class="btn" onclick="researchModifyInformationBg()" value="关闭">
			</div>
			<div class="research-modifyInformation-prompt">
				<h2>注意事项 :</h2>
				<p>· 一天内只能重置3次密码。</p>
			</div>
		</div>
	</div>
</div>

<script>
var contextPath = '/yusys/';
var contextPathYcoms = '/ycoms/';
//流程自动审批项目请求路径
var contextPathYxapproval = 'http://192.168.254.71:7001/yxapproval';
var stringKey = '762f334d352f42516a4a383d';
</script>
	<script type="text/javascript" src="../../js/jquery.min.js" charset="utf-8"></script>
	<script type="text/javascript" src="../../js/vue.min.js" charset="utf-8"></script>
	<script type="text/javascript" src="../../js/vue-resource.min.js" charset="utf-8"></script>
	<script type="text/javascript" src="../../js/commons.js" charset="utf-8"></script>
	<script type="text/javascript" src="../../js/contract.js" charset="utf-8"></script>
	<script type="text/javascript" src="../../js/public-js.js" charset="utf-8"></script>

        <div id="_my97DP" style="position: absolute; top: -1970px; left: -1970px; display: none;"><iframe style="width: 180px; height: 213px;" src="../../html/My97DatePicker.html" frameborder="0" border="0" scrolling="no"></iframe></div></div>></body></html>