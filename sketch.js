/*
 * twisted lines
 *
 * @author aadebdeb
 * @date 2017/02/04
 */

var colorPalete;
var colors;
var options = [];
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

  colors = colorPalete.slice(0);

  waveCenter = windowHeight / 2 - 35;

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
  createCanvas(windowWidth, windowHeight);
  /* -------- */

  /* --- CREATE MAIN MENU OPTIONS AND SET INITIAL POSITIONS --- */
  var _rootMenu = createP("STEFWORKS");
  _rootMenu.position(XMainMenu, mainMenuYPositions[3]).style('font-size', '20px');
  options.push(_rootMenu);

  var _projects = createP("My projects");
  _projects.position(XMainMenu, mainMenuYPositions[4]).style('color', colors[0]).style('font-size', '20px');
  options.push(_projects);

  var _selfies = createP("My life in selfies");
  _selfies.position(XMainMenu, mainMenuYPositions[5]).style('color', colors[1]).style('font-size', '20px');
  options.push(_selfies);

  var _experience = createP("My professional experience");
  _experience.position(XMainMenu, mainMenuYPositions[6]).style('color', colors[2]).style('font-size', '20px');
  options.push(_experience);

  /* --------- */

  /* --- SETUP SCROLLING FUNCTIONALITY --- */

  /* ---------- */

  /* --- SETUP ONCLICK METHODS */

  _rootMenu.mousePressed(() => {mainMenuSelect(_rootMenu)});
  _projects.mousePressed(() => {
    select("#Demo3").position(0, windowHeight - 100).show();
    select("#Content3").position(windowWidth / 2 - select("#Content3").size().width / 2, 0).style("z-index", "10");
    select(".Section3").show();
    mainMenuSelect(_projects);
  });
  _selfies.mousePressed(() => {mainMenuSelect(_selfies)});
  _experience.mousePressed(() => {mainMenuSelect(_experience)});

  /* --------- */

  /* -- SETUP BLEND TYPE FOR THE WAVE ~ 0 is black, 1 is white -- */
  type = 0;
}

/* method that shifts the option positions so that the selected is in position 3 */
function mainMenuSelect(selected) {
  var selectedIndex = options.indexOf(selected);
  console.log("selected: "+selectedIndex);
  var i;
  for(i = 0; i < options.length; i++){
    options[i].position(XMainMenu, mainMenuYPositions[3 - selectedIndex + i]);
  }
  colors = colorPalete.slice(0);
  if(selectedIndex != 0){
    colors.splice( selectedIndex-1 ,1);
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