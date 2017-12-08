var $jscomp={scope:{}};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(b,c,a){if(a.get||a.set)throw new TypeError("ES3 does not support getters and setters.");b!=Array.prototype&&b!=Object.prototype&&(b[c]=a.value)};$jscomp.getGlobal=function(b){return"undefined"!=typeof window&&window===b?b:"undefined"!=typeof global&&null!=global?global:b};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(b,c,a,d){if(c){a=$jscomp.global;b=b.split(".");for(d=0;d<b.length-1;d++){var e=b[d];e in a||(a[e]={});a=a[e]}b=b[b.length-1];d=a[b];c=c(d);c!=d&&null!=c&&$jscomp.defineProperty(a,b,{configurable:!0,writable:!0,value:c})}};$jscomp.polyfill("Array.prototype.fill",function(b){return b?b:function(c,a,b){var d=this.length||0;0>a&&(a=Math.max(0,d+a));if(null==b||b>d)b=d;b=Number(b);0>b&&(b=Math.max(0,d+b));for(a=Number(a||0);a<b;a++)this[a]=c;return this}},"es6-impl","es3");
var canvas=document.getElementById("canvas_ball"),context=canvas.getContext("2d"),handle=null,balls=[];
function generate(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;context.clearRect(0,0,canvas.width,canvas.height);balls=[];for(var b=0;30>balls.length&&1E4>b;){var c=rand(0,canvas.width),a=rand(0,canvas.height),d=rand(3,5),e=rand(300,500)/100,f=angleToDirection(rand(0,314)/100),g=f.x*e*(1==rand(0,1)?1:-1),f=f.y*e*(1==rand(0,1)?1:-1),h=new ColorHSLA(rand(0,360)),c=new Ball(c,a,d,g,f,e,h),a=c.relativeRadius,a=c.x<a||c.x>canvas.width-a||c.y<a||c.y>canvas.height-a;if(!a)for(i in balls)if(c.colision(balls[i])){a=
!0;break}a?b++:balls.push(c)}balls.push(new Ball(NaN,NaN,20,0,0,0,new ColorHSLA(0,100,50,.5)));render()}
function move(){var b=balls[balls.length-1];for(i in balls)if(balls[i]!=b){var c=balls[i].next(),a=balls[i].relativeRadius;for(j in balls)if(i!=j&&balls[i].colision(balls[j])){var d=balls[j].x-balls[i].x,e=balls[j].y-balls[i].y,f=angleToDirection(Math.atan2(d,e)),g=a+balls[j].relativeRadius,d=Math.sqrt(Math.pow(Math.abs(d),2)+Math.pow(Math.abs(e),2));balls[i].velocityX+=f.x*(g-d);balls[i].velocityY+=f.y*(g-d);balls[j].velocityX-=f.x;balls[j].velocityY-=f.y}c.x<a&&(c.x=a,balls[i].velocityX*=-1);c.x>
canvas.width-a&&(c.x=canvas.width-a,balls[i].velocityX*=-1);c.y<a&&(c.y=a,balls[i].velocityY*=-1);c.y>canvas.height-a&&(c.y=canvas.height-a,balls[i].velocityY*=-1);balls[i].from(c);c=angleToDirection(Math.atan2(balls[i].velocityX,balls[i].velocityY));c.multiply(new Vector2(balls[i].speed,balls[i].speed));balls[i].velocityX-=(9*balls[i].velocityX+c.x)/10;balls[i].velocityY-=(9*balls[i].velocityY+c.y)/10}b.color.h=++b.color.h%361}
function render(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;context.clearRect(0,0,canvas.width,canvas.height);for(i in balls)context.beginPath(),context.fillStyle=balls[i].color.toString(),context.arc(balls[i].x,balls[i].y,balls[i].relativeRadius,0,2*Math.PI,!0),context.fill(),context.closePath()}function onUpdate(){move();render();handle=requestAnimationFrame(onUpdate)}function toggle(){handle?handle=cancelAnimationFrame(handle):onUpdate()}generate();toggle();
document.body.addEventListener("mousemove",function(b){var c=canvas.getBoundingClientRect();balls[balls.length-1].x=b.clientX-c.left;balls[balls.length-1].y=b.clientY-c.top},!1);
