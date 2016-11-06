
//增删改转向地址
deleteUrl = urlpath + "system/logOper/deleteEntity";

//Bootstrap Table
bsTable = $("#table");

$(function(){
	
	//初始化数据列表
	initTable();
	
	//初始化操作按钮
	initOperButton();
});

//初始化数据列表
function initTable(){
	var url = urlpath + 'system/logOper/getEntityPageData.sd';
	bsTable.bootstrapTable({
		toolbar: "#toolbar",
		method: "post",
		url: url,
		contentType: "application/x-www-form-urlencoded",
		cache: false,
		height: "100%",
		striped: true,
		pagination: true,
		pageList: [10, 20],
		pageSize:10,
		pageNumber:1,
		sidePagination:'server',
		queryParams: queryParams,
		showColumns: true,
		showRefresh: true,
		showExport: true,
		minimumCountColumns: 2,
		clickToSelect: true,
		smartDisplay: true,
		uniqueId: "id",
		columns: [
					{
			        	checkbox: true,
			        	align: 'center',
			        	valign: 'middle'
			        },
			        {
			        	field: 'appName',
			        	title: '应用名称',
			        	align: 'center',
			        	width: 250
			        },
			        {
			        	field: 'moduleName',
			        	title: '模块名称',
			        	align: 'center',
			        	width: 250
			        },
			        {
			        	field: 'operType',
			        	title: '操作类型',
			        	align: 'center',
			        	width: 100,
			        	formatter: function(value, row, index){
			        		if(value == "00"){
			        			value = "登录";
			        		}else if(value == "01"){
			        			value = "浏览";
			        		}else if(value == "02"){
			        			value = "新增";
			        		}else if(value == "03"){
			        			value = "删除";
			        		}else if(value == "04"){
			        			value = "修改";
			        		}else if(value == "05"){
			        			value = "查询";
			        		}
			        		return value;
			        	}
			        },
			        {
			        	field: 'content',
			        	title: '操作内容',
			        	align: 'center'
			        },
			        {
			        	field: 'operTime',
			        	title: '操作时间',
			        	align: 'center',
			        	width: 180
			        },
			        {
		        	  	title: '操作',
		        	  	align: 'center',
		        	  	valign: 'middle',
			        	width: 120,
		        	  	formatter: rowOperFormatter
		          	}
		         ]
	});
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
	        '<a class="edit ml10" href="javascript:detailClicked(\'' + rowId + '\')" title="编辑">',
	        '<i class="glyphicon glyphicon-edit"></i>详情 '].join('');
}

//详情
function detailClicked(id){
	if(id){
		var editPage = layer.open({
			type: 2,
			title: "日志详情",
			content: urlpath + 'system/logOper/detail/' + id + '.sd'
		});
		layer.full(editPage);
	}
}