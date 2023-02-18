$(function () {
    topHeader.init(); // 头部导航
    var errorinfo = $("#errorinfo").text();
    if(errorinfo.replace(/\s+/g,'') != ''){ layer.msg(errorinfo,{ offset: '50%' }) }
    $("#host,#DomainName,.search-write-left input").focus()
}) 

// 头部
var topHeader = {
    topMsg:function(){ // 消息通知
        $(".msgTab li").hover(function(){
            $(this).addClass("currentpage").siblings("li").removeClass("currentpage") 
            $(this).prev("span").find("a").css("color","#4192E7")
            $(".msgItemContent").hide()
            $(".msgTab li.currentpage").find(".msgItemContent").show()
        });
    },
    topNav:function(){ // 头部导航
        var timer;
        var bg = $('.bgDiv');
        var searchInt = $('.searchBox input')
        var closes = $('.closes');
        var searchico = $('.searchBox i.iconchazhao')
        var rightNav = $('.rightNav');
        var result = $(".result")
        var nullData = $('.nullData')
        $("#ToolNav .Tool-link li").hover(function(){
            searchInt.blur()
            hideNav()
            $(".shadowba").removeAttr("style")
            $(".navRightForm").hide();
            $("#showRightMark").removeClass("shadowba") 
            $("#searchBtn,#collectBtn").removeClass("cur")
            clearTimeout(timer);
            if($(this).attr("name") === "home"){
                $("#showMark,#showRightMark").removeClass("shadowba")
                $("#ToolNav .Tool-link li").find(".pulldown-Nav,.shadowbg").hide()
            }else{
                $(this).addClass("currentpage").siblings("li").removeClass("currentpage")
                timer = setTimeout(function () {
                    $("#showMark").addClass("shadowba");
                    $(".shadowba").css("height",$("body").height()-280)
                    $("#ToolNav .Tool-link li").find(".shadowbg").hide(10)
                    $("#ToolNav .Tool-link li.currentpage").find(".shadowbg").show()
                    $("#ToolNav .Tool-link li").find(".pulldown-Nav").slideUp(10)
                    $("#ToolNav .Tool-link li.currentpage").find(".pulldown-Nav").slideDown(0)
                },300)
            }
        },function (e) {
            clearTimeout(timer);
            $(".shadowba").removeAttr("style")
        })
        $("#showMark,.ToolHead,.ToolTop,.search-collect-btn").hover(function(){
            $("#showMark").removeClass("shadowba");
            $("#ToolNav .Tool-link li").find(".pulldown-Nav,.shadowbg").hide()
            $("#nav-item-left .nav-item-tab").eq(0).addClass("currentpage").siblings(".nav-item-tab").removeClass("currentpage")
        })
        $("#nav-item-left .nav-item-tab").hover(function(){
            $(this).addClass("currentpage").siblings(".nav-item-tab").removeClass("currentpage")
        })
        $("#menu li,#ToolNav .Tool-link li").hover(function () {
            $(this).find("i.corner").addClass("iconshouqi").removeClass("iconzhankai")
        },function () {
            $(this).find("i.corner").addClass("iconzhankai").removeClass("iconshouqi")
        })
        function hideNav() { //关闭下拉菜单
            searchInt.val('')
            result.addClass("hid")
            result.empty()
            nullData.addClass("hid")
            nullData.css("display","none")
            closes.css({
                display: "none",
                transition: 'width 1s'
            });
            searchico.css({
                display: "block",
                transition: 'width 1s'
            });
            searchInt.css({
                width: "130px",
                transition: 'width .4s'
            });
            rightNav.css({
                width: "unset",
                transition: 'width .3s'
            });
            result.css({
                display: "none",
                transition: 'width 1s'
            });
            searchInt.attr("placeholder","工具搜索");
            $('.rightNav div').css({display:'none',transition: "display .3s"})
            bg.css({
                display: "none",
                transition: "display 1s"
            });
        }
    },
    topSearch:function(){ // 搜索
        var bg = $('.bgDiv');
        var searchInt = $('.searchBox input')
        var closes = $('.closes');
        var searchico = $('.searchBox i.iconchazhao')
        var rightNav = $('.rightNav');
        var history = $(".history")
        var result = $(".result")
        var nullData = $('.nullData')
        var search_show = $("#search_show");
        var index = -1;
        searchInt.blur()
        showNav(searchInt, rightNav, closes);
        function showNav(btn, navDiv, closes) {
            btn.on('click', function () {
                index = -1
                bg.css({
                    display: "block",
                    transition: "opacity .5s"
                });
                searchInt.css({
                    width: "549px",
                    transition: 'width .1s'
                });
                
                navDiv.css({
                    width: "579px",
                    display: "block",
                    transition: 'width 1s'
                });
                
                searchInt.attr("placeholder","请在这里输入工具名称");
                closes.css({
                    display: "none",
                    transition: 'width 1s'
                });
                searchico.css({
                    display: "none",
                    transition: 'width 1s'
                });
                
                $('.rightNav div').css({display:'block',transition: "display 2s"})
                if($("#search_show").text()!=""){
                    result.removeClass("hid")
                    history.css({
                        display: "none",
                        transition: "opacity .5s"
                    });
                }else{
                    nullData.addClass("hid")
                    nullData.css("display","none")
                }
            });
        }
        function pre(index) {
            var pre = search_show.find("a:eq(" + index + "):contains(" + search_show.find("a:eq(" + index + ")").text() + ")").css({background:'#E8F4FC'})
            search_show.stop().scrollTo(pre.eq(0), 200);
        }
        function hideNav() { //关闭下拉菜单
            searchInt.val('')
            result.addClass("hid")
            result.empty()
            nullData.addClass("hid")
            nullData.css("display","none")
            closes.css({
                display: "none",
                transition: 'width 1s'
            });
            searchico.css({
                display: "block",
                transition: 'width 1s'
            });
            searchInt.css({
                width: "130px",
                transition: 'width .4s'
            });
            rightNav.css({
                width: "unset",
                transition: 'width .3s'
            });
            searchInt.attr("placeholder","工具搜索");
            $('.rightNav div').css({display:'none',transition: "display .3s"})
            result.css({
                display: "none",
                transition: 'width 1s'
            });
            bg.css({
                display: "none",
                transition: "display 1s"
            });
        }

        bg.on('click', function () {
            hideNav()
        });

        $('.backtoTop-new').hover(function(){
            searchInt.blur()
            hideNav()
        })
        
        // 上下选择
        $("#search_text").keydown(function (event) {
            var key = event.keyCode;
            if ($.trim($(this).val()).length == 0)
            return;
            search_show.show();
            var count = $("#search_text").attr("attr-count")
            if(count != "undefined" || count != 0){
                if (key == 38) { /*向上按钮*/
                    index--;
                    if (index == -1) index = 0; 
                    var a = search_show.find("a:eq(" + index + ")");
                    searchInt.val($(a.selector + ' p:first-child').text())
                    pre(index)
                    $("#search_text").attr("attr-href",a.attr("href"))
                } else if (key == 40) { /*向下按钮*/
                    index++;
                    if (index == count) index = 0;
                    var a = search_show.find("a:eq(" + index + ")");
                    searchInt.val($(a.selector + ' p:first-child').text())
                    pre(index)
                    $("#search_text").attr("attr-href",a.attr("href"))
                } else if(key == 8){
                    index = -1;
                }
                var a = search_show.find("a:eq(" + index + ")");
                a.css("background", "#E8F4FC").siblings().css("background", "");
            }
        }) 
    },
    Scroll:function() { 
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = './files/scrolltotext.css';
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = './files/jquery.scrollTo.js';
        head.appendChild(link);
        head.appendChild(script);
    },
    init: function () {
        this.topMsg();
        this.topNav();
        this.topSearch();
        this.Scroll();
    }
}