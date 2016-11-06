
//退出登录
function logout(){
	swal({
            title: "您确定要退出登录吗？",
            type: "warning",
            closeOnConfirm: false,
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定",
            cancelButtonText: "取消"
	}, function(){
		$.ajax({
	        type: "get",
	        url: urlpath + '/loginOut.sd?random=' + Math.random(),
	        dataType: "json",
	        success: function(data){
	        	window.location.href = 'login.sd';
	        }
		});
	});
}