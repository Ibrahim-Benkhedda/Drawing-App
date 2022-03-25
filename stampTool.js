function stampTool() {
  this.icon = "assets/crystal.png";
  this.name = "Stamp";

  let imgSizeSlider;
  let nImgSlider;

  // adds a slider
  imgSizeSlider = createSlider(5, 50, 10);
  imgSizeSlider.style('width', '200px');
  imgSizeSlider.parent('#xSlider');

  nImgSlider = createSlider(1, 20, 5);
  nImgSlider.style('width', '200px');
  nImgSlider.parent('#nSlider');


  this.draw = function() {
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
