
//增删改转向地址
addUrl = urlpath + "system/user/add.sd";
editUrl = urlpath + "system/user/edit";
deleteUrl = urlpath + "system/user/deleteEntity";

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
	initTableDic("ZD_XB", "sex");
	var url = urlpath + 'system/user/getEntityPageData.sd';
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
		smartDisplay:true,
		sortName:'no,add_time',
		sortOrder:'asc,asc',
		columns: [
					{
			        	checkbox: true,
			        	align: 'center',
			        	valign: 'middle'
			        },
			        {
			          	field: 'realName',
			        	title: '姓名',
			        	align: 'center',
			        	sortable: true
			        },
			        {
			        	field: 'loginId',
			        	title: '登录名',
			        	align: 'center',
			        	sortable: true
			        },
			        {
			        	field: 'no',
			        	title: '编号',
			        	align: 'center',
			        	sortable: true
			        },
			        {
			        	field: 'orgName',
			        	title: '机构名称',
			        	align: 'center'
			        },
			        {
			        	field: 'sexName',
			        	title: '性别',
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
			        	sortable: true
			        },
			        {
		        	  	title: '操作',
		        	  	align: 'center',
		        	  	valign: 'middle',
		        	  	formatter: userRowOperFormatter
		          	}
		         ]
	});
}

//用户列表行操作格式化
function userRowOperFormatter(value, row, index) {
	var rowId = row["id"];
	return [
	        '<a class="edit ml10" href="javascript:commonEditClicked(\'' + rowId + '\')" title="编辑">',
	        '<i class="glyphicon glyphicon-edit"></i>编辑 ',
	        '</a>',
	        '<a class="edit ml10" href="javascript:roleAssignClicked(\'' + rowId + '\', \'' + row.realName + '\')" title="分配角色">',
	        '<i class="glyphicon glyphicon-user"></i>分配角色 ',
	        '</a>',
	        '<a class="remove ml10" href="javascript:commonRowDeleteClicked(\'' + rowId + '\')" title="删除">',
	        '<i class="glyphicon glyphicon-remove"></i>删除',
	        '</a>'
	    ].join('');
}

//分配角色
function roleAssignClicked(userId, realName){
	var assignUrl = urlpath + "system/user/roleAssign.sd?userId=" + userId;
	layer.open({
		type: 2,
		title: "分配角色【" + realName + "】",
		area: ["80%", "90%"],
		content: assignUrl
	});
}
