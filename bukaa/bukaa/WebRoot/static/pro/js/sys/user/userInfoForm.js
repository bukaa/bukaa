$(function(){
	
	//表单Id
	formId = "userInfoForm";
	
	//验证规则
	rules = {
			realName:{
				required: true,
				maxlength: 100
			},
			sex:{
				required: true
			},
			idCard:{
				isIdCardNo: true
			},
			phone:{
				maxlength: 20,
				isPhone: true
			},
			mobile:{
				maxlength: 20,
				isMobile: true
			},
			email:{
				maxlength: 50,
				email: true
			}
	};
		
	//初始化表单
	commonInitForm();
	
	init();
	
});

function init(){
	setPostResponse(formPostResponse);
	
	$("input[dicName]").dic();
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
	}
}