//获取应用程序路径
var urlpath = window.document.location.pathname;
var i = urlpath.indexOf("/");
if(i == 0){
	urlpath=urlpath.substr(1);
}
i = urlpath.indexOf("/");
urlpath = "/" + urlpath.substr(0, i + 1);

/**
 * 判断字符串是否以***结束的函数
 * @param endStr 结束字符串
 * @returns {Boolean}
 */
String.prototype.endWith = function(endStr){
	var d = this.length - endStr.length;
	return (d >= 0 && this.lastIndexOf(endStr) == d);
}
