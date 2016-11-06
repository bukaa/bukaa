<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE HTML>
<html>
<head>
<%@ include file="/form-css.jsp"%>
<link href="${ctx}/static/pro/css/uploader.css" rel="stylesheet">
<title>用户管理</title>
<style type="text/css">
	label.error {display: block;position: absolute;right: 20px;top: 8px;color: #cc5965;font-size: 12px;}
</style>
</head>
<body class="gray-bg">
	<div class="wrapper wrapper-content animated fadeInRight">
		<div class="row">
			<div class="col-sm-12">
				<div class="ibox float-e-margins">
					<div class="ibox-title">
						<h5>修改密码</h5>
					</div>
					<div class="ibox-content">
						<form id="passForm" class="form form-horizontal" action="${ctx}/system/user/savePwChange.sd" method="post">
							<input type="hidden" name="id" value="${id}"/>
							<div class="form-group">
								<label class="col-sm-2 control-label">原&nbsp;密&nbsp;码&nbsp;</label>
								<div class="col-sm-4">
									<input type="password" id="oldLoginPass" name="oldLoginPass" class="form-control" placeholder="请填写原密码"/>
								</div>
							</div>
							<div class="hr-line-dashed"></div>
							<div class="form-group">
								<label class="col-sm-2 control-label">新&nbsp;密&nbsp;码&nbsp;</label>
								<div class="col-sm-4">
									<input type="password" id="newLoginPass" name="newLoginPass" class="form-control" placeholder="请填写新密码" />
								</div>
							</div>
							<div class="hr-line-dashed"></div>
							<div class="form-group">
								<label class="col-sm-2 control-label">确认密码</label>
								<div class="col-sm-4">
									<input type="password" id="cLoginPass" name="cLoginPass" class="form-control" placeholder="请再次填写密码" />
								</div>
							</div>
							<div class="hr-line-dashed"></div>
							<div class="form-group">
								<div class="col-sm-4 col-sm-offset-2">
									<button class="btn btn-primary" type="button" id="submitBtn">修改</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>

	<%@ include file="/foot.jsp"%>
	<%@ include file="/form-js.jsp"%>
	<script type="text/javascript" src="${ctx}/static/lib/jQuery.md5.js"></script>
	<script type="text/javascript" src="${ctx}/static/pro/js/sys/user/changePwForm.js"></script>
</body>
</html>