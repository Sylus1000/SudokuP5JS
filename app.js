const sudoku_grid_size = 9;
const grid_xoffset = 50;
const grid_yoffset = 50;
const cell_width = 80;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  drawGrid();
}

function drawGrid() {
  for (let i = 0; i < sudoku_grid_size + 1; i++) {
    if (i % 3 == 0) {
      stroke(255);
      strokeWeight(3);
    } else {
      stroke(0);
      strokeWeight(2);
    }
    x1 = i * cell_width + grid_xoffset;
    y1 = grid_yoffset;
    x2 = x1;
    y2 = y1 + sudoku_grid_size * cell_width;
    line(x1, y1, x2, y2);
    line(y1, x1, y2, x2);
  }
}
