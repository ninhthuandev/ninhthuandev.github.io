!function(r, t, n) {
    function e(r) {
        return "string" == typeof r ? CryptoApi.encoder.fromUtf(r) : CryptoApi.encoder.fromArrayBuffer(r)
    }
    function u(r, t) {
        r.update(e(t));
        var n = {
            update: function(t) {
                return r.update(e(t)),
                    n
            },
            hex: function() {
                return CryptoApi.encoder.toHex(r.finalize())
            }
        };
        return n
    }
    for (var o = ["ripemd128", "ripemd160", "ripemd256", "ripemd320", "md2"], i = 0; i < o.length; ++i) {
        (r[o[i]] = function(r) {
            var t = function(t) {
                return u(CryptoApi.getHasher(r), t)
            }
                , n = function(r) {
                return t(r).hex()
            };
            return n.update = t,
                n
        }(o[i])).hmac = function(r) {
            var t = function(t, n) {
                var o = CryptoApi.getHasher(r);
                return o = CryptoApi.getHmac(e(t), o),
                    u(o, n)
            }
                , n = function(r, n) {
                return t(r, n).hex()
            };
            return n.update = t,
                n
        }(o[i])
    }
}(window, document);
