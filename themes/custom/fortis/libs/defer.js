! function(r, i, t) {
    var u, o = /^data-(.+)/,
        a = 'IntersectionObserver',
        c = /p/.test(i.readyState),
        s = [],
        f = s.slice,
        l = 'lazied',
        e = 'load',
        n = 'pageshow',
        d = 'forEach',
        h = 'hasAttribute',
        m = 'shift';

    function v(e) {
        i.head.appendChild(e)
    }

    function p(e, n) {
        f.call(e.attributes)[d](n)
    }

    function y(e, n, t, o) {
        return o = (o = n ? i.getElementById(n) : o) || i.createElement(e), n && (o.id = n), t && (o.onload = t), o
    }

    function b(e, n) {
        return f.call((n || i).querySelectorAll(e))
    }

    function I(t) {
        b('source', t)[d](I), p(t, function(e, n) {
            (n = o.exec(e.name)) && (t[n[1]] = e.value)
        }), e in t && t[e]()
    }

    function g(e) {
        u(function(o) {
            o = b(e || '[type=deferjs]'),
                function e(n, t) {
                    (n = o[m]()) && (n.parentNode.removeChild(n), (t = y(n.nodeName)).text = n.text, p(n, function(e) {
                        'type' != e.name && (t[e.name] = e.value)
                    }), t.src && !t[h]('async') ? (t.onload = t.onerror = e, v(t)) : (v(t), e()))
                }()
        })
    }(u = function(e, n) {
        c ? t(e, n) : s.push(e, n)
    }).all = g, u.js = function(n, t, e, o) {
        u(function(e) {
            (e = y('SCRIPT', t, o)).src = n, v(e)
        }, e)
    }, u.css = function(n, t, e, o) {
        u(function(e) {
            (e = y('LINK', t, o)).rel = 'stylesheet', e.href = n, v(e)
        }, e)
    }, u.dom = function(e, n, t, o, i) {
        function c(e) {
            o && !1 === o(e) || (I(e), t && (e.className += ' ' + t))
        }
        u(function(t) {
            t = a in r && new r[a](function(e) {
                e[d](function(e, n) {
                    e.isIntersecting && (n = e.target) && (t.unobserve(n), c(n))
                })
            }, i), b(e || '[data-src]')[d](function(e) {
                e[h](l) || (e.setAttribute(l, ''), t ? t.observe(e) : c(e))
            })
        }, n)
    }, u.reveal = I, r.Defer = u, r.addEventListener('on' + n in r ? n : e, function() {
        for (g(); s[0]; t(s[m](), s[m]())) c = 1
    })
}(this, document, setTimeout);