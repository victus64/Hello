var Eratosfen = (function () {
    var G_vmlCanvasManager;
    var $queue = [];
    function inQueue(fname, $) {
        $queue.unshift($);
        setTimeout(fname, 100 * $queue.length);
    };
    var gcanvas, gctx;
    function EratosfenCanvas() {
        gcanvas = document.getElementById('eratosfen');
        gctx = gcanvas.getContext('2d'); // Получаем 2D контекст
        // Ниже выполняем рисование
        // Закрашиваем весь canvas
        gctx.fillStyle = "#FCFCF3";
        gctx.fillRect(0, 0, gcanvas.width, gcanvas.height);
        setTimeout("Eratosfen.run2()", 2000);
    }
    var desk = { x: 20, y: 20, w: 10, h: 12, bs: 32, gap: 3 };
    var cell = { fillColor: '#C0C0C0', font: "14px arial", textColor: '#000000' };
    var choose_colors = ["#0000FF", "#00FF00", "#FF0000", "#FFFF00", "#555500"];
    var nf; // Номер простого числа
    function xy(num) {
        var n = num - 1, j = n / desk.w ^ 0, i = n % desk.w ^ 0;
        return { x: desk.x + i * (desk.bs + desk.gap), y: desk.y + j * (desk.bs + desk.gap) };
    }
    function set_choose_timed() {
        var $ = $queue.pop();
        var c = $.c, color = $.color, nf = $.nf;
        var ctx = gctx, canvas = gcanvas;
        var _fs = { strokeStyle: ctx.strokeStyle, lineWidth: ctx.lineWidth }; // запомнили
        ctx.lineWidth = 2; // Ширина линии
        ctx.strokeStyle = choose_colors[Math.min(color, 4)];
        ctx.beginPath();
        ctx.arc(xy(c.num).x + desk.bs / 2, xy(c.num).y + desk.bs / 2, desk.bs / 2 - 2, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.stroke();
        ctx.font = "bold 18px sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = cell.textColor; // Цвет текста
        ctx.fillText(c.num, xy(10).x + 100 + nf % 4 * 50, xy(10).y + 50 + (nf / 4 ^ 0) * 30);
        ctx.strokeStyle = _fs.strokeStyle; ctx.lineWidth = _fs.lineWidth;
    }
    function set_cross_timed() {
        var $ = $queue.pop();
        var c = $.c, color = $.color;
        var ctx = gctx, canvas = gcanvas;
        var _fs = { strokeStyle: ctx.strokeStyle, lineWidth: ctx.lineWidth }; // запомнили
        ctx.lineWidth = 2; // Ширина линии
        ctx.strokeStyle = choose_colors[Math.min(color, 4)];
        ctx.beginPath();
        var x = xy(c.num).x, y = xy(c.num).y;
        ctx.beginPath();
        ctx.moveTo(x, y); // Начало линии
        ctx.lineTo(x + desk.bs, y + desk.bs); // Узел линии
        ctx.closePath(); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x + desk.bs, y); // Начало линии
        ctx.lineTo(x, y + desk.bs); // Узел линии
        ctx.closePath(); ctx.stroke();
        ctx.strokeStyle = _fs.strokeStyle; ctx.lineWidth = _fs.lineWidth;
    }
    function EratosfenCanvas1() {
        var ctx = gctx, canvas = gcanvas;
        // Параметры рисования
        ctx.strokeStyle = '#FF0000'; // Цвет обводки
        ctx.lineWidth = 3; // Ширина линии
        ctx.fillStyle = '#C0C0C0'; // Цвет заливки
        var er = [];
        for (i = 2; i < 121; i++) {
            var e = { num: i, no_simple: null };
            er[i] = e;
        }
        function set_desk() {
            var _fs = { fill: ctx.fillStyle, font: ctx.font }; // запомнили
            // Параметры шрифта
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = cell.font;
            for (var n = 2; n < er.length; n++) {
                ctx.fillStyle = cell.fillColor; // Цвет заливки
                ctx.fillRect(xy(n).x, xy(n).y, desk.bs, desk.bs);
                ctx.fillStyle = cell.textColor; // Цвет текста
                ctx.fillText(er[n].num, xy(n).x + desk.bs / 2, xy(n).y + desk.bs / 2);
            }
            // Вывод строк текста
            ctx.font = "bold 18px sans-serif";
            ctx.textAlign = "left";
            ctx.fillStyle = cell.textColor; // Цвет текста
            ctx.fillText("Prime numbers", xy(10).x + 100, xy(10).y + 10);
            ctx.fillStyle = _fs.fill; ctx.font = _fs.font;
        }
        function set_choose(c, color) {
            inQueue("Eratosfen.markSimple()", { c: c, color: color, nf: nf });
        }
        function set_cross(c, color) {
            inQueue("Eratosfen.markCross()", { c: c, color: color });
        }
        set_desk();
        var n = 2; // граница по массиву, куда дошли
        for (nf = 0;  // порядковый номер искомого простого числа
            n < er.length; nf++) {
            // выбираем пустую (следующее простое число)
            var sd = null;  // простое число
            for (var i = n; i < er.length; i++) {
                if (!er[i].no_simple) {
                    sd = er[i]; n = i + 1;
                    break;
                }
            }
            if (!sd) break;
            set_choose(sd, nf);
            // вычеркиваем
            for (var i = n; i < er.length; i++) {
                if (er[i].num % sd.num == 0 && !er[i].no_simple) {
                    er[i].no_simple = true;
                    set_cross(er[i], nf);
                }
            }
        }
    }
    return {
        run1: function () { EratosfenCanvas() },
        run2: function () { EratosfenCanvas1() },
        markSimple: function () { set_choose_timed() },
        markCross: function () { set_cross_timed() }
}
})();