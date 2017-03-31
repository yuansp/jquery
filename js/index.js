$(function(){
	var duration=2000;
	var playTime=1000;
	banner(duration,playTime)
});
function banner(duration,playTime){
	var $newli=$(".scrollBanner li").eq(0).clone();//克隆第一个li
	$(".bannerBox").append($newli);//把克隆的li加到ul中
	var $oUl=$(".bannerBox");
	var $oLis=$oUl.children();
	var $oNavlist=$(".scroll_num").children();
	var $arrLeft=$(".arr_left");
	var $arrRight=$(".arr_right");
	var index=0;
	var imgLength=$oLis.length-1;
	//左边按钮绑定单击事件
	$arrRight.on("click",function(){
		index++;
		if(index>imgLength){
			index=1;
			$oUl.css({"left":0+"px"})
		}
		move(index);
	});
		//右边按钮绑定单击事件
		$arrLeft.on("click",function(){
		index--;
		if(index<0){
			index=2;
			$oUl.css({"left":-(imgLength)*$oLis.eq(0).width()+"px"})
		}
		move(index);
	});
	
	var timer=setInterval(function(){
		$arrRight.click();//模拟点击右侧按钮
	},duration);
	clearTimer($oUl);
	clearTimer($arrLeft);
	clearTimer($arrRight);
	clearTimer($oNavlist);
	function clearTimer($ele){
		$ele.hover(function(){
			clearInterval(timer);
		},function(){
			timer=setInterval(function(){
		$arrRight.click();//模拟点击右侧按钮
	},duration);
		})
	}
	
	$oNavlist.each(function(){
		var _index=0;
		$(this).on("click",function(){
			if(_index>imgLength){
				_index=1;
			}
			move(_index);
			index=$(this).index();
		})
		_index++;
	})
	
	//定义move（index）函数
	function move(index){
		$oUl.stop().animate({"left":index*(-$oLis.eq(0).width())+"px"},playTime);//ul最左端的位置
		$oNavlist.removeClass("current");
		$oNavlist.eq(index>=imgLength?0:index).addClass("current");//index>=3，把index=0， 第一个圆点应用css样式，index<3,index值不变
	}
}
