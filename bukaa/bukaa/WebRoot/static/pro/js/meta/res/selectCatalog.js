var zTree;
var layerIdx;
$(function(){
	initTree();
	
	$('#searchName').bind('keypress',function(event){
        if(event.keyCode == "13"){
        	initTree();
        }
    });
	
	$("#zymlTree").height($(window).height() - 80);
});

function initTree(){
	var setting = {
		async: {
			enable: true,
			url: urlpath + "meta/catalog/getTreeData.sd",
			otherParam: ["name", $("#searchName").val()],
			dataFilter: ajaxDataFilter
		},check: {
            enable: true,
            radioType: "all",
			chkStyle: "radio"
        
        },data: {
			key :{
				title: "name"
			},
			simpleData: {
				enable: true,
				pIdKey:'parentId',
				rootPId: '0'
			}
		},view: {
			fontCss: getFontCss
		},
		callback: {
			onClick: zTreeOnClick,
			//onDblClick: zTreeOnDblClick
			beforeExpand: beforeExpand,
		}
	};
	zTree = $.fn.zTree.init($("#zymlTree"), setting);
}

/**
 * 异步加载数据处理
 * @param treeId
 * @param parentNode
 * @param responseData
 * @returns
 */
function ajaxDataFilter(treeId, parentNode, responseData) {
	if (responseData) {
		for(var i =0; i < responseData.length; i++) {
			if(responseData[i].parentId == '0') {
				responseData[i].nocheck = true;
			}
		}
	}
	return responseData;
};

/**
 * 树节点单击事件
 */
function zTreeOnClick(event, treeId, treeNode) {
	zTree.checkNode(treeNode, !treeNode.checked, null, true);
	zTree.expandNode(treeNode, null, null, null, true);
}

/**
 * 双击选择资源目录
 * @param event
 * @param treeId
 * @param treeNode
 */
function zTreeOnDblClick(event, treeId, treeNode) {
	if(treeNode.isParent) {
		return false;
	}
	
	parent.$("input[name='resource.catId']").val(treeNode.id);
	parent.$("input[name='resource.catCode']").val(treeNode.code);
	parent.$("input[name='resource.catName']").val(treeNode.name);
	
	var index = parent.layer.getFrameIndex(window.name);
	parent.layer.close(index);
}

/**
 * 单击选择资源目录
 */
function selectCatalogNode() {
	var treeNodes = zTree.getCheckedNodes(true);
	if(treeNodes == 0) {
		swal({
	    	title: "请选择资源目录！",
	        type: "info",
	        closeOnConfirm: true,
	        confirmButtonText: "关闭"
		});
		//top.layer.alert("请选择资源目录！", {icon: 0});
		return;
	}
	
	var node = treeNodes[0];
	if(node.isParent) {
		swal({
	    	title: "请选择资源目录！",
	        type: "info",
	        closeOnConfirm: true,
	        confirmButtonText: "关闭"
		});
		return;
	}
	
	var nodeObj = {
		id: node.id,
		name: node.name,
		code: node.code
	}
	
	return nodeObj;
}

/**
 * 资源目录树节点搜索
 */
function searchTree() {
	var searchData = $.trim($("#searchName").val());

	if(!searchData || searchData.length==0){
		swal({
	    	title: "请输入关键字进行搜索！",
	        type: "info",
	        closeOnConfirm: true,
	        confirmButtonText: "关闭"
		});
		return; 
	}
	
	var nodeList = zTree.getNodesByParamFuzzy("name", searchData);
	for( var i=0, l=nodeList.length; i<l; i++) {
		nodeList[i].highlight = true;
		zTree.expandNode(nodeList[i].getParentNode(), true, false, false);
		zTree.updateNode(nodeList[i]);
	}
}

/**
 * 设置颜色
 * @param treeId
 * @param treeNode
 * @returns
 */
function getFontCss(treeId, treeNode) {
	return (!!treeNode.highlight) ? {color:"#A60000", "font-weight":"bold"} : {color:"#333", "font-weight":"normal"};
}

/**
 * 保持展开单一路径
 */
var curExpandNode = null;
function beforeExpand(treeId, treeNode) {
	var pNode = curExpandNode ? curExpandNode.getParentNode():null;
	var treeNodeP = treeNode.parentTId ? treeNode.getParentNode():null;
	for(var i=0, l=!treeNodeP ? 0:treeNodeP.children.length; i<l; i++ ) {
		if (treeNode !== treeNodeP.children[i]) {
			zTree.expandNode(treeNodeP.children[i], false);
		}
	}
	while (pNode) {
		if (pNode === treeNode) {
			break;
		}
		pNode = pNode.getParentNode();
	}
	if (!pNode) {
		singlePath(treeNode);
	}
}

function singlePath(newNode) {
	if (newNode === curExpandNode) return;

    var rootNodes, tmpRoot, tmpTId, i, j, n;

    if (!curExpandNode) {
        tmpRoot = newNode;
        while (tmpRoot) {
            tmpTId = tmpRoot.tId;
            tmpRoot = tmpRoot.getParentNode();
        }
        rootNodes = zTree.getNodes();
        for (i=0, j=rootNodes.length; i<j; i++) {
            n = rootNodes[i];
            if (n.tId != tmpTId) {
                zTree.expandNode(n, false);
            }
        }
    } else if (curExpandNode && curExpandNode.open) {
		if (newNode.parentTId === curExpandNode.parentTId) {
			zTree.expandNode(curExpandNode, false);
		} else {
			var newParents = [];
			while (newNode) {
				newNode = newNode.getParentNode();
				if (newNode === curExpandNode) {
					newParents = null;
					break;
				} else if (newNode) {
					newParents.push(newNode);
				}
			}
			if (newParents!=null) {
				var oldNode = curExpandNode;
				var oldParents = [];
				while (oldNode) {
					oldNode = oldNode.getParentNode();
					if (oldNode) {
						oldParents.push(oldNode);
					}
			}
				if (newParents.length>0) {
					zTree.expandNode(oldParents[Math.abs(oldParents.length-newParents.length)-1], false);
				} else {
					zTree.expandNode(oldParents[oldParents.length-1], false);
				}
			}
		}
	}
	curExpandNode = newNode;
}

function onExpand(event, treeId, treeNode) {
	curExpandNode = treeNode;
}
