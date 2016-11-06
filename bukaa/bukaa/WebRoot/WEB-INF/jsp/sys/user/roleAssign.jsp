<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE HTML>
<html>
	<head>	
		<%@ include file="/list-css.jsp"%>
		<title>用户角色分配</title>
	</head>
	<body>
		<div class="mainpanel"> 
    		<div class="contentpanel">
      			<div class="panel panel-default">
					<div class="panel-body">
						<input type="hidden" id="userId" value="${param.userId}">
						<div class="tabs-container gray-bg">
							<ul class="nav nav-tabs">
								<li class="active" mark="nonExistRole" onclick="tabClick(this)">
					            	<a data-toggle="tab" href="#tab_noneexist" aria-expanded="true"><i class="fa fa-user-plus"></i>未拥有的角色</a>
					            </li>
								<li class="" mark="existRole" onclick="tabClick(this)">
					            	<a data-toggle="tab" href="#tab_exist" aria-expanded="true"><i class="fa fa-user"></i>已拥有的角色</a>
					            </li>
							</ul>
							<div class="tab-content">
								<div id="tab_noneexist" class="tab-pane active">
									<div class="panel-body">
										<div id="nonExistToolbar">
											<button id="addBtn" type="button" class="btn btn-success"><i class="glyphicon glyphicon-plus"></i> 增加</button>
								    	</div>
							    		<table id="noExistTable"></table>
									</div>
								</div>
								<div id="tab_exist" class="tab-pane">
									<div class="panel-body">
										<div id="existRoleToolbar">
											<button id="deleteBtn" type="button" class="btn btn-danger"><i class="glyphicon glyphicon-remove"></i> 删除</button>
								    	</div>
							    		<table id="existTable"></table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<%@ include file="/foot.jsp" %>
		<%@ include file="/list-js.jsp" %>
		<script type="text/javascript" src="${ctx}/static/pro/js/sys/user/roleAssign.js"></script>
	</body>
</html>
