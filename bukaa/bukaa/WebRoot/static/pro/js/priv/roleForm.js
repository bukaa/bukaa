
$(function(){
	
	//表单Id
	formId = "roleForm";
	
	//验证规则
	rules = {
			name: {
				required: true
			},
			code: {
				required: true,
				digits: true
			},
			levelId: {
				required: true
			},
			intro:{
				maxlength: 255
			}
	};
	
	//初始化表单
	commonInitForm();
})