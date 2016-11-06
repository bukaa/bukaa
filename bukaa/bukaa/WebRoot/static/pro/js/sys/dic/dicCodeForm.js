
$(function(){
	
	//表单Id
	formId = "dicCodeForm";
	
	//验证规则
	rules = {
			name: {
				required: true,
				maxlength: 100
			},
			code:{
				required: true,
				maxlength: 12
			},
			fullSpell: {
				required: true,
				maxlength: 50
			},
			simpleSpell:{
				maxlength: 20
			},
			intro:{
				maxlength: 255
			}
	};
		
	//初始化表单
	commonInitForm();
	
});
