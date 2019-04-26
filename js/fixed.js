
function Topfixed(options){
    var opts = $.extend({
        id:'#topFixed',
        fixedClass:'top-fixed'
    },options);

    var fixed = $(opts.id);//获取吸顶目标ID对象
    var marginBottom = parseInt(fixed.css('marginBottom')) || 0;//吸顶目标的下边距
    //var blank = document.createElement('div');//创建空div
    var blank = $('<div></div>');//两种创建空DIV的方式
    var height = parseInt(fixed.outerHeight()+marginBottom-2);//目标元素的高度+下边距
    var scrolltop = $(window).scrollTop();//获取滚动条的滑动距离
    var fixedClass = opts.fixedClass;//获取默认的类名，与$(opts.id)不同，$(opts.id)获取的是对象；opts.fixedClass获取的是名称
    fixed.after(blank);//在吸顶目标外面的后面加空DIV
    $(blank).css({
        "height":height//空DIV的高度=目标ID元素的高度+下边距
    }).hide();//将空DIV隐藏，即正常时不显示
    this.init = function(){
        _show();
        $(window).scroll(function(){
            scrolltop = $(window).scrollTop();
            _show();
        });
    }
    function _show(){
        if(scrolltop>47){//滚动条滚过的长度大于吸顶元素距离top的长度。47怎么得到的？
            fixed.addClass(fixedClass);//目标吸顶元素增加类：fixedClass，该类在common.less中做了定义
            $(blank).show();//显示出空DIV,由于position的缘故，空div相当于占位符，放在了吸顶目标的下面。
        }else{
            fixed.removeClass(fixedClass);
            $(blank).hide();
        }
    }
}