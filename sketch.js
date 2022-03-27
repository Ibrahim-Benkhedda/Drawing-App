//global variables that will store the toolbox colour palette
//amnd the helper functions
var toolbox = null;
var colourP = null;
var helpers = null;
var switchCanvas = null;

var bezierTool;

// images
var crystal_img;
var c;

function preload() {
	crystal_img = loadImage('./assets/crystal.png');
}


function setup() {

	//create a canvas to fill the content div from index.html
	canvasContainer = select('#content');
	c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
	c.parent("content");

	//create helper functions and the colour palette
	helpers = new HelperFunctions();
	colourP = new ColourPalette();

	//create a toolbox for storing the tools
	toolbox = new Toolbox();

	bezierTool = new BezierDrawTool();

	//add the tools to the toolbox.
	toolbox.addTool(new FreehandTool());
	toolbox.addTool(new LineToTool());
	toolbox.addTool(new SprayCanTool());
	toolbox.addTool(new mirrorDrawTool());

	toolbox.addTool(new RectangleDrawTool());
	toolbox.addTool(new ellipseDrawTool());
	toolbox.addTool(new triangleDrawTool());

	toolbox.addTool(new editableShapeTool());
	toolbox.addTool(new FiltersTool());
	toolbox.addTool(bezierTool);
	toolbox.addTool(new stampTool());
	toolbox.addTool(new TextTool());

	switchCanvas = new SwitchStates();

	background(255);

	// save the beginning state of the canvas
	switchCanvas.saveState();

}

function draw() {
	//call the draw function from the selected tool.
	//hasOwnProperty is a javascript function that tests
	//if an object contains a particular method or property
	//if there isn't a draw method the app will alert the user
	if (toolbox.selectedTool.hasOwnProperty("draw")) {
		toolbox.selectedTool.draw();
	} else {
		alert("it doesn't look like your tool has a draw method!");
	}

}


function mouseReleased() {
  // // when the user draw for the first time or after commiting the bezier curve to the canvas
  // // set the default settings to false
  if (toolbox.selectedTool.hasOwnProperty('switch')) {
    toolbox.selectedTool.switch();
  }
}

function keyPressed(e) {
	// checks if the user used CTRL OR CMND + Z
	if (e.keyCode == 90 && (e.ctrlKey || e.metaKey)) {
		// undo the state of the canvas
    switchCanvas.undoState();
  }
	// checks if the user used CTRL OR CMND + Y
  if (e.keyCode == 89 && (e.ctrlKey || e.metaKey)) {
		// redo the state of the canvas
    switchCanvas.redoState();
  }
}
