var dbId;
$(function() {

	formId = "mainForm";

	// 验证规则
	rules = {
		"resource.name" : {
			required : true,
			minlength : 4,
			maxlength : 50
		},
		"resource.cname" : {
			required : true,
			minlength : 3,
			maxlength : 50
		},
		"resource.catName" : {
			required : true,
			maxlength : 255
		},
		"resource.deptName" : {
			required : true,
			maxlength : 255
		},
		"table.idDatabase" : {
			required : true
		},
		"table.name" : {
			required : true
		},
		"table.cname" : {
			required : true
		}
	};
	
	$(".chosen-select").chosen({
		width : "100%",
		search_contains: true,
		allow_single_deselect : true,
		no_results_text : '没有找到匹配项目'
	});
	
	//数据源下拉框触发事件
	$("select[name='table.idDatabase']").change(function(){ 
		$("input[name='table.name']").val("");
		$("input[name='table.cname']").val("");
		$(this).blur();
	});
	
	// 选择数据表
	$("#chooseTable").bind("click", function(){
		// 数据源id
		dbId = $("select[name='table.idDatabase']").val();
		if(!dbId){
			confirmError("请选择数据源！");
			return;
		}
		
		var tableUrl = urlpath + "meta/table/list.sd?dbId=" + dbId;
		layer.open({
			type: 2,
			title: "选择数据表",
			area: ["60%", "90%"],
			skin: 'layui-layer-molv',
			content: tableUrl,
			maxmin: true
		});
	})
	
	// 初始化表单
	commonInitForm();
	
	$("div.field").hide();
})

//初始化数据列表
function initFieldTable(){
	var tableName = $("input[name='table.name']").val();
	if(!tableName){
		$("#fieldDiv").empty();
		return;
	}
	
	var loading = layer.load(0,{shade:0.05,offset: '40%'});
	var url = urlpath + "meta/table/importField.sd?tableName=" + tableName + "&dbId=" + dbId;
	$("#fieldDiv").load(url,function(){
		$("input[name='table.name']").blur();
		$("input[name='table.cname']").blur();
		layer.close(loading);
	});
}