function Breathe(nav,con,nav1,con1){
		this.job_nav=document.getElementById(nav);
		this.job_con=document.getElementById(con);
	
		 
		this.aArr=this.job_nav.getElementsByTagName(nav1);
		this.divArr=this.job_con.getElementsByTagName(con1);
		this.bindeDom();
		this.Step();
		this.dot();
  	}
  	Breathe.prototype = {
  		bindeDom : function(){
  			this.num=0;
  		},
  		 show : function(n){
	  		// 排他思想（其他图片都透明度为0）
	  		// 其他小方块去"cur"
	  		// 显示当前（第i张图片透明度为1）
	  		// 当前小方块（第i张）加"cur"
	  		for(var i=0; i<this.aArr.length;i++){
	  			this.aArr[i].className="";
	  			this.divArr[i].style.opacity=0;
	  			this.divArr[i].style.zIndex=0;
	  			this.divArr[i].style.width=555+"px";
	  		}
	  		this.aArr[n].className+="active";
	  		this.divArr[n].style.opacity=1;
	  		this.divArr[n].style.zIndex=10;
	  		this.divArr[1].style.width=1362+"px";
	  		this.divArr[2].style.width=1362+"px";
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
	  		},2000)
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

  	
