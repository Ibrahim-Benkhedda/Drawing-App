// FIX selectedArea

function scissorsTool() {

  this.icon = "/assets/scissors.jpg";
  this.name = "Scissors";

  let self = this;


  this.selectMode = 0;

  // object to store the dimensions of the selected area
  if (self.selectMode == 0) {
    this.selectedArea_x = 0;
    this.selectedArea_y = 0;
    this.selectedArea_h = 100;
    this.selectedArea_w = 100;    
  }


  // creates HTML button for selectMode
  selectButton = createButton('Select Area');
  selectButton.parent('#scissors-tool');

  selectButton.mousePressed(function() {
    // event handler
    // console.log('Hello, im scissors');

    if (self.selectMode == 0) {

      self.selectMode++;
      selectButton.html('CUT');
      loadPixels(); // store current frame

    }
  })

  this.draw = function() {
    if (mouseIsPressed) {
      if (self.selectMode == 1) {
        updatePixels();

        rect(
          self.selectedArea_x,
          self.selectedArea_y,
          self.selectedArea_w,
          self.selectedArea_h
        )

        noStroke();
        fill(255, 0, 0, 100);
      }
    }
  }


  this.drag = function(x, y) {
      this.x = x;
      this.y = y;

      if (self.selectMode == 1 && this.x != undefined && this.y != undefined) {
      let w = x - self.selectedArea_x;
      let h = x - self.selectedArea_y;

      self.selectedArea_x = w;
      self.selectedArea_y = h;

      console.log(`mouseDragged ${self.selectedArea_x}, ${self.selectedArea_y}`);
    }
  }


}
