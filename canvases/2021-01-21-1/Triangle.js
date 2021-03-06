class Triangle {
  constructor({ context, position, yFrom, xFrom, last, heartAlpha }) {
    this.context = context;
    this.position = position;
    // eslint-disable-next-line
    this.x1 = position[0];
    // eslint-disable-next-line
    this.y1 = position[1];
    // eslint-disable-next-line
    this.x2 = position[2];
    // eslint-disable-next-line
    this.y2 = position[3];
    // eslint-disable-next-line
    this.x3 = position[4];
    // eslint-disable-next-line
    this.y3 = position[5];
    this.xFrom = xFrom;
    this.yFrom = yFrom;
    this.tlSet = false;
    this.alpha = 1;
    this.tick = 0;
    this.lastTriangle = last;
    this.heartAlpha = heartAlpha;
  }

  draw() {
    this.tick += 1;

    if (this.tick > 400 && this.alpha >= 0.1) {
      this.alpha -= 0.1;
    }
    if (this.alpha >= 0.1) {
      this.context.beginPath();
      this.context.globalAlpha = this.alpha;
      this.context.fillStyle = 'rgb(255, 0, 0)';
      this.context.moveTo(this.x1, this.y1);
      this.context.lineTo(this.x2, this.y2);
      this.context.lineTo(this.x3, this.y3);
      this.context.strokeStyle = 'white';
      this.context.closePath();
      this.context.stroke();
      this.context.fill();
    }
  }
}

export default Triangle;
