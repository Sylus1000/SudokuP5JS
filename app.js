const sudoku_grid_size = 9;
const grid_offset = 25;
const cell_width =
  Math.min(innerWidth, innerHeight) / sudoku_grid_size - grid_offset / 2;
const background_color = 75;
const text_size = cell_width / 3;
var gamemap = [];
var numberstack = [];

//DONE
function setup() {
  initSudokuMap();
  createCanvas(windowWidth, windowHeight);
  //sudokuBacktracking();
}

//DONE
function draw() {
  background(background_color);
  drawGrid();
}

//DONE
function initSudokuMap() {
  for (let i = 0; i < sudoku_grid_size; i++) {
    gamemap[i] = [];
  }
  for (let i = 0; i < sudoku_grid_size; i++) {
    for (let j = 0; j < sudoku_grid_size; j++) {
      //Leave some fields out (random)
      if (j + 1 === randomSudokuNumber()) {
        gamemap[i][j] = 0;
      } else {
        newNumber = getNonDuplicateCandidateOrZero(gamemap, i, j);
        gamemap[i][j] = newNumber;
      }
    }
  }
}

//DONE
function randomSudokuNumber() {
  return Math.floor(random(1, sudoku_grid_size + 1));
}

//DONE
function getNonDuplicateCandidateOrZero(map, i, j) {
  let candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let m = 0; m < candidates.length; m++) {
    if (!isNumberDuplicateInSudoku(map, candidates[m], i, j)) {
      return candidates[m];
    }
  }
  return 0;
}

//DONE
function isNumberDuplicateInSudoku(map, number, i, j) {
  // Return false for zeros
  if (number === 0 || number === undefined) return false;

  // Check column duplicates
  for (let col = 0; col < map.length; col++) {
    let currentNumber = map[i][col];
    if (currentNumber !== undefined && currentNumber === number) {
      return true;
    }
  }

  // Check row duplicates
  for (let row = 0; row < map.length; row++) {
    let currentNumber = map[row][j];
    if (currentNumber !== undefined && currentNumber === number) {
      return true;
    }
  }

  // Check subgrid duplicates
  const subgridSize = getSubgridSize();
  const startRow = Math.floor(i / subgridSize) * subgridSize;
  const startCol = Math.floor(j / subgridSize) * subgridSize;
  for (let rowOffset = 0; rowOffset < subgridSize; rowOffset++) {
    for (let colOffset = 0; colOffset < subgridSize; colOffset++) {
      let currentNumber = map[startRow + rowOffset][startCol + colOffset];
      if (currentNumber !== undefined && currentNumber === number) {
        return true;
      }
    }
  }
  // Return false if there arent any duplicates
  return false;
}

//DONE
function getSubgridSize() {
  return Math.floor(sudoku_grid_size / 3);
}

//TODO
function sudokuBacktracking() {
  recursivelyPushNumber(1, 0, 0);
  fillMapWithNumberstack();
}

//TODO
function fillMapWithNumberstack() {
  for (let i = 0; i < gamemap.length; i++) {
    for (let j = 0; j < gamemap[i].length; j++) {
      gamemap[i][j] = numberstack[i * gamemap.length + j];
    }
  }
}

//TODO
function recursivelyPushNumber(n, i, j) {
  if (isNumberDuplicateInSudoku(gamemap, n, i, j)) {
    //End of possible numbers reached
    if (n === 9) {
      if (numberstack.length > 0) {
        let last = numberstack.pop();
        recursivelyPushNumber(last + 1, i, j);
      }
    } else {
      recursivelyPushNumber(n + 1, i, j);
    }
  } else {
    numberstack.push(n);
    recursivelyPushNumber(1, j === 8 ? i + 1 : i, j === 8 ? 0 : j + 1);
  }
}

//DONE
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
    if (i % getSubgridSize() == 0) {
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
