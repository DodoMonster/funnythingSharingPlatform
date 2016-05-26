
    //删除节点
    function removeNode(node) {
        node.parentNode.removeChild(node);
  		$("#deleteTip").fadeOut("slow");
      	$("#credit").fadeOut("fast");

    }

      //显示删除提醒框
  	function showDeleteTipFrame(){
  		$("#deleteTip").fadeIn("slow");
  		$("#credit").fadeIn("fast");
  		fillTB(getId('credit'));
  		autoCenter(getId('deleteTip'));
  	}

    //删除趣事
    list = document.getElementById('content');
    boxs = list.children;
    for (var i = 0; i < boxs.length; i++) {
        //   //点击
          boxs[i].onclick = function clickDelete(e) {
              e = e || window.event;//兼容ie
              el = e.srcElement||e.target;//兼容Firefox
              elem=el.parentNode;//获得deleteMyFun
              funId=$("#funId").text();//获取趣事ID
          if (elem.className=='deleteMyFun'||elem.className=='cancelMyCollect') {
                      //删除趣事
                showDeleteTipFrame();
                      //是否确认删除
                $("#confirmBtn").click(function (){
                    var eleme=elem.parentNode;//获得box
                    $.ajax({
                        type:"POST",
                        url:"/funnythings/index.php/Praise/Praise.html",
                        data:strjson,
                        dataType:"json",
                        error:function(){
                            alert("请求错误");
                        },
                        success:function(data){
                            var jsonObj=JSON.parse(data);
                            if(jsonObj.status){
                                if(jsonObj.power){
                                    if(jsonObj.request){
                                        alert("请求错误！");
                                    }
                                    else{
                                        removeNode(eleme);//把li传进去
                                    }
                                }
                            }
                        }
                    });
                });
                $("#cancelBtn").click(function(){
                    $("#deleteTip").fadeOut("slow");
                    $("#credit").fadeOut("fast");
                });
            }
        }
    }
