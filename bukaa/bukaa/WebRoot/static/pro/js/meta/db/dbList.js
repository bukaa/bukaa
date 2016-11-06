addUrl = urlpath + "meta/db/add.sd";
//增删改转向地址
editUrl = urlpath + "meta/db/edit";
deleteUrl = urlpath + "meta/db/delete";

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
	var url = urlpath + 'meta/db/getEntityPageData.sd';
	bsTable.bootstrapTable({
		contentType: "application/x-www-form-urlencoded",
		toolbar: "#toolbar",
		method: "post",
		url: url,
		cache: false,
		height: getHeight(),
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
		smartDisplay:true,
		sortName:'add_time',
		sortOrder:'desc',
		columns: [
					{
			        	checkbox: true,
			        	align: 'center',
			        	valign: 'middle'
			        },
			        {
			        	field: 'name',
			        	title: '数据源名称',
			        	align: 'center'
			        },
			        {
			          	field: 'idDatabaseType',
			        	title: '数据库类型',
			        	align: 'center'
			        },
			        {
			          	field: 'idDatabaseContype',
			        	title: '连接类型',
			        	align: 'center'
			        },
			        {
			        	field: 'addOrg',
			        	title: '添加单位',
			        	align: 'center'
			        },
			        {
			        	field: 'addTime',
			        	title: '添加时间',
			        	align: 'center'
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




