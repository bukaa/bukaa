<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<%
	Throwable exception = (Throwable)request.getAttribute("javax.servlet.error.exception");
	Object exceptionCode = request.getAttribute("javax.servlet.error.status_code");
	if(exceptionCode == null){
		exceptionCode = new Integer(500);
	}
%>
<!DOCTYPE HTML>
<html>
	<head>
		<%@ include file="/head.jsp"%>
		<title>系统异常</title>
	</head>
	<body class="gray-bg">
		<div class="middle-box text-center animated fadeInDown">
	        <h1><%=exceptionCode %></h1>
	        <h3 class="font-bold">系统发生异常，请联系管理员！</h3>	
	        <div class="error-desc">
	        	<%=exception.getMessage() %>
	            <br/>您可以返回主页看看
	            <br/><a href="${ctx}/portal/index.htm" class="btn btn-primary m-t">主页</a>
	        </div>
	    </div>
	</body>
</html>