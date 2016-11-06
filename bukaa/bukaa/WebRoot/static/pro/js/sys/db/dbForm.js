var props = [{ 'name': 'maxActive','des': '最大连接数量'},
             { 'name': 'minIdle','des': '最小空闲连接'},
             { 'name': 'maxIdle','des': '最大空闲连接'},
             { 'name': 'initialSize','des': '初始化连接'},
             { 'name': 'removeAbandoned','des': ' 是否自动回收超时连接'}];

var layerIdx;
$(function(){
	
	initSuggest($(".suggest"));
	initForm();
	
});

/**
 * 初始化表单
 */
function initForm(){
	
	formId = "mainForm";
	rules = {
			name: {
				required: true,
				minlength: 2,
				maxlength: 50
			},
			idDatabaseType: {
				required: true
			},
			hostName:{required: true},
			port:{required: true,digits:true},
			databaseName:{required: true},
			servername:{required: true},
			url:{required: true},
			username:{required: true},
			password:{required: true}
	};
	setPreRequest(berofeRequest);
	setPostResponse(afterResponse);
	commonInitForm();
}

function saveBtn(){
	if($("#mainForm").valid()){
		bulidDBAttr();
		$("#mainForm").attr("action",urlpath + "sys/db/save.sd").submit();
	}
}

/**
 * 测试数据连接
 */
function testConn(){
	if($("#mainForm").valid()){
		bulidDBAttr();
		$("#mainForm").attr("action",urlpath + "sys/db/testConn.sd").submit();
	}
}

function bulidDBAttr(){
	var attrObj = {};
	var nullFlag = false;
	$("#attrtbody tr ").each(function(i,item){
		var attrname = $(item).find(":input[name='attrname']").val();
		var attrval = $(item).find(":input[name='attrval']").val();
		if(attrname && attrval){
			attrObj[attrname] = attrval;
			nullFlag = true;
		}
	});
	if(nullFlag){
		$("#databaseAttribute").val(JSON.stringify(attrObj));
	}
}


//表单提交之前的处理事件
function berofeRequest(formData, jqForm, options) {
	$("#saveDBBtn").addClass("disabled").attr({ disabled:"disabled"});
	$("#testDBBtn").addClass("disabled").attr({ disabled:"disabled"});
	layerIdx = layer.load(0,{shade:0.05,offset: '40%'});
}

//表单提交之后的处理事件
function afterResponse(responseText, statusText){
	layer.close(layerIdx);
	$("#saveDBBtn").removeClass("disabled").removeAttr("disabled");
	$("#testDBBtn").removeClass("disabled").removeAttr("disabled");
	//处理成功
	if(responseText.success){
		
		if(responseText.isTest){
			//layer.alert("测试成功!", {icon: 1});
			confirmSuccess("测试成功!");
		}else{
			parent.confirmSuccess(responseText.msg);
			parent.refreshTable();
			$("#closeBtn").click();//关闭窗口
		}
	}
	//处理失败
	else{
		confirmError(responseText.msg);
	}
}


function initSuggest(ele){
	ele.bsSuggest({
        indexId: -1,
        keyField: 'name',
        data: {'value':props}
    });
}

var trIdx = 1;
function addTableItem(){
	$("#attrtbody").append(_buildHtml());
	initSuggest($("#suggest_"+trIdx));
	trIdx ++;
	function _buildHtml(){
		var _html = [];
		_html.push('<tr>');
		_html.push('	<td>');
		_html.push('		 <div class="input-group">');
		_html.push('			<input type="text" class="form-control" id="suggest_'+trIdx+'" name="attrname">');
		_html.push('			 <div class="input-group-btn">');
		_html.push('				<button type="button" class="btn btn-white"> <span class="caret"></span> </button>');
		_html.push('				<ul class="dropdown-menu dropdown-menu-right" role="menu"></ul>');
		_html.push('			</div>');
		_html.push('		</div>');
		_html.push('	</td>');
		_html.push('	<td>');
		_html.push('		<input type="text" style="height: 32px;" name="attrval" class="form-control"/>');
		_html.push('	 </td>');
		_html.push('	<td style="text-align: center;">');
		_html.push('		<button type="button" title="删除行" onclick="deleteTableItem(this);" class="btn btn-outline btn-warning btn-xs">');
		_html.push('			<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>');
		_html.push('		 </button>');
		_html.push('	</td>');
		_html.push(' </tr>');
		
		return _html.join("");
	}
}

function deleteTableItem(ele){
	$(ele).closest("tr").remove();
}

/**
 * 连接类型切换时间
 */
function DBConTypeChange(ele){
	var value = $(ele).val();
	$("._div").hide().find(":input").attr("disabled","disabled");
	$("#"+value+"_div").show().find(":input").removeAttr("disabled");
	if(value == "JNDI"){
		$("#attr_div").hide().find(":input").attr("disabled","disabled");
	}else{
		$("#attr_div").show().find(":input").removeAttr("disabled");
	}
}
