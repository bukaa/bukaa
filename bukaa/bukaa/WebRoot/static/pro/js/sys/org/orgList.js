
//增删改转向地址
addUrl = urlpath + "system/org/add.sd";
editUrl = urlpath + "system/org/edit";
deleteUrl = urlpath + "system/org/deleteEntity";

//Bootstrap Table
bsTable = $("#table");

$(function(){
	
	//初始化数据列表
	initTable();
	
	//初始化操作按钮
	initOperButton();
	
	init();
});

function init(){
	//解除事件绑定
	$("#deleteBtn").unbind();
	
	//删除按钮
	$("#deleteBtn").click(function(){
		customDeleteClicked();
	});
}

//初始化数据列表
function initTable(){
	var url = urlpath + 'system/org/getEntityPageData.sd';
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
		sortName:'order_id,add_time',
		sortOrder:'asc,asc',
		columns: [
					{
			        	checkbox: true,
			        	align: 'center',
			        	valign: 'middle'
			        },
			        {
			        	field: 'name',
			        	title: '机构名称',
			        	align: 'center',
			        	sortable: true
			        },
			        {
			          	field: 'code',
			        	title: '机构代码',
			        	align: 'center',
			        	sortable: true
			        },
			        {
			        	field: 'address',
			        	title: '机构地址',
			        	align: 'center'
			        },
			        {
			        	field: 'phone',
			        	title: '机构电话',
			        	align: 'center'
			        },
			        {
			        	field: 'orderId',
			        	title: '排序ID',
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
		        	  	formatter: rowCustomOperFormatter
		          	}
		         ]
	});
}

//行操作格式化
function rowCustomOperFormatter(value, row, index) {
	if(keyField != null && row[keyField]){
		var rowId = row[keyField];
	    return [
		        '<a class="edit ml10" href="javascript:commonEditClicked(\'' + rowId + '\')" title="编辑">',
		        '<i class="glyphicon glyphicon-edit"></i>编辑 ',
		        '</a>',
		        '<a class="remove ml10" href="javascript:customRowDeleteClicked(\'' + rowId + '\')" title="删除">',
		        '<i class="glyphicon glyphicon-remove"></i>删除',
		        '</a>'
		    ].join('');
	}
}

//自定义行删除
function customRowDeleteClicked(orgId){
	canDelete(orgId,
		function(){
			//通用删除方法
			commonRowDeleteClicked(orgId);
		},
		function (){
			layer.alert("存在子机构，不能删除！", {icon: 2});
		}
	);
}

//是否能删除
function canDelete(orgIds, yesFunc, noFunc){
	var url = urlpath + "system/org/canDelete/"+orgIds+".sd?time="+new Date().getTime();
	$.getJSON(url,function(data){
		if(data.success){
			yesFunc();
		}else{
			noFunc();
		}
	});
}

//自定义批量删除
function customDeleteClicked(){
	if(bsTable != null){
		var selectedRows = bsTable.bootstrapTable('getSelections');
		if(selectedRows.length > 0){
			var checkedIds = [];
			$(selectedRows).each(function(){
				checkedIds.push(this[keyField]);
			});
			
			canDelete(checkedIds.join(','), function(){
					//确认删除
					layer.confirm('确认要删除吗？', {icon: 3}, function(index){
						$.ajax({
			                type: "get",
			                cache: false,
			                url: deleteUrl + '/' + checkedIds.join(',') + '.sd',
			                dataType: "json",
			                success: function(data){
			                    if(data.success){
			                    	layer.alert(data.msg, {icon: 1});
			                    	bsTable.bootstrapTable("refresh");
			                    }
			                    else{
			                    	layer.alert(data.msg, {icon: 2});
			                    }
			                }
			            });
					});
				},
				function(){
					layer.alert("存在子机构，不能删除！", {icon: 2});
				}
			);
		}
		else{
			layer.alert("没有选择任何数据！", {icon: 5});
		}
	}
}
