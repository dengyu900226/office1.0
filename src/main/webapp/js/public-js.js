var reMain=document.getElementById("research-main");
var reContent=document.getElementById("research-content");
var reMenu=document.getElementById("research-menu");
var reUserTag=document.getElementById("research-user-tag");
var resTag=document.getElementById("research-tag");
var reHomeIfr=document.getElementById("research-home-iframe");
var reIfr=document.getElementById("research-iframe");
var resSum=0;
var resTagLi=0;
/**
 * 当前展开菜单的最大宽度
 */
var memuListMaxWidth = 0;
/**
 * EMP_SID
 */
var empSessionId = "";

/**
 * 收藏菜单数据
 */
var collectionData={};

/**
 * 最近访问菜单数据
 */
var recentVisitData={};

/**
 * 经常访问菜单数据
 */
var oftenVisitData={};

/**
 * 主菜单数据
 */
var masterMenuData={};

/**
 * 菜单html
 */
var menuHtml = "";

/**
 * 默认显示数据
 */
var defaultShowData = {};

//右侧宽度
var reLoseaOW,reMenuTitleOH,reSysTabOH,reHeaderOH,reTagAllOH,reHelpTitleConOH,reHelpTitleConOH,reUseTab,DocWinW,DocWinH,reUserTagW,reConH,reWraH,reMainW,reUserAppSettingHelp,reTagAll;
function RefreshBody(){
	reLoseaOW=$(".research-losea").outerWidth();
	reMenuTitleOH=$(".research-menu-title").outerHeight();
	reSysTabOH=$(".research-system-tab").outerHeight();
	reHeaderOH=$(".research-header").outerHeight();
	reTagAllOH=$(".research-tag-all").outerHeight();
	reHelpTitleConOH=$(".research-help-title-content").outerHeight();
	reHelpTitleOH=$(".research-help-all .research-help-title").outerHeight();
	reUseTab=$(".research-use-tab").outerHeight();
	DocWinW=$(window).width();
	DocWinH=$(window).height();
	reUserTagW=DocWinW-reLoseaOW-1;
	reConH=DocWinH-reMenuTitleOH-reSysTabOH-reHeaderOH;
	reWraH=DocWinH-reHeaderOH;
	reMainW=reUserTagW+208;
	reUserAppSettingHelp=reWraH+reTagAllOH+1;
	reHelpHeight=reUserAppSettingHelp-reHelpTitleConOH-reHelpTitleOH;
	$(".research-user-tag").css("width",reUserTagW);//LOGO+搜索+用户信息+标签切换总宽度
	$(".research-tag-all").css("width",reUserTagW);//标签切换总宽度
	$(".research-tag-all-background").css("width",reUserTagW);//标签切换透明背景总宽度
	$(".research-main").css("width",reUserTagW);//工作区宽度
	$(".research-main").css("height",reWraH);//工作区高度
	$(".research-main iframe").css("height",reWraH+1);//工作区IFRAME高度
	$(".research-wrapper").css("height",reWraH);//菜单+工作区外框高度
	$(".research-menu").css("height",reWraH);//左侧框架高度
	$(".research-content").css("height",reConH);//左边菜单高度
	$(".research-use-tab-list").css("height",reConH-reUseTab);//我的收藏-最近访问-经常访问内容高度
	$(".research-user-app-setting-help").css("height",reUserAppSettingHelp);//点击用户-移动APP-设置-帮助弹出信息高度
	$(".research-help-height").css("height",reHelpHeight);//用户手册高度
	//右侧标签首页菜单宽度
	var reTagHomeOW=$(".research-tag-home").outerWidth();
//	var reTagOW=$(".research-tag").outerWidth();
	var reTagLastOW=$(".research-tag-last").outerWidth();
	reTagAll=reUserTagW-reTagHomeOW-reTagLastOW;
	//--------------------
	if(!$(".research-menu").is(".research-menu-left")){  
//		$(".research-menu").removeClass("research-menu-left");
		reMenu.style.width="250px";
		reMain.style.width=reUserTagW+"px";
		reMain.style.left="251px";
		reContent.style.height=reConH+"px";
		reContent.style.display="block";
	}else{
//		$(".research-menu").addClass("research-menu-left");
		reMenu.style.width="42px";
		reMain.style.width=reMainW+"px";
		reMain.style.left="43px";
		reContent.style.height=reWraH+"px";
		reContent.style.display="none";
	}
};
//刷新
window.onresize = RefreshBody;

//标签切换(注解：变量tab_li是点击的元素,变量tab_ul切换的主题内容元素)
function Tag_tab(tab_li,tab_ul){
	tab_li.click(function(){
		var $this = $(this);
		var $t = $this.index();
		tab_li.removeClass("current");
		$this.addClass("current");
		tab_ul.removeClass("open");
		tab_ul.eq($t).addClass("open");
		var idVal = $this.attr("id");
		if(idVal){
			//如果切换的是 待办 标签，则刷新当前待办页面的内容及汇总数字
			if(idVal.indexOf("todo-casually") != -1 || idVal == "tab-b-todo"){
				queryWorkToDoRemindCountNum();
				refreshWorkToDoWorkSpacePage();
			}
		}
	});
};
//常用功能分类切换
Tag_tab($(".research-use-tab li"),$(".research-use-tab-list"));
//应用-待办-常用
Tag_tab($(".research-tab li"),$(".research-single"));
//首页
Tag_tab($(".research-tag-home li"),$(".research-home-iframe"));
//搜索框--获取焦点和失去焦点事件
$(".research-search input").focus(function(){
	$(".research-search").addClass("research-search-focus");
});
$(".research-search input").blur(function(){
	$(".research-search").removeClass("research-search-focus");
});
//搜索框--input输入框实时输入触发事件
$(".research-search input").bind("input propertychange",function(){
	if($(this).val()==''){
		$(".research-search .close-search").removeClass("open");
	}else{
		$(".research-search .close-search").addClass("open");
	}
});
//搜索框--清除文本框内容
$(".research-search .close-search").click(function(){
	$(".research-search input").val("");
	$(".research-search .close-search").removeClass("open");
	$(".research-losea").removeClass("research-input");
	$(".gov-search-suggest").hide();
});

//用户-移动APP-设置-帮助下拉详细信息
var eTarget="";
var elenum=0;
$(".user-list li").each(function(index,element){
	element.onclick=function(index){
        return function(e){
        	e = e || window.event;
        	e.target=e.srcElement ? e.srcElement : e.target;
        	if(eTarget==e.target){
        		elenum++;
            	if(elenum>2){
        			elenum=1;
        		}
            	if(elenum==2){
            		$(".user-list li").eq(index).removeClass("user-current");
            		$(".research-user-app-setting-help-all").css("display","block");
            		$(".research-user-app-setting-help-all").animate({width:'0px',opacity:'0'},200,function(){
            			$(".research-user-app-setting-help").eq(index).css("display","none");
            			});
            		return;
            	}
        	}else{
        		elenum=1;
        	}
        	eTarget=e.target;
        	$(this).addClass("user-current").siblings().removeClass("user-current");
        	if(elenum!=0){
        		$(".research-user-app-setting-help-all").animate({width:'0px',opacity:'0'},200);
        	}
        	$(".research-user-app-setting-help").each(function(index,ele){
        		$(ele).css("display","none");
        	});
        	$(".research-user-app-setting-help").eq(index).css("display","block");
        	$(".research-user-app-setting-help-all").css("display","block");
        	$(".research-user-app-setting-help-all").animate({width:'400px',opacity:'1'},300);
        };
    }(index);
});

//显示弹出框
function researchDisplayBlock(){
	elenum=0;
	$(".research-user-app-setting-help-all").css("display","block");
	$(".research-user-app-setting-help-all").animate({width:'0px',opacity:'0'},200,function(){
		$(".research-user-app-setting-help").eq(3).css("display","none");
	});
}
//隐藏弹出框
function researchDisplayNone(){
	$(".research-user-app-setting-help-all").css("display","block");
	$(".research-user-app-setting-help-all").animate({width:'0px',opacity:'0'},200,function(){
		$(".research-user-app-setting-help").css("display","none");
	});
	$(".user-list li").removeClass("user-current");
	elenum=0;
}

//默认展示功能居中显示
var infopdmbLi=$(".infopdmb li").outerWidth(true);
var infopdmbLiLength=$(".infopdmb li").length;
var infopdmbWidth=infopdmbLi*infopdmbLiLength;
if(infopdmbLiLength>5){
	$(".infopdmb").css({"width":"370px"});
}else{	
	$(".infopdmb").css({"width":infopdmbWidth});
}

//点击下拉菜单添加到右侧选项卡事件
$(".tag-last-list").on("click","li",function(){
	var T_id=$(this).attr("id").replace("-list-casually","");//获取当前点击的id
	var TagId=T_id+"-tag-casually";//选项卡标签的id
	var IfrId=T_id+"-ifr-casually";//iframe的id
	//选项卡标签自定义
	var reTagLi=$(".research-tag li");
	reTagLi.removeClass("current");
	reTagLi.removeClass("open");
	//下拉菜单自定义
	var LiTagLastListL=$(".tag-last-list li");
	LiTagLastListL.removeClass("open");
	$(".tag-last-down").removeClass("tag-last-down-back");
	$(".tag-last-list-all").removeClass("open");
	//iframe自定义
	var LiIfr=$(".research-main iframe");
	LiIfr.removeClass("open");
	//判断点击的这个元素是否被添加到选项卡标签
	if ($('#'+TagId).length != 0){
		$('#'+TagId).removeClass("open");//选项卡标签移除open
		$('#'+TagId).removeClass("current");//选项卡标签移除current
		$('#'+TagId).addClass("current");//选项卡标签添加current
		$('#'+IfrId).addClass("open");//iframe选项标签添加open
		return;
	}else{
		resTag.style.width="auto";
		//选项卡标签添加到现有里的最后位置
		$(".research-tag li:last").after("<li class='current' id="+TagId+" ondblclick='tabLableClose(this,\"li\")' >" + $(this).text() + "<i></i></li>");
		
		if($(this).text().match(/[\u0000-\u00ff]/g) != null){
			var TagIdWidth = $('#'+TagId).width()+1;
			$('#'+TagId).remove();
			$(".research-tag li:last").after("<li class='current' ondblclick='tabLableClose(this,\"li\")' style='width:"+TagIdWidth+"px' id="+TagId+">" + $(this).text() + "<i></i></li>");
		}
		
		Tag_tab($('#'+TagId),$('#'+IfrId));
		//选项卡标签外围的宽度
		resTagLi=$('#'+TagId).outerWidth()+1;
		//如果菜单名中包含半角字符，则长度 +1
		$('#'+TagId).attr('value',resTagLi);
		resSum+=resTagLi;
		resTag.style.width=resSum+"px";
		//右侧标签首页菜单宽度+下拉标签定位左间距
		var reTagHomeOW=$(".research-tag-home").outerWidth();
		var reSumTagHome=resSum+reTagHomeOW;
		$(".research-tag-last").css({"left":reSumTagHome});
		//规定宽度，超出删除选项卡标签--调用
		reTagLiDelete();
		//iframe添加位置
		$('#'+IfrId).addClass("open");
	}
});

//规定宽度，超出删除选项卡标签
function reTagLiDelete(){
	//如果ul的宽度大于设定的最大宽度，则需要删除第一个标签
	if(resSum >= reTagAll){
		//第一个标签对象
		var reLiFirChild=$(".research-tag li:first-child");
		//第一个标签长度
		var reLiFirChildLen=reLiFirChild.outerWidth()+1;
		resSum = resSum - reLiFirChildLen;
		reLiFirChild.remove();
		reTagLiDelete();
		//右侧标签首页菜单宽度+下拉标签定位左间距
		var reTagHomeOW=$(".research-tag-home").outerWidth();
		var reSumTagHome=resSum+reTagHomeOW;
		$(".research-tag-last").css({"left":reSumTagHome});
	}else{
		resTag.style.width=resSum+"px";
		return;
	}
	
}


//判断选项卡标签li是否被点击
$(".research-tag").on("click","li",function(e){
	var T_id=$(this).attr("id").replace("-tag-casually","");//获取当前点击的id
	var TagId=T_id+"-tag-casually";//选项卡标签的id
	var IfrId=T_id+"-ifr-casually";//iframe的id
	//选项卡标签自定义
	var reTagLi=$(".research-tag li");
	reTagLi.removeClass("current");
	reTagLi.removeClass("open");
	//下拉菜单自定义
	var LiTagLastListL=$(".tag-last-list li");
	LiTagLastListL.removeClass("open");
	//iframe自定义
	var LiIfr=$(".research-main iframe");
	LiIfr.removeClass("open");
	//点击的这个元素被添加到选项卡标签
	$('#'+TagId).removeClass("open");//选项卡标签移除open
	$('#'+TagId).removeClass("current");//选项卡标签移除current
	$('#'+TagId).addClass("current");//选项卡标签添加current
	$('#'+IfrId).addClass("open");//iframe选项标签添加open
	$(".research-tag-home li").removeClass("current");//清楚首页选中样式
	reHomeIfr.style.display="none";//清楚首页iframe内容
});

//判断下拉菜单li是否被点击
$(".tag-last-list").on("click","li",function(e){
	var T_id=$(this).attr("id");//获取当前点击的id
	if(e.target == $('#'+T_id)[0]){
//		$(".research-tag li").removeClass("current");
	}
	$(".research-tag-home li").removeClass("current");//清楚首页选中样式
	reHomeIfr.style.display="none";//清楚首页iframe内容
});

//判断左侧菜单li是否被点击
$(".research-second ul li").click(function(e){
	var T_id=$(this).attr("id");//获取当前点击的id
	if(e.target == $('#'+T_id)[0]){
		$(".research-tag li").removeClass("open");
	}
	$(".research-tag-home li").removeClass("current");//清楚首页选中样式
	reHomeIfr.style.display="none";//清楚首页iframe内容
});

//点击首页的时候其他标签未选中
$(".research-tag-home").click(function(){
	$(".research-tag-home li").addClass("current");
	$(".research-tag li").removeClass("current");
	$(".research-tag li").removeClass("open");
	$(".research-main iframe").removeClass("open");
	reHomeIfr.style.display="block";
});

//关闭全部标签
$(".tag-last-close .tag-last-close-all").click(function(){
	$(".research-tag li").remove();
	$(".tag-last-list li").remove();
	$(".research-main iframe").not(":first").remove();
	$(".research-tag-last").removeClass("open");
	$(".tag-last-list-all").removeClass("open");
	$(".research-tag-home li").addClass("current");
	$(".tag-last-down").removeClass("tag-last-down-back");
	reHomeIfr.style.display="block";
	resTag.style.width="0px";
	resSum = 0;
	resTagLi = 0;
	//右侧标签首页菜单宽度+下拉标签定位左间距
	var reTagHomeOW=$(".research-tag-home").outerWidth();
	var reSumTagHome=resSum+reTagHomeOW;
	$(".research-tag-last").css({"left":reSumTagHome});
});
//下拉菜单点击首页
$(".tag-last-close .tag-last-close-home").click(function(){
	$(".research-tag li").removeClass("open");
	$(".research-tag li").removeClass("current");
	$(".tag-last-list li").removeClass("current");
	$(".research-tag-home li").addClass("current");
	$(".research-main iframe").removeClass("open");
	$(".tag-last-down").removeClass("tag-last-down-back");
	$(".tag-last-list-all").removeClass("open");
	reHomeIfr.style.display="block";
});
//右侧下拉标签菜单
$(".tag-last-down").click(function(){
	$(".tag-last-down").toggleClass("tag-last-down-back");
	$(".tag-last-list-all").toggleClass("open");
});
//折叠菜单
$(".research-menu .research-menu-title i").bind('click',function(){
	if($(".research-menu").is(".research-menu-left")){   
		$(".research-menu").removeClass("research-menu-left");
		reMenu.style.width="250px";
		reMain.style.width=reUserTagW+"px";
		reMain.style.left="251px";
		reContent.style.height=reWraH-74+"px";
		reContent.style.display="block";
	}else{
		$(".research-menu").addClass("research-menu-left");
		reMenu.style.width="42px";
		reMain.style.left="43px";
		reMain.style.width=reMainW+"px";
		reContent.style.height=reWraH+"px";
		reContent.style.display="none";
	}
});
//折叠之后点击出现菜单
$(".research-tab li").click(function(){
	if($(".research-menu").is(".research-menu-left")){
		$(".research-menu-left").css({"display":"block","width":"291px"});
		reContent.style.height=reWraH+"px";
		reContent.style.display="block";
		reMain.style.left="292px";
		reMain.style.width=reUserTagW-41+"px";
	}
	$(".research-menu .research-menu-title i").click(function(){
		if($(".research-menu").is(".research-menu-left")){
			reMenu.style.width="42px";
			reMain.style.left="43px";
			reMain.style.width=reMainW+"px";
			reContent.style.display="none";
		}else{
			reMenu.style.width="250px";
		}
	});
});
//左侧菜单
$(".research-first").click(function(){
	$(this).next(".research-second").slideToggle("fast",function(){
		$(this).prev().is(".research-i") ? $(this).prev().removeClass("research-i") : $(this).prev().addClass("research-i");
	});
});
//获取iframe高度
//$(".research-iframe").load(function(){
//	var iframe_h=$(this).contents().find("body").height()+30;
//	$(this).height(iframe_h);
//});
//如果是safari浏览器工作区加滚动条,处理IFRAME不能滚动的问题
//var userAgent=navigator.userAgent; //取得浏览器的userAgent字符串
//if (userAgent.indexOf("Safari")>-1){
//	$(".research-main").css("overflow","auto");
//}
//如果是Mac电脑浏览工作区加滚动条,处理IFRAME不能滚动的问题
if (navigator.userAgent.indexOf("Mac OS X")>0){
	$(".research-main").css("overflow","auto");
}
//系统菜单
var reSysCon=document.getElementById("research-system-content");
function ResearchSystem(){
	var reSysList_W=$(".research-system-list").outerWidth();
	var reSysList_Hh=$(".research-system-list").outerHeight();
	var reSysList_Hli=$(".research-system-list li").outerHeight();
	var reSystem=$(".research-system").outerWidth()+1;
	var reSysT = document.getElementById("research-system-t");
	var reSysR = document.getElementById("research-system-r");
	var reSysB = document.getElementById("research-system-b");
	var reSysL = document.getElementById("research-system-l");
	var reSysList_Len=Math.ceil($(".research-system-list li").length/5);//判断li有多少行
	var reSysList_H40=reSysList_Hli*reSysList_Len+reSysList_Hh;
	var reSysList_H404=reSysList_H40;
	//var reSysList_H404=reSysList_H40+4;
	//边框大小
	reSysT.style.width=reSysList_W+"px";
	reSysR.style.height=reSysList_H404+"px";
	reSysB.style.left=reSystem+"px";
	reSysB.style.width=reSysList_W-reSystem+"px";
	reSysL.style.height=reSysList_H404+"px";
	$(".research-system").click(function(){
		if($(".research-system").is(".research-system-current")){
			$(".research-system-content").stop(true, true);
			$(".research-system").removeClass("research-system-current");
			$(".research-system-content").animate({bottom:'36px',opacity:'hide',width:"0",height:"0",display:'none'},200);
			$(".research-system-t").hide(200);
			$(".research-system-r").hide(200);
			$(".research-system-b").hide(200);
			$(".research-system-l").hide(200);
//			$(".research-system-list").hide(200);
		}else{
			$(".research-system-content").stop(true, true);
			$(".research-system").addClass("research-system-current");
			$(".research-system-content").animate({bottom:'36px',opacity:'show',width:reSysList_W,height:reSysList_H40,display:'block'},200);
			$(".research-system-t").show(200);
			$(".research-system-r").show(200);
			$(".research-system-b").show(200);
			$(".research-system-l").show(200);
//			$(".research-system-list").show(200);
		}
//		ReSysTem(32,32);
	});
};
//系统切换
function switchSystem(node){
	var systemNo = $(node).attr("id");
	if(systemNo && systemNo=="product_system"){
		baseAjax(contextPath+"ProductLogin/openProductPage.asp",null,function(data){
			if(data && data.result){
				var result = data.result;
				if(result == "true"){
					var url = data.url;
					window.open(url);
				}else{
					var message = data.message;
					if(message){
						$.msg.alert(message);
					}else{
						$.msg.alert("打开产品管理页面失败!");
					}
				}
			}
		},false);
	}else{
		var systemName = $(node).attr("name");
		initUserFunctionPermission(systemNo,systemName);
		$("#research-system-content").hide();
		$(".research-system").removeClass("research-system-current");
		$(".research-tab > li").removeClass("current");
		$(".research-tab .tab-a").addClass("current");
		$(".research-single").removeClass("open");
		$("#menu_tree").addClass("open");
		if($("#research-menu").is(".research-menu-left")){
			reMenu.style.width = "291px";
			reMain.style.left="292px";
			reContent.style.display = "block";
		}
	}
}

//点击除了工作区域的其他位置弹出窗口消失
function cleanDom(e){
	var target = $(e.target);
	//系统按钮和弹出菜单区域
	if(target.closest(".research-system").length == 0 && target.closest(".research-system-content").length == 0){
		$(".research-system").removeClass("research-system-current");
		reSysCon.style.width="0px";
		reSysCon.style.height="0px";
		$(".research-system-content").hide(200);
	}
	//左侧列表消失
	if(target.closest(".research-menu").length == 0 && target.closest(".research-system-list").length == 0){
		if($(".research-menu").is(".research-menu-left")){
			reMenu.style.width="42px";
			reMain.style.left="43px";
			reMain.style.width=reMainW+"px";
			reContent.style.height=reWraH-74+"px";
			reContent.style.display="block";
			$(".research-content").hide();
			$(".research-menu").addClass("research-menu-left");
		}else{
			reMain.style.width=reUserTagW+"px";
			reMain.style.left="251px";
			reContent.style.height=reConH+"px";
			reContent.style.display="block";
			$(".research-menu").removeClass("research-menu-left");
		}
	}
	//用户-移动APP-设置-帮助下拉详细信息框消失
	if(target.closest(".user-list").length == 0 && target.closest(".research-user-app-setting-help-all").length == 0){
		$(".user-list li").removeClass("user-current");
		if(document.getElementById("research-user-app-setting-help-all").style.display=="block"){
			researchDisplayNone();//显示弹出框
		}
	}
	//搜索下拉详细信息框消失
	if(target.closest(".gov-search-suggest").length == 0 && target.closest(".research-search").length == 0){
		if(document.getElementById("gov_search_suggest").style.display=="block"){
			$(".gov-search-suggest").hide();
			$(".research-losea").removeClass("research-input");
		}
	}
	//右侧下拉菜单消失
	if(target.closest(".research-tag-last").length == 0 && target.closest(".research-last-list li").length == 0){
		var targetId = target.parent().attr("id");
		if($(".tag-last-list-all").is(".open")){
			if(!(targetId != null && targetId != undefined && targetId.indexOf("-list-casually") != -1)){
				$(".tag-last-list-all").removeClass("open");
				$(".tag-last-down").removeClass("tag-last-down-back");
			}
		}
		if($(".research-tag li").is(".open")){
			$(".research-tag li").siblings(".open").attr("class","current");
		}
	}
}

/**
 * 点击左侧菜单添加到右侧选项卡事件
 * @param t_menu_no 选项卡ID
 * @param t_menu_name 选项卡名
 * @param t_url URL
 */
function openTabStrip(t_menu_no,t_menu_name,t_url){
	if(!t_menu_no) t_menu_no = "";
	if(!t_menu_name) t_menu_name = "";
	if(!t_url) t_url = "";
	var T_id=t_menu_no.replace(/\s+/g,'');//获取当前点击的id
	T_id.replace('-cet-casually','');//去除收藏后缀
	T_id.replace('-recent-casually','');//去除最近访问后缀
	var TagId=T_id+"-tag-casually";//选项卡标签的id
	var IfrId=T_id+"-ifr-casually";//iframe的id
	//选项卡标签自定义
	// alert(t_menu_no+",,,"+t_menu_name+",,,"+t_url);
	var reTagLi=$(".research-tag li");
	reTagLi.removeClass("current");
	reTagLi.removeClass("open");
	//下拉菜单自定义
	var LiTagLastListL=$(".tag-last-list li");
	LiTagLastListL.removeClass("open");
	//iframe自定义
	var LiIfr=$(".research-main iframe");
	LiIfr.removeClass("open");
	//首页取消选中状态
	$(".research-tag-home li").removeClass("current");//清楚首页选中样式
	reHomeIfr.style.display="none";//清楚首页iframe内容
	//添加最近访问数据
	// addRecentVisit(t_menu_no,t_menu_name,t_url);
	//添加经常访问数据
	// addOftenVisit(t_menu_no,t_menu_name,t_url);
	//判断点击的这个元素是否被添加到选项卡标签
	if ($('#'+TagId).length != 0){
		$('#'+TagId).removeClass("open");//选项卡标签移除open
		$('#'+TagId).addClass("current");//选项卡标签添加current
		$('#'+IfrId).addClass("open");//iframe选项标签添加open
	}else{
		resTag.style.width="auto";
		//选项卡标签添加位置
		$(".research-tag").append("<li class='current' id="+TagId+" ondblclick='tabLableClose(this,\"li\")' >" + t_menu_name + "<i onclick='tabLableClose(this)'></i></li>");
		//如果菜单名中包含半角字符，则长度 +1
		if(t_menu_name.match(/[\u0000-\u00ff]/g) != null){
			var TagIdWidth = $('#'+TagId).width() + 1;
			$('#'+TagId).remove();
			$(".research-tag").append("<li class='current' ondblclick='tabLableClose(this,\"li\")' style='width:"+TagIdWidth+"px' id="+TagId+">" + t_menu_name + "<i onclick='tabLableClose(this)'></i></li>");
		}
		$(".research-tag-home li").removeClass("current");//清楚首页选中样式
		reHomeIfr.style.display="none";//清楚首页iframe内容
		//选项卡标签外围的宽度
		resTagLi=$('#'+TagId).outerWidth()+1;
		$('#'+TagId).attr('value',resTagLi);
		resSum+=resTagLi;
		resTag.style.width=resSum+"px";
		//右侧标签首页菜单宽度+下拉标签定位左间距
		var reTagHomeOW=$(".research-tag-home").outerWidth();
		var reSumTagHome=resSum+reTagHomeOW;
		$(".research-tag-last").css({"left":reSumTagHome});
		//规定宽度，超出删除选项卡标签--调用
		reTagLiDelete();
		//下拉菜单添加位置
		$(".tag-last-list").append("<li id='"+T_id+"-list-casually"+"'>" + t_menu_name + "<i onclick='tabLableClose(this)'></i></li>");
		$('#'+T_id+'-list-casually').attr('value',resTagLi);
		//iframe添加位置
		var LiIfr=$(".research-main iframe");
		LiIfr.removeClass("open");
		$(".research-main").append("<iframe class='research-iframe open' id='"+T_id+"-ifr-casually"+"' name='"+T_id+"-ifr-casually"+"' src='"+t_url+"' width='100%' height='100%' frameborder='0'></iframe>");
		Tag_tab($('#'+TagId),$('#'+IfrId));
		RefreshBody();//刷新页面
	}
	//显示下拉菜单
	if(!$(".research-tag-last").is(".open")){
		$(".research-tag-last").addClass("open");		
	}
	if(t_menu_no.indexOf("-todo-casually") != -1){
		queryWorkToDoRemindCountNum();//刷新待办
		refreshWorkToDoWorkSpacePage();
	}
}

/**
 * 刷新整个iframe页面（需先刷新后关闭）
 * @param id 选项卡标签的ID
 * @param url 选项卡Iframe的路径
 */
function tabRefresh(id,url){
	var tabRefreshSrc = $('#'+id+'-ifr-casually').attr("src");
	$('#'+id+'-ifr-casually').attr("src",url?url:tabRefreshSrc);
}

//根据业务主键关闭选项卡（添加选项卡时也是根据主键打开）
function tabClose(id){
	tabLableClose($('#'+id+"-tag-casually"),"li");
}

//点击选项卡/下拉菜单中标签关闭按钮
function tabLableClose(node,nodeFlag){
	var reSec_id_li;
	if(nodeFlag){
		reSec_id_li = $(node);//选项卡标签li元素
	}else{
		reSec_id_li = $(node).parent();//选项卡标签li元素
	}
	var reSec_id=reSec_id_li.attr("id").replace('-tag-casually','');//去除-tag
	reSec_id=reSec_id.replace('-list-casually','');//去除-list
	
	var reSec_id_ifr=reSec_id+"-ifr-casually";//获取iframe标签id
	var reSec_id_list=reSec_id+"-list-casually";//获取下拉菜单标签
	var reSec_id_tag=reSec_id+"-tag-casually";//获取菜单标签
	
	var researchTag = $("#research-tag li");
	var researchTagLiId = "";
	researchTag.each(function(){
		researchTagLiId += $(this).attr("id").replace("-tag-casually","")+",";
	});

	$("#"+reSec_id_tag).remove();//删除选项卡标签
	$("#"+reSec_id_list).remove();//删除下拉菜单标签
	$("#"+reSec_id_ifr).remove();//删除iframe标签
	
	if(researchTagLiId.indexOf(reSec_id) == -1){
		return;
	}
	
	var reTagLi=$(".research-tag li");
	
	if(!($(".research-tag li").is(".current")) && !($(".research-tag-home li").is(".current"))){
		if(reTagLi.length == 0 ){ //首页选中
			$(".research-tag-home li").addClass("current");
			reHomeIfr.style.display="block";
		}else{ //选中最后一个TAB并选中iframe内容
			reTagLi.parent().find('>li:last').addClass("current");
			var Tag_id = reTagLi.parent().find('>li:last').attr('id').replace('-tag-casually','');
			Tag_id = Tag_id.replace("-list-casually","");
			var Tag_ifr_id = Tag_id + "-ifr-casually";
			$("#"+Tag_ifr_id).addClass("open");//iframe选项标签添加open
			//刷新待办
			if(Tag_id.indexOf("-todo-casually") != -1){
				queryWorkToDoRemindCountNum();
				refreshWorkToDoWorkSpacePage();
			}
		}
	}
	//隐藏下拉菜单
	if(reTagLi.length==0){
    	$(".research-tag-last").removeClass("open");
	}
	resTagLi = reSec_id_li.val();
	//选项卡标签外围的宽度
	resSum = resSum - resTagLi;
	resTag.style.width=resSum+"px";
	//右侧标签首页菜单宽度+下拉标签定位左间距
	var reTagHomeOW=$(".research-tag-home").outerWidth();
	var reSumTagHome=resSum+reTagHomeOW;
	$(".research-tag-last").css({"left":reSumTagHome});
	//删除标签后判断长度再判断下拉列表中的标签是否显示才列表上面
	//1.判断下拉框的内容数量是否大于页签内容数量
	var tagLastList = $(".tag-last-list-all .tag-last-list li");
	var tagLastListLen = tagLastList.length;
	var researchTagLen = $("#research-tag li").length;
	if(tagLastListLen>researchTagLen){
		//2.如果大于页签数量：拿下拉框里面的所有值和页签所有值比较，如果下拉框中存在而页签不存在则获取该下拉内容
		var T_Id = getResearchTag();
		var TagName = $("#"+T_Id+"-list-casually").text();
		//3.页签ul中长度 - 即将消失的页签长度 + 即将出来的页签长度 与 ul最大宽度比较
		resTag.style.width="auto";
    	//选项卡标签添加位置
		var TagId = T_Id+"-tag-casually";
		$(".research-tag").append("<li id='"+TagId+"' ondblclick='tabLableClose(this,\"li\")' >" + TagName + "<i onclick='tabLableClose(this)'></i></li>");
		//如果菜单名中包含半角字符，则长度 +1
		if(TagName.match(/[\u0000-\u00ff]/g) != null){
			var TagIdWidth = $('#'+TagId).width()+1;
			$('#'+TagId).remove();
			$(".research-tag").append("<li id='"+TagId+"' ondblclick='tabLableClose(this,\"li\")' style='width:"+TagIdWidth+"px' >" + TagName + "<i onclick='tabLableClose(this)'></i></li>");
		}
		
		$(".research-tag-home li").removeClass("current");//清楚首页选中样式
		reHomeIfr.style.display="none";//清楚首页iframe内容
		//选项卡标签外围的宽度
		resTagLi=$('#'+TagId).outerWidth()+1;
		$('#'+TagId).attr('value',resTagLi);
		var ulLen = resSum+resTagLi;
		
		if(ulLen < reTagAll){
			resSum = ulLen;
			resTag.style.width=resSum+"px";
			//右侧标签首页菜单宽度+下拉标签定位左间距
			var reTagHomeOW=$(".research-tag-home").outerWidth();
			var reSumTagHome=resSum+reTagHomeOW;
			$(".research-tag-last").css({"left":reSumTagHome});
		}else{
			$("#"+TagId).remove();
			resTag.style.width=resSum+"px";
		}
	}
}

/**
 * 获取关闭标签后即将从下拉列表中出来的标签ID
 * @param tagLastList
 * @param researchTagLiId
 * @returns
 */
function getResearchTag(){
	var ret = "";
	//上面的标签
	var tagLis = $("#research-tag li");
	var tagLiIds = new Array();
	//循环上面的标签
	tagLis.each(function(){
		//上面的标签ID
		tagLiIds.push($(this).attr("id").replace("-tag-casually",""));
	});
	//下拉里面的标签
	var listLis = $("#tag-last-list-all .tag-last-list li");
	//循环下拉里面的标签
	listLis.each(function(){
		//下拉里面的标签ID
		var listLiId = $(this).attr("id").replace("-list-casually","");
		if(listLiId && tagLiIds.indexOf(listLiId) == -1){
			ret = listLiId;
			return false;
		}
	});
	return ret;
}

//点击收藏按钮添加到收藏列表
function getMousePos(event) {
    var e = event || window.event;
    return {'x':e.clientX,'y':e.clientY};
}

//点击菜单中图标，加入收藏
function collectEm(node,event){
	//冒泡清除
	if(document.all){//只有ie识别
		event.cancelBubble=true;
	}else{
		event.stopPropagation();
	}
	var collectionLen = $("#research-use-tab-list-collection li").length;
	if(collectionLen>14){
		pubShowMask("alert","最多添加15个收藏的菜单，谢谢");
		return;
	}
    var reAnima=document.getElementById("research-animation");
    reAnima.innerHTML=$(node).parent().text();
    var reLiPaddingLeft = $(node).parent().css('padding-left');
    $(node).toggleClass("current");
    var emH=$(window).height();
    var emY=getMousePos(event).y;
    var emHY=emH-emY;
    if($(node).is(".current")){
        reAnima.style.bottom=emHY+"px";
        reAnima.style.paddingLeft=reLiPaddingLeft;
        reAnima.style.display="block";
        $(".research-animation").css({"animation":"researchslide .4s linear","-webkit-animation":"researchslide .4s linear","animation-fill-mode":"forwards","-webkit-animation-fill-mode":"forwards"});
        var reKeyframes = document.getElementById("rekeyframes");
        if(navigator.userAgent.indexOf("MSIE 8.0") == -1 && navigator.userAgent.indexOf("MSIE 9.0") == -1){/*判断不是IE8&&IE9执行*/
        	if($(".research-menu").is(".research-menu-left")){
                reAnima.style.left="43px";
                reKeyframes.innerHTML ='@-ms-keyframes researchslide{29%{bottom:'+emHY+'px;left:43px;width:100%;height:26px;transform:scale(1.6,1.6);opacity:.4;}30%{left:43px;opacity:.4;transform:scale(1,1);}31%{left:43px;opacity:.4;transform:scale(1,1);}90%{left:43px;opacity:.8;background:#ffa400;}100%{width:20px;height:20px;bottom:50px;left:18px;transform:scale(1,1);opacity:0;background:#ffa400;}}\n' + '@-o-keyframes researchslide{29%{bottom:'+emHY+'px;left:43px;width:100%;height:26px;transform:scale(1.6,1.6);opacity:.4;}30%{left:43px;opacity:.4;transform:scale(1,1);}31%{left:43px;opacity:.4;transform:scale(1,1);}90%{left:43px;opacity:.8;background:#ffa400;}100%{width:20px;height:20px;bottom:50px;left:18px;transform:scale(1,1);opacity:0;background:#ffa400;}}\n' + '@-moz-keyframes researchslide{29%{bottom:'+emHY+'px;left:43px;width:100%;height:26px;transform:scale(1.6,1.6);opacity:.4;}30%{left:43px;opacity:.4;transform:scale(1,1);}31%{left:43px;opacity:.4;transform:scale(1,1);}90%{left:43px;opacity:.8;background:#ffa400;}100%{width:20px;height:20px;bottom:50px;left:18px;transform:scale(1,1);opacity:0;background:#ffa400;}}\n' + '@-webkit-keyframes researchslide{29%{bottom:'+emHY+'px;left:43px;width:100%;height:26px;transform:scale(1.6,1.6);opacity:.4;}30%{left:43px;opacity:.4;transform:scale(1,1);}31%{left:43px;opacity:.4;transform:scale(1,1);}90%{left:43px;opacity:.8;background:#ffa400;}100%{width:20px;height:20px;bottom:50px;left:18px;transform:scale(1,1);opacity:0;background:#ffa400;}}\n' + '@keyframes researchslide {29%{bottom:'+emHY+'px;left:43px;width:100%;height:26px;transform:scale(1.6,1.6);opacity:.4;}30%{left:43px;opacity:.4;transform:scale(1,1);}31%{left:43px;opacity:.4;transform:scale(1,1);}90%{left:43px;opacity:.8;background:#ffa400;}100%{width:20px;height:20px;bottom:50px;left:18px;transform:scale(1,1);opacity:0;background:#ffa400;}}';
            }else{
                reAnima.style.right="0px";
                reKeyframes.innerHTML ='@-ms-keyframes researchslide{29%{bottom:'+emHY+'px;right:0;width:100%;height:26px;transform:scale(1.6,1.6);opacity:.4;}30%{opacity:.4;transform:scale(1,1);}31%{opacity:.4;transform:scale(1,1);}90%{opacity:.8;background:#ffa400;}100%{width:20px;height:20px;bottom:5px;right:18px;transform:scale(1,1);opacity:0;background:#ffa400;}}\n' + '@-o-keyframes researchslide{29%{bottom:'+emHY+'px;right:0;width:100%;height:26px;transform:scale(1.6,1.6);opacity:.4;}30%{opacity:.4;transform:scale(1,1);}31%{opacity:.4;transform:scale(1,1);}90%{opacity:.8;background:#ffa400;}100%{width:20px;height:20px;bottom:5px;right:18px;transform:scale(1,1);opacity:0;background:#ffa400;}}\n' + '@-moz-keyframes researchslide{29%{bottom:'+emHY+'px;right:0;width:100%;height:26px;transform:scale(1.6,1.6);opacity:.4;}30%{opacity:.4;transform:scale(1,1);}31%{opacity:.4;transform:scale(1,1);}90%{opacity:.8;background:#ffa400;}100%{width:20px;height:20px;bottom:5px;right:18px;transform:scale(1,1);opacity:0;background:#ffa400;}}\n' + '@-webkit-keyframes researchslide{29%{bottom:'+emHY+'px;right:0;width:100%;height:26px;transform:scale(1.6,1.6);opacity:.4;}30%{opacity:.4;transform:scale(1,1);}31%{opacity:.4;transform:scale(1,1);}90%{opacity:.8;background:#ffa400;}100%{width:20px;height:20px;bottom:5px;right:18px;transform:scale(1,1);opacity:0;background:#ffa400;}}\n' + '@keyframes researchslide {29%{bottom:'+emHY+'px;right:0;width:100%;height:26px;transform:scale(1.6,1.6);opacity:.4;}30%{opacity:.4;transform:scale(1,1);}31%{opacity:.4;transform:scale(1,1);}90%{opacity:.8;background:#ffa400;}100%{width:20px;height:20px;bottom:5px;right:18px;transform:scale(1,1);opacity:0;background:#ffa400;}}';
            }
        	setTimeout(function(){
                $(".research-animation").removeAttr("style");
            },500);
        }else{/*判断是IE8&&IE9执行*/
        	$(".research-animation").removeAttr("style");
        }
    }
    /*----------以上为页面效果，下面的方法为真正添加/删除收藏后台处理----------*/
   
    var isCurrent = $(node).is(".current");
    if(isCurrent == true){//当前收藏未选中，需要添加收藏
    	 addCollectionInfo(node);
    }else{//当前收藏已选中，需要删除收藏
    	 delCollectionInfo(node,true);
    }
}

/**
 * 添加收藏后台处理
 */
function addCollectionInfo(node){
	var menuNo = trim($(node).parent().attr("id"));
	var menuName = trim($(node).parent().text());
	var menuUrl = masterMenuData[menuNo].url;
	var urlFlag = masterMenuData[menuNo].systemFlag;
	if(menuNo != ""){
		$.ajax({
			type : "post",
			url : "SCollection/addCollection.asp",
			data : {
				resourceId		: menuNo,
				resourceName	: menuName,
				resourceUrl		: menuUrl,
				resourceFlag	: urlFlag
			},
			dataType : "json",
			success : function(data) {
				var menuPath = "";
				if(data && data.result == "true"){
					menuPath = data.path;
				}
				menuUrl =trim(getMenuUrl(menuUrl,urlFlag,menuNo));
				assemblyCollectionData(menuNo,menuName,menuUrl,menuPath);
				$("#"+menuNo+"-cet-casually").hover(function(){
					$(this).find("em").toggle();
				});
			},
			error : function() {
				pubShowMask("alert","添加收藏的菜单失败");
			}
		});
	}else{
		pubShowMask("alert","未获取到需要收藏的菜单");
	}
}

/**
 * 初始化收藏列表数据
 */
function initCollectionList(){
	$.ajax({
		type : "post",
		url : "SCollection/queryCollection.asp",
		dataType : "json",
		success : function(data) {
			if(data != undefined && data != null){
				//装载收藏菜单列表数据;
				for(var i=0;i<data.json.length;i++){
					collectionData[data.json[i].resourceId] = data.json[i];
					var menuNo = data.json[i].resourceId;
					var menuName = data.json[i].resourceName;
					var menuUrl = data.json[i].resourceUrl;
					var menuPath = data.json[i].resourcePath;
					var urlFlag = data.json[i].resourceFlag;
					menuUrl =trim(getMenuUrl(menuUrl,urlFlag,menuNo));
					assemblyCollectionData(menuNo,menuName,menuUrl,menuPath);
				}
			}
			//初始化用户默认系统配置
			initUserDefaultConfig();
		},
		error : function() {
			//初始化用户默认系统配置
			initUserDefaultConfig();
		}
	});
}


/**
 * 组装收藏列表HTML数据
 * @param menuNo 菜单编号
 * @param menuName 菜单名称
 * @param menuUrl 菜单url
 * @param menuPath 菜单路径
 */
function assemblyCollectionData(menuNo,menuName,menuUrl,menuPath){
	if(!menuPath) menuPath = "";
	$("#research-collection").append("<li title='"+menuPath+"' id='"+menuNo+"-cet-casually' ><span>"+menuName+"</span><em></em></li>");
	
	$("#"+menuNo+"-cet-casually").click(function(){
		openTabStrip(menuNo,menuName,menuUrl);
	});
	$("#"+menuNo+"-cet-casually em").click(function(event){
		//冒泡清除
		if(document.all){//只有ie识别
			event.cancelBubble=true;
		}else{
			event.stopPropagation();
		}
	    var listmovePar=$(this).parent();
	    listmovePar.css({"-moz-animation":"listmove .2s ease-out","-o-animation":"listmove .2s ease-out","-webkit-animation":"listmove .2s ease-out","animation":"listmove .2s ease-out","-moz-animation-fill-mode":"forwards","-o-animation-fill-mode":"forwards","-webkit-animation-fill-mode":"forwards","animation-fill-mode":"forwards"});
	    setTimeout(listmoveRe(listmovePar),300);
	    if($("#"+menuNo).find("em")){
	    	$("#"+menuNo).find("em").removeClass("current");	    	
	    }
	    delCollectionInfo(this);
	});
}


/**
 * 删除收藏
 * @param node
 */
function delCollectionInfo(node,flag,event){
	event = event || window.event;
	//冒泡清除
	if(document.all){//只有ie识别
		event.cancelBubble=true;
	}else{
		event.stopPropagation();
	}
	var menuNo = trim($(node).parent().attr("id"));
	menuNo = menuNo.replace("-cet-casually","");
	if(flag){
		$("#"+menuNo+"-cet-casually").remove();		
	}
	if(menuNo != ""){
		$.ajax({
			type : "post",
			url : "SCollection/delCollection.asp",
			data : {
				resourceId	: menuNo
			},
			dataType : "json",
			success : function(msg) {
				
			}
		});
	}else{
		pubShowMask("alert","未获取到需要删除收藏的菜单");
	}
}

//删除我的收藏动画效果
//$(".research-single .research-use-tab-list ul li em").click(function(event){
//	event.stopPropagation();
//    var listmovePar=$(this).parent();
//    listmovePar.css({"animation":"listmove .3s ease-out","-webkit-animation":"listmove .3s ease-out","animation-fill-mode":"forwards","-webkit-animation-fill-mode":"forwards"});
//    setTimeout(listmoveRe(listmovePar),300);
//});

function listmove(listname){
    listname.remove();
};
function listmoveRe(listname)
{
    return function()
    {
        listmove(listname); 
    };
};

/**
 * 添加最近访问次数
 */
function addRecentVisit(t_menu_no,t_menu_name,t_url){
	var supportUserVal = getCookie("supportUser");
	if(supportUserVal && supportUserVal == "true"){
		return;
	}
	var data = getSystemFlagByUrl(t_url);
	var system_flag = data.systemFlag;
	t_url = data.t_url;
	$.ajax({
		type : "post",
		url : "SRecentVisit/saveSRecentVisit.asp",
		dataType : "json",
		data : {
			resourceId : t_menu_no,
			resourceName : t_menu_name,
			resourceUrl  : t_url,
			resourceFlag : system_flag
		},
		success : function(data) {
			initRecentVisit();
		},
		error : function() {
			
		}
	});
}

/**
 * 通过URL返回当前系统标示
 * @param t_url
 * @returns {___anonymous31447_31483}
 */
function getSystemFlagByUrl(t_url){
	var data = {"systemFlag":"YUSYS","t_url":t_url};
	if(t_url && t_url.indexOf("ycoms/") != -1 
			&& t_url.indexOf("EMP_SID") != -1 && t_url.indexOf("menuId") != -1){
		var startNum = t_url.indexOf("ycoms/")+6;
		var endNum = t_url.indexOf("EMP_SID")-1;
		t_url = t_url.substring(startNum,endNum);
		data.systemFlag = "YCOMS";
		data.t_url = t_url;
	}
	if(t_url && t_url.indexOf("yusys/") != -1 && t_url.indexOf(".asp") != -1
			&& t_url.indexOf("EMP_SID") == -1 && t_url.indexOf(".do")  == -1){
		var startNum = t_url.indexOf("yusys/")+6;
		t_url = t_url.substring(startNum);
		data.systemFlag = "YUSYS";
		data.t_url = t_url;
	}
	return data;
}

/**
 * 初始化当前用户最近访问列表
 */
function initRecentVisit(){
	$.ajax({
		type : "post",
		url : "SRecentVisit/queryAllSRecentVisit.asp",
		dataType : "json",
		success : function(data) {
			if(data != undefined && data != null){
				$("#research-recent-visit").empty();
				var recentLen = data.json.length;
				recentLen = recentLen>15?15:recentLen;
				//装载最近访问列表数据;
				for(var i=0;i<recentLen;i++){
					recentVisitData[data.json[i].resourceId] = data.json[i];
					var menuNo = data.json[i].resourceId;
					var menuName = data.json[i].resourceName;
					var menuUrl = data.json[i].resourceUrl;
					var menuPath = data.json[i].resourcePath;
					var urlFlag = data.json[i].resourceFlag;
					menuUrl =trim(getMenuUrl(menuUrl,urlFlag,menuNo));
					assemblyRecentVisitData(menuNo,menuName,menuUrl,menuPath);
				}
			}
		}
	});
}

/**
 * 组装最近收藏列表数据
 */
function assemblyRecentVisitData(menuNo,menuName,menuUrl,menuPath){
	if(!menuPath) menuPath = "";
	$("#research-recent-visit").append("<li title='"+menuPath+"' id='"+menuNo+"-recent-casually' >"+menuName+"</li>");
	
	$("#"+menuNo+"-recent-casually").click(function(){
		openTabStrip(menuNo,menuName,menuUrl);
	});
}

/**
 * 初始化当前用户经常访问列表
 */
function initOftenVisit(){
	$.ajax({
		type : "post",
		url : "SOftenVisit/querySOftenVisitListByUser.asp",
		dataType : "json",
		success : function(data) {
			if(data != undefined && data != null){
				$("#research-often-visit").empty();
				var oftenLen = data.json.length;
				oftenLen = oftenLen>15?15:oftenLen;
				//装载经常访问列表数据;
				for(var i=0;i<oftenLen;i++){
					oftenVisitData[data.json[i].resourceId] = data.json[i];
					var menuNo = data.json[i].resourceId;
					var menuName = data.json[i].resourceName;
					var menuUrl = data.json[i].resourceUrl;
					var menuPath = data.json[i].resourcePath;
					var urlFlag = data.json[i].resourceFlag;
					menuUrl =trim(getMenuUrl(menuUrl,urlFlag,menuNo));
					assemblyOftenVisitData(menuNo,menuName,menuUrl,menuPath);
				}
			}
		}
	});
}

/**
 * 组装经常访问列表
 */
function assemblyOftenVisitData(menuNo,menuName,menuUrl,menuPath){
	if(!menuPath) menuPath = "";
	$("#research-often-visit").append("<li title='"+menuPath+"' id='"+menuNo+"-often-casually' >"+menuName+"</li>");
	
	$("#"+menuNo+"-often-casually").click(function(){
		openTabStrip(menuNo,menuName,menuUrl);
	});
}

/**
 * 添加经常访问次数
 */
function addOftenVisit(t_menu_no,t_menu_name,t_url){
	var supportUserVal = getCookie("supportUser");
	if(supportUserVal && supportUserVal == "true"){
		return;
	}
	var data = getSystemFlagByUrl(t_url);
	var system_flag = data.systemFlag;
	t_url = data.t_url;
	$.ajax({
		type : "post",
		url : "SOftenVisit/saveSOftenVisit.asp",
		dataType : "json",
		data : {
			resourceId : t_menu_no,
			resourceName : t_menu_name,
			resourceUrl : t_url,
			resourceFlag : system_flag
		},
		success : function(data) {
			initOftenVisit();
		}
	});
};


/**
 * 获取资源管理系SESSIONID
 */
function getSessionId(){
	/*var param1 = $("#yusys_system_param1").val();
	var param2 = $("#yusys_system_param2").val();
	var param = "param1="+param1+"&param2="+param2;*/
	var param = $("#yusysSystemParam1").val();
	if(!param){
		return;
	}
	var url = contextPathYcoms+"yusysGetSessionId.do?nocache="+new Date().getTime()+"&param="+param;
	$.ajax({
		type:"post",
		url: url,
		dataType:"json",
		success:function(data){
			if(data != undefined && data != null && data.result == true){
				empSessionId = data.EMP_SID;
				setTimeout("checkSessionId()",900000);
				//查询工作台待办数据
				queryWorkToDoInterfaceData();
				//绑定个人信息配置按钮
				initUserInfoConfig();
				//初始化当前用户收藏列表
				initCollectionList();
				//初始化当前用户最近访问列表
				initRecentVisit();
				//初始化当前用户经常访问列表
				initOftenVisit();
			}else{
				pubShowMask("alert",data.message);
			}
		}
	});
}

/**
 * 校验SESSIONID是否存活
 */
function checkSessionId(){
	var param = "nocache="+new Date().getTime()+"&EMP_SID="+empSessionId;
	var url = contextPathYcoms+"yusysCheckSessionId.do?"+param;
	$.ajax({
		type:"post",
		url: url,
		dataType:"json",
		success:function(data){
			setTimeout("checkSessionId()",900000);			
		},
		error:function(){
			getSessionId();
		}
	});
}

/**
 * 初始化用户默认系统配置
 */
function initUserDefaultConfig(){
	$.ajax({
		type : "post",
		url : "SDefaultShow/getDefaultShowByUser.asp",
		dataType : "json",
		success : function(data) {
			if(data != undefined && data != null){
				var systemContent = $("#research-content > div").eq(0);//应用内容区
				var todoContent = $("#research-content > div").eq(1);//待办提醒内容区
				var collectionContent = $("#research-content > div").eq(2);//收藏内容区
				var systemMenu = $("#research-system-tab ul li").eq(0);//应用菜单
				var todoMenu = $("#research-system-tab ul li").eq(1);//待办提醒菜单
				var collectionMenu = $("#research-system-tab ul li").eq(2);//收藏菜单
				//默认展示功能（system：系统，todo：待办，collection：收藏）
				var defaultFunction = data.defaultFunction;
				if(defaultFunction == "todo"){
					todoMenu.addClass("current");
					todoContent.addClass("open");
					$("#default-show-function > li[value='todo']").addClass("info-current");
				}
				else if(defaultFunction == "collection"){
					collectionMenu.addClass("current");
					collectionContent.addClass("open");
					$("#default-show-function > li[value='collection']").addClass("info-current");
				}else{
					systemMenu.addClass("current");
					systemContent.addClass("open");
					$("#default-show-function > li[value='system']").addClass("info-current");
				}
				//初始化系统功能菜单
				defaultShowData.systemNo = data.defaultStstem;
				initUserFunctionPermission(data.defaultStstem,data.defaultStstemName);
				initSettingDefaultSystem(defaultShowData);
			}else{
				pubShowMask("alert","用户默认系统配置错误！");
				userLogout();
			}
		}
	});
}

/******************************************工作台JS start*****************************************/


/**
 * 查询资源管理系统实时查询待办接口
 */
function queryWorkToDoInterfaceData(){
	$.ajax({
		type:"post",
		url:contextPathYcoms+"interLatestAwokeOp.do?action=my_await&EMP_SID="+empSessionId,
		dataType:"json",
		success:function(data){
			if(data != undefined && data != null && data.result == "true"){
				queryWorkToDoRemindCountNum();
			}else{
				$("#tab-b-todo").html("");
				$("#work_todo_remind").html("<div style='padding-left:21px;'>查询待办数据失败</div>");
				//如果当前页面为待办页面，则需要清空数据
				clearWorkToDoWorkSpacePage();
			}
		},
		error:function(){
			$("#tab-b-todo").html("");
			$("#work_todo_remind").html("<div style='padding-left:21px;'>查询待办数据异常</div>");
			//如果当前页面为待办页面，则需要清空数据
			clearWorkToDoWorkSpacePage();
		}
	});
};

/**
 * 查询待办菜单及数据并绑定待办菜单点击事件
 */
function queryWorkTodoMenuAndData(){
	$.ajax({
		type : "post",
		url : "MyWorkTree/queryWorkTreeMenu.asp",
		dataType : "json",
		success : function(data) {
			if(data != undefined && data != null){
				if(data.total != undefined && data.total > 0){
					//组装待办菜单数据
					AssemblyWorkToDoDataMenu(data.rows);
				}else{
					$("#tab-b-todo").html("");
					$("#work_todo_remind").html("<div style='padding-left:21px;'>无待办数据</div>");
					//如果当前页面为待办页面，则需要清空数据
					clearWorkToDoWorkSpacePage();
				}
			}
		}
	});
};

/**
 * 组装待办菜单数据
 */
function AssemblyWorkToDoDataMenu(menuData){
	var workHtml = "";
	for(var i = 0;i<menuData.length;i++){
		var treeNum = menuData[i].treeNum;
		var countNum = menuData[i].countNum;
		var treeNumId = treeNum+"-todo-casually";
		var treeName = menuData[i].treeName;
		var url = "MyWorkTree/getPage.asp?pageModul=infoPage&treeNumId="+treeNumId+"&treeName="+treeName;
		workHtml += "<div class='research-first' id='"+treeNumId+"' " +
				" onclick='openTabStrip(\""+treeNumId+"\",\""+treeName+"\",\""+url+"\")' style='padding-left:15px;'><span>"+treeName+"</span><strong>"+countNum+"</strong></div>";
	}
	$("#work_todo_remind").empty();
	$("#work_todo_remind").html(workHtml);
};

/**
 * 如果当前待办列表数据如最新待办列表数据不匹配则刷新数据
 */
function refreshWorkMenuList(){
	var beforTreeNum;
	var beforCountNum;
	var afterTreeNum;
	var afterCountNum;
	for(var i=0;i<beforWorkToDoMenuList.length;i++){
		beforTreeNum = beforWorkToDoMenuList[i].treeNum;
		beforCountNum = beforWorkToDoMenuList[i].countNum;
		for(var j=0;j<afterWorkToDoMenuList.length;j++){
			afterTreeNum = afterWorkToDoMenuList[j].treeNum;
			afterCountNum = afterWorkToDoMenuList[j].countNum;
			if(beforTreeNum == afterTreeNum && beforCountNum != afterCountNum){
				var ifrObj = $("#"+afterTreeNum+"-todo-casually-ifr-casually");
				if(ifrObj.length>0 && ifrObj.is(".open")){
					ifrObj[0].contentWindow.initWorkToDoRemind();
				}
			}
		}
	}
};

/**
 * 查询待办汇总数
 */
function queryWorkToDoRemindCountNum(){
	var sender = getCookie("currentUserId");
	if(sender == null || sender == ""){
		$("#work_todo_remind").html("<div style='padding-left:21px;'>查询待办数据失败</div>");
		return;
	}
	$.ajax({
		type : "post",
		url : "CmsAffirmRemind/queryCountNumByUser.asp",
		data:{
			sender : sender
		},
		dataType : "json",
		success : function(data) {
			if(data != undefined && data != null && data.result != undefined && data.result == "true"){
				if(data.countNum != undefined && data.countNum > 0){
					$("#tab-b-todo").html("<i></i>");
					//查询待办菜单及数据并绑定待办菜单点击事件
					queryWorkTodoMenuAndData();
				}else{
					$("#tab-b-todo").html("");
					$("#work_todo_remind").html("<div style='padding-left:21px;'>无待办数据</div>");
					//如果当前页面为待办页面，则需要清空数据
					clearWorkToDoWorkSpacePage();
				}
			}else{
				$("#work_todo_remind").html("<div style='padding-left:21px;'>查询待办汇总数失败</div>");
			}
		}
	});
};

/**
 * 清空待办工作区数据
 */
function clearWorkToDoWorkSpacePage(){
	var $tabLi = $("#research-tag").find("li.current");
	if($tabLi){
		var tabLiIdVal = $tabLi.attr("id");
		if(tabLiIdVal && tabLiIdVal.indexOf("-todo-casually") != -1){
			tabLiIdVal = tabLiIdVal.replace("-tag-casually","");
			$("#"+tabLiIdVal+"-ifr-casually")[0].contentWindow.clearWorkToDoRemindData();
		}
	}
}

/**
 * 刷新工作台待办
 */
function refreshWorkToDoWorkSpacePage(){
	var $tabLi = $("#research-tag").find("li.current");
	if($tabLi){
		var tabLiIdVal = $tabLi.attr("id");
		if(tabLiIdVal && tabLiIdVal.indexOf("-todo-casually") != -1){
			tabLiIdVal = tabLiIdVal.replace("-tag-casually","");
			var ifrObj = $("#"+tabLiIdVal+"-ifr-casually");
			if(ifrObj && ifrObj.length>0 && ifrObj[0].contentWindow.initWorkToDoRemind){
				ifrObj[0].contentWindow.initWorkToDoRemind();
			}
		}
	}
};

/******************************************工作台JS end*****************************************/

/**
 * 初始化当前用户可以查看的系统
 */
function initUserSystemPermission(){
	$.ajax({
		type : "post",
		url : "SResource/getSystemListByUserNo.asp",
		dataType : "json",
		success : function(data) {
			if(data && data.total > 0){
				var jsonData = data.rows;
				var systemContent = $("#research-system-content ul");
				systemContent.empty();
				var systemHtml = "";
				var defaulShowSystemHtml = "";
				for(var i=0;i<jsonData.length;i++){
					systemHtml += "<li value='"+jsonData[i].url+"' name='"+jsonData[i].cnname+
									"' id='"+jsonData[i].resourceid+"' onclick='switchSystem(this)'>"+
									"<img src='images/system/"+jsonData[i].resourceid+".png' />"+
									jsonData[i].cnname+
								  "</li>";
					defaulShowSystemHtml += "<li value='"+jsonData[i].resourceid+"' " +
												" onclick='settingDefaultShow(\"system\",this)'>" +
												"<i></i>" +
												"<span>"+jsonData[i].cnname+"</span>" +
												"<img src='images/system/"+jsonData[i].resourceid+".png' />" +
											 "</li>";
				}
				$("#default-show-system").html(defaulShowSystemHtml);
				initSettingDefaultSystem(defaultShowData);
				systemContent.html(systemHtml);
				//默认展示系统hover事件
				$("#default-show-system > li").hover(function(){
					if($(this).is(".info-hover")){
						$(this).removeClass("info-hover");
					}else{
						$(this).addClass("info-hover");
					}
				});
			}
			ResearchSystem();//系统菜单
		}
	});
}

/**
 * 设置默认系统
 * @param data
 */
function initSettingDefaultSystem(data){
	if(data && data.systemNo){
		$("#default-show-system > li[value='"+data.systemNo+"']").addClass("info-current");
	}
};

/**
 * 初始化用户菜单权限
 * @param defaultStstem 默认系统标示
 * @param defaultStstem 默认系统标示名称
 */
function initUserFunctionPermission(defaultStstem,defaultStstemName){
	$.ajax({
		type : "post",
		url : "SResource/getMenuListByParam.asp",
		dataType : "json",
		data : {
			resourceid : defaultStstem
		},
		success : function(data) {
			if(data && data.total > 0){
				var jsonData = data.rows;
				var isHavePermission = false;
				menuHtml = "";
				$(".research-menu-title span").html(defaultStstemName);
				for(var i = 0; i <jsonData.length;i++){
					if(jsonData[i].parentid == null){
						isHavePermission = true;
						recursion(jsonData[i].children,jsonData[i].resourceid);
						//滚动条
//						if(!$("#menu_tree .mCSB_container").attr("id")){
//							$("#menu_tree").empty();
//							$("#menu_tree").html(menuHtml);
//						}else{
//							$("#menu_tree .mCSB_container").empty();
//							$("#menu_tree .mCSB_container").html(menuHtml);
//							$("#menu_tree").mCustomScrollbar("update");
//						}
						
						$("#menu_tree").empty();
						$("#menu_tree").html(menuHtml);
						
						//菜单中收藏图标显示/隐藏事件
						$(".research-single ul li").mouseover(function(){
						    $(this).find("em").show();
						});
						$(".research-single ul li").mouseout(function(){
						    $(this).find("em").hide();
						});
						$(".research-first").mouseover(function(){
						    $(this).find("em").show();
						});
						$(".research-first").mouseout(function(){
						    $(this).find("em").hide();
						});
						//菜单箭头展开事件
						$(".research-first").click(function(){
							$(this).next(".research-second").slideToggle("fast",function(){
								$(this).prev().is(".research-i") ? $(this).prev().removeClass("research-i") : $(this).prev().addClass("research-i");
								memuListMaxWidth = 0;
								var maxWidth = getMaxWidth($("#menu_tree"));
								if(maxWidth <= 250){
									$("#menu_tree").children().width("auto");
									$("#menu_tree em").css("right",0);
								}else{
									$("#menu_tree").children().width(memuListMaxWidth);
									menuTreeScroll();
								}
							});
						});
					}
				}
				if(!isHavePermission){
					pubShowMask("alert","您没有设置默认展示系统操作，请点击右上角“设置”图标进行设置");
				}
			}else{
				pubShowMask("alert","您没有设置默认展示系统操作，请点击右上角“设置”图标进行设置");
			}
		}
	});
};

/**
 * 初始化菜单横向滚动条事件
 */
function initMenuTreeScroll(){
	$("#menu_tree").scroll(function(){
		menuTreeScroll();
	});
};

/**
 * 菜单横向滚动条事件
 */
function menuTreeScroll(){
	var leftWidth = $("#menu_tree").scrollLeft();
	var emRightWidth = memuListMaxWidth-250-leftWidth;
	emRightWidth = emRightWidth<0?0:emRightWidth;
	$("#menu_tree em").css("right",emRightWidth);
};

/**
 * 获取当前展开菜单的最大宽度
 * @param parentNode 父级菜单节点
 * @returns {Number} 最大宽度值
 */
function getMaxWidth(parentNode){
	parentNode.children().each(function(){
		var currentWidth = 0;
		var $this = $(this);
		if($this.is(".research-first")){
			var spanWidth = $this.find("span").width();
			var leftWidth = $this.css("paddingLeft");
			leftWidth = parseInt(leftWidth);
			currentWidth = spanWidth + leftWidth;
			var iNode = $this.find("i");
			if(iNode){
				currentWidth += iNode.outerWidth(true);
			}
			if(currentWidth>memuListMaxWidth){
				memuListMaxWidth = currentWidth;
			}
		}else if($this.is(".research-second")){
			if($this.css("display") != "none"){
				getMaxWidth($(this));
			}
		}else{
			var leftWidth = $this.find("li").css("paddingLeft");
			leftWidth = parseInt(leftWidth);
			var spanWidth = $this.find("span").width();
			currentWidth = leftWidth + spanWidth;
			if(currentWidth>memuListMaxWidth){
				memuListMaxWidth = currentWidth;
			}
		}
	});
	return memuListMaxWidth;
};

/**
 * 组装菜单树
 */
var parentNum = 0;
function recursion(permissionData,parent_menu_no){
	for(var i=0;i<permissionData.length;i++){
		parentNum = 0;
		masterMenuData[permissionData[i].resourceid] = permissionData[i];
		if(permissionData[i].children == null){
			var current = '';
			//如果该菜单已经选择收藏则图标显示
			if(collectionData[permissionData[i].resourceid]){
				if(collectionData[permissionData[i].resourceid].resourceId == permissionData[i].resourceid){
					current = 'class="current"';
				}
			}
			if(permissionData[i].parentid == parent_menu_no){
				menuHtml+='<div class="research-first" id="'+permissionData[i].resourceid+
				'" onclick="openTabPage(\''+permissionData[i].resourceid+'\')" style="padding-left:21px;">'+
				'<span>'+permissionData[i].cnname+'</span><em '+current+' onclick="collectEm(this,event)"></em></div>';				
			}else{
				var paddingLeft = getParentNum(permissionData[i]);
				paddingLeft = 46+12*(paddingLeft-2);
				var styleLeft = 'style="padding-left:'+paddingLeft+'px"';
				if(paddingLeft == 34) styleLeft = '';
				menuHtml+='<ul><li id="'+permissionData[i].resourceid+
						'" onclick="openTabPage(\''+permissionData[i].resourceid+'\')" '+styleLeft+'>'+
						'<span>'+permissionData[i].cnname+'</span><em '+current+' onclick="collectEm(this,event)"></em></li></ul>';
			}
		}else{
			var paddingLeft = getPaddingLeftNum(permissionData[i],parent_menu_no);
			menuHtml+='<div class="research-first" id="'+permissionData[i].resourceid+
			'" style="padding-left:'+paddingLeft+'px;" ><i></i><span>'+permissionData[i].cnname+'</span></div>';
			menuHtml+='<div class="research-second">';
			recursion(permissionData[i].children,parent_menu_no);
			menuHtml+='</div>';
		}
	}
}

/**
 * 计算菜单向左浮动像素
 * @param permissionData
 * @param parent_menu_no
 * @returns
 */
function getPaddingLeftNum(permissionData,parent_menu_no){
	if(permissionData.parentid == parent_menu_no){
		return 0;
	}else if(masterMenuData[permissionData.parentid].parentid == parent_menu_no){
		return 13;
	}else{
		var num = getParentNum(permissionData);
		num = 13+(num-1)*12;
		return num;
	}
}

/**
 * 获取父级层级数
 * @param permissionData
 * @returns {Number}
 */
function getParentNum(permissionData){
	var data = masterMenuData[permissionData.parentid];
	if(data != undefined){
		parentNum++;
		getParentNum(data);
	}
	return parentNum;
}

/**
 * 打开页签
 * @param menu_no
 */
function openTabPage(menu_no){
	var menuNo = "";
	var menuName = "";
	var menuUrl = "";
	var data = masterMenuData[menu_no];
	if(data){
		menuNo = menu_no;
		menuName = data.cnname;
		menuUrl = getMenuUrl(data.url,data.systemFlag,menuNo);
	}
    menuNo = menu_no;
	// var ip = "158.222.65.163";
    var ip = "127.0.0.1";
	if(menu_no=="collectData"){
        menuUrl = getMenuUrl("http://"+ip+":8090/fileup.html","1","1");
	}else if(menu_no=="pies"){
        menuUrl = getMenuUrl("http://"+ip+":8090/manager.html","1","1");
        menuName = "图表";
	}else if(menu_no.indexOf("files") != -1){
        var a = menu_no.split('|');
        menuNo = "files"
        menuUrl = getMenuUrl("http://"+ip+":8090/import.html?name="+a[1]+"&postid="+a[2],"1","1");
        menuName = "文件";
	}else if(menu_no.indexOf("multifile") != -1){
        var a = menu_no.split('|');
        menuNo = "files"
        menuUrl = getMenuUrl("http://"+ip+":8090/files.html?name="+a[1]+"&postid="+a[2],"1","1");
        menuName = "详设" +
			"";
	}else{
        menuUrl = getMenuUrl("http://"+ip+":8090/fileup.html","1","1");
        menuName = "数据源上传";
	}


	openTabStrip(menuNo,menuName,menuUrl);
}

/**
 * 超级用户收集数据
 */
function getResource(data) {
    var type = prompt("请问要收集哪一种xml?");
    if(type){
        if(data == "dataxml"){
           var a = document.createElement('a');
           a.href = "/data/xml?type="+type;
           a.download= type+".xml";
           a.click();
        }
	}else{
    	alert("没有该类型");
	}

}
/**
 * 根据菜单编号获取当前菜单URL
 * @param menu_url 菜单url
 * @param system_flag 菜单标示
 * @param menu_no 菜单ID
 */
function getMenuUrl(menu_url,system_flag,menu_no){
	if(menu_url == undefined || menu_url == "") return "";
	if(system_flag == "YCOMS"){
		if(menu_url.indexOf("?") != -1 && menu_url.indexOf("=") != -1){
			menu_url = contextPathYcoms+menu_url+"&EMP_SID="+empSessionId+"&menuId="+menu_no;			
		}else if(menu_url.indexOf("?") != -1 && menu_url.indexOf("=") == -1){
			menu_url = contextPathYcoms+menu_url+"EMP_SID="+empSessionId+"&menuId="+menu_no;
		}else{
			menu_url = contextPathYcoms+menu_url+"?EMP_SID="+empSessionId+"&menuId="+menu_no;
		}
	}else if(system_flag == "YXAPPROVAL"){
		menu_url = contextPathYxapproval+"/"+menu_url+"?stringKey="+stringKey;
	}else{
		menu_url = menu_url;
	}
	return menu_url;
}

//点击除了工作区域的其他位置弹出窗口消失--调用
$(document).bind("click",function(e){
	cleanDom(e);
});



/**************************************** 搜索功能JS start ****************************************************/

var searchData = [];
var outFlag = true;
var oldValText = "";
//实现搜索输入框的输入提示js类
function oSearchSuggest(searchFuc){
	var input = $('#gover_search_key');
	var suggestWrap = $('#gov_search_suggest');
//	var hideSuggest = function(){
//		suggestWrap.hide();
//	};
	
	//发送请求，根据关键字到后台查询
	var sendKeyWord = function(event){
		//键盘选择下拉项 38:↑ 40:↓
		if(suggestWrap.css('display')=='block'&&event.keyCode == 38||event.keyCode == 40||event.keyCode == 13){
			var current = suggestWrap.find('li.search-hover');
			var parent=$(".research-search-list");
			var last = suggestWrap.find('li:last');
			var first = suggestWrap.find('li:first');
			var suggestWrapHeight = suggestWrap.css("height");
			suggestWrapHeight = parseInt(suggestWrapHeight);
			if(event.keyCode == 38){
				if(current.length>0){
					var prevLi = current.removeClass('search-hover').prev();
					if(prevLi.length>0){
						prevLi.addClass('search-hover');
						parent[0].scrollTop-=parseInt(prevLi.outerHeight());
					}else{
						last.addClass('search-hover');
						parent[0].scrollTop=getSearchLiHeight(last);
					}
				}else{
					last.addClass('search-hover');
					parent[0].scrollTop=getSearchLiHeight(last);
				}				
			}else if(event.keyCode == 40){
				if(current.length>0){
					var nextLi = current.removeClass('search-hover').next();					
					if(nextLi.length>0){
						nextLi.addClass('search-hover');
						var liHeight = getSearchLiHeight(nextLi);
						if(liHeight>suggestWrapHeight){
							parent[0].scrollTop+=parseInt(nextLi.outerHeight());
						}
					}else{
						first.addClass('search-hover');
						parent[0].scrollTop=0;
					}
				}else{
					first.addClass('search-hover');
				}
			}else if(event.keyCode == 13){
				if(current.length>0){
					$(".research-losea").removeClass("research-input");
					searchOpenTab(current);
				}
			}
			
		//输入字符
		}else{ 
			var valText = $.trim(input.val());
			if(valText ==''||valText==undefined){
				oldValText = "";
				suggestWrap.hide();
			    $(".research-losea").removeClass("research-input");
				return;
			}
			checkSearchContentFlash(valText);
			searchFuc(valText);
		}			
		
	};
	
	var init = function(){
		input.keyup(sendKeyWord);
		input.focus(sendKeyWord);
//		input.blur(function(){setTimeout(hideSuggest,100);});
	};
	
	//请求返回后，执行数据展示
	this.dataDisplay = function(data){
		//往搜索框下拉建议显示栏中添加条目并显示
		var li = "";
		suggestWrap.find('ul').html('');
		searchData = [];
		for(var i=0; i<data.length; i++){
			searchData[data[i].resourceid] = data[i];
			li += '<li id="'+data[i].resourceid+'" onclick="searchOpenTab(this)" ><h2>'+data[i].cnname+'</h2><span>'+data[i].menuPath+'</span></li>';
		}
		suggestWrap.find('ul').append(li);
		suggestWrap.find('ul').addClass("open");
		$(".research-losea").addClass("research-input");
		suggestWrap.show();
		//为下拉选项绑定鼠标事件
		suggestWrap.find('li').hover(function(){
				suggestWrap.find('li').removeClass('search-hover');
				$(this).addClass('search-hover');
		
			},function(){
				$(this).removeClass('search-hover');
		});
	};
	init();
};

//实例化输入提示的JS,参数为进行查询操作时要调用的函数名
var searchSuggest = new oSearchSuggest(sendKeyWordToBack);

//这是一个模似函数，实现向后台发送ajax查询请求，并返回一个查询结果数据，传递给前台的JS,再由前台JS来展示数据。
//参数为一个字符串，是搜索输入框中当前的内容
function sendKeyWordToBack(keyword){
	  var obj = {"cnname" : keyword};
	  $.ajax({
		   type: "POST",
		   url: "SResource/getMenuListByName.asp",
		   data: obj,
		   dataType: "json",
		   success: function(data){
			   if(data && data.total > 0){
				   //将返回的数据传递给实现搜索输入框的输入提示js类
				   searchSuggest.dataDisplay(data.rows);
			   }else{
				   var suggestWrap = $('#gov_search_suggest');
				   suggestWrap.find('ul').html('');
				   suggestWrap.hide();
				   $(".research-losea").removeClass("research-input");
			   }
	   }
});	  
			 
}

/**
 * 根据当前搜索选中的LI对象返回当前LI及以上高度之和
 * @param currentObj 当前选中LI对象
 * @returns {Number}
 */
function getSearchLiHeight(currentObj){
	var num = currentObj.index();
	var height = 0;
	currentObj.parent().children().each(function(index,element){
		height += $(this).outerHeight();
		if(index == num){
			return false;
		}
	});
	return height;
}


/**
* 点击搜索结果打开页面
*/
function searchOpenTab(node){
	var input = $('#gover_search_key');
	var suggestWrap = $('#gov_search_suggest');
	var $this = $(node);
	input.val($this.find("h2").text());
	var sData = searchData[$this.attr("id")];
	var menuNo = sData.resourceid;
	var menuName = sData.cnname;
	var menuUrl = getMenuUrl(sData.url,sData.systemFlag,menuNo);
	openTabStrip(menuNo,menuName,menuUrl);
	suggestWrap.find('ul').removeClass("open");
	$(".research-losea").removeClass("research-input");
	input.val("");
	suggestWrap.hide();
	//给刚打开的iframe添加焦点
	var T_id=menuNo.replace(/\s+/g,'');//获取当前点击的id
	var IfrId=T_id+"-ifr-casually";//iframe的id
	$("#"+IfrId).focus();
};

/**
 * 搜索框获取焦点后且输入内容与上一次输入内容不一致则刷新搜索内容
 * @param valText
 */
function checkSearchContentFlash(valText){
	valText = $('#gover_search_key').val();
	if($('#gover_search_key').is(':focus')){
		setTimeout(function(){
			if(valText != oldValText && valText != ""){
				oldValText = valText;
				sendKeyWordToBack(valText);
			}
			if(valText == ""){
				var suggestWrap = $('#gov_search_suggest');
			    suggestWrap.find('ul').html('');
			    suggestWrap.hide();
			    $(".research-losea").removeClass("research-input");
			}
			checkSearchContentFlash(valText);
		},100);
	}
};

/**************************************** 搜索功能JS end ****************************************************/




/**************************************** 个人信息/修改密码/帮助/默认展示 start ***********************************/

/**
 * 初始化个人信息修改密码事件
 */
function initUserInfoConfig(){	
	//个人信息展示
	$("#info-personal").click(function(){
		toUserDetailPage();
	});
};
//修改密码打开
$("#info-password").click(function(){
	researchDisplayBlock();//显示弹出框
	$("#modify-password").show();
});
//修改密码-重置邮箱密码关闭弹出框
function researchModifyInformationBg(){
	$(".research-modifyInformation-bg").css({"display":"none"});
};
//重置邮箱密码
$("#info-mail").click(function(){
	var userMobile = $("#userMobile").val();
	if(!userMobile){
		pubShowMask("alert","系统预留手机号不能为空");
		return;
	}
	var msg = '<p id="reset-mailbox-password-msg">点击"确定"按钮后，新的邮箱密码会发送到您<em>'+userMobile+'</em>手机上</p><br/><p>是否确认重置邮箱密码？</p>';
	$("#reset-mailbox-password-content").html(msg);
	$("#research-modifyInformation-btn1").show();
	researchDisplayBlock();//显示弹出框
	$("#reset-mailbox-password").show();
});

//默认展示功能点击事件
$("#default-show-function > li").click(function(){
	settingDefaultShow("function",this);
});
//默认展示功能hover事件
$("#default-show-function > li").hover(function(){
	if($(this).is(".info-hover")){
		$(this).removeClass("info-hover");
	}else{
		$(this).addClass("info-hover");
	}
});

/**
 * 跳转个人信息页面
 */
function toUserDetailPage(){
	var userid = getCookie("currentUserId");
	var menuUrl =contextPath+"/ehrPersonal/toDetail.asp?personnel_user_id="+userid;
	window.parent.openTabStrip(userid,decodeURIComponent(getCookie("currentUserName"))+'员工详情',menuUrl);
	researchDisplayNone();//隐藏弹出框
	//var menuNo = "user-detail-show-userconfig";
	//var menuName = "个人信息";
	//var userid = getCookie("currentUserId");
	//var menuUrl = contextPathYcoms+"queryWatchPerosn.do?flagStr=detailPage&EMP_SID="+empSessionId+"&actorno="+userid;
	//openTabStrip(menuNo,menuName,menuUrl);
	//researchDisplayNone();//隐藏弹出框
};

/**
 * 修改密码
 */
function toUpdateUserPasswordPage(_this){
	//1.验证必填项
	var $error = $(".research-modifyInformation-password-error");
	var $errorContent = $(".research-modifyInformation-password-error > p");
	var oldPassword = trim($("#oldPassword").val());
	var newPassword = trim($("#newPassword").val());
	var repeatNewPassword = trim($("#repeatNewPassword").val());
	if(!oldPassword || !newPassword || !repeatNewPassword){
		$error.addClass("open");
		$errorContent.text("现密码、新密码、重复新密码均不能为空");
		return false;
	};
	//2.验证两次密码输入是否一致
	if(newPassword != repeatNewPassword){
		$error.addClass("open");
		$errorContent.text("新密码两次输入不一致，请重新输入");
		return false;
	}
	//3.验证新密码和现密码是否一致
	if(newPassword == oldPassword){
		$error.addClass("open");
		$errorContent.text("新密码不能和现密码一致，请重新输入");
		return false;
	}
	$(_this).attr("disabled",true);
	var url = "STPasswordChange/updateUserPassword.asp";
	var param = {
		oldPassword			:	oldPassword,
		newPassword			:	newPassword,
		repeatNewPassword	:	repeatNewPassword
	};
	baseAjax(url,param,function(data){
		if(data && data.result == "true"){
			pubShowMask("alert","密码修改成功，请重新登录。","closePasswordWindow()");
			$(_this).attr("disabled",false);
		}else{
			if(data.message){
				$error.addClass("open");
				$errorContent.text(data.message);
			}else{
				$error.addClass("open");
				$errorContent.text("密码修改失败");
			}
			$(_this).attr("disabled",false);
		}
	});
};

/**
 * 关闭修改密码窗口
 */
function closePasswordWindow(){
	$(".research-modifyInformation-bg").css({"display":"none"});
	pubHidMask();
	cleanUpdatePasswordInfo();
	userLogout();
};

/**
 * 清空修改密码内容
 */
function cleanUpdatePasswordInfo(){
	$("#oldPassword").val("");
	$("#newPassword").val("");
	$("#repeatNewPassword").val("");
	$(".research-modifyInformation-password-error > p").text("");
	$(".research-modifyInformation-password-error").removeClass("open");
};

/**
 * 重置邮箱密码
 */
function resetMailPassword(){
	pubHidMask();
	areaLoadingShow();
	var confirmBtn = $("#research-modifyInformation-btn1");
	confirmBtn.attr("disabled",true);
	var url = "STPasswordChange/resetMailPassword.asp";
	var param = {};
	baseAjax(url,param,function(data){
		areaLoadingHide();
		if(data && data.result && data.result == "true"){
			confirmBtn.attr("disabled",false);
			var msg = "<p>邮箱密码已发送到您的手机，请登录宇信科技邮件系统及时修改密码。</p><br/><p>宇信科技邮件系统地址：<a href='http://mail.yusys.com.cn' target='_blank'>http://mail.yusys.com.cn</a></p>";
			$("#reset-mailbox-password-content").html(msg);
			$("#research-modifyInformation-btn1").hide();
		}else{
			confirmBtn.attr("disabled",false);
			var errorInfo = "邮箱密码重置失败";
			if(data && data.message){
				errorInfo = data.message;
			}
			pubShowMask("alert",errorInfo);
		}
	});
};

/**
 * 设置默认展示
 * @param flag ： function功能，system系统
 * @param node 要设置li对象
 */
function settingDefaultShow(flag,node){
	if(!flag || !node || !$(node).attr("value")){
		pubShowMask("alert","设置失败");
		return;
	}
	if($(node).is(".info-current")){
		return;
	}
	var param = {};
	if(flag && flag == "function"){
		param.defaultFunction = $(node).attr("value");
	}else{
		param.defaultStstem = $(node).attr("value");
	}
	$.ajax({
	 	type	:  "post",
	 	url		:  "SDefaultShow/updateDefaultShow.asp",
	 	data	:   param,
	 	dataType : "json",
	 	success : function(data){
	 		if(data && data.result=="true"){
	 			$(node).parent().children().removeClass("info-current");
	 			$(node).addClass("info-current");
	 		}else{
	 			pubShowMask("alert","设置失败");
	 		}
	 	},
	 	error : function(){
	 		pubShowMask("alert","设置失败");
	 	}
	 });
};

/**
 * 打开帮助页签
 */
function openHelpOperationManual(_this){
	var $this = $(_this);
	var idVal = $this.attr("id");
	var menuNo = idVal+"-help-operation";
	var menuName = $this.text();
	var menuUrl = contextPath+"help/"+idVal+".html";
	openTabStrip(menuNo,menuName,menuUrl);
	researchDisplayNone();//隐藏弹出框
};

/**************************************** 个人信息/修改密码/帮助/默认展示 end **********************************/

//用户更换头像
$(".user-img").click(function(){
	researchDisplayBlock();//显示弹出框
	$(".research-upload-img").attr("src",contextPath+"plugin/Jcrop-master/upload_img.jsp");
	$(".research-upload-img").show();
});

/**
 * 初始化用户头像
 */
function initUserPortraitImg(){
// 	$.ajax({
// 	 	type : "post",
// 	 	url : "SUser/getUserPortrait.asp",
// 	 	dataType : "json",
// 	 	success : function(data){
// 	 		if(data && "true" == data.result){
// 	 			/** 修改用户头像显示分别为压缩后的两张图片 zhanggd update 2018-02-07 start */
// 	 			var userPortraitLiBig;
// 	 			var userPortraitImgSmall;
// 	 			if(data.retList[0].modeid == "USERPORTRAIT"){
// 	 				userPortraitLiBig = contextPath+data.retList[0].fileName;
// 	 				userPortraitImgSmall = contextPath+data.retList[1].fileName;
// 	 			}else{
// 	 				userPortraitImgSmall = contextPath+data.retList[0].fileName;
// 	 				userPortraitLiBig = contextPath+data.retList[1].fileName;
// 	 			}
// 	 			$("#userPortraitLiSmall").html('<img name="userPortraitImg" id="userPortraitImgSmall" src="'+userPortraitImgSmall+'" width="43" height="43" />');
// 	 			$("#userPortraitLiBig").html('<img name="userPortraitImg" id="userPortraitImgBig" src="'+userPortraitLiBig+'" width="120" height="120" /><span>点击更换头像</span>');
// 	 			/** 修改用户头像显示分别为压缩后的两张图片 zhanggd update 2018-02-07 end */
// //	 			$("[name='userPortraitImg']").each(function(){
// //	 				$(this).attr("src",contextPath+data.fileName);
// //	 			});
// 	 		}else{
// 	 			$("#userPortraitLiSmall").html('<img name="userPortraitImg" id="userPortraitImgSmall" src="'+contextPath+'images/portrait/defalut.png" width="43" height="43" />');
// 	 			$("#userPortraitLiBig").html('<img name="userPortraitImg" id="userPortraitImgBig" src="'+contextPath+'images/portrait/defalut.png" width="120" height="120" /><span>点击更换头像</span>');
// 	 		}
// 	 	},
// 	 	error:function(){
// 	 		$("#userPortraitLiSmall").html('<img name="userPortraitImg" id="userPortraitImgSmall" src="'+contextPath+'images/portrait/defalut.png" width="43" height="43" />');
//  			$("#userPortraitLiBig").html('<img name="userPortraitImg" id="userPortraitImgBig" src="'+contextPath+'images/portrait/defalut.png" width="120" height="120" /><span>点击更换头像</span>');
// 	 	}
// 	 });
};

/**
 * 校验用户是都系统默认密码，如果是则强制修改密码
 */
function checkUserIsDefaultPassword(){
	$.ajax({
		type : "post",
		url : "STPasswordChange/checkUserIsDefaultPassword.asp",
		data:{},
		dataType : "json",
		success : function(data) {
			if(data && data.result == "true"){
				//弹出修改密码页面
				$(".research-modifyInformation-bg").show();
				$(".research-modifyInformation-title em").css({"display":"none"});
			}
		}
	});
};

//退出按钮
$("#research-user-logout").click(function(){
	userLogout();
});

/**
 * 退出系统
 */
function userLogout(){
	$.ajax({
		type : "post",
		url : "/zjrc/logout",
		dataType : "json",

		success : function(data) {
            if("success" == data.result){
                window.location = contextPath+"login.html";
                return;
            }
		},
		error : function() {
            alert("注销异常！");
            window.location = contextPath+"login.html";
		}
	});

};

/**
 * 获取首页链接
 */
function initHomePage(){

	// $.ajax({
	// 	type : "post",
	// 	url : "PubTParam/queryOne.asp",
	// 	data:{ sysFlag		:	"system",
	// 		   paramFlag	:	"homePageUrl"
	// 	     },
	// 	dataType : "json",
	// 	success : function(data) {
	// 		if(data && data.result && data.result == "true"){
	// 			$("#research-home-iframe").attr("src",contextPath+data.obj.paramVal);
	// 		}else{
	// 			$("#research-home-iframe").attr("src",contextPath+"welcome-home.jsp");
	// 		}
	// 	},
	// 	error : function() {
	// 		$("#research-home-iframe").attr("src",contextPath+"welcome-home.jsp");
	// 	}
	// });
};

/**
 * 关闭我的学习弹出窗口
 */
function researchLearnClose(node){
	$(node).parent().remove();
}


$(document).ready(function() {
	//刷新页面
	RefreshBody();
	//获取首页链接
	initHomePage();
	//初始化用户头像
	initUserPortraitImg();
	//验证用户是否默认密码
	checkUserIsDefaultPassword();
    //获取资源管理系统ID
	getSessionId();
	//初始化当前用户可以查看的系统
	initUserSystemPermission();
	//初始化菜单横向滚动条滑动事件
	initMenuTreeScroll();
	//设置选项卡下拉框滚动条
//	$(window).load(function(){
//	    $("#tag-last-list").mCustomScrollbar({
//	    	axis:"yx",
//	    	scrollInertia:0,
//	    	mouseWheelPixels:26,
//			scrollButtons:{enable:true},
//			theme:"light-thick",
//			scrollbarPosition:"outside"
//		});
//	});
});
