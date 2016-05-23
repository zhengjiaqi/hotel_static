function QSwiper(ele, options) {               //img元素加上 data-src 默认支持懒加载
    this.opt = {
        anchor: ele || '',                     //页面锚点
        limit: 1 / 5,                           //页面滑动达到limit时切换页面
        transitionTime: .2,                   //过渡动画时间
        autoplay: false,                       //是否自动轮播
        intervalTime: 3000,                   //自动轮播时间间隔
        vertical: false,                       //是否纵向滚动
        loop: false,                           //循环模式
        base: 'window',                       //设置轮播组件宽度的基准元素
        touchable: true,                         //是否开启滑动切换
        onSlideChange: function () {
        },           //页面切换后的回调
        beforeSlideChange: function () {
        }        //页面切换前的回调
    };
    $.extend(this.opt, options);
    this.num = $(this.opt.anchor).children('.sl_slide').children('.sl_content').children('div').length || 0;
    this.init(this.opt);
};

QSwiper.prototype = {
    init: function (opt) {
        var me = this, opt = me.opt, _anchor = $(opt.anchor) ,touchStartTime;
        me.slides = [];
        me.activeIndex = 0;
        me.ele = _anchor;
        me.sl_mark = '.sl_mark';
        me.pos = 0;
        me.intervalNum = 0;
        me.onStart = false;

        var $sl_slide = $(me.ele.children('.sl_slide')), $content = $($sl_slide.children('.sl_content')), $sl_part = $($content.children('div'));
        _anchor.off('touchstart',fixDoubleTap);
        _anchor.on('touchstart',fixDoubleTap);
        build();
        var startX, X, moveX = 0, startY, Y, moveY = 0, contentWidth, contentHeight, pageWidth, pageHeight, num, translateX, translateY;
        var limit = opt.limit;
        var translateStart, oldActiveIndex = 0;
        me.interval();

        $sl_slide.on('touchstart', touchstart).on('mousedown', touchstart);
        $sl_slide.on('touchmove', touchmove).on('mousemove', touchmove);
        $sl_slide.on('touchend', touchend);
        $(window).on('mouseup', touchend);

        setWidthAndHeight(me);
        var html = '';
        for (var i = 0; i < me.num; i++) {
            html = html + '<span data-num=' + i + '></span>';
        }
        _anchor.find('.sl_mark').html(html);
        _anchor.find('.sl_mark span:nth-child(1)').addClass('sl_active');
        _anchor.find('.sl_slide>.sl_mark>span').on('tap', function (e) {
            me.slideTo($(this).data('num'));
        });
        $(window).on('resize', function () {
            setWidthAndHeight(me);
        });


        function touchstart(e) {
            me.touchable && clearInterval(me.intervalNum);
            translateStart = me.getTranslate($content);
            if ("undefined" != typeof(e.targetTouches)) {
                var touche = e.targetTouches[0];
                startX = touche.pageX;
                startY = touche.pageY;
            } else if (e.clientX != "" || e.clientX != undefined) {
                startX = e.clientX;
                startY = e.clientY;
            }
            X = startX;
            Y = startY;
            me.onStart = true;
            oldActiveIndex = me.activeIndex;
            if(me.opt.touchable){
                e.preventDefault();
            }
        }

        function touchmove(e) {

            if (!me.onStart) {
                return
            }

            if ("undefined" != typeof(e.targetTouches)) {
                var touche = e.targetTouches[0];
                X = touche.pageX;
                Y = touche.pageY;
            } else if (e.clientX != "" || e.clientX != undefined) {
                X = e.clientX;
                Y = e.clientY;
            }
            moveX = (X - startX);
            moveY = (Y - startY);
            if(!me.opt.touchable){
                return;
            }
            if (opt.vertical) {
                translateY = translateStart.translateY + moveY;
                if (translateY < pageHeight * limit && translateY > -contentHeight + pageHeight * (1 - limit)) {
                    me.activeIndex = getN(moveY, translateY);
                    me.addTranslate($content, translateStart, 0, 0, moveY);
                }
            } else {
                translateX = translateStart.translateX + moveX;
                if (translateX < pageWidth * limit && translateX > -contentWidth + pageWidth * (1 - limit)) {
                    me.activeIndex = getN(moveX, translateX);
                    me.addTranslate($content, translateStart, 0, moveX);
                }
            }
            if(me.opt.touchable){
                e.preventDefault();
                e.stopPropagation();
            }
        }

        function touchend(e) {
            if(!me.opt.touchable){
                return;
            }
            me.onStart = false;
            var endX = 0, endY = 0;
            if ("undefined" != typeof(e.changedTouches)) {
                var touche = e.changedTouches[0];
                endX = touche.pageX;
                endY = touche.pageY;
            } else if (e.clientX != "" || e.clientX != undefined) {
                endX = e.clientX;
                endY = e.clientY;
            }
            (Math.abs(endX - startX) > 0 || Math.abs(endY - startY) > 0) ? $sl_part.on('tap', stopClick) : $sl_part.off('tap', stopClick);
            var length = opt.vertical ? Math.abs(endY - startY) : Math.abs(endX - startX);
            if (length > 10) {
                oldActiveIndex !== me.activeIndex && me.opt.beforeSlideChange(oldActiveIndex, me.activeIndex);
                if (opt.vertical) {
                    me.setTransition($content, opt.transitionTime, 0, -me.activeIndex * pageHeight, 0)
                } else {
                    me.setTransition($content, opt.transitionTime, -me.activeIndex * pageWidth, 0, 0)
                }
                setTimeout(function () {
                    me.fixPosition();
                }, (opt.transitionTime * 1000 + 50));
                me.interval();
            }
        }

        function stopClick(e) {
            e.stopPropagation();
            e.preventDefault();
        }

        $content.on($.fx.transitionEnd, function (e) {
            if ($content[0] !== e.target) {
                return;
            }
            var translate = me.getTranslate($content),
                cssData = {};
            cssData[$.fx.cssPrefix + 'transition-duration'] = '0s';
            $content.css(cssData);
            me.activeIndex = opt.vertical ? getN(moveY, translate.translateY) : getN(moveX, translate.translateX);
            me.fixPosition();
            me.interval();
            me.opt.onSlideChange(me.pos);
            $.each(me.slides, function (index, item) {
                $(item).removeClass('active');
            });
            var $nowPart=$(me.slides[me.pos]),
                $imgs=$nowPart.find('img');
            $nowPart.addClass('active');
            $.each($imgs, function (index, item) {
                item = $(item);
                var daraSrc=item.attr('data-src');
                if(daraSrc){
                    item.attr('src',daraSrc);
                }
            });
        });

        function build() {
            var last = $sl_part.last(), first = $sl_part.first();
            for (var i = 0; i < $sl_part.length; i++) {
                me.slides.push($sl_part[i]);
            }
            if (opt.loop) {
                var slContent = $content;
                slContent.prepend(last.clone());
                slContent.append(first.clone());
            }

        }

        function fixDoubleTap(e){          //阻止safari浏览器 doubletap默认滚动
            if(!touchStartTime || touchStartTime==0){
                touchStartTime=new Date().getTime();
                setTimeout(function(){
                    touchStartTime=0;
                },500);
            }else{
                var time=new Date().getTime()-touchStartTime;
                if(time<=400){
                    e.preventDefault();
                }
            }
        }

        function getN(move, translate) {
            var factor, pageLength
            if (opt.vertical) {
                pageLength = pageHeight;
                move <= 0 ? factor = limit : factor = (1 - limit);
            } else {
                pageLength = pageWidth;
                move <= 0 ? factor = limit : factor = (1 - limit);
            }
            return Math.abs(Math.ceil((translate + pageLength * factor) / pageLength) - 1);

        }

        function setWidthAndHeight(me) {
            $sl_part=$($content.children('div'));
            var windowSize = me.getWindowSize();
            pageWidth = windowSize.pageWidth;
            pageHeight = windowSize.pageHeight;
            var factor;
            opt.loop ? factor = (me.num + 2) : factor = (me.num);
            contentWidth = pageWidth * factor;
            contentHeight = pageHeight * factor;
            var cssData = {},
                cssPrefix = $.fx.cssPrefix;
            cssData[cssPrefix + 'transition-duration'] = '0s';
            $content.css(cssData);
            $sl_slide.css({'width':pageWidth,'overflow':'hidden'})
            if (opt.vertical) {
                $sl_part.css({'width': pageWidth, 'height': pageHeight});
                if (opt.loop) {
                    var contentCssData = {
                        'width': pageWidth,
                        'height': contentHeight
                    };
                    contentCssData[cssPrefix + 'transform'] = 'translate3d(0,' + -pageHeight + 'px,0)';
                    $content.css(contentCssData);

                } else {
                    $content.css({'width': pageWidth, 'height': contentHeight});

                }
            } else {
                $sl_part.css({'width': pageWidth});
                if (opt.loop) {
                    var contentCssData = {
                        'width': contentWidth,
                        'display':'-webkit-box'
                    };

                    contentCssData[cssPrefix + 'transform'] = 'translate3d(' + -pageWidth + 'px,0,0)';
                    $content.css(contentCssData);

                } else {
                    $content.css({'width': contentWidth,'display':'flex','display':'-webkit-box'});

                }
            }


        }

    },
    interval: function () {
        if (this.opt.autoplay) {
            var $content = $($(this.opt.anchor).children('.sl_slide').children('.sl_content')), windowSize = this.getWindowSize();
            var transitionTime = this.opt.transitionTime, me = this;
            clearInterval(this.intervalNum);
            this.intervalNum = setInterval(function () {
                if (!me.opt.loop && me.activeIndex >= me.num - 1) {
                    me.setTransition($content, transitionTime, 0, 0, 0);
                } else {
                    var translate = me.getTranslate($content);
                    if (me.opt.vertical) {
                        me.addTranslate($content, translate, transitionTime, 0, -windowSize.pageHeight);
                    } else {
                        me.addTranslate($content, translate, transitionTime, -windowSize.pageWidth, 0);
                    }
                }
            }, this.opt.intervalTime);
        }

    },
    onSlideChange: function (fun) {
        this.opt.onSlideChange = fun;
    },
    beforeSlideChange: function (fun) {
        this.opt.beforeSlideChange = fun;
    },
    slideTo: function (n) {
        n = parseInt(n);
        (n >= this.num) && (n = this.num - 1);
        this.opt.beforeSlideChange(this.activeIndex, n);
        this.opt.loop ? this.activeIndex = n + 1 : this.activeIndex = n;
        this.move();
    },
    getActiveSlide: function () {
        return this.slides[this.activeIndex];
    },
    getSlide: function (n) {
        return this.slides[n];
    },
    slideNext: function () {
        this.slideTo(this.pos + 1);
    },
    slidePrev: function () {
        this.slideTo(this.pos - 1);
    },
    fixPosition: function () {
        var me = this, windowSize = me.getWindowSize(), pageWidth = windowSize.pageWidth, pageHeight = windowSize.pageHeight, $content = $(me.ele.children('.sl_slide').children('.sl_content')), _anchor = $(this.opt.anchor);
        if (me.opt.loop) {
            (me.activeIndex > me.num + 1) && (me.activeIndex = me.num + 1);
            if (me.opt.vertical) {
                if (me.activeIndex == 0) {
                    me.setTransition($content, 0, 0, -me.num * pageHeight, 0);
                } else if (me.activeIndex == me.num + 1) {
                    me.setTransition($content, 0, 0, -1 * pageHeight, 0);
                }
            } else {
                if (me.activeIndex == 0) {
                    me.setTransition($content, 0, -me.num * pageWidth, 0, 0);
                } else if (me.activeIndex == me.num + 1) {
                    me.setTransition($content, 0, -1 * pageWidth, 0, 0);
                }
            }
        }


        var pos = 1;
        if (me.opt.loop) {
            if (me.activeIndex < 1) {
                pos = me.num;
            } else if (me.activeIndex > me.num) {
                pos = 1;
            } else {
                pos = me.activeIndex;
            }
            me.pos = pos - 1;
        } else {
            me.pos = me.activeIndex;
        }
        _anchor.find(me.sl_mark + ' span').removeClass('sl_active');
        _anchor.find(me.sl_mark + ' span:nth-child(' + (me.pos + 1) + ')').addClass('sl_active');

    },
    move: function () {
        var me = this, $content = $(me.ele.children('.sl_slide').children('.sl_content')), transitionTime = me.opt.transitionTime, windowSize = me.getWindowSize();
        clearInterval(me.intervalNum);
        if (!me.opt.loop && (me.activeIndex > me.num - 1 || me.activeIndex < 0)) {
            me.interval();
        } else if (me.opt.vertical) {
            me.setTransition($content, transitionTime, 0, -me.activeIndex * windowSize.pageHeight, 0);
        } else {
            me.setTransition($content, transitionTime, -me.activeIndex * windowSize.pageWidth, 0, 0);
        }
    },
    getWindowSize: function () {
        var me = this;
        var base = me.opt.base, pageWidth, pageHeight;
        if (base == 'window') {
            pageWidth = window.innerWidth;
            pageHeight = window.innerHeight;
        } else {
            pageWidth = $(base)[0].offsetWidth;
            pageHeight = $(base)[0].offsetHeight;
        }
        return {pageWidth: pageWidth, pageHeight: pageHeight};
    },
    getTranslate: function (sel) {
        var $sel = $(sel);
        var transformString = $sel.css($.fx.cssPrefix + 'transform');
        if (transformString && transformString != undefined) {
            var translate3d = transformString.split('translate3d')[1];
            if (translate3d && translate3d != undefined) {
                var match = translate3d.match(/-?\d+/g);
                var translateX = parseInt(match[0]), translateY = parseInt(match[1]), translateZ = parseInt(match[2]);
                return {translateX: translateX, translateY: translateY, translateZ: translateZ}
            }

        }
        return {translateX: 0, translateY: 0, translateZ: 0}
    },
    addTranslate: function (sel, translateStart, transitionTime, translateX, translateY, translateZ) {
        var setTranslateX = translateStart.translateX + (translateX || 0),
            setTranslateY = translateStart.translateY + (translateY || 0),
            setTranslateZ = translateStart.translateZ + (translateZ || 0);
        this.setTransition($(sel), transitionTime, setTranslateX, setTranslateY, setTranslateZ);
    },
    setTransitionTime: function (time) {
        this.opt.transitionTime = time;
    },
    setTransition: function (dom, transitionTime, TranslateX, TranslateY, TranslateZ) {
        var $dom = $(dom),
            cssPrefix = $.fx.cssPrefix,
            cssData = {};
        transitionTime = transitionTime || 0;
        TranslateX = TranslateX || 0;
        TranslateY = TranslateY || 0;
        TranslateZ = TranslateZ || 0;
        ($dom.css('transition-duration') !== (transitionTime + 's')) && (cssData[cssPrefix + 'transition-duration'] = transitionTime + 's');
        cssData[cssPrefix + 'transform'] = 'translate3d(' + TranslateX + 'px,' + TranslateY + 'px,' + TranslateZ + 'px)';
        $dom.css(cssData);
    },
    stopTouch: function(){
        this.opt.touchable = false;
    },
    startTouch: function(){
        this.opt.touchable = true;
    }
};