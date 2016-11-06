
//增删改转向地址
addUrl = urlpath + "priv/master/add.sd";
editUrl = urlpath + "priv/master/edit";
deleteUrl = urlpath + "priv/master/deleteEntity";

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
	var url = urlpath + 'priv/master/getEntityPageData.sd';
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
		sortName:'add_time',
		sortOrder:'desc',
		uniqueId: "id",
		columns: [
					{
			        	checkbox: true,
			        	align: 'center',
			        	valign: 'middle'
			        },
			        {
			        	field: 'name',
			        	title: '主体名称',
			        	align: 'center',
			        	sortable: true
			        },
			        {
			          	field: 'mark',
			        	title: '标志',
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
