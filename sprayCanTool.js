function SprayCanTool(){

	this.name = "sprayCanTool";
	this.icon = "assets/sprayCan.jpg";

	let points = 13;
	let spread = 10;

	this.draw = function(){
		let r = random(5,10);
		if(mouseIsPressed){
			for(let i = 0; i < points; i++){
				point(random(mouseX-spread, mouseX + spread), random(mouseY-spread, mouseY+spread));
			}
		}
	};
}
