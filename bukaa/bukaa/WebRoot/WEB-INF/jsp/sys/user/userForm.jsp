<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE HTML>
<html>
<head>
<%@ include file="/form-css.jsp"%>

<link href="${ctx}/static/pro/css/uploader.css" rel="stylesheet">
<link href="${ctx}/static/lib/dicGrid/dicGrid.css" rel="stylesheet">
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
						<h5>用户管理</h5>
					</div>
					<div class="ibox-content">
						<form:form id="userForm" class="form form-horizontal" action="${ctx}/system/user/save.sd" commandName="user">
							<div style="display:none;">
								<form:hidden path="id" />
							</div>
							<div class="form-group">
								<label class="col-sm-2 control-label">登录名</label>
								<div class="col-sm-4">
									<form:input path="loginId" class="form-control" placeholder="请填写登录名" />
								</div>
								<label class="col-sm-2 control-label">编号</label>
								<div class="col-sm-4">
									<form:input path="no" class="form-control" placeholder="请填写编号" />
								</div>
							</div>
							<div class="hr-line-dashed"></div>
							<div class="form-group">
								<label class="col-sm-2 control-label">密码</label>
								<div class="col-sm-4">
									<input type="password" id="loginPass" name="loginPass" value="${user.loginPass}" class="form-control" placeholder="请填写密码" />
									<input type="hidden" id= "loginPassCheck" name="loginPassCheck" value="${user.loginPass}" />
								</div>
								<label class="col-sm-2 control-label">确认密码</label>
								<div class="col-sm-4">
									<input type="password" id="cloginPass" name="cloginPass" value="${user.loginPass}" class="form-control" placeholder="请再次填写密码" />
								</div>
							</div>
							<div class="hr-line-dashed"></div>
							<div class="form-group">
								<label class="col-sm-2 control-label">姓名</label>
								<div class="col-sm-4">
									<form:input path="realName" class="form-control" placeholder="请填写姓名" />
								</div>
								<label class="col-sm-2 control-label">性别</label>
								<div class="col-sm-4">
									<form:input path="sex" class="form-control" placeholder="请选择性别" dicName="ZD_XB"/>
								</div>
							</div>
							<div class="hr-line-dashed"></div>
							<div class="form-group">
								<label class="col-sm-2 control-label">所属机构</label>
								<div class="col-sm-4">
									<input type="text" name="orgCode" id="orgCode" class="form-control" value="${org.code}" placeholder="请填写所属机构" dicName="ZD_ORG"/>
								</div>
								<label class="col-sm-2 control-label">头像</label>
								<input type="hidden" id="zt" name="zt" value="0">
								<div class="col-sm-4">
									<div id="uploader-img">
						   				<div id="fileList" class="uploader-list">
									    	<div class="file-item thumbnail">
									    		<c:choose>
									    			<c:when test="${empty user.photo}">
									    				<img src="${ctx}/static/pro/images/image.png" alt="头像">
									    			</c:when>
									    			<c:otherwise>
									    				<div class="del" title="删除图标" onclick="deleteIcon();"></div>
									    				<img id="img1" src="${ctx}/system/user/showImage.sd?id=${user.id}" style="height: 100%;" alt="图标">
									    			</c:otherwise>
									    		</c:choose>			    		
									    	</div>
							    		</div>
							    		<div id="filePicker">选择图片</div>
									</div>
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
								<label class="col-sm-2 control-label">是否禁用</label>
								<div class="col-sm-10">
									<label class="checkbox-inline i-checks">
										<form:radiobutton path="isDisabled" value="false" />否 
									</label>
									<label class="checkbox-inline i-checks">
										<form:radiobutton path="isDisabled" value="true" />是 
									</label>
								</div>
							</div>
							<div class="hr-line-dashed"></div>
							<div class="form-group">
								<div class="col-sm-4 col-sm-offset-2">
									<button class="btn btn-primary" type="button" id="submitBtn" >保存</button>
									<button class="btn btn-white" type="button" id="closeBtn">关闭</button>
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
	<script type="text/javascript" src="${ctx}/static/lib/jQuery.md5.js"></script>
	<script type="text/javascript" src="${ctx}/static/lib/dicGrid/dicGrid.js"></script>
	<script type="text/javascript" src="${ctx}/static/h+/4.1.0/js/plugins/webuploader/webuploader.min.js"></script>
	<script type="text/javascript" src="${ctx}/static/pro/js/sys/user/userForm.js"></script>
</body>
</html>