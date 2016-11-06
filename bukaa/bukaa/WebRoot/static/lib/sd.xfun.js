jQuery.extend({
	/*
	href地址分解
	用法：
	var myURL = parseURL('http://abc.com:8080/dir/index.html?id=255&m=hello#top');
	
	myURL.file;     // = 'index.html'
	myURL.hash;     // = 'top'
	myURL.host;     // = 'abc.com'
	myURL.query;    // = '?id=255&m=hello'
	myURL.params;   // = Object = { id: 255, m: hello }
	myURL.path;     // = '/dir/index.html'
	myURL.segments; // = Array = ['dir', 'index.html']
	myURL.port;     // = '8080'
	myURL.protocol; // = 'http'
	myURL.source;   // = 'http://abc.com:8080/dir/index.html?id=255&m=hello#top'
	
	*/
	parseURL : function (url) {
		var a =  document.createElement('a');
		a.href = url;
		return {
			source: url,
			protocol: a.protocol.replace(':',''),
			host: a.hostname,
			port: a.port,
			query: a.search,
			params: (function(){
				var ret = {},
					seg = a.search.replace(/^\?/,'').split('&'),
					len = seg.length, i = 0, s;
				for (;i<len;i++) {
					if (!seg[i]) { continue; }
					s = seg[i].split('=');
					ret[s[0]] = s[1];
				}
				return ret;
			})(),
			file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
			hash: a.hash.replace('#',''),
			path: a.pathname.replace(/^([^\/])/,'/$1'),
			relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
			segments: a.pathname.replace(/^\//,'').split('/')
		};
	},
	//把字符串进行HTML编码
	HtmlEncode : function(str){
	  return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&#34;").replace(/\'/g,"&#39;");
	},
	//把字符串进行HTML反编码
	HtmlDecode : function(str){
	 return str.replace(/\&amp\;/g, '\&').replace(/\&gt\;/g, '\>').replace(/\&lt\;/g, '\<').replace(/\&quot\;/g, '\'').replace(/\&\#39\;/g, '\'');
	},
	//去除字符串中的所有非数字,(得到数字).
	getNumber : function(str){
		return str.replace(/[\D]/g,'');
	},
	//获取0-N之间的随机整数
	randomInt : function(num1){
		return Math.floor(Math.random()*num1);
	},
	// func函数在t毫秒延时后执行
	runAfter : function(func , t){
		var B = Array.prototype.slice.call(arguments,1);
		var f = function(){
			func.apply(null, B);
		};
		return setTimeout(f , t);
	},
	// 函数每隔t毫秒执行一次
	runEach : function(func , t){
		var B = Array.prototype.slice.call(arguments,1);
		var f = function(){
			func.apply(null,B);
		};
		return setInterval(f, t);
	},
	//函数每隔t毫秒执行，总执行n次
	runNum : function(func , t , n){
		var A = func;
		var B = Array.prototype.slice.call(arguments,2);
		var f = function(){
			A.apply(null, B);
		};
		if(t==0){
			f();return;
		};
		if(n<1){
			return;
		};
		for (i=1;i<=n;i++){
			setTimeout(f,t*i);
		};
	},
	//判断两个object的值是不是相同
	compare : function(obj1,obj2){
		for(elements   in   obj1){   
			if(obj1[elements]   !=   obj2[elements])   
		return   false   
		}   
		return   true  
	},
	//格式化日期格式
	//var dates = format( new Date() , "yyyy-MM-DD hh:mm:ss");
	format : function(date , formatStr){ 
		var str = formatStr; 
		str=str.replace(/yyyy|YYYY/,date.getFullYear()); 
		str=str.replace(/yy|YY/,(date.getYear() % 100)>9?(date.getYear() % 100).toString():"0" + (date.getYear() % 100)); 
		str=str.replace(/MM/,date.getMonth()>9?(date.getMonth()+1).toString():"0" + (date.getMonth()+1)); 
		str=str.replace(/M/g,date.getMonth()+1); 
		str=str.replace(/dd|DD/,date.getDate()>9?date.getDate().toString():"0" + date.getDate()); 
		str=str.replace(/d|D/g,date.getDate()); 
		str=str.replace(/hh|HH/,date.getHours()>9?date.getHours().toString():"0" + date.getHours()); 
		str=str.replace(/h|H/g,date.getHours()); 
		str=str.replace(/mm/,date.getMinutes()>9?date.getMinutes().toString():"0" + date.getMinutes()); 
		str=str.replace(/m/g,date.getMinutes()); 
		str=str.replace(/ss|SS/,date.getSeconds()>9?date.getSeconds().toString():"0" + date.getSeconds()); 
		str=str.replace(/s|S/g,date.getSeconds()); 
		return str; 
	},
	//格式化日期格式(string日期来源)
	//var dates = format( '2008-01-01 11:20:00' , "yyyy-MM-DD hh:mm:ss");
	formatDateString : function(datetime , formatStr){ 
		var str = formatStr; 
		
		var datetime = datetime.split(' ');
		var datestr = datetime[0].split('-');
		var timestr = datetime[1].split(':');
		
		var year = Number(datestr[0]);
		var syear = Number(datestr[0]);
		var month = Number(datestr[1]);
		var smonth = Number(datestr[1]);
		var date = Number(datestr[2]);
		var sdate = Number(datestr[2]);
		var hours = Number(timestr[0]);
		var shours = Number(timestr[0]);
		var minutes = Number(timestr[1]);
		var sminutes = Number(timestr[1]);
		var seconds = Number(timestr[2]);
		var sseconds = Number(timestr[2]);
		
		str=str.replace(/yyyy|YYYY/,year); 
		str=str.replace(/yy|YY/,(syear % 100)>9?(syear % 100):"0" + (syear % 100)); 
		str=str.replace(/MM/,month>9?month:"0" + month); 
		str=str.replace(/M/g,smonth); 
		str=str.replace(/dd|DD/,date>9?date:"0" + date); 
		str=str.replace(/d|D/g,sdate); 
		str=str.replace(/hh|HH/,hours>9?hours:"0" + hours); 
		str=str.replace(/h|H/g,shours); 
		str=str.replace(/mm/,minutes>9?minutes:"0" + minutes); 
		str=str.replace(/m/g,sminutes); 
		str=str.replace(/ss|SS/,seconds>9?seconds:"0" + seconds); 
		str=str.replace(/s|S/g,sseconds); 
		return str; 
	},	
	/*
	*  时间日期格式化
	* $.dateFormat(date , formatStr);
	*  参数1：json的字符串
	*/
	dateFormat:function(date,formatStr){
		var str = formatStr; 
		if(typeof date == "string"){
			var datetime = date.split(' ');
			var datestr = datetime[0].split('-');
			var timestr = datetime[1].split(':');
			
			var year = Number(datestr[0]);
			var syear = Number(datestr[0]);
			var month = Number(datestr[1]);
			var smonth = Number(datestr[1]);
			var date = Number(datestr[2]);
			var sdate = Number(datestr[2]);
			var hours = Number(timestr[0]);
			var shours = Number(timestr[0]);
			var minutes = Number(timestr[1]);
			var sminutes = Number(timestr[1]);
			var seconds = Number(timestr[2]);
			var sseconds = Number(timestr[2]);
			
			str=str.replace(/yyyy|YYYY/,year); 
			str=str.replace(/yy|YY/,(syear % 100)>9?(syear % 100):"0" + (syear % 100)); 
			str=str.replace(/MM/,month>9?month:"0" + month); 
			str=str.replace(/M/g,smonth); 
			str=str.replace(/dd|DD/,date>9?date:"0" + date); 
			str=str.replace(/d|D/g,sdate); 
			str=str.replace(/hh|HH/,hours>9?hours:"0" + hours); 
			str=str.replace(/h|H/g,shours); 
			str=str.replace(/mm/,minutes>9?minutes:"0" + minutes); 
			str=str.replace(/m/g,sminutes); 
			str=str.replace(/ss|SS/,seconds>9?seconds:"0" + seconds); 
			str=str.replace(/s|S/g,sseconds); 
		}else{
			str=str.replace(/yyyy|YYYY/,date.getFullYear());
			str=str.replace(/yy|YY/,(date.getYear() % 100)>9?(date.getYear() % 100).toString():"0" + (date.getYear() % 100));
			str=str.replace(/MM/,date.getMonth()>9?(date.getMonth()+1).toString():"0" + (date.getMonth()+1));
			str=str.replace(/M/g,date.getMonth()+1);
			str=str.replace(/dd|DD/,date.getDate()>9?date.getDate().toString():"0" + date.getDate());
			str=str.replace(/d|D/g,date.getDate());
			str=str.replace(/hh|HH/,date.getHours()>9?date.getHours().toString():"0" + date.getHours());
			str=str.replace(/h|H/g,date.getHours());
			str=str.replace(/mm/,date.getMinutes()>9?date.getMinutes().toString():"0" + date.getMinutes());
			str=str.replace(/m/g,date.getMinutes());
			str=str.replace(/ss|SS/,date.getSeconds()>9?date.getSeconds().toString():"0" + date.getSeconds());
			str=str.replace(/s|S/g,date.getSeconds());
		};
		return str; 
	},
	//日期比较
	compare : function(oldDate  , newDate) { 
		if(typeof(newDate)!="object" && newDate.constructor != Date){
			return -2; 
		}
		var d = oldDate.getTime() - newDate.getTime();
		if(d>0){
			return 1;
		}else{
			if(d==0){
				return 0;
			}else {
				return -1;
			}
		}
	},
	//针对不同的时间单位做加运算，得到日期年月日等加数字后的日期
	dateAdd : function( date , interval , number) {
		switch(interval) {
		case "y" : 
			date.setFullYear(date.getFullYear()+number); 
			return date; 
		case "q" : 
			date.setMonth(date.getMonth()+number*3);
			return date; 
		case "M" : 
			date.setMonth(date.getMonth()+number);
			return date; 
		case "w" : 
			date.setDate(date.getDate()+number*7);
			return date; 
		case "d" : 
			date.setDate(date.getDate()+number);
			return date; 
		case "h" : 
			date.setHours(date.getHours()+number);
			return date; 
		case "m" : 
			date.setMinutes(date.getMinutes()+number); 
			return date; 
		case "s" : 
			date.setSeconds(date.getSeconds()+number);
			return date; 
		default : 
			date.setDate(d.getDate()+number);
			return date; 
		}
	},
	cookie: function(name, value, options) {
		if (typeof value != 'undefined') { // name and value given, set cookie
			options = options || {};
			if (value === null) {
				value = '';
				options = $.extend({}, options); // clone object since it's unexpected behavior if the expired property were changed
				options.expires = -1;
			}
			var expires = '';
			if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
				var date;
				if (typeof options.expires == 'number') {
					date = new Date();
					date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
				} else {
					date = options.expires;
				}
				expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
			}
			// NOTE Needed to parenthesize options.path and options.domain
			// in the following expressions, otherwise they evaluate to undefined
			// in the packed version for some reason...
			var path = options.path ? '; path=' + (options.path) : '';
			var domain = options.domain ? '; domain=' + (options.domain) : '';
			var secure = options.secure ? '; secure' : '';
			document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
		} else { // only name given, get cookie
			var cookieValue = null;
			if (document.cookie && document.cookie != '') {
				var cookies = document.cookie.split(';');
				for (var i = 0; i < cookies.length; i++) {
					var cookie = $.trim(cookies[i]);
					// Does this cookie string begin with the name we want?
					if (cookie.substring(0, name.length + 1) == (name + '=')) {
						cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
						break;
					}
				}
			}
			return cookieValue;
		}
	},
	//flash加载
	LoadFlash : function(arg)
	{
		var parm = [];
		var _default_version = "8,0,24,0";
		var _default_quality = "high";
		var _default_align = "middle";
		var _default_menu = "false";
		
		for(i = 0; i < arguments.length; i ++)
		{
		parm[i] = arguments[i].split(' ').join('').split('=');
		for (var j = parm[i].length-1; j > 1; j --){
		parm[i][j-1]+="="+parm[i].pop();
		}
		switch (parm[i][0])
		{
		case '_version' : var _version = parm[i][1] ; break ; 
		case '_swf' : var _swf = parm[i][1] ; break ; 
		case '_base' : var _base = parm[i][1] ; break ; 
		case '_quality' : var _quality = parm[i][1] ; break ; 
		case '_loop' : var _loop = parm[i][1] ; break ; 
		case '_bgcolor' : var _bgcolor = parm[i][1] ; break ; 
		case '_wmode' : var _wmode = parm[i][1] ; break ; 
		case '_play' : var _play = parm[i][1] ; break ; 
		case '_menu' : var _menu = parm[i][1] ; break ; 
		case '_scale' : var _scale = parm[i][1] ; break ; 
		case '_salign' : var _salign = parm[i][1] ; break ; 
		case '_height' : var _height = parm[i][1] ; break ; 
		case '_width' : var _width = parm[i][1] ; break ; 
		case '_hspace' : var _hspace = parm[i][1] ; break ; 
		case '_vspace' : var _vspace = parm[i][1] ; break ; 
		case '_align' : var _align = parm[i][1] ; break ; 
		case '_class' : var _class = parm[i][1] ; break ; 
		case '_id' : var _id = parm[i][1] ; break ; 
		case '_name' : var _name = parm[i][1] ; break ; 
		case '_style' : var _style = parm[i][1] ; break ; 
		case '_declare' : var _declare = parm[i][1] ; break ; 
		case '_flashvars' : var _flashvars = parm[i][1] ; break ; 
		default :;
		};
		};
		var thtml = "";
		thtml += "<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='install/swflash.cab'";
		if(_width) thtml += " width='" + _width + "'";
		if(_height) thtml += " height='" + _height + "'";
		if(_hspace) thtml += " hspace='" + _hspace + "'";
		if(_vspace) thtml += " vspace='" + _vspace + "'";
		if(_align) thtml += " align='" + _align + "'";
		else thtml += " align='" + _default_align + "'";
		if(_class) thtml += " class='" + _class + "'";
		if(_id) thtml += " id='" + _id + "'";
		if(_name) thtml += " name='" + _name + "'";
		if(_style) thtml += " style='" + _style + "'";
		if(_declare) thtml += " " + _declare;
		thtml += ">";
		if(_swf) thtml += "<param name='movie' value='" + _swf + "'>";
		if(_quality) thtml += "<param name='quality' value='" + _quality + "'>" ;
		else thtml += "<param name='quality' value ='" + _default_quality + "'>";
		if(_loop) thtml += "<param name='loop' value='" + _loop + "'>";
		if(_bgcolor) thtml += "<param name='bgcolor' value='" + _bgcolor + "'>";
		if(_play) thtml += "<param name='play' value='" + _play + "'>";
		if(_menu) thtml += "<param name='menu' value='" + _menu + "'>";
		else thtml += "<param name='menu' value='" + _default_menu + "'>";
		if(_scale) thtml += "<param name='scale' value='" + _scale + "'>";
		if(_salign) thtml += "<param name='salign' value='" + _salign + "'>";
		if(_wmode) thtml += "<param name='wmode' value='" + _wmode + "'>";
		if(_base) thtml += "<param name='base' value='" + _base + "'>";
		if(_flashvars) thtml += "<param name='flashvars' value='" + _flashvars + "'>";
		thtml += "<embed pluginspage='http://www.macromedia.com/go/getflashplayer'";
		if(_width) thtml += " width='" + _width + "'";
		if(_height) thtml += " height='" + _height + "'";
		if(_hspace) thtml += " hspace='" + _hspace + "'";
		if(_vspace) thtml += " vspace='" + _vspace + "'";
		if(_align) thtml += " align='" + _align + "'";
		else thtml += " align='" + _default_align + "'";
		if(_class) thtml += " class='" + _class + "'";
		if(_id) thtml += " id='" + _id + "'";
		if(_name) thtml += " name='" + _name + "'";
		if(_style) thtml += " style='" + _style + "'";
		thtml += " type='application/x-shockwave-flash'";
		if(_declare) thtml += " " + _declare ;
		if(_swf) thtml += " src='" + _swf + "'";
		if(_quality) thtml += " quality='" + _quality + "'";
		else thtml += " quality='" + _default_quality + "'";
		if(_loop) thtml += " loop='" + _loop + "'";
		if(_bgcolor) thtml += " bgcolor='" + _bgcolor + "'";
		if(_play) thtml += " play='" + _play + "'";
		if(_menu) thtml += " menu='" + _menu + "'";
		else thtml += " menu='" + _default_menu + "'";
		if(_scale) thtml += " scale='" + _scale + "'";
		if(_salign) thtml += " salign='" + _salign + "'";
		if(_wmode) thtml += " wmode='" + _wmode + "'";
		if(_base) thtml += " base='" + _base + "'";
		if(_flashvars) thtml += " flashvars='" + _flashvars + "'";
		thtml += "></embed>";
		thtml += "</object>";
		document.write(thtml);
	},
	
	
	//得到请求url的参数的值
	getQueryString : function(queryStringName){
		var returnValue = "";
		var URLString = new String(document.location);
		var serachLocation = -1;
		var queryStringLength = queryStringName.length;
		do {
			serachLocation = URLString.indexOf(queryStringName + "\=");
			if (serachLocation != -1) {
				if ((URLString.charAt(serachLocation - 1) == '?')
						|| (URLString.charAt(serachLocation - 1) == '&')) {
					URLString = URLString.substr(serachLocation);
					break;
				}
				URLString = URLString.substr(serachLocation + queryStringLength + 1);
			}
	
		} while (serachLocation != -1)
		if (serachLocation != -1) {
			var seperatorLocation = URLString.indexOf("&");
			if (seperatorLocation == -1) {
				returnValue = URLString.substr(queryStringLength + 1);
			} else {
				returnValue = URLString.substring(queryStringLength + 1,
						seperatorLocation);
			}
		};
		return returnValue;
	},
	
	//获取功能URL参数的值
	getUrlParam : function(url,paramname)
	{
	 	var returnValue="";
	 	var URLString=url;
	 	var serachLocation=-1;
	 	var paramLength=paramname.length;
	 	
	 	do
	 	{
	  		serachLocation=URLString.indexOf(paramname+"\=");
	  		if (serachLocation!=-1)
	  		{
	  			if ((URLString.charAt(serachLocation-1)=='?') || (URLString.charAt(serachLocation-1)=='&'))
	   			{
	    			URLString=URLString.substr(serachLocation);
	    			break;
	   			}
	   			
	   			URLString=URLString.substr(serachLocation+paramLength+1);
	  		}  
	 	} 	
	 	while (serachLocation!=-1)
	 	
		if (serachLocation!=-1)
		{
			var seperatorLocation=URLString.indexOf("&");
		  	if (seperatorLocation==-1)
		  	{
		   		returnValue=URLString.substr(paramLength+1);
		  	}
		  	else
		  	{
		   		returnValue=URLString.substring(paramLength+1,seperatorLocation);
		  	} 
		 }
		 
		 return returnValue;
	}
	,
	
	//获取除关键参数之外的其它参数字符串
	getOtherUrlParamString : function(obj)
	{	
		var url=unescape(window.location.href);//获取URL,unescape解析URL字符
	   	var allargs=url.split("?")[1];//获取?后的值
	   	var args=allargs.split("&");//获取参数数组
	   	
	   	var paramName = "";
	   	var paramValue = "";
	   	var otherUrl = "";
	   	
	   	for(var i=0;i<args.length; i++)
	   	{ 
	   		paramName = args[i].split("=")[0];
	   		paramValue = args[i].split("=")[1];
	  		
	  		if(!$.arrayContainName(obj, paramName))
	  		{
	  			otherUrl += "&" + paramName + "=" + paramValue;
	  		}
	   	}
	   	
	   	return otherUrl;
	}
	,
	
	//设置url中的参数值
	setUrlParam : function(url, paramName, paramValue)
	{		
		var finalurl = url.split("?")[0] + "?";
	   	var allargs = url.split("?")[1];	//获取?后的值
	   	var args;
	   	if(allargs){
	   		args=allargs.split("&");		//获取参数数组
	   	}
	   	else{
	   		finalurl += paramName + "=" + paramValue;
	   		return finalurl;
	   	} 	
	   	
	   	var flag = false;					//是否找到该参数标志
	   	
	   	var tempParamName = "";
	   	var tempParamValue = "";
	   	
	   	for(var i=0;i<args.length; i++)
	   	{ 
	   		//添加特殊分隔符
	   		var lastChar = finalurl.substr(finalurl.length - 1, 1);
	   		
	   		if(lastChar != "?")
	   		{
	   			finalurl += "&";
	   		}
	   		
	   		tempParamName = args[i].split("=")[0];
	   		tempParamValue = args[i].split("=")[1];
	  		
	  		if(tempParamName == paramName)
	  		{
	  			finalurl += tempParamName + "=" + paramValue;
	  			flag = true;
	  		}
	  		else
	  		{
	  			finalurl += tempParamName + "=" + tempParamValue;
	  		}	  		
	   	}
	   	
	   	if(!flag)
	   	{	   		
	   		finalurl += "&" + paramName + "=" + paramValue;
	   	}	   	
	   	
	   	return finalurl;
	}
	,
	
	//比较当前URL与参数URL，加入不同的参数
	setOtherUrlParam : function(inputurl)
	{		
		var url=unescape(window.location.href);//获取URL,unescape解析URL字符
	   	var allargs=url.split("?")[1];//获取?后的值
        if(!allargs){return inputurl;}//没有参数直接返回
	   	var args=allargs.split("&");//获取参数数组
	   	
	   	var paramName = "";
	   	var paramValue = "";
	   	var outputurl = inputurl;
	   	
	   	for(var i=0;i<args.length; i++)
	   	{ 
	   		paramName = args[i].split("=")[0];
	   		paramValue = args[i].split("=")[1];
	  		
	  		if(inputurl.indexOf(paramName) == -1)
	  		{
	  			if(outputurl.indexOf("?") > -1){
	  				outputurl += "&" + paramName + "=" + paramValue;
	  			}
	  			else{
	  				outputurl += "?" + paramName + "=" + paramValue;
	  			}	  			
	  		}
	   	}
	   	
	   	return outputurl;
	}
	,
	
	//判断数组中是否包含某对象
	
	arrayContainName : function(obj, paramName)
	{
		if(obj == null || typeof(obj) == 'undefined')
			return false;
		
		var flag = false;
		
		for(var j=0;j<obj.length;j++)
		{
			var objName = obj[j];
			
			if(objName == paramName)
			{
				flag = true;
				break;
			}
		}
		
		return flag;
	}
	,
	
	//最大化打开一个新窗口
	openWindowMax : function(url)
	{
		var ww = window.screen.width-5;
	  	var hh = window.screen.height-60;
	  	return window.open(url,"","top=0,left=0,width="+ww+",height="+hh+",resizable=yes,scrollbars=yes,status=no,toolbar=no,menubar=no,location=no");
	}
	,
	//打开满屏窗口
	openFullWindow : function(url){
		var height = window.screen.availHeight-60;
		var width = window.screen.availWidth-4;
		window.open(url, "", "height="+height+", width="+width+",top=0,left=0,toolbar=no, menubar=no, scrollbars=yes, resizable=yes, location=no, status=no");
	},
	
	/**
	 * 打开模式窗口
	 * @param {} sPath
	 * @param {} oArgs
	 * @param {} iX
	 * @param {} iY
	 * @return {}
	 */
	openModalDlg : function(sPath, oArgs, iX, iY){
	
		/**
		*1、在对话模中打开新的窗口，经常会发生会话丢失的现象，特修改为传递整个window作为参数。
		*2、追加手动构建的参数(目前用到的是mode和id)
		**/
		var args = new Object;
		args.window = window;
		
		if(oArgs == null){
			oArgs = window;
		}
		
		if(oArgs && oArgs != null)
		{
			try
			{
				for(key in oArgs)
				{	
					//var jsStr = "args." + key + "='" + oArgs[key] + "';";
					//eval(jsStr);  args.aa = val;
					args[key] = oArgs[key];
				}				
			}
			catch(e)
			{
				alert(e.message);
			}
		}		
		
		if(!iX || !iY){
			iX = window.screen.width;
			iY = window.screen.height - 20;
		}
		
		return window.showModalDialog(sPath, args, "dialogWidth:" + iX + "px;dialogHeight:" + iY + "px;resizable:yes;help:0;status:0;center:1"); 
	}
	,
	/**
	 * 打开窗体
	 * @param {} url
	 * @param {} ww
	 * @param {} hh
	 */
	openWindow : function(url,ww,hh) {
		 var top = (screen.height - hh)/2;
	  	var left= (screen.width - ww)/2;
	  	return window.open(url,"","top="+top+",left="+left+",width="+ww+",height="+hh+",resizable=yes,scrollbars=yes,status=yes,toolbar=no,menubar=no,location=no");
	}
	,
	/**
	 * 居中打开窗体
	 * @param {} url
	 * @param {} ww
	 * @param {} hh
	 */
	openWindowNoMax : function(url,ww,hh){
		var top = (screen.height - hh)/2;
	  	var left= (screen.width - ww)/2;
	  	return window.open(url,"","top="+top+",left="+left+",width="+ww+",height="+hh+",resizable=no,scrollbars=yes,status=no,toolbar=no,menubar=no,location=no");
	}
	,
	/**
	 * 最大化打开窗体
	 * @param {} url
	 * @param {} ww
	 * @param {} hh
	 */
	openWindowMax : function(url){
		var ww = window.screen.width-5;
	  var hh = window.screen.height-60;
	  return window.open(url);
	}
	,
	/**
	 * 
	 * @param {} url
	 */
	openNormalWindowMax : function(url){
		 var ww = window.screen.width-5;
	  var hh = window.screen.height-60;
	  return window.open(url,"","top=0,left=0,width="+ww+",height="+hh+",resizable=yes,scrollbars=yes,status=yes,toolbar=yes,menubar=yes,location=yes");
	  
	}
	,	
	/**
	 * 格式化xml
	 * @param {} rootName
	 * @param {} arrNames
	 * @param {} arrValues
	 * @return {}
	 */
	buildFlatXmlString : function(rootName, arrNames, arrValues){
		var returnVal = ("<" + rootName + ">");
		for(var i = 0; i < arrNames.length; i++)
		{
			returnVal += ("<" + arrNames[i] + ">");
			if(arrValues[i] != null) returnVal += this.encodeXml(arrValues[i]);
			returnVal += ("</" + arrNames[i] + ">");
		}
		returnVal += ("</" + rootName + ">");
		return returnVal;
	}
	,
	/**
	 * 去除特殊字符
	 * @param {} s
	 * @return {}
	 */
	encodeXml : function(s){
		s = s.replace(/\x26/g,"&#38;");     //&
	    s = s.replace(/\x3c/g,"&#60;");     //<
	    s = s.replace(/\x3e/g,"&#62;");     //>
	    s = s.replace(/\x22/g,"&#34;");     //"
	    s = s.replace(/\x27/g,"&#39;");     //'
	    return s;
	}	
	,
	/**
	 * iframe高度自适应
	 * @param {} iframeId
	 * @return {}
	 */
	resizeIframe : function(iframeId){
		try 
		{ 				
			var obj = document.getElementById(iframeId);
			obj.height = document.frames[iframeId].document.body.scrollHeight;				
		}
		catch(e){} 		
	}	
	,
	/**
	 * 下拉框值清空并赋缺省值
	 * @param {} iframeId
	 * @param {} defaultValue
	 * @param {} defaultText
	 * @return {}
	 */
	removeSelect : function(selectId, defaultValue, defaultText){
		try
		{		
			var selectObj = document.getElementById(selectId);	
	    	
	    	for(var j=selectObj.length; j>0; j--)
   			{
   				selectObj.options[j] = null;
   				selectObj.options.remove(j);
   			}
   			
   			if(defaultValue != null && defaultText != null)
   			{
   				selectObj.options[0] = Option(defaultValue, defaultText);
   			}
		}
		catch(e)
		{}
	},
	/**
	 * 将原字符串中指定的值用指定的值替换
	 */	
 	replaceStr :function (Str,toMoveStr,toReplaceStr)
	 {
	   var returnStr="";
	   var sourceStr=Str.toString();
	   while (sourceStr.length>0 && sourceStr.indexOf(toMoveStr)!=-1)
	   {
	     var curPlace=sourceStr.indexOf(toMoveStr);
	     returnStr+=sourceStr.substring(0,curPlace)+toReplaceStr;
	     sourceStr=sourceStr.substring(curPlace+toMoveStr.length,sourceStr.length);
	   }
	   returnStr+=sourceStr;
	   return returnStr;
	 },
	 
	 /**
	 * 获取浏览器url的域名（ip）和根目录。
	 * 如：http://192.168.1.80/theme
	 */		 
	 getrootpath : function(){
			var strFullPath=window.document.location.href;
			var strPath=window.document.location.pathname;
			var pos=strFullPath.indexOf(strPath);
			var prePath=strFullPath.substring(0,pos);
			var postPath=strPath.substring(0,strPath.substr(1).indexOf('/')+1);
			return(prePath+postPath);
	},
	/**
	 * 获取浏览器url的域名（ip）。
	 * 如：http://192.168.1.80
	 */		 
	 getdomain : function(){
			var strFullPath=window.document.location.href;
			var strPath=window.document.location.pathname;
			var pos=strFullPath.indexOf(strPath);
			var prePath=strFullPath.substring(0,pos);
			var postPath=strPath.substring(0,strPath.substr(1).indexOf('/')+1);
			return(prePath);
	},
	/**
	 * 获取浏览器根目录。
	 * 如：/theme/
	 */	
	getpathname : function(){
		var urlpath = window.document.location.pathname;
		var i = urlpath.indexOf("/");
		if(i==0)
		{
			urlpath=urlpath.substr(1);
		}
		i = urlpath.indexOf("/");
		return("/" + urlpath.substr(0,i + 1));
	},
	/*
	*  字典格式化 
	*/
	formatDic : function(dm,dic){
		try{
			var _arrDm = dm.split(","),dicdata;
			if(typeof(dic) == "function")
				dicdata = dic();
			else
				dicdata = eval(dic + '()');	
			var mc = "";
			for(var m=0;m<_arrDm.length;m++){
				$.each(dicdata,function(i,n){
					if(n.dm == _arrDm[m]) 
					{
						if(mc==""){
							mc = n.mc;
						}else{
							mc = mc+","+n.mc;
						};
					};
					
				});
			};
			
			dicdata = null;
			return mc;
		}
		catch(e){
			//alert('字典文件('+ dic.toString() +'.js)尚未引用！');
		};
	},
	/*
	*  将px单位的值转为没有单位的整数
	*/
	pxtonum: function(prop){
		var tempcalc = prop;
		if( typeof(tempcalc) == "number" )
			return tempcalc;
		else
		{
			tempcalc = Number(tempcalc.replace(/px/,""));
			return tempcalc;
		}
	},
	/*
	*  将图层固定于水平位置
	*/
	fixedPosition: function(element ,top , right ,bottom ,left){
		/*标志特定公共规则是否存在*/
		var inited = false;
		
		/*设置特定公共规则*/
		setGlobal = function(){
			if (! inited)
			{
				document.body.style.height = "100%";
				document.body.style.overflow = "auto";
				$.addCSSRule("*html" ,"overflow-x:hidden;overflow-y:auto;");
				inited = true;
			}
		};
		/*
		功能：使元素fixed定位
		*/
		element.style.display = "block";
		if (!window.XMLHttpRequest && window.ActiveXObject)
		{
			element.style.position = "absolute";
			//setGlobal();
		}
		else
		{
			element.style.position = "fixed";
		};
		
		if(top != null) element.style.top = top +"px";
		if(right != null) element.style.right = right +"px";
		if(bottom != null) element.style.bottom = bottom +"px";
		if(left != null) element.style.left = left +"px";
		
		
	},
	/*添加css规则*/
	addCSSRule: function(key ,value){
		var css = document.styleSheets[document.styleSheets.length-1];
		css.cssRules ? 
			(css.insertRule(key +"{"+ value +"}", css.cssRules.length)) :
			(css.addRule(key ,value));		
	},
	/**************************************
	 *  html片段复制和渲染
	 *  fr,to,how,fn  -- fr：html片段；to：复制到什么地方，dom节点；how：复制方式；fn：回调函数，在将复制的片段附加到dom之前进行处理
	 **************************************/
	htmlclone : function (fr,to,how,fn){
			//复制
			var data = (arguments[3] == undefined)?($(fr).clone(true)):fn($(fr).clone(true));
			//对下拉列表进行处理
			data.find("*").each(function() {
				 $(this).removeData();
			});
			data.removeData();
			
			
			//渲染
			if(how == "before")
			{
				$(to).before(data.ohtml());
			}
			else if(how == "after")
			{
				$(to).after(data.ohtml());
			}
			else if(how == "append")
			{
				$(to).append(data.ohtml());
			}
			else if(how == "prepend")
			{
				$(to).prepend(data.ohtml());
			}
			else
			{
				if($.msgbox) 
					$.msgbox.alert('附加方式错误，仅支持before、after、append和prepend！',null,null,'温馨提示',null);
				else 
					alert('附加方式错误，仅支持before、after、append和prepend！');
			}
			
						
	},
	/*
	*  iframe高度自适应
	*/
	iframeAutoHeight: function(el){
		var el = $(el)[0];
		function iResize()
		{
			$(el).each(function(){
				this.style.height = $(this.contentWindow.document.body).height() + 'px';
			});			
		}
		if ($.browser.safari || $.browser.opera)
		{
			$(el).load(function(){
				setTimeout(iResize, 0);
			});
			$(el).each(function(){
				var iSource = this.src;
				this.src = '';
				this.src = iSource;
			});
		}
		else
		{
			function autoh()
			{
				try{
					el.style.height = $(el.contentWindow.document.body).height() + 'px';
					$(el).load(function(){
						this.style.height = $(this.contentWindow.document.body).height() + 'px';
					});
				}
				 catch (e){};
			};
			autoh();
		};
		
		if($(el).height() == 0){
			el.style.height = el.contentWindow.document.body.scrollHeight;		
		}
	},
	/*
	*  传入第几周的数字和年度，返回该周的开始日期和结束日期
	*/
	weekToDate: function(week,year){
		if(year == undefined) year = new Date().getFullYear();		
		var d = new Date();    
		d.setFullYear( year  , 0 );
		var firstweek = 8;
		for( var i = 1 ; i <= 31 ; i++ ){
			d.setDate( i );        
			if( d.getDay() == 1 )
			{
			    if(i == 2) firstweek = 2;
			    break;
			};
			if(i > 1) firstweek = d.getDate() + 1;			
		};
		var daynum = 0 ,w1 = "" ,w2 = "";
						
		daynum = firstweek + (Number(week) - 2)*7;
		
		if(week == 1)
		{			
			d.setFullYear(year,0,1);
			w1 = this.format(d,'yyyy-MM-dd');
			w2 = (firstweek == 2)?w1:this.format(this.dateAdd(d,'d',firstweek - 2),'yyyy-MM-dd');
		}
		else
		{
			d.setDate( daynum );
			w1 = this.format(d,'yyyy-MM-dd');
			w2 = this.format(this.dateAdd(d,'d',6),'yyyy-MM-dd');
		};
    	return ( w1 + ',' + w2 );
	},
	/*
	*  传入一个日期，返回该日期所在的当年的第几周周数
	*/
	dateToWeek: function(date){
		var date = date.split('-');
		var d = new Date();    
		d.setFullYear(date[0],Number(date[1])-1,date[2]);
		
		var dd = new Date();
		for( var i = 1 ; i <= 53 ; i++ )
		{
			var oneDate = this.weekToDate(i,date[0]).split(',');
			var oneDateSplit = oneDate[0].split('-');			    
			dd.setFullYear(oneDateSplit[0],Number(oneDateSplit[1])-1,oneDateSplit[2]);
			if(this.compare(d,dd) == 0)
				return i;
			else if(this.compare(d,dd)<1)
				return i-1;
		};
	},
	/*
	*  传入一个日期，返回该日期距离今日还有多少天
	*/
	compareNowDate: function(date){
		if(date.indexOf("-")>-1) date = date.replace(/-/g,'/');
		var d = new Date(date);
		var dd = new Date();
		//return this.compare(d,dd);
		var days= d.getTime() - dd.getTime(); 
		var time = parseInt(days / (1000 * 60 * 60 * 24));

		return time;
	},
	/**  
     * 清除当前选择内容  
     */  
    unselectContents: function(){   
        if(window.getSelection)   
            window.getSelection().removeAllRanges();   
        else if(document.selection)   
            document.selection.empty();   
    },
	/**  
     * 复制文本  
     */  
	copyCode: function(obj) {
		if(is_ie && obj.style.display != 'none') {
			var rng = document.body.createTextRange();
			rng.moveToElementText(obj);
			rng.scrollIntoView();
			rng.select();
			rng.execCommand("Copy");
			rng.collapse(false);
		}
	},	
	/**  
     * 在新窗口预览html  
     */  
	runCode: function(value) {
		var winname = window.open('', "_blank", '');
		winname.document.open('text/html', 'replace');
		winname.document.write(value);
		winname.document.close();
	},
	/**  
     * 保存为html文件  
     */  
	saveCode: function(value) {
		var winname = window.open('', '_blank', 'top=10000');
		winname.document.open('text/html', 'replace');
		winname.document.writeln(value);
		winname.document.execCommand('saveas','','code.htm');
		winname.close();
	},
	/**
	*   生成随机字符串
	**/
	randstr: function(len)
	{
		 var seed = new Array(
			//'abcdefghijklmnopqrstuvwxyz',
			'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
			'0123456789'
		   );
		 
		 var idx,i;
		 var result = '';
		 for (i=0; i<len; i++)
		 {
		  idx = Math.floor(Math.random()*2);
		  result += seed[idx].substr(Math.floor(Math.random()*(seed[idx].length)), 1);
		 }
		
		 return result; 
	},
	/* 判断文本宽度 */
	checkStrLen: function(value,maxLength){     
		  var  str,Num = 0,maxLength = 2*maxLength,stringLength = 0;   
		  for(var i=0;i<value.length;i++){   
			  str = value.substring(i,i+1);   
			  if(str<="~")     //判断是否双字节   
				Num+=1;
			  else   
				Num+=2;
			  
			  stringLength++;
			  
			  if(Num > maxLength) break;
		  };
		  return  stringLength;   
		  //return  value.length;   
	},
	/***
	 * *
	 * 处理过长的字符串，截取并添加省略号
	 * 注：半角长度为1，全角长度为2
	 * 
	 * pStr:字符串
	 * pLen:截取长度
	 * 
	 * return: 截取后的字符串	 
	 */
	autoAddEllipsis:function(pStr, pLen) { 

	    var _ret = $.cutString(pStr, pLen); 
	    var _cutFlag = _ret.cutflag; 
	    var _cutStringn = _ret.cutstring; 

	    if ("1" == _cutFlag) { 
	        return _cutStringn + "..."; 
	    } else { 
	        return _cutStringn; 
	    } 
	},
	/*
	 * 取得指定长度的字符串
	 * 注：半角长度为1，全角长度为2	
	 * pStr:字符串
	 * pLen:截取长度	
	 * return: 截取后的字符串	 
	 */
	cutString:function(pStr, pLen) { 

	    // 原字符串长度 
	    var _strLen = pStr.length; 

	    var _tmpCode; 

	    var _cutString; 

	    // 默认情况下，返回的字符串是原字符串的一部分 
	    var _cutFlag = "1"; 

	    var _lenCount = 0; 

	    var _ret = false; 

	    if (_strLen <= pLen/2) { 
	        _cutString = pStr; 
	        _ret = true; 
	    } 

	    if (!_ret) { 
	        for (var i = 0; i < _strLen ; i++ ) { 
	            if ($.isFull(pStr.charAt(i))) { 
	                _lenCount += 2; 
	            } else { 
	                _lenCount += 1; 
	            } 

	            if (_lenCount > pLen) { 
	                _cutString = pStr.substring(0, i); 
	                _ret = true; 
	                break; 
	            } else if (_lenCount == pLen) { 
	                _cutString = pStr.substring(0, i + 1); 
	                _ret = true; 
	                break; 
	            } 
	        } 
	    } 

	    if (!_ret) { 
	        _cutString = pStr; 
	        _ret = true; 
	    } 

	    if (_cutString.length == _strLen) { 
	        _cutFlag = "0"; 
	    } 

	    return {"cutstring":_cutString, "cutflag":_cutFlag}; 
	},
	/***
	 * *
	 * 判断是否为全角
	 * pChar:长度为1的字符串
	 * return: true:全角
	 *         false:半角
	 */
	isFull:function(pChar) {
		  for (var i = 0; i < pChar.strLen ; i++ ) {     
		    if ((pChar.charCodeAt(i) > 128)) { 
		        return true; 
		    } else { 
		        return false; 
		    }
		}
	}
});

jQuery.fn.extend({   
    /**  
     * 选中内容  
     */  
    selectContents: function(){   
        $(this).each(function(i){   
            var node = this;   
            var selection, range, doc, win;   
            if ((doc = node.ownerDocument) &&   
                (win = doc.defaultView) &&   
                typeof win.getSelection != 'undefined' &&   
                typeof doc.createRange != 'undefined' &&   
                (selection = window.getSelection()) &&   
                typeof selection.removeAllRanges != 'undefined')   
            {   
                range = doc.createRange();   
                range.selectNode(node);   
                if(i == 0){   
                    selection.removeAllRanges();   
                }   
                selection.addRange(range);   
            }   
            else if (document.body &&   
                     typeof document.body.createTextRange != 'undefined' &&   
                     (range = document.body.createTextRange()))   
            {   
                range.moveToElementText(node);   
                range.select();   
            }   
        });   
    },
	/**  
     * 初始化需要插入文本的光标所在控件  
     */
	setCaret: function(){
		if($.browser.msie){
         $(this)
           .click(function(){
             caret($(this).get(0));
           })
           .select(function(){
             caret($(this).get(0));
           })
           .keyup(function(){
             caret($(this).get(0));
           });
       	};
		function caret(textObj)
		{
			if(textObj.createTextRange){    
				textObj.caretPos=document.selection.createRange().duplicate();    
			}
		};
    },
    /**  
     * 在当前对象光标处插入指定的内容  
     */
    insertAtCaret: function(text){
        function insertAtCaret(textObj,textFeildValue){  
          if(document.all&&textObj.createTextRange&&textObj.caretPos){       
              var caretPos=textObj.caretPos;      
              caretPos.text=caretPos.text.charAt(caretPos.text.length-1)==''?textFeildValue+'':textFeildValue; 
          }else if(textObj.setSelectionRange){        
              var rangeStart=textObj.selectionStart;
              var rangeEnd=textObj.selectionEnd;     
              var tempStr1=textObj.value.substring(0,rangeStart);      
              var tempStr2=textObj.value.substring(rangeEnd);      
              textObj.value=tempStr1+textFeildValue+tempStr2;
              textObj.focus();
              var len=textFeildValue.length;
              textObj.setSelectionRange(rangeStart+len,rangeStart+len);
              textObj.blur();
          }else {
            textObj.value+=textFeildValue;
          } 
        };
        
        insertAtCaret($(this).get(0),text);
    }
	
}); 


/* $('.top-div').ScrollTo2(500) */
$.getPos = function (e)
{
	var l = 0;
	var t  = 0;
	var w = $.intval($.css(e,'width'));
	var h = $.intval($.css(e,'height'));
	var wb = e.offsetWidth;
	var hb = e.offsetHeight;
	while (e.offsetParent){
		l += e.offsetLeft + (e.currentStyle?$.intval(e.currentStyle.borderLeftWidth):0);
		t += e.offsetTop  + (e.currentStyle?$.intval(e.currentStyle.borderTopWidth):0);
		e = e.offsetParent;
	}
	l += e.offsetLeft + (e.currentStyle?$.intval(e.currentStyle.borderLeftWidth):0);
	t  += e.offsetTop  + (e.currentStyle?$.intval(e.currentStyle.borderTopWidth):0);
	return {x:l, y:t, w:w, h:h, wb:wb, hb:hb};
};
$.getClient = function(e)
{
	if (e) {
		w = e.clientWidth;
		h = e.clientHeight;
	} else {
		w = (window.innerWidth) ? window.innerWidth : (document.documentElement && document.documentElement.clientWidth) ? document.documentElement.clientWidth : document.body.offsetWidth;
		h = (window.innerHeight) ? window.innerHeight : (document.documentElement && document.documentElement.clientHeight) ? document.documentElement.clientHeight : document.body.offsetHeight;
	}
	return {w:w,h:h};
};
$.getScroll = function (e) 
{
	if (e) {
		t = e.scrollTop;
		l = e.scrollLeft;
		w = e.scrollWidth;
		h = e.scrollHeight;
	} else  {
		if (document.documentElement && document.documentElement.scrollTop) {
			t = document.documentElement.scrollTop;
			l = document.documentElement.scrollLeft;
			w = document.documentElement.scrollWidth;
			h = document.documentElement.scrollHeight;
		} else if (document.body) {
			t = document.body.scrollTop;
			l = document.body.scrollLeft;
			w = document.body.scrollWidth;
			h = document.body.scrollHeight;
		}
	}
	return { t: t, l: l, w: w, h: h };
};

$.intval = function (v)
{
	v = parseInt(v);
	return isNaN(v) ? 0 : v;
};

$.fn.ScrollTo = function(s) {
	o = $.speed(s);
	return this.each(function(){
		new $.fx.ScrollTo(this, o);
	});
};

$.fx.ScrollTo = function (e, o)
{
	var z = this;
	z.o = o;
	z.e = e;
	z.p = $.getPos(e);
	z.s = $.getScroll();
	z.clear = function(){clearInterval(z.timer);z.timer=null};
	z.t=(new Date).getTime();
	z.step = function(){
		var t = (new Date).getTime();
		var p = (t - z.t) / z.o.duration;
		if (t >= z.o.duration+z.t) {
			z.clear();
			setTimeout(function(){z.scroll(z.p.y, z.p.x)},13);
		} else {
			st = ((-Math.cos(p*Math.PI)/2) + 0.5) * (z.p.y-z.s.t) + z.s.t;
			sl = ((-Math.cos(p*Math.PI)/2) + 0.5) * (z.p.x-z.s.l) + z.s.l;
			z.scroll(st, sl);
		}
	};
	z.scroll = function (t, l){window.scrollTo(l, t)};
	z.timer=setInterval(function(){z.step();},13);
};