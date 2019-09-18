var TOTAL = 50;
var birds = [];
let savedBirds = [];
var pipes = [];
var frameCount = 0;
let generation = 1;
var score = 0;
var counter = 0;
function setup() {
  noStroke();
  tf.setBackend("cpu");
  createCanvas(400, 600);
  for (let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }
  pipes.push(new Pipe());
  console.log(pipes);
}

function draw() {
  background("#050505");
  text(`Generation ~ ${generation}`, 20, 20);
  text(`Score ~ ${score}`, width - 100, 20);
  for (let bird of birds) {
    bird.think(pipes);
    bird.show();
    bird.update();
  }
  if (birds.length === 0) {
    nextGen();
  }

  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    for (let j = birds.length - 1; j >= 0; j--) {
      if (pipes[i].hits(birds[j])) {
        savedBirds.push(birds.splice(j, 1)[0]);
      }
    }

    if (pipes[i].offscreen()) {
      score++;
      pipes.splice(i, 1);
    }
  }

  if (counter % 75 == 0) {
    pipes.push(new Pipe());
  }
  counter++;
}
//function keyPressed() {
//if ((key = " ")) {
//bird.up();
//}
//}
