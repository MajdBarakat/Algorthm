import{clearWalls, recursiveBtMazeGen,randomMazeGen} from './mazeGenerating.js';
import{setStartCell,setEndCell,depthFirstSearch, dijkstra} from './pathFinding.js';

//setup onload

// var rows = 25
// var cols = 25
var drawing = false;
var dragStart = false;
const table = document.getElementById('grid')

document.onload = setup(29,25);

function setup(cols,rows){
    //calculate amount of cols and rows fit for the screen 
    for (let i = 0; i < cols; i++) {
        const tableRow = document.createElement('tr')
        tableRow.dataset.row = i
        table.appendChild(tableRow);
        for (let j = 0; j < rows; j++) {
            const cell = document.createElement('td')
            cell.dataset.position = [i,j], cell.dataset.state = "unvisited"
            tableRow.appendChild(cell)
        }
    }
}

const clearWallsButton = document.getElementById("clearWalls")
const randomMazeGenButton = document.getElementById("randomMazeGen")
const recursiveBtMazeGen1Button = document.getElementById("recursiveBtMazeGen1")
const recursiveBtMazeGen2Button = document.getElementById("recursiveBtMazeGen2")
const setStartCellButton = document.getElementById("setStartCell")
const setEndCellButton = document.getElementById("setEndCell")
const depthFirstSearchButton = document.getElementById("depthFirstSearch")
const dijkstraButton = document.getElementById("dijkstra")


clearWallsButton.addEventListener('click', () => {clearWalls()})
randomMazeGenButton.addEventListener('click', () => {randomMazeGen(.35)})
recursiveBtMazeGen1Button.addEventListener('click', () => {recursiveBtMazeGen(29,25,'unvisited')})
recursiveBtMazeGen2Button.addEventListener('click', () => {recursiveBtMazeGen(29,25,'wall')})
setStartCellButton.addEventListener('click', () => {setStartCell([1,1])})
setEndCellButton.addEventListener('click', () => {setEndCell([27,23])})
depthFirstSearchButton.addEventListener('click', () => {depthFirstSearch(29,25)})
dijkstraButton.addEventListener('click', () => {dijkstra(29,25)})





// $(document).ready(function() {
//     $('.event').on("dragstart", function(event) {
//       var dt = event.originalEvent.dataTransfer;
//       dt.setData('Text', $(this).attr('id'));
//     });
//     $('table td').on("dragenter dragover drop", function(event) {
//       event.preventDefault();
//       if (event.type === 'drop') {
//         var data = event.originalEvent.dataTransfer.getData('Text', $(this).attr('id'));
  
//         de = $('#' + data).detach();
//         if (event.originalEvent.target.tagName === "SPAN") {
//           de.insertBefore($(event.originalEvent.target));
//         } else {
//           de.appendTo($(this));
//         }
//       };
//     });
//   })

//drawing eventListeners

const td = document.querySelectorAll('td')

document.addEventListener("mousedown", () => {
    event.preventDefault();
    drawing = true;
})
document.addEventListener("mouseup", () => {
    drawing = false;
})
td.forEach(cell => {
    cell.addEventListener("mouseover", () => {
        if(drawing == true && cell.dataset.state == "unvisited"){
            cell.dataset.state = "wall";
        }
        else if(drawing == true && cell.dataset.state == "wall"){
            cell.dataset.state = "unvisited";
        }
        else if(drawing == true && cell.dataset.state == "start"){
            console.log("drag")
           // cell.dataset.state = "unvisited";
        }
    })
    
    cell.addEventListener("mousedown", () => {
        if(cell.dataset.state == "unvisited"){
            cell.dataset.state = "wall";
        }
        else if(cell.dataset.state == "wall"){
            cell.dataset.state = "unvisited";
        }
        else if(cell.dataset.state == "start"){
            //cell.dataset.state = "unvisited";
        }
    })
})
