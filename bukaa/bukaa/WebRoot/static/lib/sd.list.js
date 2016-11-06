
//增删改转向地址
var addUrl = null;
var editUrl = null;
var deleteUrl = null;

//Bootstrap Table
var bsTable = $("#table");

//主键属性
var keyField = "id";

//表格字典名称
var tableDicNames;

//表格字典字段名称
var tableDicFieldNames;

//初始化操作按钮
function initOperButton(){
	
	//搜索按钮
	$("#searchBtn").click(function(){
		refreshTable();
	});
	
	//回车搜索
	$("#searchBtn").parent().find("input[type=text]").keydown(function(e){
         if (e && e.keyCode == 13 ){
             refreshTable();
         }
	});
	
	//重置按钮
	$("#resetBtn").click(function(){
		
		//清空搜索项
		$(".condition").each(function(){
			$(this).val("");
		});
		
		refreshTable();
	});
	
	//新增按钮
	$("#newBtn").click(function(){
		commonAddClicked();
	});
	
	//删除按钮
	$("#deleteBtn").click(function(){
		commonDeleteClicked();
	});
	
	//解决当浏览器窗口变化时，表头与表格不对齐的问题
	$(window).resize(function () { 
		if(bsTable){
			bsTable.bootstrapTable('resetView', {
	            height: getHeight()
	        });
		}
    });
}

//获取列表高度
function getHeight() {
    return $(window).height() - $('#toolbar').outerHeight(true) - 58;
}

/**
 * 获取列表行数据
 * @param {} id 行主键
 * @return {}
 */
function getRowData(id){
	return bsTable.bootstrapTable('getRowByUniqueId', id);
}

//通用添加事件
function commonAddClicked(){
	layer.open({
		type: 2,
		title: "添加数据",
		area: ["100%", "100%"],
		content: addUrl
	});
}

//通用编辑事件
function commonEditClicked(id){
	if(editUrl != null && id){
		layer.open({
			type: 2,
			title: "编辑数据",
			area: ["100%", "100%"],
			content: editUrl + '/' + id + '.sd'
		});
	}
}

//通用删除事件
function commonDeleteClicked(){
	if(bsTable != null){
		var selectedRows = bsTable.bootstrapTable('getSelections');
		if(selectedRows.length > 0){
			var checkedIds = [];
			$(selectedRows).each(function(){
				checkedIds.push(this[keyField]);
			});
			
			//确认删除
			confirmDelete(function(){
				$.ajax({
	                type: "get",
	                cache: false,
	                url: deleteUrl + '/' + checkedIds.join(',') + '.sd',
	                dataType: "json",
	                success: function(data){
	                    if(data.success){
	                    	confirmSuccess(data.msg);
	                    	refreshTable();
	                    }
	                    else{
	                    	confirmError(data.msg);
	                    }
	                }
	            });
			});
		}
		else{
			alertNoData();
		}
	}
}

//通用行删除事件
function commonRowDeleteClicked(id){
	if(deleteUrl != null){
		
		//确认删除
		confirmDeleteRow(function(){
			$.ajax({
                type: "get",
                cache: false,
                url: deleteUrl + '/' + id + '.sd',
                dataType: "json",
                success: function(data){
                    if(data.success){
                    	confirmSuccess(data.msg);
                    	refreshTable();
                    }
                    else{
                    	confirmError(data.msg);
                    }
                }
            });
		});
	}
}

//是否类型格式化
function yesOrNoFormatter(value, row, index){
	if(value == 1 || value == true) return "<span class='label label-primary radius'>是</span>";
	else return "<span class='label label-danger radius'>否</span>";
}

//是否类型格式化2
function yesOrNoFormatter2(value, row, index){
	if(value == 1 || value == true) return "<span class='label label-danger radius'>是</span>";
	else return "<span class='label label-primary radius'>否</span>";
}

//是否类型格式化3
function yesOrNoFormatter3(value, row, index){
	if(value == 1 || value == true) return "<span class='label label-warning radius'>是</span>";
	else return "<span class='label label-success radius'>否</span>";
}

//审核结果格式化
function auditResultFormatter(value, row, index){
	var formatResult = "";
	switch(value){
		case 0:
			formatResult = "未审核";
			break;
		case 1:
			formatResult = "审核通过";
			break;
		case 2:
			formatResult = "审核不通过";
			break;
		default:
			break;
	}
	
	return formatResult;
}

//行操作格式化
function rowOperFormatter(value, row, index) {
	if(keyField != null && row[keyField]){
		var rowId = row[keyField];
	    return buildRowOperHtml(rowId);
	}
}

//生成行操作HTML
function buildRowOperHtml(rowId){
	return [
	        '<a class="edit ml10" href="javascript:commonEditClicked(\'' + rowId + '\')" title="编辑">',
	        '<i class="glyphicon glyphicon-edit"></i>编辑 ',
	        '</a>',
	        '<a class="remove ml10" href="javascript:commonRowDeleteClicked(\'' + rowId + '\')" title="删除">',
	        '<i class="glyphicon glyphicon-remove"></i>删除',
	        '</a>'
	    ].join('');
}

//设置传入参数
function queryParams(params) {
	var conditions = [];
	$(".condition").each(function(){		
		var value = $(this).val() || $(this).attr("value");
        if (!this.name || !value) return true;
        
        conditions.push({
            field: this.name,
            value: value
		});
	});
	
	params.conditions = JSON.stringify(conditions);
	
	//字典参数提交
	if(tableDicNames && tableDicNames.length > 0){
		appendDicParams(params, tableDicNames, tableDicFieldNames);
	}
	
	return params;
}

//追加字典参数
function appendDicParams(params, dicNamesStr, dicFieldNamesStr){
	params.dicNames = dicNamesStr;
	params.dicFieldNames = dicFieldNamesStr;
}

//初始化表格字典
function initTableDic(tableDicNamesStr, tableDicFieldNamesStr){
	tableDicNames = tableDicNamesStr;
	tableDicFieldNames = tableDicFieldNamesStr;
}

//刷新列表
function refreshTable(){
	bsTable.bootstrapTable("refresh");
}
