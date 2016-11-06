
//角色分配选项卡
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
	
	//初始化未拥有角色Table
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

//未拥有角色Table
var nonExistTable = null;

//初始化未拥有角色列表
function initNonExistTable(){
	nonExistTable = $("#noExistTable");
	
	var url = urlpath + 'system/user/getUserRolePageData.sd?assignType=0';
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
			
			var postUrl = urlpath + 'system/user/saveUserRole.sd';
			$.post(postUrl, {userId: $("#userId").val(), roleIds: checkedIds.join(",")}, function(result){
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

//未拥有角色列表刷新
function refreshNonExistTable(){
	nonExistTable.bootstrapTable("refresh");
}

//未拥有角色列表查询参数
function nonExistQueryParams(params) {
	var conditions = [];
	conditions.push({
        field: "userId",
        value: $("#userId").val()
	});
	
	params.conditions = JSON.stringify(conditions);
	
	return params;
}

//未拥有角色列表行操作格式化
function nonExistRowOperFormatter(value, row, index) {
	var rowId = row["id"];
    return [
        '<a class="add ml10" href="javascript:addRoleClicked(\'' + rowId + '\')" title="增加角色">',
        '<i class="glyphicon glyphicon-plus"></i>增加',
        '</a>'
    ].join('');
}

//添加未拥有角色
function addRoleClicked(roleId){
	var postUrl = urlpath + 'system/user/saveUserRole.sd';
	$.post(postUrl, {userId: $("#userId").val(), roleIds: roleId}, function(result){
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

//已拥有角色级别Table
var existTable = null;

//初始化已拥有角色级别列表
function initExistTable(){
	existTable = $("#existTable");
	
	var url = urlpath + 'system/user/getUserRolePageData.sd?assignType=1';
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
			
			var postUrl = urlpath + 'system/user/deleteUserRole.sd';
			$.post(postUrl, {userId: $("#userId").val(), roleIds: checkedIds.join(",")}, function(result){
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

//已拥有角色列表刷新
function refreshExistTable(){
	existTable.bootstrapTable("refresh");
}

//已拥有角色列表查询参数
function existQueryParams(params) {
	var conditions = [];
	
	conditions.push({
        field: "userId",
        value: $("#userId").val()
	});
	
	params.conditions = JSON.stringify(conditions);
	
	return params;
}

//已拥有角色列表行操作格式化
function existRowOperFormatter(value, row, index) {
	var rowId = row["id"];
    return [
        '<a class="remove ml10" href="javascript:removeRoleClicked(\'' + rowId + '\')" title="删除角色">',
        '<i class="glyphicon glyphicon-remove"></i>删除',
        '</a>'
    ].join('');
}

//删除已拥有角色
function removeRoleClicked(roleId){
	var postUrl = urlpath + 'system/user/deleteUserRole.sd';
	$.post(postUrl, {userId: $("#userId").val(), roleIds: roleId}, function(result){
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
