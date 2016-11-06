
//设置用户选项卡
var assignTab = {
	nonExistRole: {
		init: false,
		callback: initNonExistTable
	},
	existRole: {
		init: false,
		callback: initExistTable
	}
};

$(function(){
	
	//初始化未设置用户Table
	$("li[mark='nonExistRole']").click();
});

/**
 * 选项卡点击事件
 * @param mark 选项卡标示
 */
function tabClick(obj){
	var mark = $(obj).attr("mark");
	if(mark && mark != ""){
		if(assignTab.hasOwnProperty(mark) && !assignTab[mark].init){
			assignTab[mark].init = true;
			assignTab[mark].callback();
		}
	}
}

//未设置用户Table
var nonExistTable = null;

//初始化未设置用户列表
function initNonExistTable(){
	nonExistTable = $("#noExistTable");
	
	var url = urlpath + 'priv/role/getRoleUserPageData.sd?setType=0';
	nonExistTable.bootstrapTable({
		toolbar: "#nonExistToolbar",
		method: "post",
		contentType: "application/x-www-form-urlencoded",
		url: url,
		cache: false,
		height: "99%",
		striped: true,
		pagination: true,
		pageList: [10, 20],
		pageSize:10,
		pageNumber:1,
		sidePagination:'server',
		queryParams: nonExistQueryParams,
		showColumns: true,
		showRefresh: true,
		showExport: true,
		minimumCountColumns: 2,
		clickToSelect: true,
		smartDisplay: true,
		sortName:'no,add_time',
		sortOrder:'asc,asc',
		uniqueId: "id",
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
		        	  	title: '操作',
		        	  	align: 'center',
		        	  	valign: 'middle',
		        	  	formatter: nonExistRowOperFormatter
		          	}
		         ]
	});
	
	//增加按钮
	$("#addBtn").click(function(){
		var selectedRows = nonExistTable.bootstrapTable('getSelections');
		if(selectedRows.length > 0){
			var checkedIds = [];
			$(selectedRows).each(function(){
				checkedIds.push(this["id"]);
			});
			
			var postUrl = urlpath + 'priv/role/saveRoleUser.sd';
			$.post(postUrl, {roleId: $("#roleId").val(), userIds: checkedIds.join(",")}, function(result){
				if(result.success){
					confirmSuccess(result.msg);
					refreshNonExistTable();
					refreshExistTable();			
				}
				else{
					confirmError(result.msg);
				}
			}, "json");
		}
		else{
			alertNoData();
		}
	});
	
	//解决当浏览器窗口变化时，表头与表格不对齐的问题
	$(window).resize(function () {
		nonExistTable.bootstrapTable('resetView', {
            height: getHeight()
        });
    });
}

//未设置用户列表刷新
function refreshNonExistTable(){
	nonExistTable.bootstrapTable("refresh");
}

//未设置用户列表查询参数
function nonExistQueryParams(params) {
	var conditions = [];
	conditions.push({
        field: "roleId",
        value: $("#roleId").val()
	});
	
	params.conditions = JSON.stringify(conditions);
	
	return params;
}

//未设置用户列表行操作格式化
function nonExistRowOperFormatter(value, row, index) {
	var rowId = row["id"];
    return [
        '<a class="add ml10" href="javascript:addUserClicked(\'' + rowId + '\')" title="增加用户">',
        '<i class="glyphicon glyphicon-plus"></i>增加',
        '</a>'
    ].join('');
}

//添加未设置用户
function addUserClicked(userId){
	var postUrl = urlpath + 'priv/role/saveRoleUser.sd';
	$.post(postUrl, {roleId: $("#roleId").val(), userIds: userId}, function(result){
		if(result.success){
			confirmSuccess(result.msg);
			refreshNonExistTable();
			refreshExistTable();			
		}
		else{
			confirmError(result.msg);
		}
	}, "json");
}

//已设置用户级别Table
var existTable = null;

//初始化已设置用户级别列表
function initExistTable(){
	existTable = $("#existTable");
	
	var url = urlpath + 'priv/role/getRoleUserPageData.sd?setType=1';
	existTable.bootstrapTable({
		toolbar: "#existRoleToolbar",
		method: "post",
		contentType: "application/x-www-form-urlencoded",
		url: url,
		cache: false,
		height: "99%",
		striped: true,
		pagination: true,
		pageList: [10, 20],
		pageSize:10,
		pageNumber:1,
		sidePagination:'server',
		queryParams: existQueryParams,
		showColumns: true,
		showRefresh: true,
		showExport: true,
		minimumCountColumns: 2,
		clickToSelect: true,
		smartDisplay: true,
		sortName:'no,add_time',
		sortOrder:'asc,asc',
		uniqueId: "id",
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
		        	  	title: '操作',
		        	  	align: 'center',
		        	  	valign: 'middle',
		        	  	formatter: existRowOperFormatter
		          	}
		         ]
	});
	
	//删除按钮
	$("#deleteBtn").click(function(){
		var selectedRows = existTable.bootstrapTable('getSelections');
		if(selectedRows.length > 0){
			var checkedIds = [];
			$(selectedRows).each(function(){
				checkedIds.push(this["id"]);
			});
			
			var postUrl = urlpath + 'priv/role/deleteRoleUser.sd';
			$.post(postUrl, {roleId: $("#roleId").val(), userIds: checkedIds.join(",")}, function(result){
				if(result.success){
					confirmSuccess(result.msg);
					refreshNonExistTable();
					refreshExistTable();			
				}
				else{
					confirmError(result.msg);
				}
			}, "json");
		}
		else{
			alertNoData();
		}
	});
	
	//解决当浏览器窗口变化时，表头与表格不对齐的问题
	$(window).resize(function () {
		existTable.bootstrapTable('resetView', {
            height: getHeight()
        });
    });
}

//已设置用户列表刷新
function refreshExistTable(){
	existTable.bootstrapTable("refresh");
}

//已设置用户列表查询参数
function existQueryParams(params) {
	var conditions = [];
	
	conditions.push({
        field: "roleId",
        value: $("#roleId").val()
	});
	
	params.conditions = JSON.stringify(conditions);
	
	return params;
}

//已设置用户列表行操作格式化
function existRowOperFormatter(value, row, index) {
	var rowId = row["id"];
    return [
        '<a class="remove ml10" href="javascript:removeRoleClicked(\'' + rowId + '\')" title="删除用户">',
        '<i class="glyphicon glyphicon-remove"></i>删除',
        '</a>'
    ].join('');
}

//删除已设置用户
function removeRoleClicked(userId){
	var postUrl = urlpath + 'priv/role/deleteRoleUser.sd';
	$.post(postUrl, {roleId: $("#roleId").val(), userIds: userId}, function(result){
		if(result.success){
			confirmSuccess(result.msg);
			refreshExistTable();
			refreshNonExistTable();
		}
		else{
			confirmError(result.msg);
		}
	}, "json");
}
