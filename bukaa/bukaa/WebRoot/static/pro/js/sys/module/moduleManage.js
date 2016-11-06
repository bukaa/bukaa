
//模块树
var moduleTree;

//活动的选项卡
var activeTab;

$(function(){
	
	//高度自适应
	autoHeight();
	
	//加载表单
	loadForm(null, null);
	
	//树初始化
	initTree();
	
	//绑定回车搜索
	$('#searchName').bind('keypress',function(event){
    	if(event.keyCode == "13"){
        	initTree();
        }
	});
	
	//所属应用切换事件
	$("#currentAppId").on("change", function(){
		
		//加载表单
		loadForm(null, null);
		
		//树初始化
		initTree();
	});
});

/**
 * 自适应高度
 */
function autoHeight(){
	var iboxHeight = $(window).height() - 130;
	$("#formDiv").height(iboxHeight);
	$("#moduleTree").height(iboxHeight - $("#operDiv").height() - 15);
}

/**
 * 加载表单
 */
function loadForm(id, parentId){
	var loadPath = urlpath + "system/module/";
	var operTitle = "模块管理 > ";
	
	//编辑模块
	if(id != null && id != ""){
		loadPath += "edit.sd?id=" + id;
		operTitle += "编辑模块";
	}
	
	//添加子模块
	else if(parentId != null && parentId != ""){
		loadPath += "add.sd?parentId=" + parentId;
		operTitle += "添加子模块";
	}
	
	//添加根模块
	else{
		loadPath += "add.sd";
		operTitle += "添加根模块";
	}
	
	//设置操作区域标题
	$("#operTitle").text(operTitle);
	
	//加载表单Html
	$.ajax({
		type: "post",
		url: loadPath,
		success: function(html){
			$("#formDiv").html(html);
			   
			//初始化表单
			initForm();
			
			//初始化模块按钮和浏览权限列表
			if(id != null && id != ""){
				initTable(id);
			}
			
			//设置父模块名称标题
			var parentName = $("#parentName").val();
			if(parentName != ""){
				$("#operTitle").text(operTitle + "【父模块：" + parentName + "】");
			}
		},
		dataType: "html"
	});
}

/**
 * 初始化模块树
 */
function initTree(){
	var tipIdx = layer.load(0, {shade:0.2, offset: '40%'});
	var setting = {
		async: {
			enable: true,
			url: urlpath + "system/module/getTreeData.sd?appId=" + $("#currentAppId").val(),
			otherParam: ["searchName", $("#searchName").val()]
		},
		check: {
            enable: true,
            chkboxType: { "Y": "s", "N": "ps" }
        },
        edit: {
        	enable: true,
        	showRenameBtn: false,
        	showRemoveBtn: false
        },
        data: {
			key :{
				title: "name"
			},
			simpleData: {
				enable: true,
				pIdKey: "parentId",
				rootPId: "0"
			}
		},
		callback: {
			onClick: zTreeOnClick,
			onAsyncSuccess: function(){
				layer.close(tipIdx);
			}
		}
	};
	
	//初始化树
	moduleTree = $.fn.zTree.init($("#moduleTree"), setting);
}

/**
 * 模块树点击事件
 * @param {} event
 * @param {} treeId
 * @param {} node
 */
function zTreeOnClick(event, treeId, node){
	loadForm(node.id, null);
	$("#addChildBtn").show();
}

/**
 * 初始化表单
 */
function initForm(){
	
	//设置字体图标
	initIcon("iconStyle");
	
	//表单Id
	formId = "moduleForm";
	
	//验证规则
	rules = {
			name: {
				required: true
			},
			mark: {
				required: true
			},
			orderId: {
				required: true,
				digits: true
			}
	};
		
	//初始化表单
	setPostResponse(showModuleResponse);
	commonInitForm();
	
	//指定活动的选项卡
	if(activeTab){
		$(".nav-tabs li").removeClass("active");
		$("a[href='#" + activeTab + "']").parent().addClass("active");
		$(".tab-pane").removeClass("active");
		$("#" + activeTab).addClass("active");
	}
	
	//设置应用Id
	if($("#appId").val() == ""){
		$("#appId").val($("#currentAppId").val());
	}
}

//表单提交之后的处理事件
function showModuleResponse(responseText, statusText){
	layer.close(layerLoading);
	
	//处理成功
	if(responseText.success){
		confirmSuccess(responseText.msg);
		
		//编辑模块
		if(editMode){
			var currentNode = moduleTree.getNodeByParam("id", $("#id").val());
			currentNode.name = $("#name").val();
			moduleTree.updateNode(currentNode);
			
			//重新加载表单
			loadForm($("#id").val(), $("#parentId").val());
		}
		
		//新增模块
		else{
			var name = $("#name").val();
			var parentId = $("#parentId").val();
			var id = responseText.id;
			
			//构造节点
			var node = {id: id, name: name, parentId: parentId};
			
			//子模块
			if(parentId != ""){
				var pnode = moduleTree.getNodeByParam("id", parentId);
				moduleTree.addNodes(pnode, node);
			}
						
			//父模块
			else{
				moduleTree.addNodes(null, node);
			}
			
			//重新加载表单
			loadForm(null, $("#parentId").val());
		}
		
		//启用提交按钮
		enabledSubmitButton();
	}
	
	//处理失败
	else{
		confirmError(responseText.msg);
		
		//启用提交按钮
		enabledSubmitButton();
	}
}

/**
 * 选项卡点击事件
 * @param {int} type 点击类型
 */
function tabClick(type){
	if(type == 0){
		activeTab = "tab-module";
	}
	else if(type == 1){
		activeTab = "tab-button";
	}
	else if(type == 2){
		activeTab = "tab-perm";
	}
	else{
		activeTab = null;
	}
}

//模块Id
var moduleId = null;

/**
 * 初始化模块按钮和浏览权限列表
 * @param {string} id 模块Id
 */
function initTable(id){
	moduleId = id;
	
	//初始化模块按钮Table
	initButtonTable();
	
	//初始化浏览权限Table
	initPermTable();	
}

//操作按钮Table
var buttonTable = null;

//初始化模块按钮Table
function initButtonTable(){
	buttonTable = $("#buttonTable");
	
	//初始化操作按钮Table
	var url = urlpath + 'system/module/button/getEntityPageData.sd';
	buttonTable.bootstrapTable({
		toolbar: "#buttonToolbar",
		method: "post",
		contentType: "application/x-www-form-urlencoded",
		url: url,
		cache: false,
		height: "100%",
		striped: true,
		pagination: true,
		pageList: [10, 20],
		pageSize:10,
		pageNumber:1,
		sidePagination:'server',
		queryParams: buttonQueryParams,
		showColumns: true,
		showRefresh: true,
		showExport: true,
		minimumCountColumns: 2,
		clickToSelect: true,
		smartDisplay: true,
		uniqueId: "id",
		sortName: "orderId",
		sortOrder: "asc",
		columns: [
					{
			        	checkbox: true,
			        	align: 'center',
			        	valign: 'middle'
			        },
			        {
			        	field: 'name',
			        	title: '按钮名称',
			        	align: 'center',
			        	sortable: true
			        },
			        {
			          	field: 'mark',
			        	title: '按钮标志',
			        	align: 'center',
			        	sortable: true
			        },
			        {
			        	field: 'initStatus',
			        	title: '初始状态',
			        	formatter: initStatusFormatter
			        },
			        {
			        	field: 'location',
			        	title: '展示位置',
			        	formatter: locationFormatter
			        },
			        {
		        	  	title: '操作',
		        	  	align: 'center',
		        	  	valign: 'middle',
		        	  	formatter: bottonRowOperFormatter
		          	}
		         ]
	});
	
	//搜索按钮
	$("#searchButtonBtn").click(function(){
		refreshButtonTable();
	});
	
	//重置按钮
	$("#resetButtonBtn").click(function(){
		
		//清空搜索项
		$("#buttonToolbar .condition").each(function(){
			$(this).val("");
		});
		
		refreshButtonTable();
	});
	
	//新增按钮
	$("#newButtonBtn").click(function(){
		layer.open({
			type: 2,
			title: "添加模块按钮",
			area: ["100%", "100%"],
			content: urlpath + "system/module/button/add.sd?moduleId=" + moduleId
		});
	});
	
	//初始化按钮
	$("#initButtonBtn").click(function(){
		swal({
                title: "您确定要初始化吗？",
                text: "初始化将删除模块之前的所有按钮，请谨慎操作！",
                type: "warning",
                closeOnConfirm: false,
                showCancelButton: true,
                confirmButtonColor: "#1AB394",
                confirmButtonText: "初始化",
                cancelButtonText: "取消"
		}, function(){
			$.ajax({
                type: "get",
                cache: false,
                url: urlpath + "system/module/button/initButton.sd?moduleId=" + moduleId,
                dataType: "json",
                success: function(data){console.log(data)
                    if(data.success){
                    	confirmSuccess(data.msg);
                    	refreshButtonTable();
                    }
                    else{
                    	confirmError(data.msg);
                    }
                }
            });
		});
	});
	
	//删除按钮
	$("#deleteButtonBtn").click(function(){
		if(buttonTable != null){
			var selectedRows = buttonTable.bootstrapTable('getSelections');
			if(selectedRows.length > 0){
				var checkedIds = [];
				$(selectedRows).each(function(){
					checkedIds.push(this[keyField]);
				});
				
				//确认删除
				confirmDelete(function(){
					$.ajax({
		                type: "get",
		                cache: false,
		                url: urlpath + "system/module/button/deleteEntity/" + checkedIds.join(",") + ".sd",
		                dataType: "json",
		                success: function(data){
		                    if(data.success){
		                    	confirmSuccess(data.msg);
		                    	refreshButtonTable();
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
	});
	
	//解决当浏览器窗口变化时，表头与表格不对齐的问题
	$(window).resize(function () {
		buttonTable.bootstrapTable('resetView', {
            height: getHeight()
        });
    });
}

//是否类型格式化
function initStatusFormatter(value, row, index){
	if(value == "0") return "可见";
	else if(value == "1") return "不可见";
	else return "禁用";
}

//展示位置格式化
function locationFormatter(value, row, index){
	if(value == "0") return "头部";
	else if(value == "1") return "数据行";
	else return "隐藏";
}

//刷新按钮列表
function refreshButtonTable(){
	buttonTable.bootstrapTable("refresh");
}

//模块按钮查询参数
function buttonQueryParams(params) {
	var conditions = [];
	conditions.push({
        field: "moduleId",
        value: moduleId
	});
	
	$("#buttonToolbar .condition").each(function(){		
		var value = $(this).val() || $(this).attr("value");
        if (!this.name || !value) return true;
        
        conditions.push({
            field: $(this).attr("originalName"),
            value: value
		});
	});
	
	params.conditions = JSON.stringify(conditions);
	
	return params;
}

//模块按钮行操作格式化
function bottonRowOperFormatter(value, row, index) {
	var rowId = row["id"];
    return [
        '<a class="edit ml10" href="javascript:buttonEditClicked(\'' + rowId + '\')" title="编辑">',
        '<i class="glyphicon glyphicon-edit"></i>编辑 ',
        '</a>',
        '<a class="remove ml10" href="javascript:buttonRowDeleteClicked(\'' + rowId + '\')" title="删除">',
        '<i class="glyphicon glyphicon-remove"></i>删除',
        '</a>'
    ].join('');
}

//按钮编辑事件
function buttonEditClicked(id){		
	layer.open({
		type: 2,
		title: "编辑模块按钮",
		area: ["100%", "100%"],
		content: urlpath + "system/module/button/edit/" + id + '.sd'
	});
}

//按钮行删除事件
function buttonRowDeleteClicked(id){
	confirmDeleteRow(function(){
		$.ajax({
            type: "get",
            cache: false,
            url: urlpath + "system/module/button/deleteEntity/" + id + ".sd",
            dataType: "json",
            success: function(data){
                if(data.success){
                	confirmSuccess(data.msg);
                	refreshButtonTable();
                }
                else{
                	confirmError(data.msg);
                }
            }
        });
	});
}

//浏览权限Table
var permTable = null;

//初始化浏览权限Table
function initPermTable(){
	permTable = $("#perTable");	
	
	//初始化操作按钮Table
	var url = urlpath + 'system/module/perm/getEntityPageData.sd';
	permTable.bootstrapTable({
		toolbar: "#permToolbar",
		method: "post",
		contentType: "application/x-www-form-urlencoded",
		url: url,
		cache: false,
		height: "100%",
		striped: true,
		pagination: true,
		pageList: [10, 20],
		pageSize:10,
		pageNumber:1,
		sidePagination:'server',
		queryParams: permQueryParams,
		showColumns: true,
		showRefresh: true,
		showExport: true,
		minimumCountColumns: 2,
		clickToSelect: true,
		smartDisplay: true,
		uniqueId: "id",
		sortName: "priority",
		sortOrder: "asc",
		columns: [
					{
			        	checkbox: true,
			        	align: 'center',
			        	valign: 'middle'
			        },
			        {
			        	field: 'mode',
			        	title: '授权模式',
			        	formatter: permModeFormatter
			        },
			        {
			        	field: 'roleNames',
			        	title: '角色'
			        },
			        {
			          	field: 'roleLevelNames',
			        	title: '角色级别'
			        },
			        {
			        	field: 'priority',
			        	title: '优先级'
			        },
			        {
			        	field: 'addTime',
			        	title: '添加时间'
			        },			        
			        {
		        	  	title: '操作',
		        	  	align: 'center',
		        	  	valign: 'middle',
		        	  	formatter: permRowOperFormatter
		          	}
		         ]
	});
	
	//新增按钮
	$("#newPermBtn").click(function(){
		layer.open({
			type: 2,
			title: "添加浏览权限",
			area: ["100%", "100%"],
			content: urlpath + "system/module/perm/add.sd?moduleId=" + moduleId
		});
	});
	
	//删除按钮
	$("#deletePermBtn").click(function(){
		if(permTable != null){
			var selectedRows = permTable.bootstrapTable('getSelections');
			if(selectedRows.length > 0){
				var checkedIds = [];
				$(selectedRows).each(function(){
					checkedIds.push(this[keyField]);
				});
				
				//确认删除
				confirmDelete(function(){
					$.ajax({
		                type: "get",
		                cache: false,
		                url: urlpath + "system/module/perm/deleteEntity/" + checkedIds.join(",") + ".sd",
		                dataType: "json",
		                success: function(data){
		                    if(data.success){
		                    	confirmSuccess(data.msg);
		                    	refreshPermTable();
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
	});
	
	//解决当浏览器窗口变化时，表头与表格不对齐的问题
	$(window).resize(function () {
		permTable.bootstrapTable('resetView', {
            height: getHeight()
        });
    });
}

//刷新浏览权限列表
function refreshPermTable(){
	permTable.bootstrapTable("refresh");
}

//模块浏览权限查询参数
function permQueryParams(params) {
	var conditions = [];
	conditions.push({
        field: "moduleId",
        value: moduleId
	});
	
	params.conditions = JSON.stringify(conditions);
	
	return params;
}

//浏览权限授权模式格式化
function permModeFormatter(value, row, index){
	if(value == 1 || value == true) return "<span class='label label-primary radius'>基于角色级别</span>";
	else return "<span class='label label-info radius'>基于角色</span>";
}

//浏览权限行操作格式化
function permRowOperFormatter(value, row, index) {
	var rowId = row["id"];
    return [
        '<a class="edit ml10" href="javascript:permEditClicked(\'' + rowId + '\')" title="编辑">',
        '<i class="glyphicon glyphicon-edit"></i>编辑 ',
        '</a>',
        '<a class="remove ml10" href="javascript:permRowDeleteClicked(\'' + rowId + '\')" title="删除">',
        '<i class="glyphicon glyphicon-remove"></i>删除',
        '</a>'
    ].join('');
}

//浏览权限编辑事件
function permEditClicked(id){		
	layer.open({
		type: 2,
		title: "编辑浏览权限",
		area: ["100%", "100%"],
		content: urlpath + "system/module/perm/edit/" + id + '.sd'
	});
}

//浏览权限行删除事件
function permRowDeleteClicked(id){
	confirmDeleteRow(function(){
		$.ajax({
            type: "get",
            cache: false,
            url: urlpath + "system/module/perm/deleteEntity/" + id + ".sd",
            dataType: "json",
            success: function(data){
                if(data.success){
                	confirmSuccess(data.msg);
                	refreshPermTable();
                }
                else{
                	confirmError(data.msg);
                }
            }
        });
	});
}

//创建根模块
function addRootModule(){
	activeTab = null;
	loadForm(null, null);
}

//创建子模块
function addChildModule(){
	var nodes = moduleTree.getSelectedNodes();
	if(nodes.length > 0){
		if(nodes[0].level && nodes[0].level >= 2){
			confirmError("模块最多只能三级！");
		}
		else{
			activeTab = null;
			loadForm(null, nodes[0].id);
		}
	}
	else{
		confirmError("请选择父模块！");
	}
}

//删除模块
function deleteModule(){
	var nodes = moduleTree.getCheckedNodes(true);
	 
	if(nodes.length < 1){
		confirmError("请选择要删除的模块！");
		return;
	}
	var ids = [];
	$(nodes).each(function(i,node){
		ids.push(node.id);
	});
	
	confirmDeleteRow(function(){
		var url = urlpath + "system/module/deleteEntity/" + ids.join(",") + ".sd";
		$.ajax({
			type: "get",
         	cache: false,
         	url: url,
         	dataType: "json",
         	success: function(data){
         		initTree();
             	loadForm(null, null);
             	if(data.success){
             		confirmSuccess(data.msg);
             	}
             	else{
             		confirmError(data.msg);
             	}
          	}
		});
	});
}
