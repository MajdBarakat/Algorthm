import{checkNeighbours,checkIfAvailable2,checkIfType,checkIfDist,chooseRandomNeighbour,drawPath2 as drawPath, uniqueXDimensionalArr, findDistance, dijkstraCalcDist} from './util.js'

export function setStartCell(position){
    const start = document.querySelector(`[data-position = "${position}"]`)
    start.dataset.state = "start";
}

export function setEndCell(position){
    const start = document.querySelector(`[data-position = "${position}"]`)
    start.dataset.state = "end";
}

export async function depthFirstSearch(cols,rows,speed) {
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
                await new Promise(resolve => setTimeout(resolve, speed));
                drawPath(historyStack[i],"path")  
            }
            console.log("end")
            break
        }
        else{
            var nextCell = availableCells[0]
            await new Promise(resolve => setTimeout(resolve, speed));
            drawPath(nextCell,"visited")
            currentCell = nextCell
            historyStack.push(currentCell)
        }
    }
}

export async function dijkstra(cols,rows,speed){
    var unvisited = document.querySelectorAll('[data-state = "unvisited"]').length
    const startCell = document.querySelector(`[data-state = "start"]`).dataset.position.split(",").map(Number)
    var currentCells = [startCell];
    var dist = 0;
    while(unvisited > 0){
        var available = [];
        unvisited = document.querySelectorAll('[data-state = "unvisited"]').length
        for (let i = 0; i < currentCells.length; i++) {
            const targetCell = document.querySelector(`[data-position = "${currentCells[i]}"]`);
            await new Promise(resolve => setTimeout(resolve, speed));
            targetCell.dataset.state != "start" ?targetCell.dataset.state = "visited":false;
            targetCell.setAttribute('data-dist',`${dist}`)
            var availableNeighbours = checkIfAvailable2(checkNeighbours((currentCells[i]),cols,rows,1))
            if(availableNeighbours != false || availableNeighbours.length == 0){
                for (let i = 0; i < availableNeighbours.length; i++) {available.push(availableNeighbours[i])}
            }else{
                const finalDist = parseInt(targetCell.dataset.dist);
                var nextCell = targetCell
                for (let i = 0; i < finalDist+1; i++) {
                    var pathNeighbour = checkIfDist(checkIfType(checkNeighbours(nextCell.dataset.position.split(",").map(Number),cols,rows,1),"visited"),finalDist - i-1)
                    nextCell.dataset.state = "path";
                    nextCell = document.querySelector(`[data-position = "${chooseRandomNeighbour(pathNeighbour)}"]`)
                    await new Promise(resolve => setTimeout(resolve, speed));
                }
                return unvisited = 0
            }
        }
        dist += 1;
        currentCells = uniqueXDimensionalArr(available);
        if(currentCells.length == 0){
            window.alert("Solution could not be found!")
            return unvisited = 0
        }
    }
}

export async function aStar(cols,rows,speed){
    var unvisited = document.querySelectorAll('[data-state = "unvisited"]').length
    const startCell = document.querySelector(`[data-state = "start"]`).dataset.position.split(",").map(Number)
    const endCell = document.querySelector(`[data-state = "end"]`).dataset.position.split(",").map(Number)
    var distanceToFinish = [endCell[0] - startCell[0] , endCell[1] - startCell[1]]
    var currentCells = [startCell];
    var direction;
    var repeat = 0;
    var historyStack = [[startCell]];
    distanceToFinish[0] > distanceToFinish[1] ? direction = "vertical" : direction = "horizontal";
    while(unvisited > 0){
        var available = [];
        unvisited = document.querySelectorAll('[data-state = "unvisited"]').length
        for (let i = 0; i < currentCells.length; i++) {
            var availableNeighbours = checkIfAvailable2(checkNeighbours((currentCells[i]),cols,rows,1))
            distanceToFinish = [endCell[0] - currentCells[i][0] , endCell[1] - currentCells[i][1]]
            distanceToFinish[0] == 0 ? direction = "horizontal": false;
            distanceToFinish[1] == 0 ? direction = "vertical": false;
            const targetCell = document.querySelector(`[data-position = "${currentCells[i]}"]`);
            await new Promise(resolve => setTimeout(resolve, speed));
            targetCell.dataset.state != "start" ?targetCell.dataset.state = "visited":false;
            const dist = findDistance(currentCells[i],startCell)
            const distanceFromStart = Math.abs((startCell[0] - currentCells[i][0])) + Math.abs((startCell[1] - currentCells[i][1]))
            if(availableNeighbours != false || availableNeighbours.length == 0){
                for (let j = 0; j < availableNeighbours.length; j++) {
                    if(direction == "horizontal" && (availableNeighbours[j])[0] == (currentCells[i])[0] && findDistance(availableNeighbours[j],endCell) < findDistance(currentCells[i],endCell)){
                        available.push(availableNeighbours[j])
                    }else if(direction == "vertical" && (availableNeighbours[j])[1] == (currentCells[i])[1] && findDistance(availableNeighbours[j],endCell) < findDistance(currentCells[i],endCell)){
                        available.push(availableNeighbours[j])
                    }
                }
            }else{
                dijkstraCalcDist(startCell,cols,rows)
                const finalDist = parseInt(targetCell.dataset.dist);
                var nextCell = targetCell
                for (let i = 0; i < finalDist+1; i++) {
                    var pathNeighbour = checkIfDist(checkIfType(checkNeighbours(nextCell.dataset.position.split(",").map(Number),cols,rows,1),"visited"),finalDist - i-1)
                    nextCell.dataset.state = "path";
                    nextCell = document.querySelector(`[data-position = "${chooseRandomNeighbour(pathNeighbour)}"]`)
                    await new Promise(resolve => setTimeout(resolve, speed));
                }
                return unvisited = 0
            }
        }
        if(available.length == 0){
            var index = 0;
            var neighbourFound = false;
            while(neighbourFound == false){
                if(index == historyStack.length){
                    window.alert("Solution could not be found!")
                    return unvisited = 0
                }
                const n = checkIfAvailable2(checkNeighbours(historyStack[index][0],cols,rows,1))
                if(n.length > 0){
                    currentCells = [n[0]]
                    historyStack.push(currentCells);
                    neighbourFound = true;
                }
                index += 1;
            }
        }else{
            currentCells = uniqueXDimensionalArr(available);
            historyStack.push(currentCells);
        }
    }
}