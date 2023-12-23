const sudoku_grid_size = 9;
const grid_offset = 25;
const cell_width =
  Math.min(innerWidth, innerHeight) / sudoku_grid_size - grid_offset / 2;
const background_color = 75;
const text_size = cell_width / 3;
var gamemap = [];

function setup() {
  initSudokuMap();
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(background_color);
  drawGrid();
}

function initSudokuMap() {
  for (let i = 0; i < sudoku_grid_size; i++) {
    gamemap[i] = [];
    for (let j = 0; j < sudoku_grid_size; j++) {
      //Leave some fields out (random)
      if ((j + 1) % Math.floor(random(1, sudoku_grid_size + 1)) == 0) {
        gamemap[i][j] = 0;
      } else {
        newNumber = Math.floor(random(1, sudoku_grid_size + 1));
        gamemap[i][j] = newNumber;
      }
    }
  }
  removeDuplicates();
}

function removeDuplicates() {
  for (let k = 0; k < gamemap.length; k++) {
    for (let l = 0; l < gamemap[k].length; l++) {
      while (isNumberDuplicateInSudoku(gamemap, gamemap[k][l], k, l)) {
        gamemap[k][l] = 0;
      }
    }
  }
}

function isNumberDuplicateInSudoku(map, number, i, j) {
  // Return false for zeros to avoid infinite loop in removeDuplicates
  if (number === 0) return false;

  // Check row duplicates
  let rowCount = 0;
  for (let col = 0; col < map.length; col++) {
    if (map[i][col] === number) {
      rowCount++;
      if (rowCount > 1) {
        return true;
      }
    }
  }

  // Check column duplicates
  let colCount = 0;
  for (let row = 0; row < map.length; row++) {
    if (map[row][j] === number) {
      colCount++;
      if (colCount > 1) {
        return true;
      }
    }
  }

  // Check subgrid duplicates
  const subgridSize = Math.sqrt(map.length);
  const startRow = Math.floor(i / subgridSize) * subgridSize;
  const startCol = Math.floor(j / subgridSize) * subgridSize;
  let subgridCount = 0;
  for (let rowOffset = 0; rowOffset < subgridSize; rowOffset++) {
    for (let colOffset = 0; colOffset < subgridSize; colOffset++) {
      if (map[startRow + rowOffset][startCol + colOffset] === number) {
        subgridCount++;
        if (subgridCount > 1) {
          return true;
        }
      }
    }
  }
  // Return false if there arent any duplicates
  return false;
}

function isSolveable() {
  //TODO
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
      strokeWeight(4);
    } else {
      strokeWeight(1);
    }
    x1 = i * cell_width + grid_offset;
    y1 = grid_offset;
    x2 = x1;
    y2 = y1 + sudoku_grid_size * cell_width;
    line(x1, y1, x2, y2);
    line(y1, x1, y2, x2);
  }
  textSize(text_size);
  strokeWeight(2);
  textFont("Courier New");
  fill("black");
  for (let j = 0; j < sudoku_grid_size; j++) {
    for (let k = 0; k < sudoku_grid_size; k++) {
      x1 = j * cell_width + grid_offset + cell_width / 2 - text_size / 4;
      y1 = k * cell_width + grid_offset + cell_width / 2 + text_size / 4;
      if (gamemap[k][j] != 0) text(`${gamemap[k][j]}`, x1, y1);
    }
  }
}
