
$(function(){
	
	//checkbox初始化
	$('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green'
    });
    
    //全选/反选
    $("input.allcheck").on('ifChecked', function(event){
    	$("input.priv").iCheck('check');
	}).on('ifUnchecked', function(event){
		$("input.priv").iCheck('uncheck');
	});
    
    //根模块点击事件
    $("input.root").on('ifChecked', function(event){
    	$("input[mid='" + $(this).attr("id") + "']").iCheck('check');
	}).on('ifUnchecked', function(event){
		$("input[mid='" + $(this).attr("id") + "']").iCheck('uncheck');
	});
    
    //窗口关闭
    $("#closeBtn").click(function(){
    	var parentIndex = parent.layer.getFrameIndex(window.name);
		if(parentIndex)
			parent.layer.close(parentIndex);
		else
			window.close();
    });
    
    //提交权限
    $("#submitBtn").click(function(){
    	submitPriv();
    });
});

//提交权限
function submitPriv(){
	var privs = "";
	$("input.priv:checked").each(function(){
		if(privs != "") privs += ",";
		privs += $(this).attr("id");
	});
	
	var postUrl = urlpath + "priv/manage/savePriv.sd";
	$.post(postUrl, 
		{
			master: $("#master").val(),
			masterValue: $("#masterValue").val(),
			domain: $("#domain").val(),
			domainValue: privs
		}, function(data){
			if(data.success){
            	confirmSuccess(data.msg);
            }
            else{
            	confirmError(data.msg);
            }
		}, 'json'
	);
}
