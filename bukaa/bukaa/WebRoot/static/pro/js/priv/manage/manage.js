
//权限选项卡
var privTab = {
	role: {
		init: false,
		callback: initRoleTable
	},
	rolelevel: {
		init: false,
		callback: initRoleLevelTable
	}
};

$(function(){
	
	//初始化角色Table
	$("li[mark='role']").click();
});

/**
 * 选项卡点击事件
 * @param mark 选项卡标示
 */
function tabClick(obj){
	var mark = $(obj).attr("mark");
	if(mark && mark != ""){
		if(privTab.hasOwnProperty(mark) && !privTab[mark].init){
			privTab[mark].init = true;
			privTab[mark].callback();
		}
	}
}

//角色Table
var roleTable = null;

//初始化角色列表
function initRoleTable(){
	roleTable = $("#roleTable");
	
	var url = urlpath + 'priv/role/getEntityPageData.sd';
	roleTable.bootstrapTable({
		toolbar: "#roleToolbar",
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
		queryParams: roleQueryParams,
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
		        	  	formatter: roleRowOperFormatter
		          	}
		         ]
	});
	
	//搜索按钮
	$("#searchRoleBtn").click(function(){
		refreshRoleTable();
	});
	
	//重置按钮
	$("#resetRoleBtn").click(function(){
		$("#roleToolbar .condition").each(function(){
			$(this).val("");
		});		
		refreshRoleTable();
	});
	
	//解决当浏览器窗口变化时，表头与表格不对齐的问题
	$(window).resize(function () {
		roleTable.bootstrapTable('resetView', {
            height: getHeight()
        });
    });
}

//角色列表刷新
function refreshRoleTable(){
	roleTable.bootstrapTable("refresh");
}

//角色列表查询参数
function roleQueryParams(params) {
	var conditions = [];
	
	$("#roleToolbar .condition").each(function(){		
		var value = $(this).val() || $(this).attr("value");
        if (!this.name || !value) return true;
        
        conditions.push({
            field: $(this).attr("name"),
            value: value
		});
	});
	
	params.conditions = JSON.stringify(conditions);
	
	return params;
}

//角色列表行操作格式化
function roleRowOperFormatter(value, row, index) {
	var rowId = row["id"];
    return [
        '<a class="edit ml10" href="javascript:modulePrivClicked(\'role\', \'' + rowId + '\')" title="模块权限">',
        '<i class="glyphicon glyphicon-edit"></i>模块权限',
        '</a>&nbsp;&nbsp;',
        '<a class="remove ml10" href="javascript:buttonPrivClicked(\'role\', \'' + rowId + '\')" title="按钮权限">',
        '<i class="glyphicon glyphicon-remove"></i>按钮权限',
        '</a>'
    ].join('');
}

//角色级别Table
var roleLevelTable = null;

//初始化角色级别列表
function initRoleLevelTable(){
	roleLevelTable = $("#roleLevelTable");
	
	var url = urlpath + 'priv/rolelevel/getEntityPageData.sd';
	roleLevelTable.bootstrapTable({
		toolbar: "#roleLevelToolbar",
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
		queryParams: roleLevelQueryParams,
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
		        	  	formatter: roleLevelRowOperFormatter
		          	}
		         ]
	});
	
	//搜索按钮
	$("#searchRoleLevelBtn").click(function(){
		refreshRoleLevelTable();
	});
	
	//重置按钮
	$("#resetRoleLevelBtn").click(function(){
		$("#roleLevelToolbar .condition").each(function(){
			$(this).val("");
		});		
		refreshRoleLevelTable();
	});
	
	//解决当浏览器窗口变化时，表头与表格不对齐的问题
	$(window).resize(function () {
		roleLevelTable.bootstrapTable('resetView', {
            height: getHeight()
        });
    });
}

//角色列表刷新
function refreshRoleLevelTable(){
	roleLevelTable.bootstrapTable("refresh");
}

//角色列表查询参数
function roleLevelQueryParams(params) {
	var conditions = [];
	
	$("#roleLevelToolbar .condition").each(function(){		
		var value = $(this).val() || $(this).attr("value");
        if (!this.name || !value) return true;
        
        conditions.push({
            field: $(this).attr("name"),
            value: value
		});
	});
	
	params.conditions = JSON.stringify(conditions);
	
	return params;
}

//角色列表行操作格式化
function roleLevelRowOperFormatter(value, row, index) {
	var rowId = row["id"];
    return [
        '<a class="edit ml10" href="javascript:modulePrivClicked(\'rolelevel\', \'' + rowId + '\')" title="模块权限">',
        '<i class="glyphicon glyphicon-edit"></i>模块权限',
        '</a>&nbsp;&nbsp;',
        '<a class="remove ml10" href="javascript:buttonPrivClicked(\'rolelevel\', \'' + rowId + '\')" title="按钮权限">',
        '<i class="glyphicon glyphicon-remove"></i>按钮权限',
        '</a>'
    ].join('');
}

/**
 * 模块权限点击事件
 * @param mtype 权限主体
 * @param id 权限主体Id
 */
function modulePrivClicked(master, masterValue){
	var privUrl = urlpath + "priv/manage/modulePriv.sd?master=" + master + "&masterValue=" + masterValue + "&domain=module";
	layer.open({
		type: 2,
		title: " ",
		area: ["100%", "100%"],
		content: privUrl
	});
}

/**
 * 模块按钮权限点击事件
 * @param mtype 权限主体
 * @param id 权限主体Id
 */
function buttonPrivClicked(master, masterValue){
	var privUrl = urlpath + "priv/manage/buttonPriv.sd?master=" + master + "&masterValue=" + masterValue + "&domain=module_button";
	layer.open({
		type: 2,
		title: "按钮权限设置",
		area: ["100%", "100%"],
		content: privUrl
	});
}
