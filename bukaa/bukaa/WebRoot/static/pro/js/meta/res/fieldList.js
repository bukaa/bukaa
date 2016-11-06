var resId;

// 增删改转向地址
editUrl = urlpath + "meta/field/edit";
deleteUrl = urlpath + "meta/field/deleteEntity";

// Bootstrap Table
bsTable = $("#fieldTable");

$(function(){
	resId = $("input[name='resource.id']").val();
	addUrl = urlpath + "meta/field/add.sd?resourceId=" + resId; 
	
	// 初始化字段列表
	initTable();
	
	// 初始化操作按钮
	initOperButton();
	
});

// 初始化数据列表
function initTable(){
	var url = urlpath + 'meta/field/getFieldPageData.sd?resId=' + resId;
	bsTable.bootstrapTable({
		toolbar: "#toolbar",
		url: url,
		method: "post",
		contentType: "application/x-www-form-urlencoded",
		cache: false,
		height: "100%",
		striped: true,
		pagination: false,
		onlyInfoPagination: true,
		pageSize:10,
		pageNumber:1,
		uniqueId: 'id',
		sidePagination:'server',
		queryParams: queryParams,
		sortName: 'orderId',
		sortOrder: 'asc',
		showColumns: true,
		showRefresh: true,
		showExport: true,
		minimumCountColumns: 2,
		clickToSelect: true,
		smartDisplay:true,
		columns: [
		          	/*
					{
						checkbox: true,
						align: 'center',
						valign: 'middle'
					}, */
			        {
			          	field: 'isPk',
			        	title: '是否主键',
			        	align: 'center',
			        	formatter: function(value, row, index){
			        		var isCheck = '';
			        		if(row.isPk == true || row.isPk == "true") {
			        			isCheck = 'checked="checked"';
			        		}
			        		return '<input type="checkbox" name="isPK" value="'+ row.id +'" onclick="isPkChanged(this);" '+ isCheck +' />';
			        	}
			        },
			        {
			        	field: 'name',
			        	title: '字段名称',
			        	align: 'center'
			        },
			        {
			          	field: 'cname',
			        	title: '字段中文名称',
			        	align: 'center'
			        },
			        {
			          	field: 'fieldType',
			        	title: '字段类型',
			        	align: 'center'
			        },
			        {
			          	field: 'jdbcType',
			        	title: 'JDBC类型',
			        	align: 'center'
			        },
			        {
			          	field: 'fieldLength',
			        	title: '字段长度',
			        	align: 'center'
			        },
			        {
			          	field: 'isNullable',
			        	title: '是否可为空',
			        	align: 'center',
			        	formatter: yesOrNoFormatter
			        },
			        /*
			        {
			        	field: 'defaultValue',
			        	title: '默认值',
			        	align: 'center'
			        }, */
			        {
		        	  	title: '操作',
		        	  	align: 'center',
		        	  	valign: 'middle',
		        	  	formatter: rowOperFormatter
		          	}
		         ],
		onReorderRowsDrag: function (table, row) {
	        return true;
	    },
	    onReorderRowsDrop: function (table, row) {
	        return false;
	    },
	    onReorderRow: function (newData) {
	    	if(newData && newData.length > 0) {
	    		var orderArr = new Array();
	    		for(var i in newData) {
	    			var data = {
	    				index: i,
	    				id: newData[i].id,
	    				orderId: newData[i].orderId
	    			}
	    			orderArr.push(data);
	    		}
	    		
	    		try{
		    		$.ajax({
		   	         	type: "get",
		   	         	cache: false,
		   	         	url: urlpath + "meta/field/updateOrders.sd",
		   	         	data: { orderData: JSON.stringify(orderArr) },
		   	         	dataType: "json",
		   	         	success: function(data){
		   	         		if(data.success){
		   	         			// 排序成功
		                    }
		                    else{
		                    	confirmError(data.msg);
		                    }
		   	         	}
		    		});
		    	}catch(e){}
	    	}
	    	
	        return false;
	    }
	});
}

// 设置主键
function isPkChanged(obj){ 
	var isCheck = "false"; 
	if(obj.checked){
		var len = $("input[type='checkbox'][name='isPK']:checked").length; 
		if(len != 1){
			obj.checked = false;
			confirmError("您已经设置了一个主键，最多只允许有一个主键！请重新选择。");
			return false;
		}
		isCheck = "true";
		$("input[val="+obj.value+"]").attr("checked",false);
	}
	
	var url = urlpath + "meta/field/setPrimaryKey/"+obj.value+"/"+isCheck+".sd";
	$.ajax({
        type: "get",
        cache: false,
        url:url,
        dataType: "json",
        success: function(data){
            if(!data.success){
            	confirmError(data.msg);
            	bsTable.refreshTable();
            }
        }
    });
}
