
//增删改转向地址
addUrl = urlpath + "system/dic/add.sd";
editUrl = urlpath + "system/dic/edit";
deleteUrl = urlpath + "system/dic/deleteEntity";

//Bootstrap Table
bsTable = $("#table");

$(function(){
	
	//初始化数据列表
	initTable();
	
	//初始化操作按钮
	initOperButton();
	
	//生成JS按钮
	$("#buildBtn").click(function(){
		buildClicked();
	});
	
	//生成全部JS按钮
	$("#buildAllBtn").click(function(){
		buildAllClicked();
	});
});

//初始化数据列表
function initTable(){
	var url = urlpath + 'system/dic/getEntityPageData.sd';
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
		sortName:'add_time',
		sortOrder:'desc',
		columns: [
					{
			        	checkbox: true,
			        	align: 'center',
			        	valign: 'middle'
			        },
			        {
			        	field: 'name',
			        	title: '字典名称',
			        	align: 'center',
			        	sortable: true
			        },
			        {
			          	field: 'mark',
			        	title: '字典标识',
			        	align: 'center',
			        	sortable: true
			        },
			        {
			        	field: 'isRef',
			        	title: '是否引用字典',
			        	align: 'center',
			        	formatter: yesOrNoFormatter2
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
		        	  	formatter: rowOperFormatter
		          	}
		         ]
	});
}

//生成JS文件
function buildClicked(){
	if(bsTable != null){
		var selectedRows = bsTable.bootstrapTable('getSelections');
		if(selectedRows.length > 0){
			var checkedIds = [];
			$(selectedRows).each(function(){
				checkedIds.push(this[keyField]);
			});
			
			var url = urlpath + "system/dic/build.sd?ids="+checkedIds.join(",");
			var index = layer.load(0, {shade: false});
			$.ajax({
                type: "post",
                cache: false,
                url: url,
                dataType: "json",
                success: function(data){
                	layer.close(index);
                    if(data.success){
                    	layer.alert(data.msg, {icon: 1});
                    	bsTable.bootstrapTable("refresh");
                    }
                    else{
                    	layer.alert(data.msg, {icon: 2});
                    }
                }
            });
		}
	}
}

//生成全部JS文件
function buildAllClicked(){
	if(bsTable != null){
		var index = layer.load(0, {shade: false});
		var url = urlpath + "system/dic/buildAll.sd";
		$.ajax({
            type: "post",
            cache: false,
            url: url,
            dataType: "json",
            success: function(data){
            	layer.close(index);
                if(data.success){
                	layer.alert(data.msg, {icon: 1});
                	bsTable.bootstrapTable("refresh");
                }
                else{
                	layer.alert(data.msg, {icon: 2});
                }
            }
        });
	}
}