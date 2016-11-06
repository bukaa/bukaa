var dbId;
$(function() {
	$("#approveOpinion").val("同意");
	$('input').on('ifChecked', function(event){
		var val = event.target.value;
		if(val == '1'){
			$("#approveOpinion").val("同意");
		}
		if(val == '0'){
			$("#approveOpinion").val("不同意");
		}
	});
	formId = "mainForm";

	// 验证规则
	rules = {
		"approveConclusion" : {
			required : true
		},
		"approveOpinion" : {
			required : true,
			minlength : 2,
			maxlength : 50
		}
	};
	
	// 初始化表单
	commonInitForm();
	
//  $("input[name='approveConclusion']").on('ifChecked', function(event){
//    	$(this).val("1");
//	}).on('ifUnchecked', function(event){
//		$(this).val("0");
//	});
	
})

//保存服务
function saveApprove(){
	if($("#mainForm").valid()){
		$("#mainForm").submit();
	}
}

function getDeveloperInfo(id){
	var url = urlpath+'/pro/approve/getDeveloperInfo.sd?id='+id;
	layer.open({
		type: 2,
		title: false,
		area: ["80%", "90%"],
		content: url
	});
}
