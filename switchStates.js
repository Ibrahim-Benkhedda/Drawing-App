// Explanation 

class SwitchStates {
  constructor() {
    this.previousStates = []; // saves the states of the canvas
    this.n = null; // length of the array of previousStates

    // boolean variables to check whether undo/redo functionality is activated
    this.redo = false;
    this.undo = false;

    this.counter = 0;
    this.stateIndex = 0; // index of the current of the state of the canvas

    self = this
  }

  switchState() {
    // if the previousStates is null return the function
    if (self.previousStates == null || self.stateIndex == null) {
      return;
    }
    // if the user is undoing the canvas and stateIndex is a positive integer
    if (self.undo == true && self.stateIndex >= 0 && self.redo == false) {
      self.counter++;
      if (self.redo == false && self.counter == 1) {
        self.stateIndex = self.n - self.counter;
      } else {
        self.stateIndex = self.stateIndex - 1;
      }
    } else if (self.stateIndex <= self.n && self.redo == true) {
      self.stateIndex = self.stateIndex + 1;
    }

    console.log(`Index: ${self.stateIndex} - Array [${self.n}]`);

    // draws the previous state of the canvas
    if (self.stateIndex < self.n && self.stateIndex >= 0) {
      image(self.previousStates[self.stateIndex], 0, 0);
    }
  }

  undoState() {
    self.undo = true;
    self.redo = false;
    self.n = self.previousStates.length;
    self.switchState();
  }

  redoState() {
    self.redo = true;
    self.n = self.previousStates.length;
    self.switchState();
  }

  default() {
    // sets the switchStates class properties to default settings
    self.counter = 0;
    self.stateIndex = 0;
    self.undo = false;
    self.redo = false;
  }

  saveState() {
    // save the state of the canvas by getting every pixel of the canvas using
    // get() and then push into the previousStates array to access the states
    // of the canvas
    let previousState = get();
    self.previousStates.push(previousState);
  }


}
