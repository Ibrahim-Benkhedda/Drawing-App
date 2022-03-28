// https://editor.p5js.org/jeyv/sketches/6RCdX801A

function triangleDrawTool() {
  this.icon = "assets/triangle.jpg";
  this.name = "Triangle";

  let startMouseX = -1;
  let startMouseY = -1;
  let drawing = false;

  const isFill = ['Fill', 'noFill'];
  let selectFill;

  // draws triangle to the canvas
  this.draw = () => {

    // only draw when the mouse is Pressed and the mouseY is not on the UI
    if(mouseIsPressed && mouseY < windowHeight - 180) {
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
        strokeWeight(3);

        selectFill.value() == "Fill" ? fill(colourP.selectedColour) : noFill();

        triangle(
          startMouseX,
          startMouseY,
          (startMouseX + mouseX) / 2,
          mouseY - (mouseY / 4),
          mouseX,
          mouseY
        );

        noFill();
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

  this.populateOptions = () => {
    selectFill = createSelect();
    selectFill.size(100, 35);
    selectFill.position(400, windowHeight - 125);

    // Display all the possible filters in the drop down menu from the filters
    // array of objects
    for (let i in isFill) {
      selectFill.option(`${isFill[i]}`);
    }
  }

  this.unselectTool = () => {
    selectFill.hide();
  }
}
