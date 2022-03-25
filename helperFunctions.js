function HelperFunctions() {

	//Jquery click events. Notice that there is no this. at the
	//start we don't need to do that here because the event will
	//be added to the button and doesn't 'belong' to the object

	//event handler for the clear button event. Clears the screen
	select("#clearButton").mouseClicked(function() {
		background(255, 255, 255);
		//call loadPixels to update the drawing state
		//this is needed for the mirror tool
		loadPixels();
	});

	//event handler for the save image button. saves the canvsa to the
	//local file system.
	select("#saveImageButton").mouseClicked(function() {
		saveCanvas("myPicture", "jpg");
	});

	// event handler for the undo canvas button. undo the canvas state to the
	// previous state
	select('#undoCanvasButton').mouseClicked(function() {
		switchCanvas.undoState();
	})
	// event handler for the redo canvas button. redo the canvas state to the
	// previous state
	select('#redoCanvasButton').mouseClicked(function() {
		switchCanvas.redoState();
	})

	c.mousePressed(function() {
		if (toolbox.selectedTool.name == "Scissors") {
			// console.log(`mouseX : ${scissor.selectedArea_x}, mouseY : ${scissor.selectedArea_y}`);
			if (scissor.selectMode == 1) {
				scissor.selectedArea_x = mouseX;
				scissor.selectedArea_y = mouseY;
			}
		}

		// set the properties of switchCanvas class to default
		if (switchCanvas.previousStates.length > switchCanvas.n) {
	  	switchCanvas.default();
	  }
		// when mouse is clicked, save the state of the canvas
	  switchCanvas.saveState();

	})



}
