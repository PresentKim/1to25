var $jscomp={scope:{}};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(a,c,b){if(b.get||b.set)throw new TypeError("ES3 does not support getters and setters.");a!=Array.prototype&&a!=Object.prototype&&(a[c]=b.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(a,c,b,e){if(c){b=$jscomp.global;a=a.split(".");for(e=0;e<a.length-1;e++){var d=a[e];d in b||(b[d]={});b=b[d]}a=a[a.length-1];e=b[a];c=c(e);c!=e&&null!=c&&$jscomp.defineProperty(b,a,{configurable:!0,writable:!0,value:c})}};$jscomp.polyfill("Number.MAX_SAFE_INTEGER",function(){return 9007199254740991},"es6-impl","es3");
$jscomp.polyfill("Array.prototype.fill",function(a){return a?a:function(c,b,a){var d=this.length||0;0>b&&(b=Math.max(0,d+b));if(null==a||a>d)a=d;a=Number(a);0>a&&(a=Math.max(0,d+a));for(b=Number(b||0);b<a;b++)this[b]=c;return this}},"es6-impl","es3");var gridContainer=null,canvas=document.createElement("canvas");canvas.setAttribute("id","canvas_ball");canvas.setAttribute("class","bordered");var context=canvas.getContext("2d"),handle=null,balls=[];
w3.includeHTML(function(){addButton("Back","../../canvas.html");gridContainer=document.getElementById("grid-container");document.getElementById("title-text").innerText=document.title="Bouncing Ball";document.getElementById("intro").innerHTML='<i class="material-icons"">touch_app</i>Touch it!';document.getElementById("grid-container").appendChild(canvas);generate();toggle()});
function generate(){canvas.width=gridContainer.clientWidth;canvas.height=gridContainer.clientHeight;context.clearRect(0,0,canvas.width,canvas.height);balls=[];for(var a=0;30>balls.length&&1E4>a;){var c=rand(0,canvas.width),b=rand(0,canvas.height),e=rand(3,5,7),d=rand(3,5,7),f=angleToDirection(rand(0,Math.PI,7)),g=f.x*d*(rand(0,1)?1:-1),f=f.y*d*(rand(0,1)?1:-1),h=new ColorHSLA(rand(0,360)),c=new Ball(c,b,e,g,f,d,h),b=c.relativeRadius,b=c.x<b||c.x>canvas.width-b||c.y<b||c.y>canvas.height-b;if(!b)for(i in balls)if(c.colision(balls[i])){b=
!0;break}b?a++:balls.push(c)}balls.push(new Ball(Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER,20,0,0,0,new ColorHSLA(0,100,50,.5)));render()}
function move(){var a=balls[balls.length-1];for(i in balls)if(balls[i]!=a){var c=balls[i].next(),b=balls[i].relativeRadius;for(j in balls)if(i!=j&&balls[i].colision(balls[j])){var e=angleToDirection(Math.atan2(balls[j].x-balls[i].x,balls[j].y-balls[i].y)),d=b+balls[j].relativeRadius-distance(balls[i],balls[j]);balls[i].velocityX+=e.x*d;balls[i].velocityY+=e.y*d;balls[j].velocityX-=e.x;balls[j].velocityY-=e.y}c.x<b&&(c.x=b,balls[i].velocityX*=-1);c.x>canvas.width-b&&(c.x=canvas.width-b,balls[i].velocityX*=
-1);c.y<b&&(c.y=b,balls[i].velocityY*=-1);c.y>canvas.height-b&&(c.y=canvas.height-b,balls[i].velocityY*=-1);balls[i].from(c);c=angleToDirection(Math.atan2(balls[i].velocityX,balls[i].velocityY));c.multiply(new Vector2(balls[i].speed,balls[i].speed));balls[i].velocityX-=(9*balls[i].velocityX+c.x)/10;balls[i].velocityY-=(9*balls[i].velocityY+c.y)/10}a.color.h=++a.color.h%361}
function render(){canvas.width=gridContainer.clientWidth;canvas.height=gridContainer.clientHeight;context.clearRect(0,0,canvas.width,canvas.height);for(i in balls)context.beginPath(),context.fillStyle=balls[i].color.toString(),context.arc(balls[i].x,balls[i].y,balls[i].relativeRadius,0,2*Math.PI,!0),context.fill(),context.closePath()}function onUpdate(){move();render();handle=requestAnimationFrame(onUpdate)}function toggle(){handle?handle=cancelAnimationFrame(handle):onUpdate()}
document.body.addEventListener("mousemove",function(a){var c=canvas.getBoundingClientRect();balls[balls.length-1].x=a.clientX-c.left;balls[balls.length-1].y=a.clientY-c.top},!1);document.body.addEventListener("touchmove",function(a){var c=canvas.getBoundingClientRect();balls[balls.length-1].x=a.touches[0].clientX-c.left;balls[balls.length-1].y=a.touches[0].clientY-c.top},!1);
document.body.addEventListener("touchend",function(a){balls[balls.length-1].x=Number.MAX_SAFE_INTEGER;balls[balls.length-1].y=Number.MAX_SAFE_INTEGER},!1);
