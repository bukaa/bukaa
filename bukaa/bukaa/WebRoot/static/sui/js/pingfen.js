/**
 * Created by Think on 2016/5/9.
 */
var star = $(".dafen>i");
star.mouseover(function(i){
	n=$(this).index()+1;
	for(i=0;i<n;i++){
		star.eq(i).removeClass("fa-star-o");
		star.eq(i).addClass("fa-star");

	}
});