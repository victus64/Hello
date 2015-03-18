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
function sum(a) {
    return function (b) { return a+b; }
}
function filter(arr, func) {
    var res = [];
    for (var i = 0; i < arr.length; i++) {
        if (func(arr[i])) {
            res.push(arr[i]);
        }
    }
    return res;
}
function inBetween(a, b) {
    return function (x) {
        return a <= x && x <= b;
    }
}
function inArray(arr) {
    return function (x) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == x) return true;
        }
    }
}
function makeBuffer() {
    var s = "";
    function buf (ss) {
        if (ss===undefined) return s;
        s += String(ss);
    };
    buf.clear = function () { s = ""; };
    return buf;
}
var buffer = makeBuffer();
// добавить значения к буферу
buffer('Замыкания');
buffer(' Использовать');
buffer(' Нужно!');
// получить текущее значение
document.writeln('<p>' + buffer() + '</p>'); // Замыкания Использовать Нужно!
buffer.clear();
buffer(0); buffer(1); buffer(0);
document.writeln('<p>' + buffer() + '</p>');// '010'
function makeArmy() {
    var shooters = [];
    for (var i = 0; i < 10; i++) (function(i) {
        var shooter = function () { // функция-стрелок
            console.log(i); // выводит свой номер
        }
        shooters.push(shooter);
    })(i);
    return shooters;
}
function Calculator() {
    var ops = [];
    this.addMethod = function (op, fcalc) {
        ops[op] = fcalc;
    }
    this.calculate = function (exp) {
        var aexp = String(exp).split(' ');
        var val = ops[aexp[1]](aexp[0], aexp[2]);
        return val;
    }
};
var powerCalc = new Calculator;
powerCalc.addMethod("*", function (a, b) { return a * b; });
powerCalc.addMethod("/", function (a, b) { return a / b; });
powerCalc.addMethod("**", function (a, b) { return Math.pow(a, b); });
var result = powerCalc.calculate("2 dd 3");
alert(result); // 8
var army = makeArmy();
army[0](); // стрелок выводит 10, а должен 0
army[5](); // стрелок выводит 10...
var arr = [1, 2, 3, 4, 5, 6, 7];
var result = "{ " + sum(5)(7);
result += ", " + filter(arr, function(a) { return a % 2 == 0 });
result += ", " + filter(arr, inBetween(3, 6));
result += ", " + filter(arr, inArray([1, 2, 10]));
result += " }";
document.writeln('<p>' + result + '</p>');
