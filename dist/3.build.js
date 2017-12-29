webpackJsonp([3],{27:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(41),r=i(57),s=i(3),a=s(n.a,r.a,!1,null,null,null);e.default=a.exports},28:function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var r=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),s=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;n(this,t),this.x=e,this.y=i}return r(t,[{key:"add",value:function(e){if(arguments.length>1&&void 0!==arguments[1]&&arguments[1])return new t(this.x,this.y).add(e);if(e instanceof t)this.x+=e.x,this.y+=e.y;else{if(isNaN(e))throw Error(e+" is not Vector2 or number");this.x+=e,this.y+=e}return this}},{key:"subtract",value:function(e){if(arguments.length>1&&void 0!==arguments[1]&&arguments[1])return new t(this.x,this.y).subtract(e);if(e instanceof t)this.x-=e.x,this.y-=e.y;else{if(isNaN(e))throw Error(e+" is not Vector2 or number");this.x-=e,this.y-=e}return this}},{key:"multiply",value:function(e){if(arguments.length>1&&void 0!==arguments[1]&&arguments[1])return new t(this.x,this.y).multiply(e);if(e instanceof t)this.x*=e.x,this.y*=e.y;else{if(isNaN(e))throw Error(e+" is not Vector2 or number");this.x*=e,this.y*=e}return this}},{key:"divide",value:function(e){if(arguments.length>1&&void 0!==arguments[1]&&arguments[1])return new t(this.x,this.y).divide(e);if(e instanceof t)this.x/=e.x,this.y/=e.y;else{if(isNaN(e))throw Error(e+" is not Vector2 or number");this.x/=e,this.y/=e}return this}},{key:"set",value:function(e){if(arguments.length>1&&void 0!==arguments[1]&&arguments[1])return new t(this.x,this.y);if(e instanceof t)this.x=e.x,this.y=e.y;else{if(isNaN(e))throw Error(e+" is not Vector2 or number");this.x=e,this.y=e}return this}}]),t}();e.a=s},31:function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var r=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),s=function(){function t(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:50,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1;n(this,t),this.h=e,this.s=i,this.l=r,this.a=s}return r(t,[{key:"toString",value:function(){return"hsla("+this.h+","+this.s+"%,"+this.l+"%,"+this.a+")"}}]),t}();e.a=s},32:function(t,e,i){"use strict";function n(t){return arguments.length>1&&void 0!==arguments[1]&&arguments[1]&&(t=t*Math.PI/180),new o.a(-Math.sin(t),-Math.cos(t))}function r(t,e){return s(t,e)<t.radius+e.radius}function s(t,e){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}function a(t,e){return 180*Math.atan2(t.y-e.y,t.x-e.x)/Math.PI}e.a=n,e.b=r,e.c=s,e.d=a;var o=i(28)},33:function(t,e,i){"use strict";e.a={data:function(){return{relativeSize:null}},methods:{updateRelativeSize:function(t){if(t){var e=this.relativeSize;if(this.updateRelativeSize(),this.relativeSize!=e){var i=this.relativeSize/e;for(var n in t)t[n].multiply(i)}}else{var r=this.$refs.canvas;this.relativeSize=Math.sqrt(r.width*r.height,2)/100}return this.relativeSize},getRelativeSize:function(t){return t*this.relativeSize},fitCanvasSize:function(){var t=this.$refs.canvas,e=this.$store.state.elements;t.height=e.footer.$el.getBoundingClientRect().top-e.toolbar.$el.clientHeight,t.width=e.app.$el.clientWidth}}}},41:function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var a=i(28),o=i(31),h=i(32),l=i(33),c=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;n(this,e);var o=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,i));return o.radius=s,o.startAngle=a,o.angle=a,o.enable=!1,o}return s(e,t),e}(a.a);e.a={mixins:[l.a],head:{title:{inner:"Canvas",complement:"Rotate Ball"}},data:function(){return{circles:[]}},methods:{registerEvents:function(t){t.$store.state.onAnimationFrame=t.onUpdate},generate:function(){this.updateRelativeSize(),this.circles=[];for(var t=this.$refs.canvas,e=(new a.a(t.width/2,t.height/2),29*this.relativeSize),i=0;i<360;i+=30)this.circles.push(new c(0,0,12,Math.PI/2+Math.PI/12*this.circles.length).set(h.a(i,!0).multiply(e)));this.circles[0].enable=!0},move:function(){for(var t in this.circles)this.circles[t].enable&&(this.circles[t].angle-=Math.PI/90,this.circles[t].angle+Math.PI<this.circles[t].startAngle?(this.circles[t].angle=this.circles[t].startAngle,this.circles[t].enable=!1):this.circles[t].angle+Math.PI/5<this.circles[t].startAngle&&(this.circles[0==t?11:t-1].enable=!0))},render:function(){this.updateRelativeSize(this.circles);var t=this.$refs.canvas,e=t.getContext("2d"),i=new a.a(t.width/2,t.height/2);for(var n in this.circles){e.beginPath();var r=new a.a(this.circles[n].x+i.x,this.circles[n].y+i.y),s=Math.abs(this.circles[n].angle-this.circles[n].startAngle+Math.PI/2);e.strokeStyle=new o.a(h.d(r,i)+120,100,50,s<Math.PI/2?1-s/Math.PI*1.8:0).toString(),e.shadowBlur=10,e.shadowColor=e.strokeStyle,e.lineWidth=.5*this.relativeSize,e.arc(r.x,r.y,this.getRelativeSize(this.circles[n].radius),0,2*Math.PI,!0),e.stroke();var l=h.a(this.circles[n].angle+n*Math.PI/12).multiply(this.getRelativeSize(this.circles[n].radius)),c=[r.add(l,!0),r.subtract(l,!0)];for(var u in c)e.beginPath(),e.fillStyle=new o.a(h.d(c[u],i)+120).toString(),e.shadowBlur=10,e.shadowColor=e.fillStyle,e.arc(c[u].x,c[u].y,this.getRelativeSize(2),0,2*Math.PI,!0),e.fill(),e.closePath()}},onUpdate:function(){this.fitCanvasSize(),this.move(),this.render()},fitCanvasSize:function(){var t=this.$refs.canvas,e=this.$store.state.elements,i=Math.min(e.footer.$el.getBoundingClientRect().top-e.toolbar.$el.clientHeight,e.app.$el.clientWidth);t.width=i,t.height=i}},mounted:function(){this.fitCanvasSize(),this.generate(),this.registerEvents(this)}}},57:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-layout",{attrs:{column:"","align-center":""}},[i("canvas",{ref:"canvas"})])},r=[],s={render:n,staticRenderFns:r};e.a=s}});
//# sourceMappingURL=3.build.js.map