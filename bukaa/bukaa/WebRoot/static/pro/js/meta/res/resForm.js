var dbId;
var uploader;
var layerIdx;
$(function() {

	//选择资源目录
	$("#chooseCatalog").bind("click", function(){
		var catalogUrl = urlpath + "meta/res/selectCatalog.sd"; 
		top.layer.open({
			type: 2,
			title: false,
			area: ["25%", "80%"],
			content: catalogUrl,
			//skin: 'layui-layer-rim',
			maxmin: false,
			btn: ['确定', '取消'],
			yes: function(index, layero){ 
				var catalogFrame = window.top.frames["layui-layer-iframe" + index];
				var result = catalogFrame.selectCatalogNode();
				
				if(result) {
					$("input[name='resource.catId']").val(result.id);
					$("input[name='resource.catCode']").val(result.code);
					$("input[name='resource.catName']").val(result.name);
					$("input[name='resource.catName']").blur();
					top.layer.close(index);
				}
				
			}
		});
	});
	
	//选择来源部门
	$("#chooseDept").bind("click", function(){
		var catalogUrl = urlpath + "meta/res/selectDept.sd"; 
		top.layer.open({
			type: 2,
			title: false,
			area: ["25%", "80%"],
			content: catalogUrl,
			//skin: 'layui-layer-rim',
			maxmin: false,
			btn: ['确定', '取消'],
			yes: function(index, layero){ 
				var deptFrame = window.top.frames["layui-layer-iframe" + index];
				var result = deptFrame.selectDeptNode();
				
				if(result) {
					$("input[name='resource.deptCode']").val(result.code);
					$("input[name='resource.deptName']").val(result.name);
					$("input[name='resource.deptName']").blur();
					top.layer.close(index);
				}
				
			}
		});
	});
	
	// 初始化选择标签
	chosenMultiInit("select[name='resource.tag']", $("#tag").val());
	
	// 选择标签
	$(".chosen-select-multiple").chosen({
		width : "100%",
		search_contains: true,
		max_selected_options: 50,
		no_results_text : '没有找到匹配项目'
	});
	
	//初始化字典
	$("input[name='updateType']").dic();
	
	// 初始化数据资源扩展表单
	initsjkzForm("sjkzForm");
	
	// 初始化图片上传组件
	initImgUpload();
	
	//关闭对话模窗口
	$("#closeDialogBtn").click(function(){
		$("#closeBtn").click();
	});
	
	setPreRequest(berofeRequest);
	setPostResponse(afterResponse);
});

/**
 * Chosen数据初始化
 * @param select
 * @param values
 */
function chosenMultiInit(select, values){
	if(values && values.length > 0) {
		var arr = values.split(',');
	    var length = arr.length;
	    var value = '';
	    for(i = 0; i < length; i++){
	        value = arr[i]; 
	        $(select+" option[value='"+value+"']").attr('selected','selected');
	    }
	    $(select).trigger("liszt:updated");
	}
}

/**
 * 解决Jquery validation对bootstrap3 部分组件验证不兼容出现样式错乱的问题， 如input-group 
 */
$.validator.setDefaults({
	ignore: ":hidden:not(select)",
//    highlight: function(element) {
//        $(element).closest('.form-group').addClass('has-error');
//    },
//    unhighlight: function(element) {
//        $(element).closest('.form-group').removeClass('has-error');
//    },
//    errorElement: 'span',
//    errorClass: 'help-block',
    errorPlacement: function(error, element) {
    	if(element.hasClass("chosen-select")) {
    		error.insertAfter(element.next(".chosen-container"));
    	} else if(element.parent('.input-group').length) {
            error.insertAfter(element.parent());
        } else {
            error.insertAfter(element);
        }
    }
});

function initsjkzForm(formId){
	// 验证规则
	var sjkzRules = {
		"updateTypeName" : {required : true},
		"dTotal" : {required : true,digits: true}
	};
	
	//提交处理
	if(!commitHandler) commitHandler = function(form){
		var options = getSubmitOptions(sjkzPreRequest, sjkzshowResponse);
		$(form).ajaxSubmit(options);
	};

	$("#"+formId).validate({
		rules: sjkzRules,
		onkeyup: function(element) {$(element).valid()},
		focusCleanup: false,
		success: "valid",
		submitHandler: commitHandler
	});
	

	//表单提交
	$("#sjkzSubmitBtn").click(function() {
		$("#" + formId).submit();
	});
}

var sjkzPreRequest = function(formData, jqForm, options){
	layerLoading = layer.load(0,{shade:0.05, offset: '40%'});
	if(submitBtn != ""){
		//disabledSubmitButton();
		return true;
	}
}

//表单提交之后的处理事件
function sjkzshowResponse(responseText, statusText){
	layer.close(layerLoading);
	//处理成功
	if(responseText.success){
		var title = responseText.msg;
		swal({
	    	title: title,
	        type: "success",
	        closeOnConfirm: true,
	        confirmButtonText: "关闭"
		});
	}else{
		swal({
	    	title: title,
	        type: "error",
	        closeOnConfirm: true,
	        confirmButtonText: "关闭"
		});
	}
}

//初始化文件上传
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
	    server: urlpath + 'meta/res/save.sd',
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
		   // 创建缩略图,如果为非图片文件，可以不用调用此方法。thumbnailWidth x thumbnailHeight 为 100 x 100
		   uploader.makeThumb( file, function( error, src ) {
	        if ( error ) {
	            $img.replaceWith('<span>不能预览</span>');
	            return;
	        }
	        $img.attr( 'src', src );
	    }, 100, 100 );
	});
	
	// 文件上传成功，给item添加成功class, 用样式标记上传成功。
	uploader.on( 'uploadSuccess', function( file,response  ) {
	    $( '#'+file.id ).addClass('upload-state-done');
		
		//处理成功
		if(response.success){
			var editMode = response.editMode;
			var text = "继续" + (editMode ? "编辑" : "添加") + "吗？";
			swal({
		            title: response.msg,
		            text: text,
		            type: "success",
		            showCancelButton: true,
		            cancelButtonText: "否",
		            confirmButtonColor: "#18A689",
		            confirmButtonText: "是"
			}, function(isConfirm){
				if(isConfirm){
					enabledSubmitButton();
					parent.refreshTable();
					if(!editMode){
						window.location.href = window.location.href;
					}
				}
				else{
					var parentIndex = parent.layer.getFrameIndex(window.name);
					parent.refreshTable();
					parent.layer.close(parentIndex);
				}
			});
		}
		
		//处理失败
		else{
			confirmError(response.msg);
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
		$("#resourceBtn").removeClass("disabled").removeAttr("disabled");
	});
	
}

function delIcon(id){
	swal({
	        title: '是否删除资源图标?',
	        type: "info",
	        closeOnConfirm: true,
	        showCancelButton: true,
	        confirmButtonColor: "#1A7BB9",
	        confirmButtonText: "确定",
	        cancelButtonText: "取消"
	}, function(){
		$.getJSON( urlpath + "meta/res/deleteIcon.sd",{id:id},function(data){
			if(data.success){
				$("#fileList .file-item").html('<img src="' + urlpath + 'static/irs/images/image.png" alt="图标"/>')
			}else{
				confirmError(data.msg);
			}
	   });
	});
}

/**
 * 删除图标
 */
function deleteIcon(){ 
	$("#fileList .file-item").html('<img src="' + urlpath + 'static/irs/images/image.png" alt="图标"/>')
	uploader.reset();
}

//表单提交之前的处理事件
function berofeRequest(formData, jqForm, options) {
	$("#resourceBtn").addClass("disabled").attr({ disabled:"disabled"});
	layerIdx = layer.load(0,{shade:0.05,offset: '40%'});
}

//表单提交之后的处理事件
function afterResponse(responseText, statusText){
	layer.close(layerIdx);
	$("#resourceBtn").removeClass("disabled").removeAttr("disabled");
	
	//处理成功
	if(responseText.success){
		var editMode = responseText.editMode;
		var text = "继续" + (editMode ? "编辑" : "添加") + "吗？";
		swal({
	            title: responseText.msg,
	            text: text,
	            type: "success",
	            showCancelButton: true,
	            cancelButtonText: "否",
	            confirmButtonColor: "#18A689",
	            confirmButtonText: "是"
		}, function(isConfirm){
			if(isConfirm){
				enabledSubmitButton();
				parent.refreshTable();
				if(!editMode){
					window.location.href = window.location.href;
				}
			}
			else{
				var parentIndex = parent.layer.getFrameIndex(window.name);
				parent.refreshTable();
				parent.layer.close(parentIndex);
			}
		});
	}
	
	//处理失败
	else{
		confirmError(responseText.msg);
	}
}

function saveResource(){
	if($("#mainForm").valid()){
		var fileLen = uploader.getFiles().length;
		if(fileLen == 1){
			$("#resourceBtn").addClass("disabled").attr({ disabled:"disabled"});
			layerIdx = layer.load(0,{shade:0.05,offset: '40%'});
			uploader.options.formData = $("#mainForm").serializeObject();
			//console.log(uploader.options.formData);
			uploader.upload();
		}else{
			$("#mainForm").submit();
		}
	}
}

$.fn.serializeObject = function()  
{  
   var o = {};  
   var a = this.serializeArray();  
   $.each(a, function() {  
       if (o[this.name]) {  
           if (!o[this.name].push) {  
               o[this.name] = [o[this.name]];  
           }  
           o[this.name].push(this.value || '');  
       } else {  
           o[this.name] = this.value || '';  
       }  
   });  
   return o;  
};  