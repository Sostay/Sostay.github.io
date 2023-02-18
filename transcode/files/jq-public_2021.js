var loadhtml = '&nbsp;&nbsp;<img src="//csstools.chinaz.com/tools/images/public/spinner.gif" class="mt5" style="width:15px;height:15px" />';
var toolapiurl = "https://tooldata.chinaz.com";
var externalapiurl = "//othertool.chinaz.com/ToolData.ashx";
document.domain = 'chinaz.com';
var bbsmax_user = getcookie("bbsmax_user");

$(function () {
    //获取当前页面的URL的域名信息
    var localHost = window.location.hostname;
    if (localHost == "data.chinaz.com") {
        pubData.getUpdateLog();
        pubData.getSysMessage();
        return;
    }
    pubData.changeNav(); //新旧版本切换
    if (typeof (navversion) == "undefined" || navversion == 0) { //旧版导航读取最新更新日志 
        pubData.getNoticeTitle();
        collect.init();
        return;
    }
    // else {
    //     //修改顶部左边的宽度
    //     $(".TnavList").parent("div").removeClass("w74-0").addClass("w50-0");
    //     //顶部添加活动入口地址
    //     $(".msgBox").prepend('<a href="https://my.chinaz.com/ToolMember/Bargain/Index?top" class="newyear" target="_blank"></a>');
    // }
    
    $(".msgbtn i.icontongzhi").hover(function(){
        if(parseInt($('.updatelog .msgTotal').text().replace(/[^0-9]/ig,"")) <= 0){
            pubData.getUpdateLog();
        }
        pubData.getSysMessage();
    },function(){})

    $('.searchBox input').on('click', function () {
        pubData.getRecentVisit();
        if(!$('.hotRecommend').html()){
            pubData.getHotRecommend();   
        }
    })
    pubData.init();
});

var pubData = {
    changeNav: function () {
        $(".navChange").click(function () {
            setcookie("nav_version", $(this).attr("data-version"));
            window.location.reload(true);
        })
    },
    changePosition: function () {
        //获取当前页面的URL的域名信息
        var localHost = window.location.host;
        if (localHost == "rank.chinaz.com") {
            $(".ranknavitem").insertBefore($(".seonavitem"));
        }
        else {
            $(".ranknavitem").insertAfter($(".seonavitem"));
        }
    },
    getRecentVisit: function () {  //最近访问页面
        this.getDataRtnJsonp(externalapiurl + "?action=recentvisit", $(".recentVisit ul"), "", function (data) {
            if (data.StateCode == 0 || data.Result.length == 0) {
                $(".recentVisit ul").html("");
                return;
            }
            var html = "";
            var index = 0;
            $.each(data.Result, function (i, value) {
                if (index > 9) return false;
                if (value.indexOf("_") || value.indexOf("+") > 0) {
                    var arr = value.split(/[_+]/);
                    if (arr.length == 2) {
                        var curhost = arr[0].replace("http://", "").replace("https://", "");
                        html += '<a href="{0}" target="_blank" title="{1}">{1}</a>';
                        html = html.format(arr[0], arr[1]);
                        index++;
                    }
                }
            })
            $(".recentVisit").html(html);
        });
    },
    getHotRecommend: function () {  //热门推荐
        this.getDataRtnJsonp(externalapiurl + "?action=hotrecommend", $(".hotRecommend ul"), "", function (data) {
            if (data.StateCode == 0 || data.Result.length == 0) {
                $(".hotRecommend ul").html("");
                return;
            }
            var html = "";
            $.each(data.Result, function (i, obj) {
                html += '<a href="{0}" target="_blank"><i>{1}</i><em>{2}</em></a>';
                html = html.format(obj.url, i + 1, obj.funcname);
            })
            $(".hotRecommend").html(html);
        });
    },
    getNoticeTitle: function () { //最新更新日志
        this.getDataRtnJsonp(externalapiurl + "?action=getnoticetitle", null, "", function (data) {
            if (data.StateCode == 0) {
                return;
            }
            $(".noticeTitle").removeClass("autohide");
            $(".noticeTitle i").append(data.Result);
        }, false);
    },
    getUpdateLog: function () {  //更新日志
        this.getDataRtnJsonp(externalapiurl + "?action=updatelog", $(".updatelog div"),"", function (data) {
            if (data.StateCode == 0 || data.Result.length == 0) {
                $(".updatelog div").html("暂无消息");
                $(".updatelog div").addClass("msg");
                return;
            }
            var html = "";
            $.each(data.Result, function (i, obj) {
                html += '<span><i></i><a href="//tool.chinaz.com/notification/{0}" target="_blank"><p class="w175">{1}</p><em>{2}</em></a></span>';
                var createDate = obj.CreateTime.split(" ")[0].substring(5);
                html = html.format(obj.NotificationId, obj.Title, createDate);
            })
            html += '<span><a href="//tool.chinaz.com/notification" target="_blank">查看更多</a></span>';
            $(".updatelog .msgTotal").html("(" + data.Total +")");
            $(".updatelog div").html(html);
        });
    },
    getSysMessage: function () {  //系统消息
        if (bbsmax_user == null || bbsmax_user == undefined || bbsmax_user == "") {
            $(".sysmsg div").html("登录可查看消息");
            $(".sysmsg div").addClass("msg");
            return;
        }
        this.getDataRtnJsonp(externalapiurl + "?action=sysmessage", $(".sysmsg div"),"", function (data) {
            if (data.StateCode == 0 || data.Result.length == 0) {
                $(".sysmsg div").html("暂无消息");
                $(".sysmsg div").addClass("msg");
                return;
            }
            var html = "";
            $.each(data.Result, function (i, obj) {
                var createDate = obj.createDate;
                if (createDate == undefined) {
                    return false;
                } 
				html += '<span><i></i><a href="//my.chinaz.com/ToolMember/Member/News" target="_blank"><p class="w175">{0}</p><em>{1}</em></a></span>';
                createDate = createDate.split(" ")[0].substring(5);
                html = html.format(obj.title, createDate);
            })
            html += '<span><a href="//my.chinaz.com/ToolMember/Member/News" target="_blank">查看更多</a></span>';
            $(".sysmsg .msgTotal").html("(" + data.Total + ")");
            $(".sysmsg div").html(html);
        });
    },
    toolSearch: function () { //工具搜索
        var history = $(".history");
        var result = $(".result");
        var nullData = $('.nullData');
        var search_show = $("#search_show");
        var search_text = $('#search_text');
        var searchInt = $('.searchBox input');

        $('.searchInpt').bind('input propertychange', function () {
            history.css({
                display: "none",
                transition: 'width 1s'
            });
            result.removeClass("hid");
            getToolList(this);
            search_text.removeAttr("attr-href")
        })
        .focus(function () {
            getToolList(this);
        })
        .keydown(function (event) {
            if (event.keyCode == 13) {
                if($.trim(search_text.val()) != ''){
                    if($('.searchMain .nullData').attr('style') != 'display:block' && $('.searchMain .nullData').attr('class') != 'nullData hid') {
                        layer.msg('没有找到相关结果', { offset: '50%' });
                    }else{
                        if(search_text.attr("attr-href") === undefined){
                            $("#search_text").attr("attr-href",search_show.find("a:eq(0)").attr("href"))
                        }
                        window.open(search_text.attr("attr-href"));
                    }
                }else{
                    layer.msg('工具名称不能为空', { offset: '50%' });
                }
            }
        })
        .blur(function () {
            setTimeout('$(".toollist").addClass("autohide")', 500);
        });

        function getToolList(curobj) {
            var text = $.trim(curobj.value);
            if (!text) {
                history.css({
                    display: "block",
                    transition: 'width 1s'
                });
                result.css({
                    display: "none",
                    transition: 'width 1s'
                });
                nullData.addClass("hid")
                nullData.css("display", "none")
                return;
            } else {
                result.css({
                    display: "block",
                    transition: 'width 1s'
                });
            }
            pubData.getDataRtnJson(toolapiurl + "/common/toolsearch?keyword=" + text, "", "", function (data) {
                if (data.code == -1) {
                    nullData.removeClass("hid");
                    search_show.addClass("hid");
                    return;
                }
                var wordlist = data.data.wordList;
                var html = "";
                $.each(data.data.toolSearchList, function (i, obj) {
                    var tagName = "", tagAlias = "", tagExplain = "";
                    if (obj.tagName) {
                        tagName = obj.tagName;
                    }
                    if (obj.tagAlias) {
                        tagAlias = "（" + obj.tagAlias + "）";
                    }
                    if (obj.tagExplain) {
                        tagExplain = obj.tagExplain;
                    }
                    $.each(wordlist, function () {
                        if (tagName.toLowerCase().indexOf(this) > -1) {
                            var a = new RegExp('(' + this + ')', "gi");
                            tagName = tagName.replace(a, ("<em class='org'>$1</em>"));
                        }
                        else if (tagAlias.toLowerCase().indexOf(this) > -1) {
                            var b = new RegExp('(' + this + ')', "gi");
                            tagAlias = tagAlias.replace(b, ("<em class='org'>$1</em>"));
                        }
                        else if (tagExplain.toLowerCase().indexOf(this) > -1) {
                            var c = new RegExp('(' + this + ')', "gi");
                            tagExplain = tagExplain.replace(c, ("<em class='org'>$1</em>"));
                        }
                    })

                    html += '<a href="{0}" target="_blank"><p>{1}{2}</p><p>{3}</p></a>';
                    html = html.format(obj.link, tagName, tagAlias, tagExplain);
                })

                nullData.addClass("hid");
                search_show.removeClass("hid");
                search_show.html(html);
                searchInt.attr("attr-count", data.data.toolSearchList.length);
                if (data.data.toolSearchList.length >= 10) {
                    result.css("overflow-y", "scroll")
                    searchInt.attr("attr-height", $(".rightNav").height())
                } else {
                    if (data.data.toolSearchList.length < 1) {
                        nullData.removeClass("hid")
                        nullData.css("display", "block")
                    } else {
                        result.css("overflow-y", "unset")
                    }
                }
            }, false);
        }
    },
    getDataRtnJsonp: function (url, elemobj, param, cbm, isloadimg) { //跨域请求调用的方法
        if(isloadimg == undefined){isloadimg=true}
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: url,
            data: param,
            success: function (rsp) {
                if (cbm != null && cbm != undefined) {
                    cbm(rsp);
                }
            },
            error: function (req, status, err) {
                // 错误信息
                console.log(status);
            }
        });
    },
    getDataRtnJson: function (url, elemobj, param, cbm, isloadimg) {
        if(isloadimg == undefined){isloadimg=true}
        $.ajax({
            type: "GET",
            dataType: "json",
            async: true,
            url: url,
            data: param,
            success: function (rsp) {
                if (cbm != null && cbm != undefined) {
                    cbm(rsp);
                }
            },
            error: function (req, status, error) {
                // 错误信息
                console.log(error);
            }
        });
    },
    init: function () {
        this.changePosition();
        this.toolSearch();
    }
}

//新版收藏夹
var newCollect = {
    tag: 0,
    getHeaderTitle: function () {
        switch (headertitle) {
            case "首页": headertitle = "站长工具"; break;
            case "权重综合查询":
            case "百度权重查询":
            case "百度移动权重":
            case "360权重查询":
            case "360移动权重":
            case "搜狗PC权重查询":
            case "搜狗移动权重":
            case "神马权重":
            case "头条权重查询":
                headertitle = "综合权重查询";
                break;
        }
    },
    collectFavorites: function () {
        var tochecked = $(".toItem:nth-child(3)").attr("tochecked");
        if (tochecked == "false") {
            newCollect.collectFunc();
        }
        else {
            newCollect.getHeaderTitle();
            newCollect.delCollectFunc(headertitle);
        }
    },
    collectTips: function (flag, message) {
        var obj = $(".toItem:nth-child(3)");
        switch (flag) {
            case 0:
            case 2:
                $(obj).find(".side-icon-new").removeClass("iconshoucang1");
                $(obj).find(".side-icon-new").addClass("iconshoucang2");
                $(obj).find(".txt").text("已收藏");
                $(obj).attr('tochecked', 'true');
                if (flag == 0) {
                    layer.msg(message, { offset: '50%' });
                }
                break;
            case 1:
                $(obj).find(".side-icon-new").removeClass("iconshoucang2");
                $(obj).find(".side-icon-new").addClass("iconshoucang1");
                $(obj).find(".txt").text("收藏");
                $(obj).attr('tochecked', 'false');
                layer.msg(message, { offset: '50%' });
                break;
        }
    },
    collectFunc: function () {
        this.getData(externalapiurl + "?action=collectfunc", null, { headtitle: headertitle }, function (data) {
            newCollect.collectTips(0, data.Message);
            if (data.StateCode > 0) {
                newCollect.tag = 1;
                newCollect.getCollectFunc();
            }
        }, false);
    },
    getCollectFunc: function () {
        newCollect.getHeaderTitle();
        this.getData(externalapiurl + "?action=getcollectfunc", $(".collectips"), { headtitle: headertitle }, function (data) {
            $(".collectips img").remove();
            var html = "";
            if (data.StateCode > 0) {
                if (data.Result.length == 0) {
                    $(".myCollect").html("&nbsp;");
                    $(".collectips").removeClass("autohide");
                    $(".collectionList").addClass("autohide");
                    $(".collectips").html("暂无收藏,使用页面右侧浮动工具栏添加收藏");
                    return;
                }
                $(".myCollect").html("我的收藏");
                $(".collectips").addClass("autohide");
                $(".collectionList").removeClass("autohide");
                $.each(data.Result, function (i, item) {
                    html += '<li class="_chinaz-coll-item"><a href="{0}" target="_blank">{1}</a><i onclick="newCollect.delCollectFunc(\'{1}\')">×</i></li>';
                    html = html.format(item.func_url, item.func_name);
                    if (newCollect.tag == 0 && headertitle == item.func_name) {
                        newCollect.collectTips(2, "");
                    }
                });
            }
            $(".collectionList ul").html(html);
        });
    },
    delCollectFunc: function (func_name) {
        this.getData(externalapiurl + "?action=delcollectfunc", null, { func_name: func_name }, function (data) {
            layer.closeAll();
            newCollect.collectTips(1, data.Result);
            if (data.Message == "成功") {
                newCollect.getCollectFunc();
            }
        },false);
    },
    getData: function (url, elemobj, param, cbm, isloadimg) {
        if(isloadimg == undefined){isloadimg=true}
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: url,
            data: param,
            beforeSend: function () {
                if (isloadimg) {
                    elemobj.html(loadhtml);
                }
            },
            success: function (rsp) {
                if (cbm != null && cbm != undefined) {
                    cbm(rsp);
                }
            },
            error: function (req, status, err) {
                // 错误信息
                console.log(status);
            }
        });
    },
    init: function () {
        if (typeof (headertitle) == "undefined") return;
        if (bbsmax_user != null && bbsmax_user != undefined && bbsmax_user != "") {
            this.getCollectFunc();
        }
    }
}

//旧版收藏夹
var collect = {
    tag: 0,
    contact: function () {
        window.open('//tool.chinaz.com/contact?url=' + window.location.href);
    },
    businessCooperation: function () {
        window.open('//ntool.chinaz.com/tools/feedback?url=' + window.location.href + '&type=1');
    },
    checkIslogin: function () {
        var bbsmax_user = getcookie("bbsmax_user");
        if (bbsmax_user != null && bbsmax_user != undefined && bbsmax_user != "") {
            if (typeof (navversion) == "undefined" || navversion == 0) {
                collect.collectFavorites();
            }
            else {
                newCollect.collectFavorites();
            }
        }
        else {
            if (typeof (navversion) == "undefined" || navversion == 0) {
                m.data(document.location.href, "", collect.collectFavorites);
            }
            else {
                m.data(document.location.href, "", newCollect.collectFavorites);
            }
        }
    },
    getHeaderTitle: function () {
        switch (headertitle) {
            case "首页": headertitle = "站长工具"; break;
            case "权重综合查询":
            case "百度权重查询":
            case "百度移动权重":
            case "360权重查询":
            case "360移动权重":
            case "搜狗PC权重查询":
            case "搜狗移动权重":
            case "神马权重":
            case "头条权重查询":
                headertitle = "综合权重查询";
                break;
        }
    },
    collectFavorites: function () {
        var tochecked = $(".toItem:nth-child(3)").attr("tochecked");
        if (tochecked == "false") {
            collect.collectFunc();
        }
        else {
            collect.getHeaderTitle();
            collect.delCollectFunc(headertitle);
        }
    },
    collectTips: function (flag, message) {
        var obj = $(".toItem:nth-child(3)");
        switch (flag) {
            case 0:
            case 2:
                $(obj).find(".side-icon-new").removeClass("iconshoucang1");
                $(obj).find(".side-icon-new").addClass("iconshoucang2");
                $(obj).find(".txt").text("已收藏");
                $(obj).attr('tochecked', 'true');
                if (flag == 0) {
                    $(".layerMsg .msg").text(message);
                    $(".layerMsg").show().delay(2500).fadeOut();
                }
                break;
            case 1:
                $(obj).find(".side-icon-new").removeClass("iconshoucang2");
                $(obj).find(".side-icon-new").addClass("iconshoucang1");
                $(obj).find(".txt").text("收藏");
                $(".layerMsg .msg").text(message);
                $(obj).attr('tochecked', 'false');
                $(".layerMsg").show().delay(2500).fadeOut();
                break;
        }
    },
    collectFunc: function () {
        $.ajax({
            type: "GET",
            url: externalapiurl + "?action=collectfunc",
            data: { headtitle: headertitle },
            dataType: "jsonp",
            success: function (data) {
                collect.collectTips(0, data.Message);
                if (data.StateCode > 0) {
                    collect.tag = 1;
                    collect.getCollectFunc();
                }
            }
        });
    },
    getCollectFunc: function () {
        collect.getHeaderTitle();
        $.ajax({
            type: "GET",
            url: externalapiurl + "?action=getcollectfunc",
            data: { headtitle: headertitle },
            dataType: "jsonp",
            beforeSend: function () {
                $("._chinaz-diy-content").append("&nbsp;&nbsp;<img src=\"//csstools.chinaz.com/tools/images/public/spinner.gif\" />");
            },
            success: function (data) {
                $("._chinaz-diy-content img").remove();
                var html = "";
                if (data.StateCode > 0) {
                    if (data.Result.length == 0)
                        html = "点击右侧悬浮收藏按钮即可收藏该功能页面";
                    $.each(data.Result, function (i, item) {
                        html += '<div class="_chinaz-diy-item"><a href="{0}" target="_blank">{1}</a><i class="iconfont iconxingzhuangjiehe4" onclick="collect.delCollectFunc(\'{1}\')"></i></div>';
                        html = html.format(item.func_url, item.func_name);
                        if (collect.tag == 0 && headertitle == item.func_name) {
                            collect.collectTips(2, "");
                        }
                    });
                }
                $("._chinaz-diy-content").html(html);
            }
        });
    },
    delCollectFunc: function (func_name) {
        $.ajax({
            type: "GET",
            url: externalapiurl + "?action=delcollectfunc",
            data: { func_name: func_name },
            dataType: "jsonp",
            success: function (data) {
                layer.closeAll();
                collect.collectTips(1, data.Result);
                if (data.Message == "成功") {
                    collect.getCollectFunc();
                }
            }
        });
    },
    init: function () {
        var bbsmax_user = getcookie("bbsmax_user");
        if (bbsmax_user != null && bbsmax_user != undefined && bbsmax_user != "") {
            this.getCollectFunc();
        }
    }
}

//切换旧版或新版的导航样式或脚本
function loadTheme(navversion) {
    var head = document.getElementsByTagName('head')[0];
    if (navversion == 0) { //旧版导航引入的样式
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = '//csstools.chinaz.com/common/styles/publicstyle-v2.css?v=20200914';
        head.appendChild(link);
    }
    else { //新版导航引入的样式
        var link1 = document.createElement('link');
        link1.type = 'text/css';
        link1.rel = 'stylesheet';
        link1.href = '//csstools.chinaz.com/common/styles/publicstyle-new.css?v=20210706';
        head.appendChild(link1);

        var link2 = document.createElement('link');
        link2.type = 'text/css';
        link2.rel = 'stylesheet';
        link2.href = '//csstools.chinaz.com/common/styles/topHeader.css?v=20210706';
        head.appendChild(link2);

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//csstools.chinaz.com/common/js/jq-TopNav.js?v=20210706';
        head.appendChild(script);
    }
}


