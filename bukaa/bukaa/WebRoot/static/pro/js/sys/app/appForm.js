
$(function(){
	
	//表单Id
	formId = "appForm";
	
	//验证规则
	rules = {
			name: {
				required: true,
				minlength: 4,
				maxlength: 50
			},
			code:{
				required: true,
				minlength: 3,
				maxlength: 50
			},
			orderId: {
				required: true,
				minlength: 1,
				maxlength: 3
			},
			indexUrl:{
				maxlength: 255
			},
			intro:{
				maxlength: 255
			}
	};
	
	//初始化表单
	commonInitForm();
})