/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/modules/contrib/jquery_ui/assets/vendor/jquery.ui/ui/keycode-min.js. */ ! function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery", "./version"], e) : e(jQuery)
}((function(e) {
    "use strict";
    return e.ui.keyCode = {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38
    }
}))
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/modules/contrib/jquery_ui/assets/vendor/jquery.ui/ui/keycode-min.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/modules/contrib/jquery_ui/assets/vendor/jquery.ui/ui/labels-min.js. */
! function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery", "./version"], t) : t(jQuery)
}((function(t) {
    "use strict";
    return t.fn.labels = function() {
        var e, s, i, n, a;
        return this.length ? this[0].labels && this[0].labels.length ? this.pushStack(this[0].labels) : (n = this.eq(0).parents("label"), (i = this.attr("id")) && (a = (e = this.eq(0).parents().last()).add(e.length ? e.siblings() : this.siblings()), s = "label[for='" + t.escapeSelector(i) + "']", n = n.add(a.find(s).addBack(s))), this.pushStack(n)) : this.pushStack([])
    }
}))
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/modules/contrib/jquery_ui/assets/vendor/jquery.ui/ui/labels-min.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/modules/contrib/jquery_ui/assets/vendor/jquery.ui/ui/plugin-min.js. */
! function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery", "./version"], e) : e(jQuery)
}((function(e) {
    "use strict";
    return e.ui.plugin = {
        add: function(n, i, t) {
            var u, o = e.ui[n].prototype;
            for (u in t) o.plugins[u] = o.plugins[u] || [], o.plugins[u].push([i, t[u]])
        },
        call: function(e, n, i, t) {
            var u, o = e.plugins[n];
            if (o && (t || e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType))
                for (u = 0; u < o.length; u++) e.options[o[u][0]] && o[u][1].apply(e.element, i)
        }
    }
}));

/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/modules/contrib/jquery_ui/assets/vendor/jquery.ui/ui/plugin-min.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/modules/contrib/jquery_ui/assets/vendor/jquery.ui/ui/safe-active-element-min.js. */
! function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery", "./version"], e) : e(jQuery)
}((function(e) {
    "use strict";
    return e.ui.safeActiveElement = function(e) {
        var n;
        try {
            n = e.activeElement
        } catch (t) {
            n = e.body
        };
        return n || (n = e.body), n.nodeName || (n = e.body), n
    }
}))
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/modules/contrib/jquery_ui/assets/vendor/jquery.ui/ui/safe-active-element-min.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/modules/contrib/jquery_ui/assets/vendor/jquery.ui/ui/safe-blur-min.js. */
! function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery", "./version"], e) : e(jQuery)
}((function(e) {
    "use strict";
    return e.ui.safeBlur = function(n) {
        n && "body" !== n.nodeName.toLowerCase() && e(n).trigger("blur")
    }
}))
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/modules/contrib/jquery_ui/assets/vendor/jquery.ui/ui/safe-blur-min.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/modules/contrib/jquery_ui/assets/vendor/jquery.ui/ui/scroll-parent-min.js. */
! function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery", "./version"], t) : t(jQuery)
}((function(t) {
    "use strict";
    return t.fn.scrollParent = function(e) {
        var s = this.css("position"),
            n = "absolute" === s,
            o = e ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
            i = this.parents().filter((function() {
                var e = t(this);
                return (!n || "static" !== e.css("position")) && o.test(e.css("overflow") + e.css("overflow-y") + e.css("overflow-x"))
            })).eq(0);
        return "fixed" !== s && i.length ? i : t(this[0].ownerDocument || document)
    }
}))
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/modules/contrib/jquery_ui/assets/vendor/jquery.ui/ui/scroll-parent-min.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/modules/contrib/jquery_ui/assets/vendor/jquery.ui/ui/tabbable-min.js. */
! function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery", "./version", "./focusable"], e) : e(jQuery)
}((function(e) {
    "use strict";
    return e.extend(e.expr.pseudos, {
        tabbable: function(n) {
            var t = e.attr(n, "tabindex"),
                u = null != t;
            return (!u || t >= 0) && e.ui.focusable(n, u)
        }
    })
}))
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/modules/contrib/jquery_ui/assets/vendor/jquery.ui/ui/tabbable-min.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/modules/contrib/jquery_ui/assets/vendor/jquery.ui/ui/unique-id-min.js. */
! function(i) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery", "./version"], i) : i(jQuery)
}((function(i) {
    "use strict";
    return i.fn.extend({
        uniqueId: (e = 0, function() {
            return this.each((function() {
                this.id || (this.id = "ui-id-" + ++e)
            }))
        }),
        removeUniqueId: function() {
            return this.each((function() {
                /^ui-id-\d+$/.test(this.id) && i(this).removeAttr("id")
            }))
        }
    });
    var e
}))
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/modules/contrib/jquery_ui/assets/vendor/jquery.ui/ui/unique-id-min.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/modules/contrib/jquery_ui/assets/vendor/jquery.ui/ui/widgets/datepicker-min.js. */
/*!
 * jQuery UI Datepicker 1.13.2
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
! function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery", "../version", "../keycode"], e) : e(jQuery)
}((function(e) {
    "use strict";
    var t;

    function a() {
        this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: "",
            selectMonthLabel: "Select month",
            selectYearLabel: "Select year"
        }, this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            onUpdateDatepicker: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        }, e.extend(this._defaults, this.regional[""]), this.regional.en = e.extend(!0, {}, this.regional[""]), this.regional["en-US"] = e.extend(!0, {}, this.regional.en), this.dpDiv = i(e("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
    }

    function i(t) {
        var a = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return t.on("mouseout", a, (function() {
            e(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && e(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && e(this).removeClass("ui-datepicker-next-hover")
        })).on("mouseover", a, s)
    }

    function s() {
        e.datepicker._isDisabledDatepicker(t.inline ? t.dpDiv.parent()[0] : t.input[0]) || (e(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), e(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && e(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && e(this).addClass("ui-datepicker-next-hover"))
    }

    function r(t, a) {
        for (var i in e.extend(t, a), a) null == a[i] && (t[i] = a[i]);
        return t
    }
    return e.extend(e.ui, {
        datepicker: {
            version: "1.13.2"
        }
    }), e.extend(a.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function() {
            return this.dpDiv
        },
        setDefaults: function(e) {
            return r(this._defaults, e || {}), this
        },
        _attachDatepicker: function(t, a) {
            var i, s, r;
            s = "div" === (i = t.nodeName.toLowerCase()) || "span" === i, t.id || (this.uuid += 1, t.id = "dp" + this.uuid), (r = this._newInst(e(t), s)).settings = e.extend({}, a || {}), "input" === i ? this._connectDatepicker(t, r) : s && this._inlineDatepicker(t, r)
        },
        _newInst: function(t, a) {
            return {
                id: t[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1"),
                input: t,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: a,
                dpDiv: a ? i(e("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
            }
        },
        _connectDatepicker: function(t, a) {
            var i = e(t);
            a.append = e([]), a.trigger = e([]), i.hasClass(this.markerClassName) || (this._attachments(i, a), i.addClass(this.markerClassName).on("keydown", this._doKeyDown).on("keypress", this._doKeyPress).on("keyup", this._doKeyUp), this._autoSize(a), e.data(t, "datepicker", a), a.settings.disabled && this._disableDatepicker(t))
        },
        _attachments: function(t, a) {
            var i, s, r, n = this._get(a, "appendText"),
                d = this._get(a, "isRTL");
            a.append && a.append.remove(), n && (a.append = e("<span>").addClass(this._appendClass).text(n), t[d ? "before" : "after"](a.append)), t.off("focus", this._showDatepicker), a.trigger && a.trigger.remove(), "focus" !== (i = this._get(a, "showOn")) && "both" !== i || t.on("focus", this._showDatepicker), "button" !== i && "both" !== i || (s = this._get(a, "buttonText"), r = this._get(a, "buttonImage"), this._get(a, "buttonImageOnly") ? a.trigger = e("<img>").addClass(this._triggerClass).attr({
                src: r,
                alt: s,
                title: s
            }) : (a.trigger = e("<button type='button'>").addClass(this._triggerClass), r ? a.trigger.html(e("<img>").attr({
                src: r,
                alt: s,
                title: s
            })) : a.trigger.text(s)), t[d ? "before" : "after"](a.trigger), a.trigger.on("click", (function() {
                return e.datepicker._datepickerShowing && e.datepicker._lastInput === t[0] ? e.datepicker._hideDatepicker() : e.datepicker._datepickerShowing && e.datepicker._lastInput !== t[0] ? (e.datepicker._hideDatepicker(), e.datepicker._showDatepicker(t[0])) : e.datepicker._showDatepicker(t[0]), !1
            })))
        },
        _autoSize: function(e) {
            if (this._get(e, "autoSize") && !e.inline) {
                var t, a, i, s, r = new Date(2009, 11, 20),
                    n = this._get(e, "dateFormat");
                n.match(/[DM]/) && (t = function(e) {
                    for (a = 0, i = 0, s = 0; s < e.length; s++) e[s].length > a && (a = e[s].length, i = s);
                    return i
                }, r.setMonth(t(this._get(e, n.match(/MM/) ? "monthNames" : "monthNamesShort"))), r.setDate(t(this._get(e, n.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - r.getDay())), e.input.attr("size", this._formatDate(e, r).length)
            }
        },
        _inlineDatepicker: function(t, a) {
            var i = e(t);
            i.hasClass(this.markerClassName) || (i.addClass(this.markerClassName).append(a.dpDiv), e.data(t, "datepicker", a), this._setDate(a, this._getDefaultDate(a), !0), this._updateDatepicker(a), this._updateAlternate(a), a.settings.disabled && this._disableDatepicker(t), a.dpDiv.css("display", "block"))
        },
        _dialogDatepicker: function(t, a, i, s, n) {
            var d, c, o, l, h, u = this._dialogInst;
            return u || (this.uuid += 1, d = "dp" + this.uuid, this._dialogInput = e("<input type='text' id='" + d + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.on("keydown", this._doKeyDown), e("body").append(this._dialogInput), (u = this._dialogInst = this._newInst(this._dialogInput, !1)).settings = {}, e.data(this._dialogInput[0], "datepicker", u)), r(u.settings, s || {}), a = a && a.constructor === Date ? this._formatDate(u, a) : a, this._dialogInput.val(a), this._pos = n ? n.length ? n : [n.pageX, n.pageY] : null, this._pos || (c = document.documentElement.clientWidth, o = document.documentElement.clientHeight, l = document.documentElement.scrollLeft || document.body.scrollLeft, h = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [c / 2 - 100 + l, o / 2 - 150 + h]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), u.settings.onSelect = i, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), e.blockUI && e.blockUI(this.dpDiv), e.data(this._dialogInput[0], "datepicker", u), this
        },
        _destroyDatepicker: function(a) {
            var i, s = e(a),
                r = e.data(a, "datepicker");
            s.hasClass(this.markerClassName) && (i = a.nodeName.toLowerCase(), e.removeData(a, "datepicker"), "input" === i ? (r.append.remove(), r.trigger.remove(), s.removeClass(this.markerClassName).off("focus", this._showDatepicker).off("keydown", this._doKeyDown).off("keypress", this._doKeyPress).off("keyup", this._doKeyUp)) : "div" !== i && "span" !== i || s.removeClass(this.markerClassName).empty(), t === r && (t = null, this._curInst = null))
        },
        _enableDatepicker: function(t) {
            var a, i, s = e(t),
                r = e.data(t, "datepicker");
            s.hasClass(this.markerClassName) && ("input" === (a = t.nodeName.toLowerCase()) ? (t.disabled = !1, r.trigger.filter("button").each((function() {
                this.disabled = !1
            })).end().filter("img").css({
                opacity: "1.0",
                cursor: ""
            })) : "div" !== a && "span" !== a || ((i = s.children("." + this._inlineClass)).children().removeClass("ui-state-disabled"), i.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = e.map(this._disabledInputs, (function(e) {
                return e === t ? null : e
            })))
        },
        _disableDatepicker: function(t) {
            var a, i, s = e(t),
                r = e.data(t, "datepicker");
            s.hasClass(this.markerClassName) && ("input" === (a = t.nodeName.toLowerCase()) ? (t.disabled = !0, r.trigger.filter("button").each((function() {
                this.disabled = !0
            })).end().filter("img").css({
                opacity: "0.5",
                cursor: "default"
            })) : "div" !== a && "span" !== a || ((i = s.children("." + this._inlineClass)).children().addClass("ui-state-disabled"), i.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = e.map(this._disabledInputs, (function(e) {
                return e === t ? null : e
            })), this._disabledInputs[this._disabledInputs.length] = t)
        },
        _isDisabledDatepicker: function(e) {
            if (!e) return !1;
            for (var t = 0; t < this._disabledInputs.length; t++)
                if (this._disabledInputs[t] === e) return !0;
            return !1
        },
        _getInst: function(t) {
            try {
                return e.data(t, "datepicker")
            } catch (e) {
                throw "Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function(t, a, i) {
            var s, n, d, c, o = this._getInst(t);
            if (2 === arguments.length && "string" == typeof a) return "defaults" === a ? e.extend({}, e.datepicker._defaults) : o ? "all" === a ? e.extend({}, o.settings) : this._get(o, a) : null;
            s = a || {}, "string" == typeof a && ((s = {})[a] = i), o && (this._curInst === o && this._hideDatepicker(), n = this._getDateDatepicker(t, !0), d = this._getMinMaxDate(o, "min"), c = this._getMinMaxDate(o, "max"), r(o.settings, s), null !== d && void 0 !== s.dateFormat && void 0 === s.minDate && (o.settings.minDate = this._formatDate(o, d)), null !== c && void 0 !== s.dateFormat && void 0 === s.maxDate && (o.settings.maxDate = this._formatDate(o, c)), "disabled" in s && (s.disabled ? this._disableDatepicker(t) : this._enableDatepicker(t)), this._attachments(e(t), o), this._autoSize(o), this._setDate(o, n), this._updateAlternate(o), this._updateDatepicker(o))
        },
        _changeDatepicker: function(e, t, a) {
            this._optionDatepicker(e, t, a)
        },
        _refreshDatepicker: function(e) {
            var t = this._getInst(e);
            t && this._updateDatepicker(t)
        },
        _setDateDatepicker: function(e, t) {
            var a = this._getInst(e);
            a && (this._setDate(a, t), this._updateDatepicker(a), this._updateAlternate(a))
        },
        _getDateDatepicker: function(e, t) {
            var a = this._getInst(e);
            return a && !a.inline && this._setDateFromField(a, t), a ? this._getDate(a) : null
        },
        _doKeyDown: function(t) {
            var a, i, s, r = e.datepicker._getInst(t.target),
                n = !0,
                d = r.dpDiv.is(".ui-datepicker-rtl");
            if (r._keyEvent = !0, e.datepicker._datepickerShowing) switch (t.keyCode) {
                case 9:
                    e.datepicker._hideDatepicker(), n = !1;
                    break;
                case 13:
                    return (s = e("td." + e.datepicker._dayOverClass + ":not(." + e.datepicker._currentClass + ")", r.dpDiv))[0] && e.datepicker._selectDay(t.target, r.selectedMonth, r.selectedYear, s[0]), (a = e.datepicker._get(r, "onSelect")) ? (i = e.datepicker._formatDate(r), a.apply(r.input ? r.input[0] : null, [i, r])) : e.datepicker._hideDatepicker(), !1;
                case 27:
                    e.datepicker._hideDatepicker();
                    break;
                case 33:
                    e.datepicker._adjustDate(t.target, t.ctrlKey ? -e.datepicker._get(r, "stepBigMonths") : -e.datepicker._get(r, "stepMonths"), "M");
                    break;
                case 34:
                    e.datepicker._adjustDate(t.target, t.ctrlKey ? +e.datepicker._get(r, "stepBigMonths") : +e.datepicker._get(r, "stepMonths"), "M");
                    break;
                case 35:
                    (t.ctrlKey || t.metaKey) && e.datepicker._clearDate(t.target), n = t.ctrlKey || t.metaKey;
                    break;
                case 36:
                    (t.ctrlKey || t.metaKey) && e.datepicker._gotoToday(t.target), n = t.ctrlKey || t.metaKey;
                    break;
                case 37:
                    (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, d ? 1 : -1, "D"), n = t.ctrlKey || t.metaKey, t.originalEvent.altKey && e.datepicker._adjustDate(t.target, t.ctrlKey ? -e.datepicker._get(r, "stepBigMonths") : -e.datepicker._get(r, "stepMonths"), "M");
                    break;
                case 38:
                    (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, -7, "D"), n = t.ctrlKey || t.metaKey;
                    break;
                case 39:
                    (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, d ? -1 : 1, "D"), n = t.ctrlKey || t.metaKey, t.originalEvent.altKey && e.datepicker._adjustDate(t.target, t.ctrlKey ? +e.datepicker._get(r, "stepBigMonths") : +e.datepicker._get(r, "stepMonths"), "M");
                    break;
                case 40:
                    (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, 7, "D"), n = t.ctrlKey || t.metaKey;
                    break;
                default:
                    n = !1
            } else 36 === t.keyCode && t.ctrlKey ? e.datepicker._showDatepicker(this) : n = !1;
            n && (t.preventDefault(), t.stopPropagation())
        },
        _doKeyPress: function(t) {
            var a, i, s = e.datepicker._getInst(t.target);
            if (e.datepicker._get(s, "constrainInput")) return a = e.datepicker._possibleChars(e.datepicker._get(s, "dateFormat")), i = String.fromCharCode(null == t.charCode ? t.keyCode : t.charCode), t.ctrlKey || t.metaKey || i < " " || !a || a.indexOf(i) > -1
        },
        _doKeyUp: function(t) {
            var a = e.datepicker._getInst(t.target);
            if (a.input.val() !== a.lastVal) try {
                e.datepicker.parseDate(e.datepicker._get(a, "dateFormat"), a.input ? a.input.val() : null, e.datepicker._getFormatConfig(a)) && (e.datepicker._setDateFromField(a), e.datepicker._updateAlternate(a), e.datepicker._updateDatepicker(a))
            } catch (e) {}
            return !0
        },
        _showDatepicker: function(t) {
            var a, i, s, n, d, c, o;
            ("input" !== (t = t.target || t).nodeName.toLowerCase() && (t = e("input", t.parentNode)[0]), e.datepicker._isDisabledDatepicker(t) || e.datepicker._lastInput === t) || (a = e.datepicker._getInst(t), e.datepicker._curInst && e.datepicker._curInst !== a && (e.datepicker._curInst.dpDiv.stop(!0, !0), a && e.datepicker._datepickerShowing && e.datepicker._hideDatepicker(e.datepicker._curInst.input[0])), !1 !== (s = (i = e.datepicker._get(a, "beforeShow")) ? i.apply(t, [t, a]) : {}) && (r(a.settings, s), a.lastVal = null, e.datepicker._lastInput = t, e.datepicker._setDateFromField(a), e.datepicker._inDialog && (t.value = ""), e.datepicker._pos || (e.datepicker._pos = e.datepicker._findPos(t), e.datepicker._pos[1] += t.offsetHeight), n = !1, e(t).parents().each((function() {
                return !(n |= "fixed" === e(this).css("position"))
            })), d = {
                left: e.datepicker._pos[0],
                top: e.datepicker._pos[1]
            }, e.datepicker._pos = null, a.dpDiv.empty(), a.dpDiv.css({
                position: "absolute",
                display: "block",
                top: "-1000px"
            }), e.datepicker._updateDatepicker(a), d = e.datepicker._checkOffset(a, d, n), a.dpDiv.css({
                position: e.datepicker._inDialog && e.blockUI ? "static" : n ? "fixed" : "absolute",
                display: "none",
                left: d.left + "px",
                top: d.top + "px"
            }), a.inline || (c = e.datepicker._get(a, "showAnim"), o = e.datepicker._get(a, "duration"), a.dpDiv.css("z-index", function(e) {
                for (var t, a; e.length && e[0] !== document;) {
                    if (("absolute" === (t = e.css("position")) || "relative" === t || "fixed" === t) && (a = parseInt(e.css("zIndex"), 10), !isNaN(a) && 0 !== a)) return a;
                    e = e.parent()
                }
                return 0
            }(e(t)) + 1), e.datepicker._datepickerShowing = !0, e.effects && e.effects.effect[c] ? a.dpDiv.show(c, e.datepicker._get(a, "showOptions"), o) : a.dpDiv[c || "show"](c ? o : null), e.datepicker._shouldFocusInput(a) && a.input.trigger("focus"), e.datepicker._curInst = a)))
        },
        _updateDatepicker: function(a) {
            this.maxRows = 4, t = a, a.dpDiv.empty().append(this._generateHTML(a)), this._attachHandlers(a);
            var i, r = this._getNumberOfMonths(a),
                n = r[1],
                d = a.dpDiv.find("." + this._dayOverClass + " a"),
                c = e.datepicker._get(a, "onUpdateDatepicker");
            d.length > 0 && s.apply(d.get(0)), a.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), n > 1 && a.dpDiv.addClass("ui-datepicker-multi-" + n).css("width", 17 * n + "em"), a.dpDiv[(1 !== r[0] || 1 !== r[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), a.dpDiv[(this._get(a, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), a === e.datepicker._curInst && e.datepicker._datepickerShowing && e.datepicker._shouldFocusInput(a) && a.input.trigger("focus"), a.yearshtml && (i = a.yearshtml, setTimeout((function() {
                i === a.yearshtml && a.yearshtml && a.dpDiv.find("select.ui-datepicker-year").first().replaceWith(a.yearshtml), i = a.yearshtml = null
            }), 0)), c && c.apply(a.input ? a.input[0] : null, [a])
        },
        _shouldFocusInput: function(e) {
            return e.input && e.input.is(":visible") && !e.input.is(":disabled") && !e.input.is(":focus")
        },
        _checkOffset: function(t, a, i) {
            var s = t.dpDiv.outerWidth(),
                r = t.dpDiv.outerHeight(),
                n = t.input ? t.input.outerWidth() : 0,
                d = t.input ? t.input.outerHeight() : 0,
                c = document.documentElement.clientWidth + (i ? 0 : e(document).scrollLeft()),
                o = document.documentElement.clientHeight + (i ? 0 : e(document).scrollTop());
            return a.left -= this._get(t, "isRTL") ? s - n : 0, a.left -= i && a.left === t.input.offset().left ? e(document).scrollLeft() : 0, a.top -= i && a.top === t.input.offset().top + d ? e(document).scrollTop() : 0, a.left -= Math.min(a.left, a.left + s > c && c > s ? Math.abs(a.left + s - c) : 0), a.top -= Math.min(a.top, a.top + r > o && o > r ? Math.abs(r + d) : 0), a
        },
        _findPos: function(t) {
            for (var a, i = this._getInst(t), s = this._get(i, "isRTL"); t && ("hidden" === t.type || 1 !== t.nodeType || e.expr.pseudos.hidden(t));) t = t[s ? "previousSibling" : "nextSibling"];
            return [(a = e(t).offset()).left, a.top]
        },
        _hideDatepicker: function(t) {
            var a, i, s, r, n = this._curInst;
            !n || t && n !== e.data(t, "datepicker") || this._datepickerShowing && (a = this._get(n, "showAnim"), i = this._get(n, "duration"), s = function() {
                e.datepicker._tidyDialog(n)
            }, e.effects && (e.effects.effect[a] || e.effects[a]) ? n.dpDiv.hide(a, e.datepicker._get(n, "showOptions"), i, s) : n.dpDiv["slideDown" === a ? "slideUp" : "fadeIn" === a ? "fadeOut" : "hide"](a ? i : null, s), a || s(), this._datepickerShowing = !1, (r = this._get(n, "onClose")) && r.apply(n.input ? n.input[0] : null, [n.input ? n.input.val() : "", n]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                position: "absolute",
                left: "0",
                top: "-100px"
            }), e.blockUI && (e.unblockUI(), e("body").append(this.dpDiv))), this._inDialog = !1)
        },
        _tidyDialog: function(e) {
            e.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar")
        },
        _checkExternalClick: function(t) {
            if (e.datepicker._curInst) {
                var a = e(t.target),
                    i = e.datepicker._getInst(a[0]);
                (a[0].id === e.datepicker._mainDivId || 0 !== a.parents("#" + e.datepicker._mainDivId).length || a.hasClass(e.datepicker.markerClassName) || a.closest("." + e.datepicker._triggerClass).length || !e.datepicker._datepickerShowing || e.datepicker._inDialog && e.blockUI) && (!a.hasClass(e.datepicker.markerClassName) || e.datepicker._curInst === i) || e.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function(t, a, i) {
            var s = e(t),
                r = this._getInst(s[0]);
            this._isDisabledDatepicker(s[0]) || (this._adjustInstDate(r, a, i), this._updateDatepicker(r))
        },
        _gotoToday: function(t) {
            var a, i = e(t),
                s = this._getInst(i[0]);
            this._get(s, "gotoCurrent") && s.currentDay ? (s.selectedDay = s.currentDay, s.drawMonth = s.selectedMonth = s.currentMonth, s.drawYear = s.selectedYear = s.currentYear) : (a = new Date, s.selectedDay = a.getDate(), s.drawMonth = s.selectedMonth = a.getMonth(), s.drawYear = s.selectedYear = a.getFullYear()), this._notifyChange(s), this._adjustDate(i)
        },
        _selectMonthYear: function(t, a, i) {
            var s = e(t),
                r = this._getInst(s[0]);
            r["selected" + ("M" === i ? "Month" : "Year")] = r["draw" + ("M" === i ? "Month" : "Year")] = parseInt(a.options[a.selectedIndex].value, 10), this._notifyChange(r), this._adjustDate(s)
        },
        _selectDay: function(t, a, i, s) {
            var r, n = e(t);
            e(s).hasClass(this._unselectableClass) || this._isDisabledDatepicker(n[0]) || ((r = this._getInst(n[0])).selectedDay = r.currentDay = parseInt(e("a", s).attr("data-date")), r.selectedMonth = r.currentMonth = a, r.selectedYear = r.currentYear = i, this._selectDate(t, this._formatDate(r, r.currentDay, r.currentMonth, r.currentYear)))
        },
        _clearDate: function(t) {
            var a = e(t);
            this._selectDate(a, "")
        },
        _selectDate: function(t, a) {
            var i, s = e(t),
                r = this._getInst(s[0]);
            a = null != a ? a : this._formatDate(r), r.input && r.input.val(a), this._updateAlternate(r), (i = this._get(r, "onSelect")) ? i.apply(r.input ? r.input[0] : null, [a, r]) : r.input && r.input.trigger("change"), r.inline ? this._updateDatepicker(r) : (this._hideDatepicker(), this._lastInput = r.input[0], "object" != typeof r.input[0] && r.input.trigger("focus"), this._lastInput = null)
        },
        _updateAlternate: function(t) {
            var a, i, s, r = this._get(t, "altField");
            r && (a = this._get(t, "altFormat") || this._get(t, "dateFormat"), i = this._getDate(t), s = this.formatDate(a, i, this._getFormatConfig(t)), e(document).find(r).val(s))
        },
        noWeekends: function(e) {
            var t = e.getDay();
            return [t > 0 && t < 6, ""]
        },
        iso8601Week: function(e) {
            var t, a = new Date(e.getTime());
            return a.setDate(a.getDate() + 4 - (a.getDay() || 7)), t = a.getTime(), a.setMonth(0), a.setDate(1), Math.floor(Math.round((t - a) / 864e5) / 7) + 1
        },
        parseDate: function(t, a, i) {
            if (null == t || null == a) throw "Invalid arguments";
            if ("" === (a = "object" == typeof a ? a.toString() : a + "")) return null;
            var s, r, n, d, c = 0,
                o = (i ? i.shortYearCutoff : null) || this._defaults.shortYearCutoff,
                l = "string" != typeof o ? o : (new Date).getFullYear() % 100 + parseInt(o, 10),
                h = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
                u = (i ? i.dayNames : null) || this._defaults.dayNames,
                p = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
                g = (i ? i.monthNames : null) || this._defaults.monthNames,
                _ = -1,
                f = -1,
                k = -1,
                D = -1,
                m = !1,
                y = function(e) {
                    var a = s + 1 < t.length && t.charAt(s + 1) === e;
                    return a && s++, a
                },
                v = function(e) {
                    var t = y(e),
                        i = "@" === e ? 14 : "!" === e ? 20 : "y" === e && t ? 4 : "o" === e ? 3 : 2,
                        s = new RegExp("^\\d{" + ("y" === e ? i : 1) + "," + i + "}"),
                        r = a.substring(c).match(s);
                    if (!r) throw "Missing number at position " + c;
                    return c += r[0].length, parseInt(r[0], 10)
                },
                M = function(t, i, s) {
                    var r = -1,
                        n = e.map(y(t) ? s : i, (function(e, t) {
                            return [
                                [t, e]
                            ]
                        })).sort((function(e, t) {
                            return -(e[1].length - t[1].length)
                        }));
                    if (e.each(n, (function(e, t) {
                            var i = t[1];
                            if (a.substr(c, i.length).toLowerCase() === i.toLowerCase()) return r = t[0], c += i.length, !1
                        })), -1 !== r) return r + 1;
                    throw "Unknown name at position " + c
                },
                b = function() {
                    if (a.charAt(c) !== t.charAt(s)) throw "Unexpected literal at position " + c;
                    c++
                };
            for (s = 0; s < t.length; s++)
                if (m) "'" !== t.charAt(s) || y("'") ? b() : m = !1;
                else switch (t.charAt(s)) {
                    case "d":
                        k = v("d");
                        break;
                    case "D":
                        M("D", h, u);
                        break;
                    case "o":
                        D = v("o");
                        break;
                    case "m":
                        f = v("m");
                        break;
                    case "M":
                        f = M("M", p, g);
                        break;
                    case "y":
                        _ = v("y");
                        break;
                    case "@":
                        _ = (d = new Date(v("@"))).getFullYear(), f = d.getMonth() + 1, k = d.getDate();
                        break;
                    case "!":
                        _ = (d = new Date((v("!") - this._ticksTo1970) / 1e4)).getFullYear(), f = d.getMonth() + 1, k = d.getDate();
                        break;
                    case "'":
                        y("'") ? b() : m = !0;
                        break;
                    default:
                        b()
                }
            if (c < a.length && (n = a.substr(c), !/^\s+/.test(n))) throw "Extra/unparsed characters found in date: " + n;
            if (-1 === _ ? _ = (new Date).getFullYear() : _ < 100 && (_ += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (_ <= l ? 0 : -100)), D > -1)
                for (f = 1, k = D;;) {
                    if (k <= (r = this._getDaysInMonth(_, f - 1))) break;
                    f++, k -= r
                }
            if ((d = this._daylightSavingAdjust(new Date(_, f - 1, k))).getFullYear() !== _ || d.getMonth() + 1 !== f || d.getDate() !== k) throw "Invalid date";
            return d
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
        formatDate: function(e, t, a) {
            if (!t) return "";
            var i, s = (a ? a.dayNamesShort : null) || this._defaults.dayNamesShort,
                r = (a ? a.dayNames : null) || this._defaults.dayNames,
                n = (a ? a.monthNamesShort : null) || this._defaults.monthNamesShort,
                d = (a ? a.monthNames : null) || this._defaults.monthNames,
                c = function(t) {
                    var a = i + 1 < e.length && e.charAt(i + 1) === t;
                    return a && i++, a
                },
                o = function(e, t, a) {
                    var i = "" + t;
                    if (c(e))
                        for (; i.length < a;) i = "0" + i;
                    return i
                },
                l = function(e, t, a, i) {
                    return c(e) ? i[t] : a[t]
                },
                h = "",
                u = !1;
            if (t)
                for (i = 0; i < e.length; i++)
                    if (u) "'" !== e.charAt(i) || c("'") ? h += e.charAt(i) : u = !1;
                    else switch (e.charAt(i)) {
                        case "d":
                            h += o("d", t.getDate(), 2);
                            break;
                        case "D":
                            h += l("D", t.getDay(), s, r);
                            break;
                        case "o":
                            h += o("o", Math.round((new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime() - new Date(t.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                            break;
                        case "m":
                            h += o("m", t.getMonth() + 1, 2);
                            break;
                        case "M":
                            h += l("M", t.getMonth(), n, d);
                            break;
                        case "y":
                            h += c("y") ? t.getFullYear() : (t.getFullYear() % 100 < 10 ? "0" : "") + t.getFullYear() % 100;
                            break;
                        case "@":
                            h += t.getTime();
                            break;
                        case "!":
                            h += 1e4 * t.getTime() + this._ticksTo1970;
                            break;
                        case "'":
                            c("'") ? h += "'" : u = !0;
                            break;
                        default:
                            h += e.charAt(i)
                    }
            return h
        },
        _possibleChars: function(e) {
            var t, a = "",
                i = !1,
                s = function(a) {
                    var i = t + 1 < e.length && e.charAt(t + 1) === a;
                    return i && t++, i
                };
            for (t = 0; t < e.length; t++)
                if (i) "'" !== e.charAt(t) || s("'") ? a += e.charAt(t) : i = !1;
                else switch (e.charAt(t)) {
                    case "d":
                    case "m":
                    case "y":
                    case "@":
                        a += "0123456789";
                        break;
                    case "D":
                    case "M":
                        return null;
                    case "'":
                        s("'") ? a += "'" : i = !0;
                        break;
                    default:
                        a += e.charAt(t)
                }
            return a
        },
        _get: function(e, t) {
            return void 0 !== e.settings[t] ? e.settings[t] : this._defaults[t]
        },
        _setDateFromField: function(e, t) {
            if (e.input.val() !== e.lastVal) {
                var a = this._get(e, "dateFormat"),
                    i = e.lastVal = e.input ? e.input.val() : null,
                    s = this._getDefaultDate(e),
                    r = s,
                    n = this._getFormatConfig(e);
                try {
                    r = this.parseDate(a, i, n) || s
                } catch (e) {
                    i = t ? "" : i
                }
                e.selectedDay = r.getDate(), e.drawMonth = e.selectedMonth = r.getMonth(), e.drawYear = e.selectedYear = r.getFullYear(), e.currentDay = i ? r.getDate() : 0, e.currentMonth = i ? r.getMonth() : 0, e.currentYear = i ? r.getFullYear() : 0, this._adjustInstDate(e)
            }
        },
        _getDefaultDate: function(e) {
            return this._restrictMinMax(e, this._determineDate(e, this._get(e, "defaultDate"), new Date))
        },
        _determineDate: function(t, a, i) {
            var s = null == a || "" === a ? i : "string" == typeof a ? function(a) {
                try {
                    return e.datepicker.parseDate(e.datepicker._get(t, "dateFormat"), a, e.datepicker._getFormatConfig(t))
                } catch (e) {}
                for (var i = (a.toLowerCase().match(/^c/) ? e.datepicker._getDate(t) : null) || new Date, s = i.getFullYear(), r = i.getMonth(), n = i.getDate(), d = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, c = d.exec(a); c;) {
                    switch (c[2] || "d") {
                        case "d":
                        case "D":
                            n += parseInt(c[1], 10);
                            break;
                        case "w":
                        case "W":
                            n += 7 * parseInt(c[1], 10);
                            break;
                        case "m":
                        case "M":
                            r += parseInt(c[1], 10), n = Math.min(n, e.datepicker._getDaysInMonth(s, r));
                            break;
                        case "y":
                        case "Y":
                            s += parseInt(c[1], 10), n = Math.min(n, e.datepicker._getDaysInMonth(s, r))
                    }
                    c = d.exec(a)
                }
                return new Date(s, r, n)
            }(a) : "number" == typeof a ? isNaN(a) ? i : function(e) {
                var t = new Date;
                return t.setDate(t.getDate() + e), t
            }(a) : new Date(a.getTime());
            return (s = s && "Invalid Date" === s.toString() ? i : s) && (s.setHours(0), s.setMinutes(0), s.setSeconds(0), s.setMilliseconds(0)), this._daylightSavingAdjust(s)
        },
        _daylightSavingAdjust: function(e) {
            return e ? (e.setHours(e.getHours() > 12 ? e.getHours() + 2 : 0), e) : null
        },
        _setDate: function(e, t, a) {
            var i = !t,
                s = e.selectedMonth,
                r = e.selectedYear,
                n = this._restrictMinMax(e, this._determineDate(e, t, new Date));
            e.selectedDay = e.currentDay = n.getDate(), e.drawMonth = e.selectedMonth = e.currentMonth = n.getMonth(), e.drawYear = e.selectedYear = e.currentYear = n.getFullYear(), s === e.selectedMonth && r === e.selectedYear || a || this._notifyChange(e), this._adjustInstDate(e), e.input && e.input.val(i ? "" : this._formatDate(e))
        },
        _getDate: function(e) {
            return !e.currentYear || e.input && "" === e.input.val() ? null : this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay))
        },
        _attachHandlers: function(t) {
            var a = this._get(t, "stepMonths"),
                i = "#" + t.id.replace(/\\\\/g, "\\");
            t.dpDiv.find("[data-handler]").map((function() {
                var t = {
                    prev: function() {
                        e.datepicker._adjustDate(i, -a, "M")
                    },
                    next: function() {
                        e.datepicker._adjustDate(i, +a, "M")
                    },
                    hide: function() {
                        e.datepicker._hideDatepicker()
                    },
                    today: function() {
                        e.datepicker._gotoToday(i)
                    },
                    selectDay: function() {
                        return e.datepicker._selectDay(i, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
                    },
                    selectMonth: function() {
                        return e.datepicker._selectMonthYear(i, this, "M"), !1
                    },
                    selectYear: function() {
                        return e.datepicker._selectMonthYear(i, this, "Y"), !1
                    }
                };
                e(this).on(this.getAttribute("data-event"), t[this.getAttribute("data-handler")])
            }))
        },
        _generateHTML: function(t) {
            var a, i, s, r, n, d, c, o, l, h, u, p, g, _, f, k, D, m, y, v, M, b, w, C, I, x, Y, S, F, N, T, A, K, j, O, L, R, H, W, E = new Date,
                U = this._daylightSavingAdjust(new Date(E.getFullYear(), E.getMonth(), E.getDate())),
                P = this._get(t, "isRTL"),
                z = this._get(t, "showButtonPanel"),
                B = this._get(t, "hideIfNoPrevNext"),
                J = this._get(t, "navigationAsDateFormat"),
                V = this._getNumberOfMonths(t),
                q = this._get(t, "showCurrentAtPos"),
                Q = this._get(t, "stepMonths"),
                X = 1 !== V[0] || 1 !== V[1],
                Z = this._daylightSavingAdjust(t.currentDay ? new Date(t.currentYear, t.currentMonth, t.currentDay) : new Date(9999, 9, 9)),
                $ = this._getMinMaxDate(t, "min"),
                G = this._getMinMaxDate(t, "max"),
                ee = t.drawMonth - q,
                te = t.drawYear;
            if (ee < 0 && (ee += 12, te--), G)
                for (a = this._daylightSavingAdjust(new Date(G.getFullYear(), G.getMonth() - V[0] * V[1] + 1, G.getDate())), a = $ && a < $ ? $ : a; this._daylightSavingAdjust(new Date(te, ee, 1)) > a;) --ee < 0 && (ee = 11, te--);
            for (t.drawMonth = ee, t.drawYear = te, i = this._get(t, "prevText"), i = J ? this.formatDate(i, this._daylightSavingAdjust(new Date(te, ee - Q, 1)), this._getFormatConfig(t)) : i, s = this._canAdjustMonth(t, -1, te, ee) ? e("<a>").attr({
                    class: "ui-datepicker-prev ui-corner-all",
                    "data-handler": "prev",
                    "data-event": "click",
                    title: i
                }).append(e("<span>").addClass("ui-icon ui-icon-circle-triangle-" + (P ? "e" : "w")).text(i))[0].outerHTML : B ? "" : e("<a>").attr({
                    class: "ui-datepicker-prev ui-corner-all ui-state-disabled",
                    title: i
                }).append(e("<span>").addClass("ui-icon ui-icon-circle-triangle-" + (P ? "e" : "w")).text(i))[0].outerHTML, r = this._get(t, "nextText"), r = J ? this.formatDate(r, this._daylightSavingAdjust(new Date(te, ee + Q, 1)), this._getFormatConfig(t)) : r, n = this._canAdjustMonth(t, 1, te, ee) ? e("<a>").attr({
                    class: "ui-datepicker-next ui-corner-all",
                    "data-handler": "next",
                    "data-event": "click",
                    title: r
                }).append(e("<span>").addClass("ui-icon ui-icon-circle-triangle-" + (P ? "w" : "e")).text(r))[0].outerHTML : B ? "" : e("<a>").attr({
                    class: "ui-datepicker-next ui-corner-all ui-state-disabled",
                    title: r
                }).append(e("<span>").attr("class", "ui-icon ui-icon-circle-triangle-" + (P ? "w" : "e")).text(r))[0].outerHTML, d = this._get(t, "currentText"), c = this._get(t, "gotoCurrent") && t.currentDay ? Z : U, d = J ? this.formatDate(d, c, this._getFormatConfig(t)) : d, o = "", t.inline || (o = e("<button>").attr({
                    type: "button",
                    class: "ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all",
                    "data-handler": "hide",
                    "data-event": "click"
                }).text(this._get(t, "closeText"))[0].outerHTML), l = "", z && (l = e("<div class='ui-datepicker-buttonpane ui-widget-content'>").append(P ? o : "").append(this._isInRange(t, c) ? e("<button>").attr({
                    type: "button",
                    class: "ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all",
                    "data-handler": "today",
                    "data-event": "click"
                }).text(d) : "").append(P ? "" : o)[0].outerHTML), h = parseInt(this._get(t, "firstDay"), 10), h = isNaN(h) ? 0 : h, u = this._get(t, "showWeek"), p = this._get(t, "dayNames"), g = this._get(t, "dayNamesMin"), _ = this._get(t, "monthNames"), f = this._get(t, "monthNamesShort"), k = this._get(t, "beforeShowDay"), D = this._get(t, "showOtherMonths"), m = this._get(t, "selectOtherMonths"), y = this._getDefaultDate(t), v = "", b = 0; b < V[0]; b++) {
                for (w = "", this.maxRows = 4, C = 0; C < V[1]; C++) {
                    if (I = this._daylightSavingAdjust(new Date(te, ee, t.selectedDay)), x = " ui-corner-all", Y = "", X) {
                        if (Y += "<div class='ui-datepicker-group", V[1] > 1) switch (C) {
                            case 0:
                                Y += " ui-datepicker-group-first", x = " ui-corner-" + (P ? "right" : "left");
                                break;
                            case V[1] - 1:
                                Y += " ui-datepicker-group-last", x = " ui-corner-" + (P ? "left" : "right");
                                break;
                            default:
                                Y += " ui-datepicker-group-middle", x = ""
                        }
                        Y += "'>"
                    }
                    for (Y += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + x + "'>" + (/all|left/.test(x) && 0 === b ? P ? n : s : "") + (/all|right/.test(x) && 0 === b ? P ? s : n : "") + this._generateMonthYearHeader(t, ee, te, $, G, b > 0 || C > 0, _, f) + "</div><table class='ui-datepicker-calendar'><thead><tr>", S = u ? "<th class='ui-datepicker-week-col'>" + this._get(t, "weekHeader") + "</th>" : "", M = 0; M < 7; M++) S += "<th scope='col'" + ((M + h + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + p[F = (M + h) % 7] + "'>" + g[F] + "</span></th>";
                    for (Y += S + "</tr></thead><tbody>", N = this._getDaysInMonth(te, ee), te === t.selectedYear && ee === t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, N)), T = (this._getFirstDayOfMonth(te, ee) - h + 7) % 7, A = Math.ceil((T + N) / 7), K = X && this.maxRows > A ? this.maxRows : A, this.maxRows = K, j = this._daylightSavingAdjust(new Date(te, ee, 1 - T)), O = 0; O < K; O++) {
                        for (Y += "<tr>", L = u ? "<td class='ui-datepicker-week-col'>" + this._get(t, "calculateWeek")(j) + "</td>" : "", M = 0; M < 7; M++) R = k ? k.apply(t.input ? t.input[0] : null, [j]) : [!0, ""], W = (H = j.getMonth() !== ee) && !m || !R[0] || $ && j < $ || G && j > G, L += "<td class='" + ((M + h + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (H ? " ui-datepicker-other-month" : "") + (j.getTime() === I.getTime() && ee === t.selectedMonth && t._keyEvent || y.getTime() === j.getTime() && y.getTime() === I.getTime() ? " " + this._dayOverClass : "") + (W ? " " + this._unselectableClass + " ui-state-disabled" : "") + (H && !D ? "" : " " + R[1] + (j.getTime() === Z.getTime() ? " " + this._currentClass : "") + (j.getTime() === U.getTime() ? " ui-datepicker-today" : "")) + "'" + (H && !D || !R[2] ? "" : " title='" + R[2].replace(/'/g, "&#39;") + "'") + (W ? "" : " data-handler='selectDay' data-event='click' data-month='" + j.getMonth() + "' data-year='" + j.getFullYear() + "'") + ">" + (H && !D ? "&#xa0;" : W ? "<span class='ui-state-default'>" + j.getDate() + "</span>" : "<a class='ui-state-default" + (j.getTime() === U.getTime() ? " ui-state-highlight" : "") + (j.getTime() === Z.getTime() ? " ui-state-active" : "") + (H ? " ui-priority-secondary" : "") + "' href='#' aria-current='" + (j.getTime() === Z.getTime() ? "true" : "false") + "' data-date='" + j.getDate() + "'>" + j.getDate() + "</a>") + "</td>", j.setDate(j.getDate() + 1), j = this._daylightSavingAdjust(j);
                        Y += L + "</tr>"
                    }++ee > 11 && (ee = 0, te++), w += Y += "</tbody></table>" + (X ? "</div>" + (V[0] > 0 && C === V[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : "")
                }
                v += w
            }
            return v += l, t._keyEvent = !1, v
        },
        _generateMonthYearHeader: function(e, t, a, i, s, r, n, d) {
            var c, o, l, h, u, p, g, _, f = this._get(e, "changeMonth"),
                k = this._get(e, "changeYear"),
                D = this._get(e, "showMonthAfterYear"),
                m = this._get(e, "selectMonthLabel"),
                y = this._get(e, "selectYearLabel"),
                v = "<div class='ui-datepicker-title'>",
                M = "";
            if (r || !f) M += "<span class='ui-datepicker-month'>" + n[t] + "</span>";
            else {
                for (c = i && i.getFullYear() === a, o = s && s.getFullYear() === a, M += "<select class='ui-datepicker-month' aria-label='" + m + "' data-handler='selectMonth' data-event='change'>", l = 0; l < 12; l++)(!c || l >= i.getMonth()) && (!o || l <= s.getMonth()) && (M += "<option value='" + l + "'" + (l === t ? " selected='selected'" : "") + ">" + d[l] + "</option>");
                M += "</select>"
            }
            if (D || (v += M + (!r && f && k ? "" : "&#xa0;")), !e.yearshtml)
                if (e.yearshtml = "", r || !k) v += "<span class='ui-datepicker-year'>" + a + "</span>";
                else {
                    for (h = this._get(e, "yearRange").split(":"), u = (new Date).getFullYear(), p = function(e) {
                            var t = e.match(/c[+\-].*/) ? a + parseInt(e.substring(1), 10) : e.match(/[+\-].*/) ? u + parseInt(e, 10) : parseInt(e, 10);
                            return isNaN(t) ? u : t
                        }, g = p(h[0]), _ = Math.max(g, p(h[1] || "")), g = i ? Math.max(g, i.getFullYear()) : g, _ = s ? Math.min(_, s.getFullYear()) : _, e.yearshtml += "<select class='ui-datepicker-year' aria-label='" + y + "' data-handler='selectYear' data-event='change'>"; g <= _; g++) e.yearshtml += "<option value='" + g + "'" + (g === a ? " selected='selected'" : "") + ">" + g + "</option>";
                    e.yearshtml += "</select>", v += e.yearshtml, e.yearshtml = null
                }
            return v += this._get(e, "yearSuffix"), D && (v += (!r && f && k ? "" : "&#xa0;") + M), v += "</div>"
        },
        _adjustInstDate: function(e, t, a) {
            var i = e.selectedYear + ("Y" === a ? t : 0),
                s = e.selectedMonth + ("M" === a ? t : 0),
                r = Math.min(e.selectedDay, this._getDaysInMonth(i, s)) + ("D" === a ? t : 0),
                n = this._restrictMinMax(e, this._daylightSavingAdjust(new Date(i, s, r)));
            e.selectedDay = n.getDate(), e.drawMonth = e.selectedMonth = n.getMonth(), e.drawYear = e.selectedYear = n.getFullYear(), "M" !== a && "Y" !== a || this._notifyChange(e)
        },
        _restrictMinMax: function(e, t) {
            var a = this._getMinMaxDate(e, "min"),
                i = this._getMinMaxDate(e, "max"),
                s = a && t < a ? a : t;
            return i && s > i ? i : s
        },
        _notifyChange: function(e) {
            var t = this._get(e, "onChangeMonthYear");
            t && t.apply(e.input ? e.input[0] : null, [e.selectedYear, e.selectedMonth + 1, e])
        },
        _getNumberOfMonths: function(e) {
            var t = this._get(e, "numberOfMonths");
            return null == t ? [1, 1] : "number" == typeof t ? [1, t] : t
        },
        _getMinMaxDate: function(e, t) {
            return this._determineDate(e, this._get(e, t + "Date"), null)
        },
        _getDaysInMonth: function(e, t) {
            return 32 - this._daylightSavingAdjust(new Date(e, t, 32)).getDate()
        },
        _getFirstDayOfMonth: function(e, t) {
            return new Date(e, t, 1).getDay()
        },
        _canAdjustMonth: function(e, t, a, i) {
            var s = this._getNumberOfMonths(e),
                r = this._daylightSavingAdjust(new Date(a, i + (t < 0 ? t : s[0] * s[1]), 1));
            return t < 0 && r.setDate(this._getDaysInMonth(r.getFullYear(), r.getMonth())), this._isInRange(e, r)
        },
        _isInRange: function(e, t) {
            var a, i, s = this._getMinMaxDate(e, "min"),
                r = this._getMinMaxDate(e, "max"),
                n = null,
                d = null,
                c = this._get(e, "yearRange");
            return c && (a = c.split(":"), i = (new Date).getFullYear(), n = parseInt(a[0], 10), d = parseInt(a[1], 10), a[0].match(/[+\-].*/) && (n += i), a[1].match(/[+\-].*/) && (d += i)), (!s || t.getTime() >= s.getTime()) && (!r || t.getTime() <= r.getTime()) && (!n || t.getFullYear() >= n) && (!d || t.getFullYear() <= d)
        },
        _getFormatConfig: function(e) {
            var t = this._get(e, "shortYearCutoff");
            return {
                shortYearCutoff: t = "string" != typeof t ? t : (new Date).getFullYear() % 100 + parseInt(t, 10),
                dayNamesShort: this._get(e, "dayNamesShort"),
                dayNames: this._get(e, "dayNames"),
                monthNamesShort: this._get(e, "monthNamesShort"),
                monthNames: this._get(e, "monthNames")
            }
        },
        _formatDate: function(e, t, a, i) {
            t || (e.currentDay = e.selectedDay, e.currentMonth = e.selectedMonth, e.currentYear = e.selectedYear);
            var s = t ? "object" == typeof t ? t : this._daylightSavingAdjust(new Date(i, a, t)) : this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay));
            return this.formatDate(this._get(e, "dateFormat"), s, this._getFormatConfig(e))
        }
    }), e.fn.datepicker = function(t) {
        if (!this.length) return this;
        e.datepicker.initialized || (e(document).on("mousedown", e.datepicker._checkExternalClick), e.datepicker.initialized = !0), 0 === e("#" + e.datepicker._mainDivId).length && e("body").append(e.datepicker.dpDiv);
        var a = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof t || "isDisabled" !== t && "getDate" !== t && "widget" !== t ? "option" === t && 2 === arguments.length && "string" == typeof arguments[1] ? e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [this[0]].concat(a)) : this.each((function() {
            "string" == typeof t ? e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [this].concat(a)) : e.datepicker._attachDatepicker(this, t)
        })) : e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [this[0]].concat(a))
    }, e.datepicker = new a, e.datepicker.initialized = !1, e.datepicker.uuid = (new Date).getTime(), e.datepicker.version = "1.13.2", e.datepicker
}));

/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/modules/contrib/jquery_ui/assets/vendor/jquery.ui/ui/widgets/datepicker-min.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/core/assets/vendor/tabbable/index.umd.min.js. */
/*!
 * tabbable 5.3.3
 * @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
 */
! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : (e = "undefined" != typeof globalThis ? globalThis : e || self, function() {
        var n = e.tabbable,
            o = e.tabbable = {};
        t(o), o.noConflict = function() {
            return e.tabbable = n, o
        }
    }())
}(this, (function(e) {
    "use strict";
    var t = ["input", "select", "textarea", "a[href]", "button", "[tabindex]:not(slot)", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])', "details>summary:first-of-type", "details"],
        n = t.join(","),
        o = "undefined" == typeof Element,
        r = o ? function() {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector,
        i = !o && Element.prototype.getRootNode ? function(e) {
            return e.getRootNode()
        } : function(e) {
            return e.ownerDocument
        },
        a = function(e, t, o) {
            var i = Array.prototype.slice.apply(e.querySelectorAll(n));
            return t && r.call(e, n) && i.unshift(e), i = i.filter(o)
        },
        l = function e(t, o, i) {
            for (var a = [], l = Array.from(t); l.length;) {
                var u = l.shift();
                if ("SLOT" === u.tagName) {
                    var c = u.assignedElements(),
                        d = e(c.length ? c : u.children, !0, i);
                    i.flatten ? a.push.apply(a, d) : a.push({
                        scope: u,
                        candidates: d
                    })
                } else {
                    r.call(u, n) && i.filter(u) && (o || !t.includes(u)) && a.push(u);
                    var f = u.shadowRoot || "function" == typeof i.getShadowRoot && i.getShadowRoot(u),
                        s = !i.shadowRootFilter || i.shadowRootFilter(u);
                    if (f && s) {
                        var p = e(!0 === f ? u.children : f.children, !0, i);
                        i.flatten ? a.push.apply(a, p) : a.push({
                            scope: u,
                            candidates: p
                        })
                    } else l.unshift.apply(l, u.children)
                }
            }
            return a
        },
        u = function(e, t) {
            return e.tabIndex < 0 && (t || /^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName) || e.isContentEditable) && isNaN(parseInt(e.getAttribute("tabindex"), 10)) ? 0 : e.tabIndex
        },
        c = function(e, t) {
            return e.tabIndex === t.tabIndex ? e.documentOrder - t.documentOrder : e.tabIndex - t.tabIndex
        },
        d = function(e) {
            return "INPUT" === e.tagName
        },
        f = function(e) {
            return function(e) {
                return d(e) && "radio" === e.type
            }(e) && ! function(e) {
                if (!e.name) return !0;
                var t, n = e.form || i(e),
                    o = function(e) {
                        return n.querySelectorAll('input[type="radio"][name="' + e + '"]')
                    };
                if ("undefined" != typeof window && void 0 !== window.CSS && "function" == typeof window.CSS.escape) t = o(window.CSS.escape(e.name));
                else try {
                    t = o(e.name)
                } catch (e) {
                    return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", e.message), !1
                }
                var r = function(e, t) {
                    for (var n = 0; n < e.length; n++)
                        if (e[n].checked && e[n].form === t) return e[n]
                }(t, e.form);
                return !r || r === e
            }(e)
        },
        s = function(e) {
            var t = e.getBoundingClientRect(),
                n = t.width,
                o = t.height;
            return 0 === n && 0 === o
        },
        p = function(e, t) {
            return !(t.disabled || function(e) {
                return d(e) && "hidden" === e.type
            }(t) || function(e, t) {
                var n = t.displayCheck,
                    o = t.getShadowRoot;
                if ("hidden" === getComputedStyle(e).visibility) return !0;
                var a = r.call(e, "details>summary:first-of-type") ? e.parentElement : e;
                if (r.call(a, "details:not([open]) *")) return !0;
                var l = i(e).host,
                    u = (null == l ? void 0 : l.ownerDocument.contains(l)) || e.ownerDocument.contains(e);
                if (n && "full" !== n) {
                    if ("non-zero-area" === n) return s(e)
                } else {
                    if ("function" == typeof o) {
                        for (var c = e; e;) {
                            var d = e.parentElement,
                                f = i(e);
                            if (d && !d.shadowRoot && !0 === o(d)) return s(e);
                            e = e.assignedSlot ? e.assignedSlot : d || f === e.ownerDocument ? d : f.host
                        }
                        e = c
                    }
                    if (u) return !e.getClientRects().length
                }
                return !1
            }(t, e) || function(e) {
                return "DETAILS" === e.tagName && Array.prototype.slice.apply(e.children).some((function(e) {
                    return "SUMMARY" === e.tagName
                }))
            }(t) || function(e) {
                if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))
                    for (var t = e.parentElement; t;) {
                        if ("FIELDSET" === t.tagName && t.disabled) {
                            for (var n = 0; n < t.children.length; n++) {
                                var o = t.children.item(n);
                                if ("LEGEND" === o.tagName) return !!r.call(t, "fieldset[disabled] *") || !o.contains(e)
                            }
                            return !0
                        }
                        t = t.parentElement
                    }
                return !1
            }(t))
        },
        h = function(e, t) {
            return !(f(t) || u(t) < 0 || !p(e, t))
        },
        b = function(e) {
            var t = parseInt(e.getAttribute("tabindex"), 10);
            return !!(isNaN(t) || t >= 0)
        },
        m = t.concat("iframe").join(",");
    e.focusable = function(e, t) {
        return (t = t || {}).getShadowRoot ? l([e], t.includeContainer, {
            filter: p.bind(null, t),
            flatten: !0,
            getShadowRoot: t.getShadowRoot
        }) : a(e, t.includeContainer, p.bind(null, t))
    }, e.isFocusable = function(e, t) {
        if (t = t || {}, !e) throw new Error("No node provided");
        return !1 !== r.call(e, m) && p(t, e)
    }, e.isTabbable = function(e, t) {
        if (t = t || {}, !e) throw new Error("No node provided");
        return !1 !== r.call(e, n) && h(t, e)
    }, e.tabbable = function(e, t) {
        return function e(t) {
            var n = [],
                o = [];
            return t.forEach((function(t, r) {
                var i = !!t.scope,
                    a = i ? t.scope : t,
                    l = u(a, i),
                    c = i ? e(t.candidates) : a;
                0 === l ? i ? n.push.apply(n, c) : n.push(a) : o.push({
                    documentOrder: r,
                    tabIndex: l,
                    item: t,
                    isScope: i,
                    content: c
                })
            })), o.sort(c).reduce((function(e, t) {
                return t.isScope ? e.push.apply(e, t.content) : e.push(t.content), e
            }), []).concat(n)
        }((t = t || {}).getShadowRoot ? l([e], t.includeContainer, {
            filter: h.bind(null, t),
            flatten: !1,
            getShadowRoot: t.getShadowRoot,
            shadowRootFilter: b
        }) : a(e, t.includeContainer, h.bind(null, t)))
    }, Object.defineProperty(e, "__esModule", {
        value: !0
    })
}));

/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/core/assets/vendor/tabbable/index.umd.min.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/core/misc/autocomplete.js. */
(function($, Drupal) {
    var autocomplete

    function autocompleteSplitValues(value) {
        var result = [],
            quote = false,
            current = '',
            valueLength = value.length,
            character;
        for (var i = 0; i < valueLength; i++) {
            character = value.charAt(i);
            if (character === '"') {
                current += character;
                quote = !quote
            } else if (character === ',' && !quote) {
                result.push(current.trim());
                current = ''
            } else current += character
        };
        if (value.length > 0) result.push(current.trim());
        return result
    }

    function extractLastTerm(terms) {
        return autocomplete.splitValues(terms).pop()
    }

    function searchHandler(event) {
        var options = autocomplete.options;
        if (options.isComposing) return false;
        var term = autocomplete.extractLastTerm(event.target.value);
        if (term.length > 0 && options.firstCharacterBlacklist.indexOf(term[0]) !== -1) return false;
        return term.length >= options.minLength
    }

    function sourceData(request, response) {
        var elementId = this.element.attr('id');
        if (!(elementId in autocomplete.cache)) autocomplete.cache[elementId] = {}

        function showSuggestions(suggestions) {
            var tagged = autocomplete.splitValues(request.term),
                il = tagged.length;
            for (var i = 0; i < il; i++) {
                var index = suggestions.indexOf(tagged[i]);
                if (index >= 0) suggestions.splice(index, 1)
            };
            response(suggestions)
        };
        var term = autocomplete.extractLastTerm(request.term)

        function sourceCallbackHandler(data) {
            autocomplete.cache[elementId][term] = data;
            showSuggestions(data)
        };
        if (autocomplete.cache[elementId].hasOwnProperty(term)) {
            showSuggestions(autocomplete.cache[elementId][term])
        } else {
            var options = $.extend({
                success: sourceCallbackHandler,
                data: {
                    q: term
                }
            }, autocomplete.ajax);
            $.ajax(this.element.attr('data-autocomplete-path'), options)
        }
    }

    function focusHandler() {
        return false
    }

    function selectHandler(event, ui) {
        var terms = autocomplete.splitValues(event.target.value);
        terms.pop();
        terms.push(ui.item.value);
        event.target.value = terms.join(', ');
        return false
    }

    function renderItem(ul, item) {
        return $('<li>').append($('<a>').html(item.label)).appendTo(ul)
    };
    Drupal.behaviors.autocomplete = {
        attach: function attach(context) {
            var $autocomplete = $(once('autocomplete', 'input.form-autocomplete', context));
            if ($autocomplete.length) {
                var blacklist = $autocomplete.attr('data-autocomplete-first-character-blacklist');
                $.extend(autocomplete.options, {
                    firstCharacterBlacklist: blacklist || ''
                });
                $autocomplete.autocomplete(autocomplete.options).each(function() {
                    $(this).data('ui-autocomplete')._renderItem = autocomplete.options.renderItem
                });
                $autocomplete.on('compositionstart.autocomplete', function() {
                    autocomplete.options.isComposing = true
                });
                $autocomplete.on('compositionend.autocomplete', function() {
                    autocomplete.options.isComposing = false
                })
            }
        },
        detach: function detach(context, settings, trigger) {
            if (trigger === 'unload') $(once.remove('autocomplete', 'input.form-autocomplete', context)).autocomplete('destroy')
        }
    };
    autocomplete = {
        cache: {},
        splitValues: autocompleteSplitValues,
        extractLastTerm: extractLastTerm,
        options: {
            source: sourceData,
            focus: focusHandler,
            search: searchHandler,
            select: selectHandler,
            renderItem: renderItem,
            minLength: 1,
            firstCharacterBlacklist: '',
            isComposing: false
        },
        ajax: {
            dataType: 'json',
            jsonp: false
        }
    };
    Drupal.autocomplete = autocomplete
})(jQuery, Drupal)
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/core/misc/autocomplete.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/core/misc/progress.js. */
(function($, Drupal) {
    Drupal.theme.progressBar = function(id) {
        return "<div id=\"".concat(id, "\" class=\"progress\" aria-live=\"polite\">") + '<div class="progress__label">&nbsp;</div><div class="progress__track"><div class="progress__bar"></div></div><div class="progress__percentage"></div><div class="progress__description">&nbsp;</div></div>'
    };
    Drupal.ProgressBar = function(id, updateCallback, method, errorCallback) {
        this.id = id;
        this.method = method || 'GET';
        this.updateCallback = updateCallback;
        this.errorCallback = errorCallback;
        this.element = $(Drupal.theme('progressBar', id))
    };
    $.extend(Drupal.ProgressBar.prototype, {
        setProgress: function setProgress(percentage, message, label) {
            if (percentage >= 0 && percentage <= 100) {
                $(this.element).find('div.progress__bar').css('width', "".concat(percentage, "%"));
                $(this.element).find('div.progress__percentage').html("".concat(percentage, "%"))
            };
            $('div.progress__description', this.element).html(message);
            $('div.progress__label', this.element).html(label);
            if (this.updateCallback) this.updateCallback(percentage, message, this)
        },
        startMonitoring: function startMonitoring(uri, delay) {
            this.delay = delay;
            this.uri = uri;
            this.sendPing()
        },
        stopMonitoring: function stopMonitoring() {
            clearTimeout(this.timer);
            this.uri = null
        },
        sendPing: function sendPing() {
            if (this.timer) clearTimeout(this.timer);
            if (this.uri) {
                var pb = this,
                    uri = this.uri;
                if (uri.indexOf('?') === -1) {
                    uri += '?'
                } else uri += '&';
                uri += '_format=json';
                $.ajax({
                    type: this.method,
                    url: uri,
                    data: '',
                    dataType: 'json',
                    success: function success(progress) {
                        if (progress.status === 0) {
                            pb.displayError(progress.data);
                            return
                        };
                        pb.setProgress(progress.percentage, progress.message, progress.label);
                        pb.timer = setTimeout(function() {
                            pb.sendPing()
                        }, pb.delay)
                    },
                    error: function error(xmlhttp) {
                        var e = new Drupal.AjaxError(xmlhttp, pb.uri);
                        pb.displayError("<pre>".concat(e.message, "</pre>"))
                    }
                })
            }
        },
        displayError: function displayError(string) {
            var error = $('<div class="messages messages--error"></div>').html(string);
            $(this.element).before(error).hide();
            if (this.errorCallback) this.errorCallback(this)
        }
    })
})(jQuery, Drupal)
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/core/misc/progress.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/core/misc/jquery.once.bc.js. */
(function($, once) {
    var deprecatedMessageSuffix = "is deprecated in Drupal 9.3.0 and will be removed in Drupal 10.0.0. Use the core/once library instead. See https://www.drupal.org/node/3158256",
        originalJQOnce = $.fn.once,
        originalJQRemoveOnce = $.fn.removeOnce;
    $.fn.once = function jQueryOnce(id) {
        Drupal.deprecationError({
            message: "jQuery.once() ".concat(deprecatedMessageSuffix)
        });
        return originalJQOnce.apply(this, [id])
    };
    $.fn.removeOnce = function jQueryRemoveOnce(id) {
        Drupal.deprecationError({
            message: "jQuery.removeOnce() ".concat(deprecatedMessageSuffix)
        });
        return originalJQRemoveOnce.apply(this, [id])
    };
    var drupalOnce = once

    function augmentedOnce(id, selector, context) {
        originalJQOnce.apply($(selector, context), [id]);
        return drupalOnce(id, selector, context)
    }

    function remove(id, selector, context) {
        originalJQRemoveOnce.apply($(selector, context), [id]);
        return drupalOnce.remove(id, selector, context)
    };
    window.once = Object.assign(augmentedOnce, drupalOnce, {
        remove: remove
    })
})(jQuery, once)
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/core/misc/jquery.once.bc.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/core/assets/vendor/loadjs/loadjs.min.js. */
loadjs = function() {
    var h = function() {},
        c = {},
        u = {},
        f = {};

    function o(e, n) {
        if (e) {
            var r = f[e];
            if (u[e] = n, r)
                for (; r.length;) r[0](e, n), r.splice(0, 1)
        }
    }

    function l(e, n) {
        e.call && (e = {
            success: e
        }), n.length ? (e.error || h)(n) : (e.success || h)(e)
    }

    function d(r, t, s, i) {
        var c, o, e = document,
            n = s.async,
            u = (s.numRetries || 0) + 1,
            f = s.before || h,
            l = r.replace(/[\?|#].*$/, ""),
            a = r.replace(/^(css|img)!/, "");
        i = i || 0, /(^css!|\.css$)/.test(l) ? ((o = e.createElement("link")).rel = "stylesheet", o.href = a, (c = "hideFocus" in o) && o.relList && (c = 0, o.rel = "preload", o.as = "style")) : /(^img!|\.(png|gif|jpg|svg|webp)$)/.test(l) ? (o = e.createElement("img")).src = a : ((o = e.createElement("script")).src = r, o.async = void 0 === n || n), !(o.onload = o.onerror = o.onbeforeload = function(e) {
            var n = e.type[0];
            if (c) try {
                o.sheet.cssText.length || (n = "e")
            } catch (e) {
                18 != e.code && (n = "e")
            }
            if ("e" == n) {
                if ((i += 1) < u) return d(r, t, s, i)
            } else if ("preload" == o.rel && "style" == o.as) return o.rel = "stylesheet";
            t(r, n, e.defaultPrevented)
        }) !== f(r, o) && e.head.appendChild(o)
    }

    function r(e, n, r) {
        var t, s;
        if (n && n.trim && (t = n), s = (t ? r : n) || {}, t) {
            if (t in c) throw "LoadJS";
            c[t] = !0
        }

        function i(n, r) {
            ! function(e, t, n) {
                var r, s, i = (e = e.push ? e : [e]).length,
                    c = i,
                    o = [];
                for (r = function(e, n, r) {
                        if ("e" == n && o.push(e), "b" == n) {
                            if (!r) return;
                            o.push(e)
                        }--i || t(o)
                    }, s = 0; s < c; s++) d(e[s], r, n)
            }(e, function(e) {
                l(s, e), n && l({
                    success: n,
                    error: r
                }, e), o(t, e)
            }, s)
        }
        if (s.returnPromise) return new Promise(i);
        i()
    }
    return r.ready = function(e, n) {
        return function(e, r) {
            e = e.push ? e : [e];
            var n, t, s, i = [],
                c = e.length,
                o = c;
            for (n = function(e, n) {
                    n.length && i.push(e), --o || r(i)
                }; c--;) t = e[c], (s = u[t]) ? n(t, s) : (f[t] = f[t] || []).push(n)
        }(e, function(e) {
            l(n, e)
        }), r
    }, r.done = function(e) {
        o(e, [])
    }, r.reset = function() {
        c = {}, u = {}, f = {}
    }, r.isDefined = function(e) {
        return e in c
    }, r
}();
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/core/assets/vendor/loadjs/loadjs.min.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/core/modules/responsive_image/js/responsive_image.ajax.js. */
(function(Drupal) {
    Drupal.behaviors.responsiveImageAJAX = {
        attach: function attach() {
            if (window.picturefill) window.picturefill()
        }
    }
})(Drupal)
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/core/modules/responsive_image/js/responsive_image.ajax.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/core/misc/ajax.js. */
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen)
}

function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter)
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr)
}

function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2
};
(function($, window, Drupal, drupalSettings, loadjs, _ref) {
    var isFocusable = _ref.isFocusable,
        tabbable = _ref.tabbable;
    Drupal.behaviors.AJAX = {
        attach: function attach(context, settings) {
            function loadAjaxBehavior(base) {
                var elementSettings = settings.ajax[base];
                if (typeof elementSettings.selector === 'undefined') elementSettings.selector = "#".concat(base);
                once('drupal-ajax', $(elementSettings.selector)).forEach(function(el) {
                    elementSettings.element = el;
                    elementSettings.base = base;
                    Drupal.ajax(elementSettings)
                })
            };
            Object.keys(settings.ajax || {}).forEach(function(base) {
                return loadAjaxBehavior(base)
            });
            Drupal.ajax.bindAjaxLinks(document.body);
            once('ajax', '.use-ajax-submit').forEach(function(el) {
                var elementSettings = {};
                elementSettings.url = $(el.form).attr('action');
                elementSettings.setClick = true;
                elementSettings.event = 'click';
                elementSettings.progress = {
                    type: 'throbber'
                };
                elementSettings.base = el.id;
                elementSettings.element = el;
                Drupal.ajax(elementSettings)
            })
        },
        detach: function detach(context, settings, trigger) {
            if (trigger === 'unload') Drupal.ajax.expired().forEach(function(instance) {
                Drupal.ajax.instances[instance.instanceIndex] = null
            })
        }
    };
    Drupal.AjaxError = function(xmlhttp, uri, customMessage) {
        var statusCode, statusText, responseText;
        if (xmlhttp.status) {
            statusCode = "\n".concat(Drupal.t('An AJAX HTTP error occurred.'), "\n").concat(Drupal.t('HTTP Result Code: !status', {
                '!status': xmlhttp.status
            }))
        } else statusCode = "\n".concat(Drupal.t('An AJAX HTTP request terminated abnormally.'));
        statusCode += "\n".concat(Drupal.t('Debugging information follows.'));
        var pathText = "\n".concat(Drupal.t('Path: !uri', {
            '!uri': uri
        }));
        statusText = '';
        try {
            statusText = "\n".concat(Drupal.t('StatusText: !statusText', {
                '!statusText': xmlhttp.statusText.trim()
            }))
        } catch (e) {};
        responseText = '';
        try {
            responseText = "\n".concat(Drupal.t('ResponseText: !responseText', {
                '!responseText': xmlhttp.responseText.trim()
            }))
        } catch (e) {};
        responseText = responseText.replace(/<("[^"]*"|'[^']*'|[^'">])*>/gi, '');
        responseText = responseText.replace(/[\n]+\s+/g, '\n');
        var readyStateText = xmlhttp.status === 0 ? "\n".concat(Drupal.t('ReadyState: !readyState', {
            '!readyState': xmlhttp.readyState
        })) : '';
        customMessage = customMessage ? "\n".concat(Drupal.t('CustomMessage: !customMessage', {
            '!customMessage': customMessage
        })) : '';
        this.message = statusCode + pathText + statusText + customMessage + responseText + readyStateText;
        this.name = 'AjaxError'
    };
    Drupal.AjaxError.prototype = new Error();
    Drupal.AjaxError.prototype.constructor = Drupal.AjaxError;
    Drupal.ajax = function(settings) {
        if (arguments.length !== 1) throw new Error('Drupal.ajax() function must be called with one configuration object only');
        var base = settings.base || false,
            element = settings.element || false;
        delete settings.base;
        delete settings.element;
        if (!settings.progress && !element) settings.progress = false;
        var ajax = new Drupal.Ajax(base, element, settings);
        ajax.instanceIndex = Drupal.ajax.instances.length;
        Drupal.ajax.instances.push(ajax);
        return ajax
    };
    Drupal.ajax.instances = [];
    Drupal.ajax.expired = function() {
        return Drupal.ajax.instances.filter(function(instance) {
            return instance && instance.element !== false && !document.body.contains(instance.element)
        })
    };
    Drupal.ajax.bindAjaxLinks = function(element) {
        once('ajax', '.use-ajax', element).forEach(function(ajaxLink) {
            var $linkElement = $(ajaxLink),
                elementSettings = {
                    progress: {
                        type: 'throbber'
                    },
                    dialogType: $linkElement.data('dialog-type'),
                    dialog: $linkElement.data('dialog-options'),
                    dialogRenderer: $linkElement.data('dialog-renderer'),
                    base: $linkElement.attr('id'),
                    element: ajaxLink
                },
                href = $linkElement.attr('href');
            if (href) {
                elementSettings.url = href;
                elementSettings.event = 'click'
            };
            Drupal.ajax(elementSettings)
        })
    };
    Drupal.Ajax = function(base, element, elementSettings) {
        var defaults = {
            event: element ? 'mousedown' : null,
            keypress: true,
            selector: base ? "#".concat(base) : null,
            effect: 'none',
            speed: 'none',
            method: 'replaceWith',
            progress: {
                type: 'throbber',
                message: Drupal.t('Please wait...')
            },
            submit: {
                js: true
            }
        };
        $.extend(this, defaults, elementSettings);
        this.commands = new Drupal.AjaxCommands();
        this.instanceIndex = false;
        if (this.wrapper) this.wrapper = "#".concat(this.wrapper);
        this.element = element;
        this.element_settings = elementSettings;
        this.elementSettings = elementSettings;
        if (this.element && this.element.form) this.$form = $(this.element.form);
        if (!this.url) {
            var $element = $(this.element);
            if ($element.is('a')) {
                this.url = $element.attr('href')
            } else if (this.element && element.form) this.url = this.$form.attr('action')
        };
        var originalUrl = this.url;
        this.url = this.url.replace(/\/nojs(\/|$|\?|#)/, '/ajax$1');
        if (drupalSettings.ajaxTrustedUrl[originalUrl]) drupalSettings.ajaxTrustedUrl[this.url] = true;
        var ajax = this;
        ajax.options = {
            url: ajax.url,
            data: ajax.submit,
            isInProgress: function isInProgress() {
                return ajax.ajaxing
            },
            beforeSerialize: function beforeSerialize(elementSettings, options) {
                return ajax.beforeSerialize(elementSettings, options)
            },
            beforeSubmit: function beforeSubmit(formValues, elementSettings, options) {
                ajax.ajaxing = true;
                return ajax.beforeSubmit(formValues, elementSettings, options)
            },
            beforeSend: function beforeSend(xmlhttprequest, options) {
                ajax.ajaxing = true;
                return ajax.beforeSend(xmlhttprequest, options)
            },
            success: function success(response, status, xmlhttprequest) {
                var _this = this;
                if (typeof response === 'string') response = $.parseJSON(response);
                if (response !== null && !drupalSettings.ajaxTrustedUrl[ajax.url])
                    if (xmlhttprequest.getResponseHeader('X-Drupal-Ajax-Token') !== '1') {
                        var customMessage = Drupal.t('The response failed verification so will not be processed.');
                        return ajax.error(xmlhttprequest, ajax.url, customMessage)
                    };
                return Promise.resolve(ajax.success(response, status)).then(function() {
                    ajax.ajaxing = false;
                    $(document).trigger('ajaxSuccess', [xmlhttprequest, _this]);
                    $(document).trigger('ajaxComplete', [xmlhttprequest, _this]);
                    if (--$.active === 0) $(document).trigger('ajaxStop')
                })
            },
            error: function error(xmlhttprequest, status, _error) {
                ajax.ajaxing = false
            },
            complete: function complete(xmlhttprequest, status) {
                if (status === 'error' || status === 'parsererror') return ajax.error(xmlhttprequest, ajax.url)
            },
            dataType: 'json',
            jsonp: false,
            type: 'POST'
        };
        if (elementSettings.dialog) ajax.options.data.dialogOptions = elementSettings.dialog;
        if (ajax.options.url.indexOf('?') === -1) {
            ajax.options.url += '?'
        } else ajax.options.url += '&';
        var wrapper = "drupal_".concat(elementSettings.dialogType || 'ajax');
        if (elementSettings.dialogRenderer) wrapper += ".".concat(elementSettings.dialogRenderer);
        ajax.options.url += "".concat(Drupal.ajax.WRAPPER_FORMAT, "=").concat(wrapper);
        $(ajax.element).on(elementSettings.event, function(event) {
            if (!drupalSettings.ajaxTrustedUrl[ajax.url] && !Drupal.url.isLocal(ajax.url)) throw new Error(Drupal.t('The callback URL is not local and not trusted: !url', {
                '!url': ajax.url
            }));
            return ajax.eventResponse(this, event)
        });
        if (elementSettings.keypress) $(ajax.element).on('keypress', function(event) {
            return ajax.keypressResponse(this, event)
        });
        if (elementSettings.prevent) $(ajax.element).on(elementSettings.prevent, false)
    };
    Drupal.ajax.WRAPPER_FORMAT = '_wrapper_format';
    Drupal.Ajax.AJAX_REQUEST_PARAMETER = '_drupal_ajax';
    Drupal.Ajax.prototype.execute = function() {
        if (this.ajaxing) return;
        try {
            this.beforeSerialize(this.element, this.options);
            return $.ajax(this.options)
        } catch (e) {
            this.ajaxing = false;
            window.alert("An error occurred while attempting to process ".concat(this.options.url, ": ").concat(e.message));
            return $.Deferred().reject()
        }
    };
    Drupal.Ajax.prototype.keypressResponse = function(element, event) {
        var ajax = this;
        if (event.which === 13 || event.which === 32 && element.type !== 'text' && element.type !== 'textarea' && element.type !== 'tel' && element.type !== 'number') {
            event.preventDefault();
            event.stopPropagation();
            $(element).trigger(ajax.elementSettings.event)
        }
    };
    Drupal.Ajax.prototype.eventResponse = function(element, event) {
        event.preventDefault();
        event.stopPropagation();
        var ajax = this;
        if (ajax.ajaxing) return;
        try {
            if (ajax.$form) {
                if (ajax.setClick) element.form.clk = element;
                ajax.$form.ajaxSubmit(ajax.options)
            } else {
                ajax.beforeSerialize(ajax.element, ajax.options);
                $.ajax(ajax.options)
            }
        } catch (e) {
            ajax.ajaxing = false;
            window.alert("An error occurred while attempting to process ".concat(ajax.options.url, ": ").concat(e.message))
        }
    };
    Drupal.Ajax.prototype.beforeSerialize = function(element, options) {
        if (this.$form && document.body.contains(this.$form.get(0))) {
            var settings = this.settings || drupalSettings;
            Drupal.detachBehaviors(this.$form.get(0), settings, 'serialize')
        };
        options.data[Drupal.Ajax.AJAX_REQUEST_PARAMETER] = 1;
        var pageState = drupalSettings.ajaxPageState;
        options.data['ajax_page_state[theme]'] = pageState.theme;
        options.data['ajax_page_state[theme_token]'] = pageState.theme_token;
        options.data['ajax_page_state[libraries]'] = pageState.libraries
    };
    Drupal.Ajax.prototype.beforeSubmit = function(formValues, element, options) {};
    Drupal.Ajax.prototype.beforeSend = function(xmlhttprequest, options) {
        if (this.$form) {
            options.extraData = options.extraData || {};
            options.extraData.ajax_iframe_upload = '1';
            var v = $.fieldValue(this.element);
            if (v !== null) options.extraData[this.element.name] = v
        };
        $(this.element).prop('disabled', true);
        if (!this.progress || !this.progress.type) return;
        var progressIndicatorMethod = "setProgressIndicator".concat(this.progress.type.slice(0, 1).toUpperCase()).concat(this.progress.type.slice(1).toLowerCase());
        if (progressIndicatorMethod in this && typeof this[progressIndicatorMethod] === 'function') this[progressIndicatorMethod].call(this)
    };
    Drupal.theme.ajaxProgressThrobber = function(message) {
        var messageMarkup = typeof message === 'string' ? Drupal.theme('ajaxProgressMessage', message) : '',
            throbber = '<div class="throbber">&nbsp;</div>';
        return "<div class=\"ajax-progress ajax-progress-throbber\">".concat(throbber).concat(messageMarkup, "</div>")
    };
    Drupal.theme.ajaxProgressIndicatorFullscreen = function() {
        return '<div class="ajax-progress ajax-progress-fullscreen">&nbsp;</div>'
    };
    Drupal.theme.ajaxProgressMessage = function(message) {
        return "<div class=\"message\">".concat(message, "</div>")
    };
    Drupal.theme.ajaxProgressBar = function($element) {
        return $('<div class="ajax-progress ajax-progress-bar"></div>').append($element)
    };
    Drupal.Ajax.prototype.setProgressIndicatorBar = function() {
        var progressBar = new Drupal.ProgressBar("ajax-progress-".concat(this.element.id), $.noop, this.progress.method, $.noop);
        if (this.progress.message) progressBar.setProgress(-1, this.progress.message);
        if (this.progress.url) progressBar.startMonitoring(this.progress.url, this.progress.interval || 1500);
        this.progress.element = $(Drupal.theme('ajaxProgressBar', progressBar.element));
        this.progress.object = progressBar;
        $(this.element).after(this.progress.element)
    };
    Drupal.Ajax.prototype.setProgressIndicatorThrobber = function() {
        this.progress.element = $(Drupal.theme('ajaxProgressThrobber', this.progress.message));
        $(this.element).after(this.progress.element)
    };
    Drupal.Ajax.prototype.setProgressIndicatorFullscreen = function() {
        this.progress.element = $(Drupal.theme('ajaxProgressIndicatorFullscreen'));
        $('body').append(this.progress.element)
    };
    Drupal.Ajax.prototype.commandExecutionQueue = function(response, status) {
        var _this2 = this,
            ajaxCommands = this.commands;
        return Object.keys(response || {}).reduce(function(executionQueue, key) {
            return executionQueue.then(function() {
                var command = response[key].command;
                if (command && ajaxCommands[command]) return ajaxCommands[command](_this2, response[key], status)
            })
        }, Promise.resolve())
    };
    Drupal.Ajax.prototype.success = function(response, status) {
        var _this3 = this;
        if (this.progress.element) $(this.progress.element).remove();
        if (this.progress.object) this.progress.object.stopMonitoring();
        $(this.element).prop('disabled', false);
        var elementParents = $(this.element).parents('[data-drupal-selector]').addBack().toArray(),
            focusChanged = Object.keys(response || {}).some(function(key) {
                var _response$key = response[key],
                    command = _response$key.command,
                    method = _response$key.method;
                return command === 'focusFirst' || command === 'invoke' && method === 'focus'
            });
        return this.commandExecutionQueue(response, status).then(function() {
            if (!focusChanged && _this3.element && !$(_this3.element).data('disable-refocus')) {
                var target = false;
                for (var n = elementParents.length - 1; !target && n >= 0; n--) target = document.querySelector("[data-drupal-selector=\"".concat(elementParents[n].getAttribute('data-drupal-selector'), "\"]"));
                if (target) $(target).trigger('focus')
            };
            if (_this3.$form && document.body.contains(_this3.$form.get(0))) {
                var settings = _this3.settings || drupalSettings;
                Drupal.attachBehaviors(_this3.$form.get(0), settings)
            };
            _this3.settings = null
        }).catch(function(error) {
            return console.error(Drupal.t('An error occurred during the execution of the Ajax response: !error', {
                '!error': error
            }))
        })
    };
    Drupal.Ajax.prototype.getEffect = function(response) {
        var type = response.effect || this.effect,
            speed = response.speed || this.speed,
            effect = {};
        if (type === 'none') {
            effect.showEffect = 'show';
            effect.hideEffect = 'hide';
            effect.showSpeed = ''
        } else if (type === 'fade') {
            effect.showEffect = 'fadeIn';
            effect.hideEffect = 'fadeOut';
            effect.showSpeed = speed
        } else {
            effect.showEffect = "".concat(type, "Toggle");
            effect.hideEffect = "".concat(type, "Toggle");
            effect.showSpeed = speed
        };
        return effect
    };
    Drupal.Ajax.prototype.error = function(xmlhttprequest, uri, customMessage) {
        if (this.progress.element) $(this.progress.element).remove();
        if (this.progress.object) this.progress.object.stopMonitoring();
        $(this.wrapper).show();
        $(this.element).prop('disabled', false);
        if (this.$form && document.body.contains(this.$form.get(0))) {
            var settings = this.settings || drupalSettings;
            Drupal.attachBehaviors(this.$form.get(0), settings)
        };
        throw new Drupal.AjaxError(xmlhttprequest, uri, customMessage)
    };
    Drupal.theme.ajaxWrapperNewContent = function($newContent, ajax, response) {
        return (response.effect || ajax.effect) !== 'none' && $newContent.filter(function(i) {
            return !($newContent[i].nodeName === '#comment' || $newContent[i].nodeName === '#text' && /^(\s|\n|\r)*$/.test($newContent[i].textContent))
        }).length > 1 ? Drupal.theme('ajaxWrapperMultipleRootElements', $newContent) : $newContent
    };
    Drupal.theme.ajaxWrapperMultipleRootElements = function($elements) {
        return $('<div></div>').append($elements)
    };
    Drupal.AjaxCommands = function() {};
    Drupal.AjaxCommands.prototype = {
        insert: function insert(ajax, response) {
            var $wrapper = response.selector ? $(response.selector) : $(ajax.wrapper),
                method = response.method || ajax.method,
                effect = ajax.getEffect(response),
                settings = response.settings || ajax.settings || drupalSettings,
                $newContent = $($.parseHTML(response.data, document, true));
            $newContent = Drupal.theme('ajaxWrapperNewContent', $newContent, ajax, response);
            switch (method) {
                case 'html':
                case 'replaceWith':
                case 'replaceAll':
                case 'empty':
                case 'remove':
                    Drupal.detachBehaviors($wrapper.get(0), settings);
                    break;
                default:
                    break
            };
            $wrapper[method]($newContent);
            if (effect.showEffect !== 'show') $newContent.hide();
            var $ajaxNewContent = $newContent.find('.ajax-new-content');
            if ($ajaxNewContent.length) {
                $ajaxNewContent.hide();
                $newContent.show();
                $ajaxNewContent[effect.showEffect](effect.showSpeed)
            } else if (effect.showEffect !== 'show') $newContent[effect.showEffect](effect.showSpeed);
            if ($newContent.parents('html').length) $newContent.each(function(index, element) {
                if (element.nodeType === Node.ELEMENT_NODE) Drupal.attachBehaviors(element, settings)
            })
        },
        remove: function remove(ajax, response, status) {
            var settings = response.settings || ajax.settings || drupalSettings;
            $(response.selector).each(function() {
                Drupal.detachBehaviors(this, settings)
            }).remove()
        },
        changed: function changed(ajax, response, status) {
            var $element = $(response.selector);
            if (!$element.hasClass('ajax-changed')) {
                $element.addClass('ajax-changed');
                if (response.asterisk) $element.find(response.asterisk).append(" <abbr class=\"ajax-changed\" title=\"".concat(Drupal.t('Changed'), "\">*</abbr> "))
            }
        },
        alert: function alert(ajax, response, status) {
            window.alert(response.text)
        },
        announce: function announce(ajax, response) {
            if (response.priority) {
                Drupal.announce(response.text, response.priority)
            } else Drupal.announce(response.text)
        },
        redirect: function redirect(ajax, response, status) {
            window.location = response.url
        },
        css: function css(ajax, response, status) {
            $(response.selector).css(response.argument)
        },
        settings: function settings(ajax, response, status) {
            var ajaxSettings = drupalSettings.ajax;
            if (ajaxSettings) Drupal.ajax.expired().forEach(function(instance) {
                if (instance.selector) {
                    var selector = instance.selector.replace('#', '');
                    if (selector in ajaxSettings) delete ajaxSettings[selector]
                }
            });
            if (response.merge) {
                $.extend(true, drupalSettings, response.settings)
            } else ajax.settings = response.settings
        },
        data: function data(ajax, response, status) {
            $(response.selector).data(response.name, response.value)
        },
        focusFirst: function focusFirst(ajax, response, status) {
            var focusChanged = false,
                container = document.querySelector(response.selector);
            if (container) {
                var tabbableElements = tabbable(container);
                if (tabbableElements.length) {
                    tabbableElements[0].focus();
                    focusChanged = true
                } else if (isFocusable(container)) {
                    container.focus();
                    focusChanged = true
                }
            };
            if (ajax.hasOwnProperty('element') && !focusChanged) ajax.element.focus()
        },
        invoke: function invoke(ajax, response, status) {
            var $element = $(response.selector);
            $element[response.method].apply($element, _toConsumableArray(response.args))
        },
        restripe: function restripe(ajax, response, status) {
            $(response.selector).find('> tbody > tr:visible, > tr:visible').removeClass('odd even').filter(':even').addClass('odd').end().filter(':odd').addClass('even')
        },
        update_build_id: function update_build_id(ajax, response, status) {
            document.querySelectorAll("input[name=\"form_build_id\"][value=\"".concat(response.old, "\"]")).forEach(function(item) {
                item.value = response.new
            })
        },
        add_css: function add_css(ajax, response, status) {
            $('head').prepend(response.data)
        },
        message: function message(ajax, response) {
            var messages = new Drupal.Message(document.querySelector(response.messageWrapperQuerySelector));
            if (response.clearPrevious) messages.clear();
            messages.add(response.message, response.messageOptions)
        },
        add_js: function add_js(ajax, response, status) {
            var parentEl = document.querySelector(response.selector || 'body'),
                settings = ajax.settings || drupalSettings,
                allUniqueBundleIds = response.data.map(function(script) {
                    var uniqueBundleId = script.src + ajax.instanceIndex;
                    loadjs(script.src, uniqueBundleId, {
                        async: false,
                        before: function before(path, scriptEl) {
                            Object.keys(script).forEach(function(attributeKey) {
                                scriptEl.setAttribute(attributeKey, script[attributeKey])
                            });
                            parentEl.appendChild(scriptEl);
                            return false
                        }
                    });
                    return uniqueBundleId
                });
            return new Promise(function(resolve, reject) {
                loadjs.ready(allUniqueBundleIds, {
                    success: function success() {
                        Drupal.attachBehaviors(parentEl, settings);
                        resolve()
                    },
                    error: function error(depsNotFound) {
                        var message = Drupal.t("The following files could not be loaded: @dependencies", {
                            '@dependencies': depsNotFound.join(', ')
                        });
                        reject(message)
                    }
                })
            })
        }
    };
    var stopEvent = function stopEvent(xhr, settings) {
        return xhr.getResponseHeader('X-Drupal-Ajax-Token') === '1' && settings.isInProgress && settings.isInProgress()
    };
    $.extend(true, $.event.special, {
        ajaxSuccess: {
            trigger: function trigger(event, xhr, settings) {
                if (stopEvent(xhr, settings)) return false
            }
        },
        ajaxComplete: {
            trigger: function trigger(event, xhr, settings) {
                if (stopEvent(xhr, settings)) {
                    $.active++;
                    return false
                }
            }
        }
    })
})(jQuery, window, Drupal, drupalSettings, loadjs, window.tabbable)
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/core/misc/ajax.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/core/themes/stable/js/ajax.js. */
(function(Drupal) {
    Drupal.theme.ajaxProgressBar = function($element) {
        return $element.addClass('ajax-progress ajax-progress-bar')
    }
})(Drupal)
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/core/themes/stable/js/ajax.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/core/misc/jquery.tabbable.shim.js. */
(function($, Drupal, _ref) {
    var isTabbable = _ref.isTabbable;
    $.extend($.expr[':'], {
        tabbable: function tabbable(element) {
            Drupal.deprecationError({
                message: 'The :tabbable selector is deprecated in Drupal 9.2.0 and will be removed in Drupal 11.0.0. Use the core/tabbable library instead. See https://www.drupal.org/node/3183730'
            });
            if (element.tagName === 'SUMMARY' || element.tagName === 'DETAILS') {
                var tabIndex = element.getAttribute('tabIndex');
                if (tabIndex === null || tabIndex < 0) return false
            };
            return isTabbable(element)
        }
    })
})(jQuery, Drupal, window.tabbable)
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/core/misc/jquery.tabbable.shim.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/core/misc/position.js. */
(function($) {
    var cachedScrollbarWidth = null,
        max = Math.max,
        abs = Math.abs,
        regexHorizontal = /left|center|right/,
        regexVertical = /top|center|bottom/,
        regexOffset = /[+-]\d+(\.[\d]+)?%?/,
        regexPosition = /^\w+/,
        regexPercent = /%$/,
        _position = $.fn.position

    function getOffsets(offsets, width, height) {
        return [parseFloat(offsets[0]) * (regexPercent.test(offsets[0]) ? width / 100 : 1), parseFloat(offsets[1]) * (regexPercent.test(offsets[1]) ? height / 100 : 1)]
    }

    function parseCss(element, property) {
        return parseInt($.css(element, property), 10) || 0
    }

    function getDimensions(elem) {
        var raw = elem[0];
        if (raw.nodeType === 9) return {
            width: elem.width(),
            height: elem.height(),
            offset: {
                top: 0,
                left: 0
            }
        };
        if ($.isWindow(raw)) return {
            width: elem.width(),
            height: elem.height(),
            offset: {
                top: elem.scrollTop(),
                left: elem.scrollLeft()
            }
        };
        if (raw.preventDefault) return {
            width: 0,
            height: 0,
            offset: {
                top: raw.pageY,
                left: raw.pageX
            }
        };
        return {
            width: elem.outerWidth(),
            height: elem.outerHeight(),
            offset: elem.offset()
        }
    };
    var collisions = {
        fit: {
            left: function left(position, data) {
                var within = data.within,
                    withinOffset = within.isWindow ? within.scrollLeft : within.offset.left,
                    outerWidth = within.width,
                    collisionPosLeft = position.left - data.collisionPosition.marginLeft,
                    overLeft = withinOffset - collisionPosLeft,
                    overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset,
                    newOverRight;
                if (data.collisionWidth > outerWidth) {
                    if (overLeft > 0 && overRight <= 0) {
                        newOverRight = position.left + overLeft + data.collisionWidth - outerWidth - withinOffset;
                        position.left += overLeft - newOverRight
                    } else if (overRight > 0 && overLeft <= 0) {
                        position.left = withinOffset
                    } else if (overLeft > overRight) {
                        position.left = withinOffset + outerWidth - data.collisionWidth
                    } else position.left = withinOffset
                } else if (overLeft > 0) {
                    position.left += overLeft
                } else if (overRight > 0) {
                    position.left -= overRight
                } else position.left = max(position.left - collisionPosLeft, position.left)
            },
            top: function top(position, data) {
                var within = data.within,
                    withinOffset = within.isWindow ? within.scrollTop : within.offset.top,
                    outerHeight = data.within.height,
                    collisionPosTop = position.top - data.collisionPosition.marginTop,
                    overTop = withinOffset - collisionPosTop,
                    overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset,
                    newOverBottom;
                if (data.collisionHeight > outerHeight) {
                    if (overTop > 0 && overBottom <= 0) {
                        newOverBottom = position.top + overTop + data.collisionHeight - outerHeight - withinOffset;
                        position.top += overTop - newOverBottom
                    } else if (overBottom > 0 && overTop <= 0) {
                        position.top = withinOffset
                    } else if (overTop > overBottom) {
                        position.top = withinOffset + outerHeight - data.collisionHeight
                    } else position.top = withinOffset
                } else if (overTop > 0) {
                    position.top += overTop
                } else if (overBottom > 0) {
                    position.top -= overBottom
                } else position.top = max(position.top - collisionPosTop, position.top)
            }
        },
        flip: {
            left: function left(position, data) {
                var within = data.within,
                    withinOffset = within.offset.left + within.scrollLeft,
                    outerWidth = within.width,
                    offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left,
                    collisionPosLeft = position.left - data.collisionPosition.marginLeft,
                    overLeft = collisionPosLeft - offsetLeft,
                    overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,
                    myOffset = data.my[0] === 'left' ? -data.elemWidth : data.my[0] === 'right' ? data.elemWidth : 0,
                    atOffset = data.at[0] === 'left' ? data.targetWidth : data.at[0] === 'right' ? -data.targetWidth : 0,
                    offset = -2 * data.offset[0],
                    newOverRight, newOverLeft;
                if (overLeft < 0) {
                    newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth - outerWidth - withinOffset;
                    if (newOverRight < 0 || newOverRight < abs(overLeft)) position.left += myOffset + atOffset + offset
                } else if (overRight > 0) {
                    newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset + atOffset + offset - offsetLeft;
                    if (newOverLeft > 0 || abs(newOverLeft) < overRight) position.left += myOffset + atOffset + offset
                }
            },
            top: function top(position, data) {
                var within = data.within,
                    withinOffset = within.offset.top + within.scrollTop,
                    outerHeight = within.height,
                    offsetTop = within.isWindow ? within.scrollTop : within.offset.top,
                    collisionPosTop = position.top - data.collisionPosition.marginTop,
                    overTop = collisionPosTop - offsetTop,
                    overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop,
                    top = data.my[1] === 'top',
                    myOffset = top ? -data.elemHeight : data.my[1] === 'bottom' ? data.elemHeight : 0,
                    atOffset = data.at[1] === 'top' ? data.targetHeight : data.at[1] === 'bottom' ? -data.targetHeight : 0,
                    offset = -2 * data.offset[1],
                    newOverTop, newOverBottom;
                if (overTop < 0) {
                    newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight - outerHeight - withinOffset;
                    if (newOverBottom < 0 || newOverBottom < abs(overTop)) position.top += myOffset + atOffset + offset
                } else if (overBottom > 0) {
                    newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset + offset - offsetTop;
                    if (newOverTop > 0 || abs(newOverTop) < overBottom) position.top += myOffset + atOffset + offset
                }
            }
        },
        flipfit: {
            left: function left() {
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                collisions.flip.left.apply(this, args);
                collisions.fit.left.apply(this, args)
            },
            top: function top() {
                for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
                collisions.flip.top.apply(this, args);
                collisions.fit.top.apply(this, args)
            }
        }
    };
    $.position = {
        scrollbarWidth: function scrollbarWidth() {
            if (cachedScrollbarWidth !== undefined) return cachedScrollbarWidth;
            var div = $('<div ' + "style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                innerDiv = div.children()[0];
            $('body').append(div);
            var w1 = innerDiv.offsetWidth;
            div.css('overflow', 'scroll');
            var w2 = innerDiv.offsetWidth;
            if (w1 === w2) w2 = div[0].clientWidth;
            div.remove();
            cachedScrollbarWidth = w1 - w2;
            return cachedScrollbarWidth
        },
        getScrollInfo: function getScrollInfo(within) {
            var overflowX = within.isWindow || within.isDocument ? '' : within.element.css('overflow-x'),
                overflowY = within.isWindow || within.isDocument ? '' : within.element.css('overflow-y'),
                hasOverflowX = overflowX === 'scroll' || overflowX === 'auto' && within.width < within.element[0].scrollWidth,
                hasOverflowY = overflowY === 'scroll' || overflowY === 'auto' && within.height < within.element[0].scrollHeight;
            return {
                width: hasOverflowY ? $.position.scrollbarWidth() : 0,
                height: hasOverflowX ? $.position.scrollbarWidth() : 0
            }
        },
        getWithinInfo: function getWithinInfo(element) {
            var withinElement = $(element || window),
                isWindow = $.isWindow(withinElement[0]),
                isDocument = !!withinElement[0] && withinElement[0].nodeType === 9,
                hasOffset = !isWindow && !isDocument;
            return {
                element: withinElement,
                isWindow: isWindow,
                isDocument: isDocument,
                offset: hasOffset ? $(element).offset() : {
                    left: 0,
                    top: 0
                },
                scrollLeft: withinElement.scrollLeft(),
                scrollTop: withinElement.scrollTop(),
                width: withinElement.outerWidth(),
                height: withinElement.outerHeight()
            }
        }
    };
    $.fn.position = function(options) {
        if (!options || !options.of) return _position.apply(this, arguments);
        options = $.extend({}, options);
        var within = $.position.getWithinInfo(options.within),
            scrollInfo = $.position.getScrollInfo(within),
            collision = (options.collision || 'flip').split(' '),
            offsets = {},
            target = typeof options.of === 'string' ? $(document).find(options.of) : $(options.of),
            dimensions = getDimensions(target),
            targetWidth = dimensions.width,
            targetHeight = dimensions.height,
            targetOffset = dimensions.offset;
        if (target[0].preventDefault) options.at = 'left top';
        var basePosition = $.extend({}, targetOffset);
        $.each(['my', 'at'], function() {
            var pos = (options[this] || '').split(' ');
            if (pos.length === 1) pos = regexHorizontal.test(pos[0]) ? pos.concat(['center']) : regexVertical.test(pos[0]) ? ['center'].concat(pos) : ['center', 'center'];
            pos[0] = regexHorizontal.test(pos[0]) ? pos[0] : 'center';
            pos[1] = regexVertical.test(pos[1]) ? pos[1] : 'center';
            var horizontalOffset = regexOffset.exec(pos[0]),
                verticalOffset = regexOffset.exec(pos[1]);
            offsets[this] = [horizontalOffset ? horizontalOffset[0] : 0, verticalOffset ? verticalOffset[0] : 0];
            options[this] = [regexPosition.exec(pos[0])[0], regexPosition.exec(pos[1])[0]]
        });
        if (collision.length === 1) collision[1] = collision[0];
        if (options.at[0] === 'right') {
            basePosition.left += targetWidth
        } else if (options.at[0] === 'center') basePosition.left += targetWidth / 2;
        if (options.at[1] === 'bottom') {
            basePosition.top += targetHeight
        } else if (options.at[1] === 'center') basePosition.top += targetHeight / 2;
        var atOffset = getOffsets(offsets.at, targetWidth, targetHeight);
        basePosition.left += atOffset[0];
        basePosition.top += atOffset[1];
        return this.each(function() {
            var using, elem = $(this),
                elemWidth = elem.outerWidth(),
                elemHeight = elem.outerHeight(),
                marginLeft = parseCss(this, 'marginLeft'),
                marginTop = parseCss(this, 'marginTop'),
                collisionWidth = elemWidth + marginLeft + parseCss(this, 'marginRight') + scrollInfo.width,
                collisionHeight = elemHeight + marginTop + parseCss(this, 'marginBottom') + scrollInfo.height,
                position = $.extend({}, basePosition),
                myOffset = getOffsets(offsets.my, elem.outerWidth(), elem.outerHeight());
            if (options.my[0] === 'right') {
                position.left -= elemWidth
            } else if (options.my[0] === 'center') position.left -= elemWidth / 2;
            if (options.my[1] === 'bottom') {
                position.top -= elemHeight
            } else if (options.my[1] === 'center') position.top -= elemHeight / 2;
            position.left += myOffset[0];
            position.top += myOffset[1];
            var collisionPosition = {
                marginLeft: marginLeft,
                marginTop: marginTop
            };
            $.each(['left', 'top'], function(i, dir) {
                if (collisions[collision[i]]) collisions[collision[i]][dir](position, {
                    targetWidth: targetWidth,
                    targetHeight: targetHeight,
                    elemWidth: elemWidth,
                    elemHeight: elemHeight,
                    collisionPosition: collisionPosition,
                    collisionWidth: collisionWidth,
                    collisionHeight: collisionHeight,
                    offset: [atOffset[0] + myOffset[0], atOffset[1] + myOffset[1]],
                    my: options.my,
                    at: options.at,
                    within: within,
                    elem: elem
                })
            });
            if (options.using) using = function using(props) {
                var left = targetOffset.left - position.left,
                    right = left + targetWidth - elemWidth,
                    top = targetOffset.top - position.top,
                    bottom = top + targetHeight - elemHeight,
                    feedback = {
                        target: {
                            element: target,
                            left: targetOffset.left,
                            top: targetOffset.top,
                            width: targetWidth,
                            height: targetHeight
                        },
                        element: {
                            element: elem,
                            left: position.left,
                            top: position.top,
                            width: elemWidth,
                            height: elemHeight
                        },
                        horizontal: right < 0 ? 'left' : left > 0 ? 'right' : 'center',
                        vertical: bottom < 0 ? 'top' : top > 0 ? 'bottom' : 'middle'
                    };
                if (targetWidth < elemWidth && abs(left + right) < targetWidth) feedback.horizontal = 'center';
                if (targetHeight < elemHeight && abs(top + bottom) < targetHeight) feedback.vertical = 'middle';
                if (max(abs(left), abs(right)) > max(abs(top), abs(bottom))) {
                    feedback.important = 'horizontal'
                } else feedback.important = 'vertical';
                options.using.call(this, props, feedback)
            };
            elem.offset($.extend(position, {
                using: using
            }))
        })
    };
    if (!$.hasOwnProperty('ui')) $.ui = {};
    $.ui.position = collisions
})(jQuery)
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/core/misc/position.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/modules/custom/fortis_international/js/international.js. */
(function($, Drupal) {
    "use strict";
    Drupal.behaviors.international = {
        attach: function(context, settings) {
            $("#int-faq-autocomplete-form").keypress(function(e) {
                var url = "",
                    code = e.keyCode ? e.keyCode : e.which;
                if (code.toString() == 13) {
                    var url = $(".auto-value").attr("href");
                    if (!url) {
                        if (!$("#edit-faq-search-box + .err-result").length) $("#edit-faq-search-box").after('<p class="err-result"> No result found.</p>');
                        $("#edit-faq-search-box").css("border-color", "red");
                        jQuery('.err-result').show()
                    } else {
                        $("#edit-faq-search-box").css("border-color", "");
                        var base_url = window.location.origin;
                        window.location = base_url + $(".auto-value").attr("href");
                        var acc_id = $(".auto-value").attr("href").split("#")[1];
                        jQuery(".faq-sec #" + acc_id).addClass("active")
                    };
                    return false
                }
            });
            jQuery("#int-faq-autocomplete-form").keydown(function() {
                jQuery("#edit-faq-search-box").css("border-color", "");
                jQuery(".err-result").hide()
            });
            if (jQuery(".patient-section-international").length) jQuery(".patient-slider").not('.slick-initialized').slick({
                infinite: true,
                speed: 800,
                slidesToShow: 1,
                slidesToScroll: 1,
                variableWidth: true,
                responsive: [{
                    breakpoint: 767,
                    settings: "unslick"
                }]
            });
            if (jQuery(".international-header").length)
                if ($(window).width() < 1199) {
                    jQuery(".int-top-header .int-top-menu-list > li").appendTo('.int-main-header .int-main-menu-list');
                    $(".international-main-header").on("click", function(event) {
                        $('.international-header').toggleClass('z-index');
                        $(this).toggleClass('active');
                        $('body').toggleClass('overflow-hidden')
                    });
                    jQuery('<li class="language-menu-mobile"></li>').appendTo('.int-main-header .int-main-menu-list');
                    jQuery('.international-select-language').appendTo('.language-menu-mobile');
                    $(".international-select-language").on("click", function(event) {
                        event.stopPropagation()
                    })
                };
            jQuery('#views-exposed-form-hospital-listing-block-2 > fieldset').contents().unwrap().wrap('<div/>');
            if (jQuery("#views-exposed-form-hospital-listing-block-2").length) jQuery("#views-exposed-form-hospital-listing-block-2 .form-radios").not('.slick-initialized').slick({
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
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 767,
                    settings: "unslick"
                }]
            });
            jQuery.fn.getEstimateSuccessCallback = function() {
                var successMessage = jQuery.isEmptyObject(drupalSettings.successMessage) ? '<div class="message-wrapper"> <div class="pop-up-image"><p> image </p></div><div class="pop-up-title"><h3>Thank You!</h3></div><div class="subtext"><p>Your form has been successfully submitted.</p></div></div>' : drupalSettings.successMessage;
                $(".get-an-estimate-modal").addClass("thank-you-text");
                $(".get-an-estimate-modal").removeClass("form-position");
                $(".get-an-estimate").hide();
                $(".ui-dialog .ui-dialog-titlebar .ui-dialog-title").hide();
                $(".get-an-estimate-form").after(' <p class="p-inner">' + successMessage + '</p>');
                $(".get-an-estimate-form").hide()
            }
        }
    }
})(jQuery, Drupal, drupalSettings)
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/modules/custom/fortis_international/js/international.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/core/misc/debounce.js. */
Drupal.debounce = function(func, wait, immediate) {
    var timeout, result;
    return function() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
        var context = this,
            later = function later() {
                timeout = null;
                if (!immediate) result = func.apply(context, args)
            },
            callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(context, args);
        return result
    }
}
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/core/misc/debounce.js. */
;
/* Source and licensing information for the line(s) below can be found at https://www.fortishealthcare.com/core/misc/displace.js. */
(function($, Drupal, debounce) {
    var offsets = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }

    function getRawOffset(el, edge) {
        var $el = $(el),
            documentElement = document.documentElement,
            displacement = 0,
            horizontal = edge === 'left' || edge === 'right',
            placement = $el.offset()[horizontal ? 'left' : 'top'];
        placement -= window["scroll".concat(horizontal ? 'X' : 'Y')] || document.documentElement["scroll".concat(horizontal ? 'Left' : 'Top')] || 0;
        switch (edge) {
            case 'top':
                displacement = placement + $el.outerHeight();
                break;
            case 'left':
                displacement = placement + $el.outerWidth();
                break;
            case 'bottom':
                displacement = documentElement.clientHeight - placement;
                break;
            case 'right':
                displacement = documentElement.clientWidth - placement;
                break;
            default:
                displacement = 0
        };
        return displacement
    }

    function calculateOffset(edge) {
        var edgeOffset = 0,
            displacingElements = document.querySelectorAll("[data-offset-".concat(edge, "]")),
            n = displacingElements.length;
        for (var i = 0; i < n; i++) {
            var el = displacingElements[i];
            if (el.style.display === 'none') continue;
            var displacement = parseInt(el.getAttribute("data-offset-".concat(edge)), 10);
            if (isNaN(displacement)) displacement = getRawOffset(el, edge);
            edgeOffset = Math.max(edgeOffset, displacement)
        };
        return edgeOffset
    }

    function calculateOffsets() {
        return {
            top: calculateOffset('top'),
            right: calculateOffset('right'),
            bottom: calculateOffset('bottom'),
            left: calculateOffset('left')
        }
    }

    function displace(broadcast) {
        offsets = calculateOffsets();
        Drupal.displace.offsets = offsets;
        if (typeof broadcast === 'undefined' || broadcast) $(document).trigger('drupalViewportOffsetChange', offsets);
        return offsets
    };
    Drupal.behaviors.drupalDisplace = {
        attach: function attach() {
            if (this.displaceProcessed) return;
            this.displaceProcessed = true;
            $(window).on('resize.drupalDisplace', debounce(displace, 200))
        }
    };
    Drupal.displace = displace;
    $.extend(Drupal.displace, {
        offsets: offsets,
        calculateOffset: calculateOffset
    })
})(jQuery, Drupal, Drupal.debounce)
/* Source and licensing information for the above line(s) can be found at https://www.fortishealthcare.com/core/misc/displace.js. */
;