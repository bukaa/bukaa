
//主键属性
var keyField = "id";

//是否编辑模式
var editMode = false;

//表单Id
var formId = "";

//验证规则
var rules = {};

//验证错误信息
var messages = {};

//提交按钮名称
var submitBtn = "submitBtn";

//关闭按钮名称
var closeBtn = "closeBtn";

//提交前的预处理事件
var preRequest;

//接收回复后的处理事件
var postResponse;

//提交处理句柄
var commitHandler;

//层加载对话框
var layerLoading;

//初始化编辑模式
function initMode(){
	if(keyField != null && $("#" + keyField) && $("#" + keyField).val() != ""){
		editMode = true;
	}
	else{
		editMode = false;
	}
}

//初始化表单
function commonInitForm(){
	
	//初始化页面模式
	initMode();
	
	//表单提交
	$("#" + submitBtn).click(function() {
		$("#" + formId).submit();
	});
	
	//表单关闭
	$("#" + closeBtn).click(function() {
		var parentIndex = parent.layer.getFrameIndex(window.name);
		if(parentIndex)
			parent.layer.close(parentIndex);
		else
			window.close();
	});
	
	//单选/多选按钮初始化
	initChecks();
	
	//表单提交前的处理
	if(!preRequest) preRequest = showRequest;
	
	//表单提交后的处理
	if(!postResponse) postResponse = showResponse;

	//提交处理
	if(!commitHandler) commitHandler = function(form){
		var options = getSubmitOptions(preRequest, postResponse);
		$(form).ajaxSubmit(options);
    };
	
	//表单验证
	if(formId != ""){
		$("#" + formId).validate({
			ignore:":input:hidden[class*='ignore']",//隐藏域也验证,忽略ignore样式的隐藏域
			rules: rules,
			messages:messages,
			onkeyup: function(element) {$(element).valid()},
			focusCleanup: false,
			success: "valid",
			submitHandler: commitHandler
		});
	}
}

//表单提交之前的处理事件
function showRequest(formData, jqForm, options) {
	layerLoading = layer.load(0,{shade:0.05, offset: '40%'});
	if(submitBtn != ""){
		disabledSubmitButton();
		return true;
	}
}

//表单提交之后的处理事件
function showResponse(responseText, statusText){
	layer.close(layerLoading);
	
	//处理成功
	if(responseText.success){
		var title = responseText.msg;
		confirmForm(title);
	}
	
	//处理失败
	else{
		$("#" + submitBtn).removeClass("disabled");
		$("#" + submitBtn).attr("disabled", false);
		confirmError(responseText.msg);
	}
}

//单选/多选按钮初始化
function initChecks(){
	if(typeof($('.i-checks').iCheck) != "undefined"){
		$('.i-checks').iCheck({
	        checkboxClass: 'icheckbox_square-green',
	        radioClass: 'iradio_square-green'
	    });
	}
}

//禁用提交按钮
function disabledSubmitButton(){
	$("#" + submitBtn).addClass("disabled");
	$("#" + submitBtn).attr("disabled", true);
}

//启用提交按钮
function enabledSubmitButton(){
	$("#" + submitBtn).removeClass("disabled");
	$("#" + submitBtn).attr("disabled", false);
}

//获取常用提交选项
function getSubmitOptions(showCommonRequest, showCommonResponse){
	var options = {};

	if(showCommonRequest)
		options.beforeSubmit = showCommonRequest;
	else
		options.beforeSubmit = showRequest;

	if(showCommonResponse)
		options.success = showCommonResponse;
	else
		options.success = showResponse;

	options.isReset = true;
	options.type = 'post';
	options.dataType = 'json';
	
	return options;
}

//设置请求之前的处理事件
function setPreRequest(formPreRequest){
	preRequest = formPreRequest;
}

//设置请求回复之后的处理事件
function setPostResponse(formPostResponse){
	postResponse = formPostResponse;
}

//设置提交时的处理事件
function setCommitHandler(formCommitHandler){
	commitHandler = formCommitHandler;
}
