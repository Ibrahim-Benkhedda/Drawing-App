
function mousePressOnCanvas(c) {
  if (
			mouseX > c.elt.offsetLeft && mouseX < (c.elt.offsetLeft + c.width) &&
			mouseY > c.elt.offsetTop  && mouseY < (c.elt.offsetTop  + c.height)
		) {
			// the mouse pressed is on the canvas therefore, returns true
			return true
		}
		// the mouse pressed is not on the canvas therefore, returns false
		return false;
}


// draws bezier curve

class BezierDrawTool {
  constructor() {
    this.icon = "assets/vector.jpg";
    this.name = "BezierCurve";

    let startMouseX = -1;
    let startMouseY = -1;
    let isDrawing = false;

    let editMode = false;
    let defaultSettings = true;

    let commitButton;

    let stack = [];
    let points = [];


    let startX;
    let startY;
    let endX;
    let endY;

    let x1, x2, y1, y2;

    this.draw = function() {
      if (mouseIsPressed && mousePressOnCanvas(c)) {

        if (startMouseX == - 1) {
          startMouseX = mouseX;
          startMouseY = mouseY;

          isDrawing = true;
          editMode = true;
          defaultSettings = true;

          // save the current Pixel array
          loadPixels();
        }
        else {
          stack.pop(); // pop the previous coordinate values

          points = [] // empty the stack

          updatePixels();

          // stack that stores coordinates so that later on we can draw bezier curve
          // without the edit points and vertices
          stack.push({
            startX: startMouseX,
            startY: startMouseY,
            endX: mouseX,
            endY: mouseY
          })



          // draw bezier curve
          drawBezier(startMouseX, startMouseY, mouseX, mouseY);

        }
      }

      else if (isDrawing && !editMode) {
        updatePixels();
        // draw the bezier curve without the displaying the edit properties
        drawBezier(stack[0].startX, stack[0].startY, stack[0].endX, stack[0].endY);
        loadPixels();
        // set settings to default
        points = [];
        isDrawing = false;
        startMouseX = -1;
        startMouseY = -1;
      }
    }

    function switchMode() {
      if (editMode && isDrawing == true) {
        console.log('commit intialed...');
        editMode = false;
      }
    }

    function drawBezier(startMouseX, startMouseY, mouseX, mouseY) {

      noFill();
      strokeWeight(5);

      // default settings of the bezier curve control points
      if (defaultSettings) {
        endX = mouseX;
        endY = mouseY;

        startX = startMouseX;
        startY = startMouseY;

        let bezierDistance = endX - startMouseX; // distance of the bezier curve from intial point to final point

        x1 = startMouseX + bezierDistance * 0.20; // x position of of first control point position of the cubic curve
        x2 = startMouseX + bezierDistance * 0.80; // x position of the second control point position of the cubic curve

        y1 = startMouseY - (startMouseY * 0.25);
        y2 = startMouseY + (endY * 0.25);

      }

      // push the most recent points x and y coordinates
      points.push({x: startX , y: startY})
      points.push({x: x1 , y: y1})
      points.push({x: x2 , y: y2})
      points.push({x: endX , y: endY})

      // checks whether the user intialized the curve yet so we can modify the control points of the curve
      if (!defaultSettings) {
        // loops through the array of points
        for (let i in points) {
          // chekcs whether current user mouseX and mouseY are near the control points
          if (dist(points[i].x, points[i].y, mouseX, mouseY) < 30)  {
            // update the intial point to mouseX and mouseY
            if (i == 0) {
              startX = mouseX;
              startY = mouseY;
            }
            // update the first control point to the current mouseX and mouseY position
            if (i == 1) {
              x1 = mouseX;
              y1 = mouseY;
            }
            // update the second control point to the current mouseX and mouseY position
            if (i == 2) {
              x2 = mouseX;
              y2 = mouseY;
            }
            // update the last control point to the current mouseX and mouseY position
            if (i == 3) {
              endX = mouseX;
              endY = mouseY;
            }
          }
        }
      }

      // function that draws bezier cruve
      bezier(startX, startY, x1, y1, x2, y2, endX, endY);


      // checks whether edit mode is ON or OFF, if ON then draw edit mode tools,
      // if not, don't draw edit mode tools
      if (editMode) {
        // display tangent lines
        strokeWeight(2);
        stroke(255, 0, 0);
        line(startX, startY, x1, y1);
        line(x1, y1, x2, y2);
        line(x2, y2, endX, endY);

        // display control points
        stroke(0, 0, 255);
        strokeWeight(15);
        point(startX, startY);
        point(x1, y1);
        point(x2, y2);
        point(endX, endY);
        stroke(0);
      }
    }


    this.populateOptions = function() {
      commitButton = createButton('Commit Shape');
      commitButton.position(450, windowHeight - 115);
      commitButton.size(150, 50);
      commitButton.mousePressed(switchMode);
    }

    this.unselectTool = function() {
      commitButton.hide();
    }

    this.switch = function() {
      // when the user draw for the first time or after commiting the bezier curve to the canvas
      // set the default settings to false
      if (editMode && defaultSettings) {
        defaultSettings = false;
      }
    }

  }


}
