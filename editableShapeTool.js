// * plot out a custom shape as a series of vertices
// * add a button that switches between editing and creating vertices
// * when the edit mode is on, highlight to userr where the vertices location are by
//   using the distance function
// * before confirming the shape, add a vertex to an array to draw
// * confirm the final shape

function editableShapeTool() {
  this.icon = "./assets/polygon.jpg";
  this.name = "EditableShape";

  let self = this

  let editButton;
  let finishButton;

  let editMode = false; // boolean variable to check whether the user is on Edit mode

  let currentShape = [];

  noFill();
  strokeWeight(2);
  // loads the pixels
  loadPixels();


  // detects whether the mouse is pressed on the canvas
	this.mousePressOnCanvas = function(canvas) {
		// detects if the mouse is press is on the canvas or not
		if (
			mouseX > canvas.elt.offsetLeft && mouseX < (canvas.elt.offsetLeft + canvas.width) &&
			mouseY > canvas.elt.offsetTop  && mouseY < (canvas.elt.offsetTop  + canvas.height)
		) {
			// the mouse pressed is on the canvas therefore, returns true
			return true
		}
		// the mouse pressed is not on the canvas therefore, returns false
		return false;
	}

  // Draws the shape
  this.draw = function() {
    updatePixels();
    if (mouseIsPressed && this.mousePressOnCanvas(c)) {
      // when the Edit mode is false
      if (!editMode) {
        // pushes the X and Y coordinate of the mouse to the vertex to the currentShape Array
        currentShape.push({
          x: mouseX,
          y: mouseY
        });
      }

      // look for where the location of mousePressed is, if it's near a vertex,
      // update the vertex's location to the current mouseX and y position
      else {
        // iterate over each vertex in the array
        for (let i = 0; i < currentShape.length; i++) {
          // if mouse X & Y near the currentShape X & Y
          if (dist(currentShape[i].x, currentShape[i].y, mouseX, mouseY) < 20) {
            // update the points
            currentShape[i].x = mouseX;
            currentShape[i].y = mouseY;
          }

        }

      }

    }
    // draws each vertex
    beginShape();
    for (let i = 0; i < currentShape.length; i++) {
      vertex(currentShape[i].x, currentShape[i].y);
      if (editMode) {
        fill('red');
        ellipse(currentShape[i].x, currentShape[i].y, 15);
        noFill();
      }
    }
    endShape();

  }

  this.populateOptions = function() {
    // creates HTML
    editButton = createButton('Edit Shape');
    editButton.size(125, 50);
    editButton.position(400, windowHeight - 100);


    finishButton = createButton('Finish Shape');
    finishButton.size(125, 50);
    finishButton.position(550, windowHeight - 100);

    // a function that switches the Edit mode around ON/OFF
    editButton.mousePressed(function() {
      // changes Edit mode to off when edit mode is on and changes the HTML Text
      if (editMode) {
        editMode = false;
        editButton.html('Edit Shape')



      } else {
        editMode = true;
        editButton.html('Add Vertices')
      }

    })

    // when mouse is pressed
    finishButton.mousePressed(function() {
      // save the canvas in the current state and clear out the array of vertices
      editMode = false;
      self.draw();

      loadPixels();
      currentShape = [];
      editMode = false;
      editButton.html('Edit Shape');

    })
  }

  this.unselectTool = function() {
    finishButton.hide();
    editButton.hide();
  }

}
