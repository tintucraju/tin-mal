/*
  Malayalam Transliteration js plugin 
*/

_r2 = ["aa", "ee", "oo", "ai", "ou"];
__r2n = ["A", "^", "U", "I", "<"];
_r3 = [" aa", " ee", " oo", " ou", " am"];
_r3new = [" A", " ^", " U", " <", " `"];
vow = "aAi^uU~eEIoO<".split("");
vowml = "\u0d05\u0d06\u0d07\u0d08\u0d09\u0d0a\u0d0b\u0d0e\u0d0f\u0d10\u0d12\u0d13\u0d14".split("");
cons = "kKgGcCjJtTdDNnpPbBmyrlvSshLZRfM.,'\";:?!/-_+=()&%@$1234567890".split("");
cnsml = "\u0d15 \u0d16 \u0d17 \u0d18 \u0d1a \u0d1b \u0d1c \u0d1d \u0d1f \u0d20 \u0d26 \u0d21 \u0d23 \u0d28 \u0d2a \u0d2b \u0d2c \u0d2d \u0d2e \u0d2f \u0d30 \u0d32 \u0d35 \u0d36 \u0d38 \u0d39 \u0d33 \u0d34 \u0d31 \u0d2b \u0d2e\u0d4d\u0d2e . , ' \" ; : ? ! \u0d3d - _ + = ( ) & % @ \u0d03 \u0d67 \u0d68 \u0d69 \u0d6a \u0d6b \u0d6c \u0d6d \u0d6e \u0d6f \u0d66".split(" ");
symbols = "aAi^uU~eEIoO<`\\".split("");
symml = " \u0d3e \u0d3f \u0d40 \u0d41 \u0d42 \u0d43 \u0d46 \u0d47 \u0d48 \u0d4a \u0d4b \u0d57 \u0d02 \u0d4d\u200d".split(" ");
hchar = "kgNcjntTdDpbsz".split("");
hcharml = "\u0d16\u0d18\u0d19\u0d1a\u0d1d\u0d1e\u0d24\u0d25\u0d27\u0d22\u0d2b\u0d2d\u0d37\u0d34".split("");
spl1 = ["n", "n", "m"];
spl2 = ["g", "j", "p"];
spl3 = ["\u0d19", "\u0d1e", "\u0d2e\u0d4d\u0d2a"];

function malayalam(c) {
    en = "|" + c;
    ml = "";
    n = 0;
    for (disabled = !1; n < en.length;) {
        var a = c = "",
            b = "";
        ch = en[n];
        "{" == ch && (disabled = !0, ch = "");
        "}" == ch && (disabled = !1);
        if (!disabled) {
            n < en.length - 1 && (a = en[n + 1]);
            n < en.length - 2 && (b = en[n + 2]);
            for (i in _r3) _r3[i] == ch + a + b && (en = en.slice(0, n + 1) + _r3new[i] + en.slice(n + 3, en.length));
            for (i in _r2) _r2[i] == a + b && (en = en.slice(0, n + 1) + __r2n[i] + en.slice(n + 3, en.length));
            done = !1
        }
        n++
    }
    n = 0;
    for (disabled = !1; n < en.length;)
        if (b = a = c = "", ch = en[n], "{" == ch && (disabled = !0, ch = ""), "}" == ch && (disabled = !1), disabled) ml += ch, n++;
        else {
            0 < n && (c = en[n - 1]);
            n < en.length - 1 && (a = en[n + 1]);
            n < en.length - 2 && (b = en[n + 2]);
            done = !1;
            "\n" == ch && (en = en.slice(0, n) + "|\n|" + en.slice(n + 1, en.length), ml += "\n", n++);
            if (0 == done && (" " == ch || "|" == ch)) {
                connector = "";
                " " == ch && (connector = " ");
                for (vi in vow) vow[vi] == a && (ml += connector + vowml[vi], done = !0, n += 2);
                0 == done && (ml += connector, done = !0, n++)
            }
            for (i in spl1)
                if (0 == done && ch == spl1[i] && a == spl2[i]) {
                    _bu = "\u0d4d";
                    for (si in symbols) symbols[si] == b && (_bu = symml[si]);
                    ml += spl3[i] + _bu;
                    n += 2;
                    done = !0
                }
            if (0 == done && "m" == ch && "m" != a && "a" != a && "A" != a && "i" != a && "^" != a && "u" != a && "U" != a && "~" != a && "e" != a && "E" != a && "I" != a && "o" != a && "O" != a && "<" != a) {
                _bu = "\u0d4d";
                for (si in symbols) symbols[si] == c && (_bu = symml[si]);
                "\u0d4d" != _bu ? (ml += "\u0d02", n++, done = !0) : done = !1
            }
            if (0 == done && "h" == a)
                for (hi in hchar)
                    if (hchar[hi] == ch) {
                        _bu = "\u0d4d";
                        for (si in symbols) symbols[si] == b && (_bu = symml[si]);
                        ml += hcharml[hi] + _bu;
                        n += 2;
                        done = !0
                    }
            if (0 == done && "h" != a) {
                for (ci in cons)
                    if (cons[ci] == ch) {
                        _bu = 30 > ci ? "\u0d4d" : "";
                        symn = 0;
                        for (si in symbols) symbols[si] == a && (_bu = symml[si]);
                        ml += cnsml[ci] + _bu
                    }
                n++;
                done = !0
            }
            0 == done && n++
        }
    return ml
};
