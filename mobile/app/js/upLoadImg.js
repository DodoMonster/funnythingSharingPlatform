//处理file input加载的图片文件
$(document).ready(function(e) {
    //判断浏览器是否有FileReader接口
    if(typeof FileReader =='undefined')
    {
       $("#destination").css({'background':'none'}).html('亲,您的浏览器还不支持HTML5的FileReader接口,无法使用图片本地预览,请更新浏览器获得最好体验');
        //如果浏览器是ie
        if($.browser.msie===true)
        {
            //ie6直接用file input的value值本地预览
            if($.browser.version==6)
            {
                $("#imgUpload").change(function(event){
                      //ie6下怎么做图片格式判断?
                      var src = event.target.value;
                      //var src = document.selection.createRange().text;        //选中后 selection对象就产生了 这个对象只适合ie
                      var img = '<img src="'+src+'" width="200px" height="200px" />';
                      $("#destination").empty().append(img);
                  });
            }
            //ie7,8使用滤镜本地预览
            else if($.browser.version==7 || $.browser.version==8)
            {
                $("#imgUpload").change(function(event){
                      $(event.target).select();
                      var src = document.selection.createRange().text;
                      var dom = document.getElementById('destination');
                      //使用滤镜 成功率高
                      dom.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src= src;
                      dom.innerHTML = '';
                 });
            }
        }
        //如果是不支持FileReader接口的低版本firefox 可以用getAsDataURL接口
        else if($.browser.mozilla===true)
        {
            $("#imgUpload").change(function(event){
                //firefox2.0没有event.target.files这个属性 就像ie6那样使用value值 但是firefox2.0不支持绝对路径嵌入图片 放弃firefox2.0
                //firefox3.0开始具备event.target.files这个属性 并且开始支持getAsDataURL()这个接口 一直到firefox7.0结束 不过以后都可以用HTML5的FileReader接口了
                if(event.target.files)
                {
                  //console.log(event.target.files);
                  for(var i=0;i<event.target.files.length;i++)
                  {
                        var img = '<img src="'+event.target.files.item(i).getAsDataURL()+'" width="200px" height="200px"/>';
                      $("#destination").empty().append(img);
                  }
                }
                else
                {

                }
                });
        }
    }
    else
    {
           $("#imgUpload").change(function(e){
                   for(var i=0;i<e.target.files.length;i++)
                       {
                           var file = e.target.files.item(i);
                        //允许文件MIME类型 也可以在input标签中指定accept属性
                        //console.log(/^image\/.*$/i.test(file.type));
                        if(!(/^image\/.*$/i.test(file.type)))
                        {
                            continue;            //不是图片 就跳出这一次循环
                        }

                        //实例化FileReader API
                        var freader = new FileReader();
                        freader.readAsDataURL(file);
                        freader.onload=function(e)
                        {
                            var img = '<img src="'+e.target.result+'" width="200px" height="200px"/>';
                            $("#destination").empty().append(img);
                        }
                       }
               });
    }
});
