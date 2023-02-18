var tools = {
    addClipScript: function() {
        function removejscssfile(filename, filetype) {
            var targetelement = (filetype == "js") ? "script" : (filetype == "css") ? "link" : "none";
            var targetattr = (filetype == "js") ? "src" : (filetype == "css") ? "href" : "none";
            var allsuspects = document.getElementsByTagName(targetelement);
            for (var i = allsuspects.length; i >= 0; i--) {
                if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null
                    && allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1)
                    allsuspects[i].parentNode.removeChild(allsuspects[i]);
            }
        }
        removejscssfile("clipboard.min.js", "js");
        document.write("<script language=javascript src=//csstools.chinaz.com/tools/js/clipboard.min.js></script>");
    },
    clear: function (array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i]) {
                array[i].value = '';
                $(array[i]).siblings("b").show();
            }
        }
    },
    cssdesigner: function () {
        $(".cornerIco").click(function () {
            var obj = $(this).parents('ul');
            if (obj.find('.Csspad-widthEven').hasClass("autohide")) {
                obj.find('.Csspad-widthEven').removeClass('autohide');
                obj.find('.Csspad-widthOdd').addClass('autohide');
                $(this).addClass("cornerIco-open").removeClass("cornerIco");
            } else {
                obj.find('.Csspad-widthEven').addClass('autohide');
                obj.find('.Csspad-widthOdd').removeClass('autohide');
                $(this).addClass("cornerIco").removeClass("cornerIco-open");
            }
        });
        $("p.Typeleft a").click(function () {
            var index = $(this).index();
            $(this).addClass("TyLcurt").siblings().removeClass("TyLcurt");
            $("div.CssheadBoot div.QrCSSDesignerPad:eq(" + index + ")").removeClass("autohide").siblings().addClass("autohide");
        });
    },
    htmlcheck: function () {
        $("li.errorline a").click(function () {
            var line = $(this).attr("line");
            var htmltext = $('#htmltext');
            htmltext.focus();
            var linepos = htmltext.val().indexOf(line);
            SelectRange(htmltext[0], linepos, linepos);
        });
    },
    pagecode: function () {
        $("div.TabheadWrap a").click(function () {
            $(this).addClass("Tabon").siblings().removeClass("Tabon");
            $("#codecolor").val($(this).attr("val"));
            $("form").submit();
        });
    },
    webdebugger: {
        Webtest: function () {
            var win = window.open();
            win.document.open();
            win.document.write($('#content').val());
            win.document.close();
        },
        saveCode: function () {
            if (!document.all) {
                layer.msg('此功能在IE有效',{ offset: '50%' });
                return;
            }
            var win = window.open('', '', 'top=10000,left=10000');
            win.document.write(document.all.content.innerText)
            win.document.execCommand('SaveAs', '', '文件名称.htm')
            win.close();
        },
        init: function () {
            var _this = this;
            $("#test").click(function () {
                _this.Webtest();
            });
            $("#select").click(function () {
                $("#content").select();
            });
            $("#clear").click(function () {
                $("#content").val("");
            });
            $("#save").click(function () {
                _this.saveCode();
            });
        }
    }, // old
    htmlfilter: {
        fhtml: true,
        fjs: false,
        fcss: false,
        fself: false,
        Filter: function () {
            var s = $("#content").val();
            if (!this.fhtml && !this.fjs && !this.fcss && !this.fself)
                this.fhtml = true;
            if (this.fjs)
                s = s.replace(/<\s*script[^>]*>(.|[\r\n])*?<\s*\/script[^>]*>/gi, '');
            if (this.fcss)
                s = s.replace(/<\s*style[^>]*>(.|[\r\n])*?<\s*\/style[^>]*>/gi, '');
            if (this.fhtml) {
                s = s.replace(/<\/?[^>]+>/g, '');
                s = s.replace(/\&[a-z]+;/gi, '');
                s = s.replace(/\s+/g, '\n');
            }
            if (this.fself)
                s = s.replace(new RegExp($("#preplace").val(), 'g'), $("#nextplace").val());
            $("#result").val(s).removeClass("col-gray");
        },
        checked: function (obj) {
            var thisv = $(obj).val();
            var set = $(obj).prop("checked");
            if (thisv == 3) {
                if (set) {
                    this.fhtml = false;
                    this.fjs = false;
                    this.fcss = false;
                    this.fself = true;
                    $(obj).siblings("[name=type]").prop("checked", false);
                    $("#place").removeClass("autohide");
                }
                else {
                    this.fhtml = true;
                    this.fself = false;
                    $("#place").addClass("autohide");
                    $("input[name=type]").eq(1).prop("checked", true);
                }
            }
            else {
                $("#place").addClass("autohide");
                $("input[name=type]").eq(0).prop("checked", false);
                switch (thisv) {
                    case "0": if (set) { this.fhtml = true; this.fself = false; } else { this.fhtml = false; } break;
                    case "1": if (set) { this.fjs = true; this.fself = false; } else { this.fjs = false; } break;
                    case "2": if (set) { this.fcss = true; this.fself = false; } else { this.fcss = false; } break;
                }
                var _this = this;
                _this.Filter();
            }
        },
        init: function (path) {
            var _this = this;
            $("input[name=type]").bind("click", function () {
                _this.checked(this);
            });
            $("#filter").click(function () {
                _this.Filter();
                $("#result").siblings(".CentHid").hide();
            });
            $("#clear").click(function () {
                $("#content").val("");
                $("#result").val("");
            });
            //tools.clipfn(path);
            tools.copyBtn();
        }
    }, // old
    //废弃 ZeroClipboard
    //clipfn: function (path, id) {
    //    var _clip = "clip";
    //    if (id) _clip = id;
    //    var clip = new ZeroClipboard(getid(_clip), {
    //        moviePath: "/template/default/images/tool/ZeroClipboard.swf"
    //    });
    //    clip.on('complete', function (client, args) {
    //        alert("已成功复制到剪贴板！");
    //    });
    //},
    // clipboardfn: function () {
    //     var clipboard = new ClipboardJS('.clipboard');
    //     clipboard.on('success', function (e) {
    //         layer.msg("已成功复制到剪贴板！");
    //         e.clearSelection();
    //     });
    //     clipboard.on('error', function (e) {
    //         layer.msg("复制失败");
    //     });
    // },
    checkUrl: function (url){
        var reg=/^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|coop|asia|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$\W]*)?)$/i;
        if(!reg.test(url)||/%/g.test(url)){layer.msg("要加密的网址格式不正确！",{ offset: '50%' });return false;}else{return true;}
    },
    checkbox: function (t) {
        $(".js-FilterItem li").click(function (e) {
            if (!$(this).hasClass("selected")) {
                $(this).addClass("selected");
                fn(this);
            } else {
                $(this).removeClass("selected");
                fn(this);
            }
        });
        function fn(obj) {
            if (t == "reg") {
                var index = $(obj).index();
                if (index == 5) {
                    $("#chkboxhide input").eq(6).prop("checkbox", false).removeAttr("checked");
                    $("#_chkboxhide li").eq(6).removeClass("selected");
                } else if (index == 6) {
                    $("#chkboxhide input").eq(5).prop("checkbox", false).removeAttr("checked");
                    $("#_chkboxhide li").eq(5).removeClass("selected");
                }
                $("#chkboxhide input").eq(index).click();
            }
            else
            if ($(obj).find("input").val()) $(obj).find("input").val(""); else $(obj).find("input").val($(obj).attr("val"));
        }
    },
    inptDel: function () {
        $("[js-do=\"inpttxt\"]").bind('input propertychange', function() {
            $(this).next().show()
        })
    },
    copyBtn: function (copyID) {
        tools.addClipScript()
        //复制
        $('#' + copyID).click(function () {
            var clipTarget = $(this).attr("data-clipboard-target")
            if(clipTarget != undefined) {
                if (clipTarget.indexOf("#") == -1) {
                    $(this).attr("data-clipboard-target", "#" + clipTarget)
                }
                try {
                    var val = $(clipTarget).val();
                    if (val == "") { layer.msg("结果为空无法复制！",{ offset: '50%' });return; }
                    var clipboard = new ClipboardJS('#' + copyID);
                    layer.msg("复制成功",{ offset: '50%' });
                } catch (e) {
                    layer.msg("复制失败",{ offset: '50%' });
                }
            }
        });
    },
    clearBtn: function (clearID,content) {
        $("#"+ clearID).click(function () {
            $(content).val('')
        })
    },
    openweb: {
        openAttr: function (istest) {
            var address = $("input[name='url']").val();
            var op_tool = $("input[name='tool']").val() ? "toolbar=yes," : "";
            var op_loc = $("input[name='loc']").val() ? "location=yes," : "";
            var op_stat = $("input[name='stat']").val() ? "status=yes," : "";
            var op_menu = $("input[name='menu']").val() ? "menubar=yes," : "";
            var op_scroll = $("input[name='scroll']").val() ? "scrollbars=yes," : "";
            var op_resize = $("input[name='resize']").val() ? "resizable=yes," : "";
            var op_selfopen = $("input[name='selfopen']").val() ? "_self" : "newwindow";
            var op_width = $("input[name='width']").val() ? "width=" + $("input[name='width']").val() + "," : "";
            var op_height = $("input[name='height']").val() ? "height=" + $("input[name='height']").val() + "," : "";
            var op_L = $("input[name='L']").val() ? "left=" + $("input[name='L']").val() + "," : "";
            var op_T = $("input[name='T']").val() ? "top=" + $("input[name='T']").val() + "," : "";
            if (op_tool == "" && op_loc == "" && op_stat == "" && op_menu == "" && op_scroll == "" && op_resize == "" && op_width == "" && op_height == "" && op_L == "" && op_T == "") {
                tempopenstyle = "";
            } else {
                tempopenstyle = op_width + op_height + op_L + op_T + op_tool + op_loc + op_stat + op_menu + op_scroll + op_resize;
                tempopenstyle = tempopenstyle.substring(0, tempopenstyle.length - 1);
                tempopenstyle = tempopenstyle;
            }
            if (istest) {
                if (address == "http://" || !address) { layer.msg('请输入URL！', { offset: '50%' }); return; }
                window.open(address, op_selfopen, tempopenstyle);
                return;
            }
            return "window.open('" + address + "','" + op_selfopen + "'" + (tempopenstyle ? ",'" + tempopenstyle + "'" : "") + ")";
        },
        init: function (path) {
            tools.checkbox();
            var _this = this;
            $("#gen").click(function () {
                $('#showcode').val(_this.openAttr()).removeClass("col-gray");;
            });
            $("#test").click(function () {
                _this.openAttr(true);
            });
            $("#clear").click(function () {
                $("#showcode").val("");
            });
            //tools.clipfn(path);
            tools.copyBtn();
        }
    }, // old
    regex: {
        regCommon: {
            chines: "[\\u4e00-\\u9fa5]", //中文
            doubleByte: "[^\\x00-\\xff]", //双字节（包含中文）
            nullLine: "\\s", //空白行
            email: "\\w[-\\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\\.)+[A-Za-z]{2,14}", //邮箱
            url: "^((https|http|ftp|rtsp|mms)?:\\/\\/)[^\\s]+", //网址（只验证是否包含某些前缀）
            phone: "0?(13|14|15|17|18|19)[0-9]{9}", //国内手机
            tel: "[0-9-()（）]{7,18}", //国内电话
            nFloat: "-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*)", //负浮点数
            interger: "-?[1-9]\\d*", //整型
            pFloat: "[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*", //正浮点数 [1-9]\d*\.\d+|0\.\d*[1-9]\d*
            qq: "[1-9]([0-9]{5,11})", //QQ号
            postal: "\\d{6}", //国内邮政编码
            ip4: "(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)", //ip地址
            cardId: "\\d{17}[\\d|x]|\\d{15}", //身份证号码
            date: "\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}", //日期
            pInterger: "[1-9]\\d*", //正整数
            nInterger: "-[1-9]\\d*", //负整数
            userName: "[A-Za-z0-9_\\-\\u4e00-\\u9fa5]+"//用户名
        },
        checkReg: function () {
            var f = RegexPal.fields,
                o = f.options;
            onresize = function (e) {
                var isIE1 = !!window.ActiveXObject;
                var isIE61 = isIE1 && !window.XMLHttpRequest;
                f.input.field.style.height = "200px";
                //                if (isIE61) f.input.field.style.height = Math.max((window.innerHeight || document.documentElement.clientHeight) - 310, 268) + "px";
                //                else f.input.field.style.height = Math.max((window.innerHeight || document.documentElement.clientHeight) - 610, 268) + "px";
                f.search.setDimensions();
                f.input.setDimensions()
            };
            onresize();
            RegexPal.highlightSearchSyntax();
            RegexPal.highlightMatches();
            for (var flag in o.flags) {
                o.flags[flag].onclick = RegexPal.highlightMatches
            };
            o.highlightSyntax.onclick = RegexPal.highlightSearchSyntax;
            o.highlightMatches.onclick = RegexPal.highlightMatches;
            o.invertMatches.onclick = RegexPal.highlightMatches;
            function makeResetter(field) {
                return function () {
                    field.clearBg();
                    field.textbox.value = "";
                    field.textbox.onfocus = null
                }
            };
        },
        itemClick: function (_this, flage) {
            $("#regCommon a").click(function () {
                var t = $(this).attr("t");
                var reg = new RegExp(_this.regCommon[t]);
                $("#searchText").val(_this.regCommon[t]).siblings(".CentHid").hide();
                var val = $("#inputText").val();
                if (flage) _this.checkReg();
            });
        },
        init: function () {
            tools.checkbox("reg");
            var _this = this;
            _this.itemClick(_this, true);
            _this.checkReg(_this);
            $("#repbtn").click(function () {
                var reptext = $("#reptext").val();
                var inputText = $("#inputText");
                var reg = $("#searchText").val();
                inputText.val(inputText.val().replace(new RegExp(reg, "gi"), reptext));
                _this.checkReg();
            });
            $("#inputText").keyup(function () { $("#inputText").height($("#inputBg").height()); });
            $("#inputText,#searchText").bind("keyup keydown blur", function () {
                if ($("#inputText").val().indexOf('tool.chinaz.com|888') >= 0) return;
                var reg = $("#searchText").val();
                var val = $("#inputText").val();
                if (!reg) {
                    $("#result").hide(); return;
                }
                var arr = []
                try {
                    arr = val.match(new RegExp(reg, 'g'));
                } catch (e) {
                    $("#result").hide(); return;
                }
                if (!arr) {
                    $("#result").hide(); return;
                }
                $("#result").val("");
                var str = "";
                for (var i = 0; i < arr.length; i++) {
                    str += arr[i] + "\n";
                }
                $("#result").show();
                $("#result textarea").val(str);
                $("#result p").html("匹配到 <strong>" + arr.length + "</strong> 条结果：");
            });
        },
        languageCode: {
            js: "var pattern = /{0}/,\n\tstr = '{1}';\nconsole.log(pattern.test(str));",
            php: "$str = '{1}';\n$isMatched = preg_match('/{0}/', $str, $matches);\nvar_dump($isMatched, $matches);",
            go: "package main\n\nimport (\n\t\"fmt\"\n\t\"regexp\"\n)\n\nfunc main() {\n\tstr := \"{1}\"\n\tmatched, err := regexp.MatchString(\"{0}\", str)\n\tfmt.Println(matched, err)\n}",
            rb: "pattern = /{0}/\nstr = '{1}'\np pattern.match(str)",
            py: "import re\npattern = re.compile(ur'{0}')\nstr = u'{1}'\nprint(pattern.search(str))",
            java: "import java.util.regex.Matcher;\nimport java.util.regex.Pattern;\n\npublic class RegexMatches {\n\t\n\tpublic static void main(String args[]) {\n\t\tString str = \"{1}\";\n\t\tString pattern = \"{0}\";\n\n\t\tPattern r = Pattern.compile(pattern);\n\t\tMatcher m = r.matcher(str);\n\t\tSystem.out.println(m.matches());\n\t}\n\n}"
        },
        initgenerate: function () {
            var _this = this;
            _this.itemClick(_this);
            $("#test").click(function () {
                var pattern = $("#searchText").val();
                if (!pattern) return;
                var textarealist = $("#languagelist textarea");
                for (var i = 0; i < textarealist.length; i++) {
                    var textarea = $(textarealist[i]);
                    var language = textarea.attr("id");
                    if (language == 'go' || language == 'java') pattern.replace(/\\/gi, "\\");
                    textarea.val(_this.languageCode[language].format(pattern, ""));
                }
                $("#languagelist").removeClass("autohide");
            });


        }
    }, // old
    other: {
        wordcounter: {
            wordStats: {
                unsortedWords: null,
                topWords: null,
                topWeights: null,
                _computed: false,
                addWords: function (str, weight) {
                    if (str && str.length > 1) {
                        var keywords = $("#keywordstxt").val().split(',');
                        var regstr = "";
                        //keywords = this.bubbleSort(keywords);
                        keywords = keywords.trimArray();
                        for (var i = 0; i < keywords.length; i++) {
                            var kw = keywords[i].replace(/(\\)/g, "\\").replace(/(\^)/g, "\\^").replace(/(\$)/g, "\\$").replace(/(\.)/g, "\\.").replace(/(\*)/g, "\\*").replace(/(\?)/g, "\\?").replace(/(\+)/g, "\\+");
                            if (kw) {
                                regstr += "(" + kw + ")";
                                if (i < keywords.length - 1)
                                    regstr += "|";
                            }
                        }
                        if (regstr)
                            try {
                                this.getWords(str.toLowerCase(), new RegExp(regstr, "gi"), weight);
                            } catch (e) {

                            }
                    }
                },
                bubbleSort: function (arr) {
                    for (var i = 0; i < arr.length; i++) {
                        for (var j = i; j < arr.length; j++) {
                            if (arr[i].length < arr[j].length) {
                                var temp = arr[i];
                                arr[i] = arr[j];
                                arr[j] = temp;
                            }
                        }
                    }
                    return arr;
                },
                addWordsFromTextNodes: function (node, weight) {
                    var nodes = node.childNodes;
                    for (var i = 0, j = nodes.length; i < j; i++) {
                        if (nodes[i].nodeType == 3)
                            this.addWords(nodes[i].nodeValue, weight);
                    }
                },
                getWords: function (words, reg, weight) {
                    this.unsortedWords = new Array();
                    var arr = words.match(reg);
                    if (arr == null) return;
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i] != ',') {
                            var word = arr[i].toLowerCase();
                            if (this.unsortedWords[word])
                                this.unsortedWords[word] += weight;
                            else this.unsortedWords[word] = weight;
                        }
                    }
                },
                computeWords: function (elem) {
                    if (!elem) elem = window.document;
                    this.unsortedWords = new Array();
                    if (elem.is("textarea")) {
                        this.addWords(elem.val(), 1);
                        return;
                    }
                    this.addWords($('title', elem).text(), 20); wordstats = this; $('h1', elem).each(function () {
                        wordstats.addWordsFromTextNodes($(this).get(0), 15);
                    }); $('h2', elem).each(function () {
                        wordstats.addWordsFromTextNodes($(this).get(0), 10);
                    }); $('h3, h4, h5, h6', elem).each(function () {
                        wordstats.addWordsFromTextNodes($(this).get(0), 5);
                    }); $('strong, b, em, i', elem).each(function () {
                        wordstats.addWordsFromTextNodes($(this).get(0), 3);
                    }); $('p, div, th, td, li, a, span', elem).each(function () {
                        wordstats.addWordsFromTextNodes($(this).get(0), 2);
                    }); $('img', elem).each(function () {
                        wordstats.addWords($(this).attr('alt'), 1);
                        wordstats.addWords($(this).attr('title'), 1);
                    }); this._computed = true;
                },
                computeTopWords: function (count, elem) {
                    if (!this._computed)
                        this.computeWords(elem);
                    this.topWords = new Array();
                    this.topWeights = new Array();
                    this.topWeights.push(0);
                    for (word in this.unsortedWords) {
                        for (var i = 0; i < count; i++) {
                            if (this.unsortedWords[word] > this.topWeights[i]) {
                                this.topWeights.splice(i, 0, this.unsortedWords[word]);
                                this.topWords.splice(i, 0, word);
                                break;
                            }
                        }
                    }
                }, clear: function () {
                    this.unsortedWords = this.sortedWords = this.topWords = this.topWeights = null;
                    this._computed = false;
                }
            },
            displayCount: function (count) {
                if (count['words'] == 1) {
                    wordOrWords = " Word";
                } else {
                    wordOrWords = " Words";
                }
                if (count['chars'] == 1) {
                    charOrChars = " Character";
                } else {
                    charOrChars = " Characters";
                }
                str = '<strong class="col-blue02 pr10">{5}</strong><span class="pr40">Total</span><strong class="col-blue02 pr10">{0}</strong><span class="pr40">{1}</span><strong class="col-blue02 pr10">{2}</strong><span class="pr40">{3}</span><strong class="col-blue02 pr10">{4}</strong><span>Chinese</span>';
                $(".counted").html(str.format(count['words'], wordOrWords, count['chars'], charOrChars, count['chinese'], $("#box").val().length));
            },
            displayTextBoxes: function (count) {
                $("#word_count").text(count['words']);
                $("#character_count").text(count['chars']);
                $("#character_count_no_spaces").text(count['chars_no_spaces']);
                $("#chinese_count_no_spaces").text(count['chinese']);
                $("#sentence_count").text(count['sentences']);
                $("#paragraph_count").text(count['paragraphs']);
                $("#avg_sentence_words").text(count['avg_sentence_words']);
                $("#avg_sentence_chars").text(count['avg_sentence_chars']);
            },
            countWords: function (text, language) {
                if (language == 2) {
                    var words = text.match(/\S+/g);
                } else {
                    var words = text.replace(/[,;.!:—\/]/g, ' ').replace(/[^a-zA-Z\d\s&:]/g, '').match(/\S+/g);
                }
                return (words !== null ? words.length : 0);
            },
            countChinese: function (text) {
                iTotal = 0;
                for (i = 0; i < text.length; i++) {
                    var c = text.charAt(i);
                    if (c.match(/[\u4e00-\u9fa5]/)) {
                        iTotal++;
                    }
                }
                return iTotal;
            },
            wordCountInternational: function () {
                var _this = tools.other.wordcounter;
                var box = $("#box");
                var count = [];
                count['words'] = _this.countWords(box.val(), 0);
                chars = box.val().match(/(?:[^\r\n]|\r(?!\n))/g);
                count['chars'] = (chars !== null ? chars.length : 0);
                count['chinese'] = _this.countChinese(box.val());
                chars_no_spaces = box.val().match(/\S/g);
                count['chars_no_spaces'] = (chars_no_spaces !== null ? chars_no_spaces.length : 0);
                sentences = box.val().match(/[^.!?\s][^.!?]*(?:[.!?](?!['"]?\s|$)[^.!?]*)*[.!?]?['"]?(?=\s|$)/g);
                count['sentences'] = (sentences !== null ? sentences.length : 0);
                paragraphs = box.val().match(/(\n\n?|^).*?(?=\n\n?|$)/g);
                count['paragraphs'] = (box.val() != '' ? (paragraphs !== null ? paragraphs.length : 0) : 0);
                count['avg_sentence_words'] = (box.val() != '' ? Math.ceil(count['words'] / count['sentences']) : 0);
                count['avg_sentence_chars'] = (box.val() != '' ? Math.ceil(count['chars'] / count['sentences']) : 0);
                _this.displayCount(count);
                _this.displayTextBoxes(count);
            },
            keywordDensity: function () {
                var max = 1000;
                var stats = tools.other.wordcounter.wordStats;
                var _this = tools.other.wordcounter;
                stats.computeTopWords(max, $('#box'));
                var density_list = $("#density_list");
                density_list.empty();
                var text = '';
                var percentage;
                $("#keywords li:first").nextAll().remove();
                for (i = 0; i < stats.topWords.length; i++) {
                    var percentage = (100 * (stats.topWeights[i] * stats.topWords[i].length / $("#box").val().length)).toFixed(0);
                    var str = '<div class="w30-0{3}">{0}</div><div class="w15-0 col-blue02">{1}({2}%)</div>';
                    if (i % 2 == 0) {
                        str = '<li class="DelListCent DelRLlist bor-b1s">' + str + '</li>';
                        $("#keywords").append(str.format(stats.topWords[i].html2Escape(), stats.topWeights[i], percentage, ''));
                    } else {
                        $("#keywords li:last").append(str.format(stats.topWords[i].html2Escape(), stats.topWeights[i], percentage, ' bor-l1s'));
                    }
                }
                stats.clear();
            },
            init: function () {
                var _this = this;
                $("#box").bind("keypress keyup keydown blur focus change load", _this.wordCountInternational);
                $("#box").bind("keypress keyup keydown blur focus change load", _this.keywordDensity);
                $("#clear").click(function () {
                    tools.clear([getid('box')]);
                });
                $("#keywordstxt").bind("keypress keyup keydown blur focus change load", _this.keywordDensity);
                $("#clkshowbox").click(function () {
                    var showbox = $("#showbox");
                    if (showbox.hasClass("autohide"))
                        showbox.removeClass("autohide");
                    else
                        showbox.addClass("autohide");
                });
            }
        }, // old
        httptest: function () {
            var pramsHtml = '<div class="portTestWrap clearfix pt20">';
            pramsHtml += '<div class="Porname"><input type="text" class="TitInput _WrapHid w240" name="paramsname" value="{0}" /><b class="search-hint CentHid mt5" style="display:{2}">参数名</b></div>';
            pramsHtml += '<div class="Porname ml10"><input type="text" class="TitInput _WrapHid w360" name="paramsval" value="{1}" /><b class="search-hint CentHid mt5" style="display:{2}">值</b></div>';
            pramsHtml += '<div class="fl pl10"><input type="button" value="删除" class="TitInBtn w70 removeparams" /></div></div>';
            $("#addparams").click(function () {
                if ($("#isRAW").prop("checked")) {
                    $(".portTestWrap").remove();
                    $("#RAW").removeClass("autohide");
                } else {
                    $("#RAW").addClass("autohide");
                    $("#totest").after(pramsHtml.format("", "", "block"));
                    $("input.removeparams").click(function () {
                        $(this).parent().remove();
                    });
                    $("._WrapHid").each(function () {
                        checkFocus({
                            obj_input: $(this),
                            msgBox: $(this).siblings(".CentHid"),
                            Tip: "CentHid"
                        });
                        clearInput({
                            obj_input: $(this),
                            msgBox: $(this).siblings("._CentHid"),
                            Tip: "_CentHid"
                        });
                    });
                }
                $("input.removeparams").off("click");
                $("input.removeparams").click(function () {
                    $(this).parents(".portTestWrap").remove();
                });
            });
            $("#OK").click(function () {
                $("#hideRAW").val($("#RAWval").val());
                $("#RAW").addClass("autohide");
                $(".portTestWrap").remove();
                var arr = $("#RAWval").val().queryString();
                for (var i = 0; i < arr.length; i++) {
                    $("#totest").after(pramsHtml.format(arr[i].k, arr[i].v, "none"));
                }
            });
        }
    }, // old
    encryptDecode: {
        base64: function () {
            /*$("#conv").click(function () {
            var str = CryptoJS.enc.Utf8.parse($("#content").val());
            var base64 = CryptoJS.enc.Base64.stringify(str);
            $("#result").val(base64);
            if ($("#result").val()) $("#result").siblings().hide();
            });
            $("#res").click(function () {
            var words = CryptoJS.enc.Base64.parse($("#result").val());
            try {
            $("#content").val(words.toString(CryptoJS.enc.Utf8));
            } catch (e) {
            $("#content").val("格式有误");
            }
            if ($("#content").val()) $("#content").siblings().hide();
            });*/
            $("#conv").click(function () {
                $("#result").val(encode64($("#content").val()));
                $("#content").val($("#content").val().replace(/(^\n|\n$)/g, '').replace(/\n{2,}/, '\n'));
                if ($("#result").val()) $("#result").siblings().hide();
            });
            $("#res").click(function () {
                $("#content").val(decode64($("#result").val()));
                $("#result").val($("#result").val().replace(/(^\n|\n$)/g, '').replace(/\n{2,}/, '\n'));
                if ($("#content").val()) $("#content").siblings().hide();
            });
            $("#clear").click(function () {
                tools.clear([getid("content"), getid("result")]);
                $(".CentHid").show();
            });
            var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            function encode64(val) {
                val = getVal(val);
                var output = "";
                for (var i = 0; i < val.length; i++) {
                    output += enWhile(escape(val[i].trim()));
                    if (i < val.length - 1)
                        output += "\n";
                }
                return output;
            }
            function getVal(val) {
                var val = val.replace(/\n/g, '|');
                if (val.indexOf('|') >= 0)
                    val = val.split('|');
                else
                    val = [val];
                return val.trimArray();
            }
            function enWhile(input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;
                do {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);
                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;
                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    }
                    else if (isNaN(chr3)) {
                        enc4 = 64;
                    }
                    output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";
                } while (i < input.length);
                return output
            }
            function decode64(val) {
                val = getVal(val);
                var output = "";
                for (var i = 0; i < val.length; i++) {
                    output += deWhile(val[i].trim());
                    if (i < val.length - 1)
                        output += "\n";
                }
                return output;
            }
            function deWhile(input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;
                var base64test = /[^A-Za-z0-9\+\/\=]/g;
                if (base64test.exec(input)) {
                    return "不是有效的Base64编码";
                }
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                do {
                    enc1 = keyStr.indexOf(input.charAt(i++));
                    enc2 = keyStr.indexOf(input.charAt(i++));
                    enc3 = keyStr.indexOf(input.charAt(i++));
                    enc4 = keyStr.indexOf(input.charAt(i++));
                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;
                    output = output + String.fromCharCode(chr1);
                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }
                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";
                } while (i < input.length);
                return unescape(output);
            }
        },
        unicode: function () {
            //ASCII 转换 Unicode
            $("#asicctounicode").click(function () {
                if (document.getElementById('content').value == '') {
                    alert('文本框中没有代码！');
                    return;
                }
                document.getElementById('result').value = '';
                for (var i = 0; i < document.getElementById('content').value.length; i++)
                    result.value += '&#' + document.getElementById('content').value.charCodeAt(i) + ';';
                document.getElementById('content').focus();
                if ($("#result").val()) $("#result").siblings().hide();
            });
            //Unicode 转换 ASCII
            $("#unicodetoasicc").click(function () {
                var code = document.getElementById('content').value.match(/&#(\d+);/g);
                if (code == null) {
                    alert('文本框中没有合法的Unicode代码！'); document.getElementById('content').focus();
                    return;
                }
                document.getElementById('result').value = '';
                for (var i = 0; i < code.length; i++)
                    document.getElementById('result').value += String.fromCharCode(code[i].replace(/[&#;]/g, ''));
                document.getElementById('content').focus();
                if ($("#result").val()) $("#result").siblings().hide();
            });
            $("#clear").click(function () {
                tools.clear([getid("content"), getid("result")]);
                $(".CentHid").show();
            });
        }, // old
        htmlEncode: function (key) {
            $(".GuoLvCbtn input[name]").click(function () {
                var name = $(this).attr("name"); // $(this)表示获取当前被点击元素的name值
                var content = $.trim($('#content').val());
                if (content == '') {
                    layer.msg('请输入要转换的html字符串！');
                    return;
                }
                if (content.length > 10000) {
                    $('#content').val("该功能暂不支持超过1w字符的大文本操作，请将文本分段后再操作！");
                    return;
                }
                var index = null;
                $.ajax({
                    type: 'POST',
                    url: '/AjaxSeo.aspx?t=htmlencode',
                    data: { enkey: key, type: name, content: content },
                    beforeSend: function () {
                        index = layer.load();
                    },
                    dataType: 'json',
                    success: function (json) {
                        layer.close(index);
                        if (json.StateCode == 0) {
                            layer.msg(json.Message);
                        }
                        else {
                            $("#content").val(json.Result);
                        }
                    }
                });
            });
        }, // old
        scriptEncode: function () {
            $("#jsencode").click(function () {
                var v = getid('ipt').value;
                if (!v) return;
                var es = escape(v);
                getid('result').value = "document.write(unescape('{0}'));".format(es);
                if ($("#result").val()) $("#result").siblings().hide();
            });
            $("#jsdecode").click(function () {
                var v = getid('result').value;
                var regex = /unescape\('([a-z%0-9].*)'\)/i;
                if (v.match(regex)) {
                    getid('ipt').value = unescape(RegExp.$1);
                }
                if ($("#ipt").val()) $("#ipt").siblings().hide();
            });
            $("#clear").click(function () {
                tools.clear([getid("ipt"), getid("result")]);
                $(".CentHid").show();
            });
        },
        textEncrypt: function () {
            $("#encrypt").click(function () {
                var v = $('input[name="encrypt_type"]').val();
                if (!v) return;
                switch (v) {
                    case "aes":
                        $("#result").val(CryptoJS.AES.encrypt($("#content").val(), $("#pwd").val()));
                        break;
                    case "des":
                        $("#result").val(CryptoJS.DES.encrypt($("#content").val(), $("#pwd").val()));
                        break;
                    case "rabbit":
                        $("#result").val(CryptoJS.Rabbit.encrypt($("#content").val(), $("#pwd").val()));
                        break;
                    case "rc4":
                        $("#result").val(CryptoJS.RC4.encrypt($("#content").val(), $("#pwd").val()));
                        break;
                    case "tripledes":
                        $("#result").val(CryptoJS.TripleDES.encrypt($("#content").val(), $("#pwd").val()));
                        break;
                }
                if ($("#result").val()) $("#result").siblings().hide();
            });
            $("#decrypt").click(function () {
                switch ($('input[name="encrypt_type"]').val()) {
                    case "aes":
                        $("#content").val(CryptoJS.AES.decrypt($("#result").val(), $("#pwd").val()).toString(CryptoJS.enc.Utf8));
                        break;
                    case "des":
                        $("#content").val(CryptoJS.DES.decrypt($("#result").val(), $("#pwd").val()).toString(CryptoJS.enc.Utf8));
                        break;
                    case "rabbit":
                        $("#content").val(CryptoJS.Rabbit.decrypt($("#result").val(), $("#pwd").val()).toString(CryptoJS.enc.Utf8));
                        break;
                    case "rc4":
                        $("#content").val(CryptoJS.RC4.decrypt($("#result").val(), $("#pwd").val()).toString(CryptoJS.enc.Utf8));
                        break;
                    case "tripledes":
                        $("#content").val(CryptoJS.TripleDES.decrypt($("#result").val(), $("#pwd").val()).toString(CryptoJS.enc.Utf8));
                        break;
                }
                if ($("#content").val()) $("#content").siblings().hide();
            });
            $("#clear").click(function () {
                tools.clear([getid("content"), getid("result")]);
                $(".CentHid").show();
            });
        }, // old
        nativeAscii: function () {
            $("#nativeConvertAscii").click(function () {
                var nativecode = getid("nativecode").value.split("");
                var ascii = "";
                for (var i = 0; i < nativecode.length; i++) {
                    var code = Number(nativecode[i].charCodeAt(0));
                    if (!document.getElementById("ignoreLetter").checked || code > 127) {
                        var charAscii = code.toString(16);
                        charAscii = new String("0000").substring(charAscii.length, 4) + charAscii;
                        ascii += "\\u" + charAscii;
                    } else {
                        ascii += nativecode[i];
                    }
                }
                getid("asciicode").value = ascii;
                if ($("#asciicode").val()) $("#asciicode").siblings().hide();
            });

            $("#asciiConvertNative").click(function () {
                var asciicode = getid("asciicode").value.split("\\u");
                var nativeValue = asciicode[0];
                for (var i = 1; i < asciicode.length; i++) {
                    var code = asciicode[i];
                    nativeValue += String.fromCharCode(parseInt("0x" + code.substring(0, 4)));
                    if (code.length > 4) {
                        nativeValue += code.substring(4, code.length);
                    }
                }
                getid("nativecode").value = nativeValue;
                if ($("#nativecode").val()) $("#nativecode").siblings().hide();
            });
            $("#clear").click(function () {
                tools.clear([getid("nativecode"), getid("asciicode")]);
                $(".CentHid").show();
            });
        }, // old
        unixtime: {
            currentTimeActive: 1,
            unixTimer: 0,
            appendZero: function (obj) { //日期不足两位补0
                if (obj < 10) return "0" + "" + obj;
                else return obj;
            },
            unix2human: function () {
                var unixTimestamp = document.unix.timestamp.value.trim();
                if (!unixTimestamp) {
                    layer.msg("时间戳格式不正确");
                    return;
                }
                unixTimestamp = parseInt(unixTimestamp);
                var isms = $("#unixtoutc8sel").val();
                if (isms == 0) //秒
                {
                    unixTimestamp = unixTimestamp * 1000; //转化为毫秒
                }

                var dateObj = new Date(unixTimestamp);
                if (dateObj.format('yyyy') == "NaN") {
                    layer.msg("时间戳格式不正确");
                    return;
                }
                var year = dateObj.getFullYear();
                var month = this.appendZero(dateObj.getMonth() + 1);
                var date = this.appendZero(dateObj.getDate());
                var hour = this.appendZero(dateObj.getHours());
                var minute = this.appendZero(dateObj.getMinutes());
                var second = this.appendZero(dateObj.getSeconds());
                var UnixTimeToDate = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
                document.unix.unixtoutc8result.value = UnixTimeToDate;
            },
            human2unix: function () {
                var isms = $("#utc8tounixsel").val();
                var _this = ted.unixtime;
                var form = document.unix;
                var year = form.year.value; if (!year) { /*alert("时间格式不正确");*/return; }
                var month = _this.stripLeadingZeroes(form.month.value);
                var day = _this.stripLeadingZeroes(form.day.value);
                var hour = _this.stripLeadingZeroes(form.hour.value);
                var minute = _this.stripLeadingZeroes(form.minute.value);
                var second = _this.stripLeadingZeroes(form.second.value);
                year = year ? year : new Date().getFullYear(), month = month ? month : 1, day = day ? day : 1, hour = hour ? hour : (year == 1970 ? 0 : 0), minute = minute ? minute : 0, second = second ? second : 0;
                //var humanDate = new Date(Date.UTC(year, month, day, hour, minute, second));

                var humanDate = new Date(year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second);
                if (humanDate.format('yyyy') == "NaN") { /*alert("时间格式不正确");*/return; }
                if (isms == 0) document.unix.utc8tounixresult.value = (humanDate.getTime() / 1000);
                else document.unix.utc8tounixresult.value = humanDate.getTime();
            },
            human2unix1: function () {
                var isms = $("#unixtoutc81sel").val();
                var form = document.unix;
                var datetime = form.utc8.value;
                if (!datetime) return;
                if (datetime.split(' ').length == 1) //如 2021-01-19
                    datetime = datetime + " 00:00:00";
                var ndate = new Date(datetime);
                if (ndate.format('yyyy') == "NaN") {
                    layer.msg("时间格式不正确");
                    return;
                }
                var year = ndate.getFullYear();
                var month = ndate.getMonth();
                var day = ndate.getDate();
                var hour = ndate.getHours();
                var minute = ndate.getMinutes();
                var second = ndate.getSeconds();
                var ms = ndate.getMilliseconds();
                var humanDate;
                if (isms == 0) humanDate = new Date(year, month, day, hour, minute, second);
                else humanDate = new Date(year, month, day, hour, minute, second, ms);
                //if (humanDate.format('yyyy') == "NaN") { /*alert("时间格式不正确");*/return; }
                if (isms == 0) form.unixtoutc8result1.value = (humanDate.getTime() / 1000);
                else form.unixtoutc8result1.value = humanDate.getTime();
            },
            stripLeadingZeroes: function (input) {
                if ((input.length > 1) && (input.substr(0, 1) == "0")) {
                    return input.substr(1);
                } else {
                    return input;
                }
            },
            currentTime: function () {
                var _this = ted.unixtime;
                var timeNow = new Date();
                document.getElementById("currentunixtime").innerHTML = Math.round(timeNow.getTime() / 1000);
                if (_this.currentTimeActive) {
                    this.unixTimer = setTimeout(function () { _this.currentTime() }, 1000);
                }
            },
            nowDate: function () {
                var form = document.unix;
                var timeNow = new Date();
                form.timestamp.value = Math.round(timeNow.getTime() / 1000);
                form.year.value = timeNow.getFullYear();
                //                form.month.value = timeNow.getMonth() + 1;
                //                form.day.value = timeNow.getDate();
                //                form.hour.value = timeNow.getHours();
                //                form.minute.value = timeNow.getMinutes();
                //                form.second.value = timeNow.getSeconds();
            },
            init: function () {
                var _this = this;
                _this.nowDate();
                _this.currentTime();
                $("#start").click(function () {
                    _this.currentTimeActive = 1;
                    _this.currentTime();
                });
                $("#stop").click(function () {
                    _this.currentTimeActive = 0;
                    clearTimeout(_this.unixTimer);
                });
                $("#refresh").click(_this.currentTime);
                $("#unixtoutc8").click(function () { _this.unix2human() });
                $("#utc8tounix").click(_this.human2unix);
                $("#utc8tounix1").click(_this.human2unix1);
                //$("form input").keydown(function (e) { entNumber(e, true); });

                $("._ToolChoese").each(function () {
                    _select({
                        select: $(this).find(".SearChoese"),
                        options: $(this).find("ul.SearChoese-show"),
                        option: $(this).find("ul.SearChoese-show li a"),
                        t: "slide",
                        callback: function (_this) {
                            var id = $(_this).parents("ul").siblings("input[type=hidden]").attr("id");
                            switch (id) {
                                case "unixtoutc8sel": $("#unixtoutc8").click();
                                    break;
                                case "unixtoutc81sel": $("#utc8tounix1").click();
                                    break;
                                case "utc8tounixsel": $("#utc8tounix").click();
                                    break;
                            }
                        }
                    });
                });
            }
        }, // old
        // 散列/哈希
        hash: {
            setHash: function (type, val, pwd) {
                switch (type) {
                    case "sha1":
                        $("#p_div").addClass("autohide")
                        $("#result").val(CryptoJS.SHA1(val));
                        break;
                    case "sha224":
                        $("#p_div").addClass("autohide")
                        $("#result").val(CryptoJS.SHA224(val));
                        break;
                    case "sha256":
                        $("#p_div").addClass("autohide")
                        $("#result").val(CryptoJS.SHA256(val));
                        break;
                    case "sha384":
                        $("#p_div").addClass("autohide")
                        $("#result").val(CryptoJS.SHA384(val));
                        break;
                    case "sha512":
                        $("#p_div").addClass("autohide")
                        $("#result").val(CryptoJS.SHA512(val));
                        break;
                    case "md5":
                        $("#p_div").addClass("autohide")
                        $("#result").val(CryptoJS.MD5(val));
                        break;
                    case "hmacsha1":
                        $("#p_div").removeClass("autohide");
                        $("#result").val(CryptoJS.HmacSHA1(val, pwd));
                        break;
                    case "hmacsha224":
                        $("#p_div").removeClass("autohide");
                        $("#result").val(CryptoJS.HmacSHA224(val, pwd));
                        break;
                    case "hmacsha256":
                        $("#p_div").removeClass("autohide");
                        $("#result").val(CryptoJS.HmacSHA256(val, pwd));
                        break;
                    case "hmacsha384":
                        $("#p_div").removeClass("autohide");
                        $("#result").val(CryptoJS.HmacSHA384(val, pwd));
                        break;
                    case "hmacsha512":
                        $("#p_div").removeClass("autohide");
                        $("#result").val(CryptoJS.HmacSHA512(val, pwd));
                        break;
                    case "hmacmd5":
                        $("#p_div").removeClass("autohide");
                        $("#result").val(CryptoJS.HmacMD5(val, pwd));
                        break;
                }
            },
            init: function () {
                var _this = this;
                $("#btnlist .GLOkBtn").click(function () {
                    var val = $("#content").val();
                    var pwd = $("#pwd").val();
                    if (val) {
                        _this.setHash($(this).attr("t"), val, pwd);
                        if ($("#result").val()) $("#result").siblings().hide();
                    }
                });
                $("#clear").click(function () { tools.clear([getid("result"), getid("content")]) });
            }
        } // old
    },
    htmlcssjs: {
        htmljs: function () {
            var oresul = getid("oresult");
            var osource = getid("osource");
            oresul.onfocus = oresul.onkeyup = function () {
                getid('re').value = getid('oresult').value.replace(/document.writeln\("/g, "").replace(/document.write\("/g, "").replace(/\\\"/g, "\"").replace(/\\\'/g, "\'").replace(/\\\//g, "\/").replace(/\\\\/g, "\\").replace(/"\);/g, "");
                if ($("#re").val()) $("#re").siblings().hide();
            }
            osource.onfocus = osource.onkeyup = function () {
                getid('oresult2').value = "document.writeln(\"" + getid('osource').value.replace(/\\/g, "\\\\").replace(/\"/g, "'").replace(/\\/g, "\\/").replace(/\'/g, "\\\'").replace(/\"/g, "\\\"").split('\n').join("\");\ndocument.writeln(\"") + "\");";
                if ($("#oresult2").val()) $("#oresult2").siblings().hide();
            }
        },
        htmlubb: {
            pattern: function (str) {
                //str = str.replace(/(\r\n|\n|\r)/ig, '');
                str = str.replace(/<br[^>]*>/ig, '\n');
                str = str.replace(/<p[^>\/]*\/>/ig, '\n');
                //str = str.replace(/\[code\](.+?)\[\/code\]/ig, function($1, $2) {return phpcode($2);});
                str = str.replace(/\son[\w]{3,16}\s?=\s*([\'\"]).+?\1/ig, '');

                str = str.replace(/<hr[^>]*>/ig, '[hr]');
                str = str.replace(/<(sub|sup|u|strike|b|i|pre)>/ig, '[$1]');
                str = str.replace(/<\/(sub|sup|u|strike|b|i|pre)>/ig, '[/$1]');
                str = str.replace(/<(\/)?strong>/ig, '[$1b]');
                str = str.replace(/<(\/)?em>/ig, '[$1i]');
                str = str.replace(/<(\/)?blockquote([^>]*)>/ig, '[$1blockquote]');

                str = str.replace(/<img[^>]*smile=\"(\d+)\"[^>]*>/ig, '[s:$1]');
                str = str.replace(/<img[^>]*src=[\'\"\s]*([^\s\'\"]+)[^>]*>/ig, '[img]' + '$1' + '[/img]');
                str = str.replace(/<a[^>]*href=[\'\"\s]*([^\s\'\"]*)[^>]*>(.+?)<\/a>/ig, '[url=$1]' + '$2' + '[/url]');
                //str = str.replace(/<h([1-6]+)([^>]*)>(.*?)<\/h\1>/ig,function($1,$2,$3,$4){return h($3,$4,$2);});

                str = str.replace(/<[^>]*?>/ig, '');
                str = str.replace(/&amp;/ig, '&');
                str = str.replace(/&lt;/ig, '<');
                str = str.replace(/&gt;/ig, '>');

                return str;
            },
            up: function (str) {
                str = str.replace(/</ig, '&lt;');
                str = str.replace(/>/ig, '&gt;');
                str = str.replace(/\n/ig, '<br />');
                str = str.replace(/\[code\](.+?)\[\/code\]/ig, function ($1, $2) { return phpcode($2); });

                str = str.replace(/\[hr\]/ig, '<hr />');
                str = str.replace(/\[\/(size|color|font|backcolor)\]/ig, '</font>');
                str = str.replace(/\[(sub|sup|u|i|strike|b|blockquote|li)\]/ig, '<$1>');
                str = str.replace(/\[\/(sub|sup|u|i|strike|b|blockquote|li)\]/ig, '</$1>');
                str = str.replace(/\[\/align\]/ig, '</p>');
                str = str.replace(/\[(\/)?h([1-6])\]/ig, '<$1h$2>');

                str = str.replace(/\[align=(left|center|right|justify)\]/ig, '<p align="$1">');
                str = str.replace(/\[size=(\d+?)\]/ig, '<font size="$1">');
                str = str.replace(/\[color=([^\[\<]+?)\]/ig, '<font color="$1">');
                str = str.replace(/\[backcolor=([^\[\<]+?)\]/ig, '<font style="background-color:$1">');
                str = str.replace(/\[font=([^\[\<]+?)\]/ig, '<font face="$1">');
                str = str.replace(/\[list=(a|A|1)\](.+?)\[\/list\]/ig, '<ol type="$1">$2</ol>');
                str = str.replace(/\[(\/)?list\]/ig, '<$1ul>');

                str = str.replace(/\[s:(\d+)\]/ig, function ($1, $2) { return smilepath($2); });
                str = str.replace(/\[img\]([^\[]*)\[\/img\]/ig, '<img src="$1" border="0" />');
                str = str.replace(/\[url=([^\]]+)\]([^\[]+)\[\/url\]/ig, '<a href="$1">' + '$2' + '</a>');
                str = str.replace(/\[url\]([^\[]+)\[\/url\]/ig, '<a href="$1">' + '$1' + '</a>');
                return str;
            },
            htmltoubb: function () {
                str = hcj.htmlubb.pattern(getid("Hsource").value);
                getid("Uresult").value = str;
                if ($("#Uresult").val()) $("#Uresult").siblings().hide();
            },
            ubbtohtml: function () {
                str = hcj.htmlubb.up(getid("Usource").value);
                getid("Hresult").value = str;
                if ($("#Hresult").val()) $("#Hresult").siblings().hide();
            },
            init: function () {
                var Hsource = getid("Hsource");
                var Usource = getid("Usource");
                var _this = this;
                Hsource.onfocus = Hsource.onkeyup = _this.htmltoubb;
                Usource.onfocus = Usource.onkeyup = _this.ubbtohtml;
            }
        },
        htmlCodeCov: {
            //html代码转换javascript代码
            javascript: function () {
                var input = document.getElementById("content").value;
                if (input == "") {
                    document.getElementById("result").value = "<script language=\"JavaScript\">\n<!--\n/\/\-->\n</script>";
                }
                else {
                    output = "document.writeln(\"";
                    for (var c = 0; c < input.length; c++) {
                        if ((input.charAt(c) == "\n" || input.charAt(c) == "\r")) {
                            output += "\");";
                            if (c != input.length - 1) output += "\ndocument.writeln(\"";
                            c++;
                        }
                        else {
                            if (input.charAt(c) == "\"") {
                                output += "/\"";
                            }
                            else {
                                if (input.charAt(c) == "\\") {
                                    output += "\\\\";
                                }

                                else {
                                    output += input.charAt(c);
                                    if (c == input.length - 1) output += "\");";
                                }
                            }
                        }

                    }
                    document.getElementById("result").value = "<script language=\"JavaScript\">\n<!--\n" + output + "\n/\/\-->\n</script>";
                }

            },
            //html代码转换asp代码
            asp: function () {
                var input = document.getElementById("content").value;
                if (input == "") {
                    document.getElementById("result").value = "<%\n%>";
                }
                else {
                    output = "Response.Write \"";
                    for (var c = 0; c < input.length; c++) {
                        if ((input.charAt(c) == "\n" || input.charAt(c) == "\r")) {
                            output += "\"";
                            if (c != input.length - 1) output += "\nResponse.Write \"";
                            c++;
                        }
                        else {
                            if (input.charAt(c) == "\"") {
                                output += "\"\"";
                            }
                            else {
                                if (input.charAt(c) == "\\") {
                                    output += "\\\\";
                                }

                                else {
                                    output += input.charAt(c);
                                    if (c == input.length - 1) output += "\"";
                                }
                            }
                        }

                    }
                    document.getElementById("result").value = "<%\n" + output + "\n%>";
                }
            },
            //html代码转换php代码
            php: function () {
                var input = document.getElementById("content").value;
                if (input == "") {
                    document.getElementById("result").value = "<?php\n?>";
                }
                else {
                    output = "echo \"";
                    for (var c = 0; c < input.length; c++) {
                        if ((input.charAt(c) == "\n" || input.charAt(c) == "\r")) {
                            output += "\\n\";";
                            if (c != input.length - 1) output += "\necho \"";
                            c++;
                        }
                        else {
                            if (input.charAt(c) == "\"") {
                                output += "\\\"";
                            }
                            else {
                                if (input.charAt(c) == "\\") {
                                    output += "\\\\";
                                }

                                else {
                                    output += input.charAt(c);
                                    if (c == input.length - 1) output += "\\n\";";
                                }
                            }
                        }

                    }
                    document.getElementById("result").value = "<?php\n" + output + "\n?>";
                }
            },
            //html代码转换Jsp代码
            Jsp: function () {
                var input = document.getElementById("content").value;
                if (input == "") {
                    document.getElementById("result").value = "<%\n%>";
                }
                else {
                    output = "out.println(\"";
                    for (var c = 0; c < input.length; c++) {
                        if ((input.charAt(c) == "\n" || input.charAt(c) == "\r")) {
                            output += "\");";
                            if (c != input.length - 1) output += "\nout.println(\"";
                            c++;
                        }
                        else {
                            if (input.charAt(c) == "\"") {
                                output += "\\\"";
                            }
                            else {
                                if (input.charAt(c) == "\\") {
                                    output += "\\\\";
                                }

                                else {
                                    output += input.charAt(c);
                                    if (c == input.length - 1) output += "\");";
                                }
                            }
                        }

                    }
                    document.getElementById("result").value = "<%\n" + output + "\n%>";
                }
            },
            //html代码转换Perl代码
            Perl: function () {
                var input = document.getElementById("content").value;
                if (input == "") {
                    document.getElementById("result").value = output;
                }
                else {
                    output = "print \"";
                    for (var c = 0; c < input.length; c++) {
                        if ((input.charAt(c) == "\n" || input.charAt(c) == "\r")) {
                            output += "\\n\";";
                            if (c != input.length - 1) output += "\nprint \"";
                            c++;
                        }
                        else {
                            if (input.charAt(c) == "\"") {
                                output += "\\\"";
                            }
                            else {
                                if (input.charAt(c) == "\\") {
                                    output += "\\\\";
                                }

                                else {
                                    output += input.charAt(c);
                                    if (c == input.length - 1) output += "\\n\";";
                                }
                            }
                        }

                    }
                    document.getElementById("result").value = output;
                }
            },
            //html代码转换vbnet代码
            vbnet: function () {
                var input = document.getElementById("content").value;
                if (input == "") {
                    document.getElementById("result").value = "<%\n%>";
                }
                else {
                    output = "Response.Write (\"";
                    for (var c = 0; c < input.length; c++) {
                        if ((input.charAt(c) == "\n" || input.charAt(c) == "\r")) {
                            output += "\");";
                            if (c != input.length - 1) output += "\nResponse.Write (\"";
                            c++;
                        }
                        else {
                            if (input.charAt(c) == "\"") {
                                output += "\"\"";
                            }
                            else {
                                if (input.charAt(c) == "\\") {
                                    output += "\\\\";
                                }

                                else {
                                    output += input.charAt(c);
                                    if (c == input.length - 1) output += "\");";
                                }
                            }
                        }

                    }
                    document.getElementById("result").value = "<%\n" + output + "\n%>";
                }
            },
            //html代码转换Sws代码
            Sws: function () {
                var input = document.getElementById("content").value;
                if (input == "") {
                    document.getElementById("result").value = output;
                }
                else {
                    output = "STRING \"";
                    for (var c = 0; c < input.length; c++) {
                        if ((input.charAt(c) == "\n" || input.charAt(c) == "\r")) {
                            output += "\"";
                            if (c != input.length - 1) output += "\nSTRING \"";
                            c++;
                        }
                        else {
                            if (input.charAt(c) == "\"") {
                                output += "\\\"";
                            }
                            else {
                                if (input.charAt(c) == "\\") {
                                    output += "\\\\";
                                }

                                else {
                                    output += input.charAt(c);
                                    if (c == input.length - 1) output += "\"";
                                }
                            }
                        }

                    }
                    document.getElementById("result").value = output;
                }
            },
            //开始转换按钮
            htmlCov: function () {
                var _this = hcj.htmlCodeCov;
                var type = getid("html").value;
                switch (type) {
                    case "javascript": _this.javascript(); break;
                    case "asp": _this.asp(); break;
                    case "php": _this.php(); break;
                    case "jsp": _this.Jsp(); break;
                    case "perl": _this.Perl(); break;
                    case "sws": _this.Sws(); break;
                    case "vbnet": _this.vbnet(); break;
                    default: getid("result").value = '转换错误'; break;
                }
                if ($("#result").val()) $("#result").siblings().hide();
            },
            init: function (path) {
                var _this = this;
                $("#trans").click(_this.htmlCov);
                //tools.clipfn(path, "clip");
                tools.copyBtn('clip');
                $("._ToolChoese").each(function () {
                    _select({
                        select: $(this).find(".SearChoese"),
                        options: $(this).find("ul.SearChoese-show"),
                        option: $(this).find("ul.SearChoese-show li a"),
                        t: "slide",
                        callback: _this.htmlCov//下拉选项
                    });
                });
                $("#clear").click(function () { tools.clear([getid("content"), getid("result")]) });
            }
        },
        jsCodeConfusion: function (path) {
            $("#confused").click(function () {
                var code = document.getElementById("JScode").value;
                var xx = new CLASS_CONFUSION(code);
                var a = new Date();
                getid("ConfusionAfterCode").value = xx.confusion();
                if ($("#ConfusionAfterCode").val()) $("#ConfusionAfterCode").siblings().hide();
            });
            //tools.clipfn(path, "clip");
            tools.copyBtn('clip');
            $("#clear").click(function () { tools.clear([getid("JScode"), getid("ConfusionAfterCode")]) });
        },
        jstool: {
            jsonData: { action: '', content: '', enkey: '' },
            jsbeauty: function (_this) {
                var source = $('#txtInitCode').val().trim(),
                    output,
                    opts = {};

                opts.indent_size = 4;
                opts.indent_char = ' ';
                opts.max_preserve_newlines = 5;
                opts.preserve_newlines = opts.max_preserve_newlines !== "-1";
                opts.keep_array_indentation = false;
                opts.break_chained_methods = false;
                opts.indent_scripts = 'normal';
                opts.brace_style = 'collapse';
                opts.space_before_conditional = true;
                opts.unescape_strings = false;
                opts.jslint_happy = false;
                opts.wrap_line_length = 0;
                opts.space_after_anon_function = true;
                source = _this.unpacker_filter(source, _this);
                output = js_beautify(source, opts);
                $('#txtResultCode').val(output);
                if ($("#txtResultCode").val()) $("#txtResultCode").siblings("b").hide();
            },
            unpacker_filter: function (source) {
                var trailing_comments = '',
                    comment = '',
                    unpacked = '',
                    found = false;

                do {
                    found = false;
                    if (/^\s*\/\*/.test(source)) {
                        found = true;
                        comment = source.substr(0, source.indexOf('*/') + 2);
                        source = source.substr(comment.length).replace(/^\s+/, '');
                        trailing_comments += comment + "\n";
                    } else if (/^\s*\/\//.test(source)) {
                        found = true;
                        comment = source.match(/^\s*\/\/.*/)[0];
                        source = source.substr(comment.length).replace(/^\s+/, '');
                        trailing_comments += comment + "\n";
                    }
                } while (found);

                var unpackers = [P_A_C_K_E_R, Urlencoded, MyObfuscate];
                for (var i = 0; i < unpackers.length; i++) {
                    if (unpackers[i].detect(source)) {
                        unpacked = unpackers[i].unpack(source);
                        if (unpacked != source) {
                            source = this.unpacker_filter(unpacked);
                        }
                    }
                }
                return trailing_comments + source;
            },
            ajaxdata: function (_this) {
                jQuery.ajax({
                    type: 'POST',
                    url: '/AjaxSeo.aspx?t=jsformat',
                    data: _this.jsonData,
                    beforeSend: function () {
                        $("#txtResultCode").val("");
                        $("#loading").removeClass("autohide");
                    },
                    dataType: 'jsonp',
                    success: function (json) {
                        $("#loading").addClass("autohide");
                        if (json.state == 0) {
                            alert(json.msg);
                        }
                        else {
                            $("#txtResultCode").val(json.txt);
                            if ($("#txtResultCode").val()) $("#txtResultCode").siblings("b").hide();
                        }
                    }
                });
            },
            init: function (path, key) {
                var _this = this;
                _this.jsonData.enkey = key;
                $("#btndiv input[ref]").click(function () {
                    _this.jsonData.action = $(this).attr("ref");
                    _this.jsonData.content = jQuery.trim($("#txtInitCode").val());
                    if (_this.jsonData.content == '') {
                        alert('请输入要转换的内容');
                        return;
                    }
                    switch (_this.jsonData.action) {
                        case "beauty": _this.jsbeauty(_this); return;
                        case "filtercomment": _this.ajaxdata(_this); break;
                        case "basiccompress": _this.ajaxdata(_this); break;
                        case "encodecompress": _this.ajaxdata(_this); break;
                        case "decodebeauty": _this.jsbeauty(_this); return;
                    }
                });
                //tools.clipfn(path, "clip");
                tools.copyBtn('clip');
                $("#clear").click(function () { tools.clear([getid("txtInitCode"), getid("txtResultCode")]) });
            }
        },
        jsFormat: function (path) {
            $("#beautify").click(function () {
                document.getElementById('beautify').disabled = true;
                js_source = document.getElementById('content').value.replace(/^\s+/, '');
                tabsize = document.getElementById('tabsize').value;
                tabchar = ' ';
                if (tabsize == 1) {
                    tabchar = '\t';
                }
                var regEmptyTag = /(<([^\/][^>|^\/>].*)>)(\s*)?(<\/([^>]*)>)/g;
                var c = "";
                if (js_source && js_source.charAt(0) === '<') {
                    //document.getElementById('result').value = style_html(js_source, tabsize, tabchar, 80);
                    c = style_html(js_source, tabsize, tabchar, 80);
                } else {
                    //document.getElementById('result').value = js_beautify(js_source, tabsize, tabchar);
                    c = js_beautify(js_source, tabsize, tabchar);
                }
                document.getElementById('result').value = c.replace(regEmptyTag, '$1$4');
                document.getElementById('newresult').value = c.replace(regEmptyTag, '$1$4');
                if ($("#result").val()) $("#result").siblings().hide();
                document.getElementById('beautify').disabled = false;
                return false;
            });
            $("#pack0").click(function (base64) {
                pack_js(0);
            });
            $("#pack1").click(function (base64) {
                pack_js(1);
            });
            tools.copyBtn('copy');
            $("#clear").click(function () { tools.clear([getid("result"), getid("content")]) });
            function pack_js(base64) {
                var input = document.getElementById('content').value;
                var packer = new Packer;
                if (base64) {
                    var output = packer.pack(input, 1, 0);
                } else {
                    var output = packer.pack(input, 0, 0);
                }
                document.getElementById('result').value = output;
                document.getElementById('newresult').value = output;
                if ($("#result").val()) $("#result").siblings().hide();
            }
            //全屏
            $("#fullscreen").click(function () {
                $("body").css("overflow", "hidden")
                layer.open({
                    type: 1,
                    title: '格式化结果',
                    closeBtn: 1,
                    area: ['100%', '100%'],
                    shadeClose: true,
                    content: $('#newresult'),
                    end: function () {
                        $("body").css("overflow", "unset")
                    }
                });
                layer.fullhalf
            })
        }
    }, // old
    jsonTool: {
        jsontocsharp: {
            init: function (path) {
                var _this = this;
                $(".ToolChoesecj").each(function () {
                    _select({
                        select: $(this).find(".SearChoese"),
                        options: $(this).find("ul.SearChoese-show"),
                        option: $(this).find("ul.SearChoese-show li a"),
                        t: "slide",
                        parents: $(".ToolChoesecj"),
                        callback: function () {
                            if ($("#showtype").val() == 0)
                                $(".javawh").addClass("autohide");
                            else
                                $(".javawh").removeClass("autohide");
                        }
                    });
                });

                //tools.clipfn(path);
                $("#2csharp").click(function () {
                    if (!$("#jsonval").val().trim()) {
                        layer.msg("请填写JSON",{ offset: '50%' });
                        return false;
                    }
                    try {
                        var v = eval("(" + document.getElementById("jsonval").value + ")");
                        var res = "";
                        if ($("#showtype").val() == 0)
                            res = _this.JSON2CSharp.convert(v);
                        else
                            res = _this.JSON2POJO.convert(v);
                        $("#result").val(res).siblings("b").hide();
                    } catch (e) {
                        layer.msg("生成C#实体类异常，请检查JSON是否错误。",{ offset: '50%' });
                    }
                });
                $("#testjson").click(function () {
                    var testjson = '{\r\n    "name":"站长工具",\r\n    "url":"http://tool.chinaz.com",\r\n    "address":{\r\n        "city":"厦门",\r\n        "country":"中国"\r\n    },\r\n    "arrayBrowser":[{\r\n        "name":"Google",\r\n        "url":"http://www.google.com"\r\n    },\r\n    {\r\n       "name":"Baidu",\r\n       "url":"http://www.baidu.com"\r\n   },\r\n   {\r\n       "name":"SoSo",\r\n       "url":"http://www.SoSo.com"\r\n   }]\r\n}';
                    $("#jsonval").val(testjson).siblings("b").hide();
                });

                //复制
                tools.copyBtn('copy')

                $("#clear").click(function () {
                    tools.clear([getid('result'), getid('jsonval')]);
                });
            },
            JSON2CSharp: {
                _allClass: [],
                _genClassCode: function (obj, name) {
                    var clas = "public class {0}\r\n{\r\n".format(name || "Root");
                    for (var n in obj) {
                        var v = obj[n];
                        n = n.trim();
                        //变量定义规则
                        n = n.replace(/[^\w]+/ig, '_');
                        if (/^\d+/.test(n))
                            n = "_" + n;
                        clas += "    {0}    public {1} {2} { get; set; }\r\n".format(this._genComment(v, n), this._genTypeByProp(n, v), n);
                    }
                    clas += "}\r\n";
                    this._allClass.push(clas);
                    return this._allClass.join("\r\n");
                },
                _genTypeByProp: function (name, val) {
                    try {
                        if (typeof val == "string") {
                            var regdt = /^(\d{4})(-|\/|年)(\d{2})(-|\/|月)(\d{2})(日)?(\s((\d{1,2}):)?((\d{1,2}):)?(\d{1,2})?)?$/
                            if (regdt.test(val.trim()))
                                val = new Date(val);
                        }
                    } catch (e) {

                    }
                    switch (Object.prototype.toString.apply(val)) {
                        case "[object Number]":
                        {
                            return val.toString().indexOf(".") > -1 ? "double" : "int";
                        }
                        case "[object Date]":
                        {
                            return "DateTime";
                        }
                        case "[object Object]":
                        {
                            name = name.substring(0, 1).toUpperCase() + name.substring(1);
                            this._genClassCode(val, name);
                            return name;
                        }
                        case "[object Array]":
                        {
                            return "List<{0}>".format(this._genTypeByProp(name, val[0]));
                        }
                        case "[object Boolean]":
                        {
                            return "bool";
                        }
                        default:
                        {
                            return "string";
                        }
                    }
                },
                _genComment: function (val, n) {
                    //var commm = typeof (val) == "string" && /.*[\u4e00-\u9fa5]+.*$/.test(val) ? val : "";
                    var s = Object.prototype.toString.apply(val);
                    var commm = typeof (val) == "string" ? val : n.substring(0, 1).toUpperCase() + n.substring(1);;
                    return "/// <summary>\r\n    /// " + commm + "\r\n    /// </summary>\r\n";
                },
                convert: function (jsonObj) {
                    this._allClass = [];
                    return this._genClassCode(jsonObj);
                }
            },
            JSON2POJO: {
                _allClass: [],
                _genClassCode: function (obj, name) {
                    var packageval = $("#packageval").val(), isfill = $("#isfill").prop("checked");
                    var clas = "";
                    var str = "";
                    var privateAttr = "", publicAttr = "", fill = "", filllist = "";
                    if (isfill) {
                        fill += "    public static {0} fill(JSONObject jsonobj){\r\n".format(name || "Root");
                        fill += "        {0} entity = new {0}();\r\n".format(name || "Root");

                        filllist += "    public static List<{0}> fillList(JSONArray jsonarray) {\r\n";
                        filllist += "        if (jsonarray == null || jsonarray.size() == 0)\r\n";
                        filllist += "            return null;\r\n";
                        filllist += "        List<{0}> olist = new ArrayList<{0}>();\r\n";
                        filllist += "        for (int i = 0; i < jsonarray.size(); i++) {\r\n";
                        filllist += "            olist.add(fill(jsonarray.getJSONObject(i)));\r\n";
                        filllist += "        }\r\n";
                        filllist += "        return olist;\r\n";
                        filllist += "    }\r\n";
                        filllist = filllist.format(name || "Root");
                    }
                    for (var n in obj) {
                        var v = obj[n];
                        n = n.trim();
                        //变量定义规则
                        n = n.replace(/[^\w]+/ig, '_');
                        if (/^\d+/.test(n))
                            n = "_" + n;
                        var tp = this._genTypeByProp(n, v);
                        var _type = tp.type;
                        if (tp.islist) {
                            if (isfill)
                                str = "package {1};\r\nimport java.util.ArrayList;\r\nimport java.util.List;\r\nimport net.sf.json.JSONObject;\r\nimport net.sf.json.JSONArray;\r\npublic class {0}\r\n{\r\n".format(name || "Root", packageval);
                            else
                                str = "package {1};\r\nimport java.util.ArrayList;\r\nimport java.util.List;\r\npublic class {0}\r\n{\r\n".format(name || "Root", packageval, "\r\nimport java.util.List;");
                        }
                        privateAttr += "    private {0} {1};\r\n\r\n".format(_type, n);
                        var firstChar = n.substring(0, 1).toUpperCase() + n.substring(1);
                        publicAttr += "    public void set{2}({0} {1}){\r\n        this.{1} = {1};\r\n    }\r\n".format(_type, n, firstChar);
                        publicAttr += "    public {0} get{2}(){\r\n        return this.{1};\r\n    }\r\n".format(_type, n, firstChar);

                        if (isfill) {
                            fill += "        if (jsonobj.containsKey(\"{0}\")) {\r\n".format(n);
                            var _typefirstChartoUpper = _type.substring(0, 1).toUpperCase() + _type.substring(1);
                            fill += "            entity.set{1}(jsonobj.get{2}(\"{0}\"));        \r\n        }\r\n".format(n, n.substring(0, 1).toUpperCase() + n.substring(1), _typefirstChartoUpper.indexOf("List") >= 0 ? "JSONArray" : _typefirstChartoUpper);
                        }
                    }
                    clas += "==================================\r\n"
                    if (!str) {
                        if (isfill)
                            clas += "package {1};\r\nimport net.sf.json.JSONObject;\r\nimport net.sf.json.JSONArray;\r\npublic class {0}\r\n{\r\n".format(name || "Root", packageval);
                        else
                            clas += "package {1};\r\npublic class {0}\r\n{\r\n".format(name || "Root", packageval);
                    }
                    else
                        clas += str;
                    if (isfill) {
                        fill += "        return entity;\r\n    }\r\n";
                    }
                    clas += privateAttr;
                    clas += publicAttr;
                    clas += fill;
                    clas += filllist;
                    clas += "}\r\n";
                    this._allClass.push(clas);
                    return this._allClass.join("\r\n");
                },
                _genTypeByProp: function (name, val) {
                    try {
                        if (typeof val == "string") {
                            //xxxx(-|/|年)xx(-|/|月)xx(-|/|日) xx:xx:xx
                            var regdt = /^(\d{4})(-|\/|年)(\d{2})(-|\/|月)(\d{2})(日)?(\s((\d{1,2}):)?((\d{1,2}):)?(\d{1,2})?)?$/
                            if (regdt.test(val.trim()))
                                val = new Date(val);
                        }
                    } catch (e) {

                    }
                    switch (Object.prototype.toString.apply(val)) {
                        case "[object Number]":
                        {
                            return { type: val.toString().indexOf(".") > -1 ? "double" : "int" };
                        }
                        case "[object Date]":
                        {
                            return { type: "DateTime" };
                        }
                        case "[object Object]":
                        {
                            name = name.substring(0, 1).toUpperCase() + name.substring(1);
                            this._genClassCode(val, name);
                            return { type: name };
                        }
                        case "[object Array]":
                        {
                            return { type: "List<{0}>".format(this._genTypeByProp(name, val[0]).type), islist: true };
                        }
                        case "[object Boolean]":
                        {
                            return { type: "boolean" };
                        }
                        default:
                        {
                            return { type: "String" };
                        }
                    }
                },
                convert: function (jsonObj) {
                    this._allClass = [];
                    return this._genClassCode(jsonObj);
                }
            }
        },
        jsontoxml: function () {
            $("#2json").click(function () {
                var xmlobjtree = new XML.ObjTree();
                var dumper = new JKL.Dumper();
                var xmlText = $("#xmljsonval").val();
                if (!xmlText) {
                    layer.msg("请输入XML字符串",{ offset: '50%' });
                    $("#xmljsonval").focus();
                    return false;
                }
                xmlText = xmlText.replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, "\""); //HTML转义
                var tree = xmlobjtree.parseXML(xmlText);
                if (tree) {
                    if (!tree.html)
                        $("#result").val(dumper.dump(tree)).siblings("b").hide();
                    else {
                        layer.msg("请检查XML是否错误。",{ offset: '50%' });
                        $("#xmljsonval").focus();
                    }
                }
            });

            $("#2xml").click(function () {
                var xmlobjtree = new XML.ObjTree();
                if (!$("#xmljsonval").val()) {
                    layer.msg("请输入JSON字符串",{ offset: '50%' });
                    $("#xmljsonval").focus();
                    return false;
                }
                try {
                    var json = eval("(" + $("#xmljsonval").val() + ")");
                    $("#result").val(formatXml(xmlobjtree.writeXML(json))).siblings("b").hide();
                } catch (e) {
                    layer.msg("转XML异常，请检查JSON是否错误。",{ offset: '50%' });
                    $("#xmljsonval").focus();
                }
            });

            $("#clear").click(function () {
                tools.clear([getid('xmljsonval'), getid('result')]);
            });

        },
        jsontoget: function () {
            $("#getjsonval").bind("keyup paste", function (e) {
                var obj = $(this);
                var etype = e.type;
                setTimeout(function () {
                    if (etype == "paste")
                        obj.val(obj.val().trim().replace(/(\r|\n|\t|\s)/g, ""));
                }, 100);
            });
            $("#2json").click(function () {
                var val = $("#getjsonval").val();
                val = val.replace(/&/g, '","').replace(/=/g, '":"');
                val = '{"' + val + '"}';
                $("#result").val(val).siblings("b").hide();
            });
            $("#2get").click(function () {
                var val = $("#getjsonval").val();
                val = val.replace(/\t/g, "");
                val = val.replace(/\"/g, "").replace("{", "").replace("}", "").replace(",", "&").replace(":", "=");
                val = val.replace(/\"/g, "").replace(/{/g, "").replace(/}/g, "").replace(/,/g, "&").replace(/:/g, "=");
                $("#result").val(val).siblings("b").hide();
            });
            $("#clear").click(function () {
                tools.clear([getid('getjsonval'), getid('result')]);
            });
        },
        exceltojson: {
            getresult: function (totype) {
                var splitchar = $("#splitchar").val() || /\t/;
                var txt = $("#excelval").val();
                if (!txt.trim()) {
                    layer.msg("请输入EXCEL格式的字符串。",{ offset: '50%' });
                    return false;
                }
                var datas = txt.split("\n");
                var html = "[\n";
                var keys = [];
                for (var i = 0; i < datas.length; i++) {
                    var ds = datas[i].split(splitchar);
                    if (i == 0) {
                        if (totype == "0") {
                            keys = ds;
                        } else {
                            html += "[";
                            for (var j = 0; j < ds.length; j++) {
                                html += '"' + ds[j] + '"';
                                if (j < ds.length - 1) {
                                    html += ",";
                                }
                            }
                            html += "],\n";
                        }
                    } else {
                        if (ds.length == 0) continue;
                        if (ds.length == 1) {
                            ds[0] == "";
                            continue;
                        }
                        html += totype == "0" ? "{" : "[";
                        for (var j = 0; j < ds.length; j++) {
                            var d = ds[j];
                            if (d == "") continue;
                            if (totype == "0") {
                                html += '"' + keys[j] + '":"' + d + '"';
                            } else {
                                html += '"' + d + '"';
                            }
                            if (j < ds.length - 1) {
                                html += ',';
                            }
                        }
                        html += totype == "0" ? "}" : "]";
                        if (i < datas.length - 1)
                            html += ",\n";
                    }
                }
                if (html && html.lastIndexOf(",\n") == html.length - 2) {
                    html = html.substring(0, html.lastIndexOf(",\n"));
                }
                html += "\n]";
                $("#result").val(html).siblings("b").hide();
            },
            init: function () {
                var _this = this;
                $("#2object").click(function () {
                    _this.getresult(0);
                });
                $("#2array").click(function () {
                    _this.getresult(1);
                });
                $("#clear").click(function () {
                    tools.clear([getid('excelval'), getid('result')]);
                });
            }
        },
        jsonescape: {
            //ctype: 1压缩  2转义  3压缩转义  4去除转义
            escapezip: function (ctype) {
                var txtA = document.getElementById("jsonval");
                var text = txtA.value;
                if (!text.trim()) {
                    layer.msg("请输入JSON字符串。",{ offset: '50%' });
                    return false;
                }
                if (ctype == 1 || ctype == 3) {
                    text = text.split("\n").join(" ");
                    var t = [];
                    var inString = false;
                    for (var i = 0, len = text.length; i < len; i++) {
                        var c = text.charAt(i);
                        if (inString && c === inString) {
                            if (text.charAt(i - 1) !== '\\') {
                                inString = false;
                            }
                        } else if (!inString && (c === '"' || c === "'")) {
                            inString = c;
                        } else if (!inString && (c === ' ' || c === "\t")) {
                            c = '';
                        }
                        t.push(c);
                    }
                    text = t.join('');
                }
                if (ctype == 2 || ctype == 3) {
                    text = text.replace(/\\/g, "\\\\").replace(/\"/g, "\\\"");
                }
                if (ctype == 4) {
                    text = text.replace(/\\\\/g, "\\").replace(/\\\"/g, '\"');
                }
                txtA.value = text;
            },
            GB2312UnicodeConverter: {
                ToUnicode: function (str) {
                    var txt = escape(str).toLocaleLowerCase().replace(/%u/gi, '\\u');
                    return txt.replace(/%7b/gi, '{').replace(/%7d/gi, '}').replace(/%3a/gi, ':').replace(/%2c/gi, ',').replace(/%27/gi, '\'').replace(/%22/gi, '"').replace(/%5b/gi, '[').replace(/%5d/gi, ']').replace(/%3D/gi, '=').replace(/%20/gi, ' ').replace(/%3E/gi, '>').replace(/%3C/gi, '<').replace(/%3F/gi, '?');
                },
                ToGB2312: function (str) {
                    return unescape(str.replace(/\\u/gi, '%u'));
                }
            },
            utozh: function () {
                var _this = this;
                var txtA = document.getElementById("jsonval");
                var text = txtA.value.trim();
                if (!text) {
                    layer.msg("请输入JSON字符串。",{ offset: '50%' });
                    return false;
                }
                txtA.value = _this.GB2312UnicodeConverter.ToGB2312(text);
            },
            zhtou: function () {
                var _this = this;
                var txtA = document.getElementById("jsonval");
                var text = txtA.value.trim();
                if (!text) {
                    layer.msg("请输入JSON字符串。",{ offset: '50%' });
                    return false;
                }
                txtA.value = _this.GB2312UnicodeConverter.ToUnicode(text);
            },
            cntoenehar: function () {
                var txtA = document.getElementById("jsonval");
                var str = txtA.value;
                str = str.replace(/\’|\‘/g, "'").replace(/\“|\”/g, "\"");
                str = str.replace(/\【/g, "[").replace(/\】/g, "]").replace(/\｛/g, "{").replace(/\｝/g, "}");
                str = str.replace(/，/g, ",").replace(/：/g, ":");
                txtA.value = str;
            },
            init: function () {
                $('#jsonval').linedtextarea({ resize: "none" });
                var _this = this;
                $("#zip").click(function () {
                    _this.escapezip(1);
                });
                $("#escape").click(function () {
                    _this.escapezip(2);
                });
                $("#zipescape").click(function () {
                    _this.escapezip(3);
                });
                $("#delescape").click(function () {
                    _this.escapezip(4);
                });
                $("#u2zh-cn").click(function () {
                    _this.utozh();
                });
                $("#zh-cn2u").click(function () {
                    _this.zhtou();
                });
                $("#zh-cn2enchar").click(function () {
                    _this.cntoenehar();
                });
            }
        }
    }, // old
    // 网站信息类相关
    siteInfo: {
       subnetmask: {
           nnclear: function (nform) {
                nform.snm1a.value = 255;
                nform.snm2a.value = 255;
                nform.snm3a.value = 255;
                nform.snm4a.value = 0;

                nform.oct1a.value = 192;
                nform.oct2a.value = 168;
                nform.oct3a.value = 0;
                nform.oct4a.value = 1;

                nform.nw1a.value = "";
                nform.nw2a.value = "";
                nform.nw3a.value = "";
                nform.nw4a.value = "";

                nform.node1a.value = "";
                nform.node2a.value = "";
                nform.node3a.value = "";
                nform.node4a.value = "";

                nform.broad1a.value = "";
                nform.broad2a.value = "";
                nform.broad3a.value = "";
                nform.broad4a.value = "";
           },
           sjzclear: function (sform) {
                sform.snm1d.value = 255;
                sform.snm2d.value = 255;
                sform.snm3d.value = 255;
                sform.snm4d.value = 0;

                sform.snm1e.value = "";
                sform.snm2e.value = "";
                sform.snm3e.value = "";
                sform.snm4e.value = "";
            },
           dgsclear: function (sform) {
                sform.snm1c.value = "";
                sform.snm2c.value = "";
                sform.snm3c.value = "";
                sform.snm4c.value = "";
            },
           ymwclear: function (sform) {
                sform.snmbitsc.value = 24;
            },
           wlclear:function (sform) {
                sform.oct1.value = 192;
                sform.oct2.value = 168;
                sform.oct3.value = 0;
                sform.oct4.value = 1;

                $("#nettype").text("默认");
                sform.cf.value = 1;

                $("#netnum").text("");
                sform.network.value = 0;

                $("#nodenum").text("");
                sform.node.value = 0;

                sform.nwclass.value = "";
                sform.subsuper.value = "";
                sform.nwclass1.value = "";
                sform.snm1.value = "";
                sform.snm2.value = "";
                sform.snm3.value = "";
                sform.snm4.value = "";
                sform.snmbits.value = "";
                sform.nwquant.value = "";
                sform.nodequant.value = "";
           }
       }
    },
    // 编码转码相关
    transcoding: {
        utf_8: function () {
            $("#conv").click(function () {
                $("#result").val($("#content").val().replace(/[^\u0000-\u00FF]/g, function ($0) { return escape($0).replace(/(%u)(\w{4})/gi, "&#x$2;") }));
                if ($("#result").val()) $("#result").siblings().hide();
            });
            $("#res").click(function () {
                $("#content").val(unescape($("#result").val().replace(/&#x/g, '%u').replace(/;/g, '')));
                if ($("#content").val()) $("#content").siblings().hide();
            });
            $("#clear").click(function () {
                tools.clear([getid("content"), getid("result")]);
                $(".CentHid").show();
            });
        },
        nativeAscii: function () {
            $("#nativeConvertAscii").click(function () {
                var nativecode = getid("nativecode").value.split("");
                var ascii = "";
                for (var i = 0; i < nativecode.length; i++) {
                    var code = Number(nativecode[i].charCodeAt(0));
                    if (!document.getElementById("ignoreLetter").checked || code > 127) {
                        var charAscii = code.toString(16);
                        charAscii = new String("0000").substring(charAscii.length, 4) + charAscii;
                        ascii += "\\u" + charAscii;
                    } else {
                        ascii += nativecode[i];
                    }
                }
                getid("asciicode").value = ascii;
                if ($("#asciicode").val()) $("#asciicode").siblings().hide();
            });

            $("#asciiConvertNative").click(function () {
                var asciicode = getid("asciicode").value.split("\\u");
                var nativeValue = asciicode[0];
                for (var i = 1; i < asciicode.length; i++) {
                    var code = asciicode[i];
                    nativeValue += String.fromCharCode(parseInt("0x" + code.substring(0, 4)));
                    if (code.length > 4) {
                        nativeValue += code.substring(4, code.length);
                    }
                }
                getid("nativecode").value = nativeValue;
                if ($("#nativecode").val()) $("#nativecode").siblings().hide();
            });
            tools.clearBtn('clear','textarea')
        },
        qrcode: {
            loadSWF: function () {
                var swfu = new SWFUpload({
                    upload_url: "/ajaxseo.aspx?t=pload",
                    file_size_limit: "100 KB",
                    file_types: "*.jpg;*.gif;*.png;*.jpe;*.jpeg",
                    file_upload_limit: "50",
                    file_queue_limit: 1,
                    file_dialog_start_handler: fileDialogStart,
                    file_queued_handler: fileQueued,
                    file_queue_error_handler: fileQueueError,
                    file_dialog_complete_handler: fileDialogComplete,
                    upload_progress_handler: uploadProgress,
                    upload_error_handler: uploadError,
                    upload_success_handler: uploadSuccess,
                    upload_complete_handler: uploadComplete,
                    //button_image_url: "/template/default/images/public/tool-pus.png",
                    button_width: 213,
                    button_height: 80,
                    button_placeholder_id: "buttonPlaceHolder",
                    //button_text: "选择二维码图片",
                    button_text_style: "",
                    /*button_text_top_padding: 3,
                    button_text_left_padding: 12,*/
                    button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
                    button_cursor: SWFUpload.CURSOR.HAND,
                    flash_url: "/template/default/js/swfup/swfupload.swf",
                    custom_settings: {
                        progressTarget: "fsUploadProgress",
                        cancelButtonId: "btnCancel"
                    },
                    debug: false
                });
            },
            init: function () {
                var _this = this;
                $("#txtarea").focus(function () {
                    var v = $(this).val();
                    $(this).removeClass("col-gray");
                    if (v == '200字符以内') $(this).val('')
                }).blur(function () {
                    var v = $(this).val();
                    if (v == '') {
                        $(this).val('200字符以内');
                        $(this).addClass("col-gray");
                    }
                }).keyup(function () {
                    var v = $(this).val();
                    var length = jQuery.trim(v).length;
                    if (length > 199) {
                        $(this).val(v.substr(0, 200));
                        $("#fontnum").html('200');
                        return
                    };
                    $("#fontnum").html(length)
                });
                _this.loadSWF();
                $("#generate").click(function () {
                    if (!$("#decodingbox").hasClass("autohide")) {
                        $("#decodingbox").addClass("autohide");
                        $("#generatebox").removeClass("autohide");
                        if ($("#imgdiv").length) $("#imgdiv").removeClass("autohide");
                        $("#fsUploadProgress").html('');
                        $(this).addClass("currtBtn").removeClass("LinkBrn");
                        $("#decoding").addClass("LinkBrn").removeClass("currtBtn");
                    } else {
                        $("form").submit();
                    }
                });
                $("#decoding").click(function () {
                    $("#generatebox").addClass("autohide");
                    $("#decodingbox").removeClass("autohide");
                    if ($("#imgdiv").length) $("#imgdiv").addClass("autohide");
                    $(this).addClass("currtBtn").removeClass("LinkBrn");
                    $("#generate").addClass("LinkBrn").removeClass("currtBtn");
                });
            }
        },
        cssformat: {
            lCSSCoder: {
                format: function (s) {//格式化代码
                    s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
                    s = s.replace(/;\s*;/g, ";"); //清除连续分号
                    s = s.replace(/\,[\s\.\#\d]*{/g, "{");
                    s = s.replace(/([^\s])\{([^\s])/g, "$1 {\n\t$2");
                    s = s.replace(/([^\s])\}([^\n]*)/g, "$1\n}\n$2");
                    s = s.replace(/([^\s]);([^\s\}])/g, "$1;\n\t$2");
                    if ($("#chk").prop("checked")) {
                        s = s.replace(/(\r|\n|\t)/g, "");
                        s = s.replace(/(})/g, "$1\r\n");
                    }
                    return s;
                },
                pack: function (s) {//压缩代码
                    s = s.replace(/\/\*(.|\n)*?\*\//g, ""); //删除注释
                    s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
                    s = s.replace(/\,[\s\.\#\d]*\{/g, "{"); //容错处理
                    s = s.replace(/;\s*;/g, ";"); //清除连续分号
                    s = s.match(/^\s*(\S+(\s+\S+)*)\s*$/); //去掉首尾空白
                    return (s == null) ? "" : s[1];
                }
            },
            CSS: function (s) {
                getid("Code_2").value = tc.cssformat.lCSSCoder[s](getid("Code_1").value);
                $("#Code_2").siblings(".CentHid").hide();
            }
        },
        htmlcssjs: {
            htmljs: function () {
                var oresul = getid("oresult");
                var osource = getid("osource");
                oresul.onfocus = oresul.onkeyup = function () {
                    getid('re').value = getid('oresult').value.replace(/document.writeln\("/g, "").replace(/document.write\("/g, "").replace(/\\\"/g, "\"").replace(/\\\'/g, "\'").replace(/\\\//g, "\/").replace(/\\\\/g, "\\").replace(/"\);/g, "");
                    if ($("#re").val()) $("#re").siblings().hide();
                }
                osource.onfocus = osource.onkeyup = function () {
                    getid('oresult2').value = "document.writeln(\"" + getid('osource').value.replace(/\\/g, "\\\\").replace(/\"/g, "'").replace(/\\/g, "\\/").replace(/\'/g, "\\\'").replace(/\"/g, "\\\"").split('\n').join("\");\ndocument.writeln(\"") + "\");";
                    if ($("#oresult2").val()) $("#oresult2").siblings().hide();
                }
            },
            jsCodeConfusion: function () {
                $("#confused").click(function () {
                    var code = document.getElementById("JScode").value;
                    var xx = new CLASS_CONFUSION(code);
                    var a = new Date();
                    getid("ConfusionAfterCode").value = xx.confusion();
                    if ($("#ConfusionAfterCode").val()) $("#ConfusionAfterCode").siblings().hide();
                });
                tools.copyBtn('clip');
                $("#clear").click(function () { tools.clear([getid("JScode"), getid("ConfusionAfterCode")]) });
            },
            jsFormat: function () {
                $("#beautify").click(function () {
                    document.getElementById('beautify').disabled = true;
                    js_source = document.getElementById('content').value.replace(/^\s+/, '');
                    tabsize = document.getElementById('tabsize').value;
                    tabchar = ' ';
                    if (tabsize == 1) {
                        tabchar = '\t';
                    }
                    var regEmptyTag = /(<([^\/][^>|^\/>].*)>)(\s*)?(<\/([^>]*)>)/g;
                    var c = "";
                    if (js_source && js_source.charAt(0) === '<') {
                        //document.getElementById('result').value = style_html(js_source, tabsize, tabchar, 80);
                        c = style_html(js_source, tabsize, tabchar, 80);
                    } else {
                        //document.getElementById('result').value = js_beautify(js_source, tabsize, tabchar);
                        c = js_beautify(js_source, tabsize, tabchar);
                    }
                    document.getElementById('result').value = c.replace(regEmptyTag, '$1$4');
                    document.getElementById('newresult').value = c.replace(regEmptyTag, '$1$4');
                    if ($("#result").val()) $("#result").siblings().hide();
                    document.getElementById('beautify').disabled = false;
                    return false;
                });
                $("#pack0").click(function (base64) {
                    pack_js(0);
                });
                $("#pack1").click(function (base64) {
                    pack_js(1);
                });
                //复制
                tools.copyBtn('copy')
                $("#clear").click(function () { tools.clear([getid("result"), getid("content")]) });
                function pack_js(base64) {
                    var input = document.getElementById('content').value;
                    var packer = new Packer;
                    if (base64) {
                        var output = packer.pack(input, 1, 0);
                    } else {
                        var output = packer.pack(input, 0, 0);
                    }
                    document.getElementById('result').value = output;
                    document.getElementById('newresult').value = output;
                    if ($("#result").val()) $("#result").siblings().hide();
                }
                //全屏
                $("#fullscreen").click(function () {
                    $("body").css("overflow", "hidden")
                    layer.open({
                        type: 1,
                        title: '格式化结果',
                        closeBtn: 1,
                        area: ['100%', '100%'],
                        shadeClose: true,
                        content: $('#newresult'),
                        end: function () {
                            $("body").css("overflow", "unset")
                        }
                    });
                    layer.fullhalf
                })
            },
            htmlubb: {
                pattern: function (str) {
                    //str = str.replace(/(\r\n|\n|\r)/ig, '');
                    str = str.replace(/<br[^>]*>/ig, '\n');
                    str = str.replace(/<p[^>\/]*\/>/ig, '\n');
                    //str = str.replace(/\[code\](.+?)\[\/code\]/ig, function($1, $2) {return phpcode($2);});
                    str = str.replace(/\son[\w]{3,16}\s?=\s*([\'\"]).+?\1/ig, '');

                    str = str.replace(/<hr[^>]*>/ig, '[hr]');
                    str = str.replace(/<(sub|sup|u|strike|b|i|pre)>/ig, '[$1]');
                    str = str.replace(/<\/(sub|sup|u|strike|b|i|pre)>/ig, '[/$1]');
                    str = str.replace(/<(\/)?strong>/ig, '[$1b]');
                    str = str.replace(/<(\/)?em>/ig, '[$1i]');
                    str = str.replace(/<(\/)?blockquote([^>]*)>/ig, '[$1blockquote]');

                    str = str.replace(/<img[^>]*smile=\"(\d+)\"[^>]*>/ig, '[s:$1]');
                    str = str.replace(/<img[^>]*src=[\'\"\s]*([^\s\'\"]+)[^>]*>/ig, '[img]' + '$1' + '[/img]');
                    str = str.replace(/<a[^>]*href=[\'\"\s]*([^\s\'\"]*)[^>]*>(.+?)<\/a>/ig, '[url=$1]' + '$2' + '[/url]');
                    //str = str.replace(/<h([1-6]+)([^>]*)>(.*?)<\/h\1>/ig,function($1,$2,$3,$4){return h($3,$4,$2);});

                    str = str.replace(/<[^>]*?>/ig, '');
                    str = str.replace(/&amp;/ig, '&');
                    str = str.replace(/&lt;/ig, '<');
                    str = str.replace(/&gt;/ig, '>');

                    return str;
                },
                up: function (str) {
                    str = str.replace(/</ig, '&lt;');
                    str = str.replace(/>/ig, '&gt;');
                    str = str.replace(/\n/ig, '<br />');
                    str = str.replace(/\[code\](.+?)\[\/code\]/ig, function ($1, $2) { return phpcode($2); });

                    str = str.replace(/\[hr\]/ig, '<hr />');
                    str = str.replace(/\[\/(size|color|font|backcolor)\]/ig, '</font>');
                    str = str.replace(/\[(sub|sup|u|i|strike|b|blockquote|li)\]/ig, '<$1>');
                    str = str.replace(/\[\/(sub|sup|u|i|strike|b|blockquote|li)\]/ig, '</$1>');
                    str = str.replace(/\[\/align\]/ig, '</p>');
                    str = str.replace(/\[(\/)?h([1-6])\]/ig, '<$1h$2>');

                    str = str.replace(/\[align=(left|center|right|justify)\]/ig, '<p align="$1">');
                    str = str.replace(/\[size=(\d+?)\]/ig, '<font size="$1">');
                    str = str.replace(/\[color=([^\[\<]+?)\]/ig, '<font color="$1">');
                    str = str.replace(/\[backcolor=([^\[\<]+?)\]/ig, '<font style="background-color:$1">');
                    str = str.replace(/\[font=([^\[\<]+?)\]/ig, '<font face="$1">');
                    str = str.replace(/\[list=(a|A|1)\](.+?)\[\/list\]/ig, '<ol type="$1">$2</ol>');
                    str = str.replace(/\[(\/)?list\]/ig, '<$1ul>');

                    str = str.replace(/\[s:(\d+)\]/ig, function ($1, $2) { return smilepath($2); });
                    str = str.replace(/\[img\]([^\[]*)\[\/img\]/ig, '<img src="$1" border="0" />');
                    str = str.replace(/\[url=([^\]]+)\]([^\[]+)\[\/url\]/ig, '<a href="$1">' + '$2' + '</a>');
                    str = str.replace(/\[url\]([^\[]+)\[\/url\]/ig, '<a href="$1">' + '$1' + '</a>');
                    return str;
                },
                htmltoubb: function () {
                    str = hcj.htmlubb.pattern(getid("Hsource").value);
                    getid("Uresult").value = str;
                    if ($("#Uresult").val()) $("#Uresult").siblings().hide();
                },
                ubbtohtml: function () {
                    str = hcj.htmlubb.up(getid("Usource").value);
                    getid("Hresult").value = str;
                    if ($("#Hresult").val()) $("#Hresult").siblings().hide();
                },
                init: function () {
                    var Hsource = getid("Hsource");
                    var Usource = getid("Usource");
                    var _this = this;
                    Hsource.onfocus = Hsource.onkeyup = _this.htmltoubb;
                    Usource.onfocus = Usource.onkeyup = _this.ubbtohtml;
                }

            },
            htmlCodeCov: {
                //html代码转换javascript代码
                javascript: function () {
                    var input = document.getElementById("content").value;
                    if (input == "") {
                        document.getElementById("result").value = "<script language=\"JavaScript\">\n<!--\n/\/\-->\n</script>";
                    }
                    else {
                        output = "document.writeln(\"";
                        for (var c = 0; c < input.length; c++) {
                            if ((input.charAt(c) == "\n" || input.charAt(c) == "\r")) {
                                output += "\");";
                                if (c != input.length - 1) output += "\ndocument.writeln(\"";
                                c++;
                            }
                            else {
                                if (input.charAt(c) == "\"") {
                                    output += "/\"";
                                }
                                else {
                                    if (input.charAt(c) == "\\") {
                                        output += "\\\\";
                                    }

                                    else {
                                        output += input.charAt(c);
                                        if (c == input.length - 1) output += "\");";
                                    }
                                }
                            }

                        }
                        document.getElementById("result").value = "<script language=\"JavaScript\">\n<!--\n" + output + "\n/\/\-->\n</script>";
                    }

                },

                //html代码转换asp代码
                asp: function () {
                    var input = document.getElementById("content").value;
                    if (input == "") {
                        document.getElementById("result").value = "<%\n%>";
                    }
                    else {
                        output = "Response.Write \"";
                        for (var c = 0; c < input.length; c++) {
                            if ((input.charAt(c) == "\n" || input.charAt(c) == "\r")) {
                                output += "\"";
                                if (c != input.length - 1) output += "\nResponse.Write \"";
                                c++;
                            }
                            else {
                                if (input.charAt(c) == "\"") {
                                    output += "\"\"";
                                }
                                else {
                                    if (input.charAt(c) == "\\") {
                                        output += "\\\\";
                                    }

                                    else {
                                        output += input.charAt(c);
                                        if (c == input.length - 1) output += "\"";
                                    }
                                }
                            }

                        }
                        document.getElementById("result").value = "<%\n" + output + "\n%>";
                    }
                },

                //html代码转换php代码
                php: function () {
                    var input = document.getElementById("content").value;
                    if (input == "") {
                        document.getElementById("result").value = "<?php\n?>";
                    }
                    else {
                        output = "echo \"";
                        for (var c = 0; c < input.length; c++) {
                            if ((input.charAt(c) == "\n" || input.charAt(c) == "\r")) {
                                output += "\\n\";";
                                if (c != input.length - 1) output += "\necho \"";
                                c++;
                            }
                            else {
                                if (input.charAt(c) == "\"") {
                                    output += "\\\"";
                                }
                                else {
                                    if (input.charAt(c) == "\\") {
                                        output += "\\\\";
                                    }

                                    else {
                                        output += input.charAt(c);
                                        if (c == input.length - 1) output += "\\n\";";
                                    }
                                }
                            }

                        }
                        document.getElementById("result").value = "<?php\n" + output + "\n?>";
                    }
                },

                //html代码转换Jsp代码
                Jsp: function () {
                    var input = document.getElementById("content").value;
                    if (input == "") {
                        document.getElementById("result").value = "<%\n%>";
                    }
                    else {
                        output = "out.println(\"";
                        for (var c = 0; c < input.length; c++) {
                            if ((input.charAt(c) == "\n" || input.charAt(c) == "\r")) {
                                output += "\");";
                                if (c != input.length - 1) output += "\nout.println(\"";
                                c++;
                            }
                            else {
                                if (input.charAt(c) == "\"") {
                                    output += "\\\"";
                                }
                                else {
                                    if (input.charAt(c) == "\\") {
                                        output += "\\\\";
                                    }

                                    else {
                                        output += input.charAt(c);
                                        if (c == input.length - 1) output += "\");";
                                    }
                                }
                            }

                        }
                        document.getElementById("result").value = "<%\n" + output + "\n%>";
                    }
                },

                //html代码转换Perl代码
                Perl: function () {
                    var input = document.getElementById("content").value;
                    if (input == "") {
                        document.getElementById("result").value = output;
                    }
                    else {
                        output = "print \"";
                        for (var c = 0; c < input.length; c++) {
                            if ((input.charAt(c) == "\n" || input.charAt(c) == "\r")) {
                                output += "\\n\";";
                                if (c != input.length - 1) output += "\nprint \"";
                                c++;
                            }
                            else {
                                if (input.charAt(c) == "\"") {
                                    output += "\\\"";
                                }
                                else {
                                    if (input.charAt(c) == "\\") {
                                        output += "\\\\";
                                    }

                                    else {
                                        output += input.charAt(c);
                                        if (c == input.length - 1) output += "\\n\";";
                                    }
                                }
                            }

                        }
                        document.getElementById("result").value = output;
                    }
                },

                //html代码转换vbnet代码
                vbnet: function () {
                    var input = document.getElementById("content").value;
                    if (input == "") {
                        document.getElementById("result").value = "<%\n%>";
                    }
                    else {
                        output = "Response.Write (\"";
                        for (var c = 0; c < input.length; c++) {
                            if ((input.charAt(c) == "\n" || input.charAt(c) == "\r")) {
                                output += "\");";
                                if (c != input.length - 1) output += "\nResponse.Write (\"";
                                c++;
                            }
                            else {
                                if (input.charAt(c) == "\"") {
                                    output += "\"\"";
                                }
                                else {
                                    if (input.charAt(c) == "\\") {
                                        output += "\\\\";
                                    }

                                    else {
                                        output += input.charAt(c);
                                        if (c == input.length - 1) output += "\");";
                                    }
                                }
                            }

                        }
                        document.getElementById("result").value = "<%\n" + output + "\n%>";
                    }
                },

                //html代码转换Sws代码
                Sws: function () {
                    var input = document.getElementById("content").value;
                    if (input == "") {
                        document.getElementById("result").value = output;
                    }
                    else {
                        output = "STRING \"";
                        for (var c = 0; c < input.length; c++) {
                            if ((input.charAt(c) == "\n" || input.charAt(c) == "\r")) {
                                output += "\"";
                                if (c != input.length - 1) output += "\nSTRING \"";
                                c++;
                            }
                            else {
                                if (input.charAt(c) == "\"") {
                                    output += "\\\"";
                                }
                                else {
                                    if (input.charAt(c) == "\\") {
                                        output += "\\\\";
                                    }

                                    else {
                                        output += input.charAt(c);
                                        if (c == input.length - 1) output += "\"";
                                    }
                                }
                            }

                        }
                        document.getElementById("result").value = output;
                    }
                },

                //开始转换按钮
                htmlCov: function () {
                    var _this = hcj.htmlCodeCov;
                    var type = getid("html").value;
                    switch (type) {
                        case "javascript": _this.javascript(); break;
                        case "asp": _this.asp(); break;
                        case "php": _this.php(); break;
                        case "jsp": _this.Jsp(); break;
                        case "perl": _this.Perl(); break;
                        case "sws": _this.Sws(); break;
                        case "vbnet": _this.vbnet(); break;
                        default: getid("result").value = '转换错误'; break;
                    }
                    if ($("#result").val()) $("#result").siblings().hide();
                },
                init: function (path) {
                    var _this = this;
                    $("#trans").click(_this.htmlCov);
                    //tools.clipfn(path, "clip");
                    tools.copyBtn('clip');
                    $("._ToolChoese").each(function () {
                        _select({
                            select: $(this).find(".SearChoese"),
                            options: $(this).find("ul.SearChoese-show"),
                            option: $(this).find("ul.SearChoese-show li a"),
                            t: "slide",
                            callback: _this.htmlCov//下拉选项
                        });
                    });
                    $("#clear").click(function () { tools.clear([getid("content"), getid("result")]) });
                }

            },
            jstool: {
                jsonData: { action: '', content: '', enkey: '' },
                jsbeauty: function (_this) {
                    var source = $('#txtInitCode').val().trim(),
                        output,
                        opts = {};

                    opts.indent_size = 4;
                    opts.indent_char = ' ';
                    opts.max_preserve_newlines = 5;
                    opts.preserve_newlines = opts.max_preserve_newlines !== "-1";
                    opts.keep_array_indentation = false;
                    opts.break_chained_methods = false;
                    opts.indent_scripts = 'normal';
                    opts.brace_style = 'collapse';
                    opts.space_before_conditional = true;
                    opts.unescape_strings = false;
                    opts.jslint_happy = false;
                    opts.wrap_line_length = 0;
                    opts.space_after_anon_function = true;
                    source = _this.unpacker_filter(source, _this);
                    output = js_beautify(source, opts);
                    $('#txtResultCode').val(output);
                    if ($("#txtResultCode").val()) $("#txtResultCode").siblings("b").hide();
                },
                unpacker_filter: function (source) {
                    var trailing_comments = '',
                        comment = '',
                        unpacked = '',
                        found = false;

                    do {
                        found = false;
                        if (/^\s*\/\*/.test(source)) {
                            found = true;
                            comment = source.substr(0, source.indexOf('*/') + 2);
                            source = source.substr(comment.length).replace(/^\s+/, '');
                            trailing_comments += comment + "\n";
                        } else if (/^\s*\/\//.test(source)) {
                            found = true;
                            comment = source.match(/^\s*\/\/.*/)[0];
                            source = source.substr(comment.length).replace(/^\s+/, '');
                            trailing_comments += comment + "\n";
                        }
                    } while (found);

                    var unpackers = [P_A_C_K_E_R, Urlencoded, MyObfuscate];
                    for (var i = 0; i < unpackers.length; i++) {
                        if (unpackers[i].detect(source)) {
                            unpacked = unpackers[i].unpack(source);
                            if (unpacked != source) {
                                source = this.unpacker_filter(unpacked);
                            }
                        }
                    }
                    return trailing_comments + source;
                },
                ajaxdata: function (_this) {
                    jQuery.ajax({
                        type: 'POST',
                        url: '/AjaxSeo.aspx?t=jsformat',
                        data: _this.jsonData,
                        beforeSend: function () {
                            $("#txtResultCode").val("");
                            $("#loading").removeClass("autohide");
                        },
                        dataType: 'jsonp',
                        success: function (json) {
                            $("#loading").addClass("autohide");
                            if (json.state == 0) {
                                layer.msg(json.msg,{ offset: '50%' });
                            }
                            else {
                                $("#txtResultCode").val(json.txt);
                                if ($("#txtResultCode").val()) $("#txtResultCode").siblings("b").hide();
                            }
                        }
                    });
                },
                init: function (path, key) {
                    var _this = this;
                    _this.jsonData.enkey = key;
                    $("#btndiv input[ref]").click(function () {
                        _this.jsonData.action = $(this).attr("ref");
                        _this.jsonData.content = jQuery.trim($("#txtInitCode").val());
                        if (_this.jsonData.content == '') {
                            layer.msg('请输入要转换的内容',{ offset: '50%' });
                            return;
                        }
                        switch (_this.jsonData.action) {
                            case "beauty": _this.jsbeauty(_this); return;
                            case "filtercomment": _this.ajaxdata(_this); break;
                            case "basiccompress": _this.ajaxdata(_this); break;
                            case "encodecompress": _this.ajaxdata(_this); break;
                            case "decodebeauty": _this.jsbeauty(_this); return;
                        }
                    });
                    //tools.clipfn(path, "clip");
                    tools.copyBtn('clip');
                    $("#clear").click(function () { tools.clear([getid("txtInitCode"), getid("txtResultCode")]) });
                }
            },
            openweb: {
                openAttr: function (istest) {
                    var address = $("input[name='url']").val();
                    var op_tool = $("input[name='tool']").val() ? "toolbar=yes," : "";
                    var op_loc = $("input[name='loc']").val() ? "location=yes," : "";
                    var op_stat = $("input[name='stat']").val() ? "status=yes," : "";
                    var op_menu = $("input[name='menu']").val() ? "menubar=yes," : "";
                    var op_scroll = $("input[name='scroll']").val() ? "scrollbars=yes," : "";
                    var op_resize = $("input[name='resize']").val() ? "resizable=yes," : "";
                    var op_selfopen = $("input[name='selfopen']").val() ? "_self" : "newwindow";
                    var op_width = $("input[name='width']").val() ? "width=" + $("input[name='width']").val() + "," : "";
                    var op_height = $("input[name='height']").val() ? "height=" + $("input[name='height']").val() + "," : "";
                    var op_L = $("input[name='L']").val() ? "left=" + $("input[name='L']").val() + "," : "";
                    var op_T = $("input[name='T']").val() ? "top=" + $("input[name='T']").val() + "," : "";
                    if (op_tool == "" && op_loc == "" && op_stat == "" && op_menu == "" && op_scroll == "" && op_resize == "" && op_width == "" && op_height == "" && op_L == "" && op_T == "") {
                        tempopenstyle = "";
                    } else {
                        tempopenstyle = op_width + op_height + op_L + op_T + op_tool + op_loc + op_stat + op_menu + op_scroll + op_resize;
                        tempopenstyle = tempopenstyle.substring(0, tempopenstyle.length - 1);
                        tempopenstyle = tempopenstyle;
                    }
                    if (istest) {
                        if (address == "http://" || !address) { layer.msg('请输入URL！', { offset: '50%' }); return; }
                        window.open(address, op_selfopen, tempopenstyle);
                        return;
                    }
                    return "window.open('" + address + "','" + op_selfopen + "'" + (tempopenstyle ? ",'" + tempopenstyle + "'" : "") + ")";
                },
                init: function () {
                    tools.checkbox();
                    var _this = this;
                    $("#gen").click(function () {
                        $('#result').val(_this.openAttr()).removeClass("col-gray");;
                    });
                    $("#test").click(function () {
                        _this.openAttr(true);
                    });
                    $("#clear").click(function () {
                        $("#result").val("");
                    });
                    tools.clearBtn("clear","#result")
                    tools.copyBtn("clip");
                }
            }
        },
        htmlfilter: {
            fhtml: true,
            fjs: false,
            fcss: false,
            fself: false,
            Filter: function () {
                var s = $("#content").val();
                if (!this.fhtml && !this.fjs && !this.fcss && !this.fself)
                    this.fhtml = true;
                if (this.fjs)
                    s = s.replace(/<\s*script[^>]*>(.|[\r\n])*?<\s*\/script[^>]*>/gi, '');
                if (this.fcss)
                    s = s.replace(/<\s*style[^>]*>(.|[\r\n])*?<\s*\/style[^>]*>/gi, '');
                if (this.fhtml) {
                    s = s.replace(/<\/?[^>]+>/g, '');
                    s = s.replace(/\&[a-z]+;/gi, '');
                    s = s.replace(/\s+/g, '\n');
                }
                if (this.fself)
                    s = s.replace(new RegExp($("#preplace").val(), 'g'), $("#nextplace").val());
                $("#result").val(s).removeClass("col-gray");
            },
            checked: function (obj) {
                var thisv = $(obj).val();
                var set = $(obj).prop("checked");
                if (thisv == 3) {
                    if (set) {
                        this.fhtml = false;
                        this.fjs = false;
                        this.fcss = false;
                        this.fself = true;
                        $(obj).siblings("[name=type]").prop("checked", false);
                        $("#place").removeClass("autohide");
                    }
                    else {
                        this.fhtml = true;
                        this.fself = false;
                        $("#place").addClass("autohide");
                        $("input[name=type]").eq(1).prop("checked", true);
                    }
                }
                else {
                    $("#place").addClass("autohide");
                    $("input[name=type]").eq(0).prop("checked", false);
                    switch (thisv) {
                        case "0": if (set) { this.fhtml = true; this.fself = false; } else { this.fhtml = false; } break;
                        case "1": if (set) { this.fjs = true; this.fself = false; } else { this.fjs = false; } break;
                        case "2": if (set) { this.fcss = true; this.fself = false; } else { this.fcss = false; } break;
                    }
                    var _this = this;
                    _this.Filter();
                }
            },
            init: function (path) {
                var _this = this;
                $("input[name=type]").bind("click", function () {
                    _this.checked(this);
                });
                $("#filter").click(function () {
                    _this.Filter();
                    $("#result").siblings(".CentHid").hide();
                });
                $("#clear").click(function () {
                    $("#content").val("");
                    $("#result").val("");
                });
                tools.copyBtn('clip');
            }
        },
        webdebugger: {
            Webtest: function () {
                var win = window.open();
                win.document.open();
                win.document.write($('#content').val());
                win.document.close();
            },
            saveCode: function () {
                if (!document.all) {
                    layer.msg('此功能在IE有效',{ offset: '50%' });
                    return;
                }
                var win = window.open('', '', 'top=10000,left=10000');
                win.document.write(document.all.content.innerText)
                win.document.execCommand('SaveAs', '', '文件名称.htm')
                win.close();
            },
            init: function () {
                var _this = this;
                $("#test").click(function () {
                    _this.Webtest();
                });
                $("#select").click(function () {
                    $("#content").select();
                });
                $("#clear").click(function () {
                    $("#content").val("");
                });
                $("#save").click(function () {
                    _this.saveCode();
                });
            }
        },
        jsonTool: {
            jsontocsharp: {
                init: function (path) {
                    var _this = this;
                    $(".ToolChoesecj").each(function () {
                        _select({
                            select: $(this).find(".SearChoese"),
                            options: $(this).find("ul.SearChoese-show"),
                            option: $(this).find("ul.SearChoese-show li a"),
                            t: "slide",
                            parents: $(".ToolChoesecj"),
                            callback: function () {
                                if ($("#showtype").val() == 0)
                                    $(".javawh").addClass("autohide");
                                else
                                    $(".javawh").removeClass("autohide");
                            }
                        });
                    });

                    //tools.clipfn(path);
                    $("#2csharp").click(function () {
                        if (!$("#jsonval").val().trim()) {
                            layer.msg("请填写JSON",{ offset: '50%' });
                            return false;
                        }
                        try {
                            var v = eval("(" + document.getElementById("jsonval").value + ")");
                            var res = "";
                            if ($("#showtype").val() == 0)
                                res = _this.JSON2CSharp.convert(v);
                            else
                                res = _this.JSON2POJO.convert(v);
                            $("#result").val(res).siblings("b").hide();
                        } catch (e) {
                            layer.msg("生成C#实体类异常，请检查JSON是否错误。",{ offset: '50%' });
                        }
                    });
                    $("#testjson").click(function () {
                        var testjson = '{\r\n    "name":"站长工具",\r\n    "url":"http://tool.chinaz.com",\r\n    "address":{\r\n        "city":"厦门",\r\n        "country":"中国"\r\n    },\r\n    "arrayBrowser":[{\r\n        "name":"Google",\r\n        "url":"http://www.google.com"\r\n    },\r\n    {\r\n       "name":"Baidu",\r\n       "url":"http://www.baidu.com"\r\n   },\r\n   {\r\n       "name":"SoSo",\r\n       "url":"http://www.SoSo.com"\r\n   }]\r\n}';
                        $("#jsonval").val(testjson).siblings("b").hide();
                    });

                    //复制
                    tools.copyBtn('copy')

                    $("#clear").click(function () {
                        tools.clear([getid('result'), getid('jsonval')]);
                    });
                },
                JSON2CSharp: {
                    _allClass: [],
                    _genClassCode: function (obj, name) {
                        var clas = "public class {0}\r\n{\r\n".format(name || "Root");
                        for (var n in obj) {
                            var v = obj[n];
                            n = n.trim();
                            //变量定义规则
                            n = n.replace(/[^\w]+/ig, '_');
                            if (/^\d+/.test(n))
                                n = "_" + n;
                            clas += "    {0}    public {1} {2} { get; set; }\r\n".format(this._genComment(v, n), this._genTypeByProp(n, v), n);
                        }
                        clas += "}\r\n";
                        this._allClass.push(clas);
                        return this._allClass.join("\r\n");
                    },
                    _genTypeByProp: function (name, val) {
                        try {
                            if (typeof val == "string") {
                                var regdt = /^(\d{4})(-|\/|年)(\d{2})(-|\/|月)(\d{2})(日)?(\s((\d{1,2}):)?((\d{1,2}):)?(\d{1,2})?)?$/
                                if (regdt.test(val.trim()))
                                    val = new Date(val);
                            }
                        } catch (e) {

                        }
                        switch (Object.prototype.toString.apply(val)) {
                            case "[object Number]":
                            {
                                return val.toString().indexOf(".") > -1 ? "double" : "int";
                            }
                            case "[object Date]":
                            {
                                return "DateTime";
                            }
                            case "[object Object]":
                            {
                                name = name.substring(0, 1).toUpperCase() + name.substring(1);
                                this._genClassCode(val, name);
                                return name;
                            }
                            case "[object Array]":
                            {
                                return "List<{0}>".format(this._genTypeByProp(name, val[0]));
                            }
                            case "[object Boolean]":
                            {
                                return "bool";
                            }
                            default:
                            {
                                return "string";
                            }
                        }
                    },
                    _genComment: function (val, n) {
                        //var commm = typeof (val) == "string" && /.*[\u4e00-\u9fa5]+.*$/.test(val) ? val : "";
                        var s = Object.prototype.toString.apply(val);
                        var commm = typeof (val) == "string" ? val : n.substring(0, 1).toUpperCase() + n.substring(1);;
                        return "/// <summary>\r\n    /// " + commm + "\r\n    /// </summary>\r\n";
                    },
                    convert: function (jsonObj) {
                        this._allClass = [];
                        return this._genClassCode(jsonObj);
                    }
                },
                JSON2POJO: {
                    _allClass: [],
                    _genClassCode: function (obj, name) {
                        var packageval = $("#packageval").val(), isfill = $("#isfill").prop("checked");
                        var clas = "";
                        var str = "";
                        var privateAttr = "", publicAttr = "", fill = "", filllist = "";
                        if (isfill) {
                            fill += "    public static {0} fill(JSONObject jsonobj){\r\n".format(name || "Root");
                            fill += "        {0} entity = new {0}();\r\n".format(name || "Root");

                            filllist += "    public static List<{0}> fillList(JSONArray jsonarray) {\r\n";
                            filllist += "        if (jsonarray == null || jsonarray.size() == 0)\r\n";
                            filllist += "            return null;\r\n";
                            filllist += "        List<{0}> olist = new ArrayList<{0}>();\r\n";
                            filllist += "        for (int i = 0; i < jsonarray.size(); i++) {\r\n";
                            filllist += "            olist.add(fill(jsonarray.getJSONObject(i)));\r\n";
                            filllist += "        }\r\n";
                            filllist += "        return olist;\r\n";
                            filllist += "    }\r\n";
                            filllist = filllist.format(name || "Root");
                        }
                        for (var n in obj) {
                            var v = obj[n];
                            n = n.trim();
                            //变量定义规则
                            n = n.replace(/[^\w]+/ig, '_');
                            if (/^\d+/.test(n))
                                n = "_" + n;
                            var tp = this._genTypeByProp(n, v);
                            var _type = tp.type;
                            if (tp.islist) {
                                if (isfill)
                                    str = "package {1};\r\nimport java.util.ArrayList;\r\nimport java.util.List;\r\nimport net.sf.json.JSONObject;\r\nimport net.sf.json.JSONArray;\r\npublic class {0}\r\n{\r\n".format(name || "Root", packageval);
                                else
                                    str = "package {1};\r\nimport java.util.ArrayList;\r\nimport java.util.List;\r\npublic class {0}\r\n{\r\n".format(name || "Root", packageval, "\r\nimport java.util.List;");
                            }
                            privateAttr += "    private {0} {1};\r\n\r\n".format(_type, n);
                            var firstChar = n.substring(0, 1).toUpperCase() + n.substring(1);
                            publicAttr += "    public void set{2}({0} {1}){\r\n        this.{1} = {1};\r\n    }\r\n".format(_type, n, firstChar);
                            publicAttr += "    public {0} get{2}(){\r\n        return this.{1};\r\n    }\r\n".format(_type, n, firstChar);

                            if (isfill) {
                                fill += "        if (jsonobj.containsKey(\"{0}\")) {\r\n".format(n);
                                var _typefirstChartoUpper = _type.substring(0, 1).toUpperCase() + _type.substring(1);
                                fill += "            entity.set{1}(jsonobj.get{2}(\"{0}\"));        \r\n        }\r\n".format(n, n.substring(0, 1).toUpperCase() + n.substring(1), _typefirstChartoUpper.indexOf("List") >= 0 ? "JSONArray" : _typefirstChartoUpper);
                            }
                        }
                        clas += "==================================\r\n"
                        if (!str) {
                            if (isfill)
                                clas += "package {1};\r\nimport net.sf.json.JSONObject;\r\nimport net.sf.json.JSONArray;\r\npublic class {0}\r\n{\r\n".format(name || "Root", packageval);
                            else
                                clas += "package {1};\r\npublic class {0}\r\n{\r\n".format(name || "Root", packageval);
                        }
                        else
                            clas += str;
                        if (isfill) {
                            fill += "        return entity;\r\n    }\r\n";
                        }
                        clas += privateAttr;
                        clas += publicAttr;
                        clas += fill;
                        clas += filllist;
                        clas += "}\r\n";
                        this._allClass.push(clas);
                        return this._allClass.join("\r\n");
                    },
                    _genTypeByProp: function (name, val) {
                        try {
                            if (typeof val == "string") {
                                //xxxx(-|/|年)xx(-|/|月)xx(-|/|日) xx:xx:xx
                                var regdt = /^(\d{4})(-|\/|年)(\d{2})(-|\/|月)(\d{2})(日)?(\s((\d{1,2}):)?((\d{1,2}):)?(\d{1,2})?)?$/
                                if (regdt.test(val.trim()))
                                    val = new Date(val);
                            }
                        } catch (e) {

                        }
                        switch (Object.prototype.toString.apply(val)) {
                            case "[object Number]":
                            {
                                return { type: val.toString().indexOf(".") > -1 ? "double" : "int" };
                            }
                            case "[object Date]":
                            {
                                return { type: "DateTime" };
                            }
                            case "[object Object]":
                            {
                                name = name.substring(0, 1).toUpperCase() + name.substring(1);
                                this._genClassCode(val, name);
                                return { type: name };
                            }
                            case "[object Array]":
                            {
                                return { type: "List<{0}>".format(this._genTypeByProp(name, val[0]).type), islist: true };
                            }
                            case "[object Boolean]":
                            {
                                return { type: "boolean" };
                            }
                            default:
                            {
                                return { type: "String" };
                            }
                        }
                    },
                    convert: function (jsonObj) {
                        this._allClass = [];
                        return this._genClassCode(jsonObj);
                    }
                }
            },
            jsontoxml: function () {
                $("#2json").click(function () {
                    var xmlobjtree = new XML.ObjTree();
                    var dumper = new JKL.Dumper();
                    var xmlText = $("#xmljsonval").val();
                    if (!xmlText) {
                        layer.msg("请输入XML字符串",{ offset: '50%' });
                        $("#xmljsonval").focus();
                        return false;
                    }
                    xmlText = xmlText.replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, "\""); //HTML转义
                    var tree = xmlobjtree.parseXML(xmlText);
                    if (tree) {
                        if (!tree.html)
                            $("#result").val(dumper.dump(tree)).siblings("b").hide();
                        else {
                            layer.msg("请检查XML是否错误。",{ offset: '50%' });
                            $("#xmljsonval").focus();
                        }
                    }
                });

                $("#2xml").click(function () {
                    var xmlobjtree = new XML.ObjTree();
                    if (!$("#xmljsonval").val()) {
                        layer.msg("请输入JSON字符串",{ offset: '50%' });
                        $("#xmljsonval").focus();
                        return false;
                    }
                    try {
                        var json = eval("(" + $("#xmljsonval").val() + ")");
                        $("#result").val(formatXml(xmlobjtree.writeXML(json))).siblings("b").hide();
                    } catch (e) {
                        layer.msg("转XML异常，请检查JSON是否错误。",{ offset: '50%' });
                        $("#xmljsonval").focus();
                    }
                });

                $("#clear").click(function () {
                    tools.clear([getid('xmljsonval'), getid('result')]);
                });

            },
            jsontoget: function () {
                $("#getjsonval").bind("keyup paste", function (e) {
                    var obj = $(this);
                    var etype = e.type;
                    setTimeout(function () {
                        if (etype == "paste")
                            obj.val(obj.val().trim().replace(/(\r|\n|\t|\s)/g, ""));
                    }, 100);
                });
                $("#2json").click(function () {
                    var val = $("#getjsonval").val();
                    val = val.replace(/&/g, '","').replace(/=/g, '":"');
                    val = '{"' + val + '"}';
                    $("#result").val(val).siblings("b").hide();
                });
                $("#2get").click(function () {
                    var val = $("#getjsonval").val();
                    val = val.replace(/\t/g, "");
                    val = val.replace(/\"/g, "").replace("{", "").replace("}", "").replace(",", "&").replace(":", "=");
                    val = val.replace(/\"/g, "").replace(/{/g, "").replace(/}/g, "").replace(/,/g, "&").replace(/:/g, "=");
                    $("#result").val(val).siblings("b").hide();
                });
                $("#clear").click(function () {
                    tools.clear([getid('getjsonval'), getid('result')]);
                });
            },
            exceltojson: {
                getresult: function (totype) {
                    var splitchar = $("#splitchar").val() || /\t/;
                    var txt = $("#excelval").val();
                    if (!txt.trim()) {
                        alert("请输入EXCEL格式的字符串。");
                        return false;
                    }
                    var datas = txt.split("\n");
                    var html = "[\n";
                    var keys = [];
                    for (var i = 0; i < datas.length; i++) {
                        var ds = datas[i].split(splitchar);
                        if (i == 0) {
                            if (totype == "0") {
                                keys = ds;
                            } else {
                                html += "[";
                                for (var j = 0; j < ds.length; j++) {
                                    html += '"' + ds[j] + '"';
                                    if (j < ds.length - 1) {
                                        html += ",";
                                    }
                                }
                                html += "],\n";
                            }
                        } else {
                            if (ds.length == 0) continue;
                            if (ds.length == 1) {
                                ds[0] == "";
                                continue;
                            }
                            html += totype == "0" ? "{" : "[";
                            for (var j = 0; j < ds.length; j++) {
                                var d = ds[j];
                                if (d == "") continue;
                                if (totype == "0") {
                                    html += '"' + keys[j] + '":"' + d + '"';
                                } else {
                                    html += '"' + d + '"';
                                }
                                if (j < ds.length - 1) {
                                    html += ',';
                                }
                            }
                            html += totype == "0" ? "}" : "]";
                            if (i < datas.length - 1)
                                html += ",\n";
                        }
                    }
                    if (html && html.lastIndexOf(",\n") == html.length - 2) {
                        html = html.substring(0, html.lastIndexOf(",\n"));
                    }
                    html += "\n]";
                    $("#result").val(html).siblings("b").hide();
                },
                init: function () {
                    var _this = this;
                    $("#2object").click(function () {
                        _this.getresult(0);
                    });
                    $("#2array").click(function () {
                        _this.getresult(1);
                    });
                    $("#clear").click(function () {
                        tools.clear([getid('excelval'), getid('result')]);
                    });
                }
            },
            jsonescape: {
                //ctype: 1压缩  2转义  3压缩转义  4去除转义
                escapezip: function (ctype) {
                    var txtA = document.getElementById("jsonval");
                    var text = txtA.value;
                    if (!text.trim()) {
                        layer.msg("请输入JSON字符串。",{ offset: '50%' });
                        return false;
                    }
                    if (ctype == 1 || ctype == 3) {
                        text = text.split("\n").join(" ");
                        var t = [];
                        var inString = false;
                        for (var i = 0, len = text.length; i < len; i++) {
                            var c = text.charAt(i);
                            if (inString && c === inString) {
                                if (text.charAt(i - 1) !== '\\') {
                                    inString = false;
                                }
                            } else if (!inString && (c === '"' || c === "'")) {
                                inString = c;
                            } else if (!inString && (c === ' ' || c === "\t")) {
                                c = '';
                            }
                            t.push(c);
                        }
                        text = t.join('');
                    }
                    if (ctype == 2 || ctype == 3) {
                        text = text.replace(/\\/g, "\\\\").replace(/\"/g, "\\\"");
                    }
                    if (ctype == 4) {
                        text = text.replace(/\\\\/g, "\\").replace(/\\\"/g, '\"');
                    }
                    txtA.value = text;
                },
                GB2312UnicodeConverter: {
                    ToUnicode: function (str) {
                        var txt = escape(str).toLocaleLowerCase().replace(/%u/gi, '\\u');
                        return txt.replace(/%7b/gi, '{').replace(/%7d/gi, '}').replace(/%3a/gi, ':').replace(/%2c/gi, ',').replace(/%27/gi, '\'').replace(/%22/gi, '"').replace(/%5b/gi, '[').replace(/%5d/gi, ']').replace(/%3D/gi, '=').replace(/%20/gi, ' ').replace(/%3E/gi, '>').replace(/%3C/gi, '<').replace(/%3F/gi, '?');
                    },
                    ToGB2312: function (str) {
                        return unescape(str.replace(/\\u/gi, '%u'));
                    }
                },
                utozh: function () {
                    var _this = this;
                    var txtA = document.getElementById("jsonval");
                    var text = txtA.value.trim();
                    if (!text) {
                        layer.msg("请输入JSON字符串。",{ offset: '50%' });
                        return false;
                    }
                    txtA.value = _this.GB2312UnicodeConverter.ToGB2312(text);
                },
                zhtou: function () {
                    var _this = this;
                    var txtA = document.getElementById("jsonval");
                    var text = txtA.value.trim();
                    if (!text) {
                        layer.msg("请输入JSON字符串。",{ offset: '50%' });
                        return false;
                    }
                    txtA.value = _this.GB2312UnicodeConverter.ToUnicode(text);
                },
                cntoenehar: function () {
                    var txtA = document.getElementById("jsonval");
                    var str = txtA.value;
                    str = str.replace(/\’|\‘/g, "'").replace(/\“|\”/g, "\"");
                    str = str.replace(/\【/g, "[").replace(/\】/g, "]").replace(/\｛/g, "{").replace(/\｝/g, "}");
                    str = str.replace(/，/g, ",").replace(/：/g, ":");
                    txtA.value = str;
                },
                init: function () {
                    $('#jsonval').linedtextarea({ resize: "none" });
                    var _this = this;
                    $("#zip").click(function () {
                        _this.escapezip(1);
                    });
                    $("#escape").click(function () {
                        _this.escapezip(2);
                    });
                    $("#zipescape").click(function () {
                        _this.escapezip(3);
                    });
                    $("#delescape").click(function () {
                        _this.escapezip(4);
                    });
                    $("#u2zh-cn").click(function () {
                        _this.utozh();
                    });
                    $("#zh-cn2u").click(function () {
                        _this.zhtou();
                    });
                    $("#zh-cn2enchar").click(function () {
                        _this.cntoenehar();
                    });
                }
            }
        },
        sqlformat: {
            formatResult: function(){
                $(".GuoLvCbtn .GLOkBtn").click(function () {
                    var type = $(this).attr("data-type");
                    var content = $("#result").val();
                    if (!content) {
                        layer.msg("请输入sql语句");
                        return;
                    }
                    var result = "";
                    switch (type) {
                        case "format":
                            $("#result").val(sqlbeautify.format(content));
                            break;
                        case "compress":
                            $("#result").val(sqlbeautify.compress(content));
                            break;
                        case "clear":
                            $("#result").val("");
                            break;
                    }
                })
                tools.copyBtn("copy")
            }
        },
        regex: {
            regCommon: {
                chines: "[\\u4e00-\\u9fa5]", //中文
                doubleByte: "[^\\x00-\\xff]", //双字节（包含中文）
                nullLine: "\\s", //空白行
                email: "\\w[-\\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\\.)+[A-Za-z]{2,14}", //邮箱
                url: "^((https|http|ftp|rtsp|mms)?:\\/\\/)[^\\s]+", //网址（只验证是否包含某些前缀）
                phone: "0?(13|14|15|17|18|19)[0-9]{9}", //国内手机
                tel: "[0-9-()（）]{7,18}", //国内电话
                nFloat: "-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*)", //负浮点数
                interger: "-?[1-9]\\d*", //整型
                pFloat: "[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*", //正浮点数 [1-9]\d*\.\d+|0\.\d*[1-9]\d*
                qq: "[1-9]([0-9]{5,11})", //QQ号
                postal: "\\d{6}", //国内邮政编码
                ip4: "(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)", //ip地址
                cardId: "\\d{17}[\\d|x]|\\d{15}", //身份证号码
                date: "\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}", //日期
                pInterger: "[1-9]\\d*", //正整数
                nInterger: "-[1-9]\\d*", //负整数
                userName: "[A-Za-z0-9_\\-\\u4e00-\\u9fa5]+"//用户名
            },
            checkReg: function () {
                var f = RegexPal.fields,
                    o = f.options;
                onresize = function (e) {
                    var isIE1 = !!window.ActiveXObject;
                    var isIE61 = isIE1 && !window.XMLHttpRequest;
                    f.input.field.style.height = "200px";
                    //                if (isIE61) f.input.field.style.height = Math.max((window.innerHeight || document.documentElement.clientHeight) - 310, 268) + "px";
                    //                else f.input.field.style.height = Math.max((window.innerHeight || document.documentElement.clientHeight) - 610, 268) + "px";
                    f.search.setDimensions();
                    f.input.setDimensions()
                };
                onresize();
                RegexPal.highlightSearchSyntax();
                RegexPal.highlightMatches();
                for (var flag in o.flags) {
                    o.flags[flag].onclick = RegexPal.highlightMatches
                };
                o.highlightSyntax.onclick = RegexPal.highlightSearchSyntax;
                o.highlightMatches.onclick = RegexPal.highlightMatches;
                o.invertMatches.onclick = RegexPal.highlightMatches;
                function makeResetter(field) {
                    return function () {
                        field.clearBg();
                        field.textbox.value = "";
                        field.textbox.onfocus = null
                    }
                };
            },
            itemClick: function (_this, flage) {
                $("#regCommon a").click(function () {
                    var t = $(this).attr("t");
                    var reg = new RegExp(_this.regCommon[t]);
                    $("#searchText").val(_this.regCommon[t]).siblings(".CentHid").hide();
                    var val = $("#inputText").val();
                    if (flage) _this.checkReg();
                });
            },
            init: function () {
                tools.checkbox("reg");
                var _this = this;
                _this.itemClick(_this, true);
                _this.checkReg(_this);
                $("#repbtn").click(function () {
                    var reptext = $("#reptext").val();
                    var inputText = $("#inputText");
                    var reg = $("#searchText").val();
                    inputText.val(inputText.val().replace(new RegExp(reg, "gi"), reptext));
                    _this.checkReg();
                });
                $("#inputText").keyup(function () { $("#inputText").height($("#inputBg").height()); });
                $("#inputText,#searchText").bind("keyup keydown blur", function () {
                    if ($("#inputText").val().indexOf('tool.chinaz.com|888') >= 0) return;
                    var reg = $("#searchText").val();
                    var val = $("#inputText").val();
                    if (!reg) {
                        $("#result").hide(); return;
                    }
                    var arr = []
                    try {
                        arr = val.match(new RegExp(reg, 'g'));
                    } catch (e) {
                        $("#result").hide(); return;
                    }
                    if (!arr) {
                        $("#result").hide(); return;
                    }
                    $("#result").val("");
                    var str = "";
                    for (var i = 0; i < arr.length; i++) {
                        str += arr[i] + "\n";
                    }
                    $("#result").show();
                    $("#result textarea").val(str);
                    $("#result p").html("匹配到 <strong>" + arr.length + "</strong> 条结果：");
                });
            },
            languageCode: {
                js: "var pattern = /{0}/,\n\tstr = '{1}';\nconsole.log(pattern.test(str));",
                php: "$str = '{1}';\n$isMatched = preg_match('/{0}/', $str, $matches);\nvar_dump($isMatched, $matches);",
                go: "package main\n\nimport (\n\t\"fmt\"\n\t\"regexp\"\n)\n\nfunc main() {\n\tstr := \"{1}\"\n\tmatched, err := regexp.MatchString(\"{0}\", str)\n\tfmt.Println(matched, err)\n}",
                rb: "pattern = /{0}/\nstr = '{1}'\np pattern.match(str)",
                py: "import re\npattern = re.compile(ur'{0}')\nstr = u'{1}'\nprint(pattern.search(str))",
                java: "import java.util.regex.Matcher;\nimport java.util.regex.Pattern;\n\npublic class RegexMatches {\n\t\n\tpublic static void main(String args[]) {\n\t\tString str = \"{1}\";\n\t\tString pattern = \"{0}\";\n\n\t\tPattern r = Pattern.compile(pattern);\n\t\tMatcher m = r.matcher(str);\n\t\tSystem.out.println(m.matches());\n\t}\n\n}"
            },
            initgenerate: function () {
                var _this = this;
                _this.itemClick(_this);
                $("#test").click(function () {
                    var pattern = $("#searchText").val();
                    if (!pattern) return;
                    var textarealist = $("#languagelist textarea");
                    for (var i = 0; i < textarealist.length; i++) {
                        var textarea = $(textarealist[i]);
                        var language = textarea.attr("id");
                        if (language == 'go' || language == 'java') pattern.replace(/\\/gi, "\\");
                        textarea.val(_this.languageCode[language].format(pattern, ""));
                    }
                    $("#languagelist").removeClass("autohide");
                });


            }
        },
        unixtime: {
            currentTimeActive: 1,
            unixTimer: 0,
            appendZero: function (obj) { //日期不足两位补0
                if (obj < 10) return "0" + "" + obj;
                else return obj;
            },
            unix2human: function () {
                var unixTimestamp = document.unix.timestamp.value.trim();
                if (!unixTimestamp) {
                    layer.msg("时间戳格式不正确");
                    return;
                }
                unixTimestamp = parseInt(unixTimestamp);
                var isms = $("#unixtoutc8sel").val();
                if (isms == 0) //秒
                {
                    unixTimestamp = unixTimestamp * 1000; //转化为毫秒
                }

                var dateObj = new Date(unixTimestamp);
                if (dateObj.format('yyyy') == "NaN") {
                    layer.msg("时间戳格式不正确");
                    return;
                }
                var year = dateObj.getFullYear();
                var month = this.appendZero(dateObj.getMonth() + 1);
                var date = this.appendZero(dateObj.getDate());
                var hour = this.appendZero(dateObj.getHours());
                var minute = this.appendZero(dateObj.getMinutes());
                var second = this.appendZero(dateObj.getSeconds());
                var UnixTimeToDate = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
                document.unix.unixtoutc8result.value = UnixTimeToDate;
            },
            human2unix: function () {
                var isms = $("#utc8tounixsel").val();
                var _this = tc.unixtime;
                var form = document.unix;
                var year = form.year.value; if (!year) { /*alert("时间格式不正确");*/return; }
                var month = _this.stripLeadingZeroes(form.month.value);
                var day = _this.stripLeadingZeroes(form.day.value);
                var hour = _this.stripLeadingZeroes(form.hour.value);
                var minute = _this.stripLeadingZeroes(form.minute.value);
                var second = _this.stripLeadingZeroes(form.second.value);
                year = year ? year : new Date().getFullYear(), month = month ? month : 1, day = day ? day : 1, hour = hour ? hour : (year == 1970 ? 0 : 0), minute = minute ? minute : 0, second = second ? second : 0;
                //var humanDate = new Date(Date.UTC(year, month, day, hour, minute, second));

                var humanDate = new Date(year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second);
                if (humanDate.format('yyyy') == "NaN") { /*alert("时间格式不正确");*/return; }
                if (isms == 0) document.unix.utc8tounixresult.value = (humanDate.getTime() / 1000);
                else document.unix.utc8tounixresult.value = humanDate.getTime();
            },
            human2unix1: function () {
                var isms = $("#unixtoutc81sel").val();
                var form = document.unix;
                var datetime = form.utc8.value;
                if (!datetime) return;
                if (datetime.split(' ').length == 1) //如 2021-01-19
                    datetime = datetime + " 00:00:00";
                var ndate = new Date(datetime);
                if (ndate.format('yyyy') == "NaN") {
                    layer.msg("时间格式不正确");
                    return;
                }
                var year = ndate.getFullYear();
                var month = ndate.getMonth();
                var day = ndate.getDate();
                var hour = ndate.getHours();
                var minute = ndate.getMinutes();
                var second = ndate.getSeconds();
                var ms = ndate.getMilliseconds();
                var humanDate;
                if (isms == 0) humanDate = new Date(year, month, day, hour, minute, second);
                else humanDate = new Date(year, month, day, hour, minute, second, ms);
                //if (humanDate.format('yyyy') == "NaN") { /*alert("时间格式不正确");*/return; }
                if (isms == 0) form.unixtoutc8result1.value = (humanDate.getTime() / 1000);
                else form.unixtoutc8result1.value = humanDate.getTime();
            },
            stripLeadingZeroes: function (input) {
                if ((input.length > 1) && (input.substr(0, 1) == "0")) {
                    return input.substr(1);
                } else {
                    return input;
                }
            },
            currentTime: function () {
                var _this = tc.unixtime;
                var timeNow = new Date();
                document.getElementById("currentunixtime").innerHTML = Math.round(timeNow.getTime() / 1000);
                if (_this.currentTimeActive) {
                    this.unixTimer = setTimeout(function () { _this.currentTime() }, 1000);
                }
            },
            nowDate: function () {
                var form = document.unix;
                var timeNow = new Date();
                form.timestamp.value = Math.round(timeNow.getTime() / 1000);
                form.year.value = timeNow.getFullYear();
                //                form.month.value = timeNow.getMonth() + 1;
                //                form.day.value = timeNow.getDate();
                //                form.hour.value = timeNow.getHours();
                //                form.minute.value = timeNow.getMinutes();
                //                form.second.value = timeNow.getSeconds();
            },
            init: function () {
                var _this = this;
                _this.nowDate();
                _this.currentTime();
                $("#start").click(function () {
                    _this.currentTimeActive = 1;
                    _this.currentTime();
                });
                $("#stop").click(function () {
                    console.log("thissssss")
                    _this.currentTimeActive = 0;
                    clearTimeout(_this.unixTimer);
                });
                $("#refresh").click(_this.currentTime);
                $("#unixtoutc8").click(function () { _this.unix2human() });
                $("#utc8tounix").click(_this.human2unix);
                $("#utc8tounix1").click(_this.human2unix1);
                //$("form input").keydown(function (e) { entNumber(e, true); });

                $("._ToolChoese").each(function () {
                    _select({
                        select: $(this).find(".SearChoese"),
                        options: $(this).find("ul.SearChoese-show"),
                        option: $(this).find("ul.SearChoese-show li a"),
                        t: "slide",
                        callback: function (_this) {
                            var id = $(_this).parents("ul").siblings("input[type=hidden]").attr("id");
                            switch (id) {
                                case "unixtoutc8sel": $("#unixtoutc8").click();
                                    break;
                                case "unixtoutc81sel": $("#utc8tounix1").click();
                                    break;
                                case "utc8tounixsel": $("#utc8tounix").click();
                                    break;
                            }
                        }
                    });
                });
            }
        },
        hexconvert: {
            convertClick: function(){
                $('[name="convertType"]').click(function () {
                    $('#selConvType').val($(this).val());
                    $('#hex_input').val("");
                    $('#hex_output').val("");
                });
                $('[name="convertRs"]').click(function () {
                    $('#selConvRs').val($(this).val());
                    tc.hexconvert.convert(1);
                });
                $("#selConvType").change(function () {
                    $("input[name='convertType']").removeProp("checked");
                    var val = $(this).val();
                    $("input[name='convertType'][value=" + val + "]").prop("checked", true); 
                    $('#hex_input').val("");
                    $('#hex_output').val("");
                });
                $("#selConvRs").change(function () {
                    $("input[name='convertRs']").removeProp("checked");
                    var val = $(this).val();
                    $("input[name='convertRs'][value=" + val + "]").prop("checked", true); 
                    tc.hexconvert.convert(1);
                });
            },
            convert: function (y) {
                if ($("#hex_input").val() != flag || y) {
                    flag = $("#hex_input").val();
                    if ($("#selConvType").selectedIndex < index) {
                        $("#hex_input").val("");
                        $("#hex_output").val("");
                    } else {
                        var hexinput = $("#hex_input").val();
                        var hex0 = hexinput.match(tc.hexconvert.zhengze($("#selConvType").val()));
                        if (hex0) {
                            if (hex0[0].indexOf(".") == -1) {
                                var hex1 = parseInt(hex0, $('#selConvType').val());
                            } else {
                                var hex1 = tc.hexconvert.pxparseFloat(hex0, $('#selConvType').val());
                            }
                            hex1 = hex1.toString($('#selConvRs').val());
                            $("#hex_output").val(hex1);
                            shurukuang = hexinput;
                        } else {
                            $("#hex_input").val(shurukuang);
                        }
                    }
                    index = $("#selConvType").selectedIndex;
                }
                if ($("#hex_input").val() == "") {
                    $("#hex_output").val("");
                }
            },
            pxparseFloat: function (x, y) {
                x = x.toString();
                var num = x;
                var data = num.split(".");
                var you = data[1].split(""); //将右边转换为数组 得到类似 [1,0,1]
                var sum = 0; //小数部分的和
                for (var i = 0; i < data[1].length; i++) {
                    sum += you[i] * Math.pow(y, -1 * (i + 1))
                }
                return parseInt(data[0], y) + sum;
            },
            zhengze: function (x) {
                var str;
                x = parseInt(x);
                if (x <= 10) {
                    str = new RegExp("^[+\\-]?[0-" + (x - 1) + "]*[.]?[0-" + (x - 1) + "]*$", "gi");
                } else {
                    var letter = "";
                    switch (x) {
                        case 11:
                            letter = "a";
                            break;
                        case 12:
                            letter = "b";
                            break;
                        case 13:
                            letter = "c";
                            break;
                        case 14:
                            letter = "d";
                            break;
                        case 15:
                            letter = "e";
                            break;
                        case 16:
                            letter = "f";
                            break;
                        case 17:
                            letter = "g";
                            break;
                        case 18:
                            letter = "h";
                            break;
                        case 19:
                            letter = "i";
                            break;
                        case 20:
                            letter = "j";
                            break;
                        case 21:
                            letter = "k";
                            break;
                        case 22:
                            letter = "l";
                            break;
                        case 23:
                            letter = "m";
                            break;
                        case 24:
                            letter = "n";
                            break;
                        case 25:
                            letter = "o";
                            break;
                        case 26:
                            letter = "p";
                            break;
                        case 27:
                            letter = "q";
                            break;
                        case 28:
                            letter = "r";
                            break;
                        case 29:
                            letter = "s";
                            break;
                        case 30:
                            letter = "t";
                            break;
                        case 31:
                            letter = "u";
                            break;
                        case 32:
                            letter = "v";
                            break;
                        case 33:
                            letter = "w";
                            break;
                        case 34:
                            letter = "x";
                            break;
                        case 35:
                            letter = "y";
                            break;
                        case 36:
                            letter = "z";
                            break;
                    }
                    str = new RegExp("^[+\\-]?[0-9a-" + letter + "]*[.]?[0-9a-" + letter + "]*$", "gi");
                }
                return str;
            }  
        },
        base64: function () {
            var baseStr = new Base64()
            $("#conv").click(function () {
                if($('input[name="chk"]').is(":checked") === true) {
                    var snsArr = $("#content").val().split(/[(\r\n)\r\n]+/)
                    var str = []
                    for(i=0;i<snsArr.length;i++){
                        var value = baseStr.encode(snsArr[i])
                        str.push(value)
                    }
                    $("#result").val(str.join("\n"));
                }else{
                    $("#result").val(baseStr.encode($("#content").val()));
                }
            });
            $("#res").click(function () {
                if($('input[name="chk"]').is(":checked") === true) {
                    var snsArr = $("#result").val().split(/[(\r\n)\r\n]+/)
                    var str = []
                    for(i=0;i<snsArr.length;i++){
                        var value = baseStr.decode(snsArr[i])
                        str.push(value)
                    }
                    $("#content").val(str.join("\n"));
                }else{
                    $("#content").val(baseStr.decode($("#result").val()));
                }
            });
            $('input[name="chk"]').click(function () {
                if($(this).is(":checked") === true) {
                    $(this).prop("checked", true)
                    $(this).attr('checked','checked')
                } else {
                    $(this).prop("checked", false)
                    $(this).removeAttr('checked')
                }
            });
            tools.clearBtn("clear","textarea")
        },
        diff: {
            btnClick: function() {
                $('[js-do="diffuse"]').on("click", function () {
                    if ($('#original').val() == '' || $('#edited').val() == '') {
                        layer.msg("文本不可为空，请重新输入",{ offset: '50%' });
                        return;
                    }
                    $('#original_result code,#edited_result code').html('<img src="' + imgurlbase + '/public/load.gif">');
                    setTimeout(function () { tc.diff.doDiff() }, 500);
                })
                $('[js-do="clear"]').on('click', function () {
                    tc.diff.clear()
                });
            },
            clear: function () {
                $('#original,#edited').val('');
                $('#original_result code,#edited_result code').html('');
                $('#original_result code:eq(0),#edited_result code:eq(0)').remove();
                $('#prevv').remove();
                $('html,body').animate({ scrollTop: 0 }, 1);
            },
            doDiff: function () {
                var diff = new SourceDiff.Diff(true);
                var formatter = new SourceDiff.DiffFormatter(diff);

                var text1 = $('#original').val();
                var text2 = $('#edited').val();

                var chag = 0, add = 0, del = 0;
                var results = formatter.formattedDiff(text1, text2);

                var adds = results[3].added.all();
                var dels = results[3].deleted.all();
                var cha = tc.diff.arrayIntersection(adds, dels);

                $(".hljs-line-numbers").remove();
                $('#original_result code').html(results[0]);
                $('#edited_result code').html(results[1]);


                var pre = $('pre code');
                for (var i = 0; i < pre.length; i++) {
                    hljs.highlightBlock(pre[i]);
                }

                var _line = 0;
                $('pre code').each(function () {
                    var lines = $(this).html().split('<br>').length - 1;
                    _line = lines;
                    $(this).before('<code class="hljs hljs-line-numbers" style="float: left;"></code>');
                    var html = $(this).prev('.hljs-line-numbers');
                    for (i = 1; i <= lines; i++) {
                        if (i == lines)
                            html.html(html.html() + (i + '.'));
                        else
                            html.html(html.html() + (i + '.<br>'));
                    }
                });

                $('#prevv').remove();

                var pos = $("#txtcontents").position();
                $("body").append('<div id="prevv" class="pa ie" style="top: {0};left: {1}px;height: 300px;width: 70px;background: rgba(0, 0, 0, 0.08);opacity: 0.8;display:none;position:fixed;">\
                        <div class="pr" style="height: 300px;width: 70px;" >\
                            <div id="_scrollblock" style="position: absolute;width: 100%;height: 40px;background: rgba(0, 0, 0, 0.1);opacity: 0.8;top:0;left:0;z-index:100"></div>\
                        </div>\
                        <div id="total">\
                            <p style="background-color: #FD8;"><strong>0</strong>处修改</p>\
                            <p style="background-color: #9E9;"><strong>0</strong>处新增</p>\
                            <p style="background-color: #E99"><strong>0</strong>处删除</p>\
                        </div>\
                    </div>'.format('35%', pos.left + $("#txtcontents").width() + 20));

                $('#total strong:eq(0)').html(cha.length);
                $('#total strong:eq(1)').html(adds.length - cha.length);
                $('#total strong:eq(2)').html(dels.length - cha.length);


                var scrollTag = true;

                var _h = $('#edited_result code').height();
                new Drag(document.getElementById('_scrollblock'), '', document.getElementById('prevv')).init({
                    moveCallback: function (obj) {
                        $('html,body').animate({ scrollTop: ((obj.top / 260) * _h) }, 1);
                        scrollTag = false;
                        //$('#prevv').css('top', $(document).scrollTop() + $("#txtcontents").position().top);
                    },
                    upCallback: function () {
                        scrollTag = true;
                    },
                    isCenter: false
                });


                $('#prevv').show();
                var acha = tc.diff.arrayIntersect(adds, cha);
                var dcha = tc.diff.arrayIntersect(dels, cha);
                if (acha.length != 0) {
                    for (var i = 0; i < acha.length; i++) {
                        $('#prevv').append('<div style="position: absolute;width: 100%;height: 2px;background-color: #9E9;top: ' + parseInt(acha[i] / _line * 100) + '%;"></div>')
                    }
                }
                if (cha.length != 0) {
                    for (var i = 0; i < cha.length; i++) {
                        $('#prevv').append('<div style="position: absolute;width: 100%;height: 2px;background-color: #FD8;top: ' + parseInt(cha[i] / _line * 100) + '%;"></div>')
                    }
                }
                if (dels.length != 0) {
                    for (var i = 0; i < dcha.length; i++) {
                        $('#prevv').append('<div style="position: absolute;width: 100%;height: 2px;background-color: #E99;top: ' + parseInt(dcha[i] / _line * 100) + '%;"></div>')
                    }
                }



                $(window).off('resize').resize(function () {
                    var pos = $("#txtcontents").position();
                    $('#prevv').css('top', pos.top + 'px').css('left', pos.left + $("#txtcontents").width() + 20 + 'px');
                });

                $(window).off('scroll').scroll(function () {
                    if (scrollTag) {
                        if ($(window).scrollTop() > $('#edited_result code').offset().top) {
                            $('#_scrollblock').css('top', ($(window).scrollTop() - $('#edited_result code').offset().top) / $('#edited_result code').height() * 100 + '%');
                            if ($('#_scrollblock').position().top >= 260) {
                                $('#_scrollblock').css('top', '260px');
                            }
                        } else {
                            $('#_scrollblock').css('top', '0px');
                        }
                    }
                });

                var scrollLeft = $('#original_result code:eq(1)');
                var scrollRight = $('#edited_result code:eq(1)');

                var _ltag = true, _rtag = true;
                scrollLeft.off('scroll').scroll(function () {
                    if (_rtag) {
                        _ltag = false;
                        scrollRight.stop().animate({ scrollLeft: scrollLeft.scrollLeft(), scrollTop: scrollLeft.scrollTop() }, 1, function () { _ltag = true; });
                    }
                });
                scrollRight.off('scroll').scroll(function () {
                    if (_ltag) {
                        _rtag = false;
                        scrollLeft.stop().animate({ scrollLeft: scrollRight.scrollLeft(), scrollTop: scrollRight.scrollTop() }, 1, function () { _rtag = true; });
                    }
                });

            },
            arrayIntersection: function (a, b) {
                var ai = 0, bi = 0;
                var result = new Array();

                while (ai < a.length && bi < b.length) {
                    if (a[ai] < b[bi]) { ai++; }
                    else if (a[ai] > b[bi]) { bi++; }
                    else /* they're equal */
                    {
                        result.push(a[ai]);
                        ai++;
                        bi++;
                    }
                }

                return result;
            },
            arrayIntersect: function (a, b) {
                return $.merge($.grep(a, function (i) {
                        return $.inArray(i, b) == -1;
                    }), $.grep(b, function (i) {
                        return $.inArray(i, a) == -1;
                    })
                )
            }
        },
        htmlEnDeCode: {
            btnClick: function() {
                $(".GuoLvCbtn input[name]").click(function () {
                    var name = $(this).attr("name");
                    var content = $.trim($('#content').val());
                    if (content == '') {
                        layer.msg('请输入要转换的html字符串！');
                        return;
                    }
                    if (content.length > 10000) {
                        $('#content').val("该功能暂不支持超过1w字符的大文本操作，请将文本分段后再操作！");
                        return;
                    }
                    if(name === "en") {
                        $('#result').val(tc.htmlEnDeCode.htmlEncode(content))
                    }else{
                        $('#result').val(tc.htmlEnDeCode.htmlDecode(content))
                    }
                });
                tools.clearBtn('clear','textarea')
            },
            htmlEncode: function (value){
                if (value) {
                    return $('<div />').text(value).html();
                } else {
                    return '';
                }
            },
            htmlDecode: function (value) {
                if (value) {
                    return $('<div />').html(value).text();
                } else {
                    return '';
                }
            }
        },
        unicode: {
            uni: function (pChoice){
                var inputEle = document.getElementById('content');
                var outputEle = document.getElementById('result');
                switch(pChoice){
                    case "CONVERT_FMT1":
                        outputEle.value = tc.unicode.ascii(inputEle.value);
                        break;
                    case "CONVERT_FMT2":
                        outputEle.value = tc.unicode.unicode(inputEle.value);
                        break;
                    case "CONVERT_FMT3":
                        outputEle.value = tc.unicode.unicode1(inputEle.value);
                        break;
                    case "RECONVERT":
                        outputEle.value = tc.unicode.reconvert(inputEle.value.toLowerCase());
                        break;
                }
            },
            ascii: function (str){
                var value='';
                for (var i = 0; i < str.length; i++) {
                    value += '\&#x' + left_zero_4(parseInt(str.charCodeAt(i)).toString(16))+';';
                }
                return value;
            },
            unicode: function (str){
                var value='';
                for (var i = 0; i < str.length; i++) {
                    value += '\\u' + tc.unicode.left_zero_4(parseInt(str.charCodeAt(i)).toString(16));
                }
                return value;
            },
            left_zero_4: function (str) {
                if (str != null && str != '' && str != 'undefined') {
                    if (str.length == 2) {
                        return '00' + str;
                    }
                }
                return str;
            },
            unicode1: function (str){
                var value='';
                for (var i = 0; i < str.length; i++)
                    value += '&#' + str.charCodeAt(i) + ';';
                return value;
            },
            reconvert: function (str){
                str = str.replace(/(\\u)(\w{1,4})/gi,function($0){
                    return (String.fromCharCode(parseInt((escape($0).replace(/(%5Cu)(\w{1,4})/g,"$2")),16)));
                });
                str = str.replace(/(&#x)(\w{1,4});/gi,function($0){
                    return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g,"$2"),16));
                });
                str = str.replace(/(&#)(\d{1,6});/gi,function($0){
                    return String.fromCharCode(parseInt(escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g,"$2")));
                });
                return str;
            }
        },
        urlencode: {
            url: function (pChoice) {
                var inputEle = document.getElementById('content');
                var outputEle = document.getElementById('result');
                var z='D2BBB6A18140C6DF814181428143CDF2D5C9C8FDC9CFCFC2D8A2B2BBD3EB8144D8A4B3F38145D7A8C7D2D8A7CAC08146C7F0B1FBD2B5B4D4B6ABCBBFD8A9814781488149B6AA814AC1BDD1CF814BC9A5D8AD814CB8F6D1BEE3DCD6D0814D814EB7E1814FB4AE8150C1D98151D8BC8152CDE8B5A4CEAAD6F78153C0F6BED9D8AF815481558156C4CB8157BEC38158D8B1C3B4D2E58159D6AECEDAD5A7BAF5B7A6C0D6815AC6B9C5D2C7C7815BB9D4815CB3CBD2D2815D815ED8BFBEC5C6F2D2B2CFB0CFE7815F816081618162CAE981638164D8C081658166816781688169816AC2F2C2D2816BC8E9816C816D816E816F817081718172817381748175C7AC8176817781788179817A817B817CC1CB817DD3E8D5F9817ECAC2B6FED8A1D3DABFF78180D4C6BBA5D8C1CEE5BEAE81818182D8A88183D1C7D0A9818481858186D8BDD9EFCDF6BFBA8187BDBBBAA5D2E0B2FABAE0C4B68188CFEDBEA9CDA4C1C18189818A818BC7D7D9F1818CD9F4818D818E818F8190C8CBD8E9819181928193D2DACAB2C8CAD8ECD8EAD8C6BDF6C6CDB3F08194D8EBBDF1BDE98195C8D4B4D381968197C2D88198B2D6D7D0CACBCBFBD5CCB8B6CFC98199819A819BD9DAD8F0C7AA819CD8EE819DB4FAC1EED2D4819E819FD8ED81A0D2C7D8EFC3C781A181A281A3D1F681A4D6D9D8F281A5D8F5BCFEBCDB81A681A781A8C8CE81A9B7DD81AAB7C281ABC6F381AC81AD81AE81AF81B081B181B2D8F8D2C181B381B4CEE9BCBFB7FCB7A5D0DD81B581B681B781B881B9D6DAD3C5BBEFBBE1D8F181BA81BBC9A1CEB0B4AB81BCD8F381BDC9CBD8F6C2D7D8F781BE81BFCEB1D8F981C081C181C2B2AEB9C081C3D9A381C4B0E981C5C1E681C6C9EC81C7CBC581C8CBC6D9A481C981CA81CB81CC81CDB5E881CE81CFB5AB81D081D181D281D381D481D5CEBBB5CDD7A1D7F4D3D381D6CCE581D7BACE81D8D9A2D9DCD3E0D8FDB7F0D7F7D8FED8FAD9A1C4E381D981DAD3B6D8F4D9DD81DBD8FB81DCC5E581DD81DEC0D081DF81E0D1F0B0DB81E181E2BCD1D9A681E3D9A581E481E581E681E7D9ACD9AE81E8D9ABCAB981E981EA81EBD9A9D6B681EC81ED81EEB3DED9A881EFC0FD81F0CACC81F1D9AA81F2D9A781F381F4D9B081F581F6B6B181F781F881F9B9A981FAD2C081FB81FCCFC081FD81FEC2C28240BDC4D5ECB2E0C7C8BFEBD9AD8241D9AF8242CEEABAEE82438244824582468247C7D682488249824A824B824C824D824E824F8250B1E3825182528253B4D9B6EDD9B48254825582568257BFA182588259825AD9DEC7CEC0FED9B8825B825C825D825E825FCBD7B7FD8260D9B58261D9B7B1A3D3E1D9B98262D0C58263D9B682648265D9B18266D9B2C1A9D9B382678268BCF3D0DEB8A98269BEE3826AD9BD826B826C826D826ED9BA826FB0B3827082718272D9C28273827482758276827782788279827A827B827C827D827E8280D9C4B1B68281D9BF82828283B5B98284BEF3828582868287CCC8BAF2D2D08288D9C38289828ABDE8828BB3AB828C828D828ED9C5BEEB828FD9C6D9BBC4DF8290D9BED9C1D9C0829182928293829482958296829782988299829A829BD5AE829CD6B5829DC7E3829E829F82A082A1D9C882A282A382A4BCD9D9CA82A582A682A7D9BC82A8D9CBC6AB82A982AA82AB82AC82ADD9C982AE82AF82B082B1D7F682B2CDA382B382B482B582B682B782B882B982BABDA182BB82BC82BD82BE82BF82C0D9CC82C182C282C382C482C582C682C782C882C9C5BCCDB582CA82CB82CCD9CD82CD82CED9C7B3A5BFFE82CF82D082D182D2B8B582D382D4C0FC82D582D682D782D8B0F882D982DA82DB82DC82DD82DE82DF82E082E182E282E382E482E582E682E782E882E982EA82EB82EC82EDB4F682EED9CE82EFD9CFB4A2D9D082F082F1B4DF82F282F382F482F582F6B0C182F782F882F982FA82FB82FC82FDD9D1C9B582FE8340834183428343834483458346834783488349834A834B834C834D834E834F83508351CFF1835283538354835583568357D9D283588359835AC1C5835B835C835D835E835F836083618362836383648365D9D6C9AE8366836783688369D9D5D9D4D9D7836A836B836C836DCBDB836EBDA9836F8370837183728373C6A7837483758376837783788379837A837B837C837DD9D3D9D8837E83808381D9D9838283838384838583868387C8E583888389838A838B838C838D838E838F839083918392839383948395C0DC8396839783988399839A839B839C839D839E839F83A083A183A283A383A483A583A683A783A883A983AA83AB83AC83AD83AE83AF83B083B183B2B6F9D8A3D4CA83B3D4AAD0D6B3E4D5D783B4CFC8B9E283B5BFCB83B6C3E283B783B883B9B6D283BA83BBCDC3D9EED9F083BC83BD83BEB5B383BFB6B583C083C183C283C383C4BEA483C583C6C8EB83C783C8C8AB83C983CAB0CBB9ABC1F9D9E283CBC0BCB9B283CCB9D8D0CBB1F8C6E4BEDFB5E4D7C883CDD1F8BCE6CADE83CE83CFBCBDD9E6D8E783D083D1C4DA83D283D3B8D4C8BD83D483D5B2E1D4D983D683D783D883D9C3B083DA83DBC3E1DAA2C8DF83DCD0B483DDBEFCC5A983DE83DF83E0B9DA83E1DAA383E2D4A9DAA483E383E483E583E683E7D9FBB6AC83E883E9B7EBB1F9D9FCB3E5BEF683EABFF6D2B1C0E483EB83EC83EDB6B3D9FED9FD83EE83EFBEBB83F083F183F2C6E083F3D7BCDAA183F4C1B983F5B5F2C1E883F683F7BCF583F8B4D583F983FA83FB83FC83FD83FE844084418442C1DD8443C4FD84448445BCB8B7B284468447B7EF84488449844A844B844C844DD9EC844EC6BE844FBFADBBCB84508451B5CA8452DBC9D0D78453CDB9B0BCB3F6BBF7DBCABAAF8454D4E4B5B6B5F3D8D6C8D084558456B7D6C7D0D8D78457BFAF84588459DBBBD8D8845A845BD0CCBBAE845C845D845EEBBEC1D0C1F5D4F2B8D5B4B4845FB3F584608461C9BE846284638464C5D0846584668467C5D9C0FB8468B1F08469D8D9B9CE846AB5BD846B846CD8DA846D846ED6C6CBA2C8AFC9B2B4CCBFCC846FB9F48470D8DBD8DCB6E7BCC1CCEA847184728473847484758476CFF78477D8DDC7B084788479B9D0BDA3847A847BCCDE847CC6CA847D847E848084818482D8E08483D8DE84848485D8DF848684878488B0FE8489BEE7848ACAA3BCF4848B848C848D848EB8B1848F8490B8EE849184928493849484958496849784988499849AD8E2849BBDCB849CD8E4D8E3849D849E849F84A084A1C5FC84A284A384A484A584A684A784A8D8E584A984AAD8E684AB84AC84AD84AE84AF84B084B1C1A684B2C8B0B0ECB9A6BCD3CEF1DBBDC1D384B384B484B584B6B6AFD6FAC5ACBDD9DBBEDBBF84B784B884B9C0F8BEA2C0CD84BA84BB84BC84BD84BE84BF84C084C184C284C3DBC0CAC684C484C584C6B2AA84C784C884C9D3C284CAC3E384CBD1AB84CC84CD84CE84CFDBC284D0C0D584D184D284D3DBC384D4BFB184D584D684D784D884D984DAC4BC84DB84DC84DD84DEC7DA84DF84E084E184E284E384E484E584E684E784E884E9DBC484EA84EB84EC84ED84EE84EF84F084F1D9E8C9D784F284F384F4B9B4CEF0D4C884F584F684F784F8B0FCB4D284F9D0D984FA84FB84FC84FDD9E984FEDECBD9EB8540854185428543D8B0BBAFB1B18544B3D7D8CE85458546D4D185478548BDB3BFEF8549CFBB854A854BD8D0854C854D854EB7CB854F85508551D8D185528553855485558556855785588559855A855BC6A5C7F8D2BD855C855DD8D2C4E4855ECAAE855FC7A78560D8A68561C9FDCEE7BBDCB0EB856285638564BBAAD0AD8565B1B0D7E4D7BF8566B5A5C2F4C4CF85678568B2A98569B2B7856AB1E5DFB2D5BCBFA8C2ACD8D5C2B1856BD8D4CED4856CDAE0856DCEC0856E856FD8B4C3AED3A1CEA38570BCB4C8B4C2D18571BEEDD0B68572DAE18573857485758576C7E485778578B3A78579B6F2CCFCC0FA857A857BC0F7857CD1B9D1E1D8C7857D857E85808581858285838584B2DE85858586C0E58587BAF185888589D8C8858AD4AD858B858CCFE1D8C9858DD8CACFC3858EB3F8BEC7858F859085918592D8CB8593859485958596859785988599DBCC859A859B859C859DC8A5859E859F85A0CFD885A1C8FEB2CE85A285A385A485A585A6D3D6B2E6BCB0D3D1CBABB7B485A785A885A9B7A285AA85ABCAE585ACC8A1CADCB1E4D0F085ADC5D185AE85AF85B0DBC5B5FE85B185B2BFDAB9C5BEE4C1ED85B3DFB6DFB5D6BBBDD0D5D9B0C8B6A3BFC9CCA8DFB3CAB7D3D285B4D8CFD2B6BAC5CBBECCBE85B5DFB7B5F0DFB485B685B785B8D3F585B9B3D4B8F785BADFBA85BBBACFBCAAB5F585BCCDACC3FBBAF3C0F4CDC2CFF2DFB8CFC585BDC2C0DFB9C2F085BE85BF85C0BEFD85C1C1DFCDCCD2F7B7CDDFC185C2DFC485C385C4B7F1B0C9B6D6B7D485C5BAACCCFDBFD4CBB1C6F485C6D6A8DFC585C7CEE2B3B385C885C9CEFCB4B585CACEC7BAF085CBCEE185CCD1BD85CD85CEDFC085CF85D0B4F485D1B3CA85D2B8E6DFBB85D385D485D585D6C4C585D7DFBCDFBDDFBEC5BBDFBFDFC2D4B1DFC385D8C7BACED885D985DA85DB85DC85DDC4D885DEDFCA85DFDFCF85E0D6DC85E185E285E385E485E585E685E785E8DFC9DFDACEB685E9BAC7DFCEDFC8C5DE85EA85EBC9EBBAF4C3FC85EC85EDBED785EEDFC685EFDFCD85F0C5D885F185F285F385F4D5A6BACD85F5BECCD3BDB8C085F6D6E485F7DFC7B9BEBFA785F885F9C1FCDFCBDFCC85FADFD085FB85FC85FD85FE8640DFDBDFE58641DFD7DFD6D7C9DFE3DFE4E5EBD2A7DFD28642BFA98643D4DB8644BFC8DFD4864586468647CFCC86488649DFDD864AD1CA864BDFDEB0A7C6B7DFD3864CBAE5864DB6DFCDDBB9FED4D5864E864FDFDFCFECB0A5DFE7DFD1D1C6DFD5DFD8DFD9DFDC8650BBA98651DFE0DFE18652DFE2DFE6DFE8D3B486538654865586568657B8E7C5B6DFEAC9DAC1A8C4C486588659BFDECFF8865A865B865CD5DCDFEE865D865E865F866086618662B2B88663BADFDFEC8664DBC18665D1E48666866786688669CBF4B4BD866AB0A6866B866C866D866E866FDFF1CCC6DFF286708671DFED867286738674867586768677DFE986788679867A867BDFEB867CDFEFDFF0BBBD867D867EDFF386808681DFF48682BBA38683CADBCEA8E0A7B3AA8684E0A6868586868687E0A186888689868A868BDFFE868CCDD9DFFC868DDFFA868EBFD0D7C4868FC9CC86908691DFF8B0A186928693869486958696DFFD869786988699869ADFFBE0A2869B869C869D869E869FE0A886A086A186A286A3B7C886A486A5C6A1C9B6C0B2DFF586A686A7C5BE86A8D8C4DFF9C4F686A986AA86AB86AC86AD86AEE0A3E0A4E0A5D0A586AF86B0E0B4CCE486B1E0B186B2BFA6E0AFCEB9E0ABC9C686B386B4C0AEE0AEBAEDBAB0E0A986B586B686B7DFF686B8E0B386B986BAE0B886BB86BC86BDB4ADE0B986BE86BFCFB2BAC886C0E0B086C186C286C386C486C586C686C7D0FA86C886C986CA86CB86CC86CD86CE86CF86D0E0AC86D1D4FB86D2DFF786D3C5E786D4E0AD86D5D3F786D6E0B6E0B786D786D886D986DA86DBE0C4D0E186DC86DD86DEE0BC86DF86E0E0C9E0CA86E186E286E3E0BEE0AAC9A4E0C186E4E0B286E586E686E786E886E9CAC8E0C386EAE0B586EBCECB86ECCBC3E0CDE0C6E0C286EDE0CB86EEE0BAE0BFE0C086EF86F0E0C586F186F2E0C7E0C886F3E0CC86F4E0BB86F586F686F786F886F9CBD4E0D586FAE0D6E0D286FB86FC86FD86FE87408741E0D0BCCE87428743E0D18744B8C2D8C587458746874787488749874A874B874CD0EA874D874EC2EF874F8750E0CFE0BD875187528753E0D4E0D387548755E0D78756875787588759E0DCE0D8875A875B875CD6F6B3B0875DD7EC875ECBBB875F8760E0DA8761CEFB876287638764BAD987658766876787688769876A876B876C876D876E876F8770E0E1E0DDD2AD87718772877387748775E0E287768777E0DBE0D9E0DF87788779E0E0877A877B877C877D877EE0DE8780E0E4878187828783C6F7D8ACD4EBE0E6CAC98784878587868787E0E587888789878A878BB8C1878C878D878E878FE0E7E0E887908791879287938794879587968797E0E9E0E387988799879A879B879C879D879EBABFCCE7879F87A087A1E0EA87A287A387A487A587A687A787A887A987AA87AB87AC87AD87AE87AF87B0CFF987B187B287B387B487B587B687B787B887B987BA87BBE0EB87BC87BD87BE87BF87C087C187C2C8C287C387C487C587C6BDC087C787C887C987CA87CB87CC87CD87CE87CF87D087D187D287D3C4D287D487D587D687D787D887D987DA87DB87DCE0EC87DD87DEE0ED87DF87E0C7F4CBC487E1E0EEBBD8D8B6D2F2E0EFCDC587E2B6DA87E387E487E587E687E787E8E0F187E9D4B087EA87EBC0A7B4D187EC87EDCEA7E0F087EE87EF87F0E0F2B9CC87F187F2B9FACDBCE0F387F387F487F5C6D4E0F487F6D4B287F7C8A6E0F6E0F587F887F987FA87FB87FC87FD87FE8840884188428843884488458846884788488849E0F7884A884BCDC1884C884D884ECAA5884F885088518852D4DADBD7DBD98853DBD8B9E7DBDCDBDDB5D888548855DBDA8856885788588859885ADBDBB3A1DBDF885B885CBBF8885DD6B7885EDBE0885F886088618862BEF988638864B7BB8865DBD0CCAEBFB2BBB5D7F8BFD38866886788688869886ABFE9886B886CBCE1CCB3DBDEB0D3CEEBB7D8D7B9C6C2886D886EC0A4886FCCB98870DBE7DBE1C6BADBE38871DBE88872C5F7887388748875DBEA88768877DBE9BFC088788879887ADBE6DBE5887B887C887D887E8880B4B9C0ACC2A2DBE2DBE48881888288838884D0CDDBED88858886888788888889C0DDDBF2888A888B888C888D888E888F8890B6E28891889288938894DBF3DBD2B9B8D4ABDBEC8895BFD1DBF08896DBD18897B5E68898DBEBBFE58899889A889BDBEE889CDBF1889D889E889FDBF988A088A188A288A388A488A588A688A788A8B9A1B0A388A988AA88AB88AC88AD88AE88AFC2F188B088B1B3C7DBEF88B288B3DBF888B4C6D2DBF488B588B6DBF5DBF7DBF688B788B8DBFE88B9D3F2B2BA88BA88BB88BCDBFD88BD88BE88BF88C088C188C288C388C4DCA488C5DBFB88C688C788C888C9DBFA88CA88CB88CCDBFCC5E0BBF988CD88CEDCA388CF88D0DCA588D1CCC388D288D388D4B6D1DDC088D588D688D7DCA188D8DCA288D988DA88DBC7B588DC88DD88DEB6E988DF88E088E1DCA788E288E388E488E5DCA688E6DCA9B1A488E788E8B5CC88E988EA88EB88EC88EDBFB088EE88EF88F088F188F2D1DF88F388F488F588F6B6C288F788F888F988FA88FB88FC88FD88FE894089418942894389448945DCA88946894789488949894A894B894CCBFAEBF3894D894E894FCBDC89508951CBFE895289538954CCC189558956895789588959C8FB895A895B895C895D895E895FDCAA89608961896289638964CCEEDCAB89658966896789688969896A896B896C896D896E896F897089718972897389748975DBD38976DCAFDCAC8977BEB38978CAFB8979897A897BDCAD897C897D897E89808981898289838984C9CAC4B989858986898789888989C7BDDCAE898A898B898CD4F6D0E6898D898E898F89908991899289938994C4ABB6D589958996899789988999899A899B899C899D899E899F89A089A189A289A389A489A589A6DBD489A789A889A989AAB1DA89AB89AC89ADDBD589AE89AF89B089B189B289B389B489B589B689B789B8DBD689B989BA89BBBABE89BC89BD89BE89BF89C089C189C289C389C489C589C689C789C889C9C8C089CA89CB89CC89CD89CE89CFCABFC8C989D0D7B389D1C9F989D289D3BFC789D489D5BAF889D689D7D2BC89D889D989DA89DB89DC89DD89DE89DFE2BA89E0B4A689E189E2B1B889E389E489E589E689E7B8B489E8CFC489E989EA89EB89ECD9E7CFA6CDE289ED89EED9EDB6E089EFD2B989F089F1B9BB89F289F389F489F5E2B9E2B789F6B4F389F7CCECCCABB7F289F8D8B2D1EBBABB89F9CAA789FA89FBCDB789FC89FDD2C4BFE4BCD0B6E189FEDEC58A408A418A428A43DEC6DBBC8A44D1D98A458A46C6E6C4CEB7EE8A47B7DC8A488A49BFFCD7E08A4AC6F58A4B8A4CB1BCDEC8BDB1CCD7DECA8A4DDEC98A4E8A4F8A508A518A52B5EC8A53C9DD8A548A55B0C28A568A578A588A598A5A8A5B8A5C8A5D8A5E8A5F8A608A618A62C5AEC5AB8A63C4CC8A64BCE9CBFD8A658A668A67BAC38A688A698A6AE5F9C8E7E5FACDFD8A6BD7B1B8BEC2E88A6CC8D18A6D8A6EE5FB8A6F8A708A718A72B6CABCCB8A738A74D1FDE6A18A75C3EE8A768A778A788A79E6A48A7A8A7B8A7C8A7DE5FEE6A5CDD78A7E8A80B7C1E5FCE5FDE6A38A818A82C4DDE6A88A838A84E6A78A858A868A878A888A898A8AC3C38A8BC6DE8A8C8A8DE6AA8A8E8A8F8A908A918A928A938A94C4B78A958A968A97E6A2CABC8A988A998A9A8A9BBDE3B9C3E6A6D0D5CEAF8A9C8A9DE6A9E6B08A9ED2A68A9FBDAAE6AD8AA08AA18AA28AA38AA4E6AF8AA5C0D18AA68AA7D2CC8AA88AA98AAABCA78AAB8AAC8AAD8AAE8AAF8AB08AB18AB28AB38AB48AB58AB6E6B18AB7D2F68AB88AB98ABAD7CB8ABBCDFE8ABCCDDEC2A6E6ABE6ACBDBFE6AEE6B38ABD8ABEE6B28ABF8AC08AC18AC2E6B68AC3E6B88AC48AC58AC68AC7C4EF8AC88AC98ACAC4C88ACB8ACCBEEAC9EF8ACD8ACEE6B78ACFB6F08AD08AD18AD2C3E48AD38AD48AD58AD68AD78AD88AD9D3E9E6B48ADAE6B58ADBC8A28ADC8ADD8ADE8ADF8AE0E6BD8AE18AE28AE3E6B98AE48AE58AE68AE78AE8C6C58AE98AEACDF1E6BB8AEB8AEC8AED8AEE8AEF8AF08AF18AF28AF38AF4E6BC8AF58AF68AF78AF8BBE98AF98AFA8AFB8AFC8AFD8AFE8B40E6BE8B418B428B438B44E6BA8B458B46C0B78B478B488B498B4A8B4B8B4C8B4D8B4E8B4FD3A4E6BFC9F4E6C38B508B51E6C48B528B538B548B55D0F68B568B578B588B598B5A8B5B8B5C8B5D8B5E8B5F8B608B618B628B638B648B658B668B67C3BD8B688B698B6A8B6B8B6C8B6D8B6EC3C4E6C28B6F8B708B718B728B738B748B758B768B778B788B798B7A8B7B8B7CE6C18B7D8B7E8B808B818B828B838B84E6C7CFB18B85EBF48B868B87E6CA8B888B898B8A8B8B8B8CE6C58B8D8B8EBCDEC9A98B8F8B908B918B928B938B94BCB58B958B96CFD38B978B988B998B9A8B9BE6C88B9CE6C98B9DE6CE8B9EE6D08B9F8BA08BA1E6D18BA28BA38BA4E6CBB5D58BA5E6CC8BA68BA7E6CF8BA88BA9C4DB8BAAE6C68BAB8BAC8BAD8BAE8BAFE6CD8BB08BB18BB28BB38BB48BB58BB68BB78BB88BB98BBA8BBB8BBC8BBD8BBE8BBF8BC08BC18BC28BC38BC48BC58BC6E6D28BC78BC88BC98BCA8BCB8BCC8BCD8BCE8BCF8BD08BD18BD2E6D4E6D38BD38BD48BD58BD68BD78BD88BD98BDA8BDB8BDC8BDD8BDE8BDF8BE08BE18BE28BE38BE48BE58BE68BE78BE88BE98BEA8BEB8BECE6D58BEDD9F88BEE8BEFE6D68BF08BF18BF28BF38BF48BF58BF68BF7E6D78BF88BF98BFA8BFB8BFC8BFD8BFE8C408C418C428C438C448C458C468C47D7D3E6DD8C48E6DEBFD7D4D08C49D7D6B4E6CBEFE6DAD8C3D7CED0A28C4AC3CF8C4B8C4CE6DFBCBEB9C2E6DBD1A78C4D8C4EBAA2C2CF8C4FD8AB8C508C518C52CAEBE5EE8C53E6DC8C54B7F58C558C568C578C58C8E68C598C5AC4F58C5B8C5CE5B2C4FE8C5DCBFCE5B3D5AC8C5ED3EECAD8B0B28C5FCBCECDEA8C608C61BAEA8C628C638C64E5B58C65E5B48C66D7DAB9D9D6E6B6A8CDF0D2CBB1A6CAB58C67B3E8C9F3BFCDD0FBCAD2E5B6BBC28C688C698C6ACFDCB9AC8C6B8C6C8C6D8C6ED4D78C6F8C70BAA6D1E7CFFCBCD28C71E5B7C8DD8C728C738C74BFEDB1F6CBDE8C758C76BCC58C77BCC4D2FAC3DCBFDC8C788C798C7A8C7BB8BB8C7C8C7D8C7EC3C28C80BAAED4A28C818C828C838C848C858C868C878C888C89C7DEC4AFB2EC8C8AB9D18C8B8C8CE5BBC1C88C8D8C8ED5AF8C8F8C908C918C928C93E5BC8C94E5BE8C958C968C978C988C998C9A8C9BB4E7B6D4CBC2D1B0B5BC8C9C8C9DCAD98C9EB7E28C9F8CA0C9E48CA1BDAB8CA28CA3CEBED7F08CA48CA58CA68CA7D0A18CA8C9D98CA98CAAB6FBE6D8BCE28CABB3BE8CACC9D08CADE6D9B3A28CAE8CAF8CB08CB1DECC8CB2D3C8DECD8CB3D2A28CB48CB58CB68CB7DECE8CB88CB98CBA8CBBBECD8CBC8CBDDECF8CBE8CBF8CC0CAACD2FCB3DFE5EAC4E1BEA1CEB2C4F2BED6C6A8B2E38CC18CC2BED38CC38CC4C7FCCCEBBDECCEDD8CC58CC6CABAC6C1E5ECD0BC8CC78CC88CC9D5B98CCA8CCB8CCCE5ED8CCD8CCE8CCF8CD0CAF48CD1CDC0C2C58CD2E5EF8CD3C2C4E5F08CD48CD58CD68CD78CD88CD98CDAE5F8CDCD8CDBC9BD8CDC8CDD8CDE8CDF8CE08CE18CE2D2D9E1A88CE38CE48CE58CE6D3EC8CE7CBEAC6F18CE88CE98CEA8CEB8CECE1AC8CED8CEE8CEFE1A7E1A98CF08CF1E1AAE1AF8CF28CF3B2ED8CF4E1ABB8DAE1ADE1AEE1B0B5BAE1B18CF58CF68CF78CF88CF9E1B3E1B88CFA8CFB8CFC8CFD8CFED1D28D40E1B6E1B5C1EB8D418D428D43E1B78D44D4C08D45E1B28D46E1BAB0B68D478D488D498D4AE1B48D4BBFF98D4CE1B98D4D8D4EE1BB8D4F8D508D518D528D538D54E1BE8D558D568D578D588D598D5AE1BC8D5B8D5C8D5D8D5E8D5F8D60D6C58D618D628D638D648D658D668D67CFBF8D688D69E1BDE1BFC2CD8D6AB6EB8D6BD3F88D6C8D6DC7CD8D6E8D6FB7E58D708D718D728D738D748D758D768D778D788D79BEFE8D7A8D7B8D7C8D7D8D7E8D80E1C0E1C18D818D82E1C7B3E78D838D848D858D868D878D88C6E98D898D8A8D8B8D8C8D8DB4DE8D8ED1C28D8F8D908D918D92E1C88D938D94E1C68D958D968D978D988D99E1C58D9AE1C3E1C28D9BB1C08D9C8D9D8D9ED5B8E1C48D9F8DA08DA18DA28DA3E1CB8DA48DA58DA68DA78DA88DA98DAA8DABE1CCE1CA8DAC8DAD8DAE8DAF8DB08DB18DB28DB3EFFA8DB48DB5E1D3E1D2C7B68DB68DB78DB88DB98DBA8DBB8DBC8DBD8DBE8DBF8DC0E1C98DC18DC2E1CE8DC3E1D08DC48DC58DC68DC78DC88DC98DCA8DCB8DCC8DCD8DCEE1D48DCFE1D1E1CD8DD08DD1E1CF8DD28DD38DD48DD5E1D58DD68DD78DD88DD98DDA8DDB8DDC8DDD8DDE8DDF8DE08DE18DE2E1D68DE38DE48DE58DE68DE78DE88DE98DEA8DEB8DEC8DED8DEE8DEF8DF08DF18DF28DF38DF48DF58DF68DF78DF8E1D78DF98DFA8DFBE1D88DFC8DFD8DFE8E408E418E428E438E448E458E468E478E488E498E4A8E4B8E4C8E4D8E4E8E4F8E508E518E528E538E548E55E1DA8E568E578E588E598E5A8E5B8E5C8E5D8E5E8E5F8E608E618E62E1DB8E638E648E658E668E678E688E69CEA18E6A8E6B8E6C8E6D8E6E8E6F8E708E718E728E738E748E758E76E7DD8E77B4A8D6DD8E788E79D1B2B3B28E7A8E7BB9A4D7F3C7C9BEDEB9AE8E7CCED78E7D8E7EB2EEDBCF8E80BCBAD2D1CBC8B0CD8E818E82CFEF8E838E848E858E868E87D9E3BDED8E888E89B1D2CAD0B2BC8E8ACBA7B7AB8E8BCAA68E8C8E8D8E8ECFA38E8F8E90E0F8D5CAE0FB8E918E92E0FAC5C1CCFB8E93C1B1E0F9D6E3B2AFD6C4B5DB8E948E958E968E978E988E998E9A8E9BB4F8D6A18E9C8E9D8E9E8E9F8EA0CFAFB0EF8EA18EA2E0FC8EA38EA48EA58EA68EA7E1A1B3A38EA88EA9E0FDE0FEC3B18EAA8EAB8EAC8EADC3DD8EAEE1A2B7F98EAF8EB08EB18EB28EB38EB4BBCF8EB58EB68EB78EB88EB98EBA8EBBE1A3C4BB8EBC8EBD8EBE8EBF8EC0E1A48EC18EC2E1A58EC38EC4E1A6B4B18EC58EC68EC78EC88EC98ECA8ECB8ECC8ECD8ECE8ECF8ED08ED18ED28ED3B8C9C6BDC4EA8ED4B2A28ED5D0D28ED6E7DBBBC3D3D7D3C48ED7B9E3E2CF8ED88ED98EDAD7AF8EDBC7ECB1D38EDC8EDDB4B2E2D18EDE8EDF8EE0D0F2C2AEE2D08EE1BFE2D3A6B5D7E2D2B5EA8EE2C3EDB8FD8EE3B8AE8EE4C5D3B7CFE2D48EE58EE68EE78EE8E2D3B6C8D7F98EE98EEA8EEB8EEC8EEDCDA58EEE8EEF8EF08EF18EF2E2D88EF3E2D6CAFCBFB5D3B9E2D58EF48EF58EF68EF7E2D78EF88EF98EFA8EFB8EFC8EFD8EFE8F408F418F42C1AEC0C88F438F448F458F468F478F48E2DBE2DAC0AA8F498F4AC1CE8F4B8F4C8F4D8F4EE2DC8F4F8F508F518F528F538F548F558F568F578F588F598F5AE2DD8F5BE2DE8F5C8F5D8F5E8F5F8F608F618F628F638F64DBC88F65D1D3CDA28F668F67BDA88F688F698F6ADEC3D8A5BFAADBCDD2ECC6FAC5AA8F6B8F6C8F6DDEC48F6EB1D7DFAE8F6F8F708F71CABD8F72DFB18F73B9AD8F74D2FD8F75B8A5BAEB8F768F77B3DA8F788F798F7AB5DCD5C58F7B8F7C8F7D8F7EC3D6CFD2BBA18F80E5F3E5F28F818F82E5F48F83CDE48F84C8F58F858F868F878F888F898F8A8F8BB5AFC7BF8F8CE5F68F8D8F8E8F8FECB08F908F918F928F938F948F958F968F978F988F998F9A8F9B8F9C8F9D8F9EE5E68F9FB9E9B5B18FA0C2BCE5E8E5E7E5E98FA18FA28FA38FA4D2CD8FA58FA68FA7E1EAD0CE8FA8CDAE8FA9D1E58FAA8FABB2CAB1EB8FACB1F2C5ED8FAD8FAED5C3D3B08FAFE1DC8FB08FB18FB2E1DD8FB3D2DB8FB4B3B9B1CB8FB58FB68FB7CDF9D5F7E1DE8FB8BEB6B4FD8FB9E1DFBADCE1E0BBB2C2C9E1E18FBA8FBB8FBCD0EC8FBDCDBD8FBE8FBFE1E28FC0B5C3C5C7E1E38FC18FC2E1E48FC38FC48FC58FC6D3F98FC78FC88FC98FCA8FCB8FCCE1E58FCDD1AD8FCE8FCFE1E6CEA28FD08FD18FD28FD38FD48FD5E1E78FD6B5C28FD78FD88FD98FDAE1E8BBD58FDB8FDC8FDD8FDE8FDFD0C4E2E0B1D8D2E48FE08FE1E2E18FE28FE3BCC9C8CC8FE4E2E3ECFEECFDDFAF8FE58FE68FE7E2E2D6BECDFCC3A68FE88FE98FEAE3C38FEB8FECD6D2E2E78FED8FEEE2E88FEF8FF0D3C78FF18FF2E2ECBFEC8FF3E2EDE2E58FF48FF5B3C08FF68FF78FF8C4EE8FF98FFAE2EE8FFB8FFCD0C38FFDBAF6E2E9B7DEBBB3CCACCBCBE2E4E2E6E2EAE2EB8FFE90409041E2F790429043E2F4D4F5E2F390449045C5AD9046D5FAC5C2B2C090479048E2EF9049E2F2C1AFCBBC904A904BB5A1E2F9904C904D904EBCB1E2F1D0D4D4B9E2F5B9D6E2F6904F90509051C7D390529053905490559056E2F0905790589059905A905BD7DCEDA1905C905DE2F8905EEDA5E2FECAD1905F906090619062906390649065C1B59066BBD090679068BFD69069BAE3906A906BCBA1906C906D906EEDA6EDA3906F9070EDA29071907290739074BBD6EDA7D0F490759076EDA4BADEB6F7E3A1B6B2CCF1B9A79077CFA2C7A190789079BFD2907A907BB6F1907CE2FAE2FBE2FDE2FCC4D5E3A2907DD3C1907E90809081E3A7C7C49082908390849085CFA490869087E3A9BAB790889089908A908BE3A8908CBBDA908DE3A3908E908F9090E3A4E3AA9091E3A69092CEF2D3C690939094BBBC90959096D4C39097C4FA90989099EDA8D0FCE3A5909AC3F5909BE3ADB1AF909CE3B2909D909E909FBCC290A090A1E3ACB5BF90A290A390A490A590A690A790A890A9C7E9E3B090AA90AB90ACBEAACDEF90AD90AE90AF90B090B1BBF390B290B390B4CCE890B590B6E3AF90B7E3B190B8CFA7E3AE90B9CEA9BBDD90BA90BB90BC90BD90BEB5EBBEE5B2D2B3CD90BFB1B9E3ABB2D1B5ACB9DFB6E890C090C1CFEBE3B790C2BBCC90C390C4C8C7D0CA90C590C690C790C890C9E3B8B3EE90CA90CB90CC90CDEDA990CED3FAD3E490CF90D090D1EDAAE3B9D2E290D290D390D490D590D6E3B590D790D890D990DAD3DE90DB90DC90DD90DEB8D0E3B390DF90E0E3B6B7DF90E1E3B4C0A290E290E390E4E3BA90E590E690E790E890E990EA90EB90EC90ED90EE90EF90F090F190F290F390F490F590F690F7D4B890F890F990FA90FB90FC90FD90FE9140B4C89141E3BB9142BBC59143C9F791449145C9E5914691479148C4BD9149914A914B914C914D914E914FEDAB9150915191529153C2FD9154915591569157BBDBBFAE91589159915A915B915C915D915ECEBF915F916091619162E3BC9163BFB6916491659166916791689169916A916B916C916D916E916F9170917191729173917491759176B1EF91779178D4F79179917A917B917C917DE3BE917E9180918191829183918491859186EDAD918791889189918A918B918C918D918E918FE3BFBAA9EDAC91909191E3BD91929193919491959196919791989199919A919BE3C0919C919D919E919F91A091A1BAB691A291A391A4B6AE91A591A691A791A891A9D0B891AAB0C3EDAE91AB91AC91AD91AE91AFEDAFC0C191B0E3C191B191B291B391B491B591B691B791B891B991BA91BB91BC91BD91BE91BF91C091C1C5B391C291C391C491C591C691C791C891C991CA91CB91CC91CD91CE91CFE3C291D091D191D291D391D491D591D691D791D8DCB291D991DA91DB91DC91DD91DEEDB091DFB8EA91E0CEECEAA7D0E7CAF9C8D6CFB7B3C9CED2BDE491E191E2E3DEBBF2EAA8D5BD91E3C6DDEAA991E491E591E6EAAA91E7EAACEAAB91E8EAAEEAAD91E991EA91EB91ECBDD891EDEAAF91EEC2BE91EF91F091F191F2B4C1B4F791F391F4BBA791F591F691F791F891F9ECE6ECE5B7BFCBF9B1E291FAECE791FB91FC91FDC9C8ECE8ECE991FECAD6DED0B2C5D4FA92409241C6CBB0C7B4F2C8D3924292439244CDD092459246BFB8924792489249924A924B924C924DBFDB924E924FC7A4D6B49250C0A9DED1C9A8D1EFC5A4B0E7B3B6C8C592519252B0E292539254B7F692559256C5FA92579258B6F39259D5D2B3D0BCBC925A925B925CB3AD925D925E925F9260BEF1B0D1926192629263926492659266D2D6CAE3D7A59267CDB6B6B6BFB9D5DB9268B8A7C5D79269926A926BDED2BFD9C2D5C7C0926CBBA4B1A8926D926EC5EA926F9270C5FBCCA79271927292739274B1A7927592769277B5D692789279927AC4A8927BDED3D1BAB3E9927CC3F2927D927EB7F79280D6F4B5A3B2F0C4B4C4E9C0ADDED49281B0E8C5C4C1E09282B9D59283BEDCCDD8B0CE9284CDCFDED6BED0D7BEDED5D5D0B0DD92859286C4E292879288C2A3BCF09289D3B5C0B9C5A1B2A6D4F1928A928BC0A8CAC3DED7D5FC928CB9B0928DC8ADCBA9928EDED9BFBD928F929092919292C6B4D7A7CAB0C4C39293B3D6B9D29294929592969297D6B8EAFCB0B492989299929A929BBFE6929C929DCCF4929E929F92A092A1CDDA92A292A392A4D6BFC2CE92A5CECECCA2D0AEC4D3B5B2DED8D5F5BCB7BBD392A692A7B0A492A8C5B2B4EC92A992AA92ABD5F192AC92ADEAFD92AE92AF92B092B192B292B3DEDACDA692B492B5CDEC92B692B792B892B9CEE6DEDC92BACDB1C0A692BB92BCD7BD92BDDEDBB0C6BAB4C9D3C4F3BEE892BE92BF92C092C1B2B692C292C392C492C592C692C792C892C9C0CCCBF092CABCF1BBBBB5B792CB92CC92CDC5F592CEDEE692CF92D092D1DEE3BEDD92D292D3DEDF92D492D592D692D7B4B7BDDD92D892D9DEE0C4ED92DA92DB92DC92DDCFC692DEB5E092DF92E092E192E2B6DECADAB5F4DEE592E3D5C692E4DEE1CCCDC6FE92E5C5C592E692E792E8D2B492E9BEF292EA92EB92EC92ED92EE92EF92F0C2D392F1CCBDB3B892F2BDD392F3BFD8CDC6D1DAB4EB92F4DEE4DEDDDEE792F5EAFE92F692F7C2B0DEE292F892F9D6C0B5A792FAB2F492FBDEE892FCDEF292FD92FE934093419342DEED9343DEF193449345C8E0934693479348D7E1DEEFC3E8CCE19349B2E5934A934B934CD2BE934D934E934F9350935193529353DEEE9354DEEBCED59355B4A79356935793589359935ABFABBEBE935B935CBDD2935D935E935F9360DEE99361D4AE9362DEDE9363DEEA9364936593669367C0BF9368DEECB2F3B8E9C2A79369936ABDC1936B936C936D936E936FDEF5DEF893709371B2ABB4A493729373B4EAC9A6937493759376937793789379DEF6CBD1937AB8E3937BDEF7DEFA937C937D937E9380DEF9938193829383CCC29384B0E1B4EE93859386938793889389938AE5BA938B938C938D938E938FD0AF93909391B2EB9392EBA19393DEF493949395C9E3DEF3B0DAD2A1B1F79396CCAF939793989399939A939B939C939DDEF0939ECBA4939F93A093A1D5AA93A293A393A493A593A6DEFB93A793A893A993AA93AB93AC93AD93AEB4DD93AFC4A693B093B193B2DEFD93B393B493B593B693B793B893B993BA93BB93BCC3FEC4A1DFA193BD93BE93BF93C093C193C293C3C1CC93C4DEFCBEEF93C5C6B293C693C793C893C993CA93CB93CC93CD93CEB3C5C8F693CF93D0CBBADEFE93D193D2DFA493D393D493D593D6D7B293D793D893D993DA93DBB3B793DC93DD93DE93DFC1C393E093E1C7CBB2A5B4E993E2D7AB93E393E493E593E6C4EC93E7DFA2DFA393E8DFA593E9BAB393EA93EB93ECDFA693EDC0DE93EE93EFC9C393F093F193F293F393F493F593F6B2D9C7E693F7DFA793F8C7DC93F993FA93FB93FCDFA8EBA293FD93FE944094419442CBD3944394449445DFAA9446DFA99447B2C194489449944A944B944C944D944E944F9450945194529453945494559456945794589459945A945B945C945D945E945F9460C5CA94619462946394649465946694679468DFAB9469946A946B946C946D946E946F9470D4DC94719472947394749475C8C19476947794789479947A947B947C947D947E948094819482DFAC94839484948594869487BEF094889489DFADD6A7948A948B948C948DEAB7EBB6CAD5948ED8FCB8C4948FB9A594909491B7C5D5FE94929493949494959496B9CA94979498D0A7F4CD9499949AB5D0949B949CC3F4949DBEC8949E949F94A0EBB7B0BD94A194A2BDCC94A3C1B294A4B1D6B3A894A594A694A7B8D2C9A294A894A9B6D894AA94AB94AC94ADEBB8BEB494AE94AF94B0CAFD94B1C7C394B2D5FB94B394B4B7F394B594B694B794B894B994BA94BB94BC94BD94BE94BF94C094C194C294C3CEC494C494C594C6D5ABB1F394C794C894C9ECB3B0DF94CAECB594CB94CC94CDB6B794CEC1CF94CFF5FAD0B194D094D1D5E594D2CED394D394D4BDEFB3E294D5B8AB94D6D5B694D7EDBD94D8B6CF94D9CBB9D0C294DA94DB94DC94DD94DE94DF94E094E1B7BD94E294E3ECB6CAA994E494E594E6C5D494E7ECB9ECB8C2C3ECB794E894E994EA94EBD0FDECBA94ECECBBD7E594ED94EEECBC94EF94F094F1ECBDC6EC94F294F394F494F594F694F794F894F9CEDE94FABCC894FB94FCC8D5B5A9BEC9D6BCD4E794FD94FED1AED0F1EAB8EAB9EABABAB59540954195429543CAB1BFF595449545CDFA9546954795489549954AEAC0954BB0BAEABE954C954DC0A5954E954F9550EABB9551B2FD9552C3F7BBE8955395549555D2D7CEF4EABF955695579558EABC9559955A955BEAC3955CD0C7D3B3955D955E955F9560B4BA9561C3C1D7F29562956395649565D5D19566CAC79567EAC595689569EAC4EAC7EAC6956A956B956C956D956ED6E7956FCFD495709571EACB9572BBCE9573957495759576957795789579BDFAC9CE957A957BEACC957C957DC9B9CFFEEACAD4CEEACDEACF957E9580CDED9581958295839584EAC99585EACE95869587CEEE9588BBDE9589B3BF958A958B958C958D958EC6D5BEB0CEFA958F95909591C7E79592BEA7EAD095939594D6C7959595969597C1C095989599959AD4DD959BEAD1959C959DCFBE959E959F95A095A1EAD295A295A395A495A5CAEE95A695A795A895A9C5AFB0B595AA95AB95AC95AD95AEEAD495AF95B095B195B295B395B495B595B695B7EAD3F4DF95B895B995BA95BB95BCC4BA95BD95BE95BF95C095C1B1A995C295C395C495C5E5DF95C695C795C895C9EAD595CA95CB95CC95CD95CE95CF95D095D195D295D395D495D595D695D795D895D995DA95DB95DC95DD95DE95DF95E095E195E295E3CAEF95E4EAD6EAD7C6D895E595E695E795E895E995EA95EB95ECEAD895ED95EEEAD995EF95F095F195F295F395F4D4BB95F5C7FAD2B7B8FC95F695F7EAC295F8B2DC95F995FAC2FC95FBD4F8CCE6D7EE95FC95FD95FE9640964196429643D4C2D3D0EBC3C5F39644B7FE96459646EBD4964796489649CBB7EBDE964AC0CA964B964C964DCDFB964EB3AF964FC6DA965096519652965396549655EBFC9656C4BE9657CEB4C4A9B1BED4FD9658CAF59659D6EC965A965BC6D3B6E4965C965D965E965FBBFA96609661D0E096629663C9B19664D4D3C8A896659666B8CB9667E8BEC9BC96689669E8BB966AC0EED0D3B2C4B4E5966BE8BC966C966DD5C8966E966F967096719672B6C59673E8BDCAF8B8DCCCF5967496759676C0B496779678D1EEE8BFE8C29679967ABABC967BB1ADBDDC967CEABDE8C3967DE8C6967EE8CB9680968196829683E8CC9684CBC9B0E59685BCAB96869687B9B996889689E8C1968ACDF7968BE8CA968C968D968E968FCEF69690969196929693D5ED9694C1D6E8C49695C3B69696B9FBD6A6E8C8969796989699CAE0D4E6969AE8C0969BE8C5E8C7969CC7B9B7E3969DE8C9969EBFDDE8D2969F96A0E8D796A1E8D5BCDCBCCFE8DB96A296A396A496A596A696A796A896A9E8DE96AAE8DAB1FA96AB96AC96AD96AE96AF96B096B196B296B396B4B0D8C4B3B8CCC6E2C8BEC8E196B596B696B7E8CFE8D4E8D696B8B9F1E8D8D7F596B9C4FB96BAE8DC96BB96BCB2E996BD96BE96BFE8D196C096C1BCED96C296C3BFC2E8CDD6F996C4C1F8B2F196C596C696C796C896C996CA96CB96CCE8DF96CDCAC1E8D996CE96CF96D096D1D5A496D2B1EAD5BBE8CEE8D0B6B0E8D396D3E8DDC0B896D4CAF796D5CBA896D696D7C6DCC0F596D896D996DA96DB96DCE8E996DD96DE96DFD0A396E096E196E296E396E496E596E6E8F2D6EA96E796E896E996EA96EB96EC96EDE8E0E8E196EE96EF96F0D1F9BACBB8F996F196F2B8F1D4D4E8EF96F3E8EEE8ECB9F0CCD2E8E6CEA6BFF296F4B0B8E8F1E8F096F5D7C096F6E8E496F7CDA9C9A396F8BBB8BDDBE8EA96F996FA96FB96FC96FD96FE9740974197429743E8E2E8E3E8E5B5B5E8E7C7C5E8EBE8EDBDB0D7AE9744E8F897459746974797489749974A974B974CE8F5974DCDB0E8F6974E974F9750975197529753975497559756C1BA9757E8E89758C3B7B0F09759975A975B975C975D975E975F9760E8F4976197629763E8F7976497659766B9A3976797689769976A976B976C976D976E976F9770C9D2977197729773C3CECEE0C0E69774977597769777CBF39778CCDDD0B59779977ACAE1977BE8F3977C977D977E9780978197829783978497859786BCEC9787E8F997889789978A978B978C978DC3DE978EC6E5978FB9F79790979197929793B0F497949795D7D897969797BCAC9798C5EF9799979A979B979C979DCCC4979E979FE9A697A097A197A297A397A497A597A697A797A897A9C9AD97AAE9A2C0E297AB97AC97ADBFC397AE97AF97B0E8FEB9D797B1E8FB97B297B397B497B5E9A497B697B797B8D2CE97B997BA97BB97BC97BDE9A397BED6B2D7B597BFE9A797C0BDB797C197C297C397C497C597C697C797C897C997CA97CB97CCE8FCE8FD97CD97CE97CFE9A197D097D197D297D397D497D597D697D7CDD697D897D9D2AC97DA97DB97DCE9B297DD97DE97DF97E0E9A997E197E297E3B4AA97E4B4BB97E597E6E9AB97E797E897E997EA97EB97EC97ED97EE97EF97F097F197F297F397F497F597F697F7D0A897F897F9E9A597FA97FBB3FE97FC97FDE9ACC0E397FEE9AA98409841E9B998429843E9B89844984598469847E9AE98489849E8FA984A984BE9A8984C984D984E984F9850BFACE9B1E9BA98519852C2A5985398549855E9AF9856B8C59857E9AD9858D3DCE9B4E9B5E9B79859985A985BE9C7985C985D985E985F98609861C0C6E9C598629863E9B098649865E9BBB0F19866986798689869986A986B986C986D986E986FE9BCD5A598709871E9BE9872E9BF987398749875E9C198769877C1F198789879C8B6987A987B987CE9BD987D987E988098819882E9C29883988498859886988798889889988AE9C3988BE9B3988CE9B6988DBBB1988E988F9890E9C0989198929893989498959896BCF7989798989899E9C4E9C6989A989B989C989D989E989F98A098A198A298A398A498A5E9CA98A698A798A898A9E9CE98AA98AB98AC98AD98AE98AF98B098B198B298B3B2DB98B4E9C898B598B698B798B898B998BA98BB98BC98BD98BEB7AE98BF98C098C198C298C398C498C598C698C798C898C998CAE9CBE9CC98CB98CC98CD98CE98CF98D0D5C198D1C4A398D298D398D498D598D698D7E9D898D8BAE198D998DA98DB98DCE9C998DDD3A398DE98DF98E0E9D498E198E298E398E498E598E698E7E9D7E9D098E898E998EA98EB98ECE9CF98ED98EEC7C198EF98F098F198F298F398F498F598F6E9D298F798F898F998FA98FB98FC98FDE9D9B3C898FEE9D399409941994299439944CFF0994599469947E9CD99489949994A994B994C994D994E994F995099519952B3F79953995499559956995799589959E9D6995A995BE9DA995C995D995ECCB4995F99609961CFAD99629963996499659966996799689969996AE9D5996BE9DCE9DB996C996D996E996F9970E9DE99719972997399749975997699779978E9D19979997A997B997C997D997E99809981E9DD9982E9DFC3CA9983998499859986998799889989998A998B998C998D998E998F9990999199929993999499959996999799989999999A999B999C999D999E999F99A099A199A299A399A499A599A699A799A899A999AA99AB99AC99AD99AE99AF99B099B199B299B399B499B599B699B799B899B999BA99BB99BC99BD99BE99BF99C099C199C299C399C499C599C699C799C899C999CA99CB99CC99CD99CE99CF99D099D199D299D399D499D599D699D799D899D999DA99DB99DC99DD99DE99DF99E099E199E299E399E499E599E699E799E899E999EA99EB99EC99ED99EE99EF99F099F199F299F399F499F5C7B7B4CEBBB6D0C0ECA399F699F7C5B799F899F999FA99FB99FC99FD99FE9A409A419A42D3FB9A439A449A459A46ECA49A47ECA5C6DB9A489A499A4ABFEE9A4B9A4C9A4D9A4EECA69A4F9A50ECA7D0AA9A51C7B89A529A53B8E89A549A559A569A579A589A599A5A9A5B9A5C9A5D9A5E9A5FECA89A609A619A629A639A649A659A669A67D6B9D5FDB4CBB2BDCEE4C6E79A689A69CDE19A6A9A6B9A6C9A6D9A6E9A6F9A709A719A729A739A749A759A769A77B4F59A78CBC0BCDF9A799A7A9A7B9A7CE9E2E9E3D1EAE9E59A7DB4F9E9E49A7ED1B3CAE2B2D09A80E9E89A819A829A839A84E9E6E9E79A859A86D6B39A879A889A89E9E9E9EA9A8A9A8B9A8C9A8D9A8EE9EB9A8F9A909A919A929A939A949A959A96E9EC9A979A989A999A9A9A9B9A9C9A9D9A9EECAFC5B9B6CE9A9FD2F39AA09AA19AA29AA39AA49AA59AA6B5EE9AA7BBD9ECB19AA89AA9D2E39AAA9AAB9AAC9AAD9AAECEE39AAFC4B89AB0C3BF9AB19AB2B6BED8B9B1C8B1CFB1D1C5FE9AB3B1D09AB4C3AB9AB59AB69AB79AB89AB9D5B19ABA9ABB9ABC9ABD9ABE9ABF9AC09AC1EBA4BAC19AC29AC39AC4CCBA9AC59AC69AC7EBA59AC8EBA79AC99ACA9ACBEBA89ACC9ACD9ACEEBA69ACF9AD09AD19AD29AD39AD49AD5EBA9EBABEBAA9AD69AD79AD89AD99ADAEBAC9ADBCACFD8B5C3F19ADCC3A5C6F8EBADC4CA9ADDEBAEEBAFEBB0B7D59ADE9ADF9AE0B7FA9AE1EBB1C7E29AE2EBB39AE3BAA4D1F5B0B1EBB2EBB49AE49AE59AE6B5AAC2C8C7E89AE7EBB59AE8CBAEE3DF9AE99AEAD3C09AEB9AEC9AED9AEED9DB9AEF9AF0CDA1D6ADC7F39AF19AF29AF3D9E0BBE39AF4BABAE3E29AF59AF69AF79AF89AF9CFAB9AFA9AFB9AFCE3E0C9C79AFDBAB99AFE9B409B41D1B4E3E1C8EAB9AFBDADB3D8CEDB9B429B43CCC09B449B459B46E3E8E3E9CDF49B479B489B499B4A9B4BCCAD9B4CBCB39B4DE3EA9B4EE3EB9B4F9B50D0DA9B519B529B53C6FBB7DA9B549B55C7DFD2CACED69B56E3E4E3EC9B57C9F2B3C19B589B59E3E79B5A9B5BC6E3E3E59B5C9B5DEDB3E3E69B5E9B5F9B609B61C9B39B62C5E69B639B649B65B9B59B66C3BB9B67E3E3C5BDC1A4C2D9B2D79B68E3EDBBA6C4AD9B69E3F0BEDA9B6A9B6BE3FBE3F5BAD39B6C9B6D9B6E9B6FB7D0D3CD9B70D6CED5D3B9C1D5B4D1D89B719B729B739B74D0B9C7F69B759B769B77C8AAB2B49B78C3DA9B799B7A9B7BE3EE9B7C9B7DE3FCE3EFB7A8E3F7E3F49B7E9B809B81B7BA9B829B83C5A29B84E3F6C5DDB2A8C6FC9B85C4E09B869B87D7A29B88C0E1E3F99B899B8AE3FAE3FDCCA9E3F39B8BD3BE9B8CB1C3EDB4E3F1E3F29B8DE3F8D0BAC6C3D4F3E3FE9B8E9B8FBDE09B909B91E4A79B929B93E4A69B949B959B96D1F3E4A39B97E4A99B989B999B9AC8F79B9B9B9C9B9D9B9ECFB49B9FE4A8E4AEC2E59BA09BA1B6B49BA29BA39BA49BA59BA69BA7BDF29BA8E4A29BA99BAABAE9E4AA9BAB9BACE4AC9BAD9BAEB6FDD6DEE4B29BAFE4AD9BB09BB19BB2E4A19BB3BBEECDDDC7A2C5C99BB49BB5C1F79BB6E4A49BB7C7B3BDACBDBDE4A59BB8D7C7B2E29BB9E4ABBCC3E4AF9BBABBEBE4B0C5A8E4B19BBB9BBC9BBD9BBED5E3BFA39BBFE4BA9BC0E4B79BC1E4BB9BC29BC3E4BD9BC49BC5C6D69BC69BC7BAC6C0CB9BC89BC99BCAB8A1E4B49BCB9BCC9BCD9BCED4A19BCF9BD0BAA3BDFE9BD19BD29BD3E4BC9BD49BD59BD69BD79BD8CDBF9BD99BDAC4F99BDB9BDCCFFBC9E69BDD9BDED3BF9BDFCFD19BE09BE1E4B39BE2E4B8E4B9CCE99BE39BE49BE59BE69BE7CCCE9BE8C0D4E4B5C1B0E4B6CED09BE9BBC1B5D39BEAC8F3BDA7D5C7C9ACB8A2E4CA9BEB9BECE4CCD1C49BED9BEED2BA9BEF9BF0BAAD9BF19BF2BAD49BF39BF49BF59BF69BF79BF8E4C3B5ED9BF99BFA9BFBD7CDE4C0CFFDE4BF9BFC9BFD9BFEC1DCCCCA9C409C419C429C43CAE79C449C459C469C47C4D79C48CCD4E4C89C499C4A9C4BE4C7E4C19C4CE4C4B5AD9C4D9C4ED3D99C4FE4C69C509C519C529C53D2F9B4E39C54BBB49C559C56C9EE9C57B4BE9C589C599C5ABBEC9C5BD1CD9C5CCCEDEDB59C5D9C5E9C5F9C609C619C629C639C64C7E59C659C669C679C68D4A89C69E4CBD7D5E4C29C6ABDA5E4C59C6B9C6CD3E69C6DE4C9C9F89C6E9C6FE4BE9C709C71D3E59C729C73C7FEB6C99C74D4FCB2B3E4D79C759C769C77CEC29C78E4CD9C79CEBC9C7AB8DB9C7B9C7CE4D69C7DBFCA9C7E9C809C81D3CE9C82C3EC9C839C849C859C869C879C889C899C8AC5C8E4D89C8B9C8C9C8D9C8E9C8F9C909C919C92CDC4E4CF9C939C949C959C96E4D4E4D59C97BAFE9C98CFE69C999C9AD5BF9C9B9C9C9C9DE4D29C9E9C9F9CA09CA19CA29CA39CA49CA59CA69CA79CA8E4D09CA99CAAE4CE9CAB9CAC9CAD9CAE9CAF9CB09CB19CB29CB39CB49CB59CB69CB79CB89CB9CDE5CAAA9CBA9CBB9CBCC0A39CBDBDA6E4D39CBE9CBFB8C89CC09CC19CC29CC39CC4E4E7D4B49CC59CC69CC79CC89CC99CCA9CCBE4DB9CCC9CCD9CCEC1EF9CCF9CD0E4E99CD19CD2D2E79CD39CD4E4DF9CD5E4E09CD69CD7CFAA9CD89CD99CDA9CDBCBDD9CDCE4DAE4D19CDDE4E59CDEC8DCE4E39CDF9CE0C4E7E4E29CE1E4E19CE29CE39CE4B3FCE4E89CE59CE69CE79CE8B5E19CE99CEA9CEBD7CC9CEC9CED9CEEE4E69CEFBBAC9CF0D7D2CCCFEBF89CF1E4E49CF29CF3B9F69CF49CF59CF6D6CDE4D9E4DCC2FAE4DE9CF7C2CBC0C4C2D09CF8B1F5CCB29CF99CFA9CFB9CFC9CFD9CFE9D409D419D429D43B5CE9D449D459D469D47E4EF9D489D499D4A9D4B9D4C9D4D9D4E9D4FC6AF9D509D519D52C6E19D539D54E4F59D559D569D579D589D59C2A99D5A9D5B9D5CC0ECD1DDE4EE9D5D9D5E9D5F9D609D619D629D639D649D659D66C4AE9D679D689D69E4ED9D6A9D6B9D6C9D6DE4F6E4F4C2FE9D6EE4DD9D6FE4F09D70CAFE9D71D5C49D729D73E4F19D749D759D769D779D789D799D7AD1FA9D7B9D7C9D7D9D7E9D809D819D82E4EBE4EC9D839D849D85E4F29D86CEAB9D879D889D899D8A9D8B9D8C9D8D9D8E9D8F9D90C5CB9D919D929D93C7B19D94C2BA9D959D969D97E4EA9D989D999D9AC1CA9D9B9D9C9D9D9D9E9D9F9DA0CCB6B3B19DA19DA29DA3E4FB9DA4E4F39DA59DA69DA7E4FA9DA8E4FD9DA9E4FC9DAA9DAB9DAC9DAD9DAE9DAF9DB0B3CE9DB19DB29DB3B3BAE4F79DB49DB5E4F9E4F8C5EC9DB69DB79DB89DB99DBA9DBB9DBC9DBD9DBE9DBF9DC09DC19DC2C0BD9DC39DC49DC59DC6D4E89DC79DC89DC99DCA9DCBE5A29DCC9DCD9DCE9DCF9DD09DD19DD29DD39DD49DD59DD6B0C49DD79DD8E5A49DD99DDAE5A39DDB9DDC9DDD9DDE9DDF9DE0BCA49DE1E5A59DE29DE39DE49DE59DE69DE7E5A19DE89DE99DEA9DEB9DEC9DED9DEEE4FEB1F49DEF9DF09DF19DF29DF39DF49DF59DF69DF79DF89DF9E5A89DFAE5A9E5A69DFB9DFC9DFD9DFE9E409E419E429E439E449E459E469E47E5A7E5AA9E489E499E4A9E4B9E4C9E4D9E4E9E4F9E509E519E529E539E549E559E569E579E589E599E5A9E5B9E5C9E5D9E5E9E5F9E609E619E629E639E649E659E669E679E68C6D99E699E6A9E6B9E6C9E6D9E6E9E6F9E70E5ABE5AD9E719E729E739E749E759E769E77E5AC9E789E799E7A9E7B9E7C9E7D9E7E9E809E819E829E839E849E859E869E879E889E89E5AF9E8A9E8B9E8CE5AE9E8D9E8E9E8F9E909E919E929E939E949E959E969E979E989E999E9A9E9B9E9C9E9D9E9EB9E09E9F9EA0E5B09EA19EA29EA39EA49EA59EA69EA79EA89EA99EAA9EAB9EAC9EAD9EAEE5B19EAF9EB09EB19EB29EB39EB49EB59EB69EB79EB89EB99EBABBF0ECE1C3F09EBBB5C6BBD29EBC9EBD9EBE9EBFC1E9D4EE9EC0BEC49EC19EC29EC3D7C69EC4D4D6B2D3ECBE9EC59EC69EC79EC8EAC19EC99ECA9ECBC2AFB4B69ECC9ECD9ECED1D79ECF9ED09ED1B3B49ED2C8B2BFBBECC09ED39ED4D6CB9ED59ED6ECBFECC19ED79ED89ED99EDA9EDB9EDC9EDD9EDE9EDF9EE09EE19EE29EE3ECC5BEE6CCBFC5DABEBC9EE4ECC69EE5B1FE9EE69EE79EE8ECC4D5A8B5E39EE9ECC2C1B6B3E39EEA9EEBECC3CBB8C0C3CCFE9EEC9EED9EEE9EEFC1D29EF0ECC89EF19EF29EF39EF49EF59EF69EF79EF89EF99EFA9EFB9EFC9EFDBAE6C0D39EFED6F29F409F419F42D1CC9F439F449F459F46BFBE9F47B7B3C9D5ECC7BBE29F48CCCCBDFDC8C89F49CFA99F4A9F4B9F4C9F4D9F4E9F4F9F50CDE99F51C5EB9F529F539F54B7E99F559F569F579F589F599F5A9F5B9F5C9F5D9F5E9F5FD1C9BAB89F609F619F629F639F64ECC99F659F66ECCA9F67BBC0ECCB9F68ECE2B1BAB7D99F699F6A9F6B9F6C9F6D9F6E9F6F9F709F719F729F73BDB99F749F759F769F779F789F799F7A9F7BECCCD1E6ECCD9F7C9F7D9F7E9F80C8BB9F819F829F839F849F859F869F879F889F899F8A9F8B9F8C9F8D9F8EECD19F8F9F909F919F92ECD39F93BBCD9F94BCE59F959F969F979F989F999F9A9F9B9F9C9F9D9F9E9F9F9FA09FA1ECCF9FA2C9B79FA39FA49FA59FA69FA7C3BA9FA8ECE3D5D5ECD09FA99FAA9FAB9FAC9FADD6F39FAE9FAF9FB0ECD2ECCE9FB19FB29FB39FB4ECD49FB5ECD59FB69FB7C9BF9FB89FB99FBA9FBB9FBC9FBDCFA89FBE9FBF9FC09FC19FC2D0DC9FC39FC49FC59FC6D1AC9FC79FC89FC99FCAC8DB9FCB9FCC9FCDECD6CEF59FCE9FCF9FD09FD19FD2CAECECDA9FD39FD49FD59FD69FD79FD89FD9ECD99FDA9FDB9FDCB0BE9FDD9FDE9FDF9FE09FE19FE2ECD79FE3ECD89FE49FE59FE6ECE49FE79FE89FE99FEA9FEB9FEC9FED9FEE9FEFC8BC9FF09FF19FF29FF39FF49FF59FF69FF79FF89FF9C1C79FFA9FFB9FFC9FFD9FFEECDCD1E0A040A041A042A043A044A045A046A047A048A049ECDBA04AA04BA04CA04DD4EFA04EECDDA04FA050A051A052A053A054DBC6A055A056A057A058A059A05AA05BA05CA05DA05EECDEA05FA060A061A062A063A064A065A066A067A068A069A06AB1ACA06BA06CA06DA06EA06FA070A071A072A073A074A075A076A077A078A079A07AA07BA07CA07DA07EA080A081ECDFA082A083A084A085A086A087A088A089A08AA08BECE0A08CD7A6A08DC5C0A08EA08FA090EBBCB0AEA091A092A093BEF4B8B8D2AFB0D6B5F9A094D8B3A095CBACA096E3DDA097A098A099A09AA09BA09CA09DC6ACB0E6A09EA09FA0A0C5C6EBB9A0A1A0A2A0A3A0A4EBBAA0A5A0A6A0A7EBBBA0A8A0A9D1C0A0AAC5A3A0ABEAF2A0ACC4B2A0ADC4B5C0CEA0AEA0AFA0B0EAF3C4C1A0B1CEEFA0B2A0B3A0B4A0B5EAF0EAF4A0B6A0B7C9FCA0B8A0B9C7A3A0BAA0BBA0BCCCD8CEFEA0BDA0BEA0BFEAF5EAF6CFACC0E7A0C0A0C1EAF7A0C2A0C3A0C4A0C5A0C6B6BFEAF8A0C7EAF9A0C8EAFAA0C9A0CAEAFBA0CBA0CCA0CDA0CEA0CFA0D0A0D1A0D2A0D3A0D4A0D5A0D6EAF1A0D7A0D8A0D9A0DAA0DBA0DCA0DDA0DEA0DFA0E0A0E1A0E2C8AEE1EBA0E3B7B8E1ECA0E4A0E5A0E6E1EDA0E7D7B4E1EEE1EFD3CCA0E8A0E9A0EAA0EBA0ECA0EDA0EEE1F1BFF1E1F0B5D2A0EFA0F0A0F1B1B7A0F2A0F3A0F4A0F5E1F3E1F2A0F6BAFCA0F7E1F4A0F8A0F9A0FAA0FBB9B7A0FCBED1A0FDA0FEAA40AA41C4FCAA42BADDBDC6AA43AA44AA45AA46AA47AA48E1F5E1F7AA49AA4AB6C0CFC1CAA8E1F6D5F8D3FCE1F8E1FCE1F9AA4BAA4CE1FAC0EAAA4DE1FEE2A1C0C7AA4EAA4FAA50AA51E1FBAA52E1FDAA53AA54AA55AA56AA57AA58E2A5AA59AA5AAA5BC1D4AA5CAA5DAA5EAA5FE2A3AA60E2A8B2FEE2A2AA61AA62AA63C3CDB2C2E2A7E2A6AA64AA65E2A4E2A9AA66AA67E2ABAA68AA69AA6AD0C9D6EDC3A8E2ACAA6BCFD7AA6CAA6DE2AEAA6EAA6FBAEFAA70AA71E9E0E2ADE2AAAA72AA73AA74AA75BBABD4B3AA76AA77AA78AA79AA7AAA7BAA7CAA7DAA7EAA80AA81AA82AA83E2B0AA84AA85E2AFAA86E9E1AA87AA88AA89AA8AE2B1AA8BAA8CAA8DAA8EAA8FAA90AA91AA92E2B2AA93AA94AA95AA96AA97AA98AA99AA9AAA9BAA9CAA9DE2B3CCA1AA9EE2B4AA9FAAA0AB40AB41AB42AB43AB44AB45AB46AB47AB48AB49AB4AAB4BE2B5AB4CAB4DAB4EAB4FAB50D0FEAB51AB52C2CAAB53D3F1AB54CDF5AB55AB56E7E0AB57AB58E7E1AB59AB5AAB5BAB5CBEC1AB5DAB5EAB5FAB60C2EAAB61AB62AB63E7E4AB64AB65E7E3AB66AB67AB68AB69AB6AAB6BCDE6AB6CC3B5AB6DAB6EE7E2BBB7CFD6AB6FC1E1E7E9AB70AB71AB72E7E8AB73AB74E7F4B2A3AB75AB76AB77AB78E7EAAB79E7E6AB7AAB7BAB7CAB7DAB7EE7ECE7EBC9BAAB80AB81D5E4AB82E7E5B7A9E7E7AB83AB84AB85AB86AB87AB88AB89E7EEAB8AAB8BAB8CAB8DE7F3AB8ED6E9AB8FAB90AB91AB92E7EDAB93E7F2AB94E7F1AB95AB96AB97B0E0AB98AB99AB9AAB9BE7F5AB9CAB9DAB9EAB9FABA0AC40AC41AC42AC43AC44AC45AC46AC47AC48AC49AC4AC7F2AC4BC0C5C0EDAC4CAC4DC1F0E7F0AC4EAC4FAC50AC51E7F6CBF6AC52AC53AC54AC55AC56AC57AC58AC59AC5AE8A2E8A1AC5BAC5CAC5DAC5EAC5FAC60D7C1AC61AC62E7FAE7F9AC63E7FBAC64E7F7AC65E7FEAC66E7FDAC67E7FCAC68AC69C1D5C7D9C5FDC5C3AC6AAC6BAC6CAC6DAC6EC7EDAC6FAC70AC71AC72E8A3AC73AC74AC75AC76AC77AC78AC79AC7AAC7BAC7CAC7DAC7EAC80AC81AC82AC83AC84AC85AC86E8A6AC87E8A5AC88E8A7BAF7E7F8E8A4AC89C8F0C9AAAC8AAC8BAC8CAC8DAC8EAC8FAC90AC91AC92AC93AC94AC95AC96E8A9AC97AC98B9E5AC99AC9AAC9BAC9CAC9DD1FEE8A8AC9EAC9FACA0AD40AD41AD42E8AAAD43E8ADE8AEAD44C1A7AD45AD46AD47E8AFAD48AD49AD4AE8B0AD4BAD4CE8ACAD4DE8B4AD4EAD4FAD50AD51AD52AD53AD54AD55AD56AD57AD58E8ABAD59E8B1AD5AAD5BAD5CAD5DAD5EAD5FAD60AD61E8B5E8B2E8B3AD62AD63AD64AD65AD66AD67AD68AD69AD6AAD6BAD6CAD6DAD6EAD6FAD70AD71E8B7AD72AD73AD74AD75AD76AD77AD78AD79AD7AAD7BAD7CAD7DAD7EAD80AD81AD82AD83AD84AD85AD86AD87AD88AD89E8B6AD8AAD8BAD8CAD8DAD8EAD8FAD90AD91AD92B9CFAD93F0ACAD94F0ADAD95C6B0B0EAC8BFAD96CDDFAD97AD98AD99AD9AAD9BAD9CAD9DCECDEAB1AD9EAD9FADA0AE40EAB2AE41C6BFB4C9AE42AE43AE44AE45AE46AE47AE48EAB3AE49AE4AAE4BAE4CD5E7AE4DAE4EAE4FAE50AE51AE52AE53AE54DDF9AE55EAB4AE56EAB5AE57EAB6AE58AE59AE5AAE5BB8CADFB0C9F5AE5CCCF0AE5DAE5EC9FAAE5FAE60AE61AE62AE63C9FBAE64AE65D3C3CBA6AE66B8A6F0AEB1C2AE67E5B8CCEFD3C9BCD7C9EAAE68B5E7AE69C4D0B5E9AE6AEEAEBBADAE6BAE6CE7DEAE6DEEAFAE6EAE6FAE70AE71B3A9AE72AE73EEB2AE74AE75EEB1BDE7AE76EEB0CEB7AE77AE78AE79AE7AC5CFAE7BAE7CAE7DAE7EC1F4DBCEEEB3D0F3AE80AE81AE82AE83AE84AE85AE86AE87C2D4C6E8AE88AE89AE8AB7ACAE8BAE8CAE8DAE8EAE8FAE90AE91EEB4AE92B3EBAE93AE94AE95BBFBEEB5AE96AE97AE98AE99AE9AE7DCAE9BAE9CAE9DEEB6AE9EAE9FBDAEAEA0AF40AF41AF42F1E2AF43AF44AF45CAE8AF46D2C9F0DAAF47F0DBAF48F0DCC1C6AF49B8EDBECEAF4AAF4BF0DEAF4CC5B1F0DDD1F1AF4DF0E0B0CCBDEAAF4EAF4FAF50AF51AF52D2DFF0DFAF53B4AFB7E8F0E6F0E5C6A3F0E1F0E2B4C3AF54AF55F0E3D5EEAF56AF57CCDBBED2BCB2AF58AF59AF5AF0E8F0E7F0E4B2A1AF5BD6A2D3B8BEB7C8ACAF5CAF5DF0EAAF5EAF5FAF60AF61D1F7AF62D6CCBADBF0E9AF63B6BBAF64AF65CDB4AF66AF67C6A6AF68AF69AF6AC1A1F0EBF0EEAF6BF0EDF0F0F0ECAF6CBBBEF0EFAF6DAF6EAF6FAF70CCB5F0F2AF71AF72B3D5AF73AF74AF75AF76B1D4AF77AF78F0F3AF79AF7AF0F4F0F6B4E1AF7BF0F1AF7CF0F7AF7DAF7EAF80AF81F0FAAF82F0F8AF83AF84AF85F0F5AF86AF87AF88AF89F0FDAF8AF0F9F0FCF0FEAF8BF1A1AF8CAF8DAF8ECEC1F1A4AF8FF1A3AF90C1F6F0FBCADDAF91AF92B4F1B1F1CCB1AF93F1A6AF94AF95F1A7AF96AF97F1ACD5CEF1A9AF98AF99C8B3AF9AAF9BAF9CF1A2AF9DF1ABF1A8F1A5AF9EAF9FF1AAAFA0B040B041B042B043B044B045B046B0A9F1ADB047B048B049B04AB04BB04CF1AFB04DF1B1B04EB04FB050B051B052F1B0B053F1AEB054B055B056B057D1A2B058B059B05AB05BB05CB05DB05EF1B2B05FB060B061F1B3B062B063B064B065B066B067B068B069B9EFB06AB06BB5C7B06CB0D7B0D9B06DB06EB06FD4EDB070B5C4B071BDD4BBCAF0A7B072B073B8DEB074B075F0A8B076B077B0A8B078F0A9B079B07ACDEEB07BB07CF0AAB07DB07EB080B081B082B083B084B085B086B087F0ABB088B089B08AB08BB08CB08DB08EB08FB090C6A4B091B092D6E5F1E4B093F1E5B094B095B096B097B098B099B09AB09BB09CB09DC3F3B09EB09FD3DBB0A0B140D6D1C5E8B141D3AFB142D2E6B143B144EEC1B0BBD5B5D1CEBCE0BAD0B145BFF8B146B8C7B5C1C5CCB147B148CAA2B149B14AB14BC3CBB14CB14DB14EB14FB150EEC2B151B152B153B154B155B156B157B158C4BFB6A2B159EDECC3A4B15AD6B1B15BB15CB15DCFE0EDEFB15EB15FC5CEB160B6DCB161B162CAA1B163B164EDEDB165B166EDF0EDF1C3BCB167BFB4B168EDEEB169B16AB16BB16CB16DB16EB16FB170B171B172B173EDF4EDF2B174B175B176B177D5E6C3DFB178EDF3B179B17AB17BEDF6B17CD5A3D1A3B17DB17EB180EDF5B181C3D0B182B183B184B185B186EDF7BFF4BEECEDF8B187CCF7B188D1DBB189B18AB18BD7C5D5F6B18CEDFCB18DB18EB18FEDFBB190B191B192B193B194B195B196B197EDF9EDFAB198B199B19AB19BB19CB19DB19EB19FEDFDBEA6B1A0B240B241B242B243CBAFEEA1B6BDB244EEA2C4C0B245EDFEB246B247BDDEB2C7B248B249B24AB24BB24CB24DB24EB24FB250B251B252B253B6C3B254B255B256EEA5D8BAEEA3EEA6B257B258B259C3E9B3F2B25AB25BB25CB25DB25EB25FEEA7EEA4CFB9B260B261EEA8C2F7B262B263B264B265B266B267B268B269B26AB26BB26CB26DEEA9EEAAB26EDEABB26FB270C6B3B271C7C6B272D6F5B5C9B273CBB2B274B275B276EEABB277B278CDABB279EEACB27AB27BB27CB27DB27ED5B0B280EEADB281F6C4B282B283B284B285B286B287B288B289B28AB28BB28CB28DB28EDBC7B28FB290B291B292B293B294B295B296B297B4A3B298B299B29AC3ACF1E6B29BB29CB29DB29EB29FCAB8D2D3B2A0D6AAB340EFF2B341BED8B342BDC3EFF3B6CCB0ABB343B344B345B346CAAFB347B348EDB6B349EDB7B34AB34BB34CB34DCEF9B7AFBFF3EDB8C2EBC9B0B34EB34FB350B351B352B353EDB9B354B355C6F6BFB3B356B357B358EDBCC5F8B359D1D0B35AD7A9EDBAEDBBB35BD1E2B35CEDBFEDC0B35DEDC4B35EB35FB360EDC8B361EDC6EDCED5E8B362EDC9B363B364EDC7EDBEB365B366C5E9B367B368B369C6C6B36AB36BC9E9D4D2EDC1EDC2EDC3EDC5B36CC0F9B36DB4A1B36EB36FB370B371B9E8B372EDD0B373B374B375B376EDD1B377EDCAB378EDCFB379CEF8B37AB37BCBB6EDCCEDCDB37CB37DB37EB380B381CFF5B382B383B384B385B386B387B388B389B38AB38BB38CB38DEDD2C1F2D3B2EDCBC8B7B38EB38FB390B391B392B393B394B395BCEFB396B397B398B399C5F0B39AB39BB39CB39DB39EB39FB3A0B440B441B442EDD6B443B5EFB444B445C2B5B0ADCBE9B446B447B1AEB448EDD4B449B44AB44BCDEBB5E2B44CEDD5EDD3EDD7B44DB44EB5FAB44FEDD8B450EDD9B451EDDCB452B1CCB453B454B455B456B457B458B459B45AC5F6BCEEEDDACCBCB2EAB45BB45CB45DB45EEDDBB45FB460B461B462C4EBB463B464B4C5B465B466B467B0F5B468B469B46AEDDFC0DAB4E8B46BB46CB46DB46EC5CDB46FB470B471EDDDBFC4B472B473B474EDDEB475B476B477B478B479B47AB47BB47CB47DB47EB480B481B482B483C4A5B484B485B486EDE0B487B488B489B48AB48BEDE1B48CEDE3B48DB48EC1D7B48FB490BBC7B491B492B493B494B495B496BDB8B497B498B499EDE2B49AB49BB49CB49DB49EB49FB4A0B540B541B542B543B544B545EDE4B546B547B548B549B54AB54BB54CB54DB54EB54FEDE6B550B551B552B553B554EDE5B555B556B557B558B559B55AB55BB55CB55DB55EB55FB560B561B562B563EDE7B564B565B566B567B568CABEECEAC0F1B569C9E7B56AECEBC6EEB56BB56CB56DB56EECECB56FC6EDECEDB570B571B572B573B574B575B576B577B578ECF0B579B57AD7E6ECF3B57BB57CECF1ECEEECEFD7A3C9F1CBEEECF4B57DECF2B57EB580CFE9B581ECF6C6B1B582B583B584B585BCC0B586ECF5B587B588B589B58AB58BB58CB58DB5BBBBF6B58EECF7B58FB590B591B592B593D9F7BDFBB594B595C2BBECF8B596B597B598B599ECF9B59AB59BB59CB59DB8A3B59EB59FB5A0B640B641B642B643B644B645B646ECFAB647B648B649B64AB64BB64CB64DB64EB64FB650B651B652ECFBB653B654B655B656B657B658B659B65AB65BB65CB65DECFCB65EB65FB660B661B662D3EDD8AEC0EBB663C7DDBACCB664D0E3CBBDB665CDBAB666B667B8D1B668B669B1FCB66AC7EFB66BD6D6B66CB66DB66EBFC6C3EBB66FB670EFF5B671B672C3D8B673B674B675B676B677B678D7E2B679B67AB67BEFF7B3D3B67CC7D8D1EDB67DD6C8B67EEFF8B680EFF6B681BBFDB3C6B682B683B684B685B686B687B688BDD5B689B68AD2C6B68BBBE0B68CB68DCFA1B68EEFFCEFFBB68FB690EFF9B691B692B693B694B3CCB695C9D4CBB0B696B697B698B699B69AEFFEB69BB69CB0DEB69DB69ED6C9B69FB6A0B740EFFDB741B3EDB742B743F6D5B744B745B746B747B748B749B74AB74BB74CB74DB74EB74FB750B751B752CEC8B753B754B755F0A2B756F0A1B757B5BEBCDABBFCB758B8E5B759B75AB75BB75CB75DB75EC4C2B75FB760B761B762B763B764B765B766B767B768F0A3B769B76AB76BB76CB76DCBEBB76EB76FB770B771B772B773B774B775B776B777B778B779B77AB77BB77CB77DB77EB780B781B782B783B784B785B786F0A6B787B788B789D1A8B78ABEBFC7EEF1B6F1B7BFD5B78BB78CB78DB78EB4A9F1B8CDBBB78FC7D4D5ADB790F1B9B791F1BAB792B793B794B795C7CFB796B797B798D2A4D6CFB799B79AF1BBBDD1B4B0BEBDB79BB79CB79DB4DCCED1B79EBFDFF1BDB79FB7A0B840B841BFFAF1BCB842F1BFB843B844B845F1BEF1C0B846B847B848B849B84AF1C1B84BB84CB84DB84EB84FB850B851B852B853B854B855C1FEB856B857B858B859B85AB85BB85CB85DB85EB85FB860C1A2B861B862B863B864B865B866B867B868B869B86ACAFAB86BB86CD5BEB86DB86EB86FB870BEBABEB9D5C2B871B872BFA2B873CDAFF1B5B874B875B876B877B878B879BDDFB87AB6CBB87BB87CB87DB87EB880B881B882B883B884D6F1F3C3B885B886F3C4B887B8CDB888B889B88AF3C6F3C7B88BB0CAB88CF3C5B88DF3C9CBF1B88EB88FB890F3CBB891D0A6B892B893B1CAF3C8B894B895B896F3CFB897B5D1B898B899F3D7B89AF3D2B89BB89CB89DF3D4F3D3B7FBB89EB1BFB89FF3CEF3CAB5DAB8A0F3D0B940B941F3D1B942F3D5B943B944B945B946F3CDB947BCE3B948C1FDB949F3D6B94AB94BB94CB94DB94EB94FF3DAB950F3CCB951B5C8B952BDEEF3DCB953B954B7A4BFF0D6FECDB2B955B4F0B956B2DFB957F3D8B958F3D9C9B8B959F3DDB95AB95BF3DEB95CF3E1B95DB95EB95FB960B961B962B963B964B965B966B967F3DFB968B969F3E3F3E2B96AB96BF3DBB96CBFEAB96DB3EFB96EF3E0B96FB970C7A9B971BCF2B972B973B974B975F3EBB976B977B978B979B97AB97BB97CB9BFB97DB97EF3E4B980B981B982B2ADBBFEB983CBE3B984B985B986B987F3EDF3E9B988B989B98AB9DCF3EEB98BB98CB98DF3E5F3E6F3EAC2E1F3ECF3EFF3E8BCFDB98EB98FB990CFE4B991B992F3F0B993B994B995F3E7B996B997B998B999B99AB99BB99CB99DF3F2B99EB99FB9A0BA40D7ADC6AABA41BA42BA43BA44F3F3BA45BA46BA47BA48F3F1BA49C2A8BA4ABA4BBA4CBA4DBA4EB8DDF3F5BA4FBA50F3F4BA51BA52BA53B4DBBA54BA55BA56F3F6F3F7BA57BA58BA59F3F8BA5ABA5BBA5CC0BABA5DBA5EC0E9BA5FBA60BA61BA62BA63C5F1BA64BA65BA66BA67F3FBBA68F3FABA69BA6ABA6BBA6CBA6DBA6EBA6FBA70B4D8BA71BA72BA73F3FEF3F9BA74BA75F3FCBA76BA77BA78BA79BA7ABA7BF3FDBA7CBA7DBA7EBA80BA81BA82BA83BA84F4A1BA85BA86BA87BA88BA89BA8AF4A3BBC9BA8BBA8CF4A2BA8DBA8EBA8FBA90BA91BA92BA93BA94BA95BA96BA97BA98BA99F4A4BA9ABA9BBA9CBA9DBA9EBA9FB2BEF4A6F4A5BAA0BB40BB41BB42BB43BB44BB45BB46BB47BB48BB49BCAEBB4ABB4BBB4CBB4DBB4EBB4FBB50BB51BB52BB53BB54BB55BB56BB57BB58BB59BB5ABB5BBB5CBB5DBB5EBB5FBB60BB61BB62BB63BB64BB65BB66BB67BB68BB69BB6ABB6BBB6CBB6DBB6EC3D7D9E1BB6FBB70BB71BB72BB73BB74C0E0F4CCD7D1BB75BB76BB77BB78BB79BB7ABB7BBB7CBB7DBB7EBB80B7DBBB81BB82BB83BB84BB85BB86BB87F4CEC1A3BB88BB89C6C9BB8AB4D6D5B3BB8BBB8CBB8DF4D0F4CFF4D1CBDABB8EBB8FF4D2BB90D4C1D6E0BB91BB92BB93BB94B7E0BB95BB96BB97C1B8BB98BB99C1BBF4D3BEACBB9ABB9BBB9CBB9DBB9EB4E2BB9FBBA0F4D4F4D5BEABBC40BC41F4D6BC42BC43BC44F4DBBC45F4D7F4DABC46BAFDBC47F4D8F4D9BC48BC49BC4ABC4BBC4CBC4DBC4EB8E2CCC7F4DCBC4FB2DABC50BC51C3D3BC52BC53D4E3BFB7BC54BC55BC56BC57BC58BC59BC5AF4DDBC5BBC5CBC5DBC5EBC5FBC60C5B4BC61BC62BC63BC64BC65BC66BC67BC68F4E9BC69BC6ACFB5BC6BBC6CBC6DBC6EBC6FBC70BC71BC72BC73BC74BC75BC76BC77BC78CEC9BC79BC7ABC7BBC7CBC7DBC7EBC80BC81BC82BC83BC84BC85BC86BC87BC88BC89BC8ABC8BBC8CBC8DBC8ECBD8BC8FCBF7BC90BC91BC92BC93BDF4BC94BC95BC96D7CFBC97BC98BC99C0DBBC9ABC9BBC9CBC9DBC9EBC9FBCA0BD40BD41BD42BD43BD44BD45BD46BD47BD48BD49BD4ABD4BBD4CBD4DBD4EBD4FBD50BD51BD52BD53BD54BD55BD56BD57BD58BD59BD5ABD5BBD5CBD5DBD5EBD5FBD60BD61BD62BD63BD64BD65BD66BD67BD68BD69BD6ABD6BBD6CBD6DBD6EBD6FBD70BD71BD72BD73BD74BD75BD76D0F5BD77BD78BD79BD7ABD7BBD7CBD7DBD7EF4EABD80BD81BD82BD83BD84BD85BD86BD87BD88BD89BD8ABD8BBD8CBD8DBD8EBD8FBD90BD91BD92BD93BD94BD95BD96BD97BD98BD99BD9ABD9BBD9CBD9DBD9EBD9FBDA0BE40BE41BE42BE43BE44BE45BE46BE47BE48BE49BE4ABE4BBE4CF4EBBE4DBE4EBE4FBE50BE51BE52BE53F4ECBE54BE55BE56BE57BE58BE59BE5ABE5BBE5CBE5DBE5EBE5FBE60BE61BE62BE63BE64BE65BE66BE67BE68BE69BE6ABE6BBE6CBE6DBE6EBE6FBE70BE71BE72BE73BE74BE75BE76BE77BE78BE79BE7ABE7BBE7CBE7DBE7EBE80BE81BE82BE83BE84BE85BE86BE87BE88BE89BE8ABE8BBE8CBE8DBE8EBE8FBE90BE91BE92BE93BE94BE95BE96BE97BE98BE99BE9ABE9BBE9CBE9DBE9EBE9FBEA0BF40BF41BF42BF43BF44BF45BF46BF47BF48BF49BF4ABF4BBF4CBF4DBF4EBF4FBF50BF51BF52BF53BF54BF55BF56BF57BF58BF59BF5ABF5BBF5CBF5DBF5EBF5FBF60BF61BF62BF63BF64BF65BF66BF67BF68BF69BF6ABF6BBF6CBF6DBF6EBF6FBF70BF71BF72BF73BF74BF75BF76BF77BF78BF79BF7ABF7BBF7CBF7DBF7EBF80F7E3BF81BF82BF83BF84BF85B7B1BF86BF87BF88BF89BF8AF4EDBF8BBF8CBF8DBF8EBF8FBF90BF91BF92BF93BF94BF95BF96BF97BF98BF99BF9ABF9BBF9CBF9DBF9EBF9FBFA0C040C041C042C043C044C045C046C047C048C049C04AC04BC04CC04DC04EC04FC050C051C052C053C054C055C056C057C058C059C05AC05BC05CC05DC05EC05FC060C061C062C063D7EBC064C065C066C067C068C069C06AC06BC06CC06DC06EC06FC070C071C072C073C074C075C076C077C078C079C07AC07BF4EEC07CC07DC07EE6F9BEC0E6FABAECE6FBCFCBE6FCD4BCBCB6E6FDE6FEBCCDC8D2CEB3E7A1C080B4BFE7A2C9B4B8D9C4C9C081D7DDC2DAB7D7D6BDCEC6B7C4C082C083C5A6E7A3CFDFE7A4E7A5E7A6C1B7D7E9C9F0CFB8D6AFD6D5E7A7B0EDE7A8E7A9C9DCD2EFBEADE7AAB0F3C8DEBDE1E7ABC8C6C084E7ACBBE6B8F8D1A4E7ADC2E7BEF8BDCACDB3E7AEE7AFBEEED0E5C085CBE7CCD0BCCCE7B0BCA8D0F7E7B1C086D0F8E7B2E7B3B4C2E7B4E7B5C9FECEACC3E0E7B7B1C1B3F1C087E7B8E7B9D7DBD5C0E7BAC2CCD7BAE7BBE7BCE7BDBCEAC3E5C0C2E7BEE7BFBCA9C088E7C0E7C1E7B6B6D0E7C2C089E7C3E7C4BBBAB5DEC2C6B1E0E7C5D4B5E7C6B8BFE7C8E7C7B7ECC08AE7C9B2F8E7CAE7CBE7CCE7CDE7CEE7CFE7D0D3A7CBF5E7D1E7D2E7D3E7D4C9C9E7D5E7D6E7D7E7D8E7D9BDC9E7DAF3BEC08BB8D7C08CC8B1C08DC08EC08FC090C091C092C093F3BFC094F3C0F3C1C095C096C097C098C099C09AC09BC09CC09DC09EB9DECDF8C09FC0A0D8E8BAB1C140C2DEEEB7C141B7A3C142C143C144C145EEB9C146EEB8B0D5C147C148C149C14AC14BEEBBD5D6D7EFC14CC14DC14ED6C3C14FC150EEBDCAF0C151EEBCC152C153C154C155EEBEC156C157C158C159EEC0C15AC15BEEBFC15CC15DC15EC15FC160C161C162C163D1F2C164C7BCC165C3C0C166C167C168C169C16AB8E1C16BC16CC16DC16EC16FC1E7C170C171F4C6D0DFF4C7C172CFDBC173C174C8BAC175C176F4C8C177C178C179C17AC17BC17CC17DF4C9F4CAC17EF4CBC180C181C182C183C184D9FAB8FEC185C186E5F1D3F0C187F4E0C188CECCC189C18AC18BB3E1C18CC18DC18EC18FF1B4C190D2EEC191F4E1C192C193C194C195C196CFE8F4E2C197C198C7CCC199C19AC19BC19CC19DC19EB5D4B4E4F4E4C19FC1A0C240F4E3F4E5C241C242F4E6C243C244C245C246F4E7C247BAB2B0BFC248F4E8C249C24AC24BC24CC24DC24EC24FB7ADD2EDC250C251C252D2ABC0CFC253BFBCEBA3D5DFEAC8C254C255C256C257F1F3B6F8CBA3C258C259C4CDC25AF1E7C25BF1E8B8FBF1E9BAC4D4C5B0D2C25CC25DF1EAC25EC25FC260F1EBC261F1ECC262C263F1EDF1EEF1EFF1F1F1F0C5D5C264C265C266C267C268C269F1F2C26AB6FAC26BF1F4D2AEDEC7CBCAC26CC26DB3DCC26EB5A2C26FB9A2C270C271C4F4F1F5C272C273F1F6C274C275C276C1C4C1FBD6B0F1F7C277C278C279C27AF1F8C27BC1AAC27CC27DC27EC6B8C280BEDBC281C282C283C284C285C286C287C288C289C28AC28BC28CC28DC28EF1F9B4CFC28FC290C291C292C293C294F1FAC295C296C297C298C299C29AC29BC29CC29DC29EC29FC2A0C340EDB2EDB1C341C342CBE0D2DEC343CBC1D5D8C344C8E2C345C0DFBCA1C346C347C348C349C34AC34BEBC1C34CC34DD0A4C34ED6E2C34FB6C7B8D8EBC0B8CEC350EBBFB3A6B9C9D6ABC351B7F4B7CAC352C353C354BCE7B7BEEBC6C355EBC7B0B9BFCFC356EBC5D3FDC357EBC8C358C359EBC9C35AC35BB7CEC35CEBC2EBC4C9F6D6D7D5CDD0B2EBCFCEB8EBD0C35DB5A8C35EC35FC360C361C362B1B3EBD2CCA5C363C364C365C366C367C368C369C5D6EBD3C36AEBD1C5DFEBCECAA4EBD5B0FBC36BC36CBAFAC36DC36ED8B7F1E3C36FEBCAEBCBEBCCEBCDEBD6E6C0EBD9C370BFE8D2C8EBD7EBDCB8ECEBD8C371BDBAC372D0D8C373B0B7C374EBDDC4DCC375C376C377C378D6ACC379C37AC37BB4E0C37CC37DC2F6BCB9C37EC380EBDAEBDBD4E0C6EAC4D4EBDFC5A7D9F5C381B2B1C382EBE4C383BDC5C384C385C386EBE2C387C388C389C38AC38BC38CC38DC38EC38FC390C391C392C393EBE3C394C395B8ACC396CDD1EBE5C397C398C399EBE1C39AC1B3C39BC39CC39DC39EC39FC6A2C3A0C440C441C442C443C444C445CCF3C446EBE6C447C0B0D2B8EBE7C448C449C44AB8AFB8ADC44BEBE8C7BBCDF3C44CC44DC44EEBEAEBEBC44FC450C451C452C453EBEDC454C455C456C457D0C8C458EBF2C459EBEEC45AC45BC45CEBF1C8F9C45DD1FCEBECC45EC45FEBE9C460C461C462C463B8B9CFD9C4E5EBEFEBF0CCDACDC8B0F2C464EBF6C465C466C467C468C469EBF5C46AB2B2C46BC46CC46DC46EB8E0C46FEBF7C470C471C472C473C474C475B1ECC476C477CCC5C4A4CFA5C478C479C47AC47BC47CEBF9C47DC47EECA2C480C5F2C481EBFAC482C483C484C485C486C487C488C489C9C5C48AC48BC48CC48DC48EC48FE2DFEBFEC490C491C492C493CDCEECA1B1DBD3B7C494C495D2DCC496C497C498EBFDC499EBFBC49AC49BC49CC49DC49EC49FC4A0C540C541C542C543C544C545C546C547C548C549C54AC54BC54CC54DC54EB3BCC54FC550C551EAB0C552C553D7D4C554F4ABB3F4C555C556C557C558C559D6C1D6C2C55AC55BC55CC55DC55EC55FD5E9BECAC560F4A7C561D2A8F4A8F4A9C562F4AABECBD3DFC563C564C565C566C567C9E0C9E1C568C569F3C2C56ACAE6C56BCCF2C56CC56DC56EC56FC570C571E2B6CBB4C572CEE8D6DBC573F4ADF4AEF4AFC574C575C576C577F4B2C578BABDF4B3B0E3F4B0C579F4B1BDA2B2D5C57AF4B6F4B7B6E6B2B0CFCFF4B4B4ACC57BF4B5C57CC57DF4B8C57EC580C581C582C583F4B9C584C585CDA7C586F4BAC587F4BBC588C589C58AF4BCC58BC58CC58DC58EC58FC590C591C592CBD2C593F4BDC594C595C596C597F4BEC598C599C59AC59BC59CC59DC59EC59FF4BFC5A0C640C641C642C643F4DEC1BCBCE8C644C9ABD1DEE5F5C645C646C647C648DCB3D2D5C649C64ADCB4B0ACDCB5C64BC64CBDDAC64DDCB9C64EC64FC650D8C2C651DCB7D3F3C652C9D6DCBADCB6C653DCBBC3A2C654C655C656C657DCBCDCC5DCBDC658C659CEDFD6A5C65ADCCFC65BDCCDC65CC65DDCD2BDE6C2ABC65EDCB8DCCBDCCEDCBEB7D2B0C5DCC7D0BEDCC1BBA8C65FB7BCDCCCC660C661DCC6DCBFC7DBC662C663C664D1BFDCC0C665C666DCCAC667C668DCD0C669C66ACEADDCC2C66BDCC3DCC8DCC9B2D4DCD1CBD5C66CD4B7DCDBDCDFCCA6DCE6C66DC3E7DCDCC66EC66FBFC1DCD9C670B0FAB9B6DCE5DCD3C671DCC4DCD6C8F4BFE0C672C673C674C675C9BBC676C677C678B1BDC679D3A2C67AC67BDCDAC67CC67DDCD5C67EC6BBC680DCDEC681C682C683C684C685D7C2C3AFB7B6C7D1C3A9DCE2DCD8DCEBDCD4C686C687DCDDC688BEA5DCD7C689DCE0C68AC68BDCE3DCE4C68CDCF8C68DC68EDCE1DDA2DCE7C68FC690C691C692C693C694C695C696C697C698BCEBB4C4C699C69AC3A3B2E7DCFAC69BDCF2C69CDCEFC69DDCFCDCEED2F0B2E8C69EC8D7C8E3DCFBC69FDCEDC6A0C740C741DCF7C742C743DCF5C744C745BEA3DCF4C746B2DDC747C748C749C74AC74BDCF3BCF6DCE8BBC4C74CC0F3C74DC74EC74FC750C751BCD4DCE9DCEAC752DCF1DCF6DCF9B5B4C753C8D9BBE7DCFEDCFDD3ABDDA1DDA3DDA5D2F1DDA4DDA6DDA7D2A9C754C755C756C757C758C759C75ABAC9DDA9C75BC75CDDB6DDB1DDB4C75DC75EC75FC760C761C762C763DDB0C6CEC764C765C0F2C766C767C768C769C9AFC76AC76BC76CDCECDDAEC76DC76EC76FC770DDB7C771C772DCF0DDAFC773DDB8C774DDACC775C776C777C778C779C77AC77BDDB9DDB3DDADC4AAC77CC77DC77EC780DDA8C0B3C1ABDDAADDABC781DDB2BBF1DDB5D3A8DDBAC782DDBBC3A7C783C784DDD2DDBCC785C786C787DDD1C788B9BDC789C78ABED5C78BBEFAC78CC78DBACAC78EC78FC790C791DDCAC792DDC5C793DDBFC794C795C796B2CBDDC3C797DDCBB2A4DDD5C798C799C79ADDBEC79BC79CC79DC6D0DDD0C79EC79FC7A0C840C841DDD4C1E2B7C6C842C843C844C845C846DDCEDDCFC847C848C849DDC4C84AC84BC84CDDBDC84DDDCDCCD1C84EDDC9C84FC850C851C852DDC2C3C8C6BCCEAEDDCCC853DDC8C854C855C856C857C858C859DDC1C85AC85BC85CDDC6C2DCC85DC85EC85FC860C861C862D3A9D3AADDD3CFF4C8F8C863C864C865C866C867C868C869C86ADDE6C86BC86CC86DC86EC86FC870DDC7C871C872C873DDE0C2E4C874C875C876C877C878C879C87AC87BDDE1C87CC87DC87EC880C881C882C883C884C885C886DDD7C887C888C889C88AC88BD6F8C88CDDD9DDD8B8F0DDD6C88DC88EC88FC890C6CFC891B6ADC892C893C894C895C896DDE2C897BAF9D4E1DDE7C898C899C89AB4D0C89BDDDAC89CBFFBDDE3C89DDDDFC89EDDDDC89FC8A0C940C941C942C943C944B5D9C945C946C947C948DDDBDDDCDDDEC949BDAFDDE4C94ADDE5C94BC94CC94DC94EC94FC950C951C952DDF5C953C3C9C954C955CBE2C956C957C958C959DDF2C95AC95BC95CC95DC95EC95FC960C961C962C963C964C965C966D8E1C967C968C6D1C969DDF4C96AC96BC96CD5F4DDF3DDF0C96DC96EDDECC96FDDEFC970DDE8C971C972D0EEC973C974C975C976C8D8DDEEC977C978DDE9C979C97ADDEACBF2C97BDDEDC97CC97DB1CDC97EC980C981C982C983C984C0B6C985BCBBDDF1C986C987DDF7C988DDF6DDEBC989C98AC98BC98CC98DC5EEC98EC98FC990DDFBC991C992C993C994C995C996C997C998C999C99AC99BDEA4C99CC99DDEA3C99EC99FC9A0CA40CA41CA42CA43CA44CA45CA46CA47CA48DDF8CA49CA4ACA4BCA4CC3EFCA4DC2FBCA4ECA4FCA50D5E1CA51CA52CEB5CA53CA54CA55CA56DDFDCA57B2CCCA58CA59CA5ACA5BCA5CCA5DCA5ECA5FCA60C4E8CADFCA61CA62CA63CA64CA65CA66CA67CA68CA69CA6AC7BEDDFADDFCDDFEDEA2B0AAB1CECA6BCA6CCA6DCA6ECA6FDEACCA70CA71CA72CA73DEA6BDB6C8EFCA74CA75CA76CA77CA78CA79CA7ACA7BCA7CCA7DCA7EDEA1CA80CA81DEA5CA82CA83CA84CA85DEA9CA86CA87CA88CA89CA8ADEA8CA8BCA8CCA8DDEA7CA8ECA8FCA90CA91CA92CA93CA94CA95CA96DEADCA97D4CCCA98CA99CA9ACA9BDEB3DEAADEAECA9CCA9DC0D9CA9ECA9FCAA0CB40CB41B1A1DEB6CB42DEB1CB43CB44CB45CB46CB47CB48CB49DEB2CB4ACB4BCB4CCB4DCB4ECB4FCB50CB51CB52CB53CB54D1A6DEB5CB55CB56CB57CB58CB59CB5ACB5BDEAFCB5CCB5DCB5EDEB0CB5FD0BDCB60CB61CB62DEB4CAEDDEB9CB63CB64CB65CB66CB67CB68DEB8CB69DEB7CB6ACB6BCB6CCB6DCB6ECB6FCB70DEBBCB71CB72CB73CB74CB75CB76CB77BDE5CB78CB79CB7ACB7BCB7CB2D8C3EACB7DCB7EDEBACB80C5BACB81CB82CB83CB84CB85CB86DEBCCB87CB88CB89CB8ACB8BCB8CCB8DCCD9CB8ECB8FCB90CB91B7AACB92CB93CB94CB95CB96CB97CB98CB99CB9ACB9BCB9CCB9DCB9ECB9FCBA0CC40CC41D4E5CC42CC43CC44DEBDCC45CC46CC47CC48CC49DEBFCC4ACC4BCC4CCC4DCC4ECC4FCC50CC51CC52CC53CC54C4A2CC55CC56CC57CC58DEC1CC59CC5ACC5BCC5CCC5DCC5ECC5FCC60CC61CC62CC63CC64CC65CC66CC67CC68DEBECC69DEC0CC6ACC6BCC6CCC6DCC6ECC6FCC70CC71CC72CC73CC74CC75CC76CC77D5BACC78CC79CC7ADEC2CC7BCC7CCC7DCC7ECC80CC81CC82CC83CC84CC85CC86CC87CC88CC89CC8ACC8BF2AEBBA2C2B2C5B0C2C7CC8CCC8DF2AFCC8ECC8FCC90CC91CC92D0E9CC93CC94CC95D3DDCC96CC97CC98EBBDCC99CC9ACC9BCC9CCC9DCC9ECC9FCCA0B3E6F2B0CD40F2B1CD41CD42CAADCD43CD44CD45CD46CD47CD48CD49BAE7F2B3F2B5F2B4CBE4CFBAF2B2CAB4D2CFC2ECCD4ACD4BCD4CCD4DCD4ECD4FCD50CEC3F2B8B0F6F2B7CD51CD52CD53CD54CD55F2BECD56B2CFCD57CD58CD59CD5ACD5BCD5CD1C1F2BACD5DCD5ECD5FCD60CD61F2BCD4E9CD62CD63F2BBF2B6F2BFF2BDCD64F2B9CD65CD66F2C7F2C4F2C6CD67CD68F2CAF2C2F2C0CD69CD6ACD6BF2C5CD6CCD6DCD6ECD6FCD70D6FBCD71CD72CD73F2C1CD74C7F9C9DFCD75F2C8B9C6B5B0CD76CD77F2C3F2C9F2D0F2D6CD78CD79BBD7CD7ACD7BCD7CF2D5CDDCCD7DD6EBCD7ECD80F2D2F2D4CD81CD82CD83CD84B8F2CD85CD86CD87CD88F2CBCD89CD8ACD8BF2CEC2F9CD8CD5DDF2CCF2CDF2CFF2D3CD8DCD8ECD8FF2D9D3BCCD90CD91CD92CD93B6EACD94CAF1CD95B7E4F2D7CD96CD97CD98F2D8F2DAF2DDF2DBCD99CD9AF2DCCD9BCD9CCD9DCD9ED1D1F2D1CD9FCDC9CDA0CECFD6A9CE40F2E3CE41C3DBCE42F2E0CE43CE44C0AFF2ECF2DECE45F2E1CE46CE47CE48F2E8CE49CE4ACE4BCE4CF2E2CE4DCE4EF2E7CE4FCE50F2E6CE51CE52F2E9CE53CE54CE55F2DFCE56CE57F2E4F2EACE58CE59CE5ACE5BCE5CCE5DCE5ED3ACF2E5B2F5CE5FCE60F2F2CE61D0ABCE62CE63CE64CE65F2F5CE66CE67CE68BBC8CE69F2F9CE6ACE6BCE6CCE6DCE6ECE6FF2F0CE70CE71F2F6F2F8F2FACE72CE73CE74CE75CE76CE77CE78CE79F2F3CE7AF2F1CE7BCE7CCE7DBAFBCE7EB5FBCE80CE81CE82CE83F2EFF2F7F2EDF2EECE84CE85CE86F2EBF3A6CE87F3A3CE88CE89F3A2CE8ACE8BF2F4CE8CC8DACE8DCE8ECE8FCE90CE91F2FBCE92CE93CE94F3A5CE95CE96CE97CE98CE99CE9ACE9BC3F8CE9CCE9DCE9ECE9FCEA0CF40CF41CF42F2FDCF43CF44F3A7F3A9F3A4CF45F2FCCF46CF47CF48F3ABCF49F3AACF4ACF4BCF4CCF4DC2DDCF4ECF4FF3AECF50CF51F3B0CF52CF53CF54CF55CF56F3A1CF57CF58CF59F3B1F3ACCF5ACF5BCF5CCF5DCF5EF3AFF2FEF3ADCF5FCF60CF61CF62CF63CF64CF65F3B2CF66CF67CF68CF69F3B4CF6ACF6BCF6CCF6DF3A8CF6ECF6FCF70CF71F3B3CF72CF73CF74F3B5CF75CF76CF77CF78CF79CF7ACF7BCF7CCF7DCF7ED0B7CF80CF81CF82CF83F3B8CF84CF85CF86CF87D9F9CF88CF89CF8ACF8BCF8CCF8DF3B9CF8ECF8FCF90CF91CF92CF93CF94CF95F3B7CF96C8E4F3B6CF97CF98CF99CF9AF3BACF9BCF9CCF9DCF9ECF9FF3BBB4C0CFA0D040D041D042D043D044D045D046D047D048D049D04AD04BD04CD04DEEC3D04ED04FD050D051D052D053F3BCD054D055F3BDD056D057D058D1AAD059D05AD05BF4ACD0C6D05CD05DD05ED05FD060D061D0D0D1DCD062D063D064D065D066D067CFCED068D069BDD6D06AD1C3D06BD06CD06DD06ED06FD070D071BAE2E1E9D2C2F1C2B2B9D072D073B1EDF1C3D074C9C0B3C4D075D9F2D076CBA5D077F1C4D078D079D07AD07BD6D4D07CD07DD07ED080D081F1C5F4C0F1C6D082D4ACF1C7D083B0C0F4C1D084D085F4C2D086D087B4FCD088C5DBD089D08AD08BD08CCCBBD08DD08ED08FD0E4D090D091D092D093D094CDE0D095D096D097D098D099F1C8D09AD9F3D09BD09CD09DD09ED09FD0A0B1BBD140CFAED141D142D143B8A4D144D145D146D147D148F1CAD149D14AD14BD14CF1CBD14DD14ED14FD150B2C3C1D1D151D152D7B0F1C9D153D154F1CCD155D156D157D158F1CED159D15AD15BD9F6D15CD2E1D4A3D15DD15EF4C3C8B9D15FD160D161D162D163F4C4D164D165F1CDF1CFBFE3F1D0D166D167F1D4D168D169D16AD16BD16CD16DD16EF1D6F1D1D16FC9D1C5E1D170D171D172C2E3B9FCD173D174F1D3D175F1D5D176D177D178B9D3D179D17AD17BD17CD17DD17ED180F1DBD181D182D183D184D185BAD6D186B0FDF1D9D187D188D189D18AD18BF1D8F1D2F1DAD18CD18DD18ED18FD190F1D7D191D192D193C8ECD194D195D196D197CDCAF1DDD198D199D19AD19BE5BDD19CD19DD19EF1DCD19FF1DED1A0D240D241D242D243D244D245D246D247D248F1DFD249D24ACFE5D24BD24CD24DD24ED24FD250D251D252D253D254D255D256D257D258D259D25AD25BD25CD25DD25ED25FD260D261D262D263F4C5BDF3D264D265D266D267D268D269F1E0D26AD26BD26CD26DD26ED26FD270D271D272D273D274D275D276D277D278D279D27AD27BD27CD27DF1E1D27ED280D281CEF7D282D2AAD283F1FBD284D285B8B2D286D287D288D289D28AD28BD28CD28DD28ED28FD290D291D292D293D294D295D296D297D298D299D29AD29BD29CD29DD29ED29FD2A0D340D341D342D343D344D345D346D347D348D349D34AD34BD34CD34DD34ED34FD350D351D352D353D354D355D356D357D358D359D35AD35BD35CD35DD35EBCFBB9DBD35FB9E6C3D9CAD3EAE8C0C0BEF5EAE9EAEAEAEBD360EAECEAEDEAEEEAEFBDC7D361D362D363F5FBD364D365D366F5FDD367F5FED368F5FCD369D36AD36BD36CBDE2D36DF6A1B4A5D36ED36FD370D371F6A2D372D373D374F6A3D375D376D377ECB2D378D379D37AD37BD37CD37DD37ED380D381D382D383D384D1D4D385D386D387D388D389D38AD9EAD38BD38CD38DD38ED38FD390D391D392D393D394D395D396D397D398D399D39AD39BD39CD39DD39ED39FD3A0D440D441D442D443D444D445D446D447D448D449D44AD44BD44CD44DD44ED44FD450D451D452D453D454D455D456D457D458D459D45AD45BD45CD45DD45ED45FF6A4D460D461D462D463D464D465D466D467D468EEBAD469D46AD46BD46CD46DD46ED46FD470D471D472D473D474D475D476D477D478D479D47AD47BD47CD47DD47ED480D481D482D483D484D485D486D487D488D489D48AD48BD48CD48DD48ED48FD490D491D492D493D494D495D496D497D498D499D5B2D49AD49BD49CD49DD49ED49FD4A0D540D541D542D543D544D545D546D547D3FECCDCD548D549D54AD54BD54CD54DD54ED54FCAC4D550D551D552D553D554D555D556D557D558D559D55AD55BD55CD55DD55ED55FD560D561D562D563D564D565D566D567D568D569D56AD56BD56CD56DD56ED56FD570D571D572D573D574D575D576D577D578D579D57AD57BD57CD57DD57ED580D581D582D583D584D585D586D587D588D589D58AD58BD58CD58DD58ED58FD590D591D592D593D594D595D596D597D598D599D59AD59BD59CD59DD59ED59FD5A0D640D641D642D643D644D645D646D647D648D649D64AD64BD64CD64DD64ED64FD650D651D652D653D654D655D656D657D658D659D65AD65BD65CD65DD65ED65FD660D661D662E5C0D663D664D665D666D667D668D669D66AD66BD66CD66DD66ED66FD670D671D672D673D674D675D676D677D678D679D67AD67BD67CD67DD67ED680D681F6A5D682D683D684D685D686D687D688D689D68AD68BD68CD68DD68ED68FD690D691D692D693D694D695D696D697D698D699D69AD69BD69CD69DD69ED69FD6A0D740D741D742D743D744D745D746D747D748D749D74AD74BD74CD74DD74ED74FD750D751D752D753D754D755D756D757D758D759D75AD75BD75CD75DD75ED75FBEAFD760D761D762D763D764C6A9D765D766D767D768D769D76AD76BD76CD76DD76ED76FD770D771D772D773D774D775D776D777D778D779D77AD77BD77CD77DD77ED780D781D782D783D784D785D786D787D788D789D78AD78BD78CD78DD78ED78FD790D791D792D793D794D795D796D797D798DAA5BCC6B6A9B8BCC8CFBCA5DAA6DAA7CCD6C8C3DAA8C6FDD799D1B5D2E9D1B6BCC7D79ABDB2BBE4DAA9DAAAD1C8DAABD0EDB6EFC2DBD79BCBCFB7EDC9E8B7C3BEF7D6A4DAACDAADC6C0D7E7CAB6D79CD5A9CBDFD5EFDAAED6DFB4CADAB0DAAFD79DD2EBDAB1DAB2DAB3CAD4DAB4CAABDAB5DAB6B3CFD6EFDAB7BBB0B5AEDAB8DAB9B9EED1AFD2E8DABAB8C3CFEAB2EFDABBDABCD79EBDEBCEDCD3EFDABDCEF3DABED3D5BBE5DABFCBB5CBD0DAC0C7EBD6EEDAC1C5B5B6C1DAC2B7CCBFCEDAC3DAC4CBADDAC5B5F7DAC6C1C2D7BBDAC7CCB8D79FD2EAC4B1DAC8B5FDBBD1DAC9D0B3DACADACBCEBDDACCDACDDACEB2F7DAD1DACFD1E8DAD0C3D5DAD2D7A0DAD3DAD4DAD5D0BBD2A5B0F9DAD6C7ABDAD7BDF7C3A1DAD8DAD9C3FDCCB7DADADADBC0BEC6D7DADCDADDC7B4DADEDADFB9C8D840D841D842D843D844D845D846D847D848BBEDD849D84AD84BD84CB6B9F4F8D84DF4F9D84ED84FCDE3D850D851D852D853D854D855D856D857F5B9D858D859D85AD85BEBE0D85CD85DD85ED85FD860D861CFF3BBBFD862D863D864D865D866D867D868BAC0D4A5D869D86AD86BD86CD86DD86ED86FE1D9D870D871D872D873F5F4B1AAB2F2D874D875D876D877D878D879D87AF5F5D87BD87CF5F7D87DD87ED880BAD1F5F6D881C3B2D882D883D884D885D886D887D888F5F9D889D88AD88BF5F8D88CD88DD88ED88FD890D891D892D893D894D895D896D897D898D899D89AD89BD89CD89DD89ED89FD8A0D940D941D942D943D944D945D946D947D948D949D94AD94BD94CD94DD94ED94FD950D951D952D953D954D955D956D957D958D959D95AD95BD95CD95DD95ED95FD960D961D962D963D964D965D966D967D968D969D96AD96BD96CD96DD96ED96FD970D971D972D973D974D975D976D977D978D979D97AD97BD97CD97DD97ED980D981D982D983D984D985D986D987D988D989D98AD98BD98CD98DD98ED98FD990D991D992D993D994D995D996D997D998D999D99AD99BD99CD99DD99ED99FD9A0DA40DA41DA42DA43DA44DA45DA46DA47DA48DA49DA4ADA4BDA4CDA4DDA4EB1B4D5EAB8BADA4FB9B1B2C6D4F0CFCDB0DCD5CBBBF5D6CAB7B7CCB0C6B6B1E1B9BAD6FCB9E1B7A1BCFAEADAEADBCCF9B9F3EADCB4FBC3B3B7D1BAD8EADDD4F4EADEBCD6BBDFEADFC1DEC2B8D4DFD7CAEAE0EAE1EAE4EAE2EAE3C9DEB8B3B6C4EAE5CAEAC9CDB4CDDA50DA51E2D9C5E2EAE6C0B5DA52D7B8EAE7D7ACC8FCD8D3D8CDD4DEDA53D4F9C9C4D3AEB8D3B3E0DA54C9E2F4F6DA55DA56DA57BAD5DA58F4F7DA59DA5AD7DFDA5BDA5CF4F1B8B0D5D4B8CFC6F0DA5DDA5EDA5FDA60DA61DA62DA63DA64DA65B3C3DA66DA67F4F2B3ACDA68DA69DA6ADA6BD4BDC7F7DA6CDA6DDA6EDA6FDA70F4F4DA71DA72F4F3DA73DA74DA75DA76DA77DA78DA79DA7ADA7BDA7CCCCBDA7DDA7EDA80C8A4DA81DA82DA83DA84DA85DA86DA87DA88DA89DA8ADA8BDA8CDA8DF4F5DA8ED7E3C5BFF5C0DA8FDA90F5BBDA91F5C3DA92F5C2DA93D6BAF5C1DA94DA95DA96D4BEF5C4DA97F5CCDA98DA99DA9ADA9BB0CFB5F8DA9CF5C9F5CADA9DC5DCDA9EDA9FDAA0DB40F5C5F5C6DB41DB42F5C7F5CBDB43BEE0F5C8B8FADB44DB45DB46F5D0F5D3DB47DB48DB49BFE7DB4AB9F2F5BCF5CDDB4BDB4CC2B7DB4DDB4EDB4FCCF8DB50BCF9DB51F5CEF5CFF5D1B6E5F5D2DB52F5D5DB53DB54DB55DB56DB57DB58DB59F5BDDB5ADB5BDB5CF5D4D3BBDB5DB3ECDB5EDB5FCCA4DB60DB61DB62DB63F5D6DB64DB65DB66DB67DB68DB69DB6ADB6BF5D7BEE1F5D8DB6CDB6DCCDFF5DBDB6EDB6FDB70DB71DB72B2C8D7D9DB73F5D9DB74F5DAF5DCDB75F5E2DB76DB77DB78F5E0DB79DB7ADB7BF5DFF5DDDB7CDB7DF5E1DB7EDB80F5DEF5E4F5E5DB81CCE3DB82DB83E5BFB5B8F5E3F5E8CCA3DB84DB85DB86DB87DB88F5E6F5E7DB89DB8ADB8BDB8CDB8DDB8EF5BEDB8FDB90DB91DB92DB93DB94DB95DB96DB97DB98DB99DB9AB1C4DB9BDB9CF5BFDB9DDB9EB5C5B2E4DB9FF5ECF5E9DBA0B6D7DC40F5EDDC41F5EADC42DC43DC44DC45DC46F5EBDC47DC48B4DADC49D4EADC4ADC4BDC4CF5EEDC4DB3F9DC4EDC4FDC50DC51DC52DC53DC54F5EFF5F1DC55DC56DC57F5F0DC58DC59DC5ADC5BDC5CDC5DDC5EF5F2DC5FF5F3DC60DC61DC62DC63DC64DC65DC66DC67DC68DC69DC6ADC6BC9EDB9AADC6CDC6DC7FBDC6EDC6FB6E3DC70DC71DC72DC73DC74DC75DC76CCC9DC77DC78DC79DC7ADC7BDC7CDC7DDC7EDC80DC81DC82DC83DC84DC85DC86DC87DC88DC89DC8AEAA6DC8BDC8CDC8DDC8EDC8FDC90DC91DC92DC93DC94DC95DC96DC97DC98DC99DC9ADC9BDC9CDC9DDC9EDC9FDCA0DD40DD41DD42DD43DD44DD45DD46DD47DD48DD49DD4ADD4BDD4CDD4DDD4EDD4FDD50DD51DD52DD53DD54DD55DD56DD57DD58DD59DD5ADD5BDD5CDD5DDD5EDD5FDD60DD61DD62DD63DD64DD65DD66DD67DD68DD69DD6ADD6BDD6CDD6DDD6EDD6FDD70DD71DD72DD73DD74DD75DD76DD77DD78DD79DD7ADD7BDD7CDD7DDD7EDD80DD81DD82DD83DD84DD85DD86DD87DD88DD89DD8ADD8BDD8CDD8DDD8EDD8FDD90DD91DD92DD93DD94DD95DD96DD97DD98DD99DD9ADD9BDD9CDD9DDD9EDD9FDDA0DE40DE41DE42DE43DE44DE45DE46DE47DE48DE49DE4ADE4BDE4CDE4DDE4EDE4FDE50DE51DE52DE53DE54DE55DE56DE57DE58DE59DE5ADE5BDE5CDE5DDE5EDE5FDE60B3B5D4FEB9ECD0F9DE61E9EDD7AAE9EEC2D6C8EDBAE4E9EFE9F0E9F1D6E1E9F2E9F3E9F5E9F4E9F6E9F7C7E1E9F8D4D8E9F9BDCEDE62E9FAE9FBBDCFE9FCB8A8C1BEE9FDB1B2BBD4B9F5E9FEDE63EAA1EAA2EAA3B7F8BCADDE64CAE4E0CED4AFCFBDD5B7EAA4D5DEEAA5D0C1B9BCDE65B4C7B1D9DE66DE67DE68C0B1DE69DE6ADE6BDE6CB1E6B1E7DE6DB1E8DE6EDE6FDE70DE71B3BDC8E8DE72DE73DE74DE75E5C1DE76DE77B1DFDE78DE79DE7AC1C9B4EFDE7BDE7CC7A8D3D8DE7DC6F9D1B8DE7EB9FDC2F5DE80DE81DE82DE83DE84D3ADDE85D4CBBDFCDE86E5C2B7B5E5C3DE87DE88BBB9D5E2DE89BDF8D4B6CEA5C1ACB3D9DE8ADE8BCCF6DE8CE5C6E5C4E5C8DE8DE5CAE5C7B5CFC6C8DE8EB5FCE5C5DE8FCAF6DE90DE91E5C9DE92DE93DE94C3D4B1C5BCA3DE95DE96DE97D7B7DE98DE99CDCBCBCDCACACCD3E5CCE5CBC4E6DE9ADE9BD1A1D1B7E5CDDE9CE5D0DE9DCDB8D6F0E5CFB5DDDE9ECDBEDE9FE5D1B6BADEA0DF40CDA8B9E4DF41CAC5B3D1CBD9D4ECE5D2B7EADF42DF43DF44E5CEDF45DF46DF47DF48DF49DF4AE5D5B4FEE5D6DF4BDF4CDF4DDF4EDF4FE5D3E5D4DF50D2DDDF51DF52C2DFB1C6DF53D3E2DF54DF55B6DDCBECDF56E5D7DF57DF58D3F6DF59DF5ADF5BDF5CDF5DB1E9DF5EB6F4E5DAE5D8E5D9B5C0DF5FDF60DF61D2C5E5DCDF62DF63E5DEDF64DF65DF66DF67DF68DF69E5DDC7B2DF6AD2A3DF6BDF6CE5DBDF6DDF6EDF6FDF70D4E2D5DADF71DF72DF73DF74DF75E5E0D7F1DF76DF77DF78DF79DF7ADF7BDF7CE5E1DF7DB1DCD1FBDF7EE5E2E5E4DF80DF81DF82DF83E5E3DF84DF85E5E5DF86DF87DF88DF89DF8AD2D8DF8BB5CBDF8CE7DFDF8DDAF5DF8EDAF8DF8FDAF6DF90DAF7DF91DF92DF93DAFAD0CFC4C7DF94DF95B0EEDF96DF97DF98D0B0DF99DAF9DF9AD3CABAAADBA2C7F1DF9BDAFCDAFBC9DBDAFDDF9CDBA1D7DEDAFEC1DADF9DDF9EDBA5DF9FDFA0D3F4E040E041DBA7DBA4E042DBA8E043E044BDBCE045E046E047C0C9DBA3DBA6D6A3E048DBA9E049E04AE04BDBADE04CE04DE04EDBAEDBACBAC2E04FE050E051BFA4DBABE052E053E054DBAAD4C7B2BFE055E056DBAFE057B9F9E058DBB0E059E05AE05BE05CB3BBE05DE05EE05FB5A6E060E061E062E063B6BCDBB1E064E065E066B6F5E067DBB2E068E069E06AE06BE06CE06DE06EE06FE070E071E072E073E074E075E076E077E078E079E07AE07BB1C9E07CE07DE07EE080DBB4E081E082E083DBB3DBB5E084E085E086E087E088E089E08AE08BE08CE08DE08EDBB7E08FDBB6E090E091E092E093E094E095E096DBB8E097E098E099E09AE09BE09CE09DE09EE09FDBB9E0A0E140DBBAE141E142D3CFF4FAC7F5D7C3C5E4F4FCF4FDF4FBE143BEC6E144E145E146E147D0EFE148E149B7D3E14AE14BD4CDCCAAE14CE14DF5A2F5A1BAA8F4FECBD6E14EE14FE150F5A4C0D2E151B3EAE152CDAAF5A5F5A3BDB4F5A8E153F5A9BDCDC3B8BFE1CBE1F5AAE154E155E156F5A6F5A7C4F0E157E158E159E15AE15BF5ACE15CB4BCE15DD7EDE15EB4D7F5ABF5AEE15FE160F5ADF5AFD0D1E161E162E163E164E165E166E167C3D1C8A9E168E169E16AE16BE16CE16DF5B0F5B1E16EE16FE170E171E172E173F5B2E174E175F5B3F5B4F5B5E176E177E178E179F5B7F5B6E17AE17BE17CE17DF5B8E17EE180E181E182E183E184E185E186E187E188E189E18AB2C9E18BD3D4CACDE18CC0EFD6D8D2B0C1BFE18DBDF0E18EE18FE190E191E192E193E194E195E196E197B8AAE198E199E19AE19BE19CE19DE19EE19FE1A0E240E241E242E243E244E245E246E247E248E249E24AE24BE24CE24DE24EE24FE250E251E252E253E254E255E256E257E258E259E25AE25BE25CE25DE25EE25FE260E261E262E263E264E265E266E267E268E269E26AE26BE26CE26DE26EE26FE270E271E272E273E274E275E276E277E278E279E27AE27BE27CE27DE27EE280E281E282E283E284E285E286E287E288E289E28AE28BE28CE28DE28EE28FE290E291E292E293E294E295E296E297E298E299E29AE29BE29CE29DE29EE29FE2A0E340E341E342E343E344E345E346E347E348E349E34AE34BE34CE34DE34EE34FE350E351E352E353E354E355E356E357E358E359E35AE35BE35CE35DE35EE35FE360E361E362E363E364E365E366E367E368E369E36AE36BE36CE36DBCF8E36EE36FE370E371E372E373E374E375E376E377E378E379E37AE37BE37CE37DE37EE380E381E382E383E384E385E386E387F6C6E388E389E38AE38BE38CE38DE38EE38FE390E391E392E393E394E395E396E397E398E399E39AE39BE39CE39DE39EE39FE3A0E440E441E442E443E444E445F6C7E446E447E448E449E44AE44BE44CE44DE44EE44FE450E451E452E453E454E455E456E457E458E459E45AE45BE45CE45DE45EF6C8E45FE460E461E462E463E464E465E466E467E468E469E46AE46BE46CE46DE46EE46FE470E471E472E473E474E475E476E477E478E479E47AE47BE47CE47DE47EE480E481E482E483E484E485E486E487E488E489E48AE48BE48CE48DE48EE48FE490E491E492E493E494E495E496E497E498E499E49AE49BE49CE49DE49EE49FE4A0E540E541E542E543E544E545E546E547E548E549E54AE54BE54CE54DE54EE54FE550E551E552E553E554E555E556E557E558E559E55AE55BE55CE55DE55EE55FE560E561E562E563E564E565E566E567E568E569E56AE56BE56CE56DE56EE56FE570E571E572E573F6C9E574E575E576E577E578E579E57AE57BE57CE57DE57EE580E581E582E583E584E585E586E587E588E589E58AE58BE58CE58DE58EE58FE590E591E592E593E594E595E596E597E598E599E59AE59BE59CE59DE59EE59FF6CAE5A0E640E641E642E643E644E645E646E647E648E649E64AE64BE64CE64DE64EE64FE650E651E652E653E654E655E656E657E658E659E65AE65BE65CE65DE65EE65FE660E661E662F6CCE663E664E665E666E667E668E669E66AE66BE66CE66DE66EE66FE670E671E672E673E674E675E676E677E678E679E67AE67BE67CE67DE67EE680E681E682E683E684E685E686E687E688E689E68AE68BE68CE68DE68EE68FE690E691E692E693E694E695E696E697E698E699E69AE69BE69CE69DF6CBE69EE69FE6A0E740E741E742E743E744E745E746E747F7E9E748E749E74AE74BE74CE74DE74EE74FE750E751E752E753E754E755E756E757E758E759E75AE75BE75CE75DE75EE75FE760E761E762E763E764E765E766E767E768E769E76AE76BE76CE76DE76EE76FE770E771E772E773E774E775E776E777E778E779E77AE77BE77CE77DE77EE780E781E782E783E784E785E786E787E788E789E78AE78BE78CE78DE78EE78FE790E791E792E793E794E795E796E797E798E799E79AE79BE79CE79DE79EE79FE7A0E840E841E842E843E844E845E846E847E848E849E84AE84BE84CE84DE84EF6CDE84FE850E851E852E853E854E855E856E857E858E859E85AE85BE85CE85DE85EE85FE860E861E862E863E864E865E866E867E868E869E86AE86BE86CE86DE86EE86FE870E871E872E873E874E875E876E877E878E879E87AF6CEE87BE87CE87DE87EE880E881E882E883E884E885E886E887E888E889E88AE88BE88CE88DE88EE88FE890E891E892E893E894EEC4EEC5EEC6D5EBB6A4EEC8EEC7EEC9EECAC7A5EECBEECCE895B7B0B5F6EECDEECFE896EECEE897B8C6EED0EED1EED2B6DBB3AED6D3C4C6B1B5B8D6EED3EED4D4BFC7D5BEFBCED9B9B3EED6EED5EED8EED7C5A5EED9EEDAC7AEEEDBC7AFEEDCB2A7EEDDEEDEEEDFEEE0EEE1D7EAEEE2EEE3BCD8EEE4D3CBCCFAB2ACC1E5EEE5C7A6C3ADE898EEE6EEE7EEE8EEE9EEEAEEEBEEECE899EEEDEEEEEEEFE89AE89BEEF0EEF1EEF2EEF4EEF3E89CEEF5CDADC2C1EEF6EEF7EEF8D5A1EEF9CFB3EEFAEEFBE89DEEFCEEFDEFA1EEFEEFA2B8F5C3FAEFA3EFA4BDC2D2BFB2F9EFA5EFA6EFA7D2F8EFA8D6FDEFA9C6CCE89EEFAAEFABC1B4EFACCFFACBF8EFAEEFADB3FAB9F8EFAFEFB0D0E2EFB1EFB2B7E6D0BFEFB3EFB4EFB5C8F1CCE0EFB6EFB7EFB8EFB9EFBAD5E0EFBBB4EDC3AAEFBCE89FEFBDEFBEEFBFE8A0CEFDEFC0C2E0B4B8D7B6BDF5E940CFC7EFC3EFC1EFC2EFC4B6A7BCFCBEE2C3CCEFC5EFC6E941EFC7EFCFEFC8EFC9EFCAC7C2EFF1B6CDEFCBE942EFCCEFCDB6C6C3BEEFCEE943EFD0EFD1EFD2D5F2E944EFD3C4F7E945EFD4C4F8EFD5EFD6B8E4B0F7EFD7EFD8EFD9E946EFDAEFDBEFDCEFDDE947EFDEBEB5EFE1EFDFEFE0E948EFE2EFE3C1CDEFE4EFE5EFE6EFE7EFE8EFE9EFEAEFEBEFECC0D8E949EFEDC1ADEFEEEFEFEFF0E94AE94BCFE2E94CE94DE94EE94FE950E951E952E953B3A4E954E955E956E957E958E959E95AE95BE95CE95DE95EE95FE960E961E962E963E964E965E966E967E968E969E96AE96BE96CE96DE96EE96FE970E971E972E973E974E975E976E977E978E979E97AE97BE97CE97DE97EE980E981E982E983E984E985E986E987E988E989E98AE98BE98CE98DE98EE98FE990E991E992E993E994E995E996E997E998E999E99AE99BE99CE99DE99EE99FE9A0EA40EA41EA42EA43EA44EA45EA46EA47EA48EA49EA4AEA4BEA4CEA4DEA4EEA4FEA50EA51EA52EA53EA54EA55EA56EA57EA58EA59EA5AEA5BC3C5E3C5C9C1E3C6EA5CB1D5CECAB4B3C8F2E3C7CFD0E3C8BCE4E3C9E3CAC3C6D5A2C4D6B9EBCEC5E3CBC3F6E3CCEA5DB7A7B8F3BAD2E3CDE3CED4C4E3CFEA5EE3D0D1CBE3D1E3D2E3D3E3D4D1D6E3D5B2FBC0BBE3D6EA5FC0ABE3D7E3D8E3D9EA60E3DAE3DBEA61B8B7DAE2EA62B6D3EA63DAE4DAE3EA64EA65EA66EA67EA68EA69EA6ADAE6EA6BEA6CEA6DC8EEEA6EEA6FDAE5B7C0D1F4D2F5D5F3BDD7EA70EA71EA72EA73D7E8DAE8DAE7EA74B0A2CDD3EA75DAE9EA76B8BDBCCAC2BDC2A4B3C2DAEAEA77C2AAC4B0BDB5EA78EA79CFDEEA7AEA7BEA7CDAEBC9C2EA7DEA7EEA80EA81EA82B1DDEA83EA84EA85DAECEA86B6B8D4BAEA87B3FDEA88EA89DAEDD4C9CFD5C5E3EA8ADAEEEA8BEA8CEA8DEA8EEA8FDAEFEA90DAF0C1EACCD5CFDDEA91EA92EA93EA94EA95EA96EA97EA98EA99EA9AEA9BEA9CEA9DD3E7C2A1EA9EDAF1EA9FEAA0CBE5EB40DAF2EB41CBE6D2FEEB42EB43EB44B8F4EB45EB46DAF3B0AFCFB6EB47EB48D5CFEB49EB4AEB4BEB4CEB4DEB4EEB4FEB50EB51EB52CBEDEB53EB54EB55EB56EB57EB58EB59EB5ADAF4EB5BEB5CE3C4EB5DEB5EC1A5EB5FEB60F6BFEB61EB62F6C0F6C1C4D1EB63C8B8D1E3EB64EB65D0DBD1C5BCAFB9CDEB66EFF4EB67EB68B4C6D3BAF6C2B3FBEB69EB6AF6C3EB6BEB6CB5F1EB6DEB6EEB6FEB70EB71EB72EB73EB74EB75EB76F6C5EB77EB78EB79EB7AEB7BEB7CEB7DD3EAF6A7D1A9EB7EEB80EB81EB82F6A9EB83EB84EB85F6A8EB86EB87C1E3C0D7EB88B1A2EB89EB8AEB8BEB8CCEEDEB8DD0E8F6ABEB8EEB8FCFF6EB90F6AAD5F0F6ACC3B9EB91EB92EB93BBF4F6AEF6ADEB94EB95EB96C4DEEB97EB98C1D8EB99EB9AEB9BEB9CEB9DCBAAEB9ECFBCEB9FEBA0EC40EC41EC42EC43EC44EC45EC46EC47EC48F6AFEC49EC4AF6B0EC4BEC4CF6B1EC4DC2B6EC4EEC4FEC50EC51EC52B0D4C5F9EC53EC54EC55EC56F6B2EC57EC58EC59EC5AEC5BEC5CEC5DEC5EEC5FEC60EC61EC62EC63EC64EC65EC66EC67EC68EC69C7E0F6A6EC6AEC6BBEB8EC6CEC6DBEB2EC6EB5E5EC6FEC70B7C7EC71BFBFC3D2C3E6EC72EC73D8CCEC74EC75EC76B8EFEC77EC78EC79EC7AEC7BEC7CEC7DEC7EEC80BDF9D1A5EC81B0D0EC82EC83EC84EC85EC86F7B0EC87EC88EC89EC8AEC8BEC8CEC8DEC8EF7B1EC8FEC90EC91EC92EC93D0ACEC94B0B0EC95EC96EC97F7B2F7B3EC98F7B4EC99EC9AEC9BC7CAEC9CEC9DEC9EEC9FECA0ED40ED41BECFED42ED43F7B7ED44ED45ED46ED47ED48ED49ED4AF7B6ED4BB1DEED4CF7B5ED4DED4EF7B8ED4FF7B9ED50ED51ED52ED53ED54ED55ED56ED57ED58ED59ED5AED5BED5CED5DED5EED5FED60ED61ED62ED63ED64ED65ED66ED67ED68ED69ED6AED6BED6CED6DED6EED6FED70ED71ED72ED73ED74ED75ED76ED77ED78ED79ED7AED7BED7CED7DED7EED80ED81CEA4C8CDED82BAABE8B8E8B9E8BABEC2ED83ED84ED85ED86ED87D2F4ED88D4CFC9D8ED89ED8AED8BED8CED8DED8EED8FED90ED91ED92ED93ED94ED95ED96ED97ED98ED99ED9AED9BED9CED9DED9EED9FEDA0EE40EE41EE42EE43EE44EE45EE46EE47EE48EE49EE4AEE4BEE4CEE4DEE4EEE4FEE50EE51EE52EE53EE54EE55EE56EE57EE58EE59EE5AEE5BEE5CEE5DEE5EEE5FEE60EE61EE62EE63EE64EE65EE66EE67EE68EE69EE6AEE6BEE6CEE6DEE6EEE6FEE70EE71EE72EE73EE74EE75EE76EE77EE78EE79EE7AEE7BEE7CEE7DEE7EEE80EE81EE82EE83EE84EE85EE86EE87EE88EE89EE8AEE8BEE8CEE8DEE8EEE8FEE90EE91EE92EE93EE94EE95EE96EE97EE98EE99EE9AEE9BEE9CEE9DEE9EEE9FEEA0EF40EF41EF42EF43EF44EF45D2B3B6A5C7EAF1FCCFEECBB3D0EBE7EFCDE7B9CBB6D9F1FDB0E4CBCCF1FED4A4C2ADC1ECC6C4BEB1F2A1BCD5EF46F2A2F2A3EF47F2A4D2C3C6B5EF48CDC7F2A5EF49D3B1BFC5CCE2EF4AF2A6F2A7D1D5B6EEF2A8F2A9B5DFF2AAF2ABEF4BB2FCF2ACF2ADC8A7EF4CEF4DEF4EEF4FEF50EF51EF52EF53EF54EF55EF56EF57EF58EF59EF5AEF5BEF5CEF5DEF5EEF5FEF60EF61EF62EF63EF64EF65EF66EF67EF68EF69EF6AEF6BEF6CEF6DEF6EEF6FEF70EF71B7E7EF72EF73ECA9ECAAECABEF74ECACEF75EF76C6AEECADECAEEF77EF78EF79B7C9CAB3EF7AEF7BEF7CEF7DEF7EEF80EF81E2B8F7CFEF82EF83EF84EF85EF86EF87EF88EF89EF8AEF8BEF8CEF8DEF8EEF8FEF90EF91EF92EF93EF94EF95EF96EF97EF98EF99EF9AEF9BEF9CEF9DEF9EEF9FEFA0F040F041F042F043F044F7D0F045F046B2CDF047F048F049F04AF04BF04CF04DF04EF04FF050F051F052F053F054F055F056F057F058F059F05AF05BF05CF05DF05EF05FF060F061F062F063F7D1F064F065F066F067F068F069F06AF06BF06CF06DF06EF06FF070F071F072F073F074F075F076F077F078F079F07AF07BF07CF07DF07EF080F081F082F083F084F085F086F087F088F089F7D3F7D2F08AF08BF08CF08DF08EF08FF090F091F092F093F094F095F096E2BBF097BCA2F098E2BCE2BDE2BEE2BFE2C0E2C1B7B9D2FBBDA4CACEB1A5CBC7F099E2C2B6FCC8C4E2C3F09AF09BBDC8F09CB1FDE2C4F09DB6F6E2C5C4D9F09EF09FE2C6CFDAB9DDE2C7C0A1F0A0E2C8B2F6F140E2C9F141C1F3E2CAE2CBC2F8E2CCE2CDE2CECAD7D8B8D9E5CFE3F142F143F144F145F146F147F148F149F14AF14BF14CF0A5F14DF14EDCB0F14FF150F151F152F153F154F155F156F157F158F159F15AF15BF15CF15DF15EF15FF160F161F162F163F164F165F166F167F168F169F16AF16BF16CF16DF16EF16FF170F171F172F173F174F175F176F177F178F179F17AF17BF17CF17DF17EF180F181F182F183F184F185F186F187F188F189F18AF18BF18CF18DF18EF18FF190F191F192F193F194F195F196F197F198F199F19AF19BF19CF19DF19EF19FF1A0F240F241F242F243F244F245F246F247F248F249F24AF24BF24CF24DF24EF24FF250F251F252F253F254F255F256F257F258F259F25AF25BF25CF25DF25EF25FF260F261F262F263F264F265F266F267F268F269F26AF26BF26CF26DF26EF26FF270F271F272F273F274F275F276F277F278F279F27AF27BF27CF27DF27EF280F281F282F283F284F285F286F287F288F289F28AF28BF28CF28DF28EF28FF290F291F292F293F294F295F296F297F298F299F29AF29BF29CF29DF29EF29FF2A0F340F341F342F343F344F345F346F347F348F349F34AF34BF34CF34DF34EF34FF350F351C2EDD4A6CDD4D1B1B3DBC7FDF352B2B5C2BFE6E0CABBE6E1E6E2BED4E6E3D7A4CDD5E6E5BCDDE6E4E6E6E6E7C2EEF353BDBEE6E8C2E6BAA7E6E9F354E6EAB3D2D1E9F355F356BFA5E6EBC6EFE6ECE6EDF357F358E6EEC6ADE6EFF359C9A7E6F0E6F1E6F2E5B9E6F3E6F4C2E2E6F5E6F6D6E8E6F7F35AE6F8B9C7F35BF35CF35DF35EF35FF360F361F7BBF7BAF362F363F364F365F7BEF7BCBAA1F366F7BFF367F7C0F368F369F36AF7C2F7C1F7C4F36BF36CF7C3F36DF36EF36FF370F371F7C5F7C6F372F373F374F375F7C7F376CBE8F377F378F379F37AB8DFF37BF37CF37DF37EF380F381F7D4F382F7D5F383F384F385F386F7D6F387F388F389F38AF7D8F38BF7DAF38CF7D7F38DF38EF38FF390F391F392F393F394F395F7DBF396F7D9F397F398F399F39AF39BF39CF39DD7D7F39EF39FF3A0F440F7DCF441F442F443F444F445F446F7DDF447F448F449F7DEF44AF44BF44CF44DF44EF44FF450F451F452F453F454F7DFF455F456F457F7E0F458F459F45AF45BF45CF45DF45EF45FF460F461F462DBCBF463F464D8AAF465F466F467F468F469F46AF46BF46CE5F7B9EDF46DF46EF46FF470BFFDBBEAF7C9C6C7F7C8F471F7CAF7CCF7CBF472F473F474F7CDF475CEBAF476F7CEF477F478C4A7F479F47AF47BF47CF47DF47EF480F481F482F483F484F485F486F487F488F489F48AF48BF48CF48DF48EF48FF490F491F492F493F494F495F496F497F498F499F49AF49BF49CF49DF49EF49FF4A0F540F541F542F543F544F545F546F547F548F549F54AF54BF54CF54DF54EF54FF550F551F552F553F554F555F556F557F558F559F55AF55BF55CF55DF55EF55FF560F561F562F563F564F565F566F567F568F569F56AF56BF56CF56DF56EF56FF570F571F572F573F574F575F576F577F578F579F57AF57BF57CF57DF57EF580F581F582F583F584F585F586F587F588F589F58AF58BF58CF58DF58EF58FF590F591F592F593F594F595F596F597F598F599F59AF59BF59CF59DF59EF59FF5A0F640F641F642F643F644F645F646F647F648F649F64AF64BF64CF64DF64EF64FF650F651F652F653F654F655F656F657F658F659F65AF65BF65CF65DF65EF65FF660F661F662F663F664F665F666F667F668F669F66AF66BF66CF66DF66EF66FF670F671F672F673F674F675F676F677F678F679F67AF67BF67CF67DF67EF680F681F682F683F684F685F686F687F688F689F68AF68BF68CF68DF68EF68FF690F691F692F693F694F695F696F697F698F699F69AF69BF69CF69DF69EF69FF6A0F740F741F742F743F744F745F746F747F748F749F74AF74BF74CF74DF74EF74FF750F751F752F753F754F755F756F757F758F759F75AF75BF75CF75DF75EF75FF760F761F762F763F764F765F766F767F768F769F76AF76BF76CF76DF76EF76FF770F771F772F773F774F775F776F777F778F779F77AF77BF77CF77DF77EF780D3E3F781F782F6CFF783C2B3F6D0F784F785F6D1F6D2F6D3F6D4F786F787F6D6F788B1ABF6D7F789F6D8F6D9F6DAF78AF6DBF6DCF78BF78CF78DF78EF6DDF6DECFCAF78FF6DFF6E0F6E1F6E2F6E3F6E4C0F0F6E5F6E6F6E7F6E8F6E9F790F6EAF791F6EBF6ECF792F6EDF6EEF6EFF6F0F6F1F6F2F6F3F6F4BEA8F793F6F5F6F6F6F7F6F8F794F795F796F797F798C8FAF6F9F6FAF6FBF6FCF799F79AF6FDF6FEF7A1F7A2F7A3F7A4F7A5F79BF79CF7A6F7A7F7A8B1EEF7A9F7AAF7ABF79DF79EF7ACF7ADC1DBF7AEF79FF7A0F7AFF840F841F842F843F844F845F846F847F848F849F84AF84BF84CF84DF84EF84FF850F851F852F853F854F855F856F857F858F859F85AF85BF85CF85DF85EF85FF860F861F862F863F864F865F866F867F868F869F86AF86BF86CF86DF86EF86FF870F871F872F873F874F875F876F877F878F879F87AF87BF87CF87DF87EF880F881F882F883F884F885F886F887F888F889F88AF88BF88CF88DF88EF88FF890F891F892F893F894F895F896F897F898F899F89AF89BF89CF89DF89EF89FF8A0F940F941F942F943F944F945F946F947F948F949F94AF94BF94CF94DF94EF94FF950F951F952F953F954F955F956F957F958F959F95AF95BF95CF95DF95EF95FF960F961F962F963F964F965F966F967F968F969F96AF96BF96CF96DF96EF96FF970F971F972F973F974F975F976F977F978F979F97AF97BF97CF97DF97EF980F981F982F983F984F985F986F987F988F989F98AF98BF98CF98DF98EF98FF990F991F992F993F994F995F996F997F998F999F99AF99BF99CF99DF99EF99FF9A0FA40FA41FA42FA43FA44FA45FA46FA47FA48FA49FA4AFA4BFA4CFA4DFA4EFA4FFA50FA51FA52FA53FA54FA55FA56FA57FA58FA59FA5AFA5BFA5CFA5DFA5EFA5FFA60FA61FA62FA63FA64FA65FA66FA67FA68FA69FA6AFA6BFA6CFA6DFA6EFA6FFA70FA71FA72FA73FA74FA75FA76FA77FA78FA79FA7AFA7BFA7CFA7DFA7EFA80FA81FA82FA83FA84FA85FA86FA87FA88FA89FA8AFA8BFA8CFA8DFA8EFA8FFA90FA91FA92FA93FA94FA95FA96FA97FA98FA99FA9AFA9BFA9CFA9DFA9EFA9FFAA0FB40FB41FB42FB43FB44FB45FB46FB47FB48FB49FB4AFB4BFB4CFB4DFB4EFB4FFB50FB51FB52FB53FB54FB55FB56FB57FB58FB59FB5AFB5BC4F1F0AFBCA6F0B0C3F9FB5CC5B8D1BBFB5DF0B1F0B2F0B3F0B4F0B5D1BCFB5ED1ECFB5FF0B7F0B6D4A7FB60CDD2F0B8F0BAF0B9F0BBF0BCFB61FB62B8EBF0BDBAE8FB63F0BEF0BFBEE9F0C0B6ECF0C1F0C2F0C3F0C4C8B5F0C5F0C6FB64F0C7C5F4FB65F0C8FB66FB67FB68F0C9FB69F0CAF7BDFB6AF0CBF0CCF0CDFB6BF0CEFB6CFB6DFB6EFB6FF0CFBAD7FB70F0D0F0D1F0D2F0D3F0D4F0D5F0D6F0D8FB71FB72D3A5F0D7FB73F0D9FB74FB75FB76FB77FB78FB79FB7AFB7BFB7CFB7DF5BAC2B9FB7EFB80F7E4FB81FB82FB83FB84F7E5F7E6FB85FB86F7E7FB87FB88FB89FB8AFB8BFB8CF7E8C2B4FB8DFB8EFB8FFB90FB91FB92FB93FB94FB95F7EAFB96F7EBFB97FB98FB99FB9AFB9BFB9CC2F3FB9DFB9EFB9FFBA0FC40FC41FC42FC43FC44FC45FC46FC47FC48F4F0FC49FC4AFC4BF4EFFC4CFC4DC2E9FC4EF7E1F7E2FC4FFC50FC51FC52FC53BBC6FC54FC55FC56FC57D9E4FC58FC59FC5ACAF2C0E8F0A4FC5BBADAFC5CFC5DC7ADFC5EFC5FFC60C4ACFC61FC62F7ECF7EDF7EEFC63F7F0F7EFFC64F7F1FC65FC66F7F4FC67F7F3FC68F7F2F7F5FC69FC6AFC6BFC6CF7F6FC6DFC6EFC6FFC70FC71FC72FC73FC74FC75EDE9FC76EDEAEDEBFC77F6BCFC78FC79FC7AFC7BFC7CFC7DFC7EFC80FC81FC82FC83FC84F6BDFC85F6BEB6A6FC86D8BEFC87FC88B9C4FC89FC8AFC8BD8BBFC8CDCB1FC8DFC8EFC8FFC90FC91FC92CAF3FC93F7F7FC94FC95FC96FC97FC98FC99FC9AFC9BFC9CF7F8FC9DFC9EF7F9FC9FFCA0FD40FD41FD42FD43FD44F7FBFD45F7FAFD46B1C7FD47F7FCF7FDFD48FD49FD4AFD4BFD4CF7FEFD4DFD4EFD4FFD50FD51FD52FD53FD54FD55FD56FD57C6EBECB4FD58FD59FD5AFD5BFD5CFD5DFD5EFD5FFD60FD61FD62FD63FD64FD65FD66FD67FD68FD69FD6AFD6BFD6CFD6DFD6EFD6FFD70FD71FD72FD73FD74FD75FD76FD77FD78FD79FD7AFD7BFD7CFD7DFD7EFD80FD81FD82FD83FD84FD85B3DDF6B3FD86FD87F6B4C1E4F6B5F6B6F6B7F6B8F6B9F6BAC8A3F6BBFD88FD89FD8AFD8BFD8CFD8DFD8EFD8FFD90FD91FD92FD93C1FAB9A8EDE8FD94FD95FD96B9EAD9DFFD97FD98FD99FD9AFD9';
                switch (pChoice) {
                    case "ENCODE":
                            if ($('[name=charsetSelect]').val() != 'gb2312') {
                                outputEle.value = encodeURIComponent(inputEle.value);
                            } else {
                                outputEle.value = tc.urlencode.gb2312En(inputEle.value,z);
                            }
                            var strValue = ''
                            outputEle.value.split('%0A').forEach(ele => {
                                strValue += ele + '\n'
                            });
                            outputEle.value = strValue
                        break;
                    case "DECODE":
                        if ($('[name=charsetSelect]').val() != 'gb2312') {
                            outputEle.value = decodeURIComponent(inputEle.value);
                        } else {
                            outputEle.value = inputEle.value;
                        }
                        break;
                }
            },
            gb2312En: function (str,z) {
                var strOut="";
                for(var i = 0; i < str.length; i++){
                    if( str[i].match( /^[\u4E00-\u9FA5]{1,}$/) ){
                        var c = str.charAt(i);
                        var code = str.charCodeAt(i);
                        if(c==" ") strOut +="+";
                        else if(code >= 19968 && code <= 40869){
                            index = code - 19968;
                            strOut += "%" + z.substr(index*4,2) + "%" + z.substr(index*4+2,2);
                        }
                        else{
                            strOut += "%" + str.charCodeAt(i).toString(16);
                        }
                    }else{
                        strOut += encodeURIComponent(str[i])
                    }
                    
                }
                return strOut;
            }
        },
        cnurlencode: {
            checked: function (value) {
                $('#encodetype').val(value)
                $('input[value='+ value +']').prop('checked', true)
            },
            url: function () {
                var inputEle = document.getElementById('content');
                var encodetype = $('#encodetype').val()
                var Expression = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*([\?&]\w+=\w*)*/;
                var str = [],urlHtml = ''
                tc.cnurlencode.IdnMapping()
                $.each(inputEle.value.split('\n'),function(i,value) {
                    if(value!=''){
                        if(value.indexOf("<") >= 0 || value.indexOf(">") >= 0){
                            layer.msg('url地址包含非法字符',{ offset: '50%' })
                        }else if(value.indexOf(" ") >= 0 && !Expression.test(value) || value.indexOf(".") < 0 || value.split('.')[0] == ''){
                            str.push(value + ',错误域名')
                        }else{
                            str.push(value + ',' + tc.cnurlencode.toASCII(inputEle.value.split('\n')[i]))
                        }
                    }
                })
                
                if(inputEle.value.length <= 1){
                    layer.msg('请输入要查询的域名',{ offset: '50%' })
                }else if(str.length > 20){
                    layer.msg('域名数量不能超过20',{ offset: '50%' })
                }else{
                    switch (encodetype) {
                        case "1":
                            $.each(str,function(i,value) {
                                if(value.indexOf('错误域名') >= 0){
                                    urlHtml += '<li class="ReListCent ReLists item clearfix"><div class="w5-0">'+ parseInt(i+1) +'</div><div class="w30-0">'+ value.split(',')[0] +'</div><div class="w60-0 tl pl10">'+ value.split(',')[1] +'</div></li>'
                                }else{
                                    urlHtml += '<li class="ReListCent ReLists item clearfix"><div class="w5-0">'+ parseInt(i+1) +'</div><div class="w30-0">'+ value.split(',')[0] +'</div><div class="w60-0 tl pl10">'+ tc.cnurlencode.toUnicode(value.split(',')[1]).replace('http://','').replace('www.','') +'</div></li>'
                                }
                            });
                            break;
                        case "2":
                            $.each(str,function(i,value) {
                                if(value.indexOf('错误域名') >= 0){
                                    urlHtml += '<li class="ReListCent ReLists item clearfix"><div class="w5-0">'+ parseInt(i+1) +'</div><div class="w30-0">'+ value.split(',')[0] +'</div><div class="w60-0 tl pl10">'+ value.split(',')[1] +'</div></li>'
                                }else{
                                    urlHtml += '<li class="ReListCent ReLists item clearfix"><div class="w5-0">'+ parseInt(i+1) +'</div><div class="w30-0">'+ value.split(',')[0] +'</div><div class="w60-0 tl pl10">'+ value.split(',')[1].replace('http://','') +'</div></li>'
                                }
                            });
                            break;
                    }
                    $('#ResultMain').show()
                    $('#ResultItem').empty().append(urlHtml)
                }
            },
            IdnMapping: function () {
                var maxInt = 2147483647,
                base = 36,
                tMin = 1,
                tMax = 26,
                skew = 38,
                damp = 700,
                initialBias = 72,
                initialN = 128,
                // 0x80
                delimiter = '-',
                // '\x2D'
                /** Regular expressions */
                regexPunycode = /^xn--/,
                regexNonASCII = /[^\x20-\x7E]/,
                // unprintable ASCII chars + non-ASCII chars
                regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g,
                // RFC 3490 separators
                /** Error messages */
                errors = {
                    'overflow': 'Overflow: input needs wider integers to process',
                    'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
                    'invalid-input': 'Invalid input'
                },
    
                /** Convenience shortcuts */
                baseMinusTMin = base - tMin,
                floor = Math.floor,
                stringFromCharCode = String.fromCharCode,
    
                /** Temporary variable */
                key;
    
                function error(type) {
                    throw RangeError(errors[type]);
                }
    
    
                function map(array, fn) {
                    var length = array.length;
                    var result = [];
                    while (length--) {
                        result[length] = fn(array[length]);
                    }
                    return result;
                }
    
                function mapDomain(string, fn) {
                    var parts = string.split('@');
                    var result = '';
                    if (parts.length > 1) {
                        // In email addresses, only the domain name should be punycoded. Leave
                        // the local part (i.e. everything up to `@`) intact.
                        result = parts[0] + '@';
                        string = parts[1];
                    }
                    // Avoid `split(regex)` for IE8 compatibility. See #17.
                    string = string.replace(regexSeparators, '\x2E');
                    var labels = string.split('.');
                    var encoded = map(labels, fn).join('.');
                    return result + encoded;
                }
    
                function ucs2decode(string) {
                    var output = [],
                    counter = 0,
                    length = string.length,
                    value,
                    extra;
                    while (counter < length) {
                        value = string.charCodeAt(counter++);
                        if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
                            // high surrogate, and there is a next character
                            extra = string.charCodeAt(counter++);
                            if ((extra & 0xFC00) == 0xDC00) { // low surrogate
                                output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
                            } else {
                                // unmatched surrogate; only append this code unit, in case the next
                                // code unit is the high surrogate of a surrogate pair
                                output.push(value);
                                counter--;
                            }
                        } else {
                            output.push(value);
                        }
                    }
                    return output;
                }
    
    
                function ucs2encode(array) {
                    return map(array,
                    function(value) {
                        var output = '';
                        if (value > 0xFFFF) {
                            value -= 0x10000;
                            output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
                            value = 0xDC00 | value & 0x3FF;
                        }
                        output += stringFromCharCode(value);
                        return output;
                    }).join('');
                }
    
    
                function basicToDigit(codePoint) {
                    if (codePoint - 48 < 10) {
                        return codePoint - 22;
                    }
                    if (codePoint - 65 < 26) {
                        return codePoint - 65;
                    }
                    if (codePoint - 97 < 26) {
                        return codePoint - 97;
                    }
                    return base;
                }
    
                function digitToBasic(digit, flag) {
                    //  0..25 map to ASCII a..z or A..Z
                    // 26..35 map to ASCII 0..9
                    return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
                }
    
                function adapt(delta, numPoints, firstTime) {
                    var k = 0;
                    delta = firstTime ? floor(delta / damp) : delta >> 1;
                    delta += floor(delta / numPoints);
                    for (
                    /* no initialization */
                    ; delta > baseMinusTMin * tMax >> 1; k += base) {
                        delta = floor(delta / baseMinusTMin);
                    }
                    return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
                }
    
    
                function decode(input) {
                    // Don't use UCS-2
                    var output = [],
                    inputLength = input.length,
                    out,
                    i = 0,
                    n = initialN,
                    bias = initialBias,
                    basic,
                    j,
                    index,
                    oldi,
                    w,
                    k,
                    digit,
                    t,
                    /** Cached calculation results */
                    baseMinusT;
                    basic = input.lastIndexOf(delimiter);
                    if (basic < 0) {
                        basic = 0;
                    }
    
                    for (j = 0; j < basic; ++j) {
                        // if it's not a basic code point
                        if (input.charCodeAt(j) >= 0x80) {
                            error('not-basic');
                        }
                        output.push(input.charCodeAt(j));
                    }
                    for (index = basic > 0 ? basic + 1 : 0; index < inputLength;
                    /* no final expression */
                    ) {
                        for (oldi = i, w = 1, k = base;
                        /* no condition */
                        ; k += base) {
    
                            if (index >= inputLength) {
                                error('invalid-input');
                            }
    
                            digit = basicToDigit(input.charCodeAt(index++));
    
                            if (digit >= base || digit > floor((maxInt - i) / w)) {
                                error('overflow');
                            }
    
                            i += digit * w;
                            t = k <= bias ? tMin: (k >= bias + tMax ? tMax: k - bias);
    
                            if (digit < t) {
                                break;
                            }
    
                            baseMinusT = base - t;
                            if (w > floor(maxInt / baseMinusT)) {
                                error('overflow');
                            }
    
                            w *= baseMinusT;
    
                        }
    
                        out = output.length + 1;
                        bias = adapt(i - oldi, out, oldi == 0);
    
                        // `i` was supposed to wrap around from `out` to `0`,
                        // incrementing `n` each time, so we'll fix that now:
                        if (floor(i / out) > maxInt - n) {
                            error('overflow');
                        }
    
                        n += floor(i / out);
                        i %= out;
    
                        // Insert `n` at position `i` of the output
                        output.splice(i++, 0, n);
    
                    }
    
                    return ucs2encode(output);
                }
    
    
                function encode(input) {
                    var n, delta, handledCPCount, basicLength, bias, j, m, q, k, t, currentValue, output = [],
                    /** `inputLength` will hold the number of code points in `input`. */
                    inputLength,
                    /** Cached calculation results */
                    handledCPCountPlusOne,
                    baseMinusT,
                    qMinusT;
    
                    // Convert the input in UCS-2 to Unicode
                    input = ucs2decode(input);
    
                    // Cache the length
                    inputLength = input.length;
    
                    // Initialize the state
                    n = initialN;
                    delta = 0;
                    bias = initialBias;
    
                    // Handle the basic code points
                    for (j = 0; j < inputLength; ++j) {
                        currentValue = input[j];
                        if (currentValue < 0x80) {
                            output.push(stringFromCharCode(currentValue));
                        }
                    }
    
                    handledCPCount = basicLength = output.length;
    
                    // `handledCPCount` is the number of code points that have been handled;
                    // `basicLength` is the number of basic code points.
                    // Finish the basic string - if it is not empty - with a delimiter
                    if (basicLength) {
                        output.push(delimiter);
                    }
    
                    // Main encoding loop:
                    while (handledCPCount < inputLength) {
    
                        // All non-basic code points < n have been handled already. Find the next
                        // larger one:
                        for (m = maxInt, j = 0; j < inputLength; ++j) {
                            currentValue = input[j];
                            if (currentValue >= n && currentValue < m) {
                                m = currentValue;
                            }
                        }
    
                        // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
                        // but guard against overflow
                        handledCPCountPlusOne = handledCPCount + 1;
                        if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
                            error('overflow');
                        }
    
                        delta += (m - n) * handledCPCountPlusOne;
                        n = m;
    
                        for (j = 0; j < inputLength; ++j) {
                            currentValue = input[j];
    
                            if (currentValue < n && ++delta > maxInt) {
                                error('overflow');
                            }
    
                            if (currentValue == n) {
                                // Represent delta as a generalized variable-length integer
                                for (q = delta, k = base;
                                /* no condition */
                                ; k += base) {
                                    t = k <= bias ? tMin: (k >= bias + tMax ? tMax: k - bias);
                                    if (q < t) {
                                        break;
                                    }
                                    qMinusT = q - t;
                                    baseMinusT = base - t;
                                    output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
                                    q = floor(qMinusT / baseMinusT);
                                }
    
                                output.push(stringFromCharCode(digitToBasic(q, 0)));
                                bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                                delta = 0; ++handledCPCount;
                            }
                        }
    
                        ++delta; ++n;
    
                    }
                    return output.join('');
                }
    
                this.toUnicode = function(input) {
                    return mapDomain(input,
                    function(string) {
                        return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
                    });
                }
    
                this.toASCII = function(input) {
                    return mapDomain(input,
                    function(string) {
                        return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
                    });
                }
    
            }
        },
        hexs: {
            hexCode: function(pChoice){
                var inputEle = document.getElementById('content');
                var outputEle = document.getElementById('result');
                tc.cnurlencode.IdnMapping()
                var z='D2BBB6A18140C6DF814181428143CDF2D5C9C8FDC9CFCFC2D8A2B2BBD3EB8144D8A4B3F38145D7A8C7D2D8A7CAC08146C7F0B1FBD2B5B4D4B6ABCBBFD8A9814781488149B6AA814AC1BDD1CF814BC9A5D8AD814CB8F6D1BEE3DCD6D0814D814EB7E1814FB4AE8150C1D98151D8BC8152CDE8B5A4CEAAD6F78153C0F6BED9D8AF815481558156C4CB8157BEC38158D8B1C3B4D2E58159D6AECEDAD5A7BAF5B7A6C0D6815AC6B9C5D2C7C7815BB9D4815CB3CBD2D2815D815ED8BFBEC5C6F2D2B2CFB0CFE7815F816081618162CAE981638164D8C081658166816781688169816AC2F2C2D2816BC8E9816C816D816E816F817081718172817381748175C7AC8176817781788179817A817B817CC1CB817DD3E8D5F9817ECAC2B6FED8A1D3DABFF78180D4C6BBA5D8C1CEE5BEAE81818182D8A88183D1C7D0A9818481858186D8BDD9EFCDF6BFBA8187BDBBBAA5D2E0B2FABAE0C4B68188CFEDBEA9CDA4C1C18189818A818BC7D7D9F1818CD9F4818D818E818F8190C8CBD8E9819181928193D2DACAB2C8CAD8ECD8EAD8C6BDF6C6CDB3F08194D8EBBDF1BDE98195C8D4B4D381968197C2D88198B2D6D7D0CACBCBFBD5CCB8B6CFC98199819A819BD9DAD8F0C7AA819CD8EE819DB4FAC1EED2D4819E819FD8ED81A0D2C7D8EFC3C781A181A281A3D1F681A4D6D9D8F281A5D8F5BCFEBCDB81A681A781A8C8CE81A9B7DD81AAB7C281ABC6F381AC81AD81AE81AF81B081B181B2D8F8D2C181B381B4CEE9BCBFB7FCB7A5D0DD81B581B681B781B881B9D6DAD3C5BBEFBBE1D8F181BA81BBC9A1CEB0B4AB81BCD8F381BDC9CBD8F6C2D7D8F781BE81BFCEB1D8F981C081C181C2B2AEB9C081C3D9A381C4B0E981C5C1E681C6C9EC81C7CBC581C8CBC6D9A481C981CA81CB81CC81CDB5E881CE81CFB5AB81D081D181D281D381D481D5CEBBB5CDD7A1D7F4D3D381D6CCE581D7BACE81D8D9A2D9DCD3E0D8FDB7F0D7F7D8FED8FAD9A1C4E381D981DAD3B6D8F4D9DD81DBD8FB81DCC5E581DD81DEC0D081DF81E0D1F0B0DB81E181E2BCD1D9A681E3D9A581E481E581E681E7D9ACD9AE81E8D9ABCAB981E981EA81EBD9A9D6B681EC81ED81EEB3DED9A881EFC0FD81F0CACC81F1D9AA81F2D9A781F381F4D9B081F581F6B6B181F781F881F9B9A981FAD2C081FB81FCCFC081FD81FEC2C28240BDC4D5ECB2E0C7C8BFEBD9AD8241D9AF8242CEEABAEE82438244824582468247C7D682488249824A824B824C824D824E824F8250B1E3825182528253B4D9B6EDD9B48254825582568257BFA182588259825AD9DEC7CEC0FED9B8825B825C825D825E825FCBD7B7FD8260D9B58261D9B7B1A3D3E1D9B98262D0C58263D9B682648265D9B18266D9B2C1A9D9B382678268BCF3D0DEB8A98269BEE3826AD9BD826B826C826D826ED9BA826FB0B3827082718272D9C28273827482758276827782788279827A827B827C827D827E8280D9C4B1B68281D9BF82828283B5B98284BEF3828582868287CCC8BAF2D2D08288D9C38289828ABDE8828BB3AB828C828D828ED9C5BEEB828FD9C6D9BBC4DF8290D9BED9C1D9C0829182928293829482958296829782988299829A829BD5AE829CD6B5829DC7E3829E829F82A082A1D9C882A282A382A4BCD9D9CA82A582A682A7D9BC82A8D9CBC6AB82A982AA82AB82AC82ADD9C982AE82AF82B082B1D7F682B2CDA382B382B482B582B682B782B882B982BABDA182BB82BC82BD82BE82BF82C0D9CC82C182C282C382C482C582C682C782C882C9C5BCCDB582CA82CB82CCD9CD82CD82CED9C7B3A5BFFE82CF82D082D182D2B8B582D382D4C0FC82D582D682D782D8B0F882D982DA82DB82DC82DD82DE82DF82E082E182E282E382E482E582E682E782E882E982EA82EB82EC82EDB4F682EED9CE82EFD9CFB4A2D9D082F082F1B4DF82F282F382F482F582F6B0C182F782F882F982FA82FB82FC82FDD9D1C9B582FE8340834183428343834483458346834783488349834A834B834C834D834E834F83508351CFF1835283538354835583568357D9D283588359835AC1C5835B835C835D835E835F836083618362836383648365D9D6C9AE8366836783688369D9D5D9D4D9D7836A836B836C836DCBDB836EBDA9836F8370837183728373C6A7837483758376837783788379837A837B837C837DD9D3D9D8837E83808381D9D9838283838384838583868387C8E583888389838A838B838C838D838E838F839083918392839383948395C0DC8396839783988399839A839B839C839D839E839F83A083A183A283A383A483A583A683A783A883A983AA83AB83AC83AD83AE83AF83B083B183B2B6F9D8A3D4CA83B3D4AAD0D6B3E4D5D783B4CFC8B9E283B5BFCB83B6C3E283B783B883B9B6D283BA83BBCDC3D9EED9F083BC83BD83BEB5B383BFB6B583C083C183C283C383C4BEA483C583C6C8EB83C783C8C8AB83C983CAB0CBB9ABC1F9D9E283CBC0BCB9B283CCB9D8D0CBB1F8C6E4BEDFB5E4D7C883CDD1F8BCE6CADE83CE83CFBCBDD9E6D8E783D083D1C4DA83D283D3B8D4C8BD83D483D5B2E1D4D983D683D783D883D9C3B083DA83DBC3E1DAA2C8DF83DCD0B483DDBEFCC5A983DE83DF83E0B9DA83E1DAA383E2D4A9DAA483E383E483E583E683E7D9FBB6AC83E883E9B7EBB1F9D9FCB3E5BEF683EABFF6D2B1C0E483EB83EC83EDB6B3D9FED9FD83EE83EFBEBB83F083F183F2C6E083F3D7BCDAA183F4C1B983F5B5F2C1E883F683F7BCF583F8B4D583F983FA83FB83FC83FD83FE844084418442C1DD8443C4FD84448445BCB8B7B284468447B7EF84488449844A844B844C844DD9EC844EC6BE844FBFADBBCB84508451B5CA8452DBC9D0D78453CDB9B0BCB3F6BBF7DBCABAAF8454D4E4B5B6B5F3D8D6C8D084558456B7D6C7D0D8D78457BFAF84588459DBBBD8D8845A845BD0CCBBAE845C845D845EEBBEC1D0C1F5D4F2B8D5B4B4845FB3F584608461C9BE846284638464C5D0846584668467C5D9C0FB8468B1F08469D8D9B9CE846AB5BD846B846CD8DA846D846ED6C6CBA2C8AFC9B2B4CCBFCC846FB9F48470D8DBD8DCB6E7BCC1CCEA847184728473847484758476CFF78477D8DDC7B084788479B9D0BDA3847A847BCCDE847CC6CA847D847E848084818482D8E08483D8DE84848485D8DF848684878488B0FE8489BEE7848ACAA3BCF4848B848C848D848EB8B1848F8490B8EE849184928493849484958496849784988499849AD8E2849BBDCB849CD8E4D8E3849D849E849F84A084A1C5FC84A284A384A484A584A684A784A8D8E584A984AAD8E684AB84AC84AD84AE84AF84B084B1C1A684B2C8B0B0ECB9A6BCD3CEF1DBBDC1D384B384B484B584B6B6AFD6FAC5ACBDD9DBBEDBBF84B784B884B9C0F8BEA2C0CD84BA84BB84BC84BD84BE84BF84C084C184C284C3DBC0CAC684C484C584C6B2AA84C784C884C9D3C284CAC3E384CBD1AB84CC84CD84CE84CFDBC284D0C0D584D184D284D3DBC384D4BFB184D584D684D784D884D984DAC4BC84DB84DC84DD84DEC7DA84DF84E084E184E284E384E484E584E684E784E884E9DBC484EA84EB84EC84ED84EE84EF84F084F1D9E8C9D784F284F384F4B9B4CEF0D4C884F584F684F784F8B0FCB4D284F9D0D984FA84FB84FC84FDD9E984FEDECBD9EB8540854185428543D8B0BBAFB1B18544B3D7D8CE85458546D4D185478548BDB3BFEF8549CFBB854A854BD8D0854C854D854EB7CB854F85508551D8D185528553855485558556855785588559855A855BC6A5C7F8D2BD855C855DD8D2C4E4855ECAAE855FC7A78560D8A68561C9FDCEE7BBDCB0EB856285638564BBAAD0AD8565B1B0D7E4D7BF8566B5A5C2F4C4CF85678568B2A98569B2B7856AB1E5DFB2D5BCBFA8C2ACD8D5C2B1856BD8D4CED4856CDAE0856DCEC0856E856FD8B4C3AED3A1CEA38570BCB4C8B4C2D18571BEEDD0B68572DAE18573857485758576C7E485778578B3A78579B6F2CCFCC0FA857A857BC0F7857CD1B9D1E1D8C7857D857E85808581858285838584B2DE85858586C0E58587BAF185888589D8C8858AD4AD858B858CCFE1D8C9858DD8CACFC3858EB3F8BEC7858F859085918592D8CB8593859485958596859785988599DBCC859A859B859C859DC8A5859E859F85A0CFD885A1C8FEB2CE85A285A385A485A585A6D3D6B2E6BCB0D3D1CBABB7B485A785A885A9B7A285AA85ABCAE585ACC8A1CADCB1E4D0F085ADC5D185AE85AF85B0DBC5B5FE85B185B2BFDAB9C5BEE4C1ED85B3DFB6DFB5D6BBBDD0D5D9B0C8B6A3BFC9CCA8DFB3CAB7D3D285B4D8CFD2B6BAC5CBBECCBE85B5DFB7B5F0DFB485B685B785B8D3F585B9B3D4B8F785BADFBA85BBBACFBCAAB5F585BCCDACC3FBBAF3C0F4CDC2CFF2DFB8CFC585BDC2C0DFB9C2F085BE85BF85C0BEFD85C1C1DFCDCCD2F7B7CDDFC185C2DFC485C385C4B7F1B0C9B6D6B7D485C5BAACCCFDBFD4CBB1C6F485C6D6A8DFC585C7CEE2B3B385C885C9CEFCB4B585CACEC7BAF085CBCEE185CCD1BD85CD85CEDFC085CF85D0B4F485D1B3CA85D2B8E6DFBB85D385D485D585D6C4C585D7DFBCDFBDDFBEC5BBDFBFDFC2D4B1DFC385D8C7BACED885D985DA85DB85DC85DDC4D885DEDFCA85DFDFCF85E0D6DC85E185E285E385E485E585E685E785E8DFC9DFDACEB685E9BAC7DFCEDFC8C5DE85EA85EBC9EBBAF4C3FC85EC85EDBED785EEDFC685EFDFCD85F0C5D885F185F285F385F4D5A6BACD85F5BECCD3BDB8C085F6D6E485F7DFC7B9BEBFA785F885F9C1FCDFCBDFCC85FADFD085FB85FC85FD85FE8640DFDBDFE58641DFD7DFD6D7C9DFE3DFE4E5EBD2A7DFD28642BFA98643D4DB8644BFC8DFD4864586468647CFCC86488649DFDD864AD1CA864BDFDEB0A7C6B7DFD3864CBAE5864DB6DFCDDBB9FED4D5864E864FDFDFCFECB0A5DFE7DFD1D1C6DFD5DFD8DFD9DFDC8650BBA98651DFE0DFE18652DFE2DFE6DFE8D3B486538654865586568657B8E7C5B6DFEAC9DAC1A8C4C486588659BFDECFF8865A865B865CD5DCDFEE865D865E865F866086618662B2B88663BADFDFEC8664DBC18665D1E48666866786688669CBF4B4BD866AB0A6866B866C866D866E866FDFF1CCC6DFF286708671DFED867286738674867586768677DFE986788679867A867BDFEB867CDFEFDFF0BBBD867D867EDFF386808681DFF48682BBA38683CADBCEA8E0A7B3AA8684E0A6868586868687E0A186888689868A868BDFFE868CCDD9DFFC868DDFFA868EBFD0D7C4868FC9CC86908691DFF8B0A186928693869486958696DFFD869786988699869ADFFBE0A2869B869C869D869E869FE0A886A086A186A286A3B7C886A486A5C6A1C9B6C0B2DFF586A686A7C5BE86A8D8C4DFF9C4F686A986AA86AB86AC86AD86AEE0A3E0A4E0A5D0A586AF86B0E0B4CCE486B1E0B186B2BFA6E0AFCEB9E0ABC9C686B386B4C0AEE0AEBAEDBAB0E0A986B586B686B7DFF686B8E0B386B986BAE0B886BB86BC86BDB4ADE0B986BE86BFCFB2BAC886C0E0B086C186C286C386C486C586C686C7D0FA86C886C986CA86CB86CC86CD86CE86CF86D0E0AC86D1D4FB86D2DFF786D3C5E786D4E0AD86D5D3F786D6E0B6E0B786D786D886D986DA86DBE0C4D0E186DC86DD86DEE0BC86DF86E0E0C9E0CA86E186E286E3E0BEE0AAC9A4E0C186E4E0B286E586E686E786E886E9CAC8E0C386EAE0B586EBCECB86ECCBC3E0CDE0C6E0C286EDE0CB86EEE0BAE0BFE0C086EF86F0E0C586F186F2E0C7E0C886F3E0CC86F4E0BB86F586F686F786F886F9CBD4E0D586FAE0D6E0D286FB86FC86FD86FE87408741E0D0BCCE87428743E0D18744B8C2D8C587458746874787488749874A874B874CD0EA874D874EC2EF874F8750E0CFE0BD875187528753E0D4E0D387548755E0D78756875787588759E0DCE0D8875A875B875CD6F6B3B0875DD7EC875ECBBB875F8760E0DA8761CEFB876287638764BAD987658766876787688769876A876B876C876D876E876F8770E0E1E0DDD2AD87718772877387748775E0E287768777E0DBE0D9E0DF87788779E0E0877A877B877C877D877EE0DE8780E0E4878187828783C6F7D8ACD4EBE0E6CAC98784878587868787E0E587888789878A878BB8C1878C878D878E878FE0E7E0E887908791879287938794879587968797E0E9E0E387988799879A879B879C879D879EBABFCCE7879F87A087A1E0EA87A287A387A487A587A687A787A887A987AA87AB87AC87AD87AE87AF87B0CFF987B187B287B387B487B587B687B787B887B987BA87BBE0EB87BC87BD87BE87BF87C087C187C2C8C287C387C487C587C6BDC087C787C887C987CA87CB87CC87CD87CE87CF87D087D187D287D3C4D287D487D587D687D787D887D987DA87DB87DCE0EC87DD87DEE0ED87DF87E0C7F4CBC487E1E0EEBBD8D8B6D2F2E0EFCDC587E2B6DA87E387E487E587E687E787E8E0F187E9D4B087EA87EBC0A7B4D187EC87EDCEA7E0F087EE87EF87F0E0F2B9CC87F187F2B9FACDBCE0F387F387F487F5C6D4E0F487F6D4B287F7C8A6E0F6E0F587F887F987FA87FB87FC87FD87FE8840884188428843884488458846884788488849E0F7884A884BCDC1884C884D884ECAA5884F885088518852D4DADBD7DBD98853DBD8B9E7DBDCDBDDB5D888548855DBDA8856885788588859885ADBDBB3A1DBDF885B885CBBF8885DD6B7885EDBE0885F886088618862BEF988638864B7BB8865DBD0CCAEBFB2BBB5D7F8BFD38866886788688869886ABFE9886B886CBCE1CCB3DBDEB0D3CEEBB7D8D7B9C6C2886D886EC0A4886FCCB98870DBE7DBE1C6BADBE38871DBE88872C5F7887388748875DBEA88768877DBE9BFC088788879887ADBE6DBE5887B887C887D887E8880B4B9C0ACC2A2DBE2DBE48881888288838884D0CDDBED88858886888788888889C0DDDBF2888A888B888C888D888E888F8890B6E28891889288938894DBF3DBD2B9B8D4ABDBEC8895BFD1DBF08896DBD18897B5E68898DBEBBFE58899889A889BDBEE889CDBF1889D889E889FDBF988A088A188A288A388A488A588A688A788A8B9A1B0A388A988AA88AB88AC88AD88AE88AFC2F188B088B1B3C7DBEF88B288B3DBF888B4C6D2DBF488B588B6DBF5DBF7DBF688B788B8DBFE88B9D3F2B2BA88BA88BB88BCDBFD88BD88BE88BF88C088C188C288C388C4DCA488C5DBFB88C688C788C888C9DBFA88CA88CB88CCDBFCC5E0BBF988CD88CEDCA388CF88D0DCA588D1CCC388D288D388D4B6D1DDC088D588D688D7DCA188D8DCA288D988DA88DBC7B588DC88DD88DEB6E988DF88E088E1DCA788E288E388E488E5DCA688E6DCA9B1A488E788E8B5CC88E988EA88EB88EC88EDBFB088EE88EF88F088F188F2D1DF88F388F488F588F6B6C288F788F888F988FA88FB88FC88FD88FE894089418942894389448945DCA88946894789488949894A894B894CCBFAEBF3894D894E894FCBDC89508951CBFE895289538954CCC189558956895789588959C8FB895A895B895C895D895E895FDCAA89608961896289638964CCEEDCAB89658966896789688969896A896B896C896D896E896F897089718972897389748975DBD38976DCAFDCAC8977BEB38978CAFB8979897A897BDCAD897C897D897E89808981898289838984C9CAC4B989858986898789888989C7BDDCAE898A898B898CD4F6D0E6898D898E898F89908991899289938994C4ABB6D589958996899789988999899A899B899C899D899E899F89A089A189A289A389A489A589A6DBD489A789A889A989AAB1DA89AB89AC89ADDBD589AE89AF89B089B189B289B389B489B589B689B789B8DBD689B989BA89BBBABE89BC89BD89BE89BF89C089C189C289C389C489C589C689C789C889C9C8C089CA89CB89CC89CD89CE89CFCABFC8C989D0D7B389D1C9F989D289D3BFC789D489D5BAF889D689D7D2BC89D889D989DA89DB89DC89DD89DE89DFE2BA89E0B4A689E189E2B1B889E389E489E589E689E7B8B489E8CFC489E989EA89EB89ECD9E7CFA6CDE289ED89EED9EDB6E089EFD2B989F089F1B9BB89F289F389F489F5E2B9E2B789F6B4F389F7CCECCCABB7F289F8D8B2D1EBBABB89F9CAA789FA89FBCDB789FC89FDD2C4BFE4BCD0B6E189FEDEC58A408A418A428A43DEC6DBBC8A44D1D98A458A46C6E6C4CEB7EE8A47B7DC8A488A49BFFCD7E08A4AC6F58A4B8A4CB1BCDEC8BDB1CCD7DECA8A4DDEC98A4E8A4F8A508A518A52B5EC8A53C9DD8A548A55B0C28A568A578A588A598A5A8A5B8A5C8A5D8A5E8A5F8A608A618A62C5AEC5AB8A63C4CC8A64BCE9CBFD8A658A668A67BAC38A688A698A6AE5F9C8E7E5FACDFD8A6BD7B1B8BEC2E88A6CC8D18A6D8A6EE5FB8A6F8A708A718A72B6CABCCB8A738A74D1FDE6A18A75C3EE8A768A778A788A79E6A48A7A8A7B8A7C8A7DE5FEE6A5CDD78A7E8A80B7C1E5FCE5FDE6A38A818A82C4DDE6A88A838A84E6A78A858A868A878A888A898A8AC3C38A8BC6DE8A8C8A8DE6AA8A8E8A8F8A908A918A928A938A94C4B78A958A968A97E6A2CABC8A988A998A9A8A9BBDE3B9C3E6A6D0D5CEAF8A9C8A9DE6A9E6B08A9ED2A68A9FBDAAE6AD8AA08AA18AA28AA38AA4E6AF8AA5C0D18AA68AA7D2CC8AA88AA98AAABCA78AAB8AAC8AAD8AAE8AAF8AB08AB18AB28AB38AB48AB58AB6E6B18AB7D2F68AB88AB98ABAD7CB8ABBCDFE8ABCCDDEC2A6E6ABE6ACBDBFE6AEE6B38ABD8ABEE6B28ABF8AC08AC18AC2E6B68AC3E6B88AC48AC58AC68AC7C4EF8AC88AC98ACAC4C88ACB8ACCBEEAC9EF8ACD8ACEE6B78ACFB6F08AD08AD18AD2C3E48AD38AD48AD58AD68AD78AD88AD9D3E9E6B48ADAE6B58ADBC8A28ADC8ADD8ADE8ADF8AE0E6BD8AE18AE28AE3E6B98AE48AE58AE68AE78AE8C6C58AE98AEACDF1E6BB8AEB8AEC8AED8AEE8AEF8AF08AF18AF28AF38AF4E6BC8AF58AF68AF78AF8BBE98AF98AFA8AFB8AFC8AFD8AFE8B40E6BE8B418B428B438B44E6BA8B458B46C0B78B478B488B498B4A8B4B8B4C8B4D8B4E8B4FD3A4E6BFC9F4E6C38B508B51E6C48B528B538B548B55D0F68B568B578B588B598B5A8B5B8B5C8B5D8B5E8B5F8B608B618B628B638B648B658B668B67C3BD8B688B698B6A8B6B8B6C8B6D8B6EC3C4E6C28B6F8B708B718B728B738B748B758B768B778B788B798B7A8B7B8B7CE6C18B7D8B7E8B808B818B828B838B84E6C7CFB18B85EBF48B868B87E6CA8B888B898B8A8B8B8B8CE6C58B8D8B8EBCDEC9A98B8F8B908B918B928B938B94BCB58B958B96CFD38B978B988B998B9A8B9BE6C88B9CE6C98B9DE6CE8B9EE6D08B9F8BA08BA1E6D18BA28BA38BA4E6CBB5D58BA5E6CC8BA68BA7E6CF8BA88BA9C4DB8BAAE6C68BAB8BAC8BAD8BAE8BAFE6CD8BB08BB18BB28BB38BB48BB58BB68BB78BB88BB98BBA8BBB8BBC8BBD8BBE8BBF8BC08BC18BC28BC38BC48BC58BC6E6D28BC78BC88BC98BCA8BCB8BCC8BCD8BCE8BCF8BD08BD18BD2E6D4E6D38BD38BD48BD58BD68BD78BD88BD98BDA8BDB8BDC8BDD8BDE8BDF8BE08BE18BE28BE38BE48BE58BE68BE78BE88BE98BEA8BEB8BECE6D58BEDD9F88BEE8BEFE6D68BF08BF18BF28BF38BF48BF58BF68BF7E6D78BF88BF98BFA8BFB8BFC8BFD8BFE8C408C418C428C438C448C458C468C47D7D3E6DD8C48E6DEBFD7D4D08C49D7D6B4E6CBEFE6DAD8C3D7CED0A28C4AC3CF8C4B8C4CE6DFBCBEB9C2E6DBD1A78C4D8C4EBAA2C2CF8C4FD8AB8C508C518C52CAEBE5EE8C53E6DC8C54B7F58C558C568C578C58C8E68C598C5AC4F58C5B8C5CE5B2C4FE8C5DCBFCE5B3D5AC8C5ED3EECAD8B0B28C5FCBCECDEA8C608C61BAEA8C628C638C64E5B58C65E5B48C66D7DAB9D9D6E6B6A8CDF0D2CBB1A6CAB58C67B3E8C9F3BFCDD0FBCAD2E5B6BBC28C688C698C6ACFDCB9AC8C6B8C6C8C6D8C6ED4D78C6F8C70BAA6D1E7CFFCBCD28C71E5B7C8DD8C728C738C74BFEDB1F6CBDE8C758C76BCC58C77BCC4D2FAC3DCBFDC8C788C798C7A8C7BB8BB8C7C8C7D8C7EC3C28C80BAAED4A28C818C828C838C848C858C868C878C888C89C7DEC4AFB2EC8C8AB9D18C8B8C8CE5BBC1C88C8D8C8ED5AF8C8F8C908C918C928C93E5BC8C94E5BE8C958C968C978C988C998C9A8C9BB4E7B6D4CBC2D1B0B5BC8C9C8C9DCAD98C9EB7E28C9F8CA0C9E48CA1BDAB8CA28CA3CEBED7F08CA48CA58CA68CA7D0A18CA8C9D98CA98CAAB6FBE6D8BCE28CABB3BE8CACC9D08CADE6D9B3A28CAE8CAF8CB08CB1DECC8CB2D3C8DECD8CB3D2A28CB48CB58CB68CB7DECE8CB88CB98CBA8CBBBECD8CBC8CBDDECF8CBE8CBF8CC0CAACD2FCB3DFE5EAC4E1BEA1CEB2C4F2BED6C6A8B2E38CC18CC2BED38CC38CC4C7FCCCEBBDECCEDD8CC58CC6CABAC6C1E5ECD0BC8CC78CC88CC9D5B98CCA8CCB8CCCE5ED8CCD8CCE8CCF8CD0CAF48CD1CDC0C2C58CD2E5EF8CD3C2C4E5F08CD48CD58CD68CD78CD88CD98CDAE5F8CDCD8CDBC9BD8CDC8CDD8CDE8CDF8CE08CE18CE2D2D9E1A88CE38CE48CE58CE6D3EC8CE7CBEAC6F18CE88CE98CEA8CEB8CECE1AC8CED8CEE8CEFE1A7E1A98CF08CF1E1AAE1AF8CF28CF3B2ED8CF4E1ABB8DAE1ADE1AEE1B0B5BAE1B18CF58CF68CF78CF88CF9E1B3E1B88CFA8CFB8CFC8CFD8CFED1D28D40E1B6E1B5C1EB8D418D428D43E1B78D44D4C08D45E1B28D46E1BAB0B68D478D488D498D4AE1B48D4BBFF98D4CE1B98D4D8D4EE1BB8D4F8D508D518D528D538D54E1BE8D558D568D578D588D598D5AE1BC8D5B8D5C8D5D8D5E8D5F8D60D6C58D618D628D638D648D658D668D67CFBF8D688D69E1BDE1BFC2CD8D6AB6EB8D6BD3F88D6C8D6DC7CD8D6E8D6FB7E58D708D718D728D738D748D758D768D778D788D79BEFE8D7A8D7B8D7C8D7D8D7E8D80E1C0E1C18D818D82E1C7B3E78D838D848D858D868D878D88C6E98D898D8A8D8B8D8C8D8DB4DE8D8ED1C28D8F8D908D918D92E1C88D938D94E1C68D958D968D978D988D99E1C58D9AE1C3E1C28D9BB1C08D9C8D9D8D9ED5B8E1C48D9F8DA08DA18DA28DA3E1CB8DA48DA58DA68DA78DA88DA98DAA8DABE1CCE1CA8DAC8DAD8DAE8DAF8DB08DB18DB28DB3EFFA8DB48DB5E1D3E1D2C7B68DB68DB78DB88DB98DBA8DBB8DBC8DBD8DBE8DBF8DC0E1C98DC18DC2E1CE8DC3E1D08DC48DC58DC68DC78DC88DC98DCA8DCB8DCC8DCD8DCEE1D48DCFE1D1E1CD8DD08DD1E1CF8DD28DD38DD48DD5E1D58DD68DD78DD88DD98DDA8DDB8DDC8DDD8DDE8DDF8DE08DE18DE2E1D68DE38DE48DE58DE68DE78DE88DE98DEA8DEB8DEC8DED8DEE8DEF8DF08DF18DF28DF38DF48DF58DF68DF78DF8E1D78DF98DFA8DFBE1D88DFC8DFD8DFE8E408E418E428E438E448E458E468E478E488E498E4A8E4B8E4C8E4D8E4E8E4F8E508E518E528E538E548E55E1DA8E568E578E588E598E5A8E5B8E5C8E5D8E5E8E5F8E608E618E62E1DB8E638E648E658E668E678E688E69CEA18E6A8E6B8E6C8E6D8E6E8E6F8E708E718E728E738E748E758E76E7DD8E77B4A8D6DD8E788E79D1B2B3B28E7A8E7BB9A4D7F3C7C9BEDEB9AE8E7CCED78E7D8E7EB2EEDBCF8E80BCBAD2D1CBC8B0CD8E818E82CFEF8E838E848E858E868E87D9E3BDED8E888E89B1D2CAD0B2BC8E8ACBA7B7AB8E8BCAA68E8C8E8D8E8ECFA38E8F8E90E0F8D5CAE0FB8E918E92E0FAC5C1CCFB8E93C1B1E0F9D6E3B2AFD6C4B5DB8E948E958E968E978E988E998E9A8E9BB4F8D6A18E9C8E9D8E9E8E9F8EA0CFAFB0EF8EA18EA2E0FC8EA38EA48EA58EA68EA7E1A1B3A38EA88EA9E0FDE0FEC3B18EAA8EAB8EAC8EADC3DD8EAEE1A2B7F98EAF8EB08EB18EB28EB38EB4BBCF8EB58EB68EB78EB88EB98EBA8EBBE1A3C4BB8EBC8EBD8EBE8EBF8EC0E1A48EC18EC2E1A58EC38EC4E1A6B4B18EC58EC68EC78EC88EC98ECA8ECB8ECC8ECD8ECE8ECF8ED08ED18ED28ED3B8C9C6BDC4EA8ED4B2A28ED5D0D28ED6E7DBBBC3D3D7D3C48ED7B9E3E2CF8ED88ED98EDAD7AF8EDBC7ECB1D38EDC8EDDB4B2E2D18EDE8EDF8EE0D0F2C2AEE2D08EE1BFE2D3A6B5D7E2D2B5EA8EE2C3EDB8FD8EE3B8AE8EE4C5D3B7CFE2D48EE58EE68EE78EE8E2D3B6C8D7F98EE98EEA8EEB8EEC8EEDCDA58EEE8EEF8EF08EF18EF2E2D88EF3E2D6CAFCBFB5D3B9E2D58EF48EF58EF68EF7E2D78EF88EF98EFA8EFB8EFC8EFD8EFE8F408F418F42C1AEC0C88F438F448F458F468F478F48E2DBE2DAC0AA8F498F4AC1CE8F4B8F4C8F4D8F4EE2DC8F4F8F508F518F528F538F548F558F568F578F588F598F5AE2DD8F5BE2DE8F5C8F5D8F5E8F5F8F608F618F628F638F64DBC88F65D1D3CDA28F668F67BDA88F688F698F6ADEC3D8A5BFAADBCDD2ECC6FAC5AA8F6B8F6C8F6DDEC48F6EB1D7DFAE8F6F8F708F71CABD8F72DFB18F73B9AD8F74D2FD8F75B8A5BAEB8F768F77B3DA8F788F798F7AB5DCD5C58F7B8F7C8F7D8F7EC3D6CFD2BBA18F80E5F3E5F28F818F82E5F48F83CDE48F84C8F58F858F868F878F888F898F8A8F8BB5AFC7BF8F8CE5F68F8D8F8E8F8FECB08F908F918F928F938F948F958F968F978F988F998F9A8F9B8F9C8F9D8F9EE5E68F9FB9E9B5B18FA0C2BCE5E8E5E7E5E98FA18FA28FA38FA4D2CD8FA58FA68FA7E1EAD0CE8FA8CDAE8FA9D1E58FAA8FABB2CAB1EB8FACB1F2C5ED8FAD8FAED5C3D3B08FAFE1DC8FB08FB18FB2E1DD8FB3D2DB8FB4B3B9B1CB8FB58FB68FB7CDF9D5F7E1DE8FB8BEB6B4FD8FB9E1DFBADCE1E0BBB2C2C9E1E18FBA8FBB8FBCD0EC8FBDCDBD8FBE8FBFE1E28FC0B5C3C5C7E1E38FC18FC2E1E48FC38FC48FC58FC6D3F98FC78FC88FC98FCA8FCB8FCCE1E58FCDD1AD8FCE8FCFE1E6CEA28FD08FD18FD28FD38FD48FD5E1E78FD6B5C28FD78FD88FD98FDAE1E8BBD58FDB8FDC8FDD8FDE8FDFD0C4E2E0B1D8D2E48FE08FE1E2E18FE28FE3BCC9C8CC8FE4E2E3ECFEECFDDFAF8FE58FE68FE7E2E2D6BECDFCC3A68FE88FE98FEAE3C38FEB8FECD6D2E2E78FED8FEEE2E88FEF8FF0D3C78FF18FF2E2ECBFEC8FF3E2EDE2E58FF48FF5B3C08FF68FF78FF8C4EE8FF98FFAE2EE8FFB8FFCD0C38FFDBAF6E2E9B7DEBBB3CCACCBCBE2E4E2E6E2EAE2EB8FFE90409041E2F790429043E2F4D4F5E2F390449045C5AD9046D5FAC5C2B2C090479048E2EF9049E2F2C1AFCBBC904A904BB5A1E2F9904C904D904EBCB1E2F1D0D4D4B9E2F5B9D6E2F6904F90509051C7D390529053905490559056E2F0905790589059905A905BD7DCEDA1905C905DE2F8905EEDA5E2FECAD1905F906090619062906390649065C1B59066BBD090679068BFD69069BAE3906A906BCBA1906C906D906EEDA6EDA3906F9070EDA29071907290739074BBD6EDA7D0F490759076EDA4BADEB6F7E3A1B6B2CCF1B9A79077CFA2C7A190789079BFD2907A907BB6F1907CE2FAE2FBE2FDE2FCC4D5E3A2907DD3C1907E90809081E3A7C7C49082908390849085CFA490869087E3A9BAB790889089908A908BE3A8908CBBDA908DE3A3908E908F9090E3A4E3AA9091E3A69092CEF2D3C690939094BBBC90959096D4C39097C4FA90989099EDA8D0FCE3A5909AC3F5909BE3ADB1AF909CE3B2909D909E909FBCC290A090A1E3ACB5BF90A290A390A490A590A690A790A890A9C7E9E3B090AA90AB90ACBEAACDEF90AD90AE90AF90B090B1BBF390B290B390B4CCE890B590B6E3AF90B7E3B190B8CFA7E3AE90B9CEA9BBDD90BA90BB90BC90BD90BEB5EBBEE5B2D2B3CD90BFB1B9E3ABB2D1B5ACB9DFB6E890C090C1CFEBE3B790C2BBCC90C390C4C8C7D0CA90C590C690C790C890C9E3B8B3EE90CA90CB90CC90CDEDA990CED3FAD3E490CF90D090D1EDAAE3B9D2E290D290D390D490D590D6E3B590D790D890D990DAD3DE90DB90DC90DD90DEB8D0E3B390DF90E0E3B6B7DF90E1E3B4C0A290E290E390E4E3BA90E590E690E790E890E990EA90EB90EC90ED90EE90EF90F090F190F290F390F490F590F690F7D4B890F890F990FA90FB90FC90FD90FE9140B4C89141E3BB9142BBC59143C9F791449145C9E5914691479148C4BD9149914A914B914C914D914E914FEDAB9150915191529153C2FD9154915591569157BBDBBFAE91589159915A915B915C915D915ECEBF915F916091619162E3BC9163BFB6916491659166916791689169916A916B916C916D916E916F9170917191729173917491759176B1EF91779178D4F79179917A917B917C917DE3BE917E9180918191829183918491859186EDAD918791889189918A918B918C918D918E918FE3BFBAA9EDAC91909191E3BD91929193919491959196919791989199919A919BE3C0919C919D919E919F91A091A1BAB691A291A391A4B6AE91A591A691A791A891A9D0B891AAB0C3EDAE91AB91AC91AD91AE91AFEDAFC0C191B0E3C191B191B291B391B491B591B691B791B891B991BA91BB91BC91BD91BE91BF91C091C1C5B391C291C391C491C591C691C791C891C991CA91CB91CC91CD91CE91CFE3C291D091D191D291D391D491D591D691D791D8DCB291D991DA91DB91DC91DD91DEEDB091DFB8EA91E0CEECEAA7D0E7CAF9C8D6CFB7B3C9CED2BDE491E191E2E3DEBBF2EAA8D5BD91E3C6DDEAA991E491E591E6EAAA91E7EAACEAAB91E8EAAEEAAD91E991EA91EB91ECBDD891EDEAAF91EEC2BE91EF91F091F191F2B4C1B4F791F391F4BBA791F591F691F791F891F9ECE6ECE5B7BFCBF9B1E291FAECE791FB91FC91FDC9C8ECE8ECE991FECAD6DED0B2C5D4FA92409241C6CBB0C7B4F2C8D3924292439244CDD092459246BFB8924792489249924A924B924C924DBFDB924E924FC7A4D6B49250C0A9DED1C9A8D1EFC5A4B0E7B3B6C8C592519252B0E292539254B7F692559256C5FA92579258B6F39259D5D2B3D0BCBC925A925B925CB3AD925D925E925F9260BEF1B0D1926192629263926492659266D2D6CAE3D7A59267CDB6B6B6BFB9D5DB9268B8A7C5D79269926A926BDED2BFD9C2D5C7C0926CBBA4B1A8926D926EC5EA926F9270C5FBCCA79271927292739274B1A7927592769277B5D692789279927AC4A8927BDED3D1BAB3E9927CC3F2927D927EB7F79280D6F4B5A3B2F0C4B4C4E9C0ADDED49281B0E8C5C4C1E09282B9D59283BEDCCDD8B0CE9284CDCFDED6BED0D7BEDED5D5D0B0DD92859286C4E292879288C2A3BCF09289D3B5C0B9C5A1B2A6D4F1928A928BC0A8CAC3DED7D5FC928CB9B0928DC8ADCBA9928EDED9BFBD928F929092919292C6B4D7A7CAB0C4C39293B3D6B9D29294929592969297D6B8EAFCB0B492989299929A929BBFE6929C929DCCF4929E929F92A092A1CDDA92A292A392A4D6BFC2CE92A5CECECCA2D0AEC4D3B5B2DED8D5F5BCB7BBD392A692A7B0A492A8C5B2B4EC92A992AA92ABD5F192AC92ADEAFD92AE92AF92B092B192B292B3DEDACDA692B492B5CDEC92B692B792B892B9CEE6DEDC92BACDB1C0A692BB92BCD7BD92BDDEDBB0C6BAB4C9D3C4F3BEE892BE92BF92C092C1B2B692C292C392C492C592C692C792C892C9C0CCCBF092CABCF1BBBBB5B792CB92CC92CDC5F592CEDEE692CF92D092D1DEE3BEDD92D292D3DEDF92D492D592D692D7B4B7BDDD92D892D9DEE0C4ED92DA92DB92DC92DDCFC692DEB5E092DF92E092E192E2B6DECADAB5F4DEE592E3D5C692E4DEE1CCCDC6FE92E5C5C592E692E792E8D2B492E9BEF292EA92EB92EC92ED92EE92EF92F0C2D392F1CCBDB3B892F2BDD392F3BFD8CDC6D1DAB4EB92F4DEE4DEDDDEE792F5EAFE92F692F7C2B0DEE292F892F9D6C0B5A792FAB2F492FBDEE892FCDEF292FD92FE934093419342DEED9343DEF193449345C8E0934693479348D7E1DEEFC3E8CCE19349B2E5934A934B934CD2BE934D934E934F9350935193529353DEEE9354DEEBCED59355B4A79356935793589359935ABFABBEBE935B935CBDD2935D935E935F9360DEE99361D4AE9362DEDE9363DEEA9364936593669367C0BF9368DEECB2F3B8E9C2A79369936ABDC1936B936C936D936E936FDEF5DEF893709371B2ABB4A493729373B4EAC9A6937493759376937793789379DEF6CBD1937AB8E3937BDEF7DEFA937C937D937E9380DEF9938193829383CCC29384B0E1B4EE93859386938793889389938AE5BA938B938C938D938E938FD0AF93909391B2EB9392EBA19393DEF493949395C9E3DEF3B0DAD2A1B1F79396CCAF939793989399939A939B939C939DDEF0939ECBA4939F93A093A1D5AA93A293A393A493A593A6DEFB93A793A893A993AA93AB93AC93AD93AEB4DD93AFC4A693B093B193B2DEFD93B393B493B593B693B793B893B993BA93BB93BCC3FEC4A1DFA193BD93BE93BF93C093C193C293C3C1CC93C4DEFCBEEF93C5C6B293C693C793C893C993CA93CB93CC93CD93CEB3C5C8F693CF93D0CBBADEFE93D193D2DFA493D393D493D593D6D7B293D793D893D993DA93DBB3B793DC93DD93DE93DFC1C393E093E1C7CBB2A5B4E993E2D7AB93E393E493E593E6C4EC93E7DFA2DFA393E8DFA593E9BAB393EA93EB93ECDFA693EDC0DE93EE93EFC9C393F093F193F293F393F493F593F6B2D9C7E693F7DFA793F8C7DC93F993FA93FB93FCDFA8EBA293FD93FE944094419442CBD3944394449445DFAA9446DFA99447B2C194489449944A944B944C944D944E944F9450945194529453945494559456945794589459945A945B945C945D945E945F9460C5CA94619462946394649465946694679468DFAB9469946A946B946C946D946E946F9470D4DC94719472947394749475C8C19476947794789479947A947B947C947D947E948094819482DFAC94839484948594869487BEF094889489DFADD6A7948A948B948C948DEAB7EBB6CAD5948ED8FCB8C4948FB9A594909491B7C5D5FE94929493949494959496B9CA94979498D0A7F4CD9499949AB5D0949B949CC3F4949DBEC8949E949F94A0EBB7B0BD94A194A2BDCC94A3C1B294A4B1D6B3A894A594A694A7B8D2C9A294A894A9B6D894AA94AB94AC94ADEBB8BEB494AE94AF94B0CAFD94B1C7C394B2D5FB94B394B4B7F394B594B694B794B894B994BA94BB94BC94BD94BE94BF94C094C194C294C3CEC494C494C594C6D5ABB1F394C794C894C9ECB3B0DF94CAECB594CB94CC94CDB6B794CEC1CF94CFF5FAD0B194D094D1D5E594D2CED394D394D4BDEFB3E294D5B8AB94D6D5B694D7EDBD94D8B6CF94D9CBB9D0C294DA94DB94DC94DD94DE94DF94E094E1B7BD94E294E3ECB6CAA994E494E594E6C5D494E7ECB9ECB8C2C3ECB794E894E994EA94EBD0FDECBA94ECECBBD7E594ED94EEECBC94EF94F094F1ECBDC6EC94F294F394F494F594F694F794F894F9CEDE94FABCC894FB94FCC8D5B5A9BEC9D6BCD4E794FD94FED1AED0F1EAB8EAB9EABABAB59540954195429543CAB1BFF595449545CDFA9546954795489549954AEAC0954BB0BAEABE954C954DC0A5954E954F9550EABB9551B2FD9552C3F7BBE8955395549555D2D7CEF4EABF955695579558EABC9559955A955BEAC3955CD0C7D3B3955D955E955F9560B4BA9561C3C1D7F29562956395649565D5D19566CAC79567EAC595689569EAC4EAC7EAC6956A956B956C956D956ED6E7956FCFD495709571EACB9572BBCE9573957495759576957795789579BDFAC9CE957A957BEACC957C957DC9B9CFFEEACAD4CEEACDEACF957E9580CDED9581958295839584EAC99585EACE95869587CEEE9588BBDE9589B3BF958A958B958C958D958EC6D5BEB0CEFA958F95909591C7E79592BEA7EAD095939594D6C7959595969597C1C095989599959AD4DD959BEAD1959C959DCFBE959E959F95A095A1EAD295A295A395A495A5CAEE95A695A795A895A9C5AFB0B595AA95AB95AC95AD95AEEAD495AF95B095B195B295B395B495B595B695B7EAD3F4DF95B895B995BA95BB95BCC4BA95BD95BE95BF95C095C1B1A995C295C395C495C5E5DF95C695C795C895C9EAD595CA95CB95CC95CD95CE95CF95D095D195D295D395D495D595D695D795D895D995DA95DB95DC95DD95DE95DF95E095E195E295E3CAEF95E4EAD6EAD7C6D895E595E695E795E895E995EA95EB95ECEAD895ED95EEEAD995EF95F095F195F295F395F4D4BB95F5C7FAD2B7B8FC95F695F7EAC295F8B2DC95F995FAC2FC95FBD4F8CCE6D7EE95FC95FD95FE9640964196429643D4C2D3D0EBC3C5F39644B7FE96459646EBD4964796489649CBB7EBDE964AC0CA964B964C964DCDFB964EB3AF964FC6DA965096519652965396549655EBFC9656C4BE9657CEB4C4A9B1BED4FD9658CAF59659D6EC965A965BC6D3B6E4965C965D965E965FBBFA96609661D0E096629663C9B19664D4D3C8A896659666B8CB9667E8BEC9BC96689669E8BB966AC0EED0D3B2C4B4E5966BE8BC966C966DD5C8966E966F967096719672B6C59673E8BDCAF8B8DCCCF5967496759676C0B496779678D1EEE8BFE8C29679967ABABC967BB1ADBDDC967CEABDE8C3967DE8C6967EE8CB9680968196829683E8CC9684CBC9B0E59685BCAB96869687B9B996889689E8C1968ACDF7968BE8CA968C968D968E968FCEF69690969196929693D5ED9694C1D6E8C49695C3B69696B9FBD6A6E8C8969796989699CAE0D4E6969AE8C0969BE8C5E8C7969CC7B9B7E3969DE8C9969EBFDDE8D2969F96A0E8D796A1E8D5BCDCBCCFE8DB96A296A396A496A596A696A796A896A9E8DE96AAE8DAB1FA96AB96AC96AD96AE96AF96B096B196B296B396B4B0D8C4B3B8CCC6E2C8BEC8E196B596B696B7E8CFE8D4E8D696B8B9F1E8D8D7F596B9C4FB96BAE8DC96BB96BCB2E996BD96BE96BFE8D196C096C1BCED96C296C3BFC2E8CDD6F996C4C1F8B2F196C596C696C796C896C996CA96CB96CCE8DF96CDCAC1E8D996CE96CF96D096D1D5A496D2B1EAD5BBE8CEE8D0B6B0E8D396D3E8DDC0B896D4CAF796D5CBA896D696D7C6DCC0F596D896D996DA96DB96DCE8E996DD96DE96DFD0A396E096E196E296E396E496E596E6E8F2D6EA96E796E896E996EA96EB96EC96EDE8E0E8E196EE96EF96F0D1F9BACBB8F996F196F2B8F1D4D4E8EF96F3E8EEE8ECB9F0CCD2E8E6CEA6BFF296F4B0B8E8F1E8F096F5D7C096F6E8E496F7CDA9C9A396F8BBB8BDDBE8EA96F996FA96FB96FC96FD96FE9740974197429743E8E2E8E3E8E5B5B5E8E7C7C5E8EBE8EDBDB0D7AE9744E8F897459746974797489749974A974B974CE8F5974DCDB0E8F6974E974F9750975197529753975497559756C1BA9757E8E89758C3B7B0F09759975A975B975C975D975E975F9760E8F4976197629763E8F7976497659766B9A3976797689769976A976B976C976D976E976F9770C9D2977197729773C3CECEE0C0E69774977597769777CBF39778CCDDD0B59779977ACAE1977BE8F3977C977D977E9780978197829783978497859786BCEC9787E8F997889789978A978B978C978DC3DE978EC6E5978FB9F79790979197929793B0F497949795D7D897969797BCAC9798C5EF9799979A979B979C979DCCC4979E979FE9A697A097A197A297A397A497A597A697A797A897A9C9AD97AAE9A2C0E297AB97AC97ADBFC397AE97AF97B0E8FEB9D797B1E8FB97B297B397B497B5E9A497B697B797B8D2CE97B997BA97BB97BC97BDE9A397BED6B2D7B597BFE9A797C0BDB797C197C297C397C497C597C697C797C897C997CA97CB97CCE8FCE8FD97CD97CE97CFE9A197D097D197D297D397D497D597D697D7CDD697D897D9D2AC97DA97DB97DCE9B297DD97DE97DF97E0E9A997E197E297E3B4AA97E4B4BB97E597E6E9AB97E797E897E997EA97EB97EC97ED97EE97EF97F097F197F297F397F497F597F697F7D0A897F897F9E9A597FA97FBB3FE97FC97FDE9ACC0E397FEE9AA98409841E9B998429843E9B89844984598469847E9AE98489849E8FA984A984BE9A8984C984D984E984F9850BFACE9B1E9BA98519852C2A5985398549855E9AF9856B8C59857E9AD9858D3DCE9B4E9B5E9B79859985A985BE9C7985C985D985E985F98609861C0C6E9C598629863E9B098649865E9BBB0F19866986798689869986A986B986C986D986E986FE9BCD5A598709871E9BE9872E9BF987398749875E9C198769877C1F198789879C8B6987A987B987CE9BD987D987E988098819882E9C29883988498859886988798889889988AE9C3988BE9B3988CE9B6988DBBB1988E988F9890E9C0989198929893989498959896BCF7989798989899E9C4E9C6989A989B989C989D989E989F98A098A198A298A398A498A5E9CA98A698A798A898A9E9CE98AA98AB98AC98AD98AE98AF98B098B198B298B3B2DB98B4E9C898B598B698B798B898B998BA98BB98BC98BD98BEB7AE98BF98C098C198C298C398C498C598C698C798C898C998CAE9CBE9CC98CB98CC98CD98CE98CF98D0D5C198D1C4A398D298D398D498D598D698D7E9D898D8BAE198D998DA98DB98DCE9C998DDD3A398DE98DF98E0E9D498E198E298E398E498E598E698E7E9D7E9D098E898E998EA98EB98ECE9CF98ED98EEC7C198EF98F098F198F298F398F498F598F6E9D298F798F898F998FA98FB98FC98FDE9D9B3C898FEE9D399409941994299439944CFF0994599469947E9CD99489949994A994B994C994D994E994F995099519952B3F79953995499559956995799589959E9D6995A995BE9DA995C995D995ECCB4995F99609961CFAD99629963996499659966996799689969996AE9D5996BE9DCE9DB996C996D996E996F9970E9DE99719972997399749975997699779978E9D19979997A997B997C997D997E99809981E9DD9982E9DFC3CA9983998499859986998799889989998A998B998C998D998E998F9990999199929993999499959996999799989999999A999B999C999D999E999F99A099A199A299A399A499A599A699A799A899A999AA99AB99AC99AD99AE99AF99B099B199B299B399B499B599B699B799B899B999BA99BB99BC99BD99BE99BF99C099C199C299C399C499C599C699C799C899C999CA99CB99CC99CD99CE99CF99D099D199D299D399D499D599D699D799D899D999DA99DB99DC99DD99DE99DF99E099E199E299E399E499E599E699E799E899E999EA99EB99EC99ED99EE99EF99F099F199F299F399F499F5C7B7B4CEBBB6D0C0ECA399F699F7C5B799F899F999FA99FB99FC99FD99FE9A409A419A42D3FB9A439A449A459A46ECA49A47ECA5C6DB9A489A499A4ABFEE9A4B9A4C9A4D9A4EECA69A4F9A50ECA7D0AA9A51C7B89A529A53B8E89A549A559A569A579A589A599A5A9A5B9A5C9A5D9A5E9A5FECA89A609A619A629A639A649A659A669A67D6B9D5FDB4CBB2BDCEE4C6E79A689A69CDE19A6A9A6B9A6C9A6D9A6E9A6F9A709A719A729A739A749A759A769A77B4F59A78CBC0BCDF9A799A7A9A7B9A7CE9E2E9E3D1EAE9E59A7DB4F9E9E49A7ED1B3CAE2B2D09A80E9E89A819A829A839A84E9E6E9E79A859A86D6B39A879A889A89E9E9E9EA9A8A9A8B9A8C9A8D9A8EE9EB9A8F9A909A919A929A939A949A959A96E9EC9A979A989A999A9A9A9B9A9C9A9D9A9EECAFC5B9B6CE9A9FD2F39AA09AA19AA29AA39AA49AA59AA6B5EE9AA7BBD9ECB19AA89AA9D2E39AAA9AAB9AAC9AAD9AAECEE39AAFC4B89AB0C3BF9AB19AB2B6BED8B9B1C8B1CFB1D1C5FE9AB3B1D09AB4C3AB9AB59AB69AB79AB89AB9D5B19ABA9ABB9ABC9ABD9ABE9ABF9AC09AC1EBA4BAC19AC29AC39AC4CCBA9AC59AC69AC7EBA59AC8EBA79AC99ACA9ACBEBA89ACC9ACD9ACEEBA69ACF9AD09AD19AD29AD39AD49AD5EBA9EBABEBAA9AD69AD79AD89AD99ADAEBAC9ADBCACFD8B5C3F19ADCC3A5C6F8EBADC4CA9ADDEBAEEBAFEBB0B7D59ADE9ADF9AE0B7FA9AE1EBB1C7E29AE2EBB39AE3BAA4D1F5B0B1EBB2EBB49AE49AE59AE6B5AAC2C8C7E89AE7EBB59AE8CBAEE3DF9AE99AEAD3C09AEB9AEC9AED9AEED9DB9AEF9AF0CDA1D6ADC7F39AF19AF29AF3D9E0BBE39AF4BABAE3E29AF59AF69AF79AF89AF9CFAB9AFA9AFB9AFCE3E0C9C79AFDBAB99AFE9B409B41D1B4E3E1C8EAB9AFBDADB3D8CEDB9B429B43CCC09B449B459B46E3E8E3E9CDF49B479B489B499B4A9B4BCCAD9B4CBCB39B4DE3EA9B4EE3EB9B4F9B50D0DA9B519B529B53C6FBB7DA9B549B55C7DFD2CACED69B56E3E4E3EC9B57C9F2B3C19B589B59E3E79B5A9B5BC6E3E3E59B5C9B5DEDB3E3E69B5E9B5F9B609B61C9B39B62C5E69B639B649B65B9B59B66C3BB9B67E3E3C5BDC1A4C2D9B2D79B68E3EDBBA6C4AD9B69E3F0BEDA9B6A9B6BE3FBE3F5BAD39B6C9B6D9B6E9B6FB7D0D3CD9B70D6CED5D3B9C1D5B4D1D89B719B729B739B74D0B9C7F69B759B769B77C8AAB2B49B78C3DA9B799B7A9B7BE3EE9B7C9B7DE3FCE3EFB7A8E3F7E3F49B7E9B809B81B7BA9B829B83C5A29B84E3F6C5DDB2A8C6FC9B85C4E09B869B87D7A29B88C0E1E3F99B899B8AE3FAE3FDCCA9E3F39B8BD3BE9B8CB1C3EDB4E3F1E3F29B8DE3F8D0BAC6C3D4F3E3FE9B8E9B8FBDE09B909B91E4A79B929B93E4A69B949B959B96D1F3E4A39B97E4A99B989B999B9AC8F79B9B9B9C9B9D9B9ECFB49B9FE4A8E4AEC2E59BA09BA1B6B49BA29BA39BA49BA59BA69BA7BDF29BA8E4A29BA99BAABAE9E4AA9BAB9BACE4AC9BAD9BAEB6FDD6DEE4B29BAFE4AD9BB09BB19BB2E4A19BB3BBEECDDDC7A2C5C99BB49BB5C1F79BB6E4A49BB7C7B3BDACBDBDE4A59BB8D7C7B2E29BB9E4ABBCC3E4AF9BBABBEBE4B0C5A8E4B19BBB9BBC9BBD9BBED5E3BFA39BBFE4BA9BC0E4B79BC1E4BB9BC29BC3E4BD9BC49BC5C6D69BC69BC7BAC6C0CB9BC89BC99BCAB8A1E4B49BCB9BCC9BCD9BCED4A19BCF9BD0BAA3BDFE9BD19BD29BD3E4BC9BD49BD59BD69BD79BD8CDBF9BD99BDAC4F99BDB9BDCCFFBC9E69BDD9BDED3BF9BDFCFD19BE09BE1E4B39BE2E4B8E4B9CCE99BE39BE49BE59BE69BE7CCCE9BE8C0D4E4B5C1B0E4B6CED09BE9BBC1B5D39BEAC8F3BDA7D5C7C9ACB8A2E4CA9BEB9BECE4CCD1C49BED9BEED2BA9BEF9BF0BAAD9BF19BF2BAD49BF39BF49BF59BF69BF79BF8E4C3B5ED9BF99BFA9BFBD7CDE4C0CFFDE4BF9BFC9BFD9BFEC1DCCCCA9C409C419C429C43CAE79C449C459C469C47C4D79C48CCD4E4C89C499C4A9C4BE4C7E4C19C4CE4C4B5AD9C4D9C4ED3D99C4FE4C69C509C519C529C53D2F9B4E39C54BBB49C559C56C9EE9C57B4BE9C589C599C5ABBEC9C5BD1CD9C5CCCEDEDB59C5D9C5E9C5F9C609C619C629C639C64C7E59C659C669C679C68D4A89C69E4CBD7D5E4C29C6ABDA5E4C59C6B9C6CD3E69C6DE4C9C9F89C6E9C6FE4BE9C709C71D3E59C729C73C7FEB6C99C74D4FCB2B3E4D79C759C769C77CEC29C78E4CD9C79CEBC9C7AB8DB9C7B9C7CE4D69C7DBFCA9C7E9C809C81D3CE9C82C3EC9C839C849C859C869C879C889C899C8AC5C8E4D89C8B9C8C9C8D9C8E9C8F9C909C919C92CDC4E4CF9C939C949C959C96E4D4E4D59C97BAFE9C98CFE69C999C9AD5BF9C9B9C9C9C9DE4D29C9E9C9F9CA09CA19CA29CA39CA49CA59CA69CA79CA8E4D09CA99CAAE4CE9CAB9CAC9CAD9CAE9CAF9CB09CB19CB29CB39CB49CB59CB69CB79CB89CB9CDE5CAAA9CBA9CBB9CBCC0A39CBDBDA6E4D39CBE9CBFB8C89CC09CC19CC29CC39CC4E4E7D4B49CC59CC69CC79CC89CC99CCA9CCBE4DB9CCC9CCD9CCEC1EF9CCF9CD0E4E99CD19CD2D2E79CD39CD4E4DF9CD5E4E09CD69CD7CFAA9CD89CD99CDA9CDBCBDD9CDCE4DAE4D19CDDE4E59CDEC8DCE4E39CDF9CE0C4E7E4E29CE1E4E19CE29CE39CE4B3FCE4E89CE59CE69CE79CE8B5E19CE99CEA9CEBD7CC9CEC9CED9CEEE4E69CEFBBAC9CF0D7D2CCCFEBF89CF1E4E49CF29CF3B9F69CF49CF59CF6D6CDE4D9E4DCC2FAE4DE9CF7C2CBC0C4C2D09CF8B1F5CCB29CF99CFA9CFB9CFC9CFD9CFE9D409D419D429D43B5CE9D449D459D469D47E4EF9D489D499D4A9D4B9D4C9D4D9D4E9D4FC6AF9D509D519D52C6E19D539D54E4F59D559D569D579D589D59C2A99D5A9D5B9D5CC0ECD1DDE4EE9D5D9D5E9D5F9D609D619D629D639D649D659D66C4AE9D679D689D69E4ED9D6A9D6B9D6C9D6DE4F6E4F4C2FE9D6EE4DD9D6FE4F09D70CAFE9D71D5C49D729D73E4F19D749D759D769D779D789D799D7AD1FA9D7B9D7C9D7D9D7E9D809D819D82E4EBE4EC9D839D849D85E4F29D86CEAB9D879D889D899D8A9D8B9D8C9D8D9D8E9D8F9D90C5CB9D919D929D93C7B19D94C2BA9D959D969D97E4EA9D989D999D9AC1CA9D9B9D9C9D9D9D9E9D9F9DA0CCB6B3B19DA19DA29DA3E4FB9DA4E4F39DA59DA69DA7E4FA9DA8E4FD9DA9E4FC9DAA9DAB9DAC9DAD9DAE9DAF9DB0B3CE9DB19DB29DB3B3BAE4F79DB49DB5E4F9E4F8C5EC9DB69DB79DB89DB99DBA9DBB9DBC9DBD9DBE9DBF9DC09DC19DC2C0BD9DC39DC49DC59DC6D4E89DC79DC89DC99DCA9DCBE5A29DCC9DCD9DCE9DCF9DD09DD19DD29DD39DD49DD59DD6B0C49DD79DD8E5A49DD99DDAE5A39DDB9DDC9DDD9DDE9DDF9DE0BCA49DE1E5A59DE29DE39DE49DE59DE69DE7E5A19DE89DE99DEA9DEB9DEC9DED9DEEE4FEB1F49DEF9DF09DF19DF29DF39DF49DF59DF69DF79DF89DF9E5A89DFAE5A9E5A69DFB9DFC9DFD9DFE9E409E419E429E439E449E459E469E47E5A7E5AA9E489E499E4A9E4B9E4C9E4D9E4E9E4F9E509E519E529E539E549E559E569E579E589E599E5A9E5B9E5C9E5D9E5E9E5F9E609E619E629E639E649E659E669E679E68C6D99E699E6A9E6B9E6C9E6D9E6E9E6F9E70E5ABE5AD9E719E729E739E749E759E769E77E5AC9E789E799E7A9E7B9E7C9E7D9E7E9E809E819E829E839E849E859E869E879E889E89E5AF9E8A9E8B9E8CE5AE9E8D9E8E9E8F9E909E919E929E939E949E959E969E979E989E999E9A9E9B9E9C9E9D9E9EB9E09E9F9EA0E5B09EA19EA29EA39EA49EA59EA69EA79EA89EA99EAA9EAB9EAC9EAD9EAEE5B19EAF9EB09EB19EB29EB39EB49EB59EB69EB79EB89EB99EBABBF0ECE1C3F09EBBB5C6BBD29EBC9EBD9EBE9EBFC1E9D4EE9EC0BEC49EC19EC29EC3D7C69EC4D4D6B2D3ECBE9EC59EC69EC79EC8EAC19EC99ECA9ECBC2AFB4B69ECC9ECD9ECED1D79ECF9ED09ED1B3B49ED2C8B2BFBBECC09ED39ED4D6CB9ED59ED6ECBFECC19ED79ED89ED99EDA9EDB9EDC9EDD9EDE9EDF9EE09EE19EE29EE3ECC5BEE6CCBFC5DABEBC9EE4ECC69EE5B1FE9EE69EE79EE8ECC4D5A8B5E39EE9ECC2C1B6B3E39EEA9EEBECC3CBB8C0C3CCFE9EEC9EED9EEE9EEFC1D29EF0ECC89EF19EF29EF39EF49EF59EF69EF79EF89EF99EFA9EFB9EFC9EFDBAE6C0D39EFED6F29F409F419F42D1CC9F439F449F459F46BFBE9F47B7B3C9D5ECC7BBE29F48CCCCBDFDC8C89F49CFA99F4A9F4B9F4C9F4D9F4E9F4F9F50CDE99F51C5EB9F529F539F54B7E99F559F569F579F589F599F5A9F5B9F5C9F5D9F5E9F5FD1C9BAB89F609F619F629F639F64ECC99F659F66ECCA9F67BBC0ECCB9F68ECE2B1BAB7D99F699F6A9F6B9F6C9F6D9F6E9F6F9F709F719F729F73BDB99F749F759F769F779F789F799F7A9F7BECCCD1E6ECCD9F7C9F7D9F7E9F80C8BB9F819F829F839F849F859F869F879F889F899F8A9F8B9F8C9F8D9F8EECD19F8F9F909F919F92ECD39F93BBCD9F94BCE59F959F969F979F989F999F9A9F9B9F9C9F9D9F9E9F9F9FA09FA1ECCF9FA2C9B79FA39FA49FA59FA69FA7C3BA9FA8ECE3D5D5ECD09FA99FAA9FAB9FAC9FADD6F39FAE9FAF9FB0ECD2ECCE9FB19FB29FB39FB4ECD49FB5ECD59FB69FB7C9BF9FB89FB99FBA9FBB9FBC9FBDCFA89FBE9FBF9FC09FC19FC2D0DC9FC39FC49FC59FC6D1AC9FC79FC89FC99FCAC8DB9FCB9FCC9FCDECD6CEF59FCE9FCF9FD09FD19FD2CAECECDA9FD39FD49FD59FD69FD79FD89FD9ECD99FDA9FDB9FDCB0BE9FDD9FDE9FDF9FE09FE19FE2ECD79FE3ECD89FE49FE59FE6ECE49FE79FE89FE99FEA9FEB9FEC9FED9FEE9FEFC8BC9FF09FF19FF29FF39FF49FF59FF69FF79FF89FF9C1C79FFA9FFB9FFC9FFD9FFEECDCD1E0A040A041A042A043A044A045A046A047A048A049ECDBA04AA04BA04CA04DD4EFA04EECDDA04FA050A051A052A053A054DBC6A055A056A057A058A059A05AA05BA05CA05DA05EECDEA05FA060A061A062A063A064A065A066A067A068A069A06AB1ACA06BA06CA06DA06EA06FA070A071A072A073A074A075A076A077A078A079A07AA07BA07CA07DA07EA080A081ECDFA082A083A084A085A086A087A088A089A08AA08BECE0A08CD7A6A08DC5C0A08EA08FA090EBBCB0AEA091A092A093BEF4B8B8D2AFB0D6B5F9A094D8B3A095CBACA096E3DDA097A098A099A09AA09BA09CA09DC6ACB0E6A09EA09FA0A0C5C6EBB9A0A1A0A2A0A3A0A4EBBAA0A5A0A6A0A7EBBBA0A8A0A9D1C0A0AAC5A3A0ABEAF2A0ACC4B2A0ADC4B5C0CEA0AEA0AFA0B0EAF3C4C1A0B1CEEFA0B2A0B3A0B4A0B5EAF0EAF4A0B6A0B7C9FCA0B8A0B9C7A3A0BAA0BBA0BCCCD8CEFEA0BDA0BEA0BFEAF5EAF6CFACC0E7A0C0A0C1EAF7A0C2A0C3A0C4A0C5A0C6B6BFEAF8A0C7EAF9A0C8EAFAA0C9A0CAEAFBA0CBA0CCA0CDA0CEA0CFA0D0A0D1A0D2A0D3A0D4A0D5A0D6EAF1A0D7A0D8A0D9A0DAA0DBA0DCA0DDA0DEA0DFA0E0A0E1A0E2C8AEE1EBA0E3B7B8E1ECA0E4A0E5A0E6E1EDA0E7D7B4E1EEE1EFD3CCA0E8A0E9A0EAA0EBA0ECA0EDA0EEE1F1BFF1E1F0B5D2A0EFA0F0A0F1B1B7A0F2A0F3A0F4A0F5E1F3E1F2A0F6BAFCA0F7E1F4A0F8A0F9A0FAA0FBB9B7A0FCBED1A0FDA0FEAA40AA41C4FCAA42BADDBDC6AA43AA44AA45AA46AA47AA48E1F5E1F7AA49AA4AB6C0CFC1CAA8E1F6D5F8D3FCE1F8E1FCE1F9AA4BAA4CE1FAC0EAAA4DE1FEE2A1C0C7AA4EAA4FAA50AA51E1FBAA52E1FDAA53AA54AA55AA56AA57AA58E2A5AA59AA5AAA5BC1D4AA5CAA5DAA5EAA5FE2A3AA60E2A8B2FEE2A2AA61AA62AA63C3CDB2C2E2A7E2A6AA64AA65E2A4E2A9AA66AA67E2ABAA68AA69AA6AD0C9D6EDC3A8E2ACAA6BCFD7AA6CAA6DE2AEAA6EAA6FBAEFAA70AA71E9E0E2ADE2AAAA72AA73AA74AA75BBABD4B3AA76AA77AA78AA79AA7AAA7BAA7CAA7DAA7EAA80AA81AA82AA83E2B0AA84AA85E2AFAA86E9E1AA87AA88AA89AA8AE2B1AA8BAA8CAA8DAA8EAA8FAA90AA91AA92E2B2AA93AA94AA95AA96AA97AA98AA99AA9AAA9BAA9CAA9DE2B3CCA1AA9EE2B4AA9FAAA0AB40AB41AB42AB43AB44AB45AB46AB47AB48AB49AB4AAB4BE2B5AB4CAB4DAB4EAB4FAB50D0FEAB51AB52C2CAAB53D3F1AB54CDF5AB55AB56E7E0AB57AB58E7E1AB59AB5AAB5BAB5CBEC1AB5DAB5EAB5FAB60C2EAAB61AB62AB63E7E4AB64AB65E7E3AB66AB67AB68AB69AB6AAB6BCDE6AB6CC3B5AB6DAB6EE7E2BBB7CFD6AB6FC1E1E7E9AB70AB71AB72E7E8AB73AB74E7F4B2A3AB75AB76AB77AB78E7EAAB79E7E6AB7AAB7BAB7CAB7DAB7EE7ECE7EBC9BAAB80AB81D5E4AB82E7E5B7A9E7E7AB83AB84AB85AB86AB87AB88AB89E7EEAB8AAB8BAB8CAB8DE7F3AB8ED6E9AB8FAB90AB91AB92E7EDAB93E7F2AB94E7F1AB95AB96AB97B0E0AB98AB99AB9AAB9BE7F5AB9CAB9DAB9EAB9FABA0AC40AC41AC42AC43AC44AC45AC46AC47AC48AC49AC4AC7F2AC4BC0C5C0EDAC4CAC4DC1F0E7F0AC4EAC4FAC50AC51E7F6CBF6AC52AC53AC54AC55AC56AC57AC58AC59AC5AE8A2E8A1AC5BAC5CAC5DAC5EAC5FAC60D7C1AC61AC62E7FAE7F9AC63E7FBAC64E7F7AC65E7FEAC66E7FDAC67E7FCAC68AC69C1D5C7D9C5FDC5C3AC6AAC6BAC6CAC6DAC6EC7EDAC6FAC70AC71AC72E8A3AC73AC74AC75AC76AC77AC78AC79AC7AAC7BAC7CAC7DAC7EAC80AC81AC82AC83AC84AC85AC86E8A6AC87E8A5AC88E8A7BAF7E7F8E8A4AC89C8F0C9AAAC8AAC8BAC8CAC8DAC8EAC8FAC90AC91AC92AC93AC94AC95AC96E8A9AC97AC98B9E5AC99AC9AAC9BAC9CAC9DD1FEE8A8AC9EAC9FACA0AD40AD41AD42E8AAAD43E8ADE8AEAD44C1A7AD45AD46AD47E8AFAD48AD49AD4AE8B0AD4BAD4CE8ACAD4DE8B4AD4EAD4FAD50AD51AD52AD53AD54AD55AD56AD57AD58E8ABAD59E8B1AD5AAD5BAD5CAD5DAD5EAD5FAD60AD61E8B5E8B2E8B3AD62AD63AD64AD65AD66AD67AD68AD69AD6AAD6BAD6CAD6DAD6EAD6FAD70AD71E8B7AD72AD73AD74AD75AD76AD77AD78AD79AD7AAD7BAD7CAD7DAD7EAD80AD81AD82AD83AD84AD85AD86AD87AD88AD89E8B6AD8AAD8BAD8CAD8DAD8EAD8FAD90AD91AD92B9CFAD93F0ACAD94F0ADAD95C6B0B0EAC8BFAD96CDDFAD97AD98AD99AD9AAD9BAD9CAD9DCECDEAB1AD9EAD9FADA0AE40EAB2AE41C6BFB4C9AE42AE43AE44AE45AE46AE47AE48EAB3AE49AE4AAE4BAE4CD5E7AE4DAE4EAE4FAE50AE51AE52AE53AE54DDF9AE55EAB4AE56EAB5AE57EAB6AE58AE59AE5AAE5BB8CADFB0C9F5AE5CCCF0AE5DAE5EC9FAAE5FAE60AE61AE62AE63C9FBAE64AE65D3C3CBA6AE66B8A6F0AEB1C2AE67E5B8CCEFD3C9BCD7C9EAAE68B5E7AE69C4D0B5E9AE6AEEAEBBADAE6BAE6CE7DEAE6DEEAFAE6EAE6FAE70AE71B3A9AE72AE73EEB2AE74AE75EEB1BDE7AE76EEB0CEB7AE77AE78AE79AE7AC5CFAE7BAE7CAE7DAE7EC1F4DBCEEEB3D0F3AE80AE81AE82AE83AE84AE85AE86AE87C2D4C6E8AE88AE89AE8AB7ACAE8BAE8CAE8DAE8EAE8FAE90AE91EEB4AE92B3EBAE93AE94AE95BBFBEEB5AE96AE97AE98AE99AE9AE7DCAE9BAE9CAE9DEEB6AE9EAE9FBDAEAEA0AF40AF41AF42F1E2AF43AF44AF45CAE8AF46D2C9F0DAAF47F0DBAF48F0DCC1C6AF49B8EDBECEAF4AAF4BF0DEAF4CC5B1F0DDD1F1AF4DF0E0B0CCBDEAAF4EAF4FAF50AF51AF52D2DFF0DFAF53B4AFB7E8F0E6F0E5C6A3F0E1F0E2B4C3AF54AF55F0E3D5EEAF56AF57CCDBBED2BCB2AF58AF59AF5AF0E8F0E7F0E4B2A1AF5BD6A2D3B8BEB7C8ACAF5CAF5DF0EAAF5EAF5FAF60AF61D1F7AF62D6CCBADBF0E9AF63B6BBAF64AF65CDB4AF66AF67C6A6AF68AF69AF6AC1A1F0EBF0EEAF6BF0EDF0F0F0ECAF6CBBBEF0EFAF6DAF6EAF6FAF70CCB5F0F2AF71AF72B3D5AF73AF74AF75AF76B1D4AF77AF78F0F3AF79AF7AF0F4F0F6B4E1AF7BF0F1AF7CF0F7AF7DAF7EAF80AF81F0FAAF82F0F8AF83AF84AF85F0F5AF86AF87AF88AF89F0FDAF8AF0F9F0FCF0FEAF8BF1A1AF8CAF8DAF8ECEC1F1A4AF8FF1A3AF90C1F6F0FBCADDAF91AF92B4F1B1F1CCB1AF93F1A6AF94AF95F1A7AF96AF97F1ACD5CEF1A9AF98AF99C8B3AF9AAF9BAF9CF1A2AF9DF1ABF1A8F1A5AF9EAF9FF1AAAFA0B040B041B042B043B044B045B046B0A9F1ADB047B048B049B04AB04BB04CF1AFB04DF1B1B04EB04FB050B051B052F1B0B053F1AEB054B055B056B057D1A2B058B059B05AB05BB05CB05DB05EF1B2B05FB060B061F1B3B062B063B064B065B066B067B068B069B9EFB06AB06BB5C7B06CB0D7B0D9B06DB06EB06FD4EDB070B5C4B071BDD4BBCAF0A7B072B073B8DEB074B075F0A8B076B077B0A8B078F0A9B079B07ACDEEB07BB07CF0AAB07DB07EB080B081B082B083B084B085B086B087F0ABB088B089B08AB08BB08CB08DB08EB08FB090C6A4B091B092D6E5F1E4B093F1E5B094B095B096B097B098B099B09AB09BB09CB09DC3F3B09EB09FD3DBB0A0B140D6D1C5E8B141D3AFB142D2E6B143B144EEC1B0BBD5B5D1CEBCE0BAD0B145BFF8B146B8C7B5C1C5CCB147B148CAA2B149B14AB14BC3CBB14CB14DB14EB14FB150EEC2B151B152B153B154B155B156B157B158C4BFB6A2B159EDECC3A4B15AD6B1B15BB15CB15DCFE0EDEFB15EB15FC5CEB160B6DCB161B162CAA1B163B164EDEDB165B166EDF0EDF1C3BCB167BFB4B168EDEEB169B16AB16BB16CB16DB16EB16FB170B171B172B173EDF4EDF2B174B175B176B177D5E6C3DFB178EDF3B179B17AB17BEDF6B17CD5A3D1A3B17DB17EB180EDF5B181C3D0B182B183B184B185B186EDF7BFF4BEECEDF8B187CCF7B188D1DBB189B18AB18BD7C5D5F6B18CEDFCB18DB18EB18FEDFBB190B191B192B193B194B195B196B197EDF9EDFAB198B199B19AB19BB19CB19DB19EB19FEDFDBEA6B1A0B240B241B242B243CBAFEEA1B6BDB244EEA2C4C0B245EDFEB246B247BDDEB2C7B248B249B24AB24BB24CB24DB24EB24FB250B251B252B253B6C3B254B255B256EEA5D8BAEEA3EEA6B257B258B259C3E9B3F2B25AB25BB25CB25DB25EB25FEEA7EEA4CFB9B260B261EEA8C2F7B262B263B264B265B266B267B268B269B26AB26BB26CB26DEEA9EEAAB26EDEABB26FB270C6B3B271C7C6B272D6F5B5C9B273CBB2B274B275B276EEABB277B278CDABB279EEACB27AB27BB27CB27DB27ED5B0B280EEADB281F6C4B282B283B284B285B286B287B288B289B28AB28BB28CB28DB28EDBC7B28FB290B291B292B293B294B295B296B297B4A3B298B299B29AC3ACF1E6B29BB29CB29DB29EB29FCAB8D2D3B2A0D6AAB340EFF2B341BED8B342BDC3EFF3B6CCB0ABB343B344B345B346CAAFB347B348EDB6B349EDB7B34AB34BB34CB34DCEF9B7AFBFF3EDB8C2EBC9B0B34EB34FB350B351B352B353EDB9B354B355C6F6BFB3B356B357B358EDBCC5F8B359D1D0B35AD7A9EDBAEDBBB35BD1E2B35CEDBFEDC0B35DEDC4B35EB35FB360EDC8B361EDC6EDCED5E8B362EDC9B363B364EDC7EDBEB365B366C5E9B367B368B369C6C6B36AB36BC9E9D4D2EDC1EDC2EDC3EDC5B36CC0F9B36DB4A1B36EB36FB370B371B9E8B372EDD0B373B374B375B376EDD1B377EDCAB378EDCFB379CEF8B37AB37BCBB6EDCCEDCDB37CB37DB37EB380B381CFF5B382B383B384B385B386B387B388B389B38AB38BB38CB38DEDD2C1F2D3B2EDCBC8B7B38EB38FB390B391B392B393B394B395BCEFB396B397B398B399C5F0B39AB39BB39CB39DB39EB39FB3A0B440B441B442EDD6B443B5EFB444B445C2B5B0ADCBE9B446B447B1AEB448EDD4B449B44AB44BCDEBB5E2B44CEDD5EDD3EDD7B44DB44EB5FAB44FEDD8B450EDD9B451EDDCB452B1CCB453B454B455B456B457B458B459B45AC5F6BCEEEDDACCBCB2EAB45BB45CB45DB45EEDDBB45FB460B461B462C4EBB463B464B4C5B465B466B467B0F5B468B469B46AEDDFC0DAB4E8B46BB46CB46DB46EC5CDB46FB470B471EDDDBFC4B472B473B474EDDEB475B476B477B478B479B47AB47BB47CB47DB47EB480B481B482B483C4A5B484B485B486EDE0B487B488B489B48AB48BEDE1B48CEDE3B48DB48EC1D7B48FB490BBC7B491B492B493B494B495B496BDB8B497B498B499EDE2B49AB49BB49CB49DB49EB49FB4A0B540B541B542B543B544B545EDE4B546B547B548B549B54AB54BB54CB54DB54EB54FEDE6B550B551B552B553B554EDE5B555B556B557B558B559B55AB55BB55CB55DB55EB55FB560B561B562B563EDE7B564B565B566B567B568CABEECEAC0F1B569C9E7B56AECEBC6EEB56BB56CB56DB56EECECB56FC6EDECEDB570B571B572B573B574B575B576B577B578ECF0B579B57AD7E6ECF3B57BB57CECF1ECEEECEFD7A3C9F1CBEEECF4B57DECF2B57EB580CFE9B581ECF6C6B1B582B583B584B585BCC0B586ECF5B587B588B589B58AB58BB58CB58DB5BBBBF6B58EECF7B58FB590B591B592B593D9F7BDFBB594B595C2BBECF8B596B597B598B599ECF9B59AB59BB59CB59DB8A3B59EB59FB5A0B640B641B642B643B644B645B646ECFAB647B648B649B64AB64BB64CB64DB64EB64FB650B651B652ECFBB653B654B655B656B657B658B659B65AB65BB65CB65DECFCB65EB65FB660B661B662D3EDD8AEC0EBB663C7DDBACCB664D0E3CBBDB665CDBAB666B667B8D1B668B669B1FCB66AC7EFB66BD6D6B66CB66DB66EBFC6C3EBB66FB670EFF5B671B672C3D8B673B674B675B676B677B678D7E2B679B67AB67BEFF7B3D3B67CC7D8D1EDB67DD6C8B67EEFF8B680EFF6B681BBFDB3C6B682B683B684B685B686B687B688BDD5B689B68AD2C6B68BBBE0B68CB68DCFA1B68EEFFCEFFBB68FB690EFF9B691B692B693B694B3CCB695C9D4CBB0B696B697B698B699B69AEFFEB69BB69CB0DEB69DB69ED6C9B69FB6A0B740EFFDB741B3EDB742B743F6D5B744B745B746B747B748B749B74AB74BB74CB74DB74EB74FB750B751B752CEC8B753B754B755F0A2B756F0A1B757B5BEBCDABBFCB758B8E5B759B75AB75BB75CB75DB75EC4C2B75FB760B761B762B763B764B765B766B767B768F0A3B769B76AB76BB76CB76DCBEBB76EB76FB770B771B772B773B774B775B776B777B778B779B77AB77BB77CB77DB77EB780B781B782B783B784B785B786F0A6B787B788B789D1A8B78ABEBFC7EEF1B6F1B7BFD5B78BB78CB78DB78EB4A9F1B8CDBBB78FC7D4D5ADB790F1B9B791F1BAB792B793B794B795C7CFB796B797B798D2A4D6CFB799B79AF1BBBDD1B4B0BEBDB79BB79CB79DB4DCCED1B79EBFDFF1BDB79FB7A0B840B841BFFAF1BCB842F1BFB843B844B845F1BEF1C0B846B847B848B849B84AF1C1B84BB84CB84DB84EB84FB850B851B852B853B854B855C1FEB856B857B858B859B85AB85BB85CB85DB85EB85FB860C1A2B861B862B863B864B865B866B867B868B869B86ACAFAB86BB86CD5BEB86DB86EB86FB870BEBABEB9D5C2B871B872BFA2B873CDAFF1B5B874B875B876B877B878B879BDDFB87AB6CBB87BB87CB87DB87EB880B881B882B883B884D6F1F3C3B885B886F3C4B887B8CDB888B889B88AF3C6F3C7B88BB0CAB88CF3C5B88DF3C9CBF1B88EB88FB890F3CBB891D0A6B892B893B1CAF3C8B894B895B896F3CFB897B5D1B898B899F3D7B89AF3D2B89BB89CB89DF3D4F3D3B7FBB89EB1BFB89FF3CEF3CAB5DAB8A0F3D0B940B941F3D1B942F3D5B943B944B945B946F3CDB947BCE3B948C1FDB949F3D6B94AB94BB94CB94DB94EB94FF3DAB950F3CCB951B5C8B952BDEEF3DCB953B954B7A4BFF0D6FECDB2B955B4F0B956B2DFB957F3D8B958F3D9C9B8B959F3DDB95AB95BF3DEB95CF3E1B95DB95EB95FB960B961B962B963B964B965B966B967F3DFB968B969F3E3F3E2B96AB96BF3DBB96CBFEAB96DB3EFB96EF3E0B96FB970C7A9B971BCF2B972B973B974B975F3EBB976B977B978B979B97AB97BB97CB9BFB97DB97EF3E4B980B981B982B2ADBBFEB983CBE3B984B985B986B987F3EDF3E9B988B989B98AB9DCF3EEB98BB98CB98DF3E5F3E6F3EAC2E1F3ECF3EFF3E8BCFDB98EB98FB990CFE4B991B992F3F0B993B994B995F3E7B996B997B998B999B99AB99BB99CB99DF3F2B99EB99FB9A0BA40D7ADC6AABA41BA42BA43BA44F3F3BA45BA46BA47BA48F3F1BA49C2A8BA4ABA4BBA4CBA4DBA4EB8DDF3F5BA4FBA50F3F4BA51BA52BA53B4DBBA54BA55BA56F3F6F3F7BA57BA58BA59F3F8BA5ABA5BBA5CC0BABA5DBA5EC0E9BA5FBA60BA61BA62BA63C5F1BA64BA65BA66BA67F3FBBA68F3FABA69BA6ABA6BBA6CBA6DBA6EBA6FBA70B4D8BA71BA72BA73F3FEF3F9BA74BA75F3FCBA76BA77BA78BA79BA7ABA7BF3FDBA7CBA7DBA7EBA80BA81BA82BA83BA84F4A1BA85BA86BA87BA88BA89BA8AF4A3BBC9BA8BBA8CF4A2BA8DBA8EBA8FBA90BA91BA92BA93BA94BA95BA96BA97BA98BA99F4A4BA9ABA9BBA9CBA9DBA9EBA9FB2BEF4A6F4A5BAA0BB40BB41BB42BB43BB44BB45BB46BB47BB48BB49BCAEBB4ABB4BBB4CBB4DBB4EBB4FBB50BB51BB52BB53BB54BB55BB56BB57BB58BB59BB5ABB5BBB5CBB5DBB5EBB5FBB60BB61BB62BB63BB64BB65BB66BB67BB68BB69BB6ABB6BBB6CBB6DBB6EC3D7D9E1BB6FBB70BB71BB72BB73BB74C0E0F4CCD7D1BB75BB76BB77BB78BB79BB7ABB7BBB7CBB7DBB7EBB80B7DBBB81BB82BB83BB84BB85BB86BB87F4CEC1A3BB88BB89C6C9BB8AB4D6D5B3BB8BBB8CBB8DF4D0F4CFF4D1CBDABB8EBB8FF4D2BB90D4C1D6E0BB91BB92BB93BB94B7E0BB95BB96BB97C1B8BB98BB99C1BBF4D3BEACBB9ABB9BBB9CBB9DBB9EB4E2BB9FBBA0F4D4F4D5BEABBC40BC41F4D6BC42BC43BC44F4DBBC45F4D7F4DABC46BAFDBC47F4D8F4D9BC48BC49BC4ABC4BBC4CBC4DBC4EB8E2CCC7F4DCBC4FB2DABC50BC51C3D3BC52BC53D4E3BFB7BC54BC55BC56BC57BC58BC59BC5AF4DDBC5BBC5CBC5DBC5EBC5FBC60C5B4BC61BC62BC63BC64BC65BC66BC67BC68F4E9BC69BC6ACFB5BC6BBC6CBC6DBC6EBC6FBC70BC71BC72BC73BC74BC75BC76BC77BC78CEC9BC79BC7ABC7BBC7CBC7DBC7EBC80BC81BC82BC83BC84BC85BC86BC87BC88BC89BC8ABC8BBC8CBC8DBC8ECBD8BC8FCBF7BC90BC91BC92BC93BDF4BC94BC95BC96D7CFBC97BC98BC99C0DBBC9ABC9BBC9CBC9DBC9EBC9FBCA0BD40BD41BD42BD43BD44BD45BD46BD47BD48BD49BD4ABD4BBD4CBD4DBD4EBD4FBD50BD51BD52BD53BD54BD55BD56BD57BD58BD59BD5ABD5BBD5CBD5DBD5EBD5FBD60BD61BD62BD63BD64BD65BD66BD67BD68BD69BD6ABD6BBD6CBD6DBD6EBD6FBD70BD71BD72BD73BD74BD75BD76D0F5BD77BD78BD79BD7ABD7BBD7CBD7DBD7EF4EABD80BD81BD82BD83BD84BD85BD86BD87BD88BD89BD8ABD8BBD8CBD8DBD8EBD8FBD90BD91BD92BD93BD94BD95BD96BD97BD98BD99BD9ABD9BBD9CBD9DBD9EBD9FBDA0BE40BE41BE42BE43BE44BE45BE46BE47BE48BE49BE4ABE4BBE4CF4EBBE4DBE4EBE4FBE50BE51BE52BE53F4ECBE54BE55BE56BE57BE58BE59BE5ABE5BBE5CBE5DBE5EBE5FBE60BE61BE62BE63BE64BE65BE66BE67BE68BE69BE6ABE6BBE6CBE6DBE6EBE6FBE70BE71BE72BE73BE74BE75BE76BE77BE78BE79BE7ABE7BBE7CBE7DBE7EBE80BE81BE82BE83BE84BE85BE86BE87BE88BE89BE8ABE8BBE8CBE8DBE8EBE8FBE90BE91BE92BE93BE94BE95BE96BE97BE98BE99BE9ABE9BBE9CBE9DBE9EBE9FBEA0BF40BF41BF42BF43BF44BF45BF46BF47BF48BF49BF4ABF4BBF4CBF4DBF4EBF4FBF50BF51BF52BF53BF54BF55BF56BF57BF58BF59BF5ABF5BBF5CBF5DBF5EBF5FBF60BF61BF62BF63BF64BF65BF66BF67BF68BF69BF6ABF6BBF6CBF6DBF6EBF6FBF70BF71BF72BF73BF74BF75BF76BF77BF78BF79BF7ABF7BBF7CBF7DBF7EBF80F7E3BF81BF82BF83BF84BF85B7B1BF86BF87BF88BF89BF8AF4EDBF8BBF8CBF8DBF8EBF8FBF90BF91BF92BF93BF94BF95BF96BF97BF98BF99BF9ABF9BBF9CBF9DBF9EBF9FBFA0C040C041C042C043C044C045C046C047C048C049C04AC04BC04CC04DC04EC04FC050C051C052C053C054C055C056C057C058C059C05AC05BC05CC05DC05EC05FC060C061C062C063D7EBC064C065C066C067C068C069C06AC06BC06CC06DC06EC06FC070C071C072C073C074C075C076C077C078C079C07AC07BF4EEC07CC07DC07EE6F9BEC0E6FABAECE6FBCFCBE6FCD4BCBCB6E6FDE6FEBCCDC8D2CEB3E7A1C080B4BFE7A2C9B4B8D9C4C9C081D7DDC2DAB7D7D6BDCEC6B7C4C082C083C5A6E7A3CFDFE7A4E7A5E7A6C1B7D7E9C9F0CFB8D6AFD6D5E7A7B0EDE7A8E7A9C9DCD2EFBEADE7AAB0F3C8DEBDE1E7ABC8C6C084E7ACBBE6B8F8D1A4E7ADC2E7BEF8BDCACDB3E7AEE7AFBEEED0E5C085CBE7CCD0BCCCE7B0BCA8D0F7E7B1C086D0F8E7B2E7B3B4C2E7B4E7B5C9FECEACC3E0E7B7B1C1B3F1C087E7B8E7B9D7DBD5C0E7BAC2CCD7BAE7BBE7BCE7BDBCEAC3E5C0C2E7BEE7BFBCA9C088E7C0E7C1E7B6B6D0E7C2C089E7C3E7C4BBBAB5DEC2C6B1E0E7C5D4B5E7C6B8BFE7C8E7C7B7ECC08AE7C9B2F8E7CAE7CBE7CCE7CDE7CEE7CFE7D0D3A7CBF5E7D1E7D2E7D3E7D4C9C9E7D5E7D6E7D7E7D8E7D9BDC9E7DAF3BEC08BB8D7C08CC8B1C08DC08EC08FC090C091C092C093F3BFC094F3C0F3C1C095C096C097C098C099C09AC09BC09CC09DC09EB9DECDF8C09FC0A0D8E8BAB1C140C2DEEEB7C141B7A3C142C143C144C145EEB9C146EEB8B0D5C147C148C149C14AC14BEEBBD5D6D7EFC14CC14DC14ED6C3C14FC150EEBDCAF0C151EEBCC152C153C154C155EEBEC156C157C158C159EEC0C15AC15BEEBFC15CC15DC15EC15FC160C161C162C163D1F2C164C7BCC165C3C0C166C167C168C169C16AB8E1C16BC16CC16DC16EC16FC1E7C170C171F4C6D0DFF4C7C172CFDBC173C174C8BAC175C176F4C8C177C178C179C17AC17BC17CC17DF4C9F4CAC17EF4CBC180C181C182C183C184D9FAB8FEC185C186E5F1D3F0C187F4E0C188CECCC189C18AC18BB3E1C18CC18DC18EC18FF1B4C190D2EEC191F4E1C192C193C194C195C196CFE8F4E2C197C198C7CCC199C19AC19BC19CC19DC19EB5D4B4E4F4E4C19FC1A0C240F4E3F4E5C241C242F4E6C243C244C245C246F4E7C247BAB2B0BFC248F4E8C249C24AC24BC24CC24DC24EC24FB7ADD2EDC250C251C252D2ABC0CFC253BFBCEBA3D5DFEAC8C254C255C256C257F1F3B6F8CBA3C258C259C4CDC25AF1E7C25BF1E8B8FBF1E9BAC4D4C5B0D2C25CC25DF1EAC25EC25FC260F1EBC261F1ECC262C263F1EDF1EEF1EFF1F1F1F0C5D5C264C265C266C267C268C269F1F2C26AB6FAC26BF1F4D2AEDEC7CBCAC26CC26DB3DCC26EB5A2C26FB9A2C270C271C4F4F1F5C272C273F1F6C274C275C276C1C4C1FBD6B0F1F7C277C278C279C27AF1F8C27BC1AAC27CC27DC27EC6B8C280BEDBC281C282C283C284C285C286C287C288C289C28AC28BC28CC28DC28EF1F9B4CFC28FC290C291C292C293C294F1FAC295C296C297C298C299C29AC29BC29CC29DC29EC29FC2A0C340EDB2EDB1C341C342CBE0D2DEC343CBC1D5D8C344C8E2C345C0DFBCA1C346C347C348C349C34AC34BEBC1C34CC34DD0A4C34ED6E2C34FB6C7B8D8EBC0B8CEC350EBBFB3A6B9C9D6ABC351B7F4B7CAC352C353C354BCE7B7BEEBC6C355EBC7B0B9BFCFC356EBC5D3FDC357EBC8C358C359EBC9C35AC35BB7CEC35CEBC2EBC4C9F6D6D7D5CDD0B2EBCFCEB8EBD0C35DB5A8C35EC35FC360C361C362B1B3EBD2CCA5C363C364C365C366C367C368C369C5D6EBD3C36AEBD1C5DFEBCECAA4EBD5B0FBC36BC36CBAFAC36DC36ED8B7F1E3C36FEBCAEBCBEBCCEBCDEBD6E6C0EBD9C370BFE8D2C8EBD7EBDCB8ECEBD8C371BDBAC372D0D8C373B0B7C374EBDDC4DCC375C376C377C378D6ACC379C37AC37BB4E0C37CC37DC2F6BCB9C37EC380EBDAEBDBD4E0C6EAC4D4EBDFC5A7D9F5C381B2B1C382EBE4C383BDC5C384C385C386EBE2C387C388C389C38AC38BC38CC38DC38EC38FC390C391C392C393EBE3C394C395B8ACC396CDD1EBE5C397C398C399EBE1C39AC1B3C39BC39CC39DC39EC39FC6A2C3A0C440C441C442C443C444C445CCF3C446EBE6C447C0B0D2B8EBE7C448C449C44AB8AFB8ADC44BEBE8C7BBCDF3C44CC44DC44EEBEAEBEBC44FC450C451C452C453EBEDC454C455C456C457D0C8C458EBF2C459EBEEC45AC45BC45CEBF1C8F9C45DD1FCEBECC45EC45FEBE9C460C461C462C463B8B9CFD9C4E5EBEFEBF0CCDACDC8B0F2C464EBF6C465C466C467C468C469EBF5C46AB2B2C46BC46CC46DC46EB8E0C46FEBF7C470C471C472C473C474C475B1ECC476C477CCC5C4A4CFA5C478C479C47AC47BC47CEBF9C47DC47EECA2C480C5F2C481EBFAC482C483C484C485C486C487C488C489C9C5C48AC48BC48CC48DC48EC48FE2DFEBFEC490C491C492C493CDCEECA1B1DBD3B7C494C495D2DCC496C497C498EBFDC499EBFBC49AC49BC49CC49DC49EC49FC4A0C540C541C542C543C544C545C546C547C548C549C54AC54BC54CC54DC54EB3BCC54FC550C551EAB0C552C553D7D4C554F4ABB3F4C555C556C557C558C559D6C1D6C2C55AC55BC55CC55DC55EC55FD5E9BECAC560F4A7C561D2A8F4A8F4A9C562F4AABECBD3DFC563C564C565C566C567C9E0C9E1C568C569F3C2C56ACAE6C56BCCF2C56CC56DC56EC56FC570C571E2B6CBB4C572CEE8D6DBC573F4ADF4AEF4AFC574C575C576C577F4B2C578BABDF4B3B0E3F4B0C579F4B1BDA2B2D5C57AF4B6F4B7B6E6B2B0CFCFF4B4B4ACC57BF4B5C57CC57DF4B8C57EC580C581C582C583F4B9C584C585CDA7C586F4BAC587F4BBC588C589C58AF4BCC58BC58CC58DC58EC58FC590C591C592CBD2C593F4BDC594C595C596C597F4BEC598C599C59AC59BC59CC59DC59EC59FF4BFC5A0C640C641C642C643F4DEC1BCBCE8C644C9ABD1DEE5F5C645C646C647C648DCB3D2D5C649C64ADCB4B0ACDCB5C64BC64CBDDAC64DDCB9C64EC64FC650D8C2C651DCB7D3F3C652C9D6DCBADCB6C653DCBBC3A2C654C655C656C657DCBCDCC5DCBDC658C659CEDFD6A5C65ADCCFC65BDCCDC65CC65DDCD2BDE6C2ABC65EDCB8DCCBDCCEDCBEB7D2B0C5DCC7D0BEDCC1BBA8C65FB7BCDCCCC660C661DCC6DCBFC7DBC662C663C664D1BFDCC0C665C666DCCAC667C668DCD0C669C66ACEADDCC2C66BDCC3DCC8DCC9B2D4DCD1CBD5C66CD4B7DCDBDCDFCCA6DCE6C66DC3E7DCDCC66EC66FBFC1DCD9C670B0FAB9B6DCE5DCD3C671DCC4DCD6C8F4BFE0C672C673C674C675C9BBC676C677C678B1BDC679D3A2C67AC67BDCDAC67CC67DDCD5C67EC6BBC680DCDEC681C682C683C684C685D7C2C3AFB7B6C7D1C3A9DCE2DCD8DCEBDCD4C686C687DCDDC688BEA5DCD7C689DCE0C68AC68BDCE3DCE4C68CDCF8C68DC68EDCE1DDA2DCE7C68FC690C691C692C693C694C695C696C697C698BCEBB4C4C699C69AC3A3B2E7DCFAC69BDCF2C69CDCEFC69DDCFCDCEED2F0B2E8C69EC8D7C8E3DCFBC69FDCEDC6A0C740C741DCF7C742C743DCF5C744C745BEA3DCF4C746B2DDC747C748C749C74AC74BDCF3BCF6DCE8BBC4C74CC0F3C74DC74EC74FC750C751BCD4DCE9DCEAC752DCF1DCF6DCF9B5B4C753C8D9BBE7DCFEDCFDD3ABDDA1DDA3DDA5D2F1DDA4DDA6DDA7D2A9C754C755C756C757C758C759C75ABAC9DDA9C75BC75CDDB6DDB1DDB4C75DC75EC75FC760C761C762C763DDB0C6CEC764C765C0F2C766C767C768C769C9AFC76AC76BC76CDCECDDAEC76DC76EC76FC770DDB7C771C772DCF0DDAFC773DDB8C774DDACC775C776C777C778C779C77AC77BDDB9DDB3DDADC4AAC77CC77DC77EC780DDA8C0B3C1ABDDAADDABC781DDB2BBF1DDB5D3A8DDBAC782DDBBC3A7C783C784DDD2DDBCC785C786C787DDD1C788B9BDC789C78ABED5C78BBEFAC78CC78DBACAC78EC78FC790C791DDCAC792DDC5C793DDBFC794C795C796B2CBDDC3C797DDCBB2A4DDD5C798C799C79ADDBEC79BC79CC79DC6D0DDD0C79EC79FC7A0C840C841DDD4C1E2B7C6C842C843C844C845C846DDCEDDCFC847C848C849DDC4C84AC84BC84CDDBDC84DDDCDCCD1C84EDDC9C84FC850C851C852DDC2C3C8C6BCCEAEDDCCC853DDC8C854C855C856C857C858C859DDC1C85AC85BC85CDDC6C2DCC85DC85EC85FC860C861C862D3A9D3AADDD3CFF4C8F8C863C864C865C866C867C868C869C86ADDE6C86BC86CC86DC86EC86FC870DDC7C871C872C873DDE0C2E4C874C875C876C877C878C879C87AC87BDDE1C87CC87DC87EC880C881C882C883C884C885C886DDD7C887C888C889C88AC88BD6F8C88CDDD9DDD8B8F0DDD6C88DC88EC88FC890C6CFC891B6ADC892C893C894C895C896DDE2C897BAF9D4E1DDE7C898C899C89AB4D0C89BDDDAC89CBFFBDDE3C89DDDDFC89EDDDDC89FC8A0C940C941C942C943C944B5D9C945C946C947C948DDDBDDDCDDDEC949BDAFDDE4C94ADDE5C94BC94CC94DC94EC94FC950C951C952DDF5C953C3C9C954C955CBE2C956C957C958C959DDF2C95AC95BC95CC95DC95EC95FC960C961C962C963C964C965C966D8E1C967C968C6D1C969DDF4C96AC96BC96CD5F4DDF3DDF0C96DC96EDDECC96FDDEFC970DDE8C971C972D0EEC973C974C975C976C8D8DDEEC977C978DDE9C979C97ADDEACBF2C97BDDEDC97CC97DB1CDC97EC980C981C982C983C984C0B6C985BCBBDDF1C986C987DDF7C988DDF6DDEBC989C98AC98BC98CC98DC5EEC98EC98FC990DDFBC991C992C993C994C995C996C997C998C999C99AC99BDEA4C99CC99DDEA3C99EC99FC9A0CA40CA41CA42CA43CA44CA45CA46CA47CA48DDF8CA49CA4ACA4BCA4CC3EFCA4DC2FBCA4ECA4FCA50D5E1CA51CA52CEB5CA53CA54CA55CA56DDFDCA57B2CCCA58CA59CA5ACA5BCA5CCA5DCA5ECA5FCA60C4E8CADFCA61CA62CA63CA64CA65CA66CA67CA68CA69CA6AC7BEDDFADDFCDDFEDEA2B0AAB1CECA6BCA6CCA6DCA6ECA6FDEACCA70CA71CA72CA73DEA6BDB6C8EFCA74CA75CA76CA77CA78CA79CA7ACA7BCA7CCA7DCA7EDEA1CA80CA81DEA5CA82CA83CA84CA85DEA9CA86CA87CA88CA89CA8ADEA8CA8BCA8CCA8DDEA7CA8ECA8FCA90CA91CA92CA93CA94CA95CA96DEADCA97D4CCCA98CA99CA9ACA9BDEB3DEAADEAECA9CCA9DC0D9CA9ECA9FCAA0CB40CB41B1A1DEB6CB42DEB1CB43CB44CB45CB46CB47CB48CB49DEB2CB4ACB4BCB4CCB4DCB4ECB4FCB50CB51CB52CB53CB54D1A6DEB5CB55CB56CB57CB58CB59CB5ACB5BDEAFCB5CCB5DCB5EDEB0CB5FD0BDCB60CB61CB62DEB4CAEDDEB9CB63CB64CB65CB66CB67CB68DEB8CB69DEB7CB6ACB6BCB6CCB6DCB6ECB6FCB70DEBBCB71CB72CB73CB74CB75CB76CB77BDE5CB78CB79CB7ACB7BCB7CB2D8C3EACB7DCB7EDEBACB80C5BACB81CB82CB83CB84CB85CB86DEBCCB87CB88CB89CB8ACB8BCB8CCB8DCCD9CB8ECB8FCB90CB91B7AACB92CB93CB94CB95CB96CB97CB98CB99CB9ACB9BCB9CCB9DCB9ECB9FCBA0CC40CC41D4E5CC42CC43CC44DEBDCC45CC46CC47CC48CC49DEBFCC4ACC4BCC4CCC4DCC4ECC4FCC50CC51CC52CC53CC54C4A2CC55CC56CC57CC58DEC1CC59CC5ACC5BCC5CCC5DCC5ECC5FCC60CC61CC62CC63CC64CC65CC66CC67CC68DEBECC69DEC0CC6ACC6BCC6CCC6DCC6ECC6FCC70CC71CC72CC73CC74CC75CC76CC77D5BACC78CC79CC7ADEC2CC7BCC7CCC7DCC7ECC80CC81CC82CC83CC84CC85CC86CC87CC88CC89CC8ACC8BF2AEBBA2C2B2C5B0C2C7CC8CCC8DF2AFCC8ECC8FCC90CC91CC92D0E9CC93CC94CC95D3DDCC96CC97CC98EBBDCC99CC9ACC9BCC9CCC9DCC9ECC9FCCA0B3E6F2B0CD40F2B1CD41CD42CAADCD43CD44CD45CD46CD47CD48CD49BAE7F2B3F2B5F2B4CBE4CFBAF2B2CAB4D2CFC2ECCD4ACD4BCD4CCD4DCD4ECD4FCD50CEC3F2B8B0F6F2B7CD51CD52CD53CD54CD55F2BECD56B2CFCD57CD58CD59CD5ACD5BCD5CD1C1F2BACD5DCD5ECD5FCD60CD61F2BCD4E9CD62CD63F2BBF2B6F2BFF2BDCD64F2B9CD65CD66F2C7F2C4F2C6CD67CD68F2CAF2C2F2C0CD69CD6ACD6BF2C5CD6CCD6DCD6ECD6FCD70D6FBCD71CD72CD73F2C1CD74C7F9C9DFCD75F2C8B9C6B5B0CD76CD77F2C3F2C9F2D0F2D6CD78CD79BBD7CD7ACD7BCD7CF2D5CDDCCD7DD6EBCD7ECD80F2D2F2D4CD81CD82CD83CD84B8F2CD85CD86CD87CD88F2CBCD89CD8ACD8BF2CEC2F9CD8CD5DDF2CCF2CDF2CFF2D3CD8DCD8ECD8FF2D9D3BCCD90CD91CD92CD93B6EACD94CAF1CD95B7E4F2D7CD96CD97CD98F2D8F2DAF2DDF2DBCD99CD9AF2DCCD9BCD9CCD9DCD9ED1D1F2D1CD9FCDC9CDA0CECFD6A9CE40F2E3CE41C3DBCE42F2E0CE43CE44C0AFF2ECF2DECE45F2E1CE46CE47CE48F2E8CE49CE4ACE4BCE4CF2E2CE4DCE4EF2E7CE4FCE50F2E6CE51CE52F2E9CE53CE54CE55F2DFCE56CE57F2E4F2EACE58CE59CE5ACE5BCE5CCE5DCE5ED3ACF2E5B2F5CE5FCE60F2F2CE61D0ABCE62CE63CE64CE65F2F5CE66CE67CE68BBC8CE69F2F9CE6ACE6BCE6CCE6DCE6ECE6FF2F0CE70CE71F2F6F2F8F2FACE72CE73CE74CE75CE76CE77CE78CE79F2F3CE7AF2F1CE7BCE7CCE7DBAFBCE7EB5FBCE80CE81CE82CE83F2EFF2F7F2EDF2EECE84CE85CE86F2EBF3A6CE87F3A3CE88CE89F3A2CE8ACE8BF2F4CE8CC8DACE8DCE8ECE8FCE90CE91F2FBCE92CE93CE94F3A5CE95CE96CE97CE98CE99CE9ACE9BC3F8CE9CCE9DCE9ECE9FCEA0CF40CF41CF42F2FDCF43CF44F3A7F3A9F3A4CF45F2FCCF46CF47CF48F3ABCF49F3AACF4ACF4BCF4CCF4DC2DDCF4ECF4FF3AECF50CF51F3B0CF52CF53CF54CF55CF56F3A1CF57CF58CF59F3B1F3ACCF5ACF5BCF5CCF5DCF5EF3AFF2FEF3ADCF5FCF60CF61CF62CF63CF64CF65F3B2CF66CF67CF68CF69F3B4CF6ACF6BCF6CCF6DF3A8CF6ECF6FCF70CF71F3B3CF72CF73CF74F3B5CF75CF76CF77CF78CF79CF7ACF7BCF7CCF7DCF7ED0B7CF80CF81CF82CF83F3B8CF84CF85CF86CF87D9F9CF88CF89CF8ACF8BCF8CCF8DF3B9CF8ECF8FCF90CF91CF92CF93CF94CF95F3B7CF96C8E4F3B6CF97CF98CF99CF9AF3BACF9BCF9CCF9DCF9ECF9FF3BBB4C0CFA0D040D041D042D043D044D045D046D047D048D049D04AD04BD04CD04DEEC3D04ED04FD050D051D052D053F3BCD054D055F3BDD056D057D058D1AAD059D05AD05BF4ACD0C6D05CD05DD05ED05FD060D061D0D0D1DCD062D063D064D065D066D067CFCED068D069BDD6D06AD1C3D06BD06CD06DD06ED06FD070D071BAE2E1E9D2C2F1C2B2B9D072D073B1EDF1C3D074C9C0B3C4D075D9F2D076CBA5D077F1C4D078D079D07AD07BD6D4D07CD07DD07ED080D081F1C5F4C0F1C6D082D4ACF1C7D083B0C0F4C1D084D085F4C2D086D087B4FCD088C5DBD089D08AD08BD08CCCBBD08DD08ED08FD0E4D090D091D092D093D094CDE0D095D096D097D098D099F1C8D09AD9F3D09BD09CD09DD09ED09FD0A0B1BBD140CFAED141D142D143B8A4D144D145D146D147D148F1CAD149D14AD14BD14CF1CBD14DD14ED14FD150B2C3C1D1D151D152D7B0F1C9D153D154F1CCD155D156D157D158F1CED159D15AD15BD9F6D15CD2E1D4A3D15DD15EF4C3C8B9D15FD160D161D162D163F4C4D164D165F1CDF1CFBFE3F1D0D166D167F1D4D168D169D16AD16BD16CD16DD16EF1D6F1D1D16FC9D1C5E1D170D171D172C2E3B9FCD173D174F1D3D175F1D5D176D177D178B9D3D179D17AD17BD17CD17DD17ED180F1DBD181D182D183D184D185BAD6D186B0FDF1D9D187D188D189D18AD18BF1D8F1D2F1DAD18CD18DD18ED18FD190F1D7D191D192D193C8ECD194D195D196D197CDCAF1DDD198D199D19AD19BE5BDD19CD19DD19EF1DCD19FF1DED1A0D240D241D242D243D244D245D246D247D248F1DFD249D24ACFE5D24BD24CD24DD24ED24FD250D251D252D253D254D255D256D257D258D259D25AD25BD25CD25DD25ED25FD260D261D262D263F4C5BDF3D264D265D266D267D268D269F1E0D26AD26BD26CD26DD26ED26FD270D271D272D273D274D275D276D277D278D279D27AD27BD27CD27DF1E1D27ED280D281CEF7D282D2AAD283F1FBD284D285B8B2D286D287D288D289D28AD28BD28CD28DD28ED28FD290D291D292D293D294D295D296D297D298D299D29AD29BD29CD29DD29ED29FD2A0D340D341D342D343D344D345D346D347D348D349D34AD34BD34CD34DD34ED34FD350D351D352D353D354D355D356D357D358D359D35AD35BD35CD35DD35EBCFBB9DBD35FB9E6C3D9CAD3EAE8C0C0BEF5EAE9EAEAEAEBD360EAECEAEDEAEEEAEFBDC7D361D362D363F5FBD364D365D366F5FDD367F5FED368F5FCD369D36AD36BD36CBDE2D36DF6A1B4A5D36ED36FD370D371F6A2D372D373D374F6A3D375D376D377ECB2D378D379D37AD37BD37CD37DD37ED380D381D382D383D384D1D4D385D386D387D388D389D38AD9EAD38BD38CD38DD38ED38FD390D391D392D393D394D395D396D397D398D399D39AD39BD39CD39DD39ED39FD3A0D440D441D442D443D444D445D446D447D448D449D44AD44BD44CD44DD44ED44FD450D451D452D453D454D455D456D457D458D459D45AD45BD45CD45DD45ED45FF6A4D460D461D462D463D464D465D466D467D468EEBAD469D46AD46BD46CD46DD46ED46FD470D471D472D473D474D475D476D477D478D479D47AD47BD47CD47DD47ED480D481D482D483D484D485D486D487D488D489D48AD48BD48CD48DD48ED48FD490D491D492D493D494D495D496D497D498D499D5B2D49AD49BD49CD49DD49ED49FD4A0D540D541D542D543D544D545D546D547D3FECCDCD548D549D54AD54BD54CD54DD54ED54FCAC4D550D551D552D553D554D555D556D557D558D559D55AD55BD55CD55DD55ED55FD560D561D562D563D564D565D566D567D568D569D56AD56BD56CD56DD56ED56FD570D571D572D573D574D575D576D577D578D579D57AD57BD57CD57DD57ED580D581D582D583D584D585D586D587D588D589D58AD58BD58CD58DD58ED58FD590D591D592D593D594D595D596D597D598D599D59AD59BD59CD59DD59ED59FD5A0D640D641D642D643D644D645D646D647D648D649D64AD64BD64CD64DD64ED64FD650D651D652D653D654D655D656D657D658D659D65AD65BD65CD65DD65ED65FD660D661D662E5C0D663D664D665D666D667D668D669D66AD66BD66CD66DD66ED66FD670D671D672D673D674D675D676D677D678D679D67AD67BD67CD67DD67ED680D681F6A5D682D683D684D685D686D687D688D689D68AD68BD68CD68DD68ED68FD690D691D692D693D694D695D696D697D698D699D69AD69BD69CD69DD69ED69FD6A0D740D741D742D743D744D745D746D747D748D749D74AD74BD74CD74DD74ED74FD750D751D752D753D754D755D756D757D758D759D75AD75BD75CD75DD75ED75FBEAFD760D761D762D763D764C6A9D765D766D767D768D769D76AD76BD76CD76DD76ED76FD770D771D772D773D774D775D776D777D778D779D77AD77BD77CD77DD77ED780D781D782D783D784D785D786D787D788D789D78AD78BD78CD78DD78ED78FD790D791D792D793D794D795D796D797D798DAA5BCC6B6A9B8BCC8CFBCA5DAA6DAA7CCD6C8C3DAA8C6FDD799D1B5D2E9D1B6BCC7D79ABDB2BBE4DAA9DAAAD1C8DAABD0EDB6EFC2DBD79BCBCFB7EDC9E8B7C3BEF7D6A4DAACDAADC6C0D7E7CAB6D79CD5A9CBDFD5EFDAAED6DFB4CADAB0DAAFD79DD2EBDAB1DAB2DAB3CAD4DAB4CAABDAB5DAB6B3CFD6EFDAB7BBB0B5AEDAB8DAB9B9EED1AFD2E8DABAB8C3CFEAB2EFDABBDABCD79EBDEBCEDCD3EFDABDCEF3DABED3D5BBE5DABFCBB5CBD0DAC0C7EBD6EEDAC1C5B5B6C1DAC2B7CCBFCEDAC3DAC4CBADDAC5B5F7DAC6C1C2D7BBDAC7CCB8D79FD2EAC4B1DAC8B5FDBBD1DAC9D0B3DACADACBCEBDDACCDACDDACEB2F7DAD1DACFD1E8DAD0C3D5DAD2D7A0DAD3DAD4DAD5D0BBD2A5B0F9DAD6C7ABDAD7BDF7C3A1DAD8DAD9C3FDCCB7DADADADBC0BEC6D7DADCDADDC7B4DADEDADFB9C8D840D841D842D843D844D845D846D847D848BBEDD849D84AD84BD84CB6B9F4F8D84DF4F9D84ED84FCDE3D850D851D852D853D854D855D856D857F5B9D858D859D85AD85BEBE0D85CD85DD85ED85FD860D861CFF3BBBFD862D863D864D865D866D867D868BAC0D4A5D869D86AD86BD86CD86DD86ED86FE1D9D870D871D872D873F5F4B1AAB2F2D874D875D876D877D878D879D87AF5F5D87BD87CF5F7D87DD87ED880BAD1F5F6D881C3B2D882D883D884D885D886D887D888F5F9D889D88AD88BF5F8D88CD88DD88ED88FD890D891D892D893D894D895D896D897D898D899D89AD89BD89CD89DD89ED89FD8A0D940D941D942D943D944D945D946D947D948D949D94AD94BD94CD94DD94ED94FD950D951D952D953D954D955D956D957D958D959D95AD95BD95CD95DD95ED95FD960D961D962D963D964D965D966D967D968D969D96AD96BD96CD96DD96ED96FD970D971D972D973D974D975D976D977D978D979D97AD97BD97CD97DD97ED980D981D982D983D984D985D986D987D988D989D98AD98BD98CD98DD98ED98FD990D991D992D993D994D995D996D997D998D999D99AD99BD99CD99DD99ED99FD9A0DA40DA41DA42DA43DA44DA45DA46DA47DA48DA49DA4ADA4BDA4CDA4DDA4EB1B4D5EAB8BADA4FB9B1B2C6D4F0CFCDB0DCD5CBBBF5D6CAB7B7CCB0C6B6B1E1B9BAD6FCB9E1B7A1BCFAEADAEADBCCF9B9F3EADCB4FBC3B3B7D1BAD8EADDD4F4EADEBCD6BBDFEADFC1DEC2B8D4DFD7CAEAE0EAE1EAE4EAE2EAE3C9DEB8B3B6C4EAE5CAEAC9CDB4CDDA50DA51E2D9C5E2EAE6C0B5DA52D7B8EAE7D7ACC8FCD8D3D8CDD4DEDA53D4F9C9C4D3AEB8D3B3E0DA54C9E2F4F6DA55DA56DA57BAD5DA58F4F7DA59DA5AD7DFDA5BDA5CF4F1B8B0D5D4B8CFC6F0DA5DDA5EDA5FDA60DA61DA62DA63DA64DA65B3C3DA66DA67F4F2B3ACDA68DA69DA6ADA6BD4BDC7F7DA6CDA6DDA6EDA6FDA70F4F4DA71DA72F4F3DA73DA74DA75DA76DA77DA78DA79DA7ADA7BDA7CCCCBDA7DDA7EDA80C8A4DA81DA82DA83DA84DA85DA86DA87DA88DA89DA8ADA8BDA8CDA8DF4F5DA8ED7E3C5BFF5C0DA8FDA90F5BBDA91F5C3DA92F5C2DA93D6BAF5C1DA94DA95DA96D4BEF5C4DA97F5CCDA98DA99DA9ADA9BB0CFB5F8DA9CF5C9F5CADA9DC5DCDA9EDA9FDAA0DB40F5C5F5C6DB41DB42F5C7F5CBDB43BEE0F5C8B8FADB44DB45DB46F5D0F5D3DB47DB48DB49BFE7DB4AB9F2F5BCF5CDDB4BDB4CC2B7DB4DDB4EDB4FCCF8DB50BCF9DB51F5CEF5CFF5D1B6E5F5D2DB52F5D5DB53DB54DB55DB56DB57DB58DB59F5BDDB5ADB5BDB5CF5D4D3BBDB5DB3ECDB5EDB5FCCA4DB60DB61DB62DB63F5D6DB64DB65DB66DB67DB68DB69DB6ADB6BF5D7BEE1F5D8DB6CDB6DCCDFF5DBDB6EDB6FDB70DB71DB72B2C8D7D9DB73F5D9DB74F5DAF5DCDB75F5E2DB76DB77DB78F5E0DB79DB7ADB7BF5DFF5DDDB7CDB7DF5E1DB7EDB80F5DEF5E4F5E5DB81CCE3DB82DB83E5BFB5B8F5E3F5E8CCA3DB84DB85DB86DB87DB88F5E6F5E7DB89DB8ADB8BDB8CDB8DDB8EF5BEDB8FDB90DB91DB92DB93DB94DB95DB96DB97DB98DB99DB9AB1C4DB9BDB9CF5BFDB9DDB9EB5C5B2E4DB9FF5ECF5E9DBA0B6D7DC40F5EDDC41F5EADC42DC43DC44DC45DC46F5EBDC47DC48B4DADC49D4EADC4ADC4BDC4CF5EEDC4DB3F9DC4EDC4FDC50DC51DC52DC53DC54F5EFF5F1DC55DC56DC57F5F0DC58DC59DC5ADC5BDC5CDC5DDC5EF5F2DC5FF5F3DC60DC61DC62DC63DC64DC65DC66DC67DC68DC69DC6ADC6BC9EDB9AADC6CDC6DC7FBDC6EDC6FB6E3DC70DC71DC72DC73DC74DC75DC76CCC9DC77DC78DC79DC7ADC7BDC7CDC7DDC7EDC80DC81DC82DC83DC84DC85DC86DC87DC88DC89DC8AEAA6DC8BDC8CDC8DDC8EDC8FDC90DC91DC92DC93DC94DC95DC96DC97DC98DC99DC9ADC9BDC9CDC9DDC9EDC9FDCA0DD40DD41DD42DD43DD44DD45DD46DD47DD48DD49DD4ADD4BDD4CDD4DDD4EDD4FDD50DD51DD52DD53DD54DD55DD56DD57DD58DD59DD5ADD5BDD5CDD5DDD5EDD5FDD60DD61DD62DD63DD64DD65DD66DD67DD68DD69DD6ADD6BDD6CDD6DDD6EDD6FDD70DD71DD72DD73DD74DD75DD76DD77DD78DD79DD7ADD7BDD7CDD7DDD7EDD80DD81DD82DD83DD84DD85DD86DD87DD88DD89DD8ADD8BDD8CDD8DDD8EDD8FDD90DD91DD92DD93DD94DD95DD96DD97DD98DD99DD9ADD9BDD9CDD9DDD9EDD9FDDA0DE40DE41DE42DE43DE44DE45DE46DE47DE48DE49DE4ADE4BDE4CDE4DDE4EDE4FDE50DE51DE52DE53DE54DE55DE56DE57DE58DE59DE5ADE5BDE5CDE5DDE5EDE5FDE60B3B5D4FEB9ECD0F9DE61E9EDD7AAE9EEC2D6C8EDBAE4E9EFE9F0E9F1D6E1E9F2E9F3E9F5E9F4E9F6E9F7C7E1E9F8D4D8E9F9BDCEDE62E9FAE9FBBDCFE9FCB8A8C1BEE9FDB1B2BBD4B9F5E9FEDE63EAA1EAA2EAA3B7F8BCADDE64CAE4E0CED4AFCFBDD5B7EAA4D5DEEAA5D0C1B9BCDE65B4C7B1D9DE66DE67DE68C0B1DE69DE6ADE6BDE6CB1E6B1E7DE6DB1E8DE6EDE6FDE70DE71B3BDC8E8DE72DE73DE74DE75E5C1DE76DE77B1DFDE78DE79DE7AC1C9B4EFDE7BDE7CC7A8D3D8DE7DC6F9D1B8DE7EB9FDC2F5DE80DE81DE82DE83DE84D3ADDE85D4CBBDFCDE86E5C2B7B5E5C3DE87DE88BBB9D5E2DE89BDF8D4B6CEA5C1ACB3D9DE8ADE8BCCF6DE8CE5C6E5C4E5C8DE8DE5CAE5C7B5CFC6C8DE8EB5FCE5C5DE8FCAF6DE90DE91E5C9DE92DE93DE94C3D4B1C5BCA3DE95DE96DE97D7B7DE98DE99CDCBCBCDCACACCD3E5CCE5CBC4E6DE9ADE9BD1A1D1B7E5CDDE9CE5D0DE9DCDB8D6F0E5CFB5DDDE9ECDBEDE9FE5D1B6BADEA0DF40CDA8B9E4DF41CAC5B3D1CBD9D4ECE5D2B7EADF42DF43DF44E5CEDF45DF46DF47DF48DF49DF4AE5D5B4FEE5D6DF4BDF4CDF4DDF4EDF4FE5D3E5D4DF50D2DDDF51DF52C2DFB1C6DF53D3E2DF54DF55B6DDCBECDF56E5D7DF57DF58D3F6DF59DF5ADF5BDF5CDF5DB1E9DF5EB6F4E5DAE5D8E5D9B5C0DF5FDF60DF61D2C5E5DCDF62DF63E5DEDF64DF65DF66DF67DF68DF69E5DDC7B2DF6AD2A3DF6BDF6CE5DBDF6DDF6EDF6FDF70D4E2D5DADF71DF72DF73DF74DF75E5E0D7F1DF76DF77DF78DF79DF7ADF7BDF7CE5E1DF7DB1DCD1FBDF7EE5E2E5E4DF80DF81DF82DF83E5E3DF84DF85E5E5DF86DF87DF88DF89DF8AD2D8DF8BB5CBDF8CE7DFDF8DDAF5DF8EDAF8DF8FDAF6DF90DAF7DF91DF92DF93DAFAD0CFC4C7DF94DF95B0EEDF96DF97DF98D0B0DF99DAF9DF9AD3CABAAADBA2C7F1DF9BDAFCDAFBC9DBDAFDDF9CDBA1D7DEDAFEC1DADF9DDF9EDBA5DF9FDFA0D3F4E040E041DBA7DBA4E042DBA8E043E044BDBCE045E046E047C0C9DBA3DBA6D6A3E048DBA9E049E04AE04BDBADE04CE04DE04EDBAEDBACBAC2E04FE050E051BFA4DBABE052E053E054DBAAD4C7B2BFE055E056DBAFE057B9F9E058DBB0E059E05AE05BE05CB3BBE05DE05EE05FB5A6E060E061E062E063B6BCDBB1E064E065E066B6F5E067DBB2E068E069E06AE06BE06CE06DE06EE06FE070E071E072E073E074E075E076E077E078E079E07AE07BB1C9E07CE07DE07EE080DBB4E081E082E083DBB3DBB5E084E085E086E087E088E089E08AE08BE08CE08DE08EDBB7E08FDBB6E090E091E092E093E094E095E096DBB8E097E098E099E09AE09BE09CE09DE09EE09FDBB9E0A0E140DBBAE141E142D3CFF4FAC7F5D7C3C5E4F4FCF4FDF4FBE143BEC6E144E145E146E147D0EFE148E149B7D3E14AE14BD4CDCCAAE14CE14DF5A2F5A1BAA8F4FECBD6E14EE14FE150F5A4C0D2E151B3EAE152CDAAF5A5F5A3BDB4F5A8E153F5A9BDCDC3B8BFE1CBE1F5AAE154E155E156F5A6F5A7C4F0E157E158E159E15AE15BF5ACE15CB4BCE15DD7EDE15EB4D7F5ABF5AEE15FE160F5ADF5AFD0D1E161E162E163E164E165E166E167C3D1C8A9E168E169E16AE16BE16CE16DF5B0F5B1E16EE16FE170E171E172E173F5B2E174E175F5B3F5B4F5B5E176E177E178E179F5B7F5B6E17AE17BE17CE17DF5B8E17EE180E181E182E183E184E185E186E187E188E189E18AB2C9E18BD3D4CACDE18CC0EFD6D8D2B0C1BFE18DBDF0E18EE18FE190E191E192E193E194E195E196E197B8AAE198E199E19AE19BE19CE19DE19EE19FE1A0E240E241E242E243E244E245E246E247E248E249E24AE24BE24CE24DE24EE24FE250E251E252E253E254E255E256E257E258E259E25AE25BE25CE25DE25EE25FE260E261E262E263E264E265E266E267E268E269E26AE26BE26CE26DE26EE26FE270E271E272E273E274E275E276E277E278E279E27AE27BE27CE27DE27EE280E281E282E283E284E285E286E287E288E289E28AE28BE28CE28DE28EE28FE290E291E292E293E294E295E296E297E298E299E29AE29BE29CE29DE29EE29FE2A0E340E341E342E343E344E345E346E347E348E349E34AE34BE34CE34DE34EE34FE350E351E352E353E354E355E356E357E358E359E35AE35BE35CE35DE35EE35FE360E361E362E363E364E365E366E367E368E369E36AE36BE36CE36DBCF8E36EE36FE370E371E372E373E374E375E376E377E378E379E37AE37BE37CE37DE37EE380E381E382E383E384E385E386E387F6C6E388E389E38AE38BE38CE38DE38EE38FE390E391E392E393E394E395E396E397E398E399E39AE39BE39CE39DE39EE39FE3A0E440E441E442E443E444E445F6C7E446E447E448E449E44AE44BE44CE44DE44EE44FE450E451E452E453E454E455E456E457E458E459E45AE45BE45CE45DE45EF6C8E45FE460E461E462E463E464E465E466E467E468E469E46AE46BE46CE46DE46EE46FE470E471E472E473E474E475E476E477E478E479E47AE47BE47CE47DE47EE480E481E482E483E484E485E486E487E488E489E48AE48BE48CE48DE48EE48FE490E491E492E493E494E495E496E497E498E499E49AE49BE49CE49DE49EE49FE4A0E540E541E542E543E544E545E546E547E548E549E54AE54BE54CE54DE54EE54FE550E551E552E553E554E555E556E557E558E559E55AE55BE55CE55DE55EE55FE560E561E562E563E564E565E566E567E568E569E56AE56BE56CE56DE56EE56FE570E571E572E573F6C9E574E575E576E577E578E579E57AE57BE57CE57DE57EE580E581E582E583E584E585E586E587E588E589E58AE58BE58CE58DE58EE58FE590E591E592E593E594E595E596E597E598E599E59AE59BE59CE59DE59EE59FF6CAE5A0E640E641E642E643E644E645E646E647E648E649E64AE64BE64CE64DE64EE64FE650E651E652E653E654E655E656E657E658E659E65AE65BE65CE65DE65EE65FE660E661E662F6CCE663E664E665E666E667E668E669E66AE66BE66CE66DE66EE66FE670E671E672E673E674E675E676E677E678E679E67AE67BE67CE67DE67EE680E681E682E683E684E685E686E687E688E689E68AE68BE68CE68DE68EE68FE690E691E692E693E694E695E696E697E698E699E69AE69BE69CE69DF6CBE69EE69FE6A0E740E741E742E743E744E745E746E747F7E9E748E749E74AE74BE74CE74DE74EE74FE750E751E752E753E754E755E756E757E758E759E75AE75BE75CE75DE75EE75FE760E761E762E763E764E765E766E767E768E769E76AE76BE76CE76DE76EE76FE770E771E772E773E774E775E776E777E778E779E77AE77BE77CE77DE77EE780E781E782E783E784E785E786E787E788E789E78AE78BE78CE78DE78EE78FE790E791E792E793E794E795E796E797E798E799E79AE79BE79CE79DE79EE79FE7A0E840E841E842E843E844E845E846E847E848E849E84AE84BE84CE84DE84EF6CDE84FE850E851E852E853E854E855E856E857E858E859E85AE85BE85CE85DE85EE85FE860E861E862E863E864E865E866E867E868E869E86AE86BE86CE86DE86EE86FE870E871E872E873E874E875E876E877E878E879E87AF6CEE87BE87CE87DE87EE880E881E882E883E884E885E886E887E888E889E88AE88BE88CE88DE88EE88FE890E891E892E893E894EEC4EEC5EEC6D5EBB6A4EEC8EEC7EEC9EECAC7A5EECBEECCE895B7B0B5F6EECDEECFE896EECEE897B8C6EED0EED1EED2B6DBB3AED6D3C4C6B1B5B8D6EED3EED4D4BFC7D5BEFBCED9B9B3EED6EED5EED8EED7C5A5EED9EEDAC7AEEEDBC7AFEEDCB2A7EEDDEEDEEEDFEEE0EEE1D7EAEEE2EEE3BCD8EEE4D3CBCCFAB2ACC1E5EEE5C7A6C3ADE898EEE6EEE7EEE8EEE9EEEAEEEBEEECE899EEEDEEEEEEEFE89AE89BEEF0EEF1EEF2EEF4EEF3E89CEEF5CDADC2C1EEF6EEF7EEF8D5A1EEF9CFB3EEFAEEFBE89DEEFCEEFDEFA1EEFEEFA2B8F5C3FAEFA3EFA4BDC2D2BFB2F9EFA5EFA6EFA7D2F8EFA8D6FDEFA9C6CCE89EEFAAEFABC1B4EFACCFFACBF8EFAEEFADB3FAB9F8EFAFEFB0D0E2EFB1EFB2B7E6D0BFEFB3EFB4EFB5C8F1CCE0EFB6EFB7EFB8EFB9EFBAD5E0EFBBB4EDC3AAEFBCE89FEFBDEFBEEFBFE8A0CEFDEFC0C2E0B4B8D7B6BDF5E940CFC7EFC3EFC1EFC2EFC4B6A7BCFCBEE2C3CCEFC5EFC6E941EFC7EFCFEFC8EFC9EFCAC7C2EFF1B6CDEFCBE942EFCCEFCDB6C6C3BEEFCEE943EFD0EFD1EFD2D5F2E944EFD3C4F7E945EFD4C4F8EFD5EFD6B8E4B0F7EFD7EFD8EFD9E946EFDAEFDBEFDCEFDDE947EFDEBEB5EFE1EFDFEFE0E948EFE2EFE3C1CDEFE4EFE5EFE6EFE7EFE8EFE9EFEAEFEBEFECC0D8E949EFEDC1ADEFEEEFEFEFF0E94AE94BCFE2E94CE94DE94EE94FE950E951E952E953B3A4E954E955E956E957E958E959E95AE95BE95CE95DE95EE95FE960E961E962E963E964E965E966E967E968E969E96AE96BE96CE96DE96EE96FE970E971E972E973E974E975E976E977E978E979E97AE97BE97CE97DE97EE980E981E982E983E984E985E986E987E988E989E98AE98BE98CE98DE98EE98FE990E991E992E993E994E995E996E997E998E999E99AE99BE99CE99DE99EE99FE9A0EA40EA41EA42EA43EA44EA45EA46EA47EA48EA49EA4AEA4BEA4CEA4DEA4EEA4FEA50EA51EA52EA53EA54EA55EA56EA57EA58EA59EA5AEA5BC3C5E3C5C9C1E3C6EA5CB1D5CECAB4B3C8F2E3C7CFD0E3C8BCE4E3C9E3CAC3C6D5A2C4D6B9EBCEC5E3CBC3F6E3CCEA5DB7A7B8F3BAD2E3CDE3CED4C4E3CFEA5EE3D0D1CBE3D1E3D2E3D3E3D4D1D6E3D5B2FBC0BBE3D6EA5FC0ABE3D7E3D8E3D9EA60E3DAE3DBEA61B8B7DAE2EA62B6D3EA63DAE4DAE3EA64EA65EA66EA67EA68EA69EA6ADAE6EA6BEA6CEA6DC8EEEA6EEA6FDAE5B7C0D1F4D2F5D5F3BDD7EA70EA71EA72EA73D7E8DAE8DAE7EA74B0A2CDD3EA75DAE9EA76B8BDBCCAC2BDC2A4B3C2DAEAEA77C2AAC4B0BDB5EA78EA79CFDEEA7AEA7BEA7CDAEBC9C2EA7DEA7EEA80EA81EA82B1DDEA83EA84EA85DAECEA86B6B8D4BAEA87B3FDEA88EA89DAEDD4C9CFD5C5E3EA8ADAEEEA8BEA8CEA8DEA8EEA8FDAEFEA90DAF0C1EACCD5CFDDEA91EA92EA93EA94EA95EA96EA97EA98EA99EA9AEA9BEA9CEA9DD3E7C2A1EA9EDAF1EA9FEAA0CBE5EB40DAF2EB41CBE6D2FEEB42EB43EB44B8F4EB45EB46DAF3B0AFCFB6EB47EB48D5CFEB49EB4AEB4BEB4CEB4DEB4EEB4FEB50EB51EB52CBEDEB53EB54EB55EB56EB57EB58EB59EB5ADAF4EB5BEB5CE3C4EB5DEB5EC1A5EB5FEB60F6BFEB61EB62F6C0F6C1C4D1EB63C8B8D1E3EB64EB65D0DBD1C5BCAFB9CDEB66EFF4EB67EB68B4C6D3BAF6C2B3FBEB69EB6AF6C3EB6BEB6CB5F1EB6DEB6EEB6FEB70EB71EB72EB73EB74EB75EB76F6C5EB77EB78EB79EB7AEB7BEB7CEB7DD3EAF6A7D1A9EB7EEB80EB81EB82F6A9EB83EB84EB85F6A8EB86EB87C1E3C0D7EB88B1A2EB89EB8AEB8BEB8CCEEDEB8DD0E8F6ABEB8EEB8FCFF6EB90F6AAD5F0F6ACC3B9EB91EB92EB93BBF4F6AEF6ADEB94EB95EB96C4DEEB97EB98C1D8EB99EB9AEB9BEB9CEB9DCBAAEB9ECFBCEB9FEBA0EC40EC41EC42EC43EC44EC45EC46EC47EC48F6AFEC49EC4AF6B0EC4BEC4CF6B1EC4DC2B6EC4EEC4FEC50EC51EC52B0D4C5F9EC53EC54EC55EC56F6B2EC57EC58EC59EC5AEC5BEC5CEC5DEC5EEC5FEC60EC61EC62EC63EC64EC65EC66EC67EC68EC69C7E0F6A6EC6AEC6BBEB8EC6CEC6DBEB2EC6EB5E5EC6FEC70B7C7EC71BFBFC3D2C3E6EC72EC73D8CCEC74EC75EC76B8EFEC77EC78EC79EC7AEC7BEC7CEC7DEC7EEC80BDF9D1A5EC81B0D0EC82EC83EC84EC85EC86F7B0EC87EC88EC89EC8AEC8BEC8CEC8DEC8EF7B1EC8FEC90EC91EC92EC93D0ACEC94B0B0EC95EC96EC97F7B2F7B3EC98F7B4EC99EC9AEC9BC7CAEC9CEC9DEC9EEC9FECA0ED40ED41BECFED42ED43F7B7ED44ED45ED46ED47ED48ED49ED4AF7B6ED4BB1DEED4CF7B5ED4DED4EF7B8ED4FF7B9ED50ED51ED52ED53ED54ED55ED56ED57ED58ED59ED5AED5BED5CED5DED5EED5FED60ED61ED62ED63ED64ED65ED66ED67ED68ED69ED6AED6BED6CED6DED6EED6FED70ED71ED72ED73ED74ED75ED76ED77ED78ED79ED7AED7BED7CED7DED7EED80ED81CEA4C8CDED82BAABE8B8E8B9E8BABEC2ED83ED84ED85ED86ED87D2F4ED88D4CFC9D8ED89ED8AED8BED8CED8DED8EED8FED90ED91ED92ED93ED94ED95ED96ED97ED98ED99ED9AED9BED9CED9DED9EED9FEDA0EE40EE41EE42EE43EE44EE45EE46EE47EE48EE49EE4AEE4BEE4CEE4DEE4EEE4FEE50EE51EE52EE53EE54EE55EE56EE57EE58EE59EE5AEE5BEE5CEE5DEE5EEE5FEE60EE61EE62EE63EE64EE65EE66EE67EE68EE69EE6AEE6BEE6CEE6DEE6EEE6FEE70EE71EE72EE73EE74EE75EE76EE77EE78EE79EE7AEE7BEE7CEE7DEE7EEE80EE81EE82EE83EE84EE85EE86EE87EE88EE89EE8AEE8BEE8CEE8DEE8EEE8FEE90EE91EE92EE93EE94EE95EE96EE97EE98EE99EE9AEE9BEE9CEE9DEE9EEE9FEEA0EF40EF41EF42EF43EF44EF45D2B3B6A5C7EAF1FCCFEECBB3D0EBE7EFCDE7B9CBB6D9F1FDB0E4CBCCF1FED4A4C2ADC1ECC6C4BEB1F2A1BCD5EF46F2A2F2A3EF47F2A4D2C3C6B5EF48CDC7F2A5EF49D3B1BFC5CCE2EF4AF2A6F2A7D1D5B6EEF2A8F2A9B5DFF2AAF2ABEF4BB2FCF2ACF2ADC8A7EF4CEF4DEF4EEF4FEF50EF51EF52EF53EF54EF55EF56EF57EF58EF59EF5AEF5BEF5CEF5DEF5EEF5FEF60EF61EF62EF63EF64EF65EF66EF67EF68EF69EF6AEF6BEF6CEF6DEF6EEF6FEF70EF71B7E7EF72EF73ECA9ECAAECABEF74ECACEF75EF76C6AEECADECAEEF77EF78EF79B7C9CAB3EF7AEF7BEF7CEF7DEF7EEF80EF81E2B8F7CFEF82EF83EF84EF85EF86EF87EF88EF89EF8AEF8BEF8CEF8DEF8EEF8FEF90EF91EF92EF93EF94EF95EF96EF97EF98EF99EF9AEF9BEF9CEF9DEF9EEF9FEFA0F040F041F042F043F044F7D0F045F046B2CDF047F048F049F04AF04BF04CF04DF04EF04FF050F051F052F053F054F055F056F057F058F059F05AF05BF05CF05DF05EF05FF060F061F062F063F7D1F064F065F066F067F068F069F06AF06BF06CF06DF06EF06FF070F071F072F073F074F075F076F077F078F079F07AF07BF07CF07DF07EF080F081F082F083F084F085F086F087F088F089F7D3F7D2F08AF08BF08CF08DF08EF08FF090F091F092F093F094F095F096E2BBF097BCA2F098E2BCE2BDE2BEE2BFE2C0E2C1B7B9D2FBBDA4CACEB1A5CBC7F099E2C2B6FCC8C4E2C3F09AF09BBDC8F09CB1FDE2C4F09DB6F6E2C5C4D9F09EF09FE2C6CFDAB9DDE2C7C0A1F0A0E2C8B2F6F140E2C9F141C1F3E2CAE2CBC2F8E2CCE2CDE2CECAD7D8B8D9E5CFE3F142F143F144F145F146F147F148F149F14AF14BF14CF0A5F14DF14EDCB0F14FF150F151F152F153F154F155F156F157F158F159F15AF15BF15CF15DF15EF15FF160F161F162F163F164F165F166F167F168F169F16AF16BF16CF16DF16EF16FF170F171F172F173F174F175F176F177F178F179F17AF17BF17CF17DF17EF180F181F182F183F184F185F186F187F188F189F18AF18BF18CF18DF18EF18FF190F191F192F193F194F195F196F197F198F199F19AF19BF19CF19DF19EF19FF1A0F240F241F242F243F244F245F246F247F248F249F24AF24BF24CF24DF24EF24FF250F251F252F253F254F255F256F257F258F259F25AF25BF25CF25DF25EF25FF260F261F262F263F264F265F266F267F268F269F26AF26BF26CF26DF26EF26FF270F271F272F273F274F275F276F277F278F279F27AF27BF27CF27DF27EF280F281F282F283F284F285F286F287F288F289F28AF28BF28CF28DF28EF28FF290F291F292F293F294F295F296F297F298F299F29AF29BF29CF29DF29EF29FF2A0F340F341F342F343F344F345F346F347F348F349F34AF34BF34CF34DF34EF34FF350F351C2EDD4A6CDD4D1B1B3DBC7FDF352B2B5C2BFE6E0CABBE6E1E6E2BED4E6E3D7A4CDD5E6E5BCDDE6E4E6E6E6E7C2EEF353BDBEE6E8C2E6BAA7E6E9F354E6EAB3D2D1E9F355F356BFA5E6EBC6EFE6ECE6EDF357F358E6EEC6ADE6EFF359C9A7E6F0E6F1E6F2E5B9E6F3E6F4C2E2E6F5E6F6D6E8E6F7F35AE6F8B9C7F35BF35CF35DF35EF35FF360F361F7BBF7BAF362F363F364F365F7BEF7BCBAA1F366F7BFF367F7C0F368F369F36AF7C2F7C1F7C4F36BF36CF7C3F36DF36EF36FF370F371F7C5F7C6F372F373F374F375F7C7F376CBE8F377F378F379F37AB8DFF37BF37CF37DF37EF380F381F7D4F382F7D5F383F384F385F386F7D6F387F388F389F38AF7D8F38BF7DAF38CF7D7F38DF38EF38FF390F391F392F393F394F395F7DBF396F7D9F397F398F399F39AF39BF39CF39DD7D7F39EF39FF3A0F440F7DCF441F442F443F444F445F446F7DDF447F448F449F7DEF44AF44BF44CF44DF44EF44FF450F451F452F453F454F7DFF455F456F457F7E0F458F459F45AF45BF45CF45DF45EF45FF460F461F462DBCBF463F464D8AAF465F466F467F468F469F46AF46BF46CE5F7B9EDF46DF46EF46FF470BFFDBBEAF7C9C6C7F7C8F471F7CAF7CCF7CBF472F473F474F7CDF475CEBAF476F7CEF477F478C4A7F479F47AF47BF47CF47DF47EF480F481F482F483F484F485F486F487F488F489F48AF48BF48CF48DF48EF48FF490F491F492F493F494F495F496F497F498F499F49AF49BF49CF49DF49EF49FF4A0F540F541F542F543F544F545F546F547F548F549F54AF54BF54CF54DF54EF54FF550F551F552F553F554F555F556F557F558F559F55AF55BF55CF55DF55EF55FF560F561F562F563F564F565F566F567F568F569F56AF56BF56CF56DF56EF56FF570F571F572F573F574F575F576F577F578F579F57AF57BF57CF57DF57EF580F581F582F583F584F585F586F587F588F589F58AF58BF58CF58DF58EF58FF590F591F592F593F594F595F596F597F598F599F59AF59BF59CF59DF59EF59FF5A0F640F641F642F643F644F645F646F647F648F649F64AF64BF64CF64DF64EF64FF650F651F652F653F654F655F656F657F658F659F65AF65BF65CF65DF65EF65FF660F661F662F663F664F665F666F667F668F669F66AF66BF66CF66DF66EF66FF670F671F672F673F674F675F676F677F678F679F67AF67BF67CF67DF67EF680F681F682F683F684F685F686F687F688F689F68AF68BF68CF68DF68EF68FF690F691F692F693F694F695F696F697F698F699F69AF69BF69CF69DF69EF69FF6A0F740F741F742F743F744F745F746F747F748F749F74AF74BF74CF74DF74EF74FF750F751F752F753F754F755F756F757F758F759F75AF75BF75CF75DF75EF75FF760F761F762F763F764F765F766F767F768F769F76AF76BF76CF76DF76EF76FF770F771F772F773F774F775F776F777F778F779F77AF77BF77CF77DF77EF780D3E3F781F782F6CFF783C2B3F6D0F784F785F6D1F6D2F6D3F6D4F786F787F6D6F788B1ABF6D7F789F6D8F6D9F6DAF78AF6DBF6DCF78BF78CF78DF78EF6DDF6DECFCAF78FF6DFF6E0F6E1F6E2F6E3F6E4C0F0F6E5F6E6F6E7F6E8F6E9F790F6EAF791F6EBF6ECF792F6EDF6EEF6EFF6F0F6F1F6F2F6F3F6F4BEA8F793F6F5F6F6F6F7F6F8F794F795F796F797F798C8FAF6F9F6FAF6FBF6FCF799F79AF6FDF6FEF7A1F7A2F7A3F7A4F7A5F79BF79CF7A6F7A7F7A8B1EEF7A9F7AAF7ABF79DF79EF7ACF7ADC1DBF7AEF79FF7A0F7AFF840F841F842F843F844F845F846F847F848F849F84AF84BF84CF84DF84EF84FF850F851F852F853F854F855F856F857F858F859F85AF85BF85CF85DF85EF85FF860F861F862F863F864F865F866F867F868F869F86AF86BF86CF86DF86EF86FF870F871F872F873F874F875F876F877F878F879F87AF87BF87CF87DF87EF880F881F882F883F884F885F886F887F888F889F88AF88BF88CF88DF88EF88FF890F891F892F893F894F895F896F897F898F899F89AF89BF89CF89DF89EF89FF8A0F940F941F942F943F944F945F946F947F948F949F94AF94BF94CF94DF94EF94FF950F951F952F953F954F955F956F957F958F959F95AF95BF95CF95DF95EF95FF960F961F962F963F964F965F966F967F968F969F96AF96BF96CF96DF96EF96FF970F971F972F973F974F975F976F977F978F979F97AF97BF97CF97DF97EF980F981F982F983F984F985F986F987F988F989F98AF98BF98CF98DF98EF98FF990F991F992F993F994F995F996F997F998F999F99AF99BF99CF99DF99EF99FF9A0FA40FA41FA42FA43FA44FA45FA46FA47FA48FA49FA4AFA4BFA4CFA4DFA4EFA4FFA50FA51FA52FA53FA54FA55FA56FA57FA58FA59FA5AFA5BFA5CFA5DFA5EFA5FFA60FA61FA62FA63FA64FA65FA66FA67FA68FA69FA6AFA6BFA6CFA6DFA6EFA6FFA70FA71FA72FA73FA74FA75FA76FA77FA78FA79FA7AFA7BFA7CFA7DFA7EFA80FA81FA82FA83FA84FA85FA86FA87FA88FA89FA8AFA8BFA8CFA8DFA8EFA8FFA90FA91FA92FA93FA94FA95FA96FA97FA98FA99FA9AFA9BFA9CFA9DFA9EFA9FFAA0FB40FB41FB42FB43FB44FB45FB46FB47FB48FB49FB4AFB4BFB4CFB4DFB4EFB4FFB50FB51FB52FB53FB54FB55FB56FB57FB58FB59FB5AFB5BC4F1F0AFBCA6F0B0C3F9FB5CC5B8D1BBFB5DF0B1F0B2F0B3F0B4F0B5D1BCFB5ED1ECFB5FF0B7F0B6D4A7FB60CDD2F0B8F0BAF0B9F0BBF0BCFB61FB62B8EBF0BDBAE8FB63F0BEF0BFBEE9F0C0B6ECF0C1F0C2F0C3F0C4C8B5F0C5F0C6FB64F0C7C5F4FB65F0C8FB66FB67FB68F0C9FB69F0CAF7BDFB6AF0CBF0CCF0CDFB6BF0CEFB6CFB6DFB6EFB6FF0CFBAD7FB70F0D0F0D1F0D2F0D3F0D4F0D5F0D6F0D8FB71FB72D3A5F0D7FB73F0D9FB74FB75FB76FB77FB78FB79FB7AFB7BFB7CFB7DF5BAC2B9FB7EFB80F7E4FB81FB82FB83FB84F7E5F7E6FB85FB86F7E7FB87FB88FB89FB8AFB8BFB8CF7E8C2B4FB8DFB8EFB8FFB90FB91FB92FB93FB94FB95F7EAFB96F7EBFB97FB98FB99FB9AFB9BFB9CC2F3FB9DFB9EFB9FFBA0FC40FC41FC42FC43FC44FC45FC46FC47FC48F4F0FC49FC4AFC4BF4EFFC4CFC4DC2E9FC4EF7E1F7E2FC4FFC50FC51FC52FC53BBC6FC54FC55FC56FC57D9E4FC58FC59FC5ACAF2C0E8F0A4FC5BBADAFC5CFC5DC7ADFC5EFC5FFC60C4ACFC61FC62F7ECF7EDF7EEFC63F7F0F7EFFC64F7F1FC65FC66F7F4FC67F7F3FC68F7F2F7F5FC69FC6AFC6BFC6CF7F6FC6DFC6EFC6FFC70FC71FC72FC73FC74FC75EDE9FC76EDEAEDEBFC77F6BCFC78FC79FC7AFC7BFC7CFC7DFC7EFC80FC81FC82FC83FC84F6BDFC85F6BEB6A6FC86D8BEFC87FC88B9C4FC89FC8AFC8BD8BBFC8CDCB1FC8DFC8EFC8FFC90FC91FC92CAF3FC93F7F7FC94FC95FC96FC97FC98FC99FC9AFC9BFC9CF7F8FC9DFC9EF7F9FC9FFCA0FD40FD41FD42FD43FD44F7FBFD45F7FAFD46B1C7FD47F7FCF7FDFD48FD49FD4AFD4BFD4CF7FEFD4DFD4EFD4FFD50FD51FD52FD53FD54FD55FD56FD57C6EBECB4FD58FD59FD5AFD5BFD5CFD5DFD5EFD5FFD60FD61FD62FD63FD64FD65FD66FD67FD68FD69FD6AFD6BFD6CFD6DFD6EFD6FFD70FD71FD72FD73FD74FD75FD76FD77FD78FD79FD7AFD7BFD7CFD7DFD7EFD80FD81FD82FD83FD84FD85B3DDF6B3FD86FD87F6B4C1E4F6B5F6B6F6B7F6B8F6B9F6BAC8A3F6BBFD88FD89FD8AFD8BFD8CFD8DFD8EFD8FFD90FD91FD92FD93C1FAB9A8EDE8FD94FD95FD96B9EAD9DFFD97FD98FD99FD9AFD9';
                switch (pChoice) {
                    case "ENCODE":
                        var strOut="",reg = /^([\u4E00-\uFA29]|["',，.。/、\]\[【】\\n\s！!?？——_<>%;‘’；)《（）》�(&+=`“”·*#@@]){0,}$/;
                        if ($('[name=charsetSelect]').val() != 'gb2312') {
                            for(var i = 0; i < inputEle.value.length; i++){
                                if( inputEle.value[i].match(reg)){
                                    strOut += encodeURIComponent(inputEle.value[i]);
                                }else{
                                    strOut += '%' + tc.hexs.hexToUtf8(inputEle.value[i]);
                                }
                            }
                            outputEle.value = strOut.toLowerCase()
                        } else {
                            outputEle.value = tc.hexs.gb2312En(inputEle.value,z).toLowerCase()
                        }
                        break;
                    case "DECODE":
                        if ($('.SearChoese').text() != 'gb2312') {
                            outputEle.value = inputEle.value;
                        } else {
                            outputEle.value = inputEle.value
                        }
                        break;
                }
            },
            hexToUtf8: function (str){
                var re = /[\u4E00-\u9FA5]/;
                var ar = [];
                for (var i = 0; i < str.length; i++) {
                    var a = '';
                    if (re.test(str.charAt(i))) { // 中文
                        a = encodeURI(str.charAt(i));
                    } else {
                        a = str.charCodeAt(i).toString(16);
                    }
                    ar.push(a);
                }
                str = ar.join("%");
                return str;
            },
            utf8ToHex: function (s){
                if (s.length % 2) return '';
                var tmp='';
                for(i=0;i<s.length;i+=2)
                {
                    tmp += '%'+s.charAt(i) + s.charAt(i+1);
                }
                return tmp;
            },
            gb2312En: function (str,z) {
                var strOut="";
                for(var i = 0; i < str.length; i++){
                    if(str[i].match( /^[\u4E00-\u9FA5]{1,}$/) ){
                        var c = str.charAt(i);
                        var code = str.charCodeAt(i);
                        if(c==" ") strOut +="+";
                        else if(code >= 19968 && code <= 40869){
                            index = code - 19968;
                            strOut += "%" + z.substr(index*4,2) + "%" + z.substr(index*4+2,2);
                        }else{
                            strOut += "%" + str.charCodeAt(i).toString(16);
                        }
                    }else{
                        if(str[i].match(/^([，。/、\]\[【】\\n\s！？‘’；)《（）》�(&“”#@@]){0,}$/)){
                            strOut += encodeURIComponent(str[i]);
                        }else{
                            strOut += '%' + tc.hexs.hexToUtf8(str[i]);
                        }
                    }
                    
                }
                return strOut;
            }
        },
        wordspell: function () {
            var forms = document.forms[0];
            forms.content.onclick = function () {
                $(this).removeClass("col-gray");
            };
            forms.trans.onclick = function () {
                var str = toPinyin({ str: forms.content.value, dz: forms.hidesel.value, sym: forms.sym.checked, sym1: forms.sym1.checked, sym2: forms.sym2.checked });
                forms.result.value = str;
                if ($("textarea[name=\"result\"]").val()) $("textarea[name=\"result\"]").siblings().hide();
                $(forms.result).removeClass("col-gray");
            }
            var clear = getid("clear");
            clear.onclick = function () {
                forms.result.value = '';
                forms.content.value = '';
            }
        }, //old
        pinyindictionary: function (path) {
            var forms = getid('fm');
            forms.content.onclick = function () {
                $(this).removeClass("col-gray");
            };
            forms.seach.onclick = function () {
                trans();
                $(forms.result).removeClass("col-gray");
                if ($("#result").val()) $("#result").siblings().hide();
            }
            forms.clear.onclick = function () {
                forms.result.value = '';
                forms.content.value = '';
            }
            tools.copyBtn();
        }, // old
        gbbig: function () {
            var forms = document.forms[0];
            forms.tosim.onclick = function () {
                convert(0); $(forms.result).removeClass("col-gray");
                if ($("#result").val()) $("#result").siblings().hide();
            }
            forms.totra.onclick = function () {
                convert(1); $(forms.result).removeClass("col-gray");
                if ($("#result").val()) $("#result").siblings().hide();
            }
            forms.toother.onclick = function () {
                convert(2); $(forms.result).removeClass("col-gray");
                if ($("#result").val()) $("#result").siblings().hide();
            }
            forms.clear.onclick = function () {
                forms.result.value = '';
                forms.textarea.value = '';
            }
        }, // old
        fullhalf: {
            ///全角空格为12288，半角空格为32
            ///其他字符半角(33-126)与全角(65281-65374)的对应关系是：均相差65248
            //半角转换为全角函数
            ToFull: function () {
                var txtstring = $('#content').val();
                if (txtstring == '') {
                    layer.msg("请输入要转换的字符串",{ offset: '50%' });
                    return;
                }
                var tmp = "";
                for (var i = 0; i < txtstring.length; i++) {
                    if (txtstring.charCodeAt(i) == 32) {
                        tmp = tmp + String.fromCharCode(12288);
                    }
                    else if (txtstring.charCodeAt(i) < 127) {
                        tmp = tmp + String.fromCharCode(txtstring.charCodeAt(i) + 65248);
                    }
                    else
                        tmp = tmp + String.fromCharCode(txtstring.charCodeAt(i));
                }
                $('#result').val(tmp);
            },
            //全角转换为半角函数
            ToHalf: function () {
                var str = $('#content').val();
                if (str == '') {
                    layer.msg('请输入要转换的字符',{ offset: '50%' });
                    return;
                }
                var tmp = "";
                for (var i = 0; i < str.length; i++) {
                    if (str.charCodeAt(i) > 65280 && str.charCodeAt(i) < 65375) {
                        tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
                    }
                    else if (str.charCodeAt(i) == 12288) {
                        tmp += String.fromCharCode(32);
                    }
                    else {
                        tmp += String.fromCharCode(str.charCodeAt(i));
                    }
                }
                $('#result').val(tmp);

            },
            init: function () {
                var _this = this;
                $("#tohalf").click(function () {
                    _this.ToHalf();
                    if ($("#result").val()) $("#result").siblings().hide();
                });
                $("#tofull").click(function () {
                    _this.ToFull();
                    if ($("#result").val()) $("#result").siblings().hide();
                });
                $("#clear").click(function () {
                    $("textarea").val("");
                });
                $("textarea").keydown(function () {
                    $(this).removeClass("col-gray");
                });
                tools.clearBtn('clear','textarea')
            }
        }, // old
        lowtoupp: function (path) {
            //tools.clipfn(path, "clip");
            //tools.clipfn(path, "clip1");
            tools.copyBtn('clip');
            var forms = getid('fm');
            //forms.num.onkeydown = function (e) { entNumber(e); $(forms.trans).removeClass("col-gray"); $(forms.num).removeClass("col-gray"); }
            $("#num").keydown(function (e) {
                entNumber(e);
                $(forms.trans).removeClass("col-gray");
                $(forms.num).removeClass("col-gray");
            });
            forms.seach.onclick = function () {
                TransConvert();
                if ($("#trans").val()) $("#trans").siblings().hide();
            }
            forms.clear.onclick = function () { tools.clear([getid('trans'), getid('num')]); }
            forms.toupp.onclick = function () {
                englishConvert('touppercase'); $(forms.content).removeClass("col-gray");
                if ($("#result").val()) $("#result").siblings().hide();
            }
            forms.tolow.onclick = function () {
                englishConvert('tolowercase'); $(forms.content).removeClass("col-gray");
                if ($("#result").val()) $("#result").siblings().hide();
            }
            forms.firstupp.onclick = function () {
                englishConvert('touppercaseF'); $(forms.content).removeClass("col-gray");
                if ($("#result").val()) $("#result").siblings().hide();
            }
            forms.clear1.onclick = function () { tools.clear([getid('content')]); }
            forms.content.onclick = function () { $(this).removeClass("col-gray"); }
        }, // old
    },
    // new加密解密相关
    EaD: {
        md5: function() {
            $("[js-do=\"encry\"]").click(function(){
                var encry16 = md5 ($("#md5txt").val(),16)
                var encry32 = md5 ($("#md5txt").val(),32)
                $("#32big").val(encry32.toUpperCase())
                $("#16big").val(encry16.toUpperCase())
                $("#32small").val(encry32)
                $("#16small").val(encry16)
            })
            $("[js-do=\"cancel\"]").click(function(){
                $("#md5txt").val('')
                $("#32big").val('')
                $("#16big").val('')
                $("#32small").val('')
                $("#16small").val('')
            })
        },
        textEncrypt: function () {
            $("#encrypt").click(function () {
                var v = $('input[name="encrypt_type"]').val();
                if (!v) return;
                switch (v) {
                    case "aes":
                        $("#result").val(CryptoJS.AES.encrypt($("#content").val(), $("#pwd").val()));
                        break;
                    case "des":
                        $("#result").val(CryptoJS.DES.encrypt($("#content").val(), $("#pwd").val()));
                        break;
                    case "rabbit":
                        $("#result").val(CryptoJS.Rabbit.encrypt($("#content").val(), $("#pwd").val()));
                        break;
                    case "rc4":
                        $("#result").val(CryptoJS.RC4.encrypt($("#content").val(), $("#pwd").val()));
                        break;
                    case "tripledes":
                        $("#result").val(CryptoJS.TripleDES.encrypt($("#content").val(), $("#pwd").val()));
                        break;
                }
                if ($("#result").val()) $("#result").siblings().hide();
            });
            $("#decrypt").click(function () {
                switch ($('input[name="encrypt_type"]').val()) {
                    case "aes":
                        $("#content").val(CryptoJS.AES.decrypt($("#result").val(), $("#pwd").val()).toString(CryptoJS.enc.Utf8));
                        break;
                    case "des":
                        $("#content").val(CryptoJS.DES.decrypt($("#result").val(), $("#pwd").val()).toString(CryptoJS.enc.Utf8));
                        break;
                    case "rabbit":
                        $("#content").val(CryptoJS.Rabbit.decrypt($("#result").val(), $("#pwd").val()).toString(CryptoJS.enc.Utf8));
                        break;
                    case "rc4":
                        $("#content").val(CryptoJS.RC4.decrypt($("#result").val(), $("#pwd").val()).toString(CryptoJS.enc.Utf8));
                        break;
                    case "tripledes":
                        $("#content").val(CryptoJS.TripleDES.decrypt($("#result").val(), $("#pwd").val()).toString(CryptoJS.enc.Utf8));
                        break;
                }
                if ($("#content").val()) $("#content").siblings().hide();
            });
            $("#clear").click(function () {
                tools.clear([getid("content"), getid("result")]);
                $(".CentHid").show();
            });
        },
        hash: {
            setHash: function (type, val, pwd) {
                switch (type) {
                    case "sha1":
                        $("#p_div").addClass("autohide")
                        $("#result").val(CryptoJS.SHA1(val));
                        break;
                    case "sha224":
                        $("#p_div").addClass("autohide")
                        $("#result").val(CryptoJS.SHA224(val));
                        break;
                    case "sha256":
                        $("#p_div").addClass("autohide")
                        $("#result").val(CryptoJS.SHA256(val));
                        break;
                    case "sha384":
                        $("#p_div").addClass("autohide")
                        $("#result").val(CryptoJS.SHA384(val));
                        break;
                    case "sha512":
                        $("#p_div").addClass("autohide")
                        $("#result").val(CryptoJS.SHA512(val));
                        break;
                    case "md5":
                        $("#p_div").addClass("autohide")
                        $("#result").val(CryptoJS.MD5(val));
                        break;
                    case "hmacsha1":
                        $("#p_div").removeClass("autohide");
                        $("#result").val(CryptoJS.HmacSHA1(val, pwd));
                        break;
                    case "hmacsha224":
                        $("#p_div").removeClass("autohide");
                        $("#result").val(CryptoJS.HmacSHA224(val, pwd));
                        break;
                    case "hmacsha256":
                        $("#p_div").removeClass("autohide");
                        $("#result").val(CryptoJS.HmacSHA256(val, pwd));
                        break;
                    case "hmacsha384":
                        $("#p_div").removeClass("autohide");
                        $("#result").val(CryptoJS.HmacSHA384(val, pwd));
                        break;
                    case "hmacsha512":
                        $("#p_div").removeClass("autohide");
                        $("#result").val(CryptoJS.HmacSHA512(val, pwd));
                        break;
                    case "hmacmd5":
                        $("#p_div").removeClass("autohide");
                        $("#result").val(CryptoJS.HmacMD5(val, pwd));
                        break;
                }
            },
            init: function () {
                var _this = this;
                $("#btnlist .GLOkBtn").click(function () {
                    var val = $("#content").val();
                    var pwd = $("#pwd").val();
                    if (val) {
                        _this.setHash($(this).attr("t"), val, pwd);
                        if ($("#result").val()) $("#result").siblings().hide();
                    }
                });
                $("#clear").click(function () { tools.clear([getid("result"), getid("content")]) });
            }
        },
        htpasswds: {
            htpasswdClick:function(){
                $("#generate").click(function () {
                    var user = $("#user").val(),
                        pwd = $("#pwd").val(),
                        alg = +$('#alg').val();
                    var result = EaD.htpasswds.htpasswd(user, pwd, alg);
                    $("#result").val(result);
                })
                tools.copyBtn('copy')
                tools.clearBtn('clear','[type=text]')
            },
            ap_to64: function (v, n) {
                var s = '';
                while (--n >= 0) {
                    s += itoa64.charAt(v & 0x3f); 
                    v >>>= 6;          
                }
                return s;
            },
            stringToArray: function (s) {
                var a = [];
                for (var i = 0; i < s.length; i++) a.push(s.charCodeAt(i));
                return a;
            },
            htpasswd: function (user, pw, alg) {
                var salt = EaD.htpasswds.ap_to64(Math.floor(Math.random() * 16777215), 4)    
                    + EaD.htpasswds.ap_to64(Math.floor(Math.random() * 16777215), 4);  
                
                var plus127 = 0;
                for (var i = 0; i < user.length; i++) if (user.charCodeAt(i) > 127) plus127++;
                if (plus127) layer.msg("用户名尽量不要使用非ascii字符");
            
                var cpw = '';      
                switch (alg) {
                
                    case ALG_APSHA:
                        cpw = AP_SHA1PW_ID + b64_sha1(pw);
                        break;
            
                    case ALG_APMD5:
                        var msg = pw;         
                        msg += AP_MD5PW_ID;   
                        msg += salt;          
                    
                        var final_ = str_md5(pw + salt + pw);
                        for (var pl = pw.length; pl > 0; pl -= 16) msg += final_.substr(0, (pl > 16) ? 16 : pl);
                        
                        for (i = pw.length; i != 0; i >>= 1)
                            if (i & 1) msg += String.fromCharCode(0);
                            else msg += pw.charAt(0);
                        final_ = str_md5(msg);
                        
                        var msg2;
                        for (i = 0; i < 1000; i++) {
                            msg2 = '';
                            if (i & 1) msg2 += pw; else msg2 += final_.substr(0, 16);
                            if (i % 3) msg2 += salt;
                            if (i % 7) msg2 += pw;
                            if (i & 1) msg2 += final_.substr(0, 16); else msg2 += pw;
                            final_ = str_md5(msg2);
                        }
                        final_ = EaD.htpasswds.stringToArray(final_);
                        
                        cpw = AP_MD5PW_ID + salt + '$';
                        cpw += EaD.htpasswds.ap_to64((final_[0] << 16) | (final_[6] << 8) | final_[12], 4);
                        cpw += EaD.htpasswds.ap_to64((final_[1] << 16) | (final_[7] << 8) | final_[13], 4);
                        cpw += EaD.htpasswds.ap_to64((final_[2] << 16) | (final_[8] << 8) | final_[14], 4);
                        cpw += EaD.htpasswds.ap_to64((final_[3] << 16) | (final_[9] << 8) | final_[15], 4);
                        cpw += EaD.htpasswds.ap_to64((final_[4] << 16) | (final_[10] << 8) | final_[5], 4);
                        cpw += EaD.htpasswds.ap_to64(final_[11], 2);
                        break;
            
                    case ALG_PLAIN:
                        cpw = pw;
                        break;
            
                    case ALG_CRYPT:
                    default:
                        cpw = Javacrypt.displayPassword(pw, salt);
                        break;
                }
                
                if (user.length + 1 + cpw.length > 255) layer.msg('用户名和密码太长');
                else return user + ':' + cpw;
            }
        },
        toUrl16: {
            urlCrypt: function(urlStr){
                var result='',str = urlStr,str3 = str.substring(0,7);
                if(str3 == 'http://'){
                    result = 'http://';
                    str = str.substring(7,str.length);
                }
                for(i=0;i<str.length;i++){
                    if(str.charCodeAt(i) == '47') result += '/';
                    else if(str.charCodeAt(i) == '63') result += '?';
                    else if(str.charCodeAt(i) == '38') result += '&';
                    else if(str.charCodeAt(i) == '61') result += '=';
                    else if(str.charCodeAt(i) == '58') result += ':';
                    else result += '%'+ str.charCodeAt(i).toString(16).toUpperCase();
                }
                $('#result').val(result);
            },
            urljiam:function() {
                $('input[type="submit"]').click(function () {
                    var urlStr = $('#url').val()
                    if (urlStr != '') {
                        tools.checkUrl(urlStr)
                        if(tools.checkUrl(urlStr)!=false) EaD.toUrl16.urlCrypt(urlStr)
                    } else {
                        layer.msg("请输入要加密的url", {offset: '50%'})
                    }
                })
            }
        }
    },
    // 辅助工具->文字编辑
    textCode: {
        textpaiban: function() {
            // \r回车,\n换行
            $("#paiban").click(function () {
                var val = "\n" + $("#result").val();
                val = val.replace(/ |　/ig, "");
                val = val.replace(/\r\n/ig, "\n");
                val = val.replace(/\n\n/ig, "\n");
                val = val.replace(/\n/ig, "\n\n　　");
                val = val.replace("\n\n", "");
                $("#result").val(val);
            });

            $("#del").click(function () {
                var val = "\n" + $("#result").val();
                val = val.replace(/ |　/ig, "");
                val = val.replace(/\r\n/ig, "\n");
                val = val.replace(/\n\n/ig, "\n");
                val = val.replace(/\n\n/ig, "\n");
                val = val.replace(/\n\n/ig, "\n");
                val = val.replace(/\n\n/ig, "\n");
                val = val.replace(/\n/ig, "  \n");
                val = val.replace("\n\n", "\n");
                $("#result").val(val);
            })

            $("#add").click(function () {
                var val = "\n" + $("#result").val();
                val = val.replace(/ |　/ig, "");
                val = val.replace(/\r\n/ig, "\n");
                val = val.replace(/\n\n/ig, "\n");
                val = val.replace(/\n\n/ig, "\n");
                val = val.replace(/\n\n/ig, "\n");
                val = val.replace(/\n\n/ig, "\n");
                val = val.replace(/\n/ig, "\n\n");
                val = val.replace("\n\n", "");
                $("#result").val(val);
            })

            $("#tongji").click(function () {
                var strlen = $("#result").val().length;
                layer.msg("目前长度" + strlen + "个字\n");
            })

            tools.copyBtn("copy")

            $("#clear").click(function () {
                $("#result").val('');
            });
        },
        textquchong: function() {
            $("#removerepeat").click(function () {
                var array = $("#result").val().split("\n");
                var newArray = array.unique().join("\n");
                $("#result").val(newArray);
            });
            //去重处理
            Array.prototype.unique = function () {
                var res = [];
                var json = {};
                for (var i = 0; i < this.length; i++) {
                    if (this[i]) {
                        if (!json[this[i]]) {
                            res.push(this[i]);
                            json[this[i]] = 1;
                        }
                    }
                }
                return res;
            }
            tools.copyBtn("copy")
            tools.clearBtn("clear","#result")
        },
        pinyindictionary: {
            pinyindicClick: function () {
                var forms = getid('fm');
                forms.content.onclick = function () {
                    $(this).removeClass("col-gray");
                };
                forms.seach.onclick = function () {
                    textCode.pinyindictionary.trans();
                    $(forms.result).removeClass("col-gray");
                    if ($("#result").val()) $("#result").siblings().hide();
                }
                forms.clear.onclick = function () {
                    forms.result.value = '';
                    forms.content.value = '';
                }
                tools.copyBtn('clip');
                tools.clearBtn('clear','textarea')
            },
            wordspell: function () {
                var forms = document.forms[0];
                forms.content.onclick = function () {
                    $(this).removeClass("col-gray");
                };
                forms.trans.onclick = function () {
                    var str = textCode.pinyindictionary.toPinyin({ str: forms.content.value, dz: forms.hidesel.value, sym: forms.sym.checked, sym1: forms.sym1.checked, sym2: forms.sym2.checked });
                    forms.result.value = str;
                    if ($("textarea[name=\"result\"]").val()) $("textarea[name=\"result\"]").siblings().hide();
                    $(forms.result).removeClass("col-gray");
                }
                tools.clearBtn('clear','textarea')
            },
            PinYin: { "a": "\u554a\u963f\u9515", "ai": "\u57c3\u6328\u54ce\u5509\u54c0\u7691\u764c\u853c\u77ee\u827e\u788d\u7231\u9698\u8bf6\u6371\u55f3\u55cc\u5ad2\u7477\u66a7\u7839\u953f\u972d", "an": "\u978d\u6c28\u5b89\u4ffa\u6309\u6697\u5cb8\u80fa\u6848\u8c19\u57ef\u63de\u72b4\u5eb5\u6849\u94f5\u9e4c\u9878\u9eef", "ang": "\u80ae\u6602\u76ce", "ao": "\u51f9\u6556\u71ac\u7ff1\u8884\u50b2\u5965\u61ca\u6fb3\u5773\u62d7\u55f7\u5662\u5c99\u5ed2\u9068\u5aaa\u9a9c\u8071\u87af\u93ca\u9ccc\u93d6", "ba": "\u82ad\u634c\u6252\u53ed\u5427\u7b06\u516b\u75a4\u5df4\u62d4\u8dcb\u9776\u628a\u8019\u575d\u9738\u7f62\u7238\u8307\u83dd\u8406\u636d\u5c9c\u705e\u6777\u94af\u7c91\u9c85\u9b43", "bai": "\u767d\u67cf\u767e\u6446\u4f70\u8d25\u62dc\u7a17\u859c\u63b0\u97b4", "ban": "\u6591\u73ed\u642c\u6273\u822c\u9881\u677f\u7248\u626e\u62cc\u4f34\u74e3\u534a\u529e\u7eca\u962a\u5742\u8c73\u94a3\u7622\u764d\u8228", "bang": "\u90a6\u5e2e\u6886\u699c\u8180\u7ed1\u68d2\u78c5\u868c\u9551\u508d\u8c24\u84a1\u8783", "bao": "\u82de\u80de\u5305\u8912\u96f9\u4fdd\u5821\u9971\u5b9d\u62b1\u62a5\u66b4\u8c79\u9c8d\u7206\u52f9\u8446\u5b80\u5b62\u7172\u9e28\u8913\u8db5\u9f85", "bo": "\u5265\u8584\u73bb\u83e0\u64ad\u62e8\u94b5\u6ce2\u535a\u52c3\u640f\u94c2\u7b94\u4f2f\u5e1b\u8236\u8116\u818a\u6e24\u6cca\u9a73\u4eb3\u8543\u5575\u997d\u6a97\u64d8\u7934\u94b9\u9e41\u7c38\u8ddb", "bei": "\u676f\u7891\u60b2\u5351\u5317\u8f88\u80cc\u8d1d\u94a1\u500d\u72c8\u5907\u60eb\u7119\u88ab\u5b5b\u9642\u90b6\u57e4\u84d3\u5457\u602b\u6096\u789a\u9e4e\u8919\u943e", "ben": "\u5954\u82ef\u672c\u7b28\u755a\u574c\u951b", "beng": "\u5d29\u7ef7\u752d\u6cf5\u8e66\u8ff8\u552a\u5623\u750f", "bi": "\u903c\u9f3b\u6bd4\u9119\u7b14\u5f7c\u78a7\u84d6\u853d\u6bd5\u6bd9\u6bd6\u5e01\u5e87\u75f9\u95ed\u655d\u5f0a\u5fc5\u8f9f\u58c1\u81c2\u907f\u965b\u5315\u4ef3\u4ffe\u8298\u835c\u8378\u5421\u54d4\u72f4\u5eb3\u610e\u6ed7\u6fde\u5f3c\u59a3\u5a62\u5b16\u74a7\u8d32\u7540\u94cb\u79d5\u88e8\u7b5a\u7b85\u7be6\u822d\u895e\u8df8\u9ac0", "bian": "\u97ad\u8fb9\u7f16\u8d2c\u6241\u4fbf\u53d8\u535e\u8fa8\u8fa9\u8fab\u904d\u533e\u5f01\u82c4\u5fed\u6c74\u7f0f\u7178\u782d\u78a5\u7a39\u7a86\u8759\u7b3e\u9cca", "biao": "\u6807\u5f6a\u8198\u8868\u5a4a\u9aa0\u98d1\u98d9\u98da\u706c\u9556\u9573\u762d\u88f1\u9cd4", "bie": "\u9cd6\u618b\u522b\u762a\u8e69\u9cd8", "bin": "\u5f6c\u658c\u6fd2\u6ee8\u5bbe\u6448\u50a7\u6d5c\u7f24\u73a2\u6ba1\u8191\u9554\u9acc\u9b13", "bing": "\u5175\u51b0\u67c4\u4e19\u79c9\u997c\u70b3\u75c5\u5e76\u7980\u90b4\u6452\u7ee0\u678b\u69df\u71f9", "bu": "\u6355\u535c\u54fa\u8865\u57e0\u4e0d\u5e03\u6b65\u7c3f\u90e8\u6016\u62ca\u535f\u900b\u74ff\u6661\u949a\u91ad", "ca": "\u64e6\u5693\u7924", "cai": "\u731c\u88c1\u6750\u624d\u8d22\u776c\u8e29\u91c7\u5f69\u83dc\u8521", "can": "\u9910\u53c2\u8695\u6b8b\u60ed\u60e8\u707f\u9a96\u74a8\u7cb2\u9eea", "cang": "\u82cd\u8231\u4ed3\u6ca7\u85cf\u4f27", "cao": "\u64cd\u7cd9\u69fd\u66f9\u8349\u8279\u5608\u6f15\u87ac\u825a", "ce": "\u5395\u7b56\u4fa7\u518c\u6d4b\u5202\u5e3b\u607b", "ceng": "\u5c42\u8e6d\u564c", "cha": "\u63d2\u53c9\u832c\u8336\u67e5\u78b4\u643d\u5bdf\u5c94\u5dee\u8be7\u7339\u9987\u6c4a\u59f9\u6748\u6942\u69ce\u6aab\u9497\u9538\u9572\u8869", "chai": "\u62c6\u67f4\u8c7a\u4faa\u8308\u7625\u867f\u9f87", "chan": "\u6400\u63ba\u8749\u998b\u8c17\u7f20\u94f2\u4ea7\u9610\u98a4\u5181\u8c04\u8c36\u8487\u5edb\u5fcf\u6f7a\u6fb6\u5b71\u7fbc\u5a75\u5b17\u9aa3\u89c7\u7985\u9561\u88e3\u87fe\u8e94", "chang": "\u660c\u7316\u573a\u5c1d\u5e38\u957f\u507f\u80a0\u5382\u655e\u7545\u5531\u5021\u4f25\u9b2f\u82cc\u83d6\u5f9c\u6005\u60dd\u960a\u5a3c\u5ae6\u6636\u6c05\u9cb3", "chao": "\u8d85\u6284\u949e\u671d\u5632\u6f6e\u5de2\u5435\u7092\u600a\u7ec9\u6641\u8016", "che": "\u8f66\u626f\u64a4\u63a3\u5f7b\u6f88\u577c\u5c6e\u7817", "chen": "\u90f4\u81e3\u8fb0\u5c18\u6668\u5ff1\u6c89\u9648\u8d81\u886c\u79f0\u8c0c\u62bb\u55d4\u5bb8\u741b\u6987\u809c\u80c2\u789c\u9f80", "cheng": "\u6491\u57ce\u6a59\u6210\u5448\u4e58\u7a0b\u60e9\u6f84\u8bda\u627f\u901e\u9a8b\u79e4\u57d5\u5d4a\u5fb5\u6d48\u67a8\u67fd\u6a18\u665f\u584d\u77a0\u94d6\u88ce\u86cf\u9172", "chi": "\u5403\u75f4\u6301\u5319\u6c60\u8fdf\u5f1b\u9a70\u803b\u9f7f\u4f88\u5c3a\u8d64\u7fc5\u65a5\u70bd\u50ba\u5880\u82aa\u830c\u640b\u53f1\u54e7\u557b\u55e4\u5f73\u996c\u6cb2\u5ab8\u6555\u80dd\u7719\u7735\u9e31\u761b\u892b\u86a9\u87ad\u7b1e\u7bea\u8c49\u8e05\u8e1f\u9b51", "chong": "\u5145\u51b2\u866b\u5d07\u5ba0\u833a\u5fe1\u61a7\u94f3\u825f", "chou": "\u62bd\u916c\u7574\u8e0c\u7a20\u6101\u7b79\u4ec7\u7ef8\u7785\u4e11\u4fe6\u5733\u5e31\u60c6\u6eb4\u59af\u7633\u96e0\u9c8b", "chu": "\u81ed\u521d\u51fa\u6a71\u53a8\u8e87\u9504\u96cf\u6ec1\u9664\u695a\u7840\u50a8\u77d7\u6410\u89e6\u5904\u4e8d\u520d\u61b7\u7ecc\u6775\u696e\u6a17\u870d\u8e70\u9edc", "chuan": "\u63e3\u5ddd\u7a7f\u693d\u4f20\u8239\u5598\u4e32\u63be\u821b\u60f4\u9044\u5ddb\u6c1a\u948f\u9569\u8221", "chuang": "\u75ae\u7a97\u5e62\u5e8a\u95ef\u521b\u6006", "chui": "\u5439\u708a\u6376\u9524\u5782\u9672\u68f0\u69cc", "chun": "\u6625\u693f\u9187\u5507\u6df3\u7eaf\u8822\u4fc3\u83bc\u6c8c\u80ab\u6710\u9e51\u877d", "zhen": "\u6233\u7ef0\u851f\u8fb6\u8f8d\u955e\u8e14\u9f8a", "ci": "\u75b5\u8328\u78c1\u96cc\u8f9e\u6148\u74f7\u8bcd\u6b64\u523a\u8d50\u6b21\u8360\u5472\u5d6f\u9e5a\u8785\u7ccd\u8d91", "cong": "\u806a\u8471\u56f1\u5306\u4ece\u4e1b\u506c\u82c1\u6dd9\u9aa2\u742e\u7481\u679e", "cu": "\u51d1\u7c97\u918b\u7c07\u731d\u6b82\u8e59", "cuan": "\u8e7f\u7be1\u7a9c\u6c46\u64ba\u6615\u7228", "cui": "\u6467\u5d14\u50ac\u8106\u7601\u7cb9\u6dec\u7fe0\u8403\u60b4\u7480\u69b1\u96b9", "cun": "\u6751\u5b58\u5bf8\u78cb\u5fd6\u76b4", "cuo": "\u64ae\u6413\u63aa\u632b\u9519\u539d\u811e\u9509\u77ec\u75e4\u9e7e\u8e49\u8e9c", "da": "\u642d\u8fbe\u7b54\u7629\u6253\u5927\u8037\u54d2\u55d2\u601b\u59b2\u75b8\u8921\u7b2a\u977c\u9791", "dai": "\u5446\u6b79\u50a3\u6234\u5e26\u6b86\u4ee3\u8d37\u888b\u5f85\u902e\u6020\u57ed\u7519\u5454\u5cb1\u8fe8\u902f\u9a80\u7ed0\u73b3\u9edb", "dan": "\u803d\u62c5\u4e39\u5355\u90f8\u63b8\u80c6\u65e6\u6c2e\u4f46\u60ee\u6de1\u8bde\u5f39\u86cb\u4ebb\u510b\u5369\u840f\u5556\u6fb9\u6a90\u6b9a\u8d55\u7708\u7605\u8043\u7baa", "dang": "\u5f53\u6321\u515a\u8361\u6863\u8c20\u51fc\u83ea\u5b95\u7800\u94db\u88c6", "dao": "\u5200\u6363\u8e48\u5012\u5c9b\u7977\u5bfc\u5230\u7a3b\u60bc\u9053\u76d7\u53e8\u5541\u5fc9\u6d2e\u6c18\u7118\u5fd1\u7e9b", "de": "\u5fb7\u5f97\u7684\u951d", "deng": "\u8e6c\u706f\u767b\u7b49\u77aa\u51f3\u9093\u5654\u5d9d\u6225\u78f4\u956b\u7c26", "di": "\u5824\u4f4e\u6ef4\u8fea\u654c\u7b1b\u72c4\u6da4\u7fdf\u5ae1\u62b5\u5e95\u5730\u8482\u7b2c\u5e1d\u5f1f\u9012\u7f14\u6c10\u7c74\u8bcb\u8c1b\u90b8\u577b\u839c\u837b\u5600\u5a23\u67e2\u68e3\u89cc\u7825\u78b2\u7747\u955d\u7f9d\u9ab6", "dian": "\u98a0\u6382\u6ec7\u7898\u70b9\u5178\u975b\u57ab\u7535\u4f43\u7538\u5e97\u60e6\u5960\u6dc0\u6bbf\u4e36\u963d\u576b\u57dd\u5dc5\u73b7\u765c\u766b\u7c1f\u8e2e", "diao": "\u7889\u53fc\u96d5\u51cb\u5201\u6389\u540a\u9493\u8c03\u8f7a\u94de\u8729\u7c9c\u8c82", "die": "\u8dcc\u7239\u789f\u8776\u8fed\u8c0d\u53e0\u4f5a\u57a4\u581e\u63f2\u558b\u6e2b\u8f76\u7252\u74de\u8936\u800b\u8e40\u9cbd\u9cce", "ding": "\u4e01\u76ef\u53ee\u9489\u9876\u9f0e\u952d\u5b9a\u8ba2\u4e22\u4ec3\u5576\u738e\u815a\u7887\u753a\u94e4\u7594\u8035\u914a", "dong": "\u4e1c\u51ac\u8463\u61c2\u52a8\u680b\u4f97\u606b\u51bb\u6d1e\u578c\u549a\u5cbd\u5cd2\u5902\u6c21\u80e8\u80f4\u7850\u9e2b", "dou": "\u515c\u6296\u6597\u9661\u8c46\u9017\u75d8\u8538\u94ad\u7aa6\u7aac\u86aa\u7bfc\u9161", "du": "\u90fd\u7763\u6bd2\u728a\u72ec\u8bfb\u5835\u7779\u8d4c\u675c\u9540\u809a\u5ea6\u6e21\u5992\u828f\u561f\u6e0e\u691f\u6a50\u724d\u8839\u7b03\u9ad1\u9ee9", "duan": "\u7aef\u77ed\u953b\u6bb5\u65ad\u7f0e\u5f56\u6934\u7145\u7c16", "dui": "\u5806\u5151\u961f\u5bf9\u603c\u619d\u7893", "dun": "\u58a9\u5428\u8e72\u6566\u987f\u56e4\u949d\u76fe\u9041\u7096\u7818\u7905\u76f9\u9566\u8db8", "duo": "\u6387\u54c6\u591a\u593a\u579b\u8eb2\u6735\u8dfa\u8235\u5241\u60f0\u5815\u5484\u54da\u7f0d\u67c1\u94ce\u88f0\u8e31", "e": "\u86fe\u5ce8\u9e45\u4fc4\u989d\u8bb9\u5a25\u6076\u5384\u627c\u904f\u9102\u997f\u5669\u8c14\u57a9\u57ad\u82ca\u83aa\u843c\u5443\u6115\u5c59\u5a40\u8f6d\u66f7\u816d\u786a\u9507\u9537\u9e57\u989a\u9cc4", "en": "\u6069\u84bd\u6441\u5514\u55ef", "er": "\u800c\u513f\u8033\u5c14\u9975\u6d31\u4e8c\u8d30\u8fe9\u73e5\u94d2\u9e38\u9c95", "fa": "\u53d1\u7f5a\u7b4f\u4f10\u4e4f\u9600\u6cd5\u73d0\u57a1\u781d", "fan": "\u85e9\u5e06\u756a\u7ffb\u6a0a\u77fe\u9492\u7e41\u51e1\u70e6\u53cd\u8fd4\u8303\u8d29\u72af\u996d\u6cdb\u8629\u5e61\u72ad\u68b5\u6535\u71d4\u7548\u8e6f", "fang": "\u574a\u82b3\u65b9\u80aa\u623f\u9632\u59a8\u4eff\u8bbf\u7eba\u653e\u531a\u90a1\u5f77\u94ab\u822b\u9c82", "fei": "\u83f2\u975e\u5561\u98de\u80a5\u532a\u8bfd\u5420\u80ba\u5e9f\u6cb8\u8d39\u82be\u72d2\u60b1\u6ddd\u5983\u7ecb\u7eef\u69a7\u8153\u6590\u6249\u7953\u7829\u9544\u75f1\u871a\u7bda\u7fe1\u970f\u9cb1", "fen": "\u82ac\u915a\u5429\u6c1b\u5206\u7eb7\u575f\u711a\u6c7e\u7c89\u594b\u4efd\u5fff\u6124\u7caa\u507e\u7035\u68fc\u610d\u9cbc\u9f22", "feng": "\u4e30\u5c01\u67ab\u8702\u5cf0\u950b\u98ce\u75af\u70fd\u9022\u51af\u7f1d\u8bbd\u5949\u51e4\u4ff8\u9146\u8451\u6ca3\u781c", "fu": "\u4f5b\u5426\u592b\u6577\u80a4\u5b75\u6276\u62c2\u8f90\u5e45\u6c1f\u7b26\u4f0f\u4fd8\u670d\u6d6e\u6daa\u798f\u88b1\u5f17\u752b\u629a\u8f85\u4fef\u91dc\u65a7\u812f\u8151\u5e9c\u8150\u8d74\u526f\u8986\u8d4b\u590d\u5085\u4ed8\u961c\u7236\u8179\u8d1f\u5bcc\u8ba3\u9644\u5987\u7f1a\u5490\u5310\u51eb\u90db\u8299\u82fb\u832f\u83a9\u83d4\u544b\u5e5e\u6ecf\u8274\u5b5a\u9a78\u7ec2\u6874\u8d59\u9efb\u9efc\u7f58\u7a03\u99a5\u864d\u86a8\u8709\u8760\u876e\u9eb8\u8dba\u8dd7\u9cc6", "ga": "\u5676\u560e\u86e4\u5c2c\u5477\u5c15\u5c1c\u65ee\u9486", "gai": "\u8be5\u6539\u6982\u9499\u76d6\u6e89\u4e10\u9654\u5793\u6224\u8d45\u80f2", "gan": "\u5e72\u7518\u6746\u67d1\u7aff\u809d\u8d76\u611f\u79c6\u6562\u8d63\u5769\u82f7\u5c34\u64c0\u6cd4\u6de6\u6f89\u7ec0\u6a44\u65f0\u77f8\u75b3\u9150", "gang": "\u5188\u521a\u94a2\u7f38\u809b\u7eb2\u5c97\u6e2f\u6206\u7f61\u9883\u7b7b\u6760", "gong": "\u5de5\u653b\u529f\u606d\u9f9a\u4f9b\u8eac\u516c\u5bab\u5f13\u5de9\u6c5e\u62f1\u8d21\u5171\u857b\u5efe\u54a3\u73d9\u80b1\u86a3\u86e9\u89e5", "gao": "\u7bd9\u768b\u9ad8\u818f\u7f94\u7cd5\u641e\u9550\u7a3f\u544a\u777e\u8bf0\u90dc\u84bf\u85c1\u7f1f\u69d4\u69c1\u6772\u9506", "ge": "\u54e5\u6b4c\u6401\u6208\u9e3d\u80f3\u7599\u5272\u9769\u845b\u683c\u9601\u9694\u94ec\u4e2a\u5404\u9b32\u4ee1\u54ff\u5865\u55dd\u7ea5\u643f\u8188\u784c\u94ea\u9549\u88bc\u988c\u867c\u8238\u9abc\u9ac2", "gei": "\u7ed9", "gen": "\u6839\u8ddf\u4e98\u831b\u54cf\u826e", "geng": "\u8015\u66f4\u5e9a\u7fb9\u57c2\u803f\u6897\u54fd\u8d53\u9ca0", "gou": "\u94a9\u52fe\u6c9f\u82df\u72d7\u57a2\u6784\u8d2d\u591f\u4f5d\u8bdf\u5ca3\u9058\u5abe\u7f11\u89cf\u5f40\u9e32\u7b31\u7bdd\u97b2", "gu": "\u8f9c\u83c7\u5495\u7b8d\u4f30\u6cbd\u5b64\u59d1\u9f13\u53e4\u86ca\u9aa8\u8c37\u80a1\u6545\u987e\u56fa\u96c7\u560f\u8bc2\u83f0\u54cc\u5d2e\u6c69\u688f\u8f71\u726f\u727f\u80cd\u81cc\u6bc2\u77bd\u7f5f\u94b4\u9522\u74e0\u9e2a\u9e44\u75fc\u86c4\u9164\u89da\u9cb4\u9ab0\u9e58", "gua": "\u522e\u74dc\u5250\u5be1\u6302\u8902\u5366\u8bd6\u5471\u681d\u9e39", "guai": "\u4e56\u62d0\u602a\u54d9", "guan": "\u68fa\u5173\u5b98\u51a0\u89c2\u7ba1\u9986\u7f50\u60ef\u704c\u8d2f\u500c\u839e\u63bc\u6dab\u76e5\u9e73\u9ccf", "guang": "\u5149\u5e7f\u901b\u72b7\u6844\u80f1\u7592", "gui": "\u7470\u89c4\u572d\u7845\u5f52\u9f9f\u95fa\u8f68\u9b3c\u8be1\u7678\u6842\u67dc\u8dea\u8d35\u523d\u5326\u523f\u5e8b\u5b84\u59ab\u6867\u7085\u6677\u7688\u7c0b\u9c91\u9cdc", "gun": "\u8f8a\u6eda\u68cd\u4e28\u886e\u7ef2\u78d9\u9ca7", "guo": "\u9505\u90ed\u56fd\u679c\u88f9\u8fc7\u9998\u8803\u57da\u63b4\u5459\u56d7\u5e3c\u5d1e\u7313\u6901\u8662\u951e\u8052\u872e\u873e\u8748", "ha": "\u54c8", "hai": "\u8fd8\u9ab8\u5b69\u6d77\u6c26\u4ea5\u5bb3\u9a87\u54b4\u55e8\u988f\u91a2", "han": "\u9163\u61a8\u90af\u97e9\u542b\u6db5\u5bd2\u51fd\u558a\u7f55\u7ff0\u64bc\u634d\u65f1\u61be\u608d\u710a\u6c57\u6c49\u9097\u83e1\u6496\u961a\u701a\u6657\u7113\u9894\u86b6\u9f3e", "hen": "\u592f\u75d5\u5f88\u72e0\u6068", "hang": "\u676d\u822a\u6c86\u7ed7\u73e9\u6841", "hao": "\u58d5\u568e\u8c6a\u6beb\u90dd\u597d\u8017\u53f7\u6d69\u8585\u55e5\u5686\u6fe0\u704f\u660a\u7693\u98a2\u869d", "he": "\u5475\u559d\u8377\u83cf\u6838\u79be\u548c\u4f55\u5408\u76d2\u8c89\u9602\u6cb3\u6db8\u8d6b\u8910\u9e64\u8d3a\u8bc3\u52be\u58d1\u85ff\u55d1\u55ec\u9616\u76cd\u86b5\u7fee", "hei": "\u563f\u9ed1", "heng": "\u54fc\u4ea8\u6a2a\u8861\u6052\u8a07\u8605", "hong": "\u8f70\u54c4\u70d8\u8679\u9e3f\u6d2a\u5b8f\u5f18\u7ea2\u9ec9\u8ba7\u836d\u85a8\u95f3\u6cd3", "hou": "\u5589\u4faf\u7334\u543c\u539a\u5019\u540e\u5820\u5f8c\u9005\u760a\u7bcc\u7cc7\u9c8e\u9aba", "hu": "\u547c\u4e4e\u5ffd\u745a\u58f6\u846b\u80e1\u8774\u72d0\u7cca\u6e56\u5f27\u864e\u552c\u62a4\u4e92\u6caa\u6237\u51b1\u553f\u56eb\u5cb5\u7322\u6019\u60da\u6d52\u6ef9\u7425\u69f2\u8f77\u89f3\u70c0\u7173\u623d\u6248\u795c\u9e55\u9e71\u7b0f\u9190\u659b", "hua": "\u82b1\u54d7\u534e\u733e\u6ed1\u753b\u5212\u5316\u8bdd\u5290\u6d4d\u9a85\u6866\u94e7\u7a1e", "huai": "\u69d0\u5f8a\u6000\u6dee\u574f\u8fd8\u8e1d", "huan": "\u6b22\u73af\u6853\u7f13\u6362\u60a3\u5524\u75ea\u8c62\u7115\u6da3\u5ba6\u5e7b\u90c7\u5942\u57b8\u64d0\u571c\u6d39\u6d63\u6f36\u5bf0\u902d\u7f33\u953e\u9ca9\u9b1f", "huang": "\u8352\u614c\u9ec4\u78fa\u8757\u7c27\u7687\u51f0\u60f6\u714c\u6643\u5e4c\u604d\u8c0e\u968d\u5fa8\u6e5f\u6f62\u9051\u749c\u8093\u7640\u87e5\u7bc1\u9cc7", "hui": "\u7070\u6325\u8f89\u5fbd\u6062\u86d4\u56de\u6bc1\u6094\u6167\u5349\u60e0\u6666\u8d3f\u79fd\u4f1a\u70e9\u6c47\u8bb3\u8bf2\u7ed8\u8bd9\u8334\u835f\u8559\u54d5\u5599\u96b3\u6d04\u5f57\u7f0b\u73f2\u6656\u605a\u867a\u87ea\u9ebe", "hun": "\u8364\u660f\u5a5a\u9b42\u6d51\u6df7\u8be8\u9984\u960d\u6eb7\u7f17", "huo": "\u8c41\u6d3b\u4f19\u706b\u83b7\u6216\u60d1\u970d\u8d27\u7978\u6509\u56af\u5925\u94ac\u952a\u956c\u8020\u8816", "ji": "\u51fb\u573e\u57fa\u673a\u7578\u7a3d\u79ef\u7b95\u808c\u9965\u8ff9\u6fc0\u8ba5\u9e21\u59ec\u7ee9\u7f09\u5409\u6781\u68d8\u8f91\u7c4d\u96c6\u53ca\u6025\u75be\u6c72\u5373\u5ac9\u7ea7\u6324\u51e0\u810a\u5df1\u84df\u6280\u5180\u5b63\u4f0e\u796d\u5242\u60b8\u6d4e\u5bc4\u5bc2\u8ba1\u8bb0\u65e2\u5fcc\u9645\u5993\u7ee7\u7eaa\u5c45\u4e0c\u4e69\u525e\u4f76\u4f74\u8114\u58bc\u82a8\u82b0\u8401\u84ba\u857a\u638e\u53fd\u54ad\u54dc\u5527\u5c8c\u5d74\u6d0e\u5f50\u5c50\u9aa5\u757f\u7391\u696b\u6b9b\u621f\u6222\u8d4d\u89ca\u7284\u9f51\u77f6\u7f81\u5d47\u7a37\u7620\u7635\u866e\u7b08\u7b04\u66a8\u8dfb\u8dfd\u9701\u9c9a\u9cab\u9afb\u9e82", "jia": "\u5609\u67b7\u5939\u4f73\u5bb6\u52a0\u835a\u988a\u8d3e\u7532\u94be\u5047\u7a3c\u4ef7\u67b6\u9a7e\u5ac1\u4f3d\u90cf\u62ee\u5cac\u6d43\u8fe6\u73c8\u621b\u80db\u605d\u94d7\u9553\u75c2\u86f1\u7b33\u8888\u8dcf", "jian": "\u6b7c\u76d1\u575a\u5c16\u7b3a\u95f4\u714e\u517c\u80a9\u8270\u5978\u7f04\u8327\u68c0\u67ec\u78b1\u7877\u62e3\u6361\u7b80\u4fed\u526a\u51cf\u8350\u69db\u9274\u8df5\u8d31\u89c1\u952e\u7bad\u4ef6\u5065\u8230\u5251\u996f\u6e10\u6e85\u6da7\u5efa\u50ed\u8c0f\u8c2b\u83c5\u84b9\u641b\u56dd\u6e54\u8e47\u8b07\u7f23\u67a7\u67d9\u6957\u620b\u622c\u726e\u728d\u6bfd\u8171\u7751\u950f\u9e63\u88e5\u7b15\u7bb4\u7fe6\u8dbc\u8e3a\u9ca3\u97af", "jiang": "\u50f5\u59dc\u5c06\u6d46\u6c5f\u7586\u848b\u6868\u5956\u8bb2\u5320\u9171\u964d\u8333\u6d1a\u7edb\u7f30\u729f\u7913\u8029\u7ce8\u8c47", "jiao": "\u8549\u6912\u7901\u7126\u80f6\u4ea4\u90ca\u6d47\u9a84\u5a07\u56bc\u6405\u94f0\u77eb\u4fa5\u811a\u72e1\u89d2\u997a\u7f34\u7ede\u527f\u6559\u9175\u8f7f\u8f83\u53eb\u4f7c\u50ec\u832d\u6322\u564d\u5ce4\u5fbc\u59e3\u7e9f\u656b\u768e\u9e6a\u86df\u91ae\u8de4\u9c9b", "jie": "\u7a96\u63ed\u63a5\u7686\u79f8\u8857\u9636\u622a\u52ab\u8282\u6854\u6770\u6377\u776b\u7aed\u6d01\u7ed3\u89e3\u59d0\u6212\u85c9\u82a5\u754c\u501f\u4ecb\u75a5\u8beb\u5c4a\u5048\u8ba6\u8bd8\u5588\u55df\u736c\u5a55\u5b51\u6840\u7352\u78a3\u9534\u7596\u88b7\u9889\u86a7\u7faf\u9c92\u9ab1\u9aeb", "jin": "\u5dfe\u7b4b\u65a4\u91d1\u4eca\u6d25\u895f\u7d27\u9526\u4ec5\u8c28\u8fdb\u9773\u664b\u7981\u8fd1\u70ec\u6d78\u5c3d\u537a\u8369\u5807\u5664\u9991\u5ed1\u5997\u7f19\u747e\u69ff\u8d46\u89d0\u9485\u9513\u887f\u77dc", "jing": "\u52b2\u8346\u5162\u830e\u775b\u6676\u9cb8\u4eac\u60ca\u7cbe\u7cb3\u7ecf\u4e95\u8b66\u666f\u9888\u9759\u5883\u656c\u955c\u5f84\u75c9\u9756\u7adf\u7ade\u51c0\u522d\u5106\u9631\u83c1\u734d\u61ac\u6cfe\u8ff3\u5f2a\u5a67\u80bc\u80eb\u8148\u65cc", "jiong": "\u70af\u7a98\u5182\u8fe5\u6243", "jiu": "\u63ea\u7a76\u7ea0\u7396\u97ed\u4e45\u7078\u4e5d\u9152\u53a9\u6551\u65e7\u81fc\u8205\u548e\u5c31\u759a\u50e6\u557e\u9604\u67e9\u6855\u9e6b\u8d73\u9b0f", "ju": "\u97a0\u62d8\u72d9\u75bd\u9a79\u83ca\u5c40\u5480\u77e9\u4e3e\u6cae\u805a\u62d2\u636e\u5de8\u5177\u8ddd\u8e1e\u952f\u4ff1\u53e5\u60e7\u70ac\u5267\u5028\u8bb5\u82e3\u82f4\u8392\u63ac\u907d\u5c66\u741a\u67b8\u6910\u6998\u6989\u6a58\u728b\u98d3\u949c\u9514\u7aad\u88fe\u8d84\u91b5\u8e3d\u9f83\u96ce\u97ab", "juan": "\u6350\u9e43\u5a1f\u5026\u7737\u5377\u7ee2\u9104\u72f7\u6d93\u684a\u8832\u9529\u954c\u96bd", "jue": "\u6485\u652b\u6289\u6398\u5014\u7235\u89c9\u51b3\u8bc0\u7edd\u53a5\u5282\u8c32\u77cd\u8568\u5658\u5d1b\u7357\u5b53\u73cf\u6877\u6a5b\u721d\u9562\u8e76\u89d6", "jun": "\u5747\u83cc\u94a7\u519b\u541b\u5cfb\u4fca\u7ae3\u6d5a\u90e1\u9a8f\u6343\u72fb\u76b2\u7b60\u9e87", "ka": "\u5580\u5496\u5361\u4f67\u5494\u80e9", "ke": "\u54af\u5777\u82db\u67ef\u68f5\u78d5\u9897\u79d1\u58f3\u54b3\u53ef\u6e34\u514b\u523b\u5ba2\u8bfe\u5ca2\u606a\u6e98\u9a92\u7f02\u73c2\u8f72\u6c2a\u778c\u94b6\u75b4\u7aa0\u874c\u9ac1", "kai": "\u5f00\u63e9\u6977\u51ef\u6168\u5240\u57b2\u8488\u5ffe\u607a\u94e0\u950e", "kan": "\u520a\u582a\u52d8\u574e\u780d\u770b\u4f83\u51f5\u83b0\u83b6\u6221\u9f9b\u77b0", "kang": "\u5eb7\u6177\u7ce0\u625b\u6297\u4ea2\u7095\u5751\u4f09\u95f6\u94aa", "kao": "\u8003\u62f7\u70e4\u9760\u5c3b\u6832\u7292\u94d0", "ken": "\u80af\u5543\u57a6\u6073\u57a0\u88c9\u9880", "keng": "\u542d\u5fd0\u94ff", "kong": "\u7a7a\u6050\u5b54\u63a7\u5025\u5d06\u7b9c", "kou": "\u62a0\u53e3\u6263\u5bc7\u82a4\u853b\u53e9\u770d\u7b58", "ku": "\u67af\u54ed\u7a9f\u82e6\u9177\u5e93\u88e4\u5233\u5800\u55be\u7ed4\u9ab7", "kua": "\u5938\u57ae\u630e\u8de8\u80ef\u4f89", "kuai": "\u5757\u7b77\u4fa9\u5feb\u84af\u90d0\u8489\u72ef\u810d", "kuan": "\u5bbd\u6b3e\u9acb", "kuang": "\u5321\u7b50\u72c2\u6846\u77ff\u7736\u65f7\u51b5\u8bd3\u8bf3\u909d\u5739\u593c\u54d0\u7ea9\u8d36", "kui": "\u4e8f\u76d4\u5cbf\u7aa5\u8475\u594e\u9b41\u5080\u9988\u6127\u6e83\u9997\u532e\u5914\u9697\u63c6\u55b9\u559f\u609d\u6126\u9615\u9035\u668c\u777d\u8069\u8770\u7bd1\u81fe\u8dec", "kun": "\u5764\u6606\u6346\u56f0\u6083\u9603\u7428\u951f\u918c\u9cb2\u9ae1", "kuo": "\u62ec\u6269\u5ed3\u9614\u86de", "la": "\u5783\u62c9\u5587\u8721\u814a\u8fa3\u5566\u524c\u647a\u908b\u65ef\u782c\u760c", "lai": "\u83b1\u6765\u8d56\u5d03\u5f95\u6d9e\u6fd1\u8d49\u7750\u94fc\u765e\u7c41", "lan": "\u84dd\u5a6a\u680f\u62e6\u7bee\u9611\u5170\u6f9c\u8c30\u63fd\u89c8\u61d2\u7f06\u70c2\u6ee5\u5549\u5c9a\u61d4\u6f24\u6984\u6593\u7f71\u9567\u8934", "lang": "\u7405\u6994\u72fc\u5eca\u90ce\u6717\u6d6a\u83a8\u8497\u5577\u9606\u9512\u7a02\u8782", "lao": "\u635e\u52b3\u7262\u8001\u4f6c\u59e5\u916a\u70d9\u6d9d\u5520\u5d02\u6833\u94d1\u94f9\u75e8\u91aa", "le": "\u52d2\u4e50\u808b\u4ec2\u53fb\u561e\u6cd0\u9cd3", "lei": "\u96f7\u956d\u857e\u78ca\u7d2f\u5121\u5792\u64c2\u7c7b\u6cea\u7fb8\u8bd4\u837d\u54a7\u6f2f\u5ad8\u7f27\u6a91\u8012\u9179", "ling": "\u68f1\u51b7\u62ce\u73b2\u83f1\u96f6\u9f84\u94c3\u4f36\u7f9a\u51cc\u7075\u9675\u5cad\u9886\u53e6\u4ee4\u9143\u5844\u82d3\u5464\u56f9\u6ce0\u7eeb\u67c3\u68c2\u74f4\u8046\u86c9\u7fce\u9cae", "leng": "\u695e\u6123", "li": "\u5398\u68a8\u7281\u9ece\u7bf1\u72f8\u79bb\u6f13\u7406\u674e\u91cc\u9ca4\u793c\u8389\u8354\u540f\u6817\u4e3d\u5389\u52b1\u783e\u5386\u5229\u5088\u4f8b\u4fd0\u75e2\u7acb\u7c92\u6ca5\u96b6\u529b\u7483\u54e9\u4fea\u4fda\u90e6\u575c\u82c8\u8385\u84e0\u85dc\u6369\u5456\u5533\u55b1\u7301\u6ea7\u6fa7\u9026\u5a0c\u5ae0\u9a8a\u7f21\u73de\u67a5\u680e\u8f79\u623e\u783a\u8a48\u7f79\u9502\u9e42\u75a0\u75ac\u86ce\u870a\u8821\u7b20\u7be5\u7c9d\u91b4\u8dde\u96f3\u9ca1\u9ce2\u9ee7", "lian": "\u4fe9\u8054\u83b2\u8fde\u9570\u5ec9\u601c\u6d9f\u5e18\u655b\u8138\u94fe\u604b\u70bc\u7ec3\u631b\u8539\u5941\u6f4b\u6fc2\u5a08\u740f\u695d\u6b93\u81c1\u81a6\u88e2\u880a\u9ca2", "liang": "\u7cae\u51c9\u6881\u7cb1\u826f\u4e24\u8f86\u91cf\u667e\u4eae\u8c05\u589a\u690b\u8e09\u9753\u9b49", "liao": "\u64a9\u804a\u50da\u7597\u71ce\u5be5\u8fbd\u6f66\u4e86\u6482\u9563\u5ed6\u6599\u84fc\u5c25\u5639\u7360\u5bee\u7f2d\u948c\u9e69\u8022", "lie": "\u5217\u88c2\u70c8\u52a3\u730e\u51bd\u57d2\u6d0c\u8d94\u8e90\u9b23", "lin": "\u7433\u6797\u78f7\u9716\u4e34\u90bb\u9cde\u6dcb\u51db\u8d41\u541d\u853a\u5d99\u5eea\u9074\u6aa9\u8f9a\u77b5\u7cbc\u8e8f\u9e9f", "liu": "\u6e9c\u7409\u69b4\u786b\u998f\u7559\u5218\u7624\u6d41\u67f3\u516d\u62a1\u507b\u848c\u6cd6\u6d4f\u905b\u9a9d\u7efa\u65d2\u7198\u950d\u954f\u9e68\u938f", "long": "\u9f99\u804b\u5499\u7b3c\u7abf\u9686\u5784\u62e2\u9647\u5f04\u5785\u830f\u6cf7\u73d1\u680a\u80e7\u783b\u7643", "lou": "\u697c\u5a04\u6402\u7bd3\u6f0f\u964b\u55bd\u5d5d\u9542\u7618\u8027\u877c\u9ac5", "lu": "\u82a6\u5362\u9885\u5e90\u7089\u63b3\u5364\u864f\u9c81\u9e93\u788c\u9732\u8def\u8d42\u9e7f\u6f5e\u7984\u5f55\u9646\u622e\u5786\u6445\u64b8\u565c\u6cf8\u6e0c\u6f09\u7490\u680c\u6a79\u8f73\u8f82\u8f98\u6c07\u80ea\u9565\u9e2c\u9e6d\u7c0f\u823b\u9c88", "lv": "\u9a74\u5415\u94dd\u4fa3\u65c5\u5c65\u5c61\u7f15\u8651\u6c2f\u5f8b\u7387\u6ee4\u7eff\u634b\u95fe\u6988\u8182\u7a06\u891b", "luan": "\u5ce6\u5b6a\u6ee6\u5375\u4e71\u683e\u9e3e\u92ae", "lue": "\u63a0\u7565\u950a", "lun": "\u8f6e\u4f26\u4ed1\u6ca6\u7eb6\u8bba\u56f5", "luo": "\u841d\u87ba\u7f57\u903b\u9523\u7ba9\u9aa1\u88f8\u843d\u6d1b\u9a86\u7edc\u502e\u8366\u645e\u7321\u6cfa\u6924\u8136\u9559\u7630\u96d2", "ma": "\u5988\u9ebb\u739b\u7801\u8682\u9a6c\u9a82\u561b\u5417\u551b\u72b8\u5b37\u6769\u9ebd", "mai": "\u57cb\u4e70\u9ea6\u5356\u8fc8\u8109\u52a2\u836c\u54aa\u973e", "man": "\u7792\u9992\u86ee\u6ee1\u8513\u66fc\u6162\u6f2b\u8c29\u5881\u5e54\u7f26\u71b3\u9558\u989f\u87a8\u9cd7\u9794", "mang": "\u8292\u832b\u76f2\u5fd9\u83bd\u9099\u6f2d\u6726\u786d\u87d2", "meng": "\u6c13\u840c\u8499\u6aac\u76df\u9530\u731b\u68a6\u5b5f\u52d0\u750d\u77a2\u61f5\u791e\u867b\u8722\u8813\u824b\u8268\u9efe", "miao": "\u732b\u82d7\u63cf\u7784\u85d0\u79d2\u6e3a\u5e99\u5999\u55b5\u9088\u7f08\u7f2a\u676a\u6dfc\u7707\u9e4b\u8731", "mao": "\u8305\u951a\u6bdb\u77db\u94c6\u536f\u8302\u5192\u5e3d\u8c8c\u8d38\u4f94\u88a4\u52d6\u8306\u5cc1\u7441\u6634\u7266\u8004\u65c4\u61cb\u7780\u86d1\u8765\u87ca\u9ae6", "me": "\u4e48", "mei": "\u73ab\u679a\u6885\u9176\u9709\u7164\u6ca1\u7709\u5a92\u9541\u6bcf\u7f8e\u6627\u5bd0\u59b9\u5a9a\u5776\u8393\u5d4b\u7338\u6d7c\u6e44\u6963\u9545\u9e5b\u8882\u9b45", "men": "\u95e8\u95f7\u4eec\u626a\u739f\u7116\u61d1\u9494", "mi": "\u772f\u919a\u9761\u7cdc\u8ff7\u8c1c\u5f25\u7c73\u79d8\u89c5\u6ccc\u871c\u5bc6\u5e42\u8288\u5196\u8c27\u863c\u5627\u7315\u736f\u6c68\u5b93\u5f2d\u8112\u6549\u7cf8\u7e3b\u9e8b", "mian": "\u68c9\u7720\u7ef5\u5195\u514d\u52c9\u5a29\u7f05\u9762\u6c94\u6e4e\u817c\u7704", "mie": "\u8511\u706d\u54a9\u881b\u7bfe", "min": "\u6c11\u62bf\u76bf\u654f\u60af\u95fd\u82e0\u5cb7\u95f5\u6cef\u73c9", "ming": "\u660e\u879f\u9e23\u94ed\u540d\u547d\u51a5\u8317\u6e9f\u669d\u7791\u9169", "miu": "\u8c2c", "mo": "\u6478\u6479\u8611\u6a21\u819c\u78e8\u6469\u9b54\u62b9\u672b\u83ab\u58a8\u9ed8\u6cab\u6f20\u5bde\u964c\u8c1f\u8309\u84e6\u998d\u5aeb\u9546\u79e3\u763c\u8031\u87c6\u8c8a\u8c98", "mou": "\u8c0b\u725f\u67d0\u53b6\u54de\u5a7a\u7738\u936a", "mu": "\u62c7\u7261\u4ea9\u59c6\u6bcd\u5893\u66ae\u5e55\u52df\u6155\u6728\u76ee\u7766\u7267\u7a46\u4eeb\u82dc\u5452\u6c90\u6bea\u94bc", "na": "\u62ff\u54ea\u5450\u94a0\u90a3\u5a1c\u7eb3\u637a\u80ad\u954e\u8872\u7bac", "nai": "\u6c16\u4e43\u5976\u8010\u5948\u9f10\u827f\u8418\u67f0", "nan": "\u5357\u7537\u96be\u56ca\u5583\u56e1\u6960\u8169\u877b\u8d67", "nao": "\u6320\u8111\u607c\u95f9\u5b6c\u57b4\u7331\u7459\u7847\u94d9\u86f2", "ne": "\u6dd6\u5462\u8bb7", "nei": "\u9981\u5185", "nen": "\u5ae9\u80fd\u6798\u6041", "ni": "\u59ae\u9713\u502a\u6ce5\u5c3c\u62df\u4f60\u533f\u817b\u9006\u6eba\u4f32\u576d\u730a\u6029\u6ee0\u6635\u65ce\u7962\u615d\u7768\u94cc\u9cb5", "nian": "\u852b\u62c8\u5e74\u78be\u64b5\u637b\u5ff5\u5eff\u8f87\u9ecf\u9c87\u9cb6", "niang": "\u5a18\u917f", "niao": "\u9e1f\u5c3f\u8311\u5b32\u8132\u8885", "nie": "\u634f\u8042\u5b7d\u556e\u954a\u954d\u6d85\u4e5c\u9667\u8616\u55eb\u8080\u989e\u81ec\u8e51", "nin": "\u60a8\u67e0", "ning": "\u72de\u51dd\u5b81\u62e7\u6cde\u4f5e\u84e5\u549b\u752f\u804d", "niu": "\u725b\u626d\u94ae\u7ebd\u72c3\u5ff8\u599e\u86b4", "nong": "\u8113\u6d53\u519c\u4fac", "nu": "\u5974\u52aa\u6012\u5476\u5e11\u5f29\u80ec\u5b65\u9a7d", "nv": "\u5973\u6067\u9495\u8844", "nuan": "\u6696", "nuenue": "\u8650", "nue": "\u759f\u8c11", "nuo": "\u632a\u61e6\u7cef\u8bfa\u50a9\u6426\u558f\u9518", "ou": "\u54e6\u6b27\u9e25\u6bb4\u85d5\u5455\u5076\u6ca4\u6004\u74ef\u8026", "pa": "\u556a\u8db4\u722c\u5e15\u6015\u7436\u8469\u7b62", "pai": "\u62cd\u6392\u724c\u5f98\u6e43\u6d3e\u4ff3\u848e", "pan": "\u6500\u6f58\u76d8\u78d0\u76fc\u7554\u5224\u53db\u723f\u6cee\u88a2\u897b\u87e0\u8e52", "pang": "\u4e53\u5e9e\u65c1\u802a\u80d6\u6ec2\u9004", "pao": "\u629b\u5486\u5228\u70ae\u888d\u8dd1\u6ce1\u530f\u72cd\u5e96\u812c\u75b1", "pei": "\u5478\u80da\u57f9\u88f4\u8d54\u966a\u914d\u4f69\u6c9b\u638a\u8f94\u5e14\u6de0\u65c6\u952b\u9185\u9708", "pen": "\u55b7\u76c6\u6e53", "peng": "\u7830\u62a8\u70f9\u6f8e\u5f6d\u84ec\u68da\u787c\u7bf7\u81a8\u670b\u9e4f\u6367\u78b0\u576f\u580b\u562d\u6026\u87db", "pi": "\u7812\u9739\u6279\u62ab\u5288\u7435\u6bd7\u5564\u813e\u75b2\u76ae\u5339\u75de\u50fb\u5c41\u8b6c\u4e15\u9674\u90b3\u90eb\u572e\u9f19\u64d7\u567c\u5e80\u5ab2\u7eb0\u6787\u7513\u7765\u7f74\u94cd\u75e6\u7656\u758b\u868d\u8c94", "pian": "\u7bc7\u504f\u7247\u9a97\u8c1d\u9a88\u728f\u80fc\u890a\u7fe9\u8e41", "piao": "\u98d8\u6f02\u74e2\u7968\u527d\u560c\u5ad6\u7f25\u6b8d\u779f\u87b5", "pie": "\u6487\u77a5\u4e3f\u82e4\u6c15", "pin": "\u62fc\u9891\u8d2b\u54c1\u8058\u62da\u59d8\u5ad4\u6980\u725d\u98a6", "ping": "\u4e52\u576a\u82f9\u840d\u5e73\u51ed\u74f6\u8bc4\u5c4f\u4fdc\u5a09\u67b0\u9c86", "po": "\u5761\u6cfc\u9887\u5a46\u7834\u9b44\u8feb\u7c95\u53f5\u9131\u6ea5\u73c0\u948b\u94b7\u76a4\u7b38", "pou": "\u5256\u88d2\u8e23", "pu": "\u6251\u94fa\u4ec6\u8386\u8461\u83e9\u84b2\u57d4\u6734\u5703\u666e\u6d66\u8c31\u66dd\u7011\u530d\u5657\u6fee\u749e\u6c06\u9564\u9568\u8e7c", "qi": "\u671f\u6b3a\u6816\u621a\u59bb\u4e03\u51c4\u6f06\u67d2\u6c8f\u5176\u68cb\u5947\u6b67\u7566\u5d0e\u8110\u9f50\u65d7\u7948\u7941\u9a91\u8d77\u5c82\u4e5e\u4f01\u542f\u5951\u780c\u5668\u6c14\u8fc4\u5f03\u6c7d\u6ce3\u8bab\u4e9f\u4e93\u573b\u8291\u840b\u847a\u5601\u5c7a\u5c90\u6c54\u6dc7\u9a90\u7eee\u742a\u7426\u675e\u6864\u69ed\u6b39\u797a\u61a9\u789b\u86f4\u871e\u7da6\u7dae\u8dbf\u8e4a\u9ccd\u9e92", "qia": "\u6390\u6070\u6d3d\u845c", "qian": "\u7275\u6266\u948e\u94c5\u5343\u8fc1\u7b7e\u4edf\u8c26\u4e7e\u9ed4\u94b1\u94b3\u524d\u6f5c\u9063\u6d45\u8c34\u5811\u5d4c\u6b20\u6b49\u4f65\u9621\u828a\u82a1\u8368\u63ae\u5c8d\u60ad\u614a\u9a9e\u6434\u8930\u7f31\u6920\u80b7\u6106\u94a4\u8654\u7b9d", "qiang": "\u67aa\u545b\u8154\u7f8c\u5899\u8537\u5f3a\u62a2\u5af1\u6a2f\u6217\u709d\u9516\u9535\u956a\u8941\u8723\u7f9f\u8deb\u8dc4", "qiao": "\u6a47\u9539\u6572\u6084\u6865\u77a7\u4e54\u4fa8\u5de7\u9798\u64ac\u7fd8\u5ced\u4fcf\u7a8d\u5281\u8bee\u8c2f\u835e\u6100\u6194\u7f32\u6a35\u6bf3\u7857\u8df7\u9792", "qie": "\u5207\u8304\u4e14\u602f\u7a83\u90c4\u553c\u60ec\u59be\u6308\u9532\u7ba7", "qin": "\u94a6\u4fb5\u4eb2\u79e6\u7434\u52e4\u82b9\u64d2\u79bd\u5bdd\u6c81\u82a9\u84c1\u8572\u63ff\u5423\u55ea\u5659\u6eb1\u6a8e\u8793\u887e", "qing": "\u9752\u8f7b\u6c22\u503e\u537f\u6e05\u64ce\u6674\u6c30\u60c5\u9877\u8bf7\u5e86\u5029\u82d8\u570a\u6aa0\u78ec\u873b\u7f44\u7b90\u8b26\u9cad\u9ee5", "qiong": "\u743c\u7a77\u909b\u8315\u7a79\u7b47\u928e", "qiu": "\u79cb\u4e18\u90b1\u7403\u6c42\u56da\u914b\u6cc5\u4fc5\u6c3d\u5def\u827d\u72b0\u6e6b\u9011\u9052\u6978\u8d47\u9e20\u866c\u86af\u8764\u88d8\u7cd7\u9cc5\u9f3d", "qu": "\u8d8b\u533a\u86c6\u66f2\u8eaf\u5c48\u9a71\u6e20\u53d6\u5a36\u9f8b\u8da3\u53bb\u8bce\u52ac\u8556\u8627\u5c96\u8862\u9612\u74a9\u89d1\u6c0d\u795b\u78f2\u766f\u86d0\u883c\u9eb4\u77bf\u9ee2", "quan": "\u5708\u98a7\u6743\u919b\u6cc9\u5168\u75ca\u62f3\u72ac\u5238\u529d\u8be0\u8343\u737e\u609b\u7efb\u8f81\u754e\u94e8\u8737\u7b4c\u9b08", "que": "\u7f3a\u7094\u7638\u5374\u9e4a\u69b7\u786e\u96c0\u9619\u60ab", "qun": "\u88d9\u7fa4\u9021", "ran": "\u7136\u71c3\u5189\u67d3\u82d2\u9aef", "rang": "\u74e4\u58e4\u6518\u56b7\u8ba9\u79b3\u7a70", "rao": "\u9976\u6270\u7ed5\u835b\u5a06\u6861", "ruo": "\u60f9\u82e5\u5f31", "re": "\u70ed\u504c", "ren": "\u58ec\u4ec1\u4eba\u5fcd\u97e7\u4efb\u8ba4\u5203\u598a\u7eab\u4ede\u834f\u845a\u996a\u8f6b\u7a14\u887d", "reng": "\u6254\u4ecd", "ri": "\u65e5", "rong": "\u620e\u8338\u84c9\u8363\u878d\u7194\u6eb6\u5bb9\u7ed2\u5197\u5d58\u72e8\u7f1b\u6995\u877e", "rou": "\u63c9\u67d4\u8089\u7cc5\u8e42\u97a3", "ru": "\u8339\u8815\u5112\u5b7a\u5982\u8fb1\u4e73\u6c5d\u5165\u8925\u84d0\u85b7\u5685\u6d33\u6ebd\u6fe1\u94f7\u8966\u98a5", "ruan": "\u8f6f\u962e\u670a", "rui": "\u854a\u745e\u9510\u82ae\u8564\u777f\u868b", "run": "\u95f0\u6da6", "sa": "\u6492\u6d12\u8428\u5345\u4ee8\u6332\u98d2", "sai": "\u816e\u9cc3\u585e\u8d5b\u567b", "san": "\u4e09\u53c1\u4f1e\u6563\u5f61\u9993\u6c35\u6bf5\u7cc1\u9730", "sang": "\u6851\u55d3\u4e27\u6421\u78c9\u98a1", "sao": "\u6414\u9a9a\u626b\u5ac2\u57fd\u81ca\u7619\u9ccb", "se": "\u745f\u8272\u6da9\u556c\u94e9\u94ef\u7a51", "sen": "\u68ee", "seng": "\u50e7", "sha": "\u838e\u7802\u6740\u5239\u6c99\u7eb1\u50bb\u5565\u715e\u810e\u6b43\u75e7\u88df\u970e\u9ca8", "shai": "\u7b5b\u6652\u917e", "shan": "\u73ca\u82eb\u6749\u5c71\u5220\u717d\u886b\u95ea\u9655\u64c5\u8d61\u81b3\u5584\u6c55\u6247\u7f2e\u5261\u8baa\u912f\u57cf\u829f\u6f78\u59d7\u9a9f\u81bb\u9490\u759d\u87ee\u8222\u8dda\u9cdd", "shang": "\u5892\u4f24\u5546\u8d4f\u664c\u4e0a\u5c1a\u88f3\u57a7\u7ef1\u6b87\u71b5\u89de", "shao": "\u68a2\u634e\u7a0d\u70e7\u828d\u52fa\u97f6\u5c11\u54e8\u90b5\u7ecd\u52ad\u82d5\u6f72\u86f8\u7b24\u7b72\u8244", "she": "\u5962\u8d4a\u86c7\u820c\u820d\u8d66\u6444\u5c04\u6151\u6d89\u793e\u8bbe\u538d\u4f58\u731e\u7572\u9e9d", "shen": "\u7837\u7533\u547b\u4f38\u8eab\u6df1\u5a20\u7ec5\u795e\u6c88\u5ba1\u5a76\u751a\u80be\u614e\u6e17\u8bdc\u8c02\u5432\u54c2\u6e16\u6939\u77e7\u8703", "sheng": "\u58f0\u751f\u7525\u7272\u5347\u7ef3\u7701\u76db\u5269\u80dc\u5723\u4e1e\u6e11\u5ab5\u771a\u7b19", "shi": "\u5e08\u5931\u72ee\u65bd\u6e7f\u8bd7\u5c38\u8671\u5341\u77f3\u62fe\u65f6\u4ec0\u98df\u8680\u5b9e\u8bc6\u53f2\u77e2\u4f7f\u5c4e\u9a76\u59cb\u5f0f\u793a\u58eb\u4e16\u67ff\u4e8b\u62ed\u8a93\u901d\u52bf\u662f\u55dc\u566c\u9002\u4ed5\u4f8d\u91ca\u9970\u6c0f\u5e02\u6043\u5ba4\u89c6\u8bd5\u8c25\u57d8\u83b3\u84cd\u5f11\u5511\u9963\u8f7c\u8006\u8d33\u70bb\u793b\u94c8\u94ca\u87ab\u8210\u7b6e\u8c55\u9ca5\u9cba", "shou": "\u6536\u624b\u9996\u5b88\u5bff\u6388\u552e\u53d7\u7626\u517d\u624c\u72e9\u7ef6\u824f", "shu": "\u852c\u67a2\u68b3\u6b8a\u6292\u8f93\u53d4\u8212\u6dd1\u758f\u4e66\u8d4e\u5b70\u719f\u85af\u6691\u66d9\u7f72\u8700\u9ecd\u9f20\u5c5e\u672f\u8ff0\u6811\u675f\u620d\u7ad6\u5885\u5eb6\u6570\u6f31\u6055\u500f\u587e\u83fd\u5fc4\u6cad\u6d91\u6f8d\u59dd\u7ebe\u6bf9\u8167\u6bb3\u956f\u79eb\u9e6c", "shua": "\u5237\u800d\u5530\u6dae", "shuai": "\u6454\u8870\u7529\u5e05\u87c0", "shuan": "\u6813\u62f4\u95e9", "shuang": "\u971c\u53cc\u723d\u5b40", "shui": "\u8c01\u6c34\u7761\u7a0e", "shun": "\u542e\u77ac\u987a\u821c\u6042", "shuo": "\u8bf4\u7855\u6714\u70c1\u84b4\u6420\u55cd\u6fef\u5981\u69ca\u94c4", "si": "\u65af\u6495\u5636\u601d\u79c1\u53f8\u4e1d\u6b7b\u8086\u5bfa\u55e3\u56db\u4f3a\u4f3c\u9972\u5df3\u53ae\u4fdf\u5155\u83e5\u549d\u6c5c\u6cd7\u6f8c\u59d2\u9a77\u7f0c\u7940\u7960\u9536\u9e36\u801c\u86f3\u7b25", "song": "\u677e\u8038\u6002\u9882\u9001\u5b8b\u8bbc\u8bf5\u51c7\u83d8\u5d27\u5d69\u5fea\u609a\u6dde\u7ae6", "sou": "\u641c\u8258\u64de\u55fd\u53df\u55d6\u55fe\u998a\u6eb2\u98d5\u778d\u953c\u878b", "su": "\u82cf\u9165\u4fd7\u7d20\u901f\u7c9f\u50f3\u5851\u6eaf\u5bbf\u8bc9\u8083\u5919\u8c21\u850c\u55c9\u612b\u7c0c\u89eb\u7a23", "suan": "\u9178\u849c\u7b97", "sui": "\u867d\u968b\u968f\u7ee5\u9ad3\u788e\u5c81\u7a57\u9042\u96a7\u795f\u84d1\u51ab\u8c07\u6fc9\u9083\u71e7\u772d\u7762", "sun": "\u5b59\u635f\u7b0b\u836a\u72f2\u98e7\u69ab\u8de3\u96bc", "suo": "\u68ad\u5506\u7f29\u7410\u7d22\u9501\u6240\u5522\u55e6\u5a11\u686b\u7743\u7fa7", "ta": "\u584c\u4ed6\u5b83\u5979\u5854\u736d\u631e\u8e4b\u8e0f\u95fc\u6ebb\u9062\u69bb\u6c93", "tai": "\u80ce\u82d4\u62ac\u53f0\u6cf0\u915e\u592a\u6001\u6c70\u90b0\u85b9\u80bd\u70b1\u949b\u8dc6\u9c90", "tan": "\u574d\u644a\u8d2a\u762b\u6ee9\u575b\u6a80\u75f0\u6f6d\u8c2d\u8c08\u5766\u6bef\u8892\u78b3\u63a2\u53f9\u70ad\u90ef\u8548\u6619\u94bd\u952c\u8983", "tang": "\u6c64\u5858\u642a\u5802\u68e0\u819b\u5510\u7cd6\u50a5\u9967\u6e8f\u746d\u94f4\u9557\u8025\u8797\u87b3\u7fb0\u91a3", "thang": "\u5018\u8eba\u6dcc", "theng": "\u8d9f\u70eb", "tao": "\u638f\u6d9b\u6ed4\u7ee6\u8404\u6843\u9003\u6dd8\u9676\u8ba8\u5957\u6311\u9f17\u5555\u97ec\u9955", "te": "\u7279", "teng": "\u85e4\u817e\u75bc\u8a8a\u6ed5", "ti": "\u68af\u5254\u8e22\u9511\u63d0\u9898\u8e44\u557c\u4f53\u66ff\u568f\u60d5\u6d95\u5243\u5c49\u8351\u608c\u9016\u7ee8\u7f07\u9e48\u88fc\u918d", "tian": "\u5929\u6dfb\u586b\u7530\u751c\u606c\u8214\u8146\u63ad\u5fdd\u9617\u6b84\u754b\u94bf\u86ba", "tiao": "\u6761\u8fe2\u773a\u8df3\u4f7b\u7967\u94eb\u7a95\u9f86\u9ca6", "tie": "\u8d34\u94c1\u5e16\u841c\u992e", "ting": "\u5385\u542c\u70c3\u6c40\u5ef7\u505c\u4ead\u5ead\u633a\u8247\u839b\u8476\u5a77\u6883\u8713\u9706", "tong": "\u901a\u6850\u916e\u77b3\u540c\u94dc\u5f64\u7ae5\u6876\u6345\u7b52\u7edf\u75db\u4f5f\u50ee\u4edd\u833c\u55f5\u6078\u6f7c\u783c", "tou": "\u5077\u6295\u5934\u900f\u4ea0", "tu": "\u51f8\u79c3\u7a81\u56fe\u5f92\u9014\u6d82\u5c60\u571f\u5410\u5154\u580d\u837c\u83df\u948d\u9174", "tuan": "\u6e4d\u56e2\u7583", "tui": "\u63a8\u9893\u817f\u8715\u892a\u9000\u5fd2\u717a", "tun": "\u541e\u5c6f\u81c0\u9968\u66be\u8c5a\u7a80", "tuo": "\u62d6\u6258\u8131\u9e35\u9640\u9a6e\u9a7c\u692d\u59a5\u62d3\u553e\u4e47\u4f57\u5768\u5eb9\u6cb1\u67dd\u7823\u7ba8\u8204\u8dce\u9f0d", "wa": "\u6316\u54c7\u86d9\u6d3c\u5a03\u74e6\u889c\u4f64\u5a32\u817d", "wai": "\u6b6a\u5916", "wan": "\u8c4c\u5f2f\u6e7e\u73a9\u987d\u4e38\u70f7\u5b8c\u7897\u633d\u665a\u7696\u60cb\u5b9b\u5a49\u4e07\u8155\u525c\u8284\u82cb\u83c0\u7ea8\u7efe\u742c\u8118\u7579\u873f\u7ba2", "wang": "\u6c6a\u738b\u4ea1\u6789\u7f51\u5f80\u65fa\u671b\u5fd8\u5984\u7f54\u5c22\u60d8\u8f8b\u9b4d", "wei": "\u5a01\u5dcd\u5fae\u5371\u97e6\u8fdd\u6845\u56f4\u552f\u60df\u4e3a\u6f4d\u7ef4\u82c7\u840e\u59d4\u4f1f\u4f2a\u5c3e\u7eac\u672a\u851a\u5473\u754f\u80c3\u5582\u9b4f\u4f4d\u6e2d\u8c13\u5c09\u6170\u536b\u502d\u504e\u8bff\u9688\u8473\u8587\u5e0f\u5e37\u5d34\u5d6c\u7325\u732c\u95f1\u6ca9\u6d27\u6da0\u9036\u5a13\u73ae\u97ea\u8ece\u709c\u7168\u71a8\u75ff\u8249\u9c94", "wen": "\u761f\u6e29\u868a\u6587\u95fb\u7eb9\u543b\u7a33\u7d0a\u95ee\u520e\u6120\u960c\u6c76\u74ba\u97eb\u6b81\u96ef", "weng": "\u55e1\u7fc1\u74ee\u84ca\u8579", "wo": "\u631d\u8717\u6da1\u7a9d\u6211\u65a1\u5367\u63e1\u6c83\u83b4\u5e44\u6e25\u674c\u809f\u9f8c", "wu": "\u5deb\u545c\u94a8\u4e4c\u6c61\u8bec\u5c4b\u65e0\u829c\u68a7\u543e\u5434\u6bcb\u6b66\u4e94\u6342\u5348\u821e\u4f0d\u4fae\u575e\u620a\u96fe\u6664\u7269\u52ff\u52a1\u609f\u8bef\u5140\u4ef5\u9622\u90ac\u572c\u82b4\u5e91\u6003\u5fe4\u6d6f\u5be4\u8fd5\u59a9\u9a9b\u727e\u7110\u9e49\u9e5c\u8708\u92c8\u9f2f", "xi": "\u6614\u7199\u6790\u897f\u7852\u77fd\u6670\u563b\u5438\u9521\u727a\u7a00\u606f\u5e0c\u6089\u819d\u5915\u60dc\u7184\u70ef\u6eaa\u6c50\u7280\u6a84\u88ad\u5e2d\u4e60\u5ab3\u559c\u94e3\u6d17\u7cfb\u9699\u620f\u7ec6\u50d6\u516e\u96b0\u90d7\u831c\u8478\u84f0\u595a\u550f\u5f99\u9969\u960b\u6d60\u6dc5\u5c63\u5b09\u73ba\u6a28\u66e6\u89cb\u6b37\u71b9\u798a\u79a7\u94b8\u7699\u7a78\u8725\u87cb\u823e\u7fb2\u7c9e\u7fd5\u91af\u9f37", "xia": "\u778e\u867e\u5323\u971e\u8f96\u6687\u5ce1\u4fa0\u72ed\u4e0b\u53a6\u590f\u5413\u6380\u846d\u55c4\u72ce\u9050\u7455\u7856\u7615\u7f45\u9ee0", "xian": "\u9528\u5148\u4ed9\u9c9c\u7ea4\u54b8\u8d24\u8854\u8237\u95f2\u6d8e\u5f26\u5acc\u663e\u9669\u73b0\u732e\u53bf\u817a\u9985\u7fa1\u5baa\u9677\u9650\u7ebf\u51bc\u85d3\u5c98\u7303\u66b9\u5a34\u6c19\u7946\u9e47\u75eb\u86ac\u7b45\u7c7c\u9170\u8df9", "xiang": "\u76f8\u53a2\u9576\u9999\u7bb1\u8944\u6e58\u4e61\u7fd4\u7965\u8be6\u60f3\u54cd\u4eab\u9879\u5df7\u6a61\u50cf\u5411\u8c61\u8297\u8459\u9977\u5ea0\u9aa7\u7f03\u87d3\u9c9e\u98e8", "xiao": "\u8427\u785d\u9704\u524a\u54ee\u56a3\u9500\u6d88\u5bb5\u6dc6\u6653\u5c0f\u5b5d\u6821\u8096\u5578\u7b11\u6548\u54d3\u54bb\u5d24\u6f47\u900d\u9a81\u7ee1\u67ad\u67b5\u7b71\u7bab\u9b48", "xie": "\u6954\u4e9b\u6b47\u874e\u978b\u534f\u631f\u643a\u90aa\u659c\u80c1\u8c10\u5199\u68b0\u5378\u87f9\u61c8\u6cc4\u6cfb\u8c22\u5c51\u5055\u4eb5\u52f0\u71ee\u85a4\u64b7\u5ee8\u7023\u9082\u7ec1\u7f2c\u69ad\u698d\u6b59\u8e9e", "xin": "\u85aa\u82af\u950c\u6b23\u8f9b\u65b0\u5ffb\u5fc3\u4fe1\u8845\u56df\u99a8\u8398\u6b46\u94fd\u946b", "xing": "\u661f\u8165\u7329\u60fa\u5174\u5211\u578b\u5f62\u90a2\u884c\u9192\u5e78\u674f\u6027\u59d3\u9649\u8347\u8365\u64e4\u60bb\u784e", "xiong": "\u5144\u51f6\u80f8\u5308\u6c79\u96c4\u718a\u828e", "xiu": "\u4f11\u4fee\u7f9e\u673d\u55c5\u9508\u79c0\u8896\u7ee3\u83a0\u5cab\u9990\u5ea5\u9e3a\u8c85\u9af9", "xu": "\u589f\u620c\u9700\u865a\u5618\u987b\u5f90\u8bb8\u84c4\u9157\u53d9\u65ed\u5e8f\u755c\u6064\u7d6e\u5a7f\u7eea\u7eed\u8bb4\u8be9\u5729\u84ff\u6035\u6d2b\u6e86\u987c\u6829\u7166\u7809\u76f1\u80e5\u7cc8\u9191", "xuan": "\u8f69\u55a7\u5ba3\u60ac\u65cb\u7384\u9009\u7663\u7729\u7eda\u5107\u8c16\u8431\u63ce\u9994\u6ceb\u6d35\u6e32\u6f29\u7487\u6966\u6684\u70ab\u714a\u78b9\u94c9\u955f\u75c3", "xue": "\u9774\u859b\u5b66\u7a74\u96ea\u8840\u5671\u6cf6\u9cd5", "xun": "\u52cb\u718f\u5faa\u65ec\u8be2\u5bfb\u9a6f\u5de1\u6b89\u6c5b\u8bad\u8baf\u900a\u8fc5\u5dfd\u57d9\u8340\u85b0\u5ccb\u5f87\u6d54\u66db\u7aa8\u91ba\u9c9f", "ya": "\u538b\u62bc\u9e26\u9e2d\u5440\u4e2b\u82bd\u7259\u869c\u5d16\u8859\u6daf\u96c5\u54d1\u4e9a\u8bb6\u4f22\u63e0\u5416\u5c88\u8fd3\u5a05\u740a\u6860\u6c29\u7811\u775a\u75d6", "yan": "\u7109\u54bd\u9609\u70df\u6df9\u76d0\u4e25\u7814\u8712\u5ca9\u5ef6\u8a00\u989c\u960e\u708e\u6cbf\u5944\u63a9\u773c\u884d\u6f14\u8273\u5830\u71d5\u538c\u781a\u96c1\u5501\u5f66\u7130\u5bb4\u8c1a\u9a8c\u53a3\u9765\u8d5d\u4fe8\u5043\u5156\u8ba0\u8c33\u90fe\u9122\u82ab\u83f8\u5d26\u6079\u95eb\u960f\u6d07\u6e6e\u6edf\u598d\u5ae3\u7430\u664f\u80ed\u814c\u7131\u7f68\u7b75\u917d\u9b47\u990d\u9f39", "yang": "\u6b83\u592e\u9e2f\u79e7\u6768\u626c\u4f6f\u75a1\u7f8a\u6d0b\u9633\u6c27\u4ef0\u75d2\u517b\u6837\u6f3e\u5f89\u600f\u6cf1\u7080\u70ca\u6059\u86d8\u9785", "yao": "\u9080\u8170\u5996\u7476\u6447\u5c27\u9065\u7a91\u8c23\u59da\u54ac\u8200\u836f\u8981\u8000\u592d\u723b\u5406\u5d3e\u5fad\u7039\u5e7a\u73e7\u6773\u66dc\u80b4\u9e5e\u7a88\u7e47\u9cd0", "ye": "\u6930\u564e\u8036\u7237\u91ce\u51b6\u4e5f\u9875\u6396\u4e1a\u53f6\u66f3\u814b\u591c\u6db2\u8c12\u90ba\u63f6\u9980\u6654\u70e8\u94d8", "yi": "\u4e00\u58f9\u533b\u63d6\u94f1\u4f9d\u4f0a\u8863\u9890\u5937\u9057\u79fb\u4eea\u80f0\u7591\u6c82\u5b9c\u59e8\u5f5d\u6905\u8681\u501a\u5df2\u4e59\u77e3\u4ee5\u827a\u6291\u6613\u9091\u5c79\u4ebf\u5f79\u81c6\u9038\u8084\u75ab\u4ea6\u88d4\u610f\u6bc5\u5fc6\u4e49\u76ca\u6ea2\u8be3\u8bae\u8c0a\u8bd1\u5f02\u7ffc\u7fcc\u7ece\u5208\u5293\u4f7e\u8bd2\u572a\u572f\u57f8\u61ff\u82e1\u858f\u5f08\u5955\u6339\u5f0b\u5453\u54a6\u54bf\u566b\u5cc4\u5db7\u7317\u9974\u603f\u6021\u6092\u6f2a\u8fe4\u9a7f\u7f22\u6baa\u8d3b\u65d6\u71a0\u9487\u9552\u9571\u75cd\u7617\u7654\u7fca\u8864\u8734\u8223\u7fbf\u7ff3\u914f\u9edf", "yin": "\u8335\u836b\u56e0\u6bb7\u97f3\u9634\u59fb\u541f\u94f6\u6deb\u5bc5\u996e\u5c39\u5f15\u9690\u5370\u80e4\u911e\u5819\u831a\u5591\u72fa\u5924\u6c24\u94df\u763e\u8693\u972a\u9f88", "ying": "\u82f1\u6a31\u5a74\u9e70\u5e94\u7f28\u83b9\u8424\u8425\u8367\u8747\u8fce\u8d62\u76c8\u5f71\u9896\u786c\u6620\u5b34\u90e2\u8314\u83ba\u8426\u6484\u5624\u81ba\u6ee2\u6f46\u701b\u745b\u748e\u6979\u9e66\u763f\u988d\u7f42", "yo": "\u54df\u5537", "yong": "\u62e5\u4f63\u81c3\u75c8\u5eb8\u96cd\u8e0a\u86f9\u548f\u6cf3\u6d8c\u6c38\u607f\u52c7\u7528\u4fd1\u58c5\u5889\u6175\u9095\u955b\u752c\u9cd9\u9954", "you": "\u5e7d\u4f18\u60a0\u5fe7\u5c24\u7531\u90ae\u94c0\u72b9\u6cb9\u6e38\u9149\u6709\u53cb\u53f3\u4f51\u91c9\u8bf1\u53c8\u5e7c\u5363\u6538\u4f91\u83b8\u5466\u56ff\u5ba5\u67da\u7337\u7256\u94d5\u75a3\u8763\u9c7f\u9edd\u9f2c", "yu": "\u8fc2\u6de4\u4e8e\u76c2\u6986\u865e\u611a\u8206\u4f59\u4fde\u903e\u9c7c\u6109\u6e1d\u6e14\u9685\u4e88\u5a31\u96e8\u4e0e\u5c7f\u79b9\u5b87\u8bed\u7fbd\u7389\u57df\u828b\u90c1\u5401\u9047\u55bb\u5cea\u5fa1\u6108\u6b32\u72f1\u80b2\u8a89\u6d74\u5bd3\u88d5\u9884\u8c6b\u9a6d\u79ba\u6bd3\u4f1b\u4fe3\u8c00\u8c15\u8438\u84e3\u63c4\u5581\u5704\u5709\u5d5b\u72f3\u996b\u5ebe\u9608\u59aa\u59a4\u7ea1\u745c\u6631\u89ce\u8174\u6b24\u65bc\u715c\u71e0\u807f\u94b0\u9e46\u7610\u7600\u7ab3\u8753\u7afd\u8201\u96e9\u9f89", "yuan": "\u9e33\u6e0a\u51a4\u5143\u57a3\u8881\u539f\u63f4\u8f95\u56ed\u5458\u5706\u733f\u6e90\u7f18\u8fdc\u82d1\u613f\u6028\u9662\u586c\u6c85\u5a9b\u7457\u6a7c\u7230\u7722\u9e22\u8788\u9f0b", "yue": "\u66f0\u7ea6\u8d8a\u8dc3\u94a5\u5cb3\u7ca4\u6708\u60a6\u9605\u9fa0\u6a3e\u5216\u94ba", "yun": "\u8018\u4e91\u90e7\u5300\u9668\u5141\u8fd0\u8574\u915d\u6655\u97f5\u5b55\u90d3\u82b8\u72c1\u607d\u7ead\u6b92\u6600\u6c32", "za": "\u531d\u7838\u6742\u62f6\u5482", "zai": "\u683d\u54c9\u707e\u5bb0\u8f7d\u518d\u5728\u54b1\u5d3d\u753e", "zan": "\u6512\u6682\u8d5e\u74d2\u661d\u7c2a\u7ccc\u8db1\u933e", "zang": "\u8d43\u810f\u846c\u5958\u6215\u81e7", "zao": "\u906d\u7cdf\u51ff\u85fb\u67a3\u65e9\u6fa1\u86a4\u8e81\u566a\u9020\u7682\u7076\u71e5\u5523\u7f2b", "ze": "\u8d23\u62e9\u5219\u6cfd\u4ec4\u8d5c\u5567\u8fee\u6603\u7b2e\u7ba6\u8234", "zei": "\u8d3c", "zen": "\u600e\u8c2e", "zeng": "\u589e\u618e\u66fe\u8d60\u7f2f\u7511\u7f7e\u9503", "zha": "\u624e\u55b3\u6e23\u672d\u8f67\u94e1\u95f8\u7728\u6805\u69a8\u548b\u4e4d\u70b8\u8bc8\u63f8\u5412\u54a4\u54f3\u600d\u781f\u75c4\u86b1\u9f44", "zhai": "\u6458\u658b\u5b85\u7a84\u503a\u5be8\u7826", "zhan": "\u77bb\u6be1\u8a79\u7c98\u6cbe\u76cf\u65a9\u8f97\u5d2d\u5c55\u8638\u6808\u5360\u6218\u7ad9\u6e5b\u7efd\u8c35\u640c\u65c3", "zhang": "\u6a1f\u7ae0\u5f70\u6f33\u5f20\u638c\u6da8\u6756\u4e08\u5e10\u8d26\u4ed7\u80c0\u7634\u969c\u4ec9\u9123\u5e5b\u5d82\u7350\u5adc\u748b\u87d1", "zhao": "\u62db\u662d\u627e\u6cbc\u8d75\u7167\u7f69\u5146\u8087\u53ec\u722a\u8bcf\u68f9\u948a\u7b0a", "zhe": "\u906e\u6298\u54f2\u86f0\u8f99\u8005\u9517\u8517\u8fd9\u6d59\u8c2a\u966c\u67d8\u8f84\u78d4\u9e67\u891a\u8707\u8d6d", "zhen": "\u73cd\u659f\u771f\u7504\u7827\u81fb\u8d1e\u9488\u4fa6\u6795\u75b9\u8bca\u9707\u632f\u9547\u9635\u7f1c\u6862\u699b\u8f78\u8d48\u80d7\u6715\u796f\u755b\u9e29", "zheng": "\u84b8\u6323\u7741\u5f81\u72f0\u4e89\u6014\u6574\u62ef\u6b63\u653f\u5e27\u75c7\u90d1\u8bc1\u8be4\u5ce5\u94b2\u94ee\u7b5d", "zhi": "\u829d\u679d\u652f\u5431\u8718\u77e5\u80a2\u8102\u6c41\u4e4b\u7ec7\u804c\u76f4\u690d\u6b96\u6267\u503c\u4f84\u5740\u6307\u6b62\u8dbe\u53ea\u65e8\u7eb8\u5fd7\u631a\u63b7\u81f3\u81f4\u7f6e\u5e1c\u5cd9\u5236\u667a\u79e9\u7a1a\u8d28\u7099\u75d4\u6ede\u6cbb\u7a92\u536e\u965f\u90c5\u57f4\u82b7\u646d\u5e19\u5fee\u5f58\u54ab\u9a98\u6809\u67b3\u6800\u684e\u8f75\u8f7e\u6534\u8d3d\u81a3\u7949\u7957\u9ef9\u96c9\u9e37\u75e3\u86ed\u7d77\u916f\u8dd6\u8e2c\u8e2f\u8c78\u89ef", "zhong": "\u4e2d\u76c5\u5fe0\u949f\u8877\u7ec8\u79cd\u80bf\u91cd\u4ef2\u4f17\u51a2\u953a\u87bd\u8202\u822f\u8e35", "zhou": "\u821f\u5468\u5dde\u6d32\u8bcc\u7ca5\u8f74\u8098\u5e1a\u5492\u76b1\u5b99\u663c\u9aa4\u5544\u7740\u501c\u8bf9\u836e\u9b3b\u7ea3\u80c4\u78a1\u7c40\u8233\u914e\u9cb7", "zhu": "\u73e0\u682a\u86db\u6731\u732a\u8bf8\u8bdb\u9010\u7af9\u70db\u716e\u62c4\u77a9\u5631\u4e3b\u8457\u67f1\u52a9\u86c0\u8d2e\u94f8\u7b51\u4f4f\u6ce8\u795d\u9a7b\u4f2b\u4f8f\u90be\u82ce\u8331\u6d19\u6e1a\u6f74\u9a7a\u677c\u69e0\u6a65\u70b7\u94e2\u75b0\u7603\u86b0\u7afa\u7bb8\u7fe5\u8e85\u9e88", "zhua": "\u6293", "zhuai": "\u62fd", "zhuan": "\u4e13\u7816\u8f6c\u64b0\u8d5a\u7bc6\u629f\u556d\u989b", "zhuang": "\u6869\u5e84\u88c5\u5986\u649e\u58ee\u72b6\u4e2c", "zhui": "\u690e\u9525\u8ffd\u8d58\u5760\u7f00\u8411\u9a93\u7f12", "zhun": "\u8c06\u51c6", "zhuo": "\u6349\u62d9\u5353\u684c\u7422\u8301\u914c\u707c\u6d4a\u502c\u8bfc\u5ef4\u855e\u64e2\u555c\u6d5e\u6dbf\u6753\u712f\u799a\u65ab", "zi": "\u5179\u54a8\u8d44\u59ff\u6ecb\u6dc4\u5b5c\u7d2b\u4ed4\u7c7d\u6ed3\u5b50\u81ea\u6e0d\u5b57\u8c18\u5d6b\u59ca\u5b73\u7f01\u6893\u8f8e\u8d40\u6063\u7726\u9531\u79ed\u8014\u7b2b\u7ca2\u89dc\u8a3e\u9cbb\u9aed", "zong": "\u9b03\u68d5\u8e2a\u5b97\u7efc\u603b\u7eb5\u8159\u7cbd", "zou": "\u90b9\u8d70\u594f\u63cd\u9139\u9cb0", "zu": "\u79df\u8db3\u5352\u65cf\u7956\u8bc5\u963b\u7ec4\u4fce\u83f9\u5550\u5f82\u9a75\u8e74", "zuan": "\u94bb\u7e82\u6525\u7f35", "zui": "\u5634\u9189\u6700\u7f6a", "zun": "\u5c0a\u9075\u6499\u6a3d\u9cdf", "zuo": "\u6628\u5de6\u4f50\u67de\u505a\u4f5c\u5750\u5ea7\u961d\u963c\u80d9\u795a\u9162", "cou": "\u85ae\u6971\u8f8f\u8160", "nang": "\u652e\u54dd\u56d4\u9995\u66e9", "o": "\u5594", "dia": "\u55f2", "chuai": "\u562c\u81aa\u8e39", "cen": "\u5c91\u6d94", "diu": "\u94e5", "nou": "\u8028", "fou": "\u7f36", "bia": "\u9adf" },
            pydic: "吖ā,阿ā,啊ā,锕ā,錒ā,嗄á,厑ae,哎āi,哀āi,唉āi,埃āi,挨āi,溾āi,锿āi,鎄āi,啀ái,捱ái,皑ái,凒ái,嵦ái,溰ái,嘊ái,敱ái,敳ái,皚ái,癌ái,娾ái,隑ái,剴ái,騃ái,毐ǎi,昹ǎi,矮ǎi,蔼ǎi,躷ǎi,濭ǎi,藹ǎi,譪ǎi,霭ǎi,靄ǎi,鯦ǎi,噯ài,艾ài,伌ài,爱ài,砹ài,硋ài,隘ài,嗌ài,塧ài,嫒ài,愛ài,碍ài,叆ài,暧ài,瑷ài,僾ài,壒ài,嬡ài,懓ài,薆ài,懝ài,曖ài,賹ài,餲ài,鴱ài,皧ài,瞹ài,馤ài,礙ài,譺ài,鑀ài,鱫ài,靉ài,閡ài,欬ài,焥ài,堨ài,乂ài,嗳ài,璦ài,安ān,侒ān,峖ān,桉ān,氨ān,庵ān,谙ān,媕ān,萻ān,葊ān,痷ān,腤ān,鹌ān,蓭ān,誝ān,鞌ān,鞍ān,盦ān,闇ān,馣ān,鮟ān,盫ān,鵪ān,韽ān,鶕ān,啽ān,厰ān,鴳ān,諳ān,玵án,雸án,儑án,垵ǎn,俺ǎn,唵ǎn,埯ǎn,铵ǎn,隌ǎn,揞ǎn,晻ǎn,罯ǎn,銨ǎn,碪ǎn,犴àn,岸àn,按àn,洝àn,荌àn,案àn,胺àn,豻àn,堓àn,婩àn,貋àn,錌àn,黯àn,頇àn,屽àn,垾àn,遃àn,暗àn,肮āng,骯āng,岇áng,昂áng,昻áng,卬áng,枊àng,盎àng,醠àng,凹āo,垇āo,柪āo,軪āo,爊āo,熝āo,眑āo,泑āo,梎āo,敖áo,厫áo,隞áo,嗷áo,嗸áo,嶅áo,廒áo,滶áo,獒áo,獓áo,遨áo,摮áo,璈áo,蔜áo,磝áo,翱áo,聱áo,螯áo,翶áo,謷áo,翺áo,鳌áo,鏖áo,鰲áo,鷔áo,鼇áo,慠áo,鏕áo,嚻áo,熬áo,抝ǎo,芺ǎo,袄ǎo,媪ǎo,镺ǎo,媼ǎo,襖ǎo,郩ǎo,鴁ǎo,蝹ǎo,坳ào,岙ào,扷ào,岰ào,傲ào,奡ào,奥ào,嫯ào,奧ào,澚ào,墺ào,嶴ào,澳ào,懊ào,擙ào,謸ào,鏊ào,驁ào,骜ào,吧ba,八bā,仈bā,巴bā,叭bā,扒bā,朳bā,玐bā,夿bā,岜bā,芭bā,疤bā,哵bā,捌bā,笆bā,粑bā,紦bā,羓bā,蚆bā,釟bā,鲃bā,魞bā,鈀bā,柭bā,丷bā,峇bā,豝bā,叐bá,犮bá,抜bá,坺bá,妭bá,拔bá,茇bá,炦bá,癹bá,胈bá,釛bá,菝bá,詙bá,跋bá,軷bá,颰bá,魃bá,墢bá,鼥bá,把bǎ,钯bǎ,靶bǎ,坝bà,弝bà,爸bà,罢bà,鲅bà,罷bà,鮁bà,覇bà,矲bà,霸bà,壩bà,灞bà,欛bà,鲌bà,鮊bà,皅bà,挀bāi,掰bāi,白bái,百bǎi,佰bǎi,柏bǎi,栢bǎi,捭bǎi,竡bǎi,粨bǎi,絔bǎi,摆bǎi,擺bǎi,襬bǎi,庍bài,拝bài,败bài,拜bài,敗bài,稗bài,粺bài,鞁bài,薭bài,贁bài,韛bài,扳bān,攽bān,朌bān,班bān,般bān,颁bān,斑bān,搬bān,斒bān,頒bān,瘢bān,螁bān,螌bān,褩bān,癍bān,辬bān,籓bān,肦bān,鳻bān,搫bān,阪bǎn,坂bǎn,岅bǎn,昄bǎn,板bǎn,版bǎn,钣bǎn,粄bǎn,舨bǎn,鈑bǎn,蝂bǎn,魬bǎn,覂bǎn,瓪bǎn,办bàn,半bàn,伴bàn,扮bàn,姅bàn,怑bàn,拌bàn,绊bàn,秚bàn,湴bàn,絆bàn,鉡bàn,靽bàn,辦bàn,瓣bàn,跘bàn,邦bāng,峀bāng,垹bāng,帮bāng,捠bāng,梆bāng,浜bāng,邫bāng,幚bāng,縍bāng,幫bāng,鞤bāng,幇bāng,绑bǎng,綁bǎng,榜bǎng,牓bǎng,膀bǎng,騯bǎng,玤bàng,蚌bàng,傍bàng,棒bàng,棓bàng,硥bàng,谤bàng,塝bàng,徬bàng,稖bàng,蒡bàng,蜯bàng,镑bàng,艕bàng,謗bàng,鎊bàng,埲bàng,蚄bàng,蛖bàng,嫎bàng,勹bāo,包bāo,佨bāo,孢bāo,胞bāo,剝bāo,笣bāo,煲bāo,龅bāo,蕔bāo,褒bāo,闁bāo,襃bāo,齙bāo,剥bāo,枹bāo,裦bāo,苞bāo,窇báo,嫑báo,雹báo,铇báo,薄báo,宝bǎo,怉bǎo,饱bǎo,保bǎo,鸨bǎo,珤bǎo,堡bǎo,堢bǎo,媬bǎo,葆bǎo,寚bǎo,飹bǎo,飽bǎo,褓bǎo,駂bǎo,鳵bǎo,緥bǎo,賲bǎo,藵bǎo,寳bǎo,寶bǎo,靌bǎo,宀bǎo,鴇bǎo,勽bào,报bào,抱bào,豹bào,菢bào,袌bào,報bào,鉋bào,鲍bào,靤bào,骲bào,暴bào,髱bào,虣bào,鮑bào,儤bào,曓bào,爆bào,忁bào,鑤bào,蚫bào,瀑bào,萡be,呗bei,唄bei,陂bēi,卑bēi,盃bēi,桮bēi,悲bēi,揹bēi,碑bēi,鹎bēi,藣bēi,鵯bēi,柸bēi,錍bēi,椑bēi,諀bēi,杯bēi,喺béi,北běi,鉳běi,垻bèi,贝bèi,狈bèi,貝bèi,邶bèi,备bèi,昁bèi,牬bèi,苝bèi,背bèi,钡bèi,俻bèi,倍bèi,悖bèi,狽bèi,被bèi,偝bèi,偹bèi,梖bèi,珼bèi,備bèi,僃bèi,惫bèi,焙bèi,琲bèi,軰bèi,辈bèi,愂bèi,碚bèi,禙bèi,蓓bèi,蛽bèi,犕bèi,褙bèi,誖bèi,骳bèi,輩bèi,鋇bèi,憊bèi,糒bèi,鞴bèi,鐾bèi,鐴bèi,杮bèi,韝bèi,棑bèi,哱bèi,鄁bèi,奔bēn,泍bēn,贲bēn,倴bēn,渀bēn,逩bēn,犇bēn,賁bēn,錛bēn,喯bēn,锛bēn,本běn,苯běn,奙běn,畚běn,楍běn,翉běn,夲běn,坌bèn,捹bèn,桳bèn,笨bèn,撪bèn,獖bèn,輽bèn,炃bèn,燌bèn,夯bèn,伻bēng,祊bēng,奟bēng,崩bēng,绷bēng,絣bēng,閍bēng,嵭bēng,痭bēng,嘣bēng,綳bēng,繃bēng,嗙bēng,挷bēng,傰bēng,搒bēng,甭béng,埄běng,菶běng,琣běng,鞛běng,琫běng,泵bèng,迸bèng,逬bèng,跰bèng,塴bèng,甏bèng,镚bèng,蹦bèng,鏰bèng,錋bèng,皀bī,屄bī,偪bī,毴bī,逼bī,豍bī,螕bī,鲾bī,鎞bī,鵖bī,鰏bī,悂bī,鈚bī,柲bí,荸bí,鼻bí,嬶bí,匕bǐ,比bǐ,夶bǐ,朼bǐ,佊bǐ,妣bǐ,沘bǐ,疕bǐ,彼bǐ,柀bǐ,秕bǐ,俾bǐ,笔bǐ,粃bǐ,粊bǐ,舭bǐ,啚bǐ,筆bǐ,鄙bǐ,聛bǐ,貏bǐ,箄bǐ,崥bǐ,魮bǐ,娝bǐ,箃bǐ,吡bǐ,匂bì,币bì,必bì,毕bì,闭bì,佖bì,坒bì,庇bì,诐bì,邲bì,妼bì,怭bì,枈bì,畀bì,苾bì,哔bì,毖bì,珌bì,疪bì,胇bì,荜bì,陛bì,毙bì,狴bì,畢bì,袐bì,铋bì,婢bì,庳bì,敝bì,梐bì,萆bì,萞bì,閇bì,閉bì,堛bì,弻bì,弼bì,愊bì,愎bì,湢bì,皕bì,禆bì,筚bì,貱bì,赑bì,嗶bì,彃bì,楅bì,滗bì,滭bì,煏bì,痹bì,痺bì,腷bì,蓖bì,蓽bì,蜌bì,裨bì,跸bì,鉍bì,閟bì,飶bì,幣bì,弊bì,熚bì,獙bì,碧bì,稫bì,箅bì,箆bì,綼bì,蔽bì,馝bì,幤bì,潷bì,獘bì,罼bì,襅bì,駜bì,髲bì,壁bì,嬖bì,廦bì,篦bì,篳bì,縪bì,薜bì,觱bì,避bì,鮅bì,斃bì,濞bì,臂bì,蹕bì,鞞bì,髀bì,奰bì,璧bì,鄨bì,饆bì,繴bì,襞bì,鏎bì,鞸bì,韠bì,躃bì,躄bì,魓bì,贔bì,驆bì,鷝bì,鷩bì,鼊bì,咇bì,鮩bì,畐bì,踾bì,鶝bì,闬bì,閈bì,祕bì,鴓bì,怶bì,旇bì,翍bì,肶bì,笓bì,鸊bì,肸bì,畁bì,詖bì,鄪bì,襣bì,边biān,砭biān,笾biān,猵biān,编biān,萹biān,煸biān,牑biān,甂biān,箯biān,編biān,蝙biān,獱biān,邉biān,鍽biān,鳊biān,邊biān,鞭biān,鯿biān,籩biān,糄biān,揙biān,臱biān,鯾biān,炞biǎn,贬biǎn,扁biǎn,窆biǎn,匾biǎn,貶biǎn,惼biǎn,碥biǎn,稨biǎn,褊biǎn,鴘biǎn,藊biǎn,釆biǎn,辧biǎn,疺biǎn,覵biǎn,鶣biǎn,卞biàn,弁biàn,忭biàn,抃biàn,汳biàn,汴biàn,苄biàn,峅biàn,便biàn,变biàn,変biàn,昪biàn,覍biàn,缏biàn,遍biàn,閞biàn,辡biàn,緶biàn,艑biàn,辨biàn,辩biàn,辫biàn,辮biàn,辯biàn,變biàn,彪biāo,标biāo,飑biāo,骉biāo,髟biāo,淲biāo,猋biāo,脿biāo,墂biāo,幖biāo,滮biāo,蔈biāo,骠biāo,標biāo,熛biāo,膘biāo,麃biāo,瘭biāo,镖biāo,飙biāo,飚biāo,儦biāo,颷biāo,瀌biāo,藨biāo,謤biāo,爂biāo,臕biāo,贆biāo,鏢biāo,穮biāo,镳biāo,飆biāo,飇biāo,飈biāo,飊biāo,驃biāo,鑣biāo,驫biāo,摽biāo,膔biāo,篻biāo,僄biāo,徱biāo,表biǎo,婊biǎo,裱biǎo,褾biǎo,錶biǎo,檦biǎo,諘biǎo,俵biào,鳔biào,鰾biào,憋biē,鳖biē,鱉biē,鼈biē,虌biē,龞biē,蟞biē,別bié,别bié,莂bié,蛂bié,徶bié,襒bié,蹩bié,穪bié,瘪biě,癟biě,彆biè,汃bīn,邠bīn,砏bīn,宾bīn,彬bīn,斌bīn,椕bīn,滨bīn,缤bīn,槟bīn,瑸bīn,豩bīn,賓bīn,賔bīn,镔bīn,儐bīn,濒bīn,濱bīn,濵bīn,虨bīn,豳bīn,璸bīn,瀕bīn,霦bīn,繽bīn,蠙bīn,鑌bīn,顮bīn,檳bīn,玢bīn,訜bīn,傧bīn,氞bìn,摈bìn,殡bìn,膑bìn,髩bìn,擯bìn,鬂bìn,臏bìn,髌bìn,鬓bìn,髕bìn,鬢bìn,殯bìn,仌bīng,氷bīng,冰bīng,兵bīng,栟bīng,掤bīng,梹bīng,鋲bīng,幷bīng,丙bǐng,邴bǐng,陃bǐng,怲bǐng,抦bǐng,秉bǐng,苪bǐng,昞bǐng,昺bǐng,柄bǐng,炳bǐng,饼bǐng,眪bǐng,窉bǐng,蛃bǐng,禀bǐng,鈵bǐng,鉼bǐng,鞆bǐng,餅bǐng,餠bǐng,燷bǐng,庰bǐng,偋bǐng,寎bǐng,綆bǐng,稟bǐng,癛bǐng,癝bǐng,琕bǐng,棅bǐng,并bìng,並bìng,併bìng,垪bìng,倂bìng,栤bìng,病bìng,竝bìng,傡bìng,摒bìng,誁bìng,靐bìng,疒bìng,啵bo,蔔bo,卜bo,噃bo,趵bō,癶bō,拨bō,波bō,玻bō,袚bō,袯bō,钵bō,饽bō,紴bō,缽bō,菠bō,碆bō,鉢bō,僠bō,嶓bō,撥bō,播bō,餑bō,磻bō,蹳bō,驋bō,鱍bō,帗bō,盋bō,脖bó,仢bó,伯bó,孛bó,犻bó,驳bó,帛bó,泊bó,狛bó,苩bó,侼bó,勃bó,胉bó,郣bó,亳bó,挬bó,浡bó,瓟bó,秡bó,钹bó,铂bó,桲bó,淿bó,舶bó,博bó,渤bó,湐bó,葧bó,鹁bó,愽bó,搏bó,猼bó,鈸bó,鉑bó,馎bó,僰bó,煿bó,箔bó,膊bó,艊bó,馛bó,駁bó,踣bó,鋍bó,镈bó,壆bó,馞bó,駮bó,豰bó,嚗bó,懪bó,礡bó,簙bó,鎛bó,餺bó,鵓bó,犦bó,髆bó,髉bó,欂bó,襮bó,礴bó,鑮bó,肑bó,茀bó,袹bó,穛bó,彴bó,瓝bó,牔bó,蚾bǒ,箥bǒ,跛bǒ,簸bò,孹bò,擘bò,檗bò,糪bò,譒bò,蘗bò,襎bò,檘bò,蔢bò,峬bū,庯bū,逋bū,钸bū,晡bū,鈽bū,誧bū,餔bū,鵏bū,秿bū,陠bū,鯆bū,轐bú,醭bú,不bú,輹bú,卟bǔ,补bǔ,哺bǔ,捕bǔ,補bǔ,鳪bǔ,獛bǔ,鸔bǔ,擈bǔ,佈bù,吥bù,步bù,咘bù,怖bù,歨bù,歩bù,钚bù,勏bù,埗bù,悑bù,捗bù,荹bù,部bù,埠bù,瓿bù,鈈bù,廍bù,蔀bù,踄bù,郶bù,篰bù,餢bù,簿bù,尃bù,箁bù,抪bù,柨bù,布bù,擦cā,攃cā,礤cǎ,礸cǎ,遪cà,偲cāi,猜cāi,揌cāi,才cái,材cái,财cái,財cái,戝cái,裁cái,采cǎi,倸cǎi,埰cǎi,婇cǎi,寀cǎi,彩cǎi,採cǎi,睬cǎi,跴cǎi,綵cǎi,踩cǎi,菜cài,棌cài,蔡cài,縩cài,乲cal,参cān,參cān,飡cān,骖cān,喰cān,湌cān,傪cān,嬠cān,餐cān,驂cān,嵾cān,飱cān,残cán,蚕cán,惭cán,殘cán,慚cán,蝅cán,慙cán,蠶cán,蠺cán,惨cǎn,慘cǎn,噆cǎn,憯cǎn,黪cǎn,黲cǎn,灿càn,粲càn,儏càn,澯càn,薒càn,燦càn,璨càn,爘càn,謲càn,仓cāng,沧cāng,苍cāng,倉cāng,舱cāng,凔cāng,嵢cāng,滄cāng,獊cāng,蒼cāng,濸cāng,艙cāng,螥cāng,罉cāng,藏cáng,欌cáng,鑶cáng,賶càng,撡cāo,操cāo,糙cāo,曺cáo,嘈cáo,嶆cáo,漕cáo,蓸cáo,槽cáo,褿cáo,艚cáo,螬cáo,鏪cáo,慒cáo,曹cáo,艹cǎo,艸cǎo,草cǎo,愺cǎo,懆cǎo,騲cǎo,慅cǎo,肏cào,鄵cào,襙cào,冊cè,册cè,侧cè,厕cè,恻cè,拺cè,测cè,荝cè,敇cè,側cè,粣cè,萗cè,廁cè,惻cè,測cè,策cè,萴cè,筞cè,蓛cè,墄cè,箣cè,憡cè,刂cè,厠cè,膥cēn,岑cén,梣cén,涔cén,硶cén,噌cēng,层céng,層céng,竲céng,驓céng,曾céng,蹭cèng,硛ceok,硳ceok,岾ceom,猠ceon,乽ceor,嚓chā,叉chā,扠chā,芆chā,杈chā,肞chā,臿chā,訍chā,偛chā,嗏chā,插chā,銟chā,锸chā,艖chā,疀chā,鍤chā,鎈chā,垞chá,查chá,査chá,茬chá,茶chá,嵖chá,猹chá,靫chá,槎chá,察chá,碴chá,褨chá,檫chá,搽chá,衩chǎ,镲chǎ,鑔chǎ,奼chà,汊chà,岔chà,侘chà,诧chà,剎chà,姹chà,差chà,紁chà,詫chà,拆chāi,钗chāi,釵chāi,犲chái,侪chái,柴chái,祡chái,豺chái,儕chái,喍chái,虿chài,袃chài,瘥chài,蠆chài,囆chài,辿chān,觇chān,梴chān,掺chān,搀chān,覘chān,裧chān,摻chān,鋓chān,幨chān,襜chān,攙chān,嚵chān,脠chān,婵chán,谗chán,孱chán,棎chán,湹chán,禅chán,馋chán,嬋chán,煘chán,缠chán,獑chán,蝉chán,誗chán,鋋chán,儃chán,廛chán,潹chán,潺chán,緾chán,磛chán,禪chán,毚chán,鄽chán,瀍chán,蟬chán,儳chán,劖chán,蟾chán,酁chán,壥chán,巉chán,瀺chán,纏chán,纒chán,躔chán,艬chán,讒chán,鑱chán,饞chán,繟chán,澶chán,镵chán,产chǎn,刬chǎn,旵chǎn,丳chǎn,浐chǎn,剗chǎn,谄chǎn,產chǎn,産chǎn,铲chǎn,阐chǎn,蒇chǎn,剷chǎn,嵼chǎn,摌chǎn,滻chǎn,幝chǎn,蕆chǎn,諂chǎn,閳chǎn,燀chǎn,簅chǎn,冁chǎn,醦chǎn,闡chǎn,囅chǎn,灛chǎn,讇chǎn,墠chǎn,骣chǎn,鏟chǎn,忏chàn,硟chàn,摲chàn,懴chàn,颤chàn,懺chàn,羼chàn,韂chàn,顫chàn,伥chāng,昌chāng,倀chāng,娼chāng,淐chāng,猖chāng,菖chāng,阊chāng,晿chāng,椙chāng,琩chāng,裮chāng,锠chāng,錩chāng,閶chāng,鲳chāng,鯧chāng,鼚chāng,兏cháng,肠cháng,苌cháng,尝cháng,偿cháng,常cháng,徜cháng,瓺cháng,萇cháng,甞cháng,腸cháng,嘗cháng,嫦cháng,瑺cháng,膓cháng,鋿cháng,償cháng,嚐cháng,蟐cháng,鲿cháng,鏛cháng,鱨cháng,棖cháng,尙cháng,厂chǎng,场chǎng,昶chǎng,場chǎng,敞chǎng,僘chǎng,廠chǎng,氅chǎng,鋹chǎng,惝chǎng,怅chàng,玚chàng,畅chàng,倡chàng,鬯chàng,唱chàng,悵chàng,暢chàng,畼chàng,誯chàng,韔chàng,抄chāo,弨chāo,怊chāo,欩chāo,钞chāo,焯chāo,超chāo,鈔chāo,繛chāo,樔chāo,绰chāo,綽chāo,綤chāo,牊cháo,巢cháo,巣cháo,朝cháo,鄛cháo,漅cháo,嘲cháo,潮cháo,窲cháo,罺cháo,轈cháo,晁cháo,吵chǎo,炒chǎo,眧chǎo,煼chǎo,麨chǎo,巐chǎo,粆chǎo,仦chào,耖chào,觘chào,趠chào,车chē,車chē,砗chē,唓chē,硨chē,蛼chē,莗chē,扯chě,偖chě,撦chě,彻chè,坼chè,迠chè,烢chè,聅chè,掣chè,硩chè,頙chè,徹chè,撤chè,澈chè,勶chè,瞮chè,爡chè,喢chè,賝chen,伧chen,傖chen,抻chēn,郴chēn,棽chēn,琛chēn,嗔chēn,綝chēn,諃chēn,尘chén,臣chén,忱chén,沉chén,辰chén,陈chén,茞chén,宸chén,烥chén,莐chén,陳chén,敐chén,晨chén,訦chén,谌chén,揨chén,煁chén,蔯chén,塵chén,樄chén,瘎chén,霃chén,螴chén,諶chén,麎chén,曟chén,鷐chén,薼chén,趻chěn,碜chěn,墋chěn,夦chěn,磣chěn,踸chěn,贂chěn,衬chèn,疢chèn,龀chèn,趁chèn,榇chèn,齓chèn,齔chèn,嚫chèn,谶chèn,襯chèn,讖chèn,瀋chèn,称chēng,稱chēng,阷chēng,泟chēng,柽chēng,爯chēng,棦chēng,浾chēng,偁chēng,蛏chēng,铛chēng,牚chēng,琤chēng,赪chēng,憆chēng,摚chēng,靗chēng,撐chēng,撑chēng,緽chēng,橕chēng,瞠chēng,赬chēng,頳chēng,檉chēng,竀chēng,蟶chēng,鏳chēng,鏿chēng,饓chēng,鐺chēng,丞chéng,成chéng,呈chéng,承chéng,枨chéng,诚chéng,郕chéng,乗chéng,城chéng,娍chéng,宬chéng,峸chéng,洆chéng,荿chéng,乘chéng,埕chéng,挰chéng,珹chéng,掁chéng,窚chéng,脭chéng,铖chéng,堘chéng,惩chéng,椉chéng,程chéng,筬chéng,絾chéng,裎chéng,塖chéng,溗chéng,碀chéng,誠chéng,畻chéng,酲chéng,鋮chéng,澄chéng,橙chéng,檙chéng,鯎chéng,瀓chéng,懲chéng,騬chéng,塍chéng,悜chěng,逞chěng,骋chěng,庱chěng,睈chěng,騁chěng,秤chèng,吃chī,妛chī,杘chī,侙chī,哧chī,蚩chī,鸱chī,瓻chī,眵chī,笞chī,訵chī,嗤chī,媸chī,摛chī,痴chī,瞝chī,螭chī,鴟chī,鵄chī,癡chī,魑chī,齝chī,攡chī,麶chī,彲chī,黐chī,蚳chī,摴chī,彨chī,弛chí,池chí,驰chí,迟chí,岻chí,茌chí,持chí,竾chí,淔chí,筂chí,貾chí,遅chí,馳chí,墀chí,踟chí,遲chí,篪chí,謘chí,尺chǐ,叺chǐ,呎chǐ,肔chǐ,卶chǐ,齿chǐ,垑chǐ,胣chǐ,恥chǐ,耻chǐ,蚇chǐ,豉chǐ,欼chǐ,歯chǐ,裭chǐ,鉹chǐ,褫chǐ,齒chǐ,侈chǐ,彳chì,叱chì,斥chì,灻chì,赤chì,饬chì,抶chì,勅chì,恜chì,炽chì,翄chì,翅chì,烾chì,痓chì,啻chì,湁chì,飭chì,傺chì,痸chì,腟chì,鉓chì,雴chì,憏chì,翤chì,遫chì,慗chì,瘛chì,翨chì,熾chì,懘chì,趩chì,饎chì,鶒chì,鷘chì,餝chì,歗chì,敕chì,充chōng,冲chōng,忡chōng,茺chōng,珫chōng,翀chōng,舂chōng,嘃chōng,摏chōng,憃chōng,憧chōng,衝chōng,罿chōng,艟chōng,蹖chōng,褈chōng,傭chōng,浺chōng,虫chóng,崇chóng,崈chóng,隀chóng,蟲chóng,宠chǒng,埫chǒng,寵chǒng,沖chòng,铳chòng,銃chòng,抽chōu,紬chōu,瘳chōu,篘chōu,犨chōu,犫chōu,跾chōu,掫chōu,仇chóu,俦chóu,栦chóu,惆chóu,绸chóu,菗chóu,畴chóu,絒chóu,愁chóu,皗chóu,稠chóu,筹chóu,酧chóu,酬chóu,綢chóu,踌chóu,儔chóu,雔chóu,嬦chóu,懤chóu,雠chóu,疇chóu,籌chóu,躊chóu,讎chóu,讐chóu,擣chóu,燽chóu,丑chǒu,丒chǒu,吜chǒu,杽chǒu,侴chǒu,瞅chǒu,醜chǒu,矁chǒu,魗chǒu,臭chòu,遚chòu,殠chòu,榋chu,橻chu,屮chū,出chū,岀chū,初chū,樗chū,貙chū,齣chū,刍chú,除chú,厨chú,滁chú,蒢chú,豠chú,锄chú,耡chú,蒭chú,蜍chú,趎chú,鉏chú,雏chú,犓chú,廚chú,篨chú,鋤chú,橱chú,懨chú,幮chú,櫉chú,蟵chú,躇chú,雛chú,櫥chú,蹰chú,鶵chú,躕chú,媰chú,杵chǔ,础chǔ,储chǔ,楮chǔ,禇chǔ,楚chǔ,褚chǔ,濋chǔ,儲chǔ,檚chǔ,璴chǔ,礎chǔ,齭chǔ,齼chǔ,処chǔ,椘chǔ,亍chù,处chù,竌chù,怵chù,拀chù,绌chù,豖chù,竐chù,俶chù,敊chù,珿chù,絀chù,處chù,傗chù,琡chù,搐chù,触chù,踀chù,閦chù,儊chù,憷chù,斶chù,歜chù,臅chù,黜chù,觸chù,矗chù,觕chù,畜chù,鄐chù,搋chuāi,揣chuāi,膗chuái,嘬chuài,踹chuài,膪chuài,巛chuān,川chuān,氚chuān,穿chuān,剶chuān,瑏chuān,传chuán,舡chuán,船chuán,猭chuán,遄chuán,傳chuán,椽chuán,歂chuán,暷chuán,輲chuán,甎chuán,舛chuǎn,荈chuǎn,喘chuǎn,僢chuǎn,堾chuǎn,踳chuǎn,汌chuàn,串chuàn,玔chuàn,钏chuàn,釧chuàn,賗chuàn,刅chuāng,炊chuī,龡chuī,圌chuí,垂chuí,桘chuí,陲chuí,捶chuí,菙chuí,棰chuí,槌chuí,锤chuí,箠chuí,顀chuí,錘chuí,鰆chun,旾chūn,杶chūn,春chūn,萅chūn,媋chūn,暙chūn,椿chūn,槆chūn,瑃chūn,箺chūn,蝽chūn,橁chūn,輴chūn,櫄chūn,鶞chūn,纯chún,陙chún,唇chún,浱chún,純chún,莼chún,淳chún,脣chún,犉chún,滣chún,鹑chún,漘chún,醇chún,醕chún,鯙chún,鶉chún,蒓chún,偆chǔn,萶chǔn,惷chǔn,睶chǔn,賰chǔn,蠢chǔn,踔chuō,戳chuō,啜chuò,辵chuò,娕chuò,娖chuò,惙chuò,涰chuò,逴chuò,辍chuò,酫chuò,龊chuò,擉chuò,磭chuò,歠chuò,嚽chuò,齪chuò,鑡chuò,齱chuò,婼chuò,鋜chuò,輟chuò,呲cī,玼cī,疵cī,趀cī,偨cī,縒cī,跐cī,髊cī,齹cī,枱cī,词cí,珁cí,垐cí,柌cí,祠cí,茨cí,瓷cí,詞cí,辝cí,慈cí,甆cí,辞cí,鈶cí,雌cí,鹚cí,糍cí,辤cí,飺cí,餈cí,嬨cí,濨cí,鴜cí,礠cí,辭cí,鶿cí,鷀cí,磁cí,此cǐ,佌cǐ,皉cǐ,朿cì,次cì,佽cì,刺cì,刾cì,庛cì,茦cì,栨cì,莿cì,絘cì,赐cì,螆cì,賜cì,蛓cì,嗭cis,囱cōng,匆cōng,囪cōng,苁cōng,忩cōng,枞cōng,茐cōng,怱cōng,悤cōng,棇cōng,焧cōng,葱cōng,楤cōng,漗cōng,聡cōng,蔥cōng,骢cōng,暰cōng,樅cōng,樬cōng,瑽cōng,璁cōng,聪cōng,瞛cōng,篵cōng,聰cōng,蟌cōng,繱cōng,鏦cōng,騘cōng,驄cōng,聦cōng,从cóng,從cóng,丛cóng,従cóng,婃cóng,孮cóng,徖cóng,悰cóng,淙cóng,琮cóng,漎cóng,誴cóng,賨cóng,賩cóng,樷cóng,藂cóng,叢cóng,灇cóng,欉cóng,爜cóng,憁còng,謥còng,凑còu,湊còu,楱còu,腠còu,辏còu,輳còu,粗cū,麁cū,麄cū,麤cū,徂cú,殂cú,蔖cǔ,促cù,猝cù,媨cù,瘄cù,蔟cù,誎cù,趗cù,憱cù,醋cù,瘯cù,簇cù,縬cù,鼀cù,蹴cù,蹵cù,顣cù,蹙cù,汆cuān,撺cuān,镩cuān,蹿cuān,攛cuān,躥cuān,鑹cuān,攅cuán,櫕cuán,巑cuán,攢cuán,窜cuàn,熶cuàn,篡cuàn,殩cuàn,篹cuàn,簒cuàn,竄cuàn,爨cuàn,乼cui,崔cuī,催cuī,凗cuī,墔cuī,摧cuī,榱cuī,獕cuī,磪cuī,鏙cuī,漼cuī,慛cuī,璀cuǐ,皠cuǐ,熣cuǐ,繀cuǐ,忰cuì,疩cuì,翆cuì,脃cuì,脆cuì,啐cuì,啛cuì,悴cuì,淬cuì,萃cuì,毳cuì,焠cuì,瘁cuì,粹cuì,膵cuì,膬cuì,竁cuì,臎cuì,琗cuì,粋cuì,脺cuì,翠cuì,邨cūn,村cūn,皴cūn,澊cūn,竴cūn,存cún,刌cǔn,忖cǔn,寸cùn,籿cùn,襊cuō,搓cuō,瑳cuō,遳cuō,磋cuō,撮cuō,蹉cuō,醝cuō,虘cuó,嵯cuó,痤cuó,矬cuó,蒫cuó,鹾cuó,鹺cuó,嵳cuó,脞cuǒ,剉cuò,剒cuò,厝cuò,夎cuò,挫cuò,莝cuò,莡cuò,措cuò,逪cuò,棤cuò,锉cuò,蓌cuò,错cuò,銼cuò,錯cuò,疸da,咑dā,哒dā,耷dā,畣dā,搭dā,嗒dā,噠dā,撘dā,鎝dā,笚dā,矺dā,褡dā,墶dá,达dá,迏dá,迖dá,妲dá,怛dá,垯dá,炟dá,羍dá,荅dá,荙dá,剳dá,匒dá,笪dá,逹dá,溚dá,答dá,詚dá,達dá,跶dá,瘩dá,靼dá,薘dá,鞑dá,燵dá,蟽dá,鎉dá,躂dá,鐽dá,韃dá,龖dá,龘dá,搨dá,繨dá,打dǎ,觰dǎ,大dà,亣dà,眔dà,橽dà,汏dà,呆dāi,獃dāi,懛dāi,歹dǎi,傣dǎi,逮dǎi,代dài,轪dài,侢dài,垈dài,岱dài,帒dài,甙dài,绐dài,迨dài,带dài,待dài,柋dài,殆dài,玳dài,贷dài,帯dài,軑dài,埭dài,帶dài,紿dài,蚮dài,袋dài,軚dài,貸dài,軩dài,瑇dài,廗dài,叇dài,曃dài,緿dài,鮘dài,鴏dài,戴dài,艜dài,黛dài,簤dài,蹛dài,瀻dài,霴dài,襶dài,靆dài,螮dài,蝳dài,跢dài,箉dài,骀dài,怠dài,黱dài,愖dān,丹dān,妉dān,单dān,担dān,単dān,眈dān,砃dān,耼dān,耽dān,郸dān,聃dān,躭dān,酖dān,單dān,媅dān,殚dān,瘅dān,匰dān,箪dān,褝dān,鄲dān,頕dān,儋dān,勯dān,擔dān,殫dān,癉dān,襌dān,簞dān,瓭dān,卩dān,亻dān,娊dān,噡dān,聸dān,伔dǎn,刐dǎn,狚dǎn,玬dǎn,胆dǎn,衴dǎn,紞dǎn,掸dǎn,亶dǎn,馾dǎn,撣dǎn,澸dǎn,黕dǎn,膽dǎn,丼dǎn,抌dǎn,赕dǎn,賧dǎn,黵dǎn,黮dǎn,繵dàn,譂dàn,旦dàn,但dàn,帎dàn,沊dàn,泹dàn,诞dàn,柦dàn,疍dàn,啖dàn,啗dàn,弹dàn,惮dàn,淡dàn,蛋dàn,啿dàn,氮dàn,腅dàn,蜑dàn,觛dàn,窞dàn,誕dàn,僤dàn,噉dàn,髧dàn,嘾dàn,彈dàn,憚dàn,憺dàn,澹dàn,禫dàn,餤dàn,駳dàn,鴠dàn,甔dàn,癚dàn,嚪dàn,贉dàn,霮dàn,饏dàn,蟺dàn,倓dàn,惔dàn,弾dàn,醈dàn,撢dàn,萏dàn,当dāng,珰dāng,裆dāng,筜dāng,儅dāng,噹dāng,澢dāng,璫dāng,襠dāng,簹dāng,艡dāng,蟷dāng,當dāng,挡dǎng,党dǎng,谠dǎng,擋dǎng,譡dǎng,黨dǎng,灙dǎng,欓dǎng,讜dǎng,氹dàng,凼dàng,圵dàng,宕dàng,砀dàng,垱dàng,荡dàng,档dàng,菪dàng,瓽dàng,逿dàng,潒dàng,碭dàng,瞊dàng,蕩dàng,趤dàng,壋dàng,檔dàng,璗dàng,盪dàng,礑dàng,簜dàng,蘯dàng,闣dàng,愓dàng,嵣dàng,偒dàng,雼dàng,裯dāo,刀dāo,叨dāo,屶dāo,忉dāo,氘dāo,舠dāo,釖dāo,鱽dāo,魛dāo,虭dāo,捯dáo,导dǎo,岛dǎo,陦dǎo,倒dǎo,宲dǎo,捣dǎo,祷dǎo,禂dǎo,搗dǎo,隝dǎo,嶋dǎo,嶌dǎo,槝dǎo,導dǎo,隯dǎo,壔dǎo,嶹dǎo,蹈dǎo,禱dǎo,菿dǎo,島dǎo,帱dào,幬dào,到dào,悼dào,盗dào,椡dào,盜dào,道dào,稲dào,翢dào,噵dào,稻dào,衜dào,檤dào,衟dào,翿dào,軇dào,瓙dào,纛dào,箌dào,的de,嘚dē,恴dé,得dé,淂dé,悳dé,惪dé,锝dé,徳dé,德dé,鍀dé,棏dé,揼dem,扥den,扽den,灯dēng,登dēng,豋dēng,噔dēng,嬁dēng,燈dēng,璒dēng,竳dēng,簦dēng,艠dēng,覴dēng,蹬dēng,墱dēng,戥děng,等děng,澂dèng,邓dèng,僜dèng,凳dèng,鄧dèng,隥dèng,嶝dèng,瞪dèng,磴dèng,镫dèng,櫈dèng,鐙dèng,仾dī,低dī,奃dī,彽dī,袛dī,啲dī,埞dī,羝dī,隄dī,堤dī,趆dī,嘀dī,滴dī,磾dī,鍉dī,鞮dī,氐dī,牴dī,碮dī,踧dí,镝dí,廸dí,狄dí,籴dí,苖dí,迪dí,唙dí,敌dí,涤dí,荻dí,梑dí,笛dí,觌dí,靮dí,滌dí,髢dí,嫡dí,蔋dí,蔐dí,頔dí,魡dí,敵dí,篴dí,嚁dí,藡dí,豴dí,糴dí,覿dí,鸐dí,藋dí,鬄dí,樀dí,蹢dí,鏑dí,泜dǐ,诋dǐ,邸dǐ,阺dǐ,呧dǐ,坻dǐ,底dǐ,弤dǐ,抵dǐ,拞dǐ,柢dǐ,砥dǐ,掋dǐ,菧dǐ,詆dǐ,軧dǐ,聜dǐ,骶dǐ,鯳dǐ,坘dǐ,厎dǐ,赿dì,地dì,弚dì,坔dì,弟dì,旳dì,杕dì,玓dì,怟dì,枤dì,苐dì,帝dì,埊dì,娣dì,递dì,逓dì,偙dì,啇dì,梊dì,焍dì,眱dì,祶dì,第dì,菂dì,谛dì,釱dì,媂dì,棣dì,睇dì,缔dì,蒂dì,僀dì,禘dì,腣dì,遞dì,鉪dì,馰dì,墑dì,墬dì,摕dì,碲dì,蝃dì,遰dì,慸dì,甋dì,締dì,嶳dì,諦dì,踶dì,弔dì,嵽dì,諟dì,珶dì,渧dì,蹏dì,揥dì,墆dì,疐dì,俤dì,蔕dì,嗲diǎ,敁diān,掂diān,傎diān,厧diān,嵮diān,滇diān,槙diān,瘨diān,颠diān,蹎diān,巅diān,顚diān,顛diān,癫diān,巓diān,巔diān,攧diān,癲diān,齻diān,槇diān,典diǎn,点diǎn,婰diǎn,敟diǎn,椣diǎn,碘diǎn,蒧diǎn,蕇diǎn,踮diǎn,點diǎn,痶diǎn,丶diǎn,奌diǎn,电diàn,佃diàn,甸diàn,坫diàn,店diàn,垫diàn,扂diàn,玷diàn,钿diàn,唸diàn,婝diàn,惦diàn,淀diàn,奠diàn,琔diàn,殿diàn,蜔diàn,鈿diàn,電diàn,墊diàn,橂diàn,澱diàn,靛diàn,磹diàn,癜diàn,簟diàn,驔diàn,腍diàn,橝diàn,壂diàn,刁diāo,叼diāo,汈diāo,刟diāo,凋diāo,奝diāo,弴diāo,彫diāo,蛁diāo,琱diāo,貂diāo,碉diāo,鳭diāo,殦diāo,雕diāo,鮉diāo,鲷diāo,簓diāo,鼦diāo,鯛diāo,鵰diāo,颩diāo,矵diāo,錭diāo,淍diāo,屌diǎo,鸼diǎo,鵃diǎo,扚diǎo,伄diào,吊diào,钓diào,窎diào,訋diào,调diào,掉diào,釣diào,铞diào,鈟diào,竨diào,銱diào,雿diào,調diào,瘹diào,窵diào,鋽diào,鑃diào,誂diào,嬥diào,絩diào,爹diē,跌diē,褺diē,跮dié,苵dié,迭dié,垤dié,峌dié,恎dié,绖dié,胅dié,瓞dié,眣dié,耊dié,啑dié,戜dié,谍dié,喋dié,堞dié,幉dié,惵dié,揲dié,畳dié,絰dié,耋dié,臷dié,詄dié,趃dié,叠dié,殜dié,牃dié,牒dié,镻dié,碟dié,蜨dié,褋dié,艓dié,蝶dié,諜dié,蹀dié,鲽dié,曡dié,鰈dié,疉dié,疊dié,氎dié,渉dié,崼dié,鮙dié,跕dié,鐡dié,怢dié,槢dié,挃dié,柣dié,螲dié,疂dié,眰diè,嚸dim,丁dīng,仃dīng,叮dīng,帄dīng,玎dīng,甼dīng,疔dīng,盯dīng,耵dīng,靪dīng,奵dīng,町dīng,虰dīng,酊dǐng,顶dǐng,頂dǐng,鼎dǐng,鼑dǐng,薡dǐng,鐤dǐng,顁dǐng,艼dǐng,濎dǐng,嵿dǐng,钉dìng,釘dìng,订dìng,忊dìng,饤dìng,矴dìng,定dìng,訂dìng,飣dìng,啶dìng,萣dìng,椗dìng,腚dìng,碇dìng,锭dìng,碠dìng,聢dìng,錠dìng,磸dìng,铤dìng,鋌dìng,掟dìng,丟diū,丢diū,铥diū,銩diū,东dōng,冬dōng,咚dōng,東dōng,苳dōng,昸dōng,氡dōng,倲dōng,鸫dōng,埬dōng,娻dōng,崬dōng,涷dōng,笗dōng,菄dōng,氭dōng,蝀dōng,鮗dōng,鼕dōng,鯟dōng,鶇dōng,鶫dōng,徚dōng,夂dōng,岽dōng,揰dǒng,董dǒng,墥dǒng,嬞dǒng,懂dǒng,箽dǒng,蕫dǒng,諌dǒng,湩dǒng,动dòng,冻dòng,侗dòng,垌dòng,峒dòng,峝dòng,恫dòng,挏dòng,栋dòng,洞dòng,胨dòng,迵dòng,凍dòng,戙dòng,胴dòng,動dòng,崠dòng,硐dòng,棟dòng,腖dòng,働dòng,詷dòng,駧dòng,霘dòng,狫dòng,烔dòng,絧dòng,衕dòng,勭dòng,騆dòng,姛dòng,瞗dōu,吺dōu,剅dōu,唗dōu,都dōu,兜dōu,兠dōu,蔸dōu,橷dōu,篼dōu,侸dōu,艔dóu,乧dǒu,阧dǒu,抖dǒu,枓dǒu,陡dǒu,蚪dǒu,鈄dǒu,斗dòu,豆dòu,郖dòu,浢dòu,荳dòu,逗dòu,饾dòu,鬥dòu,梪dòu,毭dòu,脰dòu,酘dòu,痘dòu,閗dòu,窦dòu,鬦dòu,鋀dòu,餖dòu,斣dòu,闘dòu,竇dòu,鬪dòu,鬭dòu,凟dòu,鬬dòu,剢dū,阇dū,嘟dū,督dū,醏dū,闍dū,厾dū,毒dú,涜dú,读dú,渎dú,椟dú,牍dú,犊dú,裻dú,読dú,獨dú,錖dú,匵dú,嬻dú,瀆dú,櫝dú,殰dú,牘dú,犢dú,瓄dú,皾dú,騳dú,讀dú,豄dú,贕dú,韣dú,髑dú,鑟dú,韇dú,韥dú,黷dú,讟dú,独dú,樚dú,襡dú,襩dú,黩dú,笃dǔ,堵dǔ,帾dǔ,琽dǔ,赌dǔ,睹dǔ,覩dǔ,賭dǔ,篤dǔ,暏dǔ,笁dǔ,陼dǔ,芏dù,妒dù,杜dù,肚dù,妬dù,度dù,荰dù,秺dù,渡dù,镀dù,螙dù,殬dù,鍍dù,蠧dù,蠹dù,剫dù,晵dù,靯dù,篅duān,偳duān,媏duān,端duān,褍duān,鍴duān,剬duān,短duǎn,段duàn,断duàn,塅duàn,缎duàn,葮duàn,椴duàn,煅duàn,瑖duàn,腶duàn,碫duàn,锻duàn,緞duàn,毈duàn,簖duàn,鍛duàn,斷duàn,躖duàn,煆duàn,籪duàn,叾dug,搥duī,鎚duī,垖duī,堆duī,塠duī,嵟duī,痽duī,磓duī,頧duī,鴭duī,鐜duī,埻duī,謉duǐ,錞duì,队duì,对duì,兊duì,兌duì,兑duì,対duì,祋duì,怼duì,陮duì,隊duì,碓duì,綐duì,對duì,憝duì,濧duì,薱duì,镦duì,懟duì,瀩duì,譈duì,譵duì,憞duì,鋭duì,杸duì,吨dūn,惇dūn,敦dūn,蜳dūn,墩dūn,墪dūn,壿dūn,撴dūn,獤dūn,噸dūn,撉dūn,橔dūn,犜dūn,礅dūn,蹲dūn,蹾dūn,驐dūn,鐓dūn,盹dǔn,趸dǔn,躉dǔn,伅dùn,囤dùn,庉dùn,沌dùn,炖dùn,盾dùn,砘dùn,逇dùn,钝dùn,遁dùn,鈍dùn,腞dùn,頓dùn,碷dùn,遯dùn,潡dùn,燉dùn,踲dùn,楯dùn,腯dùn,顿dùn,多duō,夛duō,咄duō,哆duō,茤duō,剟duō,崜duō,敠duō,毲duō,裰duō,嚉duō,掇duō,仛duó,夺duó,铎duó,敓duó,敚duó,喥duó,敪duó,鈬duó,奪duó,凙duó,踱duó,鮵duó,鐸duó,跿duó,沰duó,痥duó,奲duǒ,朵duǒ,朶duǒ,哚duǒ,垛duǒ,挅duǒ,挆duǒ,埵duǒ,缍duǒ,椯duǒ,趓duǒ,躱duǒ,躲duǒ,綞duǒ,亸duǒ,鬌duǒ,嚲duǒ,垜duǒ,橢duǒ,硾duǒ,吋duò,刴duò,剁duò,沲duò,陊duò,陏duò,饳duò,柮duò,桗duò,堕duò,舵duò,惰duò,跥duò,跺duò,飿duò,墮duò,嶞duò,憜duò,墯duò,鵽duò,隓duò,貀duò,詑duò,駄duò,媠duò,嫷duò,尮duò,呃e,妸ē,妿ē,娿ē,婀ē,匼ē,讹é,吪é,囮é,迗é,俄é,娥é,峨é,峩é,涐é,莪é,珴é,訛é,睋é,鈋é,锇é,鹅é,蛾é,磀é,誐é,鋨é,頟é,额é,魤é,額é,鵝é,鵞é,譌é,騀é,佮é,鰪é,皒é,欸ě,枙ě,砈ě,鵈ě,玀ě,閜ě,砵è,惡è,厄è,歺è,屵è,戹è,岋è,阨è,扼è,阸è,呝è,砐è,轭è,咢è,咹è,垩è,姶è,峉è,匎è,恶è,砨è,蚅è,饿è,偔è,卾è,堊è,悪è,硆è,谔è,軛è,鄂è,阏è,堮è,崿è,愕è,湂è,萼è,豟è,軶è,遏è,廅è,搤è,搹è,琧è,腭è,詻è,僫è,蝁è,锷è,鹗è,蕚è,遻è,頞è,颚è,餓è,噩è,擜è,覨è,諤è,餩è,鍔è,鳄è,歞è,顎è,櫮è,鰐è,鶚è,讍è,齶è,鱷è,齃è,啈è,搕è,礘è,魥è,蘁è,齾è,苊è,遌è,鑩è,诶ēi,誒ēi,奀ēn,恩ēn,蒽ēn,煾ēn,唔én,峎ěn,摁èn,嗯èn,鞥eng,仒eo,乻eol,旕eos,儿ér,而ér,児ér,侕ér,兒ér,陑ér,峏ér,洏ér,耏ér,荋ér,栭ér,胹ér,唲ér,袻ér,鸸ér,粫ér,聏ér,輀ér,隭ér,髵ér,鮞ér,鴯ér,轜ér,咡ér,杒ér,陾ér,輭ér,鲕ér,尒ěr,尓ěr,尔ěr,耳ěr,迩ěr,洱ěr,饵ěr,栮ěr,毦ěr,珥ěr,铒ěr,爾ěr,鉺ěr,餌ěr,駬ěr,薾ěr,邇ěr,趰ěr,嬭ěr,二èr,弍èr,弐èr,佴èr,刵èr,贰èr,衈èr,貳èr,誀èr,樲èr,髶èr,貮èr,发fā,沷fā,発fā,發fā,彂fā,髪fā,橃fā,醗fā,乏fá,伐fá,姂fá,垡fá,罚fá,阀fá,栰fá,傠fá,筏fá,瞂fá,罰fá,閥fá,罸fá,藅fá,汎fá,佱fǎ,法fǎ,鍅fǎ,灋fǎ,砝fǎ,珐fà,琺fà,髮fà,蕟fà,帆fān,忛fān,犿fān,番fān,勫fān,墦fān,嬏fān,幡fān,憣fān,旙fān,旛fān,翻fān,藩fān,轓fān,颿fān,飜fān,鱕fān,蕃fān,凡fán,凢fán,凣fán,匥fán,杋fán,柉fán,籵fán,钒fán,舤fán,烦fán,舧fán,笲fán,釩fán,棥fán,煩fán,緐fán,樊fán,橎fán,燔fán,璠fán,薠fán,繁fán,繙fán,羳fán,蹯fán,瀿fán,礬fán,蘩fán,鐇fán,蠜fán,鷭fán,氾fán,瀪fán,渢fán,伋fán,舩fán,矾fán,反fǎn,仮fǎn,辺fǎn,返fǎn,攵fǎn,犭fǎn,払fǎn,犯fàn,奿fàn,泛fàn,饭fàn,范fàn,贩fàn,畈fàn,訉fàn,軓fàn,梵fàn,盕fàn,笵fàn,販fàn,軬fàn,飯fàn,飰fàn,滼fàn,嬎fàn,範fàn,嬔fàn,婏fàn,方fāng,邡fāng,坊fāng,芳fāng,牥fāng,钫fāng,淓fāng,堏fāng,鈁fāng,錺fāng,鴋fāng,埅fāng,枋fāng,防fáng,妨fáng,房fáng,肪fáng,鲂fáng,魴fáng,仿fǎng,访fǎng,纺fǎng,昉fǎng,昘fǎng,瓬fǎng,眆fǎng,倣fǎng,旊fǎng,紡fǎng,舫fǎng,訪fǎng,髣fǎng,鶭fǎng,放fàng,飞fēi,妃fēi,非fēi,飛fēi,啡fēi,婓fēi,婔fēi,渄fēi,绯fēi,菲fēi,扉fēi,猆fēi,靟fēi,裶fēi,緋fēi,蜚fēi,霏fēi,鲱fēi,餥fēi,馡fēi,騑fēi,騛fēi,鯡fēi,飝fēi,奜fēi,肥féi,淝féi,暃féi,腓féi,蜰féi,棐féi,萉féi,蟦féi,朏fěi,胐fěi,匪fěi,诽fěi,悱fěi,斐fěi,榧fěi,翡fěi,蕜fěi,誹fěi,篚fěi,襏fèi,吠fèi,废fèi,沸fèi,狒fèi,肺fèi,昲fèi,费fèi,俷fèi,剕fèi,厞fèi,疿fèi,屝fèi,廃fèi,費fèi,痱fèi,廢fèi,曊fèi,癈fèi,鼣fèi,濷fèi,櫠fèi,鐨fèi,靅fèi,蕡fèi,芾fèi,笰fèi,紼fèi,髴fèi,柹fèi,胏fèi,镄fèi,吩fēn,帉fēn,纷fēn,芬fēn,昐fēn,氛fēn,竕fēn,紛fēn,翂fēn,棻fēn,躮fēn,酚fēn,鈖fēn,雰fēn,朆fēn,餴fēn,饙fēn,錀fēn,坟fén,妢fén,岎fén,汾fén,枌fén,梤fén,羒fén,蚠fén,蚡fén,棼fén,焚fén,蒶fén,馚fén,隫fén,墳fén,幩fén,魵fén,橨fén,燓fén,豮fén,鼢fén,羵fén,鼖fén,豶fén,轒fén,馩fén,黂fén,鐼fén,粉fěn,瞓fěn,黺fěn,分fèn,份fèn,坋fèn,弅fèn,奋fèn,忿fèn,秎fèn,偾fèn,愤fèn,粪fèn,僨fèn,憤fèn,奮fèn,膹fèn,糞fèn,鲼fèn,瀵fèn,鱝fèn,丰fēng,风fēng,仹fēng,凨fēng,凬fēng,妦fēng,沣fēng,沨fēng,枫fēng,封fēng,疯fēng,盽fēng,砜fēng,風fēng,峯fēng,峰fēng,偑fēng,桻fēng,烽fēng,琒fēng,崶fēng,溄fēng,猦fēng,葑fēng,锋fēng,楓fēng,犎fēng,蜂fēng,瘋fēng,碸fēng,僼fēng,篈fēng,鄷fēng,鋒fēng,檒fēng,豐fēng,鎽fēng,酆fēng,寷fēng,灃fēng,蘴fēng,靊fēng,飌fēng,麷fēng,豊fēng,凮fēng,鏠fēng,冯féng,捀féng,浲féng,逢féng,堸féng,馮féng,綘féng,缝féng,艂féng,縫féng,讽fěng,唪fěng,諷fěng,凤fèng,奉fèng,甮fèng,俸fèng,湗fèng,焨fèng,煈fèng,鳯fèng,鳳fèng,鴌fèng,賵fèng,蘕fèng,赗fèng,覅fiao,仏fó,佛fó,坲fó,梻fó,垺fóu,紑fóu,缶fǒu,否fǒu,缹fǒu,缻fǒu,雬fǒu,鴀fǒu,芣fǒu,夫fū,邞fū,呋fū,姇fū,枎fū,玞fū,肤fū,怤fū,砆fū,胕fū,荂fū,衭fū,娐fū,荴fū,旉fū,紨fū,趺fū,酜fū,麸fū,稃fū,跗fū,鈇fū,筟fū,綒fū,鄜fū,孵fū,豧fū,敷fū,膚fū,鳺fū,麩fū,糐fū,麬fū,麱fū,懯fū,烰fū,琈fū,粰fū,璷fū,伕fú,乀fú,伏fú,凫fú,甶fú,冹fú,刜fú,孚fú,扶fú,芙fú,咈fú,岪fú,彿fú,怫fú,拂fú,服fú,泭fú,绂fú,绋fú,苻fú,俘fú,垘fú,柫fú,氟fú,洑fú,炥fú,玸fú,祓fú,罘fú,茯fú,郛fú,韨fú,鳬fú,哹fú,栿fú,浮fú,畗fú,砩fú,蚨fú,匐fú,桴fú,涪fú,符fú,紱fú,翇fú,艴fú,菔fú,虙fú,袱fú,幅fú,棴fú,罦fú,葍fú,福fú,綍fú,艀fú,蜉fú,辐fú,鉘fú,鉜fú,颫fú,鳧fú,榑fú,稪fú,箙fú,複fú,韍fú,幞fú,澓fú,蝠fú,鴔fú,諨fú,輻fú,鮄fú,癁fú,鮲fú,黻fú,鵩fú,坿fú,汱fú,酻fú,弗fú,畉fú,絥fú,抚fǔ,甫fǔ,府fǔ,弣fǔ,拊fǔ,斧fǔ,俌fǔ,郙fǔ,俯fǔ,釜fǔ,釡fǔ,捬fǔ,辅fǔ,椨fǔ,焤fǔ,盙fǔ,腑fǔ,滏fǔ,腐fǔ,輔fǔ,撫fǔ,鬴fǔ,簠fǔ,黼fǔ,蚥fǔ,窗chuāng,窻chuāng,傸chuǎng,创chuàng,創chuàng,庄zhuāng,妝zhuāng,荘zhuāng,娤zhuāng,桩zhuāng,讣fù,付fù,妇fù,负fù,附fù,咐fù,竎fù,阜fù,驸fù,复fù,峊fù,祔fù,訃fù,負fù,赴fù,袝fù,偩fù,冨fù,副fù,婦fù,蚹fù,傅fù,媍fù,富fù,復fù,蛗fù,覄fù,詂fù,赋fù,椱fù,缚fù,腹fù,鲋fù,禣fù,褔fù,赙fù,緮fù,蕧fù,蝜fù,蝮fù,賦fù,駙fù,縛fù,鮒fù,賻fù,鍑fù,鍢fù,鳆fù,覆fù,馥fù,鰒fù,軵fù,邚fù,柎fù,父fù,萯fù,旮gā,伽gā,嘎gā,夾gā,呷gā,钆gá,尜gá,釓gá,噶gá,錷gá,嘠gá,尕gǎ,玍gǎ,尬gà,魀gà,侅gāi,该gāi,郂gāi,陔gāi,垓gāi,姟gāi,峐gāi,荄gāi,晐gāi,赅gāi,畡gāi,祴gāi,絯gāi,該gāi,豥gāi,賅gāi,賌gāi,忋gǎi,改gǎi,鎅gǎi,絠gǎi,丐gài,乢gài,匃gài,匄gài,钙gài,盖gài,摡gài,溉gài,葢gài,鈣gài,戤gài,概gài,蓋gài,槩gài,槪gài,漑gài,瓂gài,甘gān,忓gān,芉gān,迀gān,攼gān,玕gān,肝gān,坩gān,泔gān,柑gān,竿gān,疳gān,酐gān,粓gān,亁gān,凲gān,尲gān,尴gān,筸gān,漧gān,鳱gān,尶gān,尷gān,魐gān,矸gān,虷gān,釬gān,乹gān,諴gān,飦gān,苷gān,杆gǎn,仠gǎn,皯gǎn,秆gǎn,衦gǎn,赶gǎn,敢gǎn,桿gǎn,笴gǎn,稈gǎn,感gǎn,澉gǎn,趕gǎn,橄gǎn,擀gǎn,簳gǎn,鱤gǎn,篢gǎn,豃gǎn,扞gǎn,鰔gǎn,扜gǎn,鳡gǎn,干gàn,旰gàn,汵gàn,盰gàn,绀gàn,倝gàn,凎gàn,淦gàn,紺gàn,詌gàn,骭gàn,幹gàn,檊gàn,赣gàn,贛gàn,灨gàn,贑gàn,佄gàn,錎gàn,棡gang,冈gāng,罓gāng,冮gāng,刚gāng,阬gāng,纲gāng,肛gāng,岡gāng,牨gāng,疘gāng,矼gāng,钢gāng,剛gāng,罡gāng,堈gāng,釭gāng,犅gāng,堽gāng,綱gāng,罁gāng,鋼gāng,鎠gāng,頏gāng,缸gāng,岗gǎng,崗gǎng,港gǎng,犺gǎng,掆gàng,杠gàng,焵gàng,筻gàng,槓gàng,戆gàng,戇gàng,戅gàng,皋gāo,羔gāo,高gāo,皐gāo,髙gāo,臯gāo,滜gāo,睾gāo,膏gāo,槹gāo,橰gāo,篙gāo,糕gāo,餻gāo,櫜gāo,韟gāo,鷎gāo,鼛gāo,鷱gāo,獋gāo,槔gāo,夰gǎo,杲gǎo,菒gǎo,稁gǎo,搞gǎo,缟gǎo,槀gǎo,槁gǎo,獔gǎo,稾gǎo,稿gǎo,镐gǎo,縞gǎo,藁gǎo,檺gǎo,藳gǎo,鎬gǎo,筶gǎo,澔gǎo,吿gào,勂gào,诰gào,郜gào,峼gào,祮gào,祰gào,锆gào,暠gào,禞gào,誥gào,鋯gào,告gào,戈gē,圪gē,犵gē,纥gē,戓gē,肐gē,牫gē,疙gē,牱gē,紇gē,哥gē,胳gē,袼gē,鸽gē,割gē,搁gē,彁gē,歌gē,戨gē,鴐gē,鴚gē,擱gē,謌gē,鴿gē,鎶gē,咯gē,滒gē,杚gé,呄gé,匌gé,挌gé,阁gé,革gé,敋gé,格gé,鬲gé,愅gé,臵gé,裓gé,隔gé,嗝gé,塥gé,滆gé,觡gé,搿gé,膈gé,閣gé,镉gé,鞈gé,韐gé,骼gé,諽gé,鮯gé,櫊gé,鎘gé,韚gé,轕gé,鞷gé,騔gé,秴gé,詥gé,佫gé,嘅gé,猲gé,槅gé,閤gě,葛gě,哿gě,舸gě,鲄gě,个gè,各gè,虼gè,個gè,硌gè,铬gè,箇gè,鉻gè,獦gè,吤gè,给gěi,給gěi,根gēn,跟gēn,哏gén,亘gèn,艮gèn,茛gèn,揯gèn,搄gèn,亙gèn,刯gēng,庚gēng,畊gēng,浭gēng,耕gēng,掶gēng,菮gēng,椩gēng,焿gēng,絚gēng,赓gēng,鹒gēng,緪gēng,縆gēng,賡gēng,羹gēng,鶊gēng,絙gēng,郠gěng,哽gěng,埂gěng,峺gěng,挭gěng,耿gěng,莄gěng,梗gěng,鲠gěng,骾gěng,鯁gěng,郉gěng,绠gěng,更gèng,堩gèng,暅gèng,啹geu,喼gib,嗰go,工gōng,弓gōng,公gōng,厷gōng,功gōng,攻gōng,杛gōng,糼gōng,肱gōng,宫gōng,宮gōng,恭gōng,蚣gōng,躬gōng,龚gōng,匑gōng,塨gōng,愩gōng,觥gōng,躳gōng,匔gōng,碽gōng,髸gōng,觵gōng,龔gōng,魟gōng,幊gōng,巩gǒng,汞gǒng,拱gǒng,唝gǒng,拲gǒng,栱gǒng,珙gǒng,輁gǒng,鞏gǒng,嗊gǒng,銾gǒng,供gòng,共gòng,贡gòng,羾gòng,貢gòng,慐gòng,熕gòng,渱gòng,勾gōu,沟gōu,钩gōu,袧gōu,缑gōu,鈎gōu,溝gōu,鉤gōu,緱gōu,褠gōu,篝gōu,簼gōu,鞲gōu,冓gōu,搆gōu,抅gōu,泃gōu,軥gōu,鴝gōu,鸜gōu,佝gōu,岣gǒu,狗gǒu,苟gǒu,枸gǒu,玽gǒu,耇gǒu,耉gǒu,笱gǒu,耈gǒu,蚼gǒu,豿gǒu,坸gòu,构gòu,诟gòu,购gòu,垢gòu,姤gòu,够gòu,夠gòu,訽gòu,媾gòu,彀gòu,詬gòu,遘gòu,雊gòu,構gòu,煹gòu,觏gòu,撀gòu,覯gòu,購gòu,傋gòu,茩gòu,估gū,咕gū,姑gū,孤gū,沽gū,泒gū,柧gū,轱gū,唂gū,唃gū,罛gū,鸪gū,笟gū,菇gū,蛄gū,蓇gū,觚gū,軱gū,軲gū,辜gū,酤gū,毂gū,箍gū,箛gū,嫴gū,篐gū,橭gū,鮕gū,鴣gū,轂gū,苽gū,菰gū,鶻gú,鹘gǔ,古gǔ,扢gǔ,汩gǔ,诂gǔ,谷gǔ,股gǔ,峠gǔ,牯gǔ,骨gǔ,罟gǔ,逧gǔ,钴gǔ,傦gǔ,啒gǔ,淈gǔ,脵gǔ,蛊gǔ,蛌gǔ,尳gǔ,愲gǔ,焸gǔ,硲gǔ,詁gǔ,馉gǔ,榾gǔ,鈷gǔ,鼓gǔ,鼔gǔ,嘏gǔ,榖gǔ,皷gǔ,縎gǔ,糓gǔ,薣gǔ,濲gǔ,臌gǔ,餶gǔ,瀔gǔ,瞽gǔ,抇gǔ,嗀gǔ,羖gǔ,固gù,怘gù,故gù,凅gù,顾gù,堌gù,崓gù,崮gù,梏gù,牿gù,棝gù,祻gù,雇gù,痼gù,稒gù,锢gù,頋gù,僱gù,錮gù,鲴gù,鯝gù,顧gù,盬gù,瓜guā,刮guā,胍guā,鸹guā,焻guā,煱guā,颪guā,趏guā,劀guā,緺guā,銽guā,鴰guā,騧guā,呱guā,諣guā,栝guā,歄guā,冎guǎ,叧guǎ,剐guǎ,剮guǎ,啩guǎ,寡guǎ,卦guà,坬guà,诖guà,挂guà,掛guà,罣guà,絓guà,罫guà,褂guà,詿guà,乖guāi,拐guǎi,枴guǎi,柺guǎi,夬guài,叏guài,怪guài,恠guài,关guān,观guān,官guān,覌guān,倌guān,萖guān,棺guān,蒄guān,窤guān,瘝guān,癏guān,観guān,鳏guān,關guān,鰥guān,觀guān,鱞guān,馆guǎn,痯guǎn,筦guǎn,管guǎn,舘guǎn,錧guǎn,館guǎn,躀guǎn,鳤guǎn,輨guǎn,冠guàn,卝guàn,毌guàn,丱guàn,贯guàn,泴guàn,悺guàn,惯guàn,掼guàn,涫guàn,貫guàn,悹guàn,祼guàn,慣guàn,摜guàn,潅guàn,遦guàn,樌guàn,盥guàn,罆guàn,雚guàn,鏆guàn,灌guàn,爟guàn,瓘guàn,矔guàn,鹳guàn,罐guàn,鑵guàn,鸛guàn,鱹guàn,懽guàn,礶guàn,光guāng,灮guāng,侊guāng,炗guāng,炚guāng,炛guāng,咣guāng,垙guāng,姯guāng,洸guāng,茪guāng,桄guāng,烡guāng,珖guāng,胱guāng,硄guāng,僙guāng,輄guāng,銧guāng,黆guāng,欟guāng,趪guāng,挄guāng,广guǎng,広guǎng,犷guǎng,廣guǎng,臩guǎng,獷guǎng,俇guàng,逛guàng,臦guàng,撗guàng,櫎guàng,归guī,圭guī,妫guī,龟guī,规guī,邽guī,皈guī,茥guī,闺guī,帰guī,珪guī,胿guī,亀guī,硅guī,袿guī,規guī,椝guī,瑰guī,郌guī,嫢guī,摫guī,閨guī,鲑guī,嶲guī,槻guī,槼guī,璝guī,瞡guī,膭guī,鮭guī,龜guī,巂guī,歸guī,鬶guī,瓌guī,鬹guī,櫷guī,佹guī,櫰guī,螝guī,槣guī,鴂guī,鴃guī,傀guī,潙guī,雟guī,嬀guī,宄guǐ,氿guǐ,轨guǐ,庋guǐ,匦guǐ,诡guǐ,陒guǐ,垝guǐ,癸guǐ,軌guǐ,鬼guǐ,庪guǐ,匭guǐ,晷guǐ,湀guǐ,蛫guǐ,觤guǐ,詭guǐ,厬guǐ,簋guǐ,蟡guǐ,攱guǐ,朹guǐ,祪guǐ,猤guì,媯guì,刽guì,刿guì,攰guì,昋guì,柜guì,炅guì,贵guì,桂guì,椢guì,筀guì,貴guì,蓕guì,跪guì,瞆guì,劊guì,劌guì,撌guì,槶guì,瞶guì,櫃guì,襘guì,鳜guì,鞼guì,鱖guì,鱥guì,桧guì,絵guì,檜guì,赽guì,趹guì,嶡guì,禬guì,衮gǔn,惃gǔn,绲gǔn,袞gǔn,辊gǔn,滚gǔn,蓘gǔn,滾gǔn,緄gǔn,蔉gǔn,磙gǔn,輥gǔn,鲧gǔn,鮌gǔn,鯀gǔn,琯gùn,棍gùn,棞gùn,睔gùn,睴gùn,璭gùn,謴gùn,呙guō,埚guō,郭guō,啯guō,崞guō,楇guō,聒guō,鈛guō,锅guō,墎guō,瘑guō,嘓guō,彉guō,蝈guō,鍋guō,彍guō,鐹guō,矌guō,簂guó,囯guó,囶guó,囻guó,国guó,圀guó,國guó,帼guó,掴guó,腘guó,幗guó,摑guó,漍guó,聝guó,蔮guó,膕guó,虢guó,馘guó,慖guó,果guǒ,惈guǒ,淉guǒ,猓guǒ,菓guǒ,馃guǒ,椁guǒ,褁guǒ,槨guǒ,粿guǒ,綶guǒ,蜾guǒ,裹guǒ,輠guǒ,餜guǒ,錁guǒ,过guò,過guò,妎hā,铪hā,鉿hā,哈hā,蛤há,孩hái,骸hái,還hái,还hái,海hǎi,胲hǎi,烸hǎi,塰hǎi,酼hǎi,醢hǎi,亥hài,骇hài,害hài,氦hài,嗐hài,餀hài,駭hài,駴hài,嚡hài,饚hài,乤hal,兯han,爳han,顸hān,哻hān,蚶hān,酣hān,谽hān,馠hān,魽hān,鼾hān,欦hān,憨hān,榦hán,邗hán,含hán,邯hán,函hán,咁hán,肣hán,凾hán,唅hán,圅hán,娢hán,浛hán,崡hán,晗hán,梒hán,涵hán,焓hán,寒hán,嵅hán,韩hán,甝hán,筨hán,蜬hán,澏hán,鋡hán,韓hán,馯hán,椷hán,罕hǎn,浫hǎn,喊hǎn,蔊hǎn,鬫hǎn,糮hǎn,厈hǎn,汉hàn,汗hàn,旱hàn,悍hàn,捍hàn,晘hàn,涆hàn,猂hàn,莟hàn,晥hàn,焊hàn,琀hàn,菡hàn,皔hàn,睅hàn,傼hàn,蛿hàn,撖hàn,漢hàn,蜭hàn,暵hàn,熯hàn,銲hàn,鋎hàn,憾hàn,撼hàn,翰hàn,螒hàn,頷hàn,顄hàn,駻hàn,譀hàn,雗hàn,瀚hàn,鶾hàn,澣hàn,颔hàn,魧hāng,苀háng,迒háng,斻háng,杭háng,垳háng,绗háng,笐háng,蚢háng,颃háng,貥háng,筕háng,絎háng,行háng,航háng,沆hàng,茠hāo,蒿hāo,嚆hāo,薅hāo,竓háo,蚝háo,毫háo,椃háo,嗥háo,獆háo,噑háo,豪háo,嘷háo,儫háo,曍háo,嚎háo,壕háo,濠háo,籇háo,蠔háo,譹háo,虠háo,諕háo,呺háo,郝hǎo,好hǎo,号hào,昊hào,昦hào,哠hào,恏hào,悎hào,浩hào,耗hào,晧hào,淏hào,傐hào,皓hào,滈hào,聕hào,號hào,暤hào,暭hào,皜hào,皞hào,皡hào,薃hào,皥hào,颢hào,灏hào,顥hào,鰝hào,灝hào,鄗hào,藃hào,诃hē,呵hē,抲hē,欱hē,喝hē,訶hē,嗬hē,蠚hē,禾hé,合hé,何hé,劾hé,咊hé,和hé,姀hé,河hé,峆hé,曷hé,柇hé,盇hé,籺hé,阂hé,饸hé,哬hé,敆hé,核hé,盉hé,盍hé,啝hé,涸hé,渮hé,盒hé,菏hé,萂hé,龁hé,惒hé,粭hé,訸hé,颌hé,楁hé,鉌hé,阖hé,熆hé,鹖hé,麧hé,澕hé,頜hé,篕hé,翮hé,螛hé,礉hé,闔hé,鞨hé,齕hé,覈hé,鶡hé,皬hé,鑉hé,龢hé,餄hé,荷hé,魺hé,垎hè,贺hè,隺hè,寉hè,焃hè,湼hè,賀hè,嗃hè,煂hè,碋hè,熇hè,褐hè,赫hè,鹤hè,翯hè,壑hè,癋hè,燺hè,爀hè,靍hè,靎hè,鸖hè,靏hè,鶮hè,謞hè,鶴hè,嗨hēi,黒hēi,黑hēi,嘿hēi,潶hēi,嬒hèi,噷hēn,拫hén,痕hén,鞎hén,佷hěn,很hěn,狠hěn,詪hěn,恨hèn,亨hēng,哼hēng,悙hēng,涥hēng,脝hēng,姮héng,恆héng,恒héng,桁héng,烆héng,珩héng,胻héng,横héng,橫héng,衡héng,鴴héng,鵆héng,蘅héng,鑅héng,鸻héng,堼hèng,叿hōng,灴hōng,轰hōng,訇hōng,烘hōng,軣hōng,揈hōng,渹hōng,焢hōng,硡hōng,薨hōng,輷hōng,嚝hōng,鍧hōng,轟hōng,仜hóng,妅hóng,红hóng,吰hóng,宏hóng,汯hóng,玒hóng,纮hóng,闳hóng,宖hóng,泓hóng,玜hóng,苰hóng,垬hóng,娂hóng,洪hóng,竑hóng,紅hóng,荭hóng,虹hóng,浤hóng,紘hóng,翃hóng,耾hóng,硔hóng,紭hóng,谹hóng,鸿hóng,竤hóng,粠hóng,葓hóng,鈜hóng,閎hóng,綋hóng,翝hóng,谼hóng,潂hóng,鉷hóng,鞃hóng,篊hóng,鋐hóng,彋hóng,蕻hóng,霐hóng,黉hóng,霟hóng,鴻hóng,黌hóng,舼hóng,瓨hóng,弘hóng,葒hóng,哄hǒng,晎hǒng,讧hòng,訌hòng,閧hòng,撔hòng,澋hòng,澒hòng,闀hòng,闂hòng,腄hóu,侯hóu,矦hóu,喉hóu,帿hóu,猴hóu,葔hóu,瘊hóu,睺hóu,銗hóu,篌hóu,糇hóu,翭hóu,骺hóu,鍭hóu,餱hóu,鯸hóu,翵hóu,吼hǒu,犼hǒu,呴hǒu,后hòu,郈hòu,厚hòu,垕hòu,後hòu,洉hòu,逅hòu,候hòu,鄇hòu,堠hòu,鲎hòu,鲘hòu,鮜hòu,鱟hòu,豞hòu,鋘hu,乎hū,匢hū,呼hū,垀hū,忽hū,昒hū,曶hū,泘hū,苸hū,烀hū,轷hū,匫hū,唿hū,惚hū,淴hū,虖hū,軤hū,雽hū,嘑hū,寣hū,滹hū,雐hū,歑hū,謼hū,芔hū,戯hū,戱hū,鹄hú,鵠hú,囫hú,弧hú,狐hú,瓳hú,胡hú,壶hú,壷hú,斛hú,焀hú,喖hú,壺hú,媩hú,湖hú,猢hú,絗hú,葫hú,楜hú,煳hú,瑚hú,嘝hú,蔛hú,鹕hú,槲hú,箶hú,糊hú,蝴hú,衚hú,縠hú,螜hú,醐hú,頶hú,觳hú,鍸hú,餬hú,瀫hú,鬍hú,鰗hú,鶘hú,鶦hú,沍hú,礐hú,瓡hú,俿hǔ,虍hǔ,乕hǔ,汻hǔ,虎hǔ,浒hǔ,唬hǔ,萀hǔ,琥hǔ,虝hǔ,滸hǔ,箎hǔ,錿hǔ,鯱hǔ,互hù,弖hù,戶hù,户hù,戸hù,冴hù,芐hù,帍hù,护hù,沪hù,岵hù,怙hù,戽hù,昈hù,枑hù,祜hù,笏hù,粐hù,婟hù,扈hù,瓠hù,綔hù,鄠hù,嫭hù,嫮hù,摢hù,滬hù,蔰hù,槴hù,熩hù,鳸hù,簄hù,鍙hù,護hù,鳠hù,韄hù,頀hù,鱯hù,鸌hù,濩hù,穫hù,觷hù,魱hù,冱hù,鹱hù,花huā,芲huā,埖huā,婲huā,椛huā,硴huā,糀huā,誮huā,錵huā,蘤huā,蕐huā,砉huā,华huá,哗huá,姡huá,骅huá,華huá,铧huá,滑huá,猾huá,嘩huá,撶huá,璍huá,螖huá,鏵huá,驊huá,鷨huá,划huá,化huà,杹huà,画huà,话huà,崋huà,桦huà,婳huà,畫huà,嬅huà,畵huà,觟huà,話huà,劃huà,摦huà,槬huà,樺huà,嫿huà,澅huà,諙huà,黊huà,繣huà,舙huà,蘳huà,譮huà,檴huà,怀huái,淮huái,槐huái,褢huái,踝huái,懐huái,褱huái,懷huái,耲huái,蘹huái,佪huái,徊huái,坏huài,咶huài,壊huài,壞huài,蘾huài,欢huān,歓huān,鴅huān,懁huān,鵍huān,酄huān,嚾huān,獾huān,歡huān,貛huān,讙huān,驩huān,貆huān,环huán,峘huán,洹huán,狟huán,荁huán,桓huán,萈huán,萑huán,堚huán,寏huán,雈huán,綄huán,羦huán,锾huán,阛huán,寰huán,澴huán,缳huán,環huán,豲huán,鍰huán,镮huán,鹮huán,糫huán,繯huán,轘huán,鐶huán,鬟huán,瞏huán,鉮huán,圜huán,闤huán,睆huǎn,缓huǎn,緩huǎn,攌huǎn,幻huàn,奂huàn,肒huàn,奐huàn,宦huàn,唤huàn,换huàn,浣huàn,涣huàn,烉huàn,患huàn,梙huàn,焕huàn,逭huàn,喚huàn,嵈huàn,愌huàn,換huàn,渙huàn,痪huàn,煥huàn,豢huàn,漶huàn,瘓huàn,槵huàn,鲩huàn,擐huàn,瞣huàn,藧huàn,鯇huàn,鯶huàn,鰀huàn,圂huàn,蠸huàn,瑍huàn,巟huāng,肓huāng,荒huāng,衁huāng,塃huāng,慌huāng,皇huáng,偟huáng,凰huáng,隍huáng,黃huáng,黄huáng,喤huáng,堭huáng,媓huáng,崲huáng,徨huáng,湟huáng,葟huáng,遑huáng,楻huáng,煌huáng,瑝huáng,墴huáng,潢huáng,獚huáng,锽huáng,熿huáng,璜huáng,篁huáng,艎huáng,蝗huáng,癀huáng,磺huáng,穔huáng,諻huáng,簧huáng,蟥huáng,鍠huáng,餭huáng,鳇huáng,鐄huáng,騜huáng,鰉huáng,鷬huáng,惶huáng,鱑huáng,怳huǎng,恍huǎng,炾huǎng,宺huǎng,晃huǎng,晄huǎng,奛huǎng,谎huǎng,幌huǎng,愰huǎng,詤huǎng,縨huǎng,謊huǎng,皩huǎng,兤huǎng,滉huàng,榥huàng,曂huàng,皝huàng,鎤huàng,鰴hui,灰huī,灳huī,诙huī,咴huī,恢huī,拻huī,挥huī,虺huī,晖huī,烣huī,珲huī,豗huī,婎huī,媈huī,揮huī,翚huī,辉huī,暉huī,楎huī,琿huī,禈huī,詼huī,幑huī,睳huī,噅huī,噕huī,翬huī,輝huī,麾huī,徽huī,隳huī,瀈huī,洃huī,煇huí,囘huí,回huí,囬huí,廻huí,廽huí,恛huí,洄huí,茴huí,迴huí,烠huí,逥huí,痐huí,蛔huí,蛕huí,蜖huí,鮰huí,藱huí,悔huǐ,毇huǐ,檓huǐ,燬huǐ,譭huǐ,泋huǐ,毁huǐ,烜huǐ,卉huì,屷huì,汇huì,会huì,讳huì,浍huì,绘huì,荟huì,诲huì,恚huì,恵huì,烩huì,贿huì,彗huì,晦huì,秽huì,喙huì,惠huì,缋huì,翙huì,阓huì,匯huì,彙huì,彚huì,會huì,毀huì,滙huì,詯huì,賄huì,嘒huì,蔧huì,誨huì,圚huì,寭huì,慧huì,憓huì,暳huì,槥huì,潓huì,蕙huì,徻huì,橞huì,澮huì,獩huì,璤huì,薈huì,薉huì,諱huì,檅huì,燴huì,篲huì,餯huì,嚖huì,瞺huì,穢huì,繢huì,蟪huì,櫘huì,繪huì,翽huì,譓huì,儶huì,鏸huì,闠huì,孈huì,鐬huì,靧huì,韢huì,譿huì,顪huì,銊huì,叀huì,僡huì,懳huì,昏hūn,昬hūn,荤hūn,婚hūn,惛hūn,涽hūn,阍hūn,惽hūn,棔hūn,葷hūn,睧hūn,閽hūn,焄hūn,蔒hūn,睯hūn,忶hún,浑hún,馄hún,渾hún,魂hún,餛hún,繉hún,轋hún,鼲hún,混hún,梱hún,湷hún,诨hùn,俒hùn,倱hùn,掍hùn,焝hùn,溷hùn,慁hùn,觨hùn,諢hùn,吙huō,耠huō,锪huō,劐huō,鍃huō,豁huō,攉huō,騞huō,搉huō,佸huó,秮huó,活huó,火huǒ,伙huǒ,邩huǒ,钬huǒ,鈥huǒ,夥huǒ,沎huò,或huò,货huò,咟huò,俰huò,捇huò,眓huò,获huò,閄huò,剨huò,掝huò,祸huò,貨huò,惑huò,旤huò,湱huò,禍huò,奯huò,獲huò,霍huò,謋huò,镬huò,嚯huò,瀖huò,耯huò,藿huò,蠖huò,嚿huò,曤huò,臛huò,癨huò,矐huò,鑊huò,靃huò,謔huò,篧huò,擭huò,夻hwa,丌jī,讥jī,击jī,刉jī,叽jī,饥jī,乩jī,圾jī,机jī,玑jī,肌jī,芨jī,矶jī,鸡jī,枅jī,咭jī,剞jī,唧jī,姬jī,屐jī,积jī,笄jī,飢jī,基jī,喞jī,嵆jī,嵇jī,攲jī,敧jī,犄jī,筓jī,缉jī,赍jī,嗘jī,稘jī,跻jī,鳮jī,僟jī,毄jī,箕jī,銈jī,嘰jī,撃jī,樭jī,畿jī,稽jī,緝jī,觭jī,賫jī,躸jī,齑jī,墼jī,憿jī,機jī,激jī,璣jī,禨jī,積jī,錤jī,隮jī,擊jī,磯jī,簊jī,羁jī,賷jī,鄿jī,櫅jī,耭jī,雞jī,譏jī,韲jī,鶏jī,譤jī,鐖jī,癪jī,躋jī,鞿jī,鷄jī,齎jī,羇jī,虀jī,鑇jī,覉jī,鑙jī,齏jī,羈jī,鸄jī,覊jī,庴jī,垍jī,諅jī,踦jī,璂jī,踑jī,谿jī,刏jī,畸jī,簎jí,諔jí,堲jí,蠀jí,亼jí,及jí,吉jí,彶jí,忣jí,汲jí,级jí,即jí,极jí,亟jí,佶jí,郆jí,卽jí,叝jí,姞jí,急jí,狤jí,皍jí,笈jí,級jí,揤jí,疾jí,觙jí,偮jí,卙jí,楖jí,焏jí,脨jí,谻jí,戢jí,棘jí,極jí,湒jí,集jí,塉jí,嫉jí,愱jí,楫jí,蒺jí,蝍jí,趌jí,辑jí,槉jí,耤jí,膌jí,銡jí,嶯jí,潗jí,瘠jí,箿jí,蕀jí,蕺jí,踖jí,鞊jí,鹡jí,橶jí,檝jí,濈jí,螏jí,輯jí,襋jí,蹐jí,艥jí,籍jí,轚jí,鏶jí,霵jí,鶺jí,鷑jí,躤jí,雦jí,雧jí,嵴jí,尐jí,淁jí,吇jí,莋jí,岌jí,殛jí,鍓jí,颳jǐ,几jǐ,己jǐ,丮jǐ,妀jǐ,犱jǐ,泲jǐ,虮jǐ,挤jǐ,脊jǐ,掎jǐ,鱾jǐ,幾jǐ,戟jǐ,麂jǐ,魢jǐ,撠jǐ,擠jǐ,穖jǐ,蟣jǐ,済jǐ,畟jì,迹jì,绩jì,勣jì,彑jì,旡jì,计jì,记jì,伎jì,纪jì,坖jì,妓jì,忌jì,技jì,芰jì,芶jì,际jì,剂jì,季jì,哜jì,峜jì,既jì,洎jì,济jì,紀jì,茍jì,計jì,剤jì,紒jì,继jì,觊jì,記jì,偈jì,寄jì,徛jì,悸jì,旣jì,梞jì,祭jì,萕jì,惎jì,臮jì,葪jì,蔇jì,兾jì,痵jì,継jì,蓟jì,裚jì,跡jì,際jì,墍jì,暨jì,漃jì,漈jì,禝jì,稩jì,穊jì,誋jì,跽jì,霁jì,鲚jì,稷jì,鲫jì,冀jì,劑jì,曁jì,穄jì,縘jì,薊jì,襀jì,髻jì,嚌jì,檕jì,濟jì,繋jì,罽jì,覬jì,鮆jì,檵jì,璾jì,蹟jì,鯽jì,鵋jì,齌jì,廭jì,懻jì,癠jì,穧jì,糭jì,繫jì,骥jì,鯚jì,瀱jì,繼jì,蘮jì,鱀jì,蘻jì,霽jì,鰶jì,鰿jì,鱭jì,驥jì,訐jì,魝jì,櫭jì,帺jì,褀jì,鬾jì,懠jì,蟿jì,汥jì,鯯jì,齍jì,績jì,寂jì,暩jì,蘎jì,筴jiā,加jiā,抸jiā,佳jiā,泇jiā,迦jiā,枷jiā,毠jiā,浃jiā,珈jiā,埉jiā,家jiā,浹jiā,痂jiā,梜jiā,耞jiā,袈jiā,猳jiā,葭jiā,跏jiā,犌jiā,腵jiā,鉫jiā,嘉jiā,镓jiā,糘jiā,豭jiā,貑jiā,鎵jiā,麚jiā,椵jiā,挟jiā,挾jiā,笳jiā,夹jiá,袷jiá,裌jiá,圿jiá,扴jiá,郏jiá,荚jiá,郟jiá,唊jiá,恝jiá,莢jiá,戛jiá,脥jiá,铗jiá,蛱jiá,颊jiá,蛺jiá,跲jiá,鋏jiá,頬jiá,頰jiá,鴶jiá,鵊jiá,忦jiá,戞jiá,岬jiǎ,甲jiǎ,叚jiǎ,玾jiǎ,胛jiǎ,斚jiǎ,贾jiǎ,钾jiǎ,婽jiǎ,徦jiǎ,斝jiǎ,賈jiǎ,鉀jiǎ,榎jiǎ,槚jiǎ,瘕jiǎ,檟jiǎ,夓jiǎ,假jiǎ,价jià,驾jià,架jià,嫁jià,幏jià,榢jià,價jià,稼jià,駕jià,戋jiān,奸jiān,尖jiān,幵jiān,坚jiān,歼jiān,间jiān,冿jiān,戔jiān,肩jiān,艰jiān,姦jiān,姧jiān,兼jiān,监jiān,堅jiān,惤jiān,猏jiān,笺jiān,菅jiān,菺jiān,牋jiān,犍jiān,缄jiān,葌jiān,葏jiān,間jiān,靬jiān,搛jiān,椾jiān,煎jiān,瑊jiān,睷jiān,碊jiān,缣jiān,蒹jiān,監jiān,箋jiān,樫jiān,熞jiān,緘jiān,蕑jiān,蕳jiān,鲣jiān,鳽jiān,鹣jiān,熸jiān,篯jiān,縑jiān,艱jiān,鞬jiān,餰jiān,馢jiān,麉jiān,瀐jiān,鞯jiān,鳒jiān,殱jiān,礛jiān,覸jiān,鵳jiān,瀸jiān,櫼jiān,殲jiān,譼jiān,鰜jiān,鶼jiān,籛jiān,韀jiān,鰹jiān,囏jiān,虃jiān,鑯jiān,韉jiān,揃jiān,鐗jiān,鐧jiān,閒jiān,黚jiān,傔jiān,攕jiān,纎jiān,钘jiān,鈃jiān,銒jiān,籈jiān,湔jiān,囝jiǎn,拣jiǎn,枧jiǎn,俭jiǎn,茧jiǎn,倹jiǎn,挸jiǎn,捡jiǎn,笕jiǎn,减jiǎn,剪jiǎn,帴jiǎn,梘jiǎn,检jiǎn,湕jiǎn,趼jiǎn,揀jiǎn,検jiǎn,減jiǎn,睑jiǎn,硷jiǎn,裥jiǎn,詃jiǎn,锏jiǎn,弿jiǎn,瑐jiǎn,筧jiǎn,简jiǎn,絸jiǎn,谫jiǎn,彅jiǎn,戩jiǎn,碱jiǎn,儉jiǎn,翦jiǎn,撿jiǎn,檢jiǎn,藆jiǎn,襇jiǎn,襉jiǎn,謇jiǎn,蹇jiǎn,瞼jiǎn,礆jiǎn,簡jiǎn,繭jiǎn,謭jiǎn,鬋jiǎn,鰎jiǎn,鹸jiǎn,瀽jiǎn,蠒jiǎn,鹻jiǎn,譾jiǎn,襺jiǎn,鹼jiǎn,堿jiǎn,偂jiǎn,銭jiǎn,醎jiǎn,鹹jiǎn,涀jiǎn,橏jiǎn,柬jiǎn,戬jiǎn,见jiàn,件jiàn,見jiàn,侟jiàn,饯jiàn,剑jiàn,洊jiàn,牮jiàn,荐jiàn,贱jiàn,俴jiàn,健jiàn,剣jiàn,栫jiàn,涧jiàn,珔jiàn,舰jiàn,剱jiàn,徤jiàn,渐jiàn,袸jiàn,谏jiàn,釼jiàn,寋jiàn,旔jiàn,楗jiàn,毽jiàn,溅jiàn,腱jiàn,臶jiàn,葥jiàn,践jiàn,鉴jiàn,键jiàn,僭jiàn,榗jiàn,漸jiàn,劍jiàn,劎jiàn,墹jiàn,澗jiàn,箭jiàn,糋jiàn,諓jiàn,賤jiàn,趝jiàn,踐jiàn,踺jiàn,劒jiàn,劔jiàn,橺jiàn,薦jiàn,諫jiàn,鍵jiàn,餞jiàn,瞯jiàn,瞷jiàn,磵jiàn,礀jiàn,螹jiàn,鍳jiàn,濺jiàn,繝jiàn,瀳jiàn,鏩jiàn,艦jiàn,轞jiàn,鑑jiàn,鑒jiàn,鑬jiàn,鑳jiàn,鐱jiàn,揵jiàn,蔪jiàn,橌jiàn,廴jiàn,譖jiàn,鋻jiàn,建jiàn,賎jiàn,擶jiàn,江jiāng,姜jiāng,将jiāng,茳jiāng,浆jiāng,畕jiāng,豇jiāng,葁jiāng,摪jiāng,翞jiāng,僵jiāng,漿jiāng,螀jiāng,壃jiāng,彊jiāng,缰jiāng,薑jiāng,殭jiāng,螿jiāng,鳉jiāng,疅jiāng,礓jiāng,疆jiāng,繮jiāng,韁jiāng,鱂jiāng,將jiāng,畺jiāng,糡jiāng,橿jiāng,讲jiǎng,奖jiǎng,桨jiǎng,蒋jiǎng,勥jiǎng,奨jiǎng,奬jiǎng,蔣jiǎng,槳jiǎng,獎jiǎng,耩jiǎng,膙jiǎng,講jiǎng,顜jiǎng,塂jiǎng,匞jiàng,匠jiàng,夅jiàng,弜jiàng,杢jiàng,降jiàng,绛jiàng,弶jiàng,袶jiàng,絳jiàng,酱jiàng,摾jiàng,滰jiàng,嵹jiàng,犟jiàng,醤jiàng,糨jiàng,醬jiàng,櫤jiàng,謽jiàng,蔃jiàng,洚jiàng,艽jiāo,芁jiāo,交jiāo,郊jiāo,姣jiāo,娇jiāo,峧jiāo,浇jiāo,茭jiāo,骄jiāo,胶jiāo,椒jiāo,焳jiāo,蛟jiāo,跤jiāo,僬jiāo,嘄jiāo,鲛jiāo,嬌jiāo,嶕jiāo,嶣jiāo,憍jiāo,澆jiāo,膠jiāo,蕉jiāo,燋jiāo,膲jiāo,礁jiāo,穚jiāo,鮫jiāo,鹪jiāo,簥jiāo,蟭jiāo,轇jiāo,鐎jiāo,驕jiāo,鷦jiāo,鷮jiāo,儌jiāo,撟jiāo,挍jiāo,教jiāo,骹jiāo,嫶jiāo,萩jiāo,嘐jiāo,憢jiāo,焦jiāo,櫵jiáo,嚼jiáo,臫jiǎo,佼jiǎo,挢jiǎo,狡jiǎo,绞jiǎo,饺jiǎo,晈jiǎo,笅jiǎo,皎jiǎo,矫jiǎo,脚jiǎo,铰jiǎo,搅jiǎo,筊jiǎo,絞jiǎo,剿jiǎo,勦jiǎo,敫jiǎo,湬jiǎo,煍jiǎo,腳jiǎo,賋jiǎo,摷jiǎo,暞jiǎo,踋jiǎo,鉸jiǎo,劋jiǎo,撹jiǎo,徼jiǎo,敽jiǎo,敿jiǎo,缴jiǎo,曒jiǎo,璬jiǎo,矯jiǎo,皦jiǎo,蟜jiǎo,鵤jiǎo,繳jiǎo,譑jiǎo,孂jiǎo,纐jiǎo,攪jiǎo,灚jiǎo,鱎jiǎo,潐jiǎo,糸jiǎo,蹻jiǎo,釥jiǎo,纟jiǎo,恔jiǎo,角jiǎo,餃jiǎo,叫jiào,呌jiào,訆jiào,珓jiào,轿jiào,较jiào,窖jiào,滘jiào,較jiào,嘂jiào,嘦jiào,斠jiào,漖jiào,酵jiào,噍jiào,噭jiào,嬓jiào,獥jiào,藠jiào,趭jiào,轎jiào,醮jiào,譥jiào,皭jiào,釂jiào,觉jiào,覐jiào,覚jiào,覺jiào,趫jiào,敎jiào,阶jiē,疖jiē,皆jiē,接jiē,掲jiē,痎jiē,秸jiē,菨jiē,喈jiē,嗟jiē,堦jiē,媘jiē,嫅jiē,揭jiē,椄jiē,湝jiē,脻jiē,街jiē,煯jiē,稭jiē,鞂jiē,蝔jiē,擑jiē,癤jiē,鶛jiē,节jiē,節jiē,袓jiē,謯jiē,階jiē,卪jié,孑jié,讦jié,刦jié,刧jié,劫jié,岊jié,昅jié,刼jié,劼jié,疌jié,衱jié,诘jié,拮jié,洁jié,结jié,迼jié,倢jié,桀jié,桝jié,莭jié,偼jié,婕jié,崨jié,捷jié,袺jié,傑jié,媫jié,結jié,蛣jié,颉jié,嵥jié,楬jié,楶jié,滐jié,睫jié,蜐jié,詰jié,截jié,榤jié,碣jié,竭jié,蓵jié,鲒jié,潔jié,羯jié,誱jié,踕jié,頡jié,幯jié,擳jié,嶻jié,擮jié,礍jié,鍻jié,鮚jié,巀jié,蠞jié,蠘jié,蠽jié,洯jié,絜jié,搩jié,杰jié,鉣jié,姐jiě,毑jiě,媎jiě,解jiě,觧jiě,檞jiě,飷jiě,丯jiè,介jiè,岕jiè,庎jiè,戒jiè,芥jiè,屆jiè,届jiè,斺jiè,玠jiè,界jiè,畍jiè,疥jiè,砎jiè,衸jiè,诫jiè,借jiè,蚧jiè,徣jiè,堺jiè,楐jiè,琾jiè,蛶jiè,骱jiè,犗jiè,誡jiè,魪jiè,藉jiè,繲jiè,雃jiè,嶰jiè,唶jiè,褯jiè,巾jīn,今jīn,斤jīn,钅jīn,兓jīn,金jīn,釒jīn,津jīn,矜jīn,砛jīn,荕jīn,衿jīn,觔jīn,埐jīn,珒jīn,紟jīn,惍jīn,琎jīn,堻jīn,琻jīn,筋jīn,嶜jīn,璡jīn,鹶jīn,黅jīn,襟jīn,濜jīn,仅jǐn,巹jǐn,紧jǐn,堇jǐn,菫jǐn,僅jǐn,厪jǐn,谨jǐn,锦jǐn,嫤jǐn,廑jǐn,漌jǐn,緊jǐn,蓳jǐn,馑jǐn,槿jǐn,瑾jǐn,錦jǐn,謹jǐn,饉jǐn,儘jǐn,婜jǐn,斳jǐn,卺jǐn,笒jìn,盡jìn,劤jìn,尽jìn,劲jìn,妗jìn,近jìn,进jìn,侭jìn,枃jìn,勁jìn,荩jìn,晉jìn,晋jìn,浸jìn,烬jìn,赆jìn,祲jìn,進jìn,煡jìn,缙jìn,寖jìn,搢jìn,溍jìn,禁jìn,靳jìn,墐jìn,慬jìn,瑨jìn,僸jìn,凚jìn,歏jìn,殣jìn,觐jìn,噤jìn,濅jìn,縉jìn,賮jìn,嚍jìn,壗jìn,藎jìn,燼jìn,璶jìn,覲jìn,贐jìn,齽jìn,馸jìn,臸jìn,浕jìn,嬧jìn,坕jīng,坙jīng,巠jīng,京jīng,泾jīng,经jīng,茎jīng,亰jīng,秔jīng,荆jīng,荊jīng,涇jīng,莖jīng,婛jīng,惊jīng,旌jīng,旍jīng,猄jīng,経jīng,菁jīng,晶jīng,稉jīng,腈jīng,粳jīng,經jīng,兢jīng,精jīng,聙jīng,橸jīng,鲸jīng,鵛jīng,鯨jīng,鶁jīng,麖jīng,鼱jīng,驚jīng,麠jīng,徑jīng,仱jīng,靑jīng,睛jīng,井jǐng,阱jǐng,刭jǐng,坓jǐng,宑jǐng,汫jǐng,汬jǐng,肼jǐng,剄jǐng,穽jǐng,颈jǐng,景jǐng,儆jǐng,幜jǐng,璄jǐng,憼jǐng,暻jǐng,燝jǐng,璟jǐng,璥jǐng,頸jǐng,蟼jǐng,警jǐng,擏jǐng,憬jǐng,妌jìng,净jìng,弪jìng,径jìng,迳jìng,浄jìng,胫jìng,凈jìng,弳jìng,痉jìng,竞jìng,逕jìng,婙jìng,婧jìng,桱jìng,梷jìng,淨jìng,竫jìng,脛jìng,敬jìng,痙jìng,竧jìng,傹jìng,靖jìng,境jìng,獍jìng,誩jìng,静jìng,頚jìng,曔jìng,镜jìng,靜jìng,瀞jìng,鏡jìng,競jìng,竸jìng,葝jìng,儬jìng,陘jìng,竟jìng,冋jiōng,扃jiōng,埛jiōng,絅jiōng,駉jiōng,駫jiōng,冏jiōng,浻jiōng,扄jiōng,銄jiōng,囧jiǒng,迥jiǒng,侰jiǒng,炯jiǒng,逈jiǒng,烱jiǒng,煚jiǒng,窘jiǒng,颎jiǒng,綗jiǒng,僒jiǒng,煛jiǒng,熲jiǒng,澃jiǒng,燛jiǒng,褧jiǒng,顈jiǒng,蘔jiǒng,宭jiǒng,蘏jiǒng,丩jiū,勼jiū,纠jiū,朻jiū,究jiū,糺jiū,鸠jiū,赳jiū,阄jiū,萛jiū,啾jiū,揪jiū,揫jiū,鳩jiū,摎jiū,鬏jiū,鬮jiū,稵jiū,糾jiū,九jiǔ,久jiǔ,乆jiǔ,乣jiǔ,奺jiǔ,汣jiǔ,杦jiǔ,灸jiǔ,玖jiǔ,舏jiǔ,韭jiǔ,紤jiǔ,酒jiǔ,镹jiǔ,韮jiǔ,匛jiù,旧jiù,臼jiù,疚jiù,柩jiù,柾jiù,倃jiù,桕jiù,厩jiù,救jiù,就jiù,廄jiù,匓jiù,舅jiù,僦jiù,廏jiù,廐jiù,慦jiù,殧jiù,舊jiù,鹫jiù,麔jiù,匶jiù,齨jiù,鷲jiù,咎jiù,欍jou,鶪ju,伡jū,俥jū,凥jū,匊jū,居jū,狙jū,苴jū,驹jū,倶jū,挶jū,捄jū,疽jū,痀jū,眗jū,砠jū,罝jū,陱jū,娵jū,婅jū,婮jū,崌jū,掬jū,梮jū,涺jū,椐jū,琚jū,腒jū,趄jū,跔jū,锔jū,裾jū,雎jū,艍jū,蜛jū,踘jū,鋦jū,駒jū,鮈jū,鴡jū,鞠jū,鞫jū,鶋jū,臄jū,揟jū,拘jū,諊jū,局jú,泦jú,侷jú,狊jú,桔jú,毩jú,淗jú,焗jú,菊jú,郹jú,椈jú,毱jú,湨jú,犑jú,輂jú,粷jú,蓻jú,趜jú,躹jú,閰jú,檋jú,駶jú,鵙jú,蹫jú,鵴jú,巈jú,蘜jú,鼰jú,鼳jú,驧jú,趉jú,郥jú,橘jú,咀jǔ,弆jǔ,沮jǔ,举jǔ,矩jǔ,莒jǔ,挙jǔ,椇jǔ,筥jǔ,榉jǔ,榘jǔ,蒟jǔ,龃jǔ,聥jǔ,舉jǔ,踽jǔ,擧jǔ,櫸jǔ,齟jǔ,襷jǔ,籧jǔ,郰jǔ,欅jǔ,句jù,巨jù,讵jù,姖jù,岠jù,怇jù,拒jù,洰jù,苣jù,邭jù,具jù,怚jù,拠jù,昛jù,歫jù,炬jù,秬jù,钜jù,俱jù,倨jù,冣jù,剧jù,粔jù,耟jù,蚷jù,埧jù,埾jù,惧jù,詎jù,距jù,焣jù,犋jù,跙jù,鉅jù,飓jù,虡jù,豦jù,锯jù,愳jù,窭jù,聚jù,駏jù,劇jù,勮jù,屦jù,踞jù,鮔jù,壉jù,懅jù,據jù,澽jù,遽jù,鋸jù,屨jù,颶jù,簴jù,躆jù,醵jù,懼jù,鐻jù,爠jù,坥jù,螶jù,忂jù,葅jù,蒩jù,珇jù,据jù,姢juān,娟juān,捐juān,涓juān,脧juān,裐juān,鹃juān,勬juān,鋑juān,鋗juān,镌juān,鎸juān,鵑juān,鐫juān,蠲juān,勌juān,瓹juān,梋juān,鞙juān,朘juān,呟juǎn,帣juǎn,埍juǎn,捲juǎn,菤juǎn,锩juǎn,臇juǎn,錈juǎn,埢juǎn,踡juǎn,蕋juǎn,卷juàn,劵juàn,弮juàn,倦juàn,桊juàn,狷juàn,绢juàn,淃juàn,眷juàn,鄄juàn,睊juàn,絭juàn,罥juàn,睠juàn,絹juàn,慻juàn,蔨juàn,餋juàn,獧juàn,羂juàn,圏juàn,棬juàn,惓juàn,韏juàn,讂juàn,縳juàn,襈juàn,奆juàn,噘juē,撅juē,撧juē,屩juē,屫juē,繑juē,亅jué,孓jué,决jué,刔jué,氒jué,诀jué,抉jué,決jué,芵jué,泬jué,玦jué,玨jué,挗jué,珏jué,砄jué,绝jué,虳jué,捔jué,欮jué,蚗jué,崛jué,掘jué,斍jué,桷jué,殌jué,焆jué,觖jué,逫jué,傕jué,厥jué,絕jué,絶jué,鈌jué,劂jué,勪jué,瑴jué,谲jué,嶥jué,憰jué,潏jué,熦jué,爴jué,獗jué,瘚jué,蕝jué,蕨jué,憠jué,橛jué,镼jué,爵jué,镢jué,蟨jué,蟩jué,爑jué,譎jué,蹷jué,鶌jué,矍jué,鐝jué,灍jué,爝jué,觼jué,彏jué,戄jué,攫jué,玃jué,鷢jué,欔jué,矡jué,龣jué,貜jué,躩jué,钁jué,璚jué,匷jué,啳jué,吷jué,疦jué,弡jué,穱jué,孒jué,訣jué,橜jué,蹶juě,倔juè,誳juè,君jun1,均jun1,汮jun1,姰jun1,袀jun1,軍jun1,钧jun1,莙jun1,蚐jun1,桾jun1,皲jun1,菌jun1,鈞jun1,碅jun1,筠jun1,皸jun1,皹jun1,覠jun1,銁jun1,銞jun1,鲪jun1,麇jun1,鍕jun1,鮶jun1,麏jun1,麕jun1,军jun1,隽jun4,雋jun4,呁jun4,俊jun4,郡jun4,陖jun4,峻jun4,捃jun4,晙jun4,馂jun4,骏jun4,焌jun4,珺jun4,畯jun4,竣jun4,箘jun4,箟jun4,蜠jun4,儁jun4,寯jun4,懏jun4,餕jun4,燇jun4,駿jun4,鵔jun4,鵕jun4,鵘jun4,葰jun4,埈jun4,咔kā,咖kā,喀kā,衉kā,哢kā,呿kā,卡kǎ,佧kǎ,垰kǎ,裃kǎ,鉲kǎ,胩kǎ,开kāi,奒kāi,揩kāi,锎kāi,開kāi,鐦kāi,凯kǎi,剀kǎi,垲kǎi,恺kǎi,闿kǎi,铠kǎi,凱kǎi,慨kǎi,蒈kǎi,塏kǎi,愷kǎi,楷kǎi,輆kǎi,暟kǎi,锴kǎi,鍇kǎi,鎧kǎi,闓kǎi,颽kǎi,喫kài,噄kài,忾kài,烗kài,勓kài,愾kài,鎎kài,愒kài,欯kài,炌kài,乫kal,刊kān,栞kān,勘kān,龛kān,堪kān,嵁kān,戡kān,龕kān,槛kǎn,檻kǎn,冚kǎn,坎kǎn,侃kǎn,砍kǎn,莰kǎn,偘kǎn,埳kǎn,惂kǎn,欿kǎn,塪kǎn,輡kǎn,竷kǎn,轗kǎn,衎kǎn,看kàn,崁kàn,墈kàn,阚kàn,瞰kàn,磡kàn,闞kàn,矙kàn,輱kàn,忼kāng,砊kāng,粇kāng,康kāng,嫝kāng,嵻kāng,慷kāng,漮kāng,槺kāng,穅kāng,糠kāng,躿kāng,鏮kāng,鱇kāng,闶kāng,閌kāng,扛káng,摃káng,亢kàng,伉kàng,匟kàng,囥kàng,抗kàng,炕kàng,钪kàng,鈧kàng,邟kàng,尻kāo,髛kāo,嵪kāo,訄kāo,薧kǎo,攷kǎo,考kǎo,拷kǎo,洘kǎo,栲kǎo,烤kǎo,铐kào,犒kào,銬kào,鲓kào,靠kào,鮳kào,鯌kào,焅kào,屙kē,蚵kē,苛kē,柯kē,牁kē,珂kē,胢kē,轲kē,疴kē,趷kē,钶kē,嵙kē,棵kē,痾kē,萪kē,軻kē,颏kē,犐kē,稞kē,窠kē,鈳kē,榼kē,薖kē,颗kē,樖kē,瞌kē,磕kē,蝌kē,頦kē,醘kē,顆kē,髁kē,礚kē,嗑kē,窼kē,簻kē,科kē,壳ké,咳ké,揢ké,翗ké,嶱ké,殼ké,毼kě,磆kě,坷kě,可kě,岢kě,炣kě,渇kě,嵑kě,敤kě,渴kě,袔kè,悈kè,歁kè,克kè,刻kè,剋kè,勀kè,勊kè,客kè,恪kè,娔kè,尅kè,课kè,堁kè,氪kè,骒kè,缂kè,愙kè,溘kè,锞kè,碦kè,課kè,礊kè,騍kè,硞kè,艐kè,緙kè,肎kěn,肯kěn,肻kěn,垦kěn,恳kěn,啃kěn,豤kěn,貇kěn,墾kěn,錹kěn,懇kěn,頎kěn,掯kèn,裉kèn,褃kèn,硍kèn,妔kēng,踁kēng,劥kēng,吭kēng,坈kēng,坑kēng,挳kēng,硁kēng,牼kēng,硜kēng,铿kēng,硻kēng,誙kēng,銵kēng,鏗kēng,摼kēng,殸kēng,揁kēng,鍞kēng,巪keo,乬keol,唟keos,厼keum,怾ki,空kōng,倥kōng,埪kōng,崆kōng,悾kōng,硿kōng,箜kōng,躻kōng,錓kōng,鵼kōng,椌kōng,宆kōng,孔kǒng,恐kǒng,控kòng,鞚kòng,羫kòng,廤kos,抠kōu,芤kōu,眍kōu,剾kōu,彄kōu,摳kōu,瞘kōu,劶kǒu,竘kǒu,口kǒu,叩kòu,扣kòu,怐kòu,敂kòu,冦kòu,宼kòu,寇kòu,釦kòu,窛kòu,筘kòu,滱kòu,蔲kòu,蔻kòu,瞉kòu,簆kòu,鷇kòu,搰kū,刳kū,矻kū,郀kū,枯kū,哭kū,桍kū,堀kū,崫kū,圐kū,跍kū,窟kū,骷kū,泏kū,窋kū,狜kǔ,苦kǔ,楛kǔ,齁kù,捁kù,库kù,俈kù,绔kù,庫kù,秙kù,袴kù,喾kù,絝kù,裤kù,瘔kù,酷kù,褲kù,嚳kù,鮬kù,恗kuā,夸kuā,姱kuā,晇kuā,舿kuā,誇kuā,侉kuǎ,咵kuǎ,垮kuǎ,銙kuǎ,顝kuǎ,挎kuà,胯kuà,跨kuà,骻kuà,擓kuai,蒯kuǎi,璯kuài,駃kuài,巜kuài,凷kuài,圦kuài,块kuài,快kuài,侩kuài,郐kuài,哙kuài,狯kuài,脍kuài,塊kuài,筷kuài,鲙kuài,儈kuài,鄶kuài,噲kuài,廥kuài,獪kuài,膾kuài,旝kuài,糩kuài,鱠kuài,蕢kuài,宽kuān,寛kuān,寬kuān,髋kuān,鑧kuān,髖kuān,欵kuǎn,款kuǎn,歀kuǎn,窽kuǎn,窾kuǎn,梡kuǎn,匡kuāng,劻kuāng,诓kuāng,邼kuāng,匩kuāng,哐kuāng,恇kuāng,洭kuāng,筐kuāng,筺kuāng,誆kuāng,軭kuāng,狂kuáng,狅kuáng,诳kuáng,軖kuáng,軠kuáng,誑kuáng,鵟kuáng,夼kuǎng,儣kuǎng,懭kuǎng,爌kuǎng,邝kuàng,圹kuàng,况kuàng,旷kuàng,岲kuàng,況kuàng,矿kuàng,昿kuàng,贶kuàng,框kuàng,眖kuàng,砿kuàng,眶kuàng,絋kuàng,絖kuàng,貺kuàng,軦kuàng,鉱kuàng,鋛kuàng,鄺kuàng,壙kuàng,黋kuàng,懬kuàng,曠kuàng,礦kuàng,穬kuàng,纊kuàng,鑛kuàng,纩kuàng,亏kuī,刲kuī,悝kuī,盔kuī,窥kuī,聧kuī,窺kuī,虧kuī,闚kuī,巋kuī,蘬kuī,岿kuī,奎kuí,晆kuí,逵kuí,鄈kuí,頄kuí,馗kuí,喹kuí,揆kuí,葵kuí,骙kuí,戣kuí,暌kuí,楏kuí,楑kuí,魁kuí,睽kuí,蝰kuí,頯kuí,櫆kuí,藈kuí,鍷kuí,騤kuí,夔kuí,蘷kuí,虁kuí,躨kuí,鍨kuí,卼kuǐ,煃kuǐ,跬kuǐ,頍kuǐ,蹞kuǐ,尯kuǐ,匮kuì,欳kuì,喟kuì,媿kuì,愦kuì,愧kuì,溃kuì,蒉kuì,馈kuì,匱kuì,嘳kuì,嬇kuì,憒kuì,潰kuì,聩kuì,聭kuì,樻kuì,殨kuì,餽kuì,簣kuì,聵kuì,籄kuì,鐀kuì,饋kuì,鑎kuì,篑kuì,坤kūn,昆kūn,晜kūn,堃kūn,堒kūn,婫kūn,崐kūn,崑kūn,猑kūn,菎kūn,裈kūn,焜kūn,琨kūn,髠kūn,裩kūn,锟kūn,髡kūn,尡kūn,潉kūn,蜫kūn,褌kūn,髨kūn,熴kūn,瑻kūn,醌kūn,錕kūn,鲲kūn,臗kūn,騉kūn,鯤kūn,鵾kūn,鶤kūn,鹍kūn,悃kǔn,捆kǔn,阃kǔn,壸kǔn,祵kǔn,硱kǔn,稇kǔn,裍kǔn,壼kǔn,稛kǔn,綑kǔn,閫kǔn,閸kǔn,困kùn,睏kùn,涃kùn,秳kuò,漷kuò,扩kuò,拡kuò,括kuò,桰kuò,筈kuò,萿kuò,葀kuò,蛞kuò,阔kuò,廓kuò,頢kuò,擴kuò,濶kuò,闊kuò,鞟kuò,韕kuò,懖kuò,霩kuò,鞹kuò,鬠kuò,穒kweok,鞡la,垃lā,拉lā,柆lā,啦lā,菈lā,搚lā,邋lā,磖lā,翋lā,旯lá,砬lá,揦lá,喇lǎ,藞lǎ,嚹lǎ,剌là,溂là,腊là,揧là,楋là,瘌là,牎chuāng,床chuáng,漺chuǎng,怆chuàng,愴chuàng,莊zhuāng,粧zhuāng,装zhuāng,裝zhuāng,樁zhuāng,蜡là,蝋là,辢là,辣là,蝲là,臈là,攋là,爉là,臘là,鬎là,櫴là,瓎là,镴là,鯻là,鑞là,儠là,擸là,鱲là,蠟là,来lái,來lái,俫lái,倈lái,崃lái,徕lái,涞lái,莱lái,郲lái,婡lái,崍lái,庲lái,徠lái,梾lái,淶lái,猍lái,萊lái,逨lái,棶lái,琜lái,筙lái,铼lái,箂lái,錸lái,騋lái,鯠lái,鶆lái,麳lái,顂lái,勑lài,誺lài,赉lài,睐lài,睞lài,赖lài,賚lài,濑lài,賴lài,頼lài,癞lài,鵣lài,瀨lài,瀬lài,籁lài,藾lài,癩lài,襰lài,籟lài,唻lài,暕lán,兰lán,岚lán,拦lán,栏lán,婪lán,嵐lán,葻lán,阑lán,蓝lán,谰lán,厱lán,褴lán,儖lán,斓lán,篮lán,懢lán,燣lán,藍lán,襕lán,镧lán,闌lán,璼lán,襤lán,譋lán,幱lán,攔lán,瀾lán,灆lán,籃lán,繿lán,蘭lán,斕lán,欄lán,礷lán,襴lán,囒lán,灡lán,籣lán,欗lán,讕lán,躝lán,鑭lán,钄lán,韊lán,惏lán,澜lán,襽lán,览lǎn,浨lǎn,揽lǎn,缆lǎn,榄lǎn,漤lǎn,罱lǎn,醂lǎn,壈lǎn,懒lǎn,覧lǎn,擥lǎn,懶lǎn,孄lǎn,覽lǎn,孏lǎn,攬lǎn,欖lǎn,爦lǎn,纜lǎn,灠lǎn,顲lǎn,蘫làn,嬾làn,烂làn,滥làn,燗làn,嚂làn,壏làn,濫làn,爛làn,爤làn,瓓làn,糷làn,湅làn,煉làn,爁làn,唥lang,啷lāng,羮láng,勆láng,郎láng,郞láng,欴láng,狼láng,嫏láng,廊láng,桹láng,琅láng,蓈láng,榔láng,瑯láng,硠láng,稂láng,锒láng,筤láng,艆láng,蜋láng,郒láng,螂láng,躴láng,鋃láng,鎯láng,阆láng,閬láng,哴láng,悢lǎng,朗lǎng,朖lǎng,烺lǎng,塱lǎng,蓢lǎng,樃lǎng,誏lǎng,朤lǎng,俍lǎng,脼lǎng,莨làng,埌làng,浪làng,蒗làng,捞lāo,粩lāo,撈lāo,劳láo,労láo,牢láo,窂láo,哰láo,崂láo,浶láo,勞láo,痨láo,僗láo,嶗láo,憥láo,朥láo,癆láo,磱láo,簩láo,蟧láo,醪láo,鐒láo,顟láo,髝láo,轑láo,嫪láo,憦láo,铹láo,耂lǎo,老lǎo,佬lǎo,咾lǎo,姥lǎo,恅lǎo,荖lǎo,栳lǎo,珯lǎo,硓lǎo,铑lǎo,蛯lǎo,銠lǎo,橑lǎo,鮱lǎo,唠lào,嘮lào,烙lào,嗠lào,耢lào,酪lào,澇lào,橯lào,耮lào,軂lào,涝lào,饹le,了le,餎le,牞lè,仂lè,阞lè,乐lè,叻lè,忇lè,扐lè,氻lè,艻lè,玏lè,泐lè,竻lè,砳lè,勒lè,楽lè,韷lè,樂lè,簕lè,鳓lè,鰳lè,頛lei,嘞lei,雷léi,嫘léi,缧léi,蔂léi,樏léi,畾léi,檑léi,縲léi,镭léi,櫑léi,瓃léi,羸léi,礧léi,罍léi,蘲léi,鐳léi,轠léi,壨léi,鑘léi,靁léi,虆léi,鱩léi,欙léi,纝léi,鼺léi,磥léi,攂léi,腂lěi,瘣lěi,厽lěi,耒lěi,诔lěi,垒lěi,絫lěi,傫lěi,誄lěi,磊lěi,蕌lěi,蕾lěi,儡lěi,壘lěi,癗lěi,藟lěi,櫐lěi,矋lěi,礨lěi,灅lěi,蠝lěi,蘽lěi,讄lěi,儽lěi,鑸lěi,鸓lěi,洡lěi,礌lěi,塁lěi,纍lèi,肋lèi,泪lèi,类lèi,涙lèi,淚lèi,累lèi,酹lèi,銇lèi,頪lèi,擂lèi,錑lèi,颣lèi,類lèi,纇lèi,蘱lèi,禷lèi,祱lèi,塄léng,棱léng,楞léng,碐léng,稜léng,踜léng,薐léng,輘léng,冷lěng,倰lèng,堎lèng,愣lèng,睖lèng,瓈li,唎lī,粚lí,刕lí,厘lí,剓lí,梨lí,狸lí,荲lí,骊lí,悡lí,梸lí,犁lí,菞lí,喱lí,棃lí,犂lí,鹂lí,剺lí,漓lí,睝lí,筣lí,缡lí,艃lí,蓠lí,蜊lí,嫠lí,孷lí,樆lí,璃lí,盠lí,竰lí,氂lí,犛lí,糎lí,蔾lí,鋫lí,鲡lí,黎lí,篱lí,縭lí,罹lí,錅lí,蟍lí,謧lí,醨lí,嚟lí,藜lí,邌lí,釐lí,離lí,鯏lí,鏫lí,鯬lí,鵹lí,黧lí,囄lí,灕lí,蘺lí,蠡lí,蠫lí,孋lí,廲lí,劙lí,鑗lí,籬lí,驪lí,鱺lí,鸝lí,婯lí,儷lí,矖lí,纚lí,离lí,褵lí,穲lí,礼lǐ,李lǐ,里lǐ,俚lǐ,峛lǐ,哩lǐ,娌lǐ,峲lǐ,浬lǐ,逦lǐ,理lǐ,裡lǐ,锂lǐ,粴lǐ,裏lǐ,鋰lǐ,鲤lǐ,澧lǐ,禮lǐ,鯉lǐ,蟸lǐ,醴lǐ,鳢lǐ,邐lǐ,鱧lǐ,欐lǐ,欚lǐ,銐lì,脷lì,莉lì,力lì,历lì,厉lì,屴lì,立lì,吏lì,朸lì,丽lì,利lì,励lì,呖lì,坜lì,沥lì,苈lì,例lì,岦lì,戾lì,枥lì,沴lì,疠lì,苙lì,隶lì,俐lì,俪lì,栃lì,栎lì,疬lì,砅lì,茘lì,荔lì,轹lì,郦lì,娳lì,悧lì,栗lì,栛lì,栵lì,涖lì,猁lì,珕lì,砺lì,砾lì,秝lì,莅lì,唳lì,悷lì,琍lì,笠lì,粒lì,粝lì,蚸lì,蛎lì,傈lì,凓lì,厤lì,棙lì,痢lì,蛠lì,詈lì,雳lì,塛lì,慄lì,搮lì,溧lì,蒚lì,蒞lì,鉝lì,鳨lì,厯lì,厲lì,暦lì,歴lì,瑮lì,綟lì,蜧lì,勵lì,曆lì,歷lì,篥lì,隷lì,鴗lì,巁lì,檪lì,濿lì,癘lì,磿lì,隸lì,鬁lì,儮lì,櫔lì,爄lì,犡lì,禲lì,蠇lì,嚦lì,壢lì,攊lì,櫟lì,瀝lì,瓅lì,礪lì,藶lì,麗lì,櫪lì,爏lì,瓑lì,皪lì,盭lì,礫lì,糲lì,蠣lì,癧lì,礰lì,酈lì,鷅lì,麜lì,囇lì,攦lì,轢lì,讈lì,轣lì,攭lì,瓥lì,靂lì,鱱lì,靋lì,觻lì,鱳lì,叓lì,蝷lì,赲lì,曞lì,嫾liān,奁lián,连lián,帘lián,怜lián,涟lián,莲lián,連lián,梿lián,联lián,裢lián,亷lián,嗹lián,廉lián,慩lián,溓lián,漣lián,蓮lián,奩lián,熑lián,覝lián,劆lián,匳lián,噒lián,憐lián,磏lián,聨lián,聫lián,褳lián,鲢lián,濂lián,濓lián,縺lián,翴lián,聮lián,薕lián,螊lián,櫣lián,燫lián,聯lián,臁lián,蹥lián,謰lián,鎌lián,镰lián,簾lián,蠊lián,譧lián,鐮lián,鰱lián,籢lián,籨lián,槤lián,僆lián,匲lián,鬑lián,敛liǎn,琏liǎn,脸liǎn,裣liǎn,摙liǎn,璉liǎn,蔹liǎn,嬚liǎn,斂liǎn,歛liǎn,臉liǎn,鄻liǎn,襝liǎn,羷liǎn,蘝liǎn,蘞liǎn,薟liǎn,练liàn,炼liàn,恋liàn,浰liàn,殓liàn,堜liàn,媡liàn,链liàn,楝liàn,瑓liàn,潋liàn,稴liàn,練liàn,澰liàn,錬liàn,殮liàn,鍊liàn,鏈liàn,瀲liàn,鰊liàn,戀liàn,纞liàn,孌liàn,攣liàn,萰liàn,簗liāng,良liáng,凉liáng,梁liáng,涼liáng,椋liáng,辌liáng,粮liáng,粱liáng,墚liáng,綡liáng,輬liáng,糧liáng,駺liáng,樑liáng,冫liǎng,俩liǎng,倆liǎng,両liǎng,两liǎng,兩liǎng,唡liǎng,啢liǎng,掚liǎng,裲liǎng,緉liǎng,蜽liǎng,魉liǎng,魎liǎng,倞liàng,靓liàng,靚liàng,踉liàng,亮liàng,谅liàng,辆liàng,喨liàng,晾liàng,湸liàng,量liàng,煷liàng,輌liàng,諒liàng,輛liàng,鍄liàng,蹽liāo,樛liáo,潦liáo,辽liáo,疗liáo,僚liáo,寥liáo,嵺liáo,憀liáo,漻liáo,膋liáo,嘹liáo,嫽liáo,寮liáo,嶚liáo,嶛liáo,憭liáo,撩liáo,敹liáo,獠liáo,缭liáo,遼liáo,暸liáo,燎liáo,璙liáo,窷liáo,膫liáo,療liáo,竂liáo,鹩liáo,屪liáo,廫liáo,簝liáo,蟟liáo,豂liáo,賿liáo,蹘liáo,爎liáo,髎liáo,飉liáo,鷯liáo,镽liáo,尞liáo,镠liáo,鏐liáo,僇liáo,聊liáo,繚liáo,钌liǎo,釕liǎo,鄝liǎo,蓼liǎo,爒liǎo,瞭liǎo,廖liào,镣liào,鐐liào,尥liào,炓liào,料liào,撂liào,蟉liào,鴷lie,咧liě,毟liě,挘liě,埓liě,忚liě,列liè,劣liè,冽liè,姴liè,峢liè,挒liè,洌liè,茢liè,迾liè,埒liè,浖liè,烈liè,烮liè,捩liè,猎liè,猟liè,脟liè,蛚liè,裂liè,煭liè,睙liè,聗liè,趔liè,巤liè,颲liè,鮤liè,獵liè,犣liè,躐liè,鬛liè,哷liè,劦liè,奊liè,劽liè,鬣liè,拎līn,邻lín,林lín,临lín,啉lín,崊lín,淋lín,晽lín,琳lín,粦lín,痳lín,碄lín,箖lín,粼lín,鄰lín,隣lín,嶙lín,潾lín,獜lín,遴lín,斴lín,暽lín,燐lín,璘lín,辚lín,霖lín,瞵lín,磷lín,繗lín,翷lín,麐lín,轔lín,壣lín,瀶lín,鏻lín,鳞lín,驎lín,麟lín,鱗lín,疄lín,蹸lín,魿lín,涁lín,臨lín,菻lǐn,亃lǐn,僯lǐn,凛lǐn,凜lǐn,撛lǐn,廩lǐn,廪lǐn,懍lǐn,懔lǐn,澟lǐn,檁lǐn,檩lǐn,伈lǐn,吝lìn,恡lìn,赁lìn,焛lìn,賃lìn,蔺lìn,橉lìn,甐lìn,膦lìn,閵lìn,藺lìn,躏lìn,躙lìn,躪lìn,轥lìn,悋lìn,伶líng,刢líng,灵líng,囹líng,坽líng,夌líng,姈líng,岺líng,彾líng,泠líng,狑líng,苓líng,昤líng,柃líng,玲líng,瓴líng,凌líng,皊líng,砱líng,秢líng,竛líng,铃líng,陵líng,鸰líng,婈líng,崚líng,掕líng,棂líng,淩líng,琌líng,笭líng,紷líng,绫líng,羚líng,翎líng,聆líng,舲líng,菱líng,蛉líng,衑líng,祾líng,詅líng,跉líng,蓤líng,裬líng,鈴líng,閝líng,零líng,龄líng,綾líng,蔆líng,霊líng,駖líng,澪líng,蕶líng,錂líng,霗líng,鲮líng,鴒líng,鹷líng,燯líng,霛líng,霝líng,齢líng,瀮líng,酃líng,鯪líng,孁líng,蘦líng,齡líng,櫺líng,靈líng,欞líng,爧líng,麢líng,龗líng,阾líng,袊líng,靇líng,朎líng,軨líng,醽líng,岭lǐng,领lǐng,領lǐng,嶺lǐng,令lìng,另lìng,呤lìng,炩lìng,溜liū,熘liū,澑liū,蹓liū,刘liú,沠liú,畄liú,浏liú,流liú,留liú,旈liú,琉liú,畱liú,硫liú,裗liú,媹liú,嵧liú,旒liú,蓅liú,遛liú,馏liú,骝liú,榴liú,瑠liú,飗liú,劉liú,瑬liú,瘤liú,磂liú,镏liú,駠liú,鹠liú,橊liú,璢liú,疁liú,癅liú,駵liú,嚠liú,懰liú,瀏liú,藰liú,鎏liú,鎦liú,餾liú,麍liú,鐂liú,騮liú,飅liú,鰡liú,鶹liú,驑liú,蒥liú,飀liú,柳liǔ,栁liǔ,桞liǔ,珋liǔ,桺liǔ,绺liǔ,锍liǔ,綹liǔ,熮liǔ,罶liǔ,鋶liǔ,橮liǔ,羀liǔ,嬼liǔ,畂liù,六liù,翏liù,塯liù,廇liù,磟liù,鹨liù,霤liù,雡liù,鬸liù,鷚liù,飂liù,囖lō,谾lóng,龙lóng,屸lóng,咙lóng,泷lóng,茏lóng,昽lóng,栊lóng,珑lóng,胧lóng,眬lóng,砻lóng,笼lóng,聋lóng,隆lóng,湰lóng,嶐lóng,槞lóng,漋lóng,蕯lóng,癃lóng,窿lóng,篭lóng,龍lóng,巃lóng,巄lóng,瀧lóng,蘢lóng,鏧lóng,霳lóng,曨lóng,櫳lóng,爖lóng,瓏lóng,矓lóng,礱lóng,礲lóng,襱lóng,籠lóng,聾lóng,蠪lóng,蠬lóng,龓lóng,豅lóng,躘lóng,鑨lóng,驡lóng,鸗lóng,滝lóng,嚨lóng,朧lǒng,陇lǒng,垄lǒng,垅lǒng,儱lǒng,隴lǒng,壟lǒng,壠lǒng,攏lǒng,竉lǒng,徿lǒng,拢lǒng,梇lòng,衖lòng,贚lòng,喽lou,嘍lou,窶lóu,娄lóu,婁lóu,溇lóu,蒌lóu,楼lóu,廔lóu,慺lóu,蔞lóu,遱lóu,樓lóu,熡lóu,耧lóu,蝼lóu,艛lóu,螻lóu,謱lóu,軁lóu,髅lóu,鞻lóu,髏lóu,漊lóu,屚lóu,膢lóu,耬lóu,嵝lǒu,搂lǒu,塿lǒu,嶁lǒu,摟lǒu,甊lǒu,篓lǒu,簍lǒu,陋lòu,漏lòu,瘘lòu,镂lòu,瘺lòu,鏤lòu,氌lu,氇lu,噜lū,撸lū,嚕lū,擼lū,卢lú,芦lú,垆lú,枦lú,泸lú,炉lú,栌lú,胪lú,轳lú,舮lú,鸬lú,玈lú,舻lú,颅lú,鈩lú,鲈lú,魲lú,盧lú,嚧lú,壚lú,廬lú,攎lú,瀘lú,獹lú,蘆lú,櫨lú,爐lú,瓐lú,臚lú,矑lú,纑lú,罏lú,艫lú,蠦lú,轤lú,鑪lú,顱lú,髗lú,鱸lú,鸕lú,黸lú,鹵lú,塷lú,庐lú,籚lú,卤lǔ,虏lǔ,挔lǔ,捛lǔ,掳lǔ,硵lǔ,鲁lǔ,虜lǔ,滷lǔ,蓾lǔ,樐lǔ,澛lǔ,魯lǔ,擄lǔ,橹lǔ,磠lǔ,镥lǔ,櫓lǔ,艣lǔ,鏀lǔ,艪lǔ,鐪lǔ,鑥lǔ,瀂lǔ,露lù,圥lù,甪lù,陆lù,侓lù,坴lù,彔lù,录lù,峍lù,勎lù,赂lù,辂lù,陸lù,娽lù,淕lù,淥lù,渌lù,硉lù,菉lù,逯lù,鹿lù,椂lù,琭lù,祿lù,剹lù,勠lù,盝lù,睩lù,碌lù,稑lù,賂lù,路lù,輅lù,塶lù,廘lù,摝lù,漉lù,箓lù,粶lù,蔍lù,戮lù,膟lù,觮lù,趢lù,踛lù,辘lù,醁lù,潞lù,穋lù,錄lù,録lù,錴lù,璐lù,簏lù,螰lù,鴼lù,簶lù,蹗lù,轆lù,騄lù,鹭lù,簬lù,簵lù,鯥lù,鵦lù,鵱lù,麓lù,鏴lù,騼lù,籙lù,虂lù,鷺lù,緑lù,攄lù,禄lù,蕗lù,娈luán,孪luán,峦luán,挛luán,栾luán,鸾luán,脔luán,滦luán,銮luán,鵉luán,奱luán,孿luán,巒luán,曫luán,欒luán,灓luán,羉luán,臠luán,圞luán,灤luán,虊luán,鑾luán,癴luán,癵luán,鸞luán,圝luán,卵luǎn,乱luàn,釠luàn,亂luàn,乿luàn,掠luě,稤luě,略luè,畧luè,锊luè,圙luè,鋝luè,鋢luè,剠luè,擽luè,抡lún,掄lún,仑lún,伦lún,囵lún,沦lún,纶lún,轮lún,倫lún,陯lún,圇lún,婨lún,崘lún,崙lún,惀lún,淪lún,菕lún,棆lún,腀lún,碖lún,綸lún,蜦lún,踚lún,輪lún,磮lún,鯩lún,耣lún,稐lǔn,埨lǔn,侖lùn,溣lùn,論lùn,论lùn,頱luō,囉luō,啰luō,罗luó,猡luó,脶luó,萝luó,逻luó,椤luó,腡luó,锣luó,箩luó,骡luó,镙luó,螺luó,羅luó,覶luó,鏍luó,儸luó,覼luó,騾luó,蘿luó,邏luó,欏luó,鸁luó,鑼luó,饠luó,驘luó,攞luó,籮luó,剆luǒ,倮luǒ,砢luǒ,蓏luǒ,裸luǒ,躶luǒ,瘰luǒ,蠃luǒ,臝luǒ,曪luǒ,癳luǒ,茖luò,蛒luò,硦luò,泺luò,峈luò,洛luò,络luò,荦luò,骆luò,洜luò,珞luò,笿luò,絡luò,落luò,摞luò,漯luò,犖luò,雒luò,鮥luò,鵅luò,濼luò,纙luò,挼luò,跞luò,駱luò,瞜lǘ,瘻lǘ,驴lǘ,闾lǘ,榈lǘ,馿lǘ,氀lǘ,櫚lǘ,藘lǘ,曥lǘ,鷜lǘ,驢lǘ,閭lǘ,偻lǚ,僂lǚ,吕lǚ,呂lǚ,侣lǚ,郘lǚ,侶lǚ,旅lǚ,梠lǚ,焒lǚ,祣lǚ,稆lǚ,铝lǚ,屡lǚ,絽lǚ,缕lǚ,屢lǚ,膂lǚ,膐lǚ,褛lǚ,鋁lǚ,履lǚ,褸lǚ,儢lǚ,縷lǚ,穭lǚ,捋lǚ,穞lǚ,寠lǜ,滤lǜ,濾lǜ,寽lǜ,垏lǜ,律lǜ,虑lǜ,率lǜ,绿lǜ,嵂lǜ,氯lǜ,葎lǜ,綠lǜ,慮lǜ,箻lǜ,勴lǜ,繂lǜ,櫖lǜ,爈lǜ,鑢lǜ,卛lǜ,亇ma,吗ma,嗎ma,嘛ma,妈mā,媽mā,痲mā,孖mā,麻má,嫲má,蔴má,犘má,蟆má,蟇má,尛má,马mǎ,犸mǎ,玛mǎ,码mǎ,蚂mǎ,馬mǎ,溤mǎ,獁mǎ,遤mǎ,瑪mǎ,碼mǎ,螞mǎ,鷌mǎ,鰢mǎ,傌mǎ,榪mǎ,鎷mǎ,杩mà,祃mà,閁mà,骂mà,睰mà,嘜mà,禡mà,罵mà,駡mà,礣mà,鬕mà,貍mái,埋mái,霾mái,买mǎi,荬mǎi,買mǎi,嘪mǎi,蕒mǎi,鷶mǎi,唛mài,劢mài,佅mài,売mài,麦mài,卖mài,脈mài,麥mài,衇mài,勱mài,賣mài,邁mài,霡mài,霢mài,迈mài,颟mān,顢mān,姏mán,悗mán,蛮mán,慲mán,摱mán,馒mán,槾mán,樠mán,瞒mán,瞞mán,鞔mán,饅mán,鳗mán,鬗mán,鬘mán,蠻mán,矕mán,僈mán,屘mǎn,満mǎn,睌mǎn,满mǎn,滿mǎn,螨mǎn,襔mǎn,蟎mǎn,鏋mǎn,曼màn,谩màn,墁màn,幔màn,慢màn,漫màn,獌màn,缦màn,蔄màn,蔓màn,熳màn,澷màn,镘màn,縵màn,蟃màn,鏝màn,蘰màn,鰻màn,謾màn,牤māng,朚máng,龒máng,邙máng,吂máng,忙máng,汒máng,芒máng,尨máng,杗máng,杧máng,盲máng,厖máng,恾máng,笀máng,茫máng,哤máng,娏máng,浝máng,狵máng,牻máng,硭máng,釯máng,铓máng,痝máng,鋩máng,駹máng,蘉máng,氓máng,甿máng,庬máng,鹲máng,鸏máng,莽mǎng,茻mǎng,壾mǎng,漭mǎng,蟒mǎng,蠎mǎng,莾mǎng,匁mangmi,猫māo,貓māo,毛máo,矛máo,枆máo,牦máo,茅máo,旄máo,渵máo,軞máo,酕máo,堥máo,锚máo,緢máo,髦máo,髳máo,錨máo,蟊máo,鶜máo,茆máo,罞máo,鉾máo,冇mǎo,戼mǎo,峁mǎo,泖mǎo,昴mǎo,铆mǎo,笷mǎo,蓩mǎo,鉚mǎo,卯mǎo,秏mào,冃mào,皃mào,芼mào,冐mào,茂mào,冒mào,贸mào,耄mào,袤mào,覒mào,媢mào,帽mào,貿mào,鄚mào,愗mào,暓mào,楙mào,毷mào,瑁mào,貌mào,鄮mào,蝐mào,懋mào,霿mào,獏mào,毣mào,萺mào,瞀mào,唜mas,么me,嚜me,麼me,麽me,庅mē,嚒mē,孭mē,濹mè,嚰mè,沒méi,没méi,枚méi,玫méi,苺méi,栂méi,眉méi,脄méi,莓méi,梅méi,珻méi,脢méi,郿méi,堳méi,媒méi,嵋méi,湄méi,湈méi,睂méi,葿méi,楣méi,楳méi,煤méi,瑂méi,禖méi,腜méi,塺méi,槑méi,酶méi,镅méi,鹛méi,鋂méi,霉méi,徾méi,鎇méi,矀méi,攗méi,蘪méi,鶥méi,攟méi,黴méi,坆méi,猸méi,羙měi,毎měi,每měi,凂měi,美měi,挴měi,浼měi,媄měi,渼měi,媺měi,镁měi,嬍měi,燘měi,躾měi,鎂měi,黣měi,嵄měi,眊mèi,妹mèi,抺mèi,沬mèi,昧mèi,祙mèi,袂mèi,眛mèi,媚mèi,寐mèi,痗mèi,跊mèi,鬽mèi,煝mèi,睸mèi,魅mèi,篃mèi,蝞mèi,櫗mèi,氼mèi,们men,們men,椚mēn,门mén,扪mén,钔mén,門mén,閅mén,捫mén,菛mén,璊mén,穈mén,鍆mén,虋mén,怋mén,玣mén,殙mèn,闷mèn,焖mèn,悶mèn,暪mèn,燜mèn,懑mèn,懣mèn,掹mēng,擝mēng,懞mēng,虻méng,冡méng,莔méng,萌méng,萠méng,盟méng,甍méng,儚méng,橗méng,瞢méng,蕄méng,蝱méng,鄳méng,鄸méng,幪méng,濛méng,獴méng,曚méng,朦méng,檬méng,氋méng,礞méng,鯍méng,艨méng,矒méng,靀méng,饛méng,顭méng,蒙méng,鼆méng,夣méng,懜méng,溕méng,矇měng,勐měng,猛měng,锰měng,艋měng,蜢měng,錳měng,懵měng,蠓měng,鯭měng,黽měng,瓾měng,夢mèng,孟mèng,梦mèng,霥mèng,踎meo,咪mī,瞇mī,眯mī,冞mí,弥mí,祢mí,迷mí,袮mí,猕mí,谜mí,蒾mí,詸mí,謎mí,醚mí,彌mí,糜mí,縻mí,麊mí,麋mí,禰mí,靡mí,獼mí,麛mí,爢mí,瓕mí,蘼mí,镾mí,醾mí,醿mí,鸍mí,釄mí,檷mí,籋mí,罙mí,擟mí,米mǐ,羋mǐ,芈mǐ,侎mǐ,沵mǐ,弭mǐ,洣mǐ,敉mǐ,粎mǐ,脒mǐ,葞mǐ,蝆mǐ,蔝mǐ,銤mǐ,瀰mǐ,孊mǐ,灖mǐ,渳mǐ,哋mì,汨mì,沕mì,宓mì,泌mì,觅mì,峚mì,宻mì,秘mì,密mì,淧mì,覓mì,覔mì,幂mì,谧mì,塓mì,幎mì,覛mì,嘧mì,榓mì,漞mì,熐mì,蔤mì,蜜mì,鼏mì,冪mì,樒mì,幦mì,濗mì,藌mì,謐mì,櫁mì,簚mì,羃mì,鑖mì,蓂mì,滵mì,芇mián,眠mián,婂mián,绵mián,媔mián,棉mián,綿mián,緜mián,蝒mián,嬵mián,檰mián,櫋mián,矈mián,矊mián,蠠mián,矏mián,厸miǎn,丏miǎn,汅miǎn,免miǎn,沔miǎn,黾miǎn,俛miǎn,勉miǎn,眄miǎn,娩miǎn,偭miǎn,冕miǎn,勔miǎn,喕miǎn,愐miǎn,湎miǎn,缅miǎn,葂miǎn,腼miǎn,緬miǎn,鮸miǎn,渑miǎn,澠miǎn,靦miǎn,靣miàn,面miàn,糆miàn,麪miàn,麫miàn,麺miàn,麵miàn,喵miāo,苗miáo,媌miáo,瞄miáo,鹋miáo,嫹miáo,鶓miáo,鱙miáo,描miáo,訬miǎo,仯miǎo,杪miǎo,眇miǎo,秒miǎo,淼miǎo,渺miǎo,缈miǎo,篎miǎo,緲miǎo,藐miǎo,邈miǎo,妙miào,庙miào,竗miào,庿miào,廟miào,吀miē,咩miē,哶miē,灭miè,搣miè,滅miè,薎miè,幭miè,懱miè,篾miè,蠛miè,衊miè,鱴miè,蔑miè,民mín,垊mín,姄mín,岷mín,旻mín,旼mín,玟mín,苠mín,珉mín,盿mín,冧mín,罠mín,崏mín,捪mín,琘mín,琝mín,暋mín,瑉mín,痻mín,碈mín,鈱mín,賯mín,錉mín,鍲mín,缗mín,湏mǐn,緍mǐn,緡mǐn,皿mǐn,冺mǐn,刡mǐn,闵mǐn,抿mǐn,泯mǐn,勄mǐn,敃mǐn,闽mǐn,悯mǐn,敏mǐn,笢mǐn,笽mǐn,湣mǐn,閔mǐn,愍mǐn,敯mǐn,閩mǐn,慜mǐn,憫mǐn,潣mǐn,簢mǐn,鳘mǐn,鰵mǐn,僶mǐn,名míng,明míng,鸣míng,洺míng,眀míng,茗míng,冥míng,朙míng,眳míng,铭míng,鄍míng,嫇míng,溟míng,猽míng,暝míng,榠míng,銘míng,鳴míng,瞑míng,螟míng,覭míng,佲mǐng,凕mǐng,慏mǐng,酩mǐng,姳mǐng,命mìng,掵mìng,詺mìng,谬miù,缪miù,繆miù,謬miù,摸mō,嚤mō,嬤mó,嬷mó,戂mó,攠mó,谟mó,嫫mó,馍mó,摹mó,模mó,膜mó,摩mó,魹mó,橅mó,磨mó,糢mó,謨mó,謩mó,擵mó,饃mó,蘑mó,髍mó,魔mó,劘mó,饝mó,嚩mó,懡mǒ,麿mǒ,狢mò,貈mò,貉mò,脉mò,瀎mò,抹mò,末mò,劰mò,圽mò,妺mò,怽mò,歿mò,殁mò,沫mò,茉mò,陌mò,帞mò,昩mò,枺mò,皌mò,眜mò,眿mò,砞mò,秣mò,莈mò,眽mò,粖mò,絈mò,蛨mò,貃mò,嗼mò,塻mò,寞mò,漠mò,蓦mò,貊mò,銆mò,墨mò,嫼mò,暯mò,瘼mò,瞐mò,瞙mò,镆mò,魩mò,黙mò,縸mò,默mò,貘mò,藦mò,蟔mò,鏌mò,爅mò,礳mò,纆mò,耱mò,艒mò,莫mò,驀mò,乮mol,哞mōu,呣móu,蛑móu,蝥móu,牟móu,侔móu,劺móu,恈móu,洠móu,眸móu,谋móu,謀móu,鍪móu,鴾móu,麰móu,鞪móu,某mǒu,呒mú,嘸mú,毪mú,氁mú,母mǔ,亩mǔ,牡mǔ,姆mǔ,拇mǔ,牳mǔ,畆mǔ,畒mǔ,胟mǔ,畝mǔ,畞mǔ,砪mǔ,畮mǔ,鉧mǔ,踇mǔ,坶mǔ,峔mǔ,朷mù,木mù,仫mù,目mù,凩mù,沐mù,狇mù,炑mù,牧mù,苜mù,莯mù,蚞mù,钼mù,募mù,雮mù,墓mù,幕mù,慔mù,楘mù,睦mù,鉬mù,慕mù,暮mù,樢mù,霂mù,穆mù,幙mù,旀myeo,椧myeong,秅ná,拏ná,拿ná,挐ná,誽ná,镎ná,鎿ná,乸ná,詉ná,蒘ná,訤ná,哪nǎ,雫nǎ,郍nǎ,那nà,吶nà,妠nà,纳nà,肭nà,娜nà,钠nà,納nà,袦nà,捺nà,笝nà,豽nà,軜nà,鈉nà,嗱nà,蒳nà,靹nà,魶nà,呐nà,內nà,篛nà,衲nà,腉nái,熋nái,摨nái,孻nái,螚nái,搱nái,乃nǎi,奶nǎi,艿nǎi,氖nǎi,疓nǎi,妳nǎi,廼nǎi,迺nǎi,倷nǎi,釢nǎi,奈nài,柰nài,萘nài,渿nài,鼐nài,褦nài,錼nài,耐nài,囡nān,男nán,抩nán,枏nán,枬nán,侽nán,南nán,柟nán,娚nán,畘nán,莮nán,难nán,喃nán,遖nán,暔nán,楠nán,煵nán,諵nán,難nán,萳nán,嫨nǎn,赧nǎn,揇nǎn,湳nǎn,腩nǎn,戁nǎn,蝻nǎn,婻nàn,囔nāng,涳náng,乪náng,嚢náng,囊náng,蠰náng,鬞náng,馕náng,欜náng,饢náng,搑náng,崀nǎng,擃nǎng,曩nǎng,攮nǎng,灢nǎng,瀼nǎng,儾nàng,齉nàng,孬nāo,檂nāo,巙náo,呶náo,怓náo,挠náo,峱náo,硇náo,铙náo,猱náo,蛲náo,碙náo,撓náo,獶náo,蟯náo,夒náo,譊náo,鐃náo,巎náo,獿náo,憹náo,蝚náo,嶩náo,垴nǎo,恼nǎo,悩nǎo,脑nǎo,匘nǎo,脳nǎo,堖nǎo,惱nǎo,嫐nǎo,瑙nǎo,腦nǎo,碯nǎo,闹nào,婥nào,淖nào,閙nào,鬧nào,臑nào,呢ne,讷nè,抐nè,眲nè,訥nè,娞něi,馁něi,腇něi,餒něi,鮾něi,鯘něi,浽něi,内nèi,氝nèi,焾nem,嫩nèn,媆nèn,嫰nèn,竜néng,能néng,莻neus,鈪ngag,銰ngai,啱ngam,妮nī,尼ní,坭ní,怩ní,泥ní,籾ní,倪ní,屔ní,秜ní,郳ní,铌ní,埿ní,婗ní,猊ní,蚭ní,棿ní,跜ní,鈮ní,蜺ní,觬ní,貎ní,霓ní,鲵ní,鯢ní,麑ní,齯ní,臡ní,抳ní,蛪ní,腝ní,淣ní,聻nǐ,濔nǐ,伱nǐ,你nǐ,拟nǐ,狔nǐ,苨nǐ,柅nǐ,旎nǐ,晲nǐ,孴nǐ,鉨nǐ,馜nǐ,隬nǐ,擬nǐ,薿nǐ,鑈nǐ,儞nǐ,伲nì,迡nì,昵nì,胒nì,逆nì,匿nì,痆nì,眤nì,堄nì,惄nì,嫟nì,愵nì,溺nì,睨nì,腻nì,暱nì,縌nì,膩nì,嬺nì,灄nì,孨nì,拈niān,蔫niān,年nián,秊nián,哖nián,秥nián,鮎nián,鲶nián,鵇nián,黏nián,鯰nián,姩nián,鲇nián,跈niǎn,涊niǎn,捻niǎn,淰niǎn,辇niǎn,撚niǎn,撵niǎn,碾niǎn,輦niǎn,簐niǎn,攆niǎn,蹨niǎn,躎niǎn,辗niǎn,輾niǎn,卄niàn,廿niàn,念niàn,埝niàn,艌niàn,娘niáng,嬢niáng,醸niáng,酿niàng,釀niàng,茮niǎo,尦niǎo,鸟niǎo,袅niǎo,鳥niǎo,嫋niǎo,裊niǎo,蔦niǎo,嬝niǎo,褭niǎo,嬲niǎo,茑niǎo,尿niào,脲niào,捏niē,揑niē,乜niè,帇niè,圼niè,苶niè,枿niè,陧niè,涅niè,聂niè,臬niè,啮niè,惗niè,菍niè,隉niè,喦niè,敜niè,嗫niè,嵲niè,踂niè,摰niè,槷niè,踗niè,踙niè,镊niè,镍niè,嶭niè,篞niè,臲niè,錜niè,颞niè,蹑niè,嚙niè,聶niè,鎳niè,闑niè,孼niè,孽niè,櫱niè,蘖niè,囁niè,齧niè,巕niè,糱niè,糵niè,蠥niè,囓niè,躡niè,鑷niè,顳niè,諗niè,囐niè,銸niè,鋷niè,讘niè,脌nīn,囜nín,您nín,恁nín,拰nǐn,宁níng,咛níng,狞níng,柠níng,聍níng,寍níng,寕níng,寜níng,寧níng,儜níng,凝níng,嚀níng,嬣níng,獰níng,薴níng,檸níng,聹níng,鑏níng,鬡níng,鸋níng,甯níng,濘níng,鬤níng,拧nǐng,擰nǐng,矃nǐng,橣nǐng,佞nìng,侫nìng,泞nìng,寗nìng,澝nìng,妞niū,牛niú,牜niú,忸niǔ,扭niǔ,沑niǔ,狃niǔ,纽niǔ,杻niǔ,炄niǔ,钮niǔ,紐niǔ,莥niǔ,鈕niǔ,靵niǔ,拗niù,莀nóng,农nóng,侬nóng,哝nóng,浓nóng,脓nóng,秾nóng,儂nóng,辳nóng,噥nóng,濃nóng,蕽nóng,禯nóng,膿nóng,穠nóng,襛nóng,醲nóng,欁nóng,癑nóng,農nóng,繷nǒng,廾nòng,弄nòng,挊nòng,挵nòng,齈nòng,羺nóu,譨nóu,啂nǒu,槈nòu,耨nòu,獳nòu,檽nòu,鎒nòu,鐞nòu,譳nòu,嬬nòu,奴nú,驽nú,笯nú,駑nú,砮nú,孥nú,伮nǔ,努nǔ,弩nǔ,胬nǔ,怒nù,傉nù,搙nù,奻nuán,渜nuán,暖nuǎn,煗nuǎn,餪nuǎn,疟nuè,虐nuè,瘧nuè,硸nuè,黁nun,燶nung,挪nuó,梛nuó,傩nuó,搻nuó,儺nuó,橠nuó,袲nuǒ,诺nuò,喏nuò,掿nuò,逽nuò,搦nuò,锘nuò,榒nuò,稬nuò,諾nuò,蹃nuò,糑nuò,懦nuò,懧nuò,糥nuò,穤nuò,糯nuò,堧nuò,耎nuò,愞nuò,女nǚ,钕nǚ,籹nǚ,釹nǚ,衂nǜ,恧nǜ,朒nǜ,衄nǜ,筽o,噢ō,哦ò,夞oes,乯ol,鞰on,吽ōu,讴ōu,欧ōu,殴ōu,瓯ōu,鸥ōu,塸ōu,歐ōu,毆ōu,熰ōu,甌ōu,膒ōu,鴎ōu,櫙ōu,藲ōu,謳ōu,鏂ōu,鷗ōu,沤ōu,蓲ōu,敺ōu,醧ōu,漚ōu,齵óu,澫ǒu,吘ǒu,呕ǒu,偶ǒu,腢ǒu,嘔ǒu,耦ǒu,蕅ǒu,藕ǒu,怄òu,慪òu,妑pā,趴pā,舥pā,啪pā,葩pā,帊pā,杷pá,爬pá,耙pá,掱pá,琶pá,筢pá,潖pá,跁pá,帕pà,怕pà,袙pà,拍pāi,俳pái,徘pái,排pái,猅pái,牌pái,輫pái,簰pái,犤pái,哌pài,派pài,蒎pài,鎃pài,湃pài,磗pak,眅pān,畨pān,潘pān,攀pān,膰pán,爿pán,柈pán,盘pán,媻pán,幋pán,蒰pán,槃pán,盤pán,磐pán,縏pán,蹒pán,瀊pán,蟠pán,蹣pán,鎜pán,鞶pán,踫pán,宷pán,洀pán,闆pǎn,坢pǎn,盻pǎn,眫pàn,冸pàn,判pàn,沜pàn,泮pàn,叛pàn,牉pàn,盼pàn,畔pàn,袢pàn,詊pàn,溿pàn,頖pàn,鋬pàn,鵥pàn,襻pàn,鑻pàn,炍pàn,乓pāng,汸pāng,沗pāng,肨pāng,胮pāng,雱pāng,滂pāng,膖pāng,霶pāng,磅páng,趽páng,彷páng,夆páng,厐páng,庞páng,逄páng,旁páng,舽páng,篣páng,螃páng,鳑páng,龐páng,鰟páng,蠭páng,髈páng,龎páng,耪pǎng,覫pǎng,炐pàng,胖pàng,抛pāo,拋pāo,脬pāo,刨páo,咆páo,垉páo,庖páo,狍páo,炰páo,爮páo,袍páo,匏páo,軳páo,鞄páo,褜páo,麅páo,颮páo,跑pǎo,窌pào,炮pào,奅pào,泡pào,皰pào,砲pào,萢pào,麭pào,礟pào,礮pào,犥pào,疱pào,妚pēi,呸pēi,怌pēi,肧pēi,胚pēi,衃pēi,醅pēi,抷pēi,阫péi,陪péi,陫péi,培péi,毰péi,赔péi,锫péi,裴péi,裵péi,賠péi,錇péi,駍péi,婄péi,俖pěi,茷pèi,攈pèi,伂pèi,沛pèi,佩pèi,帔pèi,姵pèi,旆pèi,浿pèi,珮pèi,配pèi,笩pèi,蓜pèi,辔pèi,馷pèi,嶏pèi,霈pèi,轡pèi,斾pèi,喷pēn,噴pēn,濆pēn,歕pēn,衯pén,瓫pén,盆pén,湓pén,葐pén,呠pěn,翸pěn,匉pēng,怦pēng,抨pēng,泙pēng,恲pēng,胓pēng,砰pēng,烹pēng,硑pēng,軯pēng,閛pēng,漰pēng,嘭pēng,磞pēng,弸pēng,荓pēng,軿pēng,輧pēng,梈pēng,芃péng,朋péng,竼péng,倗péng,莑péng,堋péng,彭péng,棚péng,椖péng,塜péng,塳péng,漨péng,硼péng,稝péng,蓬péng,鹏péng,槰péng,樥péng,憉péng,澎péng,輣péng,篷péng,膨péng,韸péng,髼péng,蟚péng,蟛péng,鬅péng,纄péng,韼péng,鵬péng,鬔péng,鑝péng,淜péng,熢péng,摓pěng,捧pěng,淎pěng,皏pěng,剻pěng,掽pèng,椪pèng,碰pèng,浌peol,巼phas,闏phdeng,乶phoi,喸phos,榌pi,伓pī,伾pī,批pī,纰pī,邳pī,坯pī,披pī,炋pī,狉pī,狓pī,砒pī,秛pī,秠pī,紕pī,耚pī,豾pī,釽pī,鉟pī,銔pī,劈pī,磇pī,駓pī,噼pī,錃pī,魾pī,憵pī,礔pī,礕pī,霹pī,鲏pī,鮍pī,丕pī,髬pī,铍pí,鈹pí,皮pí,阰pí,芘pí,岯pí,枇pí,毞pí,毗pí,毘pí,疲pí,蚍pí,郫pí,陴pí,啤pí,埤pí,蚽pí,豼pí,焷pí,脾pí,腗pí,罴pí,膍pí,蜱pí,隦pí,壀pí,篺pí,螷pí,貔pí,簲pí,羆pí,鵧pí,朇pí,鼙pí,蠯pí,猈pí,琵pí,匹pǐ,庀pǐ,仳pǐ,圮pǐ,苉pǐ,脴pǐ,痞pǐ,銢pǐ,鴄pǐ,噽pǐ,癖pǐ,嚭pǐ,顖pǐ,擗pǐ,辟pì,鈲pì,闢pì,屁pì,淠pì,渒pì,揊pì,媲pì,嫓pì,睤pì,睥pì,潎pì,僻pì,澼pì,嚊pì,甓pì,疈pì,譬pì,鷿pì,囨piān,偏piān,媥piān,犏piān,篇piān,翩piān,骈pián,胼pián,楄pián,楩pián,賆pián,諚pián,骿pián,蹁pián,駢pián,騈pián,徧pián,腁pián,覑piǎn,谝piǎn,貵piǎn,諞piǎn,片piàn,骗piàn,魸piàn,騗piàn,騙piàn,剽piāo,彯piāo,漂piāo,缥piāo,飘piāo,磦piāo,旚piāo,縹piāo,翲piāo,螵piāo,飄piāo,魒piāo,薸piáo,闝piáo,嫖piáo,瓢piáo,莩piǎo,殍piǎo,瞟piǎo,醥piǎo,皫piǎo,顠piǎo,飃piào,票piào,勡piào,嘌piào,慓piào,覕piē,氕piē,撆piē,暼piē,瞥piē,撇piě,丿piě,苤piě,鐅piě,嫳piè,拚pīn,姘pīn,拼pīn,礗pīn,穦pīn,馪pīn,驞pīn,贫pín,貧pín,嫔pín,频pín,頻pín,嬪pín,薲pín,嚬pín,矉pín,颦pín,顰pín,蘋pín,玭pín,品pǐn,榀pǐn,朩pìn,牝pìn,汖pìn,聘pìn,娉pīng,乒pīng,甹pīng,俜pīng,涄pīng,砯pīng,艵pīng,竮pīng,頩pīng,冖píng,平píng,评píng,凭píng,坪píng,岼píng,苹píng,郱píng,屏píng,帡píng,枰píng,洴píng,玶píng,娦píng,瓶píng,屛píng,帲píng,萍píng,蚲píng,塀píng,幈píng,焩píng,甁píng,缾píng,聠píng,蓱píng,蛢píng,評píng,鲆píng,凴píng,慿píng,憑píng,鮃píng,簈píng,呯píng,箳píng,鏺po,钋pō,坡pō,岥pō,泼pō,釙pō,颇pō,溌pō,酦pō,潑pō,醱pō,頗pō,攴pō,巿pó,婆pó,嘙pó,鄱pó,皤pó,謈pó,櫇pó,叵pǒ,尀pǒ,钷pǒ,笸pǒ,鉕pǒ,駊pǒ,屰pò,廹pò,岶pò,迫pò,敀pò,昢pò,洦pò,珀pò,烞pò,破pò,砶pò,粕pò,奤pò,蒪pò,魄pò,皛pò,頮pōu,剖pōu,颒pōu,抙pōu,捊pōu,抔póu,掊póu,裒póu,咅pǒu,哣pǒu,犃pǒu,兺ppun,哛ppun,巬pu,巭pu,扑pū,炇pū,痡pū,駇pū,噗pū,撲pū,鋪pū,潽pū,襆pú,脯pú,蜅pú,仆pú,圤pú,匍pú,莆pú,菩pú,菐pú,葡pú,蒱pú,蒲pú,僕pú,酺pú,墣pú,璞pú,瞨pú,穙pú,镤pú,贌pú,纀pú,鏷pú,襥pú,濮pú,朴pǔ,圃pǔ,埔pǔ,浦pǔ,烳pǔ,普pǔ,圑pǔ,溥pǔ,暜pǔ,谱pǔ,樸pǔ,氆pǔ,諩pǔ,檏pǔ,镨pǔ,譜pǔ,蹼pǔ,鐠pǔ,铺pù,舖pù,舗pù,曝pù,七qī,沏qī,妻qī,恓qī,柒qī,倛qī,凄qī,栖qī,桤qī,缼qī,郪qī,娸qī,戚qī,捿qī,桼qī,淒qī,萋qī,朞qī,期qī,棲qī,欺qī,紪qī,褄qī,僛qī,嘁qī,慽qī,榿qī,漆qī,緀qī,磎qī,諆qī,諿qī,霋qī,蹊qī,魌qī,鏚qī,鶈qī,碕qī,螇qī,傶qī,迉qī,軙qí,荎qí,饑qí,亓qí,祁qí,齐qí,圻qí,岐qí,岓qí,忯qí,芪qí,亝qí,其qí,奇qí,斉qí,歧qí,祇qí,祈qí,肵qí,疧qí,竒qí,剘qí,斊qí,旂qí,脐qí,蚑qí,蚔qí,蚚qí,颀qí,埼qí,崎qí,掑qí,淇qí,渏qí,猉qí,畦qí,萁qí,跂qí,軝qí,釮qí,骐qí,骑qí,嵜qí,棊qí,棋qí,琦qí,琪qí,祺qí,蛴qí,愭qí,碁qí,鬿qí,旗qí,粸qí,綥qí,綦qí,綨qí,緕qí,蜝qí,蜞qí,齊qí,禥qí,蕲qí,螧qí,鲯qí,濝qí,藄qí,檱qí,櫀qí,簱qí,臍qí,騎qí,騏qí,鳍qí,蘄qí,鵸qí,鶀qí,麒qí,籏qí,纃qí,艩qí,蠐qí,鬐qí,騹qí,魕qí,鰭qí,玂qí,麡qí,荠qí,薺qí,扺qí,耆qí,鯕qí,袳qǐ,乞qǐ,邔qǐ,企qǐ,屺qǐ,岂qǐ,芑qǐ,启qǐ,呇qǐ,杞qǐ,玘qǐ,盀qǐ,唘qǐ,豈qǐ,起qǐ,啓qǐ,啔qǐ,啟qǐ,绮qǐ,棨qǐ,綮qǐ,綺qǐ,諬qǐ,簯qǐ,闙qǐ,梩qǐ,婍qǐ,鼜qì,悽qì,槭qì,气qì,讫qì,気qì,汔qì,迄qì,弃qì,汽qì,芞qì,呮qì,泣qì,炁qì,盵qì,咠qì,契qì,砌qì,栔qì,氣qì,訖qì,唭qì,夡qì,棄qì,湆qì,湇qì,葺qì,碛qì,摖qì,暣qì,甈qì,碶qì,噐qì,憇qì,器qì,憩qì,磜qì,磧qì,磩qì,罊qì,趞qì,洓qì,慼qì,欫qì,掐qiā,葜qiā,愘qiā,搳qiā,拤qiá,跒qiǎ,酠qiǎ,鞐qiǎ,圶qià,冾qià,恰qià,洽qià,殎qià,硈qià,髂qià,磍qià,帢qià,千qiān,仟qiān,阡qiān,圱qiān,圲qiān,奷qiān,扦qiān,汘qiān,芊qiān,迁qiān,佥qiān,岍qiān,杄qiān,汧qiān,茾qiān,竏qiān,臤qiān,钎qiān,拪qiān,牵qiān,粁qiān,悭qiān,蚈qiān,铅qiān,牽qiān,釺qiān,谦qiān,鈆qiān,僉qiān,愆qiān,签qiān,鉛qiān,骞qiān,鹐qiān,慳qiān,搴qiān,撁qiān,箞qiān,諐qiān,遷qiān,褰qiān,謙qiān,顅qiān,檶qiān,攐qiān,攑qiān,櫏qiān,簽qiān,鵮qiān,攓qiān,騫qiān,鬜qiān,鬝qiān,籤qiān,韆qiān,鋟qiān,扡qiān,杴qiān,孅qiān,藖qiān,谸qiān,鏲qiān,朁qián,岒qián,忴qián,扲qián,拑qián,前qián,荨qián,钤qián,歬qián,虔qián,钱qián,钳qián,乾qián,掮qián,軡qián,媊qián,鈐qián,鉗qián,榩qián,箝qián,潜qián,羬qián,橬qián,錢qián,黔qián,鎆qián,騝qián,濳qián,騚qián,灊qián,籖qián,鰬qián,潛qián,蚙qián,煔qián,燂qián,葴qián,鍼qián,墘qián,浅qiǎn,肷qiǎn,淺qiǎn,嵰qiǎn,遣qiǎn,槏qiǎn,膁qiǎn,蜸qiǎn,谴qiǎn,缱qiǎn,譴qiǎn,鑓qiǎn,繾qiǎn,欠qiàn,刋qiàn,伣qiàn,芡qiàn,俔qiàn,茜qiàn,倩qiàn,悓qiàn,堑qiàn,嵌qiàn,棈qiàn,椠qiàn,嗛qiàn,皘qiàn,蒨qiàn,塹qiàn,歉qiàn,綪qiàn,蔳qiàn,儙qiàn,槧qiàn,篏qiàn,輤qiàn,篟qiàn,壍qiàn,嬱qiàn,縴qiàn,廞qiàn,鸧qiāng,鶬qiāng,羌qiāng,戕qiāng,戗qiāng,斨qiāng,枪qiāng,玱qiāng,猐qiāng,琷qiāng,跄qiāng,嗴qiāng,獇qiāng,腔qiāng,溬qiāng,蜣qiāng,锖qiāng,嶈qiāng,戧qiāng,槍qiāng,牄qiāng,瑲qiāng,锵qiāng,篬qiāng,錆qiāng,蹌qiāng,镪qiāng,蹡qiāng,鏘qiāng,鏹qiāng,啌qiāng,鎗qiāng,強qiáng,强qiáng,墙qiáng,嫱qiáng,蔷qiáng,樯qiáng,漒qiáng,墻qiáng,嬙qiáng,廧qiáng,薔qiáng,檣qiáng,牆qiáng,謒qiáng,艢qiáng,蘠qiáng,抢qiǎng,羟qiǎng,搶qiǎng,羥qiǎng,墏qiǎng,摤qiǎng,繈qiǎng,襁qiǎng,繦qiǎng,嗆qiàng,炝qiàng,唴qiàng,羻qiàng,呛qiàng,熗qiàng,悄qiāo,硗qiāo,郻qiāo,跷qiāo,鄡qiāo,鄥qiāo,劁qiāo,敲qiāo,踍qiāo,锹qiāo,碻qiāo,頝qiāo,墽qiāo,幧qiāo,橇qiāo,燆qiāo,缲qiāo,鍫qiāo,鍬qiāo,繰qiāo,趬qiāo,鐰qiāo,鞽qiāo,塙qiāo,毃qiāo,鏒qiāo,橾qiāo,喿qiāo,蹺qiāo,峤qiáo,嶠qiáo,乔qiáo,侨qiáo,荍qiáo,荞qiáo,桥qiáo,硚qiáo,菬qiáo,喬qiáo,睄qiáo,僑qiáo,槗qiáo,谯qiáo,嘺qiáo,憔qiáo,蕎qiáo,鞒qiáo,樵qiáo,橋qiáo,犞qiáo,癄qiáo,瞧qiáo,礄qiáo,藮qiáo,譙qiáo,鐈qiáo,墧qiáo,顦qiáo,磽qiǎo,巧qiǎo,愀qiǎo,髜qiǎo,偢qiào,墝qiào,俏qiào,诮qiào,陗qiào,峭qiào,帩qiào,窍qiào,翘qiào,誚qiào,髚qiào,僺qiào,撬qiào,鞘qiào,韒qiào,竅qiào,翹qiào,鞩qiào,躈qiào,踃qiào,切qiē,苆qiē,癿qié,茄qié,聺qié,且qiě,詧qiè,慊qiè,厒qiè,怯qiè,匧qiè,窃qiè,倿qiè,悏qiè,挈qiè,惬qiè,笡qiè,愜qiè,朅qiè,箧qiè,緁qiè,锲qiè,篋qiè,踥qiè,穕qiè,藒qiè,鍥qiè,鯜qiè,鐑qiè,竊qiè,籡qiè,帹qiè,郄qiè,郤qiè,稧qiè,妾qiè,亲qīn,侵qīn,钦qīn,衾qīn,菳qīn,媇qīn,嵚qīn,綅qīn,誛qīn,嶔qīn,親qīn,顉qīn,駸qīn,鮼qīn,寴qīn,欽qīn,骎qīn,鈂qín,庈qín,芩qín,芹qín,埁qín,珡qín,矝qín,秦qín,耹qín,菦qín,捦qín,琴qín,琹qín,禽qín,鈙qín,雂qín,勤qín,嗪qín,嫀qín,靲qín,噙qín,擒qín,鳹qín,懄qín,檎qín,澿qín,瘽qín,螓qín,懃qín,蠄qín,鬵qín,溱qín,坅qǐn,昑qǐn,笉qǐn,梫qǐn,赾qǐn,寑qǐn,锓qǐn,寝qǐn,寢qǐn,螼qǐn,儭qìn,櫬qìn,吢qìn,吣qìn,抋qìn,沁qìn,唚qìn,菣qìn,搇qìn,撳qìn,瀙qìn,藽qìn,鈊qìn,揿qìn,鶄qīng,青qīng,氢qīng,轻qīng,倾qīng,卿qīng,郬qīng,圊qīng,埥qīng,氫qīng,淸qīng,清qīng,軽qīng,傾qīng,廎qīng,蜻qīng,輕qīng,鲭qīng,鯖qīng,鑋qīng,庼qīng,漀qīng,靘qīng,夝qíng,甠qíng,勍qíng,情qíng,硘qíng,晴qíng,棾qíng,氰qíng,暒qíng,樈qíng,擎qíng,檠qíng,黥qíng,殑qíng,苘qǐng,顷qǐng,请qǐng,頃qǐng,請qǐng,檾qǐng,謦qǐng,庆qìng,摐chuāng,牀chuáng,磢chuǎng,刱chuàng,吹chuī,糚zhuāng,庒zhuāng,漴zhuàng,丬zhuàng,壮zhuàng,凊qìng,掅qìng,碃qìng,箐qìng,慶qìng,磬qìng,罄qìng,櫦qìng,濪qìng,藭qiong,跫qióng,銎qióng,卭qióng,邛qióng,穷qióng,穹qióng,茕qióng,桏qióng,笻qióng,筇qióng,赹qióng,惸qióng,焪qióng,焭qióng,琼qióng,蛩qióng,蛬qióng,煢qióng,熍qióng,睘qióng,窮qióng,儝qióng,憌qióng,橩qióng,瓊qióng,竆qióng,嬛qióng,琁qióng,藑qióng,湫qiū,丘qiū,丠qiū,邱qiū,坵qiū,恘qiū,秋qiū,秌qiū,寈qiū,蚯qiū,媝qiū,楸qiū,鹙qiū,篍qiū,緧qiū,蝵qiū,穐qiū,趥qiū,鳅qiū,蟗qiū,鞦qiū,鞧qiū,蘒qiū,鰌qiū,鰍qiū,鱃qiū,龝qiū,逎qiū,櫹qiū,鶖qiū,叴qiú,囚qiú,扏qiú,犰qiú,玌qiú,肍qiú,求qiú,虬qiú,泅qiú,虯qiú,俅qiú,觓qiú,訅qiú,酋qiú,唒qiú,浗qiú,紌qiú,莍qiú,逑qiú,釚qiú,梂qiú,殏qiú,毬qiú,球qiú,釻qiú,崷qiú,巯qiú,湭qiú,皳qiú,盚qiú,遒qiú,煪qiú,絿qiú,蛷qiú,裘qiú,巰qiú,觩qiú,賕qiú,璆qiú,銶qiú,醔qiú,鮂qiú,鼽qiú,鯄qiú,鵭qiú,蠤qiú,鰽qiú,厹qiú,赇qiú,搝qiǔ,糗qiǔ,趍qū,匚qū,区qū,伹qū,匤qū,岖qū,诎qū,阹qū,驱qū,屈qū,岨qū,岴qū,抾qū,浀qū,祛qū,胠qū,袪qū,區qū,蛆qū,躯qū,筁qū,粬qū,蛐qū,詘qū,趋qū,嶇qū,駆qū,憈qū,駈qū,麹qū,髷qū,趨qū,麯qū,軀qū,麴qū,黢qū,驅qū,鰸qū,鱋qū,紶qū,厺qū,佉qū,跼qú,瞿qú,佢qú,劬qú,斪qú,朐qú,胊qú,菃qú,衐qú,鸲qú,淭qú,渠qú,絇qú,葋qú,蕖qú,璖qú,磲qú,璩qú,鼩qú,蘧qú,灈qú,戵qú,欋qú,氍qú,臞qú,癯qú,蠷qú,衢qú,躣qú,蠼qú,鑺qú,臒qú,蟝qú,曲qǔ,取qǔ,娶qǔ,詓qǔ,竬qǔ,龋qǔ,齲qǔ,去qù,刞qù,耝qù,阒qù,觑qù,趣qù,閴qù,麮qù,闃qù,覰qù,覷qù,鼁qù,覻qù,迲qù,峑quān,恮quān,悛quān,圈quān,駩quān,騡quān,鐉quān,腃quān,全quán,权quán,佺quán,诠quán,姾quán,泉quán,洤quán,荃quán,拳quán,辁quán,婘quán,痊quán,硂quán,铨quán,湶quán,犈quán,筌quán,絟quán,葲quán,搼quán,楾quán,瑔quán,觠quán,詮quán,跧quán,輇quán,蜷quán,銓quán,権quán,縓quán,醛quán,闎quán,鳈quán,鬈quán,巏quán,鰁quán,權quán,齤quán,颧quán,顴quán,灥quán,譔quán,牷quán,孉quán,犬quǎn,甽quǎn,畎quǎn,烇quǎn,绻quǎn,綣quǎn,虇quǎn,劝quàn,券quàn,巻quàn,牶quàn,椦quàn,勧quàn,勸quàn,炔quē,缺quē,蒛quē,瘸qué,却què,卻què,崅què,悫què,雀què,确què,阕què,皵què,碏què,阙què,鹊què,愨què,榷què,慤què,確què,燩què,闋què,闕què,鵲què,礭què,殻què,埆què,踆qūn,夋qūn,囷qūn,峮qūn,逡qūn,帬qún,裙qún,羣qún,群qún,裠qún,亽ra,罖ra,囕ram,呥rán,肰rán,衻rán,袇rán,蚦rán,袡rán,蚺rán,然rán,髥rán,嘫rán,髯rán,燃rán,繎rán,冄rán,冉rǎn,姌rǎn,苒rǎn,染rǎn,珃rǎn,媣rǎn,蒅rǎn,孃ráng,穣ráng,獽ráng,禳ráng,瓤ráng,穰ráng,躟ráng,壌rǎng,嚷rǎng,壤rǎng,攘rǎng,爙rǎng,让ràng,懹ràng,譲ràng,讓ràng,荛ráo,饶ráo,桡ráo,橈ráo,襓ráo,饒ráo,犪ráo,嬈ráo,娆ráo,扰rǎo,隢rǎo,擾rǎo,遶rǎo,绕rào,繞rào,惹rě,热rè,熱rè,渃rè,綛ren,人rén,仁rén,壬rén,忈rén,朲rén,忎rén,秂rén,芢rén,鈓rén,魜rén,銋rén,鵀rén,姙rén,忍rěn,荏rěn,栠rěn,栣rěn,荵rěn,秹rěn,稔rěn,躵rěn,刃rèn,刄rèn,认rèn,仞rèn,仭rèn,讱rèn,任rèn,屻rèn,扨rèn,纫rèn,妊rèn,牣rèn,纴rèn,肕rèn,轫rèn,韧rèn,饪rèn,紉rèn,衽rèn,紝rèn,訒rèn,軔rèn,梕rèn,袵rèn,絍rèn,靭rèn,靱rèn,韌rèn,飪rèn,認rèn,餁rèn,扔rēng,仍réng,辸réng,礽réng,芿réng,日rì,驲rì,囸rì,釰rì,鈤rì,馹rì,戎róng,肜róng,栄róng,狨róng,绒róng,茙róng,茸róng,荣róng,容róng,峵róng,毧róng,烿róng,嵘róng,絨róng,羢róng,嫆róng,搈róng,摉róng,榵róng,溶róng,蓉róng,榕róng,榮róng,熔róng,瑢róng,穁róng,蝾róng,褣róng,镕róng,氄róng,縙róng,融róng,螎róng,駥róng,嬫róng,嶸róng,爃róng,鎔róng,瀜róng,蠑róng,媶róng,曧róng,冗rǒng,宂rǒng,傇rǒng,穃ròng,禸róu,柔róu,粈róu,媃róu,揉róu,渘róu,葇róu,瑈róu,腬róu,糅róu,蹂róu,輮róu,鍒róu,鞣róu,瓇róu,騥róu,鰇róu,鶔róu,楺rǒu,煣rǒu,韖rǒu,肉ròu,宍ròu,嶿rū,如rú,侞rú,帤rú,茹rú,桇rú,袽rú,铷rú,渪rú,筎rú,銣rú,蕠rú,儒rú,鴑rú,嚅rú,孺rú,濡rú,薷rú,鴽rú,曘rú,燸rú,襦rú,蠕rú,颥rú,醹rú,顬rú,偄rú,鱬rú,汝rǔ,肗rǔ,乳rǔ,辱rǔ,鄏rǔ,擩rǔ,入rù,扖rù,込rù,杁rù,洳rù,嗕rù,媷rù,溽rù,缛rù,蓐rù,鳰rù,褥rù,縟rù,壖ruán,阮ruǎn,朊ruǎn,软ruǎn,軟ruǎn,碝ruǎn,緛ruǎn,蝡ruǎn,瓀ruǎn,礝ruǎn,瑌ruǎn,撋ruí,桵ruí,甤ruí,緌ruí,蕤ruí,蕊ruǐ,橤ruǐ,繠ruǐ,蘂ruǐ,蘃ruǐ,惢ruǐ,芮ruì,枘ruì,蚋ruì,锐ruì,瑞ruì,睿ruì,銳ruì,叡ruì,壡ruì,润rùn,閏rùn,閠rùn,潤rùn,橍rùn,闰rùn,叒ruò,若ruò,偌ruò,弱ruò,鄀ruò,焫ruò,楉ruò,嵶ruò,蒻ruò,箬ruò,爇ruò,鰙ruò,鰯ruò,鶸ruò,仨sā,桬sā,撒sā,洒sǎ,訯sǎ,靸sǎ,灑sǎ,卅sà,飒sà,脎sà,萨sà,隡sà,馺sà,颯sà,薩sà,櫒sà,栍saeng,毢sāi,塞sāi,毸sāi,腮sāi,嘥sāi,噻sāi,鳃sāi,顋sāi,鰓sāi,嗮sǎi,赛sài,僿sài,賽sài,簺sài,虄sal,厁san,壭san,三sān,弎sān,叁sān,毵sān,毶sān,毿sān,犙sān,鬖sān,糂sān,糝sān,糣sān,彡sān,氵sān,伞sǎn,傘sǎn,馓sǎn,橵sǎn,糤sǎn,繖sǎn,饊sǎn,散sàn,俕sàn,閐sàn,潵sàn,桒sāng,桑sāng,槡sāng,嗓sǎng,搡sǎng,褬sǎng,颡sǎng,鎟sǎng,顙sǎng,磉sǎng,丧sàng,喪sàng,掻sāo,搔sāo,溞sāo,骚sāo,缫sāo,繅sāo,鳋sāo,颾sāo,騒sāo,騷sāo,鰠sāo,鱢sāo,扫sǎo,掃sǎo,嫂sǎo,臊sào,埽sào,瘙sào,氉sào,矂sào,髞sào,色sè,涩sè,啬sè,渋sè,铯sè,歮sè,嗇sè,瑟sè,歰sè,銫sè,澁sè,懎sè,擌sè,濇sè,濏sè,瘷sè,穑sè,澀sè,璱sè,瀒sè,穡sè,繬sè,穯sè,轖sè,鏼sè,譅sè,飋sè,愬sè,鎍sè,溹sè,栜sè,裇sed,聓sei,森sēn,僧sēng,鬙sēng,閪seo,縇seon,杀shā,沙shā,纱shā,乷shā,刹shā,砂shā,唦shā,挱shā,殺shā,猀shā,紗shā,莎shā,铩shā,痧shā,硰shā,蔱shā,裟shā,樧shā,魦shā,鲨shā,閷shā,鯊shā,鯋shā,繺shā,賖shā,啥shá,傻shǎ,儍shǎ,繌shǎ,倽shà,唼shà,萐shà,歃shà,煞shà,翜shà,翣shà,閯shà,霎shà,厦shà,廈shà,筛shāi,篩shāi,簁shāi,簛shāi,酾shāi,釃shāi,摋shǎi,晒shài,曬shài,纔shān,穇shān,凵shān,襂shān,山shān,邖shān,圸shān,删shān,杉shān,杣shān,芟shān,姍shān,姗shān,衫shān,钐shān,埏shān,狦shān,珊shān,舢shān,痁shān,軕shān,笘shān,釤shān,閊shān,跚shān,剼shān,搧shān,嘇shān,幓shān,煽shān,潸shān,澘shān,曑shān,檆shān,膻shān,鯅shān,羴shān,羶shān,炶shān,苫shān,柵shān,栅shān,刪shān,闪shǎn,陕shǎn,陝shǎn,閃shǎn,晱shǎn,睒shǎn,熌shǎn,覢shǎn,曏shǎn,笧shàn,讪shàn,汕shàn,疝shàn,扇shàn,訕shàn,赸shàn,傓shàn,善shàn,椫shàn,銏shàn,骟shàn,僐shàn,鄯shàn,缮shàn,嬗shàn,擅shàn,敾shàn,樿shàn,膳shàn,磰shàn,謆shàn,赡shàn,繕shàn,蟮shàn,譱shàn,贍shàn,鐥shàn,饍shàn,騸shàn,鳝shàn,灗shàn,鱔shàn,鱣shàn,墡shàn,裳shang,塲shāng,伤shāng,殇shāng,商shāng,觞shāng,傷shāng,墒shāng,慯shāng,滳shāng,蔏shāng,殤shāng,熵shāng,螪shāng,觴shāng,謪shāng,鬺shāng,坰shǎng,垧shǎng,晌shǎng,赏shǎng,賞shǎng,鑜shǎng,丄shàng,上shàng,仩shàng,尚shàng,恦shàng,绱shàng,緔shàng,弰shāo,捎shāo,梢shāo,烧shāo,焼shāo,稍shāo,筲shāo,艄shāo,蛸shāo,輎shāo,蕱shāo,燒shāo,髾shāo,鮹shāo,娋shāo,旓shāo,杓sháo,勺sháo,芍sháo,柖sháo,玿sháo,韶sháo,少shǎo,劭shào,卲shào,邵shào,绍shào,哨shào,袑shào,紹shào,潲shào,奢shē,猞shē,赊shē,輋shē,賒shē,檨shē,畲shē,舌shé,佘shé,蛇shé,蛥shé,磼shé,折shé,舍shě,捨shě,厍shè,设shè,社shè,舎shè,厙shè,射shè,涉shè,涻shè,設shè,赦shè,弽shè,慑shè,摄shè,滠shè,慴shè,摵shè,蔎shè,韘shè,騇shè,懾shè,攝shè,麝shè,欇shè,挕shè,蠂shè,堔shen,叄shēn,糁shēn,申shēn,屾shēn,扟shēn,伸shēn,身shēn,侁shēn,呻shēn,妽shēn,籶shēn,绅shēn,诜shēn,柛shēn,氠shēn,珅shēn,穼shēn,籸shēn,娠shēn,峷shēn,甡shēn,眒shēn,砷shēn,深shēn,紳shēn,兟shēn,椮shēn,葠shēn,裑shēn,訷shēn,罧shēn,蓡shēn,詵shēn,甧shēn,蔘shēn,燊shēn,薓shēn,駪shēn,鲹shēn,鯓shēn,鵢shēn,鯵shēn,鰺shēn,莘shēn,叅shēn,神shén,榊shén,鰰shén,棯shěn,槮shěn,邥shěn,弞shěn,沈shěn,审shěn,矤shěn,矧shěn,谂shěn,谉shěn,婶shěn,渖shěn,訠shěn,審shěn,頣shěn,魫shěn,曋shěn,瞫shěn,嬸shěn,覾shěn,讅shěn,哂shěn,肾shèn,侺shèn,昚shèn,甚shèn,胂shèn,眘shèn,渗shèn,祳shèn,脤shèn,腎shèn,愼shèn,慎shèn,瘆shèn,蜃shèn,滲shèn,鋠shèn,瘮shèn,葚shèn,升shēng,生shēng,阩shēng,呏shēng,声shēng,斘shēng,昇shēng,枡shēng,泩shēng,苼shēng,殅shēng,牲shēng,珄shēng,竔shēng,陞shēng,曻shēng,陹shēng,笙shēng,湦shēng,焺shēng,甥shēng,鉎shēng,聲shēng,鍟shēng,鵿shēng,鼪shēng,绳shéng,縄shéng,憴shéng,繩shéng,譝shéng,省shěng,眚shěng,偗shěng,渻shěng,胜shèng,圣shèng,晟shèng,晠shèng,剰shèng,盛shèng,剩shèng,勝shèng,貹shèng,嵊shèng,聖shèng,墭shèng,榺shèng,蕂shèng,橳shèng,賸shèng,鳾shi,觢shi,尸shī,师shī,呞shī,虱shī,诗shī,邿shī,鸤shī,屍shī,施shī,浉shī,狮shī,師shī,絁shī,湤shī,湿shī,葹shī,溮shī,溼shī,獅shī,蒒shī,蓍shī,詩shī,瑡shī,鳲shī,蝨shī,鲺shī,濕shī,鍦shī,鯴shī,鰤shī,鶳shī,襹shī,籭shī,魳shī,失shī,褷shī,匙shí,十shí,什shí,石shí,辻shí,佦shí,时shí,竍shí,识shí,实shí,実shí,旹shí,飠shí,峕shí,拾shí,炻shí,祏shí,蚀shí,食shí,埘shí,寔shí,湜shí,遈shí,塒shí,嵵shí,溡shí,鉐shí,實shí,榯shí,蝕shí,鉽shí,篒shí,鲥shí,鮖shí,鼫shí,識shí,鼭shí,鰣shí,時shí,史shǐ,矢shǐ,乨shǐ,豕shǐ,使shǐ,始shǐ,驶shǐ,兘shǐ,屎shǐ,榁shǐ,鉂shǐ,駛shǐ,笶shǐ,饣shì,莳shì,蒔shì,士shì,氏shì,礻shì,世shì,丗shì,仕shì,市shì,示shì,卋shì,式shì,事shì,侍shì,势shì,呩shì,视shì,试shì,饰shì,冟shì,室shì,恀shì,恃shì,拭shì,枾shì,柿shì,眂shì,贳shì,适shì,栻shì,烒shì,眎shì,眡shì,舐shì,轼shì,逝shì,铈shì,視shì,釈shì,弑shì,揓shì,谥shì,貰shì,释shì,勢shì,嗜shì,弒shì,煶shì,睗shì,筮shì,試shì,軾shì,鈰shì,鉃shì,飾shì,舓shì,誓shì,適shì,奭shì,噬shì,嬕shì,澨shì,諡shì,遾shì,螫shì,簭shì,籂shì,襫shì,釋shì,鰘shì,佀shì,鎩shì,是shì,収shōu,收shōu,手shǒu,守shǒu,垨shǒu,首shǒu,艏shǒu,醻shòu,寿shòu,受shòu,狩shòu,兽shòu,售shòu,授shòu,绶shòu,痩shòu,膄shòu,壽shòu,瘦shòu,綬shòu,夀shòu,獣shòu,獸shòu,鏉shòu,书shū,殳shū,抒shū,纾shū,叔shū,枢shū,姝shū,柕shū,倏shū,倐shū,書shū,殊shū,紓shū,掓shū,梳shū,淑shū,焂shū,菽shū,軗shū,鄃shū,疎shū,疏shū,舒shū,摅shū,毹shū,毺shū,綀shū,输shū,踈shū,樞shū,蔬shū,輸shū,鮛shū,瀭shū,鵨shū,陎shū,尗shú,秫shú,婌shú,孰shú,赎shú,塾shú,熟shú,璹shú,贖shú,暑shǔ,黍shǔ,署shǔ,鼠shǔ,鼡shǔ,蜀shǔ,潻shǔ,薯shǔ,曙shǔ,癙shǔ,糬shǔ,籔shǔ,蠴shǔ,鱰shǔ,属shǔ,屬shǔ,鱪shǔ,丨shù,术shù,戍shù,束shù,沭shù,述shù,怷shù,树shù,竖shù,荗shù,恕shù,庶shù,庻shù,絉shù,蒁shù,術shù,裋shù,数shù,竪shù,腧shù,墅shù,漱shù,潄shù,數shù,豎shù,樹shù,濖shù,錰shù,鏣shù,鶐shù,虪shù,捒shù,忄shù,澍shù,刷shuā,唰shuā,耍shuǎ,誜shuà,缞shuāi,縗shuāi,衰shuāi,摔shuāi,甩shuǎi,帅shuài,帥shuài,蟀shuài,闩shuān,拴shuān,閂shuān,栓shuān,涮shuàn,腨shuàn,双shuāng,脽shuí,誰shuí,水shuǐ,氺shuǐ,閖shuǐ,帨shuì,涗shuì,涚shuì,稅shuì,税shuì,裞shuì,説shuì,睡shuì,吮shǔn,顺shùn,舜shùn,順shùn,蕣shùn,橓shùn,瞚shùn,瞤shùn,瞬shùn,鬊shùn,说shuō,說shuō,妁shuò,烁shuò,朔shuò,铄shuò,欶shuò,硕shuò,矟shuò,搠shuò,蒴shuò,槊shuò,碩shuò,爍shuò,鑠shuò,洬shuò,燿shuò,鎙shuò,愢sī,厶sī,丝sī,司sī,糹sī,私sī,咝sī,泀sī,俬sī,思sī,恖sī,鸶sī,媤sī,斯sī,絲sī,缌sī,蛳sī,楒sī,禗sī,鉰sī,飔sī,凘sī,厮sī,榹sī,禠sī,罳sī,锶sī,嘶sī,噝sī,廝sī,撕sī,澌sī,緦sī,蕬sī,螄sī,鍶sī,蟖sī,蟴sī,颸sī,騦sī,鐁sī,鷥sī,鼶sī,鷉sī,銯sī,死sǐ,灬sì,巳sì,亖sì,四sì,罒sì,寺sì,汜sì,伺sì,似sì,姒sì,泤sì,祀sì,価sì,孠sì,泗sì,饲sì,驷sì,俟sì,娰sì,柶sì,牭sì,洍sì,涘sì,肂sì,飤sì,笥sì,耜sì,釲sì,竢sì,覗sì,嗣sì,肆sì,貄sì,鈻sì,飼sì,禩sì,駟sì,儩sì,瀃sì,兕sì,蕼sì,螦so,乺sol,忪sōng,松sōng,枀sōng,枩sōng,娀sōng,柗sōng,倯sōng,凇sōng,梥sōng,崧sōng,庺sōng,淞sōng,菘sōng,嵩sōng,硹sōng,蜙sōng,憽sōng,檧sōng,濍sōng,怂sǒng,悚sǒng,耸sǒng,竦sǒng,愯sǒng,嵷sǒng,慫sǒng,聳sǒng,駷sǒng,鬆sòng,讼sòng,宋sòng,诵sòng,送sòng,颂sòng,訟sòng,頌sòng,誦sòng,餸sòng,鎹sòng,凁sōu,捜sōu,鄋sōu,嗖sōu,廀sōu,廋sōu,搜sōu,溲sōu,獀sōu,蒐sōu,蓃sōu,馊sōu,飕sōu,摗sōu,锼sōu,螋sōu,醙sōu,鎪sōu,餿sōu,颼sōu,騪sōu,叜sōu,艘sōu,叟sǒu,傁sǒu,嗾sǒu,瞍sǒu,擞sǒu,薮sǒu,擻sǒu,藪sǒu,櫢sǒu,嗽sòu,瘶sòu,苏sū,甦sū,酥sū,稣sū,窣sū,穌sū,鯂sū,蘇sū,蘓sū,櫯sū,囌sū,卹sū,俗sú,玊sù,诉sù,泝sù,肃sù,涑sù,珟sù,素sù,速sù,殐sù,粛sù,骕sù,傃sù,粟sù,訴sù,谡sù,嗉sù,塐sù,塑sù,嫊sù,愫sù,溯sù,溸sù,肅sù,遡sù,鹔sù,僳sù,榡sù,蔌sù,觫sù,趚sù,遬sù,憟sù,樎sù,樕sù,潥sù,鋉sù,餗sù,縤sù,璛sù,簌sù,藗sù,謖sù,蹜sù,驌sù,鱐sù,鷫sù,埣sù,夙sù,膆sù,狻suān,痠suān,酸suān,匴suǎn,祘suàn,笇suàn,筭suàn,蒜suàn,算suàn,夊suī,芕suī,虽suī,倠suī,哸suī,荽suī,荾suī,眭suī,滖suī,睢suī,濉suī,鞖suī,雖suī,簑suī,绥suí,隋suí,随suí,遀suí,綏suí,隨suí,瓍suí,遂suí,瀡suǐ,髄suǐ,髓suǐ,亗suì,岁suì,砕suì,谇suì,歲suì,歳suì,煫suì,碎suì,隧suì,嬘suì,澻suì,穂suì,誶suì,賥suì,檖suì,燧suì,璲suì,禭suì,穗suì,穟suì,襚suì,邃suì,旞suì,繐suì,繸suì,鐆suì,鐩suì,祟suì,譢suì,孙sūn,狲sūn,荪sūn,孫sūn,飧sūn,搎sūn,猻sūn,蓀sūn,槂sūn,蕵sūn,薞sūn,畃sún,损sǔn,笋sǔn,隼sǔn,筍sǔn,損sǔn,榫sǔn,箰sǔn,鎨sǔn,巺sùn,潠sùn,嗍suō,唆suō,娑suō,莏suō,傞suō,桫suō,梭suō,睃suō,嗦suō,羧suō,蓑suō,摍suō,缩suō,趖suō,簔suō,縮suō,髿suō,鮻suō,挲suō,所suǒ,唢suǒ,索suǒ,琐suǒ,琑suǒ,锁suǒ,嗩suǒ,暛suǒ,溑suǒ,瑣suǒ,鎖suǒ,鎻suǒ,鏁suǒ,嵗suò,蜶suò,逤suò,侤ta,澾ta,她tā,他tā,它tā,祂tā,咜tā,趿tā,铊tā,塌tā,榙tā,溻tā,鉈tā,褟tā,遢tā,蹹tá,塔tǎ,墖tǎ,獭tǎ,鳎tǎ,獺tǎ,鰨tǎ,沓tà,挞tà,狧tà,闼tà,崉tà,涾tà,遝tà,阘tà,榻tà,毾tà,禢tà,撻tà,誻tà,踏tà,嚃tà,錔tà,嚺tà,濌tà,蹋tà,鞜tà,闒tà,鞳tà,闥tà,譶tà,躢tà,傝tà,襨tae,漦tāi,咍tāi,囼tāi,孡tāi,胎tāi,駘tāi,檯tāi,斄tái,台tái,邰tái,坮tái,苔tái,炱tái,炲tái,菭tái,跆tái,鲐tái,箈tái,臺tái,颱tái,儓tái,鮐tái,嬯tái,擡tái,薹tái,籉tái,抬tái,呔tǎi,忕tài,太tài,冭tài,夳tài,忲tài,汰tài,态tài,肽tài,钛tài,泰tài,粏tài,舦tài,酞tài,鈦tài,溙tài,燤tài,態tài,坍tān,贪tān,怹tān,啴tān,痑tān,舑tān,貪tān,摊tān,滩tān,嘽tān,潬tān,瘫tān,擹tān,攤tān,灘tān,癱tān,镡tán,蕁tán,坛tán,昙tán,谈tán,郯tán,婒tán,覃tán,榃tán,痰tán,锬tán,谭tán,墵tán,憛tán,潭tán,談tán,壇tán,曇tán,錟tán,檀tán,顃tán,罈tán,藫tán,壜tán,譚tán,貚tán,醰tán,譠tán,罎tán,鷤tán,埮tán,鐔tán,墰tán,忐tǎn,坦tǎn,袒tǎn,钽tǎn,菼tǎn,毯tǎn,鉭tǎn,嗿tǎn,憳tǎn,憻tǎn,醓tǎn,璮tǎn,襢tǎn,緂tǎn,暺tǎn,叹tàn,炭tàn,探tàn,湠tàn,僋tàn,嘆tàn,碳tàn,舕tàn,歎tàn,汤tāng,铴tāng,湯tāng,嘡tāng,劏tāng,羰tāng,蝪tāng,薚tāng,蹚tāng,鐋tāng,鞺tāng,闛tāng,耥tāng,鼞tāng,镗táng,鏜táng,饧táng,坣táng,唐táng,堂táng,傏táng,啺táng,棠táng,鄌táng,塘táng,搪táng,溏táng,蓎táng,隚táng,榶táng,漟táng,煻táng,瑭táng,禟táng,膅táng,樘táng,磄táng,糃táng,膛táng,橖táng,篖táng,糖táng,螗táng,踼táng,糛táng,赯táng,醣táng,餳táng,鎕táng,餹táng,饄táng,鶶táng,螳táng,攩tǎng,伖tǎng,帑tǎng,倘tǎng,淌tǎng,傥tǎng,躺tǎng,镋tǎng,鎲tǎng,儻tǎng,戃tǎng,曭tǎng,爣tǎng,矘tǎng,钂tǎng,烫tàng,摥tàng,趟tàng,燙tàng,漡tàng,焘tāo,轁tāo,涭tāo,仐tāo,弢tāo,绦tāo,掏tāo,絛tāo,詜tāo,嫍tāo,幍tāo,慆tāo,搯tāo,滔tāo,槄tāo,瑫tāo,韬tāo,飸tāo,縚tāo,縧tāo,濤tāo,謟tāo,鞱tāo,韜tāo,饕tāo,饀tāo,燾tāo,涛tāo,迯táo,咷táo,洮táo,逃táo,桃táo,陶táo,啕táo,梼táo,淘táo,萄táo,祹táo,裪táo,綯táo,蜪táo,鞀táo,醄táo,鞉táo,鋾táo,駣táo,檮táo,騊táo,鼗táo,绹táo,讨tǎo,討tǎo,套tào,畓tap,忑tè,特tè,貣tè,脦tè,犆tè,铽tè,慝tè,鋱tè,蟘tè,螣tè,鰧teng,膯tēng,鼟tēng,疼téng,痋téng,幐téng,腾téng,誊téng,漛téng,滕téng,邆téng,縢téng,駦téng,謄téng,儯téng,藤téng,騰téng,籐téng,籘téng,虅téng,驣téng,霯tèng,唞teo,朰teul,剔tī,梯tī,锑tī,踢tī,銻tī,鷈tī,鵜tī,躰tī,骵tī,軆tī,擿tī,姼tí,褆tí,扌tí,虒tí,磃tí,绨tí,偍tí,啼tí,媞tí,崹tí,惿tí,提tí,稊tí,缇tí,罤tí,遆tí,鹈tí,嗁tí,瑅tí,綈tí,徲tí,漽tí,緹tí,蕛tí,蝭tí,题tí,趧tí,蹄tí,醍tí,謕tí,鍗tí,題tí,鮷tí,騠tí,鯷tí,鶗tí,鶙tí,穉tí,厗tí,鳀tí,徥tǐ,体tǐ,挮tǐ,體tǐ,衹tǐ,戻tì,屉tì,剃tì,洟tì,倜tì,悌tì,涕tì,逖tì,屜tì,悐tì,惕tì,掦tì,逷tì,惖tì,替tì,裼tì,褅tì,歒tì,殢tì,髰tì,薙tì,嚏tì,鬀tì,嚔tì,瓋tì,籊tì,鐟tì,楴tì,天tiān,兲tiān,婖tiān,添tiān,酟tiān,靔tiān,黇tiān,靝tiān,呑tiān,瞋tián,田tián,屇tián,沺tián,恬tián,畋tián,畑tián,盷tián,胋tián,甛tián,甜tián,菾tián,湉tián,塡tián,填tián,搷tián,阗tián,碵tián,磌tián,窴tián,鴫tián,璳tián,闐tián,鷆tián,鷏tián,餂tián,寘tián,畠tián,鍩tiǎn,忝tiǎn,殄tiǎn,倎tiǎn,唺tiǎn,悿tiǎn,捵tiǎn,淟tiǎn,晪tiǎn,琠tiǎn,腆tiǎn,觍tiǎn,睓tiǎn,覥tiǎn,賟tiǎn,錪tiǎn,娗tiǎn,铦tiǎn,銛tiǎn,紾tiǎn,舔tiǎn,掭tiàn,瑱tiàn,睼tiàn,舚tiàn,旫tiāo,佻tiāo,庣tiāo,挑tiāo,祧tiāo,聎tiāo,苕tiáo,萔tiáo,芀tiáo,条tiáo,岧tiáo,岹tiáo,迢tiáo,祒tiáo,條tiáo,笤tiáo,蓚tiáo,蓨tiáo,龆tiáo,樤tiáo,蜩tiáo,鋚tiáo,髫tiáo,鲦tiáo,螩tiáo,鯈tiáo,鎥tiáo,齠tiáo,鰷tiáo,趒tiáo,銚tiáo,儵tiáo,鞗tiáo,宨tiǎo,晀tiǎo,朓tiǎo,脁tiǎo,窕tiǎo,窱tiǎo,眺tiào,粜tiào,覜tiào,跳tiào,頫tiào,糶tiào,怗tiē,贴tiē,萜tiē,聑tiē,貼tiē,帖tiē,蛈tiě,僣tiě,鴩tiě,鐵tiě,驖tiě,铁tiě,呫tiè,飻tiè,餮tiè,厅tīng,庁tīng,汀tīng,听tīng,耓tīng,厛tīng,烃tīng,烴tīng,綎tīng,鞓tīng,聴tīng,聼tīng,廰tīng,聽tīng,渟tīng,廳tīng,邒tíng,廷tíng,亭tíng,庭tíng,莛tíng,停tíng,婷tíng,嵉tíng,筳tíng,葶tíng,蜓tíng,楟tíng,榳tíng,閮tíng,霆tíng,聤tíng,蝏tíng,諪tíng,鼮tíng,珵tǐng,侱tǐng,圢tǐng,侹tǐng,挺tǐng,涏tǐng,梃tǐng,烶tǐng,珽tǐng,脡tǐng,颋tǐng,誔tǐng,頲tǐng,艇tǐng,乭tol,囲tōng,炵tōng,通tōng,痌tōng,嗵tōng,蓪tōng,樋tōng,熥tōng,爞tóng,冂tóng,燑tóng,仝tóng,同tóng,佟tóng,彤tóng,峂tóng,庝tóng,哃tóng,狪tóng,茼tóng,晍tóng,桐tóng,浵tóng,砼tóng,蚒tóng,秱tóng,铜tóng,童tóng,粡tóng,赨tóng,酮tóng,鉖tóng,僮tóng,鉵tóng,銅tóng,餇tóng,鲖tóng,潼tóng,獞tóng,曈tóng,朣tóng,橦tóng,氃tóng,犝tóng,膧tóng,瞳tóng,穜tóng,鮦tóng,眮tóng,统tǒng,捅tǒng,桶tǒng,筒tǒng,綂tǒng,統tǒng,恸tòng,痛tòng,慟tòng,憅tòng,偷tōu,偸tōu,鍮tōu,头tóu,投tóu,骰tóu,緰tóu,頭tóu,钭tǒu,妵tǒu,紏tǒu,敨tǒu,斢tǒu,黈tǒu,蘣tǒu,埱tòu,透tòu,綉tòu,宊tū,瑹tū,凸tū,禿tū,秃tū,突tū,涋tū,捸tū,堗tū,湥tū,痜tū,葖tū,嶀tū,鋵tū,鵚tū,鼵tū,唋tū,図tú,图tú,凃tú,峹tú,庩tú,徒tú,捈tú,涂tú,荼tú,途tú,屠tú,梌tú,揬tú,稌tú,塗tú,嵞tú,瘏tú,筡tú,鈯tú,圖tú,圗tú,廜tú,潳tú,酴tú,馟tú,鍎tú,駼tú,鵌tú,鶟tú,鷋tú,鷵tú,兎tú,菟tú,蒤tú,土tǔ,圡tǔ,吐tǔ,汢tǔ,钍tǔ,釷tǔ,迌tù,兔tù,莵tù,堍tù,鵵tù,湍tuān,猯tuān,煓tuān,蓴tuán,团tuán,団tuán,抟tuán,剸tuán,團tuán,塼tuán,慱tuán,摶tuán,槫tuán,漙tuán,篿tuán,檲tuán,鏄tuán,糰tuán,鷒tuán,鷻tuán,嫥tuán,鱄tuán,圕tuǎn,疃tuǎn,畽tuǎn,彖tuàn,湪tuàn,褖tuàn,貒tuàn,忒tuī,推tuī,蓷tuī,藬tuī,焞tuī,騩tuí,墤tuí,颓tuí,隤tuí,尵tuí,頹tuí,頺tuí,魋tuí,穨tuí,蘈tuí,蹪tuí,僓tuí,頽tuí,俀tuǐ,脮tuǐ,腿tuǐ,蹆tuǐ,骽tuǐ,退tuì,娧tuì,煺tuì,蛻tuì,蜕tuì,褪tuì,駾tuì,噋tūn,汭tūn,吞tūn,旽tūn,啍tūn,朜tūn,暾tūn,黗tūn,屯tún,忳tún,芚tún,饨tún,豚tún,軘tún,飩tún,鲀tún,魨tún,霕tún,臀tún,臋tún,坉tún,豘tún,氽tǔn,舃tuō,乇tuō,讬tuō,托tuō,汑tuō,饦tuō,杔tuō,侂tuō,咃tuō,拕tuō,拖tuō,侻tuō,挩tuō,捝tuō,莌tuō,袥tuō,託tuō,涶tuō,脱tuō,飥tuō,馲tuō,魠tuō,驝tuō,棁tuō,脫tuō,鱓tuó,鋖tuó,牠tuó,驮tuó,佗tuó,陀tuó,陁tuó,坨tuó,岮tuó,沱tuó,驼tuó,柁tuó,砣tuó,砤tuó,袉tuó,鸵tuó,紽tuó,堶tuó,跎tuó,酡tuó,碢tuó,馱tuó,槖tuó,踻tuó,駞tuó,橐tuó,鮀tuó,鴕tuó,鼧tuó,騨tuó,鼍tuó,驒tuó,鼉tuó,迆tuó,駝tuó,軃tuǒ,妥tuǒ,毤tuǒ,庹tuǒ,椭tuǒ,楕tuǒ,鵎tuǒ,拓tuò,柝tuò,唾tuò,萚tuò,跅tuò,毻tuò,箨tuò,蘀tuò,籜tuò,哇wa,窐wā,劸wā,徍wā,挖wā,洼wā,娲wā,畖wā,窊wā,媧wā,嗗wā,蛙wā,搲wā,溛wā,漥wā,窪wā,鼃wā,攨wā,屲wā,姽wá,譁wá,娃wá,瓦wǎ,佤wǎ,邷wǎ,咓wǎ,瓲wǎ,砙wǎ,韎wà,帓wà,靺wà,袜wà,聉wà,嗢wà,腽wà,膃wà,韈wà,韤wà,襪wà,咼wāi,瀤wāi,歪wāi,喎wāi,竵wāi,崴wǎi,外wài,顡wài,関wān,闗wān,夘wān,乛wān,弯wān,剜wān,婠wān,帵wān,塆wān,湾wān,睕wān,蜿wān,潫wān,豌wān,彎wān,壪wān,灣wān,埦wān,捥wān,丸wán,刓wán,汍wán,纨wán,芄wán,完wán,岏wán,忨wán,玩wán,笂wán,紈wán,捖wán,顽wán,烷wán,琓wán,貦wán,頑wán,蚖wán,抏wán,邜wǎn,宛wǎn,倇wǎn,唍wǎn,挽wǎn,晚wǎn,盌wǎn,莞wǎn,婉wǎn,惋wǎn,晩wǎn,梚wǎn,绾wǎn,脘wǎn,菀wǎn,晼wǎn,椀wǎn,琬wǎn,皖wǎn,碗wǎn,綩wǎn,綰wǎn,輓wǎn,鋔wǎn,鍐wǎn,莬wǎn,惌wǎn,魭wǎn,夗wǎn,畹wǎn,輐wàn,鄤wàn,孯wàn,掔wàn,万wàn,卍wàn,卐wàn,妧wàn,杤wàn,腕wàn,萬wàn,翫wàn,鋄wàn,薍wàn,錽wàn,贃wàn,鎫wàn,贎wàn,脕wàn,尩wāng,尪wāng,尫wāng,汪wāng,瀇wāng,亡wáng,仼wáng,彺wáng,莣wáng,蚟wáng,王wáng,抂wǎng,网wǎng,忹wǎng,往wǎng,徃wǎng,枉wǎng,罔wǎng,惘wǎng,菵wǎng,暀wǎng,棢wǎng,焹wǎng,蛧wǎng,辋wǎng,網wǎng,蝄wǎng,誷wǎng,輞wǎng,魍wǎng,迬wǎng,琞wàng,妄wàng,忘wàng,迋wàng,旺wàng,盳wàng,望wàng,朢wàng,威wēi,烓wēi,偎wēi,逶wēi,隇wēi,隈wēi,喴wēi,媁wēi,媙wēi,愄wēi,揋wēi,揻wēi,渨wēi,煀wēi,葨wēi,葳wēi,微wēi,椳wēi,楲wēi,溦wēi,煨wēi,詴wēi,縅wēi,蝛wēi,覣wēi,嶶wēi,薇wēi,燰wēi,鳂wēi,癐wēi,鰃wēi,鰄wēi,嵔wēi,蜲wēi,危wēi,巍wēi,恑wéi,撝wéi,囗wéi,为wéi,韦wéi,围wéi,帏wéi,沩wéi,违wéi,闱wéi,峗wéi,峞wéi,洈wéi,為wéi,韋wéi,桅wéi,涠wéi,唯wéi,帷wéi,惟wéi,维wéi,喡wéi,圍wéi,嵬wéi,幃wéi,湋wéi,溈wéi,琟wéi,潍wéi,維wéi,蓶wéi,鄬wéi,潿wéi,醀wéi,濰wéi,鍏wéi,闈wéi,鮠wéi,癓wéi,覹wéi,犩wéi,霺wéi,僞wéi,寪wéi,觹wéi,觽wéi,觿wéi,欈wéi,違wéi,趡wěi,磈wěi,瓗wěi,膸wěi,撱wěi,鰖wěi,伟wěi,伪wěi,尾wěi,纬wěi,芛wěi,苇wěi,委wěi,炜wěi,玮wěi,洧wěi,娓wěi,捤wěi,浘wěi,诿wěi,偉wěi,偽wěi,崣wěi,梶wěi,硊wěi,萎wěi,隗wěi,骩wěi,廆wěi,徫wěi,愇wěi,猥wěi,葦wěi,蒍wěi,骪wěi,骫wěi,暐wěi,椲wěi,煒wěi,瑋wěi,痿wěi,腲wěi,艉wěi,韪wěi,碨wěi,鲔wěi,緯wěi,蔿wěi,諉wěi,踓wěi,韑wěi,頠wěi,薳wěi,儰wěi,濻wěi,鍡wěi,鮪wěi,壝wěi,韙wěi,颹wěi,瀢wěi,韡wěi,亹wěi,斖wěi,茟wěi,蜹wèi,爲wèi,卫wèi,未wèi,位wèi,味wèi,苿wèi,畏wèi,胃wèi,叞wèi,軎wèi,尉wèi,菋wèi,谓wèi,喂wèi,媦wèi,渭wèi,猬wèi,煟wèi,墛wèi,蔚wèi,慰wèi,熭wèi,犚wèi,磑wèi,緭wèi,蝟wèi,衛wèi,懀wèi,濊wèi,璏wèi,罻wèi,衞wèi,謂wèi,錗wèi,餧wèi,鮇wèi,螱wèi,褽wèi,餵wèi,魏wèi,藯wèi,鏏wèi,霨wèi,鳚wèi,蘶wèi,饖wèi,讆wèi,躗wèi,讏wèi,躛wèi,荱wèi,蜼wèi,硙wèi,轊wèi,昷wēn,塭wēn,温wēn,榅wēn,殟wēn,溫wēn,瑥wēn,辒wēn,榲wēn,瘟wēn,豱wēn,輼wēn,鳁wēn,鎾wēn,饂wēn,鰛wēn,鰮wēn,褞wēn,缊wēn,緼wēn,蕰wēn,縕wēn,薀wēn,藴wēn,鴖wén,亠wén,文wén,彣wén,纹wén,炆wén,砇wén,闻wén,紋wén,蚉wén,蚊wén,珳wén,阌wén,鈫wén,雯wén,瘒wén,聞wén,馼wén,魰wén,鳼wén,鴍wén,螡wén,閺wén,閿wén,蟁wén,闅wén,鼤wén,闦wén,芠wén,呅wěn,忞wěn,歾wěn,刎wěn,吻wěn,呚wěn,忟wěn,抆wěn,呡wěn,紊wěn,桽wěn,脗wěn,稳wěn,穏wěn,穩wěn,肳wěn,问wèn,妏wèn,汶wèn,問wèn,渂wèn,搵wèn,絻wèn,顐wèn,璺wèn,翁wēng,嗡wēng,鹟wēng,螉wēng,鎓wēng,鶲wēng,滃wēng,奣wěng,塕wěng,嵡wěng,蓊wěng,瞈wěng,聬wěng,暡wěng,瓮wèng,蕹wèng,甕wèng,罋wèng,齆wèng,堝wō,濄wō,薶wō,捼wō,挝wō,倭wō,涡wō,莴wō,唩wō,涹wō,渦wō,猧wō,萵wō,喔wō,窝wō,窩wō,蜗wō,撾wō,蝸wō,踒wō,涴wó,我wǒ,婐wǒ,婑wǒ,捰wǒ,龏wò,蒦wò,嚄wò,雘wò,艧wò,踠wò,仴wò,沃wò,肟wò,臥wò,偓wò,捾wò,媉wò,幄wò,握wò,渥wò,硪wò,楃wò,腛wò,斡wò,瞃wò,濣wò,瓁wò,龌wò,齷wò,枂wò,馧wò,卧wò,扝wū,乌wū,圬wū,弙wū,污wū,邬wū,呜wū,杇wū,巫wū,屋wū,洿wū,钨wū,烏wū,趶wū,剭wū,窏wū,釫wū,鄔wū,嗚wū,誈wū,誣wū,箼wū,螐wū,鴮wū,鎢wū,鰞wū,兀wū,杅wū,诬wū,幠wú,譕wú,蟱wú,墲wú,亾wú,兦wú,无wú,毋wú,吳wú,吴wú,吾wú,呉wú,芜wú,郚wú,娪wú,梧wú,洖wú,浯wú,茣wú,珸wú,祦wú,鹀wú,無wú,禑wú,蜈wú,蕪wú,璑wú,鵐wú,鯃wú,鼯wú,鷡wú,俉wú,憮wú,橆wú,铻wú,鋙wú,莁wú,陚wǔ,瞴wǔ,娒wǔ,乄wǔ,五wǔ,午wǔ,仵wǔ,伍wǔ,妩wǔ,庑wǔ,忤wǔ,怃wǔ,迕wǔ,旿wǔ,武wǔ,玝wǔ,侮wǔ,倵wǔ,捂wǔ,娬wǔ,牾wǔ,珷wǔ,摀wǔ,熓wǔ,碔wǔ,鹉wǔ,瑦wǔ,舞wǔ,嫵wǔ,廡wǔ,潕wǔ,錻wǔ,儛wǔ,甒wǔ,鵡wǔ,躌wǔ,逜wǔ,膴wǔ,啎wǔ,噁wù,雺wù,渞wù,揾wù,坞wù,塢wù,勿wù,务wù,戊wù,阢wù,伆wù,屼wù,扤wù,岉wù,杌wù,忢wù,物wù,矹wù,敄wù,误wù,務wù,悞wù,悟wù,悮wù,粅wù,晤wù,焐wù,婺wù,嵍wù,痦wù,隖wù,靰wù,骛wù,奦wù,嵨wù,溩wù,雾wù,寤wù,熃wù,誤wù,鹜wù,鋈wù,窹wù,鼿wù,霧wù,齀wù,騖wù,鶩wù,芴wù,霚wù,扱xī,糦xī,宩xī,獡xī,蜤xī,燍xī,夕xī,兮xī,汐xī,西xī,覀xī,吸xī,希xī,扸xī,卥xī,昔xī,析xī,矽xī,穸xī,肹xī,俙xī,徆xī,怸xī,郗xī,饻xī,唏xī,奚xī,屖xī,息xī,悕xī,晞xī,氥xī,浠xī,牺xī,狶xī,莃xī,唽xī,悉xī,惜xī,桸xī,欷xī,淅xī,渓xī,烯xī,焁xī,焈xī,琋xī,硒xī,菥xī,赥xī,釸xī,傒xī,惁xī,晰xī,晳xī,焟xī,犀xī,睎xī,稀xī,粞xī,翕xī,翖xī,舾xī,鄎xī,厀xī,嵠xī,徯xī,溪xī,煕xī,皙xī,蒠xī,锡xī,僖xī,榽xī,熄xī,熙xī,緆xī,蜥xī,豨xī,餏xī,嘻xī,噏xī,嬆xī,嬉xī,膝xī,餙xī,凞xī,樨xī,橀xī,歙xī,熹xī,熺xī,熻xī,窸xī,羲xī,螅xī,錫xī,燨xī,犠xī,瞦xī,礂xī,蟋xī,豀xī,豯xī,貕xī,繥xī,鯑xī,鵗xī,譆xī,鏭xī,隵xī,巇xī,曦xī,爔xī,犧xī,酅xī,鼷xī,蠵xī,鸂xī,鑴xī,憘xī,暿xī,鱚xī,咥xī,訢xī,娭xī,瘜xī,醯xī,雭xí,习xí,郋xí,席xí,習xí,袭xí,觋xí,媳xí,椺xí,蒵xí,蓆xí,嶍xí,漝xí,覡xí,趘xí,薂xí,檄xí,謵xí,鎴xí,霫xí,鳛xí,飁xí,騱xí,騽xí,襲xí,鰼xí,驨xí,隰xí,囍xǐ,杫xǐ,枲xǐ,洗xǐ,玺xǐ,徙xǐ,铣xǐ,喜xǐ,葈xǐ,葸xǐ,鈢xǐ,屣xǐ,漇xǐ,蓰xǐ,銑xǐ,憙xǐ,橲xǐ,禧xǐ,諰xǐ,壐xǐ,縰xǐ,謑xǐ,蟢xǐ,蹝xǐ,璽xǐ,躧xǐ,鉩xǐ,欪xì,钑xì,鈒xì,匸xì,卌xì,戏xì,屃xì,系xì,饩xì,呬xì,忥xì,怬xì,细xì,係xì,恄xì,绤xì,釳xì,阋xì,塈xì,椞xì,舄xì,趇xì,隙xì,慀xì,滊xì,禊xì,綌xì,赩xì,隟xì,熂xì,犔xì,潟xì,澙xì,蕮xì,覤xì,黖xì,戲xì,磶xì,虩xì,餼xì,鬩xì,嚱xì,霼xì,衋xì,細xì,闟xì,虾xiā,谺xiā,傄xiā,閕xiā,敮xiā,颬xiā,瞎xiā,蝦xiā,鰕xiā,魻xiā,郃xiá,匣xiá,侠xiá,狎xiá,俠xiá,峡xiá,柙xiá,炠xiá,狭xiá,陜xiá,峽xiá,烚xiá,狹xiá,珨xiá,祫xiá,硖xiá,舺xiá,陿xiá,溊xiá,硤xiá,遐xiá,暇xiá,瑕xiá,筪xiá,碬xiá,舝xiá,辖xiá,縀xiá,蕸xiá,縖xiá,赮xiá,轄xiá,鍜xiá,霞xiá,鎋xiá,黠xiá,騢xiá,鶷xiá,睱xiá,翈xiá,昰xià,丅xià,下xià,吓xià,圷xià,夏xià,梺xià,嚇xià,懗xià,罅xià,鏬xià,疜xià,姺xiān,仙xiān,仚xiān,屳xiān,先xiān,奾xiān,纤xiān,佡xiān,忺xiān,氙xiān,祆xiān,秈xiān,苮xiān,枮xiān,籼xiān,珗xiān,莶xiān,掀xiān,酰xiān,锨xiān,僊xiān,僲xiān,嘕xiān,鲜xiān,暹xiān,韯xiān,憸xiān,鍁xiān,繊xiān,褼xiān,韱xiān,鮮xiān,馦xiān,蹮xiān,廯xiān,譣xiān,鶱xiān,襳xiān,躚xiān,纖xiān,鱻xiān,縿xiān,跹xiān,咞xián,闲xián,妶xián,弦xián,贤xián,咸xián,挦xián,涎xián,胘xián,娴xián,娹xián,婱xián,舷xián,蚿xián,衔xián,啣xián,痫xián,蛝xián,閑xián,鹇xián,嫌xián,甉xián,銜xián,嫺xián,嫻xián,憪xián,澖xián,誸xián,賢xián,癇xián,癎xián,礥xián,贒xián,鑦xián,鷳xián,鷴xián,鷼xián,伭xián,冼xiǎn,狝xiǎn,显xiǎn,险xiǎn,毨xiǎn,烍xiǎn,猃xiǎn,蚬xiǎn,険xiǎn,赻xiǎn,筅xiǎn,尟xiǎn,尠xiǎn,禒xiǎn,蜆xiǎn,跣xiǎn,箲xiǎn,險xiǎn,獫xiǎn,獮xiǎn,藓xiǎn,鍌xiǎn,燹xiǎn,顕xiǎn,幰xiǎn,攇xiǎn,櫶xiǎn,蘚xiǎn,玁xiǎn,韅xiǎn,顯xiǎn,灦xiǎn,搟xiǎn,县xiàn,岘xiàn,苋xiàn,现xiàn,线xiàn,臽xiàn,限xiàn,姭xiàn,宪xiàn,陥xiàn,哯xiàn,垷xiàn,娨xiàn,峴xiàn,晛xiàn,莧xiàn,陷xiàn,現xiàn,馅xiàn,睍xiàn,絤xiàn,缐xiàn,羡xiàn,献xiàn,粯xiàn,羨xiàn,腺xiàn,僩xiàn,僴xiàn,綫xiàn,誢xiàn,撊xiàn,線xiàn,鋧xiàn,憲xiàn,餡xiàn,豏xiàn,瀗xiàn,臔xiàn,獻xiàn,鏾xiàn,霰xiàn,鼸xiàn,脇xiàn,軐xiàn,県xiàn,縣xiàn,儴xiāng,勷xiāng,蘘xiāng,纕xiāng,乡xiāng,芗xiāng,香xiāng,郷xiāng,厢xiāng,鄉xiāng,鄊xiāng,廂xiāng,湘xiāng,缃xiāng,葙xiāng,鄕xiāng,楿xiāng,薌xiāng,箱xiāng,緗xiāng,膷xiāng,忀xiāng,骧xiāng,麘xiāng,欀xiāng,瓖xiāng,镶xiāng,鱜xiāng,鑲xiāng,驤xiāng,襄xiāng,佭xiáng,详xiáng,庠xiáng,栙xiáng,祥xiáng,絴xiáng,翔xiáng,詳xiáng,跭xiáng,享xiǎng,亯xiǎng,响xiǎng,蚃xiǎng,饷xiǎng,晑xiǎng,飨xiǎng,想xiǎng,餉xiǎng,鲞xiǎng,蠁xiǎng,鮝xiǎng,鯗xiǎng,響xiǎng,饗xiǎng,饟xiǎng,鱶xiǎng,傢xiàng,相xiàng,向xiàng,姠xiàng,巷xiàng,项xiàng,珦xiàng,象xiàng,缿xiàng,萫xiàng,項xiàng,像xiàng,勨xiàng,嶑xiàng,橡xiàng,襐xiàng,蟓xiàng,鐌xiàng,鱌xiàng,鋞xiàng,鬨xiàng,嚮xiàng,鵁xiāo,莦xiāo,颵xiāo,箾xiāo,潚xiāo,橚xiāo,灱xiāo,灲xiāo,枭xiāo,侾xiāo,哓xiāo,枵xiāo,骁xiāo,宯xiāo,宵xiāo,庨xiāo,恷xiāo,消xiāo,绡xiāo,虓xiāo,逍xiāo,鸮xiāo,啋xiāo,婋xiāo,梟xiāo,焇xiāo,猇xiāo,萧xiāo,痚xiāo,痟xiāo,硝xiāo,硣xiāo,窙xiāo,翛xiāo,萷xiāo,销xiāo,揱xiāo,綃xiāo,歊xiāo,箫xiāo,嘵xiāo,撨xiāo,獢xiāo,銷xiāo,霄xiāo,彇xiāo,膮xiāo,蕭xiāo,魈xiāo,鴞xiāo,穘xiāo,簘xiāo,蟂xiāo,蟏xiāo,鴵xiāo,嚣xiāo,瀟xiāo,簫xiāo,蟰xiāo,髇xiāo,囂xiāo,髐xiāo,鷍xiāo,驍xiāo,毊xiāo,虈xiāo,肖xiāo,哮xiāo,烋xiāo,潇xiāo,蠨xiāo,洨xiáo,崤xiáo,淆xiáo,誵xiáo,笹xiǎo,小xiǎo,晓xiǎo,暁xiǎo,筱xiǎo,筿xiǎo,曉xiǎo,篠xiǎo,謏xiǎo,皢xiǎo,孝xiào,効xiào,咲xiào,俲xiào,效xiào,校xiào,涍xiào,笑xiào,傚xiào,敩xiào,滧xiào,詨xiào,嘋xiào,嘨xiào,誟xiào,嘯xiào,熽xiào,斅xiào,斆xiào,澩xiào,啸xiào,些xiē,楔xiē,歇xiē,蝎xiē,蠍xiē,协xié,旪xié,邪xié,協xié,胁xié,垥xié,恊xié,拹xié,脋xié,衺xié,偕xié,斜xié,谐xié,翓xié,嗋xié,愶xié,携xié,瑎xié,綊xié,熁xié,膎xié,勰xié,撷xié,擕xié,緳xié,缬xié,蝢xié,鞋xié,諧xié,燲xié,擷xié,鞵xié,襭xié,攜xié,讗xié,龤xié,魼xié,脅xié,纈xié,写xiě,冩xiě,寫xiě,藛xiě,烲xiè,榝xiè,齛xiè,碿xiè,伳xiè,灺xiè,泄xiè,泻xiè,祄xiè,绁xiè,缷xiè,卸xiè,洩xiè,炧xiè,炨xiè,卨xiè,娎xiè,屑xiè,屓xiè,偰xiè,徢xiè,械xiè,焎xiè,禼xiè,亵xiè,媟xiè,屟xiè,渫xiè,絬xiè,谢xiè,僁xiè,塮xiè,榍xiè,榭xiè,褉xiè,噧xiè,屧xiè,暬xiè,韰xiè,廨xiè,懈xiè,澥xiè,獬xiè,糏xiè,薢xiè,薤xiè,邂xiè,燮xiè,褻xiè,謝xiè,夑xiè,瀉xiè,鞢xiè,瀣xiè,蟹xiè,蠏xiè,齘xiè,齥xiè,齂xiè,躠xiè,屭xiè,躞xiè,蝑xiè,揳xiè,爕xiè,噺xin,心xīn,邤xīn,妡xīn,忻xīn,芯xīn,辛xīn,昕xīn,杺xīn,欣xīn,盺xīn,俽xīn,惞xīn,锌xīn,新xīn,歆xīn,鋅xīn,嬜xīn,薪xīn,馨xīn,鑫xīn,馫xīn,枔xín,襑xín,潃xǐn,阠xìn,伩xìn,囟xìn,孞xìn,炘xìn,信xìn,脪xìn,衅xìn,訫xìn,焮xìn,舋xìn,釁xìn,狌xīng,星xīng,垶xīng,骍xīng,猩xīng,煋xīng,鷞shuāng,骦shuāng,縔shuǎng,艭shuāng,塽shuǎng,壯zhuàng,状zhuàng,狀zhuàng,壵zhuàng,梉zhuàng,瑆xīng,腥xīng,蛵xīng,觪xīng,箵xīng,篂xīng,謃xīng,鮏xīng,曐xīng,觲xīng,騂xīng,皨xīng,鯹xīng,嬹xīng,惺xīng,刑xíng,邢xíng,形xíng,陉xíng,侀xíng,哘xíng,型xíng,洐xíng,娙xíng,硎xíng,铏xíng,鉶xíng,裄xíng,睲xǐng,醒xǐng,擤xǐng,兴xìng,興xìng,杏xìng,姓xìng,幸xìng,性xìng,荇xìng,倖xìng,莕xìng,婞xìng,悻xìng,涬xìng,緈xìng,臖xìng,凶xiōng,兄xiōng,兇xiōng,匈xiōng,芎xiōng,讻xiōng,忷xiōng,汹xiōng,恟xiōng,洶xiōng,胷xiōng,胸xiōng,訩xiōng,詾xiōng,哅xiōng,雄xióng,熊xióng,诇xiòng,詗xiòng,敻xiòng,休xiū,俢xiū,修xiū,咻xiū,庥xiū,烌xiū,羞xiū,脙xiū,鸺xiū,臹xiū,貅xiū,馐xiū,樇xiū,銝xiū,髤xiū,髹xiū,鮴xiū,鵂xiū,饈xiū,鏅xiū,飍xiū,鎀xiū,苬xiú,宿xiǔ,朽xiǔ,綇xiǔ,滫xiǔ,糔xiǔ,臰xiù,秀xiù,岫xiù,珛xiù,绣xiù,袖xiù,琇xiù,锈xiù,溴xiù,璓xiù,螑xiù,繍xiù,繡xiù,鏥xiù,鏽xiù,齅xiù,嗅xiù,蓿xu,繻xū,圩xū,旴xū,疞xū,盱xū,欨xū,胥xū,须xū,顼xū,虗xū,虚xū,谞xū,媭xū,幁xū,欻xū,虛xū,須xū,楈xū,窢xū,頊xū,嘘xū,稰xū,需xū,魆xū,噓xū,墟xū,嬃xū,歔xū,縃xū,歘xū,諝xū,譃xū,魖xū,驉xū,鑐xū,鬚xū,姁xū,偦xū,戌xū,蕦xū,俆xú,徐xú,蒣xú,訏xǔ,许xǔ,诩xǔ,冔xǔ,栩xǔ,珝xǔ,許xǔ,湑xǔ,暊xǔ,詡xǔ,鄦xǔ,糈xǔ,醑xǔ,盨xǔ,滀xù,嘼xù,鉥xù,旭xù,伵xù,序xù,侐xù,沀xù,叙xù,恤xù,昫xù,洫xù,垿xù,欰xù,殈xù,烅xù,珬xù,勖xù,勗xù,敍xù,敘xù,烼xù,绪xù,续xù,酗xù,喣xù,壻xù,婿xù,朂xù,溆xù,絮xù,訹xù,慉xù,続xù,蓄xù,賉xù,槒xù,漵xù,潊xù,盢xù,瞁xù,緒xù,聟xù,稸xù,緖xù,瞲xù,藚xù,續xù,怴xù,芧xù,汿xù,煦xù,煖xuān,吅xuān,轩xuān,昍xuān,咺xuān,宣xuān,晅xuān,軒xuān,谖xuān,喧xuān,媗xuān,愃xuān,愋xuān,揎xuān,萱xuān,萲xuān,暄xuān,煊xuān,瑄xuān,蓒xuān,睻xuān,儇xuān,禤xuān,箮xuān,翧xuān,蝖xuān,蕿xuān,諠xuān,諼xuān,鍹xuān,駽xuān,矎xuān,翾xuān,藼xuān,蘐xuān,蠉xuān,譞xuān,鰚xuān,塇xuān,玹xuán,痃xuán,悬xuán,旋xuán,蜁xuán,嫙xuán,漩xuán,暶xuán,璇xuán,檈xuán,璿xuán,懸xuán,玆xuán,玄xuán,选xuǎn,選xuǎn,癣xuǎn,癬xuǎn,絃xuàn,夐xuàn,怰xuàn,泫xuàn,昡xuàn,炫xuàn,绚xuàn,眩xuàn,袨xuàn,铉xuàn,琄xuàn,眴xuàn,衒xuàn,絢xuàn,楦xuàn,鉉xuàn,碹xuàn,蔙xuàn,镟xuàn,颴xuàn,縼xuàn,繏xuàn,鏇xuàn,贙xuàn,駨xuàn,渲xuàn,疶xuē,蒆xuē,靴xuē,薛xuē,鞾xuē,削xuē,噱xué,穴xué,斈xué,乴xué,坹xué,学xué,岤xué,峃xué,茓xué,泶xué,袕xué,鸴xué,學xué,嶨xué,燢xué,雤xué,鷽xué,踅xué,雪xuě,樰xuě,膤xuě,艝xuě,轌xuě,鳕xuě,鱈xuě,血xuè,泧xuè,狘xuè,桖xuè,烕xuè,谑xuè,趐xuè,瀥xuè,坃xūn,勋xūn,埙xūn,塤xūn,熏xūn,窨xūn,勲xūn,勳xūn,薫xūn,嚑xūn,壎xūn,獯xūn,薰xūn,曛xūn,燻xūn,臐xūn,矄xūn,蘍xūn,壦xūn,爋xūn,纁xūn,醺xūn,勛xūn,郇xún,咰xún,寻xún,巡xún,旬xún,杊xún,询xún,峋xún,恂xún,浔xún,紃xún,荀xún,栒xún,桪xún,毥xún,珣xún,偱xún,尋xún,循xún,揗xún,詢xún,鄩xún,鲟xún,噚xún,潯xún,攳xún,樳xún,燅xún,燖xún,璕xún,蟳xún,鱏xún,鱘xún,侚xún,彐xún,撏xún,洵xún,浚xùn,濬xùn,鶽xùn,驯xùn,馴xùn,卂xùn,训xùn,伨xùn,汛xùn,迅xùn,徇xùn,狥xùn,迿xùn,逊xùn,殉xùn,訊xùn,訓xùn,訙xùn,奞xùn,巽xùn,殾xùn,遜xùn,愻xùn,賐xùn,噀xùn,蕈xùn,顨xùn,鑂xùn,稄xùn,讯xùn,呀ya,圧yā,丫yā,压yā,庘yā,押yā,鸦yā,桠yā,鸭yā,铔yā,椏yā,鴉yā,錏yā,鴨yā,壓yā,鵶yā,鐚yā,唖yā,亜yā,垭yā,俹yā,埡yā,孲yā,拁yá,疨yá,牙yá,伢yá,岈yá,芽yá,厓yá,枒yá,琊yá,笌yá,蚜yá,堐yá,崕yá,崖yá,涯yá,猚yá,瑘yá,睚yá,衙yá,漄yá,齖yá,庌yá,顔yá,釾yá,疋yǎ,厊yǎ,啞yǎ,痖yǎ,雅yǎ,瘂yǎ,蕥yǎ,挜yǎ,掗yǎ,哑yǎ,呾yà,輵yà,潝yà,劜yà,圠yà,亚yà,穵yà,襾yà,讶yà,犽yà,迓yà,亞yà,玡yà,娅yà,砑yà,氩yà,婭yà,訝yà,揠yà,氬yà,猰yà,圔yà,稏yà,窫yà,椻yà,鼼yà,聐yà,淊yān,咽yān,恹yān,剦yān,烟yān,珚yān,胭yān,偣yān,崦yān,淹yān,焉yān,菸yān,阉yān,湮yān,腌yān,傿yān,煙yān,鄢yān,嫣yān,漹yān,嶖yān,樮yān,醃yān,閹yān,嬮yān,篶yān,臙yān,黫yān,弇yān,硽yān,慇yān,黰yān,橪yān,阽yán,炏yán,挻yán,厃yán,唌yán,廵yán,讠yán,円yán,延yán,闫yán,严yán,妍yán,言yán,訁yán,岩yán,昖yán,沿yán,炎yán,郔yán,姸yán,娫yán,狿yán,研yán,莚yán,娮yán,盐yán,琂yán,硏yán,訮yán,閆yán,阎yán,嵒yán,嵓yán,綖yán,蜒yán,塩yán,揅yán,楌yán,詽yán,碞yán,蔅yán,颜yán,虤yán,閻yán,厳yán,檐yán,顏yán,嚴yán,壛yán,巌yán,簷yán,櫩yán,麙yán,壧yán,孍yán,巖yán,巗yán,巚yán,欕yán,礹yán,鹽yán,麣yán,黬yán,偐yán,贗yán,菴yǎn,剡yǎn,嬐yǎn,崄yǎn,嶮yǎn,抁yǎn,沇yǎn,乵yǎn,兖yǎn,奄yǎn,俨yǎn,兗yǎn,匽yǎn,衍yǎn,偃yǎn,厣yǎn,掩yǎn,眼yǎn,萒yǎn,郾yǎn,酓yǎn,嵃yǎn,愝yǎn,扊yǎn,揜yǎn,棪yǎn,渰yǎn,渷yǎn,琰yǎn,隒yǎn,椼yǎn,罨yǎn,演yǎn,褗yǎn,蝘yǎn,魇yǎn,噞yǎn,躽yǎn,檿yǎn,黡yǎn,厴yǎn,甗yǎn,鰋yǎn,鶠yǎn,黤yǎn,齞yǎn,儼yǎn,黭yǎn,顩yǎn,鼴yǎn,巘yǎn,曮yǎn,魘yǎn,鼹yǎn,齴yǎn,黶yǎn,掞yǎn,隁yǎn,喭yǎn,酀yǎn,龂yǎn,齗yǎn,阭yǎn,夵yǎn,裺yǎn,溎yàn,豜yàn,豣yàn,烻yàn,湺yàn,麲yàn,厌yàn,妟yàn,牪yàn,姲yàn,彥yàn,彦yàn,砚yàn,唁yàn,宴yàn,晏yàn,艳yàn,覎yàn,验yàn,焔yàn,谚yàn,堰yàn,敥yàn,焰yàn,焱yàn,猒yàn,硯yàn,葕yàn,雁yàn,滟yàn,鳫yàn,厭yàn,墕yàn,熖yàn,酽yàn,嬊yàn,谳yàn,餍yàn,鴈yàn,燄yàn,燕yàn,諺yàn,赝yàn,鬳yàn,曕yàn,騐yàn,験yàn,嚥yàn,嬿yàn,艶yàn,贋yàn,軅yàn,爓yàn,醶yàn,騴yàn,鷃yàn,灔yàn,觾yàn,讌yàn,饜yàn,驗yàn,鷰yàn,艷yàn,灎yàn,釅yàn,驠yàn,灧yàn,讞yàn,豓yàn,豔yàn,灩yàn,顑yàn,懕yàn,筵yàn,觃yàn,暥yàn,醼yàn,歍yāng,央yāng,咉yāng,姎yāng,抰yāng,泱yāng,殃yāng,胦yāng,眏yāng,秧yāng,鸯yāng,鉠yāng,雵yāng,鞅yāng,鍈yāng,鴦yāng,佒yāng,霙yāng,瑒yáng,婸yáng,扬yáng,羊yáng,阦yáng,旸yáng,杨yáng,炀yáng,佯yáng,劷yáng,氜yáng,疡yáng,钖yáng,飏yáng,垟yáng,徉yáng,昜yáng,洋yáng,羏yáng,烊yáng,珜yáng,眻yáng,陽yáng,崵yáng,崸yáng,揚yáng,蛘yáng,敭yáng,暘yáng,楊yáng,煬yáng,禓yáng,瘍yáng,諹yáng,輰yáng,鴹yáng,颺yáng,鐊yáng,鰑yáng,霷yáng,鸉yáng,阳yáng,鍚yáng,飬yǎng,勜yǎng,仰yǎng,坱yǎng,奍yǎng,岟yǎng,养yǎng,炴yǎng,氧yǎng,痒yǎng,紻yǎng,傟yǎng,楧yǎng,軮yǎng,慃yǎng,氱yǎng,羪yǎng,養yǎng,駚yǎng,懩yǎng,攁yǎng,瀁yǎng,癢yǎng,礢yǎng,柍yǎng,恙yàng,样yàng,羕yàng,詇yàng,様yàng,漾yàng,樣yàng,怏yàng,玅yāo,撽yāo,幺yāo,夭yāo,吆yāo,妖yāo,枖yāo,祅yāo,訞yāo,喓yāo,葽yāo,楆yāo,腰yāo,邀yāo,宎yāo,侥yáo,僥yáo,蕘yáo,匋yáo,恌yáo,铫yáo,爻yáo,尧yáo,尭yáo,肴yáo,垚yáo,姚yáo,峣yáo,轺yáo,倄yáo,珧yáo,窑yáo,傜yáo,堯yáo,揺yáo,殽yáo,谣yáo,軺yáo,嗂yáo,媱yáo,徭yáo,愮yáo,搖yáo,摇yáo,猺yáo,遙yáo,遥yáo,摿yáo,暚yáo,榣yáo,瑤yáo,瑶yáo,飖yáo,餆yáo,嶢yáo,嶤yáo,徺yáo,磘yáo,窯yáo,餚yáo,繇yáo,謠yáo,謡yáo,鎐yáo,鳐yáo,颻yáo,蘨yáo,顤yáo,鰩yáo,鷂yáo,踰yáo,烑yáo,窰yáo,噛yǎo,仸yǎo,岆yǎo,抭yǎo,杳yǎo,殀yǎo,狕yǎo,苭yǎo,咬yǎo,柼yǎo,窅yǎo,窈yǎo,舀yǎo,偠yǎo,婹yǎo,崾yǎo,溔yǎo,蓔yǎo,榚yǎo,闄yǎo,騕yǎo,齩yǎo,鷕yǎo,穾yǎo,鴢yǎo,烄yào,药yào,要yào,袎yào,窔yào,筄yào,葯yào,詏yào,熎yào,覞yào,靿yào,獟yào,鹞yào,薬yào,曜yào,艞yào,藥yào,矅yào,曣yào,耀yào,纅yào,讑yào,鑰yào,怮yào,箹yào,钥yào,籥yào,亪ye,椰yē,暍yē,噎yē,潱yē,蠮yē,耶yē,吔yē,倻yē,峫yé,爷yé,捓yé,揶yé,铘yé,爺yé,鋣yé,鎁yé,擨yé,蠱yě,虵yě,也yě,冶yě,埜yě,野yě,嘢yě,漜yě,壄yě,瓛yè,熀yè,殕yè,啘yè,鐷yè,緤yè,业yè,叶yè,曳yè,页yè,邺yè,夜yè,亱yè,枼yè,洂yè,頁yè,捙yè,晔yè,枽yè,烨yè,偞yè,掖yè,液yè,谒yè,殗yè,腋yè,葉yè,鄓yè,墷yè,楪yè,業yè,馌yè,僷yè,曄yè,曅yè,歋yè,燁yè,擖yè,擛yè,皣yè,瞱yè,靥yè,嶪yè,嶫yè,澲yè,謁yè,餣yè,嚈yè,擫yè,曗yè,瞸yè,鍱yè,擪yè,爗yè,礏yè,鎑yè,饁yè,鵺yè,靨yè,驜yè,鸈yè,黦yè,煠yè,抴yè,鄴yè,膶yen,岃yen,袆yī,褘yī,一yī,弌yī,辷yī,衤yī,伊yī,衣yī,医yī,吚yī,依yī,祎yī,咿yī,洢yī,猗yī,畩yī,郼yī,铱yī,壹yī,揖yī,欹yī,蛜yī,禕yī,嫛yī,漪yī,稦yī,銥yī,嬄yī,噫yī,夁yī,瑿yī,鹥yī,繄yī,檹yī,毉yī,醫yī,黟yī,譩yī,鷖yī,黳yī,悘yī,壱yī,耛yí,拸yí,訑yí,釶yí,鉇yí,箷yí,戺yí,珆yí,鴺yí,銕yí,狏yí,迱yí,彵yí,熈yí,仪yí,匜yí,圯yí,夷yí,冝yí,宐yí,杝yí,沂yí,诒yí,侇yí,宜yí,怡yí,沶yí,狋yí,衪yí,饴yí,咦yí,姨yí,峓yí,弬yí,恞yí,柂yí,瓵yí,荑yí,贻yí,迻yí,宧yí,巸yí,扅yí,桋yí,眙yí,胰yí,袘yí,痍yí,移yí,萓yí,媐yí,椬yí,羠yí,蛦yí,詒yí,貽yí,遗yí,暆yí,椸yí,誃yí,跠yí,頉yí,颐yí,飴yí,疑yí,儀yí,熪yí,遺yí,嶬yí,彛yí,彜yí,螔yí,頥yí,寲yí,嶷yí,簃yí,顊yí,鮧yí,彝yí,彞yí,謻yí,鏔yí,籎yí,觺yí,讉yí,鸃yí,貤yí,乁yí,栘yí,頤yí,钀yǐ,錡yǐ,裿yǐ,迤yǐ,酏yǐ,乙yǐ,已yǐ,以yǐ,钇yǐ,佁yǐ,攺yǐ,矣yǐ,苡yǐ,苢yǐ,庡yǐ,舣yǐ,蚁yǐ,釔yǐ,倚yǐ,扆yǐ,逘yǐ,偯yǐ,崺yǐ,旑yǐ,椅yǐ,鈘yǐ,鉯yǐ,鳦yǐ,旖yǐ,輢yǐ,敼yǐ,螘yǐ,檥yǐ,礒yǐ,艤yǐ,蟻yǐ,顗yǐ,轙yǐ,齮yǐ,肊yǐ,陭yǐ,嬟yǐ,醷yǐ,阤yǐ,叕yǐ,锜yǐ,歖yǐ,笖yǐ,昳yì,睪yì,欥yì,輗yì,掜yì,儗yì,謚yì,紲yì,絏yì,辥yì,义yì,亿yì,弋yì,刈yì,忆yì,艺yì,仡yì,匇yì,议yì,亦yì,伇yì,屹yì,异yì,忔yì,芅yì,伿yì,佚yì,劮yì,呓yì,坄yì,役yì,抑yì,曵yì,杙yì,耴yì,苅yì,译yì,邑yì,佾yì,呭yì,呹yì,妷yì,峄yì,怈yì,怿yì,易yì,枍yì,泆yì,炈yì,绎yì,诣yì,驿yì,俋yì,奕yì,帟yì,帠yì,弈yì,枻yì,浂yì,玴yì,疫yì,羿yì,衵yì,轶yì,唈yì,垼yì,悒yì,挹yì,栧yì,栺yì,欭yì,浥yì,浳yì,益yì,袣yì,谊yì,勚yì,埸yì,悥yì,殹yì,異yì,羛yì,翊yì,翌yì,萟yì,訲yì,訳yì,豙yì,豛yì,逸yì,釴yì,隿yì,幆yì,敡yì,晹yì,棭yì,殔yì,湙yì,焲yì,蛡yì,詍yì,跇yì,軼yì,鈠yì,骮yì,亄yì,意yì,溢yì,獈yì,痬yì,竩yì,缢yì,義yì,肄yì,裔yì,裛yì,詣yì,勩yì,嫕yì,廙yì,榏yì,潩yì,瘗yì,膉yì,蓺yì,蜴yì,靾yì,駅yì,億yì,撎yì,槸yì,毅yì,熠yì,熤yì,熼yì,瘞yì,镒yì,鹝yì,鹢yì,黓yì,劓yì,圛yì,墿yì,嬑yì,嶧yì,憶yì,懌yì,曀yì,殪yì,澺yì,燚yì,瘱yì,瞖yì,穓yì,縊yì,艗yì,薏yì,螠yì,褹yì,寱yì,斁yì,曎yì,檍yì,歝yì,燡yì,翳yì,翼yì,臆yì,貖yì,鮨yì,癔yì,藙yì,藝yì,贀yì,鎰yì,镱yì,繶yì,繹yì,豷yì,霬yì,鯣yì,鶂yì,鶃yì,鶍yì,瀷yì,蘙yì,譯yì,議yì,醳yì,饐yì,囈yì,鐿yì,鷁yì,鷊yì,襼yì,驛yì,鷧yì,虉yì,鷾yì,讛yì,齸yì,襗yì,樴yì,癦yì,焬yì,阣yì,兿yì,誼yì,燱yì,懿yì,鮣yin,乚yīn,囙yīn,因yīn,阥yīn,阴yīn,侌yīn,垔yīn,姻yīn,洇yīn,茵yīn,荫yīn,音yīn,骃yīn,栶yīn,殷yīn,氤yīn,陰yīn,凐yīn,秵yīn,裀yīn,铟yīn,陻yīn,堙yīn,婣yīn,愔yīn,筃yīn,絪yīn,歅yīn,溵yīn,禋yīn,蒑yīn,蔭yīn,瘖yīn,銦yīn,磤yīn,緸yīn,鞇yīn,諲yīn,霒yīn,駰yīn,噾yīn,濦yīn,闉yīn,霠yīn,韾yīn,喑yīn,玪yín,伒yín,乑yín,吟yín,犾yín,苂yín,斦yín,泿yín,圁yín,峾yín,烎yín,狺yín,珢yín,粌yín,荶yín,訔yín,唫yín,婬yín,寅yín,崟yín,崯yín,淫yín,訡yín,银yín,鈝yín,滛yín,碒yín,鄞yín,夤yín,蔩yín,訚yín,誾yín,銀yín,龈yín,噖yín,殥yín,嚚yín,檭yín,蟫yín,霪yín,齦yín,鷣yín,螾yín,垠yín,璌yín,赺yǐn,縯yǐn,尹yǐn,引yǐn,吲yǐn,饮yǐn,蚓yǐn,隐yǐn,淾yǐn,釿yǐn,鈏yǐn,飲yǐn,隠yǐn,靷yǐn,飮yǐn,朄yǐn,趛yǐn,檃yǐn,瘾yǐn,隱yǐn,嶾yǐn,濥yǐn,蘟yǐn,癮yǐn,讔yǐn,輑yǐn,櫽yǐn,堷yìn,梀yìn,隂yìn,印yìn,茚yìn,洕yìn,胤yìn,垽yìn,湚yìn,猌yìn,廕yìn,酳yìn,慭yìn,癊yìn,憖yìn,憗yìn,懚yìn,檼yìn,韹yīng,焽yīng,旲yīng,应yīng,応yīng,英yīng,偀yīng,桜yīng,珱yīng,莺yīng,啨yīng,婴yīng,媖yīng,愥yīng,渶yīng,朠yīng,煐yīng,瑛yīng,嫈yīng,碤yīng,锳yīng,嘤yīng,撄yīng,甇yīng,緓yīng,缨yīng,罂yīng,蝧yīng,賏yīng,樱yīng,璎yīng,噟yīng,罃yīng,褮yīng,鴬yīng,鹦yīng,嬰yīng,應yīng,膺yīng,韺yīng,甖yīng,鹰yīng,嚶yīng,孆yīng,孾yīng,攖yīng,瀴yīng,罌yīng,蘡yīng,櫻yīng,瓔yīng,礯yīng,譻yīng,鶯yīng,鑍yīng,纓yīng,蠳yīng,鷪yīng,軈yīng,鷹yīng,鸎yīng,鸚yīng,謍yīng,譍yīng,绬yīng,鶧yīng,夃yíng,俓yíng,泂yíng,嵤yíng,桯yíng,滎yíng,鎣yíng,盁yíng,迎yíng,茔yíng,盈yíng,荥yíng,荧yíng,莹yíng,萤yíng,营yíng,萦yíng,営yíng,溁yíng,溋yíng,萾yíng,僌yíng,塋yíng,楹yíng,滢yíng,蓥yíng,潆yíng,熒yíng,蝇yíng,瑩yíng,蝿yíng,嬴yíng,營yíng,縈yíng,螢yíng,濙yíng,濚yíng,濴yíng,藀yíng,覮yíng,赢yíng,巆yíng,攍yíng,攚yíng,瀛yíng,瀠yíng,蠅yíng,櫿yíng,灐yíng,籝yíng,灜yíng,贏yíng,籯yíng,耺yíng,蛍yíng,瀯yíng,瀅yíng,矨yǐng,郢yǐng,浧yǐng,梬yǐng,颍yǐng,颕yǐng,颖yǐng,摬yǐng,影yǐng,潁yǐng,瘿yǐng,穎yǐng,頴yǐng,巊yǐng,廮yǐng,鐛yǐng,癭yǐng,鱦yìng,映yìng,暎yìng,硬yìng,媵yìng,膡yìng,鞕yìng,嚛yo,哟yō,唷yō,喲yō,拥yōng,痈yōng,邕yōng,庸yōng,嗈yōng,鄘yōng,雍yōng,墉yōng,嫞yōng,慵yōng,滽yōng,槦yōng,牅yōng,銿yōng,噰yōng,壅yōng,擁yōng,澭yōng,郺yōng,镛yōng,臃yōng,癕yōng,雝yōng,鏞yōng,廱yōng,灉yōng,饔yōng,鱅yōng,鷛yōng,癰yōng,鳙yōng,揘yóng,喁yóng,鰫yóng,嵱yóng,筩yǒng,永yǒng,甬yǒng,咏yǒng,怺yǒng,泳yǒng,俑yǒng,勇yǒng,勈yǒng,栐yǒng,埇yǒng,悀yǒng,柡yǒng,涌yǒng,恿yǒng,傛yǒng,惥yǒng,愑yǒng,湧yǒng,硧yǒng,詠yǒng,彮yǒng,愹yǒng,蛹yǒng,慂yǒng,踊yǒng,禜yǒng,鲬yǒng,踴yǒng,鯒yǒng,塎yǒng,佣yòng,用yòng,苚yòng,砽yòng,醟yòng,妋yōu,优yōu,忧yōu,攸yōu,呦yōu,幽yōu,悠yōu,麀yōu,滺yōu,憂yōu,優yōu,鄾yōu,嚘yōu,懮yōu,瀀yōu,纋yōu,耰yōu,逌yōu,泈yōu,櫌yōu,蓧yóu,蚘yóu,揂yóu,汼yóu,汓yóu,蝤yóu,尣yóu,冘yóu,尢yóu,尤yóu,由yóu,沋yóu,犹yóu,邮yóu,怞yóu,油yóu,肬yóu,怣yóu,斿yóu,疣yóu,峳yóu,浟yóu,秞yóu,莜yóu,莤yóu,莸yóu,郵yóu,铀yóu,偤yóu,蚰yóu,訧yóu,逰yóu,游yóu,猶yóu,鱿yóu,楢yóu,猷yóu,鈾yóu,鲉yóu,輏yóu,駀yóu,蕕yóu,蝣yóu,魷yóu,輶yóu,鮋yóu,櫾yóu,邎yóu,庮yóu,甴yóu,遊yóu,羗yǒu,脩yǒu,戭yǒu,友yǒu,有yǒu,丣yǒu,卣yǒu,苃yǒu,酉yǒu,羑yǒu,羐yǒu,莠yǒu,梄yǒu,聈yǒu,脜yǒu,铕yǒu,湵yǒu,蒏yǒu,蜏yǒu,銪yǒu,槱yǒu,牖yǒu,牗yǒu,黝yǒu,栯yǒu,禉yǒu,痏yòu,褎yòu,褏yòu,銹yòu,柚yòu,又yòu,右yòu,幼yòu,佑yòu,侑yòu,孧yòu,狖yòu,糿yòu,哊yòu,囿yòu,姷yòu,宥yòu,峟yòu,牰yòu,祐yòu,诱yòu,迶yòu,唀yòu,蚴yòu,亴yòu,貁yòu,釉yòu,酭yòu,鼬yòu,誘yòu,纡yū,迂yū,迃yū,穻yū,陓yū,紆yū,虶yū,唹yū,淤yū,盓yū,瘀yū,箊yū,亐yū,丂yú,桙yú,婾yú,媮yú,悇yú,汙yú,汚yú,鱮yú,颙yú,顒yú,渝yú,于yú,邘yú,伃yú,余yú,妤yú,扵yú,欤yú,玗yú,玙yú,於yú,盂yú,臾yú,鱼yú,俞yú,兪yú,禺yú,竽yú,舁yú,茰yú,荢yú,娛yú,娯yú,娱yú,狳yú,谀yú,酑yú,馀yú,渔yú,萸yú,釪yú,隃yú,隅yú,雩yú,魚yú,堣yú,堬yú,崳yú,嵎yú,嵛yú,愉yú,揄yú,楰yú,畬yú,畭yú,硢yú,腴yú,逾yú,骬yú,愚yú,楡yú,榆yú,歈yú,牏yú,瑜yú,艅yú,虞yú,觎yú,漁yú,睮yú,窬yú,舆yú,褕yú,歶yú,羭yú,蕍yú,蝓yú,諛yú,雓yú,餘yú,魣yú,嬩yú,懙yú,覦yú,歟yú,璵yú,螸yú,輿yú,鍝yú,礖yú,謣yú,髃yú,鮽yú,旟yú,籅yú,騟yú,鯲yú,鰅yú,鷠yú,鸆yú,萮yú,芌yú,喩yú,媀yú,貗yú,衧yú,湡yú,澞yú,頨yǔ,蝺yǔ,藇yǔ,予yǔ,与yǔ,伛yǔ,宇yǔ,屿yǔ,羽yǔ,雨yǔ,俁yǔ,俣yǔ,挧yǔ,禹yǔ,语yǔ,圄yǔ,祤yǔ,偊yǔ,匬yǔ,圉yǔ,庾yǔ,敔yǔ,鄅yǔ,萭yǔ,傴yǔ,寙yǔ,斞yǔ,楀yǔ,瑀yǔ,瘐yǔ,與yǔ,語yǔ,窳yǔ,龉yǔ,噳yǔ,嶼yǔ,貐yǔ,斔yǔ,麌yǔ,蘌yǔ,齬yǔ,穥yǔ,峿yǔ,閼yù,穀yù,蟈yù,僪yù,鐍yù,肀yù,翑yù,衘yù,獝yù,玉yù,驭yù,圫yù,聿yù,芋yù,妪yù,忬yù,饫yù,育yù,郁yù,彧yù,昱yù,狱yù,秗yù,俼yù,峪yù,浴yù,砡yù,钰yù,预yù,喐yù,域yù,堉yù,悆yù,惐yù,欲yù,淢yù,淯yù,袬yù,逳yù,阈yù,喅yù,喻yù,寓yù,庽yù,御yù,棛yù,棜yù,棫yù,焴yù,琙yù,矞yù,裕yù,遇yù,飫yù,馭yù,鹆yù,愈yù,滪yù,煜yù,稢yù,罭yù,蒮yù,蓣yù,誉yù,鈺yù,預yù,嶎yù,戫yù,毓yù,獄yù,瘉yù,緎yù,蜟yù,蜮yù,輍yù,銉yù,隩yù,噊yù,慾yù,稶yù,蓹yù,薁yù,豫yù,遹yù,鋊yù,鳿yù,澦yù,燏yù,燠yù,蕷yù,諭yù,錥yù,閾yù,鴥yù,鴧yù,鴪yù,礇yù,禦yù,魊yù,鹬yù,癒yù,礜yù,篽yù,繘yù,鵒yù,櫲yù,饇yù,蘛yù,譽yù,轝yù,鐭yù,霱yù,欎yù,驈yù,鬻yù,籞yù,鱊yù,鷸yù,鸒yù,欝yù,軉yù,鬰yù,鬱yù,灪yù,爩yù,灹yù,吁yù,谕yù,嫗yù,儥yù,籲yù,裷yuān,嫚yuān,囦yuān,鸢yuān,剈yuān,冤yuān,弲yuān,悁yuān,眢yuān,鸳yuān,寃yuān,渁yuān,渆yuān,渊yuān,渕yuān,淵yuān,葾yuān,棩yuān,蒬yuān,蜎yuān,鹓yuān,箢yuān,鳶yuān,蜵yuān,駌yuān,鋺yuān,鴛yuān,嬽yuān,鵷yuān,灁yuān,鼝yuān,蝝yuān,鼘yuān,喛yuán,楥yuán,芫yuán,元yuán,贠yuán,邧yuán,员yuán,园yuán,沅yuán,杬yuán,垣yuán,爰yuán,貟yuán,原yuán,員yuán,圆yuán,笎yuán,袁yuán,厡yuán,酛yuán,圎yuán,援yuán,湲yuán,猨yuán,缘yuán,鈨yuán,鼋yuán,園yuán,圓yuán,塬yuán,媴yuán,源yuán,溒yuán,猿yuán,獂yuán,蒝yuán,榞yuán,榬yuán,辕yuán,緣yuán,縁yuán,蝯yuán,橼yuán,羱yuán,薗yuán,螈yuán,謜yuán,轅yuán,黿yuán,鎱yuán,櫞yuán,邍yuán,騵yuán,鶢yuán,鶰yuán,厵yuán,傆yuán,媛yuán,褑yuán,褤yuán,嫄yuán,远yuǎn,盶yuǎn,遠yuǎn,逺yuǎn,肙yuàn,妴yuàn,苑yuàn,怨yuàn,院yuàn,垸yuàn,衏yuàn,掾yuàn,瑗yuàn,禐yuàn,愿yuàn,裫yuàn,噮yuàn,願yuàn,哕yue,噦yuē,曰yuē,曱yuē,约yuē,約yuē,矱yuē,彟yuē,彠yuē,矆yuè,妜yuè,髺yuè,哾yuè,趯yuè,月yuè,戉yuè,汋yuè,岄yuè,抈yuè,礿yuè,岳yuè,玥yuè,恱yuè,悅yuè,悦yuè,蚎yuè,蚏yuè,軏yuè,钺yuè,阅yuè,捳yuè,跀yuè,跃yuè,粤yuè,越yuè,鈅yuè,粵yuè,鉞yuè,閱yuè,閲yuè,嬳yuè,樾yuè,篗yuè,嶽yuè,籆yuè,瀹yuè,蘥yuè,爚yuè,禴yuè,躍yuè,鸑yuè,籰yuè,龥yuè,鸙yuè,躒yuè,刖yuè,龠yuè,涒yūn,轀yūn,蒀yūn,煴yūn,蒕yūn,熅yūn,奫yūn,赟yūn,頵yūn,贇yūn,氲yūn,氳yūn,晕yūn,暈yūn,云yún,勻yún,匀yún,伝yún,呍yún,囩yún,妘yún,抣yún,纭yún,芸yún,昀yún,畇yún,眃yún,秐yún,郧yún,涢yún,紜yún,耘yún,鄖yún,雲yún,愪yún,溳yún,筼yún,蒷yún,熉yún,澐yún,蕓yún,鋆yún,橒yún,篔yún,縜yún,繧yún,荺yún,沄yún,允yǔn,夽yǔn,狁yǔn,玧yǔn,陨yǔn,殒yǔn,喗yǔn,鈗yǔn,隕yǔn,殞yǔn,馻yǔn,磒yǔn,霣yǔn,齫yǔn,齳yǔn,抎yǔn,緷yùn,孕yùn,运yùn,枟yùn,郓yùn,恽yùn,鄆yùn,酝yùn,傊yùn,惲yùn,愠yùn,運yùn,慍yùn,韫yùn,韵yùn,熨yùn,蕴yùn,賱yùn,醖yùn,醞yùn,餫yùn,韗yùn,韞yùn,蘊yùn,韻yùn,腪yùn,噈zā,帀zā,匝zā,沞zā,咂zā,拶zā,沯zā,桚zā,紮zā,鉔zā,臜zā,臢zā,砸zá,韴zá,雑zá,襍zá,雜zá,雥zá,囋zá,杂zá,咋zǎ,災zāi,灾zāi,甾zāi,哉zāi,栽zāi,烖zāi,渽zāi,溨zāi,睵zāi,賳zāi,宰zǎi,载zǎi,崽zǎi,載zǎi,仔zǎi,再zài,在zài,扗zài,洅zài,傤zài,酨zài,儎zài,篸zān,兂zān,糌zān,簪zān,簮zān,鐕zān,撍zān,咱zán,偺zán,喒zǎn,昝zǎn,寁zǎn,儧zǎn,攒zǎn,儹zǎn,趱zǎn,趲zǎn,揝zǎn,穳zàn,暂zàn,暫zàn,賛zàn,赞zàn,錾zàn,鄼zàn,濽zàn,蹔zàn,酂zàn,瓉zàn,贊zàn,鏨zàn,瓒zàn,灒zàn,讃zàn,瓚zàn,禶zàn,襸zàn,讚zàn,饡zàn,酇zàn,匨zāng,蔵zāng,牂zāng,羘zāng,赃zāng,賍zāng,臧zāng,賘zāng,贓zāng,髒zāng,贜zāng,脏zāng,驵zǎng,駔zǎng,奘zàng,弉zàng,塟zàng,葬zàng,銺zàng,臓zàng,臟zàng,傮zāo,遭zāo,糟zāo,醩zāo,蹧zāo,凿záo,鑿záo,早zǎo,枣zǎo,栆zǎo,蚤zǎo,棗zǎo,璅zǎo,澡zǎo,璪zǎo,薻zǎo,藻zǎo,灶zào,皁zào,皂zào,唕zào,唣zào,造zào,梍zào,慥zào,煰zào,艁zào,噪zào,簉zào,燥zào,竃zào,譟zào,趮zào,竈zào,躁zào,啫zē,伬zé,则zé,択zé,沢zé,择zé,泎zé,泽zé,责zé,迮zé,則zé,啧zé,帻zé,笮zé,舴zé,責zé,溭zé,嘖zé,嫧zé,幘zé,箦zé,蔶zé,樍zé,歵zé,諎zé,赜zé,擇zé,皟zé,瞔zé,礋zé,謮zé,賾zé,蠌zé,齚zé,齰zé,鸅zé,讁zé,葃zé,澤zé,仄zè,夨zè,庂zè,汄zè,昃zè,昗zè,捑zè,崱zè,贼zéi,賊zéi,鲗zéi,蠈zéi,鰂zéi,鱡zéi,怎zěn,谮zèn,囎zèn,譛zèn,曽zēng,増zēng,鄫zēng,增zēng,憎zēng,缯zēng,橧zēng,熷zēng,璔zēng,矰zēng,磳zēng,罾zēng,繒zēng,譄zēng,鱛zēng,縡zēng,鬷zěng,锃zèng,鋥zèng,甑zèng,赠zèng,贈zèng,馇zha,餷zha,蹅zhā,紥zhā,迊zhā,抯zhā,挓zhā,柤zhā,哳zhā,偧zhā,揸zhā,渣zhā,溠zhā,楂zhā,劄zhā,皶zhā,箚zhā,樝zhā,皻zhā,譇zhā,齄zhā,齇zhā,扎zhā,摣zhā,藸zhā,囃zhā,喳zhā,箑zhá,耫zhá,札zhá,轧zhá,軋zhá,闸zhá,蚻zhá,铡zhá,牐zhá,閘zhá,霅zhá,鍘zhá,譗zhá,挿zhǎ,揷zhǎ,厏zhǎ,苲zhǎ,砟zhǎ,鲊zhǎ,鲝zhǎ,踷zhǎ,鮓zhǎ,鮺zhǎ,眨zhǎ,吒zhà,乍zhà,诈zhà,咤zhà,奓zhà,炸zhà,宱zhà,痄zhà,蚱zhà,詐zhà,搾zhà,榨zhà,醡zhà,拃zhà,柞zhà,夈zhāi,粂zhāi,捚zhāi,斋zhāi,斎zhāi,榸zhāi,齋zhāi,摘zhāi,檡zhái,宅zhái,翟zhái,窄zhǎi,鉙zhǎi,骴zhài,簀zhài,债zhài,砦zhài,債zhài,寨zhài,瘵zhài,沾zhān,毡zhān,旃zhān,栴zhān,粘zhān,蛅zhān,惉zhān,詀zhān,趈zhān,詹zhān,閚zhān,谵zhān,嶦zhān,薝zhān,邅zhān,霑zhān,氊zhān,瞻zhān,鹯zhān,旜zhān,譫zhān,饘zhān,鳣zhān,驙zhān,魙zhān,鸇zhān,覱zhān,氈zhān,讝zhán,斩zhǎn,飐zhǎn,展zhǎn,盏zhǎn,崭zhǎn,斬zhǎn,琖zhǎn,搌zhǎn,盞zhǎn,嶃zhǎn,嶄zhǎn,榐zhǎn,颭zhǎn,嫸zhǎn,醆zhǎn,蹍zhǎn,欃zhàn,占zhàn,佔zhàn,战zhàn,栈zhàn,桟zhàn,站zhàn,偡zhàn,绽zhàn,菚zhàn,棧zhàn,湛zhàn,戦zhàn,綻zhàn,嶘zhàn,輚zhàn,戰zhàn,虥zhàn,虦zhàn,轏zhàn,蘸zhàn,驏zhàn,张zhāng,張zhāng,章zhāng,鄣zhāng,嫜zhāng,彰zhāng,慞zhāng,漳zhāng,獐zhāng,粻zhāng,蔁zhāng,遧zhāng,暲zhāng,樟zhāng,璋zhāng,餦zhāng,蟑zhāng,鏱zhāng,騿zhāng,鱆zhāng,麞zhāng,涱zhāng,傽zhāng,长zhǎng,仧zhǎng,長zhǎng,镸zhǎng,仉zhǎng,涨zhǎng,掌zhǎng,漲zhǎng,幥zhǎng,礃zhǎng,鞝zhǎng,鐣zhǎng,丈zhàng,仗zhàng,扙zhàng,杖zhàng,胀zhàng,账zhàng,粀zhàng,帳zhàng,脹zhàng,痮zhàng,障zhàng,墇zhàng,嶂zhàng,幛zhàng,賬zhàng,瘬zhàng,瘴zhàng,瞕zhàng,帐zhàng,鼌zhāo,鼂zhāo,謿zhāo,皽zhāo,佋zhāo,钊zhāo,妱zhāo,巶zhāo,招zhāo,昭zhāo,炤zhāo,盄zhāo,釗zhāo,鉊zhāo,駋zhāo,鍣zhāo,爫zhǎo,沼zhǎo,瑵zhǎo,爪zhǎo,找zhǎo,召zhào,兆zhào,诏zhào,枛zhào,垗zhào,狣zhào,赵zhào,笊zhào,肁zhào,旐zhào,棹zhào,罀zhào,詔zhào,照zhào,罩zhào,肇zhào,肈zhào,趙zhào,曌zhào,燳zhào,鮡zhào,櫂zhào,瞾zhào,羄zhào,啅zhào,龑yan,著zhe,着zhe,蜇zhē,嫬zhē,遮zhē,嗻zhē,摂zhé,歽zhé,砓zhé,籷zhé,虴zhé,哲zhé,埑zhé,粍zhé,袩zhé,啠zhé,悊zhé,晢zhé,晣zhé,辄zhé,喆zhé,蛰zhé,詟zhé,谪zhé,摺zhé,輒zhé,磔zhé,輙zhé,辙zhé,蟄zhé,嚞zhé,謫zhé,鮿zhé,轍zhé,襵zhé,讋zhé,厇zhé,謺zhé,者zhě,锗zhě,赭zhě,褶zhě,鍺zhě,这zhè,柘zhè,浙zhè,這zhè,淛zhè,蔗zhè,樜zhè,鹧zhè,蟅zhè,鷓zhè,趂zhēn,贞zhēn,针zhēn,侦zhēn,浈zhēn,珍zhēn,珎zhēn,貞zhēn,帪zhēn,栕zhēn,眞zhēn,真zhēn,砧zhēn,祯zhēn,針zhēn,偵zhēn,敒zhēn,桭zhēn,酙zhēn,寊zhēn,湞zhēn,遉zhēn,搸zhēn,斟zhēn,楨zhēn,獉zhēn,甄zhēn,禎zhēn,蒖zhēn,蓁zhēn,鉁zhēn,靕zhēn,榛zhēn,殝zhēn,瑧zhēn,禛zhēn,潧zhēn,樼zhēn,澵zhēn,臻zhēn,薽zhēn,錱zhēn,轃zhēn,鍖zhēn,鱵zhēn,胗zhēn,侲zhēn,揕zhēn,鎭zhēn,帧zhēn,幀zhēn,朾zhēn,椹zhēn,桢zhēn,箴zhēn,屒zhén,诊zhěn,抮zhěn,枕zhěn,姫zhěn,弫zhěn,昣zhěn,轸zhěn,畛zhěn,疹zhěn,眕zhěn,袗zhěn,聄zhěn,萙zhěn,裖zhěn,覙zhěn,診zhěn,軫zhěn,缜zhěn,稹zhěn,駗zhěn,縝zhěn,縥zhěn,辴zhěn,鬒zhěn,嫃zhěn,謓zhèn,迧zhèn,圳zhèn,阵zhèn,纼zhèn,挋zhèn,陣zhèn,鸩zhèn,振zhèn,朕zhèn,栚zhèn,紖zhèn,眹zhèn,赈zhèn,塦zhèn,絼zhèn,蜄zhèn,敶zhèn,誫zhèn,賑zhèn,鋴zhèn,镇zhèn,鴆zhèn,鎮zhèn,震zhèn,嶒zhēng,脀zhēng,凧zhēng,争zhēng,佂zhēng,姃zhēng,征zhēng,怔zhēng,爭zhēng,峥zhēng,炡zhēng,狰zhēng,烝zhēng,眐zhēng,钲zhēng,埩zhēng,崝zhēng,崢zhēng,猙zhēng,睁zhēng,聇zhēng,铮zhēng,媜zhēng,筝zhēng,徰zhēng,蒸zhēng,鉦zhēng,箏zhēng,徵zhēng,踭zhēng,篜zhēng,錚zhēng,鬇zhēng,癥zhēng,糽zhēng,睜zhēng,氶zhěng,抍zhěng,拯zhěng,塣zhěng,晸zhěng,愸zhěng,撜zhěng,整zhěng,憕zhèng,徎zhèng,挣zhèng,掙zhèng,正zhèng,证zhèng,诤zhèng,郑zhèng,政zhèng,症zhèng,証zhèng,鄭zhèng,鴊zhèng,證zhèng,諍zhèng,之zhī,支zhī,卮zhī,汁zhī,芝zhī,巵zhī,枝zhī,知zhī,织zhī,肢zhī,徔zhī,栀zhī,祗zhī,秓zhī,秖zhī,胑zhī,胝zhī,衼zhī,倁zhī,疷zhī,祬zhī,秪zhī,脂zhī,隻zhī,梔zhī,椥zhī,搘zhī,禔zhī,綕zhī,榰zhī,蜘zhī,馶zhī,鳷zhī,謢zhī,鴲zhī,織zhī,蘵zhī,鼅zhī,禵zhī,只zhī,鉄zhí,执zhí,侄zhí,坧zhí,直zhí,姪zhí,値zhí,值zhí,聀zhí,釞zhí,埴zhí,執zhí,职zhí,植zhí,殖zhí,絷zhí,跖zhí,墌zhí,摭zhí,馽zhí,嬂zhí,慹zhí,漐zhí,踯zhí,膱zhí,縶zhí,職zhí,蟙zhí,蹠zhí,軄zhí,躑zhí,秇zhí,埶zhí,戠zhí,禃zhí,茝zhǐ,絺zhǐ,觝zhǐ,徴zhǐ,止zhǐ,凪zhǐ,劧zhǐ,旨zhǐ,阯zhǐ,址zhǐ,坁zhǐ,帋zhǐ,沚zhǐ,纸zhǐ,芷zhǐ,抧zhǐ,祉zhǐ,茋zhǐ,咫zhǐ,恉zhǐ,指zhǐ,枳zhǐ,洔zhǐ,砋zhǐ,轵zhǐ,淽zhǐ,疻zhǐ,紙zhǐ,訨zhǐ,趾zhǐ,軹zhǐ,黹zhǐ,酯zhǐ,藢zhǐ,襧zhǐ,汦zhǐ,胵zhì,歭zhì,遟zhì,迣zhì,鶨zhì,亊zhì,銴zhì,至zhì,芖zhì,志zhì,忮zhì,扻zhì,豸zhì,厔zhì,垁zhì,帙zhì,帜zhì,治zhì,炙zhì,质zhì,郅zhì,俧zhì,峙zhì,庢zhì,庤zhì,栉zhì,洷zhì,祑zhì,陟zhì,娡zhì,徏zhì,挚zhì,晊zhì,桎zhì,狾zhì,秩zhì,致zhì,袟zhì,贽zhì,轾zhì,徝zhì,掷zhì,梽zhì,猘zhì,畤zhì,痔zhì,秲zhì,秷zhì,窒zhì,紩zhì,翐zhì,袠zhì,觗zhì,貭zhì,铚zhì,鸷zhì,傂zhì,崻zhì,彘zhì,智zhì,滞zhì,痣zhì,蛭zhì,骘zhì,廌zhì,滍zhì,稙zhì,稚zhì,置zhì,跱zhì,輊zhì,锧zhì,雉zhì,槜zhì,滯zhì,潌zhì,瘈zhì,製zhì,覟zhì,誌zhì,銍zhì,幟zhì,憄zhì,摯zhì,潪zhì,熫zhì,稺zhì,膣zhì,觯zhì,質zhì,踬zhì,鋕zhì,旘zhì,瀄zhì,緻zhì,隲zhì,鴙zhì,儨zhì,劕zhì,懥zhì,擲zhì,櫛zhì,懫zhì,贄zhì,櫍zhì,瓆zhì,觶zhì,騭zhì,礩zhì,豑zhì,騺zhì,驇zhì,躓zhì,鷙zhì,鑕zhì,豒zhì,制zhì,偫zhì,筫zhì,駤zhì,徸zhōng,蝩zhōng,中zhōng,伀zhōng,汷zhōng,刣zhōng,妐zhōng,彸zhōng,忠zhōng,炂zhōng,终zhōng,柊zhōng,盅zhōng,衳zhōng,钟zhōng,舯zhōng,衷zhōng,終zhōng,鈡zhōng,幒zhōng,蔠zhōng,锺zhōng,螤zhōng,鴤zhōng,螽zhōng,鍾zhōng,鼨zhōng,蹱zhōng,鐘zhōng,籦zhōng,衆zhōng,迚zhōng,肿zhǒng,种zhǒng,冢zhǒng,喠zhǒng,尰zhǒng,塚zhǒng,歱zhǒng,腫zhǒng,瘇zhǒng,種zhǒng,踵zhǒng,煄zhǒng,緟zhòng,仲zhòng,众zhòng,妕zhòng,狆zhòng,祌zhòng,茽zhòng,衶zhòng,重zhòng,蚛zhòng,偅zhòng,眾zhòng,堹zhòng,媑zhòng,筗zhòng,諥zhòng,啁zhōu,州zhōu,舟zhōu,诌zhōu,侜zhōu,周zhōu,洲zhōu,炿zhōu,诪zhōu,珘zhōu,辀zhōu,郮zhōu,婤zhōu,徟zhōu,矪zhōu,週zhōu,喌zhōu,粥zhōu,赒zhōu,輈zhōu,銂zhōu,賙zhōu,輖zhōu,霌zhōu,駲zhōu,嚋zhōu,盩zhōu,謅zhōu,譸zhōu,僽zhōu,諏zhōu,烐zhōu,妯zhóu,轴zhóu,軸zhóu,碡zhóu,肘zhǒu,帚zhǒu,菷zhǒu,晭zhǒu,睭zhǒu,箒zhǒu,鯞zhǒu,疛zhǒu,椆zhòu,詶zhòu,薵zhòu,纣zhòu,伷zhòu,呪zhòu,咒zhòu,宙zhòu,绉zhòu,冑zhòu,咮zhòu,昼zhòu,紂zhòu,胄zhòu,荮zhòu,晝zhòu,皱zhòu,酎zhòu,粙zhòu,葤zhòu,詋zhòu,甃zhòu,皺zhòu,駎zhòu,噣zhòu,縐zhòu,骤zhòu,籕zhòu,籒zhòu,驟zhòu,籀zhòu,蕏zhū,藷zhū,朱zhū,劯zhū,侏zhū,诛zhū,邾zhū,洙zhū,茱zhū,株zhū,珠zhū,诸zhū,猪zhū,硃zhū,袾zhū,铢zhū,絑zhū,蛛zhū,誅zhū,跦zhū,槠zhū,潴zhū,蝫zhū,銖zhū,橥zhū,諸zhū,豬zhū,駯zhū,鮢zhū,瀦zhū,櫧zhū,櫫zhū,鼄zhū,鯺zhū,蠩zhū,秼zhū,騶zhū,鴸zhū,薥zhú,鸀zhú,朮zhú,竹zhú,竺zhú,炢zhú,茿zhú,烛zhú,逐zhú,笜zhú,舳zhú,瘃zhú,蓫zhú,燭zhú,蠋zhú,躅zhú,鱁zhú,劚zhú,孎zhú,灟zhú,斸zhú,曯zhú,欘zhú,蠾zhú,钃zhú,劅zhú,斀zhú,爥zhú,主zhǔ,宔zhǔ,拄zhǔ,砫zhǔ,罜zhǔ,渚zhǔ,煑zhǔ,煮zhǔ,詝zhǔ,嘱zhǔ,濐zhǔ,麈zhǔ,瞩zhǔ,囑zhǔ,矚zhǔ,尌zhù,伫zhù,佇zhù,住zhù,助zhù,纻zhù,苎zhù,坾zhù,杼zhù,苧zhù,贮zhù,驻zhù,壴zhù,柱zhù,柷zhù,殶zhù,炷zhù,祝zhù,疰zhù,眝zhù,祩zhù,竚zhù,莇zhù,紵zhù,紸zhù,羜zhù,蛀zhù,嵀zhù,筑zhù,註zhù,貯zhù,跓zhù,軴zhù,铸zhù,筯zhù,鉒zhù,馵zhù,墸zhù,箸zhù,翥zhù,樦zhù,鋳zhù,駐zhù,築zhù,篫zhù,霔zhù,麆zhù,鑄zhù,櫡zhù,注zhù,飳zhù,抓zhuā,檛zhuā,膼zhuā,髽zhuā,跩zhuǎi,睉zhuài,拽zhuài,耑zhuān,专zhuān,専zhuān,砖zhuān,專zhuān,鄟zhuān,瑼zhuān,膞zhuān,磚zhuān,諯zhuān,蟤zhuān,顓zhuān,颛zhuān,转zhuǎn,転zhuǎn,竱zhuǎn,轉zhuǎn,簨zhuàn,灷zhuàn,啭zhuàn,堟zhuàn,蒃zhuàn,瑑zhuàn,僎zhuàn,撰zhuàn,篆zhuàn,馔zhuàn,饌zhuàn,囀zhuàn,籑zhuàn,僝zhuàn,妆zhuāng,追zhuī,骓zhuī,椎zhuī,锥zhuī,錐zhuī,騅zhuī,鵻zhuī,沝zhuǐ,倕zhuì,埀zhuì,腏zhuì,笍zhuì,娷zhuì,缀zhuì,惴zhuì,甀zhuì,缒zhuì,畷zhuì,膇zhuì,墜zhuì,綴zhuì,赘zhuì,縋zhuì,諈zhuì,醊zhuì,錣zhuì,餟zhuì,礈zhuì,贅zhuì,轛zhuì,鑆zhuì,坠zhuì,湻zhūn,宒zhūn,迍zhūn,肫zhūn,窀zhūn,谆zhūn,諄zhūn,衠zhūn,訰zhūn,准zhǔn,準zhǔn,綧zhǔn,稕zhǔn,凖zhǔn,鐯zhuo,拙zhuō,炪zhuō,倬zhuō,捉zhuō,桌zhuō,涿zhuō,棳zhuō,琸zhuō,窧zhuō,槕zhuō,蠿zhuō,矠zhuó,卓zhuó,圴zhuó,犳zhuó,灼zhuó,妰zhuó,茁zhuó,斫zhuó,浊zhuó,丵zhuó,浞zhuó,诼zhuó,酌zhuó,啄zhuó,娺zhuó,梲zhuó,斮zhuó,晫zhuó,椓zhuó,琢zhuó,斱zhuó,硺zhuó,窡zhuó,罬zhuó,撯zhuó,擆zhuó,斲zhuó,禚zhuó,諁zhuó,諑zhuó,濁zhuó,擢zhuó,斵zhuó,濯zhuó,镯zhuó,鵫zhuó,灂zhuó,蠗zhuó,鐲zhuó,籗zhuó,鷟zhuó,籱zhuó,烵zhuó,謶zhuó,薋zī,菑zī,吱zī,孜zī,茊zī,兹zī,咨zī,姕zī,姿zī,茲zī,栥zī,紎zī,赀zī,资zī,崰zī,淄zī,秶zī,缁zī,谘zī,赼zī,嗞zī,嵫zī,椔zī,湽zī,滋zī,粢zī,葘zī,辎zī,鄑zī,孶zī,禌zī,觜zī,貲zī,資zī,趑zī,锱zī,緇zī,鈭zī,镃zī,龇zī,輜zī,鼒zī,澬zī,諮zī,趦zī,輺zī,錙zī,髭zī,鲻zī,鍿zī,頾zī,頿zī,鯔zī,鶅zī,鰦zī,齜zī,訾zī,訿zī,芓zī,孳zī,鎡zī,茈zǐ,泚zǐ,籽zǐ,子zǐ,姉zǐ,姊zǐ,杍zǐ,矷zǐ,秄zǐ,呰zǐ,秭zǐ,耔zǐ,虸zǐ,笫zǐ,梓zǐ,釨zǐ,啙zǐ,紫zǐ,滓zǐ,榟zǐ,橴zǐ,自zì,茡zì,倳zì,剚zì,恣zì,牸zì,渍zì,眥zì,眦zì,胔zì,胾zì,漬zì,字zì,唨zo,潨zōng,宗zōng,倧zōng,综zōng,骔zōng,堫zōng,嵏zōng,嵕zōng,惾zōng,棕zōng,猣zōng,腙zōng,葼zōng,朡zōng,椶zōng,嵸zōng,稯zōng,緃zōng,熧zōng,緵zōng,翪zōng,蝬zōng,踨zōng,踪zōng,磫zōng,豵zōng,蹤zōng,騌zōng,鬃zōng,騣zōng,鬉zōng,鯮zōng,鯼zōng,鑁zōng,綜zōng,潀zóng,潈zóng,蓯zǒng,熜zǒng,緫zǒng,总zǒng,偬zǒng,捴zǒng,惣zǒng,愡zǒng,揔zǒng,搃zǒng,傯zǒng,蓗zǒng,摠zǒng,総zǒng,燪zǒng,總zǒng,鍯zǒng,鏓zǒng,縦zǒng,縂zǒng,纵zòng,昮zòng,疭zòng,倊zòng,猔zòng,碂zòng,粽zòng,糉zòng,瘲zòng,錝zòng,縱zòng,邹zōu,驺zōu,诹zōu,陬zōu,菆zōu,棷zōu,棸zōu,鄒zōu,緅zōu,鄹zōu,鯫zōu,黀zōu,齺zōu,芻zōu,鲰zōu,辶zǒu,赱zǒu,走zǒu,鯐zǒu,搊zǒu,奏zòu,揍zòu,租zū,菹zū,錊zū,伜zú,倅zú,紣zú,綷zú,顇zú,卆zú,足zú,卒zú,哫zú,崒zú,崪zú,族zú,稡zú,箤zú,踤zú,踿zú,镞zú,鏃zú,诅zǔ,阻zǔ,俎zǔ,爼zǔ,祖zǔ,組zǔ,詛zǔ,靻zǔ,鎺zǔ,组zǔ,鉆zuān,劗zuān,躜zuān,鑚zuān,躦zuān,繤zuǎn,缵zuǎn,纂zuǎn,纉zuǎn,籫zuǎn,纘zuǎn,欑zuàn,赚zuàn,賺zuàn,鑽zuàn,钻zuàn,攥zuàn,厜zuī,嗺zuī,樶zuī,蟕zuī,纗zuī,嶉zuǐ,槯zuǐ,嶊zuǐ,噿zuǐ,濢zuǐ,璻zuǐ,嘴zuǐ,睟zuì,枠zuì,栬zuì,絊zuì,酔zuì,晬zuì,最zuì,祽zuì,罪zuì,辠zuì,蕞zuì,醉zuì,嶵zuì,檇zuì,檌zuì,穝zuì,墫zūn,尊zūn,嶟zūn,遵zūn,樽zūn,繜zūn,罇zūn,鶎zūn,鐏zūn,鱒zūn,鷷zūn,鳟zūn,僔zǔn,噂zǔn,撙zǔn,譐zǔn,拵zùn,捘zùn,銌zùn,咗zuo,昨zuó,秨zuó,捽zuó,椊zuó,稓zuó,筰zuó,鈼zuó,阝zuǒ,左zuǒ,佐zuǒ,繓zuǒ,酢zuò,作zuò,坐zuò,阼zuò,岝zuò,岞zuò,怍zuò,侳zuò,祚zuò,胙zuò,唑zuò,座zuò,袏zuò,做zuò,葄zuò,蓙zuò,飵zuò,糳zuò,疮chuāng,牕chuāng,噇chuáng,闖chuǎng,剏chuàng,霜shuāng,欆shuāng,驦shuāng,慡shuǎng,灀shuàng,窓chuāng,瘡chuāng,闯chuǎng,仺chuàng,剙chuàng,雙shuāng,礵shuāng,鸘shuāng,樉shuǎng,谁shuí,鹴shuāng,爽shuǎng,鏯shuǎng,孀shuāng,孇shuāng,騻shuāng,焋zhuàng,幢zhuàng,撞zhuàng,隹zhuī,傱shuǎn,",
            toPinyin: function (settings) {
                var l1 = settings.str,
                    dz = settings.dz,
                    sym = settings.sym,
                    sym1 = settings.sym1,
                    sym2 = settings.sym2;
                if (!l1) return;
                var l2 = l1.length;
                var I1 = "";
                if (!sym1) {
                    l1 = l1.replace(/[a-z]+/g, '');
                }
                var reg = new RegExp('[a-zA-Z0-9\- ]');
                for (var i = 0; i < l2; i++) {
                    var val = l1.substr(i, 1); //中文
                    var name = textCode.pinyindictionary.arraySearch(val, textCode.pinyindictionary.PinYin); //拼音
                    if (reg.test(val)) {
                        I1 += val;
                    } else {
                        if (sym) {
                            I1 += setSym(dz, val, name);
                        } else if (name) {
                            I1 += setSym(dz, val, name);
                        }
                        /*if (name !== false) {
                        if (dz)
                        I1 += val + name + ' ';
                        else
                        I1 += name + ' ';*/
                    }

                }
                function setSym(dz, val, name) {
                    switch (dz) {
                        case '1':
                            return (name ? name : val) + ' ';
                        case '2':
                            return val + (name ? name : '') + ' ';
                        case '3':
                            return (name ? name : '') + val + ' ';
                    }
                    return '';
                }
                //I1 = I1.replace(/ /g, '-');
                while (I1.indexOf('--') > 0) {
                    I1 = I1.replace('--', '-');
                }
                if (sym2)
                    return I1.toLocaleLowerCase();
                else
                    return I1.toLocaleLowerCase().replace(/\s/g, '');
            },
            arraySearch: function (l1, l2) {
                var p = "";
                if (!l1.trim()) return "";
                for (var name in textCode.pinyindictionary.PinYin) {
                    if (textCode.pinyindictionary.PinYin[name].indexOf(l1) != -1) {
                        return textCode.pinyindictionary.ucfirst(name); break;
                        //p += ucfirst(name)+' '
                    }
                }
                return p;
            },
            ucfirst: function (l1) {
                if (l1.length > 0) {
                    var first = l1.substr(0, 1).toUpperCase();
                    var spare = l1.substr(1, l1.length);
                    return first + spare;
                }
            },
            trans: function () {
                var con = document.getElementById('content').value;
                var str = '';
                var s;
                for (var i = 0; i < con.length; i++) {
                    if (textCode.pinyindictionary.pydic.indexOf(con.charAt(i)) != -1 && con.charCodeAt(i) > 200) {
                        s = 1;
                        while (textCode.pinyindictionary.pydic.charAt(textCode.pinyindictionary.pydic.indexOf(con.charAt(i)) + s) != ",") {
                            str += textCode.pinyindictionary.pydic.charAt(textCode.pinyindictionary.pydic.indexOf(con.charAt(i)) + s);
                            s++;
                        }
                        str += " ";
                    }
                    else {
                        str += con.charAt(i);
                    }
                }
                document.getElementById('result').value = str;
            }
        },
        lowtoupp: {
            lowtouppClick: function () {
                tools.copyBtn('copy');
                tools.copyBtn('clip');
                var forms = getid('fm');
                //forms.num.onkeydown = function (e) { entNumber(e); $(forms.trans).removeClass("col-gray"); $(forms.num).removeClass("col-gray"); }
                $("#num").keydown(function (e) {
                    entNumber(e);
                    $(forms.trans).removeClass("col-gray");
                    $(forms.num).removeClass("col-gray");
                });
                forms.seach.onclick = function () {
                    textCode.lowtoupp.TransConvert();
                    if ($("#trans").val()) $("#trans").siblings().hide();
                }
                forms.clear.onclick = function () { tools.clear([getid('trans'), getid('num')]); }
                forms.toupp.onclick = function () {
                    textCode.lowtoupp.englishConvert('touppercase'); $(forms.content).removeClass("col-gray");
                    if ($("#result").val()) $("#result").siblings().hide();
                }
                forms.tolow.onclick = function () {
                    textCode.lowtoupp.englishConvert('tolowercase'); $(forms.content).removeClass("col-gray");
                    if ($("#result").val()) $("#result").siblings().hide();
                }
                forms.firstupp.onclick = function () {
                    textCode.lowtoupp.englishConvert('touppercaseF'); $(forms.content).removeClass("col-gray");
                    if ($("#result").val()) $("#result").siblings().hide();
                }
                forms.clear1.onclick = function () { tools.clear([getid('content')]); }
                forms.content.onclick = function () { $(this).removeClass("col-gray"); }
            },
            TransConvert: function () {
                document.getElementById("trans").value = textCode.lowtoupp.ToTrans(document.getElementById("num").value)
            },
            ToTrans: function (a) {
                var b = 9.999999999999E10,
                    f = "\u96f6",
                    h = "\u58f9",
                    g = "\u8d30",
                    e = "\u53c1",
                    k = "\u8086",
                    p = "\u4f0d",
                    q = "\u9646",
                    r = "\u67d2",
                    s = "\u634c",
                    t = "\u7396",
                    l = "\u62fe",
                    d = "\u4f70",
                    i = "\u4edf",
                    m = "\u4e07",
                    j = "\u4ebf",
                    u = "人民币",
                    o = "\u5143",
                    c = "\u89d2",
                    n = "\u5206",
                    v = "\u6574";
                a = a.toString();
                if (a == "") {
                    alert("转换内容不能为空!");
                    return ""
                }
                if (a.match(/[^,.\d]/) != null) {
                    alert("输入有误,请输入小数点和纯数字!");
                    return ""
                }
                if (a.match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) {
                    alert("输入有误,请输入小数点和纯数字!");
                    return ""
                }
                a = a.replace(/,/g, "");
                a = a.replace(/^0+/, "");
                if (Number(a) > b) {
                    alert("\u5bf9\u4e0d\u8d77,\u4f60\u8f93\u5165\u7684\u6570\u5b57\u592a\u5927\u4e86!\u6700\u5927\u6570\u5b57\u4e3a99999999999.99\uff01");
                    return ""
                }
                b = a.split(".");
                if (b.length > 1) {
                    a = b[0];
                    b = b[1];
                    b = b.substr(0, 2)
                } else {
                    a = b[0];
                    b = ""
                }
                h = new Array(f, h, g, e, k, p, q, r, s, t);
                l = new Array("", l, d, i);
                m = new Array("", m, j);
                n = new Array(c, n);
                c = "";
                if (Number(a) > 0) {
                    for (d = j = 0; d < a.length; d++) {
                        e = a.length - d - 1;
                        i = a.substr(d, 1);
                        g = e / 4;
                        e = e % 4;
                        if (i == "0") j++;
                        else {
                            if (j > 0) c += h[0];
                            j = 0;
                            c += h[Number(i)] + l[e]
                        }
                        if (e == 0 && j < 4) c += m[g]
                    }
                    c += o
                }
                if (b != "") for (d = 0; d < b.length; d++) {
                    i = b.substr(d, 1);
                    if (i != "0") c += h[Number(i)] + n[d]
                }
                if (c == "") c = f + o;
                if (b.length < 2) c += v;
                return c;
            },
            englishConvert: function (str) {
                var text = document.getElementById("content").value;
                if (text == "" || text == null) {
                    alert("请输入要转换的内容");
                    return;
                }
                if (str == "tolowercase") {
                    document.getElementById("content").value = text.toLowerCase();
                }
                else if (str == "touppercase") {
                    document.getElementById("content").value = text.toUpperCase();
                }
                else {
                    document.getElementById("content").value = textCode.lowtoupp.FirstLetterCase(text);
                }
            },
            FirstLetterCase: function (str) {
                var index;
                var tmpStr;
                var tmpChar;
                var preString;
                var postString;
                var strlen;
                tmpStr = str.toLowerCase();
                strLen = tmpStr.length;
                if (strLen > 0) {
                    for (index = 0; index < strLen; index++) {
                        if (index == 0) {
                            tmpChar = tmpStr.substring(0, 1).toUpperCase();
                            postString = tmpStr.substring(1, strLen);
                            tmpStr = tmpChar + postString;
                        }
                        else {
                            tmpChar = tmpStr.substring(index, index + 1);
                            if (tmpChar == " " && index < (strLen - 1)) {
                                tmpChar = tmpStr.substring(index + 1, index + 2).toUpperCase();
                                preString = tmpStr.substring(0, index + 1);
                                postString = tmpStr.substring(index + 2, strLen);
                                tmpStr = preString + tmpChar + postString;
                            }
                        }
                    }
                }
                return tmpStr;
            }
        },
        gbbig: {
            gbbigClick: function () {
                var forms = document.forms[0];
                forms.tosim.onclick = function () {
                    textCode.gbbig.convert(0);
                    $(forms.result).removeClass("col-gray");
                    if ($("#result").val()) $("#result").siblings().hide();
                }
                forms.totra.onclick = function () {
                    textCode.gbbig.convert(1);
                    $(forms.result).removeClass("col-gray");
                    if ($("#result").val()) $("#result").siblings().hide();
                }
                forms.toother.onclick = function () {
                    textCode.gbbig.convert(2);
                    $(forms.result).removeClass("col-gray");
                    if ($("#result").val()) $("#result").siblings().hide();
                }
                forms.clear.onclick = function () {
                    forms.result.value = '';
                    forms.textarea.value = '';
                }
            },
            copy: function (ob) {
                var obj = textCode.gbbig.findObj(ob); if (obj) {
                    obj.select(); js = obj.createTextRange(); js.execCommand("Copy");
                }
            },
            cut: function (ob) {
                var obj = textCode.gbbig.findObj(ob); if (obj) {
                    obj.select(); js = obj.createTextRange(); js.execCommand("Cut");
                }
            },
            findObj: function (n, d) { //v4.0
                var p, i, x; if (!d) d = document; if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
                    d = parent.frames[n.substring(p + 1)].document; n = n.substring(0, p);
                }
                if (!(x = d[n]) && d.all) x = d.all[n]; for (i = 0; !x && i < d.forms.length; i++) x = d.forms[i][n];
                for (i = 0; !x && d.layers && i < d.layers.length; i++) x = textCode.gbbig.findObj(n, d.layers[i].document);
                if (!x && document.getElementById) x = document.getElementById(n); return x;
            },
            jtgo: function (cc) {
                var str = '';
                for (var i = 0; i < cc.length; i++) {
                    if (textCode.gbbig.charft().indexOf(cc.charAt(i)) != -1)
                        str += textCode.gbbig.charjt().charAt(textCode.gbbig.charft().indexOf(cc.charAt(i)));
                    else if (textCode.gbbig.charhx().indexOf(cc.charAt(i)) != -1)
                        str += textCode.gbbig.charjt().charAt(textCode.gbbig.charhx().indexOf(cc.charAt(i)));
                    else
                        str += cc.charAt(i);
                }
                return str;
            },
            ftgo: function (cc) {
                var str = '';
                for (var i = 0; i < cc.length; i++) {
                    if (textCode.gbbig.charjt().indexOf(cc.charAt(i)) != -1)
                        str += textCode.gbbig.charft().charAt(textCode.gbbig.charjt().indexOf(cc.charAt(i)));
                    else if (textCode.gbbig.charhx().indexOf(cc.charAt(i)) != -1)
                        str += textCode.gbbig.charft().charAt(textCode.gbbig.charhx().indexOf(cc.charAt(i)));
                    else
                        str += cc.charAt(i);
                }
                return str;
            },
            qqgo: function (cc) {
                var str = '';
                for (var i = 0; i < cc.length; i++) {
                    if (textCode.gbbig.charjt().indexOf(cc.charAt(i)) != -1)
                        str += textCode.gbbig.charhx().charAt(textCode.gbbig.charjt().indexOf(cc.charAt(i)));
                    else if (textCode.gbbig.charft().indexOf(cc.charAt(i)) != -1)
                        str += textCode.gbbig.charhx().charAt(textCode.gbbig.charft().indexOf(cc.charAt(i)));
                    else
                        str += cc.charAt(i);
                }
                return str;
            },
            convert: function (ctype) {
                if (ctype == 0)
                    document.getElementById("result").value = textCode.gbbig.jtgo(document.getElementById("txt").value);
                else if (ctype == 2)
                    document.getElementById("result").value = textCode.gbbig.qqgo(document.getElementById("txt").value);
                else
                    document.getElementById("result").value = textCode.gbbig.ftgo(document.getElementById("txt").value);
            },
            charjt: function () {
                return '啊阿埃挨哎唉哀皑癌蔼矮艾碍爱隘鞍氨安俺按暗岸胺案肮昂盎凹敖熬翱袄傲奥懊澳芭捌扒叭吧笆八疤巴拔跋靶把耙坝霸罢爸白柏百摆佰败拜稗斑班搬扳般颁板版扮拌伴瓣半办绊邦帮梆榜膀绑棒磅蚌镑傍谤苞胞包褒剥薄雹保堡饱宝抱报暴豹鲍爆杯碑悲卑北辈背贝钡倍狈备惫焙被奔苯本笨崩绷甭泵蹦迸逼鼻比鄙笔彼碧蓖蔽毕毙毖币庇痹闭敝弊必辟壁臂避陛鞭边编贬扁便变卞辨辩辫遍标彪膘表鳖憋别瘪彬斌濒滨宾摈兵冰柄丙秉饼炳病并玻菠播拨钵波博勃搏铂箔伯帛舶脖膊渤泊驳捕卜哺补埠不布步簿部怖擦猜裁材才财睬踩采彩菜蔡餐参蚕残惭惨灿苍舱仓沧藏操糙槽曹草厕策侧册测层蹭插叉茬茶查碴搽察岔差诧拆柴豺搀掺蝉馋谗缠铲产阐颤昌猖场尝常长偿肠厂敞畅唱倡超抄钞朝嘲潮巢吵炒车扯撤掣彻澈郴臣辰尘晨忱沉陈趁衬撑称城橙成呈乘程惩澄诚承逞骋秤吃痴持匙池迟弛驰耻齿侈尺赤翅斥炽充冲虫崇宠抽酬畴踌稠愁筹仇绸瞅丑臭初出橱厨躇锄雏滁除楚础储矗搐触处揣川穿椽传船喘串疮窗幢床闯创吹炊捶锤垂春椿醇唇淳纯蠢戳绰疵茨磁雌辞慈瓷词此刺赐次聪葱囱匆从丛凑粗醋簇促蹿篡窜摧崔催脆瘁粹淬翠村存寸磋撮搓措挫错搭达答瘩打大呆歹傣戴带殆代贷袋待逮怠耽担丹单郸掸胆旦氮但惮淡诞弹蛋当挡党荡档刀捣蹈倒岛祷导到稻悼道盗德得的蹬灯登等瞪凳邓堤低滴迪敌笛狄涤翟嫡抵底地蒂第帝弟递缔颠掂滇碘点典靛垫电佃甸店惦奠淀殿碉叼雕凋刁掉吊钓调跌爹碟蝶迭谍叠丁盯叮钉顶鼎锭定订丢东冬董懂动栋侗恫冻洞兜抖斗陡豆逗痘都督毒犊独读堵睹赌杜镀肚度渡妒端短锻段断缎堆兑队对墩吨蹲敦顿囤钝盾遁掇哆多夺垛躲朵跺舵剁惰堕蛾峨鹅俄额讹娥恶厄扼遏鄂饿恩而儿耳尔饵洱二贰发罚筏伐乏阀法珐藩帆番翻樊矾钒繁凡烦反返范贩犯饭泛坊芳方肪房防妨仿访纺放菲非啡飞肥匪诽吠肺废沸费芬酚吩氛分纷坟焚汾粉奋份忿愤粪丰封枫蜂峰锋风疯烽逢冯缝讽奉凤佛否夫敷肤孵扶拂辐幅氟符伏俘服浮涪福袱弗甫抚辅俯釜斧脯腑府腐赴副覆赋复傅付阜父腹负富讣附妇缚咐噶嘎该改概钙盖溉干甘杆柑竿肝赶感秆敢赣冈刚钢缸肛纲岗港杠篙皋高膏羔糕搞镐稿告哥歌搁戈鸽胳疙割革葛格蛤阁隔铬个各给根跟耕更庚羹埂耿梗工攻功恭龚供躬公宫弓巩汞拱贡共钩勾沟苟狗垢构购够辜菇咕箍估沽孤姑鼓古蛊骨谷股故顾固雇刮瓜剐寡挂褂乖拐怪棺关官冠观管馆罐惯灌贯光广逛瑰规圭硅归龟闺轨鬼诡癸桂柜跪贵刽辊滚棍锅郭国果裹过哈骸孩海氦亥害骇酣憨邯韩含涵寒函喊罕翰撼捍旱憾悍焊汗汉夯杭航壕嚎豪毫郝好耗号浩呵喝荷菏核禾和何合盒貉阂河涸赫褐鹤贺嘿黑痕很狠恨哼亨横衡恒轰哄烘虹鸿洪宏弘红喉侯猴吼厚候后呼乎忽瑚壶葫胡蝴狐糊湖弧虎唬护互沪户花哗华猾滑画划化话槐徊怀淮坏欢环桓还缓换患唤痪豢焕涣宦幻荒慌黄磺蝗簧皇凰惶煌晃幌恍谎灰挥辉徽恢蛔回毁悔慧卉惠晦贿秽会烩汇讳诲绘荤昏婚魂浑混豁活伙火获或惑霍货祸击圾基机畸稽积箕肌饥迹激讥鸡姬绩缉吉极棘辑籍集及急疾汲即嫉级挤几脊己蓟技冀季伎祭剂悸济寄寂计记既忌际继纪嘉枷夹佳家加荚颊贾甲钾假稼价架驾嫁歼监坚尖笺间煎兼肩艰奸缄茧检柬碱硷拣捡简俭剪减荐槛鉴践贱见键箭件健舰剑饯渐溅涧建僵姜将浆江疆蒋桨奖讲匠酱降蕉椒礁焦胶交郊浇骄娇嚼搅铰矫侥脚狡角饺缴绞剿教酵轿较叫窖揭接皆秸街阶截劫节茎睛晶鲸京惊精粳经井警景颈静境敬镜径痉靖竟竞净炯窘揪究纠玖韭久灸九酒厩救旧臼舅咎就疚鞠拘狙疽居驹菊局咀矩举沮聚拒据巨具距踞锯俱句惧炬剧捐鹃娟倦眷卷绢撅攫抉掘倔爵桔杰捷睫竭洁结解姐戒藉芥界借介疥诫届巾筋斤金今津襟紧锦仅谨进靳晋禁近烬浸尽劲荆兢觉决诀绝均菌钧军君峻俊竣浚郡骏喀咖卡咯开揩楷凯慨刊堪勘坎砍看康慷糠扛抗亢炕考拷烤靠坷苛柯棵磕颗科壳咳可渴克刻客课肯啃垦恳坑吭空恐孔控抠口扣寇枯哭窟苦酷库裤夸垮挎跨胯块筷侩快宽款匡筐狂框矿眶旷况亏盔岿窥葵奎魁傀馈愧溃坤昆捆困括扩廓阔垃拉喇蜡腊辣啦莱来赖蓝婪栏拦篮阑兰澜谰揽览懒缆烂滥琅榔狼廊郎朗浪捞劳牢老佬姥酪烙涝勒乐雷镭蕾磊累儡垒擂肋类泪棱楞冷厘梨犁黎篱狸离漓理李里鲤礼莉荔吏栗丽厉励砾历利傈例俐痢立粒沥隶力璃哩俩联莲连镰廉怜涟帘敛脸链恋炼练粮凉梁粱良两辆量晾亮谅撩聊僚疗燎寥辽潦了撂镣廖料列裂烈劣猎琳林磷霖临邻鳞淋凛赁吝拎玲菱零龄铃伶羚凌灵陵岭领另令溜琉榴硫馏留刘瘤流柳六龙聋咙笼窿隆垄拢陇楼娄搂篓漏陋芦卢颅庐炉掳卤虏鲁麓碌露路赂鹿潞禄录陆戮驴吕铝侣旅履屡缕虑氯律率滤绿峦挛孪滦卵乱掠略抡轮伦仑沦纶论萝螺罗逻锣箩骡裸落洛骆络妈麻玛码蚂马骂嘛吗埋买麦卖迈脉瞒馒蛮满蔓曼慢漫谩芒茫盲氓忙莽猫茅锚毛矛铆卯茂冒帽貌贸么玫枚梅酶霉煤没眉媒镁每美昧寐妹媚门闷们萌蒙檬盟锰猛梦孟眯醚靡糜迷谜弥米秘觅泌蜜密幂棉眠绵冕免勉娩缅面苗描瞄藐秒渺庙妙蔑灭民抿皿敏悯闽明螟鸣铭名命谬摸摹蘑模膜磨摩魔抹末莫墨默沫漠寞陌谋牟某拇牡亩姆母墓暮幕募慕木目睦牧穆拿哪呐钠那娜纳氖乃奶耐奈南男难囊挠脑恼闹淖呢馁内嫩能妮霓倪泥尼拟你匿腻逆溺蔫拈年碾撵捻念娘酿鸟尿捏聂孽啮镊镍涅您柠狞凝宁拧泞牛扭钮纽脓浓农弄奴努怒女暖虐疟挪懦糯诺哦欧鸥殴藕呕偶沤啪趴爬帕怕琶拍排牌徘湃派攀潘盘磐盼畔判叛乓庞旁耪胖抛咆刨炮袍跑泡呸胚培裴赔陪配佩沛喷盆砰抨烹澎彭蓬棚硼篷膨朋鹏捧碰坯砒霹批披劈琵毗啤脾疲皮匹痞僻屁譬篇偏片骗飘漂瓢票撇瞥拼频贫品聘乒坪苹萍平凭瓶评屏坡泼颇婆破魄迫粕剖扑铺仆莆葡菩蒲埔朴圃普浦谱曝瀑期欺栖戚妻七凄漆柒沏其棋奇歧畦崎脐齐旗祈祁骑起岂乞企启契砌器气迄弃汽泣讫掐洽牵扦钎铅千迁签仟谦乾黔钱钳前潜遣浅谴堑嵌欠歉枪呛腔羌墙蔷强抢橇锹敲悄桥瞧乔侨巧鞘撬翘峭俏窍切茄且怯窃钦侵亲秦琴勤芹擒禽寝沁青轻氢倾卿清擎晴氰情顷请庆琼穷秋丘邱球求囚酋泅趋区蛆曲躯屈驱渠取娶龋趣去圈颧权醛泉全痊拳犬券劝缺炔瘸却鹊榷确雀裙群然燃冉染瓤壤攘嚷让饶扰绕惹热壬仁人忍韧任认刃妊纫扔仍日戎茸蓉荣融熔溶容绒冗揉柔肉茹蠕儒孺如辱乳汝入褥软阮蕊瑞锐闰润若弱撒洒萨腮鳃塞赛三叁伞散桑嗓丧搔骚扫嫂瑟色涩森僧莎砂杀刹沙纱傻啥煞筛晒珊苫杉山删煽衫闪陕擅赡膳善汕扇缮墒伤商赏晌上尚裳梢捎稍烧芍勺韶少哨邵绍奢赊蛇舌舍赦摄射慑涉社设砷申呻伸身深娠绅神沈审婶甚肾慎渗声生甥牲升绳省盛剩胜圣师失狮施湿诗尸虱十石拾时什食蚀实识史矢使屎驶始式示士世柿事拭誓逝势是嗜噬适仕侍释饰氏市恃室视试收手首守寿授售受瘦兽蔬枢梳殊抒输叔舒淑疏书赎孰熟薯暑曙署蜀黍鼠属术述树束戍竖墅庶数漱恕刷耍摔衰甩帅栓拴霜双爽谁水睡税吮瞬顺舜说硕朔烁斯撕嘶思私司丝死肆寺嗣四伺似饲巳松耸怂颂送宋讼诵搜艘擞嗽苏酥俗素速粟僳塑溯宿诉肃酸蒜算虽隋随绥髓碎岁穗遂隧祟孙损笋蓑梭唆缩琐索锁所塌他它她塔獭挞蹋踏胎苔抬台泰酞太态汰坍摊贪瘫滩坛檀痰潭谭谈坦毯袒碳探叹炭汤塘搪堂棠膛唐糖倘躺淌趟烫掏涛滔绦萄桃逃淘陶讨套特藤腾疼誊梯剔踢锑提题蹄啼体替嚏惕涕剃屉天添填田甜恬舔腆挑条迢眺跳贴铁帖厅听烃汀廷停亭庭挺艇通桐酮瞳同铜彤童桶捅筒统痛偷投头透凸秃突图徒途涂屠土吐兔湍团推颓腿蜕褪退吞屯臀拖托脱鸵陀驮驼椭妥拓唾挖哇蛙洼娃瓦袜歪外豌弯湾玩顽丸烷完碗挽晚皖惋宛婉万腕汪王亡枉网往旺望忘妄威巍微危韦违桅围唯惟为潍维苇萎委伟伪尾纬未蔚味畏胃喂魏位渭谓尉慰卫瘟温蚊文闻纹吻稳紊问嗡翁瓮挝蜗涡窝我斡卧握沃巫呜钨乌污诬屋无芜梧吾吴毋武五捂午舞伍侮坞戊雾晤物勿务悟误昔熙析西硒矽晰嘻吸锡牺稀息希悉膝夕惜熄烯溪汐犀檄袭席习媳喜铣洗系隙戏细瞎虾匣霞辖暇峡侠狭下厦夏吓掀锨先仙鲜纤咸贤衔舷闲涎弦嫌显险现献县腺馅羡宪陷限线相厢镶香箱襄湘乡翔祥详想响享项巷橡像向象萧硝霄削哮嚣销消宵淆晓小孝校肖啸笑效楔些歇蝎鞋协挟携邪斜胁谐写械卸蟹懈泄泻谢屑薪芯锌欣辛新忻心信衅星腥猩惺兴刑型形邢行醒幸杏性姓兄凶胸匈汹雄熊休修羞朽嗅锈秀袖绣墟戌需虚嘘须徐许蓄酗叙旭序畜恤絮婿绪续轩喧宣悬旋玄选癣眩绚靴薛学穴雪血勋熏循旬询寻驯巡殉汛训讯逊迅压押鸦鸭呀丫芽牙蚜崖衙涯雅哑亚讶焉咽阉烟淹盐严研蜒岩延言颜阎炎沿奄掩眼衍演艳堰燕厌砚雁唁彦焰宴谚验殃央鸯秧杨扬佯疡羊洋阳氧仰痒养样漾邀腰妖瑶摇尧遥窑谣姚咬舀药要耀椰噎耶爷野冶也页掖业叶曳腋夜液一壹医揖铱依伊衣颐夷遗移仪胰疑沂宜姨彝椅蚁倚已乙矣以艺抑易邑屹亿役臆逸肄疫亦裔意毅忆义益溢诣议谊译异翼翌绎茵荫因殷音阴姻吟银淫寅饮尹引隐印英樱婴鹰应缨莹萤营荧蝇迎赢盈影颖硬映哟拥佣臃痈庸雍踊蛹咏泳涌永恿勇用幽优悠忧尤由邮铀犹油游酉有友右佑釉诱又幼迂淤于盂榆虞愚舆余俞逾鱼愉渝渔隅予娱雨与屿禹宇语羽玉域芋郁吁遇喻峪御愈欲狱育誉浴寓裕预豫驭鸳渊冤元垣袁原援辕园员圆猿源缘远苑愿怨院曰约越跃钥岳粤月悦阅耘云郧匀陨允运蕴酝晕韵孕匝砸杂栽哉灾宰载再在咱攒暂赞赃脏葬遭糟凿藻枣早澡蚤躁噪造皂灶燥责择则泽贼怎增憎曾赠扎喳渣札轧铡闸眨栅榨咋乍炸诈摘斋宅窄债寨瞻毡詹粘沾盏斩辗崭展蘸栈占战站湛绽樟章彰漳张掌涨杖丈帐账仗胀瘴障招昭找沼赵照罩兆肇召遮折哲蛰辙者锗蔗这浙珍斟真甄砧臻贞针侦枕疹诊震振镇阵蒸挣睁征狰争怔整拯正政帧症郑证芝枝支吱蜘知肢脂汁之织职直植殖执值侄址指止趾只旨纸志挚掷至致置帜峙制智秩稚质炙痔滞治窒中盅忠钟衷终种肿重仲众舟周州洲诌粥轴肘帚咒皱宙昼骤珠株蛛朱猪诸诛逐竹烛煮拄瞩嘱主著柱助蛀贮铸筑住注祝驻抓爪拽专砖转撰赚篆桩庄装妆撞壮状椎锥追赘坠缀谆准捉拙卓桌琢茁酌啄着灼浊兹咨资姿滋淄孜紫仔籽滓子自渍字鬃棕踪宗综总纵邹走奏揍租足卒族祖诅阻组钻纂嘴醉最罪尊遵昨左佐柞做作坐座';
            },
            charft: function () {
                return '啊阿埃挨哎唉哀皚癌藹矮艾礙愛隘鞍氨安俺按暗岸胺案肮昂盎凹敖熬翺襖傲奧懊澳芭捌扒叭吧笆八疤巴拔跋靶把耙壩霸罷爸白柏百擺佰敗拜稗斑班搬扳般頒板版扮拌伴瓣半辦絆邦幫梆榜膀綁棒磅蚌鎊傍謗苞胞包褒剝薄雹保堡飽寶抱報暴豹鮑爆杯碑悲卑北輩背貝鋇倍狽備憊焙被奔苯本笨崩繃甭泵蹦迸逼鼻比鄙筆彼碧蓖蔽畢斃毖幣庇痹閉敝弊必辟壁臂避陛鞭邊編貶扁便變卞辨辯辮遍標彪膘表鼈憋別癟彬斌瀕濱賓擯兵冰柄丙秉餅炳病並玻菠播撥缽波博勃搏鉑箔伯帛舶脖膊渤泊駁捕蔔哺補埠不布步簿部怖擦猜裁材才財睬踩采彩菜蔡餐參蠶殘慚慘燦蒼艙倉滄藏操糙槽曹草廁策側冊測層蹭插叉茬茶查碴搽察岔差詫拆柴豺攙摻蟬饞讒纏鏟産闡顫昌猖場嘗常長償腸廠敞暢唱倡超抄鈔朝嘲潮巢吵炒車扯撤掣徹澈郴臣辰塵晨忱沈陳趁襯撐稱城橙成呈乘程懲澄誠承逞騁秤吃癡持匙池遲弛馳恥齒侈尺赤翅斥熾充沖蟲崇寵抽酬疇躊稠愁籌仇綢瞅醜臭初出櫥廚躇鋤雛滁除楚礎儲矗搐觸處揣川穿椽傳船喘串瘡窗幢床闖創吹炊捶錘垂春椿醇唇淳純蠢戳綽疵茨磁雌辭慈瓷詞此刺賜次聰蔥囪匆從叢湊粗醋簇促躥篡竄摧崔催脆瘁粹淬翠村存寸磋撮搓措挫錯搭達答瘩打大呆歹傣戴帶殆代貸袋待逮怠耽擔丹單鄲撣膽旦氮但憚淡誕彈蛋當擋黨蕩檔刀搗蹈倒島禱導到稻悼道盜德得的蹬燈登等瞪凳鄧堤低滴迪敵笛狄滌翟嫡抵底地蒂第帝弟遞締顛掂滇碘點典靛墊電佃甸店惦奠澱殿碉叼雕凋刁掉吊釣調跌爹碟蝶叠諜疊丁盯叮釘頂鼎錠定訂丟東冬董懂動棟侗恫凍洞兜抖鬥陡豆逗痘都督毒犢獨讀堵睹賭杜鍍肚度渡妒端短鍛段斷緞堆兌隊對墩噸蹲敦頓囤鈍盾遁掇哆多奪垛躲朵跺舵剁惰墮蛾峨鵝俄額訛娥惡厄扼遏鄂餓恩而兒耳爾餌洱二貳發罰筏伐乏閥法琺藩帆番翻樊礬釩繁凡煩反返範販犯飯泛坊芳方肪房防妨仿訪紡放菲非啡飛肥匪誹吠肺廢沸費芬酚吩氛分紛墳焚汾粉奮份忿憤糞豐封楓蜂峰鋒風瘋烽逢馮縫諷奉鳳佛否夫敷膚孵扶拂輻幅氟符伏俘服浮涪福袱弗甫撫輔俯釜斧脯腑府腐赴副覆賦複傅付阜父腹負富訃附婦縛咐噶嘎該改概鈣蓋溉幹甘杆柑竿肝趕感稈敢贛岡剛鋼缸肛綱崗港杠篙臯高膏羔糕搞鎬稿告哥歌擱戈鴿胳疙割革葛格蛤閣隔鉻個各給根跟耕更庚羹埂耿梗工攻功恭龔供躬公宮弓鞏汞拱貢共鈎勾溝苟狗垢構購夠辜菇咕箍估沽孤姑鼓古蠱骨谷股故顧固雇刮瓜剮寡挂褂乖拐怪棺關官冠觀管館罐慣灌貫光廣逛瑰規圭矽歸龜閨軌鬼詭癸桂櫃跪貴劊輥滾棍鍋郭國果裹過哈骸孩海氦亥害駭酣憨邯韓含涵寒函喊罕翰撼捍旱憾悍焊汗漢夯杭航壕嚎豪毫郝好耗號浩呵喝荷菏核禾和何合盒貉閡河涸赫褐鶴賀嘿黑痕很狠恨哼亨橫衡恒轟哄烘虹鴻洪宏弘紅喉侯猴吼厚候後呼乎忽瑚壺葫胡蝴狐糊湖弧虎唬護互滬戶花嘩華猾滑畫劃化話槐徊懷淮壞歡環桓還緩換患喚瘓豢煥渙宦幻荒慌黃磺蝗簧皇凰惶煌晃幌恍謊灰揮輝徽恢蛔回毀悔慧卉惠晦賄穢會燴彙諱誨繪葷昏婚魂渾混豁活夥火獲或惑霍貨禍擊圾基機畸稽積箕肌饑迹激譏雞姬績緝吉極棘輯籍集及急疾汲即嫉級擠幾脊己薊技冀季伎祭劑悸濟寄寂計記既忌際繼紀嘉枷夾佳家加莢頰賈甲鉀假稼價架駕嫁殲監堅尖箋間煎兼肩艱奸緘繭檢柬堿鹼揀撿簡儉剪減薦檻鑒踐賤見鍵箭件健艦劍餞漸濺澗建僵姜將漿江疆蔣槳獎講匠醬降蕉椒礁焦膠交郊澆驕嬌嚼攪鉸矯僥腳狡角餃繳絞剿教酵轎較叫窖揭接皆稭街階截劫節莖睛晶鯨京驚精粳經井警景頸靜境敬鏡徑痙靖竟競淨炯窘揪究糾玖韭久灸九酒廄救舊臼舅咎就疚鞠拘狙疽居駒菊局咀矩舉沮聚拒據巨具距踞鋸俱句懼炬劇捐鵑娟倦眷卷絹撅攫抉掘倔爵桔傑捷睫竭潔結解姐戒藉芥界借介疥誡屆巾筋斤金今津襟緊錦僅謹進靳晉禁近燼浸盡勁荊兢覺決訣絕均菌鈞軍君峻俊竣浚郡駿喀咖卡咯開揩楷凱慨刊堪勘坎砍看康慷糠扛抗亢炕考拷烤靠坷苛柯棵磕顆科殼咳可渴克刻客課肯啃墾懇坑吭空恐孔控摳口扣寇枯哭窟苦酷庫褲誇垮挎跨胯塊筷儈快寬款匡筐狂框礦眶曠況虧盔巋窺葵奎魁傀饋愧潰坤昆捆困括擴廓闊垃拉喇蠟臘辣啦萊來賴藍婪欄攔籃闌蘭瀾讕攬覽懶纜爛濫琅榔狼廊郎朗浪撈勞牢老佬姥酪烙澇勒樂雷鐳蕾磊累儡壘擂肋類淚棱楞冷厘梨犁黎籬狸離漓理李裏鯉禮莉荔吏栗麗厲勵礫曆利傈例俐痢立粒瀝隸力璃哩倆聯蓮連鐮廉憐漣簾斂臉鏈戀煉練糧涼梁粱良兩輛量晾亮諒撩聊僚療燎寥遼潦了撂鐐廖料列裂烈劣獵琳林磷霖臨鄰鱗淋凜賃吝拎玲菱零齡鈴伶羚淩靈陵嶺領另令溜琉榴硫餾留劉瘤流柳六龍聾嚨籠窿隆壟攏隴樓婁摟簍漏陋蘆盧顱廬爐擄鹵虜魯麓碌露路賂鹿潞祿錄陸戮驢呂鋁侶旅履屢縷慮氯律率濾綠巒攣孿灤卵亂掠略掄輪倫侖淪綸論蘿螺羅邏鑼籮騾裸落洛駱絡媽麻瑪碼螞馬罵嘛嗎埋買麥賣邁脈瞞饅蠻滿蔓曼慢漫謾芒茫盲氓忙莽貓茅錨毛矛鉚卯茂冒帽貌貿麽玫枚梅酶黴煤沒眉媒鎂每美昧寐妹媚門悶們萌蒙檬盟錳猛夢孟眯醚靡糜迷謎彌米秘覓泌蜜密冪棉眠綿冕免勉娩緬面苗描瞄藐秒渺廟妙蔑滅民抿皿敏憫閩明螟鳴銘名命謬摸摹蘑模膜磨摩魔抹末莫墨默沫漠寞陌謀牟某拇牡畝姆母墓暮幕募慕木目睦牧穆拿哪呐鈉那娜納氖乃奶耐奈南男難囊撓腦惱鬧淖呢餒內嫩能妮霓倪泥尼擬妳匿膩逆溺蔫拈年碾攆撚念娘釀鳥尿捏聶孽齧鑷鎳涅您檸獰凝甯擰濘牛扭鈕紐膿濃農弄奴努怒女暖虐瘧挪懦糯諾哦歐鷗毆藕嘔偶漚啪趴爬帕怕琶拍排牌徘湃派攀潘盤磐盼畔判叛乓龐旁耪胖抛咆刨炮袍跑泡呸胚培裴賠陪配佩沛噴盆砰抨烹澎彭蓬棚硼篷膨朋鵬捧碰坯砒霹批披劈琵毗啤脾疲皮匹痞僻屁譬篇偏片騙飄漂瓢票撇瞥拼頻貧品聘乒坪蘋萍平憑瓶評屏坡潑頗婆破魄迫粕剖撲鋪仆莆葡菩蒲埔樸圃普浦譜曝瀑期欺棲戚妻七淒漆柒沏其棋奇歧畦崎臍齊旗祈祁騎起豈乞企啓契砌器氣迄棄汽泣訖掐洽牽扡釺鉛千遷簽仟謙乾黔錢鉗前潛遣淺譴塹嵌欠歉槍嗆腔羌牆薔強搶橇鍬敲悄橋瞧喬僑巧鞘撬翹峭俏竅切茄且怯竊欽侵親秦琴勤芹擒禽寢沁青輕氫傾卿清擎晴氰情頃請慶瓊窮秋丘邱球求囚酋泅趨區蛆曲軀屈驅渠取娶齲趣去圈顴權醛泉全痊拳犬券勸缺炔瘸卻鵲榷確雀裙群然燃冉染瓤壤攘嚷讓饒擾繞惹熱壬仁人忍韌任認刃妊紉扔仍日戎茸蓉榮融熔溶容絨冗揉柔肉茹蠕儒孺如辱乳汝入褥軟阮蕊瑞銳閏潤若弱撒灑薩腮鰓塞賽三三傘散桑嗓喪搔騷掃嫂瑟色澀森僧莎砂殺刹沙紗傻啥煞篩曬珊苫杉山刪煽衫閃陝擅贍膳善汕扇繕墒傷商賞晌上尚裳梢捎稍燒芍勺韶少哨邵紹奢賒蛇舌舍赦攝射懾涉社設砷申呻伸身深娠紳神沈審嬸甚腎慎滲聲生甥牲升繩省盛剩勝聖師失獅施濕詩屍虱十石拾時什食蝕實識史矢使屎駛始式示士世柿事拭誓逝勢是嗜噬適仕侍釋飾氏市恃室視試收手首守壽授售受瘦獸蔬樞梳殊抒輸叔舒淑疏書贖孰熟薯暑曙署蜀黍鼠屬術述樹束戍豎墅庶數漱恕刷耍摔衰甩帥栓拴霜雙爽誰水睡稅吮瞬順舜說碩朔爍斯撕嘶思私司絲死肆寺嗣四伺似飼巳松聳慫頌送宋訟誦搜艘擻嗽蘇酥俗素速粟僳塑溯宿訴肅酸蒜算雖隋隨綏髓碎歲穗遂隧祟孫損筍蓑梭唆縮瑣索鎖所塌他它她塔獺撻蹋踏胎苔擡台泰酞太態汰坍攤貪癱灘壇檀痰潭譚談坦毯袒碳探歎炭湯塘搪堂棠膛唐糖倘躺淌趟燙掏濤滔縧萄桃逃淘陶討套特藤騰疼謄梯剔踢銻提題蹄啼體替嚏惕涕剃屜天添填田甜恬舔腆挑條迢眺跳貼鐵帖廳聽烴汀廷停亭庭挺艇通桐酮瞳同銅彤童桶捅筒統痛偷投頭透凸禿突圖徒途塗屠土吐兔湍團推頹腿蛻褪退吞屯臀拖托脫鴕陀馱駝橢妥拓唾挖哇蛙窪娃瓦襪歪外豌彎灣玩頑丸烷完碗挽晚皖惋宛婉萬腕汪王亡枉網往旺望忘妄威巍微危韋違桅圍唯惟爲濰維葦萎委偉僞尾緯未蔚味畏胃喂魏位渭謂尉慰衛瘟溫蚊文聞紋吻穩紊問嗡翁甕撾蝸渦窩我斡臥握沃巫嗚鎢烏汙誣屋無蕪梧吾吳毋武五捂午舞伍侮塢戊霧晤物勿務悟誤昔熙析西硒矽晰嘻吸錫犧稀息希悉膝夕惜熄烯溪汐犀檄襲席習媳喜銑洗系隙戲細瞎蝦匣霞轄暇峽俠狹下廈夏嚇掀鍁先仙鮮纖鹹賢銜舷閑涎弦嫌顯險現獻縣腺餡羨憲陷限線相廂鑲香箱襄湘鄉翔祥詳想響享項巷橡像向象蕭硝霄削哮囂銷消宵淆曉小孝校肖嘯笑效楔些歇蠍鞋協挾攜邪斜脅諧寫械卸蟹懈泄瀉謝屑薪芯鋅欣辛新忻心信釁星腥猩惺興刑型形邢行醒幸杏性姓兄凶胸匈洶雄熊休修羞朽嗅鏽秀袖繡墟戌需虛噓須徐許蓄酗敘旭序畜恤絮婿緒續軒喧宣懸旋玄選癬眩絢靴薛學穴雪血勳熏循旬詢尋馴巡殉汛訓訊遜迅壓押鴉鴨呀丫芽牙蚜崖衙涯雅啞亞訝焉咽閹煙淹鹽嚴研蜒岩延言顔閻炎沿奄掩眼衍演豔堰燕厭硯雁唁彥焰宴諺驗殃央鴦秧楊揚佯瘍羊洋陽氧仰癢養樣漾邀腰妖瑤搖堯遙窯謠姚咬舀藥要耀椰噎耶爺野冶也頁掖業葉曳腋夜液壹壹醫揖銥依伊衣頤夷遺移儀胰疑沂宜姨彜椅蟻倚已乙矣以藝抑易邑屹億役臆逸肄疫亦裔意毅憶義益溢詣議誼譯異翼翌繹茵蔭因殷音陰姻吟銀淫寅飲尹引隱印英櫻嬰鷹應纓瑩螢營熒蠅迎贏盈影穎硬映喲擁傭臃癰庸雍踴蛹詠泳湧永恿勇用幽優悠憂尤由郵鈾猶油遊酉有友右佑釉誘又幼迂淤于盂榆虞愚輿余俞逾魚愉渝漁隅予娛雨與嶼禹宇語羽玉域芋郁籲遇喻峪禦愈欲獄育譽浴寓裕預豫馭鴛淵冤元垣袁原援轅園員圓猿源緣遠苑願怨院曰約越躍鑰嶽粵月悅閱耘雲鄖勻隕允運蘊醞暈韻孕匝砸雜栽哉災宰載再在咱攢暫贊贓髒葬遭糟鑿藻棗早澡蚤躁噪造皂竈燥責擇則澤賊怎增憎曾贈紮喳渣劄軋鍘閘眨柵榨咋乍炸詐摘齋宅窄債寨瞻氈詹粘沾盞斬輾嶄展蘸棧占戰站湛綻樟章彰漳張掌漲杖丈帳賬仗脹瘴障招昭找沼趙照罩兆肇召遮折哲蟄轍者鍺蔗這浙珍斟真甄砧臻貞針偵枕疹診震振鎮陣蒸掙睜征猙爭怔整拯正政幀症鄭證芝枝支吱蜘知肢脂汁之織職直植殖執值侄址指止趾只旨紙志摯擲至致置幟峙制智秩稚質炙痔滯治窒中盅忠鍾衷終種腫重仲衆舟周州洲謅粥軸肘帚咒皺宙晝驟珠株蛛朱豬諸誅逐竹燭煮拄矚囑主著柱助蛀貯鑄築住注祝駐抓爪拽專磚轉撰賺篆樁莊裝妝撞壯狀椎錐追贅墜綴諄准捉拙卓桌琢茁酌啄著灼濁茲咨資姿滋淄孜紫仔籽滓子自漬字鬃棕蹤宗綜總縱鄒走奏揍租足卒族祖詛阻組鑽纂嘴醉最罪尊遵昨左佐柞做作坐座';
            },
            charhx: function () {
                return '娿婀埃挨餀呃哀皑癌蔼婑銰碍嬡隘鞍氨鮟唵洝暗岸胺案肮昻盎凹獓熬翱仸謸奧襖奧妑捌朳朳妑笆仈疤妑菝柭靶妑耙坝覇罢妑皛柏咟擺佰敗湃稗癍癍搬扳瘢頒闆蝂汾絆柈瓣柈刅绊綁幇梆徬嫎垹蜯嫎蚌镑徬谤苞菢笣褒剝薄雹湺堡怉寶砲蕔懪豹鲍嚗柸碑蕜萆苝輩揹赑钡俻狈備惫焙被渀苯夲苯镚绷甭泵嘣逬腷嬶仳啚毣彼碧蓖幣滭斃毖币庇痹閉獙弊怭澼壁臂鐴陛鞭笾揙貶碥楩變卞辧辮辮猵摽滮鏢錶鳖憋莂癟彬斌濒璸濱摈娦栤窉眪秉饼炳疒並箥菠譒妭钵菠博勃搏铂箔伯帛舶脖膊渤泊訤峬卜誧卟埠芣鈽荹簿蔀怖攃猜裁財財財棌棌采埰婇蔡爘傪蛬殘慙參灿芲舱仺獊蔵懆鐰槽蓸愺厠憡側冊恻層竲揷紁茬嗏楂楂搽镲岔槎诧拆枈豺搀傪蝉镵谗瀍铲浐闡顫誯猖畼甞瑺萇偿肠廠敞畅晿倡趫莏鈔謿謿謿漅訬炒車扯徹掣沏瞮郴烥宸尘曟忱冗陳趁衬撐稱峸橙荿珵塖珵懲僜諴承浧骋秤阣痴歭匙肔呎肔肔恥歯侈呎哧趐斥炽茺沖蟲漴寵菗絒帱帱婤僽薵仇皗瞅忸溴初炪廚廚躇鋤雛蒢篨椘绌储矗搐触處遄巛瑏椽伝船遄賗疮囱幢床闖創欥炊腄腄箠舂椿錞脣錞蒓蠢戥焯疵垐濨雌辭濨瓷詞泚剌賜佽聪茐囱茐苁苁凑粗齰簇娖蹿篡窜凗慛慛脆瘁濢濢濢籿洊籿磋撮髊措挫措溚垯荅瘩咑汏槑歹傣瀻帶殆笩贷袋待曃怠耽泹冄啴郸掸狚狚氮泹惮惔诞弹疍當澢黨蕩澢叨搗稲箌島祷导菿稲悼檤盜徳嘚哋簦燈憕等簦凳郰諟彽嘀廸敵廸狄涤翟嫡抵疧哋渧苐渧弚递缔颠掂滇碘點敟靛垫電佃甸扂惦奠淀殿淍汈鵰蜩刁鋽铞銱蜩瓞嗲渫渫迭媟疉玎饤汀町嵿鼎锭萣忊丟崬笗蓳慬憅崬侗恫岽狪兠鬦乧跿荳浢哣嘟督毐渎獨渎陼睹帾荰镀肚喥喥妒鍴短葮葮斷葮碓兌隊怼墩沌壿敦頓囤沌盾遁掇哆哆奪垛躱朶跺舵剁媠憜睋睋鹅皒额讹皒悪苊扼遏鄂皒慁洏ル洱尒聶洱②贰潑藅筏浌疺阀琺珐藩汎畨飜樊矾钒瀿汎煩反返笵贩氾粄疺汸淓汸肪房汸妨汸汸汸倣婔悱啡飛萉厞诽吠腓廢沸曊棼酚玢氛汾妢墳焚汾帉奮妢忿濆粪仹崶猦蜂峯峯颩瘋烽漨溤漨讽唪鳯仏娝玞敷膚孵荴拂辐諨氟苻茯俘棴捊涪湢袱弗甫抚辅椨釜釡脯腑椨腐赴諨覆賦復傅苻阜父腹萯冨讣胕妇缚咐噶嗄姟妀漑鈣葢漑迀苷杆柑芉肝迀憾秆噉赣罓碙鋼矼釭罁罓港釭禞皋滈膏餻溔鎬鎬鎬哠滒戨擱戈鸽胳疙剨愅噶咯蛤阁隔铬個茖给艮茛畊浭菮羹埂耿梗笁糼糼塨龚栱匑厷営弖巩汞珙貢珙溝芶芶苟豞垢媾媾夠辜菇咕箍诂钴箛菇鼔咕蛊嗗唂骰诂顧凅雇剮呱剮寡啩啩乖枴怪菅関菅蒄觀涫菅潅遦潅遦洸広迋瑰規圭硅歸亀閨匦媿詭癸蓕匱蛫貴刽辊蔉輥煱漷國淉裹過铪骸陔嗨氦亥嗐骇酣憨邯韓浛凾寒凾諴癷翰撼捍猂憾悍猂汙漢夯忼航壕嚎濠毫郝恏秏呺滘哬曷嗬菏劾秝啝哬匼盉貉阂菏涸赫褐鹤哿潶嫼痕佷哏悢涥悙橫蘅恆轟晎烘渱鴻葓宖宖葒糇糇糇犼厚糇後苸苸唿瑚壺煳箶箶狐煳煳弧唬唬戶沍戶戶埖蕐澕磆磆畵劃囮話槐佪懷准壞歡寰桓還緩換漶喚痪豢焕涣宦抝巟巟曂磺蝗簧瑝瑝瑝瑝愰縨恍巟洃媈媈幑恢蛔冋毇珻慧卉惠珻贿秽浍烩匯讳诲浍荤涽殙魂渾婫豁萿钬焱镬戓惑靃貨禍击圾樭僟畸稽積箕肌饥迹噭讥鶏姬绩缉咭极棘辑籍潗彶喼疾汲旣嫉级哜凢脊己蓟技冀悸伎祭剂悸哜寄寂計汜旣忌漈继汜嘉枷夾佳傢咖荚颊贾曱钾徦糘價泇駕糘姧盬堅尖笺簡煎凲肩艰奷缄茧撿柬碱硷拣撿彅倹彅諴薦槛鉴践濺見楗箭件揵舰劍饯渐溅涧踺壃葁將槳茳彊蔣桨奨講匠醬夅蕉椒礁潐烄茭郊浇嬌嬌嚼搅铰矫侥腳烄角饺儌烄剿嘋酵轿珓嘂窖揭帹湝秸街阶截劫兯莖聙瞐鯨倞驚棈粳經丼檠憬頸靜璄擏傹徑痉靖獍競凈泂僒啾究糾玖韭玖灸勼氿厩慦舊臼舅咎僦咎鞠佝狙疽劇驹匊挶咀怇舉沮藂岠琚姖倶岠踞涺倶呴惧岠涺涓鵑涓惓眷捲涓瘚攫決崛崛嚼桔傑啑睫竭洁結解姐悈藉芥鎅徣夰疥诫屆凧荕釿唫妗珒噤緊婂僅殣琎靳晉噤菦烬锓浕勁荊兢覺吷吷蕝汮箘呁軍焄浚浚浚浚郡浚喀咖鉲咯閞揩揩剀慨刋堪勘坎歃看嫝嵻嵻摃忼囥忼栲洘栲靠坷岢柯錁溘錁萪涜嗑妸渇尅尅愙錁肻肻恳垦妔妔涳恐芤啌摳囗釦簆喖哭崫楛酷厙褲洿垮挎跨胯赽筷侩赽寬窾匡筺誑框纩洭纩況扝盔岿窺葵喹魁傀潰隗潰堒崐涃涃葀拡霩闊柆菈喇臘臘辣菈莱唻攋藍漤孄拦藍阑蘭瀾谰灠灠攋灠灡嚂哴蓈哴蓢蓢蓢烺崂崂窂荖佬粩絡絡崂嘞泺檑檑檑藞蔂儡垒檑叻類汨棱楞唥厘悡犁黎篱狸蓠漓理李里鲤礼莉荔吏栗婯疠励砾呖悡傈唎俐痢竝粒沥隶劦璃哩唡聅嗹涟镰廉憐涟帘潋臉嗹戀煉煉悢涼樑粱悢倆唡糧涼煷涼嫽窷獠療獠寥辽潦孒撂镣漻料烮煭烮挘獵啉啉潾霖臨鄰潾啉凛賃悋柃玪夌蕶齡玪伶玪夌靈夌玪領叧泠媹琉媹硫馏畱嚠媹蓅栁陸瀧聾茏茏窿湰泷泷茏溇溇嵝溇屚陋廬盧颅廬爐掳卤虏噜麓碌蕗蕗赂蔍潞禄淥陸戮馿焒焒佀膂履屢缕慮氯侓卛慮淥欒孌孿滦卵亂稤畧囵囵囵仑囵纶囵囉螺囉羅囉儸骡裸落詻詻絡媽嫲犸犸犸骉罵嫲嬤埋荬麥賣邁霡慲獌蠻慲嫚嫚嫚嫚谩笀汒吂氓杧漭貓罞锚毝罞铆茆茂萺萺邈貿庅坆枚烸酶苺湈莈葿媒镁烸羙昧寐妺媚閄悶們萠懞檬擝锰掹夢掹侎醚靡糜洣洣弥洣秘觅泌滵滵幂婂眠婂冕凂勉娩缅媔媌媌媌邈仯緲庿仯篾搣姄抿皿勄悯閩眀螟嘄佲洺掵繆嗼摹嚤嗼嗼嚤嚤嚤沬沬嗼嚜默沬嗼寞帞湈哞湈拇牡畝姆毋募暮募募慕朩朩睦牧穆嗱哪妠妠哪哪妠氖釢艿恧柰遖莮難灢撓悩悩閙淖迡浽禸嫰能妮霓淣狔胒抳沵嫟膩屰溺蔫秥姩碾撵捻淰娘酿茑杘涅嗫糵啮嗫镍涅您柠狞凝苧拧泞犇沑妞狃哝哝哝挵伮怓伮囡煖疟疟挪穤穤喏呃瓯瓯瓯耦嘔耦沤啪汃瓟啪啪琶啪棑簰棑湃哌襻瀋盤磐昐溿叛判乓厐臱耪眫拋垉铇垉垉垉垉怌胚掊裴婄婄蓜姵沛濆湓泙抨烹澎憉莑堋硼篷膨萠鵬唪湴坯砒噼纰怶噼琵毗啤裨疲怶苉痞僻庇譬萹媥爿騙彯慓瓢嘌潎潎拚頻貧闆娉乒岼泙泙岼憑甁评屛岥秡櫇嘙岥魄廹粕剖圤舗圤莆匍箁蒲逋圤圃普浦鐠曝鑤剘剘栖嘁悽⑦凄漆柒沏娸諆渏忮畦崎脐斉旗祈祁騏起豈阣佱晵契砌噐氣迄棄汽淇讫拤洽撁扦钎鉛芉迁簽仟嗛墘黔錢钳湔濳遣淺谴堑嵌芡嗛熗濸腔羌嫱嫱強熗橇锹毃佾喬趭喬喬巧鞘毳趬峭佾竅苆苆苴愜苆钦埐儭蓁噖懄芹檎噙寑沁圊輕氢傾卿凊擎啨氰凊頃埥庆琼窮偢坵邱浗浗囚媨泅趋岖蛆浀軀屈駆渠掫婜龋趣厾圜颧權醛葲洤痊拳吠券勧蒛炔瘸卻鹊榷確雀峮羣嘫嘫姌媣瓤壤攘孃讓隢擾隢惹慹壬芢亾涊韧姙認刄妊纫扔仍ㄖ戎茸嫆荣瀜嫆嫆嫆絨冗渘渘禸筎蠕濡孺洳媷乳肗叺褥軟朊惢瑞銳潤潤婼弜潵灑蕯腮鳃噻噻彡叁傘潵鎟鎟喪搔騒掃溲瑟脃澀潹僧莏唦摋閷乷纱傻倽繺篩曬姍苫杉屾剼煽釤閁陝擅赡膳僐訕傓缮墒傷啇賞晌仩尙裳哨哨哨燒芍汋韶仯哨卲袑奢赊虵舙舎赦摂射慑渉涻蔎砷妽呻訷裑堔娠訷鉮瀋谉嬸卙腎慎椮殸泩甥狌圱繩渻墭乗夝聖溮妷浉湤濕詩迉虱拾坧湁溡什喰蚀實識史矢使屍馶始鉽沶仕迣枾倳拭誓迣勢湜嗜噬适仕侍释飾氏巿恃厔視鉽荍掱渞垨壽涭售辤痩獣蔬枢梳姝杼瀭埱忬蔋疏書赎孰孰薯濐曙署蜀黍癙屬朮沭樹娕戍竪墅庶薮漱恕唰耍摔缞甩帥拴拴灀叒摤誰渁腄挩吮橓順橓説碩朔爍凘凘凘偲俬呞噝屍肆峙嗣④伺姒饲巳菘聳怂頌鎹浨讼誦溲艘擞嗽蘇酥俗嫊趚粟僳愬溯蹜訴歗酸祘匴虽陏隨浽髓誶嵗穗嬘隧祟孫損笋蓑逡逡縮鎖鎍鎻葰禢彵咜咜嗒獭挞蹋沓胎苔孡珆溙酞忲忲呔坍摊貪瘫滩墵檀痰憛谭談钽毯袒湠探嘆湠饧溏搪漟橖膛瑭溏倘躺淌趟烫匋濤瑫绦匋洮洮匋匋討套特駦駦庝誊珶剔踢锑諟趧渧渧軆櫕嚏惕珶珶屟兲婖瑱甶甛恬婖睓狣條迢眺朓萜鉄萜廰厛烃汀侹渟渟侹侹艇嗵秱酮瞳哃恫浵僮硧硧茼統痌偸投頭透凸禿湥圖徙蒤凃廜汢汢兎湍團蓷颓蹆蜕蹆蹆昋屯臀柂仛脫袉拕駞袉椭鋖沰唾挖哇蛙哇哇咓襪歪迯豌塆塆琓顽汍烷唍涴梚脕皖惋宛啘萭腕忹迋匄忹蛧暀忹朢莣妄媙蘶嶶佹韦違桅圍惟惟潙潍惟苇崣逶偉沩屗纬沬墛菋嵔媦嵔蘶莅渭媦墛墛衞瘟溫螡妏聞鈫沕穏紊問滃暡瓮挝窩煱窉莪斡臥楃沃莁嗚钨烏汚莁偓嘸蕪梧圄呉毋娬伍圄吘橆⑤侮坞戊霚晤粅匢務圄誤厝凞唽覀硒矽晰嘻扱唶犠浠息唏悉膝汐厝熄烯渓汐犀檄袭席習媳禧铣冼係隙戱細磍虾匣葭轄叚浹浹浹芐厦嗄圷锨锨姺佡鮮汘咸賢銜舷娴涎妶溓显険哯獻縣腺陥羨宪陥限線楿厢镶萫葙襄湘芗翔祥詳想姠啍頙巷潒潒姠潒簘硝霄萷涍嚣销消宵淆哓尒涍校肖啸笑效楔些歇蝎嚡拹挾携峫斜脅喈冩悈啣蟹澥绁瀉塮屑蕲芯锌俽厗噺忻杺信衅暒睲睲瑆興鉶侀形郉垳瑆圉莕悻狌兇兇洶匈汹雄熋咻俢饈朽溴琇莠袖绣歔戌濡歔歔湏俆汻蓄酗溆旮垿畜恤絮胥緒續蓒媗媗悬嫙玆選癣妶絢靴薛敩泬膤洫勛熏揗洵咰浔紃廵咰卂訓卂遜卂壓呷鴉鴨吖吖厊厊蚜崖衙涯蕥啞亞冴漹咽阉煙殗鹽嚴妍蜒啱娫訁顔閻烾沿奄殗眼衍湮滟堰嬿厭砚雁唁彦熖匽谚験殃姎鴦秧昜婸佯疡咩樣陽氧卬癢養樣羕撽崾岆愮愮尧滛窰愮烑吆舀葯婹耀倻噎倻爺嘢冶竾頁掖鄴旪曳腋液液①壹悘揖铱畩吚扆颐夷遗簃儀胰寲沂宜侇彝掎蚁掎巳乁矣姒兿抑昜邑屹億役臆逸肄疫洂裔嬑藙忆義谥溢诣议谊譯異翼翌绎筃荫洇殷堷隂絪荶檭婬夤飮吚吲陻茚渶璎璎鹰應缨瑩萤營荧蝇迊赢盁影颕哽眏喲砽砽臃痈滽澭踊蛹怺怺悀怺恿湧鼡豳沋滺沋尤甴邮铀沋怞遊酉洧伖祐祐釉诱叒孧扜菸纡盂榆虞愚舆悇揄揄渔揄揄渔隅予娯雨玙屿禹荢娪羽砡域芋喐吁喁喻峪御匬慾獄唷謍浴寓裕預豫驭鴛棩寃沅垣媴厡瑗辕圎園園猿羱緣逺夗蒝葾阮曰箹樾跞钥捳粵仴哾閱秐囩郧枃殒狁運藴酝暈韻夃匝咂卆酨酨災宰酨侢茬洎瓒暫瓒賍賍髒蹧蹧凿藻栆皁璪蚤璪璪慥唣灶璪嫧萚荝澤賊怎熷璔嶒熷紥喳碴札轧铡閘喳栅搾咋咋怍怍擿斋宅搾債寨瞻毡詹秥跕盏斬辗崭蹍蘸棧颭戰跕偡綻樟嶂彰漳張礃涨粀扙賬账扙胀瘴障妱昭找沼趙燳罩狣肇佋嗻菥悊蛰辙鍺锗蔗適淅沴斟嫃甄砧臻浈針浈忱疹沴震桭鎮俥篜諍諍姃狰踭姃整拯囸炡帧症鄭姃芷汥伎汥倁倁汥脂汥と枳轵矗淔殖秇惪侄歮栺圵趾呮旨衹梽挚掷臸臸置帜峙淛潪秩雉質炙痔滞菭窒狆盅筗妕衷蔠種妕偅仲衆洀淍詶詶诌粥轴肘帚咒皺宙昼骤咮株咮咮蕏渚诛豩艸烛煑拄瞩瞩炷著炷莇蛀贮铸茿炷炷柷驻抓爪跩抟磚啭撰賺篆桩圧裝妝獞匨匨椎锥搥赘墜綴谆痽浞炪婥棹琢茁酌啄着灼浊兹恣粢恣稵淄孜橴仔籽滓ふ洎渍牸鬃琮琮崈琮縂枞邹趉楱楱蒩娖卒蔟袓蒩蒩蒩鑽纂觜酔朂嶵澊噂葃咗佐柞莋莋唑蓙';
            }
        },
        wordcounter: {
            wordStats: {
                unsortedWords: null,
                topWords: null,
                topWeights: null,
                _computed: false,
                addWords: function (str, weight) {
                    if (str && str.length > 1) {
                        var keywords = $("#keywordstxt").val().split(',');
                        var regstr = "";
                        //keywords = this.bubbleSort(keywords);
                        keywords = keywords.trimArray();
                        for (var i = 0; i < keywords.length; i++) {
                            var kw = keywords[i].replace(/(\\)/g, "\\").replace(/(\^)/g, "\\^").replace(/(\$)/g, "\\$").replace(/(\.)/g, "\\.").replace(/(\*)/g, "\\*").replace(/(\?)/g, "\\?").replace(/(\+)/g, "\\+");
                            if (kw) {
                                regstr += "(" + kw + ")";
                                if (i < keywords.length - 1)
                                    regstr += "|";
                            }
                        }
                        if (regstr)
                            try {
                                this.getWords(str.toLowerCase(), new RegExp(regstr, "gi"), weight);
                            } catch (e) {

                            }
                    }
                },
                bubbleSort: function (arr) {
                    for (var i = 0; i < arr.length; i++) {
                        for (var j = i; j < arr.length; j++) {
                            if (arr[i].length < arr[j].length) {
                                var temp = arr[i];
                                arr[i] = arr[j];
                                arr[j] = temp;
                            }
                        }
                    }
                    return arr;
                },
                addWordsFromTextNodes: function (node, weight) {
                    var nodes = node.childNodes;
                    for (var i = 0, j = nodes.length; i < j; i++) {
                        if (nodes[i].nodeType == 3)
                            this.addWords(nodes[i].nodeValue, weight);
                    }
                },
                getWords: function (words, reg, weight) {
                    this.unsortedWords = new Array();
                    var arr = words.match(reg);
                    if (arr == null) return;
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i] != ',') {
                            var word = arr[i].toLowerCase();
                            if (this.unsortedWords[word])
                                this.unsortedWords[word] += weight;
                            else this.unsortedWords[word] = weight;
                        }
                    }
                },
                computeWords: function (elem) {
                    if (!elem) elem = window.document;
                    this.unsortedWords = new Array();
                    if (elem.is("textarea")) {
                        this.addWords(elem.val(), 1);
                        return;
                    }
                    this.addWords($('title', elem).text(), 20); wordstats = this; $('h1', elem).each(function () {
                        wordstats.addWordsFromTextNodes($(this).get(0), 15);
                    }); $('h2', elem).each(function () {
                        wordstats.addWordsFromTextNodes($(this).get(0), 10);
                    }); $('h3, h4, h5, h6', elem).each(function () {
                        wordstats.addWordsFromTextNodes($(this).get(0), 5);
                    }); $('strong, b, em, i', elem).each(function () {
                        wordstats.addWordsFromTextNodes($(this).get(0), 3);
                    }); $('p, div, th, td, li, a, span', elem).each(function () {
                        wordstats.addWordsFromTextNodes($(this).get(0), 2);
                    }); $('img', elem).each(function () {
                        wordstats.addWords($(this).attr('alt'), 1);
                        wordstats.addWords($(this).attr('title'), 1);
                    }); this._computed = true;
                },
                computeTopWords: function (count, elem) {
                    if (!this._computed)
                        this.computeWords(elem);
                    this.topWords = new Array();
                    this.topWeights = new Array();
                    this.topWeights.push(0);
                    for (word in this.unsortedWords) {
                        for (var i = 0; i < count; i++) {
                            if (this.unsortedWords[word] > this.topWeights[i]) {
                                this.topWeights.splice(i, 0, this.unsortedWords[word]);
                                this.topWords.splice(i, 0, word);
                                break;
                            }
                        }
                    }
                }, clear: function () {
                    this.unsortedWords = this.sortedWords = this.topWords = this.topWeights = null;
                    this._computed = false;
                }
            },
            displayCount: function (count) {
                if (count['words'] == 1) {
                    wordOrWords = " Word";
                } else {
                    wordOrWords = " Words";
                }
                if (count['chars'] == 1) {
                    charOrChars = " Character";
                } else {
                    charOrChars = " Characters";
                }
                str = '<strong class="col-blue02 pr10">{5}</strong><span class="pr40">Total</span><strong class="col-blue02 pr10">{0}</strong><span class="pr40">{1}</span><strong class="col-blue02 pr10">{2}</strong><span class="pr40">{3}</span><strong class="col-blue02 pr10">{4}</strong><span>Chinese</span>';
                $(".counted").html(str.format(count['words'], wordOrWords, count['chars'], charOrChars, count['chinese'], $("#box").val().length));
            },
            displayTextBoxes: function (count) {
                $("#word_count").text(count['words']);
                $("#character_count").text(count['chars']);
                $("#character_count_no_spaces").text(count['chars_no_spaces']);
                $("#chinese_count_no_spaces").text(count['chinese']);
                $("#sentence_count").text(count['sentences']);
                $("#paragraph_count").text(count['paragraphs']);
                $("#avg_sentence_words").text(count['avg_sentence_words']);
                $("#avg_sentence_chars").text(count['avg_sentence_chars']);
            },
            countWords: function (text, language) {
                if (language == 2) {
                    var words = text.match(/\S+/g);
                } else {
                    var words = text.replace(/[,;.!:—\/]/g, ' ').replace(/[^a-zA-Z\d\s&:]/g, '').match(/\S+/g);
                }
                return (words !== null ? words.length : 0);
            },
            countChinese: function (text) {
                iTotal = 0;
                for (i = 0; i < text.length; i++) {
                    var c = text.charAt(i);
                    if (c.match(/[\u4e00-\u9fa5]/)) {
                        iTotal++;
                    }
                }
                return iTotal;
            },
            wordCountInternational: function () {
                var _this = tools.other.wordcounter;
                var box = $("#box");
                var count = [];
                count['words'] = _this.countWords(box.val(), 0);
                chars = box.val().match(/(?:[^\r\n]|\r(?!\n))/g);
                count['chars'] = (chars !== null ? chars.length : 0);
                count['chinese'] = _this.countChinese(box.val());
                chars_no_spaces = box.val().match(/\S/g);
                count['chars_no_spaces'] = (chars_no_spaces !== null ? chars_no_spaces.length : 0);
                sentences = box.val().match(/[^.!?\s][^.!?]*(?:[.!?](?!['"]?\s|$)[^.!?]*)*[.!?]?['"]?(?=\s|$)/g);
                count['sentences'] = (sentences !== null ? sentences.length : 0);
                paragraphs = box.val().match(/(\n\n?|^).*?(?=\n\n?|$)/g);
                count['paragraphs'] = (box.val() != '' ? (paragraphs !== null ? paragraphs.length : 0) : 0);
                count['avg_sentence_words'] = (box.val() != '' ? Math.ceil(count['words'] / count['sentences']) : 0);
                count['avg_sentence_chars'] = (box.val() != '' ? Math.ceil(count['chars'] / count['sentences']) : 0);
                _this.displayCount(count);
                _this.displayTextBoxes(count);
            },
            keywordDensity: function () {
                var max = 1000;
                var stats = textCode.wordcounter.wordStats;
                var _this = textCode.wordcounter;
                stats.computeTopWords(max, $('#box'));
                var density_list = $("#density_list");
                density_list.empty();
                var text = '';
                var percentage;
                $("#keywords li:first").nextAll().remove();
                for (i = 0; i < stats.topWords.length; i++) {
                    var percentage = (100 * (stats.topWeights[i] * stats.topWords[i].length / $("#box").val().length)).toFixed(0);
                    var str = '<div class="w30-0{3}">{0}</div><div class="w15-0 col-blue02">{1}({2}%)</div>';
                    if (i % 2 == 0) {
                        str = '<li class="DelListCent DelRLlist bor-b1s">' + str + '</li>';
                        $("#keywords").append(str.format(stats.topWords[i].html2Escape(), stats.topWeights[i], percentage, ''));
                    } else {
                        $("#keywords li:last").append(str.format(stats.topWords[i].html2Escape(), stats.topWeights[i], percentage, ' bor-l1s'));
                    }
                }
                stats.clear();
            },
            init: function () {
                var _this = this;
                $("#box").bind("keypress keyup keydown blur focus change load", _this.wordCountInternational);
                $("#box").bind("keypress keyup keydown blur focus change load", _this.keywordDensity);
                tools.clearBtn('clear','box');
                $("#keywordstxt").bind("keypress keyup keydown blur focus change load", _this.keywordDensity);
                $("#clkshowbox").click(function () {
                    var showbox = $("#showbox");
                    if (showbox.hasClass("autohide"))
                        showbox.removeClass("autohide");
                    else
                        showbox.addClass("autohide");
                });
                tools.clearBtn('clear','textarea');
            }
        },
        fullhalf: {
            ///全角空格为12288，半角空格为32
            ///其他字符半角(33-126)与全角(65281-65374)的对应关系是：均相差65248
            //半角转换为全角函数
            ToFull: function () {
                var txtstring = $('#content').val();
                if (txtstring == '') {
                    layer.msg("请输入要转换的字符串",{ offset: '50%' });
                    return;
                }
                var tmp = "";
                for (var i = 0; i < txtstring.length; i++) {
                    if (txtstring.charCodeAt(i) == 32) {
                        tmp = tmp + String.fromCharCode(12288);
                    }
                    else if (txtstring.charCodeAt(i) < 127) {
                        tmp = tmp + String.fromCharCode(txtstring.charCodeAt(i) + 65248);
                    }
                    else
                        tmp = tmp + String.fromCharCode(txtstring.charCodeAt(i));
                }
                $('#result').val(tmp);
            },
            //全角转换为半角函数
            ToHalf: function () {
                var str = $('#content').val();
                if (str == '') {
                    layer.msg('请输入要转换的字符',{ offset: '50%' });
                    return;
                }
                var tmp = "";
                for (var i = 0; i < str.length; i++) {
                    if (str.charCodeAt(i) > 65280 && str.charCodeAt(i) < 65375) {
                        tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
                    }
                    else if (str.charCodeAt(i) == 12288) {
                        tmp += String.fromCharCode(32);
                    }
                    else {
                        tmp += String.fromCharCode(str.charCodeAt(i));
                    }
                }
                $('#result').val(tmp);

            },
            init: function () {
                var _this = this;
                $("#tohalf").click(function () {
                    _this.ToHalf();
                    if ($("#result").val()) $("#result").siblings().hide();
                });
                $("#tofull").click(function () {
                    _this.ToFull();
                    if ($("#result").val()) $("#result").siblings().hide();
                });
                $("textarea").keydown(function () {
                    $(this).removeClass("col-gray");
                });
                tools.clearBtn('clear','textarea')
            }
        },
        // 微信编辑器 需要后端暂时无法处理
        weChatEdit: {
            editOpt: function() {
                if (sys.ie <= 8) {
                    $("#colorlist").after("<div class=\"fl col-red lh40\">为了保证浏览效果，请使用IE8以上的浏览器</div>");
                }
                var g = {
                    jsonPath: $json,
                    listbox: $("#listbox"),
                    _type: ''
                };
                $("#listTab li").click(function () {
                    $("#listTab li").removeClass("curt");
                    $(this).addClass("curt");
                    g._type = $(this).attr("t");
                    $("#listbox .item").hide();
                    textCode.weChatEdit.setTempHtml(g._type);
                    $("[id^='" + g._type + "']").show();
                });
                $("li.bgcrev").click(function () {
                    textCode.weChatEdit.setTempHtml(g._type);
                });
                $("li.coloritem").click(function () {
                    textCode.weChatEdit.setTempColor($(this).attr("color"))
                });
                $("#cleartemp").click(function () {
                    UE.getEditor('editor').execCommand('cleardoc');
                });
                textCode.weChatEdit.setTempHtml($("#listTab li:first").attr("t"));
                //加载调色板
                new QrColorPicker({
                    isShowColorName: false,
                    defaultHtml: "<strong id=\"$pickerId#color\" style=\"width:40px; font-size:12px; line-height:initial;\">更多</strong>",
                    selectColorBackall: function (color) {
                        textCode.weChatEdit.setTempColor(color);
                    },
                    inputKeyupBackall: function (color) {
                        textCode.weChatEdit.setTempColor(color);
                    }
                });

                //配置编辑器
                var UEC = UEDITOR_CONFIG;
                //重新配置提示项
                UEC.toolbars = [[
                    'source', '|',
                    'undo', 'redo', '|',
                    'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', '|',
                    'fontfamily', 'fontsize', 'forecolor', 'backcolor', '|',
                    'insertorderedlist', 'insertunorderedlist', 'selectall', '|',
                    'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                    'link', 'unlink', 'anchor', '|',
                    'insertimage', 'emotion', 'scrawl', 'attachment', 'map', 'template', 'background'
                ]];
                UEC.serverUrl = '/template/default/js/ueditor/library/controller.ashx';
                UEC.elementPathEnabled = false;
                UEC.wordCount = false;
                UEC.autoHeightEnabled = false;

                UE.getEditor('editor', {
                    allowDivTransToP: false//防止div生成p
                });
                $(".btnPhonejs").click(function () {
                    var html = UE.getEditor('editor').getContent();
                    if(html){
                        html = '<div class="fotwrap"><span class="pr10">2016-01-01</span><a href="javascript:" class="bz">站长工具</a></div>'+html+'<div class="fotwrap"><span class="pr5">阅读</span><span>999</span><span class="flow pl10"><em></em><span class="num pl5">58</span></span><a class="ts fr">投诉</a></div>'
                    }
                    $("#mobileview").html(html);
                    $(".ChatPhonewrp").show();
                    new Picture().scroll({ container: $(".right_content")[1], target: $(".right_part")[1], gap: $(".right_part")[1].style.height });
                });
                $(".Cprev-closed,.ChatPhonebg").click(function () {
                    $(".ChatPhonewrp").hide();
                });
            },
            getTypelist: function () {
                var typelist = [];
                for (var item in g.jsonPath) {
                    typelist.push(item);
                }
                return typelist;
            },
            setTempHtml: function(_type) {
                if (!_type) return;
                //g.listbox.html("");
                var list = g.jsonPath[_type];
                var cnt = 0;
                for (var i = 0; i < list.length; i++) {
                    var item = list[i];
                    //如果存在改id的容器 则不经过ajax加载
                    if ($("#" + item.id).length) {
                        $("[id^='" + _type + "']").show();
                        new Picture().scroll({ container: $(".right_content")[0], target: $(".right_part")[0], gap: $(".right_part")[0].style.height });
                        break;
                    }
                    g.listbox.append('<div id="' + item.id + '" class="item"></div>');
                    $("#" + item.id).load(item.path + "?v=" + new Date().format("yyyyMMddhhss"), function () {
                        if (cnt == list.length - 1)
                            new Picture().scroll({ container: $(".right_content")[0], target: $(".right_part")[0], gap: $(".right_part")[0].style.height });
                        cnt++;
                    });
                }
                g.listbox.find(".item").off("click");
                g.listbox.find(".item").click(function () {
                    UE.getEditor('editor').execCommand('insertHtml', $(this).html());
                });
            },
            setTempColor: function(color) {
                //g.listbox.find(".bgc").css("backgroundColor", color);
                var list = g.listbox.find(".bgc");
                for (var i = 0; i < list.length; i++) {
                    try {
                        var bgcrgba = $(list[i]).css("backgroundColor").split(',')
                        if (bgcrgba.toString().indexOf("rgba") >= 0) {
                            var opacity = bgcrgba[bgcrgba.length - 1].replace(")", "");
                            $(list[i]).css("opacity", opacity)
                        }
                    } finally {
                        $(list[i]).css("backgroundColor", color);
                    }
                }
                g.listbox.find(".fc").css("color", color);
                g.listbox.find(".bc").css("borderColor", color);
                g.listbox.find(".btc").css("borderTopColor", color);
                g.listbox.find(".brc").css("borderRightColor", color);
                g.listbox.find(".bbc").css("borderBottomColor", color);
                g.listbox.find(".blc").css("borderLeftColor", color);
            }
        }
    },
    // 辅助工具->配色相关
    palette: {
        //中日传统色彩/网页常用色彩
        colorCJ: function () {
            tools.addClipScript()
            $("[js-do=\"corTong\"] a").on("click", function () {
                $(this).addClass("CorCurrt").siblings("a").removeClass("CorCurrt");
                var id = $(this).attr("id");
                $(".ItemMain").hide();
                $("#" + id + "color").show();
            })
            $('.container ul li,.CorConList .boxc').each(function (index) {
                var id = $(this).attr('id')
                if(id == undefined) {
                    $(this).attr("id","btn" + index)
                    var id = $(this).attr('id')
                }
                var text = $(this).find("span").text()
                $(this).attr("data-clipboard-text",text)
                $(this).click(function(){
                    try {
                        new ClipboardJS('#' + id);
                        layer.msg("复制成功");
                    } catch (ex) {
                        layer.msg("复制失败");
                    }
                })
            })
        },
        //网页颜色选择器
        pageColor: function() {
            $("#tab td input[name]").click(function () {
                var bg = $(this).parent().next().next().next().text();
                $("body").css('backgroundColor', bg);
            })
            $("#tab td[bgcolor]").click(function () {
                $("body").css('backgroundColor', $(this).attr("bgcolor"));
                $(this).prev().prev().prev().prev().find("input").prop("checked", "checked");
            });
        },
        // WEB安全色
        colorWeb: function() {
            $(".SafeCorCent-down li a").click(function () {
                var selected = $(this).attr("val");
                $(this).parent().css({"background":"#4192E7","border-radius":"3px","color":"#ffffff"}).siblings().css("background", "none");
                $(this).parent().addClass("checked").siblings('li').removeClass("checked")
                $(".swatches").hide();
                $('#' + selected).show();
            });
        },
        // 颜色代码查询、RGB颜色值
        selectColor: {
            selectchg: function(which) {
                switch (which) {
                    case '1': palette.selectColor.leftR(); break;
                    case '2': palette.selectColor.leftG(); break;
                    case '3': palette.selectColor.leftB(); break;
                    case '4': palette.selectColor.leftA(); break;
                }
            },
            leftR: function() {
                for (i = 0; i <= 15; ++i)
                { document.all['tdleft' + i].style.backgroundColor = 'rgb(' + (0 + i * 17) + ',0,0)' }
                palette.selectColor.rightR(0)
            },
            leftG: function() {
                for (i = 0; i <= 15; ++i)
                { document.all['tdleft' + i].style.backgroundColor = 'rgb(0,' + (0 + i * 17) + ',0)' }
                palette.selectColor.rightG(0)
            },
            leftB: function() {
                for (i = 0; i <= 15; ++i)
                { document.all['tdleft' + i].style.backgroundColor = 'rgb(0,0,' + (0 + i * 17) + ')' }
                palette.selectColor.rightB(0)
            },
            leftA: function() {
                for (i = 0; i <= 15; ++i)
                { document.all['tdleft' + i].style.backgroundColor = 'rgb(' + (0 + i * 17) + ',' + (0 + i * 17) + ',' + (0 + i * 17) + ')' }
                palette.selectColor.rightA()
            },
            rightR: function(which) {
                for (i = 0; i <= 15; ++i) {
                    for (j = 0; j <= 15; ++j)
                    { document.all['tdrightr' + i + 'c' + j].style.backgroundColor = 'rgb(' + (0 + which * 17) + ',' + (0 + i * 17) + ',' + (0 + j * 17) + ')' }
                }
            },
            rightG: function(which) {
                for (i = 0; i <= 15; ++i) {
                    for (j = 0; j <= 15; ++j)
                    { document.all['tdrightr' + i + 'c' + j].style.backgroundColor = 'rgb(' + (0 + i * 17) + ',' + (0 + which * 17) + ',' + (0 + j * 17) + ')' }
                }
            },
            rightB: function(which) {
                for (i = 0; i <= 15; ++i) {
                    for (j = 0; j <= 15; ++j)
                    { document.all['tdrightr' + i + 'c' + j].style.backgroundColor = 'rgb(' + (0 + i * 17) + ',' + (0 + j * 17) + ',' + (0 + which * 17) + ')' }
                }
            },
            rightA: function() {
                for (i = 0; i <= 15; ++i) {
                    for (j = 0; j <= 15; ++j)
                    { document.all['tdrightr' + i + 'c' + j].style.backgroundColor = 'rgb(' + (0 + i * 16 + j) + ',' + (0 + i * 16 + j) + ',' + (0 + i * 16 + j) + ')' }
                }
            },
            clickright: function(which) {
                if (rightclicked) { rightclicked = false;palette.selectColor.showcolor(which) } else { rightclicked = true }
            },
            changeright: function(which) {
                switch ($("#selectRGB").val()) {
                    case '1': palette.selectColor.rightR(which); break;
                    case '2': palette.selectColor.rightG(which); break;
                    case '3': palette.selectColor.rightB(which); break;
                }
            },
            showcolor: function(which) {
                if (rightclicked) return;
                colorCode.value = which.style.backgroundColor
                palette.selectColor.choosecolor()
            },
            choosecolor: function() {
                customcolor.style.backgroundColor = colorCode.value
            },
            ToolChoese:function() {
                $("._ToolChoese").each(function () {
                    _select({
                        select: $(this).find(".SearChoese"),
                        options: $(this).find("ul.SearChoese-show"),
                        option: $(this).find("ul.SearChoese-show li a"),
                        t: "slide"
                    });
                });
                $("._ToolChoese ul a").click(function () {
                    palette.selectColor.selectchg($(this).attr("val"));
                });
            }
        },
        imgtobase: {
            getid: function(id)  {
                return (typeof id == 'string') ? document.getElementById(id) : id
            },
            clickBtn: function() {
                $(".uploadify-button,#imgtobase").on("click", function () {
                    $('#upimg').val('');
                    $("#upimg").click();
                });
                $("#clear").on("click", function () {
                    $("#basestr").val("").focus();
                    $(".uploadify-button").removeClass("autohide");
                    $("#prewimg").attr("src", "").parent().addClass("autohide");
                    $("#imgname").text("");
                });
                $("#basetoimg").on("click", function () {
                    var str = $("#basestr").val();
                    if (str.indexOf("data:image/jpg;base64,") >= 0 || str.indexOf("data:image/jpeg;base64,") >= 0 || str.indexOf("data:image/gif;base64,") >= 0 || str.indexOf("data:image/bmp;base64,") >= 0 || str.indexOf("data:image/png;base64,") >= 0 || str.indexOf("data:image/ico;base64,") >= 0) {
                        $("#prewimg").attr("src", str).removeClass("autohide");
                        $(".uploadify-button").addClass("autohide");
                        $(".img-upd").removeClass("autohide");
                    } else {
                        alert("格式错误,暂时只支持.jpg/.jpeg/.gif/.bmp/.png/.ico格式");
                        $("#basestr").val("").focus();
                    }
                });
                $("#upimg").on('change',function () {
                    var docObj = palette.imgtobase.getid("upimg");
                    var imgObjPreview = palette.imgtobase.getid("prewimg");
                    if (docObj.files && docObj.files[0]) {
                        var filesname = docObj.files[0].name.split('.');
                        if (filesname.length > 0) {
                            var name = filesname[filesname.length - 1];
                            if (name != "jpg" && name != "jpeg" && name != "gif" && name != "bmp" && name != "png" && name != "ico") {
                                alert("格式错误,暂时只支持.jpg/.jpeg/.gif/.bmp/.png/.ico格式");
                            } else if (docObj.files[0].size / 1024 > 300) {
                                alert("图片过大，请上传小于300KB的图片,不建议将大图转换");
                            } else {
                                $(".img-upd").removeClass("autohide").prev().addClass("autohide");
                                $("#imgname").text(docObj.files[0].name);
                                imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
                                // 抓取上传图片，转换代码结果，显示图片的dom
                                var base64_code = document.getElementById("basestr");
                                // 添加功能出发监听事件
                                var reader = new FileReader();
                                reader.readAsDataURL(docObj.files[0]);
                                reader.onload = function() {
                                    $('#basestr').val(this.result)
                                }
                            }
                        } else {
                            alert("格式错误,暂时只支持.jpg/.jpeg/.gif/.bmp/.png/.ico格式");
                        }
                    } else {
                        alert("请选择图片上传");
                    }
                });
            }
        }
    },
    // 辅助工具->其他
    auxiliarytool: {
        matrixing: function(type) {
            switch(type) {
                case 'angle':
                    var bs = [1, 360, 1296000, 6.2831855, 4, 21600, 6283.18548, 399.99996]
                    break;
                case 'area':
                    var bs =[1e-6, 0.0001, 0.0015, 1, 100, 10000, 1000000, 3.8610e-7, 0.0002471, 0.0395369, 1.19599, 9, 900]
                    break;
                case 'datastore':
                    var bs = [1, 0.125, 1.1642e-10, 0.0001221, 1.1102e-16, 1.1921e-7, 1.1369e-13];
                    break;
                case 'density':
                    var bs = [1, 0.125, 1.1642e-10, 0.0001221, 1.1102e-16, 1.1921e-7, 1.1369e-13];
                    break;
                case 'force':
                    var bs = [1, 9.80665, 0.0098067, 999.9999971, 2.2046226, 0.0022046, 0.001];
                    break;
                case 'heat':
                    var bs = [1, 0.001, 1.1627e-6, 1.5593e-6, 1.5809e-6, 0.4269569, 0.0039674, 3.0874843];
                    break;
                case 'length':
                    var bs = [0.001, 1, 10, 100, 1000, 10000, 1000000, 0.002, 0.3, 3, 30, 300, 3000, 0.00054, 0.5468066, 0.0006214, 0.004971, 1.0936133, 3.2808399, 39.3700787, 1000000000];
                    break;
                case 'power':
                    var bs = [1, 0.1757842, 0.7354987, 0.9863201, 542.4760385, 735.49875, 0.6971183, 75, 735.49875];
                    break;
                case 'pressure':
                    var bs = [1, 100, 1000, 1000, 100000, 0.9869233, 750.0616827, 2088.5435121, 14.5037744, 29.5299875, 1.0197162, 10197.1621298, 10197.2];
                    break;
                case 'speed':
                    var bs = [1, 3.6, 39.370079, 0.001, 3.3356e-9, 0.0029386, 2.236936];
                    break;
                case 'temperature':
                    var bs = [1, 33.8, 274.15, 493.47, 0.8];
                    break;
                case 'time':
                    var bs = [1, 24, 0.1428571, 1440.0000288, 86400, 86400000, 0.0027397];
                    break;
                case 'volume':
                    var bs = [1, 10, 100, 1000, 10000, 100000, 1000000, 1000000000, 8.6484898, 28.3775933, 113.5103730, 908.0829843, 1816.1659685, 6.1102569, 27.4961560, 219.9692483, 1759.7539864, 35195.0797279, 66666.6666667, 200000, 67628.0454037, 202884.1362111, 4226.7528377, 6.2898108, 264.1720524, 1056.6882094, 2113.3764189, 8453.5056755, 33814.0227018, 270512.1816147, 2077533554.801234, 0.0008107, 1.3079506, 35.3146667, 61023.7440947];
                    break;
            }
            var num = 0;
            $(".UccBtn").on("click", function () {
                num = $(this).next().val();
                if (num != "" && !isNaN(num)) {
                    var tag = num / bs[$(".UnitCountCent li").index($(this).parent())];
                    $(".UnitCountCent li").each(function (ind) {
                        $(this).find("input").eq(1).val(bs[ind] * tag);
                    })
                }else{
                    layer.msg('请输入想换算的数值')
                }
            })
            tools.clearBtn('clear','[type=text]')
        },
        RandomPwd: {
            // 操作
            RandomOpera: function(){
                tools.addClipScript()
                var data = {
                    letter_capital_array: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
                        'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
                    ],
                    letter_lowercase_array: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
                        'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
                    ],
                    number_array: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
                    special_char_array: ['~','!','@','#','$','%','^','&','*','(',')','_','+'],
                }
                $("[js-do=\"psdlen\"]").change(function() {
                    var msg = "密码长度仅支持6-64位";
                    setTimeout(function(){
                        if($("[js-do=\"psdlen\"]").val() < 6) {
                            $("[js-do=\"psdlen\"]").val('6')
                            layer.msg(msg)
                        }else if($("[js-do=\"psdlen\"]").val() > 64){
                            $("[js-do=\"psdlen\"]").val('64')
                            layer.msg(msg)
                        }
                    },100)
                })
                // 选择所含字符
                $("[js-do=\"checkbix\"]").click(function(){
                    var thisChecked = $(this).attr("checked");
                    if(thisChecked === "checked"){
                        $(this).removeAttr("checked")
                    }else{
                        $(this).attr("checked","checked")
                    }
                    auxiliarytool.RandomPwd.GetStr(data)
                    $("[js-do=\"reset\"],[js-do=\"usestr\"]").removeClass("focus");
                    $("[js-do=\"reset\"]").hide()
                })

                // 编辑所有字符
                $("[js-do=\"usestr\"]").keyup(function(event) {
                    $("[js-do=reset]").show()
                    var reg = /[\u4E00-\u9FA5]/g;
                    var dataStr = $("[js-do=usestr]").val()
                    $("[js-do=usestr]").val(dataStr.replace(reg,''))
                    var keyCode = event.which;
                    if (keyCode == 8){
                        $("[js-do=reset],[js-do=usestr]").addClass("focus");
                        $("[js-do=usestr]").attr("maxlength",$("[js-do=usestr]").val().length)
                        var str = JSON.stringify(dataStr);
                        var number_array_str=[],letter_capital_array_str=[],letter_lowercase_array_str=[],special_char_array_str=[]
                        for(i=0;i<data.number_array.length;i++){
                            var patt1 = new RegExp(data.number_array[i]);
                            var result = patt1.test(str);
                            if(result!=false){
                                number_array_str.push(result)
                            }
                        }
                        if(number_array_str[0]!=true){
                            $("[data-text=number_array]").removeAttr("checked")
                        }
                        for(i=0;i<data.letter_capital_array.length;i++){
                            var patt1 = new RegExp(data.letter_capital_array[i]);
                            var result = patt1.test(str);
                            if(result!=false){
                                letter_capital_array_str.push(result)
                            }
                        }
                        if(letter_capital_array_str[0]!=true){
                            $("[data-text=letter_capital_array]").removeAttr("checked")
                        }
                        for(i=0;i<data.letter_lowercase_array.length;i++){
                            var patt1 = new RegExp(data.letter_lowercase_array[i]);
                            var result = patt1.test(str);
                            if(result!=false){
                                letter_lowercase_array_str.push(result)
                            }
                        }
                        if(letter_lowercase_array_str[0]!=true){
                            $("[data-text=letter_lowercase_array]").removeAttr("checked")
                        }
                        for(i=0;i<data.special_char_array.length;i++){
                            var patt1 = data.special_char_array[i];
                            var result = dataStr.split("");
                            for(j=0;j<result.length;j++){
                                if(patt1 == result[j]){
                                    special_char_array_str.push(true)
                                }
                            }
                        }
                        if(special_char_array_str[0]!=true){
                            $("[data-text=special_char_array]").removeAttr("checked")
                        }
                        return true;
                    }else{
                        return false;
                    }
                }).focus(function() {
                    this.style.imeMode='disabled';
                });
                // 重置
                $("[js-do=\"reset\"]").click(function() {
                    $("[js-do=\"checkbix\"]").prop("checked",true);
                    $("[js-do=\"checkbix\"]").attr("checked","checked")
                    $("[data-text=\"special_char_array\"]").prop("checked",false)
                    $("[data-text=\"special_char_array\"]").removeAttr("checked")
                    auxiliarytool.RandomPwd.GetStr(data)
                })
                // 生成密码
                $("[js-do=\"generate_pw\"]").click(function(){
                    $("[js-do=\"copy\"]").parent().removeClass("focus")
                    $("[js-do=\"copy\"]").addClass("focus")
                    var len = $("[js-do=\"psdlen\"]").val()
                    var dataStr = $("[js-do=\"usestr\"]").val()
                    var checkedLen = $("[js-do=\"checkbix\"][checked=checked]").length
                    $("#msgColor").removeClass()
                    $("#msgColor").removeClass("hid")
                    switch(checkedLen){
                        case 1:
                            $("#msgColor").addClass("red")
                            $("#msg").text("密码强度差")
                            break;
                        case 2:
                            $("#msgColor").addClass("org")
                            $("#msg").text("密码强度良好")
                            break;
                        case 3:case 4:
                            $("#msgColor").addClass("green")
                            $("#msg").text("密码强度高")
                            break;
                    }
                    var i = 0
                    for(i = 0;i < 7; i++){
                        if(len<6){len=6}else if(len>64){len=64}
                        $("#mycheckbox" + i).prev().attr("value",auxiliarytool.RandomPwd._getRandomString(len,dataStr))
                    }
                })
                // 复制
                $("[js-do=\"copy\"]").click(function(){
                    var id = $(this).attr("id")
                    var text = $(this).prev().val();
                    $(this).attr("data-clipboard-text",text)
                    $("[js-do=\"copy\"]").parent().removeClass("focus")
                    if(text != ""||text == undefined){
                        try {
                            $(this).parent().addClass("focus")
                            new ClipboardJS('#' + id);
                            layer.msg("复制成功");
                        } catch (ex) {
                            layer.msg("复制失败");
                        }
                    }else{
                        layer.msg("尚未生成密码，无法复制！", { offset: '50%' });
                    }
                })
                // 问题解答
                $("[js-do=\"RndQues\"]").click(function(){
                    var thisref = $(this).attr("ref")
                    if(thisref == "unfold"){
                        $(this).removeAttr("ref")
                        $(this).find("span").addClass("hid")
                        $(this).removeClass("unfold")
                        $("[js-do=\"RndQues\"] i").removeClass("unfold")
                        $(this).find("i").removeClass("unfold")
                    }else{
                        $(this).attr("ref","unfold")
                        $("[js-do=\"RndQues\"] span").addClass("hid")
                        $(this).find("span").removeClass("hid")
                        $("[js-do=\"RndQues\"]").removeClass("unfold")
                        $("[js-do=\"RndQues\"] i").removeClass("unfold")
                        $(this).find("i").addClass("unfold")
                        $(this).addClass("unfold").siblings("RndQues").removeClass("unfold")
                    }
                })
            },
            // 匹配字符
            GetStr: function(data){
                var str = []
                $("[js-do=\"checkbix\"][checked=\"checked\"]").each(function(){
                    var thisData = $(this).attr("data-text")
                    var dataStr = data[thisData].join('')
                    str.push(dataStr)
                });
                $("[js-do=\"usestr\"]").attr("maxlength",str.join('').length)
                $("[js-do=\"usestr\"]").val(str.join(''))
                // $("[js-do=usestr]").attr("value",str.join(''))
            },
            _getRandomString: function(len,dataStr) {
                len = len || 32;
                var $chars = dataStr;
                var maxPos = $chars.length;
                var pwd = '';
                for (i = 0; i < len; i++) {
                    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
                }
                return pwd;
            }
        },
        calculator: {
            //数字键
            inputkey: function (key){
                var index=key.charCodeAt(0);
                if ((carry==2 && (index==48 || index==49))
                    || (carry==8 && index>=48 && index<=55)
                    || (carry==10 && (index>=48 && index<=57 || index==46))
                    || (carry==16 && ((index>=48 && index<=57) || (index>=97 && index<=102))))
                    if(endNumber)
                    {
                        endNumber=false
                        document.calc.display.value = key
                    }
                    else if(document.calc.display.value == null || document.calc.display.value == "0")
                        document.calc.display.value = key
                    else
                        document.calc.display.value += key
            },
            changeSign: function (){
                if (document.calc.display.value!="0")
                    if(document.calc.display.value.substr(0,1) == "-")
                        document.calc.display.value = document.calc.display.value.substr(1)
                    else
                        document.calc.display.value = "-" + document.calc.display.value
            },
            //函数键
            inputfunction: function (fun,shiftfun){
                endNumber=true
                if (document.calc.shiftf.checked)
                    document.calc.display.value=auxiliarytool.calculator.decto(auxiliarytool.calculator.funcalc(shiftfun,(auxiliarytool.calculator.todec(document.calc.display.value,carry))),carry)
                else
                    document.calc.display.value=auxiliarytool.calculator.decto(auxiliarytool.calculator.funcalc(fun,(auxiliarytool.calculator.todec(document.calc.display.value,carry))),carry)
                document.calc.shiftf.checked=false
                document.calc.hypf.checked=false
                auxiliarytool.calculator.inputshift()
            },
            inputtrig: function (trig,arctrig,hyp,archyp){
                if (document.calc.hypf.checked)
                    inputfunction(hyp,archyp)
                else
                    inputfunction(trig,arctrig)
            },
            //运算符
            operation: function (join,newlevel){
                endNumber=true
                var temp=stack.substr(stack.lastIndexOf("(")+1)+document.calc.display.value
                while (newlevel!=0 && (newlevel<=(level.charAt(level.length-1))))
                {
                    temp=auxiliarytool.calculator.parse(temp)
                    level=level.slice(0,-1)
                }
                if (temp.match(/^(.*\d[\+\-\*\/\%\^\&\|x])?([+-]?[0-9a-f\.]+)$/))
                    document.calc.display.value=RegExp.$2
                stack=stack.substr(0,stack.lastIndexOf("(")+1)+temp+join
                document.calc.operator.value=" "+join+" "
                level=level+newlevel

            },
            //括号
            addbracket: function (){
                endNumber=true
                document.calc.display.value=0
                stack=stack+"("
                document.calc.operator.value="   "
                level=level+0

                layer+=1
                document.calc.bracket.value="(="+layer
            },
            disbracket: function (){
                endNumber=true
                var temp=stack.substr(stack.lastIndexOf("(")+1)+document.calc.display.value
                while ((level.charAt(level.length-1))>0)
                {
                    temp=auxiliarytool.calculator.parse(temp)
                    level=level.slice(0,-1)
                }
                document.calc.display.value=temp
                stack=stack.substr(0,stack.lastIndexOf("("))
                document.calc.operator.value="   "
                level=level.slice(0,-1)

                layer-=1
                if (layer>0)
                    document.calc.bracket.value="(="+layer
                else
                    document.calc.bracket.value=""
            },
            //等号
            result: function (){
                endNumber=true
                while (layer>0)
                    disbracket()
                var temp=stack+document.calc.display.value
                while ((level.charAt(level.length-1))>0)
                {
                    temp=auxiliarytool.calculator.parse(temp)
                    level=level.slice(0,-1)
                }

                document.calc.display.value=temp
                document.calc.bracket.value=""
                document.calc.operator.value=""
                stack=""
                level="0"
            },
            //修改键
            backspace: function (){
                if (!endNumber)
                {
                    if(document.calc.display.value.length>1)
                        document.calc.display.value=document.calc.display.value.substring(0,document.calc.display.value.length - 1)
                    else
                        document.calc.display.value=0
                }
            },
            clearall: function (){
                document.calc.display.value=0
                endNumber=true
                stack=""
                level="0"
                layer=""
                document.calc.operator.value=""
                document.calc.bracket.value=""
            },
            //转换键
            inputChangCarry: function (newcarry){
                endNumber=true
                document.calc.display.value=(auxiliarytool.calculator.decto(auxiliarytool.calculator.todec(document.calc.display.value,carry),newcarry))
                carry=newcarry

                document.calc.sin.disabled=(carry!=10)
                document.calc.cos.disabled=(carry!=10)
                document.calc.tan.disabled=(carry!=10)
                document.calc.bt.disabled=(carry!=10)
                document.calc.pi.disabled=(carry!=10)
                document.calc.e.disabled=(carry!=10)
                document.calc.kp.disabled=(carry!=10)

                document.calc.k2.disabled=(carry<=2)
                document.calc.k3.disabled=(carry<=2)
                document.calc.k4.disabled=(carry<=2)
                document.calc.k5.disabled=(carry<=2)
                document.calc.k6.disabled=(carry<=2)
                document.calc.k7.disabled=(carry<=2)
                document.calc.k8.disabled=(carry<=8)
                document.calc.k9.disabled=(carry<=8)
                document.calc.ka.disabled=(carry<=10)
                document.calc.kb.disabled=(carry<=10)
                document.calc.kc.disabled=(carry<=10)
                document.calc.kd.disabled=(carry<=10)
                document.calc.ke.disabled=(carry<=10)
                document.calc.kf.disabled=(carry<=10)

            },
            inputChangAngle: function (angletype){
                endNumber=true
                angle=angletype
                if (angle=="d")
                    document.calc.display.value=auxiliarytool.calculator.radiansToDegress(document.calc.display.value)
                else
                    document.calc.display.value=auxiliarytool.calculator.degressToRadians(document.calc.display.value)
                endNumber=true
            },
            inputshift: function (){
                if (document.calc.shiftf.checked)
                {
                    document.calc.bt.value="deg"
                    document.calc.ln.value="exp"
                    document.calc.log.value="expd"

                    if (document.calc.hypf.checked)
                    {
                        document.calc.sin.value="ahs"
                        document.calc.cos.value="ahc"
                        document.calc.tan.value="aht"
                    }
                    else
                    {
                        document.calc.sin.value="asin"
                        document.calc.cos.value="acos"
                        document.calc.tan.value="atan"
                    }

                    document.calc.sqr.value="x^.5"
                    document.calc.cube.value="x^.3"

                    document.calc.floor.value="小数"
                }
                else
                {
                    document.calc.bt.value="d.ms"
                    document.calc.ln.value="ln"
                    document.calc.log.value="log"

                    if (document.calc.hypf.checked)
                    {
                        document.calc.sin.value="hsin"
                        document.calc.cos.value="hcos"
                        document.calc.tan.value="htan"
                    }
                    else
                    {
                        document.calc.sin.value="sin"
                        document.calc.cos.value="cos"
                        document.calc.tan.value="tan"
                    }

                    document.calc.sqr.value="x^2"
                    document.calc.cube.value="x^3"

                    document.calc.floor.value="取整"
                }

            },
            //存储器部分
            clearmemory: function (){
                mem=0
                document.calc.memory.value="   "
            },
            getmemory: function (){
                endNumber=true
                document.calc.display.value=auxiliarytool.calculator.decto(mem,carry)
            },
            putmemory: function (){
                endNumber=true
                if (document.calc.display.value!=0)
                {
                    mem=auxiliarytool.calculator.todec(document.calc.display.value,carry)
                    document.calc.memory.value="M"
                }
                else
                    document.calc.memory.value=" "
            },
            addmemory: function (){
                endNumber=true
                mem=parseFloat(mem)+parseFloat(auxiliarytool.calculator.todec(document.calc.display.value,carry))
                if (mem==0)
                    document.calc.memory.value=" "
                else
                    document.calc.memory.value="M"
            },
            multimemory: function (){
                endNumber=true
                mem=parseFloat(mem)*parseFloat(auxiliarytool.calculator.todec(document.calc.display.value,carry))
                if (mem==0)
                    document.calc.memory.value=" "
                else
                    document.calc.memory.value="M"
            },
            //十进制转换
            todec: function (num,oldcarry){
                if (oldcarry==10 || num==0) return(num)
                var neg=(num.charAt(0)=="-")
                if (neg) num=num.substr(1)
                var newnum=0
                for (var index=1;index<=num.length;index++)
                    newnum=newnum*oldcarry+hexnum.indexOf(num.charAt(index-1))
                if (neg)
                    newnum=-newnum
                return(newnum)
            },
            decto: function (num,newcarry){
                var neg=(num<0)
                if (newcarry==10 || num==0) return(num)
                num=""+Math.abs(num)
                var newnum=""
                while (num!=0)
                {
                    newnum=hexnum.charAt(num%newcarry)+newnum
                    num=Math.floor(num/newcarry)
                }
                if (neg)
                    newnum="-"+newnum
                return(newnum)
            },
            //表达式解析
            parse: function (string){
                if (string.match(/^(.*\d[\+\-\*\/\%\^\&\|x\<])?([+-]?[0-9a-f\.]+)([\+\-\*\/\%\^\&\|x\<])([+-]?[0-9a-f\.]+)$/))
                    return(RegExp.$1+auxiliarytool.calculator.cypher(RegExp.$2,RegExp.$3,RegExp.$4))
                else
                    return(string)
            },
            //数学运算和位运算
            cypher: function (left,join,right){
                left=auxiliarytool.calculator.todec(left,carry)
                right=auxiliarytool.calculator.todec(right,carry)
                if (join=="+")
                    return(auxiliarytool.calculator.decto(parseFloat(left)+parseFloat(right),carry))
                if (join=="-")
                    return(auxiliarytool.calculator.decto(left-right,carry))
                if (join=="*")
                    return(auxiliarytool.calculator.decto(left*right,carry))
                if (join=="/" && right!=0)
                    return(auxiliarytool.calculator.decto(left/right,carry))
                if (join=="%")
                    return(auxiliarytool.calculator.decto(left%right,carry))
                if (join=="&")
                    return(auxiliarytool.calculator.decto(left&right,carry))
                if (join=="|")
                    return(auxiliarytool.calculator.decto(left|right,carry))
                if (join=="^")
                    return(auxiliarytool.calculator.decto(Math.pow(left,right),carry))

                if (join=="x")
                    return(auxiliarytool.calculator.decto(left^right,carry))
                if (join=="<")
                    return(auxiliarytool.calculator.decto(left<<right,carry))
                alert("除数不能为零")
                return(left)
            },
            //函数计算
            funcalc: function (fun,num){
                with(Math)
                {
                    if (fun=="pi")
                        return(PI)
                    if (fun=="e")
                        return(E)

                    if (fun=="abs")
                        return(abs(num))
                    if (fun=="ceil")
                        return(ceil(num))
                    if (fun=="round")
                        return(round(num))

                    if (fun=="floor")
                        return(floor(num))
                    if (fun=="deci")
                        return(num-floor(num))


                    if (fun=="ln" && num>0)
                        return(log(num))
                    if (fun=="exp")
                        return(exp(num))
                    if (fun=="log" && num>0)
                        return(log(num)*LOG10E)
                    if (fun=="expdec")
                        return(pow(10,num))


                    if (fun=="cube")
                        return(num*num*num)
                    if (fun=="cubt")
                        return(pow(num,1/3))
                    if (fun=="sqr")
                        return(num*num)
                    if (fun=="sqrt" && num>=0)
                        return(sqrt(num))

                    if (fun=="!")
                        return(auxiliarytool.calculator.factorial(num))

                    if (fun=="recip" && num!=0)
                        return(1/num)

                    if (fun=="dms")
                        return(dms(num))
                    if (fun=="deg")
                        return(deg(num))

                    if (fun=="~")
                        return(~num)

                    if (angle=="d")
                    {
                        if (fun=="sin")
                            return(sin(auxiliarytool.calculator.degressToRadians(num)))
                        if (fun=="cos")
                            return(cos(auxiliarytool.calculator.degressToRadians(num)))
                        if (fun=="tan")
                            return(tan(auxiliarytool.calculator.degressToRadians(num)))

                        if (fun=="arcsin" && abs(num)<=1)
                            return(auxiliarytool.calculator.radiansToDegress(asin(num)))
                        if (fun=="arccos" && abs(num)<=1)
                            return(auxiliarytool.calculator.radiansToDegress(acos(num)))
                        if (fun=="arctan")
                            return(auxiliarytool.calculator.radiansToDegress(atan(num)))
                    }
                    else
                    {
                        if (fun=="sin")
                            return(sin(num))
                        if (fun=="cos")
                            return(cos(num))
                        if (fun=="tan")
                            return(tan(num))

                        if (fun=="arcsin" && abs(num)<=1)
                            return(asin(num))
                        if (fun=="arccos" && abs(num)<=1)
                            return(acos(num))
                        if (fun=="arctan")
                            return(atan(num))
                    }

                    if (fun=="hypsin")
                        return((exp(num)-exp(0-num))*0.5)
                    if (fun=="hypcos")
                        return((exp(num)+exp(-num))*0.5)
                    if (fun=="hyptan")
                        return((exp(num)-exp(-num))/(exp(num)+exp(-num)))
                    if (fun=="ahypsin" | fun=="hypcos" | fun=="hyptan")
                    {
                        alert("对不起,公式还没有查到!")
                        return(num)
                    }
                    alert("超出函数定义范围")
                    return(num)
                }
            },
            factorial: function (n){
                n=Math.abs(parseInt(n))
                var fac=1
                for (;n>0;n-=1)
                    fac*=n
                return(fac)
            },
            dms: function (n){
                var neg=(n<0)
                with(Math)
                {
                    n=abs(n)
                    var d=floor(n)
                    var m=floor(60*(n-d))
                    var s=(n-d)*60-m
                }
                var dms=d+m/100+s*0.006
                if (neg)
                    dms=-dms
                return(dms)
            },
            deg: function (n){
                var neg=(n<0)
                with(Math)
                {
                    n=abs(n)
                    var d=floor(n)
                    var m=floor((n-d)*100)
                    var s=(n-d)*100-m
                }
                var deg=d+m/60+s/36
                if (neg)
                    deg=-deg
                return(deg)
            },
            degressToRadians: function (degress){
                return(degress*Math.PI/180)
            },
            radiansToDegress: function (radians){
                return(radians*180/Math.PI)
            },
            calculatorInit: function(){
                $(".heachackWrap input.HdisaBtn").click(
                    function(){
                        $(".CentChackBox input:disabled").css({ "color": "#56688a", "background": "#f1f9ff","border-color":"#c6cede" });
                    }
                )

            }
        }
    }
}

var siteInfo = tools.siteInfo; // 网站信息相关
var tc = tools.transcoding; // 编码转码相关
var cssformat = tools.transcoding.cssformat;
var sqlformat = tools.transcoding.sqlformat;
var htmlcssjs = tools.transcoding.htmlcssjs;
var jsontools = tools.transcoding.jsonTool;
var htmlfilter = tools.transcoding.htmlfilter;
var EaD = tools.EaD; // 加密解密相关
var palette = tools.palette; // 辅助工具->配色相关
var textCode = tools.textCode; // 辅助工具->文字编辑
var auxiliarytool = tools.auxiliarytool; // 辅助工具->其他
var to = tools.other;
var ted = tools.encryptDecode;
var hcj = tools.htmlcssjs;
var jsontool = tools.jsonTool;