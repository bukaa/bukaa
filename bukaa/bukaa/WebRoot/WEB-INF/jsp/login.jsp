<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE HTML>
<html>
	<head>
		<%@ include file="/head.jsp"%>
		<link href="${ctx}/static/h+/4.1.0/css/login.css" rel="stylesheet">
		<title>神盾(RSF)平台</title>
	</head>
	<body class="signin">
	    <div class="signinpanel">
	        <div class="row">
	            <div class="col-sm-7">
	                <div class="signin-info">
	                    <div class="logopanel m-b">
	                        <h1>神盾(RSF)平台</h1>
	                    </div>
	                    
	                    <div class="m-b"></div>
	                    <h4>欢迎使用 <strong>神盾(RSF)平台</strong></h4>
	                    <ul class="m-b">
	                        <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> 优势一</li>
	                        <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> 优势二</li>
	                        <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> 优势三</li>
	                        <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> 优势四</li>
	                        <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> 优势五</li>
	                    </ul>
	                </div> 
	            </div>
	            <div class="col-sm-5">
	                <form id="loginForm">
	                    <h4 class="no-margins">登录：</h4>
	                    <p class="m-t-md">神盾(RSF)平台</p>
	                    <span id="sundun-error" style="color: red"></span>
	                    <input type="text" id="loginId" name="loginId" class="form-control uname" placeholder="用户名" />
	                    <input type="password" id="loginPass" name="loginPass" class="form-control pword m-b" placeholder="密码" />
	                    <input type="hidden" name="fromUrl" id="fromUrl" value="${param.fromUrl}"/>
	                    <a href="">忘记密码了？</a>
	                    <input type="button" class="btn btn-success btn-block" value="登录(admin/123)" id="btnLogin">
	                </form>
	            </div>
	        </div>
	        <div class="signup-footer">
	            <div class="pull-left">
	                &copy; 2016 All Rights Reserved. SES
	            </div>
	        </div>
	    </div>
	    <%@ include file="/foot.jsp"%>
	    <script src="${ctx}/static/pro/js/login.js"></script>
	</body>
</html>