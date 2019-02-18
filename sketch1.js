
var colors;
var type;
var waveWidth = 110;

function setup() {

    /* -- SETUP FIELDS -- */
    colors = [
      color(255, 0, 0),
      color(0, 255, 0),
      color(0, 0, 255)
    ];
  /* -------- */
  /* -- CREATE CANVAS -- */
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-holder');
  canvas.style('z-index', '-3').style('display', 'block')
  canvas.elt.style.position = 'fixed';
  /* -------- */  

   type = 1;
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
        var h = 1.5 * height / 2;
        var factor = 2.5*frameCount;
        h += waveWidth * sin(w * 0.03 + factor/2 * 0.07 + i * TWO_PI / 3) * pow(abs(sin(w * 0.001 + factor/2 * 0.015)), 50);
        curveVertex(w, h);
      }
      endShape();
    });
  }

  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

