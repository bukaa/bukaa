/**
 * Created by Think on 2016/6/15.
 */
var layouta = $('.layout>a');

layouta.click(function(){
    layouta.removeClass('choosed');
    $(this).toggleClass("choosed");
});