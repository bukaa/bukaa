var loading;
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
			"queryScript.name": {
				required: true,
				minlength: 4,
				maxlength: 255
			},
			"queryScript.idDatabase": {
				required: true
			},
			"queryScript.queryScript": {
				required: true,
				maxlength: 4000
			}
	};
	
	$(".chosen-select").chosen({
		width : "100%",
		search_contains: true,
		allow_single_deselect : true,
		no_results_text : '没有找到匹配项目!'
	});
	
	//脚本测试
	$("#testBtn").bind("click",function(){
		var dbId = $("select[name='queryScript.idDatabase']").val();
		if(!dbId){
			confirmError("请选择数据源！");
			return;
		}
		
		var queryScript = $("textarea[name='queryScript.queryScript']").val();
		if(!queryScript){
			confirmError("请输入查询脚本！");
			return;
		}
		
		loading = layer.load(0,{shade:0.05,offset: '40%'}); 
		var url = urlpath + "meta/res/testQueryScript.sd";
		$.post(url, {dbId: dbId, queryScript:queryScript}, function(data){
			layer.close(loading);
			if(data.success){
				confirmSuccess(data.msg);
				$("#testResult").val("1");
			}else{
				//confirmError(data.msg);
				layer.alert(data.msg, {icon: 2, area: ['600px', '400px']});
				$("#testResult").val("0");
			}
		}, "json");
	});
	
	//初始化表单
	commonInitForm();
	
})

function save() {
	if($("#" + formId).valid()){
		if($("#testResult").val() == "0"){
			swal({
		        title: "查询脚本测试不通过，你确定要保存吗?",
		        type: "warning",
		        closeOnConfirm: false,
		        showCancelButton: true,
		        confirmButtonColor: "#1AB394",
		        confirmButtonText: "保存",
		        cancelButtonText: "取消"
			}, function(){
				$("#" + formId).submit(); 
			});
		}else{
			var fileLen = uploader.getFiles().length;
			if(fileLen == 1){
				$("#resourceBtn").addClass("disabled").attr({ disabled:"disabled"});
				layerIdx = layer.load(0,{shade:0.05,offset: '40%'});
				uploader.options.formData = $("form").serializeObject();
				console.log(uploader.options.formData);
				uploader.upload();
			}else{
				$("#" + formId).submit(); 
			}
		}
	}
}