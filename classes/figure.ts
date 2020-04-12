export class Figure {
  private canvas: HTMLCanvasElement = document.createElement("canvas");
  private context: CanvasRenderingContext2D = this.canvas.getContext(
    "2d"
  ) as CanvasRenderingContext2D;
  articulations = {
    neck: { x: this.size * 0.5, y: this.size * 0.4 },
    shoulder: { x: this.size * 0.5, y: this.size * 0.41 },
    rightElbow: { x: this.size * 0.4, y: this.size * 0.45 },
    leftElbow: { x: this.size * 0.6, y: this.size * 0.45 },
    rightWrist: { x: this.size * 0.4, y: this.size * 0.55 },
    leftWrist: { x: this.size * 0.6, y: this.size * 0.55 },
    hip: { x: this.size * 0.5, y: this.size * 0.6 },
    rightKnee: { x: this.size * 0.45, y: this.size * 0.7 },
    leftKnee: { x: this.size * 0.55, y: this.size * 0.7 },
    rightAnkle: { x: this.size * 0.45, y: this.size * 0.81 },
    leftAnkle: { x: this.size * 0.55, y: this.size * 0.81 },
  };

  constructor(
    private externalCanvas: HTMLCanvasElement,
    private size: number,
    private color: string
  ) {
    this.canvas.width = this.canvas.height = size;
  }

  update() {
    this.context.beginPath();
    this.context.fillStyle = "#FFFF00";
    this.context.rect(0, 0, this.size, this.size);
    this.context.fill();
    this.context.closePath();

    this.drawHead();
    this.drawBody();
    this.drawRightArm();
    this.drawRightForearm();
    this.drawLeftArm();
    this.drawLeftForearm();
    this.drawRightThigh();
    this.drawRightLeg();
    this.drawLeftThigh();
    this.drawLeftLeg();

    this.externalCanvas.getContext("2d")?.drawImage(this.canvas, 0, 0);
  }

  drawRightArm() {
    this.context.beginPath();
    this.context.strokeStyle = this.color;
    this.context.lineWidth = this.size * 0.025;
    this.context.lineCap = "round";
    this.context.moveTo(
      this.articulations.shoulder.x,
      this.articulations.shoulder.y
    );
    this.context.lineTo(
      this.articulations.rightElbow.x,
      this.articulations.rightElbow.y
    );
    this.context.stroke();
    this.context.closePath();
  }

  drawRightForearm() {
    this.context.beginPath();
    this.context.strokeStyle = this.color;
    this.context.lineWidth = this.size * 0.025;
    this.context.lineCap = "round";
    this.context.moveTo(
      this.articulations.rightElbow.x,
      this.articulations.rightElbow.y
    );
    this.context.lineTo(
      this.articulations.rightWrist.x,
      this.articulations.rightWrist.y
    );
    this.context.stroke();
    this.context.closePath();
  }

  drawLeftArm() {
    this.context.beginPath();
    this.context.strokeStyle = this.color;
    this.context.lineWidth = this.size * 0.025;
    this.context.lineCap = "round";
    this.context.moveTo(
      this.articulations.shoulder.x,
      this.articulations.shoulder.y
    );
    this.context.lineTo(
      this.articulations.leftElbow.x,
      this.articulations.leftElbow.y
    );
    this.context.stroke();
    this.context.closePath();
  }

  drawLeftForearm() {
    this.context.beginPath();
    this.context.strokeStyle = this.color;
    this.context.lineWidth = this.size * 0.025;
    this.context.lineCap = "round";
    this.context.moveTo(
      this.articulations.leftElbow.x,
      this.articulations.leftElbow.y
    );
    this.context.lineTo(
      this.articulations.leftWrist.x,
      this.articulations.leftWrist.y
    );
    this.context.stroke();
    this.context.closePath();
  }

  drawRightThigh() {
    this.context.beginPath();
    this.context.strokeStyle = this.color;
    this.context.lineWidth = this.size * 0.025;
    this.context.lineCap = "round";
    this.context.moveTo(this.articulations.hip.x, this.articulations.hip.y);
    this.context.lineTo(
      this.articulations.rightKnee.x,
      this.articulations.rightKnee.y
    );
    this.context.stroke();
    this.context.closePath();
  }

  drawRightLeg() {
    this.context.beginPath();
    this.context.strokeStyle = this.color;
    this.context.lineWidth = this.size * 0.025;
    this.context.lineCap = "round";
    this.context.moveTo(
      this.articulations.rightKnee.x,
      this.articulations.rightKnee.y
    );
    this.context.lineTo(
      this.articulations.rightAnkle.x,
      this.articulations.rightAnkle.y
    );
    this.context.stroke();
    this.context.closePath();
  }

  drawLeftThigh() {
    this.context.beginPath();
    this.context.strokeStyle = this.color;
    this.context.lineWidth = this.size * 0.025;
    this.context.lineCap = "round";
    this.context.moveTo(this.articulations.hip.x, this.articulations.hip.y);
    this.context.lineTo(
      this.articulations.leftKnee.x,
      this.articulations.leftKnee.y
    );
    this.context.stroke();
    this.context.closePath();
  }

  drawLeftLeg() {
    this.context.beginPath();
    this.context.strokeStyle = this.color;
    this.context.lineWidth = this.size * 0.025;
    this.context.lineCap = "round";
    this.context.moveTo(
      this.articulations.leftKnee.x,
      this.articulations.leftKnee.y
    );
    this.context.lineTo(
      this.articulations.leftAnkle.x,
      this.articulations.leftAnkle.y
    );
    this.context.stroke();
    this.context.closePath();
  }

  private drawHead() {
    this.context.beginPath();
    this.context.fillStyle = this.color;
    const radius = this.size * 0.05;
    // TODO(sxmiranda): Account for body inclination
    const x = this.articulations.neck.x;
    const y = this.articulations.neck.y - radius;
    this.context.ellipse(x, y, radius, radius, 0, 0, Math.PI * 2);
    this.context.fill();
    this.context.closePath();
  }

  private drawBody() {
    this.context.beginPath();
    this.context.strokeStyle = this.color;
    const x = this.articulations.neck.x;
    const y = this.articulations.neck.y;
    this.context.lineWidth = this.size * 0.025;
    this.context.lineCap = "round";
    this.context.moveTo(x, y);
    this.context.lineTo(this.articulations.hip.x, this.articulations.hip.y);
    this.context.stroke();
    this.context.closePath();
  }
}
