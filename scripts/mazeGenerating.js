function checkNeighbours(arr,cols,rows,interval){
    var neighbours = []
    const topN = [arr[0]-interval,arr[1]]; const botN = [arr[0]+interval,arr[1]];
    const leftN = [arr[0],arr[1]-interval]; const rightN = [arr[0],arr[1]+interval];
    topN[0] < 0 ? true : neighbours.push(topN)
    botN[0] > cols-1 ? true : neighbours.push(botN)
    leftN[1] < 0 ? true : neighbours.push(leftN)
    rightN[1] > rows-1 ? true : neighbours.push(rightN)
    return neighbours;
}

function checkIfAvailable(arr,type){
    available = []
    arr.forEach(cell => {
        document.querySelector(`[data-position = "${cell}"]`).dataset.state == type ? true: available.push(cell)
    })
    return available;
}

function chooseRandomNeighbour(arr){
  return arr[Math.floor(Math.random() * arr.length)]
}

function drawPath(currentCell, nextCell,type){
    var wallToBreak = [(currentCell[0]+nextCell[0])/2,(currentCell[1]+nextCell[1])/2]
    Number.isInteger(wallToBreak[0]+wallToBreak[1]) ? document.querySelector(`[data-position = "${wallToBreak}"]`).dataset.state = type : false;
    document.querySelector(`[data-position = "${nextCell}"]`).dataset.state = type
}

async function drawEdges(cols,rows){
    clearWalls()
    const cells = document.querySelectorAll('[data-state = "unvisited"]')
    cells.forEach(cell => {
        var pos = cell.dataset.position.split(",",2)
        if(pos[0] == 0 || pos[0] == cols-1 || pos[1] == 0 || pos[1] == rows-1) cell.dataset.state = "wall";
    });

}

function clearWalls(){
    const cells = document.querySelectorAll('[data-state = "wall"]')
    cells.forEach(cell => {
        cell.dataset.state = "unvisited"
    });
}

function fillWalls(){
    const cells = document.querySelectorAll('[data-state = "unvisited"]')
    cells.forEach(cell => {
        cell.dataset.state = "wall"
    });
}

async function recursiveBtMazeGen(cols,rows,type){
    if(type == "unvisited") fillWalls(), currentCell = [1,1];
    else drawEdges(cols,rows), currentCell = [2,2];
    var historyStack = [currentCell]
    var lastVal = historyStack.length -1;
    while(historyStack.length > 0){
        const targetCell = document.querySelector(`[data-position = "${currentCell}"]`)
        availableCells = checkIfAvailable(checkNeighbours((targetCell.dataset.position).split(",").map(Number), cols,rows,2),type)
        if(availableCells.length == 0){
            historyStack.pop()
            var lastVal = historyStack.length -1;
            currentCell = historyStack[lastVal]
        }
        else{
            nextCell = chooseRandomNeighbour(availableCells)
            await new Promise(resolve => setTimeout(resolve,0));
            drawPath(currentCell,nextCell,type)  
            currentCell = nextCell
            historyStack.push(currentCell)
        }
    }
    if(type == "wall") document.querySelector(`[data-position = "2,3"]`).dataset.state = "unvisited";
}

function recursiveDivisionMazeGenVertical(cols,rows){
    var rand = Math.floor(Math.random()* rows)
    console.log([0,rand]+"--"+[cols-1,rand])
    drawFlatLine([0,rand],[cols-1,rand])
}

function findArea(startPoint){
    console.log(checkIfAvailable(checkNeighbours(startPoint,29,25,1),"wall"))
    
}

function drawFlatLine(from,to){
    var xDist = to[0]-from[0]
    var yDist = to[1]-from[1]
    var nextCellPos;
    var sum = xDist+yDist
    console.log("this is the sum" + sum)
    console.log(xDist + ", " + yDist)
    for (let i = 0; i < Math.abs(sum)+1 ; i++) {
        if(sum > 0)xDist > 0 ? nextCellPos = [from[0]+i, from[1]] : nextCellPos = [from[0],from[1]+i];
        else xDist < 0 ? nextCellPos = [from[0]-i, from[1]] : nextCellPos = [from[0],from[1]-i];
        console.log(nextCellPos)
        const targetCell = document.querySelector(`[data-position = "${nextCellPos}"]`)
        targetCell.dataset.state = "wall"
    }
}

function randomMazeGen(density) {
    clearWalls()
    const cells = document.querySelectorAll('[data-state = "unvisited"]')
    cells.forEach(cell => {
        Math.random() < density ? cell.dataset.state = "wall" : false;
    })
}

