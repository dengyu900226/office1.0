//切换验证码
function myReload() {
    document.getElementById("createCheckCode").src =
        document.getElementById("createCheckCode").src + "?nocache=" + new Date().getTime();
    $("#checkcode").focus();
};

//登录验证
function onLogin() {
    var loginname = $("#loginname");
    var password = $("#password");
    var checkcode = $("#checkcode");
    if ($.trim(loginname.val()) == "" || $.trim(loginname.val()) == "请输入用户名") {
        $(".research-error-prompt").addClass("open");
        $(".research-error-prompt > p").html("请输入用户名");
        $(".research-user .research-error").focus();
        return;
    } else {
        $(".research-error-prompt").removeClass("open");
    }
    if ($.trim(password.val()) == "" || $.trim(password.val()) == "请输入密码") {
        $(".research-error-prompt").addClass("open");
        $(".research-error-prompt > p").html("请输入密码");
        $(".research-password .research-error").focus();
        return;
    } else {
        $(".research-error-prompt").removeClass("open");
    }
    // if ($.trim(checkcode.val()) == "" || $.trim(checkcode.val()) == "请输入验证码") {
    //     $(".research-error-prompt").addClass("open");
    //     $(".research-error-prompt > p").html("请输入验证码");
    //     $(".research-code .research-error").focus();
    //     return;
    // } else {
    //     $(".research-error-prompt").removeClass("open");
    // }
    if (onLogin.state == false) {
        return;
    }
    onLogin.state = false;
    $("#login_btn").text("登录中....");
    $(".login_error").html("");
    $(".login_error").hide();
    $.ajax({
        type: "post",
        url: "/zjrc/login",
        async: true,
        data: {loginname: loginname.val(), password: password.val(), check_code: checkcode.val()},
        // dataType: "json",
        success: function (data) {
            if("success" == data.result){
                window.location = "/zjrc/main";
                return;
            }
            if (data && data.msg != undefined) {
                $(".research-error-prompt > p").html(data.msg);
                $(".research-error-prompt").addClass("open");
            }
            myReload();
            onLogin.state = true;
            $("#login_btn").text("登录");
        },
        error: function () {
            alert("失败");
            $(".research-error-prompt > p").html("登录异常");
            $(".research-error-prompt").addClass("open");
            myReload();
            onLogin.state = true;
            $("#login_btn").text("登录");
        }
    });
};


$(document).ready(function () {
    $("#login_name").focus();
    //获取焦点
    $(".research-user-password li input").focus(function () {
        $(this).parent().addClass("select-open");
    });
    //失去焦点
    $(".research-user-password li input").blur(function () {
        $(this).parent().removeClass("select-open");
    });
    //input输入框实时输入触发事件
    $(".research-user-password li input").bind("input propertychange", function () {
        if ($(this).val() == '') {
            $(this).next().removeClass("open");
        } else {
            $(this).next().addClass("open");
        }
    });
    //清除文本框内容
    $(".research-user-password .research-del").click(function () {
        $(this).prev().val("");
        $(this).removeClass("open");
    });
    //点击登录
    $("#login_btn").click(function () {
        onLogin();
    });
    //点击登录（键盘回车事件）
    $("#password").keydown(function (event) {
        if (event.keyCode == 13) {
            onLogin();
        }
    });
    $("#loginname").focus();
    $("#loginname").parent().addClass("select-open");
});
