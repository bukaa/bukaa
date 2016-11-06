
//增删改转向地址
editUrl = urlpath + "meta/res/edit";

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
			        	checkbox: true,
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
			        	field: 'type',
			        	title: '资源类型',
			        	align: 'center',
			        	formatter: typeResultFormatter
			        },
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
			        {
			        	field: 'addTime',
			        	title: '添加时间',
			        	align: 'center',
			        	sortable: true
			        },
			        /*{
			        	field: 'isRecommend',
			        	title: '是否推荐',
			        	align: 'center',
			        	formatter:function(value, row, index){
			        		if(value == 1){
			        			return "是";
			        		}else{
			        			return "否";
			        		}
			        	}
			        },*/
			        {
		        	  	title: '操作',
		        	  	align: 'center',
		        	  	valign: 'middle',
		        	  	formatter: createRowOpersHtml
		          	}
		         ]
	});
}

//资源注册
function addResource(type){
	if(!type) {
		layer.alert("未知的资源类型！", {icon: 2});
		return;
	}
		
	var addUrl = urlpath + "meta/res/add.sd?resType=" + type;
	var resType = {"1":"数据表", "2":"查询脚本", "3":"请求服务"}; 
	
	layer.open({
		type: 2,
		title: resType[type] + "注册",
		area: ["100%", "100%"],
		content: addUrl
	});
	
}

//状态格式化
function stateResultFormatter(value, row, index){
	var formatResult = "";
	switch(value){
		case 1:
			formatResult = "<span class='label label-primary radius'>创建</span>";
			break;
//		case 2:
//			formatResult = "<span class='label label-success radius'>发布</span>";
//			break;
//		case 3:
//			formatResult = "<span class='label label-danger radius'>回收</span>";
//			break;
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

//行操作HTML
function createRowOpersHtml(value, row, index){
	var operArr = [];
	
	operArr.push('<div class="btn-group">');
	operArr.push('<button data-toggle="dropdown" class="btn btn-default btn-xs dropdown-toggle">操作 <span class="caret"></span></button>');
	operArr.push('<ul class="dropdown-menu" style="left:auto;right:0;">');
	operArr.push('');
	
	operArr.push('<li><a class="edit ml10" href="javascript:resEditClicked(\'' + row.id + '\',\'' + row.type + '\')" title="编辑">');
	operArr.push('<i class="glyphicon glyphicon-edit"></i>编辑 ');
	operArr.push('</a></li>');
	
	operArr.push('<li><a class="remove ml10" href="javascript:resRowDeleteClicked(\'' + row.id + '\',\'' + row.type + '\')" title="删除">');
	operArr.push('<i class="glyphicon glyphicon-remove"></i>删除 ');
	operArr.push('</a></li>');
	
	operArr.push('</ul>');
	operArr.push('</div>');

	return operArr.join('');
}

//生成行操作HTML
function buildResRowOperHtml(value, row, index){ 
	var operArr = [];
	
	operArr.push('<a class="edit ml10" href="javascript:resEditClicked(\'' + row.id + '\',\'' + row.type + '\')" title="编辑">');
	operArr.push('<i class="glyphicon glyphicon-edit"></i>编辑 ');
	operArr.push('</a>');
	operArr.push('<a class="remove ml10" href="javascript:resRowDeleteClicked(\'' + row.id + '\',\'' + row.type + '\')" title="删除">');
	operArr.push('<i class="glyphicon glyphicon-remove"></i>删除 ');
	operArr.push('</a>');
	
	return operArr.join('');
}

//资源 编辑
function resEditClicked(id, resType){ 
	if(editUrl != null && id){
		layer.open({
			type: 2,
			title: "编辑资源",
			area: ["100%", "100%"],
			content: editUrl + '/' + id + '.sd?resType=' + resType
		});
	}
}

//删除资源(批量)
function resDeleteClicked(){
	if(bsTable != null){
		var selectedRows = bsTable.bootstrapTable('getSelections'); 
		if(selectedRows.length > 0){
			var tableIds = [];
			var scriptIds = [];
			var rbspIds = [];
			$(selectedRows).each(function(){
				if(this.type == 1) {
					tableIds.push(this[keyField]);
				} else if (this.type == 2) {
					scriptIds.push(this[keyField]);
				} else if (this.type == 3) {
					rbspIds.push(this[keyField]);
				}
			});
			
			//确认删除
			confirmDelete(function(){
				$.ajax({
	                type: "get",
	                cache: false,
	                url: urlpath + 'meta/res/deleteResource.sd',
	                data: {"tableIds": tableIds.join(','), "scriptIds": scriptIds.join(","), "rbspIds": rbspIds.join(",")},
	                dataType: "json",
	                success: function(data){
	                    if(data.success){
	                    	confirmSuccess(data.msg);
	                    	bsTable.bootstrapTable("refresh");
	                    }
	                    else{
	                    	confirmError(data.msg);
	                    }
	                }
	            });
			});
		}
		else{
			alertNoData();
		}
	}
}

//资源行删除事件
function resRowDeleteClicked(id, resType){
	var key = '';
	if(resType == 1) {
		key = 'tableIds';
	} else if (resType == 2) {
		key = 'scriptIds';
	} else if (resType == 3) {
		key = 'rbspIds';
	}

	//确认删除
	confirmDeleteRow(function(){
		$.ajax({
            type: "get",
            cache: false,
            url: urlpath + 'meta/res/deleteResource.sd?' + key + '=' + id,
            dataType: "json",
            success: function(data){
            	if(data.success){
            		confirmSuccess(data.msg);
                 	bsTable.bootstrapTable("refresh");
                }
                else{
                	confirmError(data.msg);
                }
            }
        });
	});
}

