/*
 * twisted lines
 *
 * @author aadebdeb
 * @date 2017/02/04
 */

var colors;
var type;
var waveWidth = 100;

function setup() {
  colors = [
    color(255, 0, 0),
    color(0, 255, 0),
    color(0, 0, 255)
  ];
  createCanvas(windowWidth, windowHeight);
  var portfolioP = createP("STEFWORKS");
  portfolioP.position(width / 4, height / 2 - 35 ).style('font-size', '20px');
  var projects = createP("My projects");
  projects.position(width / 4, height / 2 - 25 + waveWidth/4).style('color', colors[0]).mousePressed(() =>{
    select("#Demo3").position(0,windowHeight-100).show();
    select("#Content3").position(windowWidth/2-select("#Content3").size().width/2,0);
    select(".Section3").show();
  });
  var selfies = createP("My life in selfies");
  selfies.position(width / 4, height / 2 - 25 + 2*waveWidth/4).style('color', colors[1]);
  var experience = createP("My professional experience");
  experience.position(width / 4, height / 2 - 25 + 3*waveWidth/4).style('color', colors[2]);
  portfolioP.mousePressed({});


  type = 0;
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
  
}

function moveElement(element, end) {


}

/* function mousePressed() {
  colors.pop();

   if (type == 0) {
    type = 1;
  } else {
    type = 0;
  }
}*/