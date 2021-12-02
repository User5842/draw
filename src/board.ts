/**
 * Board class used for organizing Board related data such as rendering and click events.
 */
export default class Board {
  #canvas: HTMLCanvasElement | null = null;
  #cellSize = 0;
  #colorPicker: HTMLElement | null = null;
  #coordinateX: HTMLElement | null = null;
  #coordinateY: HTMLElement | null = null;
  #currentColor = "";
  #ctx: CanvasRenderingContext2D | null = null;

  constructor(cellSize = 50) {
    this.#canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.#cellSize = cellSize;
    this.#coordinateX = document.getElementById("coordinates_x");
    this.#coordinateY = document.getElementById("coordinates_y");
    this.#colorPicker = document.getElementById("color");
    this.#ctx = this.#canvas?.getContext("2d");

    this.#init();
  }

  /**
   * Basic initialization: drawing, adding event listeners.
   */
  #init() {
    this.#drawXPartitions();
    this.#drawYPartitions();

    this.#canvas?.addEventListener("click", (event) => {
      const { offsetX, offsetY } = event;
      const nearestX = this.#roundToNearestCellValue(offsetX);
      const nearestY = this.#roundToNearestCellValue(offsetY);

      if (this.#ctx) {
        this.#ctx.fillStyle = this.#currentColor;
        this.#ctx.fillRect(nearestX, nearestY, this.#cellSize, this.#cellSize);
      }
    });

    this.#canvas?.addEventListener("mousemove", (event: MouseEvent) => {
      const { offsetX, offsetY } = event;

      if (this.#coordinateX && this.#coordinateY) {
        this.#coordinateX.innerHTML = `X: ${offsetX}px`;
        this.#coordinateY.innerHTML = `Y: ${offsetY}px`;
      }
    });

    this.#colorPicker?.addEventListener("change", (event: Event) => {
      this.#currentColor = (event.target as HTMLInputElement).value;
    });
  }

  /**
   * Draw out the x partitions using multiple lines.
   * This can probably be optimized... :)
   */
  #drawXPartitions() {
    for (let x = this.#cellSize; x < this.#canvas!.width; x += this.#cellSize) {
      this.#ctx?.beginPath();
      this.#ctx?.moveTo(x, 0);
      this.#ctx?.lineTo(x, this.#canvas!.width);
      this.#ctx?.stroke();
    }
  }

  /**
   * Draw out the y partitions using multiple lines.
   * This can probably be optimized... :)
   */
  #drawYPartitions() {
    for (
      let y = this.#cellSize;
      y < this.#canvas!.height;
      y += this.#cellSize
    ) {
      this.#ctx?.beginPath();
      this.#ctx?.moveTo(0, y);
      this.#ctx?.lineTo(this.#canvas!.height, y);
      this.#ctx?.stroke();
    }
  }

  /**
   *
   * @param {Number} point An x or y coordinate
   * @returns The x or y coordinate rounded down to the nearest cell point
   */
  #roundToNearestCellValue(point: number) {
    return Math.floor(point / this.#cellSize) * this.#cellSize;
  }
}
