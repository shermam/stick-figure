interface Point {
  x: number;
  y: number;
}

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
    this.context.clearRect(0, 0, this.size, this.size);

    this.drawHead();
    this.drawNeck();
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

  private drawSegment(from: Point, to: Point) {
    this.context.beginPath();
    this.context.strokeStyle = this.color;
    this.context.lineWidth = this.size * 0.01;
    this.context.lineCap = "round";
    this.context.moveTo(from.x, from.y);
    this.context.lineTo(to.x, to.y);
    this.context.stroke();
    this.context.closePath();
  }

  private drawRightArm() {
    this.drawSegment(
      this.articulations.shoulder,
      this.articulations.rightElbow
    );
  }

  private drawRightForearm() {
    this.drawSegment(
      this.articulations.rightElbow,
      this.articulations.rightWrist
    );
  }

  private drawLeftArm() {
    this.drawSegment(this.articulations.shoulder, this.articulations.leftElbow);
  }

  private drawLeftForearm() {
    this.drawSegment(
      this.articulations.leftElbow,
      this.articulations.leftWrist
    );
  }

  private drawRightThigh() {
    this.drawSegment(this.articulations.hip, this.articulations.rightKnee);
  }

  private drawRightLeg() {
    this.drawSegment(
      this.articulations.rightKnee,
      this.articulations.rightAnkle
    );
  }

  private drawLeftThigh() {
    this.drawSegment(this.articulations.hip, this.articulations.leftKnee);
  }

  private drawLeftLeg() {
    this.drawSegment(this.articulations.leftKnee, this.articulations.leftAnkle);
  }

  private drawBody() {
    this.drawSegment(this.articulations.shoulder, this.articulations.hip);
  }

  private drawNeck() {
    this.drawSegment(this.articulations.neck, this.articulations.shoulder);
  }

  private drawHead() {
    this.context.beginPath();
    this.context.fillStyle = this.color;
    const radius = this.size * 0.025;
    // TODO(sxmiranda): Account for body inclination
    const x = this.articulations.neck.x;
    const y = this.articulations.neck.y - radius;
    this.context.ellipse(x, y, radius, radius, 0, 0, Math.PI * 2);
    this.context.fill();
    this.context.closePath();
  }
}
