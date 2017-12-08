var $jscomp={scope:{}};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(a,c,b){if(b.get||b.set)throw new TypeError("ES3 does not support getters and setters.");a!=Array.prototype&&a!=Object.prototype&&(a[c]=b.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(a,c,b,d){if(c){b=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];e in b||(b[e]={});b=b[e]}a=a[a.length-1];d=b[a];c=c(d);c!=d&&null!=c&&$jscomp.defineProperty(b,a,{configurable:!0,writable:!0,value:c})}};$jscomp.polyfill("Array.prototype.fill",function(a){return a?a:function(a,b,d){var c=this.length||0;0>b&&(b=Math.max(0,c+b));if(null==d||d>c)d=c;d=Number(d);0>d&&(d=Math.max(0,c+d));for(b=Number(b||0);b<d;b++)this[b]=a;return this}},"es6-impl","es3");
var canvas=document.getElementById("canvas_ball"),context=canvas.getContext("2d"),handle=null,balls=[];
function generate(){canvas.width=canvas.clientWidth;canvas.height=canvas.clientHeight;context.clearRect(0,0,canvas.width,canvas.height);balls=[];for(var a=0;30>balls.length&&1E4>a;){var c=rand(0,canvas.clientWidth),b=rand(0,canvas.clientHeight),d=rand(3,5),e=rand(300,500)/100,f=angleToDirection(rand(0,314)/100),g=f.x*e*(1==rand(0,1)?1:-1),f=f.y*e*(1==rand(0,1)?1:-1),h=new ColorHSLA(rand(0,360)),c=new Ball(c,b,d,g,f,e,h),b=c.relativeRadius,b=c.x<b||c.x>canvas.width-b||c.y<b||c.y>canvas.height-b;if(!b)for(i in balls)if(c.colision(balls[i])){b=
!0;break}b?a++:balls.push(c)}balls.push(new Ball(0,0,20,0,0,0,new ColorHSLA(0,100,50,.5)));render()}
function move(){canvas.width=canvas.clientWidth;canvas.height=canvas.clientHeight;for(i in balls)if(i!=balls.length-1){var a=balls[i].next(),c=balls[i].relativeRadius;for(j in balls)if(i!=j&&balls[i].colision(balls[j])){var b=balls[j].x-balls[i].x,d=balls[j].y-balls[i].y,e=angleToDirection(Math.atan2(b,d)),f=c+balls[j].relativeRadius,b=Math.sqrt(Math.pow(Math.abs(b),2)+Math.pow(Math.abs(d),2));balls[i].velocityY=e.y*(f-b);balls[i].velocityX=e.x*(f-b);break}a.x<c&&(a.x=c,balls[i].velocityX*=-1);a.x>
canvas.width-c&&(a.x=canvas.width-c,balls[i].velocityX*=-1);a.y<c&&(a.y=c,balls[i].velocityY*=-1);a.y>canvas.height-c&&(a.y=canvas.height-c,balls[i].velocityY*=-1);balls[i].from(a);e=angleToDirection(Math.atan2(balls[i].velocityX,balls[i].velocityY));e.multiply(new Vector2(balls[i].speed,balls[i].speed));balls[i].velocityX-=(9*balls[i].velocityX+e.x)/10;balls[i].velocityY-=(9*balls[i].velocityY+e.y)/10}balls[balls.length-1].color.h=(balls[balls.length-1].color.h+1)%361}
function render(){canvas.width=canvas.clientWidth;canvas.height=canvas.clientHeight;context.clearRect(0,0,canvas.width,canvas.height);for(i in balls)context.beginPath(),context.fillStyle=balls[i].color.toString(),context.arc(balls[i].x,balls[i].y,balls[i].relativeRadius,0,2*Math.PI,!0),context.fill(),context.closePath()}function onUpdate(){move();render();handle=requestAnimationFrame(onUpdate)}function toggle(){handle?handle=cancelAnimationFrame(handle):onUpdate()}generate();toggle();
document.body.addEventListener("mousemove",function(a){var c=canvas.getBoundingClientRect();balls[balls.length-1].x=a.clientX-c.left;balls[balls.length-1].y=a.clientY-c.top},!1);
