// https://github.com/shiffman/LearningProcessing/blob/master/chp15_images_pixels/exercise_15_07_image_processing/exercise_15_07_image_processing.pde

class FiltersTool {
  // store all possible avaible filters and if the filter have slider,
  // it stores slider method which enable the current filter slider and hide others

  constructor() {

    self = this
    // public properties
    this.name = "FilterTool";
    this.icon = "assets/filter.jpg";
    let isPressed;
    // private
    let selectFilter;
    let commitFilterBtn;

    let blurSlider;
    let posterizeSlider;

    let filters = [
      {name: 'Invert'},
      {name: 'Blur', slider() {blurSlider.show(); posterizeSlider.hide()}},
      {name: 'Posterize', slider() {posterizeSlider.show(); blurSlider.hide()}},
      {name: 'Erode'},
      {name: 'Gray'},
      {name: 'ASCII'}
    ]

    // COMMIT THE FILTER TO THE CANVAS
    this.draw = function() {
      // store the current filter name
      let name = selectFilter.value();; // identitfy the name of the filter

      // if the user pressed the commit button, display and commit the current filter
      // in the canvas
      for (let i in filters) {
        // checks if a filter have sliders
        if (filters[i].name == name && 'slider' in filters[i]) {
          // display the filter sliders/HTML elements in the UI and break from the loop
          console.log('has slider');
          filters[i].slider();
          break;
        }
        // if the filter doesn't have slider
        else if (!('slider' in filters[i])) {
          // hide sliders
          blurSlider .hide();
          posterizeSlider.hide();
        }
      }


      if (isPressed) {
        console.log('condition activated')
        // --- chekcs the id which is the name of the filter and call filter's function --- //
        switch (name) {
          case 'Invert':
            console.log('INVERT Activated...');
            this.invertPixels();
            break;
          case 'Blur':
            console.log('BLUR...');
            this.blurPixels();
            break;
          case 'Posterize':
            console.log('Posterize...')
            this.posterizePixels(10)
            break;
          case 'Erode':
            console.log('ERODE...')
            this.erodePixels(125);
            break;
          case 'Gray':
            console.log('GRAY...')
            this.grayPixels();
            break;
          case 'ASCII':
            console.log('ASCII...');
            this.asciiPixels();
            break;
          default:
            // return null;
            console.log('NOTHING...');
        }

        isPressed = false;
      }

      // chekcs if the user clicked on the commit button then set isPressed boolean
      // variable to true
      commitFilterBtn.mousePressed(() => isPressed = true);

      return true
    }

    this.populateOptions = function() {
      // DOM for drop down menu
      selectFilter = createSelect();
      selectFilter.size(100, 35);
      selectFilter.position(400, windowHeight - 125);

      // Display all the possible filters in the drop down menu from the filters
      // array of objects
      for (let i in filters) {
        selectFilter.option(`${filters[i].name}`);
      }

      // DOM for Commit button
      commitFilterBtn = createButton('Draw Filter');
      commitFilterBtn.position(500, windowHeight - 125);
      commitFilterBtn.size(200, 35);

      // FILTERS HTML ELEMENTS

      // BLUR DOM
      blurSlider  = createSlider(0, 4);
      blurSlider.position(410, windowHeight - 75);
      blurSlider.size(300);
      blurSlider.hide();

      // POSTERIZE DOM
      posterizeSlider = createSlider(2, 255);
      posterizeSlider.position(410, windowHeight - 75);
      posterizeSlider.size(300);
      posterizeSlider.hide();
    }

    this.unselectTool = function() {
      blurSlider.hide();
      posterizeSlider.hide();
      selectFilter.hide();
      commitFilterBtn.hide();
    }

  }



  //  --- ALL FILTERS FUNCTIONALITY --- //

  invertPixels() {
    console.log('inverting...')
    filter(INVERT);
  }

  blurPixels() {
    console.log('blurring...')
    let val = blurSlider.value();
    filter(BLUR, val);
  }

  posterizePixels(num) {
    console.log('posterizing...')
    this.num = num;
    if (this.num > 0 && this.num < 255); {
      filter(POSTERIZE, num);
    }
  }

  erodePixels() {
    console.log('eroding...')
    filter(ERODE);
  }

  grayPixels() {
    console.log('GRAY')
    filter(GRAY);
  }

  // REFRENCE: ASCII FILTER P439 PDF CREATING PROCEDURAL PROCESSING
  asciiPixels() {
    textSize(10);
    for (let y = 0; y < c.height; y += 10) {
      for (let x = 0; x < c.width; x += 10) {
        let b = brightness(get(x, y))
        fill(255);
        if (b < 10) {
          fill(255);
          text("0", x, y)
        }
        else if (b < 30) {
          text("1", x, y);
        }
        else if (b < 180) {
          text(".", x, y);
        }
      }
    }
  }


}
