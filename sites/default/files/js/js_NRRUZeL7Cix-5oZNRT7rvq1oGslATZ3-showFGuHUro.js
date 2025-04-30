/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/core/misc/dialog/dialog.js. */
(function($, Drupal, drupalSettings) {
    drupalSettings.dialog = {
        autoOpen: true,
        dialogClass: '',
        buttonClass: 'button',
        buttonPrimaryClass: 'button--primary',
        close: function close(event) {
            Drupal.dialog(event.target).close();
            Drupal.detachBehaviors(event.target, null, 'unload')
        }
    };
    Drupal.dialog = function(element, options) {
        var undef, $element = $(element),
            dialog = {
                open: false,
                returnValue: undef
            }

        function openDialog(settings) {
            settings = $.extend({}, drupalSettings.dialog, options, settings);
            $(window).trigger('dialog:beforecreate', [dialog, $element, settings]);
            $element.dialog(settings);
            dialog.open = true;
            $(window).trigger('dialog:aftercreate', [dialog, $element, settings])
        }

        function closeDialog(value) {
            $(window).trigger('dialog:beforeclose', [dialog, $element]);
            $element.dialog('close');
            dialog.returnValue = value;
            dialog.open = false;
            $(window).trigger('dialog:afterclose', [dialog, $element])
        };
        dialog.show = function() {
            openDialog({
                modal: false
            })
        };
        dialog.showModal = function() {
            openDialog({
                modal: true
            })
        };
        dialog.close = closeDialog;
        return dialog
    }
})(jQuery, Drupal, drupalSettings)
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/core/misc/dialog/dialog.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/core/misc/dialog/dialog.position.js. */
(function($, Drupal, drupalSettings, debounce, displace) {
    drupalSettings.dialog = $.extend({
        autoResize: true,
        maxHeight: '95%'
    }, drupalSettings.dialog)

    function resetPosition(options) {
        var offsets = displace.offsets,
            left = offsets.left - offsets.right,
            top = offsets.top - offsets.bottom,
            leftString = "".concat((left > 0 ? '+' : '-') + Math.abs(Math.round(left / 2)), "px"),
            topString = "".concat((top > 0 ? '+' : '-') + Math.abs(Math.round(top / 2)), "px");
        options.position = {
            my: "center".concat(left !== 0 ? leftString : '', " center").concat(top !== 0 ? topString : ''),
            of: window
        };
        return options
    }

    function resetSize(event) {
        var positionOptions = ['width', 'height', 'minWidth', 'minHeight', 'maxHeight', 'maxWidth', 'position'],
            adjustedOptions = {},
            windowHeight = $(window).height(),
            option, optionValue, adjustedValue;
        for (var n = 0; n < positionOptions.length; n++) {
            option = positionOptions[n];
            optionValue = event.data.settings[option];
            if (optionValue)
                if (typeof optionValue === 'string' && /%$/.test(optionValue) && /height/i.test(option)) {
                    windowHeight -= displace.offsets.top + displace.offsets.bottom;
                    adjustedValue = parseInt(0.01 * parseInt(optionValue, 10) * windowHeight, 10);
                    if (option === 'height' && event.data.$element.parent().outerHeight() < adjustedValue) adjustedValue = 'auto';
                    adjustedOptions[option] = adjustedValue
                }
        };
        if (!event.data.settings.modal) adjustedOptions = resetPosition(adjustedOptions);
        event.data.$element.dialog('option', adjustedOptions).trigger('dialogContentResize')
    };
    $(window).on({
        'dialog:aftercreate': function dialogAftercreate(event, dialog, $element, settings) {
            var autoResize = debounce(resetSize, 20),
                eventData = {
                    settings: settings,
                    $element: $element
                };
            if (settings.autoResize === true || settings.autoResize === 'true') {
                $element.dialog('option', {
                    resizable: false,
                    draggable: false
                }).dialog('widget').css('position', 'fixed');
                $(window).on('resize.dialogResize scroll.dialogResize', eventData, autoResize).trigger('resize.dialogResize');
                $(document).on('drupalViewportOffsetChange.dialogResize', eventData, autoResize)
            }
        },
        'dialog:beforeclose': function dialogBeforeclose(event, dialog, $element) {
            $(window).off('.dialogResize');
            $(document).off('.dialogResize')
        }
    })
})(jQuery, Drupal, drupalSettings, Drupal.debounce, Drupal.displace)
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/core/misc/dialog/dialog.position.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/core/misc/dialog/dialog.jquery-ui.js. */
(function($, _ref) {
    var tabbable = _ref.tabbable,
        isTabbable = _ref.isTabbable;
    $.widget('ui.dialog', $.ui.dialog, {
        options: {
            buttonClass: 'button',
            buttonPrimaryClass: 'button--primary'
        },
        _createButtons: function _createButtons() {
            var opts = this.options,
                primaryIndex, index, il = opts.buttons.length;
            for (index = 0; index < il; index++)
                if (opts.buttons[index].primary && opts.buttons[index].primary === true) {
                    primaryIndex = index;
                    delete opts.buttons[index].primary;
                    break
                };
            this._super();
            var $buttons = this.uiButtonSet.children().addClass(opts.buttonClass);
            if (typeof primaryIndex !== 'undefined') $buttons.eq(index).addClass(opts.buttonPrimaryClass)
        },
        _focusTabbable: function _focusTabbable() {
            var hasFocus = this._focusedElement ? this._focusedElement.get(0) : null;
            if (!hasFocus) hasFocus = this.element.find('[autofocus]').get(0);
            if (!hasFocus) {
                var $elements = [this.element, this.uiDialogButtonPane];
                for (var i = 0; i < $elements.length; i++) {
                    var element = $elements[i].get(0);
                    if (element) {
                        var elementTabbable = tabbable(element);
                        hasFocus = elementTabbable.length ? elementTabbable[0] : null
                    };
                    if (hasFocus) break
                }
            };
            if (!hasFocus) {
                var closeBtn = this.uiDialogTitlebarClose.get(0);
                hasFocus = closeBtn && isTabbable(closeBtn) ? closeBtn : null
            };
            if (!hasFocus) hasFocus = this.uiDialog.get(0);
            $(hasFocus).eq(0).trigger('focus')
        }
    })
})(jQuery, window.tabbable)
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/core/misc/dialog/dialog.jquery-ui.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/core/modules/ckeditor5/js/ckeditor5.dialog.fix.js. */
(function($) {
    $.widget('ui.dialog', $.ui.dialog, {
        _allowInteraction: function _allowInteraction(event) {
            return event.target.classList.contains('ck') || this._super(event)
        }
    })
})(jQuery)
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/core/modules/ckeditor5/js/ckeditor5.dialog.fix.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/core/misc/dialog/dialog.ajax.js. */
(function($, Drupal) {
    Drupal.behaviors.dialog = {
        attach: function attach(context, settings) {
            var $context = $(context);
            if (!$('#drupal-modal').length) $('<div id="drupal-modal" class="ui-front"></div>').hide().appendTo('body');
            var $dialog = $context.closest('.ui-dialog-content');
            if ($dialog.length) {
                if ($dialog.dialog('option', 'drupalAutoButtons')) $dialog.trigger('dialogButtonsChange');
                $dialog.dialog('widget').trigger('focus')
            };
            var originalClose = settings.dialog.close;
            settings.dialog.close = function(event) {
                for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
                originalClose.apply(settings.dialog, [event].concat(args));
                $(event.target).remove()
            }
        },
        prepareDialogButtons: function prepareDialogButtons($dialog) {
            var buttons = [],
                $buttons = $dialog.find('.form-actions input[type=submit], .form-actions a.button');
            $buttons.each(function() {
                var $originalButton = $(this).css({
                    display: 'none'
                });
                buttons.push({
                    text: $originalButton.html() || $originalButton.attr('value'),
                    class: $originalButton.attr('class'),
                    click: function click(e) {
                        if ($originalButton.is('a')) {
                            $originalButton[0].click()
                        } else {
                            $originalButton.trigger('mousedown').trigger('mouseup').trigger('click');
                            e.preventDefault()
                        }
                    }
                })
            });
            return buttons
        }
    };
    Drupal.AjaxCommands.prototype.openDialog = function(ajax, response, status) {
        if (!response.selector) return false;
        var $dialog = $(response.selector);
        if (!$dialog.length) $dialog = $("<div id=\"".concat(response.selector.replace(/^#/, ''), "\" class=\"ui-front\"></div>")).appendTo('body');
        if (!ajax.wrapper) ajax.wrapper = $dialog.attr('id');
        response.command = 'insert';
        response.method = 'html';
        ajax.commands.insert(ajax, response, status);
        if (!response.dialogOptions.buttons) {
            response.dialogOptions.drupalAutoButtons = true;
            response.dialogOptions.buttons = Drupal.behaviors.dialog.prepareDialogButtons($dialog)
        };
        $dialog.on('dialogButtonsChange', function() {
            var buttons = Drupal.behaviors.dialog.prepareDialogButtons($dialog);
            $dialog.dialog('option', 'buttons', buttons)
        });
        response.dialogOptions = response.dialogOptions || {};
        var dialog = Drupal.dialog($dialog.get(0), response.dialogOptions);
        if (response.dialogOptions.modal) {
            dialog.showModal()
        } else dialog.show();
        $dialog.parent().find('.ui-dialog-buttonset').addClass('form-actions')
    };
    Drupal.AjaxCommands.prototype.closeDialog = function(ajax, response, status) {
        var $dialog = $(response.selector);
        if ($dialog.length) {
            Drupal.dialog($dialog.get(0)).close();
            if (!response.persist) $dialog.remove()
        };
        $dialog.off('dialogButtonsChange')
    };
    Drupal.AjaxCommands.prototype.setDialogOption = function(ajax, response, status) {
        var $dialog = $(response.selector);
        if ($dialog.length) $dialog.dialog('option', response.optionName, response.optionValue)
    };
    $(window).on('dialog:aftercreate', function(e, dialog, $element, settings) {
        $element.on('click.dialog', '.dialog-cancel', function(e) {
            dialog.close('cancel');
            e.preventDefault();
            e.stopPropagation()
        })
    });
    $(window).on('dialog:beforeclose', function(e, dialog, $element) {
        $element.off('.dialog')
    })
})(jQuery, Drupal)
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/core/misc/dialog/dialog.ajax.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/themes/custom/fortis/libs/slick/js/slick.min.js. */
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.9.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
(function(i) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery)
})(function(i) {
    "use strict";
    var e = window.Slick || {};
    e = function() {
        function e(e, o) {
            var s, n = this;
            n.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: i(e),
                appendDots: i(e),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(e, t) {
                    return i('<button type="button" />').text(t + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, n.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: !1,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                swiping: !1,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, i.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = i(e), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, s = i(e).data("slick") || {}, n.options = i.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, "undefined" != typeof document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = i.proxy(n.autoPlay, n), n.autoPlayClear = i.proxy(n.autoPlayClear, n), n.autoPlayIterator = i.proxy(n.autoPlayIterator, n), n.changeSlide = i.proxy(n.changeSlide, n), n.clickHandler = i.proxy(n.clickHandler, n), n.selectHandler = i.proxy(n.selectHandler, n), n.setPosition = i.proxy(n.setPosition, n), n.swipeHandler = i.proxy(n.swipeHandler, n), n.dragHandler = i.proxy(n.dragHandler, n), n.keyHandler = i.proxy(n.keyHandler, n), n.instanceUid = t++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0)
        }
        var t = 0;
        return e
    }(), e.prototype.activateADA = function() {
        var i = this;
        i.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }, e.prototype.addSlide = e.prototype.slickAdd = function(e, t, o) {
        var s = this;
        if ("boolean" == typeof t) o = t, t = null;
        else if (t < 0 || t >= s.slideCount) return !1;
        s.unload(), "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : o === !0 ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function(e, t) {
            i(t).attr("data-slick-index", e)
        }), s.$slidesCache = s.$slides, s.reinit()
    }, e.prototype.animateHeight = function() {
        var i = this;
        if (1 === i.options.slidesToShow && i.options.adaptiveHeight === !0 && i.options.vertical === !1) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.animate({
                height: e
            }, i.options.speed)
        }
    }, e.prototype.animateSlide = function(e, t) {
        var o = {},
            s = this;
        s.animateHeight(), s.options.rtl === !0 && s.options.vertical === !1 && (e = -e), s.transformsEnabled === !1 ? s.options.vertical === !1 ? s.$slideTrack.animate({
            left: e
        }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({
            top: e
        }, s.options.speed, s.options.easing, t) : s.cssTransitions === !1 ? (s.options.rtl === !0 && (s.currentLeft = -s.currentLeft), i({
            animStart: s.currentLeft
        }).animate({
            animStart: e
        }, {
            duration: s.options.speed,
            easing: s.options.easing,
            step: function(i) {
                i = Math.ceil(i), s.options.vertical === !1 ? (o[s.animType] = "translate(" + i + "px, 0px)", s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)", s.$slideTrack.css(o))
            },
            complete: function() {
                t && t.call()
            }
        })) : (s.applyTransition(), e = Math.ceil(e), s.options.vertical === !1 ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)", s.$slideTrack.css(o), t && setTimeout(function() {
            s.disableTransition(), t.call()
        }, s.options.speed))
    }, e.prototype.getNavTarget = function() {
        var e = this,
            t = e.options.asNavFor;
        return t && null !== t && (t = i(t).not(e.$slider)), t
    }, e.prototype.asNavFor = function(e) {
        var t = this,
            o = t.getNavTarget();
        null !== o && "object" == typeof o && o.each(function() {
            var t = i(this).slick("getSlick");
            t.unslicked || t.slideHandler(e, !0)
        })
    }, e.prototype.applyTransition = function(i) {
        var e = this,
            t = {};
        e.options.fade === !1 ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, e.options.fade === !1 ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }, e.prototype.autoPlay = function() {
        var i = this;
        i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed))
    }, e.prototype.autoPlayClear = function() {
        var i = this;
        i.autoPlayTimer && clearInterval(i.autoPlayTimer)
    }, e.prototype.autoPlayIterator = function() {
        var i = this,
            e = i.currentSlide + i.options.slidesToScroll;
        i.paused || i.interrupted || i.focussed || (i.options.infinite === !1 && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, i.currentSlide - 1 === 0 && (i.direction = 1))), i.slideHandler(e))
    }, e.prototype.buildArrows = function() {
        var e = this;
        e.options.arrows === !0 && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), e.options.infinite !== !0 && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, e.prototype.buildDots = function() {
        var e, t, o = this;
        if (o.options.dots === !0 && o.slideCount > o.options.slidesToShow) {
            for (o.$slider.addClass("slick-dotted"), t = i("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1) t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
            o.$dots = t.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active")
        }
    }, e.prototype.buildOut = function() {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function(e, t) {
            i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "")
        }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), e.options.centerMode !== !0 && e.options.swipeToSlide !== !0 || (e.options.slidesToScroll = 1), i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.options.draggable === !0 && e.$list.addClass("draggable")
    }, e.prototype.buildRows = function() {
        var i, e, t, o, s, n, r, l = this;
        if (o = document.createDocumentFragment(), n = l.$slider.children(), l.options.rows > 0) {
            for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; i < s; i++) {
                var d = document.createElement("div");
                for (e = 0; e < l.options.rows; e++) {
                    var a = document.createElement("div");
                    for (t = 0; t < l.options.slidesPerRow; t++) {
                        var c = i * r + (e * l.options.slidesPerRow + t);
                        n.get(c) && a.appendChild(n.get(c))
                    }
                    d.appendChild(a)
                }
                o.appendChild(d)
            }
            l.$slider.empty().append(o), l.$slider.children().children().children().css({
                width: 100 / l.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, e.prototype.checkResponsive = function(e, t) {
        var o, s, n, r = this,
            l = !1,
            d = r.$slider.width(),
            a = window.innerWidth || i(window).width();
        if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
            s = null;
            for (o in r.breakpoints) r.breakpoints.hasOwnProperty(o) && (r.originalSettings.mobileFirst === !1 ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
            null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e), l = s), e || l === !1 || r.$slider.trigger("breakpoint", [r, l])
        }
    }, e.prototype.changeSlide = function(e, t) {
        var o, s, n, r = this,
            l = i(e.currentTarget);
        switch (l.is("a") && e.preventDefault(), l.is("li") || (l = l.closest("li")), n = r.slideCount % r.options.slidesToScroll !== 0, o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
            case "previous":
                s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t);
                break;
            case "next":
                s = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t);
                break;
            case "index":
                var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
                r.slideHandler(r.checkNavigable(d), !1, t), l.children().trigger("focus");
                break;
            default:
                return
        }
    }, e.prototype.checkNavigable = function(i) {
        var e, t, o = this;
        if (e = o.getNavigableIndexes(), t = 0, i > e[e.length - 1]) i = e[e.length - 1];
        else
            for (var s in e) {
                if (i < e[s]) {
                    i = t;
                    break
                }
                t = e[s]
            }
        return i
    }, e.prototype.cleanUpEvents = function() {
        var e = this;
        e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)), e.options.accessibility === !0 && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), e.options.accessibility === !0 && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), i(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), e.options.accessibility === !0 && e.$list.off("keydown.slick", e.keyHandler), e.options.focusOnSelect === !0 && i(e.$slideTrack).children().off("click.slick", e.selectHandler), i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), i(window).off("resize.slick.slick-" + e.instanceUid, e.resize), i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
    }, e.prototype.cleanUpSlideEvents = function() {
        var e = this;
        e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1))
    }, e.prototype.cleanUpRows = function() {
        var i, e = this;
        e.options.rows > 0 && (i = e.$slides.children().children(), i.removeAttr("style"), e.$slider.empty().append(i))
    }, e.prototype.clickHandler = function(i) {
        var e = this;
        e.shouldClick === !1 && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault())
    }, e.prototype.destroy = function(e) {
        var t = this;
        t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), i(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            i(this).attr("style", i(this).data("originalStyling"))
        }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t])
    }, e.prototype.disableTransition = function(i) {
        var e = this,
            t = {};
        t[e.transitionType] = "", e.options.fade === !1 ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }, e.prototype.fadeSlide = function(i, e) {
        var t = this;
        t.cssTransitions === !1 ? (t.$slides.eq(i).css({
            zIndex: t.options.zIndex
        }), t.$slides.eq(i).animate({
            opacity: 1
        }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css({
            opacity: 1,
            zIndex: t.options.zIndex
        }), e && setTimeout(function() {
            t.disableTransition(i), e.call()
        }, t.options.speed))
    }, e.prototype.fadeSlideOut = function(i) {
        var e = this;
        e.cssTransitions === !1 ? e.$slides.eq(i).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }))
    }, e.prototype.filterSlides = e.prototype.slickFilter = function(i) {
        var e = this;
        null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit())
    }, e.prototype.focusHandler = function() {
        var e = this;
        e.$slider.off("focus.slick blur.slick").on("focus.slick", "*", function(t) {
            var o = i(this);
            setTimeout(function() {
                e.options.pauseOnFocus && o.is(":focus") && (e.focussed = !0, e.autoPlay())
            }, 0)
        }).on("blur.slick", "*", function(t) {
            i(this);
            e.options.pauseOnFocus && (e.focussed = !1, e.autoPlay())
        })
    }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() {
        var i = this;
        return i.currentSlide
    }, e.prototype.getDotCount = function() {
        var i = this,
            e = 0,
            t = 0,
            o = 0;
        if (i.options.infinite === !0)
            if (i.slideCount <= i.options.slidesToShow) ++o;
            else
                for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else if (i.options.centerMode === !0) o = i.slideCount;
        else if (i.options.asNavFor)
            for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
        return o - 1
    }, e.prototype.getLeft = function(i) {
        var e, t, o, s, n = this,
            r = 0;
        return n.slideOffset = 0, t = n.$slides.first().outerHeight(!0), n.options.infinite === !0 ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = -1, n.options.vertical === !0 && n.options.centerMode === !0 && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)), r = t * n.options.slidesToShow * s), n.slideCount % n.options.slidesToScroll !== 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1, r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth, r = (i + n.options.slidesToShow - n.slideCount) * t), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, r = 0), n.options.centerMode === !0 && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : n.options.centerMode === !0 && n.options.infinite === !0 ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : n.options.centerMode === !0 && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = n.options.vertical === !1 ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r, n.options.variableWidth === !0 && (o = n.slideCount <= n.options.slidesToShow || n.options.infinite === !1 ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow), e = n.options.rtl === !0 ? o[0] ? (n.$slideTrack.width() - o[0].offsetLeft - o.width()) * -1 : 0 : o[0] ? o[0].offsetLeft * -1 : 0, n.options.centerMode === !0 && (o = n.slideCount <= n.options.slidesToShow || n.options.infinite === !1 ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1), e = n.options.rtl === !0 ? o[0] ? (n.$slideTrack.width() - o[0].offsetLeft - o.width()) * -1 : 0 : o[0] ? o[0].offsetLeft * -1 : 0, e += (n.$list.width() - o.outerWidth()) / 2)), e
    }, e.prototype.getOption = e.prototype.slickGetOption = function(i) {
        var e = this;
        return e.options[i]
    }, e.prototype.getNavigableIndexes = function() {
        var i, e = this,
            t = 0,
            o = 0,
            s = [];
        for (e.options.infinite === !1 ? i = e.slideCount : (t = e.options.slidesToScroll * -1, o = e.options.slidesToScroll * -1, i = 2 * e.slideCount); t < i;) s.push(t), t = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        return s
    }, e.prototype.getSlick = function() {
        return this
    }, e.prototype.getSlideCount = function() {
        var e, t, o, s, n = this;
        return s = n.options.centerMode === !0 ? Math.floor(n.$list.width() / 2) : 0, o = n.swipeLeft * -1 + s, n.options.swipeToSlide === !0 ? (n.$slideTrack.find(".slick-slide").each(function(e, s) {
            var r, l, d;
            if (r = i(s).outerWidth(), l = s.offsetLeft, n.options.centerMode !== !0 && (l += r / 2), d = l + r, o < d) return t = s, !1
        }), e = Math.abs(i(t).attr("data-slick-index") - n.currentSlide) || 1) : n.options.slidesToScroll
    }, e.prototype.goTo = e.prototype.slickGoTo = function(i, e) {
        var t = this;
        t.changeSlide({
            data: {
                message: "index",
                index: parseInt(i)
            }
        }, e)
    }, e.prototype.init = function(e) {
        var t = this;
        i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), t.options.accessibility === !0 && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay())
    }, e.prototype.initADA = function() {
        var e = this,
            t = Math.ceil(e.slideCount / e.options.slidesToShow),
            o = e.getNavigableIndexes().filter(function(i) {
                return i >= 0 && i < e.slideCount
            });
        e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t) {
            var s = o.indexOf(t);
            if (i(this).attr({
                    role: "tabpanel",
                    id: "slick-slide" + e.instanceUid + t,
                    tabindex: -1
                }), s !== -1) {
                var n = "slick-slide-control" + e.instanceUid + s;
                i("#" + n).length && i(this).attr({
                    "aria-describedby": n
                })
            }
        }), e.$dots.attr("role", "tablist").find("li").each(function(s) {
            var n = o[s];
            i(this).attr({
                role: "presentation"
            }), i(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + e.instanceUid + s,
                "aria-controls": "slick-slide" + e.instanceUid + n,
                "aria-label": s + 1 + " of " + t,
                "aria-selected": null,
                tabindex: "-1"
            })
        }).eq(e.currentSlide).find("button").attr({
            "aria-selected": "true",
            tabindex: "0"
        }).end());
        for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++) e.options.focusOnChange ? e.$slides.eq(s).attr({
            tabindex: "0"
        }) : e.$slides.eq(s).removeAttr("tabindex");
        e.activateADA()
    }, e.prototype.initArrowEvents = function() {
        var i = this;
        i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, i.changeSlide), i.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, i.changeSlide), i.options.accessibility === !0 && (i.$prevArrow.on("keydown.slick", i.keyHandler), i.$nextArrow.on("keydown.slick", i.keyHandler)))
    }, e.prototype.initDotEvents = function() {
        var e = this;
        e.options.dots === !0 && e.slideCount > e.options.slidesToShow && (i("li", e.$dots).on("click.slick", {
            message: "index"
        }, e.changeSlide), e.options.accessibility === !0 && e.$dots.on("keydown.slick", e.keyHandler)), e.options.dots === !0 && e.options.pauseOnDotsHover === !0 && e.slideCount > e.options.slidesToShow && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1))
    }, e.prototype.initSlideEvents = function() {
        var e = this;
        e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)))
    }, e.prototype.initializeEvents = function() {
        var e = this;
        e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), i(document).on(e.visibilityChange, i.proxy(e.visibility, e)), e.options.accessibility === !0 && e.$list.on("keydown.slick", e.keyHandler), e.options.focusOnSelect === !0 && i(e.$slideTrack).children().on("click.slick", e.selectHandler), i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)), i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)), i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), i(e.setPosition)
    }, e.prototype.initUI = function() {
        var i = this;
        i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), i.options.dots === !0 && i.slideCount > i.options.slidesToShow && i.$dots.show()
    }, e.prototype.keyHandler = function(i) {
        var e = this;
        i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && e.options.accessibility === !0 ? e.changeSlide({
            data: {
                message: e.options.rtl === !0 ? "next" : "previous"
            }
        }) : 39 === i.keyCode && e.options.accessibility === !0 && e.changeSlide({
            data: {
                message: e.options.rtl === !0 ? "previous" : "next"
            }
        }))
    }, e.prototype.lazyLoad = function() {
        function e(e) {
            i("img[data-lazy]", e).each(function() {
                var e = i(this),
                    t = i(this).attr("data-lazy"),
                    o = i(this).attr("data-srcset"),
                    s = i(this).attr("data-sizes") || r.$slider.attr("data-sizes"),
                    n = document.createElement("img");
                n.onload = function() {
                    e.animate({
                        opacity: 0
                    }, 100, function() {
                        o && (e.attr("srcset", o), s && e.attr("sizes", s)), e.attr("src", t).animate({
                            opacity: 1
                        }, 200, function() {
                            e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        }), r.$slider.trigger("lazyLoaded", [r, e, t])
                    })
                }, n.onerror = function() {
                    e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), r.$slider.trigger("lazyLoadError", [r, e, t])
                }, n.src = t
            })
        }
        var t, o, s, n, r = this;
        if (r.options.centerMode === !0 ? r.options.infinite === !0 ? (s = r.currentSlide + (r.options.slidesToShow / 2 + 1), n = s + r.options.slidesToShow + 2) : (s = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1)), n = 2 + (r.options.slidesToShow / 2 + 1) + r.currentSlide) : (s = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide, n = Math.ceil(s + r.options.slidesToShow), r.options.fade === !0 && (s > 0 && s--, n <= r.slideCount && n++)), t = r.$slider.find(".slick-slide").slice(s, n), "anticipated" === r.options.lazyLoad)
            for (var l = s - 1, d = n, a = r.$slider.find(".slick-slide"), c = 0; c < r.options.slidesToScroll; c++) l < 0 && (l = r.slideCount - 1), t = t.add(a.eq(l)), t = t.add(a.eq(d)), l--, d++;
        e(t), r.slideCount <= r.options.slidesToShow ? (o = r.$slider.find(".slick-slide"), e(o)) : r.currentSlide >= r.slideCount - r.options.slidesToShow ? (o = r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow), e(o)) : 0 === r.currentSlide && (o = r.$slider.find(".slick-cloned").slice(r.options.slidesToShow * -1), e(o))
    }, e.prototype.loadSlider = function() {
        var i = this;
        i.setPosition(), i.$slideTrack.css({
            opacity: 1
        }), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad()
    }, e.prototype.next = e.prototype.slickNext = function() {
        var i = this;
        i.changeSlide({
            data: {
                message: "next"
            }
        })
    }, e.prototype.orientationChange = function() {
        var i = this;
        i.checkResponsive(), i.setPosition()
    }, e.prototype.pause = e.prototype.slickPause = function() {
        var i = this;
        i.autoPlayClear(), i.paused = !0
    }, e.prototype.play = e.prototype.slickPlay = function() {
        var i = this;
        i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1
    }, e.prototype.postSlide = function(e) {
        var t = this;
        if (!t.unslicked && (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), t.options.accessibility === !0 && (t.initADA(), t.options.focusOnChange))) {
            var o = i(t.$slides.get(t.currentSlide));
            o.attr("tabindex", 0).focus()
        }
    }, e.prototype.prev = e.prototype.slickPrev = function() {
        var i = this;
        i.changeSlide({
            data: {
                message: "previous"
            }
        })
    }, e.prototype.preventDefault = function(i) {
        i.preventDefault()
    }, e.prototype.progressiveLazyLoad = function(e) {
        e = e || 1;
        var t, o, s, n, r, l = this,
            d = i("img[data-lazy]", l.$slider);
        d.length ? (t = d.first(), o = t.attr("data-lazy"), s = t.attr("data-srcset"), n = t.attr("data-sizes") || l.$slider.attr("data-sizes"), r = document.createElement("img"), r.onload = function() {
            s && (t.attr("srcset", s), n && t.attr("sizes", n)), t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), l.options.adaptiveHeight === !0 && l.setPosition(), l.$slider.trigger("lazyLoaded", [l, t, o]), l.progressiveLazyLoad()
        }, r.onerror = function() {
            e < 3 ? setTimeout(function() {
                l.progressiveLazyLoad(e + 1)
            }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, t, o]), l.progressiveLazyLoad())
        }, r.src = o) : l.$slider.trigger("allImagesLoaded", [l])
    }, e.prototype.refresh = function(e) {
        var t, o, s = this;
        o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), t = s.currentSlide, s.destroy(!0), i.extend(s, s.initials, {
            currentSlide: t
        }), s.init(), e || s.changeSlide({
            data: {
                message: "index",
                index: t
            }
        }, !1)
    }, e.prototype.registerBreakpoints = function() {
        var e, t, o, s = this,
            n = s.options.responsive || null;
        if ("array" === i.type(n) && n.length) {
            s.respondTo = s.options.respondTo || "window";
            for (e in n)
                if (o = s.breakpoints.length - 1, n.hasOwnProperty(e)) {
                    for (t = n[e].breakpoint; o >= 0;) s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--;
                    s.breakpoints.push(t), s.breakpointSettings[t] = n[e].settings
                }
            s.breakpoints.sort(function(i, e) {
                return s.options.mobileFirst ? i - e : e - i
            })
        }
    }, e.prototype.reinit = function() {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), e.options.focusOnSelect === !0 && i(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
    }, e.prototype.resize = function() {
        var e = this;
        i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() {
            e.windowWidth = i(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
        }, 50))
    }, e.prototype.removeSlide = e.prototype.slickRemove = function(i, e, t) {
        var o = this;
        return "boolean" == typeof i ? (e = i, i = e === !0 ? 0 : o.slideCount - 1) : i = e === !0 ? --i : i, !(o.slideCount < 1 || i < 0 || i > o.slideCount - 1) && (o.unload(), t === !0 ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, void o.reinit())
    }, e.prototype.setCSS = function(i) {
        var e, t, o = this,
            s = {};
        o.options.rtl === !0 && (i = -i), e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px", t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px", s[o.positionProp] = i, o.transformsEnabled === !1 ? o.$slideTrack.css(s) : (s = {}, o.cssTransitions === !1 ? (s[o.animType] = "translate(" + e + ", " + t + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)", o.$slideTrack.css(s)))
    }, e.prototype.setDimensions = function() {
        var i = this;
        i.options.vertical === !1 ? i.options.centerMode === !0 && i.$list.css({
            padding: "0px " + i.options.centerPadding
        }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), i.options.centerMode === !0 && i.$list.css({
            padding: i.options.centerPadding + " 0px"
        })), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), i.options.vertical === !1 && i.options.variableWidth === !1 ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : i.options.variableWidth === !0 ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
        var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
        i.options.variableWidth === !1 && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e)
    }, e.prototype.setFade = function() {
        var e, t = this;
        t.$slides.each(function(o, s) {
            e = t.slideWidth * o * -1, t.options.rtl === !0 ? i(s).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            }) : i(s).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            })
        }), t.$slides.eq(t.currentSlide).css({
            zIndex: t.options.zIndex - 1,
            opacity: 1
        })
    }, e.prototype.setHeight = function() {
        var i = this;
        if (1 === i.options.slidesToShow && i.options.adaptiveHeight === !0 && i.options.vertical === !1) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.css("height", e)
        }
    }, e.prototype.setOption = e.prototype.slickSetOption = function() {
        var e, t, o, s, n, r = this,
            l = !1;
        if ("object" === i.type(arguments[0]) ? (o = arguments[0], l = arguments[1], n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0], s = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : "undefined" != typeof arguments[1] && (n = "single")), "single" === n) r.options[o] = s;
        else if ("multiple" === n) i.each(o, function(i, e) {
            r.options[i] = e
        });
        else if ("responsive" === n)
            for (t in s)
                if ("array" !== i.type(r.options.responsive)) r.options.responsive = [s[t]];
                else {
                    for (e = r.options.responsive.length - 1; e >= 0;) r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), e--;
                    r.options.responsive.push(s[t])
                }
        l && (r.unload(), r.reinit())
    }, e.prototype.setPosition = function() {
        var i = this;
        i.setDimensions(), i.setHeight(), i.options.fade === !1 ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i])
    }, e.prototype.setProps = function() {
        var i = this,
            e = document.body.style;
        i.positionProp = i.options.vertical === !0 ? "top" : "left",
            "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || i.options.useCSS === !0 && (i.cssTransitions = !0), i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), void 0 !== e.transform && i.animType !== !1 && (i.animType = "transform", i.transformType = "transform", i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && i.animType !== !1
    }, e.prototype.setSlideClasses = function(i) {
        var e, t, o, s, n = this;
        if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(i).addClass("slick-current"), n.options.centerMode === !0) {
            var r = n.options.slidesToShow % 2 === 0 ? 1 : 0;
            e = Math.floor(n.options.slidesToShow / 2), n.options.infinite === !0 && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i, t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(i).addClass("slick-center")
        } else i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = n.options.infinite === !0 ? n.options.slidesToShow + i : i, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad()
    }, e.prototype.setupInfinite = function() {
        var e, t, o, s = this;
        if (s.options.fade === !0 && (s.options.centerMode = !1), s.options.infinite === !0 && s.options.fade === !1 && (t = null, s.slideCount > s.options.slidesToShow)) {
            for (o = s.options.centerMode === !0 ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - o; e -= 1) t = e - 1, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
            for (e = 0; e < o + s.slideCount; e += 1) t = e, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
            s.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                i(this).attr("id", "")
            })
        }
    }, e.prototype.interrupt = function(i) {
        var e = this;
        i || e.autoPlay(), e.interrupted = i
    }, e.prototype.selectHandler = function(e) {
        var t = this,
            o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"),
            s = parseInt(o.attr("data-slick-index"));
        return s || (s = 0), t.slideCount <= t.options.slidesToShow ? void t.slideHandler(s, !1, !0) : void t.slideHandler(s)
    }, e.prototype.slideHandler = function(i, e, t) {
        var o, s, n, r, l, d = null,
            a = this;
        if (e = e || !1, !(a.animating === !0 && a.options.waitForAnimate === !0 || a.options.fade === !0 && a.currentSlide === i)) return e === !1 && a.asNavFor(i), o = i, d = a.getLeft(o), r = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft, a.options.infinite === !1 && a.options.centerMode === !1 && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll) ? void(a.options.fade === !1 && (o = a.currentSlide, t !== !0 && a.slideCount > a.options.slidesToShow ? a.animateSlide(r, function() {
            a.postSlide(o)
        }) : a.postSlide(o))) : a.options.infinite === !1 && a.options.centerMode === !0 && (i < 0 || i > a.slideCount - a.options.slidesToScroll) ? void(a.options.fade === !1 && (o = a.currentSlide, t !== !0 && a.slideCount > a.options.slidesToShow ? a.animateSlide(r, function() {
            a.postSlide(o)
        }) : a.postSlide(o))) : (a.options.autoplay && clearInterval(a.autoPlayTimer), s = o < 0 ? a.slideCount % a.options.slidesToScroll !== 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll !== 0 ? 0 : o - a.slideCount : o, a.animating = !0, a.$slider.trigger("beforeChange", [a, a.currentSlide, s]), n = a.currentSlide, a.currentSlide = s, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (l = a.getNavTarget(), l = l.slick("getSlick"), l.slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide)), a.updateDots(), a.updateArrows(), a.options.fade === !0 ? (t !== !0 ? (a.fadeSlideOut(n), a.fadeSlide(s, function() {
            a.postSlide(s)
        })) : a.postSlide(s), void a.animateHeight()) : void(t !== !0 && a.slideCount > a.options.slidesToShow ? a.animateSlide(d, function() {
            a.postSlide(s)
        }) : a.postSlide(s)))
    }, e.prototype.startLoad = function() {
        var i = this;
        i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()), i.options.dots === !0 && i.slideCount > i.options.slidesToShow && i.$dots.hide(), i.$slider.addClass("slick-loading")
    }, e.prototype.swipeDirection = function() {
        var i, e, t, o, s = this;
        return i = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, t = Math.atan2(e, i), o = Math.round(180 * t / Math.PI), o < 0 && (o = 360 - Math.abs(o)), o <= 45 && o >= 0 ? s.options.rtl === !1 ? "left" : "right" : o <= 360 && o >= 315 ? s.options.rtl === !1 ? "left" : "right" : o >= 135 && o <= 225 ? s.options.rtl === !1 ? "right" : "left" : s.options.verticalSwiping === !0 ? o >= 35 && o <= 135 ? "down" : "up" : "vertical"
    }, e.prototype.swipeEnd = function(i) {
        var e, t, o = this;
        if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1, !1;
        if (o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX) return !1;
        if (o.touchObject.edgeHit === !0 && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
            switch (t = o.swipeDirection()) {
                case "left":
                case "down":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1
            }
            "vertical" != t && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, t]))
        } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {})
    }, e.prototype.swipeHandler = function(i) {
        var e = this;
        if (!(e.options.swipe === !1 || "ontouchend" in document && e.options.swipe === !1 || e.options.draggable === !1 && i.type.indexOf("mouse") !== -1)) switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, e.options.verticalSwiping === !0 && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), i.data.action) {
            case "start":
                e.swipeStart(i);
                break;
            case "move":
                e.swipeMove(i);
                break;
            case "end":
                e.swipeEnd(i)
        }
    }, e.prototype.swipeMove = function(i) {
        var e, t, o, s, n, r, l = this;
        return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide), l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX, l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY, l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))), !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0, !1) : (l.options.verticalSwiping === !0 && (l.touchObject.swipeLength = r), t = l.swipeDirection(), void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0, i.preventDefault()), s = (l.options.rtl === !1 ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1), l.options.verticalSwiping === !0 && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1), o = l.touchObject.swipeLength, l.touchObject.edgeHit = !1, l.options.infinite === !1 && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction, l.touchObject.edgeHit = !0), l.options.vertical === !1 ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s, l.options.verticalSwiping === !0 && (l.swipeLeft = e + o * s), l.options.fade !== !0 && l.options.touchMove !== !1 && (l.animating === !0 ? (l.swipeLeft = null, !1) : void l.setCSS(l.swipeLeft))))
    }, e.prototype.swipeStart = function(i) {
        var e, t = this;
        return t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow ? (t.touchObject = {}, !1) : (void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY, void(t.dragging = !0))
    }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
        var i = this;
        null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit())
    }, e.prototype.unload = function() {
        var e = this;
        i(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, e.prototype.unslick = function(i) {
        var e = this;
        e.$slider.trigger("unslick", [e, i]), e.destroy()
    }, e.prototype.updateArrows = function() {
        var i, e = this;
        i = Math.floor(e.options.slidesToShow / 2), e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && e.options.centerMode === !1 ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && e.options.centerMode === !0 && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, e.prototype.updateDots = function() {
        var i = this;
        null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"))
    }, e.prototype.visibility = function() {
        var i = this;
        i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1)
    }, i.fn.slick = function() {
        var i, t, o = this,
            s = arguments[0],
            n = Array.prototype.slice.call(arguments, 1),
            r = o.length;
        for (i = 0; i < r; i++)
            if ("object" == typeof s || "undefined" == typeof s ? o[i].slick = new e(o[i], s) : t = o[i].slick[s].apply(o[i].slick, n), "undefined" != typeof t) return t;
        return o
    }
});
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/themes/custom/fortis/libs/slick/js/slick.min.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/themes/custom/fortis/libs/mscrollbar/js/jquery.mCustomScrollbar.concat.min.js. */
/* == jquery mousewheel plugin == Version: 3.1.13, License: MIT License (MIT) */
! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a : a(jQuery)
}(function(a) {
    function b(b) {
        var g = b || window.event,
            h = i.call(arguments, 1),
            j = 0,
            l = 0,
            m = 0,
            n = 0,
            o = 0,
            p = 0;
        if (b = a.event.fix(g), b.type = "mousewheel", "detail" in g && (m = -1 * g.detail), "wheelDelta" in g && (m = g.wheelDelta), "wheelDeltaY" in g && (m = g.wheelDeltaY), "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX), "axis" in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m, m = 0), j = 0 === m ? l : m, "deltaY" in g && (m = -1 * g.deltaY, j = m), "deltaX" in g && (l = g.deltaX, 0 === m && (j = -1 * l)), 0 !== m || 0 !== l) {
            if (1 === g.deltaMode) {
                var q = a.data(this, "mousewheel-line-height");
                j *= q, m *= q, l *= q
            } else if (2 === g.deltaMode) {
                var r = a.data(this, "mousewheel-page-height");
                j *= r, m *= r, l *= r
            }
            if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f /= 40)), d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? "floor" : "ceil"](j / f), l = Math[l >= 1 ? "floor" : "ceil"](l / f), m = Math[m >= 1 ? "floor" : "ceil"](m / f), k.settings.normalizeOffset && this.getBoundingClientRect) {
                var s = this.getBoundingClientRect();
                o = b.clientX - s.left, p = b.clientY - s.top
            }
            return b.deltaX = l, b.deltaY = m, b.deltaFactor = f, b.offsetX = o, b.offsetY = p, b.deltaMode = 0, h.unshift(b, j, l, m), e && clearTimeout(e), e = setTimeout(c, 200), (a.event.dispatch || a.event.handle).apply(this, h)
        }
    }

    function c() {
        f = null
    }

    function d(a, b) {
        return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0
    }
    var e, f, g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        i = Array.prototype.slice;
    if (a.event.fixHooks)
        for (var j = g.length; j;) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
    var k = a.event.special.mousewheel = {
        version: "3.1.12",
        setup: function() {
            if (this.addEventListener)
                for (var c = h.length; c;) this.addEventListener(h[--c], b, !1);
            else this.onmousewheel = b;
            a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this))
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var c = h.length; c;) this.removeEventListener(h[--c], b, !1);
            else this.onmousewheel = null;
            a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function(b) {
            var c = a(b),
                d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
            return d.length || (d = a("body")), parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16
        },
        getPageHeight: function(b) {
            return a(b).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    a.fn.extend({
        mousewheel: function(a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
        },
        unmousewheel: function(a) {
            return this.unbind("mousewheel", a)
        }
    })
});
! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a : a(jQuery)
}(function(a) {
    function b(b) {
        var g = b || window.event,
            h = i.call(arguments, 1),
            j = 0,
            l = 0,
            m = 0,
            n = 0,
            o = 0,
            p = 0;
        if (b = a.event.fix(g), b.type = "mousewheel", "detail" in g && (m = -1 * g.detail), "wheelDelta" in g && (m = g.wheelDelta), "wheelDeltaY" in g && (m = g.wheelDeltaY), "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX), "axis" in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m, m = 0), j = 0 === m ? l : m, "deltaY" in g && (m = -1 * g.deltaY, j = m), "deltaX" in g && (l = g.deltaX, 0 === m && (j = -1 * l)), 0 !== m || 0 !== l) {
            if (1 === g.deltaMode) {
                var q = a.data(this, "mousewheel-line-height");
                j *= q, m *= q, l *= q
            } else if (2 === g.deltaMode) {
                var r = a.data(this, "mousewheel-page-height");
                j *= r, m *= r, l *= r
            }
            if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f /= 40)), d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? "floor" : "ceil"](j / f), l = Math[l >= 1 ? "floor" : "ceil"](l / f), m = Math[m >= 1 ? "floor" : "ceil"](m / f), k.settings.normalizeOffset && this.getBoundingClientRect) {
                var s = this.getBoundingClientRect();
                o = b.clientX - s.left, p = b.clientY - s.top
            }
            return b.deltaX = l, b.deltaY = m, b.deltaFactor = f, b.offsetX = o, b.offsetY = p, b.deltaMode = 0, h.unshift(b, j, l, m), e && clearTimeout(e), e = setTimeout(c, 200), (a.event.dispatch || a.event.handle).apply(this, h)
        }
    }

    function c() {
        f = null
    }

    function d(a, b) {
        return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0
    }
    var e, f, g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        i = Array.prototype.slice;
    if (a.event.fixHooks)
        for (var j = g.length; j;) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
    var k = a.event.special.mousewheel = {
        version: "3.1.12",
        setup: function() {
            if (this.addEventListener)
                for (var c = h.length; c;) this.addEventListener(h[--c], b, !1);
            else this.onmousewheel = b;
            a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this))
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var c = h.length; c;) this.removeEventListener(h[--c], b, !1);
            else this.onmousewheel = null;
            a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function(b) {
            var c = a(b),
                d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
            return d.length || (d = a("body")), parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16
        },
        getPageHeight: function(b) {
            return a(b).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    a.fn.extend({
        mousewheel: function(a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
        },
        unmousewheel: function(a) {
            return this.unbind("mousewheel", a)
        }
    })
});
/* == malihu jquery custom scrollbar plugin == Version: 3.1.5, License: MIT License (MIT) */
! function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof module && module.exports ? module.exports = e : e(jQuery, window, document)
}(function(e) {
    ! function(t) {
        var o = "function" == typeof define && define.amd,
            a = "undefined" != typeof module && module.exports,
            n = "https:" == document.location.protocol ? "https:" : "http:",
            i = "cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";
        o || (a ? require("jquery-mousewheel")(e) : e.event.special.mousewheel || e("head").append(decodeURI("%3Cscript src=" + n + "//" + i + "%3E%3C/script%3E"))), t()
    }(function() {
        var t, o = "mCustomScrollbar",
            a = "mCS",
            n = ".mCustomScrollbar",
            i = {
                setTop: 0,
                setLeft: 0,
                axis: "y",
                scrollbarPosition: "inside",
                scrollInertia: 950,
                autoDraggerLength: !0,
                alwaysShowScrollbar: 0,
                snapOffset: 0,
                mouseWheel: {
                    enable: !0,
                    scrollAmount: "auto",
                    axis: "y",
                    deltaFactor: "auto",
                    disableOver: ["select", "option", "keygen", "datalist", "textarea"]
                },
                scrollButtons: {
                    scrollType: "stepless",
                    scrollAmount: "auto"
                },
                keyboard: {
                    enable: !0,
                    scrollType: "stepless",
                    scrollAmount: "auto"
                },
                contentTouchScroll: 25,
                documentTouchScroll: !0,
                advanced: {
                    autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
                    updateOnContentResize: !0,
                    updateOnImageLoad: "auto",
                    autoUpdateTimeout: 60
                },
                theme: "light",
                callbacks: {
                    onTotalScrollOffset: 0,
                    onTotalScrollBackOffset: 0,
                    alwaysTriggerOffsets: !0
                }
            },
            r = 0,
            l = {},
            s = window.attachEvent && !window.addEventListener ? 1 : 0,
            c = !1,
            d = ["mCSB_dragger_onDrag", "mCSB_scrollTools_onDrag", "mCS_img_loaded", "mCS_disabled", "mCS_destroyed", "mCS_no_scrollbar", "mCS-autoHide", "mCS-dir-rtl", "mCS_no_scrollbar_y", "mCS_no_scrollbar_x", "mCS_y_hidden", "mCS_x_hidden", "mCSB_draggerContainer", "mCSB_buttonUp", "mCSB_buttonDown", "mCSB_buttonLeft", "mCSB_buttonRight"],
            u = {
                init: function(t) {
                    var t = e.extend(!0, {}, i, t),
                        o = f.call(this);
                    if (t.live) {
                        var s = t.liveSelector || this.selector || n,
                            c = e(s);
                        if ("off" === t.live) return void m(s);
                        l[s] = setTimeout(function() {
                            c.mCustomScrollbar(t), "once" === t.live && c.length && m(s)
                        }, 500)
                    } else m(s);
                    return t.setWidth = t.set_width ? t.set_width : t.setWidth, t.setHeight = t.set_height ? t.set_height : t.setHeight, t.axis = t.horizontalScroll ? "x" : p(t.axis), t.scrollInertia = t.scrollInertia > 0 && t.scrollInertia < 17 ? 17 : t.scrollInertia, "object" != typeof t.mouseWheel && 1 == t.mouseWheel && (t.mouseWheel = {
                        enable: !0,
                        scrollAmount: "auto",
                        axis: "y",
                        preventDefault: !1,
                        deltaFactor: "auto",
                        normalizeDelta: !1,
                        invert: !1
                    }), t.mouseWheel.scrollAmount = t.mouseWheelPixels ? t.mouseWheelPixels : t.mouseWheel.scrollAmount, t.mouseWheel.normalizeDelta = t.advanced.normalizeMouseWheelDelta ? t.advanced.normalizeMouseWheelDelta : t.mouseWheel.normalizeDelta, t.scrollButtons.scrollType = g(t.scrollButtons.scrollType), h(t), e(o).each(function() {
                        var o = e(this);
                        if (!o.data(a)) {
                            o.data(a, {
                                idx: ++r,
                                opt: t,
                                scrollRatio: {
                                    y: null,
                                    x: null
                                },
                                overflowed: null,
                                contentReset: {
                                    y: null,
                                    x: null
                                },
                                bindEvents: !1,
                                tweenRunning: !1,
                                sequential: {},
                                langDir: o.css("direction"),
                                cbOffsets: null,
                                trigger: null,
                                poll: {
                                    size: {
                                        o: 0,
                                        n: 0
                                    },
                                    img: {
                                        o: 0,
                                        n: 0
                                    },
                                    change: {
                                        o: 0,
                                        n: 0
                                    }
                                }
                            });
                            var n = o.data(a),
                                i = n.opt,
                                l = o.data("mcs-axis"),
                                s = o.data("mcs-scrollbar-position"),
                                c = o.data("mcs-theme");
                            l && (i.axis = l), s && (i.scrollbarPosition = s), c && (i.theme = c, h(i)), v.call(this), n && i.callbacks.onCreate && "function" == typeof i.callbacks.onCreate && i.callbacks.onCreate.call(this), e("#mCSB_" + n.idx + "_container img:not(." + d[2] + ")").addClass(d[2]), u.update.call(null, o)
                        }
                    })
                },
                update: function(t, o) {
                    var n = t || f.call(this);
                    return e(n).each(function() {
                        var t = e(this);
                        if (t.data(a)) {
                            var n = t.data(a),
                                i = n.opt,
                                r = e("#mCSB_" + n.idx + "_container"),
                                l = e("#mCSB_" + n.idx),
                                s = [e("#mCSB_" + n.idx + "_dragger_vertical"), e("#mCSB_" + n.idx + "_dragger_horizontal")];
                            if (!r.length) return;
                            n.tweenRunning && Q(t), o && n && i.callbacks.onBeforeUpdate && "function" == typeof i.callbacks.onBeforeUpdate && i.callbacks.onBeforeUpdate.call(this), t.hasClass(d[3]) && t.removeClass(d[3]), t.hasClass(d[4]) && t.removeClass(d[4]), l.css("max-height", "none"), l.height() !== t.height() && l.css("max-height", t.height()), _.call(this), "y" === i.axis || i.advanced.autoExpandHorizontalScroll || r.css("width", x(r)), n.overflowed = y.call(this), M.call(this), i.autoDraggerLength && S.call(this), b.call(this), T.call(this);
                            var c = [Math.abs(r[0].offsetTop), Math.abs(r[0].offsetLeft)];
                            "x" !== i.axis && (n.overflowed[0] ? s[0].height() > s[0].parent().height() ? B.call(this) : (G(t, c[0].toString(), {
                                dir: "y",
                                dur: 0,
                                overwrite: "none"
                            }), n.contentReset.y = null) : (B.call(this), "y" === i.axis ? k.call(this) : "yx" === i.axis && n.overflowed[1] && G(t, c[1].toString(), {
                                dir: "x",
                                dur: 0,
                                overwrite: "none"
                            }))), "y" !== i.axis && (n.overflowed[1] ? s[1].width() > s[1].parent().width() ? B.call(this) : (G(t, c[1].toString(), {
                                dir: "x",
                                dur: 0,
                                overwrite: "none"
                            }), n.contentReset.x = null) : (B.call(this), "x" === i.axis ? k.call(this) : "yx" === i.axis && n.overflowed[0] && G(t, c[0].toString(), {
                                dir: "y",
                                dur: 0,
                                overwrite: "none"
                            }))), o && n && (2 === o && i.callbacks.onImageLoad && "function" == typeof i.callbacks.onImageLoad ? i.callbacks.onImageLoad.call(this) : 3 === o && i.callbacks.onSelectorChange && "function" == typeof i.callbacks.onSelectorChange ? i.callbacks.onSelectorChange.call(this) : i.callbacks.onUpdate && "function" == typeof i.callbacks.onUpdate && i.callbacks.onUpdate.call(this)), N.call(this)
                        }
                    })
                },
                scrollTo: function(t, o) {
                    if ("undefined" != typeof t && null != t) {
                        var n = f.call(this);
                        return e(n).each(function() {
                            var n = e(this);
                            if (n.data(a)) {
                                var i = n.data(a),
                                    r = i.opt,
                                    l = {
                                        trigger: "external",
                                        scrollInertia: r.scrollInertia,
                                        scrollEasing: "mcsEaseInOut",
                                        moveDragger: !1,
                                        timeout: 60,
                                        callbacks: !0,
                                        onStart: !0,
                                        onUpdate: !0,
                                        onComplete: !0
                                    },
                                    s = e.extend(!0, {}, l, o),
                                    c = Y.call(this, t),
                                    d = s.scrollInertia > 0 && s.scrollInertia < 17 ? 17 : s.scrollInertia;
                                c[0] = X.call(this, c[0], "y"), c[1] = X.call(this, c[1], "x"), s.moveDragger && (c[0] *= i.scrollRatio.y, c[1] *= i.scrollRatio.x), s.dur = ne() ? 0 : d, setTimeout(function() {
                                    null !== c[0] && "undefined" != typeof c[0] && "x" !== r.axis && i.overflowed[0] && (s.dir = "y", s.overwrite = "all", G(n, c[0].toString(), s)), null !== c[1] && "undefined" != typeof c[1] && "y" !== r.axis && i.overflowed[1] && (s.dir = "x", s.overwrite = "none", G(n, c[1].toString(), s))
                                }, s.timeout)
                            }
                        })
                    }
                },
                stop: function() {
                    var t = f.call(this);
                    return e(t).each(function() {
                        var t = e(this);
                        t.data(a) && Q(t)
                    })
                },
                disable: function(t) {
                    var o = f.call(this);
                    return e(o).each(function() {
                        var o = e(this);
                        if (o.data(a)) {
                            o.data(a);
                            N.call(this, "remove"), k.call(this), t && B.call(this), M.call(this, !0), o.addClass(d[3])
                        }
                    })
                },
                destroy: function() {
                    var t = f.call(this);
                    return e(t).each(function() {
                        var n = e(this);
                        if (n.data(a)) {
                            var i = n.data(a),
                                r = i.opt,
                                l = e("#mCSB_" + i.idx),
                                s = e("#mCSB_" + i.idx + "_container"),
                                c = e(".mCSB_" + i.idx + "_scrollbar");
                            r.live && m(r.liveSelector || e(t).selector), N.call(this, "remove"), k.call(this), B.call(this), n.removeData(a), $(this, "mcs"), c.remove(), s.find("img." + d[2]).removeClass(d[2]), l.replaceWith(s.contents()), n.removeClass(o + " _" + a + "_" + i.idx + " " + d[6] + " " + d[7] + " " + d[5] + " " + d[3]).addClass(d[4])
                        }
                    })
                }
            },
            f = function() {
                return "object" != typeof e(this) || e(this).length < 1 ? n : this
            },
            h = function(t) {
                var o = ["rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark"],
                    a = ["rounded-dots", "rounded-dots-dark", "3d", "3d-dark", "3d-thick", "3d-thick-dark", "inset", "inset-dark", "inset-2", "inset-2-dark", "inset-3", "inset-3-dark"],
                    n = ["minimal", "minimal-dark"],
                    i = ["minimal", "minimal-dark"],
                    r = ["minimal", "minimal-dark"];
                t.autoDraggerLength = e.inArray(t.theme, o) > -1 ? !1 : t.autoDraggerLength, t.autoExpandScrollbar = e.inArray(t.theme, a) > -1 ? !1 : t.autoExpandScrollbar, t.scrollButtons.enable = e.inArray(t.theme, n) > -1 ? !1 : t.scrollButtons.enable, t.autoHideScrollbar = e.inArray(t.theme, i) > -1 ? !0 : t.autoHideScrollbar, t.scrollbarPosition = e.inArray(t.theme, r) > -1 ? "outside" : t.scrollbarPosition
            },
            m = function(e) {
                l[e] && (clearTimeout(l[e]), $(l, e))
            },
            p = function(e) {
                return "yx" === e || "xy" === e || "auto" === e ? "yx" : "x" === e || "horizontal" === e ? "x" : "y"
            },
            g = function(e) {
                return "stepped" === e || "pixels" === e || "step" === e || "click" === e ? "stepped" : "stepless"
            },
            v = function() {
                var t = e(this),
                    n = t.data(a),
                    i = n.opt,
                    r = i.autoExpandScrollbar ? " " + d[1] + "_expand" : "",
                    l = ["<div id='mCSB_" + n.idx + "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" + n.idx + "_scrollbar mCS-" + i.theme + " mCSB_scrollTools_vertical" + r + "'><div class='" + d[12] + "'><div id='mCSB_" + n.idx + "_dragger_vertical' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>", "<div id='mCSB_" + n.idx + "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" + n.idx + "_scrollbar mCS-" + i.theme + " mCSB_scrollTools_horizontal" + r + "'><div class='" + d[12] + "'><div id='mCSB_" + n.idx + "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],
                    s = "yx" === i.axis ? "mCSB_vertical_horizontal" : "x" === i.axis ? "mCSB_horizontal" : "mCSB_vertical",
                    c = "yx" === i.axis ? l[0] + l[1] : "x" === i.axis ? l[1] : l[0],
                    u = "yx" === i.axis ? "<div id='mCSB_" + n.idx + "_container_wrapper' class='mCSB_container_wrapper' />" : "",
                    f = i.autoHideScrollbar ? " " + d[6] : "",
                    h = "x" !== i.axis && "rtl" === n.langDir ? " " + d[7] : "";
                i.setWidth && t.css("width", i.setWidth), i.setHeight && t.css("height", i.setHeight), i.setLeft = "y" !== i.axis && "rtl" === n.langDir ? "989999px" : i.setLeft, t.addClass(o + " _" + a + "_" + n.idx + f + h).wrapInner("<div id='mCSB_" + n.idx + "' class='mCustomScrollBox mCS-" + i.theme + " " + s + "'><div id='mCSB_" + n.idx + "_container' class='mCSB_container' style='position:relative; top:" + i.setTop + "; left:" + i.setLeft + ";' dir='" + n.langDir + "' /></div>");
                var m = e("#mCSB_" + n.idx),
                    p = e("#mCSB_" + n.idx + "_container");
                "y" === i.axis || i.advanced.autoExpandHorizontalScroll || p.css("width", x(p)), "outside" === i.scrollbarPosition ? ("static" === t.css("position") && t.css("position", "relative"), t.css("overflow", "visible"), m.addClass("mCSB_outside").after(c)) : (m.addClass("mCSB_inside").append(c), p.wrap(u)), w.call(this);
                var g = [e("#mCSB_" + n.idx + "_dragger_vertical"), e("#mCSB_" + n.idx + "_dragger_horizontal")];
                g[0].css("min-height", g[0].height()), g[1].css("min-width", g[1].width())
            },
            x = function(t) {
                var o = [t[0].scrollWidth, Math.max.apply(Math, t.children().map(function() {
                        return e(this).outerWidth(!0)
                    }).get())],
                    a = t.parent().width();
                return o[0] > a ? o[0] : o[1] > a ? o[1] : "100%"
            },
            _ = function() {
                var t = e(this),
                    o = t.data(a),
                    n = o.opt,
                    i = e("#mCSB_" + o.idx + "_container");
                if (n.advanced.autoExpandHorizontalScroll && "y" !== n.axis) {
                    i.css({
                        width: "auto",
                        "min-width": 0,
                        "overflow-x": "scroll"
                    });
                    var r = Math.ceil(i[0].scrollWidth);
                    3 === n.advanced.autoExpandHorizontalScroll || 2 !== n.advanced.autoExpandHorizontalScroll && r > i.parent().width() ? i.css({
                        width: r,
                        "min-width": "100%",
                        "overflow-x": "inherit"
                    }) : i.css({
                        "overflow-x": "inherit",
                        position: "absolute"
                    }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
                        width: Math.ceil(i[0].getBoundingClientRect().right + .4) - Math.floor(i[0].getBoundingClientRect().left),
                        "min-width": "100%",
                        position: "relative"
                    }).unwrap()
                }
            },
            w = function() {
                var t = e(this),
                    o = t.data(a),
                    n = o.opt,
                    i = e(".mCSB_" + o.idx + "_scrollbar:first"),
                    r = oe(n.scrollButtons.tabindex) ? "tabindex='" + n.scrollButtons.tabindex + "'" : "",
                    l = ["<a href='#' class='" + d[13] + "' " + r + " />", "<a href='#' class='" + d[14] + "' " + r + " />", "<a href='#' class='" + d[15] + "' " + r + " />", "<a href='#' class='" + d[16] + "' " + r + " />"],
                    s = ["x" === n.axis ? l[2] : l[0], "x" === n.axis ? l[3] : l[1], l[2], l[3]];
                n.scrollButtons.enable && i.prepend(s[0]).append(s[1]).next(".mCSB_scrollTools").prepend(s[2]).append(s[3])
            },
            S = function() {
                var t = e(this),
                    o = t.data(a),
                    n = e("#mCSB_" + o.idx),
                    i = e("#mCSB_" + o.idx + "_container"),
                    r = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")],
                    l = [n.height() / i.outerHeight(!1), n.width() / i.outerWidth(!1)],
                    c = [parseInt(r[0].css("min-height")), Math.round(l[0] * r[0].parent().height()), parseInt(r[1].css("min-width")), Math.round(l[1] * r[1].parent().width())],
                    d = s && c[1] < c[0] ? c[0] : c[1],
                    u = s && c[3] < c[2] ? c[2] : c[3];
                r[0].css({
                    height: d,
                    "max-height": r[0].parent().height() - 10
                }).find(".mCSB_dragger_bar").css({
                    "line-height": c[0] + "px"
                }), r[1].css({
                    width: u,
                    "max-width": r[1].parent().width() - 10
                })
            },
            b = function() {
                var t = e(this),
                    o = t.data(a),
                    n = e("#mCSB_" + o.idx),
                    i = e("#mCSB_" + o.idx + "_container"),
                    r = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")],
                    l = [i.outerHeight(!1) - n.height(), i.outerWidth(!1) - n.width()],
                    s = [l[0] / (r[0].parent().height() - r[0].height()), l[1] / (r[1].parent().width() - r[1].width())];
                o.scrollRatio = {
                    y: s[0],
                    x: s[1]
                }
            },
            C = function(e, t, o) {
                var a = o ? d[0] + "_expanded" : "",
                    n = e.closest(".mCSB_scrollTools");
                "active" === t ? (e.toggleClass(d[0] + " " + a), n.toggleClass(d[1]), e[0]._draggable = e[0]._draggable ? 0 : 1) : e[0]._draggable || ("hide" === t ? (e.removeClass(d[0]), n.removeClass(d[1])) : (e.addClass(d[0]), n.addClass(d[1])))
            },
            y = function() {
                var t = e(this),
                    o = t.data(a),
                    n = e("#mCSB_" + o.idx),
                    i = e("#mCSB_" + o.idx + "_container"),
                    r = null == o.overflowed ? i.height() : i.outerHeight(!1),
                    l = null == o.overflowed ? i.width() : i.outerWidth(!1),
                    s = i[0].scrollHeight,
                    c = i[0].scrollWidth;
                return s > r && (r = s), c > l && (l = c), [r > n.height(), l > n.width()]
            },
            B = function() {
                var t = e(this),
                    o = t.data(a),
                    n = o.opt,
                    i = e("#mCSB_" + o.idx),
                    r = e("#mCSB_" + o.idx + "_container"),
                    l = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")];
                if (Q(t), ("x" !== n.axis && !o.overflowed[0] || "y" === n.axis && o.overflowed[0]) && (l[0].add(r).css("top", 0), G(t, "_resetY")), "y" !== n.axis && !o.overflowed[1] || "x" === n.axis && o.overflowed[1]) {
                    var s = dx = 0;
                    "rtl" === o.langDir && (s = i.width() - r.outerWidth(!1), dx = Math.abs(s / o.scrollRatio.x)), r.css("left", s), l[1].css("left", dx), G(t, "_resetX")
                }
            },
            T = function() {
                function t() {
                    r = setTimeout(function() {
                        e.event.special.mousewheel ? (clearTimeout(r), W.call(o[0])) : t()
                    }, 100)
                }
                var o = e(this),
                    n = o.data(a),
                    i = n.opt;
                if (!n.bindEvents) {
                    if (I.call(this), i.contentTouchScroll && D.call(this), E.call(this), i.mouseWheel.enable) {
                        var r;
                        t()
                    }
                    P.call(this), U.call(this), i.advanced.autoScrollOnFocus && H.call(this), i.scrollButtons.enable && F.call(this), i.keyboard.enable && q.call(this), n.bindEvents = !0
                }
            },
            k = function() {
                var t = e(this),
                    o = t.data(a),
                    n = o.opt,
                    i = a + "_" + o.idx,
                    r = ".mCSB_" + o.idx + "_scrollbar",
                    l = e("#mCSB_" + o.idx + ",#mCSB_" + o.idx + "_container,#mCSB_" + o.idx + "_container_wrapper," + r + " ." + d[12] + ",#mCSB_" + o.idx + "_dragger_vertical,#mCSB_" + o.idx + "_dragger_horizontal," + r + ">a"),
                    s = e("#mCSB_" + o.idx + "_container");
                n.advanced.releaseDraggableSelectors && l.add(e(n.advanced.releaseDraggableSelectors)), n.advanced.extraDraggableSelectors && l.add(e(n.advanced.extraDraggableSelectors)), o.bindEvents && (e(document).add(e(!A() || top.document)).unbind("." + i), l.each(function() {
                    e(this).unbind("." + i)
                }), clearTimeout(t[0]._focusTimeout), $(t[0], "_focusTimeout"), clearTimeout(o.sequential.step), $(o.sequential, "step"), clearTimeout(s[0].onCompleteTimeout), $(s[0], "onCompleteTimeout"), o.bindEvents = !1)
            },
            M = function(t) {
                var o = e(this),
                    n = o.data(a),
                    i = n.opt,
                    r = e("#mCSB_" + n.idx + "_container_wrapper"),
                    l = r.length ? r : e("#mCSB_" + n.idx + "_container"),
                    s = [e("#mCSB_" + n.idx + "_scrollbar_vertical"), e("#mCSB_" + n.idx + "_scrollbar_horizontal")],
                    c = [s[0].find(".mCSB_dragger"), s[1].find(".mCSB_dragger")];
                "x" !== i.axis && (n.overflowed[0] && !t ? (s[0].add(c[0]).add(s[0].children("a")).css("display", "block"), l.removeClass(d[8] + " " + d[10])) : (i.alwaysShowScrollbar ? (2 !== i.alwaysShowScrollbar && c[0].css("display", "none"), l.removeClass(d[10])) : (s[0].css("display", "none"), l.addClass(d[10])), l.addClass(d[8]))), "y" !== i.axis && (n.overflowed[1] && !t ? (s[1].add(c[1]).add(s[1].children("a")).css("display", "block"), l.removeClass(d[9] + " " + d[11])) : (i.alwaysShowScrollbar ? (2 !== i.alwaysShowScrollbar && c[1].css("display", "none"), l.removeClass(d[11])) : (s[1].css("display", "none"), l.addClass(d[11])), l.addClass(d[9]))), n.overflowed[0] || n.overflowed[1] ? o.removeClass(d[5]) : o.addClass(d[5])
            },
            O = function(t) {
                var o = t.type,
                    a = t.target.ownerDocument !== document && null !== frameElement ? [e(frameElement).offset().top, e(frameElement).offset().left] : null,
                    n = A() && t.target.ownerDocument !== top.document && null !== frameElement ? [e(t.view.frameElement).offset().top, e(t.view.frameElement).offset().left] : [0, 0];
                switch (o) {
                    case "pointerdown":
                    case "MSPointerDown":
                    case "pointermove":
                    case "MSPointerMove":
                    case "pointerup":
                    case "MSPointerUp":
                        return a ? [t.originalEvent.pageY - a[0] + n[0], t.originalEvent.pageX - a[1] + n[1], !1] : [t.originalEvent.pageY, t.originalEvent.pageX, !1];
                    case "touchstart":
                    case "touchmove":
                    case "touchend":
                        var i = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0],
                            r = t.originalEvent.touches.length || t.originalEvent.changedTouches.length;
                        return t.target.ownerDocument !== document ? [i.screenY, i.screenX, r > 1] : [i.pageY, i.pageX, r > 1];
                    default:
                        return a ? [t.pageY - a[0] + n[0], t.pageX - a[1] + n[1], !1] : [t.pageY, t.pageX, !1]
                }
            },
            I = function() {
                function t(e, t, a, n) {
                    if (h[0].idleTimer = d.scrollInertia < 233 ? 250 : 0, o.attr("id") === f[1]) var i = "x",
                        s = (o[0].offsetLeft - t + n) * l.scrollRatio.x;
                    else var i = "y",
                        s = (o[0].offsetTop - e + a) * l.scrollRatio.y;
                    G(r, s.toString(), {
                        dir: i,
                        drag: !0
                    })
                }
                var o, n, i, r = e(this),
                    l = r.data(a),
                    d = l.opt,
                    u = a + "_" + l.idx,
                    f = ["mCSB_" + l.idx + "_dragger_vertical", "mCSB_" + l.idx + "_dragger_horizontal"],
                    h = e("#mCSB_" + l.idx + "_container"),
                    m = e("#" + f[0] + ",#" + f[1]),
                    p = d.advanced.releaseDraggableSelectors ? m.add(e(d.advanced.releaseDraggableSelectors)) : m,
                    g = d.advanced.extraDraggableSelectors ? e(!A() || top.document).add(e(d.advanced.extraDraggableSelectors)) : e(!A() || top.document);
                m.bind("contextmenu." + u, function(e) {
                    e.preventDefault()
                }).bind("mousedown." + u + " touchstart." + u + " pointerdown." + u + " MSPointerDown." + u, function(t) {
                    if (t.stopImmediatePropagation(), t.preventDefault(), ee(t)) {
                        c = !0, s && (document.onselectstart = function() {
                            return !1
                        }), L.call(h, !1), Q(r), o = e(this);
                        var a = o.offset(),
                            l = O(t)[0] - a.top,
                            u = O(t)[1] - a.left,
                            f = o.height() + a.top,
                            m = o.width() + a.left;
                        f > l && l > 0 && m > u && u > 0 && (n = l, i = u), C(o, "active", d.autoExpandScrollbar)
                    }
                }).bind("touchmove." + u, function(e) {
                    e.stopImmediatePropagation(), e.preventDefault();
                    var a = o.offset(),
                        r = O(e)[0] - a.top,
                        l = O(e)[1] - a.left;
                    t(n, i, r, l)
                }), e(document).add(g).bind("mousemove." + u + " pointermove." + u + " MSPointerMove." + u, function(e) {
                    if (o) {
                        var a = o.offset(),
                            r = O(e)[0] - a.top,
                            l = O(e)[1] - a.left;
                        if (n === r && i === l) return;
                        t(n, i, r, l)
                    }
                }).add(p).bind("mouseup." + u + " touchend." + u + " pointerup." + u + " MSPointerUp." + u, function() {
                    o && (C(o, "active", d.autoExpandScrollbar), o = null), c = !1, s && (document.onselectstart = null), L.call(h, !0)
                })
            },
            D = function() {
                function o(e) {
                    if (!te(e) || c || O(e)[2]) return void(t = 0);
                    t = 1, b = 0, C = 0, d = 1, y.removeClass("mCS_touch_action");
                    var o = I.offset();
                    u = O(e)[0] - o.top, f = O(e)[1] - o.left, z = [O(e)[0], O(e)[1]]
                }

                function n(e) {
                    if (te(e) && !c && !O(e)[2] && (T.documentTouchScroll || e.preventDefault(), e.stopImmediatePropagation(), (!C || b) && d)) {
                        g = K();
                        var t = M.offset(),
                            o = O(e)[0] - t.top,
                            a = O(e)[1] - t.left,
                            n = "mcsLinearOut";
                        if (E.push(o), W.push(a), z[2] = Math.abs(O(e)[0] - z[0]), z[3] = Math.abs(O(e)[1] - z[1]), B.overflowed[0]) var i = D[0].parent().height() - D[0].height(),
                            r = u - o > 0 && o - u > -(i * B.scrollRatio.y) && (2 * z[3] < z[2] || "yx" === T.axis);
                        if (B.overflowed[1]) var l = D[1].parent().width() - D[1].width(),
                            h = f - a > 0 && a - f > -(l * B.scrollRatio.x) && (2 * z[2] < z[3] || "yx" === T.axis);
                        r || h ? (U || e.preventDefault(), b = 1) : (C = 1, y.addClass("mCS_touch_action")), U && e.preventDefault(), w = "yx" === T.axis ? [u - o, f - a] : "x" === T.axis ? [null, f - a] : [u - o, null], I[0].idleTimer = 250, B.overflowed[0] && s(w[0], R, n, "y", "all", !0), B.overflowed[1] && s(w[1], R, n, "x", L, !0)
                    }
                }

                function i(e) {
                    if (!te(e) || c || O(e)[2]) return void(t = 0);
                    t = 1, e.stopImmediatePropagation(), Q(y), p = K();
                    var o = M.offset();
                    h = O(e)[0] - o.top, m = O(e)[1] - o.left, E = [], W = []
                }

                function r(e) {
                    if (te(e) && !c && !O(e)[2]) {
                        d = 0, e.stopImmediatePropagation(), b = 0, C = 0, v = K();
                        var t = M.offset(),
                            o = O(e)[0] - t.top,
                            a = O(e)[1] - t.left;
                        if (!(v - g > 30)) {
                            _ = 1e3 / (v - p);
                            var n = "mcsEaseOut",
                                i = 2.5 > _,
                                r = i ? [E[E.length - 2], W[W.length - 2]] : [0, 0];
                            x = i ? [o - r[0], a - r[1]] : [o - h, a - m];
                            var u = [Math.abs(x[0]), Math.abs(x[1])];
                            _ = i ? [Math.abs(x[0] / 4), Math.abs(x[1] / 4)] : [_, _];
                            var f = [Math.abs(I[0].offsetTop) - x[0] * l(u[0] / _[0], _[0]), Math.abs(I[0].offsetLeft) - x[1] * l(u[1] / _[1], _[1])];
                            w = "yx" === T.axis ? [f[0], f[1]] : "x" === T.axis ? [null, f[1]] : [f[0], null], S = [4 * u[0] + T.scrollInertia, 4 * u[1] + T.scrollInertia];
                            var y = parseInt(T.contentTouchScroll) || 0;
                            w[0] = u[0] > y ? w[0] : 0, w[1] = u[1] > y ? w[1] : 0, B.overflowed[0] && s(w[0], S[0], n, "y", L, !1), B.overflowed[1] && s(w[1], S[1], n, "x", L, !1)
                        }
                    }
                }

                function l(e, t) {
                    var o = [1.5 * t, 2 * t, t / 1.5, t / 2];
                    return e > 90 ? t > 4 ? o[0] : o[3] : e > 60 ? t > 3 ? o[3] : o[2] : e > 30 ? t > 8 ? o[1] : t > 6 ? o[0] : t > 4 ? t : o[2] : t > 8 ? t : o[3]
                }

                function s(e, t, o, a, n, i) {
                    e && G(y, e.toString(), {
                        dur: t,
                        scrollEasing: o,
                        dir: a,
                        overwrite: n,
                        drag: i
                    })
                }
                var d, u, f, h, m, p, g, v, x, _, w, S, b, C, y = e(this),
                    B = y.data(a),
                    T = B.opt,
                    k = a + "_" + B.idx,
                    M = e("#mCSB_" + B.idx),
                    I = e("#mCSB_" + B.idx + "_container"),
                    D = [e("#mCSB_" + B.idx + "_dragger_vertical"), e("#mCSB_" + B.idx + "_dragger_horizontal")],
                    E = [],
                    W = [],
                    R = 0,
                    L = "yx" === T.axis ? "none" : "all",
                    z = [],
                    P = I.find("iframe"),
                    H = ["touchstart." + k + " pointerdown." + k + " MSPointerDown." + k, "touchmove." + k + " pointermove." + k + " MSPointerMove." + k, "touchend." + k + " pointerup." + k + " MSPointerUp." + k],
                    U = void 0 !== document.body.style.touchAction && "" !== document.body.style.touchAction;
                I.bind(H[0], function(e) {
                    o(e)
                }).bind(H[1], function(e) {
                    n(e)
                }), M.bind(H[0], function(e) {
                    i(e)
                }).bind(H[2], function(e) {
                    r(e)
                }), P.length && P.each(function() {
                    e(this).bind("load", function() {
                        A(this) && e(this.contentDocument || this.contentWindow.document).bind(H[0], function(e) {
                            o(e), i(e)
                        }).bind(H[1], function(e) {
                            n(e)
                        }).bind(H[2], function(e) {
                            r(e)
                        })
                    })
                })
            },
            E = function() {
                function o() {
                    return window.getSelection ? window.getSelection().toString() : document.selection && "Control" != document.selection.type ? document.selection.createRange().text : 0
                }

                function n(e, t, o) {
                    d.type = o && i ? "stepped" : "stepless", d.scrollAmount = 10, j(r, e, t, "mcsLinearOut", o ? 60 : null)
                }
                var i, r = e(this),
                    l = r.data(a),
                    s = l.opt,
                    d = l.sequential,
                    u = a + "_" + l.idx,
                    f = e("#mCSB_" + l.idx + "_container"),
                    h = f.parent();
                f.bind("mousedown." + u, function() {
                    t || i || (i = 1, c = !0)
                }).add(document).bind("mousemove." + u, function(e) {
                    if (!t && i && o()) {
                        var a = f.offset(),
                            r = O(e)[0] - a.top + f[0].offsetTop,
                            c = O(e)[1] - a.left + f[0].offsetLeft;
                        r > 0 && r < h.height() && c > 0 && c < h.width() ? d.step && n("off", null, "stepped") : ("x" !== s.axis && l.overflowed[0] && (0 > r ? n("on", 38) : r > h.height() && n("on", 40)), "y" !== s.axis && l.overflowed[1] && (0 > c ? n("on", 37) : c > h.width() && n("on", 39)))
                    }
                }).bind("mouseup." + u + " dragend." + u, function() {
                    t || (i && (i = 0, n("off", null)), c = !1)
                })
            },
            W = function() {
                function t(t, a) {
                    if (Q(o), !z(o, t.target)) {
                        var r = "auto" !== i.mouseWheel.deltaFactor ? parseInt(i.mouseWheel.deltaFactor) : s && t.deltaFactor < 100 ? 100 : t.deltaFactor || 100,
                            d = i.scrollInertia;
                        if ("x" === i.axis || "x" === i.mouseWheel.axis) var u = "x",
                            f = [Math.round(r * n.scrollRatio.x), parseInt(i.mouseWheel.scrollAmount)],
                            h = "auto" !== i.mouseWheel.scrollAmount ? f[1] : f[0] >= l.width() ? .9 * l.width() : f[0],
                            m = Math.abs(e("#mCSB_" + n.idx + "_container")[0].offsetLeft),
                            p = c[1][0].offsetLeft,
                            g = c[1].parent().width() - c[1].width(),
                            v = "y" === i.mouseWheel.axis ? t.deltaY || a : t.deltaX;
                        else var u = "y",
                            f = [Math.round(r * n.scrollRatio.y), parseInt(i.mouseWheel.scrollAmount)],
                            h = "auto" !== i.mouseWheel.scrollAmount ? f[1] : f[0] >= l.height() ? .9 * l.height() : f[0],
                            m = Math.abs(e("#mCSB_" + n.idx + "_container")[0].offsetTop),
                            p = c[0][0].offsetTop,
                            g = c[0].parent().height() - c[0].height(),
                            v = t.deltaY || a;
                        "y" === u && !n.overflowed[0] || "x" === u && !n.overflowed[1] || ((i.mouseWheel.invert || t.webkitDirectionInvertedFromDevice) && (v = -v), i.mouseWheel.normalizeDelta && (v = 0 > v ? -1 : 1), (v > 0 && 0 !== p || 0 > v && p !== g || i.mouseWheel.preventDefault) && (t.stopImmediatePropagation(), t.preventDefault()), t.deltaFactor < 5 && !i.mouseWheel.normalizeDelta && (h = t.deltaFactor, d = 17), G(o, (m - v * h).toString(), {
                            dir: u,
                            dur: d
                        }))
                    }
                }
                if (e(this).data(a)) {
                    var o = e(this),
                        n = o.data(a),
                        i = n.opt,
                        r = a + "_" + n.idx,
                        l = e("#mCSB_" + n.idx),
                        c = [e("#mCSB_" + n.idx + "_dragger_vertical"), e("#mCSB_" + n.idx + "_dragger_horizontal")],
                        d = e("#mCSB_" + n.idx + "_container").find("iframe");
                    d.length && d.each(function() {
                        e(this).bind("load", function() {
                            A(this) && e(this.contentDocument || this.contentWindow.document).bind("mousewheel." + r, function(e, o) {
                                t(e, o)
                            })
                        })
                    }), l.bind("mousewheel." + r, function(e, o) {
                        t(e, o)
                    })
                }
            },
            R = new Object,
            A = function(t) {
                var o = !1,
                    a = !1,
                    n = null;
                if (void 0 === t ? a = "#empty" : void 0 !== e(t).attr("id") && (a = e(t).attr("id")), a !== !1 && void 0 !== R[a]) return R[a];
                if (t) {
                    try {
                        var i = t.contentDocument || t.contentWindow.document;
                        n = i.body.innerHTML
                    } catch (r) {}
                    o = null !== n
                } else {
                    try {
                        var i = top.document;
                        n = i.body.innerHTML
                    } catch (r) {}
                    o = null !== n
                }
                return a !== !1 && (R[a] = o), o
            },
            L = function(e) {
                var t = this.find("iframe");
                if (t.length) {
                    var o = e ? "auto" : "none";
                    t.css("pointer-events", o)
                }
            },
            z = function(t, o) {
                var n = o.nodeName.toLowerCase(),
                    i = t.data(a).opt.mouseWheel.disableOver,
                    r = ["select", "textarea"];
                return e.inArray(n, i) > -1 && !(e.inArray(n, r) > -1 && !e(o).is(":focus"))
            },
            P = function() {
                var t, o = e(this),
                    n = o.data(a),
                    i = a + "_" + n.idx,
                    r = e("#mCSB_" + n.idx + "_container"),
                    l = r.parent(),
                    s = e(".mCSB_" + n.idx + "_scrollbar ." + d[12]);
                s.bind("mousedown." + i + " touchstart." + i + " pointerdown." + i + " MSPointerDown." + i, function(o) {
                    c = !0, e(o.target).hasClass("mCSB_dragger") || (t = 1)
                }).bind("touchend." + i + " pointerup." + i + " MSPointerUp." + i, function() {
                    c = !1
                }).bind("click." + i, function(a) {
                    if (t && (t = 0, e(a.target).hasClass(d[12]) || e(a.target).hasClass("mCSB_draggerRail"))) {
                        Q(o);
                        var i = e(this),
                            s = i.find(".mCSB_dragger");
                        if (i.parent(".mCSB_scrollTools_horizontal").length > 0) {
                            if (!n.overflowed[1]) return;
                            var c = "x",
                                u = a.pageX > s.offset().left ? -1 : 1,
                                f = Math.abs(r[0].offsetLeft) - u * (.9 * l.width())
                        } else {
                            if (!n.overflowed[0]) return;
                            var c = "y",
                                u = a.pageY > s.offset().top ? -1 : 1,
                                f = Math.abs(r[0].offsetTop) - u * (.9 * l.height())
                        }
                        G(o, f.toString(), {
                            dir: c,
                            scrollEasing: "mcsEaseInOut"
                        })
                    }
                })
            },
            H = function() {
                var t = e(this),
                    o = t.data(a),
                    n = o.opt,
                    i = a + "_" + o.idx,
                    r = e("#mCSB_" + o.idx + "_container"),
                    l = r.parent();
                r.bind("focusin." + i, function() {
                    var o = e(document.activeElement),
                        a = r.find(".mCustomScrollBox").length,
                        i = 0;
                    o.is(n.advanced.autoScrollOnFocus) && (Q(t), clearTimeout(t[0]._focusTimeout), t[0]._focusTimer = a ? (i + 17) * a : 0, t[0]._focusTimeout = setTimeout(function() {
                        var e = [ae(o)[0], ae(o)[1]],
                            a = [r[0].offsetTop, r[0].offsetLeft],
                            s = [a[0] + e[0] >= 0 && a[0] + e[0] < l.height() - o.outerHeight(!1), a[1] + e[1] >= 0 && a[0] + e[1] < l.width() - o.outerWidth(!1)],
                            c = "yx" !== n.axis || s[0] || s[1] ? "all" : "none";
                        "x" === n.axis || s[0] || G(t, e[0].toString(), {
                            dir: "y",
                            scrollEasing: "mcsEaseInOut",
                            overwrite: c,
                            dur: i
                        }), "y" === n.axis || s[1] || G(t, e[1].toString(), {
                            dir: "x",
                            scrollEasing: "mcsEaseInOut",
                            overwrite: c,
                            dur: i
                        })
                    }, t[0]._focusTimer))
                })
            },
            U = function() {
                var t = e(this),
                    o = t.data(a),
                    n = a + "_" + o.idx,
                    i = e("#mCSB_" + o.idx + "_container").parent();
                i.bind("scroll." + n, function() {
                    0 === i.scrollTop() && 0 === i.scrollLeft() || e(".mCSB_" + o.idx + "_scrollbar").css("visibility", "hidden")
                })
            },
            F = function() {
                var t = e(this),
                    o = t.data(a),
                    n = o.opt,
                    i = o.sequential,
                    r = a + "_" + o.idx,
                    l = ".mCSB_" + o.idx + "_scrollbar",
                    s = e(l + ">a");
                s.bind("contextmenu." + r, function(e) {
                    e.preventDefault()
                }).bind("mousedown." + r + " touchstart." + r + " pointerdown." + r + " MSPointerDown." + r + " mouseup." + r + " touchend." + r + " pointerup." + r + " MSPointerUp." + r + " mouseout." + r + " pointerout." + r + " MSPointerOut." + r + " click." + r, function(a) {
                    function r(e, o) {
                        i.scrollAmount = n.scrollButtons.scrollAmount, j(t, e, o)
                    }
                    if (a.preventDefault(), ee(a)) {
                        var l = e(this).attr("class");
                        switch (i.type = n.scrollButtons.scrollType, a.type) {
                            case "mousedown":
                            case "touchstart":
                            case "pointerdown":
                            case "MSPointerDown":
                                if ("stepped" === i.type) return;
                                c = !0, o.tweenRunning = !1, r("on", l);
                                break;
                            case "mouseup":
                            case "touchend":
                            case "pointerup":
                            case "MSPointerUp":
                            case "mouseout":
                            case "pointerout":
                            case "MSPointerOut":
                                if ("stepped" === i.type) return;
                                c = !1, i.dir && r("off", l);
                                break;
                            case "click":
                                if ("stepped" !== i.type || o.tweenRunning) return;
                                r("on", l)
                        }
                    }
                })
            },
            q = function() {
                function t(t) {
                    function a(e, t) {
                        r.type = i.keyboard.scrollType, r.scrollAmount = i.keyboard.scrollAmount, "stepped" === r.type && n.tweenRunning || j(o, e, t)
                    }
                    switch (t.type) {
                        case "blur":
                            n.tweenRunning && r.dir && a("off", null);
                            break;
                        case "keydown":
                        case "keyup":
                            var l = t.keyCode ? t.keyCode : t.which,
                                s = "on";
                            if ("x" !== i.axis && (38 === l || 40 === l) || "y" !== i.axis && (37 === l || 39 === l)) {
                                if ((38 === l || 40 === l) && !n.overflowed[0] || (37 === l || 39 === l) && !n.overflowed[1]) return;
                                "keyup" === t.type && (s = "off"), e(document.activeElement).is(u) || (t.preventDefault(), t.stopImmediatePropagation(), a(s, l))
                            } else if (33 === l || 34 === l) {
                                if ((n.overflowed[0] || n.overflowed[1]) && (t.preventDefault(), t.stopImmediatePropagation()), "keyup" === t.type) {
                                    Q(o);
                                    var f = 34 === l ? -1 : 1;
                                    if ("x" === i.axis || "yx" === i.axis && n.overflowed[1] && !n.overflowed[0]) var h = "x",
                                        m = Math.abs(c[0].offsetLeft) - f * (.9 * d.width());
                                    else var h = "y",
                                        m = Math.abs(c[0].offsetTop) - f * (.9 * d.height());
                                    G(o, m.toString(), {
                                        dir: h,
                                        scrollEasing: "mcsEaseInOut"
                                    })
                                }
                            } else if ((35 === l || 36 === l) && !e(document.activeElement).is(u) && ((n.overflowed[0] || n.overflowed[1]) && (t.preventDefault(), t.stopImmediatePropagation()), "keyup" === t.type)) {
                                if ("x" === i.axis || "yx" === i.axis && n.overflowed[1] && !n.overflowed[0]) var h = "x",
                                    m = 35 === l ? Math.abs(d.width() - c.outerWidth(!1)) : 0;
                                else var h = "y",
                                    m = 35 === l ? Math.abs(d.height() - c.outerHeight(!1)) : 0;
                                G(o, m.toString(), {
                                    dir: h,
                                    scrollEasing: "mcsEaseInOut"
                                })
                            }
                    }
                }
                var o = e(this),
                    n = o.data(a),
                    i = n.opt,
                    r = n.sequential,
                    l = a + "_" + n.idx,
                    s = e("#mCSB_" + n.idx),
                    c = e("#mCSB_" + n.idx + "_container"),
                    d = c.parent(),
                    u = "input,textarea,select,datalist,keygen,[contenteditable='true']",
                    f = c.find("iframe"),
                    h = ["blur." + l + " keydown." + l + " keyup." + l];
                f.length && f.each(function() {
                    e(this).bind("load", function() {
                        A(this) && e(this.contentDocument || this.contentWindow.document).bind(h[0], function(e) {
                            t(e)
                        })
                    })
                }), s.attr("tabindex", "0").bind(h[0], function(e) {
                    t(e)
                })
            },
            j = function(t, o, n, i, r) {
                function l(e) {
                    u.snapAmount && (f.scrollAmount = u.snapAmount instanceof Array ? "x" === f.dir[0] ? u.snapAmount[1] : u.snapAmount[0] : u.snapAmount);
                    var o = "stepped" !== f.type,
                        a = r ? r : e ? o ? p / 1.5 : g : 1e3 / 60,
                        n = e ? o ? 7.5 : 40 : 2.5,
                        s = [Math.abs(h[0].offsetTop), Math.abs(h[0].offsetLeft)],
                        d = [c.scrollRatio.y > 10 ? 10 : c.scrollRatio.y, c.scrollRatio.x > 10 ? 10 : c.scrollRatio.x],
                        m = "x" === f.dir[0] ? s[1] + f.dir[1] * (d[1] * n) : s[0] + f.dir[1] * (d[0] * n),
                        v = "x" === f.dir[0] ? s[1] + f.dir[1] * parseInt(f.scrollAmount) : s[0] + f.dir[1] * parseInt(f.scrollAmount),
                        x = "auto" !== f.scrollAmount ? v : m,
                        _ = i ? i : e ? o ? "mcsLinearOut" : "mcsEaseInOut" : "mcsLinear",
                        w = !!e;
                    return e && 17 > a && (x = "x" === f.dir[0] ? s[1] : s[0]), G(t, x.toString(), {
                        dir: f.dir[0],
                        scrollEasing: _,
                        dur: a,
                        onComplete: w
                    }), e ? void(f.dir = !1) : (clearTimeout(f.step), void(f.step = setTimeout(function() {
                        l()
                    }, a)))
                }

                function s() {
                    clearTimeout(f.step), $(f, "step"), Q(t)
                }
                var c = t.data(a),
                    u = c.opt,
                    f = c.sequential,
                    h = e("#mCSB_" + c.idx + "_container"),
                    m = "stepped" === f.type,
                    p = u.scrollInertia < 26 ? 26 : u.scrollInertia,
                    g = u.scrollInertia < 1 ? 17 : u.scrollInertia;
                switch (o) {
                    case "on":
                        if (f.dir = [n === d[16] || n === d[15] || 39 === n || 37 === n ? "x" : "y", n === d[13] || n === d[15] || 38 === n || 37 === n ? -1 : 1], Q(t), oe(n) && "stepped" === f.type) return;
                        l(m);
                        break;
                    case "off":
                        s(), (m || c.tweenRunning && f.dir) && l(!0)
                }
            },
            Y = function(t) {
                var o = e(this).data(a).opt,
                    n = [];
                return "function" == typeof t && (t = t()), t instanceof Array ? n = t.length > 1 ? [t[0], t[1]] : "x" === o.axis ? [null, t[0]] : [t[0], null] : (n[0] = t.y ? t.y : t.x || "x" === o.axis ? null : t, n[1] = t.x ? t.x : t.y || "y" === o.axis ? null : t), "function" == typeof n[0] && (n[0] = n[0]()), "function" == typeof n[1] && (n[1] = n[1]()), n
            },
            X = function(t, o) {
                if (null != t && "undefined" != typeof t) {
                    var n = e(this),
                        i = n.data(a),
                        r = i.opt,
                        l = e("#mCSB_" + i.idx + "_container"),
                        s = l.parent(),
                        c = typeof t;
                    o || (o = "x" === r.axis ? "x" : "y");
                    var d = "x" === o ? l.outerWidth(!1) - s.width() : l.outerHeight(!1) - s.height(),
                        f = "x" === o ? l[0].offsetLeft : l[0].offsetTop,
                        h = "x" === o ? "left" : "top";
                    switch (c) {
                        case "function":
                            return t();
                        case "object":
                            var m = t.jquery ? t : e(t);
                            if (!m.length) return;
                            return "x" === o ? ae(m)[1] : ae(m)[0];
                        case "string":
                        case "number":
                            if (oe(t)) return Math.abs(t);
                            if (-1 !== t.indexOf("%")) return Math.abs(d * parseInt(t) / 100);
                            if (-1 !== t.indexOf("-=")) return Math.abs(f - parseInt(t.split("-=")[1]));
                            if (-1 !== t.indexOf("+=")) {
                                var p = f + parseInt(t.split("+=")[1]);
                                return p >= 0 ? 0 : Math.abs(p)
                            }
                            if (-1 !== t.indexOf("px") && oe(t.split("px")[0])) return Math.abs(t.split("px")[0]);
                            if ("top" === t || "left" === t) return 0;
                            if ("bottom" === t) return Math.abs(s.height() - l.outerHeight(!1));
                            if ("right" === t) return Math.abs(s.width() - l.outerWidth(!1));
                            if ("first" === t || "last" === t) {
                                var m = l.find(":" + t);
                                return "x" === o ? ae(m)[1] : ae(m)[0]
                            }
                            return e(t).length ? "x" === o ? ae(e(t))[1] : ae(e(t))[0] : (l.css(h, t), void u.update.call(null, n[0]))
                    }
                }
            },
            N = function(t) {
                function o() {
                    return clearTimeout(f[0].autoUpdate), 0 === l.parents("html").length ? void(l = null) : void(f[0].autoUpdate = setTimeout(function() {
                        return c.advanced.updateOnSelectorChange && (s.poll.change.n = i(), s.poll.change.n !== s.poll.change.o) ? (s.poll.change.o = s.poll.change.n, void r(3)) : c.advanced.updateOnContentResize && (s.poll.size.n = l[0].scrollHeight + l[0].scrollWidth + f[0].offsetHeight + l[0].offsetHeight + l[0].offsetWidth, s.poll.size.n !== s.poll.size.o) ? (s.poll.size.o = s.poll.size.n, void r(1)) : !c.advanced.updateOnImageLoad || "auto" === c.advanced.updateOnImageLoad && "y" === c.axis || (s.poll.img.n = f.find("img").length, s.poll.img.n === s.poll.img.o) ? void((c.advanced.updateOnSelectorChange || c.advanced.updateOnContentResize || c.advanced.updateOnImageLoad) && o()) : (s.poll.img.o = s.poll.img.n, void f.find("img").each(function() {
                            n(this)
                        }))
                    }, c.advanced.autoUpdateTimeout))
                }

                function n(t) {
                    function o(e, t) {
                        return function() {
                            return t.apply(e, arguments)
                        }
                    }

                    function a() {
                        this.onload = null, e(t).addClass(d[2]), r(2)
                    }
                    if (e(t).hasClass(d[2])) return void r();
                    var n = new Image;
                    n.onload = o(n, a), n.src = t.src
                }

                function i() {
                    c.advanced.updateOnSelectorChange === !0 && (c.advanced.updateOnSelectorChange = "*");
                    var e = 0,
                        t = f.find(c.advanced.updateOnSelectorChange);
                    return c.advanced.updateOnSelectorChange && t.length > 0 && t.each(function() {
                        e += this.offsetHeight + this.offsetWidth
                    }), e
                }

                function r(e) {
                    clearTimeout(f[0].autoUpdate), u.update.call(null, l[0], e)
                }
                var l = e(this),
                    s = l.data(a),
                    c = s.opt,
                    f = e("#mCSB_" + s.idx + "_container");
                return t ? (clearTimeout(f[0].autoUpdate), void $(f[0], "autoUpdate")) : void o()
            },
            V = function(e, t, o) {
                return Math.round(e / t) * t - o
            },
            Q = function(t) {
                var o = t.data(a),
                    n = e("#mCSB_" + o.idx + "_container,#mCSB_" + o.idx + "_container_wrapper,#mCSB_" + o.idx + "_dragger_vertical,#mCSB_" + o.idx + "_dragger_horizontal");
                n.each(function() {
                    Z.call(this)
                })
            },
            G = function(t, o, n) {
                function i(e) {
                    return s && c.callbacks[e] && "function" == typeof c.callbacks[e]
                }

                function r() {
                    return [c.callbacks.alwaysTriggerOffsets || w >= S[0] + y, c.callbacks.alwaysTriggerOffsets || -B >= w]
                }

                function l() {
                    var e = [h[0].offsetTop, h[0].offsetLeft],
                        o = [x[0].offsetTop, x[0].offsetLeft],
                        a = [h.outerHeight(!1), h.outerWidth(!1)],
                        i = [f.height(), f.width()];
                    t[0].mcs = {
                        content: h,
                        top: e[0],
                        left: e[1],
                        draggerTop: o[0],
                        draggerLeft: o[1],
                        topPct: Math.round(100 * Math.abs(e[0]) / (Math.abs(a[0]) - i[0])),
                        leftPct: Math.round(100 * Math.abs(e[1]) / (Math.abs(a[1]) - i[1])),
                        direction: n.dir
                    }
                }
                var s = t.data(a),
                    c = s.opt,
                    d = {
                        trigger: "internal",
                        dir: "y",
                        scrollEasing: "mcsEaseOut",
                        drag: !1,
                        dur: c.scrollInertia,
                        overwrite: "all",
                        callbacks: !0,
                        onStart: !0,
                        onUpdate: !0,
                        onComplete: !0
                    },
                    n = e.extend(d, n),
                    u = [n.dur, n.drag ? 0 : n.dur],
                    f = e("#mCSB_" + s.idx),
                    h = e("#mCSB_" + s.idx + "_container"),
                    m = h.parent(),
                    p = c.callbacks.onTotalScrollOffset ? Y.call(t, c.callbacks.onTotalScrollOffset) : [0, 0],
                    g = c.callbacks.onTotalScrollBackOffset ? Y.call(t, c.callbacks.onTotalScrollBackOffset) : [0, 0];
                if (s.trigger = n.trigger, 0 === m.scrollTop() && 0 === m.scrollLeft() || (e(".mCSB_" + s.idx + "_scrollbar").css("visibility", "visible"), m.scrollTop(0).scrollLeft(0)), "_resetY" !== o || s.contentReset.y || (i("onOverflowYNone") && c.callbacks.onOverflowYNone.call(t[0]), s.contentReset.y = 1), "_resetX" !== o || s.contentReset.x || (i("onOverflowXNone") && c.callbacks.onOverflowXNone.call(t[0]), s.contentReset.x = 1), "_resetY" !== o && "_resetX" !== o) {
                    if (!s.contentReset.y && t[0].mcs || !s.overflowed[0] || (i("onOverflowY") && c.callbacks.onOverflowY.call(t[0]), s.contentReset.x = null), !s.contentReset.x && t[0].mcs || !s.overflowed[1] || (i("onOverflowX") && c.callbacks.onOverflowX.call(t[0]), s.contentReset.x = null), c.snapAmount) {
                        var v = c.snapAmount instanceof Array ? "x" === n.dir ? c.snapAmount[1] : c.snapAmount[0] : c.snapAmount;
                        o = V(o, v, c.snapOffset)
                    }
                    switch (n.dir) {
                        case "x":
                            var x = e("#mCSB_" + s.idx + "_dragger_horizontal"),
                                _ = "left",
                                w = h[0].offsetLeft,
                                S = [f.width() - h.outerWidth(!1), x.parent().width() - x.width()],
                                b = [o, 0 === o ? 0 : o / s.scrollRatio.x],
                                y = p[1],
                                B = g[1],
                                T = y > 0 ? y / s.scrollRatio.x : 0,
                                k = B > 0 ? B / s.scrollRatio.x : 0;
                            break;
                        case "y":
                            var x = e("#mCSB_" + s.idx + "_dragger_vertical"),
                                _ = "top",
                                w = h[0].offsetTop,
                                S = [f.height() - h.outerHeight(!1), x.parent().height() - x.height()],
                                b = [o, 0 === o ? 0 : o / s.scrollRatio.y],
                                y = p[0],
                                B = g[0],
                                T = y > 0 ? y / s.scrollRatio.y : 0,
                                k = B > 0 ? B / s.scrollRatio.y : 0
                    }
                    b[1] < 0 || 0 === b[0] && 0 === b[1] ? b = [0, 0] : b[1] >= S[1] ? b = [S[0], S[1]] : b[0] = -b[0], t[0].mcs || (l(), i("onInit") && c.callbacks.onInit.call(t[0])), clearTimeout(h[0].onCompleteTimeout), J(x[0], _, Math.round(b[1]), u[1], n.scrollEasing), !s.tweenRunning && (0 === w && b[0] >= 0 || w === S[0] && b[0] <= S[0]) || J(h[0], _, Math.round(b[0]), u[0], n.scrollEasing, n.overwrite, {
                        onStart: function() {
                            n.callbacks && n.onStart && !s.tweenRunning && (i("onScrollStart") && (l(), c.callbacks.onScrollStart.call(t[0])), s.tweenRunning = !0, C(x), s.cbOffsets = r())
                        },
                        onUpdate: function() {
                            n.callbacks && n.onUpdate && i("whileScrolling") && (l(), c.callbacks.whileScrolling.call(t[0]))
                        },
                        onComplete: function() {
                            if (n.callbacks && n.onComplete) {
                                "yx" === c.axis && clearTimeout(h[0].onCompleteTimeout);
                                var e = h[0].idleTimer || 0;
                                h[0].onCompleteTimeout = setTimeout(function() {
                                    i("onScroll") && (l(), c.callbacks.onScroll.call(t[0])), i("onTotalScroll") && b[1] >= S[1] - T && s.cbOffsets[0] && (l(), c.callbacks.onTotalScroll.call(t[0])), i("onTotalScrollBack") && b[1] <= k && s.cbOffsets[1] && (l(), c.callbacks.onTotalScrollBack.call(t[0])), s.tweenRunning = !1, h[0].idleTimer = 0, C(x, "hide")
                                }, e)
                            }
                        }
                    })
                }
            },
            J = function(e, t, o, a, n, i, r) {
                function l() {
                    S.stop || (x || m.call(), x = K() - v, s(), x >= S.time && (S.time = x > S.time ? x + f - (x - S.time) : x + f - 1, S.time < x + 1 && (S.time = x + 1)), S.time < a ? S.id = h(l) : g.call())
                }

                function s() {
                    a > 0 ? (S.currVal = u(S.time, _, b, a, n), w[t] = Math.round(S.currVal) + "px") : w[t] = o + "px", p.call()
                }

                function c() {
                    f = 1e3 / 60, S.time = x + f, h = window.requestAnimationFrame ? window.requestAnimationFrame : function(e) {
                        return s(), setTimeout(e, .01)
                    }, S.id = h(l)
                }

                function d() {
                    null != S.id && (window.requestAnimationFrame ? window.cancelAnimationFrame(S.id) : clearTimeout(S.id), S.id = null)
                }

                function u(e, t, o, a, n) {
                    switch (n) {
                        case "linear":
                        case "mcsLinear":
                            return o * e / a + t;
                        case "mcsLinearOut":
                            return e /= a, e--, o * Math.sqrt(1 - e * e) + t;
                        case "easeInOutSmooth":
                            return e /= a / 2, 1 > e ? o / 2 * e * e + t : (e--, -o / 2 * (e * (e - 2) - 1) + t);
                        case "easeInOutStrong":
                            return e /= a / 2, 1 > e ? o / 2 * Math.pow(2, 10 * (e - 1)) + t : (e--, o / 2 * (-Math.pow(2, -10 * e) + 2) + t);
                        case "easeInOut":
                        case "mcsEaseInOut":
                            return e /= a / 2, 1 > e ? o / 2 * e * e * e + t : (e -= 2, o / 2 * (e * e * e + 2) + t);
                        case "easeOutSmooth":
                            return e /= a, e--, -o * (e * e * e * e - 1) + t;
                        case "easeOutStrong":
                            return o * (-Math.pow(2, -10 * e / a) + 1) + t;
                        case "easeOut":
                        case "mcsEaseOut":
                        default:
                            var i = (e /= a) * e,
                                r = i * e;
                            return t + o * (.499999999999997 * r * i + -2.5 * i * i + 5.5 * r + -6.5 * i + 4 * e)
                    }
                }
                e._mTween || (e._mTween = {
                    top: {},
                    left: {}
                });
                var f, h, r = r || {},
                    m = r.onStart || function() {},
                    p = r.onUpdate || function() {},
                    g = r.onComplete || function() {},
                    v = K(),
                    x = 0,
                    _ = e.offsetTop,
                    w = e.style,
                    S = e._mTween[t];
                "left" === t && (_ = e.offsetLeft);
                var b = o - _;
                S.stop = 0, "none" !== i && d(), c()
            },
            K = function() {
                return window.performance && window.performance.now ? window.performance.now() : window.performance && window.performance.webkitNow ? window.performance.webkitNow() : Date.now ? Date.now() : (new Date).getTime()
            },
            Z = function() {
                var e = this;
                e._mTween || (e._mTween = {
                    top: {},
                    left: {}
                });
                for (var t = ["top", "left"], o = 0; o < t.length; o++) {
                    var a = t[o];
                    e._mTween[a].id && (window.requestAnimationFrame ? window.cancelAnimationFrame(e._mTween[a].id) : clearTimeout(e._mTween[a].id), e._mTween[a].id = null, e._mTween[a].stop = 1)
                }
            },
            $ = function(e, t) {
                try {
                    delete e[t]
                } catch (o) {
                    e[t] = null
                }
            },
            ee = function(e) {
                return !(e.which && 1 !== e.which)
            },
            te = function(e) {
                var t = e.originalEvent.pointerType;
                return !(t && "touch" !== t && 2 !== t)
            },
            oe = function(e) {
                return !isNaN(parseFloat(e)) && isFinite(e)
            },
            ae = function(e) {
                var t = e.parents(".mCSB_container");
                return [e.offset().top - t.offset().top, e.offset().left - t.offset().left]
            },
            ne = function() {
                function e() {
                    var e = ["webkit", "moz", "ms", "o"];
                    if ("hidden" in document) return "hidden";
                    for (var t = 0; t < e.length; t++)
                        if (e[t] + "Hidden" in document) return e[t] + "Hidden";
                    return null
                }
                var t = e();
                return t ? document[t] : !1
            };
        e.fn[o] = function(t) {
            return u[t] ? u[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist") : u.init.apply(this, arguments)
        }, e[o] = function(t) {
            return u[t] ? u[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist") : u.init.apply(this, arguments)
        }, e[o].defaults = i, window[o] = !0, e(window).bind("load", function() {
            e(n)[o](), e.extend(e.expr[":"], {
                mcsInView: e.expr[":"].mcsInView || function(t) {
                    var o, a, n = e(t),
                        i = n.parents(".mCSB_container");
                    if (i.length) return o = i.parent(), a = [i[0].offsetTop, i[0].offsetLeft], a[0] + ae(n)[0] >= 0 && a[0] + ae(n)[0] < o.height() - n.outerHeight(!1) && a[1] + ae(n)[1] >= 0 && a[1] + ae(n)[1] < o.width() - n.outerWidth(!1)
                },
                mcsInSight: e.expr[":"].mcsInSight || function(t, o, a) {
                    var n, i, r, l, s = e(t),
                        c = s.parents(".mCSB_container"),
                        d = "exact" === a[3] ? [
                            [1, 0],
                            [1, 0]
                        ] : [
                            [.9, .1],
                            [.6, .4]
                        ];
                    if (c.length) return n = [s.outerHeight(!1), s.outerWidth(!1)], r = [c[0].offsetTop + ae(s)[0], c[0].offsetLeft + ae(s)[1]], i = [c.parent()[0].offsetHeight, c.parent()[0].offsetWidth], l = [n[0] < i[0] ? d[0] : d[1], n[1] < i[1] ? d[0] : d[1]], r[0] - i[0] * l[0][0] < 0 && r[0] + n[0] - i[0] * l[0][1] >= 0 && r[1] - i[1] * l[1][0] < 0 && r[1] + n[1] - i[1] * l[1][1] >= 0
                },
                mcsOverflow: e.expr[":"].mcsOverflow || function(t) {
                    var o = e(t).data(a);
                    if (o) return o.overflowed[0] || o.overflowed[1]
                }
            })
        })
    })
});

/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/themes/custom/fortis/libs/mscrollbar/js/jquery.mCustomScrollbar.concat.min.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/themes/custom/fortis/libs/showmore/showmore.js. */
/*
 * Show More jQuery Plugin
 * Author: Jason Alvis
 * Author Site: http://www.jasonalvis.com
 * License: Free General Public License (GPL)
 * Version: 1.0.4
 * Date: 21.05.2013
 */
(function(a) {
    a.fn.showMore = function(b) {
        var c = {
            speedDown: 300,
            speedUp: 300,
            height: "265px",
            showText: "Show",
            hideText: "Hide"
        };
        var b = a.extend(c, b);
        return this.each(function() {
            var e = a(this),
                d = e.height();
            if (d > parseInt(b.height)) {
                e.wrapInner('<div class="showmore_content" />');
                e.find(".showmore_content").css("height", b.height);
                e.append('<div class="showmore_trigger"><span class="more">' + b.showText + '</span><span class="less" style="display:none;">' + b.hideText + "</span></div>");
                e.find(".showmore_trigger").on("click", ".more", function() {
                    a(this).hide();
                    a(this).next().show();
                    a(this).parent().prev().animate({
                        height: d
                    }, b.speedDown)
                });
                e.find(".showmore_trigger").on("click", ".less", function() {
                    a(this).hide();
                    a(this).prev().show();
                    a(this).parent().prev().animate({
                        height: b.height
                    }, b.speedUp)
                })
            }
        })
    }
})(jQuery);
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/themes/custom/fortis/libs/showmore/showmore.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/themes/custom/fortis/js/location.js. */
(function($, Drupal) {
    "use strict";
    Drupal.behaviors.setCookie = {
        attach: function(context, drupalSettings) {
            if (drupalSettings.fortis.cookies != undefined) {
                var data = drupalSettings.fortis.cookies;
                setCookie('Drupal_visitor_tid', data.locationid, 1);
                setCookie('Drupal_visitor_location', data.name, 1);
                setCookie('Drupal_visitor_ctids', data.child_tids, 1);
                setCityInLocationDropdown();
            }
        }
    }
    var glb_loc = '';

    // Locations dropdown option click.
    $('body').on('change', '#locations', function() {
        if ($(this).val() != '') {
            let dvtids = $("#locations option:selected").val();
            let dvctids = $("#locations option:selected").attr('data-attr');
            let combined_tids = dvtids;
            if (dvctids != '') {
                combined_tids = dvctids;
            }

            let dvcnames = $("#locations option:selected").attr('data-name-attr');
            let selected_location_name = '';
            if (dvcnames != '') {
                selected_location_name = dvcnames;
            } else {
                selected_location_name = $("#locations option:selected").text();
            }
            setCookie('Drupal_visitor_tid', dvtids, 1);
            setCookie('Drupal_visitor_location', selected_location_name, 1);
            setCookie('Drupal_visitor_ctids', combined_tids, 1);
            let url = new URL(window.location.href);
            url = removeURLParameter(url.toString(), 'location');
            url = new URL(url);

            if (window.location.search == '') {
                url.searchParams.set('location', getCookie('Drupal_visitor_location'));
            } else {
                url.searchParams.append('location', getCookie('Drupal_visitor_location'));
            }
            window.location.href = url.toString();
        } else {
            setCookie('Drupal_visitor_location', null, 1);
            setCookie('Drupal_visitor_tid', null, 1);
            setCookie('Drupal_visitor_ctids', null, 1);
            let url = new URL(window.location.href);
            url = removeURLParameter(url.toString(), 'location');
            url = new URL(url);

            if (window.location.search == '') {
                url.searchParams.set('location', 'all');
            } else {
                url.searchParams.append('location', 'all');
            }
            window.location.href = url.toString();
        }
    });

    setCityInLocationDropdown();

    // Very important function call. Do not remove.
    cityNameByIPData();

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function deleteCookie(cname) {
        document.cookie = cname + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    function cityNameByIPData() {
        if (!getCookie('Drupal_visitor_location')) {
            // Default location.
            setCookie('Drupal_visitor_location', null, 1);
            setCookie('Drupal_visitor_tid', null, 1);
            setCookie('Drupal_visitor_ctids', null, 1);

            $.ajax({
                url: 'https://ipgeolocation.abstractapi.com/v1/?api_key=7582c990117448f8855c2fbd94711850',
                type: 'GET',
                async: false,
                success: function(resp) {

                    glb_loc = resp.city;

                    // If API response city is not available in dropdown.
                    // Set all locations.
                    if (!findValueInSelect('locations', resp.city)) {
                        setCookie('Drupal_visitor_location', null, 1);
                        setCookie('Drupal_visitor_tid', null, 1);
                        setCookie('Drupal_visitor_ctids', null, 1);
                    } else {
                        let selectattr = getValuesFromSelect('locations', resp.city);
                        setCookie('Drupal_visitor_tid', selectattr.tid, 1);
                        let combined_tids = selectattr.tid;
                        if (selectattr.ctids != '') {
                            combined_tids = selectattr.ctids;
                        }
                        if (selectattr.child_names != '') {
                            setCookie('Drupal_visitor_location', selectattr.child_names, 1);
                        }
                        setCookie('Drupal_visitor_ctids', combined_tids, 1);
                    }

                    setCityInLocationDropdown();

                },
                error: function(jqXHR, error, errorThrown) {
                    if (jqXHR.status && jqXHR.status != 200) {
                        setCookie('Drupal_visitor_location', null, 1);
                        setCookie('Drupal_visitor_tid', null, 1);
                        setCookie('Drupal_visitor_ctids', null, 1);
                        console.log(jqXHR.responseText);
                    }
                }
            });

            if (glb_loc != '') {
                $.ajax({
                    url: '/grp/location/' + glb_loc,
                    type: 'GET',
                    async: false,
                    contentType: "application/json",
                    success: function(response) {
                        const resp = JSON.parse(response);
                        if (resp.status == 'success') {
                            $('#locations').val(resp.tid);
                            setCookie('Drupal_visitor_tid', resp.tid, 1);
                            let combined_tids = resp.tid;
                            if (resp.child != '') {
                                combined_tids = resp.child;
                            }
                            if (resp.child_names != '') {
                                setCookie('Drupal_visitor_location', resp.child_names, 1);
                            }
                            setCookie('Drupal_visitor_ctids', combined_tids, 1);
                        }
                    },
                    error: function(jqXHR, error, errorThrown) {
                        if (jqXHR.status && jqXHR.status != 200) {
                            setCookie('Drupal_visitor_location', null, 1);
                            setCookie('Drupal_visitor_tid', null, 1);
                            setCookie('Drupal_visitor_ctids', null, 1);
                            console.log(jqXHR.responseText);
                        }
                    }
                });
            }

        }
        return getCookie('Drupal_visitor_location');
    }

    function setCityInLocationDropdown() {
        if (getCookie('Drupal_visitor_tid')) {
            let city_tid = getCookie('Drupal_visitor_tid');
            let currentCity = getCookie('Drupal_visitor_location');
            var locationUrl;
            var bookAppointment;
            if (city_tid == 'null') {
                $("#locations").val(null);
            } else {
                $("#locations").val(city_tid);
            }

            // let city_selected = false;
            // $("#locations > option").each(function() {
            //     let optionvalue = $(this).val();
            //     optionvalue = optionvalue.trim();
            //     if (city_tid === optionvalue) {
            //       $(this).attr('selected', 'selected');
            //       city_selected = true;
            //     }
            // });
            // if (!city_selected) {
            //   $("#locations").val('');
            // }

            if (getCookie('Drupal_visitor_location') == '--Select--') {
                setCookie('Drupal_visitor_location', null, 1);
                setCookie('Drupal_visitor_tid', null, 1);
                setCookie('Drupal_visitor_ctids', null, 1);
            }
            if (currentCity != 'null') {
                var bookAppointmentUrl = '';
                var healthcheckupUrl = '';
                var doctorsLocationUrl = '';
                var healthLocationUrl = '';
                // Header Book appointment link.
                bookAppointmentUrl = $('.book-appointment a').attr('href');
                healthcheckupUrl = $('.get-healthcheckup a').attr('href');
                doctorsLocationUrl = updateQueryString(bookAppointmentUrl, 'location', currentCity);
                healthLocationUrl = updateQueryString(healthcheckupUrl, 'location', currentCity);
                $('.book-appointment a').attr('href', doctorsLocationUrl);
                $('.get-healthcheckup a').attr('href', healthLocationUrl);
            }
        }
    }

    function findValueInSelect(id, search) {
        let found = false;
        search = search.toUpperCase();
        $("#" + id + " > option").each(function() {
            let optionvalue = $(this).text().toUpperCase();
            optionvalue = optionvalue.trim();
            if (search === optionvalue) {
                found = true;
            }
        });
        return found;
    }

    function getValuesFromSelect(id, search) {
        let data = {
            'tid': null,
            'ctids': null,
            'child_names': null
        };
        search = search.toUpperCase();
        $("#" + id + " > option").each(function() {
            let optionvalue = $(this).text().toUpperCase();
            optionvalue = optionvalue.trim();
            if (search === optionvalue) {
                data.tid = $(this).val();
                data.ctids = $(this).attr('data-attr');
                data.child_names = $(this).attr('data-name-attr');
            }
        });
        return data;
    }

    function removeURLParameter(url, parameter) {
        //prefer to use l.search if you have a location/link object
        var urlparts = url.split('?');
        if (urlparts.length >= 2) {

            var prefix = encodeURIComponent(parameter) + '=';
            var pars = urlparts[1].split(/[&;]/g);

            //reverse iteration as may be destructive
            for (var i = pars.length; i-- > 0;) {
                //idiom for string.startsWith
                if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                    pars.splice(i, 1);
                }
            }

            return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
        }
        return url;
    }

    function updateQueryString(url, newKey, newValue) {
        var params = {};
        var queryString;
        if (typeof url !== 'undefined' && url !== '') {
            var urlSplits = url.split("?");
            var baseURL = urlSplits[0];
            var queryString = urlSplits[1];
        }
        var result = '';
        var queries;

        if (!queryString) {
            params[newKey] = newValue;
            if (typeof baseURL !== 'undefined' && baseURL !== '') {
                var hashSplits = baseURL.split("#");
                baseURL = hashSplits[0];
                var hash = hashSplits[1];
                var result = baseURL + "?" + newKey + "=" + newValue;
                if (hash) {
                    result += "#" + hash;
                }
            }
            return result;
        } else {
            var hashSplits = queryString.split("#");
            var hash = hashSplits[1];

            if (queryString) {
                queries = queryString.split("&");
                result = baseURL + "?" + newKey + "=" + newValue;
                for (var i = 0; i < queries.length; i++) {
                    var hashSplits = queries[i].split("#");
                    var keyValues = hashSplits[0].split('=');
                    if (newKey != keyValues[0]) {
                        result = result + "&" + keyValues[0] + "=" + keyValues[1];
                    }
                }
            }
            var hashSplits = queryString.split("#");
            var hash = hashSplits[1];
            if (hash) {
                result += "#" + hash;
            }
        }
        return result;
    }
    $(document).ready(function() {
        // Location based pages.
        if (jQuery('.location-pages-link').length > 0) {
            var currentCity = getCookie('Drupal_visitor_location');
            var href;
            var locationUrl;
            if (currentCity != 'null') {
                // Home page location based URL.
                $('.location-pages-link').each(function() {
                    href = $(this).attr('href');
                    locationUrl = updateQueryString(href, 'location', currentCity);
                    $(this).attr('href', locationUrl);
                });
            }
        }
    });

})(jQuery, Drupal);

/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/themes/custom/fortis/js/location.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/themes/custom/fortis/js/common.js. */
(function($, Drupal) {
    "use strict";
    Drupal.behaviors.homepage = {
        attach: function(context, settings) {
            // Menu Center of excellence //
            $(document).click(function() {
                $(".int-main-header > ul > li.menu-item--expanded").removeClass("menu-open");
            });
            $(".int-main-header > ul > li.menu-item--expanded").click(function(event) {
                event.stopPropagation();
            });
            $('.int-main-header .menu-item--expanded > a').off('click')
            $('.int-main-header .menu-item--expanded > a').on("click", function(e) {
                e.preventDefault();
                if ($(this).closest(".menu-item").hasClass("menu-open")) {
                    $(this).closest(".menu-item").removeClass("menu-open");
                } else {
                    $(".menu-item").removeClass("menu-open");
                    $(this).closest(".menu-item").addClass("menu-open");
                }
            });
            //mobile center of excellence //
            if (jQuery(".international-header").length) {
                if ($(window).width() < 1199) {
                    jQuery(".int-top-header .int-top-menu-list > li").appendTo('.int-main-header .int-main-menu-list');
                    //internatinal mobile menu
                    $(".international-main-header").on("click", function(event) {
                        $('.international-header').toggleClass('z-index');
                        $(this).toggleClass('active')
                        $('body').toggleClass('overflow-hidden');
                    });
                }
            }
            // Location Dropdown filter check.
            if (jQuery('#header-top-nav-wrapper li.locations-dropdown').length) {
                var locationCheck = drupalSettings.fortis.locationDropdown;
                if (locationCheck) {
                    jQuery('#header-top-nav-wrapper li.locations-dropdown').removeClass('hide');
                }
            }
            jQuery(".media-center-tab-append > header").before(jQuery(".quicktabs-wrapper.on-the-gray"));
            // End Location Dropdown filter check.
            if (!jQuery("body .custom-call").length) {
                jQuery("body").append('<div class="custom-call"></div>');
                //slider for landing pages
                if (jQuery(".landing-section").length) {
                    jQuery(".get-care-list, .breakthrough-slider, .patient-slider, .facility-slider-two, .team-experts-slider, .explore-video-list.landing-video-slider, .center-list-inner").not('.slick-initialized').slick({
                        infinite: false,
                        speed: 800,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        variableWidth: true,
                        responsive: [{
                            breakpoint: 767,
                            settings: "unslick"
                        }],
                    })
                }
                if (jQuery(".breakthrough-slider").length) {
                    $(".breakthrough-slider").not('.slick-initialized').slick({
                        infinite: true,
                        speed: 800,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        variableWidth: true,
                        responsive: [{
                            breakpoint: 767,
                            settings: "unslick"
                        }],
                    });
                }
                if (jQuery(".patient-slider").length) {
                    $(".patient-slider").not('.slick-initialized').slick({
                        infinite: true,
                        speed: 800,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        variableWidth: true,
                        responsive: [{
                            breakpoint: 767,
                            settings: "unslick"
                        }],
                    });
                }
                if (jQuery(".facility-slider").length) {
                    jQuery(".facility-slider").not('.slick-initialized').slick({
                        infinite: true,
                        speed: 800,
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        variableWidth: true,
                        responsive: [{
                                breakpoint: 1100,
                                slidesToShow: 1,
                                settings: {},
                            },
                            {
                                breakpoint: 767,
                                settings: "unslick"
                            }
                        ],
                    });
                }
                if (jQuery(".centre-slider").length) {
                    jQuery(".centre-slider").not('.slick-initialized').slick({
                        infinite: true,
                        speed: 800,
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        variableWidth: true,
                        responsive: [{
                                breakpoint: 900,
                                settings: {
                                    slidesToShow: 1,
                                },
                            },
                            {
                                breakpoint: 767,
                                settings: "unslick"
                            }
                        ],
                    });
                }
                if (jQuery(".blog-slider").length) {
                    jQuery(".blog-slider").not('.slick-initialized').slick({
                        infinite: true,
                        speed: 800,
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        variableWidth: true,
                        responsive: [{
                                breakpoint: 900,
                                settings: {
                                    slidesToShow: 2,
                                },
                            },
                            {
                                breakpoint: 767,
                                settings: "unslick"
                            }
                        ],
                    });
                }
                //Medical hospital Slider.
                if (jQuery(".medical-hospital-slider").length) {
                    jQuery(".medical-hospital-slider").not('.slick-initialized').slick({
                        infinite: true,
                        speed: 800,
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        variableWidth: true,
                        responsive: [{
                                breakpoint: 900,
                                settings: {
                                    slidesToShow: 2,
                                },
                            },
                            {
                                breakpoint: 767,
                                settings: "unslick"
                            }
                        ],
                    });
                }
                if (jQuery(".team-experts-slider").length) {
                    jQuery(".team-experts-slider").not('.slick-initialized').slick({
                        infinite: true,
                        speed: 800,
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        variableWidth: true,
                        responsive: [{
                                breakpoint: 900,
                                settings: {
                                    slidesToShow: 2,
                                },
                            },
                            {
                                breakpoint: 767,
                                settings: "unslick"
                            }
                        ],
                    });
                }
                if ($(window).width() >= 768) {
                    if (jQuery(".speciality-card-slider").length) {
                        jQuery(".speciality-card-slider").not('.slick-initialized').slick({
                            infinite: true,
                            speed: 800,
                            slidesToShow: 7,
                            slidesToScroll: 1,
                            variableWidth: true,
                            responsive: [{
                                    breakpoint: 900,
                                    settings: {
                                        slidesToShow: 4,
                                    },
                                },
                                {
                                    breakpoint: 767,
                                    settings: "unslick"
                                }
                            ],
                        });
                    }
                }
                if (jQuery(".hospital-list-slider .hospital-list").length) {
                    jQuery(".hospital-list-slider .hospital-list").not('.slick-initialized').slick({
                        infinite: true,
                        speed: 800,
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        variableWidth: true,
                        responsive: [{
                                breakpoint: 900,
                                settings: {
                                    slidesToShow: 2,
                                },
                            },
                            {
                                breakpoint: 767,
                                settings: "unslick"
                            }
                        ],
                    });
                }
                if (jQuery(".news-event-slider").length) {
                    jQuery(".news-event-slider").not('.slick-initialized').slick({
                        infinite: true,
                        speed: 800,
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        variableWidth: true,
                        responsive: [{
                                breakpoint: 900,
                                settings: {
                                    slidesToShow: 2,
                                },
                            },
                            {
                                breakpoint: 767,
                                settings: "unslick"
                            }
                        ],
                    })
                }
                //More News Slider || News Detail Page
                if (jQuery(".news-slider").length) {
                    jQuery(".news-slider").not('.slick-initialized').slick({
                        infinite: false,
                        speed: 800,
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        variableWidth: true,
                        responsive: [{
                                breakpoint: 900,
                                settings: {
                                    slidesToShow: 2,
                                },
                            },
                            {
                                breakpoint: 767,
                                settings: "unslick"
                            }
                        ],
                    })
                }
                //Video Slider || Details Page
                if (jQuery(".video-slider").length) {
                    jQuery(".video-slider").not('.slick-initialized').slick({
                        infinite: false,
                        speed: 800,
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        variableWidth: true,
                        responsive: [{
                                breakpoint: 900,
                                settings: {
                                    slidesToShow: 2,
                                },
                            },
                            {
                                breakpoint: 767,
                                settings: "unslick"
                            }
                        ],
                    })
                }
                if (jQuery(".medical-video-block").length) {
                    jQuery(".explore-video-list.landing-video-slider").not('.slick-initialized').slick({
                        infinite: false,
                        speed: 800,
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        variableWidth: true,
                        responsive: [{
                                breakpoint: 900,
                                settings: {
                                    slidesToShow: 2,
                                },
                            },
                            {
                                breakpoint: 767,
                                settings: "unslick"
                            }
                        ],
                    })
                }
                //CSR Accordian Slider
                if (jQuery(".gallery-sec").length) {
                    jQuery(".gallery-sec").not('.slick-initialized').slick({
                        infinite: true,
                        speed: 800,
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        //variableWidth: true,
                        responsive: [{
                                breakpoint: 900,
                                settings: {
                                    slidesToShow: 2,
                                },
                            },
                            {
                                breakpoint: 767,
                                settings: "unslick"
                            }
                        ],
                    })
                }
            }
            //hide view elements when its empty
            jQuery('.section-empty').each(function() {
                setTimeout(function() {
                    if (jQuery(this).children().length === 0) {
                        jQuery(this).hide();
                    } else if (jQuery(this).children().children().length === 0) {
                        jQuery(this).hide();
                    }
                }, 200)
            })

            // Hide ambulance number info when no hospital selected.
            var selected_value = $('#hospitals_info').val();
            if (!selected_value) {
                $("div#ambulance-information .ambulance-info").remove();
            }
            //hospital listing fieldset convert into div for slider
            jQuery('#views-exposed-form-hospital-listing-page-1 > fieldset,#views-exposed-form-academic-specialties-block-2 > fieldset').contents().unwrap().wrap('<div/>');
            //Request a call back pop-up.
            $('.request-callback-menu').click(function(e) {
                $('.request-callback').trigger('click');
                $('body').css('overflow', 'hidden');
                //e.preventDefault();
            });

            $(document).ajaxComplete(function() {
                // for medical procedure read more height //
                jQuery(".medical-procedure-main-heading .readmore-section .more").click(function() {
                    jQuery(this).parent().siblings().addClass('show');
                });
                jQuery(".medical-procedure-main-heading .readmore-section .less").click(function() {
                    jQuery(this).parent().siblings().removeClass('show');
                });

                jQuery('.ui-dialog button.ui-dialog-titlebar-close').on('click', function() {
                    jQuery('body').css('overflow', '')
                });
                $('.request-callback-menu').click(function(e) {
                    $('.request-callback').trigger('click');
                    $('body').css('overflow', 'hidden');
                    //e.preventDefault();
                });

                var gaenable = drupalSettings.fortis.ag;
                if (gaenable) {
                    $('.path-frontpage .request-callback-modal input').on('click', function(e) {
                        ga('send', 'event', 'Request a Call Back', 'Click');
                    });
                    $('.fortis-path-specialities .request-callback-modal input').on('click', function(e) {
                        ga('send', 'event', 'Request a Call Back', 'Click');
                    });
                    //book-appointment
                    $('.fortis-path-specialities li.book-appointment > a').on('click', function(e) {
                        ga('send', 'event', 'Book an Appointment', 'Click');

                    });
                    $('.path-frontpage li.book-appointment > a').on('click', function(e) {
                        ga('send', 'event', 'Book an Appointment', 'Click');
                    });
                    jQuery('.views-doctor-listing .book_appointment a.button.white').on('click', function(e) {
                        ga('send', 'event', 'Doctor Profile', 'Click');
                    });

                    jQuery('#domestic-form3-form #edit-submit').on('click', function(e) {
                        ga('send', 'event', 'landing page', 'Click');
                    });

                    jQuery('.landing-header-right .header_phone a').on('click', function(e) {
                        ga('send', 'event', 'Call Back', 'Click');
                    });
                    jQuery(".header-bottom-nav").on("click", "img[alt='Get health checkup']", function() {
                        ga('send', 'event', 'Get Help Check Up', 'Click');
                    });
                }

                // Immigration Page - About facility Setion.
                jQuery('.gallery-outer .gl-view-all .view-all').click(function() {
                    // Check if the number of list items is less than six
                    if (jQuery('.gallery-outer .gallery-list li').length < 6) {
                        // Hide the view-all element
                        jQuery('.gallery-outer .gl-view-all .view-all').hide();
                    } else {
                        // Hide the parent container
                        jQuery('.gallery-outer .gl-view-all').hide();
                        // Show all list items
                        jQuery('.gallery-outer .gallery-list li').show();
                    }
                    // Prevent the default action of the click event
                    return false;
                });
                if (jQuery('.gallery-outer .gallery-list li').length <= 6) {
                    // Hide the view-all element
                    jQuery('.gallery-outer .gl-view-all .view-all').hide();
                }
            })
            var gachecked = drupalSettings.fortis.ag;
            if (gachecked) {
                jQuery(".header-bottom-nav").on("click", "img[alt='Get health checkup']", function() {
                    ga('send', 'event', 'Get Help Check Up', 'Click');
                });
                jQuery('.landing-header-right .header_phone a').on('click', function(e) {
                    ga('send', 'event', 'Call Back', 'Click');
                });

                jQuery('#domestic-form3-form #edit-submit').on('click', function(e) {
                    ga('send', 'event', 'landing page', 'Click');
                });

                jQuery('.views-doctor-listing .book_appointment a.button.white').on('click', function(e) {
                    ga('send', 'event', 'Doctor Profile', 'Click');
                });
                $('.fortis-path-specialities li.book-appointment > a').on('click', function(e) {
                    ga('send', 'event', 'Book an Appointment', 'Click');
                });
                $('.path-frontpage li.book-appointment > a').on('click', function(e) {
                    ga('send', 'event', 'Book an Appointment', 'Click');
                });
                $('.path-frontpage .request-callback-modal input').on('click', function(e) {
                    ga('send', 'event', 'Request a Call Back', 'Click');
                });
                $('.fortis-path-specialities .request-callback-modal input').on('click', function(e) {
                    ga('send', 'event', 'Request a Call Back', 'Click');
                });

            }

            //fortis-path-specialities
            // doctor listing page
            $(".form-item-field-speciality .form-select").change(function() {
                jQuery("#views-exposed-form-doctor-listing-page-1 .form-actions .form-submit").trigger("click");
            });
            $(".form-item-field-hospitals .form-select").change(function() {
                jQuery("#views-exposed-form-doctor-listing-page-1 .form-actions .form-submit").trigger("click");
            });
            $(".form-item-field-location .form-select").change(function() {
                jQuery("#views-exposed-form-hospital-listing-page-1 .form-actions .form-submit").trigger("click");
            });
            $(".views-doctor-listing .doctor_filters .search-icon").click(function() {
                jQuery("#views-exposed-form-doctor-listing-page-1 .form-actions .form-submit").trigger("click");
            });
            $(".hospital-view .search-icon").click(function() {
                jQuery("#views-exposed-form-hospital-listing-page-1 .form-actions .form-submit").trigger("click");
            });
            // breakthrough listing page
            $(".form-item-field-single-speciality .form-select").change(function() {
                jQuery("#views-exposed-form-breakthrough-cases-block-block-1 .form-actions .form-submit").trigger("click");
            });
            $(".form-item-field-hospital .form-select").change(function() {
                jQuery("#views-exposed-form-breakthrough-cases-block-block-1 .form-actions .form-submit").trigger("click");
            });
            $(".form-item-field-location .form-select").change(function() {
                jQuery("#views-exposed-form-breakthrough-cases-block-block-1 .form-actions .form-submit").trigger("click");
            });
            // Patient testimonials page
            $(".form-item-field-single-speciality .form-select").change(function() {
                jQuery("#views-exposed-form-patient-testimonials-block-1 .form-actions .form-submit").trigger("click");
            });
            $(".form-item-field-hospital .form-select").change(function() {
                jQuery("#views-exposed-form-patient-testimonials-block-1 .form-actions .form-submit").trigger("click");
            });
            $(".form-item-field-location .form-select").change(function() {
                jQuery("#views-exposed-form-patient-testimonials-block-1 .form-actions .form-submit").trigger("click");
            });
            // News & Events
            $(".news-listing-outer .views-exposed-form .search-icon").click(function() {
                jQuery("#views-exposed-form-news-events-block-1 .form-actions .form-submit").trigger("click");
            });
            $("#views-exposed-form-compliance-report-block-1 .form-select").change(function() {
                jQuery("#views-exposed-form-compliance-report-block-1 .form-actions .form-submit").trigger("click");
            });
            $("#views-exposed-form-compliance-statutory-report-block-1 .form-select").change(function() {
                $('.js-form-item-statutory-hospitals input').val($(this).val());
                $("#views-exposed-form-compliance-statutory-report-block-1 .form-actions .form-submit").trigger("click");
            });
            $("#views-exposed-form-organ-transplant-table-block-1 .form-select").change(function() {
                jQuery("#views-exposed-form-organ-transplant-table-block-1 .form-actions .form-submit").trigger("click");
            })
            //Technology Section
            $("#views-exposed-form-technology-section-block-2 .form-select").change(function() {
                jQuery("#views-exposed-form-technology-section-block-2 .form-actions .form-submit").trigger("click");
            })
            $("#views-exposed-form-technology-section-block-2 .search-icon").click(function() {
                jQuery("#views-exposed-form-technology-section-block-2 .form-actions .form-submit").trigger("click");
            });
            //converting sellect box into ul li
            if (!$('#views-exposed-form-hospital-listing-page-1 .form-item-field-location ul, #views-exposed-form-hospital-listing-block-1 .form-item-field-location ul, #views-exposed-form-medical-procedure-details-block-4 .form-item-field-location-target-id ul, #views-exposed-form-hospital-listing-hospitals-speciality .form-item-field-location ul').length) {
                var $Filter = $(".hospital-view #views-exposed-form-hospital-listing-page-1 .form-select, .hospital-view #views-exposed-form-hospital-listing-block-1 .form-select, .hospital-view-medical #views-exposed-form-medical-procedure-details-block-4 .form-select, .hospital-view #views-exposed-form-hospital-listing-hospitals-speciality .form-select");
                $Filter.find("option").map(function() {
                    var $this = $(this);
                    return $("<li>").attr("value", $this.attr("value")).text($this.text()).get();
                }).appendTo($("<ul data-drupal-selector='edit-field-location' name='field_location' class='filter-form-list'>").attr({
                    id: $Filter.attr("id"),
                })).parent().once().appendTo("#views-exposed-form-hospital-listing-page-1 .form-item-field-location, #views-exposed-form-hospital-listing-block-1 .form-item-field-location, #views-exposed-form-medical-procedure-details-block-4 .form-item-field-location-target-id, #views-exposed-form-hospital-listing-hospitals-speciality .form-item-field-location");
            }
            //var allOptions = $(".filter-form-list").find('li');
            $(".filter-form-list").on("click", "li", function() {
                valueFilter = $(this).attr('value');
                console.log(valueFilter);
                $(".hospital-view #views-exposed-form-hospital-listing-page-1 .form-select, .hospital-view #views-exposed-form-hospital-listing-block-1 .form-select, .hospital-view #views-exposed-form-hospital-listing-hospitals-speciality .form-select").val(valueFilter);
                jQuery("#views-exposed-form-hospital-listing-page-1 .form-actions .form-submit, #views-exposed-form-hospital-listing-block-1 .form-actions .form-submit, #views-exposed-form-hospital-listing-hospitals-speciality .form-actions .form-submit").trigger("click");
                $(".hospital-list-slider .hospital-list").slick('refresh');
            });
            $("#views-exposed-form-medical-procedure-details-block-4 .form-select").change(function() {
                jQuery("#views-exposed-form-medical-procedure-details-block-4 .form-submit").trigger("click");
            })
            $(".filter-form-list").on("click", "li", function() {
                valueFilter = $(this).attr('value');
                $("#views-exposed-form-medical-procedure-details-block-4 .form-select").val(valueFilter);
                jQuery("#views-exposed-form-medical-procedure-details-block-4 .form-actions .form-submit").trigger("click");
                $(".hospital-list-slider .hospital-list").slick('refresh');
            });
            jQuery(document).ajaxComplete(function(event, xhr, settings) {
                jQuery(".hospital-list-slider .hospital-list").not('.slick-initialized').slick({
                    infinite: true,
                    speed: 800,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    variableWidth: true,
                    responsive: [{
                            breakpoint: 900,
                            settings: {
                                slidesToShow: 2,
                            },
                        },
                        {
                            breakpoint: 767,
                            settings: "unslick"
                        }
                    ],
                });
                jQuery(".hospital-list-slider .hospital-list").slick('setPosition');
            });
            //slider
            if (jQuery(".filter-form-list").length) {
                jQuery(".filter-form-list").not('.slick-initialized').slick({
                    draggable: true,
                    infinite: false,
                    speed: 300,
                    slidesToShow: 9,
                    slidesToScroll: 1,
                    variableWidth: true,
                    responsive: [{
                            breakpoint: 1023,
                            settings: {
                                slidesToShow: 5,
                                slidesToScroll: 1,
                            },
                        },
                        {
                            breakpoint: 767,
                            settings: "unslick"
                        }
                    ],
                });
            }
            //new hospital slider
            if (jQuery("#views-exposed-form-hospital-listing-page-1,#views-exposed-form-academic-specialties-block-2").length) {
                jQuery("#views-exposed-form-hospital-listing-page-1 .form-radios,#views-exposed-form-academic-specialties-block-2 .form-radios").not('.slick-initialized').slick({
                    draggable: true,
                    infinite: false,
                    speed: 300,
                    slidesToShow: 8.9,
                    slidesToScroll: 1,
                    swipeToSlide: true,
                    variableWidth: true,
                    responsive: [{
                            breakpoint: 1023,
                            settings: {
                                slidesToShow: 5,
                                slidesToScroll: 1,
                            },
                        },
                        {
                            breakpoint: 767,
                            settings: "unslick"
                        }
                    ],
                });
            }
            if (jQuery(".health-package-slider, .health-other-package-slider").length) {
                jQuery(".health-package-slider, .health-other-package-slider").not('.slick-initialized').slick({
                    infinite: true,
                    speed: 800,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    variableWidth: true,
                    responsive: [{
                            breakpoint: 900,
                            settings: {
                                slidesToShow: 2,
                            },
                        },
                        {
                            breakpoint: 767,
                            settings: "unslick"
                        }
                    ],
                });
            }
            if (jQuery(".health-categories-slider").length) {
                jQuery(".health-categories-slider").not('.slick-initialized').slick({
                    infinite: true,
                    speed: 800,
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    variableWidth: true,
                    responsive: [{
                            breakpoint: 900,
                            settings: {
                                slidesToShow: 4,
                            },
                        },
                        {
                            breakpoint: 767,
                            settings: "unslick"
                        }
                    ],
                });
            }
            //ajax
            var valueFilter = '';
            $(document).ajaxComplete(function(e) {
                $(".filter-form-list li").each(function(e) {
                    var optFilter = $(this).attr('value');
                    if (valueFilter == optFilter) {
                        $(".filter-form-list li").removeClass('selected');
                        $(this).addClass('selected');
                    }
                });
                //jQuery('.all-medical-view .head-col.title-js').insertAfter("#views-exposed-form-medical-procedures-block-3");
            });
            //doctor listing common filter js
            $(".views-doctor-listing-new .form-item-field-speciality .form-select").change(function() {
                jQuery(".views-doctor-listing-new .form-actions .form-submit").trigger("click");
            });
            $(".views-doctor-listing-new .form-item-field-hospitals .form-select").change(function() {
                jQuery(".views-doctor-listing-new .form-actions .form-submit").trigger("click");
            });
            $(".views-doctor-listing-new .form-item-search-api-fulltext .search-icon").click(function() {
                jQuery(".views-doctor-listing-new .form-actions .form-submit").trigger("click");
            });
            if (jQuery(".table-scroll-outer").length) {
                jQuery('table').each(function() {
                    jQuery(this).once().wrap('<div class="table-scroll"></div>');
                });
            }
            jQuery('.table-inner').each(function() {
                jQuery(this).wrapAll('<div class="table-scroll"></div>');
            });
            var locationId = jQuery('#locations').val();
            if (locationId == "") {
                var locationId = 'NULL';
            }
            if ($('.marketing-banner').length > 0) {
                $('.marketing-banner').show();
                $.ajax({
                    url: '/marketing-banner/' + locationId,
                    type: 'GET',
                    async: false,
                    success: function(resp) {
                        if (resp == '') {
                            $('.marketing-banner').hide();
                        } else {
                            $('.marketing-banner').html(resp);
                        }
                    },
                    error: function(jqXHR, error, errorThrown) {
                        if (jqXHR.status && jqXHR.status != 200) {
                            console.log(jqXHR.responseText);
                        }
                    }
                });
            }

            if ($('.homepage-patient-stories').length > 0) {
                $('.homepage-patient-stories').show();
                $.ajax({
                    url: '/patient-stories-home/' + locationId,
                    type: 'GET',
                    async: false,
                    success: function(resp) {
                        if (resp == '') {
                            $('.homepage-patient-stories').hide();
                        } else {
                            $('.homepage-patient-stories').html(resp);
                        }
                    },
                    error: function(jqXHR, error, errorThrown) {
                        if (jqXHR.status && jqXHR.status != 200) {
                            console.log(jqXHR.responseText);
                        }
                    }
                });
            }

            if ($('.homepage-breakthrough-cases').length > 0) {
                $('.homepage-breakthrough-cases').show();
                $.ajax({
                    url: '/breakthrough-cases-home/' + locationId,
                    type: 'GET',
                    async: false,
                    success: function(resp) {
                        if (resp == '') {
                            $('.homepage-breakthrough-cases').hide();
                        } else {
                            $('.homepage-breakthrough-cases').html(resp);
                        }
                    },
                    error: function(jqXHR, error, errorThrown) {
                        if (jqXHR.status && jqXHR.status != 200) {
                            console.log(jqXHR.responseText);
                        }
                    }
                });
            }

            if ($('.homepage-blogs').length > 0) {
                $('.homepage-blogs').show();
                $.ajax({
                    url: '/blogs-home/' + locationId,
                    type: 'GET',
                    async: false,
                    success: function(resp) {
                        if (resp == '') {
                            $('.homepage-blogs').hide();
                        } else {
                            $('.homepage-blogs').html(resp);
                        }
                    },
                    error: function(jqXHR, error, errorThrown) {
                        if (jqXHR.status && jqXHR.status != 200) {
                            console.log(jqXHR.responseText);
                        }
                    }
                });
            }

            //For marketing banner block on homepage.
            if (jQuery(".marketing-banner .facility-slider").length) {
                jQuery(".marketing-banner .facility-slider").not('.slick-initialized').slick({
                    infinite: true,
                    speed: 800,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    variableWidth: true,
                    responsive: [{
                            breakpoint: 1100,
                            settings: {
                                slidesToShow: 1,
                            },
                        },
                        {
                            breakpoint: 767,
                            settings: "unslick"
                        }
                    ],
                });
            }

            if (jQuery(".breakthrough-slider").length) {
                $(".breakthrough-slider").not('.slick-initialized').slick({
                    infinite: true,
                    speed: 800,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: true,
                    responsive: [{
                        breakpoint: 767,
                        settings: "unslick"
                    }],
                });
            }
            if (jQuery(".patient-slider").length) {
                $(".patient-slider").not('.slick-initialized').slick({
                    infinite: true,
                    speed: 800,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: true,
                    responsive: [{
                        breakpoint: 767,
                        settings: "unslick"
                    }],
                });
            }
            if (jQuery(".centre-slider").length) {
                jQuery(".centre-slider").not('.slick-initialized').slick({
                    infinite: true,
                    speed: 800,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    variableWidth: true,
                    responsive: [{
                            breakpoint: 900,
                            settings: {
                                slidesToShow: 1,
                            },
                        },
                        {
                            breakpoint: 767,
                            settings: "unslick"
                        }
                    ],
                });
            }
            if (jQuery(".blog-slider").length) {
                jQuery(".blog-slider").not('.slick-initialized').slick({
                    infinite: true,
                    speed: 800,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    variableWidth: true,
                    responsive: [{
                            breakpoint: 900,
                            settings: {
                                slidesToShow: 2,
                            },
                        },
                        {
                            breakpoint: 767,
                            settings: "unslick"
                        }
                    ],
                });
            }

            // Setting session storage of doctors data.
            var doctorDetailsData = drupalSettings.fortis.doctorDetails;
            if (doctorDetailsData) {
                sessionStorage.setItem("doctorDetailsData", doctorDetailsData);
            }
        },

    };
    if (jQuery(".landing-section").length) {
        jQuery(".treatment-list").not(".slick-initialized").slick({
            infinite: false,
            speed: 800,
            rows: 2,
            // slidesToScroll: 3,
            slidesPerRow: 3,
            swipeToSlide: true,
            variableWidth: true,
            responsive: [{
                    breakpoint: 1023,
                    settings: {
                        slidesToShow: 2.5,
                        slidesPerRow: 1,
                        slidesToScroll: 2,
                        rows: 2,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 767,
                    settings: "unslick"
                }
            ],
        });
    }


    //landing page offset
    if ($(window).width() > 998) {
        if (jQuery(".landing-pages").length) {
            jQuery(window).scroll(function() {
                var bannerDistance = jQuery('.landing-section').offset().top
                if (jQuery(window).scrollTop() >= bannerDistance + 50) {
                    jQuery('.landing-form').addClass('top-position');
                } else {
                    jQuery('.landing-form').removeClass('top-position');
                }
            });
        }
    }
    //language select dropdown
    jQuery(document).ready(function() {

        //Blog Listing search
        if (jQuery('#block-blogfilterblock').length > 0) {
            jQuery(document.querySelectorAll("#block-blogfilterblock")[1]).remove();
        }

        var ga = window[window['GoogleAnalyticsObject'] || 'ga'];

        if (jQuery('.links li').length > 1) {

            if (!jQuery(".lang-drop .links li").hasClass('is-active')) {
                jQuery(".lang-drop .links li").first().addClass("is-active");
            }

            var cCode;
            jQuery('.links li.is-active').each(function() {
                cCode = jQuery(this).attr('hreflang');
                if (!jQuery('.select-language a.lang-triger').length) {
                    jQuery(this).clone().insertBefore(jQuery('.lang-drop'));
                }
            });
            if (cCode) {
                jQuery('.lang-drop').prev('li').find('a').unwrap().addClass('lang-triger').html(cCode);
            }
            jQuery('.links li a').click(function() {
                jQuery('.lang-triger').text(jQuery(this).parent('li').attr('hreflang'));
            })
        }
    });

    jQuery(document).ready(function() {
        jQuery(".select-language").click(function(e) {
            jQuery(this).toggleClass("open");
            e.stopPropagation();
        });
        jQuery("body").click(function(e) {
            jQuery(".select-language").removeClass("open");
        });
    });
    jQuery('.table-inner').each(function() {
        jQuery(this).wrapAll('<div class="table-scroll"></div>');
    });
    //common tabs function
    jQuery('ul.common-tabs li:first-child').addClass('current');
    jQuery('.common-tabs-outer ul.common-tabs-content:first-child').addClass('current');
    jQuery('ul.common-tabs li').click(function() {
        var tab_id = $(this).attr('data-tab');
        jQuery('ul.common-tabs li').removeClass('current');
        jQuery('.common-tabs-content').removeClass('current');
        jQuery(this).addClass('current');
        jQuery("#" + tab_id).addClass('current');
    })
    //doctor page
    if (jQuery(".doctor_node").length) {
        jQuery(".doctor_available_at").on('click', function() {
            jQuery('.doctor_location').toggle();
        });
    }

    //star implementation
    $.fn.stars = function() {
        return $(this).each(function() {
            $(this).html($('<span />').width(Math.max(0, (Math.min(5, parseFloat($(this).html())))) * 17));
        });
    }
    $(function() {
        $('span.stars').stars();
    });


    jQuery(".blog-listing-outer .pager").appendTo(".blog-listing-outer .blog-listing-sec");
    jQuery(".blog-listing-outer .show-result").appendTo(".blog-listing-outer .blog-listing-sec");
    //Faq Toggle
    jQuery('.faq-sec .faq-title,.initiatives-sec.faq-sec > h3').click(function() {
        jQuery(this).toggleClass('active')
        jQuery(this).parent().siblings().children().removeClass('active')
        jQuery(this).next().slideToggle()
        jQuery(this).parent().siblings().children().next().slideUp();
        return false;
    });

    //Custom Accordion show more content JS
    jQuery(window).on("load", function() {
        var maxLength;
        if (jQuery('.initiatives-box,.gallery-box').length) {
            maxLength = 320;
        } else if (jQuery('.desc-treatment').length) {
            maxLength = 200;
        } else {
            maxLength = 520;
        }

        jQuery(".show-read-more").each(function() {
            var myStr = jQuery(this).text();
            if (jQuery.trim(myStr).length > maxLength) {
                var newStr = myStr.substring(0, maxLength);
                var removedStr = myStr.substring(maxLength, jQuery.trim(myStr).length);
                jQuery(this).empty().html(newStr);
                jQuery(this).append('<span class="more-text">' + removedStr + '</span>');
                jQuery(this).append(' <a href="javascript:void(0);" class="read-more more-btn">' + Drupal.t("Read more") + '</a>');
            }
        })
        jQuery(".show-read-more .read-more").click(function() {
            jQuery(this).siblings(".more-text").slideToggle();
            if (jQuery(this).text() == "Read more") {
                jQuery(this).text(Drupal.t('Read less'));
            } else {
                jQuery(this).text(Drupal.t('Read more'));
            }
        });
    });

    //Faq page ID
    if (window.location.hash) {
        var hash_id = window.location.hash.split('#')[1];
        $('#' + hash_id).next().show();
    }
    //Footer Monu Toggle
    $('footer .footer-top .footer-outer-menu > .menu > li > a').click(function() {
        $(this).toggleClass('active')
        $(this).parent().siblings().children('a').removeClass('active')
        $(this).next().slideToggle()
        $(this).parent().siblings().children('a').next().slideUp();
        return false;
    })
    //Mob view
    if ($(window).width() <= 767) {
        //News Listing Page
        $(".news-listing-outer .views-exposed-form").after($(".listing-pg.after-filter"));
        //Home Page
        $(".path-frontpage .facility-section").after($(".path-frontpage .booking-section"));
        //career page
        $(".careers-page-outer .explore-opportunity .explore-opportunity-list").after($(".careers-page-outer .top-section .top-section-right"));
    }

    //ajax
    $(document).ajaxComplete(function(e) {
        //star jquery for ajax complete
        $.fn.stars = function() {
            return $(this).each(function() {
                $(this).html($('<span />').width(Math.max(0, (Math.min(5, parseFloat($(this).html())))) * 17));
            });
        }
        $(function() {
            $('span.stars').stars();
        });
    });

    $(document).on('click', 'a[href^="#"]', function(e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 60
        }, 500);
    });

    $(".read-more").on('click', function(e) {
        $(this).siblings('.all-content-wrapper').show();
        $(this).siblings('.less-content').hide();
        $(this).siblings('.all-content-wrapper').addClass("open");
    });
    $(".read-more").on('click', function(e) {
        $(this).siblings('.all-content-wrapper').show();
        $(this).siblings('.less-content').hide();
        $(this).siblings('.all-content-wrapper').addClass("open");
    });

    $(".read-less").on('click', function(e) {
        $(this).siblings('.all-content-wrapper').hide();
        $(this).siblings('.less-content').show();
        $(this).siblings('.all-content-wrapper').removeClass("open");
    });

    $(".close-read-more").on('click', function(e) {
        $('.all-content-wrapper').hide();
        $('body').removeClass('static-screen');
    });

    if ($('.slot-header-sticky').length > 0) {
        $('.dialog-off-canvas-main-canvas').css('overflow', 'inherit')
    }

    //Header mega menu outside click
    $(document).click(function() {
        $(".header-links > ul > li.menu-item--expanded").removeClass("menu-open");
    });
    $(".header-links > ul > li.menu-item--expanded").click(function(event) {
        event.stopPropagation();
    });
    //Header
    $('.header-links .menu-item--expanded > a').on("click", function(e) {
        e.preventDefault();
        $(".specialties-item").removeClass("specialties-open");
        if ($(this).closest(".menu-item").hasClass("menu-open")) {
            $(this).closest(".menu-item").removeClass("menu-open");
        } else {
            $(".menu-item").removeClass("menu-open");
            $(this).closest(".menu-item").addClass("menu-open");
        }
    });
    $('.specialties-item--expanded > span').on("click", function(e) {
        e.preventDefault();
        if ($(this).closest(".specialties-item").hasClass("specialties-open")) {
            $(this).closest(".specialties-item").removeClass("specialties-open");
        } else {
            $(".specialties-item").removeClass("specialties-open");
            $(this).closest(".specialties-item").addClass("specialties-open");
        }
    });

    $(".hospitals-left-menu span:first-child").addClass("hospital-open");
    $(".hospitals-right-menu .state-listing:first-child").addClass("hospital-open");
    $(".hospitals-left-menu span").on("click", function(e) {
        $(".city-name .city-name-item:first-child").addClass("city-open");
        $(".city-name-content .city-list-item:first-child").addClass("city-open");
        $(".city-name .city-name-item:first-child").siblings().removeClass("city-open");
        $(".city-name-content .city-list-item:first-child").siblings().removeClass("city-open");
        $(".hospitals-left-menu span").removeClass("hospital-open");
        $(".hospitals-right-menu .state-listing").removeClass("hospital-open");
        $(this).addClass("hospital-open");
        $('.hospitals-right-menu #' + $(this).attr('id')).addClass("hospital-open");
    });

    $(".city-name .city-name-item:first-child").addClass("city-open");
    $(".city-name-content .city-list-item:first-child").addClass("city-open");
    $(".city-name .city-name-item").on("click", function(e) {
        $(".city-name .city-name-item").removeClass("city-open");
        $(".city-name-content .city-list-item").removeClass("city-open");
        $(this).addClass("city-open");
        $('.city-name-content #' + $(this).attr('id')).addClass("city-open");
    });
    $(window).resize(function() {
        if (window.innerWidth > 767) {
            $(".hamburger-menu").hide();
            $(".header-top-nav-wrapper").removeClass('hamb-nav-open');
        }
    });

    $(".hamb").on("click", function(e) {
        $('.header-outer').toggleClass('z-index')
        $(".hamburger-menu").toggle();
        $(".header-top-nav-wrapper").toggleClass('hamb-nav-open');
    });

    $('.hamb-item--expanded > a').on("click", function(e) {
        e.preventDefault();
        if ($(this).closest(".hamb-item").hasClass("hamb-open")) {
            $(this).closest(".hamb-item").removeClass("hamb-open");
        } else {
            $(".hamb-item").removeClass("hamb-open");
            $(this).closest(".hamb-item").addClass("hamb-open");
        }
    });
    //custom scrollbar
    setTimeout(function() {
        if (jQuery(".scrollable").length) {
            jQuery(".scrollable").mCustomScrollbar({
                theme: "dark",
                alwaysShowScrollbar: 0,
                autoHideScrollbar: true,
                mouseWheelPixels: 250,
                callbacks: {
                    onScroll: function() {
                        $(this).removeClass('reached')
                    },
                    onTotalScroll: function() {
                        $(this).addClass('reached')
                    }
                }
            });
        }
    }, 20)
    //scrollbar on about-us journey section
    if ($(window).width() >= 1023) {
        if (jQuery(".our-journey-scroll").length) {
            jQuery('.our-journey-scroll').mCustomScrollbar({
                theme: "dark"
            });
        }
    }


    jQuery(document).on('click', '.play-btn', function() {
        // get required DOM Elements
        if (jQuery(this).next('iframe').attr('src')) {
            jQuery('.video-popup video').hide();
            var iframe_src = jQuery(this).next('iframe').attr('src'),
                iframe = jQuery('.video-popup'),
                iframe_video = jQuery('.video-popup iframe'),
                close_btn = jQuery('.close-video');
            iframe_src = iframe_src + '?autoplay=1&rel=0'; // for autoplaying the popup video
            // change the video source with the clicked one
            jQuery(iframe_video).attr('src', iframe_src);
            jQuery(iframe).fadeIn().addClass('show-video');
            jQuery('.video-popup iframe').show();
            // remove the video overlay when clicking outside the video
            jQuery(document).on('click', function(e) {
                if (jQuery(iframe).is(e.target) || jQuery(close_btn).is(e.target)) {
                    jQuery(iframe).fadeOut().removeClass('show-video');
                    jQuery(iframe_video).attr('src', '');
                }
            });
        } else {
            jQuery('.video-popup iframe').hide();
            var video_src = jQuery(this).next('.video-mp4').attr('src'),
                mp4_video = jQuery('.video-popup'),
                mp4video_video = jQuery('.video-popup .video-mp4'),
                close_btn = jQuery('.close-video');
            video_src = video_src + '?autoplay=1&rel=0'; // for autoplaying the popup video
            // change the video source with the clicked one
            jQuery(mp4video_video).attr('src', video_src);
            jQuery(mp4_video).fadeIn().addClass('show-video');
            jQuery('.video-popup video').show();
            // remove the video overlay when clicking outside the video
            jQuery(document).on('click', function(e) {
                if (jQuery(mp4_video).is(e.target) || jQuery(close_btn).is(e.target)) {
                    jQuery(mp4_video).fadeOut().removeClass('show-video');
                    jQuery(mp4video_video).attr('src', '');
                }
            });
        }
    });

    // Common Footer FAQ Search form.
    $("#faq-autocomplete-form").keypress(function(e) {
        var url = '';
        var code = e.keyCode ? e.keyCode : e.which;
        if (code.toString() == 13) {
            var url = $('.auto-value').attr('href');
            if (!url) {
                if (!$('#edit-faq-search-box + .err-result').length) {
                    $('#edit-faq-search-box').after('<p class="err-result">' + Drupal.t("No result found.") + '</p>');
                }
                $('#edit-faq-search-box').css('border-color', 'red');
                $('.err-result').show();
            } else {
                $('#edit-faq-search-box').css('border-color', '');
                var base_url = window.location.origin;
                window.location = base_url + $('.auto-value').attr('href');
                var acc_id = $('.auto-value').attr('href').split('#')[1];
                jQuery('.faq-sec #' + acc_id).addClass('active');
            }
            return false;
        }
    });

    // Hide error message.
    jQuery('#faq-autocomplete-form').keydown(function() {
        jQuery('#edit-faq-search-box').css('border-color', '');
        jQuery('.err-result').hide();
    });

    // Reset FAQ form on back button
    window.addEventListener("pageshow", () => {
        $('#faq-autocomplete-form input#edit-faq-search-box').val('');
        $('#faq-autocomplete-form input#edit-faq-search-box').next('p').remove();
        $('.auto-value').remove();
    });

    if ($('.centre-excellence').length > 0) {
        $('.centre-excellence').show();
        $.ajax({
            url: '/coe',
            type: 'GET',
            async: false,
            success: function(resp) {
                if (resp == '') {
                    $('.centre-excellence').hide();
                } else {
                    $('.centre-slider').html(resp);
                }
            },
            error: function(jqXHR, error, errorThrown) {
                if (jqXHR.status && jqXHR.status != 200) {
                    console.log(jqXHR.responseText);
                }
            }
        });
    }

    if ($('#block-youtubeblock').length > 0) {
        var uri = window.location.pathname.toString();
        var convertedUri = uri.replace(/\//g, '&');
        $('#block-youtubeblock').show();
        $.ajax({
            url: '/youtube/' + convertedUri,
            type: 'GET',
            async: false,
            success: function(resp) {
                if (resp == '') {
                    $('#block-youtubeblock').hide();
                } else {
                    $('#block-youtubeblock').html(resp);
                }
            },
            error: function(jqXHR, error, errorThrown) {
                if (jqXHR.status && jqXHR.status != 200) {
                    console.log(jqXHR.responseText);
                }
            }
        });
    }

    if ($('#block-youtubechannelblock').length > 0) {
        var uri = window.location.pathname.toString();
        $('#block-youtubeblock').show();
        $.ajax({
            url: '/youtube-channel',
            type: 'GET',
            async: false,
            success: function(resp) {
                if (resp == '') {
                    $('#block-youtubechannelblock').hide();
                } else {
                    $('#block-youtubechannelblock').html(resp);
                }
            },
            error: function(jqXHR, error, errorThrown) {
                if (jqXHR.status && jqXHR.status != 200) {
                    console.log(jqXHR.responseText);
                }
            }
        });
    }

    //Read More for All with maxHeight condition.
    var maxheight;
    if (jQuery('.about-us-wrap').length) {
        maxheight = 200;
    } else {
        maxheight = 83;
    }
    if (jQuery('.readmore-section').length) {
        jQuery('.readmore-section').showMore({
            speedDown: 300,
            speedUp: 300,
            height: 83,
            showText: 'Read more',
            hideText: 'Read less'
        });
    }
    // Faq View more
    jQuery('.faq-view-more').each(function() {
        if (jQuery(this).find("li").length > 10) {
            var list = jQuery(this).find('.faq-sec li:gt(9)');
            list.hide();
            jQuery(this).find('.view-more').click(function() {
                jQuery(this).hide();
                list.slideToggle(200);
                return false;
            });
        } else {
            jQuery(this).find('.view-more').hide();
        }
    });
    //hide view elements when its empty
    // $('.section-empty').each(function () {
    //   if ($(this).children().length === 0) {
    //     $(this).hide();
    //   }
    // })
    //hide view elements when its empty
    $('.section-empty').each(function() {
        if ($(this).children().length === 0) {
            $(this).hide();
        } else if ($(this).children().children().length === 0) {
            $(this).hide();
        }
    });

    // Faq View more
    if (jQuery('.faq-view-more .faq-sec li').length > 10) {
        var list = jQuery('.faq-view-more .faq-sec li:gt(9)');
        list.hide();
        jQuery('.faq-view-more .view-more').click(function() {
            list.slideToggle(400);
            jQuery('.faq-view-more .view-more').hide();
            return false;
        });
    } else {
        jQuery('.faq-view-more .view-more').hide();
    }

    //header search js
    if ($('.header-top-nav').length) {
        $('.header-search-block .autocomplete-search-form').on('click', function(e) {
            e.stopPropagation();
        })
        $('.header-top-nav .site-search, .search-clear-btn').on('click', function(event) {
            event.stopPropagation();
            $('.header-search-block').show();
            $('.header-top-nav .search-outer').prevAll().hide();
            $('body').addClass('header-search-open');
        })
    }
    $(document).on('click', 'body', function(e) {
        if ($(e.target).hasClass('global-search-block')) {
            e.stopPropagation();
        } else {
            $('.header-search-block').hide();
            $('.header-top-nav .search-outer').prevAll().show();
            $('body').removeClass('header-search-open');
        }
    })
    if ($('.global-search-exposed-form-wrapper').length) {
        setTimeout(function() {
            $('.filter-loader').hide();
            $('.global-search-exposed-form-wrapper').css({
                "opacity": "1",
                "visibility": "visible"
            })
        }, 1000)
    }
    //hide view elements when its empty
    jQuery('.section-empty').each(function() {
        if (jQuery(this).children().length === 0) {
            jQuery(this).hide();
        } else if (jQuery(this).children().children().length === 0) {
            jQuery(this).hide();
        }
    })

})(jQuery, Drupal);

jQuery(window).on('load', function() {
    if (jQuery("#views-exposed-form-compliance-report-block-1").length) {
        let searchParams = new URLSearchParams(window.location.search);
        let isSearchParams = searchParams.has('hospital');
        if (isSearchParams) {} else {
            jQuery("#views-exposed-form-compliance-report-block-1 .form-actions .form-submit").trigger("click");
        }
    }
    if (jQuery("#views-exposed-form-compliance-statutory-report-block-1").length) {
        let searchParams = new URLSearchParams(window.location.search);
        let isSearchParams = searchParams.has('statutory_hospitals');
        if (!isSearchParams) {
            var selectVal = jQuery('.state-hospital').val();
            jQuery('.js-form-item-statutory-hospitals input').val(selectVal);
            jQuery("#views-exposed-form-compliance-statutory-report-block-1 .form-actions .form-submit").trigger("click");
        }
    }

    //global search page filter js
    if (jQuery(".global-search-exposed-form-wrapper").length) {
        jQuery(".global-search-exposed-form-wrapper .form-item-vid-speciality").insertAfter(".global-search-exposed-form-wrapper .form-item-type-doctors");
        if (jQuery("input[checked='checked']").length == 0) {
            jQuery(".global-search-exposed-form-wrapper #edit-reset").addClass('reset-btn');
        } else {
            jQuery(".global-search-exposed-form-wrapper #edit-reset").removeClass('reset-btn');
        }
    }

    //doctor detail page mob about scrol
    if (jQuery(window).width() <= 767) {
        var urlParams = new URLSearchParams(window.location.search);
        var urlQuery = urlParams.toString()
        if (jQuery("#mob-redirect-about").length) {
            if (urlQuery.indexOf('bookAppointment=1') == -1) {
                jQuery('html, body').animate({
                    scrollTop: jQuery("#mob-redirect-about #about").offset().top - 80
                }, 700);
            }
        }
    }

    if (jQuery(".clinical-outcomes-detail-page").length) {
        var imgSrc = jQuery('#clinical-title').attr('data-attr');
        console.log(imgSrc);
        var image = "<div class='clinical-image'><img src='' class='para-image' alt='image'></div>";
        if (jQuery(".table-scroll .clinical-image").length === 0) {
            jQuery('.table-scroll').append(image);
        }
        jQuery(".para-image").attr("src", imgSrc);
    }

    // Immigration Page - About facility Setion.
    if (jQuery("#views-exposed-form-immigration-facility-block-1").length) {
        jQuery("#views-exposed-form-immigration-facility-block-1 .form-actions .form-submit").trigger("click");
    }
    if (jQuery("#views-exposed-form-immigration-hospitals-immigration-facility-block").length) {
        jQuery("#views-exposed-form-immigration-hospitals-immigration-facility-block .form-actions .form-submit").trigger("click");
    }
    jQuery('.gallery-outer .gl-view-all .view-all').click(function() {
        // Check if the number of list items is less than six
        if (jQuery('.gallery-outer .gallery-list li').length < 6) {
            // Hide the view-all element
            jQuery('.gallery-outer .gl-view-all .view-all').hide();
        } else {
            // Hide the parent container
            jQuery('.gallery-outer .gl-view-all').hide();
            // Show all list items
            jQuery('.gallery-outer .gallery-list li').show();
        }
        // Prevent the default action of the click event
        return false;
    });
    if (jQuery('.gallery-outer .gallery-list li').length <= 6) {
        // Hide the view-all element
        jQuery('.gallery-outer .gl-view-all .view-all').hide();
    }

    if (jQuery(".payment-fail-wrapper").length) {
        var paymentProcess = JSON.parse(sessionStorage.getItem("FORTIS__PAYMENT_PROCESS"));
        jQuery(".payment-fail-button").attr("href", paymentProcess.paymentUrl);
    }

    // EWS Section Page.
    if (jQuery("#views-exposed-form-ews-section-block-1").length) {
        jQuery("#views-exposed-form-ews-section-block-1 .form-actions .form-submit").trigger("click");
    }

});

jQuery('body').on('click', '#clinical-title', function() {
    var imgSrc = jQuery(this).attr('data-attr');
    var imgId = jQuery(this).attr('data-id');
    var imgclass = ".para-image-" + imgId;
    jQuery(imgclass).attr("src", imgSrc);
});

if (jQuery(".clinical-outcomes-detail-page").length) {
    jQuery('body').on('click', '#clinical-title', function() {
        var imgSrc = jQuery(this).attr('data-attr');
        var image = "<div class='clinical-image'><img src='' class='para-image' alt='image'></div>";
        if (jQuery(".table-scroll .clinical-image").length === 0) {
            jQuery('.table-scroll').append(image);
        }
        jQuery(".para-image").attr("src", imgSrc);
    });
};

// Load yputube urls after clicking on play
jQuery('.youtube-playlist .play-btn').click(function(e) {
    let src = jQuery(this).attr('data-src');
    if (src) {
        let iframe = "<iframe loading='lazy' width='560' height='315' src='" + src + "' frameborder='0' allowfullscreen></iframe>";
        jQuery(this).after(iframe);
    }
});

jQuery('.home-pg  .patient-box .patient-img .play-btn').click(function(e) {
    let src = jQuery(this).attr('data-src');
    if (src) {
        var isImg = jQuery(this).next();
        if (isImg.is('img')) {
            isImg.remove();
            let iframe = "<iframe loading='lazy' width='560' height='315' src='" + src + "' frameborder='0' allowfullscreen></iframe>";
            jQuery(this).after(iframe);
        }
    }
});
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/themes/custom/fortis/js/common.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/modules/custom/fortis_contact/js/validate.js. */
(function($, Drupal) {
    Drupal.behaviors.fortis_contact_validate = {
        attach: function(context, settings) {
            if ($('.messages').is(':visible')) $('.messages').remove();
            if ($('.success-message').is(':visible')) $('.success-message').delay(5e3).fadeOut('slow');
            $("[id*=edit-phone-number]").keypress(function(e) {
                if ((e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) || (e.target.value.length === 0 && (e.which < 54 || e.which > 57))) return false
            });
            $("[id*=edit-mobile-number]").keypress(function(e) {
                if ((e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) || (e.target.value.length === 0 && (e.which < 54 || e.which > 57))) return false
            });
            $("[id*=edit-first-name]").keypress(function(e) {
                if ((e.which < 65 || e.which > 90) && (e.which < 97 || e.which > 122) && e.which !== 32) return false
            });
            $("[id*=edit-last-name]").keypress(function(e) {
                if ((e.which < 65 || e.which > 90) && (e.which < 97 || e.which > 122) && e.which !== 32) return false
            });
            $("[id*=edit-int-mobile-number]").keypress(function(e) {
                if ((e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) || (e.target.value.length === 0 && (e.which < 47 || e.which > 57))) return false
            });
            $("[id*=edit-contact-number]").keypress(function(e) {
                if ((e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) || (e.target.value.length === 0 && (e.which < 48 || e.which > 57))) return false
            })
        }
    };
    var validMobile = Drupal.t('Please enter a valid mobile number'),
        validEmail = Drupal.t('Please enter a valid email id'),
        validFirstName = Drupal.t('Please enter a valid first name'),
        validLastName = Drupal.t('Please enter a valid last name'),
        mobile = Drupal.t('Please enter mobile number'),
        contact = Drupal.t('Please enter contact number'),
        age = Drupal.t('Please enter Age'),
        patientName = Drupal.t('Please enter Patient Name'),
        email = Drupal.t('Please enter email id'),
        firstName = Drupal.t('Please enter first name'),
        lastName = Drupal.t('Please enter last name'),
        hospital = Drupal.t('Please select hospital'),
        country = Drupal.t('Please select country'),
        companyLocation = Drupal.t('Please enter Company Location'),
        companyDesignation = Drupal.t('Please enter Company Designation'),
        companyName = Drupal.t('Please enter Company Name'),
        CName = Drupal.t('Please enter Corporate Name'),
        cpersonName = Drupal.t('Please enter Contact Person Name'),
        validCpersonName = Drupal.t('Please enter valid Person Name'),
        nEnquiry = Drupal.t('Please select Nature Of Enquiry'),
        speciality = Drupal.t('Please select speciality'),
        feedback_type = Drupal.t('Please select the type of feedback'),
        comments = Drupal.t('Please enter comments'),
        query_type = Drupal.t('Please select the type of query')

    function validateEmail(email) {
        var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return $.trim(email).match(pattern) ? true : false
    };
    jQuery.fn.validateCallback = function() {
        $('span').remove('.error-message');
        if (!($('[id*=edit-first-name]').val())) {
            $('[id*=edit-first-name]').after('<span class="error-message">' + firstName + '</span>');
            $('.error-message').show()
        };
        if (!($('[id*=edit-last-name]').val())) {
            $('[id*=edit-last-name]').after('<span class="error-message">' + lastName + '</span>');
            $('.error-message').show()
        };
        if (!($('[id*=edit-phone-number]').val())) {
            $('[id*=edit-phone-number]').after('<span class="error-message">' + mobile + '</span>');
            $('.error-message').show()
        };
        if (!($('[id*=edit-mobile-number]').val())) {
            $('[id*=edit-mobile-number]').after('<span class="error-message">' + mobile + '</span>');
            $('.error-message').show()
        };
        if (!($('[id*=edit-email]').val())) {
            $('[id*=edit-email]').after('<span class="error-message">' + email + '</span>');
            $('.error-message').show()
        };
        if (($('[id*=edit-hospital-code]').val()) == 0) {
            $('[id*=edit-hospital-code]').after('<span class="error-message">' + hospital + '</span>');
            $('.error-message').show()
        };
        if ($('[id*=edit-country]').val() == 0) {
            $('[id*=edit-country]').after('<span class="error-message">' + country + '</span>');
            $('.error-message').show()
        };
        if (!($('#speciality-text').val())) {
            $('#speciality-text').after('<span class="error-message">' + speciality + '</span>');
            $('.error-message').show()
        };
        if ($('[id*=edit-first-name]').val() && !(/^[a-zA-Z\s]+$/.test($('[id*=edit-first-name]').val()))) $('[id*=edit-first-name]').after('<span class="error-message">' + validFirstName + '</span>');
        if ($('[id*=edit-last-name]').val() && !(/^[a-zA-Z\s]+$/.test($('[id*=edit-last-name]').val()))) $('[id*=edit-last-name]').after('<span class="error-message">' + validLastName + '</span>');
        if ($('[id*=edit-phone-number]').val() && ((/^[6-9][0-9]{0,8}$/.test($('[id*=edit-phone-number]').val())) || !($('[id*=edit-phone-number]').val().length == 10))) $('[id*=edit-phone-number]').after('<span class="error-message">' + validMobile + '</span>');
        if ($('[id*=edit-mobile-number]').val() && (!(/^[6-9][0-9]{0,8}$/.test($('[id*=edit-mobile-number]').val())) || !($('[id*=edit-mobile-number]').val().length == 10))) $('[id*=edit-mobile-number]').after('<span class="error-message">' + validMobile + '</span>');
        if ((!validateEmail($("[id*=edit-email]").val())) && ($('[id*=edit-email]').val().length > 0)) {
            $('[id*=edit-email]').after('<span class="error-message">' + validEmail + '</span>');
            $('.error-message').show()
        };
        $('form input').click(function() {
            $('.error-message').remove()
        })
    };
    jQuery.fn.modalValidateCallback = function() {
        $('span').remove('.error-message');
        $("[id*=edit-phonenumber]").keypress(function(e) {
            if ((e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) || (e.target.value.length === 0 && (e.which < 54 || e.which > 57))) return false
        });
        $("[id*=edit-firstname]").keypress(function(e) {
            if ((e.which < 65 || e.which > 90) && (e.which < 97 || e.which > 122)) return false
        });
        $("[id*=edit-lastname]").keypress(function(e) {
            if ((e.which < 65 || e.which > 90) && (e.which < 97 || e.which > 122)) return false
        });
        if (!($('[id*=edit-firstname]').val())) {
            $('[id*=edit-firstname]').after('<span class="error-message">' + firstName + '</span>');
            $('.error-message').show()
        };
        if (!($('[id*=edit-lastname]').val())) {
            $('[id*=edit-lastname]').after('<span class="error-message">' + lastName + '</span>');
            $('.error-message').show()
        };
        if (!($('[id*=edit-phonenumber]').val())) {
            $('[id*=edit-phonenumber]').after('<span class="error-message">' + mobile + '</span>');
            $('.error-message').show()
        };
        if (!($('[id*=edit-emailid]').val())) {
            $('[id*=edit-emailid]').after('<span class="error-message">' + email + '</span>');
            $('.error-message').show()
        };
        if (($('[id*=edit-hospitalcode]').val()) == 0) {
            $('[id*=edit-hospitalcode]').after('<span class="error-message">' + hospital + '</span>');
            $('.error-message').show()
        };
        if (!($('#speciality-text').val())) {
            $('#speciality-text').after('<span class="error-message">' + speciality + '</span>');
            $('.error-message').show()
        };
        if ($('[id*=edit-firstname]').val() && !(/^[a-zA-Z\s]+$/.test($('[id*=edit-firstname]').val()))) $('[id*=edit-firstname]').after('<span class="error-message">' + validFirstName + '</span>');
        if ($('[id*=edit-lastname]').val() && !(/^[a-zA-Z\s]+$/.test($('[id*=edit-lastname]').val()))) $('[id*=edit-lastname]').after('<span class="error-message">' + validLastName + '</span>');
        if ($('[id*=edit-phonenumber]').val() && ((/^[6-9][0-9]{0,8}$/.test($('[id*=edit-phonenumber]').val())) || !($('[id*=edit-phonenumber]').val().length == 10))) $('[id*=edit-phonenumber]').after('<span class="error-message">' + validMobile + '</span>');
        if ((!validateEmail($("[id*=edit-emailid]").val())) && ($('[id*=edit-emailid]').val().length > 0)) $('[id*=edit-emailid]').after('<span class="error-message">' + validEmail + '</span>');
        $('input').once().click(function() {
            $('.error-message').remove()
        })
    };
    jQuery.fn.validateFormCallback = function(form_id) {
        $('span').remove('.error-message');
        if (!($('#' + form_id + ' input[name=first_name]').val())) {
            $('#' + form_id + ' input[name=first_name]').after('<span class="error-message">' + firstName + '</span>');
            $('.error-message').show()
        };
        if (!($('#' + form_id + ' input[name=last_name]').val())) {
            $('#' + form_id + ' input[name=last_name]').after('<span class="error-message">' + lastName + '</span>');
            $('.error-message').show()
        };
        if (!($('#' + form_id + ' input[name=phone_number]').val())) {
            $('#' + form_id + ' input[name=phone_number]').after('<span class="error-message">' + mobile + '</span>');
            $('.error-message').show()
        };
        if (!($('#' + form_id + ' input[name=mobile_number]').val())) {
            $('#' + form_id + ' input[name=mobile_number]').after('<span class="error-message">' + mobile + '</span>');
            $('.error-message').show()
        };
        if (!($('#' + form_id + ' input[name=email]').val())) {
            $('#' + form_id + ' input[name=email]').after('<span class="error-message">' + email + '</span>');
            $('.error-message').show()
        };
        if (($('#' + form_id + ' [id*=edit-hospital-code]').val()) == 0) {
            $('#' + form_id + ' [id*=edit-hospital-code]').after('<span class="error-message">' + hospital + '</span>');
            $('.error-message').show()
        };
        if (($('#' + form_id + ' [id*=edit-feedback-type]').val()) == 0) {
            $('#' + form_id + ' [id*=edit-feedback-type]').after('<span class="error-message">' + feedback_type + '</span>');
            $('.error-message').show()
        };
        if (($('#' + form_id + ' [id*=edit-query-type]').val()) == 0) {
            $('#' + form_id + ' [id*=edit-query-type]').after('<span class="error-message">' + query_type + '</span>');
            $('.error-message').show()
        };
        if ($('#' + form_id + ' input[name=first_name]').val() && !(/^[a-zA-Z\s]+$/.test($('#' + form_id + ' input[name=first_name]').val()))) $('#' + form_id + ' input[name=first_name]').after('<span class="error-message">' + validFirstName + '</span>');
        if ($('#' + form_id + ' input[name=last_name]').val() && !(/^[a-zA-Z\s]+$/.test($('#' + form_id + ' input[name=last_name]').val()))) $('#' + form_id + ' input[name=last_name]').after('<span class="error-message">' + validLastName + '</span>');
        if ($('#' + form_id + ' input[name=phone_number]').val() && ((/^[6-9][0-9]{0,8}$/.test($('#' + form_id + ' input[name=phone_number]').val())) || ($('#' + form_id + ' input[name=phone_number]').val().length != 10))) $('#' + form_id + ' input[name=phone_number]').after('<span class="error-message">' + validMobile + '</span>');
        if ((!validateEmail($('#' + form_id + ' input[name=email]').val())) && ($('#' + form_id + ' input[name=email]').val().length > 0)) {
            $('#' + form_id + ' input[name=email]').after('<span class="error-message">' + validEmail + '</span>');
            $('.error-message').show()
        };
        $('input').once().click(function() {
            $('.error-message').remove()
        });
        $('.common-tabs li').once().click(function() {
            $('.error-message').remove();
            $('.query-messages-status .success-message').remove();
            $('.messages-status .success-message').remove()
        })
    };
    jQuery.fn.validateLPFormCallback = function(form_id) {
        $('span').remove('.error-message');
        if (!($('#' + form_id + ' input[name=first_name]').val())) {
            $('#' + form_id + ' input[name=first_name]').after('<span class="error-message">' + firstName + '</span>');
            $('.error-message').show()
        };
        if (!($('#' + form_id + ' input[name=last_name]').val())) {
            $('#' + form_id + ' input[name=last_name]').after('<span class="error-message">' + lastName + '</span>');
            $('.error-message').show()
        };
        if (!($('#' + form_id + ' input[name=mobile_number]').val())) {
            $('#' + form_id + ' input[name=mobile_number]').after('<span class="error-message">' + mobile + '</span>');
            $('.error-message').show()
        };
        if (!($('#' + form_id + ' input[name=email]').val())) {
            $('#' + form_id + ' input[name=email]').after('<span class="error-message">' + email + '</span>');
            $('.error-message').show()
        };
        if (($('[id*=edit-country]').val()) == 0) {
            $('[id*=edit-country]').after('<span class="error-message">' + country + '</span>');
            $('.error-message').show()
        };
        if (($('[id*=edit-hospital-code]').val()) == 0) {
            $('[id*=edit-hospital-code]').after('<span class="error-message">' + hospital + '</span>');
            $('.error-message').show()
        };
        if ($('#' + form_id + ' input[name=first_name]').val() && !(/^[a-zA-Z\s]+$/.test($('#' + form_id + ' input[name=first_name]').val()))) $('#' + form_id + ' input[name=first_name]').after('<span class="error-message">' + validFirstName + '</span>');
        if ($('#' + form_id + ' input[name=last_name]').val() && !(/^[a-zA-Z\s]+$/.test($('#' + form_id + ' input[name=last_name]').val()))) $('#' + form_id + ' input[name=last_name]').after('<span class="error-message">' + validLastName + '</span>');
        if ($('#' + form_id + ' input[name=mobile_number]').val() && ((/^[6-9][0-9]{0,8}$/.test($('#' + form_id + ' input[name=mobile_number]').val())) || ($('#' + form_id + ' input[name=mobile_number]').val().length != 10))) $('#' + form_id + ' input[name=mobile_number]').after('<span class="error-message">' + validMobile + '</span>');
        if ((!validateEmail($('#' + form_id + ' input[name=email]').val())) && ($('#' + form_id + ' input[name=email]').val().length > 0)) {
            $('#' + form_id + ' input[name=email]').after('<span class="error-message">' + validEmail + '</span>');
            $('.error-message').show()
        };
        $('input').once().click(function() {
            $('.error-message').remove()
        });
        $('.common-tabs li').once().click(function() {
            $('.error-message').remove();
            $('.messages-status .success-message').remove()
        })
    };
    jQuery.fn.getAnestimateCallback = function() {
        if (!($('[id*=edit-int-name]').val())) {
            $('[id*=edit-int-name]').after('<span class="error-message">' + patientName + '</span>');
            $('.error-message').show()
        };
        if (!($('[id*=edit-age]').val())) {
            $('[id*=edit-age]').after('<span class="error-message">' + age + '</span>');
            $('.error-message').show()
        };
        if ($('[id*=edit-gender]').val() == 0) {
            $('[id*=edit-gender]').after('<span class="error-message">Please select Gender.</span>');
            $('.error-message').show()
        };
        if (!($('[id*=edit-int-country-code]').val())) {
            $('[id*=edit-int-country-code]').after('<span class="error-message">Please select Country Code.</span>');
            $('.error-message').show()
        };
        if (!($('[id*=edit-int-mobile-number]').val())) {
            $('[id*=edit-int-mobile-number]').after('<span class="error-message">' + contact + '</span>');
            $('.error-message').show()
        };
        if ($('#edit-speciality').val() == 0) {
            $('#edit-speciality').after('<span class="error-message">Please select Speciality.</span>');
            $('.error-message').show()
        };
        if ($('#edit-country').val() == 0) {
            $('#edit-country').after('<span class="error-message">' + country + '</span>');
            $('.error-message').show()
        };
        $('form input').click(function() {
            $('.error-message').remove()
        })
    };
    jQuery.fn.resetForm = function(form_id) {
        alert(form_id);
        var countryCode = $('#' + form_id + ' input[name=int_country_code]').val();
        $('#' + form_id).reset();
        $('#' + form_id + ' input[name=int_country_code]').val(countryCode)
    };
    jQuery.fn.validateCUIFormCallback = function(form_id) {
        $('span').remove('.error-message');
        if (!($('#' + form_id + ' input[name=first_name]').val())) {
            $('#' + form_id + ' input[name=first_name]').after('<span class="error-message">' + firstName + '</span>');
            $('.error-message').show()
        };
        if (!($('#' + form_id + ' input[name=last_name]').val())) {
            $('#' + form_id + ' input[name=last_name]').after('<span class="error-message">' + lastName + '</span>');
            $('.error-message').show()
        };
        if (!($('[id*=edit-int-country-code]').val())) {
            $('[id*=edit-int-country-code]').after('<span class="error-message">Please enter Country Code</span>');
            $('.error-message').show()
        };
        if (!($('[id*=edit-int-mobile-number]').val())) {
            $('[id*=edit-int-mobile-number]').after('<span class="error-message">' + contact + '</span>');
            $('.error-message').show()
        };
        if (!($('#' + form_id + ' input[name=email]').val())) {
            $('#' + form_id + ' input[name=email]').after('<span class="error-message">' + email + '</span>');
            $('.error-message').show()
        };
        if (!($('#' + form_id + ' input[name=preferred_date]').val())) {
            $('#' + form_id + ' input[name=preferred_date]').after('<span class="error-message">Please enter Date</span>');
            $('.error-message').show()
        };
        if (($('[id*=edit-country]').val()) == 0) {
            $('[id*=edit-country]').after('<span class="error-message">' + country + '</span>');
            $('.error-message').show()
        };
        if (($('[id*=edit-prefered-date]').val()) == 0) {
            $('[id*=edit-prefered-date]').after('<span class="error-message">' + prefered - date + '</span>');
            $('.error-message').show()
        };
        if (($('[id*=edit-hospital-code]').val()) == 0) {
            $('[id*=edit-hospital-code]').after('<span class="error-message">' + hospital + '</span>');
            $('.error-message').show()
        };
        if ($('#' + form_id + ' input[name=first_name]').val() && !(/^[a-zA-Z\s]+$/.test($('#' + form_id + ' input[name=first_name]').val()))) $('#' + form_id + ' input[name=first_name]').after('<span class="error-message">' + validFirstName + '</span>');
        if ($('#' + form_id + ' input[name=last_name]').val() && !(/^[a-zA-Z\s]+$/.test($('#' + form_id + ' input[name=last_name]').val()))) $('#' + form_id + ' input[name=last_name]').after('<span class="error-message">' + validLastName + '</span>');
        if ((!validateEmail($('#' + form_id + ' input[name=email]').val())) && ($('#' + form_id + ' input[name=email]').val().length > 0)) {
            $('#' + form_id + ' input[name=email]').after('<span class="error-message">' + validEmail + '</span>');
            $('.error-message').show()
        };
        $('input').once().click(function() {
            $('.error-message').remove()
        });
        $('.common-tabs li').once().click(function() {
            $('.error-message').remove();
            $('.messages-status .success-message').remove()
        })
    };
    jQuery.fn.validateAPFormCallback = function(form_id) {
        $('span').remove('.error-message');
        if (!($('#' + form_id + ' input[name=first_name]').val())) {
            $('#' + form_id + ' input[name=first_name]').after('<span class="error-message">' + firstName + '</span>');
            $('.error-message').show()
        };
        if (!($('#' + form_id + ' input[name=last_name]').val())) {
            $('#' + form_id + ' input[name=last_name]').after('<span class="error-message">' + lastName + '</span>');
            $('.error-message').show()
        };
        if (!($('#' + form_id + ' input[name=corporate_name]').val())) {
            $('#' + form_id + ' input[name=corporate_name]').after('<span class="error-message">' + CName + '</span>');
            $('.error-message').show()
        };
        if (!($('#' + form_id + ' input[name=phone_number]').val())) {
            $('#' + form_id + ' input[name=phone_number]').after('<span class="error-message">' + mobile + '</span>');
            $('.error-message').show()
        };
        if (!($('#' + form_id + ' input[name=email]').val())) {
            $('#' + form_id + ' input[name=email]').after('<span class="error-message">' + email + '</span>');
            $('.error-message').show()
        };
        if (($('[id*=edit-nature-of-enquiry]').val()) == 0) {
            $('[id*=edit-nature-of-enquiry]').after('<span class="error-message">' + nEnquiry + '</span>');
            $('.error-message').show()
        };
        if (($('[id*=edit-hospital-code]').val()) == 0) {
            $('[id*=edit-hospital-code]').after('<span class="error-message">' + hospital + '</span>');
            $('.error-message').show()
        };
        if ($('#' + form_id + ' input[name=first_name]').val() && !(/^[a-zA-Z\s]+$/.test($('#' + form_id + ' input[name=first_name]').val()))) $('#' + form_id + ' input[name=first_name]').after('<span class="error-message">' + validFirstName + '</span>');
        if ($('#' + form_id + ' input[name=last_name]').val() && !(/^[a-zA-Z\s]+$/.test($('#' + form_id + ' input[name=last_name]').val()))) $('#' + form_id + ' input[name=last_name]').after('<span class="error-message">' + validLastName + '</span>');
        if ($('#' + form_id + ' input[name=phone_number]').val() && ((/^[-9][0-9]{0,8}$/.test($('#' + form_id + ' input[name=phone_number]').val())) || ($('#' + form_id + ' input[name=phone_number]').val().length != 10))) $('#' + form_id + ' input[name=phone_number]').after('<span class="error-message">' + validMobile + '</span>');
        if ((!validateEmail($('#' + form_id + ' input[name=email]').val())) && ($('#' + form_id + ' input[name=email]').val().length > 0)) {
            $('#' + form_id + ' input[name=email]').after('<span class="error-message">' + validEmail + '</span>');
            $('.error-message').show()
        };
        $('input').once().click(function() {
            $('.error-message').remove()
        });
        $('.common-tabs li').once().click(function() {
            $('.error-message').remove();
            $('.messages-status .success-message').remove()
        })
    };
    jQuery.fn.modalPartnerWithUs = function() {
        $('span').remove('.error-message');
        if (!($('[id*=edit-company-name]').val())) {
            $('[id*=edit-company-name]').after('<span class="error-message">' + companyName + '</span>');
            $('.error-message').show()
        };
        if (!($('[id*=edit-company-location]').val())) {
            $('[id*=edit-company-location]').after('<span class="error-message">' + companyLocation + '</span>');
            $('.error-message').show()
        };
        if (!($('[id*=edit-contact-designation]').val())) {
            $('[id*=edit-contact-designation]').after('<span class="error-message">' + companyDesignation + '</span>');
            $('.error-message').show()
        };
        if (!($('[id*=edit-contact-person]').val())) {
            $('[id*=edit-contact-person]').after('<span class="error-message">' + cpersonName + '</span>');
            $('.error-message').show()
        };
        if (!($('[id*=edit-contact-number]').val())) {
            $('[id*=edit-contact-number]').after('<span class="error-message">' + contact + '</span>');
            $('.error-message').show()
        };
        if (!($('[id*=edit-mail]').val())) {
            $('[id*=edit-mail]').after('<span class="error-message">' + email + '</span>');
            $('.error-message').show()
        };
        if (($('[id*=edit-nature-enquiry]').val()) == 0) {
            $('[id*=edit-nature-enquiry]').after('<span class="error-message">' + nEnquiry + '</span>');
            $('.error-message').show()
        };
        if ($('[id*=edit-contact-person]').val() && !(/^[a-zA-Z\s]+$/.test($('[id*=edit-contact-person]').val()))) $('[id*=edit-contact-person]').after('<span class="error-message">' + validCpersonName + '</span>');
        if ($('[id*=edit-contact-number]').val() && ((/^[0-9][0-9]{0,8}$/.test($('[id*=edit-contact-number]').val())) || !($('[id*=edit-contact-number]').val().length == 10))) $('[id*=edit-contact-number]').after('<span class="error-message">' + validMobile + '</span>');
        if ((!validateEmail($("[id*=edit-email]").val())) && ($('[id*=edit-email]').val().length > 0)) $('[id*=edit-email]').after('<span class="error-message">' + validEmail + '</span>');
        $('input').once().click(function() {
            $('.error-message').remove()
        })
    }
})(jQuery, Drupal)
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/modules/custom/fortis_contact/js/validate.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/themes/custom/fortis/js/request-callback-popup.js. */
(function($, Drupal, drupalSettings) {
    Drupal.behaviors.fortis_contact_global = {
        attach: function(context, settings) {
            $('input').on('focus', function() {
                $(this).parent().next('.error-message').text('')
            });
            if ($('.success-message').is(':visible')) $('.success-message').delay(5e3).fadeOut('slow');
            $("[id*=edit-phonenumber]").keypress(function(e) {
                if ((e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) || (e.target.value.length === 0 && (e.which < 54 || e.which > 57)) || (e.target.value.length > 0 && e.target.selectionStart === 0)) return false
            });
            $("[id*=edit-firstname]").keypress(function(e) {
                if ((e.which < 65 || e.which > 90) && (e.which < 97 || e.which > 122) && e.which !== 32) return false
            });
            $("[id*=edit-lastname]").keypress(function(e) {
                if ((e.which < 65 || e.which > 90) && (e.which < 97 || e.which > 122) && e.which !== 32) return false
            });
            jQuery.fn.successCallback = function() {
                var successMessage = jQuery.isEmptyObject(drupalSettings.successMessage) ? '<div class="message-wrapper"> <div class="pop-up-image"><p> image </p></div><div class="pop-up-title"><h3>Thank You!</h3></div><div class="subtext"><p>Your form has been successfully submitted.</p></div></div>' : drupalSettings.successMessage;
                $(".request-callback-popup").addClass("thank-you-text");
                $(".request-callback-popup").removeClass("form-position");
                $(".request-callback-modal").hide();
                $(".request-callback-popup .ui-dialog-titlebar .ui-dialog-title").hide();
                $(".request-callback-sec").after(' <p class="request-callback-popup-inner">' + successMessage + '</p>')
            };
            jQuery.fn.partnerSuccessCallback = function() {
                var successMessage = jQuery.isEmptyObject(drupalSettings.successMessage) ? '<div class="message-wrapper"> <div class="pop-up-image"><p> image </p></div><div class="pop-up-title"><h3>Thank You!</h3></div><div class="subtext"><p>Your form has been successfully submitted.</p></div></div>' : drupalSettings.successMessage;
                $(".partner-form-modal").addClass("thank-you-text");
                $(".partner-form-modal").removeClass("form-position");
                $(".partner-with-us").hide();
                $(".partner-form-modal .ui-dialog-titlebar .ui-dialog-title").hide();
                $(".partner-callback-sec").after(' <p class="request-callback-popup-inner">' + successMessage + '</p>')
            }
        }
    }
})(jQuery, Drupal, drupalSettings)
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/themes/custom/fortis/js/request-callback-popup.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/libraries/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js. */
! function(a) {
    function f(a, b) {
        if (!(a.originalEvent.touches.length > 1)) {
            a.preventDefault();
            var c = a.originalEvent.changedTouches[0],
                d = document.createEvent("MouseEvents");
            d.initMouseEvent(b, !0, !0, window, 1, c.screenX, c.screenY, c.clientX, c.clientY, !1, !1, !1, !1, 0, null), a.target.dispatchEvent(d)
        }
    };
    if (a.support.touch = "ontouchend" in document, a.support.touch) {
        var e, b = a.ui.mouse.prototype,
            c = b._mouseInit,
            d = b._mouseDestroy;
        b._touchStart = function(a) {
            var b = this;
            !e && b._mouseCapture(a.originalEvent.changedTouches[0]) && (e = !0, b._touchMoved = !1, f(a, "mouseover"), f(a, "mousemove"), f(a, "mousedown"))
        }, b._touchMove = function(a) {
            e && (this._touchMoved = !0, f(a, "mousemove"))
        }, b._touchEnd = function(a) {
            e && (f(a, "mouseup"), f(a, "mouseout"), this._touchMoved || f(a, "click"), e = !1)
        }, b._mouseInit = function() {
            var b = this;
            b.element.bind({
                touchstart: a.proxy(b, "_touchStart"),
                touchmove: a.proxy(b, "_touchMove"),
                touchend: a.proxy(b, "_touchEnd")
            }), c.call(b)
        }, b._mouseDestroy = function() {
            var b = this;
            b.element.unbind({
                touchstart: a.proxy(b, "_touchStart"),
                touchmove: a.proxy(b, "_touchMove"),
                touchend: a.proxy(b, "_touchEnd")
            }), d.call(b)
        }
    }
}(jQuery)
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/libraries/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/modules/contrib/better_exposed_filters/js/bef_datepickers.js. */
(function($, Drupal, drupalSettings) {
    Drupal.behaviors.betterExposedFiltersDatePickers = {
        attach: function(context, settings) {
            var befSettings = drupalSettings.better_exposed_filters;
            if (befSettings && befSettings.datepicker && befSettings.datepicker_options && $.fn.datepicker) {
                var opt = [];
                $.each(befSettings.datepicker_options, function(key, val) {
                    if (key && val) opt[key] = JSON.parse(val)
                });
                $('.bef-datepicker').datepicker(opt)
            }
        }
    }
})(jQuery, Drupal, drupalSettings)
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/modules/contrib/better_exposed_filters/js/bef_datepickers.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/modules/custom/fortis_doctor_details/js/datepicker.js. */
(function(jQuery, Drupal) {
    "use strict";
    Drupal.behaviors.date = {
        attach: function(context, settings) {
            jQuery('.bef-datepicker').datepicker();
            jQuery('.bef-datepicker-current').datepicker({
                minDate: 0
            })
        }
    }
})(jQuery, Drupal)
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/modules/custom/fortis_doctor_details/js/datepicker.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/core/assets/vendor/js-cookie/js.cookie.min.js. */
/*! js-cookie v3.0.1 | MIT */
! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self, function() {
        var n = e.Cookies,
            o = e.Cookies = t();
        o.noConflict = function() {
            return e.Cookies = n, o
        }
    }())
}(this, (function() {
    "use strict";

    function e(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var o in n) e[o] = n[o]
        }
        return e
    }
    return function t(n, o) {
        function r(t, r, i) {
            if ("undefined" != typeof document) {
                "number" == typeof(i = e({}, o, i)).expires && (i.expires = new Date(Date.now() + 864e5 * i.expires)), i.expires && (i.expires = i.expires.toUTCString()), t = encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
                var c = "";
                for (var u in i) i[u] && (c += "; " + u, !0 !== i[u] && (c += "=" + i[u].split(";")[0]));
                return document.cookie = t + "=" + n.write(r, t) + c
            }
        }
        return Object.create({
            set: r,
            get: function(e) {
                if ("undefined" != typeof document && (!arguments.length || e)) {
                    for (var t = document.cookie ? document.cookie.split("; ") : [], o = {}, r = 0; r < t.length; r++) {
                        var i = t[r].split("="),
                            c = i.slice(1).join("=");
                        try {
                            var u = decodeURIComponent(i[0]);
                            if (o[u] = n.read(c, u), e === u) break
                        } catch (e) {}
                    }
                    return e ? o[e] : o
                }
            },
            remove: function(t, n) {
                r(t, "", e({}, n, {
                    expires: -1
                }))
            },
            withAttributes: function(n) {
                return t(this.converter, e({}, this.attributes, n))
            },
            withConverter: function(n) {
                return t(e({}, this.converter, n), this.attributes)
            }
        }, {
            attributes: {
                value: Object.freeze(o)
            },
            converter: {
                value: Object.freeze(n)
            }
        })
    }({
        read: function(e) {
            return '"' === e[0] && (e = e.slice(1, -1)), e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
        },
        write: function(e) {
            return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent)
        }
    }, {
        path: "/"
    })
}));

/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/core/assets/vendor/js-cookie/js.cookie.min.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/core/misc/jquery.cookie.shim.js. */
function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
    }, _typeof(obj)
}

function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable
        })), keys.push.apply(keys, symbols)
    };
    return keys
}

function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), !0).forEach(function(key) {
            _defineProperty(target, key, source[key])
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key))
        })
    };
    return target
}

function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        })
    } else obj[key] = value;
    return obj
}

function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return _typeof(key) === "symbol" ? key : String(key)
}

function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if (_typeof(res) !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.")
    };
    return (hint === "string" ? String : Number)(input)
};
(function($, Drupal, cookies) {
    var deprecatedMessageSuffix = "is deprecated in Drupal 9.0.0 and will be removed in Drupal 10.0.0. Use the core/js-cookie library instead. See https://www.drupal.org/node/3104677",
        isFunction = function isFunction(obj) {
            return Object.prototype.toString.call(obj) === '[object Function]'
        },
        parseCookieValue = function parseCookieValue(value, parseJson) {
            if (value.indexOf('"') === 0) value = value.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
            try {
                value = decodeURIComponent(value.replace(/\+/g, ' '));
                return parseJson ? JSON.parse(value) : value
            } catch (e) {}
        },
        reader = function reader(cookieValue, cookieName, converter, readUnsanitized, parseJson) {
            var value = readUnsanitized ? cookieValue : parseCookieValue(cookieValue, parseJson);
            if (converter !== undefined && isFunction(converter)) return converter(value, cookieName);
            return value
        };
    $.cookie = function(key) {
        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined,
            options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
        Drupal.deprecationError({
            message: "jQuery.cookie() ".concat(deprecatedMessageSuffix)
        });
        if (value !== undefined && !isFunction(value)) {
            var attributes = _objectSpread(_objectSpread({}, $.cookie.defaults), options);
            if (typeof attributes.expires === 'string' && attributes.expires !== '') attributes.expires = new Date(attributes.expires);
            var cookieSetter = cookies.withConverter({
                write: function write(cookieValue) {
                    return encodeURIComponent(cookieValue)
                }
            });
            value = $.cookie.json && !$.cookie.raw ? JSON.stringify(value) : String(value);
            return cookieSetter.set(key, value, attributes)
        };
        var userProvidedConverter = value,
            cookiesShim = cookies.withConverter({
                read: function read(cookieValue, cookieName) {
                    return reader(cookieValue, cookieName, userProvidedConverter, $.cookie.raw, $.cookie.json)
                }
            });
        if (key !== undefined) return cookiesShim.get(key);
        var results = cookiesShim.get();
        Object.keys(results).forEach(function(resultKey) {
            if (results[resultKey] === undefined) delete results[resultKey]
        });
        return results
    };
    $.cookie.defaults = _objectSpread({
        path: ''
    }, cookies.defaults);
    $.cookie.json = false;
    $.cookie.raw = false;
    $.removeCookie = function(key, options) {
        Drupal.deprecationError({
            message: "jQuery.removeCookie() ".concat(deprecatedMessageSuffix)
        });
        cookies.remove(key, _objectSpread(_objectSpread({}, $.cookie.defaults), options));
        return !cookies.get(key)
    }
})(jQuery, Drupal, window.Cookies)
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/core/misc/jquery.cookie.shim.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/modules/custom/fortis_contact/js/feedback_query_form.js. */
(function($, Drupal) {
    Drupal.behaviors.fortis_contact = {
        attach: function(context, settings) {
            jQuery.fn.submitCallback = function(form_id) {
                if (form_id == 'domestic-form2-form' || form_id == 'domestic-form3-form' || form_id == 'domestic-form1-form') {
                    var gaenable = drupalSettings.fortis.ag;
                    if (gaenable) {
                        ga('send', 'event', 'landing page', 'Click');
                        console.log('submitted-form')
                    };
                    console.log('submitted-if')
                };
                if (form_id == 'request-callback') {
                    var gaenable = drupalSettings.fortis.ag;
                    if (gaenable) {
                        ga('send', 'event', 'Request a Call Back', 'Click');
                        console.log('submitted-form')
                    }
                };
                if ($('#' + form_id + ' .success-message').is(':visible')) {
                    $('#' + form_id + ' .success-message').delay(5e3).fadeOut('slow').remove()
                } else {
                    $('#' + form_id + ' .messages-status').addClass('success-message');
                    $('#' + form_id + ' .query-messages-status').addClass('success-message');
                    $('#' + form_id + ' .success-message').show()
                }
            };
            jQuery.fn.setCustomCookie = function(email, phone_number) {
                $.cookie("email", email);
                $.cookie("phone_number", phone_number)
            };
            jQuery.fn.customRedirect = function(target) {
                if (target) $(location).attr('href', target)
            };
            jQuery.fn.removeUploadBtn = function(form_id) {
                $('span.file--application-pdf').hide();
                var remove_button = $('#' + form_id + ' input[name=upload_file_remove_button]');
                $(remove_button).trigger('mousedown');
                $(remove_button).next('div.ajax-progress.ajax-progress-throbber').hide()
            }
        }
    }
})(jQuery, Drupal)
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/modules/custom/fortis_contact/js/feedback_query_form.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/core/assets/vendor/jquery-form/jquery.form.min.js. */
/*!
 * jQuery Form Plugin
 * version: 4.3.0
 * Requires jQuery v1.7.2 or later
 * Project repository: https://github.com/jquery-form/form

 * Copyright 2017 Kevin Morris
 * Copyright 2006 M. Alsup

 * Dual licensed under the LGPL-2.1+ or MIT licenses
 * https://github.com/jquery-form/form#license

 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 */
! function(r) {
    "function" == typeof define && define.amd ? define(["jquery"], r) : "object" == typeof module && module.exports ? module.exports = function(e, t) {
        return void 0 === t && (t = "undefined" != typeof window ? require("jquery") : require("jquery")(e)), r(t), t
    } : r(jQuery)
}(function(q) {
    "use strict";
    var m = /\r?\n/g,
        S = {};
    S.fileapi = void 0 !== q('<input type="file">').get(0).files, S.formdata = void 0 !== window.FormData;
    var _ = !!q.fn.prop;

    function o(e) {
        var t = e.data;
        e.isDefaultPrevented() || (e.preventDefault(), q(e.target).closest("form").ajaxSubmit(t))
    }

    function i(e) {
        var t = e.target,
            r = q(t);
        if (!r.is("[type=submit],[type=image]")) {
            var a = r.closest("[type=submit]");
            if (0 === a.length) return;
            t = a[0]
        }
        var n, o = t.form;
        "image" === (o.clk = t).type && (void 0 !== e.offsetX ? (o.clk_x = e.offsetX, o.clk_y = e.offsetY) : "function" == typeof q.fn.offset ? (n = r.offset(), o.clk_x = e.pageX - n.left, o.clk_y = e.pageY - n.top) : (o.clk_x = e.pageX - t.offsetLeft, o.clk_y = e.pageY - t.offsetTop)), setTimeout(function() {
            o.clk = o.clk_x = o.clk_y = null
        }, 100)
    }

    function N() {
        var e;
        q.fn.ajaxSubmit.debug && (e = "[jquery.form] " + Array.prototype.join.call(arguments, ""), window.console && window.console.log ? window.console.log(e) : window.opera && window.opera.postError && window.opera.postError(e))
    }
    q.fn.attr2 = function() {
        if (!_) return this.attr.apply(this, arguments);
        var e = this.prop.apply(this, arguments);
        return e && e.jquery || "string" == typeof e ? e : this.attr.apply(this, arguments)
    }, q.fn.ajaxSubmit = function(M, e, t, r) {
        if (!this.length) return N("ajaxSubmit: skipping submit process - no element selected"), this;
        var O, a, n, o, X = this;
        "function" == typeof M ? M = {
            success: M
        } : "string" == typeof M || !1 === M && 0 < arguments.length ? (M = {
            url: M,
            data: e,
            dataType: t
        }, "function" == typeof r && (M.success = r)) : void 0 === M && (M = {}), O = M.method || M.type || this.attr2("method"), n = (n = (n = "string" == typeof(a = M.url || this.attr2("action")) ? q.trim(a) : "") || window.location.href || "") && (n.match(/^([^#]+)/) || [])[1], o = /(MSIE|Trident)/.test(navigator.userAgent || "") && /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank", M = q.extend(!0, {
            url: n,
            success: q.ajaxSettings.success,
            type: O || q.ajaxSettings.type,
            iframeSrc: o
        }, M);
        var i = {};
        if (this.trigger("form-pre-serialize", [this, M, i]), i.veto) return N("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
        if (M.beforeSerialize && !1 === M.beforeSerialize(this, M)) return N("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
        var s = M.traditional;
        void 0 === s && (s = q.ajaxSettings.traditional);
        var u, c, C = [],
            l = this.formToArray(M.semantic, C, M.filtering);
        if (M.data && (c = q.isFunction(M.data) ? M.data(l) : M.data, M.extraData = c, u = q.param(c, s)), M.beforeSubmit && !1 === M.beforeSubmit(l, this, M)) return N("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
        if (this.trigger("form-submit-validate", [l, this, M, i]), i.veto) return N("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
        var f = q.param(l, s);
        u && (f = f ? f + "&" + u : u), "GET" === M.type.toUpperCase() ? (M.url += (0 <= M.url.indexOf("?") ? "&" : "?") + f, M.data = null) : M.data = f;
        var d, m, p, h = [];
        M.resetForm && h.push(function() {
            X.resetForm()
        }), M.clearForm && h.push(function() {
            X.clearForm(M.includeHidden)
        }), !M.dataType && M.target ? (d = M.success || function() {}, h.push(function(e, t, r) {
            var a = arguments,
                n = M.replaceTarget ? "replaceWith" : "html";
            q(M.target)[n](e).each(function() {
                d.apply(this, a)
            })
        })) : M.success && (q.isArray(M.success) ? q.merge(h, M.success) : h.push(M.success)), M.success = function(e, t, r) {
            for (var a = M.context || this, n = 0, o = h.length; n < o; n++) h[n].apply(a, [e, t, r || X, X])
        }, M.error && (m = M.error, M.error = function(e, t, r) {
            var a = M.context || this;
            m.apply(a, [e, t, r, X])
        }), M.complete && (p = M.complete, M.complete = function(e, t) {
            var r = M.context || this;
            p.apply(r, [e, t, X])
        });
        var v = 0 < q("input[type=file]:enabled", this).filter(function() {
                return "" !== q(this).val()
            }).length,
            g = "multipart/form-data",
            x = X.attr("enctype") === g || X.attr("encoding") === g,
            y = S.fileapi && S.formdata;
        N("fileAPI :" + y);
        var b, T = (v || x) && !y;
        !1 !== M.iframe && (M.iframe || T) ? M.closeKeepAlive ? q.get(M.closeKeepAlive, function() {
            b = w(l)
        }) : b = w(l) : b = (v || x) && y ? function(e) {
            for (var r = new FormData, t = 0; t < e.length; t++) r.append(e[t].name, e[t].value);
            if (M.extraData) {
                var a = function(e) {
                    var t, r, a = q.param(e, M.traditional).split("&"),
                        n = a.length,
                        o = [];
                    for (t = 0; t < n; t++) a[t] = a[t].replace(/\+/g, " "), r = a[t].split("="), o.push([decodeURIComponent(r[0]), decodeURIComponent(r[1])]);
                    return o
                }(M.extraData);
                for (t = 0; t < a.length; t++) a[t] && r.append(a[t][0], a[t][1])
            }
            M.data = null;
            var n = q.extend(!0, {}, q.ajaxSettings, M, {
                contentType: !1,
                processData: !1,
                cache: !1,
                type: O || "POST"
            });
            M.uploadProgress && (n.xhr = function() {
                var e = q.ajaxSettings.xhr();
                return e.upload && e.upload.addEventListener("progress", function(e) {
                    var t = 0,
                        r = e.loaded || e.position,
                        a = e.total;
                    e.lengthComputable && (t = Math.ceil(r / a * 100)), M.uploadProgress(e, r, a, t)
                }, !1), e
            });
            n.data = null;
            var o = n.beforeSend;
            return n.beforeSend = function(e, t) {
                M.formData ? t.data = M.formData : t.data = r, o && o.call(this, e, t)
            }, q.ajax(n)
        }(l) : q.ajax(M), X.removeData("jqxhr").data("jqxhr", b);
        for (var j = 0; j < C.length; j++) C[j] = null;
        return this.trigger("form-submit-notify", [this, M]), this;

        function w(e) {
            var t, r, l, f, o, d, m, p, a, n, h, v, i = X[0],
                g = q.Deferred();
            if (g.abort = function(e) {
                    p.abort(e)
                }, e)
                for (r = 0; r < C.length; r++) t = q(C[r]), _ ? t.prop("disabled", !1) : t.removeAttr("disabled");
            (l = q.extend(!0, {}, q.ajaxSettings, M)).context = l.context || l, o = "jqFormIO" + (new Date).getTime();
            var s = i.ownerDocument,
                u = X.closest("body");
            if (l.iframeTarget ? (n = (d = q(l.iframeTarget, s)).attr2("name")) ? o = n : d.attr2("name", o) : (d = q('<iframe name="' + o + '" src="' + l.iframeSrc + '" />', s)).css({
                    position: "absolute",
                    top: "-1000px",
                    left: "-1000px"
                }), m = d[0], p = {
                    aborted: 0,
                    responseText: null,
                    responseXML: null,
                    status: 0,
                    statusText: "n/a",
                    getAllResponseHeaders: function() {},
                    getResponseHeader: function() {},
                    setRequestHeader: function() {},
                    abort: function(e) {
                        var t = "timeout" === e ? "timeout" : "aborted";
                        N("aborting upload... " + t), this.aborted = 1;
                        try {
                            m.contentWindow.document.execCommand && m.contentWindow.document.execCommand("Stop")
                        } catch (e) {}
                        d.attr("src", l.iframeSrc), p.error = t, l.error && l.error.call(l.context, p, t, e), f && q.event.trigger("ajaxError", [p, l, t]), l.complete && l.complete.call(l.context, p, t)
                    }
                }, (f = l.global) && 0 == q.active++ && q.event.trigger("ajaxStart"), f && q.event.trigger("ajaxSend", [p, l]), l.beforeSend && !1 === l.beforeSend.call(l.context, p, l)) return l.global && q.active--, g.reject(), g;
            if (p.aborted) return g.reject(), g;
            (a = i.clk) && (n = a.name) && !a.disabled && (l.extraData = l.extraData || {}, l.extraData[n] = a.value, "image" === a.type && (l.extraData[n + ".x"] = i.clk_x, l.extraData[n + ".y"] = i.clk_y));
            var x = 1,
                y = 2;

            function b(t) {
                var r = null;
                try {
                    t.contentWindow && (r = t.contentWindow.document)
                } catch (e) {
                    N("cannot get iframe.contentWindow document: " + e)
                }
                if (r) return r;
                try {
                    r = t.contentDocument ? t.contentDocument : t.document
                } catch (e) {
                    N("cannot get iframe.contentDocument: " + e), r = t.document
                }
                return r
            }
            var c = q("meta[name=csrf-token]").attr("content"),
                T = q("meta[name=csrf-param]").attr("content");

            function j() {
                var e = X.attr2("target"),
                    t = X.attr2("action"),
                    r = X.attr("enctype") || X.attr("encoding") || "multipart/form-data";
                i.setAttribute("target", o), O && !/post/i.test(O) || i.setAttribute("method", "POST"), t !== l.url && i.setAttribute("action", l.url), l.skipEncodingOverride || O && !/post/i.test(O) || X.attr({
                    encoding: "multipart/form-data",
                    enctype: "multipart/form-data"
                }), l.timeout && (v = setTimeout(function() {
                    h = !0, A(x)
                }, l.timeout));
                var a = [];
                try {
                    if (l.extraData)
                        for (var n in l.extraData) l.extraData.hasOwnProperty(n) && (q.isPlainObject(l.extraData[n]) && l.extraData[n].hasOwnProperty("name") && l.extraData[n].hasOwnProperty("value") ? a.push(q('<input type="hidden" name="' + l.extraData[n].name + '">', s).val(l.extraData[n].value).appendTo(i)[0]) : a.push(q('<input type="hidden" name="' + n + '">', s).val(l.extraData[n]).appendTo(i)[0]));
                    l.iframeTarget || d.appendTo(u), m.attachEvent ? m.attachEvent("onload", A) : m.addEventListener("load", A, !1), setTimeout(function e() {
                        try {
                            var t = b(m).readyState;
                            N("state = " + t), t && "uninitialized" === t.toLowerCase() && setTimeout(e, 50)
                        } catch (e) {
                            N("Server abort: ", e, " (", e.name, ")"), A(y), v && clearTimeout(v), v = void 0
                        }
                    }, 15);
                    try {
                        i.submit()
                    } catch (e) {
                        document.createElement("form").submit.apply(i)
                    }
                } finally {
                    i.setAttribute("action", t), i.setAttribute("enctype", r), e ? i.setAttribute("target", e) : X.removeAttr("target"), q(a).remove()
                }
            }
            T && c && (l.extraData = l.extraData || {}, l.extraData[T] = c), l.forceSync ? j() : setTimeout(j, 10);
            var w, S, k, D = 50;

            function A(e) {
                if (!p.aborted && !k) {
                    if ((S = b(m)) || (N("cannot access response document"), e = y), e === x && p) return p.abort("timeout"), void g.reject(p, "timeout");
                    if (e === y && p) return p.abort("server abort"), void g.reject(p, "error", "server abort");
                    if (S && S.location.href !== l.iframeSrc || h) {
                        m.detachEvent ? m.detachEvent("onload", A) : m.removeEventListener("load", A, !1);
                        var t, r = "success";
                        try {
                            if (h) throw "timeout";
                            var a = "xml" === l.dataType || S.XMLDocument || q.isXMLDoc(S);
                            if (N("isXml=" + a), !a && window.opera && (null === S.body || !S.body.innerHTML) && --D) return N("requeing onLoad callback, DOM not available"), void setTimeout(A, 250);
                            var n = S.body ? S.body : S.documentElement;
                            p.responseText = n ? n.innerHTML : null, p.responseXML = S.XMLDocument ? S.XMLDocument : S, a && (l.dataType = "xml"), p.getResponseHeader = function(e) {
                                return {
                                    "content-type": l.dataType
                                }[e.toLowerCase()]
                            }, n && (p.status = Number(n.getAttribute("status")) || p.status, p.statusText = n.getAttribute("statusText") || p.statusText);
                            var o, i, s, u = (l.dataType || "").toLowerCase(),
                                c = /(json|script|text)/.test(u);
                            c || l.textarea ? (o = S.getElementsByTagName("textarea")[0]) ? (p.responseText = o.value, p.status = Number(o.getAttribute("status")) || p.status, p.statusText = o.getAttribute("statusText") || p.statusText) : c && (i = S.getElementsByTagName("pre")[0], s = S.getElementsByTagName("body")[0], i ? p.responseText = i.textContent ? i.textContent : i.innerText : s && (p.responseText = s.textContent ? s.textContent : s.innerText)) : "xml" === u && !p.responseXML && p.responseText && (p.responseXML = F(p.responseText));
                            try {
                                w = E(p, u, l)
                            } catch (e) {
                                r = "parsererror", p.error = t = e || r
                            }
                        } catch (e) {
                            N("error caught: ", e), r = "error", p.error = t = e || r
                        }
                        p.aborted && (N("upload aborted"), r = null), p.status && (r = 200 <= p.status && p.status < 300 || 304 === p.status ? "success" : "error"), "success" === r ? (l.success && l.success.call(l.context, w, "success", p), g.resolve(p.responseText, "success", p), f && q.event.trigger("ajaxSuccess", [p, l])) : r && (void 0 === t && (t = p.statusText), l.error && l.error.call(l.context, p, r, t), g.reject(p, "error", t), f && q.event.trigger("ajaxError", [p, l, t])), f && q.event.trigger("ajaxComplete", [p, l]), f && !--q.active && q.event.trigger("ajaxStop"), l.complete && l.complete.call(l.context, p, r), k = !0, l.timeout && clearTimeout(v), setTimeout(function() {
                            l.iframeTarget ? d.attr("src", l.iframeSrc) : d.remove(), p.responseXML = null
                        }, 100)
                    }
                }
            }
            var F = q.parseXML || function(e, t) {
                    return window.ActiveXObject ? ((t = new ActiveXObject("Microsoft.XMLDOM")).async = "false", t.loadXML(e)) : t = (new DOMParser).parseFromString(e, "text/xml"), t && t.documentElement && "parsererror" !== t.documentElement.nodeName ? t : null
                },
                L = q.parseJSON || function(e) {
                    return window.eval("(" + e + ")")
                },
                E = function(e, t, r) {
                    var a = e.getResponseHeader("content-type") || "",
                        n = ("xml" === t || !t) && 0 <= a.indexOf("xml"),
                        o = n ? e.responseXML : e.responseText;
                    return n && "parsererror" === o.documentElement.nodeName && q.error && q.error("parsererror"), r && r.dataFilter && (o = r.dataFilter(o, t)), "string" == typeof o && (("json" === t || !t) && 0 <= a.indexOf("json") ? o = L(o) : ("script" === t || !t) && 0 <= a.indexOf("javascript") && q.globalEval(o)), o
                };
            return g
        }
    }, q.fn.ajaxForm = function(e, t, r, a) {
        if (("string" == typeof e || !1 === e && 0 < arguments.length) && (e = {
                url: e,
                data: t,
                dataType: r
            }, "function" == typeof a && (e.success = a)), (e = e || {}).delegation = e.delegation && q.isFunction(q.fn.on), e.delegation || 0 !== this.length) return e.delegation ? (q(document).off("submit.form-plugin", this.selector, o).off("click.form-plugin", this.selector, i).on("submit.form-plugin", this.selector, e, o).on("click.form-plugin", this.selector, e, i), this) : (e.beforeFormUnbind && e.beforeFormUnbind(this, e), this.ajaxFormUnbind().on("submit.form-plugin", e, o).on("click.form-plugin", e, i));
        var n = {
            s: this.selector,
            c: this.context
        };
        return !q.isReady && n.s ? (N("DOM not ready, queuing ajaxForm"), q(function() {
            q(n.s, n.c).ajaxForm(e)
        })) : N("terminating; zero elements found by selector" + (q.isReady ? "" : " (DOM not ready)")), this
    }, q.fn.ajaxFormUnbind = function() {
        return this.off("submit.form-plugin click.form-plugin")
    }, q.fn.formToArray = function(e, t, r) {
        var a = [];
        if (0 === this.length) return a;
        var n, o, i, s, u, c, l, f, d, m, p = this[0],
            h = this.attr("id"),
            v = (v = e || void 0 === p.elements ? p.getElementsByTagName("*") : p.elements) && q.makeArray(v);
        if (h && (e || /(Edge|Trident)\//.test(navigator.userAgent)) && (n = q(':input[form="' + h + '"]').get()).length && (v = (v || []).concat(n)), !v || !v.length) return a;
        for (q.isFunction(r) && (v = q.map(v, r)), o = 0, c = v.length; o < c; o++)
            if ((m = (u = v[o]).name) && !u.disabled)
                if (e && p.clk && "image" === u.type) p.clk === u && (a.push({
                    name: m,
                    value: q(u).val(),
                    type: u.type
                }), a.push({
                    name: m + ".x",
                    value: p.clk_x
                }, {
                    name: m + ".y",
                    value: p.clk_y
                }));
                else if ((s = q.fieldValue(u, !0)) && s.constructor === Array)
            for (t && t.push(u), i = 0, l = s.length; i < l; i++) a.push({
                name: m,
                value: s[i]
            });
        else if (S.fileapi && "file" === u.type) {
            t && t.push(u);
            var g = u.files;
            if (g.length)
                for (i = 0; i < g.length; i++) a.push({
                    name: m,
                    value: g[i],
                    type: u.type
                });
            else a.push({
                name: m,
                value: "",
                type: u.type
            })
        } else null != s && (t && t.push(u), a.push({
            name: m,
            value: s,
            type: u.type,
            required: u.required
        }));
        return e || !p.clk || (m = (d = (f = q(p.clk))[0]).name) && !d.disabled && "image" === d.type && (a.push({
            name: m,
            value: f.val()
        }), a.push({
            name: m + ".x",
            value: p.clk_x
        }, {
            name: m + ".y",
            value: p.clk_y
        })), a
    }, q.fn.formSerialize = function(e) {
        return q.param(this.formToArray(e))
    }, q.fn.fieldSerialize = function(n) {
        var o = [];
        return this.each(function() {
            var e = this.name;
            if (e) {
                var t = q.fieldValue(this, n);
                if (t && t.constructor === Array)
                    for (var r = 0, a = t.length; r < a; r++) o.push({
                        name: e,
                        value: t[r]
                    });
                else null != t && o.push({
                    name: this.name,
                    value: t
                })
            }
        }), q.param(o)
    }, q.fn.fieldValue = function(e) {
        for (var t = [], r = 0, a = this.length; r < a; r++) {
            var n = this[r],
                o = q.fieldValue(n, e);
            null == o || o.constructor === Array && !o.length || (o.constructor === Array ? q.merge(t, o) : t.push(o))
        }
        return t
    }, q.fieldValue = function(e, t) {
        var r = e.name,
            a = e.type,
            n = e.tagName.toLowerCase();
        if (void 0 === t && (t = !0), t && (!r || e.disabled || "reset" === a || "button" === a || ("checkbox" === a || "radio" === a) && !e.checked || ("submit" === a || "image" === a) && e.form && e.form.clk !== e || "select" === n && -1 === e.selectedIndex)) return null;
        if ("select" !== n) return q(e).val().replace(m, "\r\n");
        var o = e.selectedIndex;
        if (o < 0) return null;
        for (var i = [], s = e.options, u = "select-one" === a, c = u ? o + 1 : s.length, l = u ? o : 0; l < c; l++) {
            var f = s[l];
            if (f.selected && !f.disabled) {
                var d = (d = f.value) || (f.attributes && f.attributes.value && !f.attributes.value.specified ? f.text : f.value);
                if (u) return d;
                i.push(d)
            }
        }
        return i
    }, q.fn.clearForm = function(e) {
        return this.each(function() {
            q("input,select,textarea", this).clearFields(e)
        })
    }, q.fn.clearFields = q.fn.clearInputs = function(r) {
        var a = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function() {
            var e = this.type,
                t = this.tagName.toLowerCase();
            a.test(e) || "textarea" === t ? this.value = "" : "checkbox" === e || "radio" === e ? this.checked = !1 : "select" === t ? this.selectedIndex = -1 : "file" === e ? /MSIE/.test(navigator.userAgent) ? q(this).replaceWith(q(this).clone(!0)) : q(this).val("") : r && (!0 === r && /hidden/.test(e) || "string" == typeof r && q(this).is(r)) && (this.value = "")
        })
    }, q.fn.resetForm = function() {
        return this.each(function() {
            var t = q(this),
                e = this.tagName.toLowerCase();
            switch (e) {
                case "input":
                    this.checked = this.defaultChecked;
                case "textarea":
                    return this.value = this.defaultValue, !0;
                case "option":
                case "optgroup":
                    var r = t.parents("select");
                    return r.length && r[0].multiple ? "option" === e ? this.selected = this.defaultSelected : t.find("option").resetForm() : r.resetForm(), !0;
                case "select":
                    return t.find("option").each(function(e) {
                        if (this.selected = this.defaultSelected, this.defaultSelected && !t[0].multiple) return t[0].selectedIndex = e, !1
                    }), !0;
                case "label":
                    var a = q(t.attr("for")),
                        n = t.find("input,select,textarea");
                    return a[0] && n.unshift(a[0]), n.resetForm(), !0;
                case "form":
                    return "function" != typeof this.reset && ("object" != typeof this.reset || this.reset.nodeType) || this.reset(), !0;
                default:
                    return t.find("form,input,label,select,textarea").resetForm(), !0
            }
        })
    }, q.fn.enable = function(e) {
        return void 0 === e && (e = !0), this.each(function() {
            this.disabled = !e
        })
    }, q.fn.selected = function(r) {
        return void 0 === r && (r = !0), this.each(function() {
            var e, t = this.type;
            "checkbox" === t || "radio" === t ? this.checked = r : "option" === this.tagName.toLowerCase() && (e = q(this).parent("select"), r && e[0] && "select-one" === e[0].type && e.find("option").selected(!1), this.selected = r)
        })
    }, q.fn.ajaxSubmit.debug = !1
});

/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/core/assets/vendor/jquery-form/jquery.form.min.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/core/modules/file/file.js. */
(function($, Drupal) {
    Drupal.behaviors.fileValidateAutoAttach = {
        attach: function attach(context, settings) {
            var $context = $(context),
                elements

            function initFileValidation(selector) {
                $(once('fileValidate', $context.find(selector))).on('change.fileValidate', {
                    extensions: elements[selector]
                }, Drupal.file.validateExtension)
            };
            if (settings.file && settings.file.elements) {
                elements = settings.file.elements;
                Object.keys(elements).forEach(initFileValidation)
            }
        },
        detach: function detach(context, settings, trigger) {
            var $context = $(context),
                elements

            function removeFileValidation(selector) {
                $(once.remove('fileValidate', $context.find(selector))).off('change.fileValidate', Drupal.file.validateExtension)
            };
            if (trigger === 'unload' && settings.file && settings.file.elements) {
                elements = settings.file.elements;
                Object.keys(elements).forEach(removeFileValidation)
            }
        }
    };
    Drupal.behaviors.fileAutoUpload = {
        attach: function attach(context) {
            $(once('auto-file-upload', 'input[type="file"]', context)).on('change.autoFileUpload', Drupal.file.triggerUploadButton)
        },
        detach: function detach(context, settings, trigger) {
            if (trigger === 'unload') $(once.remove('auto-file-upload', 'input[type="file"]', context)).off('.autoFileUpload')
        }
    };
    Drupal.behaviors.fileButtons = {
        attach: function attach(context) {
            var $context = $(context);
            $context.find('.js-form-submit').on('mousedown', Drupal.file.disableFields);
            $context.find('.js-form-managed-file .js-form-submit').on('mousedown', Drupal.file.progressBar)
        },
        detach: function detach(context, settings, trigger) {
            if (trigger === 'unload') {
                var $context = $(context);
                $context.find('.js-form-submit').off('mousedown', Drupal.file.disableFields);
                $context.find('.js-form-managed-file .js-form-submit').off('mousedown', Drupal.file.progressBar)
            }
        }
    };
    Drupal.behaviors.filePreviewLinks = {
        attach: function attach(context) {
            $(context).find('div.js-form-managed-file .file a').on('click', Drupal.file.openInNewWindow)
        },
        detach: function detach(context) {
            $(context).find('div.js-form-managed-file .file a').off('click', Drupal.file.openInNewWindow)
        }
    };
    Drupal.file = Drupal.file || {
        validateExtension: function validateExtension(event) {
            event.preventDefault();
            $('.file-upload-js-error').remove();
            var extensionPattern = event.data.extensions.replace(/,\s*/g, '|');
            if (extensionPattern.length > 1 && this.value.length > 0) {
                var acceptableMatch = new RegExp("\\.(".concat(extensionPattern, ")$"), 'gi');
                if (!acceptableMatch.test(this.value)) {
                    var error = Drupal.t('The selected file %filename cannot be uploaded. Only files with the following extensions are allowed: %extensions.', {
                        '%filename': this.value.replace('C:\\fakepath\\', ''),
                        '%extensions': extensionPattern.replace(/\|/g, ', ')
                    });
                    $(this).closest('div.js-form-managed-file').prepend("<div class=\"messages messages--error file-upload-js-error\" aria-live=\"polite\">".concat(error, "</div>"));
                    this.value = '';
                    event.stopImmediatePropagation()
                }
            }
        },
        triggerUploadButton: function triggerUploadButton(event) {
            $(event.target).closest('.js-form-managed-file').find('.js-form-submit[data-drupal-selector$="upload-button"]').trigger('mousedown')
        },
        disableFields: function disableFields(event) {
            var $clickedButton = $(this);
            $clickedButton.trigger('formUpdated');
            var $enabledFields = [];
            if ($clickedButton.closest('div.js-form-managed-file').length > 0) $enabledFields = $clickedButton.closest('div.js-form-managed-file').find('input.js-form-file');
            var $fieldsToTemporarilyDisable = $('div.js-form-managed-file input.js-form-file').not($enabledFields).not(':disabled');
            $fieldsToTemporarilyDisable.prop('disabled', true);
            setTimeout(function() {
                $fieldsToTemporarilyDisable.prop('disabled', false)
            }, 1e3)
        },
        progressBar: function progressBar(event) {
            var $clickedButton = $(this),
                $progressId = $clickedButton.closest('div.js-form-managed-file').find('input.file-progress');
            if ($progressId.length) {
                var originalName = $progressId.attr('name');
                $progressId.attr('name', originalName.match(/APC_UPLOAD_PROGRESS|UPLOAD_IDENTIFIER/)[0]);
                setTimeout(function() {
                    $progressId.attr('name', originalName)
                }, 1e3)
            };
            setTimeout(function() {
                $clickedButton.closest('div.js-form-managed-file').find('div.ajax-progress-bar').slideDown()
            }, 500);
            $clickedButton.trigger('fileUpload')
        },
        openInNewWindow: function openInNewWindow(event) {
            event.preventDefault();
            $(this).attr('target', '_blank');
            window.open(this.href, 'filePreview', 'toolbar=0,scrollbars=1,location=1,statusbar=1,menubar=0,resizable=1,width=500,height=550')
        }
    }
})(jQuery, Drupal)
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/core/modules/file/file.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/modules/custom/fortis_search/js/search_autocomplete.js. */
(function($, Drupal, drupalSettings) {

    Drupal.behaviors.search_autocomplete = {
        attach: function(context, settings) {
            // Show error message if enter without text.
            $(document).keypress(function(event) {
                if (event.key === "Enter" && (event.target.id == 'global-search-auto-home' || event.target.id == 'global-search-auto')) {
                    let val = $('#' + event.target.id).val();
                    if (val == '') {
                        $('#' + event.target.id).addClass('red-border');
                        event.preventDefault();
                    }
                }
            });
            // Show error message if enter without text.
            $('.global-search-icon').click(function() {
                $(this).parents('form').find("input[name='search']").addClass('red-border');
            });
            // Hide error message.
            $('.global-search-field').keypress(function() {
                $(this).removeClass('red-border');
            });
            // Hide error message.
            $('.global-search-field').keydown(function() {
                $(this).removeClass('red-border');
            });
            // Add video into iframe on load.
            $('.video-search-item').each(function() {
                let src = $(this).attr('data-src');
                src = src.replace('watch?v=', 'embed/');
                if (src) {
                    let iframe = '<div class="play-btn"></div><iframe loading="lazy" width="168" height="150" src="' + src + '" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>';
                    $(this).html(iframe);
                }
            });
            // On click video play button, add video url into iframe.
            $('.video-search-item .video-play-btn').click(function(e) {
                let iframe_src = $(this).parent().attr('data-src');
                iframe_src = iframe_src.replace('watch?v=', 'embed/');
                if (iframe_src) {
                    let iframe = jQuery('.video-popup'),
                        close_btn = jQuery('.close-video'),
                        iframe_video = jQuery('.video-popup iframe');
                    $(iframe_video).attr('src', iframe_src);
                    $(iframe).fadeIn().addClass('show-video');
                    // Remove the video overlay when clicking outside the video.
                    $(document).on('click', function(e) {
                        if ($(iframe).is(e.target) || $(close_btn).is(e.target)) {
                            $(iframe).fadeOut().removeClass('show-video');
                            $(iframe_video).attr('src', '');
                        }
                    });
                }
            });
            // Autocomplete clear button.
            $.widget("ui.autocomplete", $.ui.autocomplete, {
                // Extend default options.
                options: {
                    clearButton: false,
                    clearButtonHtml: '<img src="https://www.fortishealthcare.com/drupal-data/images/search/search-reset-icon.svg" />',
                    clearButtonPosition: {
                        my: "right center",
                        at: "right center"
                    }
                },
                _create: function() {
                    var self = this;
                    // Invoke the parent widget's method.
                    self._super();
                    if (self.options.clearButton) {
                        self._createClearButton();
                    }
                },
                _createClearButton: function() {
                    var self = this;
                    self.clearElement = $("<span>")
                        .attr("tabindex", "-1")
                        .addClass("ui-autocomplete-clear")
                        .html(self.options.clearButtonHtml)
                        .appendTo(self.element.parent());
                    if (self.options.clearButtonPosition !== false && typeof self.options.clearButtonPosition === 'object') {
                        if (typeof self.options.clearButtonPosition.of === 'undefined') {
                            self.options.clearButtonPosition.of = self.element;
                        }
                        self.clearElement.position(self.options.clearButtonPosition);
                    }
                    self._on(self.clearElement, {
                        click: function() {
                            self.element.val('').focus();
                            self._hideClearButton();
                        }
                    });
                    self.element.addClass('ui-autocomplete-input-has-clear');
                    self._on(self.element, {
                        input: function() {
                            if (self.element.val() !== "") {
                                self._showClearButton();
                            } else {
                                self._hideClearButton();
                            }
                        }
                    });
                    self._on(self.menu.element, {
                        menuselect: function() {
                            self._showClearButton();
                        }
                    });
                    // Show clearElement if input has some content on initialization.
                    if (self.element.val() !== "") {
                        self._showClearButton();
                    } else {
                        self._hideClearButton();
                    }
                },
                _showClearButton: function() {
                    this.clearElement.css({
                        'display': 'inline-block'
                    });
                },
                _hideClearButton: function() {
                    this.clearElement.css({
                        'display': 'none'
                    });
                }
            });

            // Custom autocomplete script.
            $("#global-search-auto, #global-search-auto-home").autocomplete({
                minLength: 3,
                delay: 500,
                classes: {
                    "ui-autocomplete": "global-search-block"
                },
                clearButton: true,
                source: function(request, response) {
                    $.ajax({
                        url: drupalSettings.path.baseUrl + 'search/autocomplete/ajax',
                        dataType: "json",
                        async: false,
                        options: {
                            minLength: 3,
                            isComposing: false
                        },
                        data: {
                            q: request.term
                        },
                        success: function(data) {
                            var typeList = Object.keys(data);
                            var results = [];
                            jQuery.each(typeList, function(_, ele) {
                                results.push({
                                    label: ele,
                                    disabled: true
                                })
                                results.push(...data[ele])
                            })
                            response(results);
                        }
                    });
                },
                create: function() {
                    $(this).data('ui-autocomplete')._renderItem = function(ul, item) {
                        let value = item.label;
                        let listItem;
                        if (item.disabled) {
                            if (value === 'view_all') {
                                listItem = $('<li class="ui-state-disabled view-all-hide"><div><img alt="' + value + '" src="https://www.fortishealthcare.com/drupal-data/images/search/' + value.toLowerCase() + '.svg"/>' + value + '</div></li>').appendTo(ul);
                            } else {
                                listItem = $('<li class="ui-state-disabled"><div><img alt="' + value + '" src="https://www.fortishealthcare.com/drupal-data/images/search/' + value.toLowerCase() + '.svg"/>' + value + '</div></li>').appendTo(ul);
                            }
                        } else {
                            if (value === 'View All' && !item.disabled) {
                                listItem = $("<li>").append('<div class="view-all-btn"><a href="' + item.url + '"> ' + value + '<img src="https://www.fortishealthcare.com/drupal-data/images/search/view-all-icon.svg" width="8" /></a></div>').appendTo(ul);
                            } else {
                                listItem = $("<li>").append('<div><a href="' + item.url + '">' + item.image + ' <span>' + value + '</span></a></div>').appendTo(ul);
                            }
                        }
                        return listItem;
                    }
                },
                focus: function(event, ui) {
                    if (ui.item.disabled) {
                        // Skip disabled items.
                        let data = $(this).data('ui-autocomplete');
                        $(data.menu.active).find('div.ui-state-active').removeClass('ui-state-active'); // remove active class

                        if (event.originalEvent.key === 'ArrowDown') {
                            let liBefore = $(data.menu.active).prev(); // li before key pressing
                            let nextLi = data.menu.active;
                            if (!$(nextLi).is(':last-child')) {
                                while ($(nextLi).hasClass('ui-state-disabled')) {
                                    // Search first not disabled item.
                                    nextLi = $(nextLi).next();
                                }
                                if (nextLi.length === 0) {
                                    // Not found.
                                    nextLi = liBefore;
                                }
                            } else {
                                // Last item.
                                nextLi = liBefore;
                            }

                            // Setting of active item in jquery-ui autocomplete.
                            data.menu.active = nextLi;
                            $(nextLi).find('div').addClass('ui-state-active');
                        } else {
                            if (event.originalEvent.key === 'ArrowUp') {
                                let liBefore = $(data.menu.active).next();
                                let prevLi = data.menu.active;
                                if (!$(prevLi).is(':first-child')) {
                                    while ($(prevLi).hasClass('ui-state-disabled')) {
                                        // Search first not disabled item.
                                        prevLi = $(prevLi).prev();
                                    }
                                    if (prevLi.length === 0) {
                                        prevLi = liBefore;
                                    }
                                } else {
                                    // First item.
                                    prevLi = liBefore;
                                }

                                // Setting of active item in jquery-ui autocomplete.
                                data.menu.active = prevLi;
                                $(prevLi).find('div').addClass('ui-state-active');
                            }
                        }
                    }
                    return false;
                },
                change: function(event, ui) {
                    let isEmpty = !Object.values(ui).some(x => (x !== null && x !== ''));
                    if (!isEmpty) {
                        $(this).val(ui.item.label);
                        return false;
                    }
                },
                select: function(event, ui) {
                    if (ui.item.disabled) {
                        event.preventDefault();
                    } else {
                        $(this).val(ui.item.label);
                        if (ui.item.url) {
                            window.location.href = ui.item.url
                        }
                    }
                    return false;
                },
            }).on('input', function() {
                if ($(this).val() !== "") {
                    $(this).parent().next('.global-search-icon').hide();
                } else {
                    $(this).parent().next('.global-search-icon').show();
                }
            })

            $(".autocomplete-search-form .ui-autocomplete-clear").on('click', function() {
                $(this).parent().next('.global-search-icon').show();
            })
        }
    };
})(jQuery, Drupal, drupalSettings);
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/modules/custom/fortis_search/js/search_autocomplete.js. */
;