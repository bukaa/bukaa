<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE HTML>
<html>
<head>
<%@ include file="/form-css.jsp"%>
<link href="${ctx}/static/lib/dicGrid/dicGrid.css" rel="stylesheet">
<link href="${ctx}/static/pro/css/uploader.css" rel="stylesheet">
<title>个人资料</title>
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
						<h5>个人资料</h5>
					</div>
					<div class="ibox-content">
						<form:form id="userInfoForm" class="form form-horizontal" action="${ctx}/system/user/saveUserInfo.sd" commandName="user">
							<form:hidden path="id" />
							<div class="panel blank-panel">
			                    <div class="panel-heading">
			                        <div class="panel-options">
			                            <ul class="nav nav-tabs">
			                                <li class="active"><a data-toggle="tab" href="tabs_panels.html#tab-4"><i class="fa fa-file-text-o"></i>基本信息</a>
			                                </li>
			                                <li class=""><a data-toggle="tab" href="tabs_panels.html#tab-5"><i class="fa fa-list-alt"></i>详细资料</a>
			                                </li>
			                            </ul>
			                        </div>
			                        <div class="panel-body">
				                        <div class="tab-content">
				                            <div id="tab-4" class="tab-pane active">
				                                <div class="ibox-content">
													<div class="form-group">
														<label class="col-sm-2 control-label">登录名</label>
														<div class="col-sm-4">
															<p class="form-control-static">${user.loginId}</p>
														</div>
														<label class="col-sm-2 control-label">编号</label>
														<div class="col-sm-4">
															<p class="form-control-static">${user.no}</p>
														</div>
													</div>
													<div class="hr-line-dashed"></div>
													<div class="form-group">
														<label class="col-sm-2 control-label">所属机构</label>
														<div class="col-sm-10">
															<p class="form-control-static">${user.orgName}</p>
														</div>
													</div>
													<div class="hr-line-dashed"></div>
													<div class="form-group">
														<label class="col-sm-2 control-label">最后登录时间</label>
														<div class="col-sm-4">
															<p class="form-control-static"><fmt:formatDate value="${user.lastTime}" pattern="yyyy-MM-dd HH:mm:ss"/></p>
														</div>
														<label class="col-sm-2 control-label">最后登录IP</label>
														<div class="col-sm-4">
															<p class="form-control-static">${user.lastIp}</p>
														</div>
													</div>
													<div class="hr-line-dashed"></div>
													<div class="form-group">
														<label class="col-sm-2 control-label">注册时间</label>
														<div class="col-sm-4">
															<p class="form-control-static"><fmt:formatDate value="${user.addTime}" pattern="yyyy-MM-dd HH:mm:ss"/></p>
														</div>
														<label class="col-sm-2 control-label">登录次数</label>
														<div class="col-sm-4">
															<p class="form-control-static">${user.loginNum}次</p>
														</div>
													</div>
					                            </div>
				                            </div>
				                            <div id="tab-5" class="tab-pane">
				                                 <div class="ibox-content">
													<div class="form-group">
														<label class="col-sm-2 control-label">姓名</label>
														<div class="col-sm-4">
															<form:input path="realName" class="form-control" placeholder="请填写姓名" />
														</div>
														<label class="col-sm-2 control-label">性别</label>
														<div class="col-sm-4">
															<form:input path="sex" class="form-control" placeholder="请填写性别" dicName="ZD_XB"/>
														</div>
													</div>
													<div class="hr-line-dashed"></div>
													<div class="form-group">
														<label class="col-sm-2 control-label">身份证号码</label>
														<div class="col-sm-4">
															<form:input path="idCard" class="form-control" placeholder="请填写身份证号码" />
														</div>
														<label class="col-sm-2 control-label">邮箱地址</label>
														<div class="col-sm-4">
															<form:input path="email" class="form-control" placeholder="请填写邮箱地址" />
														</div>
													</div>
													<div class="hr-line-dashed"></div>
													<div class="form-group">
														<label class="col-sm-2 control-label">办公电话</label>
														<div class="col-sm-4">
															<form:input path="phone" class="form-control" placeholder="请填写办公电话" />
														</div>
														<label class="col-sm-2 control-label">移动电话</label>
														<div class="col-sm-4">
															<form:input path="mobile" class="form-control" placeholder="请填写移动电话" />
														</div>
													</div>
													<div class="hr-line-dashed"></div>
													<div class="form-group">
														<div class="col-sm-4 col-sm-offset-2">
															<button class="btn btn-primary" type="button" id="submitBtn">提交</button>
														</div>
													</div>
				                                </div>
				                            </div>
				                        </div>
				                    </div>
			                    </div>
			                </div>
				    	</form:form>
				    </div>
	            </div>
	    	</div>
		</div>
	</div>

	<%@ include file="/foot.jsp"%>
	<%@ include file="/form-js.jsp"%>
	<script type="text/javascript" src="${ctx}/static/lib/dicGrid/dicGrid.js"></script>
	<script type="text/javascript" src="${ctx}/static/pro/js/sys/user/userInfoForm.js"></script>
</body>
</html>