// 顶部导航 广告
	function Ad(){
		this.num = 0;
		this.timer = null;
		this.bindDom();
		this.time();
	}
	Ad.prototype.bindDom = function(){
		this.ul=document.getElementById('Pay');
		this.liArr = this.ul.children;
		this.arr = [].slice.call(this.liArr);
	};
	Ad.prototype.show = function(){
		var that = this;
		animate(this.ul,{top:-54});
		setTimeout(function(){
			var li = that.arr.shift();
			that.arr.push(li);
			that.ul.innerHTML = "";
			for(var i = 0; i < that.arr.length; i++){
				that.ul.appendChild(that.arr[i]);
			}
			that.ul.style.top = 0 +"px";
		},2000)
	};
	Ad.prototype.autoStep = function(){
		this.null++;
		if(this.num > this.liArr.length-1){
				this.num = 0;
				this.movieCon.style.top = 0 + "px";
		}
		this.show()
	};
	Ad.prototype.time = function(){
		var that = this;
		this.timer = setInterval(function(){
			that.autoStep()
		},2000);
	};	
	new Ad();

//
function Breathe(job_nav,job_con,a,div){
		this.job_nav=document.getElementById(job_nav);
		this.job_con=document.getElementById(job_con);
		this.aArr=this.job_nav.getElementsByTagName(a);
		this.divArr=this.job_con.getElementsByTagName(div);
		this.bindeDom();
		this.Step(); 
		this.dot();
  	}

  	Breathe.prototype = {
  		bindeDom : function(){
  			this.aArr[0].style.zIndex=10;
  			this.num=0;
  		},
  		 show : function(n){
	  		// 排他思想（其他图片都透明度为0）
	  		// 其他小方块去"cur"
	  		// 显示当前（第i张图片透明度为1）
	  		// 当前小方块（第i张）加"cur"
	  		for(var i=0; i<this.aArr.length;i++){
	  			this.aArr[i].className="nav"+[i+1];
	  			this.divArr[i].className="con"+[i+1];
	  		}
	  		this.aArr[n].className+=" role"+[n+1];
	  		this.divArr[n].className+=" active";
	  	},
	  	autoStep : function (){
	  		this.num++;
	  		if(this.num>this.aArr.length-1){
	  			this.num=0;
	  		}
	  		this.show(this.num);
	  	},
	  	Step : function (){
	  		var that = this;
	  		this.timer=setInterval(function(){
	  			that.autoStep();
	  		},4000)
	  	},
	  	dot : function(){
	  			// 鼠标经过小方块
	  			var that = this;
		  	for(var m=0; m<this.aArr.length; m++){
		  		this.aArr[m].onmouseover=function(){
		  			for(var n=0; n<that.aArr.length; n++){
		  				if(this==that.aArr[n]){
		  					// 关联索引值
		  					that.num=n;
		  					that.show(that.num);
		  				}

		  			}
		  		}
		  	}
	  	}
  	}
	
  	new Breathe("job_nav","job_con","a","div");

//碰壁反弹
	function Pengbi(){
		this.qr=document.getElementById('qr');
		this.pbft=document.getElementById('pbft');
		this.posX=10;
		this.stepX=1;
		this.lockX=true;
		this.maxH=this.qr.clientHeight-this.pbft.offsetHeight;
		this.timer=null;
		this.moveStep();
	}
	Pengbi.prototype = {
		moveStep:function(){
			var that=this;
			this.timer=setInterval(function(){
				if(that.lockX){
					if(that.posX<10){
						that.lockX=false;
					}
					that.posX-=that.stepX;
					that.pbft.style.top=that.posX+"px";
				}else{
					if(that.posX>that.maxH-15){
						that.lockX=true;
					}
					that.posX+=that.stepX;
					that.pbft.style.top=that.posX+"px";
				}
			},20);
		}
	}
	new Pengbi();


//Tab切换
function Tab(titleName,contName,liArr,divArr,navpro){
		this.tabTitle = document.getElementById(titleName);
		this.tabCont = document.getElementById(contName);
		this.liArr=this.tabTitle.getElementsByTagName(liArr);
		this.divArr=this.tabCont.getElementsByTagName(divArr);
		this.set(navpro);
	}
	Tab.prototype = {
		set : function(navpro){
			var _this = this;
			for(var i=0; i<this.liArr.length; i++){
				 this.liArr[i].index=i; 
				 this.liArr[i].onmouseover=function(){
				  	_this.set1(this,navpro);
				 }
			}
		},
		set1 : function(_this,navpro){
			for(var j=0; j<this.liArr.length; j++){
			  		this.liArr[j].className= navpro +[j+1];
			  		this.divArr[j].className="";
			  	}
		  		this.liArr[_this.index].className+=" nav"+[_this.index+1];
		  		this.divArr[_this.index].className="tabshow";
		}
	}



	var tab = new Tab("tab_nav","tab_con","li","ul","li")
	var tab = new Tab("left_nav","left_con","a","ul","a")
//传统轮播
	function Carousel(right_top){
		this.bindDom(right_top);
		this.init();
	}

	Carousel.prototype={
		bindDom:function(right_top){
			this.right_top=document.getElementById(right_top);
			this.ad=this.right_top.children[0];
			this.ul=this.right_top.getElementsByTagName('ul')[0];
			this.ol=this.right_top.getElementsByTagName('ol')[0];
			this.olLiArr=this.ol.children;
			this.imgWidth=this.ad.offsetWidth;

			this.key=0;//控制图片
			this.s=0; //控制小方块
			this.timer=null;
		},
		init:function(){
			this.autoPlay();
			this.cur();
		},
		autoPlayStep:function (){
			this.key++;
			if(this.key>1){
				this.key=0;
			}
			this.move(this.ul,-this.key*this.imgWidth);

			this.s++;
			if(this.s>1){
				this.s=0;
			}
			for(var i=0; i<this.olLiArr.length; i++){
				this.olLiArr[i].className="";
			}
			this.olLiArr[this.s].className="li";
		},
		autoPlay:function (){
			var that = this;
			clearInterval(this.timer);
			this.timer=setInterval(function(){
				that.autoPlayStep();
			},3000)

		},
		cur:function(){
			var that = this;
			for(var i=0; i<this.olLiArr.length;i++){
				this.olLiArr[i].onmouseover=function(){
					for(var j=0; j<that.olLiArr.length;j++){
						that.olLiArr[j].className="";
						if(this==that.olLiArr[j]){
							that.key=that.s=j;
							that.olLiArr[j].className="li";
							that.move(that.ul,-j*that.imgWidth);
						}
					}
				}
			}
		},
		move:function(ele,target){
			// 该函数内部没有用到实例对象的任何属性和方法
			// 所以不需要用到this
			if(ele.timer){
				clearInterval(ele.timer);
			}
			ele.timer=setInterval(moveStep,20)
			function moveStep(){
				var speed=(target-ele.offsetLeft)/20;
				speed=speed>0?Math.ceil(speed):Math.floor(speed);
				ele.style.left=ele.offsetLeft+speed+"px";
				var cha=target-ele.offsetLeft;
				if(Math.abs(cha)<Math.abs(speed)){
					clearInterval(ele.timer);
					ele.style.left=target+"px";
				}
			}
		}
	}

	new Carousel('right_top');
