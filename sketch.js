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

  configureRelativeMenuPositions();

  /* -------- */
  /* -- CREATE CANVAS -- */
 var canvas = createCanvas(windowWidth, windowHeight).style('z-index', '-3'); 
 canvas.elt.style.position = 'fixed';
  /* -------- */

  /* --- SELECT MAIN MENU OPTIONS  --- */
  var _rootMenu = select("#_rootMenu").html(longText[0])
  options.push(_rootMenu);

  var _projects = select("#_projects").html(longText[1]);
  options.push(_projects);

  var _selfies = select("#_selfies").html(longText[2]);
  options.push(_selfies);

  var _experience = select("#_experience").html(longText[3]);
  options.push(_experience);

  /* --------- */

  /* POSITION OF MAIN MENU BUTTONS */
  _rootMenu.position(XMainMenu, mainMenuYPositions[3]).style("z-index", "1").show();
  _projects.position(XMainMenu, mainMenuYPositions[4]).style("z-index", "1").show();
  _selfies.position(XMainMenu, mainMenuYPositions[5]).style("z-index", "1").show();
  _experience.position(XMainMenu, mainMenuYPositions[6]).style("z-index", "1").show();

  /* --- DISPLAY LINKEDIN BADGE --- */
  select(".LI-profile-badge").position(XMainMenu, XMainMenu).show();

  /* ---------- */

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

function configureRelativeMenuPositions() {
  waveCenter = windowHeight / 2 - 23;

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
    });
    select(".LI-profile-badge").position(XMainMenu, XMainMenu).hide();
  } else {
    options.forEach((element) => {
      element.html(longText[options.indexOf(element)]);
    });
    select(".LI-profile-badge").position(XMainMenu, XMainMenu).show();
  }
  var selectedIndex = options.indexOf(selected);
  var i;
  for (i = 0; i < options.length; i++) {
    options[i].position(currentX, mainMenuYPositions[3 - selectedIndex + i]);
    options[i].elt.style.position = 'fixed';
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
  }

  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    configureRelativeMenuPositions();
    hideAllContent();
    mainMenuSelect(options[0]);
  }


  /* function mousePressed() {
    colors.pop();
  
     if (type == 0) {
      type = 1;
    } else {
      type = 0;
    }
    }*/