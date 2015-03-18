var G_vmlCanvasManager;

function startCanvas() {
    var canvas = document.getElementById('canvas-1');

    // Проверяем для IE
    if (G_vmlCanvasManager != undefined)
        G_vmlCanvasManager.initElement(canvas);

    // Проверяем понимает ли браузер canvas
    if (canvas.getContext) {
        Eratosfen.run1();
        //EratosfenCanvas();
        var ctx = canvas.getContext('2d'); // Получаем 2D контекст
        // Ниже выполняем рисование
        // Закрашиваем весь canvas
        ctx.fillStyle = "#F5F5E5";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Параметры рисования
        ctx.strokeStyle = '#FF0000'; // Цвет обводки
        ctx.lineWidth = 3; // Ширина линии
        ctx.fillStyle = '#00FF00'; // Цвет заливки
        // Прямоугольники
        ctx.fillRect(440, 10, 200, 100); // Залитый прямоугольник
        ctx.strokeRect(220, 120, 100, 50); // Незалитый прямоугольник
        // Линии
        ctx.fillStyle = '#0000FF'; // Цвет заливки
        ctx.beginPath();
        ctx.moveTo(10, 10); // Начало линии
        ctx.lineTo(300, 300); // Узел линии
        ctx.lineTo(450, 300); // Конец линии
        ctx.closePath();
        ctx.stroke();
        // Полигоны
        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.lineTo(150, 250);
        ctx.lineTo(250, 250);
        ctx.closePath();
        ctx.fill();
        // Окружности
        ctx.beginPath();
        ctx.arc(290, 290, 50, 0, Math.PI * 1.3, false);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(450, 450, 120, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill(); // Заливка окружности
        // Кривые Безье
        ctx.strokeStyle = '#0000FF'; // Цвет обводки
        ctx.beginPath();
        ctx.moveTo(10, 15);
        ctx.bezierCurveTo(75, 175, 175, -150, 250, 115);
        ctx.moveTo(10, 15);
        ctx.quadraticCurveTo(100, 100, 250, 115);
        ctx.stroke();
        // Шахматная доска
        ctx.strokeStyle = '#B70A72'; // меняем цвет рамки
        const bs = 32, bx = 520, by = 170, bw = 3, sw = 2, nb = 8;
        ctx.strokeRect(bx - bw - sw, by - bw - sw, bs * nb + 2 * (bw + sw), bs * nb + 2 * (bw + sw));
        ctx.strokeRect(bx - sw, by - sw, bs * nb + 2 * sw, bs * nb + 2 * sw);
        ctx.fillStyle = '#AF5200'; // меняем цвет клеток
        //ctx.fillRect(bx, by, bs * nb, bs * nb);
        for (i = 0; i < nb; i += 2)
            for (j = 0; j < nb; j += 2) {
                ctx.fillRect(bx + i * bs, by + j * bs, bs, bs);
                ctx.fillRect(bx + (i + 1) * bs, by + (j + 1) * bs, bs, bs);
            }
        // Очистка canvas
        //ctx.clearRect(10, 10, 200, 200); // Очистка области указанного размера и положения
        //ctx.clearRect(0, 0, canvas.width, canvas.height); // Очиста всего холста
        var img = new Image(); // Создание нового объекта ихображения
        img.onload = function () {
            // Событие которое будет исполнено в момент когда изображение будет полностью загружено
            ctx.drawImage(img, 280, 0);
            ctx.drawImage(img, 300, 0, 50, 50);
            ctx.drawImage(img, 2, 2, 5, 7, 360, 0, 60, 60);
        }
        //img.src = 'image.png'; // Путь к изображению которое необходимо нанести на холст
        img.src = 'data:image/gif;base64,R0lGODlhDAAMAOYAANPe5Pz//4KkutDb4szY3/b+/5u5z/3//3KWrfn//8rk8naasYGkuszY4Mbg8qG+0dzv9tXg5sTg8t/o7vP8/4iqv9ft9NPe5qfD1Mfc56O/0YKlu+Lr8M3Z4JCwxuj2/Of0+eDz9+rw9Z68z8/n8sHe8sbT3Ju6zuDv96nE1Onw9Nbh6cvX39Hq89Hq8u77/srW3tbh54Kku8ba56TD1u37/vL8/vL8/9ft9ebu8+Ps8bzM1Ymsw7XR4Nnj6Yanvsnj8qrI2Or2/NTf5tvl68vY3+r3/HqdtNji6OXt8eDz+dLc477c7bDO3t7n7d7v9s3Z4dbs9N/y98Pd6PX+/8/b4f7//+Hp7tDo8vv//+fu84GjunKWro6uxHqctOfu9P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAMAAwAAAeEgCJfg4RfWlo5KlpgjI2OOklWBwcBAVmXCQlXHAUFVBkGBjMUNzZOEy81IF2sXUZCH0QrDyhPGzICAkohUj4XHhoQKQsLGDgWUTFIJxUjUy0uWNIkQxE9W9gMDD9BCgpLAEBNXl5H5F40DlUDEkxc71wICDwlDQBQHQ0EBEUsJjswBgQCADs=';
        // Вывод текста
        // По умолчанию текст маленький
        ctx.fillText("helloWorld (fillText)", 0, canvas.height);
        ctx.strokeText("helloWorld (strokeText)", 0, canvas.height - 25);
        // Задаем параметры текста
        ctx.fillStyle = "#bbe"; // Цвет заливки
        ctx.strokeStyle = "#007700"; // Цвет линий
        ctx.lineWidth = 3; // Толщина линий
        ctx.font = "italic bold 24px sans-serif"; // Параметры шрифта
        ctx.strokeText("html5canvas.ru", 11, canvas.height - 49);
        ctx.fillText("html5canvas.ru", 10, canvas.height - 50);
        // Пример горизонтального выравнивания
        var context = ctx;
        // Вывод вертикально линии
        context.beginPath();
        context.moveTo(canvas.width / 2, 70);
        context.lineTo(canvas.width / 2, 250);
        context.stroke();
        // Вывод строк текста
        context.font = "bold 32px sans-serif";
        context.textAlign = "left";
        context.fillText("left", canvas.width / 2, 100);
        context.textAlign = "center";
        context.fillText("center", canvas.width / 2, 150);
        context.textAlign = "right";
        context.fillText("right", canvas.width / 2, 200);
        // Пример вертикального выравнивания
        // Вывод вертикально линии
        context.beginPath();
        context.moveTo(10, canvas.height - 150);
        context.lineTo(290, canvas.height - 150);
        context.stroke();
        // Вывод строк текста
        context.font = "bold 24px sans-serif";
        context.textAlign = "center";
        context.textBaseline = "bottom";
        context.fillText("bottom", 75, canvas.height - 150);
        context.textBaseline = "middle";
        context.fillText("middle", 160, canvas.height - 150);
        context.textBaseline = "top";
        context.fillText("top", 225, canvas.height - 150);
    }
}
