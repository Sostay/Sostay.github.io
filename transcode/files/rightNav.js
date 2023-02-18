var helpLinkHtml = ""
if(typeof(helpLink)!='undefined'){
    helpLinkHtml = '<div class="toItem">' +
        '<div class="cont">' +
        '<a href="' + helpLink + '" target="_blank">' +
        '<div class="side-icon-new iconfont iconbangzhu"></div>' +
        '<div>帮助</div>' +
        '</a>' +
        '</div>' +
        '</div>';
}
var collectNew =
    '<div class="toItem">' +
    '<a href="//my.chinaz.com/toolvip/vip" target="_blank"><div class="cont"><img src="//csstools.chinaz.com/tools/images/hgico.svg" class="hgico"><div class="side-icon-new mt10"><img src="//csstools.chinaz.com/tools/images/vipInfo.png"></div></a></div></a>' +
    '<div class="backInfoBox">' +
    '<span class="poptip-arrow poptip-arrow-left"><i>▶</i></span>' +
    '<div class="thisHover"></div>' +
    '<div class="tit mb10"></div>' +
    '<div class="itemBox">' +
    '<div class="item">' +
    '<p class="mr10"><img src="//csstools.chinaz.com/tools/images/icochangwec.png" />&nbsp;海量长尾词挖掘</p>' +
    '<p><img src="//csstools.chinaz.com/tools/images/icokeyser.png" />&nbsp;关键词精准查询</p>' +
    '</div>' +
    '<div class="item">' +
    '<p class="mr10"><img src="//csstools.chinaz.com/tools/images/icojingz.png" />&nbsp;竞争对手分析</p>' +
    '<p><img src="//csstools.chinaz.com/tools/images/icobeian.png" />&nbsp;实时备案数据</p>' +
    '</div>' +
    '</div>' +
    '<div class="tipBox">' +
    '<span class="poptip-arrow poptip-arrow-left"><i>▼</i></span>' +
    '<div class="tip">首次开通VIP最高送3个月！</div>' +
    '</div>' +
    '<div class="btn vipopen" id="vipopen">立即开通</div>' +
    '<span>' +
    '<em>其他会员：</em>' +
    '<a href="https://top.chinaz.com/">网站收录</a> |' +
    '<a href="https://alexa.chinaz.com/">Aleax</a>' +
    '</span>' +
    '</div>' +
    '</div>' +
    '<div class="toItem">' +
    '<div class="cont">' +
    '<a href="//my.chinaz.com" target="_blank">' +
    '<div class="side-icon-new iconfont icongerenzhongxin"></div>' +
    '<div>个人中心</div>' +
    '</a>' +
    '</div>' +
    '</div>' +
    '<div class="toItem kefuItem">' +
    '<div class="cont">' +
    '<a href="javascript:;">' +
    '<div class="side-icon-new iconfont iconkefu"></div>' +
    '<div>客服</div>' +
    '</a>' +
    '</div>' +
    '<div class="kefuBox">' +
    '<span class="poptip-arrow poptip-arrow-left"><i>▶</i></span>' +
    '<div class="thisHover"></div>' +
    '<div class="kefuInfo">' +
    '<p class="col-gray02">工作日: 08:30 - 18:00</p>' +
    '<img src="" class="mb5 mt3">' +
    '<p class="color-63">扫码添加微信客服</p>' +
    '</div>' +
    '<a href="//ntool.chinaz.com/tools/feedback?url=' + window.location.href + '&type=1" class="swzx" target="_blank">商务合作咨询</a>' +
    '<a href="//tool.chinaz.com/contact?url=' + window.location.href + '" class="swzx" target="_blank">建议及bug反馈</a>' +
    '</div>' +
    '</div>' + helpLinkHtml +
    '<div class="toItem" id="btntoTop">' +
    '<div class="cont">' +
    '<div class="side-icon-new iconfont icondingbu1"></div>' +
    '<div>顶部</div>' +
    '</div>' +
    '</div>';
    // var newyear = '<div class="Rnewyear"><a href="https://my.chinaz.com/ToolMember/Bargain/Index?float" target="_blank"><div></div></a></div>'

$(function () {
    // $(".backtoTop-new").before(newyear) // 右侧新春
    $(".backtoTop-new").append(collectNew)
    var getUrl = window.location.host;
    if (getUrl.indexOf('icp') >= 0) {
        $(".collectBox").hide();
    }
    else {
        if (typeof (pagename) == "undefined") {
            $(".collectBox").show();
        } else {
            if (pagename != 'default.aspx') {
                $(".collectBox").show()
            }
        }
    }
    $("#vipopen").click(function () {
        window.open("//my.chinaz.com/toolvip/vip");
    })
    var wrapTop = $("#ToolNav").offset().top;
    $(window).on("scroll", function () {
        var s = $(window).scrollTop();
        if (s >= wrapTop) {
            $("#btntoTop").show(500);
        } else {
            $("#btntoTop").hide(500);
        }
    });
    $("#btntoTop").click(function () {
        $("html,body").animate({ scrollTop: 0 }, 300);
    });
    //var Hwith = window.innerWidth || document.documentElement && document.documentElement.clientWidth || 0;
    function backtoTop() {
        var Hwith = window.innerWidth || document.documentElement && document.documentElement.clientWidth || 0;
        $(".backtoTop").removeClass("autohide");
        if (Hwith >= 1339) {
            $(".backtoTop").removeClass("backfix-s").addClass("backfix");
        } else if (Hwith < 1339) {
            $(".backtoTop").removeClass("backfix").addClass("backfix-s");
        }
    }
    backtoTop();

    $(window).resize(function () {
        backtoTop()
    });
})
