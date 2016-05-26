$(document).ready(function(){
	//导航下划线移动
	var $navLi=$(".navbar li");
	$navLi.each(function(i){
		$navLi.eq(i).on("tap",function(){
			$navLi.children("a").removeClass("on");
			$(this).children("a").addClass("on");
		});
	})

	//删除节点
    function removeNode(node) {
    	node.parentNode.removeChild(node);
		$("#deleteTip").fadeOut("slow");
    	$("#credit").fadeOut("fast");

    }
	//删除趣事
	var list = document.getElementById('content');
    var boxs = list.children;

    //把事件代理到每条分享div容器
    for (var i = 0; i < boxs.length; i++) {
    	var el=0;
		var elem=0;
		var flagInfo=new Array("0","1")//标识点击动作是赞（0），还是踩（1）
    	//点击
    	boxs[i].onclick = function clickDelete(e) {
			e = e || window.event;//兼容ie
   			el = e.srcElement||e.target;//兼容Firefox
    		elem=el.parentNode;//获得deleteMyFun

    	if (elem.className=='deleteMyFun'||elem.className=='cancelMyCollect') {
       				//删除趣事
    			showDeleteTipFrame();
    				//是否确认删除
				$("#confirmBtn").click(function (){
					var eleme=elem.parentNode;//获得box
            		removeNode(eleme.parentNode);//把li传进去
				});
				$("#cancelBtn").click(function(){
					$("#deleteTip").fadeOut("slow");
    				$("#credit").fadeOut("fast");
				});
       		}
    	}
    }


	//获取屏幕可视宽度，让弹出分享框的宽度适应各种屏幕
	function fitToWidth(el){
		// var bodyW=document.documentElement.clientWidth;
		el.style.width=document.documentElement.clientWidth-30+'px';
	}
	var showPanel=document.getElementById('showShareFrame');
	fitToWidth(showPanel);

	// var sizeChange=0;//图片是否弹窗显示信号量
	function showDialog(){
		$("#credit").fadeIn("fast");
		$("#showImgFrame").fadeIn("slow");
		fillTB(getId('credit'));
		autoCenter(getId('showImgFrame'));
		sizeChange=1;
	}

	var box = document.querySelector("#credit");
	var boxImg = document.querySelector("#showImgFrame");
	var boxShare=document.querySelector("#showShareFrame");
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

	//点击分享按钮打开分享界面
	function openShareFrame(){
		$("#showShareFrame").fadeIn("slow");
		$("#credit").fadeIn("fast");
		fillTB(getId('credit'));
		autoCenter(getId('showShareFrame'));
		$('body').css("overflow","hidden");    //禁用滚动条
		box.addEventListener("touchmove",function(event){
        	event.preventDefault();
		},false);
		boxShare.addEventListener("touchmove",function(event){
        	event.preventDefault();
		},false);
		sizeChange=1;
	}
	$(".share").click(openShareFrame);

	//显示删除提醒框
	function showDeleteTipFrame(){
		$("#deleteTip").fadeIn("slow");
		$("#credit").fadeIn("fast");
		fillTB(getId('credit'));
		autoCenter(getId('deleteTip'));
	}

	//点击X关闭登陆提示框
	function closeTipFrame(){
		$(".showLogTip").slideUp("fast");
		$("#credit").hide("500");
		$("body").css("overflow","visible");  //使滚动条可用
	}
	$(".closeTip").click(closeTipFrame);

	//把li  a  ul  jQuery Mobile的默认data-role去掉
	$(document).bind( "pagecreate", function( e ) {
		$( "li,a,ul", e.target ).attr( "data-" + $.mobile.ns + "role", "none" );
	});

	//显示侧边栏
	function showNav(){
		$(".menu").addClass("show");
		$("section").addClass("hide");
		$("section").addClass("hideScroll");
		$(".authorInfo").css("visibility","hidden");
	}
	$(".data_header img").click(showNav);//点击头像显示侧边栏

	//隐藏侧边栏
	function hideNav(){
		$(".menu").removeClass("show");
		$("section").removeClass("hide");
		$("section").removeClass("hideScroll");
		$(".authorInfo").css("visibility","visible");
	}
	$(".menu h3 a").click(hideNav);//点击返回按钮图标隐藏侧边栏

	//在主页面左滑隐藏侧边栏
	$("#content").swipeleft(function(e){
		hideNav();
	});

	//在主页面右滑显示侧边栏
	$("#content").swiperight(function(e){
		showNav();
	});

	});
	//跳转页面时自动把登陆form重置
	$(document).on("pageinit","#loginPage",function(){
		$(".data_header a").on("tap",function(){
		$(".login_box")[0].reset();
		$(".tip").empty();
		});
		$("#loginbox").swiperight(function(e){//注册页面右滑显示
			$(".login_box")[0].reset();
			$.mobile.changePage("#homeHot",{
				transition:"slide",
				reverse:true,
				allowSamePageTransition:true
			});
		});
		$("#loginbox").swipeleft(function(e){
			$(".login_box")[0].reset();
			$.mobile.changePage("#registerPage",{
				transition:"slide",
				allowSamePageTransition:true
			});
		});
		$("#registerbox").swiperight(function(e){
			$(".register_box")[0].reset();
			$.mobile.changePage("#loginPage",{
				transition:"slide",
				allowSamePageTransition:true
			});
		});
		$("#registerbox").swipeleft(function(e){
			$(".register_box")[0].reset();
			$.mobile.changePage("#homeHot",{
				transition:"slide",
				reverse:true,
				allowSamePageTransition:true
			});
		});
	});

	//跳转页面时自动把注册form重置
	$(document).on("pageinit","#registerPage",function(){
		$(".data_header a").on("tap",function(){
		$(".register_box")[0].reset();
		$(".tip").empty();
		});
	});

	var box = document.querySelector("#credit");
	//赞---ajax异步请求数据
	function praiseUp(funId){
		//获取元素点击的对象
		if(event.srcElement){//处理兼容性问题
			var el=event.srcElement;
        }
        else {
             var el=event.target;
        }
		var strjson=jQuery.param({'thing_id':funId});
		alert("！");
        $.ajax({
            type:"POST",
            url: "/funnythings/index.php/Praise/Praise.html",
            data: strjson,
            dataType:"json",
            error:function(){
              alert("错误！");
            },
            success:function(data){
                var jsonObj=JSON.parse(data);
                if(jsonObj.status){
                  if(jsonObj.power){
                  	if(jsonObj.request){
                  		alert('请求错误！');
                  		showLogTip();

                  	}else if(jsonObj.praised){
                       alert("您已点赞~");
                  	}else{
                  		$(el).addClass('praise');
                  		alert("成功点赞！");
                  		temp=1;
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
	//踩--异步传送数据
	function trampleDown(funId){
		var strjson=jQuery.param({'thing_id':funId});
		//获取元素点击的对象
		if(event.srcElement){//处理兼容性问题
			var el=event.srcElement;
        }
        else {
             var el=event.target;
        }
        $.ajax({
            type:"POST",
            url: "/funnythings/index.php/Praise/Praise.html",
            data: strjson,
            dataType:"json",
            error:function(){
              alert("错误！");

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
                  		alert("成功踩！");
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
		if(loUname ==''){
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
		if(loPwd==''){
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
		if(reUname ==''){
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
		if(rePwd==''){
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
		if(reAPwd==''){
			$(".register_box .pwdAgainErrtip").html("<i class='fa fa-frown-o'></i> 请先重复输入确认密码！");
			matchResult=false;
			againPwdFlag=false;
		}
		else if(reAPwd!=pwd){
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
