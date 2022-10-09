// https://p5js.org/examples/dom-input-and-button.html
// https://stackoverflow.com/questions/3368837/list-every-font-a-users-browser-can-display

// 1-creates slider, drop down menu for font family, font style
// 2-creates input field
// 3-insert text in the input field
// 4-user can customize the text with the HTML elments that are created
// 5-if users click on the generate button, then the user can click on the canvas to display the text


class TextTool {

  constructor() {
    this.name = "TextTool";
    this.icon = "assets/text.png";

    self = this

    // list of font familyies that are avaible in every Operating system by default
    const fontList = ['Arial',
    'Arial Black',
    'Bahnschrift',
    'Calibri',
    'Cambria',
    'Cambria Math',
    'Candara',
    'Comic Sans MS',
    'Consolas',
    'Constantia',
    'Corbel',
    'Courier New',
    'Ebrima',
    'Franklin Gothic Medium',
    'Gabriola',
    'Gadugi',
    'Georgia',
    'HoloLens MDL2 Assets',
    'Impact',
    'Ink Free',
    'Javanese Text',
    'Leelawadee UI',
    'Lucida Console',
    'Lucida Sans Unicode',
    'Malgun Gothic',
    'Marlett',
    'Microsoft Himalaya',
    'Microsoft JhengHei',
    'Microsoft New Tai Lue',
    'Microsoft PhagsPa',
    'Microsoft Sans Serif',
    'Microsoft Tai Le',
    'Microsoft YaHei',
    'Microsoft Yi Baiti',
    'MingLiU-ExtB',
    'Mongolian Baiti',
    'MS Gothic',
    'MV Boli',
    'Myanmar Text',
    'Nirmala UI',
    'Palatino Linotype',
    'Segoe MDL2 Assets',
    'Segoe Print',
    'Segoe Script',
    'Segoe UI',
    'Segoe UI Historic',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'SimSun',
    'Sitka',
    'Sylfaen',
    'Symbol',
    'Tahoma',
    'Times New Roman',
    'Trebuchet MS',
    'Verdana',
    'Webdings',
    'Wingdings',
    'Yu Gothic',
    ]

    // list of all font styles
    let styleList = ['Normal', 'Italic', 'Bold', 'BOLDITALIC'];

    let inputT, button, textInsert, str, currentFont, currentSize, currentStyle, selectFont, selectStyle, sizeSlider, sizeDisplay;

    // function that gets the input text of the user
    function inputText() {
      str = inputT.value(); // get text input value as a string
      inputT.value('');
      fill(0);
    }

    this.draw = function() {
      // gets and display the current value of the sliders and drop down menus
      currentFont = selectFont.value();
      textFont(`${currentFont}`);
      currentSize = sizeSlider.value();
      sizeDisplay.html(`${currentSize}`);
      currentStyle = selectStyle.value();

      // checks which which style has the user selected and set it to textStyle
        currentStyle == 'Italic' ? textStyle(ITALIC):
        currentStyle == 'Bold' ? textStyle(BOLD) :
        currentStyle == 'BOLDITALIC' ? textStyle(BOLDITALIC) : textStyle(NORMAL);
      // display the INPUT text
      if (mouseIsPressed) {
        if (str != null && helpers.mousePressOnCanvas(c)) {
          textSize(currentSize);
          text(str, mouseX, mouseY);
        }
      }
    }

    this.populateOptions = function() {
      // creates input Field
      inputT = createInput();
      inputT.size(350, 50);
      inputT.position(400, windowHeight - 132.5);

      // drop down menu to select a font
      selectFont = createSelect();
      selectFont.position(410, windowHeight - 70);
      selectFont.size(200, 35)
      for (let i in fontList) {
        let name = fontList[i]
        selectFont.option(`${name}`);
      }

      // create button to display the input text
      button = createButton('GENERATE');
      button.position(775, windowHeight - 130);
      button.size(100, 50)
      button.mousePressed(inputText);

      // HEADER for the text insert
      textInsert = createElement('h3', 'Type here: ');
      textInsert.position(400, windowHeight - 170);

      // font size slider
      sizeSlider = createSlider(8, 256, 16, 1);
      sizeSlider.position(450, windowHeight - 25);
      sizeSlider.style('width', '256px');

      sizeDisplay = createP('');
      sizeDisplay.position(420, windowHeight - 46);

      // create drop down menu to select text style
      selectStyle = createSelect();
      selectStyle.position(625, windowHeight - 67.5);
      selectStyle.size(125, 30);
      for (let i in styleList) {
        let name = styleList[i]
        selectStyle.option(name);
      }
    }

    this.unselectTool = function() {
      // hides all the HTML elements of this tool
      inputT.hide();
      selectFont.hide();
      button.hide();
      textInsert.hide();
      sizeSlider.hide();
      sizeDisplay.hide();
      selectStyle.hide();
    }

  }


}