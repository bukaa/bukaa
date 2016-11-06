
$(function(){
	
	//表单Id
	formId = "roleLevelForm";
	
	//验证规则
	rules = {
			name: {
				required: true
			},
			level: {
				required: true,
				digits: true
			},
			intro:{
				maxlength: 255
			}
	};
	
	//初始化表单
	commonInitForm();
})