
$(function(){
	//初始化选择标签
	chosenMultiInit("select[name='roleIds']", $("#roleIdsTemp").val());
	chosenMultiInit("select[name='roleLevelIds']", $("#roleLevelIdsTemp").val());
	
	//初始化chosen
	$(".chosen-select").chosen({
		width : "100%",
		search_contains: true,
		allow_single_deselect : true,
		no_results_text : '没有找到匹配项目'
	});
	
	//表单Id
	formId = "permForm";
	
	//验证规则
	rules = {
			priority: {
				required: true,
				digits: true
			},
			queryScript: {
				required: true
			}
	};
	
	//初始化表单
	setCommitHandler(formCommitHandler);
	setPostResponse(formPostResponse);
	commonInitForm();
	
	//授权模式改变事件
	modeChanged();
	$("input[name=mode]").on("ifChecked", function(){
		modeChanged();
	});
})

//授权模式改变事件
function modeChanged(){
	var mode = $("input[name=mode]:checked").val();
	if(mode == "0"){
		$(".role").show();
		$(".rolelevel").hide();
	}
	else{
		$(".rolelevel").show();
		$(".role").hide();
	}
}

//Chosen数据初始化
function chosenMultiInit(select, values){ 
	if(values && values.length > 0) {
		var arr = values.split(',');
	    var length = arr.length; 
	    var value = ''; 
	    for(i = 0; i < length; i++){
	        value = arr[i];  
	        $(select + " option[value='" + value + "']").attr('selected', 'selected');
	    }
	    $(select).trigger("liszt:updated");
	}
}

//表单提交前处理事件
function formCommitHandler(form){
	var currentSelect;
	var roleIds = "";
	var roleLevelIds = "";
	var mode = $("input[name=mode]:checked").val();
	if(mode == "0"){
		currentSelect = $("#roleIds");
		if(currentSelect.val() == null || currentSelect.val() == ""){
			confirmError("请选择要授权的角色！");
			return;
		}
		else{
			$("#roleNames").val(getSelectText(currentSelect));
		}
	}
	else if(mode == "1"){
		currentSelect = $("#roleLevelIds");
		if(currentSelect.val() == null || currentSelect.val() == ""){
			confirmError("请选择要授权的角色级别！");
			return;
		}
		else{
			$("#roleLevelNames").val(getSelectText(currentSelect));
		}
	}
	
	var options = getSubmitOptions(preRequest, postResponse);
	$(form).ajaxSubmit(options);
}

/**
 * 获取下拉框选择的文本
 * @param select 下拉框
 * @param ids 选择的值
 */
function getSelectText(select){
	var text = "";
	var idStr = select.val() + "";
	var idArr = idStr.split(",");
	for(var i = 0; i < idArr.length; i ++){
		select.find("option").each(function(){
			if($(this).val() == idArr[i]){
				if(text != ""){
					text += ",";
				}
				text += $(this).text();
				return false;
			}
		});
	}
	
	return text;
}

//表单提交之后的处理事件
function formPostResponse(responseText, statusText){
	layer.close(layerLoading);
	
	//处理成功
	if(responseText.success){
		swal({
	            title: responseText.msg,
	            text: "继续" + (editMode ? "编辑" : "添加") + "吗？",
	            type: "success",
	            showCancelButton: true,
	            cancelButtonText: "否",
	            confirmButtonColor: "#18A689",
	            confirmButtonText: "是"
		}, function(isConfirm){
			if(isConfirm){
				enabledSubmitButton();
				parent.refreshPermTable();
				if(!editMode){
					window.location.href = window.location.href;
				}
			}
			else{
				var parentIndex = parent.layer.getFrameIndex(window.name);
				parent.refreshPermTable();
				parent.layer.close(parentIndex);
			}
		});
	}
	
	//处理失败
	else{
		$("#" + submitBtn).removeClass("disabled");
		$("#" + submitBtn).attr("disabled", false);
		confirmError(responseText.msg);
	}
}
