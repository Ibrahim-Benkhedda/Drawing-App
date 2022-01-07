function ellipseDrawTool() {
  this.icon = "assets/ellipse.jpg";
  this.name = "Ellipse";

  let startMouseX = -1;
  let startMouseY = -1;
  let drawing = false;

  // draws ellipse to the canvas
  this.draw = function() {

    // only draw when the mouse is Pressed
    if(mouseIsPressed) {
      // if it's the start of the drawing a new ellipse
      if(startMouseX == -1) {
        startMouseX = mouseX;
        startMouseY = mouseY;
        drawing = true;
        // save the current pixel array
        loadPixels();
      }
      else {
        // update the screen with the saved pixels to hide any previous ellipse
        // between mouse pressed and released
        updatePixels();
        // draw the Ellipse
        noFill();
        strokeWeight(2);
        ellipse(startMouseX, startMouseY, mouseX - startMouseX, mouseY - startMouseY);
      }
    }

    else if (drawing) {
      // save the pixels with the most recent ellipse and reset the
      // drawing bool and start locations
      loadPixels();
      drawing = false;
      startMouseX = -1;
      startMouseY = -1;
    }
  }


};
