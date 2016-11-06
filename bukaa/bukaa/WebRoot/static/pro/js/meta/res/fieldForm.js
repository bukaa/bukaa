$(function(){
	//表单Id
	formId = "fieldForm";
	
	rules = {
			name: {
				required: true,
				maxlength: 50
			},
			cname: {
				required: true,
				maxlength: 50
			},
			fieldLength: {
				required: true,
				digits: true
			},
			orderId: {
				required: true,
				digits: true
			}
	};
	messages  = {
			name: {required: "必填项"},
			cname: {required: "必填项"},
			fieldLength:{required: "必填项"},
			orderId:{required: "必填项"}
	}
	
	// 初始化表单
	commonInitForm();
})

// 选择数据表
$("#chooseTableMetaData").bind("click", function(){
	var tableUrl = urlpath + "meta/manager/tableList.sd";
	layer.open({
		type: 2,
		title: "选择标识符",
		area: ["60%", "580px"],
		skin: 'layui-layer-molv',
		content: tableUrl,
		maxmin: true
	});
});


function initFieldTable() {
	
}
