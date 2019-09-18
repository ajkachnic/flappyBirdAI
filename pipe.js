class Pipe {
  constructor() {
    this.space = random(150, width / 3);
    this.top = random(150, width * 0.75);
    this.combined = this.top + this.space;
    this.bottom = height - this.combined;
    this.w = 25;
    this.x = width;
    this.speed = 2;
    this.hightlight = false;
  }

  hits(bird) {
    this.hightlight = false;
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        this.hightlight = true;
        return true;
      }
    }
  }

  show() {
    if (this.hightlight) {
      fill("red");
    } else {
      fill(255);
    }
    // Draws Top Pipe
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }
}
