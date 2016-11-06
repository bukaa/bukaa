
//增删改转向地址
addUrl = urlpath + "system/dicCode/add.sd?parentId="+$("#parentId").val();
editUrl = urlpath + "system/dicCode/edit";
deleteUrl = urlpath + "system/dicCode/deleteEntity";

//Bootstrap Table
bsTable = null;

$(function(){
	
	$(".nav-tabs a[href='#tab-2']").bind("click",function(){
		//初始化数据列表
		initTable();
	});
	
	//初始化操作按钮
	initOperButton();
});

//初始化数据列表
function initTable(){
	if(!bsTable){
		var url = urlpath + 'system/dicCode/getEntityPageData.sd';
		bsTable = $("#table").bootstrapTable({
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
			smartDisplay:true,
			sortName:'code,add_time',
			sortOrder:'asc,desc',
			columns: [
						{
				        	checkbox: true,
				        	align: 'center',
				        	valign: 'middle'
				        },
				        {
				        	field: 'name',
				        	title: '名称',
				        	align: 'center',
				        	sortable: true
				        },
				        {
				          	field: 'code',
				        	title: '代码',
				        	align: 'center',
				        	sortable: true
				        },
				        {
				        	field: 'fullSpell',
				        	title: '全拼',
				        	align: 'center',
				        	sortable: true
				        },
				        {
				          	field: 'simpleSpell',
				        	title: '简拼',
				        	align: 'center'
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
				        	align: 'center',
				        	sortName: 'add_time',
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
}
