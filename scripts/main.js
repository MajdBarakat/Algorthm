import{clearWalls, clearAll, recursiveBtMazeGen,randomMazeGen} from './mazeGenerating.js';
import{setStartCell,setEndCell,depthFirstSearch, dijkstra, aStar} from './pathFinding.js';

//setup onload

var cols = 41
var rows = 60
var density = 0.35
var drawing = false;
var cellNotChosen = true;
var setting = [false,""]
var speed = 0;
const table = document.getElementById('grid')
var td = document.querySelectorAll('td')

document.onload = setup(cols,rows);

// var gridSize = [document.getElementById("appCont").offsetWidth , document.getElementById("appCont").offsetHeight]
//window.addEventListener('resize', () => {var gridSize = [document.getElementById("appCont").offsetWidth , document.getElementById("appCont").offsetHeight]});


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
    eventListenerSetup()
}

function eventListenerSetup(){
    td = document.querySelectorAll('td')

    document.addEventListener("mousedown", () => {
        drawing = true;
    })
    document.addEventListener("mouseup", () => {
        drawing = false;
    })
    
    td.forEach(cell => {
        cell.addEventListener("mouseover", () => {
            event.preventDefault();
            if(setting[0] == false){
                if(drawing == true && cell.dataset.state == "unvisited"){
                    cell.dataset.state = "wall";
                }else if(drawing == true && cell.dataset.state != "unvisited"){
                    cell.dataset.state = "unvisited";
                }
            }else if(setting[0] == true && drawing == true){
                cell.dataset.state = setting[1];
                setting = [false, ""]
                cellNotChosen = false
                document.querySelectorAll("td").forEach(cell => {
                    cell.classList.remove("hover-start")
                    cell.classList.remove("hover-end")
                })
            }
        })
        
        cell.addEventListener("mousedown", () => {
            event.preventDefault();
            if(setting[0] == false){
                if(cell.dataset.state == "unvisited"){
                    cell.dataset.state = "wall";
                }else if(cell.dataset.state != "unvisited"){
                    cell.dataset.state = "unvisited";
                }
            }else{
                cell.dataset.state = setting[1];
                setting = [false, ""]
                cellNotChosen = false
                document.querySelectorAll("td").forEach(cell => {
                    cell.classList.remove("hover-start")
                    cell.classList.remove("hover-end")
                })
            }
        })
    })
}

document.querySelector("#generateMaze").onclick = () =>{
    setSpeed();
    try{
        const id = document.querySelector(".mazeGen-container").querySelector(".active").id
        if(id == "randomMazeGen"){randomMazeGen(density);
        }else if(id == "recursiveBtMazeGen1"){recursiveBtMazeGen(cols,rows,'unvisited',speed)
    }else if(id == "recursiveBtMazeGen2"){recursiveBtMazeGen(cols,rows,'wall',speed)}
}catch(err){window.alert("Please pick a Maze Generating Algorithm")
}finally{document.querySelector(".tab").classList.remove("ON");selectedTab()}
}

document.querySelector("#findPath").onclick = () =>{
    setSpeed();
    try{
        const id = document.querySelector(".pathFind-container").querySelector(".active").id
        if(id == "depthFirstSearch"){depthFirstSearch(cols,rows,speed);
        }else if(id == "dijkstra"){dijkstra(cols,rows,speed)
    }else if(id == "aStar"){aStar(cols,rows,speed) }
}catch(err){window.alert("Please pick a Path Finding Algorithm")
}finally{document.querySelector(".tab").classList.remove("ON");selectedTab()}
}

function setSpeed(){
    const id = document.querySelector(".speed-container").querySelector(".active").id
    if(id == "slow"){speed = 250
    }else if(id == "medium"){speed = 50
    }else if(id == "fast"){speed = 0
    }
}

document.querySelector("#clearAll").onclick = () =>{clearAll()}
document.querySelector("button#clearAll").onclick = () =>{clearAll()}
document.querySelector("button#clearWalls").onclick = () =>{clearWalls()}


document.querySelector("#setStartCell").onclick = () =>{
    document.querySelectorAll("td").forEach(cell => {
        cell.classList.add("hover-start")
    })
    setting = [true, "start"]
    document.querySelector(".tab").classList.remove("ON");
    selectedTab();
    document.querySelector('[data-state = "start"]').dataset.state = "unvisited";
    if(cellNotChosen){
        setTimeout(100);
    }
}

document.querySelector("#setEndCell").onclick = () =>{
    document.querySelectorAll("td").forEach(cell => {
        cell.classList.add("hover-end")
    })
    setting = [true, "end"]
    document.querySelector(".tab").classList.remove("ON");
    selectedTab()
    document.querySelector('[data-state = "end"]').dataset.state = "unvisited";
    if(cellNotChosen){
        setTimeout(100);
    }
}

document.querySelector(".color-tab .submit-button").onclick = () => {
    var root = document.querySelector(':root');
    var cName;
    if($("#default").hasClass("active")){cName = "default"
    }else if($("#theme1").hasClass("active")){cName = "theme1"
    }else{window.alert("Please pick a Theme")}
    root.style.setProperty("--startColor", window.getComputedStyle(document.querySelector(`.${cName} .start-color`)).getPropertyValue("background-color"))
    root.style.setProperty("--endColor", window.getComputedStyle(document.querySelector(`.${cName} .end-color`)).getPropertyValue("background-color"))
    root.style.setProperty("--wallColor", window.getComputedStyle(document.querySelector(`.${cName} .wall-color`)).getPropertyValue("background-color"))
    root.style.setProperty("--visitedColor", window.getComputedStyle(document.querySelector(`.${cName} .visited-color`)).getPropertyValue("background-color"))
    root.style.setProperty("--unvisitedColor", window.getComputedStyle(document.querySelector(`.${cName} .unvisited-color`)).getPropertyValue("background-color"))
    root.style.setProperty("--pathColor", window.getComputedStyle(document.querySelector(`.${cName} .path-color`)).getPropertyValue("background-color"))
}

function selectedTab(){
    $(".tab-button").removeClass("ON");
    if($(".settings-tab").hasClass("ON")){$("button.settings").addClass("ON")
}else if($(".color-tab").hasClass("ON")){$("button.palette").addClass("ON")
}else if($(".grid-tab").hasClass("ON")){$("button.grid").addClass("ON")
}else if($(".help-tab").hasClass("ON")){$("button.help").addClass("ON")}
}

function isOdd(num) { return num % 2;}


document.querySelector("#setGridSize").onclick = () =>{
    cols = document.querySelector("input#columns").value
    rows = document.querySelector("input#rows").value
    isOdd(cols)?true:cols++;
    isOdd(rows)?true:rows++;
    table.innerHTML = "";
    setup(cols,rows)
}


// td.forEach(cell => {
    //     cell.style.width = (gridSize[0]/cols
    //     cell.style.height = gridSize[1]/rows
    //     //console.log("hello")
    // })

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