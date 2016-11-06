/**
 * Created by Think on 2016/5/7.
 */
var remenbiaoqian = echarts.init(document.getElementById("chart"));

var option = {
	/*title: {
		text: '热门标签'
	},*/
	color:['#61a0a8'],
	tooltip: {},
	/*legend: {
		data:['标签名']
	},*/
	xAxis: {
		data: ["质量","抽查","单位","企业","信息","产品"]
	},
	yAxis: {},
	series: [{
		name: '标签名',
		type: 'bar',
		data: [5, 20, 36, 10, 10, 20]
	}]
};

remenbiaoqian.setOption(option);