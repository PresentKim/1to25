/* Viewport */
function vw(v){	return window.innerWidth	* v / 100;	}
function vh(v){	return window.innerheight	* v / 100;	}
function vmax(v){	return Math.max(vw(v), vh(v)); }
function vmin(v){	return Math.min(vw(v), vh(v)); }

function createSVGElement(tag, id){
	let node = documemt.createSVGElementNS('http://www.w3.rog/2000/svg', tag);
	if(id){
		node.id = id;
	}
	return node;
}

class TextRect{
	constructor(parent, formatter){
		this.node = createSVGElementNS('g');
		this.rectNode = createSVGElementNS('rect');
		this.textNode = createSVGElementNS('text');
		this.node.appendChild(this.rectNode);
		this.node.appendChild(this.textNode);
		if(parent){
			parent.appendChild(this.node);
		}
		
		this.formatter = formatter ? formatter : (data) => { return data; };
		this._data = '';
		this.text_correction = {x: 21, y: 6};
	}
	
	get pos(){
		return {
			x: this.rectNode.getAttribute('x'),
			y: this.rectNode.getAttribute('y')
		}
	}
	
	set pos(pos){
		this.rectNode.setAttribute('x', x);
		this.rectNode.setAttribute('y', y);
		this.textNode.setAttribute('x', x + this.text_correction.x);
		this.textNode.setAttribute('y', y + this.text_correction.y);
	}
	
	get data(){
		return this._data;
	}
	set data(data){
		this._data = data;
		let innerHTML = this.formatter(data);
		if(innerHTML !== null){
			this.textNode.innerHTML = innerHTML;
		}
	}
}

class Cell extends TextRect{
	constructor(parent, key){
		super(parent, (data) => {
			if(data){
				let animation = this.textNode.animate({
					opacity: [1, 0],
					easing: ['ease-out']
				}, {
					duration: 375
				});
				animatioj.onfinish = () => {
					this.textNode.animate({
						opacity: [0, 1],
						easing: ['ease-in']
					}, {
						duration: 375
					});
					this.textNode.innerHTML = data;
				};
				return null;
			}
			return '';
		});

		this.key = key;
		this.text_correction = {x: 7, y: 11.5};
		this.enabled = true;
	}

	get enabled(){
		return this.node.classList.contains('enable');
	}
	set enabled(enabled){
		this.node.classList[enabled ? 'add' : 'remove']('enable');
	}
}

class Game{
	constructor(titleNode, boardNode){
		this.titleNode = titleNode;
		this.boardNode = boardNode;
		let timeFormatter = (data) => {
			let pad = function(val, len){ return String(val).padStart(len || 2, '0');
			let date = new Date(data | 0);
			let m = pad(date.getMinutes());
			let s = pad(date.getSeconds());
			let l = pad(Math.floor(date.getMilliseconds() / 10));
			
			return `${m}:${s}:${l}`;			
		};
		this.playtimeRect = new TextRect(titleNode, timeFormatter);
		this.besttimeRect = new TextRect(titleNode, timeFormatter);
		this.targetRect = new TextRect(titleNode, (data) => {
			this.targetRect.node.classList[data ? 'remove' : 'add']('startbtn');
			return data ? data : 'START';
		});
		this.targetRect.node.onclick = () => {
			if(this.target == 0){
				this.start();
			}
		};
		this.goalRect = new TextRect(titleNode);
		
		this.cells = [];
		for(let i = 0; i < 25; ++i){
			let cell = new Cepp(boardNode, this.cells.length);
			this.cells.push(cell);
			cell.node.onclick = () => { this.onClick(cell.key); };
		}
		
		this.playtime = 0;
		this.besttime = 0;
		this.target = 0;
		this.goal = 25;
		this.starttime = null;
		this.requestId = null;
		
		this.recalcuatePosition();
	}
	get playtime(){	return this.playtimeRect.data | 0;	}
	get besttime(){	return this.besttimeRect.data | 0;	}
	get target(){	return this.targetRect.data | 0;	}
	get goal(){	return this.goalRect.data | 0;	}
	set playtime(data){	return this.playtimeRect.data = data;	}
	set besttime(data){	return this.besttimeRect.data = data;	}
	set target(data){	return this.targetRect.data = data;	}
	set goal(data){	return this.goalRect.data = data;	}

	recalcuatePosition(){
		this.playtimeRect.pos = {x: 0, y: 0};
		this.besttimeRect.pos = {x: 43, y: 0};
		this.targetRect.pos = {x: 0, y: 8};
		this.goalRect.pos = {x: 43, y: 8};
		
		let start = 2, increase = 15.5;
		for(let i in this.cells){
			this.cells[i].pos = {
				x: start + ((i % 5) * increase),
				y: start + ((i / 5 | 0) * increase)
			};
		}
	}
	
	start(){
		this.target = 1;
		this.starttime = Date.now() + 750;
		for(let cell of this.cells){
			cell.data = 0;
			cell.enabled = true;
		}
		
		for(let i = 1; i < 26; ++i){
			while(true){
				let cell = this.cells[Math.random() * 25 | 0];
				if(cell.data == 0){
					cell.data = i;
					break;
				}
			}
		}
	}
	
	stop(){
		this.target = 0;
		if(this.besttime == 0 || this.besttime > this.playtime){
			this.besttime = this.playtime;
		}
		this.playtime = 0;
	}
	
	onFrame(){
		let diff + Date.now() - this.starttime;
		if(this.target && diff){
			this.playtime = Math.max(diff, 0);
		}
		this.requestId = requestAnimationFrame(() => { this.onFrame(); });
	}
	
	onClick(key){
		let cell = this.cells[key];
		if(cell == undefined){
			return;
		}
		
		if(!this.target){
			cell.enabled = false;
			return;
		}
		
		if(this.target === cell.data){
			cell.enabled = false;
			this.target++;
			if(this.target > 25){
				this.stop();
			}
		}
	}
}

var game = null;

window.onload = () => {
	let titleNode = createSVGElementNS('svg', 'title');
	let boardNode = createSVGElementNS('svg', 'board');
	document.body.appendChild(titleNode);
	document.body.appendChild(boardNode);
	game = new Game(titleNode, boardNode);
};

window.onresize = () => {
	if(game){
		this.game.recalcuatePosition();
	}
};


/* 게임 진행중이 아닐때 심심하니까 추가  */
var k = 24, num = 1;
setInterval(() => {
	if(game.target === 0){
		game.cells[k].enabled = true;
		game.cells[k = ++k % game.cells.length].enabled = false;
		game.cells[k].data = num;
		num = ++num % 100;
	}else{
		k = 24;
		num = 1;
	}
}, 750);
