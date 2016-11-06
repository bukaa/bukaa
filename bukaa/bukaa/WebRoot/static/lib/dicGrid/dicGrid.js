;(function($, window, document, undefined) {
	
	//定义dic的构造函数
	var Dic = function(ele, options) {
		this.$self = ele, this.$parent = this.$self.parent();
		var pageOptions = {
			'dicName' : ele.attr("dicName"),
			'gridWidth' : ele.attr("gridWidth"),
			'column' : ele.attr("column")?ele.attr("column").split(","):['name'],
			'displayFieldName' : ele.attr("displayFieldName"),
			'multi' : ele.attr("multi"),
			'dynamic' : ele.attr("dynamic")
		};
		
		this.defaults = {
			'dicName' : null,
			'data' : null,
			'dicPath' : urlpath + '/static/dic/',
			'url' : urlpath + '/system/dic/getDicData.sd',
			'valueField':'code',
			'labelField':'name',
			'column' : ['name'],	//显示字段
			'gridWidth' : 'auto',		//字典列表宽度
			'gridMinWidth' : 250,		//字典列表最小宽度
			'page' : 1,				//当前页
			'pageSize' : 10,		//每页展示记录数
//			'orderBy' : null,
			'displayFieldName' : null,
			'multi' : true,
			'multiSplit' : ',',		//多选时的分隔符
			'initValue' : null,		//设置初始值
			'dynamic': false,		//是否动态字典,true:动态引用字典,false:普通字典
//		    'totalName' : 'Total',
//			'recordName' : 'Rows',
			'method' : 'post',		//请求数据的方式
			'onItemClick' : null,		//选中某个选项时执行的函数
//			'onItemRender' : null,	//选项渲染函数
			'onValueChange' : null 	//值改变处理函数，默认传了当前字典选中的值value,以及字典对象manage
		},
		this.options = $.extend({}, this.defaults, pageOptions, options);
	}
	
	//定义dic的方法
	Dic.prototype = {
		_newGuid : function() {
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
			};
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
		},
		_init : function() {
			var g = this, p = this.options;
			g.$guid = g._newGuid();
			
			g.$timeout = null;
			
			g._gridRender();
			g._bind();
			g._loadData();
			
			setTimeout(function(){
				g._resize();
			},1);
		},
		_gridRender : function(grid) {
			var g = this, p = this.options;
			
			g.$nameDic = g.$self.hide().clone(true).removeAttr("id").attr("name",p.displayFieldName?p.displayFieldName:(g.$self.attr("name")+"Name")).attr("dialog", g.$guid).attr("autocomplete", "off").addClass("dic").show();
			g.$self.removeClass("validate").after(g.$nameDic);
			
			g.$grid = $('<div class="el-dialog el-dialog-top" id="' + g.$guid + '"><div><table><tbody></tbody><tfoot><tr><td colspan="10"><input type="button" class="delete btn" value="清除"></td></tr></tfoot></table></div></div>').css("display","none");
			//<input type="button" class="last btn" value="末页">
			//<input type="button" class="first btn" value="首页">
			g.$grid.find("tfoot td").append('<label class="page-container-num">第<span class="current-page">0</span>页，共<span class="total-page">0</span>页</label><input type="button" class="next btn" value="下页"><input type="button" class="prev btn" value="上页">');
			g.$self.after(g.$grid);
		},
		_resize : function(){
			var g = this, p = this.options;
			//宽度
			g.$width = p.gridMinWidth;
			if(p.gridWidth=="auto" && g.$self.width()>g.$width){
				g.$width = g.$self.width();
			}else{
				g.$width = (typeof p.gridWidth=="number")?p.gridWidth:parseInt(p.gridWidth.replace("px"));
			}
			g.$grid.css({"left":g.$nameDic.position().left, "top":g.$nameDic.position().top + g.$nameDic.outerHeight(), "width":g.$width});
		},
		//填充页面数据
		_fillData : function(isSearch){
			var g = this, p = this.options;
			var list = new Array();
            $.each(p.data, function(i, item){
            	if(i<p.pageSize * p.page  && i > p.pageSize * (p.page - 1) - 1){
	            	var classStr = "";
	            	var checked = "";
	            	if($.inArray(item[p.valueField],g.$currentValue)>-1){
	            		classStr = ' class="selected-item" ';
	            		checked = ' checked="checked" ';
	            		if(!isSearch){
	            			if($.inArray(item[p.labelField],g.$currentName)==-1){
	            				g.$currentName.push(item[p.labelField]);
	            			}
	            		}
	            	}
	            	//生成字典项TR
	                list[i] = '<tr dValue="'+item[p.valueField]+'" dName="'+item[p.labelField]+'" '+classStr+'>';
	                //生成复选框
	                if(p.multi=="true") {
	                	list[i] += '<td class="dic-check-td"><input type="checkbox" '+checked+'/></td>';
	                }
	                //生成TD
	                $.each(p.column, function(j, col){
	                	//if(item[col]){
	                		list[i] += '<td><label>' + item[col] + '</label></td>';
	                	//}
	                });
	                list[i] + '</tr>';
            	}
            });
//            if(!isSearch){
//            	g.$nameDic.val(g.$currentName.join(p.multiSplit));
//            }
            //显示
            g.$grid.find("tbody").html(list.join(""));
            
            g.$grid.find(".total-page").html(Math.ceil(p.data.length/p.pageSize));
			g.$grid.find(".current-page").html(p.page);
		},
		//加载数据
		_loadData : function (){
			var g = this, p = this.options;
			//字典数据
			if(!p.data){
				
				if(!p.dicName){
					return false;
				}
				if(p.dynamic==true || p.dynamic=='true'){
					//动态字典，请求服务器
		            $.ajax({
		                type: p.method,
		                url: p.url + "?dicMark=" + p.dicName + "&page=" + p.page + "&pagesize=" + p.pageSize,
		                dataType: 'json',
		                beforeSend: function ()
		                {
		                	g.$grid.find("tbody").html('<tr><td style="text-align:center;">数据加载中...</td></tr>');
		                },
		                success: function (data)
		                {
		                    if (!data) return;
		                    if(!data.success){
		                    	g.$grid.find("tbody").html('<tr><td style="text-align:center;color:red;">数据获取异常！</td></tr>');
		                    }else{
			                    p.data = data.data;
			                    g.$grid.trigger("loadSuccess");
		                    }
		                },
		                error: function (XMLHttpRequest, textStatus, errorThrown)
		                {
		                    try
		                    {
		                    	g.$grid.find("tbody").html('<tr><td style="text-align:center;color:red;">数据获取异常！</td></tr>');
		                    }
		                    catch (e){}
		                }
		            });
				}else{
					//静态字典
					var grid = this;
					g.$grid.find("tbody").html('<tr><td style="text-align:center;">数据加载中...</td></tr>');
					
					//加载字典JS文件
					$.ajax({
		                type: "GET",
		                url: p.dicPath + p.dicName + ".js",
		                dataType: 'script',
		                beforeSend: function ()
		                {
		                	g.$grid.find("tbody").html('<tr><td style="text-align:center;">数据加载中...</td></tr>');
		                },
		                success: function (data)
		                {
		                	var data = eval("(" + p.dicName + ")()");
		                    p.data = data;
		                    g.$grid.trigger("loadSuccess");
		                },
		                error: function (XMLHttpRequest, textStatus, errorThrown)
		                {
		                    try
		                    {
		                    	g.$grid.find("tbody").html('<tr><td style="text-align:center;color:red;">数据获取异常！</td></tr>');
		                    	alert("字典JS【"+p.dicName+".js】加载失败，字典未初始化！");
		                    }
		                    catch (e){}
		                }
		            });
				}
			}else{
				g.$grid.trigger("loadSuccess");
			}
		},
		_bind : function(grid) {
			var g = this, p = this.options;
			
			g.$nameDic.on("click", function () {
				$(".el-dialog").hide();
	            g.$grid.show();
	            return false;
	        }).on("keydown",function(e){
	        	//连续输入，取消定时器
	        	if(g.$timeout)
	        		g.$timeout = null;
	            var _nameDic = this;
	            g.$timeout = setTimeout(function(){
	            	//恢复数据
	            	if(g.$backupData){
                		p.data = g.$backupData;
                	}
	            	
	            	//返回首页
	                p.page = 1;
	                
	                var text = $(_nameDic).val();
	                if(text == ""){
	                	g.$currentValue.length = 0;
	                	g.$currentName.length = 0;
	                	g.$self.val("");
	                	g.$grid.find("tr").removeClass("selected-item").find(":checked").removeAttr("checked");
	                	g._fillData();
	                	if(p.onValueChange){
	                		p.onValueChange(g.$self.val(),g);
	                	}
	                }else{
	                	if(p.multi=="true") {
	                		//多选加分隔符
	                		$(_nameDic).val(g.$currentName.join(p.multiSplit));
	                	}else{
	                		var newData = new Array();
			                $.each(p.data,function(i,n){
			                    if(String(n[p.labelField]).indexOf(text)>-1 || String(n.fspell).indexOf(text)>-1 || String(n.sspell).indexOf(text)>-1 || String(n[p.valueField]).indexOf(text)>-1){
			                    	newData.push(n);
			                    };
			                });
			                if(!g.$backupData){
			                	g.$backupData = p.data;
			                }
			                p.data = newData;
			                g._fillData(true);
	                	}
	                }
	            },200);
	        });
			
			g.$grid.on("click","tbody tr",function(event){
				var oldValue = g.$self.val();
                if(p.multi=="true"){
                	if(!$(this).hasClass("selected-item")){
                		$(this).addClass("selected-item").find(":checkbox").prop("checked","checked");
                		g.$currentValue.push($(this).attr("dValue"));
                		g.$currentName.push($(this).attr("dName"));
                	}else{
                		$(this).removeClass("selected-item").find(":checkbox").removeAttr("checked");
                		g.$currentValue.splice($.inArray($(this).attr("dValue"),g.$currentValue),1);
                		g.$currentName.splice($.inArray($(this).attr("dName"),g.$currentName),1);
                	}
                }else{
                	g.$currentValue.length=0;
                	g.$currentName.length=0;
                	g.$currentValue.push($(this).attr("dValue"));
                	g.$currentName.push($(this).attr("dName"));
                	
                	g.$grid.find("tbody tr").not($(this)).removeClass("selected-item");
                	if(!$(this).hasClass("selected-item")){
                		$(this).addClass("selected-item");
                	}
                }
                g.$self.val(g.$currentValue.join(p.multiSplit));
            	g.$nameDic.val(g.$currentName.join(p.multiSplit));
            	
            	if(p.multi!="true"){
            		g.$grid.hide();
            	}
            	if(p.onItemClick){
            		p.onItemClick($(this).attr("dValue"),g);
            	}
            	if(oldValue!=g.$self.val()){
            		if(p.onValueChange){
            			p.onValueChange(g.$self.val(),g);
            		}
            	}
			});
			
			g.$grid.on("loadSuccess",function(){
				g.$currentValue = g.$self.val()?g.$self.val().split(p.multiSplit):new Array();
				g.$currentName = new Array();
				$.each(g.$currentValue,function(i, item){
					$.each(p.data,function(j, d){
						if(d[p.valueField]==item){
							g.$currentName.push(d[p.labelField]);
						}
					});
				});
				g.$nameDic.val(g.$currentName.join(p.multiSplit));
				
				g._fillData();
				return false;
			});
			
			//首页
			g.$grid.find(".first").on("click", function(event){
                if(p.page == 1){
                    return false;
                };
                p.page = 1;
                g._fillData();
                return false;
            });
			
			//上一页
			g.$grid.find(".prev").on("click", function(event){
                if(p.page == 1){
                    return false;
                };
                p.page = p.page - 1;
                g._fillData();
                return false;
            });
			
			//下一页
            g.$grid.find(".next").on("click", function(event){
                if(p.page == Math.ceil(p.data.length/p.pageSize)){
                    return false;
                };
                p.page = p.page + 1;
                g._fillData();
                return false;
            });
            
            //末页
            g.$grid.find(".last").on("click", function(event){
                if(p.page == Math.ceil(p.data.length/p.pageSize)){
                    return false;
                };
                p.page = Math.ceil(p.data.length/p.pageSize);
                g._fillData();
                return false;
            });
			
            //关闭
			g.$grid.find(".cannel").on("click", function(event){
				g.$grid.hide();
                return false;
            });
			
			//清除
			g.$grid.find(".delete").on("click", function(event){
				if(g.$backupData){
            		p.data = g.$backupData;
            	}
				g.$nameDic.val("");
				g.$self.val("");
				g.$currentValue.length=0;
            	g.$currentName.length=0;
            	g._fillData();
				g.$self.trigger("change");
                return false;
            });
			
			$(document).click(function(event){
	            if($(event.target).closest(".el-dialog").length == 0 && !$(event.target).attr("data-dic") && !$(event.target).attr("data-dicUrl")){
	            	if(g.$self.val()!=""){
	            		g.$nameDic.val(g.$currentName);
	            	}
	                $(".el-dialog").hide();
	            }
	        });
			
		}
	}
	
	//在插件中使用Dic对象
	$.fn.dic = function(options) {
		return this.each(function() {
			//创建Dic的实体
			var dic = new Dic($(this), options);
			//调用其方法
			dic._init();
		});
	}
})(jQuery, window, document);