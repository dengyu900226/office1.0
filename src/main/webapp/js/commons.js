

/**
 * 通用ajax方法
 * @param url
 * @param param
 * @param callback
 * @param async
 */
function baseAjax(url, param, callback, async) {
	$.ajax({
		type : "post",
		url : url,
		async : async == undefined ? true : async,
		data : param,
		dataType : "json",
		//contentType : 'application/json;charset=utf-8',
		success : function(msg) {
			callback(msg);
		},
		error : function() {
			callback();
		}
	});
}

/**
 * 设置按钮是否可点击
 * @param buttonID 按钮ID
 * @param flag 为true不可点、为false为可点
 */
function setButtonDisabled(buttonID,flag){
	$("#"+buttonID).attr("disabled",flag);
}

/**
 * 通用ajax(提交Json数据)
 * @param url
 * @param param
 * @param callback
 * @param async
 */
function baseAjaxForJson(url, param, callback, async) {
	$.ajax({
		type : "post",
		url : url,
		async : async == undefined ? true : async,
		data : param,
		dataType : "json",
		contentType : 'application/json;charset=utf-8',
		success : function(msg) {
			callback(msg);
		},
		error : function() {
			callback();
		}
	});
}



/**
 * 通用初始化日期框方法
 * @param dateIds   日期框控件ID数组
 * @param startView 起始选择范围，0：小时，1：天，2：月，3：年，4：10年
 * @param minView   最小视图0~4
 * @param maxView   最大视图0~4
 * @param format   日期框控件ID数组
 * 参考链接：http://www.bootcss.com/p/bootstrap-datetimepicker/
 * 加载页面表单数据
 */
function intitDate(dateIds,startView,minView,maxView,format,language){
	if(dateIds.length>0){
		for(var i=0;i<dateIds.length;i++){
			$("#"+dateIds[i]).datetimepicker({//初始化日期选择器
				startView:startView==undefined?2:startView,//起始选择范围（如：从年份开始选还是从月份开始选），取值范围0~4；
				minView:minView==undefined?2:minView,//最小选择到哪个时间段
				maxView:maxView==undefined?4:maxView,//最大选择到哪个时间段
			    format:format==undefined?'yyyy-mm-dd':format,//时间格式
			    autoclose: true,
			    language:language==undefined?'zh-CN':language,//设置日期框语言
			    todayBtn:true,//是否显示今天按钮
				clearBtn:true,//是否显示清空按钮
				pickerPosition:'bottom-right'
			});
			$("#"+dateIds[i]).click(function(){
				$(this).focus();
			});	
			$("#"+dateIds[i]).siblings("span").click(function(){
				$(this).siblings("input").focus();
			});
			if(language && language == "zh-CN-qtrs"){
				$("#"+dateIds[i]).data('datetimepicker').picker.addClass('quarter');
			}
			if(language && language == "zh-CN-qtrsorder"){//季度按顺序展示 如：2018年一季度 展示2018-01 二季度展示2018-02
				$("#"+dateIds[i]).data('datetimepicker').picker.addClass('quarterorder');
			}
		}
	}
}	

/**
 * 
 * 通用初始化日期框方法（包含开始日期和结束日期）
 * @param dateIds   日期框控件ID数组
 * @param startView 起始选择范围，0：小时，1：天，2：月，3：年，4：10年
 * @param minView   最小视图0~4
 * @param maxView   最大视图0~4
 * @param startDate 开始日期
 * @param endDate   结束日期
 * @param format   日期框控件ID数组
 * 参考链接：http://www.bootcss.com/p/bootstrap-datetimepicker/
 */
function intitDateMore(dateIds,startView,minView,maxView,startDate,endDate,format){
	if(dateIds.length>0){
		for(var i=0;i<dateIds.length;i++){
			$("#"+dateIds[i]).datetimepicker({//初始化日期选择器
				startView:startView==undefined?2:startView,//起始选择范围（如：从年份开始选还是从月份开始选），取值范围0~4；
				minView:minView==undefined?2:minView,//最小选择到哪个时间段
				maxView:maxView==undefined?4:maxView,//最大选择到哪个时间段
				startDate:startDate==undefined?"":startDate,//开始值
				endDate:endDate==undefined?"":endDate,//结束值
			    format:format==undefined?'yyyy-mm-dd':format,//时间格式
			    autoclose: true,
			    language:'zh-CN',//设置日期框语言
			    todayBtn:true,//是否显示今天按钮
				clearBtn:true,//是否显示清空按钮
				pickerPosition:'bottom-right',
			});
			$("#"+dateIds[i]).click(function(){
				$(this).focus();
			});	
			$("#"+dateIds[i]).siblings("span").click(function(){
				$(this).siblings("input").focus();
			});
		}
	}
}

/**
 * 通用初始化日期框方法(传name属性)
 * @param dateNames
 * @param startView
 * @param minView
 * @param maxView
 * @param format
 */
function intitDateByName(dateNames,startView,minView,maxView,format){
	if(dateNames.length>0){
		for(var i=0;i<dateNames.length;i++){
			$("[name="+dateNames[i]+"]").datetimepicker({//初始化日期选择器
				startView:startView==undefined?2:startView,//起始选择范围（如：从年份开始选还是从月份开始选），取值范围0~4；
				minView:minView==undefined?2:minView,//最小选择到哪个时间段
				maxView:maxView==undefined?4:maxView,//最大选择到哪个时间段
			    format:format==undefined?'yyyy-mm-dd':format,//时间格式
			    autoclose: true,
			    language:'zh-CN',//设置日期框语言
			    todayBtn:true,//是否显示今天按钮
				clearBtn:true,//是否显示清空按钮
				pickerPosition:'bottom-right'
			});
			$("[name="+dateNames[i]+"]").click(function(){
				$(this).focus();
			});	
			$("[name="+dateNames[i]+"]").siblings("span").click(function(){
				$(this).siblings("input").focus();
			});
		}
	}
}	

function loadPageData(url,param){
	baseAjax(url,
			param,function(data){
		for(var key in data){
			$("[name="+key+"]").val(data[key]);
			if($("[name="+key+"]").is("select")){
				$("[name="+key+"input]").val(data[key]);
			}
			if($("[name="+key+"]").attr("type") == "radio"){
				$("[name="+key+"radio]").val(data[key]);
			}
			/*if($("[name="+key+"]").attr("type") == "radio"){
				var radios = $("[name="+key+"]");
				radios.each(function(){
					if($(this).val() == data[key]){
						$(this).parent().addClass('checkd');
						$(this).trigger("click");//触发点击事件
					}
					else{
						$(this).parent().removeClass('checkd');
					}
				});
			}
			else{
				$("[name="+key+"]").val(data[key]);
			}*/
			/*if($("[name="+key+"]").is("select")){
				$("[name="+key+"]").select2();
			}*/
		}
	},false);
}




/**
 * 加载页面表单数据，后台数据格式为实体对象
 * @param url
 */
function loadFormData(url,param){
	 baseAjax(url,
			 param,function(data){
		for(var key in data){
			if($("[name="+key+"]").attr("type") == "checkbox"){
				var checkbox = $("[name="+key+"]");
				checkbox.each(function(){
					if($(this).val() == data[key]){
						$(this).parent().addClass('checkd');
						$(this).trigger("click");//触发点击事件
					}
					else{
						$(this).parent().removeClass('checkd');
					}
				});
			}
			if($("[name="+key+"]").attr("type") == "radio"){
				var radios = $("[name="+key+"]");
				radios.each(function(){
					if($(this).val() == data[key]){
						$(this).parent().addClass('checkd');
						$(this).trigger("click");//触发点击事件
					}
					else{
						$(this).parent().removeClass('checkd');
					}
				});
			}else if($("[name="+key+"]").is("span")){
				$("[name="+key+"]").text(nullToEmpty(data[key]));
			}else{
				$("[name="+key+"]").val(data[key]);
			}
			if($("[name="+key+"]").is("select")){
				$("[name="+key+"]").select2();
			}
		}
	},false);
}

/**
 * null to "" 
 */
function nullToEmpty(val){
	if(val == null){
		val = "";
	}
	return val;
}
/**
 * 加载页面表单数据，后台数据格式为实体对象
 * @param url
 */
function loadFormDataById(url,param){
	baseAjax(url,
			param,function(data){
		for(var key in data){
			
			if($("[name="+key+"]").attr("type") == "checkbox"){
				var checkbox = $("[name="+key+"]");
				checkbox.each(function(){
					if($(this).val() == data[key]){
						$(this).parent().addClass('checkd');
						$(this).trigger("click");//触发点击事件
					}
					else{
						$(this).parent().removeClass('checkd');
					}
				});
			}
			
			if($("#"+key)[0] !=undefined && $("#"+key)[0].type == undefined){
				$('#'+key).html(data[key]);
			}
			if($("[name="+key+"]")[0] !=undefined && $("[name="+key+"]")[0].type == "radio"){
				var radios = $("[name="+key+"]");
				radios.each(function(){
					if($(this).val() == data[key]){
						$(this).parent().addClass('checkd');
						$(this).trigger("click");//触发点击事件
					}
					else{
						$(this).parent().removeClass('checkd');
					}
				});
			}else{
				$("[name="+key+"]").val(data[key]);
			}
			if($("[name="+key+"]")[0] !=undefined && $("[name="+key+"]")[0].type == 'select-one'){
				$("[name="+key+"]").select2();
			}
		}
	},false);
}


/**
 * 加载页面数据 ，后台数据格式为[rows:list]
 * @param url
 */
function loadFormDataByRows(url){
	baseAjax(url,null,function(data){
		for(var key in data.rows[0]){
			if($("[name="+key.toLowerCase()+"]").attr("type") == "radio"){
				var radios = $("[name="+key.toLowerCase()+"]");
				radios.each(function(){
					if($(this).val() == data.rows[0][key]){
						$(this).trigger("click");//触发点击事件
						$(this).parent().addClass('checkd');
					}
					else{
						$(this).parent().removeClass('checkd');
					}
				});
			}
			else{
				$("[name="+key.toLowerCase()+"]").val(data.rows[0][key]);
			}
			if($("[name="+key.toLowerCase()+"]").is("select")){
				$("[name="+key.toLowerCase()+"]").select2();
			}
		}
	},false);
}


/**
 * 初始化下拉框
 * @param selID 控件ID  
 * @param param 查询参数   {opttype:'STD_USER_SEX',memo:'员工性别'}
 * @param default_v  默认值
 * @isReadonly 判断是否让下拉框失效
 */
function initSelect(selID,param,default_v,async,isReadonly){
	baseAjax(contextPath+"/SDic/findItemByDic.asp",param,function(data){
		if(data!=undefined){
			initSelectByData(selID,data,default_v,isReadonly);
		}
	},async);
}


/**
 * 初始化省市县级联下拉
 * 
 * @param proviceID,cityID,countyID 省、市、县控件ID 
 * @param param 查询参数   {pId:'父Id'}
 * @param default_v  默认值
 * @isReadonly 判断是否让下拉框失效
 */
function initSelectArea(proviceID,cityID,countyID,param,default_v,async,isReadonly){
	//初始化省下拉数据
	selectArea(proviceID,param,default_v,async,isReadonly);	
	$("#"+cityID).append('<option id="removeOption" value=" " >请选择</option>').select2();
	$("#"+countyID).append('<option id="removeOption" value=" " >请选择</option>').select2();
	//给省下拉框绑定事件，选中时初始化市下拉框
	$("#"+proviceID).bind("change",function(){
		selectArea(cityID,{pId:this.value},default_v,async,isReadonly);
		//当选中省下拉框时把县下拉框数据清空
		$("#"+countyID).empty().append('<option id="removeOption" value=" " >请选择</option>').select2();
		//给市下拉框绑定事件，选中时初始化县下拉框
		$("#"+cityID).bind("change",function(){
			selectArea(countyID,{pId:this.value},default_v,async,isReadonly);
		});
	});
}

/**
 * 初始化行政区下拉框
 * @param selID 控件ID
 * @param param	
 * @param default_v
 * @param async
 * @param isReadonly
 */
function selectArea(selID,param,default_v,async,isReadonly){
	baseAjax(contextPath+"/SArea/querySareaSel.asp",param,function(data){
		if(data!=undefined){
			initSelectByData(selID,data,default_v,isReadonly);
		}
	},async);
}


/**
 * 初始化单选按钮
 * @param tdID 放置单选按钮的div的ID
 * @param queryRadioParam 查询单选钮选项的参数
 * @param radioNamePropertiesVal 单选按钮name属性的值
 * @param defaultVal 默认值
 * @param async 请求方式：同步/异步(false/true)
 */
function initRadio(tdID,queryRadioParam,radioNamePropertiesVal,defaultVal,async){
	baseAjax(contextPath+"/SDic/findItemByDic.asp",queryRadioParam,function(data){
		if(data!=undefined){
			initRadioByData(tdID,data,radioNamePropertiesVal,defaultVal);
		}
	},async);
}


/**
 * 根据请求数据初始化单选按钮
 * @param tdID 单选按钮所在td的ID
 * @param data 请求返回数据
 * @param radioNamePropertiesVal 单选按钮name属性的值
 * @param defaultVal 默认值
 */
function initRadioByData(tdID,data,radioNamePropertiesVal,defaultVal){
	var obj = $("#"+tdID);
	if(obj != undefined && data != undefined){
		obj.empty();
		for(var i=0;i<data.json.length;i++){
			obj.append('<div class="single-radio single-radio-inline"><span><input type="radio" name="'+radioNamePropertiesVal+'" value="'+data.json[i].ENNAME+'"></span><label>'+data.json[i].CNNAME+'</label></div>');
		}
		if(defaultVal != ""){
			var radios = $("[name="+radioNamePropertiesVal+"]");
			radios.each(function(){
				if($(this).val() == defaultVal){
					$(this).parent().addClass('checkd');
					$(this).trigger("click");//触发点击事件
				}
				else{
					$(this).parent().removeClass('checkd');
				}
			});
		}
		setRadioCheckd(radioNamePropertiesVal);
	}
}



/**
 * 初始化下拉框（带复选框）
 * @param selID 控件ID  
 * @param param 查询参数   {opttype:'STD_USER_SEX',memo:'员工性别'}
 * @param default_v  默认值
 */
function initSelectHaveCheckbox(selID,param,default_v,async){
	baseAjax(contextPath+"/SDic/findItemByDic.asp",param,function(data){
		if(data!=undefined){
			initSelectByDataHaveCheckBox(selID,data,default_v);
		}
	},async);
	
}


/**
 * 根据data 设置下拉框（带复选框）
 * @param selID 控件ID 
 * @param data 下拉框数据
 * @param default_v 默认值
 */
function initSelectByDataHaveCheckBox(selID,data,default_v){
	var obj = $("#"+selID);
	if(obj != undefined && data != undefined){
		obj.empty();
		for(var i=0;i<data.json.length;i++){
			if(default_v!=undefined&&default_v!=""){
				if(default_v.indexOf(data.json[i].ENNAME) != -1){
					obj.append('<option  value="'+data.json[i].ENNAME+'" selected=true >'+data.json[i].CNNAME+'</option>');	
				}
				else{
					obj.append('<option  value="'+data.json[i].ENNAME+'">'+data.json[i].CNNAME+'</option>');	
				}
			}
			else{
				obj.append('<option  value="'+data.json[i].ENNAME+'">'+data.json[i].CNNAME+'</option>');	
			}
			
		}
		obj.multiselect({
//			 buttonWidth: $("#"+selID).width(),
			 selectAllText: '全选',
			 includeSelectAllOption: true,
			 nonSelectedText: '请选择',
			 allSelectedText: '全部',
			 nSelectedText: '已选择',
			 filterPlaceholder: '搜索',
			 //enableClickableOptGroups: true,
			 //enableCollapsibleOptGroups: true,
			 enableFiltering: true
		});
	}
}

/**
 * 根据data设置下拉框
 * @param selID 控件ID
 * @param data 下拉框数据
 * @param default_v 默认值
 * @isReadonly 判断是否让下拉框失效
 */
function initSelectByData(selID,data,default_v,isReadonly){
	var obj = $("#"+selID);
	obj.empty();
	obj.append('<option id="removeOption" value=" " >请选择</option>');	
	if(obj != undefined && data != undefined){
		obj.empty();
		obj.append('<option id="removeOption" value=" " >请选择</option>');	
		for(var i=0;i<data.json.length;i++){
			obj.append('<option  value="'+data.json[i].ENNAME+'">'+data.json[i].CNNAME+'</option>');	
		}
		if(default_v!=undefined&&default_v!=""){
			obj.val(default_v);
		}else{
			obj.val("");
		}
		if(isReadonly){
			obj.attr("readonly",true);
		}
		obj.select2();
	}
	
}


/**
 * 初始化下拉框(传name属性)
 * @param selName
 * @param param
 * @param default_v
 * @param async
 * @param isReadonly
 */
function initSelectByName(selName,param,default_v,async,isReadonly){
	baseAjax(contextPath+"/SDic/findItemByDic.asp",param,function(data){
		if(data!=undefined){
			initSelectByNameData(selName,data,default_v,isReadonly);
		}
	},async);
}

/**
 * 根据data设置下拉框
 * @param selName
 * @param data
 * @param default_v
 * @param isReadonly
 */
function initSelectByNameData(selName,data,default_v,isReadonly){
	var obj = $("[name="+selName+"]");
	obj.empty();
	obj.append('<option id="removeOption" value=" " >请选择</option>');	
	if(obj != undefined && data != undefined){
		obj.empty();
		obj.append('<option id="removeOption" value=" " >请选择</option>');	
		for(var i=0;i<data.json.length;i++){
			obj.append('<option  value="'+data.json[i].ENNAME+'">'+data.json[i].CNNAME+'</option>');	
		}
		if(default_v!=undefined&&default_v!=""){
			obj.val(default_v);
		}else{
			obj.val("");
		}
		if(isReadonly){
			obj.attr("readonly",true);
		}
		obj.select2();
	}
	
}





/**
 * 获取查询参数
 */
function getParamVal(resetID){
	var paramVal = "";
	
	$('#'+resetID).find(".form-casually").each(function(){
		var key = $(this).attr("name");
		var val = trim($(this).val());
		if(val != null && val != "")
			paramVal += key+"="+val+"&";
	});
	var len = paramVal.length-1;
	paramVal = paramVal.substring(0,len);
	return paramVal;
}

/**
 * 重置方法
 * @param resetID
 */
function resetFrom(resetID){
	$('#'+resetID).form('reset');
	$('#'+resetID).find("select").each(function(){
		if($(this).attr("multiple")){
			//应用于下拉框的复选
			$(this).next().find("button").attr("title","请选择");
			$(this).next().find("button").find(".multiselect-selected-text").text("请选择");
			$(this).nextAll().find(".multiselect-container").find("li").removeClass("active");
		}else{
			//应用于下拉框的单选
			$(this).val("");
			$(this).select2();
		}
	});
	//$(':input:radio')取到所有的radio，然后each遍历，通过$(this).is(':checked')判断是否选中。
	$('#'+resetID).find(':input:radio').each(function(){
		if($(this).is(':checked')){
			$(this).parent().addClass('checkd');
		}
		else{
			//默认不是被选中的，去掉checkd样式
			$(this).parent().removeClass('checkd');
		}
	});
}

/**
 * 数字输入框
 */
function numberInput(inputId){
	$("#"+inputId).keyup(function(){
		$(this).val(this.value.replace(/[^\d]/g,''));
	});
	$("#"+inputId).keydown(function(nodes){
		$(this).val(this.value.replace(/[^\d]/g,''));
	});
	
}

/**
 * 必须为数字
 * @param node
 */
function mustIsNumber(node){
	$(node).val(node.value.replace(/[^\d]/g,''));
}

/**
 * 设置单选按钮选中方法
 * @param rodioNamePropertiesVal 单选按钮的name属性的值
 */
function setRadioCheckd(rodioNamePropertiesVal){
	var radios = $("[name="+rodioNamePropertiesVal+"]");
	radios.bind("click",function(){
		var $this = $(this);
		radios.parent().removeClass('checkd');
		$this.parent().addClass('checkd');
	});
}

/**
 * 根据name初始化单选按钮
 * @param inputName 单选按钮的name属性的值
 * @param defaultVal 默认值
 */
function initRadioByName(inputName,defaultVal){
	var radios= $("input:radio[name="+inputName+"]");
	if(defaultVal){//默认值
		var checkRadio = $(radios).parent().find("[value='"+defaultVal+"']");
		if (checkRadio) {
			$(checkRadio).attr("checked",true);
			$(checkRadio).parent().addClass('checkd');
		}
	}
	radios.bind("click",function(){
		var $this = $(this);
		radios.parent().removeClass('checkd');
		$this.parent().addClass('checkd');
		$(".single-radio span input").removeAttr("checked");
		$this.attr("checked","checked");
	});
}

/**
 * 根据name获取单选按钮value值
 * @param inputName
 */
function getRadioValueByName(inputName){
	return $("input:radio[name="+inputName+"][checked]").val();
}

/**
 * 根据name获取单选按钮文本值
 * @param inputName
 */
function getRadioLableByName(inputName){
	return $("input:radio[name="+inputName+"]").parent().parent().find(".checkd").next().html();
}


/**
 * 初始化验证
 * @param obj
 * <input type="text" validate="v.required" valititle="该项为必填123" name="M.menu_no" class="span11" placeholder="菜单编号 "> 
 * initVlidate($("#menu_form")); vlidate($("#menu_form"));
 */
function initVlidate(obj){
	obj.find("[validate^='v.']").each(function(){
		var $this=$(this);
		$this.parent().append($("<span class='input-ast'>*</span>")); //然后将它追加到文档中
		//input
		var isInput = $this.is("input");
		//textarea
		var isTextarea = $this.is("textarea");
		//select
		var isSelect = $(this).is(".span2a");
		//pop
		var isPop = $(this).parent().is(".click-pop");
		//日期框
		var isCalendar = $(this).parent().is(".click-calendar");
		//input || textarea
		if(isInput || isTextarea){
			$this.keyup(function(){
				addOrDelVlidateMessage($this);
			});
		}
		//下拉框
		if(isSelect){
			$this.change(function(){
				addOrDelVlidateMessage($this);
			});
		}
		//pop || 日期框
		if(isPop || isCalendar){
			$this.click(function(){
				addOrDelVlidateMessage($this);
			});
		}
	});
}

/**
 * 添加或删除必填项提示信息
 * @param $this 当前操作的对象
 */
function addOrDelVlidateMessage($this){
	var thisVal = $.trim($this.val());
	if(thisVal=="" && !($this.parent().is(".click-pop")) && !($this.parent().is(".click-calendar"))){
		$this.parent().addClass("has-feedback has-error");
		$this.parent().append("<span class='input-error'></span>");
	}else{
		$this.parent().removeClass("has-feedback has-error");
		$this.parent().find("span[ class='input-error']").remove();
		$this.parent().find("span[ class='control-label']").remove();
	}
}

/**
 * 隐藏表单验证信息
 */
function hideVlidate(){
	$("input").focus(function(){
		$(this).siblings("div[class^='tag-position']").remove();
	});
	$("select").change(function(){
		$(this).siblings("div[class^='tag-position']").remove();
	});
	$("textarea").focus(function(){
		$(this).siblings("div[class^='tag-position']").remove();
	});
}

/**
 * 动态添加验证
 * @param controlID 需添加验证的ID 
 * @param isVlidate 是否需要验证 true or false
 * @param vlidateInfo 验证必填的提示信息 例如：请选择员工所属部门
 * @param vlidateValue 验证属性，例：isdefault
 */
function dynamicAddVlidate(controlID,isVlidate,vlidateInfo,vlidateValue){
	if(isVlidate){
		$("#"+controlID).attr("validate","v."+vlidateValue);
		$("#"+controlID).attr("valititle",vlidateInfo);
		$("#"+controlID).parent().append($("<span class='input-ast'>*</span>")); //然后将它追加到文档中
	}
	else{
		$("#"+controlID).removeAttr("validate");
		$("#"+controlID).removeAttr("valititle");
		$("#"+controlID).parent().find("span[class^='input-ast']").remove();
		$("#"+controlID).parent().find("span[class^='control-label']").remove();
		$("#"+controlID).parent().find("span[class^='input-error']").remove();
		$("#"+controlID).parent().removeClass("has-feedback has-error");
		
	}
}

function vlidate(obj){
	var result=true;
	obj.find("td[ class='input-left']").each(function(){
		if($(this).children().children().attr("validate") == undefined || $(this).children().children().attr("validate") == ""){
			$(this).find("div[ class='has-feedback has-error']").attr("class","");
			$(this).find("span[ class='input-error']").remove();
			$(this).find("span[ class='control-label']").remove();
		}
	});
	obj.find("[validate^='v.']").each(function(){
		$(this).parent().find("br").remove();
		//$(this).parent().removeClass();
		$(this).parent().find("span[ class='input-error']").remove();
		$(this).parent().find("span[ class='control-label']").remove();
		var form=$(this);
		var vlidateStr = form.attr("validate");
		if(vlidateStr.indexOf("required") != -1 &&$.trim(form.val())==""){
			$(this).parent().addClass("has-feedback has-error");
			//$(this).children().addClass("input-error");
			$(this).parent().append('<span class="input-error"></span><span class="control-label">'+($(this).attr("valititle")||"该项必填!")+'</span>');
			result=false;
		}
		//空格验证
		else if(vlidateStr.indexOf("space") != -1 &&(/\s/.exec(form.val())!=null)){
			$(this).parent().attr("class","has-feedback has-error");
			$(this).parent().append('<span class="glyphicon glyphicon-remove form-control-feedback form-control-feedback-ast"></span></span><span class="control-label">'+'该输入项不能包含空格'+'</span>');
			result=false;
		}
		else if(vlidateStr.indexOf("name") != -1 &&($.trim(form.val())!=""&&!/^[\u0391-\uFFE5]+$/.test($.trim(form.val()))&&!/^[A-Za-z]+$/.test($.trim(form.val())))){
			$(this).parent().addClass("has-feedback has-error");
			$(this).parent().append('<span class="input-error"></span><span class="control-label">'+'该输入项只能是英文或中文'+'</span>');
			result=false;
		}//验证密码
		else if(vlidateStr.indexOf("password") != -1&&($.trim(form.val())==""||($.trim(form.val())!=""&&!/^[a-zA-Z]\w{5,30}$/.test($.trim(form.val()))))){
			$(this).parent().addClass("has-feedback has-error");
			$(this).parent().append('<span class="input-error"></span><span class="control-label">'+'密码以字母开头,只能有数字、英文、下划线且长度不得小于6位'+'</span>');
			result=false;
		}//验证邮箱
		else if(vlidateStr.indexOf("email") != -1&&($.trim(form.val())==""||($.trim(form.val())!=""&&!/.+@.+\.[a-zA-Z]{2,4}$/.test($.trim(form.val()))))){
			$(this).parent().addClass("has-feedback has-error");
			$(this).parent().append('<span class="input-error"></span><span class="control-label">'+'请输入有效的电子邮件账号(例：abc@126.com)'+'</span>');
				result=false;
		}//验证手机号码
//		else if(vlidateStr.indexOf("mobile") != -1&&($.trim(form.val())==""||($.trim(form.val())!=""&&!/^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/.test($.trim(form.val()))))){
		else if(vlidateStr.indexOf("mobile") != -1&&($.trim(form.val())==""||($.trim(form.val())!=""&&!/^(((13[0-9]{1})|(15[0-9]{1})|(14[5|7])|(18[0,5-9]))+\d{8})$/.test($.trim(form.val()))))){
			$(this).parent().addClass("has-feedback has-error");
			$(this).parent().append('<span class="input-error"></span><span class="control-label">'+'请填入手机,如13688888888'+'</span>');
			result=false;
		}//验证电话号码
		else if(vlidateStr.indexOf("tel") != -1&&($.trim(form.val())==""||($.trim(form.val())!=""&&!/^1\d{10}$|^(0\d{2,3}-?|\(0\d{2,3}\))?[1-9]\d{4,7}(-\d{1,8})?$/.test($.trim(form.val()))))){
			$(this).parent().addClass("has-feedback has-error");
			$(this).parent().append('<span class="input-error"></span><span class="control-label">'+'请填入电话号码,如020-8888888'+'</span>');
			result=false;
		}//验证非负整数（正整数 + 0） ^\d+$ 
		else if(vlidateStr.indexOf("positiveInt") != -1&&($.trim(form.val())!=""&&!/^\d+$/.test($.trim(form.val())))){
			$(this).parent().attr("class","has-feedback has-error");
			$(this).parent().append('<span class="glyphicon glyphicon-remove form-control-feedback form-control-feedback-ast"></span></span><span class="control-label">'+'请输入非负整数'+'</span>');
			result=false;
		}//验证整数（负整数 + 0 + 正整数）
		else if(vlidateStr.indexOf("int") != -1&&($.trim(form.val())!=""&&!/^-?\d+$/.test($.trim(form.val())))){
			$(this).parent().attr("class","has-feedback has-error");
			$(this).parent().append('<span class="glyphicon glyphicon-remove form-control-feedback form-control-feedback-ast"></span></span><span class="control-label">'+'请输入整数'+'</span>');
			result=false;
		}//验证浮点型数字
		else if(vlidateStr.indexOf("double") != -1&&($.trim(form.val())!=""&&!/^[-+]?(\d+(\.\d*)?|\.\d+)[dD]?$/.test($.trim(form.val())))){
			$(this).parent().addClass("has-feedback has-error");
			$(this).parent().append('<span class="input-error"></span><span class="control-label">'+'请输入数字类型'+'</span>');
			result=false;
		}//验证最小值
		else if(vlidateStr.indexOf("min") != -1&&($.trim(form.val())!=""&&!/^\d+(\.\d+)?$/.test($.trim(form.val())))){
			$(this).parent().addClass("has-feedback has-error");
			$(this).parent().append('<span class="input-error"></span><span class="control-label">'+'请输入非负数'+'</span>');
			result=false;
		}//验证1-100的数字
		else if(vlidateStr.indexOf("score") != -1&&($.trim(form.val())!=""&&!/^(?:0|[1-9][0-9]?|100)$/.test($.trim(form.val())))){
			$(this).parent().addClass("has-feedback has-error");
			$(this).parent().append('<span class="input-error"></span><span class="control-label">'+'请输入1-100的数字'+'</span>');
			result=false;
		}
		//验证身份证
		else if(vlidateStr.indexOf("idcard") != -1&&($.trim(form.val())!=""&&!/^\d{15}(\d{2}[A-Za-z0-9])?$/.test($.trim(form.val())))){
			$(this).parent().addClass("has-feedback has-error");
			$(this).parent().append('<span class="input-error"></span><span class="control-label">'+'身份证号码格式不正确'+'</span>');
			result=false;
		}//验证货币
		else if(vlidateStr.indexOf("currency") != -1&&($.trim(form.val())!=""&&!/^d{0,}(\.\d+)?$/.test($.trim(form.val())))){
			$(this).parent().addClass("has-feedback has-error");
			$(this).parent().append('<span class="input-error"></span><span class="control-label">'+'货币格式不正确'+'</span>');
			result=false;
		}//验证qq
		else if(vlidateStr.indexOf("qq") != -1&&($.trim(form.val())!=""&&!/^[1-9]\d{4,9}$/.test($.trim(form.val())))){
			$(this).parent().addClass("has-feedback has-error");
			$(this).parent().append('<span class="input-error"></span><span class="control-label">'+'QQ号码格式不正确(正确如：453384319)'+'</span>');
			result=false;
		}//验证中文
		else if(vlidateStr.indexOf("chinese") != -1&&($.trim(form.val())!=""&&!/^[\u0391-\uFFE5]+$/.test($.trim(form.val())))){
			$(this).parent().addClass("has-feedback has-error");
			$(this).parent().append('<span class="input-error"></span><span class="control-label">'+'请输入中文'+'</span>');
			result=false;
		}//验证英文
		else if(vlidateStr.indexOf("english") != -1&&($.trim(form.val())!=""&&!/^[A-Za-z]+$/.test($.trim(form.val())))){
			$(this).parent().addClass("has-feedback has-error");
			$(this).parent().append('<span class="input-error"></span><span class="control-label">'+'请输入英文'+'</span>');
			result=false;
		}//验证用户名
		else if(vlidateStr.indexOf("username") != -1&&($.trim(form.val())!=""&&!/^[a-zA-Z][a-zA-Z0-9_]{5,15}$/.test($.trim(form.val())))){
			$(this).parent().addClass("has-feedback has-error");
			$(this).parent().append('<span class="input-error"></span><span class="control-label">'+'用户名不合法（字母开头，允许6-16字节，允许字母数字下划线）'+'</span>');
			result=false;
		}//验证传真
		else if(vlidateStr.indexOf("faxno") != -1&&($.trim(form.val())!=""&&!/^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/.test($.trim(form.val())))){
			$(this).parent().addClass("has-feedback has-error");
			$(this).parent().append('<span class="input-error"></span><span class="control-label">'+'传真号码不正确'+'</span>');
			result=false;
		}//验证邮政编码
		else if(vlidateStr.indexOf("zip") != -1&&($.trim(form.val())!=""&&!/^[0-9]\d{5}$/.test($.trim(form.val())))){
			$(this).parent().addClass("has-feedback has-error");
			$(this).parent().append('<span class="input-error"></span><span class="control-label">'+'邮政编码格式不正确'+'</span>');
			result=false;
		}//验证验证IP地址(因ip在zip中，所以修改ip为Ip)
		else if(vlidateStr.indexOf("Ip") != -1&&($.trim(form.val())!=""&&!/((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))/.test($.trim(form.val())))){
			$(this).parent().addClass("has-feedback has-error");
			$(this).parent().append('<span class="input-error"></span><span class="control-label">'+'IP地址格式不正确'+'</span>');
			result=false;
		}//验证车牌号码
		else if(vlidateStr.indexOf("carNo") != -1&&($.trim(form.val())!=""&&!/d+.d+.d+.d+/.test($.trim(form.val())))){
			$(this).parent().addClass("has-feedback has-error");
			$(this).parent().append('<span class="input-error"></span><span class="control-label">'+'车牌号码无效（例：粤J12350）'+'</span>');
			result=false;
		}//验证发动机型号
		else if(vlidateStr.indexOf("carenergin") != -1&&($.trim(form.val())!=""&&!/d+.d+.d+.d+/.test($.trim(form.val())))){
			$(this).parent().addClass("has-feedback has-error");
			$(this).parent().append('<span class="input-error"></span><span class="control-label">'+'发动机型号无效(例：FG6H012345654584)'+'</span>');
			result=false;
		}//验证msn
		else if(vlidateStr.indexOf("msn") != -1&&($.trim(form.val())!=""&&!/d+.d+.d+.d+/.test($.trim(form.val())))){
			$(this).parent().addClass("has-feedback has-error");
			$(this).parent().append('<span class="input-error"></span><span class="control-label">'+'请输入有效的msn账号(例：abc@hotnail(msn/live).com)'+'</span>');
			result=false;
		}
		else if(vlidateStr.indexOf("age") != -1){//校验年龄在1到100之间
			if($.trim(form.val()) >100 || $.trim(form.val()) == 0 || $.trim(form.val()).indexOf("0") == 0){
				$(this).parent().addClass("has-feedback has-error");
				$(this).parent().append('<span class="input-error"></span><span class="control-label">'+'年龄不合法'+'</span>');
				result=false;
			}
		}//用于校验pop框
		else if(vlidateStr.indexOf("isdefault") != 1){
			if($.trim(form.val()) == "点击选择" || $.trim(form.val()) == ""){
				$(this).parent().addClass("has-feedback has-error");
				$(this).parent().append('<span class="input-error"></span><span class="control-label">'+$(this).attr("valititle")+'</span>');
				result=false;
			}
		}
	});
	return result;
}




/**
 * 删除左右两端的空格
 * @param str
 * @returns
 */
function trim(str){
	if (str) {
		return str.replace(/(^\s*)|(\s*$)/g, "");
	}
	return "";
}

/**************************************** cookie start *******************************************/
function setCookie(name,value){  
    var Days = 30;  
    var exp  = new Date();  
    exp.setTime(exp.getTime() + Days*24*60*60*1000);  
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();  
}  

function getCookie(name){  
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));  
    if(arr != null){  
        return (arr[2]);  
    }else{  
        return "";  
    }  
}  

function delCookie(name){  
    var exp = new Date();  
    exp.setTime(exp.getTime() - 1);  
    var cval=getCookie(name);  
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();  
}  

/**************************************** cookie end *******************************************/

/************************************************JS字符串转JSON-start************************************/
function toJson(data){
	var jsonObj = new Function("return "+data)();
	return jsonObj;
}
/************************************************JS字符串转JSON-start*************************************/
//开始等待
function startLoading() {
	$("<div class=\"datagrid-mask\" style='z-index:100000'></div>").css({
		display : "block", 
		width : "100%",
		height : $(document.body).height()
	}).appendTo("body");
	$("<div class=\"datagrid-mask-msg\" style='z-index:100002;margin-left:-80px;'></div>").html("正在处理，请稍等...").appendTo("body").css({
		display : "block",
		left : "50%",
		top : ($(document.body).height() - 45) / 2
	});
}
// 结束等待
function endLoading() {
	$("div.datagrid-mask-msg").remove();
	$("div.datagrid-mask").remove();
}

/**************************************** 遮罩调用 start **********************************/
/**
 * 显示遮罩
 * flag:提示方式 alert|confirm
 * content:提示内容
 * yesFunc:点击确定执行方法名
 */
function pubShowMask(flag,content,yesFunc){
	$(".prompt").addClass("open");
	$(".prompt-mask").addClass("open");
	yesFunc = yesFunc==undefined?"pubHidMask()":yesFunc;
	var htmlCnt = '<span>'+content+'</span><div class="btn-choice"><button class="btn" onclick="'+yesFunc+'">确定</button>';
	if(flag == "confirm"){
		htmlCnt+='<button class="btn btn-white" onclick="pubHidMask()">取消</button>';
	}
	htmlCnt+='</div>';
	$(".prompt").html(htmlCnt);
};

/**
 * 隐藏遮罩
 */
function pubHidMask(){
	$(".prompt").removeClass("open");
	$(".prompt-mask").removeClass("open");
};

/**************************************** 遮罩调用 end **********************************/


/************************************************验证系统超时-start*************************************/
$(function() {
	$(document).ajaxComplete(function(event, request, settings) {
		redirect(request.responseText);
	});
});

function redirect(response) {
	//你请求访问的页面，暂时找不到，请重新登录，谢谢！
	if (response.indexOf("登录超时,请重新登录!") > -1 ) {
		pubShowMask("alert","登录超时,请重新登录!","sessionOutExitSystem()");
	}
}

function sessionOutExitSystem(){
	var win = window;
	while (win.parent != window.top) {
		win = win.parent;
	}
	win.parent.location.href = "/yusys";
}

/************************************************验证系统超时-end*************************************/


//从URL 中获取参数
$.extend({
	getUrlVars: function(){
	    var vars = [], hash;
	    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	    for(var i = 0; i < hashes.length; i++){
	    	hash = hashes[i].split('=');
	    	vars.push(hash[0]);
	    	vars[hash[0]] = hash[1];
	    }
	    return vars;
	},
	getUrlVar: function(name){
		return $.getUrlVars()[name];
	}
});


/************************************************loading图-start*************************************/
function areaLoadingShow(){
	if(navigator.userAgent.indexOf("MSIE 8.0") == -1 && navigator.userAgent.indexOf("MSIE 9.0") == -1){/*判断不是IE8&&IE9执行*/
		$("body").append('<div class="area-loading"><i class="loading-in"></i><i class="loading-out"></i><span class="loading-jump">拼命加载中，请稍后...</span></div>');
    }else{/*判断是IE8&&IE9执行*/
    	$("body").append('<div class="area-loading"><i></i><span>拼命加载中，请稍后...</span></div>');
    }
	$(".area-loading").show();
	var areaLoadingSpanOW=$(".area-loading span").outerWidth();
	var areaLoadingSpanML=-(areaLoadingSpanOW/2);
	$(".area-loading span").css({width:areaLoadingSpanOW,marginLeft:areaLoadingSpanML});
}
function areaLoadingHide(){
	$(".area-loading").hide();
	$(".area-loading").remove();
}
/************************************************loading图-end*************************************/


/************************************************处理IE8支持indexOf属性-start*************************************/
if (!Array.prototype.indexOf){
	Array.prototype.indexOf = function(elt /*, from*/){
		var len = this.length >>> 0;
		var from = Number(arguments[1]) || 0;
		from = (from < 0) ? Math.ceil(from) : Math.floor(from);
		if(from < 0)
		from += len;
		for(; from < len; from++){
		if (from in this && this[from] === elt)
			return from;
		}
		return -1;
	};
}
/************************************************处理IE8支持indexOf属性-end*************************************/


/************************************************随机ID-start*************************************/
function guid(){
	var s = [];
	var hexDigits = "0123456789abcdef";
	for(var i = 0; i < 36; i++){
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4";
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
	var uuid = s.join("");
	return uuid;
}
/************************************************随机ID-end*************************************/

/************************************************获取当前页签的ID-start*************************************/
function getCurrentTagId(){
	var tagId = "";
	var win = window;
	while (win != window.top) {
		win = win.parent;
	}
	var ulObj = win.document.getElementById("research-tag");
	if(ulObj){
		var $ul = $(ulObj);
		var liObj = $ul.find("li");
		if(liObj){
			var liLen = liObj.length;
			if(liLen > 0){
				var currentLiId = $ul.find("li[class='current']");
				if(currentLiId){
					var currentLiIdVal = currentLiId.attr("id");
					tagId = currentLiIdVal.replace("-tag-casually","");
				}
			}
		}
	}
	return tagId;
}
/************************************************获取当前页签的ID-end*************************************/


/**
 * 生成N位随机数
 */
function getRandomNum(num){
	var str = "";
	if(num && !isNaN(Number(num))){
		//生成num位随机数
		for(var i=0;i<num;i++){
			str += parseInt(10*Math.random());
		}
	}
	return str;
}

/**
 * 根据cnname获取enname
 * @param data
 * @param enname
 * @returns {String}
 */
function getCnnameByEnname(data,enname){
	var cnname = "";
	if(data){
		for(var i=0;i<data.json.length;i++){
			if(data.json[i].ENNAME == enname){
				cnname = data.json[i].CNNAME;
				break;
			}
		}
	}
	return cnname;
}

/**
 * 初始化附件列表
 * @param param 查询参数，格式：{modeid:"xxx",code:"xxx",flag:"xxx",fileid:"xxx"}
 */
function initAttachmentFileList(param){
	var url = contextPath+"/CmsFileWord/queryList.asp";
	if(!param){
		param = {modeid:"xxx",code:"xxx",flag:"xxx",fileid:"xxx"};
	}
	baseAjax(url,param,function(data){
		if(data && data.rows){
			var list = data.rows;
			for(var i=0;i<list.length;i++){
				var row = [
      	        	   		'<td class="bs-checkbox"><input name="btSelectItem" type="checkbox" /></td>',
      	        	   		'<td><a href="javascript:void(0)" onclick="downLoadAttachmentFile(\''+list[i].fileid+'\')">'+list[i].filename+'</a><input type="hidden" value="'+list[i].fileid+'" name="attachmentListCommon.fileid"></td>',
      	        	   		'<td>'+list[i].fileSize+'</td>',
      	        	   		'<td>'+list[i].createDate+'</td>',
      	        	   		'<td class="dis-none"><input type="hidden" value="'+list[i].message+'" name="attachmentListCommon.filePath"></td>'
      	        	   		];
          	   	$('#attachmentTableCommon').cmsBootstrapEditTable("appendRow","attachmentListCommon",row);
			}
		}
	});
}

/**
 * 附件下载两种方式：第一，传fileid下载文档服务器文件。第二，传本地路径和文件名称下载本地文件
 * @param fileid 附件ID
 * @param filePath 附件路径
 * @param fileName 附件名称
 */
function downLoadAttachmentFile(fileid,filePath,fileName){
	//第一种
	if(fileid){
		var url = contextPath+"/Attachment/downloadAttachment.asp?fileid="+fileid;
		window.location = url;
	}
	//第二种
	else if(filePath && fileName){
		var url = contextPath+"/Attachment/downloadTempAttachment.asp?filePath="+filePath+"&fileName="+fileName;
		window.location = url;
	}
}

/**
 * 合并单元格
 * @param data  原始数据（在服务端完成排序）
 * @param fieldName 合并属性名称
 * @param colspan   合并列
 * @param target    目标表格对象
 */
function mergeCells(data,fieldName,colspan,target){
    //声明一个map计算相同属性值在data对象出现的次数和
    var sortMap = {};
    for(var i = 0 ; i < data.length ; i++){
        for(var prop in data[i]){
            if(prop == fieldName){
                var key = data[i][prop]
                if(sortMap.hasOwnProperty(key)){
                    sortMap[key] = sortMap[key] * 1 + 1;
                } else {
                    sortMap[key] = 1;
                }
                break;
            } 
        }
    }
    for(var prop in sortMap){
        console.log(prop,sortMap[prop])
    }
    var index = 0;
    for(var prop in sortMap){
        var count = sortMap[prop] * 1;
        $(target).bootstrapTable('mergeCells',{index:index, field:fieldName, colspan: colspan, rowspan: count});   
        index += count;
    }
}

/**
 * 重置bootstrap-table的script版本到v1.11.0(表格合并单元格用)
 */
function resetBootstrapTableScript(){
	$("script[src='"+contextPath+"/plugin/bootstrap/js/bootstrap-table.min.js']").remove(); 
	$("<scri"+"pt>"+"</scr"+"ipt>").attr({src:contextPath+"/plugin/bootstrap/js/bootstrap-table-v11.min.js"}).appendTo($('head'));
}


/**
 * 千分位转数字
 * str:千分符数字
 * n:保留几位小数
 */
function thousandsToNumber(str,n){  
	if(str!="")
	{
	    str = typeof(str) == "string" ? str : str.toString();       //将传入参数转为字符串以做修改  
	    return parseFloat(str.split(",").join("")).toFixed(n);  	
	}
	else
	{
		return str;
	}

}

/**
 * 整数 小数 封装千分位符
 * number:数字
 * n:保留几位小数
 */
function numberToThousands(number, n) { 
    number = thousandsToNumber(number.toString(),2);                      /*转为字符串*/  
    n = n == undefined || n == 0 ? 0 : n;                               //保留位数    
    var num = (Math.round(number * (Math.pow(10, n))) / (Math.pow(10, n))).toString();          //保留小数位数    
    var rs = num.indexOf('.');          //分离成小数部分和整数部分  
    /*对不足位数的补零*/  
    if (rs < 0) {  
        rs = num.length;  
        num += '.';  
    }  
    while (num.length <= rs + n) {  
        num += '0';  
    }   
    var integer = num.split(".")[0];  
    var decimal = num.split(".")[1];   
    /*保留小数 不保留小数*/  
    return n == 0 ? integer.toString().replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,') : integer.toString().replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,') + "." + decimal;  

}  

/**
 * 必须输入数字
 * @param nodes
 */
function commonMustIsNum(nodes){
nodes.value=nodes.value.replace(/[^-?\d.]/g,'');
}

/**
 * 文本框输入内容是验证是否数据格式,小数点后保留两位
 * @param id
 */
function commonChangeNum(id){
	var nodes = $("#"+id).val();
	var newsaleCostint= /^-?[0-9]\d*([.][0-9]{1,2})?$/;
	var intnewsale=/^-?[0-9]\d*$/;
		if (newsaleCostint.test(nodes)) {
			if (intnewsale.test(nodes)) {
				$("#"+id).val(nodes+".00");
			}
			
		}else{
			var number = Math.round(nodes*100)/100;
			if (intnewsale.test(number)) {
				$("#"+id).val(number+".00");
			}else{
				$("#"+id).val(number);
			}
		}
}
