/*
 * twisted lines
 *
 * @author aadebdeb
 * @date 2017/02/04
 */

var colorPalete;
var colors;
var options = [];
var shortText;
var longText;
var type;
var waveWidth = 110;
var XMainMenu;
var waveCenter;
var mainMenuYPositions;

function setup() {

  /* -- SETUP FIELDS -- */
  colorPalete = [
    color(255, 0, 0),
    color(0, 255, 0),
    color(0, 0, 255)
  ];

  shortText = [
    'SW',
    'Prj',
    'Pic',
    'Exp'
  ];

  longText = [
    "STEFWORKS",
    "My projects",
    "My life in selfies",
    "My professional experience"
  ];

  colors = colorPalete.slice(0);

  waveCenter = windowHeight / 2 - 29;

  XMainMenu = windowWidth / 20;

  mainMenuYPositions = [
    waveCenter - waveWidth - 3 * waveWidth / 2,
    waveCenter - waveWidth - 2 * waveWidth / 2,
    waveCenter - waveWidth - waveWidth / 2,
    waveCenter,
    waveCenter + waveWidth + waveWidth / 2,
    waveCenter + waveWidth + 2 * waveWidth / 2,
    waveCenter + waveWidth + 3 * waveWidth / 2
  ];

  /* -------- */
  /* -- CREATE CANVAS -- */
  createCanvas(windowWidth, windowHeight - 10);
  /* -------- */

  /* --- CREATE MAIN MENU OPTIONS AND SET INITIAL POSITIONS --- */
  var _rootMenu = createButton(longText[0]).addClass("w3-button").addClass("w3-round-xxlarge").addClass("w3-black").addClass("w3-hover-black");
  _rootMenu.position(XMainMenu, mainMenuYPositions[3]).style('font-size', '20px');
  options.push(_rootMenu);

  var _projects = createButton(longText[1]).addClass("w3-button").addClass("w3-round-xxlarge").addClass("w3-hover-red");
  _projects.position(XMainMenu, mainMenuYPositions[4]).style('color', 'white').style('font-size', '20px').style('background-color', 'rgba(255, 0, 0, 0.5)');
  options.push(_projects);

  var _selfies = createButton(longText[2]).addClass("w3-button").addClass("w3-round-xxlarge").addClass("w3-hover-green");
  _selfies.position(XMainMenu, mainMenuYPositions[5]).style('color', 'black').style('font-size', '20px').style('background-color', 'rgba(0, 255, 0, 0.5)');
  options.push(_selfies);

  var _experience = createButton(longText[3]).addClass("w3-button").addClass("w3-round-xxlarge").addClass("w3-hover-blue");
  _experience.position(XMainMenu, mainMenuYPositions[6]).style('color', 'white').style('font-size', '20px').style('background-color', 'rgba(0, 0, 255, 0.5)');
  options.push(_experience);

  /* --------- */

  /* --- SETUP SCROLLING FUNCTIONALITY --- */

  /* ---------- */

  /* --- SETUP ONCLICK METHODS */

  _rootMenu.mousePressed(() => {
    mainMenuSelect(_rootMenu);
    hideAllContent();
  });
  _projects.mousePressed(() => {
    mainMenuSelect(_projects);
    hideAllContent();
    showContent(3);
  });
  _selfies.mousePressed(() => { mainMenuSelect(_selfies) });
  _experience.mousePressed(() => {
    mainMenuSelect(_experience);
    hideAllContent();
    showContent(2);
  });

  /* --------- */

  /* -- SETUP BLEND TYPE FOR THE WAVE ~ 0 is white back, 1 is black -- */
  type = 0;
}

function hideAllContent() {
  var i;
  for (i = 2; i < 4; i++) {
    select("#Section" + i).hide();
    select(".Content" + i).hide();
    select("#Demo" + i).hide();
  }
}

function showContent(htmlSectNumber) {
  select("#Section" + htmlSectNumber).position(options[0].size().width + 7, 0).style("z-index", "10").show().size(windowWidth - options[0].size().width - 20, windowHeight);
  select(".Content" + htmlSectNumber).show();
  select("#Demo" + htmlSectNumber).position(0, windowHeight - 100).show();
}

/* method that shifts the option positions so that the selected is in position 3 */
function mainMenuSelect(selected) {
  var currentX = XMainMenu;
  if (selected != options[0]) {
    currentX = 5;
    options.forEach((element) => {
      element.html(shortText[options.indexOf(element)]);
    })
  } else {
    options.forEach((element) => {
      element.html(longText[options.indexOf(element)]);
    })
  }
  var selectedIndex = options.indexOf(selected);
  var i;
  for (i = 0; i < options.length; i++) {
    options[i].position(currentX, mainMenuYPositions[3 - selectedIndex + i]);
  }
  colors = colorPalete.slice(0);
  if (selectedIndex != 0) {
    colors.splice(selectedIndex - 1, 1);
  }
}



function draw() {
  blendMode(BLEND);

  if (type == 0) {
    background(255);
    blendMode(EXCLUSION);
  } else {
    background(0);
    blendMode(SCREEN);
  }
  noFill();
  strokeWeight(46);
  colors.forEach(element => {
    stroke(element);
    i = colors.indexOf(element);
    beginShape();
    for (var w = -20; w < width + 20; w += 5) {
      var h = height / 2;
      var factor = frameCount;
      h += waveWidth * sin(w * 0.03 + factor * 0.07 + i * TWO_PI / 3) * pow(abs(sin(w * 0.001 + factor * 0.015)), 1);
      curveVertex(w, h);
    }
    endShape();
  });
  /* -- TRANSLATE OPTIONS TO RIGHT POSITION */
  /* for (var i = 0; i < 3; i++) {
    stroke(colors[i]);
    beginShape();
    for (var w = -20; w < width + 20; w += 5) {
      var h = height / 2;
      h += waveWidth * sin(w * 0.03 + frameCount * 0.07 + i * TWO_PI / 3) * pow(abs(sin(w * 0.001 + frameCount * 0.02)), 5);
      curveVertex(w, h);
    }
    endShape();
  } */


}


/* function mousePressed() {
  colors.pop();

   if (type == 0) {
    type = 1;
  } else {
    type = 0;
  }
}*/