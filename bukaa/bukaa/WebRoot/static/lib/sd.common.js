
/**
 * 判断字符串是不是标准的json串,其中属性名称都必须带上双引号
 * @param {String} str 待判断的字符串
 */
function isJsonString(str){
	var result = true;
	try{
		JSON.parse(str);
	}catch(e){
		result = false;
	}
	
	return result;
}

/**
 * 判断字符串是否以suffix串结尾
 * @param {string} str 要判断的字符串
 * @param {string} suffix 结尾字符串
 * @return {Boolean}
 */
function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

/**
 * 判断是否为空串
 * @param {string} str 要判断的字符串
 * @return {Boolean}
 */
function isNullBlank(str){
	if(str && str.length > 0) return false;
	 return true;
}

/**
 * 停止事件冒泡
 * @param {Event} event
 */
function stopEventBubble(event){
	//FireFox浏览器
	if(event.stopPropagation){
		event.stopPropagation();
	}
	
	//IE浏览器
	else{
		event.cancelBubble = true;
	}
}

/**
 * 设置控件的值(主要是null值进行过滤)
 * @param id 控件ID
 * @param value 控件值
 */
function setValue(id, value){
	if(value != 'null'){
		$('#' + id).val(value);
	}
}

/**
 * 设置单选按钮的选中值(主要针对ligerui)
 * @param name 单选按钮的名称
 * @param value 选中值
 */
function setRadioValue(name, value){
	if(value && value != ''){
		$('input[type=radio][name=' + name + ']').each(function(){
			if(this.value == value){
				this.checked = true;
				$(this).parent().find('.l-radio').addClass('l-radio-checked');
			}
			else{
				$(this).parent().find('.l-radio').removeClass('l-radio-checked');
			}
		});
	}
}

/**
 * 设置简拼(例如将'应用系统'转换为'yyxt')-源和目标必须均为文本框控件,在页面中必须引入'lib/sundun.spell.js'
 * @param source 源控件的名称
 * @param target 目标控件的名称
 * @param validatorTxt 验证器的提示文本
 */
function setJP(source, target, validatorTxt){
	setPY(source, target, validatorTxt, true, false);
}

/**
 * 设置全拼(例如将'应用系统'转换为'yingyongxitong')-源和目标必须均为文本框控件,在页面中必须引入'lib/sundun.spell.js'
 * @param source 源控件的名称
 * @param target 目标控件的名称
 * @param validatorTxt 验证器的提示文本
 */
function setQP(source, target, validatorTxt){
	setPY(source, target, validatorTxt, false, false);
}

/**
 * 强制设置简拼(例如将'应用系统'转换为'yyxt')-源和目标必须均为文本框控件,在页面中必须引入'lib/sundun.spell.js'
 * @param source 源控件的名称
 * @param target 目标控件的名称
 * @param validatorTxt 验证器的提示文本
 */
function setJPForce(source, target, validatorTxt){
	setPY(source, target, validatorTxt, true, true);
}

/**
 * 强制设置全拼(例如将'应用系统'转换为'yingyongxitong')-源和目标必须均为文本框控件,在页面中必须引入'lib/sundun.spell.js'
 * @param source 源控件的名称
 * @param target 目标控件的名称
 * @param validatorTxt 验证器的提示文本
 */
function setQPForce(source, target, validatorTxt){
	setPY(source, target, validatorTxt, false, true);
}

/**
 * 设置拼音(例如将'应用系统'转换为'yyxt')-源和目标必须均为文本框控件,在页面中必须引入'lib/sundun.spell.js'
 * @param source 源控件的名称
 * @param target 目标控件的名称
 * @param validatorTxt 验证器的提示文本
 * @param isJp 是否简拼
 * @param isForce 是否强制转换(如果是强制转换，则不管目标有没有值，都根据源控件的值转换拼音)
 */
function setPY(source, target, validatorTxt, isJp, isForce){
	var sourceControl = $('input[name=' + source + ']');
	var targetControl = $('input[name=' + target + ']');
	var sourceValue = sourceControl.val();
	var targetValue = targetControl.val();
	
	if(sourceValue != '' && ((targetValue == '' || targetValue == validatorTxt)) || isForce){
		var spellValue = getSpell(sourceValue, isJp);
		targetControl.val(spellValue);
		targetControl.removeClass("l-text-invalid");
		targetControl.removeClass("l-text-field-null");
		targetControl.removeAttr("title").ligerHideTip();
	}
}

//字体图标对应元素
var iconFontElement = null;

//字体图标选择元素
var iconFontSelectElement = null;

/**
 * 选择图标
 * @param obj 点击选择图标的控件
 * @param elementId 要设置字体图标的元素Id
 */
function selectIcon(obj, elementId){
	iconFontSelectElement = $(obj);
	if(elementId != ""){
		iconFontElement = $("#" + elementId);
	}
	
	var iconUrl = urlpath + "iconfont.jsp";
	var selectPage = layer.open({
		type: 2,
		title: "字体图标选择",
		area: ["95%", "90%"],
		btn: ['关闭'],
		content: iconUrl
	});
}

/**
 * 设置字体图标
 * @param iconFont 字体样式
 */
function setIcon(iconFont){
	if(iconFontElement){
		iconFontElement.val(iconFont);
	}
	
	if(iconFontSelectElement){
		if(iconFontSelectElement.find("span").length > 0){
			iconFontSelectElement.find("span").removeClass();
			iconFontSelectElement.find("span").addClass(iconFont);
		}
	}
}

/**
 * 初始化字体图标
 * @param elementId 要设置字体图标的元素Id
 */
function initIcon(elementId){
	if($("#" + elementId).val() != ""){
		var iconSpan = $("#" + elementId).parent().find("span span");
		if(iconSpan.length > 0){
			iconSpan.removeClass();
			iconSpan.addClass($("#" + elementId).val());
		}		
	}
}

/**
 * 对话框-没有选择数据
 */
function alertNoData(){
	swal({
    	title: "没有选择任何数据！",
        type: "error",
        confirmButtonText: "关闭"
	});
}

/**
 * 对话框-确认
 * @param title 标题
 * @param callback 回调函数
 */
function confirm(title, callback){
	swal({
            title: title,
            type: "info",
            closeOnConfirm: false,
            showCancelButton: true,
            confirmButtonColor: "#1A7BB9",
            confirmButtonText: "确定",
            cancelButtonText: "取消"
	}, callback);
}

/**
 * 对话框-确认删除(批量)
 * @param callback 回调函数
 */
function confirmDelete(callback){
	swal({
            title: "您确定要删除这些数据吗？",
            text: "删除后将无法恢复，请谨慎操作！",
            type: "warning",
            closeOnConfirm: false,
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "删除",
            cancelButtonText: "取消"
	}, callback);
}

/**
 * 对话框-确认删除(行删除)
 * @param callback 回调函数
 */
function confirmDeleteRow(callback){
	swal({
            title: "您确定要删除这条数据吗？",
            text: "删除后将无法恢复，请谨慎操作！",
            type: "warning",
            closeOnConfirm: false,
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "删除",
            cancelButtonText: "取消"
	}, callback);
}

/**
 * 对话框-确认成功
 */
function confirmSuccess(msg, callback){
	var iconType = "success";
	var confirmText = "关闭";
	
	if(callback){
		swal({
	    	title: msg,
	        type: iconType,
	        closeOnConfirm: false,
	        confirmButtonText: confirmText
		}, callback);
	}
	else{
		swal({
	    	title: msg,
	        type: iconType,
	        closeOnConfirm: true,
	        confirmButtonText: confirmText
		});
	}
}

/**
 * 对话框-确认警告
 */
function confirmWarning(msg, callback){
	var iconType = "warning";
	var confirmText = "关闭";
	
	if(callback){
		swal({
	    	title: msg,
	        type: iconType,
	        closeOnConfirm: false,
	        confirmButtonText: confirmText
		}, callback);
	}
	else{
		swal({
	    	title: msg,
	        type: iconType,
	        closeOnConfirm: true,
	        confirmButtonText: confirmText
		});
	}
}

/**
 * 对话框-确认失败
 */
function confirmError(msg, callback){
	var iconType = "error";
	var confirmText = "关闭";
	
	if(callback){
		swal({
	    	title: msg,
	        type: iconType,
	        closeOnConfirm: false,
	        confirmButtonText: confirmText
		}, callback);
	}
	else{
		swal({
	    	title: msg,
	        type: iconType,
	        closeOnConfirm: true,
	        confirmButtonText: confirmText
		});
	}
}

/**
 * 对话框-确认表单
 * @param title 提醒标题
 */
function confirmForm(title){
	var text = "继续" + (editMode ? "编辑" : "添加") + "吗？";
	swal({
            title: title,
            text: text,
            type: "success",
            showCancelButton: true,
            cancelButtonText: "否",
            confirmButtonColor: "#18A689",
            confirmButtonText: "是"
	}, function(isConfirm){
		if(isConfirm){
			enabledSubmitButton();
			parent.refreshTable();
			if(!editMode){
				window.location.href = window.location.href;
			}
		}
		else{
			var parentIndex = parent.layer.getFrameIndex(window.name);
			parent.refreshTable();
			parent.layer.close(parentIndex);
		}
	});
}
