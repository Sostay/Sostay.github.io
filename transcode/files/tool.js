var toolapiurl = "https://tooldata.chinaz.com";
//var toolapiurl = "http://tooldata.chinaz.com:6500";
var externalapiurl = "//othertool.chinaz.com/ToolData.ashx";
document.domain = 'chinaz.com';
var bbsmax_user = getcookie("bbsmax_user");
$(function () {
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

// 获取数据
var pubData = {
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
    getUpdateLog: function () {  //更新日志
        this.getDataRtnJsonp(externalapiurl + "?action=updatelog", $(".updatelog div"), "", function (data) {
            if (data.StateCode == 0 || data.Result.length == 0) {
                $(".updatelog div").html("暂无消息");
                $(".updatelog div").addClass("msg");
                return;
            }
            var html = "";
            $.each(data.Result, function (i, obj) {
                html += '<span><i></i><a href="//tool.chinaz.com/notification/{0}" target="_blank"><p class="w175">{1}</p><em>{2}</em></a></span>';
                var myDate = new Date(obj.CreateTime);
                var curDate = (myDate.getMonth() + 1) + "-" + myDate.getDate();
                html = html.format(obj.NotificationId, obj.Title, curDate);
            })
            html += '<span><a href="//tool.chinaz.com/notification" target="_blank">查看更多</a></span>';
            $(".updatelog .msgTotal").html("(" + data.Total + ")");
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
                if(event.keyCode == 13){
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
                nullData.css("display","none")
                return;
            }else{
                result.css({
                    display: "block",
                    transition: 'width 1s'
                });
            }
            pubData.getDataRtnJson(toolapiurl + "/common/toolsearch?keyword=" + text, "","", function (data) {
                if (data.code == -1) {
                    nullData.removeClass("hid");
                    search_show.addClass("hid");
                    return;
                }
                var wordlist = data.data.wordList;
                var html = "";
                $.each(data.data.toolSearchList, function (i, obj) {
                    var tagName = "", tagAlias = "", tagExplain = "";
                    if(obj.tagName) {
                        tagName = obj.tagName;
                    }
                    if(obj.tagAlias) {
                        tagAlias = "（" + obj.tagAlias + "）";
                    }
                    if(obj.tagExplain) {
                        tagExplain = obj.tagExplain;
                    }
                    $.each(wordlist,function () {
                        if(tagName.toLowerCase().indexOf(this)>-1){
                            var a = new RegExp('('+ this +')',"gi");
                            tagName = tagName.replace(a,("<em class='org'>$1</em>"));
                        }
                        else if(tagAlias.toLowerCase().indexOf(this)>-1){
                            var b = new RegExp('('+ this +')',"gi");
                            tagAlias = tagAlias.replace(b,("<em class='org'>$1</em>"));
                        }
                        else if(tagExplain.toLowerCase().indexOf(this)>-1){
                            var c = new RegExp('('+ this +')',"gi");
                            tagExplain = tagExplain.replace(c,("<em class='org'>$1</em>"));
                        }
                    })

                    html += '<a href="{0}" target="_blank"><p>{1}{2}</p><p>{3}</p></a>';
                    html = html.format(obj.link, tagName, tagAlias, tagExplain);
                })

                nullData.addClass("hid");
                search_show.removeClass("hid");
                search_show.html(html);
                searchInt.attr("attr-count",data.data.toolSearchList.length);
                if(data.data.toolSearchList.length>=10){
                    result.css("overflow-y","scroll")
                    searchInt.attr("attr-height",$(".rightNav").height())
                }else{
                    if(data.data.toolSearchList.length<1){
                        nullData.removeClass("hid")
                        nullData.css("display","block")
                    }else{
                        result.css("overflow-y","unset")
                    }
                }
            }, false);
        }
    },
    getDataRtnJsonp: function (url, elemobj, param, cbm, isloadimg) { //跨域请求调用的方法
        if (isloadimg == undefined) isloadimg = true;
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
        if (isloadimg == undefined) isloadimg = true;
        $.ajax({
            type: "GET",
            dataType: "json",
            async:true,
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
        this.toolSearch();
    }
}