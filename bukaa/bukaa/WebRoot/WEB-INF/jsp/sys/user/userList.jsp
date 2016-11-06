<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE HTML>
<html>
	<head>	
		<%@ include file="/list-css.jsp"%>
		<title>用户管理</title>
	</head>
	<body>
		<div class="mainpanel"> 
    		<div class="contentpanel">
      			<div class="panel panel-default">
					<div class="panel-body">
						<div id="toolbar">
				    	    <button id="newBtn" class="btn btn-success"><i class="glyphicon glyphicon-plus"></i> 新增</button>
							<button id="deleteBtn" class="btn btn-danger"><i class="glyphicon glyphicon-remove"></i> 删除</button>
							<span class="search-toolbar" style="margin-left: 100px;">
								用户姓名：
								<input type="text" id="realName" name="realName" class="search-input condition" style="width:120px;">&nbsp;&nbsp;
								登录名：
								<input type="text" id="loginId" name="loginId" class="search-input condition" style="width:120px;">&nbsp;&nbsp;
								编号：
								<input type="text" id="no" name="no" class="search-input condition" style="width:120px;">&nbsp;&nbsp;
								<button type="button" class="btn btn-info radius" id="searchBtn" name="searchBtn"><i class="Hui-iconfont Hui-iconfont-search2"></i> 搜用户</button>
								<button type="button" class="btn btn-secondary radius" id="resetBtn" name="resetBtn"><i class="Hui-iconfont Hui-iconfont-chongqi"></i> 重置</button>
							</span>
				    	</div>
			    		<table id="table"></table>
					</div>
				</div>
			</div>
		</div>
		<%@ include file="/foot.jsp" %>
		<%@ include file="/list-js.jsp" %>
		<script type="text/javascript" src="${ctx}/static/pro/js/sys/user/userList.js"></script>
	</body>
</html>
