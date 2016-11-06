$(function(){
	
	//表单Id
	formId = "passForm";
	
	//验证规则
	rules = {
			oldLoginPass:{
				required: true,
				maxlength: 50,
				isRightfulString: true
			},
			newLoginPass:{
				required: true,
				maxlength: 50,
				isRightfulString: true
			},
			cLoginPass:{
				required: true,
				maxlength: 50,
				isRightfulString: true,
				equalTo: '#newLoginPass'
			}
	};
	
	messages = {
			cLoginPass:{
				equalTo: "两次输入密码不一致"
			}
	};
		
	//初始化表单
	commonInitForm();
	
	init();
});

//初始化
function init(){
	setCommitHandler(commitHandler);
	setPostResponse(formPostResponse);
}


//提交时的处理事件
function commitHandler(form) {
	$("#oldLoginPass").val($.md5($("#oldLoginPass").val()).toUpperCase());
	$("#newLoginPass").val($.md5($("#newLoginPass").val()).toUpperCase());
	$("#cLoginPass").val($.md5($("#cLoginPass").val()).toUpperCase());
	
	var options = getSubmitOptions(preRequest, postResponse);
	$(form).ajaxSubmit(options);
}


function formPostResponse(responseText, statusText){
	layer.close(layerLoading);
	$("#" + submitBtn).removeClass("disabled");
	$("#" + submitBtn).attr("disabled", false);
	
	//处理成功
	if(responseText.success){
		confirmSuccess(responseText.msg);
		/*layer.alert(responseText.msg, {icon: 1}, function(){
			window.location.href = window.location.href;
		});*/
	}
	
	//处理失败
	else{
		confirmError(responseText.msg);
		//layer.alert(responseText.msg, {icon: 2});
		$(".form-control").val("");
	}
}
