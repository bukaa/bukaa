/**
 * Created by Think on 2016/5/9.
 */
var nums = 5; //每页出现的数量
var pages = Math.ceil(data.length/nums); //得到总页数

var thisDate = function(curr){
	//此处只是演示，实际场景通常是返回已经当前页已经分组好的数据
	var str = '', last = curr*nums - 1;
	last = last >= data.length ? (data.length-1) : last;
	for(var i = (curr*nums - nums); i <= last; i++){
		str +=
			'<div class="data"> ' +
			'<div class="left"><div style="background: url('+data[i].img+')"></div></div> ' +
			'<div class="middle"> ' +
			'<p><a href="'+data[i].url+'">'+data[i].name+'</a></p> ' +
			'<p class="middleBrief">'+data[i].brief+'</p> ' +
			'<p class="middleBrief">' +
			'<span>数据量:</span><span>'+data[i].shujuliang+'</span>' +
			'<span>发布时间</span><span>'+data[i].fabushijian+'</span></p> ' +
			'<p>标签：<span>'+data[i].biaoqian+'</span><span>'+data[i].biaoqian+'</span><span>'+data[i].biaoqian+'</span></p> </div> ' +
			'<div class="right"> ' +
			'<p><span>使用人数：</span><span>'+data[i].shiyongrenshu+'</span></p>' +
			' <p><span>评分：</span><span>'+data[i].pingfen+'</span></p>' +
			' <p><a href="'+data[i].url+'">查看详情</a></p> ' +
			'</div> </div>';
	}
	return str;
};

//调用分页
laypage({
	cont: 'laypage',
	skin: "#1092f2", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
	pages: pages,
	jump: function(obj){
		document.getElementById('dataContent').innerHTML = thisDate(obj.curr);

	}
});