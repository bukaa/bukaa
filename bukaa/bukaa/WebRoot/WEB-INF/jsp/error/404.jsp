<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE HTML>
<html>
	<head>
		<%@ include file="/head.jsp"%>
		<title>页面未找到</title>
	</head>
	<body class="gray-bg">
		<div class="middle-box text-center animated fadeInDown">
        	<h1>404</h1>
        	<h3 class="font-bold">页面未找到！</h3>
        	<div class="error-desc">
        		抱歉，页面好像去火星了~
        		<br/>您可以返回上一页或者去登录页面看看
        		<br/>
        		<a href="javascript:;" onclick="history.go(-1)" class="btn btn-primary m-t">返回上一页</a>
        		<a href="${ctx}" class="btn btn-primary m-t">去登录页面</a>
        	</div>
    	</div>
	</body>
</html>