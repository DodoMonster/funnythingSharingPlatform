    pattern = /\b(^[A-Za-z0-9]{6,11}$)\b/;//用户名当时是设置只能用数字或字母
    alltip=$(".tip");
        function checkNewName(){
            var newname=$("#newUserName").val();
                $nameTip=$(".nameErrtip");
            if(newname===""){
                $nameTip.html("<i class='fa fa-frown-o'></i> 昵称不能为空");
                return false;
            }
            if(newname.length>15){

                $nameTip.html("<i class='fa fa-frown-o'></i> 昵称长度不能超过15位");
                return false;
            }
            else{
                document.getElementById('changeName').submit();
                return true;
            }
        }

        function checkNewPwd(){
            newPwd=$("#newPassword").val();
            $pwdTip=$(".pwdErrtip");
            newPwdAgain=$("#newPasswordAgain").val();
            $pwdAgainTip=$(".againPwdErrtip");
            if(newPwd===""){
                alltip.html("");
                $pwdTip.html("<i class='fa fa-frown-o'></i> 密码不能为空！");
                return false;
            }
            if(!newPwd.match(pattern)){
                alltip.html("");
                $pwdTip.html("<i class='fa fa-frown-o'></i> 密码必须为6-11位的字母或数字组成");
                return false;
            }
            if(newPwdAgain===""){
                alltip.html("");
                $pwdAgainTip.html("<i class='fa fa-frown-o'></i> 请重复输入确认密码！");
                return false;
            }
            if(newPwd!==newPwdAgain){
                alltip.html("");
                $pwdAgainTip.html("<i class='fa fa-frown-o'></i> 两次密码输入不一致！");
                return false;
            }
            else{
                document.getElementById('changePwd').submit();
                return true;
            }

        }

        function checkNewQue(){
            newQuestion=$("#question").val();
            $queTip=$(".queErrtip");
            newAnswer=$("#queAnswer").val();
            $answer=$(".queAnswerErrtip");
            if(newQuestion===""){
                alltip.html("");
                $queTip.html("<i class='fa fa-frown-o'></i> 密保问题不能为空！");
                return false;
            }
            if(newAnswer===""){
                alltip.html("");
                $answer.html("<i class='fa fa-frown-o'></i> 密保答案不能为空");
                return false;
            }
            else{
                document.getElementById('changeQue').submit();
                return true;
            }
        }
