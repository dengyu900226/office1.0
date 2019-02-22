function leftALinkObj(menuid,choice,tableid){ // 1 加载菜单栏中的属性到 参数列表 ，0 设置所有参数到 左边菜单栏
	window.scrollTo(0,0);// 加载列表页面，滚动条置顶
	if(menuid == undefined || menuid == null || menuid==''){
		return ;
	}
	if( menuid.indexOf('#')!= -1){
		menuid =	menuid.replace('#','');
	}
	var alink = document.getElementsByName(menuid)[0];
	if(alink == undefined || alink == null || alink==''){
		return ;
	}
	if(choice == 0){
		setParamsCache2LeftMenu(tableid,alink);
	}else {
		setParamsCache2Table(tableid,alink);
	}
	
};
function setParamsCache2LeftMenu(tableid,alink){// 将列表页的查询条件 保存到左侧菜单中
	var table = $('#infoFrame').get(0).contentWindow.document.getElementById(tableid);
	var param = {};
	$(table).find(':input[name]').each(function (index, domEle) {
		if(domEle.value){
			param[domEle.name] = domEle.value;
		}
	});
	$(alink).data('param',param);
}
function setParamsCache2Table(tableid,alink){   // 将左侧菜单中保存的列表查询条件缓存还原到 table中
	
	var table = $('#infoFrame').get(0).contentWindow.document.getElementById(tableid);
	
	clearLeftMenuCache($('#infoFrame').get(0),alink);
	
	var param = $(alink).data('param');
	
	if(param && param != undefined){
		$(table).find(':input[name]').each(function (index, domEle) {
			if(param[domEle.name]){
				domEle.value =	param[domEle.name] ;
			}
		});
	}
};
function clearLeftMenuCache(iframe,alink){
	var name = iframe.getAttribute('cachename');
	if(name && name != undefined ){
		if(name != alink.id){
			$(alink).data('param',null)
		}
	}
	iframe.setAttribute('cachename',alink.id,0);
}