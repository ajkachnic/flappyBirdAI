class Bird {
  constructor(brain) {
    this.x = 50;
    this.y = height / 2;
    this.gravity = 1;
    this.velocity = 0;
    this.size = 30;
    this.lift = -20;
    this.score = 0;
    this.fitness = 0;
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(5, 8, 2);
    }
  }
  mutate() {
    this.brain.mutate(0.05);
  }

  dispose() {
    this.brain.dispose();
  }

  think(pipes) {
    let closest = pipes[0];
    let closestD = Infinity;
    for (let i = 1; i < pipes.length; i++) {
      let d = pipes[i].x - this.x;
      if (d < closestD && d > 0) {
        closest = pipes[i];
        closestD = d;
      }
    }

    let inputs = [];
    inputs[0] = this.y / height;
    inputs[1] = closest.top / height;
    inputs[2] = closest.bottom / height;
    inputs[3] = closest.x / width;
    inputs[4] = this.velocity / 10;

    let output = this.brain.predict(inputs);
    //console.log(output);
    if (output[0] > output[1]) {
      this.up();
    }
  }

  show() {
    stroke(255);
    fill(255, 75);
    ellipse(this.x, this.y, 30, 30);
  }

  update() {
    this.score++;
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;
    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }

  up() {
    this.velocity += this.lift;
  }
}
