
//增删改转向地址
deleteUrl = urlpath + "system/logException/deleteEntity";

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
	var url = urlpath + 'system/logException/getEntityPageData.sd';
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
			        	width: 250,
			        	sortable: true
			        },
			        {
			        	field: 'moduleName',
			        	title: '模块名称',
			        	align: 'center',
			        	width: 250
			        },
			        {
			        	field: 'exceptionCode',
			        	title: '异常代码',
			        	align: 'center',
			        	width: 100,
			        	sortable: true
			        },
			        {
			        	field: 'exceptionInfo',
			        	title: '异常信息',
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
			content: urlpath + 'system/logException/detail/' + id + '.sd'
		});
		layer.full(editPage);
	}
}