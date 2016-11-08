<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE HTML>
<html>
	<head>
		<%@ include file="/form-css.jsp"%>
		<style type="text/css">
		</style>
		<title></title>
	</head>
	<body class="gray-bg">
		<div class="wrapper wrapper-content">
			  <div class="row">
	            <div class="col-sm-3">
	                <div class="ibox float-e-margins">
	                    <div class="ibox-title">
	                        <span class="label label-success pull-right">总</span>
	                        <h5>登录总数</h5>
	                    </div>
	                    <div class="ibox-content">
	                        <h1 class="no-margins">353</h1>
	                    </div>
	                </div>
	            </div>
	            <div class="col-sm-3">
	                <div class="ibox float-e-margins">
	                    <div class="ibox-title">
	                        <span class="label label-info pull-right">今天</span>
	                        <h5>今日登录</h5>
	                    </div>
	                    <div class="ibox-content">
	                        <h1 class="no-margins">5</h1>
	                    </div>
	                </div>
	            </div>
	            <div class="col-sm-3">
	                <div class="ibox float-e-margins">
	                    <div class="ibox-title">
	                        <span class="label label-success pull-right">总</span>
	                        <h5>资源总数</h5>
	                    </div>
	                    <div class="ibox-content">
	                        <h1 class="no-margins">14</h1>
	                    </div>
	                </div>
	            </div>
	            <div class="col-sm-3">
	                <div class="ibox float-e-margins">
	                    <div class="ibox-title">
	                        <span class="label label-info pull-right">今天</span>
	                        <h5>今日新增</h5>
	                    </div>
	                    <div class="ibox-content">
	                        <h1 class="no-margins">1</h1>
	                    </div>
	                </div>
	            </div>
	        </div>
	        <div class="row">
            <div class="col-sm-12">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <h5>资源分类统计</h5>
                        <div class="pull-right">
                            <div class="btn-group">
                            </div>
                        </div>
                    </div>
                    <div class="ibox-content">
                        <div class="row">
                            <div class="col-sm-9">
                                <div class="flot-chart" style="height:230px;">
                                    <div class="flot-chart-content" id="flot-dashboard-chart"></div>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <ul class="stat-list">
                                    <li>
                                        <h2 class="no-margins" id="zsCount">0</h2>
                                        <small>资源总数</small>
                                        <div class="stat-percent" id="zsPer1">100% <i class="fa text-navy"></i>
                                        </div>
                                        <div class="progress progress-mini">
                                            <div id="zsPer2" style="width: 100%;" class="progress-bar"></div>
                                        </div>
                                    </li>
                                    <li>
                                        <h2 class="no-margins " id="yfbCount">0</h2>
                                        <small>已发布数量</small>
                                        <div class="stat-percent" id="yfbPer1">0%</i>
                                        </div>
                                        <div class="progress progress-mini">
                                            <div id="yfbPer2" style="width:0%;" class="progress-bar"></div>
                                        </div>
                                    </li>
                                    <li>
                                        <h2 class="no-margins" id="wfbCount">0</h2>
                                        <small>未发布数量</small>
                                        <div class="stat-percent" id="wfbPer1">0%</i>
                                        </div>
                                        <div class="progress progress-mini">
                                            <div id="wfbPer2" style="width: 0%;" class="progress-bar"></div>
                                        </div>
                                    </li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
         <div class="row">
         	<div class="col-sm-12">
         		 <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <h5>部门资源统计</h5>
                        <div class="pull-right">
                            <div class="btn-group">
                            </div>
                        </div>
                    </div>
                    <div class="ibox-content">
                    	<div class="flot-chart" style="height:230px;">
                             <div class="flot-chart-content" id="flot-dashboard-chart2"></div>
                         </div>
                 	 </div>
                 </div>
         	</div>
         </div>
		</div>
	</body>
	<script src="${ctx}/static/h+/4.1.0/js/jquery.min.js"></script>
	<script src="${ctx}/static/h+/4.1.0/js/plugins/echarts/echarts-all.js"></script>
</html>