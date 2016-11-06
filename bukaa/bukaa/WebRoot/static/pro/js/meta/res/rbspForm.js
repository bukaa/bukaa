$(function(){
	
	formId = "mainForm";
	
	//验证规则
	rules = {
			"resource.name": {
				required: true,
				minlength: 4,
				maxlength: 50
			},
			"resource.cname": {
				required: true,
				minlength: 3,
				maxlength: 50
			},
			"resource.catName": {
				required: true,
				maxlength: 255
			},
			"resource.deptName": {
				required: true,
				maxlength: 255
			},
			"rbsp.name": {
				required: true,
				minlength: 4,
				maxlength: 255
			},
			"rbsp.ip": "ip",
			"rbsp.port": {
				required: true,
				digits: true
			}
	};
	
	//初始化表单
	commonInitForm();
	
})
