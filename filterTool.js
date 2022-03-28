class FiltersTool {
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
    let blurValDisplay;
    let posterizeSlider;
    let posterizeValDisplay;

    // store all possible avaible filters name and if the filter have slider,
    // it stores slider method which enable the current filter slider and hide others
    let filters = [
      {name: 'Invert'},
      {name: 'Blur', slider() {blurSlider.show(); blurValDisplay.show(); posterizeSlider.hide(); posterizeValDisplay.hide()}},
      {name: 'Posterize', slider() {posterizeSlider.show(); posterizeValDisplay.show(); blurSlider.hide(); blurValDisplay.hide();}},
      {name: 'Erode'},
      {name: 'Gray'},
      {name: 'ASCII'}
    ]

    // COMMIT THE FILTER TO THE CANVAS
    this.draw = function() {
      // store the current filter name
      let name = selectFilter.value(); // identitfy the name of the filter
      // get the value of the slider and display it
      let blurVal = blurSlider.value();
      let postVal = posterizeSlider.value();
      blurValDisplay.html(`Intensity ${blurVal}`);
      posterizeValDisplay.html(`Value ${postVal}`);


      // if the user pressed the commit button, display and commit the current filter
      // in the canvas
      for (let i in filters) {
        // checks if a filter have sliders
        if (filters[i].name == name && 'slider' in filters[i]) {
          // display the filter sliders/HTML elements in the UI and break from the loop
          filters[i].slider();
          break;
        }
        // if the filter doesn't have slider
        else if (!('slider' in filters[i])) {
          // hide sliders and their values
          blurSlider .hide();
          posterizeSlider.hide();
          blurValDisplay.hide();
          posterizeValDisplay.hide();
        }
      }


      if (isPressed) {
        // --- chekcs the id which is the name of the filter and call filter's function --- //
        switch (name) {
          case 'Invert':
            invertPixels();
            break;
          case 'Blur':
            blurPixels();
            break;
          case 'Posterize':
            posterizePixels()
            break;
          case 'Erode':
            erodePixels();
            break;
          case 'Gray':
            grayPixels();
            break;
          case 'ASCII':
            asciiPixels();
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
      commitFilterBtn = createButton('Apply Filter');
      commitFilterBtn.position(500, windowHeight - 125);
      commitFilterBtn.size(200, 35);

      // FILTERS HTML ELEMENTS

      // BLUR DOM
      blurSlider  = createSlider(0, 4);
      blurSlider.position(450, windowHeight - 75);
      blurSlider.size(300);
      blurSlider.hide();

      blurValDisplay = createP('');
      blurValDisplay.position(300, windowHeight - 97.5);
      blurValDisplay.hide();


      // POSTERIZE DOM
      posterizeSlider = createSlider(2, 255);
      posterizeSlider.position(450, windowHeight - 75);
      posterizeSlider.size(300);
      posterizeSlider.hide();

      posterizeValDisplay = createP('');
      posterizeValDisplay.position(300, windowHeight - 97.5);
      posterizeValDisplay.hide();
    }

    this.unselectTool = function() {
      blurSlider.hide();
      posterizeSlider.hide();
      selectFilter.hide();
      commitFilterBtn.hide();
      blurValDisplay.hide();
      posterizeValDisplay.hide();
    }

    //  --- ALL FILTERS FUNCTIONALITY --- //

    function invertPixels() {
      filter(INVERT);
    }

    function blurPixels() {
      let val = blurSlider.value();
      filter(BLUR, val);
    }

    function posterizePixels() {
      let val = posterizeSlider.value();
      filter(POSTERIZE, val);

    }

    function erodePixels() {
      filter(ERODE);
    }

    function grayPixels() {
      filter(GRAY);
    }

    // REFRENCE: ASCII FILTER P439 PDF CREATING PROCEDURAL PROCESSING

    // a filter that turns the canvas into an ASCII/Binary Art,
    // works best with high contrast picture
    function asciiPixels() {
      textSize(10);
      for (let y = 0; y < c.height; y += 10) {
        for (let x = 0; x < c.width; x += 10) {
          let b = brightness(get(x, y))
          noStroke();
          fill(255);
          // if the brightness of the colour is less than 10 draw 0s
          if (b < 10) {
            fill(255);
            text("0", x, y);
          }
          // if the brightness of the colour is less than 30 draw 1s
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


}
