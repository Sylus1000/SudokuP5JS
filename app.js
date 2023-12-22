const sudoku_grid_size = 9;
const grid_offset = 50;
const cell_width = 100;
const background_color = 75;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(background_color);
  drawGrid();
}

function drawGrid() {
  fill(color(230, 230, 213));
  rect(
    grid_offset,
    grid_offset,
    cell_width * sudoku_grid_size,
    cell_width * sudoku_grid_size
  );
  stroke(0);
  for (let i = 0; i < sudoku_grid_size + 1; i++) {
    if (i % 3 == 0) {
      strokeWeight(6);
    } else {
      strokeWeight(2);
    }
    x1 = i * cell_width + grid_offset;
    y1 = grid_offset;
    x2 = x1;
    y2 = y1 + sudoku_grid_size * cell_width;
    line(x1, y1, x2, y2);
    line(y1, x1, y2, x2);
  }
}
