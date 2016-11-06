$(function(){
	
	//表单Id
	formId = "importForm";
	
	//验证规则
	rules = {
			licenseFile:{
				required: true, 
				extension: 'lic'
			}
	};
		
	messages = {
			licenseFile:{
				required: 'License文件必须选择',
				extension: '必须上传以lic为后缀的文件'
			}
	};
	
	//初始化表单
	commonInitForm();
	
});

//表单提交之后的处理事件
function showResponse(responseText, statusText){
	layer.close(layerLoading);
	
	//处理成功
	if(responseText.success){
		confirmSuccess(responseText.msg);
	}
	
	//处理失败
	else{
		$("#" + submitBtn).removeClass("disabled");
		$("#" + submitBtn).attr("disabled", false);
		confirmError(responseText.msg);
	}
}

$.validator.addMethod( "extension", function( value, element, param ) {
	param = typeof param === "string" ? param.replace( /,/g, "|" ) : "png|jpe?g|gif";
	return this.optional( element ) || value.match( new RegExp( "\\.(" + param + ")$", "i" ) );
}, $.validator.format( "Please enter a value with a valid extension." ) );
