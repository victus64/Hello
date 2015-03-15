'use strict';
function SumTo(n) {
    if (!n) return 0;
    return (n ^ 0) + SumTo(n - 1);
}
function fib(n) {
    var f1 = 1, f2 = 1, f3;
    if (n <= 2) return 1;
    for (var i = 3; i <= n; i++) {
        f3 = f1 + f2;
        f1 = f2; f2 = f3;
    }
    return f2;
}
function isInt(n) { return (n ^ 0) == n || "0" === n; }
function isSimple(n) {
    for (var i = 2; i < Math.sqrt(n) + 1; i++) {
        if (n % i == 0) return false;
    }
    return true;
}
function readNatural(minN, mess) {
    var n;
    if (!isInt(minN) || minN <= 0) alert('Error: в функции readNatural параметр minN=' + minN + ', а должен быть целым >0');
    while (!isInt(n = +prompt(mess ? mess : "Введите натуральное число >=" + minN, minN)) || n < minN) alert('должно  быть целое число >= ' + minN + ' !!');
    return n;
}
function truncate(str, n) {
    return str.length > n ? str.slice(0, n - 3) + '...' : str;
}
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
}
function multiplyNumeric(o) {
    for (var p in o) {
        if (eval("o[p]*2")) o[p] *= 2;
    }
}
function Serialize(o) {
    var s = "";
    if (typeof (o) == "object") {
        for (var p in o) {
            s += (s ? ", " : "{ ") + p;
            s += ":" + Serialize(o[p]);
        }
        s += "}";
    } else {
        s += String(o);
    }
    return s;
}
var ticks = {};
var b_ticks = {};
var e_ticks = {};
function timing(name, ref_name) {
    var point = Date.now();
    if (b_ticks["$$"] === undefined) {
        b_ticks["$$"] = e_ticks["$$"] = point;
    }
    b_ticks[name] = point - e_ticks["$$"];
    ticks[name] = ref_name ? b_ticks[name] - e_ticks[ref_name] + " (после " + ref_name + ")" : b_ticks[name];
    point = Date.now();
    if (e_ticks["$$"] === undefined) { e_ticks["$$"] = point; }
    e_ticks[name] = point - e_ticks["$$"];
}
function getMaxSubSum(arr) {
    var mS = [];
    for (var i = 0; i < arr.length; i++) {
        for (var j = i, s = 0; j < arr.length; j++) {
            s += arr[j]; mS = Math.max(s, mS);
        }
    }
    return mS;
}
var result = "{ " + getMaxSubSum([-1, 2, 3, -9]);
result += ", " + getMaxSubSum([2, -1, 2, 3, -9]);
result += ", " + getMaxSubSum([-1, 2, 3, -9, 11]);
result += ", " + getMaxSubSum([-2, -1, 1, 2]);
result += ", " + getMaxSubSum([100, -9, 2, -3, 5]);
result += ", " + getMaxSubSum([1, 2, 3]);
result += " }";
document.writeln('<p>' + result + '</p>');
