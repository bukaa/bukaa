
//Bootstrap Table
bsTable = $("#table");

$(function(){
	
	//初始化数据列表
	initTable();
	
	//搜索按钮
	$("#searchBtn").click(function(){
		refreshTable();
	});
	
	//回车搜索
	$("#searchBtn").parent().find("input[type=text]").keydown(function(e){
         if (e && e.keyCode == 13 ){
             refreshTable();
         }
	});
	
	//重置按钮
	$("#resetBtn").click(function(){
		//清空搜索项
		$(".condition").each(function(){
			$(this).val("");
		});
		
		refreshTable();
	});
	
});

//初始化数据列表
function initTable(){ 
	var url = urlpath + 'meta/res/getEntityPageData.sd';
	bsTable.bootstrapTable({
		toolbar: "#toolbar",
		url: url,
		method: "post",
		contentType: "application/x-www-form-urlencoded",
		cache: false,
		height: getHeight(),
		striped: true,
		pagination: true,
		pageList: [10, 20],
		pageSize:10,
		pageNumber:1,
		sidePagination:'server',
		queryParams: queryParams,
		sortName: 'addTime',
		sortOrder: 'desc',
		showColumns: true,
		showRefresh: true,
		showExport: true,
		minimumCountColumns: 2,
		clickToSelect: true,
		smartDisplay:true,
		columns: [
					{
			        	radio: true,
			        	align: 'center',
			        	valign: 'middle'
			        },
			        {
			        	field: 'name',
			        	title: '资源名称',
			        	align: 'center',
			        	sortable: true
			        },
			        {
			          	field: 'cname',
			        	title: '资源中文名称',
			        	align: 'center'
			        },
			        {
			          	field: 'catName',
			        	title: '资源目录',
			        	align: 'center'
			        },
			        {
			          	field: 'deptName',
			        	title: '来源部门',
			        	align: 'center'
			        },
			        {
			        	field: 'type',
			        	title: '资源类型',
			        	align: 'center',
			        	formatter: typeResultFormatter
			        },
			        /*
			        {
			        	field: 'state',
			        	title: '资源状态',
			        	align: 'center',
			        	formatter: stateResultFormatter
			        },
			        {
			        	field: 'addOrg',
			        	title: '添加单位',
			        	align: 'center'
			        },
			        */
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
		        	  	formatter: buildTableRowOperHtml
		          	}
		         ]
	});
}

//状态格式化
function stateResultFormatter(value, row, index){
	var formatResult = "";
	switch(value){
		case 1:
			formatResult = "<span class='label label-primary radius'>创建</span>";
			break;
		case 2:
			formatResult = "<span class='label label-success radius'>发布</span>";
			break;
		case 3:
			formatResult = "<span class='label label-danger radius'>回收</span>";
			break;
		default:
			break;
	}
	
	return formatResult;
}

//资源类型
function typeResultFormatter(value, row, index){
	var formatResult = "";
	switch(value){
		case 1:
			formatResult = "数据表";
			break;
		case 2:
			formatResult = "查询脚本";
			break;
		case 3:
			formatResult = "请求服务";
			break;
		default:
			break;
	}
	
	return formatResult;
}

//生成行操作HTML
function buildTableRowOperHtml(value, row, index){ 
	return [
	        '<a class="edit ml10" href="javascript:selectResourceClick(\'' + row.id + '\')" title="编辑">',
	        '<i class="glyphicon glyphicon-ok-circle"></i>选择</a> '
	    ].join('');
}


//行操作事件
function selectResourceClick(resId){ 
	
	var addUrl = urlpath + "service/create.sd?resId=" + resId;
	parent.layer.open({
		type: 2,
		title: "注册服务接口",
		area: ["100%", "100%"],
		content: addUrl,
		success: function(layero, index){
			var pIndex = parent.layer.getFrameIndex(window.name);
			parent.layer.close(pIndex);
		}
	});
	
}

//刷新列表
function refreshTable(){
	bsTable.bootstrapTable("refresh");
}