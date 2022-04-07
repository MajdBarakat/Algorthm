import {
  uniqueXDimensionalArr,
  checkNeighbours,
  checkIfAvailable,
  chooseRandomNeighbour,
  drawPath,
  checkIfType,
} from "./util.js";

async function drawEdges(rows, cols) {
  clearWalls();
  const cells = document.querySelectorAll('[data-state = "unvisited"]');
  cells.forEach((cell) => {
    var pos = cell.dataset.position.split(",", 2);
    if (pos[0] == 0 || pos[0] == rows - 1 || pos[1] == 0 || pos[1] == cols - 1)
      cell.dataset.state = "wall";
  });
}

export function clearWalls() {
  const cells = document.querySelectorAll('[data-state = "wall"]');
  cells.forEach((cell) => {
    cell.dataset.state = "unvisited";
  });
}

export function clearAll() {
  const cells = document.querySelectorAll("td");
  cells.forEach((cell) => {
    cell.dataset.state = "unvisited";
  });
}

function fillWalls() {
  const cells = document.querySelectorAll('[data-state = "unvisited"]');
  cells.forEach((cell) => {
    cell.dataset.state = "wall";
  });
}

export async function recursiveBtMazeGen(rows, cols, type, speed) {
  clearAll();
  var currentCell;
  if (type == "unvisited") fillWalls(), (currentCell = [1, 1]);
  else drawEdges(rows, cols), (currentCell = [2, 2]);
  var historyStack = [currentCell];
  var lastVal = historyStack.length - 1;
  while (historyStack.length > 0) {
    const targetCell = document.querySelector(
      `[data-position = "${currentCell}"]`
    );
    var availableCells = checkIfAvailable(
      checkNeighbours(
        targetCell.dataset.position.split(",").map(Number),
        rows,
        cols,
        2
      ),
      type
    );
    if (availableCells.length == 0) {
      historyStack.pop();
      var lastVal = historyStack.length - 1;
      currentCell = historyStack[lastVal];
    } else {
      var nextCell = chooseRandomNeighbour(availableCells);
      await new Promise((resolve) => setTimeout(resolve, speed));
      drawPath(currentCell, nextCell, type);
      currentCell = nextCell;
      historyStack.push(currentCell);
    }
  }
  if (type == "wall")
    document.querySelector(`[data-position = "2,3"]`).dataset.state =
      "unvisited";
}

function isOdd(num) {
  return num % 2;
}

export async function randomPrimGen(rows, cols, speed) {
  clearAll();
  fillWalls();
  var startX = Math.floor(Math.random() * (rows - 1)) + 1;
  var startY = Math.floor(Math.random() * (cols - 1)) + 1;
  isOdd(startX) ? true : startX++;
  isOdd(startY) ? true : startY++;
  const startCell = [startX, startY];
  var availableCells = [startCell];
  var currentCell = startCell;
  var length = 0;
  document.querySelector(`[data-position = "${currentCell}"]`).dataset.state =
    "unvisited";
  while (availableCells.length > length) {
    availableCells.splice(availableCells.indexOf(frontCell), 1);
    var availableNeighbours = checkIfType(
      checkNeighbours(currentCell, rows, cols, 2),
      "wall"
    );
    availableNeighbours.forEach((n) => {
      availableCells.push(n);
    });
    availableCells = uniqueXDimensionalArr(availableCells);
    await new Promise((resolve) => setTimeout(resolve, speed));
    var frontCell = chooseRandomNeighbour(availableCells);
    var pathNeighbours = checkIfType(
      checkNeighbours(frontCell, rows, cols, 2),
      "unvisited"
    );
    currentCell = chooseRandomNeighbour(pathNeighbours);
    drawPath(currentCell, frontCell, "unvisited");
    currentCell = frontCell;
    length = 1;
    //unvisitedNeighbours.forEach(n => {availableCells.push(n)})
  }
}

export function randomMazeGen(density) {
  clearAll();
  const cells = document.querySelectorAll('[data-state = "unvisited"]');
  cells.forEach((cell) => {
    Math.random() < density ? (cell.dataset.state = "wall") : false;
  });
}

// function drawFlatLine(from, to) {
//   var xDist = to[0] - from[0];
//   var yDist = to[1] - from[1];
//   var nextCellPos;
//   var sum = xDist + yDist;
//   for (let i = 0; i < Math.abs(sum) + 1; i++) {
//     if (sum > 0)
//       xDist > 0
//         ? (nextCellPos = [from[0] + i, from[1]])
//         : (nextCellPos = [from[0], from[1] + i]);
//     else
//       xDist < 0
//         ? (nextCellPos = [from[0] - i, from[1]])
//         : (nextCellPos = [from[0], from[1] - i]);
//     console.log(nextCellPos);
//     const targetCell = document.querySelector(
//       `[data-position = "${nextCellPos}"]`
//     );
//     targetCell.dataset.state = "wall";
//   }
// }

// function recursiveDivisionMazeGenVertical(rows,cols){
//     var rand = Math.floor(Math.random()* cols)
//     console.log([0,rand]+"--"+[rows-1,rand])
//     drawFlatLine([0,rand],[rows-1,rand])
// }

// function findArea(startPoint){
//     console.log(checkIfAvailable(checkNeighbours(startPoint,29,25,1),"wall"))
// }
