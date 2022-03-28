function RectangleDrawTool() {
  this.icon = "assets/rectangle.jpg";
  this.name = "Rectangle";


  let startMouseX = - 1;
  let startMouseY = - 1;
  let drawing = false;

  const isFill = ['Fill', 'noFill'];
  let selectFill;

  // draws rectanle to the screen
  this.draw = () => {
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
        strokeWeight(3);
        noFill();

        selectFill.value() == "Fill" ? fill(colourP.selectedColour) : noFill();

        rect(startMouseX, startMouseY, mouseX - startMouseX, mouseY - startMouseY);
        noFill();
      }
    }

    else if(drawing) {
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
