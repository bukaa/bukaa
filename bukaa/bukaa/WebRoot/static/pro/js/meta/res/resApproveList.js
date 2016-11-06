
//增删改转向地址
approveUrl = urlpath + "res/approve/openApprove";
detailUrl = urlpath + "res/approve/detail";
deleteUrl = urlpath + "res/approve/deleteApprove";

//Bootstrap Table
bsTable = $("#table");

$(function(){
	
	$("#search").find("input[type=text]").keydown(function(e){
        if (e && e.keyCode == 13 ){
            refreshTable();
        }
	});
	
	$("label", "#quickFilter").click(function(){
		$("#status").val($(this).attr("value"));
		refreshTable();
	});
	
	//初始化数据列表
	initTable();
	
	//初始化操作按钮
	initOperButton();
	//解决当浏览器窗口变化时，表头与表格不对齐的问题
	/*$(window).resize(function () { 
		if(bsTable){
			bsTable.bootstrapTable('resetView', {
	            height: getHeight()
	        });
			
			$("#quickFilter").css("margin-left", bsTable.width() - 400);
		}
    });*/
	
});

//初始化数据列表
function initTable(){ 
	var url = urlpath + 'res/approve/getEntityPageData.sd';
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
		showColumns: false,
		showRefresh: false,
		showExport: false,
		minimumCountColumns: 2,
		clickToSelect: true,
		smartDisplay:true,
		columns: [
			        {
			          	field: 'userName',
			        	title: '申请人',
			        	align: 'center'
			        },
			        {
			        	field: 'resName',
			        	title: '资源名称',
			        	align: 'center'
			        },
			        {
			        	field: 'resCname',
			        	title: '资源中文名称',
			        	align: 'center'
			        },
			        {
			          	field: 'approveUserName',
			        	title: '审批人',
			        	align: 'center'
			        },
			        {
			        	field: 'approveTime',
			        	title: '审批时间',
			        	align: 'center',
			        	sortable: true
			        },
			        {
			          	field: 'approveConclusion',
			        	title: '审批结果',
			        	align: 'center',
			        	formatter: approveResultFormatter
			        },
			        {
			          	field: 'approveOpinion',
			        	title: '审批意见',
			        	align: 'center'
			        },
			        {
		        	  	title: '操作',
		        	  	align: 'center',
		        	  	valign: 'middle',
		        	  	formatter: buildResRowOperHtml
		          	}
		         ]
	});
}

//状态格式化
function approveResultFormatter(value, row, index){ 
	var formatResult = "";
	switch(value){
		case 0:
			formatResult = "<span class='label label-danger radius'>不通过</span>";
			break;
		case 1:
			formatResult = "<span class='label label-success radius'>通过</span>";
			break;
		default:
			break;
	}
	
	return formatResult;
}

//生成行操作HTML
function buildResRowOperHtml(value, row, index){ 
	var operArr = [];
	
	if(row.status == '01'){
		operArr.push('<a class="right ml10" href="javascript:providerApproveClicked(\'' + row.id + '\')" title="审批">');
		operArr.push('<i class="glyphicon glyphicon-user"></i>审批 ');
		operArr.push('</a>');
	}
	
	operArr.push('<a class="edit ml10" href="javascript:approveDetailClicked(\'' + row.id + '\')" title="详情">');
	operArr.push('<i class="glyphicon glyphicon-edit"></i> 详情 ');
	operArr.push('</a>');
	
	return operArr.join('');
}

//服务接口审批
function providerApproveClicked(id){
	if(approveUrl != null && id){
		layer.open({
			type: 2,
			title: "资源审批",
			area: ["100%", "100%"],
			content: approveUrl + '/' + id + '.sd'
		});
	}
}

//审批详情
function approveDetailClicked(id){ 
	if(detailUrl != null && id){
		layer.open({
			type: 2,
			title: "审批详情",
			area: ["100%", "100%"],
			content: detailUrl + '/' + id + '.sd'
		});
	}
}
