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

// function that gets the input text of the user


function stampTool() {
  this.icon = "assets/stamp.jpg";
  this.name = "Stamp";

  let imgSizeSlider;
  let imgSizeVal
  let nImgSlider;
  let nImgVal;
  let img;
  let input;


  this.populateOptions = function() {
    // adds a slider for image size
    imgSizeSlider = createSlider(5, 1080, 10);
    imgSizeSlider.style('width', '200px');
    imgSizeSlider.position(450, windowHeight - 120);

    // adds a slider for number of images
    nImgSlider = createSlider(1, 20, 5);
    nImgSlider.style('width', '200px');
    nImgSlider.position(450, windowHeight - 140);

    input = createFileInput(handleFile);
    input.position(475, windowHeight -100);


  }

  function handleFile(file) {
    print(file);
    if (file.type === "image") {
      img = createImg(file.data, '');
      img.hide();
    } else {
      img = null;
    }

  }

  this.unselectTool = function() {
    imgSizeSlider.hide();
    nImgSlider.hide();
    input.hide();

  }

  this.draw = function() {
    imgSizeVal = imgSizeSlider.value();
    nImgVal = nImgSlider.value();

    if (mouseIsPressed && mousePressOnCanvas(c)) {
      // count the number of img to draw
      for (let i = 0; i < nImgSlider.value(); i++) {
        let imgSize = imgSizeSlider.value();
        let imgX = random((mouseX - imgSize / 2) - 10, (mouseX - imgSize / 2) + 10 );
        let imgY = random((mouseY - imgSize / 2) - 10, (mouseY - imgSize / 2) + 10 );
        if (img != null) {
          image(img, imgX, imgY, imgSize, imgSize);
        } else {
          image(crystal_img, imgX, imgY, imgSize, imgSize);
        }

      }

    }
  }

}
