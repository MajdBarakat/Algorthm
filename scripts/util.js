//shared functions

export function checkNeighbours(arr, rows, cols, interval) {
  var neighbours = [];
  const topN = [arr[0] - interval, arr[1]];
  const botN = [arr[0] + interval, arr[1]];
  const leftN = [arr[0], arr[1] - interval];
  const rightN = [arr[0], arr[1] + interval];
  topN[0] < 0 ? true : neighbours.push(topN);
  botN[0] > rows - 1 ? true : neighbours.push(botN);
  leftN[1] < 0 ? true : neighbours.push(leftN);
  rightN[1] > cols - 1 ? true : neighbours.push(rightN);
  return neighbours;
}

export function checkIfAvailable(arr, type) {
  var available = [];
  arr.forEach((cell) => {
    document.querySelector(`[data-position = "${cell}"]`).dataset.state == type
      ? true
      : available.push(cell);
  });
  return available;
}

export function checkIfType(arr, type) {
  var available = [];
  arr.forEach((cell) => {
    document.querySelector(`[data-position = "${cell}"]`).dataset.state == type
      ? available.push(cell)
      : false;
  });
  return available;
}

export function checkIfDist(arr, dist) {
  var available = [];
  arr.forEach((cell) => {
    parseInt(
      document.querySelector(`[data-position = "${cell}"]`).dataset.dist
    ) == dist
      ? available.push(cell)
      : false;
  });
  return available;
}

export function checkIfAvailable2(arr) {
  var available = [];
  var endFound = false;
  arr.forEach((cell) => {
    const state = document.querySelector(`[data-position = "${cell}"]`).dataset
      .state;
    if (state == "unvisited") available.push(cell);
    else if (state == "end") return (endFound = true);
  });
  endFound == true ? (available = false) : false;
  return available;
}

export function chooseRandomNeighbour(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function drawPath(currentCell, nextCell, type) {
  document.querySelector(`[data-position = "${currentCell}"]`).dataset.state =
    type;
  var wallToBreak = [
    (currentCell[0] + nextCell[0]) / 2,
    (currentCell[1] + nextCell[1]) / 2,
  ];
  Number.isInteger(wallToBreak[0] + wallToBreak[1])
    ? (document.querySelector(
        `[data-position = "${wallToBreak}"]`
      ).dataset.state = type)
    : false;
  document.querySelector(`[data-position = "${nextCell}"]`).dataset.state =
    type;
}

export async function drawPath2(nextCell, type) {
  document.querySelector(`[data-position = "${nextCell}"]`).dataset.state =
    type;
}

export function uniqueXDimensionalArr(arr) {
  var uniqueArr = [];
  var x = {};
  for (var i = 0, l = arr.length; i < l; i++) {
    var stringified = JSON.stringify(arr[i]);
    if (x[stringified]) {
      continue;
    }
    uniqueArr.push(arr[i]);
    x[stringified] = true;
  }
  return uniqueArr;
}

export function findDistance(start, finish) {
  return Math.sqrt(
    Math.pow(finish[0] - start[0], 2) + Math.pow(finish[1] - start[1], 2)
  );
}

export function dijkstraCalcDist(startCell, rows, cols) {
  const all = document.querySelectorAll('[data-state = "visited"]');
  all.forEach((cell) => {
    cell.dataset.dist = -1;
  });
  var currentCells = [startCell];
  var noDist = document.querySelectorAll(
    '[data-state = "visited"][data-dist = "-1"]'
  ).length;
  var dist = 0;
  while (noDist > 0) {
    var available = [];
    noDist = document.querySelectorAll(
      '[data-state = "visited"][data-dist = "-1"]'
    ).length;
    for (let i = 0; i < currentCells.length; i++) {
      const targetCell = document.querySelector(
        `[data-position = "${currentCells[i]}"]`
      );
      //console.log(currentCells[0][i])
      targetCell.dataset.dist = dist;
      var availableNeighbours = checkIfDist(
        checkIfType(checkNeighbours(currentCells[i], rows, cols, 1), "visited"),
        -1
      );
      for (let i = 0; i < availableNeighbours.length; i++) {
        available.push(availableNeighbours[i]);
      }

      //dist == 20 ? noDist = 0: false;
    }
    dist++;
    currentCells = uniqueXDimensionalArr(available);
  }
  console.log("ENDED because ", noDist);
}
