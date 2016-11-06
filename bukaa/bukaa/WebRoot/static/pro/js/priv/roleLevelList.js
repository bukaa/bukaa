
//增删改转向地址
addUrl = urlpath + "priv/rolelevel/add.sd";
editUrl = urlpath + "priv/rolelevel/edit";
deleteUrl = urlpath + "priv/rolelevel/deleteEntity";

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
	var url = urlpath + 'priv/rolelevel/getEntityPageData.sd';
	bsTable.bootstrapTable({
		toolbar: "#toolbar",
		method: "post",
		contentType: "application/x-www-form-urlencoded",
		url: url,
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
		sortName:'level',
		sortOrder:'asc',
		uniqueId: "id",
		columns: [
					{
			        	checkbox: true,
			        	align: 'center',
			        	valign: 'middle'
			        },
			        {
			        	field: 'name',
			        	title: '级别名称',
			        	align: 'center',
			        	sortable: true
			        },
			        {
			          	field: 'level',
			        	title: '级别',
			        	align: 'center',
			        	sortable: true
			        },
			        {
			        	field: 'intro',
			        	title: '描述'
			        },
			        {
			        	field: 'addTime',
			        	title: '添加时间'
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
