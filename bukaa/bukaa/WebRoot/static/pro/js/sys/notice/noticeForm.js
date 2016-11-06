
//编辑器
var editor = null;

$(function(){
	
	//表单Id
	formId = "noticeForm";
	
	//初始化有效期
	$('.input-daterange').datepicker({
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        todayBtn: "linked",
        todayHighlight: true
    });
            
	//初始化编辑器
	CKEDITOR.config.height = 300;
	editor = CKEDITOR.replace("content");
	
	//验证规则
	rules = {
			title: {
				required: true
			}
	};
	
	//初始化表单
	setCommitHandler(formCommitHandler);
	commonInitForm();
})

//表单提交前处理事件
function formCommitHandler(form){
	var content = editor.getData();
	if(content != ""){
		$("#content").val(content);
		
		var options = getSubmitOptions(preRequest, postResponse);
		$(form).ajaxSubmit(options);
	}
	else{
		confirmError("请输入公告内容！");
	}
}
