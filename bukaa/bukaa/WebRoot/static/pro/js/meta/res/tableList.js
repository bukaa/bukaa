//Bootstrap Table
bsTable = $("#table");

$(function(){
	
	//初始化数据列表
	initTable();
	
	//初始化操作按钮
	initOperButton();
	
	$(window).resize(function () { 
		bsTable.bootstrapTable('resetView', {
            height: getHeight()
        });
    });
	
});

//初始化数据列表
function initTable(){
	var url = urlpath + 'meta/table/getTableList.sd?dbId=' + $("#dbId").val();
	bsTable.bootstrapTable({
		method: "post",
		url: url,
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
			        	title: '表英文名',
			        	align: 'center',
			        	sortable: true
			        },
			        {
			          	field: 'comment',
			        	title: '表中文名',
			        	align: 'center'
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

//生成行操作HTML
function buildTableRowOperHtml(value, row, index){ 
	return [
	        '<a class="edit ml10" href="javascript:selectTableClick(\'' + row.name + '\',\'' + row.comment + '\')" title="编辑">',
	        '<i class="glyphicon glyphicon-ok-circle"></i>选择</a> '
	    ].join('');
}

//行操作事件
function selectTableClick(name, cName){ 
	parent.$("input[name='table.name']").val(name);
	parent.$("input[name='table.cname']").val(cName);
	
	parent.$("div.field").fadeIn("slow");
	// 初始化数据字段表格
	parent.initFieldTable();
	
	var index = parent.layer.getFrameIndex(window.name);
	parent.layer.close(index);
}
