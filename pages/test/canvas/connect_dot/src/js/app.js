// minifyOnSave, filenamePattern: ../../min/js/$1.$2, minifier: gcc, buffer: 8388608, minifierOptions: "charset = utf-8 nomunge language_out=ES5"

var canvas = document.getElementById('connect_dot');
var context = canvas.getContext('2d');
var handle = null;
var dots = [];

function generate() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  context.clearRect(0, 0, canvas.width, canvas.height);

  dots = [];
  var count = 50;
  while (dots.length < count) {
    var x = rand(0, canvas.width);
    var y = rand(0, canvas.height);
    var velocityX = rand(100, 300) / 100 * (rand(0, 1) == 1 ? 1 : -1);
    var velocityY = rand(100, 300) / 100 * (rand(0, 1) == 1 ? 1 : -1);
    var color = new ColorHSLA(rand(0, 360));

    dots.push(new Dot(x, y, 1, velocityX, velocityY, color));
  }
  dots.push(new Dot(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 3, 0, 0, new ColorHSLA(0)));
  render();
}

function move() {
  var mouSeDot = dots[dots.length - 1];
  for (i in dots) {
    if (dots[i] == mouSeDot)
      continue;
    dots[i].x += dots[i].velocityX;
    dots[i].y += dots[i].velocityY;
    if (dots[i].x < 0 || dots[i].x > canvas.width || dots[i].y < 0 || dots[i].y > canvas.height) {
      dots[i].x = rand(0, canvas.width);
      dots[i].y = rand(0, canvas.height);
      dots[i].velocityX = rand(100, 300) / 100 * (rand(0, 1) == 1 ? 1 : -1);
      dots[i].velocityY = rand(100, 300) / 100 * (rand(0, 1) == 1 ? 1 : -1);

    }
  }
  mouSeDot.color.h = ++mouSeDot.color.h % 361;
}

function render() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Render connect line
  for (i in dots) {
    var dumpDots = dots.concat();
    dumpDots.splice(i, 1);
    dumpDots.sort(function(a, b) {
      return distance(dots[i], a) - distance(dots[i], b);
    });
    context.beginPath();
    for (var j = 0; j < 3; j++) {
      if (j < i && distance(dots[i], dots[j]) < 1000) {
        context.moveTo(dots[i].x, dots[i].y);
        context.lineTo(dumpDots[j].x, dumpDots[j].y);
        context.stroke();
      }
    }
    context.closePath();
  }

  // Render dot
  for (i in dots) {
    context.beginPath();
    context.fillStyle = dots[i].color.toString();
    context.arc(dots[i].x, dots[i].y, dots[i].relativeSize, 0, Math.PI * 2, true);
    context.fill();
    context.closePath();
  }
}

function onUpdate() {
  move();
  render();
  handle = requestAnimationFrame(onUpdate);
}

function toggle() {
  if (handle)
    handle = cancelAnimationFrame(handle);
  else
    onUpdate();
}

generate();
toggle();

document.body.addEventListener('mousemove', function(evt) {
  var rect = canvas.getBoundingClientRect();
  dots[dots.length - 1].x = evt.clientX - rect.left;
  dots[dots.length - 1].y = evt.clientY - rect.top;
}, false);