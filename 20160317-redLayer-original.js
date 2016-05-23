window.RedLayer=(function(){
    var floatConfig = {
            huodong1 : {
                bdSources:[
                    'ucpz1',
                    'sougoupz1',
                    'fanli_jd',
                    'baidupz1',
                    '3w'
                ],
                img:'http://source.qunar.com/site/images/wap/touch/images/v2/images1x/qiang-red-icon.png',
                skipUrl:'http://touch.qunar.com/h5/red/secondversionvipred',
                period:30,
                localStorageKey:'touch_red_geted'
            }
        },
        popupConfig = {
            huodong1 : {
                bdSources:[
                    'ucpz1',
                    'sougoupz1',
                    'fanli_jd',
                    'baidupz1',
                    '3w'
                ],
                img:'http://source.qunar.com/site/images/wap/touch/images/v2/images1x/qingdlb.png',
                skipUrl:'http://touch.qunar.com/h5/red/secondversionvipred',
                period:30,
                localStorageKey:'touch_red_showed'
            }
        };

    var floatingLayer = {
        style:
        '.floatRed{width: 90px;height: 50px;position: fixed;top: 65%;right: 0;overflow: hidden;transition: all .5s; -webkit-transition: all .5s;}'+
        '.floatRed_img{height: 100%;width: 90%;}'+
        '.floatRed_hide{transform: translate3d(53px,0,0); -webkit-transform: translate3d(53px,0,0);opacity: .6;}'
        ,
        buildTpl:function(type,bdSource){
            var config = floatConfig[type],
                skipUrl = addUrlParam(config.skipUrl,{'bd_source':bdSource});
            var tpl = '<div class="floatRed " data-href="'+skipUrl+'">'+
                '<img class="floatRed_img" src="'+config.img+'">'+
                '</div>';
            $('body').append(tpl);
        },
        buildStyle:function(){
            var style = document.createElement('style');
            style.setAttribute('type','text/css');
            style.innerHTML=this.style;
            $('head').append(style);
        },
        buildEvents:function(){
            var me = this;
            var timeOutShow = (function(){
                var timeOut;
                return function(){
                    clearTimeout(timeOut);
                    timeOut = setTimeout(function(){
                        me.show();
                    },500)
                }

            })();
            var timeOutHide = (function(){
                var timeOut;
                return function(){
                    clearTimeout(timeOut);
                    timeOut = setTimeout(function(){
                        me.hide();
                    },4000);
                }
            })();
            $('.floatRed').on('click',function(){
                window.location.href = $(this).attr('data-href');
            })
            //timeOutShow();
            timeOutHide();
            $(window).on('scroll',throttle(function(){
                me.show();
                timeOutHide();
            },4000));
            $(window).on('scroll',function(){
                me.hide();
            });
        },
        show:function(){
            $('.floatRed').removeClass('floatRed_hide');
        },
        hide:function(){
            $('.floatRed').addClass('floatRed_hide');
        }
    }
    var popupLayer = {
        style:
        '.popUpRed_img{width: 100%;}'+
        '.popUpRed{position: relative;}'+
        '.popUpRed_close{position: absolute;width: 10%;height: 10%;top: 4%;right: 4%;}'+
        '.popUpRed_get{position: absolute;width: 80%;height: 20%;bottom: 4%;right: 8%;}'
        ,
        buildTpl:function(type,bdSource){
            var config = popupConfig[type],
                skipUrl = addUrlParam(config.skipUrl,{'bd_source':bdSource});
            var tpl =
                '<div class="popUpRed"><img class="popUpRed_img" src="'+ config.img +'"><div class="popUpRed_close"></div><div class="popUpRed_get"></div></div>';
            qt.showPopup({
                message: tpl,
                noHeader: true,
                noFooter: true,
                contentPadding:0,
                wrapBackground:'transparent',
                maskOpacity:0.8,
                events: {
                    'tap .popUpRed_close': 'redClose',
                    'tap .popUpRed_get': 'redGet',
                    'tap .lo-close': 'close'
                },
                onTapMask: function () {
                    qt.hidePopup();
                },
                close: function () {
                    qt.hidePopup();
                },
                redClose: function (e) {
                    qt.hidePopup();
                },
                redGet: function () {
                    window.location.href = skipUrl;
                    qt.hidePopup();
                }

            })
        },
        buildStyle:function(){
            var style = document.createElement('style');
            style.setAttribute('type','text/css');
            style.innerHTML=this.style;
            $('head').append(style);
        }
    }
    function throttle(fn, delay) {
        var timer = null;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        };
    }
    function addUrlParam(url, obj) {
        var returnUrl = url;
        for (var key in obj){
            returnUrl = addUrlPar(returnUrl, key, obj[key]);
        }
        return returnUrl;
        function addUrlPar(url, name, value){
            var currentUrl = url.split('#')[0];
            if (/\?/g.test(currentUrl)) {
                if (/name=[-\w]{4,25}/g.test(currentUrl)) {
                    currentUrl = currentUrl.replace(/name=[-\w]{4,25}/g, name + "=" + value);
                } else {
                    currentUrl += "&" + name + "=" + value;
                }
            } else {
                currentUrl += "?" + name + "=" + value;
            }
            if (url.split('#')[1]) {
                currentUrl = currentUrl + '#' + url.split('#')[1];
            } else {
                currentUrl = currentUrl;
            }
            return currentUrl;
        }
    }
    return {
        buildFloatingLayer : function(type,bdSource){
            bdSource = bdSource || '';
            var touch_red_geted,
                config = floatConfig[type];
            try{
                touch_red_geted=localStorage.getItem(config['localStorageKey']);
            }catch(e){}
            if(!config){
                return;
            }
            if(config['bdSources'].indexOf(bdSource) < 0){
                return;
            }
            if(touch_red_geted){
                var nowDate = new Date().getTime();
                if(nowDate - touch_red_geted > config['period'] * 24 * 60 * 1000){
                    try{
                        localStorage.setItem(config['localStorageKey'],new Date().getTime());
                    }catch(e){}
                }else{
                    return;
                }
            }
            //else{
            //    try{
            //        localStorage.setItem(config['localStorageKey'],new Date().getTime());
            //    }catch(e){}
            //}
            floatingLayer.buildStyle();
            floatingLayer.buildTpl(type,bdSource);
            floatingLayer.buildEvents();

        },
        buildPopupLayer : function(type,bdSource){
            bdSource = bdSource || '';
            var touch_red_geted,
                config = popupConfig[type];
            try{
                touch_red_geted=localStorage.getItem(config['localStorageKey']);
            }catch(e){}
            if(!config){
                return;
            }
            if(config['bdSources'].indexOf(bdSource) < 0){
                return;
            }
            if(touch_red_geted){
                var nowDate = new Date().getTime();
                if(nowDate - touch_red_geted > config['period'] * 24 * 60 * 1000){
                    try{
                        localStorage.setItem(config['localStorageKey'],new Date().getTime());
                    }catch(e){}
                }else{
                    return;
                }
            }else{
                try{
                    localStorage.setItem(config['localStorageKey'],new Date().getTime());
                }catch(e){}
            }
            popupLayer.buildStyle();
            popupLayer.buildTpl(type,bdSource);
        }
    }


})();