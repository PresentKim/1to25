function colisionEachCircle(a,b){return distance(a,b)<a.radius+b.radius}function vecToAngle(a,b){return 180*Math.atan2(a.y-b.y,a.x-b.x)/Math.PI}function angleToDirection(a){return new Vector2(-Math.sin(a),-Math.cos(a))}function distance(a,b){return Math.sqrt(Math.pow(a.x-b.x,2)+Math.pow(a.y-b.y,2))}function rand(a,b,c){return parseFloat((Math.random()*(b-a)+a).toFixed(void 0===c?0:c))}function getRelativeSize(a){return a*Math.sqrt(canvas.width*canvas.height,2)/100};
