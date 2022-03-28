// https://p5js.org/reference/#/p5/createFileInput

function stampTool() {
  this.icon = "assets/stamp.jpg";
  this.name = "Stamp";

  let imgSizeSlider;
  let nImgSlider;
  let imgSizeDisplay
  let nImgValDisplay;
  let img;
  let input;


  // a function where the user can import local image
  function handleFile(file) {
    print(file);
    // if the user imported file is type of image, create the image else return img null
    if (file.type === "image") {
      img = createImg(file.data, '');
      img.hide();
    } else {
      img = null;
    }

  }

  // draws the images
  this.draw = function() {
    let imgSizeVal = imgSizeSlider.value();
    let nImgVal = nImgSlider.value();
    nImgValDisplay.html(`Number ${nImgVal}`);
    imgSizeDisplay.html(`Size ${imgSizeVal}`);

    if (mouseIsPressed && helpers.mousePressOnCanvas(c)) {
      // count the number of img to draw
      for (let i = 0; i < nImgSlider.value(); i++) {
        let imgSize = imgSizeSlider.value();
        let imgX = random((mouseX - imgSize / 2) - 10, (mouseX - imgSize / 2) + 10 );
        let imgY = random((mouseY - imgSize / 2) - 10, (mouseY - imgSize / 2) + 10 );
        // if the user imported local img, display the image, else use default image
        if (img != null) {
          currentImg = img; // stores user local image to display in the UI
          image(img, imgX, imgY, imgSize, imgSize);
        } else {
          currentImg = crystal_img; // stores preset image to display in the UI
          image(crystal_img, imgX, imgY, imgSize, imgSize);
        }

      }

    }
  }

  // adds HTML
  this.populateOptions = function() {
    // adds a slider for image size
    imgSizeSlider = createSlider(5, 1080, 10);
    imgSizeSlider.style('width', '200px');
    imgSizeSlider.position(450, windowHeight - 120);

    // adds a slider for number of images
    nImgSlider = createSlider(1, 20, 5);
    nImgSlider.style('width', '200px');
    nImgSlider.position(450, windowHeight - 140);

    // creates file input
    input = createFileInput(handleFile);
    input.position(475, windowHeight -100);

    // display number of images value
    nImgValDisplay = createP('');
    nImgValDisplay.position(350, windowHeight - 162.5);

    // display size of images
    imgSizeDisplay = createP('');
    imgSizeDisplay.position(350, windowHeight - 142)


  }

  // hides the HTML elements when the tool is unselected
  this.unselectTool = function() {
    imgSizeSlider.hide();
    nImgSlider.hide();
    input.hide();
    imgSizeDisplay.hide();
    nImgValDisplay.hide();

  }



}
