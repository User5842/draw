/**
 * Board class used for organizing Board related data such as rendering and click events.
 */
class Board {
    #canvas = null;
    #cellSize = 0;
    #colorPicker = null;
    #coordinateX = null;
    #coordinateY = null;
    #currentColor = '';
    #ctx = null;

    constructor(cellSize = 50) {
        this.#canvas = document.getElementById('canvas');
        this.#cellSize = cellSize;
        this.#coordinateX = document.getElementById('coordinates_x');
        this.#coordinateY = document.getElementById('coordinates_y');
        this.#colorPicker = document.getElementById('color');
        this.#ctx = this.#canvas.getContext('2d');

        this.#init();
    }

    /**
     * Basic initialization: drawing, adding event listeners.
     */
    #init() {
        this.#drawXPartitions();
        this.#drawYPartitions();

        this.#canvas.addEventListener('click', event => {
            const { layerX, layerY } = event;
            const nearestX = this.#roundToNearestCellValue(layerX);
            const nearestY = this.#roundToNearestCellValue(layerY);

            this.#ctx.fillStyle = this.#currentColor;
            this.#ctx.fillRect(nearestX, nearestY, this.#cellSize, this.#cellSize);
        });

        this.#canvas.addEventListener('mousemove', event => {
            const { layerX, layerY } = event;
            this.#coordinateX.innerHTML = `X: ${layerX}px`;
            this.#coordinateY.innerHTML = `Y: ${layerY}px`;
        });

        this.#colorPicker.addEventListener('change', event => {
            this.#currentColor = event.target.value;
        });
    }

    /**
     * Draw out the x partitions using multiple lines.
     * This can probably be optimized... :)
     */
    #drawXPartitions() {
        for (let x = this.#cellSize; x < this.#canvas.width; x += this.#cellSize) {
            this.#ctx.beginPath();
            this.#ctx.moveTo(x, 0);
            this.#ctx.lineTo(x, this.#canvas.width);
            this.#ctx.stroke();
        }
    }

    /**
     * Draw out the y partitions using multiple lines.
     * This can probably be optimized... :)
     */
    #drawYPartitions() {
        for (let y = this.#cellSize; y < this.#canvas.height; y += this.#cellSize) {
            this.#ctx.beginPath();
            this.#ctx.moveTo(0, y);
            this.#ctx.lineTo(this.#canvas.height, y);
            this.#ctx.stroke();
        }
    }

    /**
     * 
     * @param {Number} point An x or y coordinate
     * @returns The x or y coordinate rounded down to the nearest cell point
     */
    #roundToNearestCellValue(point) {
        return Math.floor(point / this.#cellSize) * this.#cellSize;
    }
}

export default Board;