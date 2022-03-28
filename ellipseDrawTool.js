function ellipseDrawTool() {
  this.icon = "assets/ellipse.jpg";
  this.name = "Ellipse";

  let startMouseX = -1;
  let startMouseY = -1;
  let drawing = false;

  const isFill = ['Fill', 'noFill'];
  let selectFill;

  // draws ellipse to the canvas
  this.draw = () => {

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
        strokeWeight(3);

        selectFill.value() == "Fill" ? fill(colourP.selectedColour) : noFill();

        ellipse(startMouseX, startMouseY, mouseX - startMouseX, mouseY - startMouseY);
        noFill();
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
};
