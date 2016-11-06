
//增删改转向地址
addUrl = urlpath + "priv/role/add.sd";
editUrl = urlpath + "priv/role/edit";
deleteUrl = urlpath + "priv/role/deleteEntity";

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
	var url = urlpath + 'priv/role/getEntityPageData.sd';
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
		sortName:'code',
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
			        	title: '角色名称',
			        	align: 'center',
			        	sortable: true
			        },
			        {
			          	field: 'code',
			        	title: '角色代码',
			        	align: 'center',
			        	sortable: true
			        },
			        {
			          	field: 'isAdmin',
			        	title: '是否管理员',
			        	align: 'center',
			        	formatter: yesOrNoFormatter3
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
		        	  	formatter: roleRowOperFormatter
		          	}
		         ]
	});
}

//角色列表行操作格式化
function roleRowOperFormatter(value, row, index) {
	var rowId = row["id"];
	return [
	        '<a class="edit ml10" href="javascript:commonEditClicked(\'' + rowId + '\')" title="编辑">',
	        '<i class="glyphicon glyphicon-edit"></i>编辑 ',
	        '</a>',
	        '<a class="edit ml10" href="javascript:setUserClicked(\'' + rowId + '\', \'' + row.name + '\')" title="设置用户">',
	        '<i class="glyphicon glyphicon-user"></i>设置用户 ',
	        '</a>',
	        '<a class="remove ml10" href="javascript:commonRowDeleteClicked(\'' + rowId + '\')" title="删除">',
	        '<i class="glyphicon glyphicon-remove"></i>删除',
	        '</a>'
	    ].join('');
}

//设置用户
function setUserClicked(roleId, name){
	var assignUrl = urlpath + "priv/role/setUser.sd?roleId=" + roleId;
	layer.open({
		type: 2,
		title: "设置用户【" + name + "】",
		area: ["80%", "90%"],
		content: assignUrl
	});
}

