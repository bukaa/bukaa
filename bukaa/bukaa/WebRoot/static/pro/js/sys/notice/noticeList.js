
//增删改转向地址
addUrl = urlpath + "system/notice/add.sd";
editUrl = urlpath + "system/notice/edit";
deleteUrl = urlpath + "system/notice/deleteEntity";

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
	var url = urlpath + 'system/notice/getEntityPageData.sd';
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
		uniqueId: "id",
		columns: [
					{
			        	checkbox: true,
			        	align: 'center',
			        	valign: 'middle'
			        },
			        {
			        	field: 'title',
			        	title: '标题',
			        	align: 'center',
			        	sortable: true
			        },
			        {
			          	field: 'startDate',
			        	title: '开始日期'
			        },
			        {
			        	field: 'endDate',
			        	title: '结束日期'
			        },
			        {
			        	field: 'isTop',
			        	title: '是否置顶',
			        	align: 'center',
			        	formatter: yesOrNoFormatter2
			        },
			        {
			        	field: 'isDisabled',
			        	title: '是否禁用',
			        	align: 'center',
			        	formatter: yesOrNoFormatter2
			        },
			        {
			        	field: 'addTime',
			        	title: '添加时间',
			        	sortable: true
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
