$(function () {
            $("#loginId").focus();//输入焦点
            $("#loginId").keydown(function (event) {
                if (event.which == "13") {//回车键,用.ajax提交表单
                	$("#btnLogin").trigger("click");
                }
            });
            $("#loginPass").keydown(function (event) {
                if (event.which == "13") {//回车键，用.ajax提交表单
                    $("#btnLogin").trigger("click");
                }
            });
            $("#btnLogin").click(function () { //“登录”按钮单击事件
                //获取用户名称
                var loginId = encodeURI($("#loginId").val().trim());
                //获取输入密码
                var loginPass = encodeURI($("#loginPass").val().trim());
                
                $("#sundun-error").empty();  
                
                if(loginId==""||loginId==null){                  
                	$("#sundun-error").append('<i class="fa fa-pencil"></i>请输入用户名');          
                }else if(loginPass==""||loginPass==null){          	
                	$("#sundun-error").append('<i class="fa fa-pencil"></i>请输入用户密码');
                }else{
                	 $.ajax
                     ({ 
                    	 type: "POST",
                         url: urlpath+"loginCheck.sd", 
                         data: { loginId: loginId, loginPass: loginPass, fromUrl: $("#fromUrl").val() },
                         dataType: "json",
                         success: function(data){
     	                    if(data.success){
     	                    	$("#sundun-error").css("color", "green").append('<i class="fa fa-check"></i>'+data.msg);    
     	                    	location.href=urlpath+data.url;
     	                    }
     	                    else{        	
     	                    	$("#sundun-error").css("color", "red").append('<i class="glyphicon glyphicon-remove"></i>'+data.msg);
     	                    }
     	                }
                     });
                }               
            });
 });