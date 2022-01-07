
function RectangleDrawTool() {
  this.icon = "assets/rectangle.jpg";
  this.name = "Rectangle";


  var startMouseX = - 1;
  var startMouseY = - 1;
  var drawing = false;

  // draws rectanle to the screen
  this.draw = function() {
    // only draw when the mouse is pressed
    if(mouseIsPressed) {
      if(startMouseX == -1) {
        startMouseX = mouseX;
        startMouseY = mouseY;
        drawing = true;
        //save the current pixel array
        loadPixels();
      }
      else {
        updatePixels();
        //draw rectangle shape
        strokeWeight(2);
        noFill();
        rect(startMouseX, startMouseY, mouseX - startMouseX, mouseY - startMouseY);
      }
    }

    else if(drawing) {
      loadPixels();
      drawing = false;
      startMouseX = -1;
      startMouseY = -1;
    }
  }

};
