
$(function(){
	
	//表单Id
	formId = "bottonForm";
	
	//验证规则
	rules = {
			name: {
				required: true
			},
			mark: {
				required: true
			},
			orderId: {
				digits: true
			}
	};
	
	//初始化表单
	setPostResponse(formPostResponse);
	commonInitForm();
})

/**
 * 引用常用按钮
 * @param {String} name 名称
 * @param {String} mark 标志
 * @param {int} location 位置
 * @param {int} orderId 排列顺序
 * @param {String} btnClass 字体图标
 */
function refCommonButton(name, mark, location, orderId, btnClass){
	$("#name").val(name);
	$("#mark").val(mark);
	$("#orderId").val(orderId);	
	$("input[name=location][value=" + location + "]").iCheck('check');	
	$("#btnClass").val(btnClass);
	$(".input-group-addon").find("span").removeClass();
	$(".input-group-addon").find("span").addClass(btnClass);
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
				parent.refreshButtonTable();
				if(!editMode){
					window.location.href = window.location.href;
				}
			}
			else{
				var parentIndex = parent.layer.getFrameIndex(window.name);
				parent.refreshButtonTable();
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

