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
var waveWidth = 100;
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
    'SWS',
    'Prjt',
    'Pics',
    'Expr'
  ];

  longText = [
    "STEFWORKS",
    "My projects",
    "My life in selfies",
    "My professional experience"
  ];

  colors = colorPalete.slice(0);

  waveCenter = windowHeight / 2 - 39;

  XMainMenu = windowWidth / 20;

  mainMenuYPositions = [
    waveCenter - waveWidth - 3 * waveWidth / 4,
    waveCenter - waveWidth - 2 * waveWidth / 4,
    waveCenter - waveWidth - waveWidth / 4,
    waveCenter,
    waveCenter + waveWidth + waveWidth / 4,
    waveCenter + waveWidth + 2 * waveWidth / 4,
    waveCenter + waveWidth + 3 * waveWidth / 4
  ];

  /* -------- */
  /* -- CREATE CANVAS -- */
  createCanvas(windowWidth, windowHeight - 10);
  /* -------- */

  /* --- CREATE MAIN MENU OPTIONS AND SET INITIAL POSITIONS --- */
  var _rootMenu = createP(longText[0]);
  _rootMenu.position(XMainMenu, mainMenuYPositions[3]).style('font-size', '20px');
  options.push(_rootMenu);

  var _projects = createP(longText[1]);
  _projects.position(XMainMenu, mainMenuYPositions[4]).style('color', colors[0]).style('font-size', '20px');
  options.push(_projects);

  var _selfies = createP(longText[2]);
  _selfies.position(XMainMenu, mainMenuYPositions[5]).style('color', colors[1]).style('font-size', '20px');
  options.push(_selfies);

  var _experience = createP(longText[3]);
  _experience.position(XMainMenu, mainMenuYPositions[6]).style('color', colors[2]).style('font-size', '20px');
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
  for(i=2; i<4; i++){
    select("#Section" + i).position(options[0].size().width, 0).style("z-index", "10").hide().size(windowWidth - options[0].size().width - 20, windowHeight - 20);
    select(".Content" + i).hide();
    select("#Demo" + i).position(0, windowHeight - 100).hide();
  }
}

function showContent(htmlSectNumber) {
  select("#Section" + htmlSectNumber).position(options[0].size().width, 0).style("z-index", "10").show().size(windowWidth - options[0].size().width - 20, windowHeight - 20);
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
  strokeWeight(20);
  colors.forEach(element => {
    stroke(element);
    i = colors.indexOf(element);
    beginShape();
    for (var w = -20; w < width + 20; w += 5) {
      var h = height / 2;
      var factor = frameCount;
      h += waveWidth * sin(w * 0.03 + factor * 0.07 + i * TWO_PI / 3) * pow(abs(sin(w * 0.00 + factor * 0.015)), 5);
      curveVertex(w, h);
    }
    endShape();
  });
  /* -- TRANSLATE OPTIONS TO RIGHT POSITION */


}


/* function mousePressed() {
  colors.pop();

   if (type == 0) {
    type = 1;
  } else {
    type = 0;
  }
}*/