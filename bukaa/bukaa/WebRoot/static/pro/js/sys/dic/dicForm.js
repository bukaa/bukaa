var tableDic;
$(function(){
	
	//表单Id
	formId = "dicForm";
	
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
			nameField:{
				maxlength: 30
			},
			codeField:{
				maxlength: 30
			},
			fspellField:{
				maxlength: 30
			},
			sspellField:{
				maxlength: 30
			},
			filterSql:{
				maxlength: 500
			},
			sortSql:{
				maxlength: 500
			},
			intro:{
				maxlength: 255
			}
	};
		
	//初始化表单
	commonInitForm();
	
	//事件绑定
	eventBind();
	
	$(".chosen-select").chosen({
		width : "100%",
		allow_single_deselect : true,
		no_results_text : '未找到匹配项!'
	}).change(function(){
		var curvalue = $(this).val();
		initDic(curvalue,"");
	});
	var dbId = $("#dbId").val();
	if(dbId){
		initDic(dbId,$("#tableName").val());
	}
	//$("#tableName").dic({"data":[],"valueField":"name","labelField":"comment","column":['comment']});
});


function initDic(dbId,initValue){
	$.post(urlpath + "system/dic/getTablesByDbId.sd",{dbId:dbId},function(data){
		$("#dicDiv").empty().append('<input type="text" name="tableName" id="tableName" class="form-control" value="'+initValue+'" placeholder="请选择"/>');
		$("#tableName").dic({"data":data.rows,"valueField":"name","labelField":"comment","column":['comment']});
	},'json');
}

//事件绑定
function eventBind(){
	$("input[name='isRef']").on('ifChecked', function(){
		refToggle();
	});
	
	refToggle();
}

//引用切换
function refToggle(){
	if($("input[name='isRef']:checked").val()=="true"){
		$(".toggle-ref").show();
	}else{
		$(".toggle-ref").hide();
	}
}