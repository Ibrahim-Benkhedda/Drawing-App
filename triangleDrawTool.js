// https://editor.p5js.org/jeyv/sketches/6RCdX801A

function triangleDrawTool() {
  this.icon = "assets/triangle.jpg";
  this.name = "Triangle";

  let startMouseX = -1;
  let startMouseY = -1;
  let drawing = false;

  // draws triangle to the canvas
  this.draw = function() {

    // only draw when the mouse is Pressed
    if(mouseIsPressed) {
      // if it's the start of the drawing a new triangle
      if(startMouseX == -1) {
        startMouseX = mouseX;
        startMouseY = mouseY;
        drawing = true;
        // save the current pixel array
        loadPixels();
      }
      else {
        // update the screen with the saved pixels to hide any previous triangle
        // between mouse pressed and released
        updatePixels();
        // draw the Triangle
        noFill();
        strokeWeight(5);

        
        triangle(
          startMouseX,
          startMouseY,
          (startMouseX + mouseX) / 2,
          mouseY - (mouseY / 2),
          mouseX,
          mouseY
        );
      }
    }

    else if (drawing) {
      // save the pixels with the most recent triangle and reset the
      // drawing bool and start locations
      loadPixels();
      drawing = false;
      startMouseX = -1;
      startMouseY = -1;
    }
  }
}
