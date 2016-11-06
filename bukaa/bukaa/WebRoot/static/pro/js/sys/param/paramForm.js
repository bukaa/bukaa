
$(function(){
	
	//表单Id
	formId = "paramForm";
	
	//验证规则
	rules = {
			name: {
				required: true,
				maxlength: 50
			},
			mark:{
				required: true,
				maxlength: 20
			},
			value:{
				required: true,
				maxlength: 255
			},
			intro:{
				maxlength: 255
			}
	};
		
	//初始化表单
	commonInitForm();
});
