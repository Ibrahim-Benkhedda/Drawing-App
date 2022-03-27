function stampTool() {
  this.icon = "assets/crystal.png";
  this.name = "Stamp";

  let imgSizeSlider;
  let imgSizeVal
  let nImgSlider;
  let nImgVal;


  this.populateOptions = function() {
    // adds a slider for image size
    imgSizeSlider = createSlider(5, 50, 10);
    imgSizeSlider.style('width', '200px');
    imgSizeSlider.position(450, windowHeight - 120);

    // adds a slider for number of images
    nImgSlider = createSlider(1, 20, 5);
    nImgSlider.style('width', '200px');
    nImgSlider.position(450, windowHeight - 140);


  }

  this.unselectTool = function() {
    imgSizeSlider.hide();
    nImgSlider.hide();

  }

  this.draw = function() {
    imgSizeVal = imgSizeSlider.value();
    nImgVal = nImgSlider.value();
    if (mouseIsPressed) {
      // count the number of img to draw
      for (let i = 0; i < nImgSlider.value(); i++) {
        let imgSize = imgSizeSlider.value();
        let imgX = random((mouseX - imgSize / 2) - 10, (mouseX - imgSize / 2) + 10 );
        let imgY = random((mouseY - imgSize / 2) - 10, (mouseY - imgSize / 2) + 10 );
        image(crystal_img, imgX, imgY, imgSize, imgSize);
      }

    }
  }

}
