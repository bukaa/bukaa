var uploader;
$(function(){
	
	//表单Id
	formId = "userForm";
	
	//验证规则
	rules = {
			loginId: {
				required: true,
				maxlength: 50,
				isRightfulString:true
			},
			loginPass:{
				required: true,
				maxlength: 50,
				isRightfulString: true
			},
			cloginPass:{
				required: true,
				maxlength: 50,
				isRightfulString: true,
				equalTo: '#loginPass'
			},
			realName:{
				required: true,
				maxlength: 100
			},
			no:{
				required: true,
				maxlength: 20
			},
			sexName:{
				required: true
			},
			idCard:{
				isIdCardNo: true
			},
			phone:{
				maxlength: 20,
				isPhone: true
			},
			mobile:{
				maxlength: 20,
				isMobile: true
			},
			email:{
				maxlength: 50,
				email: true
			}
	};
	
	messages = {
			cloginPass:{
				equalTo: "两次输入密码不一致"
			}
	};
	
	//处理图片上传
	initImgUpload();
	
	//初始化表单
	commonInitForm();
	
//	setTimeout(function(){
//		//字典初始化
//		dicInit();
//	},50);
	
	$("input[dicName]").dic();
	
	init();
	
});

//初始化
function init(){
	setCommitHandler(commitHandler);
}

function initImgUpload(){
	uploader = WebUploader.create({
	    // 选完文件后，是否自动上传。
	    auto: false,
	    duplicate:false,
	    fileNumLimit:1,
	    fileSingleSizeLimit:1024*1024*1,
	    // swf文件路径
	    swf: urlpath + 'static/h+/4.1.0/js/plugins/webuploader/Uploader.swf',
	    // 文件接收服务端。
	    server: urlpath + 'system/user/saveUpload.sd',
	    // 选择文件的按钮。可选。
	    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
	    pick: '#filePicker',
	    // 只允许选择图片文件。
	    accept: {
	        title: 'Images',
	        extensions: 'gif,jpg,jpeg,bmp,png',
	        mimeTypes: 'image/*'
	    }
	});
	uploader.on( 'beforeFileQueued', function( file ) {
		   var $li = $('<div id="' + file.id + '" class="file-item thumbnail"><div class="del" title="删除图标" onclick="deleteIcon();"></div><img/></div>'),
		   $img = $li.find('img');
		   // $list为容器jQuery实例
		   $("#fileList").empty().append( $li );
		   // 创建缩略图
		   // 如果为非图片文件，可以不用调用此方法。
		   // thumbnailWidth x thumbnailHeight 为 100 x 100
		   uploader.makeThumb( file, function( error, src ) {
	        if ( error ) {
	            $img.replaceWith('<span>不能预览</span>');
	            return;
	        }
	        $img.attr( 'src', src );
	    }, 200, 200 );
	});
	
	// 文件上传成功。
	uploader.on( 'uploadSuccess', function( file,response  ) {
	    $( '#'+file.id ).addClass('upload-state-done');  
	    if(response.success){
	    	confirmForm(response.msg);
	    }else{
	    	confirmError(responseText.msg);
	    }
	});
	
	// 文件上传失败，显示上传出错。
	uploader.on( 'uploadError', function( file ) {
	    var $li = $( '#'+file.id ),
	        $error = $li.find('div.error');
	    // 避免重复创建
	    if ( !$error.length ) {
	        $error = $('<div class="error"></div>').appendTo( $li );
	    }
	    $error.text('上传失败');
	});
	
	// 完成上传完了，成功或者失败，先删除进度条。
	uploader.on( 'uploadComplete', function( file ) {
		uploader.reset();
		layer.close(layerIdx);
		$("#submitBtn").removeClass("disabled").removeAttr("disabled");
	});
}

/**
 * 删除图标
 */
function deleteIcon(){
	$("#zt").val("1");
	$("#fileList .file-item").html('<img src="' + urlpath + 'static/pro/images/image.png" alt="图标"/>');
	uploader.reset();	
}

//提交时的处理事件
function commitHandler(form) {
	var loginPassCheck = $("#loginPassCheck").val();
	var loginPass = $("#loginPass").val();
	if(loginPassCheck!=loginPass||loginPassCheck==""||loginPassCheck==null){
		$("#loginPass").val($.md5($("#loginPass").val()).toUpperCase());
		$("#cloginPass").val($.md5($("#cloginPass").val()).toUpperCase());
	}
	var fileLen = uploader.getFiles().length;
	if(fileLen == 1){
		$("#submitBtn").addClass("disabled").attr({ disabled:"disabled"});
		layerIdx = layer.load(0,{shade:0.05,offset: '40%'});
		var formData = {};
		formData.userId = $("#id").val();
		formData.loginId = $("#loginId").val();
		formData.no = $("#no").val();
		formData.loginPass = $("#loginPass").val();
		formData.realName = $("#realName").val();
		formData.sex = $("#sex").val();
		formData.orgCode = $("#orgCode").val();
		formData.isDisabled = $("#isDisabled").val();
		
		uploader.options.formData=formData;
		uploader.upload();
	}else{
		var options = getSubmitOptions(preRequest, postResponse);
		$(form).ajaxSubmit(options);
	}
}
