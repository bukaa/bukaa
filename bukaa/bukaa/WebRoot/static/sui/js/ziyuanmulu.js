/**
 * Created by Think on 2016/5/4.
 */
$(function(){
	var lei = $(".lei .list-content li");
	var biaoqian = $(".biaoqian .list-content li");
	var dengji = $(".dengji .list-content li");
	var lilei = $("li.lei");
	var libiaoqian = $("li.biaoqian");
	var lidengji = $("li.dengji");
	lei.click(function(){
		var self= this;
		//var spanChecked = $('<li>'+$(self).text()+' <i class="fa fa-close"></i></li>');
		if(!$(self).hasClass("active")&&$(self).index()!=0){
			lei.removeClass("active");
			$(self).addClass("active");
			lilei.addClass("active");
			lilei.html("分类："+$(self).text()+' <i class="fa fa-close"></i>');
		}else if($(self).index()==0){_hide(lei,lilei,self);}
		$(".lei .fa").click(function(){
			lilei.removeClass("active");
			lei.removeClass("active");
			lei.eq(0).addClass("active");
			}
		);
	});
	biaoqian.click(function(){
		var self= this;
		if(!$(self).hasClass("active")&&$(self).index()!=0){
			biaoqian.removeClass("active");
			$(self).addClass("active");
			libiaoqian.addClass("active");
			libiaoqian.html("标签："+$(self).text()+' <i class="fa fa-close"></i>');
		}else if($(self).index()==0){_hide(biaoqian,libiaoqian,self);}
		$(".biaoqian .fa").click(function(){
			libiaoqian.removeClass("active");
			biaoqian.removeClass("active");
			biaoqian.eq(0).addClass("active");
			}
		);
	});
	dengji.click(function(){
		var self= this;
		if(!$(self).hasClass("active")&&$(self).index()!=0){
			dengji.removeClass("active");
			$(self).addClass("active");
			lidengji.addClass("active");
			lidengji.html("等级："+$(self).text()+' <i class="fa fa-close"></i>');
		}else if($(self).index()==0){_hide(dengji,lidengji,self);}
		$(".dengji .fa").click(function(){
			lidengji.removeClass("active");
			dengji.removeClass("active");
			dengji.eq(0).addClass("active");
			}
		);
	});
$("span.clear").click(function(){
	$("ul.checked li").removeClass("active");
	$(".list-content li").removeClass("active");
	lei.eq(0).addClass("active");
	biaoqian.eq(0).addClass("active");
	dengji.eq(0).addClass("active");
});
var sortLi = $(".sort ul>li a")
	sortLi.click(function(){
		sortLi.removeClass("active");
		$(this).toggleClass("active");
	})
});

 function _hide(list_content,lichecked,self){
	 list_content.removeClass("active");
	 lichecked.removeClass("active");
	 $(self).addClass("active");
 }


$(window).scroll(function(){
	if($(window).scrollTop()>150){
		$(".toTop").fadeIn(150);
	}else {
		$(".toTop").fadeOut(150);
	}
});
$(".toTop").click(function(){
	$('body,html').animate({scrollTop:0},300);
	return false;
});
