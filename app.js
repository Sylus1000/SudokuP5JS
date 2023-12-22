const sudoku_grid_size = 9;
const grid_xoffset = 50;
const grid_yoffset = 50;
const cell_width = 100;
const cell_color = 240;
const background_color = 75;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(background_color);
  drawGrid();
}

function drawGrid() {
  fill(180);
  rect(
    grid_xoffset,
    grid_yoffset,
    cell_width * sudoku_grid_size,
    cell_width * sudoku_grid_size
  );
  stroke(0);
  for (let i = 0; i < sudoku_grid_size + 1; i++) {
    if (i % 3 == 0) {
      strokeWeight(6);
    } else {
      strokeWeight(1);
    }
    x1 = i * cell_width + grid_xoffset;
    y1 = grid_yoffset;
    x2 = x1;
    y2 = y1 + sudoku_grid_size * cell_width;
    line(x1, y1, x2, y2);
    line(y1, x1, y2, x2);
  }
}
