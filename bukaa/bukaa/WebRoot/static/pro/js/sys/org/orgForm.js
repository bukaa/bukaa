
$(function(){
	
	//表单Id
	formId = "orgForm";
	
	//验证规则
	rules = {
			name: {
				required: true,
				maxlength: 50
			},
			code:{
				required: true,
				maxlength: 12
			},
			address:{
				maxlength: 200
			},
			phone:{
				isMobile: true,
				maxlength: 20
			},
			orderId:{
				min:0
			}
	};
		
	//初始化表单
	commonInitForm();
	
	$("input[dic='true']").dic();
});
