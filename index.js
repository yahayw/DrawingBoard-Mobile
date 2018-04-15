let pageWidth = document.documentElement.clientWidth;
let style = document.createElement("style");
let content = `html{font-size:${pageWidth/16}px;}`;
style.innerHTML = content;
document.head.appendChild(style);

let canvEle = document.querySelector("#canvas");
let eraserBtn = document.querySelector(".btns .eraser");
let clearBtn = document.querySelector(".btns .clear");
let ctx = canvEle.getContext("2d");
canvEle.width = document.documentElement.clientWidth;
canvEle.height = document.documentElement.clientHeight;
ctx.lineWidth = 3;
ctx.strokeStyle = "green";
let oldPosition = {"x":undefined,"y":undefined};
let newPosition = {"x":undefined,"y":undefined};
let isDown = false; 
let isPainting; 
let isEraser = false;
canvEle.addEventListener("touchstart",function(e){
	setCoordinate(oldPosition,e.touches[0])
    isDown = true; 
    isPainting = true;	
},false);
canvEle.addEventListener("touchmove",function(e){
	if(isDown){
		if(isPainting){
			if(isEraser){
				ctx.clearRect(e.touches[0].clientX-5,e.touches[0].clientY-5,10,10);
			}else{
				setCoordinate(newPosition,e.touches[0]);
				drawLine(newPosition.x,newPosition.y,oldPosition.x,oldPosition.y); 
				setCoordinate(oldPosition,e.touches[0]);
			}
			
		}
	}	
})
canvEle.addEventListener("touchend",function(e){
	isPainting = false; 
	isEraser = false;
	oldPosition.x = undefined;
	oldPosition.y = undefined;
})

clearBtn.addEventListener("touchstart",function(){
	ctx.clearRect(0,0,canvEle.width,canvEle.height);		
})

eraserBtn.addEventListener("touchstart",function(){
	isEraser = !isEraser;	
})
function drawLine(x1,y1,x0,y0){
	ctx.beginPath();
	ctx.moveTo(x0,y0);
	ctx.lineTo(x1,y1);
	ctx.closePath();
	ctx.stroke();
}
function setCoordinate(obj,event){
	obj.x = event.clientX;
	obj.y = event.clientY;
}

