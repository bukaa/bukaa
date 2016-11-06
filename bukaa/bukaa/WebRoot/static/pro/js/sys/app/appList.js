
//增删改转向地址
addUrl = urlpath + "system/app/add.sd";
editUrl = urlpath + "system/app/edit";
deleteUrl = urlpath + "system/app/deleteEntity";

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
	var url = urlpath + 'system/app/getEntityPageData.sd';
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
			        	field: 'name',
			        	title: '应用名称',
			        	align: 'center',
			        	sortable: true
			        },
			        {
			          	field: 'code',
			        	title: '应用代码',
			        	align: 'center',
			        	sortable: true
			        },
			        {
			        	field: 'isVisible',
			        	title: '是否可见',
			        	formatter: yesOrNoFormatter
			        },
			        {
			        	field: 'orderId',
			        	title: '排列顺序'
			        },
			        {
		        	  	title: '操作',
		        	  	align: 'center',
		        	  	valign: 'middle',
		        	  	formatter: rowOperFormatter
		          	}
		         ]
	});
}
