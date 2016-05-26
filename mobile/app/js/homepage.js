$(document).ready(function(){
	//导航下划线移动
	var $navLi=$(".navbar li");
	$navLi.each(function(i){
		$navLi.eq(i).on("tap",function(){
			$navLi.children("a").removeClass("on");
			$(this).children("a").addClass("on");
		});
	});

	//获取屏幕可视宽度，让弹出分享框的宽度适应各种屏幕
	function fitToWidth(el){
		// var bodyW=document.documentElement.clientWidth;
		el.style.width=document.documentElement.clientWidth-30+'px';
	}

	function showDialog(){
		$("#credit").fadeIn("fast");
		$("#showImgFrame").fadeIn("slow");
		fillTB(getId('credit'));
		autoCenter(getId('showImgFrame'));
	}

	var box = document.querySelector("#credit");
	var boxImg = document.querySelector("#showImgFrame");

  	//点击图片显示大图片
	function openBigImg(){
		var imgSrc = $(this).attr("src");
		var img = "<img src='"+imgSrc+"' alt='' />";
		$('body').css("overflow","hidden");    //禁用滚动条
		$("#showImgFrame").html(img);
		sizeChange=1;
		showDialog();
        box.addEventListener("touchmove",function(event){
        	event.preventDefault();
		},false);
		boxImg.addEventListener("touchmove",function(event){
        	event.preventDefault();
		},false);
	}
	$("#showImg img").click(openBigImg);

	//	点击图片关闭图片
	$("#showImgFrame").click(function(){
		$("#showShareFrame").fadeOut("fast");
		$("#credit").fadeOut("slow");
		$("#showImgFrame").fadeOut("fast");
		$("body").css("overflow","visible");  //使滚动条可用
		sizeChange=0;
	});

	//	点击遮幕关闭图片分享框
	$("#credit").click(function(){
		$("#showShareFrame").fadeOut("fast");
		$("#credit").fadeOut("slow");
		$("#showImgFrame").fadeOut("fast");
		$("#deleteTip").fadeOut("fast");
		$(".showLogTip").slideUp("fast");
		$("body").css("overflow","visible");  //使滚动条可用
		sizeChange=0;
	});


	$(window).resize(function(){
		var showimg=$("#showImgFrame img");
		autoCenter(showimg);
	});

	//把li  a  ul  jQuery Mobile的默认data-role去掉
	$(document).bind( "pagecreate", function( e ) {
		$( "li,a,ul", e.target ).attr( "data-" + $.mobile.ns + "role", "none" );
	});

	});
	//跳转页面时自动把登陆form重置
	$(document).on("pageinit","#loginPage",function(){
		$(".data_header a").on("tap",function(){
			$(".login_box")[0].reset();
			$(".tip").empty();
		});
		$(".loginWrapper").swiperight(function(e){//右滑显示主页面
			$(".login_box")[0].reset();
			$.mobile.changePage("#home",{
				transition:"slide",
				reverse:true,
				allowSamePageTransition:true
			});
		});
		$(".loginWrapper").swipeleft(function(e){//在登陆页面左滑显示注册页面
			$(".login_box")[0].reset();
			$.mobile.changePage("#registerPage",{
				transition:"slide",
				allowSamePageTransition:true
			});
		});
	});
	$(document).on("pageinit","#registerPage",function(){
		$(".data_header a").on("tap",function(){//跳转页面时自动把注册form重置
			$(".register_box")[0].reset();
			$(".tip").empty();
		});
		$(".registerWrapper").swiperight(function(e){//在注册页面右滑显示登陆页面
			$(".register_box")[0].reset();
			$.mobile.changePage("#loginPage",{
				transition:"slide",
				reverse:true,
				allowSamePageTransition:true
			});
		});
		$(".registerWrapper").swipeleft(function(e){//在注册页面左滑显示主页
			$(".register_box")[0].reset();
			$.mobile.changePage("#home",{
				transition:"slide",
				allowSamePageTransition:true
			});
		});
	});

	var box = document.querySelector("#credit");
	//赞---ajax异步请求数据
	function praiseUp(funId){
		var el = event.srcElement ? event.srcElement : event.target;   //获取元素点击的对象
		var strjson=jQuery.param({'thing_id':funId});
		var trample=$(el).parent().next().children();//获取踩的图标元素
		if(!trample.hasClass("trample")){
			$.ajax({
	            type:"POST",
	            url: "/funnythings/index.php/Praise/Praise.html",
	            data: strjson,
	            dataType:"json",
	            error:function(){
					alert("请求错误");
	            },
	            success:function(data){
	                var jsonObj=JSON.parse(data);
	                if(jsonObj.status){
	                  if(jsonObj.power){
	                  	if(jsonObj.request){
	                  		alert('请求错误！');
	                  	}else if(jsonObj.praised){
	                       alert("您已点赞~");
	                  	}else{
							$(el).removeClass("fa-thumbs-o-up");
							$(el).addClass("fa-thumbs-up");
							$(el).addClass('praise');
							$(el).animate({fontSize:"20px"},200);
							$(el).animate({fontSize:"25px"},200);
	                  }
	              	  }else{
							alert("您的权限不足！");
	              	}
	                }else{ //用户未登录
	                	showTipToLog();
	                }
	            }
        	});
		}
	}
	//踩--异步传送数据
	function trampleDown(funId){
		var strjson=jQuery.param({'thing_id':funId});
		var el = event.srcElement ? event.srcElement : event.target;   //获取元素点击的对象
		var praise=$(el).parent().prev().children();//获取点赞的图标对象
		if(!praise.hasClass("praise")){
			$.ajax({
	            type:"POST",
	            url: "/funnythings/index.php/Stamp/Stamp.html",
	            data: strjson,
	            dataType:"json",
	            error:function(){
					$(el).removeClass("fa-thumbs-o-down");
	  				$(el).addClass("fa-thumbs-down");
	  				$(el).addClass('trample');
					$(el).animate({fontSize:"20px"},200);
					$(el).animate({fontSize:"25px"},200);
	            },
	            success:function(data){
	                var jsonObj=JSON.parse(data);
	                if(jsonObj.status){
	                  if(jsonObj.power){
	                  	if(jsonObj.request){
	                  		alert('请求错误！');
	                  	}else if(jsonObj.praised){
	                       alert("您已踩~");
	                  	}else{
							$(el).removeClass("fa-thumbs-o-down");
							$(el).addClass("fa-thumbs-down");
							$(el).addClass('trample');
	                  }
	              	  }else{
							alert("您的权限不足！");
	              		}
	                }else{ //用户未登录
	                 showTipToLog();
	                }
	            }
	        });
		}
	}

	//收藏趣事
	function collectFun(funId){
		var strjson=jQuery.param({'thing_id':funId});
		var el = event.srcElement ? event.srcElement : event.target;   //获取元素点击的对象
		if(!$(el).hasClass("collect")){
			$.ajax({
				type:"POST",
				url: "/funnythings/index.php/Collect/Collect.html",
				data: strjson,
				dataType:"json",
				error:function(){
					alert("请求错误");
				},
				success:function(data){
					var jsonObj=JSON.parse(data);
					if(jsonObj.status){
					  if(jsonObj.power){
						if(jsonObj.request){
							alert('请求错误！');
						}else if(jsonObj.praised){
						   alert("您已踩~");
						}else{
							$(el).removeClass("fa-heart-o");
							$(el).addClass("fa-heart");
							$(el).addClass("collect");
							$(el).animate({fontSize:"20px"},200);
							$(el).animate({fontSize:"25px"},200);
					  }
					  }else{
							alert("您的权限不足！");
						}
					}else{ //用户未登录
					 showTipToLog();
					}
				}
			});
		}
	}
	//显示要登陆提示框
	function showTipToLog(){
		$(".showLogTip").slideDown();
        $("#credit").show();
        autoCenter(getId('showLogTip'));
       	$('body').css("overflow","hidden");  //禁用滚动条
        box.addEventListener("touchmove",function(event){
        	event.preventDefault();
			},false);
		logTip.addEventListener("touchmove",function(event){
        	event.preventDefault();
			},false);
	}

	//点击X关闭登陆提示框
	function closeTipFrame(){
		$(".showLogTip").slideUp("fast");
		$("#credit").hide("500");
		$("body").css("overflow","visible");  //使滚动条可用
	}
	var $choiceBtn=$(".tipFooter a");
	$(".closeTip").click(closeTipFrame);
	$choiceBtn.click(closeTipFrame);

	//获取ID
	function getId(id){
  		return document.getElementById(id);
  	}
  	//	自动扩展元素到全部显示区域
  	function fillTB( el ){
		el.style.width  = document.documentElement.clientWidth  +1000+'px';
		el.style.height = document.documentElement.clientHeight +1000+ 'px';
	}
  	//	自动居中元素（el = Element）
	function autoCenter( el ){
		var bodyW = document.documentElement.clientWidth;
		var bodyH = document.documentElement.clientHeight;

		var elW = el.offsetWidth;
		var elH = el.offsetHeight;

		el.style.left = (bodyW-elW)/2 + 'px';
		el.style.top = (bodyH-elH)/2 + 'px';
	}

	var pattern= /\b(^[A-Za-z0-9]{6,11}$)\b/;//用户名
	/*检查登陆界面的输入*/
	function checkLogin(){
		var loUname=$(".login_box .username").val();
		var loPwd=$(".login_box .password").val();
		var matchResult=true;
		var nameflag=true;
		var pwdflag=true;
		if(loUname ===''){
			$(".login_box .nameErrtip").html("<i class='fa fa-frown-o'></i> 请先输入账号！");
			matchResult=false;
			nameflag=false;
		}
		else if(!loUname.match(pattern)){
			$(".login_box .nameErrtip").html("<i class='fa fa-frown-o'></i> 账号格式有误！");
			nameflag=false;
		}
		else if(loUname.length<6||loUname.length>11){
			$(".login_box .nameErrtip").html("<i class='fa fa-frown-o'></i> 账号应在6-11个字符之间！");
			nameflag=false;
			matchResult=false;
		}
		else{
			nameflag=true;
		}
		if(loPwd===''){
			$(".login_box .pwdErrtip").html("<i class='fa fa-frown-o'></i> 请先输入密码！");
			pwdflag=false;
			matchResult=false;
		}
		else if(loPwd.length<6){
			$(".login_box .pwdErrtip").html("<i class='fa fa-frown-o'></i> 密码长度不能小于6位！");
			pwdflag=false;
			matchResult=false;
		}
		else{
			pwdflag=true;
		}
		if(nameflag){
			$(".login_box .nameErrtip").empty();
		}
		if(pwdflag){
			$(".login_box .pwdErrtip").empty();
		}
		return matchResult;
	}

	/*检查注册界面的输入*/
	function checkRegister(){
		var reUname=$(".register_box .username").val();
		var rePwd=$(".register_box .password").val();
		var reAPwd=$(".register_box .againPwd").val();
		var nameflag=true;
		var pwdflag=true;
		var againPwdFlag=true;
		var matchResult=true;
		if(reUname ===''){
			$(".register_box .nameErrtip").html("<i class='fa fa-frown-o'></i> 请先设置您的账号！");
			matchResult=false;
			nameflag=false;
		}
		else if(!reUname.match(pattern)){
			$(".register_box .nameErrtip").html("<i class='fa fa-frown-o'></i> 账号应为数字或字母组成！");
			matchResult=false;
			nameflag=false;
		}
		else if(reUname.length<6||reUname.length>11){
			$(".register_box .nameErrtip").html("<i class='fa fa-frown-o'></i> 账号长度应为6-11位！");
			matchResult=false;
			nameflag=false;
		}
		else{
			nameflag=true;
		}
		if(rePwd===''){
			$(".register_box .pwdErrtip").html("<i class='fa fa-frown-o'></i> 请先设置您的密码！");
			matchResult=false;
			pwdflag=false;
		}
		else if(rePwd.length<6){
			$(".register_box .pwdErrtip").html("<i class='fa fa-frown-o'></i> 密码长度不得小于6！");
			matchResult=false;
			pwdflag=false;
		}
		else{
			pwdflag=true;
		}
		if(reAPwd===''){
			$(".register_box .pwdAgainErrtip").html("<i class='fa fa-frown-o'></i> 请先重复输入确认密码！");
			matchResult=false;
			againPwdFlag=false;
		}
		else if(reAPwd!=rePwd){
			$(".register_box .pwdAgainErrtip").html("<i class='fa fa-frown-o'></i> 两次密码输入不一致！");
			matchResult=false;
			againPwdFlag=false;
		}
		else{
			againPwdFlag=true;
		}
		if(nameflag){
			$(".register_box .nameErrtip").empty();
		}
		if(pwdflag){
			$(".register_box .pwdErrtip").empty();
		}
		if(againPwdFlag){
			$(".register_box .pwdAgainErrtip").empty();
		}
		return matchResult;
	}

	//ajax提交注册表单
	$("#register_btn").click(function() {
		alert(1);
		if (checkRegister()) {
			$.ajax({
				type: "post", //使用get方法访问后台
				dataType: "json", //返回json格式的数据
				url: "/funnythings/index.php/Register/index.html", //要访问的后台地址
				data: {
					user_name: $(".register_box .username").val(),
					user_password: $(".register_box .password").val(),
				}, //要发送的数据
				error:function(){
              		alert("错误！");
            	},
				success: function(data) { //msg为返回的数据，在这里做数据绑定
					// alert("1212！");
					var jsonObj=JSON.parse(data);
					alert(jsonObj.status);
					if (jsonObj.status) {
						// alert("注册成功");
						return true;
					} else {
						alert("出现错误！");

					}
				}
			});
		}
	});
