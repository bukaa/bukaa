/**
 * 基于百度Web Uploader上传组件封装
 * @author zhaolong
 */
;(function($, window, document,undefined) {
	// WebUploader实例
	var uploader;
	//定义上传组件全局路径
	var baseUrl = 'static/h+/4.1.0/js/plugins/webuploader';
    //定义FileUpload的构造函数
    var FileUpload = function(ele, opt) {
        this.$element = ele,
        this.defaults = {
    		swf: baseUrl + '/Uploader.swf',
    		auto: false,
    		isSystem:true,
    		completeShowType:'1',
    		removeCompleted: false,
			fileNumLimit: 300,
			fileSizeLimit: 200 * 1024 * 1024,    // 200 M
			fileSingleSizeLimit: 50 * 1024 * 1024,    // 50 M
			pick: {
				id: '#filePicker',
				label: '点击选择文件',
				name : 'file'
			},
			thumb:{
				width: 110,
			    height: 110,
			    allowMagnify: true
			},
			dnd: '#dndArea',
			paste: '#uploader',
			chunked: false,
			chunkSize: 512 * 1024,
			/*
			formData: {},
			runtimeOrder: 'flash',  
			accept: {
				 title: 'Images',
				 extensions: 'gif,jpg,jpeg,bmp,png,rar,zip',
				 mimeTypes: 'image/*'
			},*/
			//禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
			disableGlobalDnd: true,
			data: null
        },
        
        this.options = $.extend({}, this.defaults, opt);
    }
    
    //定义FileUpload的方法
    FileUpload.prototype = {
    	container: {},
    	fileIds: [],
		//添加的文件数量
		fileCount: 0,
		//添加的文件总大小
		fileSize: 0,	
    	//可能有pedding, ready, uploading, confirm, done.
    	state: 'pedding',
    	//所有文件的进度信息，key为file id
		percentages: {},
		uploadFiles: [],
		//判断浏览器是否支持图片的base64
		isSupportBase64: function(){
			var data = new Image();
			var support = true;
			data.onload = data.onerror = function() {
				if( this.width != 1 || this.height != 1 ) {
					support = false;
				}
			}
			data.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
			return support;
		},
		//检测是否已经安装flash，检测flash的版本
		flashVersion: function(){
			var version;

			try {
				version = navigator.plugins[ 'Shockwave Flash' ];
				version = version.description;
			} catch ( ex ) {
				try {
					version = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
							.GetVariable('$version');
				} catch ( ex2 ) {
					version = '0.0';
				}
			}
			version = version.match( /\d+/g );
			return parseFloat( version[ 0 ] + '.' + version[ 1 ], 10 );
		},
		//检测是否支持CSS3的过渡属性
		supportTransition: function(){
			var s = document.createElement('p').style,
			r = 'transition' in s ||
					'WebkitTransition' in s ||
					'MozTransition' in s ||
					'msTransition' in s ||
					'OTransition' in s;
			s = null;
			return r;
		},
		//检测浏览器是否支持文件上传
		uploadSupport: function(){
			var g = this, $wrap = this.$element;
			if (!WebUploader.Uploader.support('flash') && WebUploader.browser.ie) {
				//flash安装了但是版本过低。
				if (g.flashVersion) {
					(function(container) {
						window['expressinstallcallback'] = function( state ) {
							switch(state) {
								case 'Download.Cancelled':
									alert('您取消了更新！')
									break;

								case 'Download.Failed':
									alert('安装失败')
									break;

								default:
									alert('安装已成功，请刷新！');
									break;
							}
							delete window['expressinstallcallback'];
						};

						var swf = 'static/lib/expressInstall.swf';
						// insert flash object
						var html = '<object type="application/' +
								'x-shockwave-flash" data="' +  swf + '" ';

						if (WebUploader.browser.ie) {
							html += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
						}

						html += 'width="100%" height="100%" style="outline:0">'  +
							'<param name="movie" value="' + swf + '" />' +
							'<param name="wmode" value="transparent" />' +
							'<param name="allowscriptaccess" value="always" />' +
						'</object>';

						container.html(html);

					})($wrap);

				// 压根就没有安装。
				} else {
					$wrap.html('<a href="http://www.adobe.com/go/getflashplayer" target="_blank" border="0"><img alt="get flash player" src="http://www.adobe.com/macromedia/style_guide/images/160x41_Get_Flash_Player.jpg" /></a>');
				}

				return;
			} else if (!WebUploader.Uploader.support()) {
				alert( '您的浏览器不支持上传！');
				return;
			}
		},
		//获取根路径
		getUrlRootPath: function (){
        	//获取应用上下文路径
        	var contextpath = window.document.location.pathname;
        	var i = contextpath.indexOf("/");
        	if(i == 0){
        		contextpath = contextpath.substr(1);
        	}
        	i = contextpath.indexOf("/");
        	contextpath = "/" + contextpath.substr(0, i + 1);
        	
        	return contextpath;
        },
        //初始化文件上传dom结构
        createUploadTemplate: function(){
        	var g = this, $wrap = this.$element;
        	
        	$wrap.addClass('wu-example');
        
        	var $queueList = $('<div class="queueList" />');
        	$queueList.append('<div id="dndArea" class="placeholder"><div id="filePicker"></div><p>或将文件拖到这里，单次最多可选300张</p></div>');
        	
        	var $statusBar = $('<div class="statusBar" style="display:none;" />');
        	
        	var $progress = $('<div class="progress" />');
        	$progress.append('<span class="text">0%</span><span class="percentage"></span>');
        	
        	var $btns = $('<div class="btns" />');
        	$btns.append('<div id="filePicker2"></div>');
        	$btns.append('<div class="uploadBtn">开始上传</div>');
        	
        	$statusBar.append($progress);
        	$statusBar.append('<div class="info" />');
        	$statusBar.append($btns);
        	
        	//文件容器
        	g.container.$queue = $('<ul class="filelist"></ul>').appendTo($queueList);
        	//没有选择文件之前的内容
        	g.container.$placeHolder = $queueList.find('.placeholder');
        	//上传进度条
        	g.container.$progress = $progress.hide();
        	//文件总体选择信息
        	g.container.$info = $statusBar.find('.info');
        	//状态栏，包括进度和控制按钮
        	g.container.$statusBar = $statusBar;
        	//上传按钮
        	g.container.$upload = $btns.find('.uploadBtn');
        	//上传成功后隐藏域存储文件id
        	g.container.$hiddenInput = $('<input type="hidden" name="fileIds" />').appendTo($wrap);
        	
        	$wrap.append($queueList);
        	$wrap.append($statusBar);
        	
        },
    	//上传控件初始化
        init: function() {
        	var g = this, p = this.options; 
        	
        	// 优化retina, 在retina下这个值是2
    		var ratio = window.devicePixelRatio || 1;
    		p.thumb.width = 110 * ratio;
    		p.thumb.height = 110 * ratio;
    		
    		//检测浏览器是否支持文件上传
    		g.uploadSupport();
    		
    		//初始化文件dom结构
    		g.createUploadTemplate();
    		
    		//console.log(g.container);
    		
    		//获取应用根路径
            p.rootPath = g.getUrlRootPath(); 
            
            //上传swf路径
            if(!p.swf || p.swf.length==0) p.swf = "static/h+/4.1.0/js/plugins/webuploader/Uploader.swf";
            p.swf = p.rootPath + p.swf;
            
            //设置是否系统上传服务默认值
            if(typeof(p.isSystem)!= 'boolean'){
            	p.isSystem = true;
            }
            
            //服务端上传地址
            p.server = null;
            
            //设置上传地址
        	if(p.sysUploadUrl && p.sysUploadUrl != ''){
        		p.server = p.sysUploadUrl;
        	}
        	
        	if(!p.server){
                //设置默认获取上传地址的url
                if(!p.getAddressUrl || p.getAddressUrl==''){
                	p.getAddressUrl = p.rootPath + "com/upload/service/getUploadUrl.sd";
                }
                //获取上传地址
               	$.ajax({
            		async:false,
            		dataType:'json',
            		url:p.getAddressUrl,
            		success:function(data,statu){
            			if(statu){
	            			if(data.status){
	            				p.server = data.uploadUrl;
	            				p.formData = $.extend(p.formData,data);
	            			}else{
	            				alert(data.msg);
	            			}
            			}
            			return ;
            		}
            	});
        	}
            
        	if(!p.server || p.server.length == 0){
            	alert("没有设置或未获取到对应的上传地址");
            	return ;
            }  
            
            p.formData = p.formData || {};
            p.formData.storeType = p.storeType || "0";
            p.formData.storePath = p.storePath || "";
        	
            //实例化
    		uploader = WebUploader.create(p);
    		
            //初始化数据
        	if(p.data){
        		g.container.$placeHolder.addClass( 'element-invisible' );
				g.container.$statusBar.show();
				g.container.$info.hide();

    			g.setState('ready');
    			//g.updateTotalProgress();
        		
        		if(p.completeShowType=='1'){
        			if($.isArray(p.data)){
        				for(var i in p.data){
        					if(p.removeCompleted===false){
        						g.addFileItem(p.data[i]);
        					}
        					g.fileIds.push(p.data[i].fileId);
        					g.uploadFiles.push(p.data[i]);
        				}
        			}else if(typeof(p.data) == 'object'){
        				if(p.removeCompleted===false){        					
        					g.addFileItem(p.data);
        				}
    					g.fileIds.push(p.data.fileId);
    					g.uploadFiles.push(p.data);
        			}        			
                	g.container.$hiddenInput.val(g.fileIds.join(","));
        		}
        	}
        	
    		//拖拽时不接受 js, txt 文件。
    		uploader.on( 'dndAccept', function(items) {
    			var denied = false,
    				len = items.length,
    				i = 0,
    				// 修改js类型
    				unAllowed = 'text/plain;application/javascript ';

    			for ( ; i < len; i++ ) {
    				// 如果在列表里面
    				if ( ~unAllowed.indexOf( items[ i ].type ) ) {
    					denied = true;
    					break;
    				}
    			}

    			return !denied;
    		});
    		
    		// 添加【添加文件】的按钮，
    		uploader.addButton({
    			id: '#filePicker2',
    			label: '继续添加',
    			name : p.pick.name
    		});

    		uploader.on('ready', function() {
    			window.uploader = uploader;
    		});
    		
    		//上传进度事件
    		uploader.onUploadProgress = function(file, percentage) {
    			var $li = $('#'+file.id),
    				$percent = $li.find('.progress span');

    			$percent.css( 'width', percentage * 100 + '%' );
    			g.percentages[ file.id ][ 1 ] = percentage;
    			g.updateTotalProgress();
    		};

    		//当文件被加入队列以后触发
    		uploader.onFileQueued = function(file) {
    			g.fileCount++;
    			g.fileSize += file.size;

    			if (g.fileCount === 1) {
    				g.container.$placeHolder.addClass( 'element-invisible' );
    				g.container.$statusBar.show();
    				g.container.$info.show();
    			}

    			g.addFile(file);
    			g.setState('ready');
    			g.updateTotalProgress();
    		};
    		
    		//当文件被移除队列后触发
    		uploader.onFileDequeued = function(file) {
    			g.fileCount--;
    			g.fileSize -= file.size;

    			if (!g.fileCount) {
    				g.setState('pedding');
    			}

    			g.removeFile( file );
    			g.updateTotalProgress();
    		};

    		//特殊事件，所有的事件触发都会响应到
    		uploader.on( 'all', function(type) {
    			var stats;
    			switch(type) {
    				case 'uploadFinished':
    					g.setState('confirm');
    					break;

    				case 'startUpload':
    					g.setState('uploading');
    					break;

    				case 'stopUpload':
    					g.setState('paused');
    					break;
    			}
    		});

    		//当validate不通过时，触发此事件
    		uploader.onError = function(code) {
    			alert( '提示: ' + code );
    		};
            
    		//单个文件上传成功后
            var loadSuccess = p.onUploadSuccess;
            if(!loadSuccess){
            	p.onUploadSuccess = g.uploadSuccess;
            }else{                
                p.onUploadSuccess = function(file,data,response){
                	g.uploadSuccess(file,data,response);
                	loadSuccess(file,data,response);
                };
            }
    		
    		g.container.$upload.on('click', function() {
    			if ( $(this).hasClass( 'disabled' ) ) {
    				return false;
    			}

    			if (g.state === 'ready') {
    				uploader.upload();
    			} else if (g.state === 'paused') {
    				uploader.upload();
    			} else if (g.state === 'uploading') {
    				uploader.stop();
    			}
    		});

    		g.container.$info.on( 'click', '.retry', function() {
    			uploader.retry();
    		} );

    		g.container.$info.on( 'click', '.ignore', function() {
    			alert( 'todo' );
    		} );

    		g.container.$upload.addClass( 'state-' + g.state);
    		//更新进度条
    		g.updateTotalProgress();
            
            //是否正在删除
            g.deleting = false;
            
        	//console.log(g);
        	//console.log(p);
        },
        //当有文件添加进来时执行，负责view的创建
        addFile: function(file) {
        	var $wrap = this.$element, g = this;
        	
        	g.uploadFiles.push(file);
			var $li = $( '<li id="' + file.id + '">' +
					'<p class="title">' + file.name + '</p>' +
					'<p class="imgWrap"></p>'+
					'<p class="progress"><span></span></p>' +
					'</li>' ),

				$btns = $('<div class="file-panel">' +
					'<span class="cancel">删除</span>' +
					'<span class="rotateRight">向右旋转</span>' +
					'<span class="rotateLeft">向左旋转</span></div>').appendTo( $li ),
				$prgress = $li.find('p.progress span'),
				$wrap = $li.find( 'p.imgWrap' ),
				$info = $('<p class="error"></p>'),

				showError = function(code) {
					switch(code) {
						case 'exceed_size':
							text = '文件大小超出';
							break;

						case 'interrupt':
							text = '上传暂停';
							break;

						default:
							text = '上传失败，请重试';
							break;
					}

					$info.text(text).appendTo($li);
				};

			if (file.getStatus() === 'invalid' ) {
				showError(file.statusText);
			} else {
				$wrap.text('预览中');
				uploader.makeThumb(file, function(error, src) {
					var img;

					if (error) {
						$wrap.text('没有预览图');
						return;
					}

					if(g.isSupportBase64) {
						img = $('<img src="'+src+'">');
						$wrap.empty().append( img );
					} else {
						/*
						$.ajax('preview.php', {
							method: 'POST',
							data: src,
							dataType:'json'
						}).done(function( response ) {
							if (response.result) {
								img = $('<img src="'+response.result+'">');
								$wrap.empty().append( img );
							} else {
								$wrap.text("预览出错");
							}
						});
						*/
					}
				});

				g.percentages[ file.id ] = [ file.size, 0 ];
				file.rotation = 0;
			}

			//文件状态变化
			file.on('statuschange', function( cur, prev ) {
				if ( prev === 'progress' ) {
					$prgress.hide().width(0);
				} else if (prev === 'queued') {
					$li.off( 'mouseenter mouseleave' );
					$btns.remove();
				}

				//成功
				if (cur === 'error' || cur === 'invalid') {
					//console.log( file.statusText );
					showError( file.statusText );
					g.percentages[ file.id ][ 1 ] = 1;
				} else if (cur === 'interrupt') {
					showError( 'interrupt' );
				} else if (cur === 'queued') {
					g.percentages[ file.id ][ 1 ] = 0;
				} else if (cur === 'progress') {
					$info.remove();
					$prgress.css('display', 'block');
				} else if (cur === 'complete') {
					$li.append( '<span class="success"></span>' );
				}

				$li.removeClass( 'state-' + prev ).addClass( 'state-' + cur );
			});

			$li.on( 'mouseenter', function() {
				$btns.stop().animate({height: 30});
			});

			$li.on( 'mouseleave', function() {
				$btns.stop().animate({height: 0});
			});

			$btns.on( 'click', 'span', function() {
				var index = $(this).index(),
					deg;

				switch (index) {
					case 0:
						uploader.removeFile(file);
						return;
					case 1:
						file.rotation += 90;
						break;
					case 2:
						file.rotation -= 90;
						break;
				}

				if (g.supportTransition) {
					deg = 'rotate(' + file.rotation + 'deg)';
					$wrap.css({
						'-webkit-transform': deg,
						'-mos-transform': deg,
						'-o-transform': deg,
						'transform': deg
					});
				} else {
					$wrap.css( 'filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation='+ (~~((file.rotation/90)%4 + 4)%4) +')');
				}
			});

			$li.appendTo(g.container.$queue);
		},
		//创建fileItem
		addFileItem: function(file){
			var $wrap = this.$element, g = this;
        	
			g.uploadFiles.push(file);
			var $li = $( '<li id="' + file.fileId + '">' +
					'<p class="title">' + file.name + '</p>' +
					'<p class="imgWrap"></p>'+
					//'<p class="progress"><span></span></p>' +
					'</li>' ),

			$btns = $('<div class="file-panel">' +
				'<span class="cancel">删除</span>' +
				'<span class="rotateRight">向右旋转</span>' +
				'<span class="rotateLeft">向左旋转</span></div>').appendTo($li),
			//$prgress = $li.find('p.progress span'),
			$wrap = $li.find('p.imgWrap');
			//$info = $('<p class="error"></p>');

			$wrap.text('预览中');
			if(g.isSupportBase64) {
				img = $('<img src="'+ file.downUrl +'">');
				$wrap.empty().append( img );
			} else {
				$wrap.text('没有预览图');
			}

			//g.percentages[ file.id ] = [ file.size, 0 ];
			file.rotation = 0;

			$li.on( 'mouseenter', function() {
				$btns.stop().animate({height: 30});
			});

			$li.on( 'mouseleave', function() {
				$btns.stop().animate({height: 0});
			});

			$btns.on( 'click', 'span', function() {
				var index = $(this).index(),
					deg;

				switch (index) {
					case 0:
						uploader.removeFile(file);
						return;
					case 1:
						file.rotation += 90;
						break;
					case 2:
						file.rotation -= 90;
						break;
				}

				if (g.supportTransition) {
					deg = 'rotate(' + file.rotation + 'deg)';
					$wrap.css({
						'-webkit-transform': deg,
						'-mos-transform': deg,
						'-o-transform': deg,
						'transform': deg
					});
				} else {
					$wrap.css( 'filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation='+ (~~((file.rotation/90)%4 + 4)%4) +')');
				}
			});

			$li.appendTo(g.container.$queue);
		},
		//负责view的销毁
		removeFile: function(file) {
			var arr = [], g = this;
			for(var i = 0; i < g.uploadFiles.length; i++){
				if(file.id != g.uploadFiles[i].id) arr.push(g.uploadFiles[i]);
			};

			g.uploadFiles = arr;
			var $li = $('#'+file.id);

			delete g.percentages[ file.id ];
			g.updateTotalProgress();
			$li.off().find('.file-panel').off().end().remove();
		},
		//更新进度条
		updateTotalProgress: function() {
			var g = this, loaded = 0,
				total = 0,
				spans = g.container.$progress.children(),
				percent;

			$.each( g.percentages, function( k, v ) {
				total += v[ 0 ];
				loaded += v[ 0 ] * v[ 1 ];
			} );

			percent = total ? loaded / total : 0;

			spans.eq( 0 ).text( Math.round( percent * 100 ) + '%' );
			spans.eq( 1 ).css( 'width', Math.round( percent * 100 ) + '%' );
			g.updateStatus();
		},
		//更新文件状态
		updateStatus: function() {
			var text = '', stats, g = this;

			if (g.state === 'ready') {
				text = '选中' + g.fileCount + '个文件，共' + WebUploader.formatSize( g.fileSize ) + '。';
			} else if (g.state === 'confirm') {
				stats = uploader.getStats();
				if (stats.uploadFailNum) {
					text = '已成功上传' + stats.successNum+ '个文件，'+ stats.uploadFailNum + '个文件上传失败，<a class="retry" href="#">重新上传</a>失败文件或<a class="ignore" href="#">忽略</a>'
				}
			} else {
				stats = uploader.getStats();
				text = '共' + g.fileCount + '个（' + WebUploader.formatSize( g.fileSize ) + '），已上传' + stats.successNum + '个';

				if ( stats.uploadFailNum ) {
					text += '，失败' + stats.uploadFailNum + '个';
				}
			}

			g.container.$info.html( text );
		},
		//设置文件上传的状态
		setState: function(val) {
			var file, stats, g = this;

			if (val === g.state) {
				return;
			}

			g.container.$upload.removeClass('state-' + g.state);
			g.container.$upload.addClass('state-' + val);
			g.state = val;

			switch (g.state) {
				case 'pedding':
					g.container.$placeHolder.removeClass('element-invisible');
					g.container.$queue.hide();
					g.container.$statusBar.addClass('element-invisible');
					uploader.refresh();
					break;

				case 'ready':
					g.container.$placeHolder.addClass('element-invisible');
					$('#filePicker2').removeClass( 'element-invisible');
					g.container.$queue.show();
					g.container.$statusBar.removeClass('element-invisible');
					uploader.refresh();
					break;

				case 'uploading':
					$('#filePicker2').addClass('element-invisible');
					g.container.$progress.show();
					g.container.$upload.text('暂停上传');
					break;

				case 'paused':
					g.container.$progress.show();
					g.container.$upload.text('继续上传');
					break;

				case 'confirm':
					g.container.$progress.hide();
					$('#filePicker2').removeClass('element-invisible');
					g.container.$upload.text('开始上传');

					stats = uploader.getStats();
					if (stats.successNum && !stats.uploadFailNum) {
						g.setState('finish');
						return;
					}
					break;
				case 'finish':
					stats = uploader.getStats();
					if (stats.successNum) {
						//console.log(g.uploadFiles);
						alert( '上传成功' );
					} else {
						// 没有成功的图片，重设
						g.state = 'done';
						location.reload();
					}
					break;
			}

			g.updateStatus();
		},
		//文件上传成功后给隐藏域赋值
		uploadSuccess: function(file,data,response) {
			var g = this;
			
			data = eval("("+data+")");
        	if(!data || !data.fileId || data.fileId.length==0) return;
        	
        	var fileObj = file;
        	fileObj.id = data.fileId;
        	fileObj.name = file.name;
        	fileObj.downUrl = data.downUrl;
        	fileObj.deleteUrl = data.deleteUrl;
        	fileObj.fileId = data.fileId;
        	
        	var fileType = "";
        	if(file.type && file.type != ''){
        		fileType = file.type.substring(1);
        	}
        	fileObj.type = fileType;
        	
        	var suffix = 'B';
			var fileSize = file.size;
			if(fileSize > 1024){
				fileSize = Math.round(fileSize / 1024);
				suffix = 'KB';
			}
			if (fileSize > 1000) {
				fileSize = Math.round(fileSize / 1000);
				suffix = 'MB';
			}
			if (fileSize > 1000) {
				fileSize = Math.round(fileSize / 1000);
				suffix = 'GB';
			}
			fileObj.size = fileSize + suffix;
			
			if(p.completeShowType=='1'){
				$(".data","#"+file.id).remove();
	        	$(".fileName","#"+file.id).css("cursor","pointer");
	        	//点击下载
	        	$(".fileName","#"+file.id).bind('click',function(){
	        		window.open(fileObj.downUrl);
	        	});
	        	//删除
	        	var delBtn = $("<a href='javascript:void(0)'>删除</a>");
	        	$("#"+file.id).append(delBtn);
	        	delBtn.bind('click',function(){
	        		if(g.deleting===true) return;
	        		g.deleting = true;
	        		$.ajax({
	        			url:fileObj.deleteUrl,
	        			dataType:'jsonp',
	        			jsonpCallback:'deleteCallBack',
	        			success:function(responseData){
	        				g.deleting=false;
	        				alert(responseData.msg);
	        				$("#"+file.id).remove();
	        				for(var i in g.fileIds){
	        					if(g.fileIds[i] == fileObj.fileId){
	        						g.fileIds.splice(i,1);
	        						g.uploadFiles.splice(i, 1);
	        						break;
	        					}
	        				}
	        				g.container.$hiddenInput.val(g.fileIds.join(","));
	        			}
	        		});
	        	});
			}
			
        	
        	if(!g.fileIds) g.fileIds = [];
        	g.fileIds.push(fileObj.fileId);
        	g.uploadFiles.push(fileObj);
        	g.container.$hiddenInput.val(g.fileIds.join(","));
        	
		}
    }
    
    //在插件中使用FileUpload对象
    $.fn.FileUpload = function(options) {
        //创建FileUpload的实体
        var upload = new FileUpload(this, options);
        //调用其方法
        return upload.init();
    }
})(jQuery, window, document);