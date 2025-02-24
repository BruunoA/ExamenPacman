/**
 *
 */
function setup() {
  createCanvas(600, 400).parent("#sketch-holder");
}

/**
 *
 */
function draw() {
  background(135, 206, 235);
  fill("yellow"); ñ;
  stroke("orange");
  strokeWeight(20);
  circle(550, 50, 100);
}

globalThis.setup = setup;
globalThis.draw = draw;
globalThis.preload=preload;
