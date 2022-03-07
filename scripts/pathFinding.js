import{checkNeighbours,checkIfAvailable2,checkIfType,checkIfDist,chooseRandomNeighbour,drawPath2 as drawPath, uniqueXDimensionalArr} from './util.js'

// function checkNeighbours(arr,cols,rows,interval){
//     var neighbours = []
//     const topN = [arr[0]-interval,arr[1]]; const botN = [arr[0]+interval,arr[1]];
//     const leftN = [arr[0],arr[1]-interval]; const rightN = [arr[0],arr[1]+interval];
//     topN[0] < 0 ? true : neighbours.push(topN)
//     botN[0] > cols-1 ? true : neighbours.push(botN)
//     leftN[1] < 0 ? true : neighbours.push(leftN)
//     rightN[1] > rows-1 ? true : neighbours.push(rightN)
//     return neighbours;
// }

// function checkIfAvailable2(arr,type){
//     available = []
//     arr.forEach(cell => {
//         document.querySelector(`[data-position = "${cell}"]`).dataset.state == type ? true: available.push(cell)
//     })
//     return available;
// }

export function setStartCell(position){
    const start = document.querySelector(`[data-position = "${position}"]`)
    start.dataset.state = "start";
}

export function setEndCell(position){
    const start = document.querySelector(`[data-position = "${position}"]`)
    start.dataset.state = "end";
}

export async function depthFirstSearch(cols,rows) {
    const startCell = document.querySelector(`[data-state = "start"]`)
    var currentCell = startCell.dataset.position
    var historyStack = [currentCell]
    var lastVal = historyStack.length -1;
    while(historyStack.length > 0){
        const targetCell = document.querySelector(`[data-position = "${currentCell}"]`)
        var availableCells = checkIfAvailable2(checkNeighbours((targetCell.dataset.position).split(",").map(Number),cols,rows,1))
        if(availableCells.length == 0){
            historyStack.pop()
            var lastVal = historyStack.length -1;
            currentCell = historyStack[lastVal]
        }
        else if(availableCells == false){
            for (let i = 0; i < historyStack.length; i++) {
                await new Promise(resolve => setTimeout(resolve, 0));
                drawPath(historyStack[i],"path")  
            }
            const cells = document.querySelectorAll('[data-state = "visited"]')
            cells.forEach(cell => {
                cell.dataset.state = "unvisited"
            });
            console.log("end")
            break
        }
        else{
            var nextCell = chooseRandomNeighbour(availableCells)
            await new Promise(resolve => setTimeout(resolve, 0));
            drawPath(nextCell,"visited")
            currentCell = nextCell
            historyStack.push(currentCell)
        }
    }
}

export async function dijkstra(cols,rows){
    var unvisited = document.querySelectorAll('[data-state = "unvisited"]').length
    const startCell = document.querySelector(`[data-state = "start"]`).dataset.position.split(",").map(Number)
    var currentCells = [startCell];
    var dist = 0;
    while(unvisited > 0){
        var available = [];
        unvisited = document.querySelectorAll('[data-state = "unvisited"]').length
        for (let i = 0; i < currentCells.length; i++) {
            const targetCell = document.querySelector(`[data-position = "${currentCells[i]}"]`);
            await new Promise(resolve => setTimeout(resolve, 0));
            targetCell.dataset.state = "visited";
            targetCell.setAttribute('data-dist',`${dist}`)
            var availableNeighbours = checkIfAvailable2(checkNeighbours((currentCells[i]),cols,rows,1))
            if(availableNeighbours != false || availableNeighbours.length == 0){
                for (let i = 0; i < availableNeighbours.length; i++) {available.push(availableNeighbours[i])}
            }else{
                unvisited = 0
                const finalDist = parseInt(targetCell.dataset.dist);
                var nextCell = targetCell
                for (let i = 0; i < finalDist+1; i++) {
                    var pathNeighbour = checkIfDist(checkIfType(checkNeighbours(nextCell.dataset.position.split(",").map(Number),cols,rows,1),"visited"),finalDist - i-1)
                    nextCell.dataset.state = "path";
                    nextCell = document.querySelector(`[data-position = "${chooseRandomNeighbour(pathNeighbour)}"]`)
                    await new Promise(resolve => setTimeout(resolve, 0));
                }
                console.log("end")
            }
        }
        dist += 1;
        currentCells = uniqueXDimensionalArr(available);
    }
}