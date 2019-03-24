(function(){
	// 将所有的js语句书写在一个大IIFE中，不让变量发生污染

	// 获取元素
	var $circles = $("#circles ol li");
	var $imgList = $("#imgs ul li");
	var $carousel = $("#carousel");

	// maoni是盛放拼图的容器
	var $maoni = $("<li class='maoni'></li>").appendTo($("#imgs ul"));
	// width = 138.33 height=143.67

	// 点击close,  mask消失
	$(".close").click(function(){
		$(this).parent().fadeOut(1000);
	});

	// 第一个mask当页面加载完毕之后再出现。
	$(".mask").eq(0).fadeOut(0).stop(true).fadeIn(1000);


	// 设置一个数组保存18个拼图碎图片，图片1
	var arr = (function(){
		var temp = [];
		// 将图片划分为3*6
		for(var i = 0 ; i <= 2 ; i ++){
			for(var j = 0 ; j <= 5 ; j ++){
				temp.push($("<div></div>").css({
					"width" : 0,
					"height" : 0,
					// background: url(images/slider-img1.jpg) no-repeat -138.33px -143.67px;
					"background" : "url(images/slider-img1.jpg) no-repeat " + j * -138.33 + "px " + i * -143.66 + "px", 
					"position" : "absolute",
					"top" : i * 143.66,
					"left" : j * 138.33
				}).appendTo($maoni));
			}
		}
		return temp;
	})();


	// 保存两个信号量
	// 显示大图的信号量
	var big_idx = 0;
	// 小圆点信号量，表示有cur
	var small_idx = 0;

	// 设置锁初始值开启true
	var lock = true;


	// 定时器
	var timer = setInterval(function(){
		// 小圆点信号量改变
		small_idx ++;
		if(small_idx > $circles.length - 1){
			small_idx = 0;
		}
		console.log(small_idx);
		// 函数更改内部this指向，指向对应小圆点的信号量
		change.call($circles.eq(small_idx));
	}, 6000);

	// 鼠标进入轮播图停止定时器
	$carousel.mouseenter(function(){
		clearInterval(timer);
	});

	// 鼠标离开轮播图重新开启定时器
	$carousel.mouseleave(function(){
		// 设表先关
		clearInterval(timer);
		timer = setInterval(function(){
		// 小圆点信号量改变
		small_idx ++;
		if(small_idx > $circles.length - 1){
			small_idx = 0;
		}
		console.log(small_idx);
		// 函数更改内部this指向，指向对应小圆点的信号量
		change.call($circles.eq(small_idx));
	}, 6000);
	});
	
	// 小圆点点击事件
	$circles.click(change);
	function change(){
		// 锁闭关函数执行
		if(!lock){
			return;
		}
		// console.log(this);
		// 只要执行函数先关闭锁
		lock = false;
		// 改变小圆点信号量
		small_idx = $(this).index();

		// 如果点击的小圆点等于大图信号量不进行操作
		if(small_idx == big_idx){
			// 把锁打开
			lock = true;
			return;
		}

		// 小圆点加cur
		$(this).addClass("cur").siblings().removeClass("cur");
		// 原来大图蒙版消失
		$(".mask").eq(big_idx).fadeOut();
		// maoni 图加active，让maoni图出现
		$maoni.addClass("active");
		// 轮换maoni，显示对应小圆点信号量大图
		$.each(arr,function(i,j){
			j.css("background-image","url(images/slider-img" + (small_idx + 1) + ".jpg)").animate({
				"width" : 138.33,
				"height" : 143.66
			},300 + Math.random() * 3000);
		});


		// 延时器在3300之后开始执行
		setTimeout(function(){
			// 当碎图显示完全之后，恢复width,height为0
			$.each(arr,function(i,j){
				j.css({
					"width" :0,
					"height" :0
				})
			});
			// 改变显示大图的信号量
			big_idx = small_idx;
			// 显示真图
			$imgList.eq(big_idx).addClass("active").siblings().removeClass("active");
			// 对应大图的蒙版出现
			$(".mask").eq(big_idx).fadeOut(0).fadeIn(1000);
			// 所有事情完成之后开锁
			lock = true;
		}, 3300);




	};

	









})();