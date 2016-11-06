
$(function(){
	
	//glyphicons字体增加手形样式
	$(".bs-glyphicons-list li").css("cursor", "pointer");
	
	//fontawesome字体点击事件
	$(".fontawesome-icon-list div").on("click", function(){
		setIconFont($(this).find("i").attr("class"));
	});
	
	//glyphicons字体点击事件
	$(".bs-glyphicons-list li").on("click", function(){
		setIconFont($(this).find("span").first().attr("class"));
	});
});

/**
 * 获取字体样式
 * @param iconFont 字体样式
 */
function setIconFont(iconFont){
	confirm("您确认要使用此图标吗？", function(){
		parent.setIcon(iconFont);			
		var parentIndex = parent.layer.getFrameIndex(window.name);
		parent.layer.close(parentIndex);
	});
}
