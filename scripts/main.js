//setup onload

// var rows = 25
// var cols = 25
var drawing = false;
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
        if(drawing == true && cell.dataset.state != "wall"){
            cell.dataset.state = "wall";
        }
        else if(drawing == true && cell.dataset.state == "wall"){
            cell.dataset.state = "unvisited";
        }
    })
    
    cell.addEventListener("mousedown", () => {
        if(cell.dataset.state != "wall"){
            cell.dataset.state = "wall";
        }
        else if(cell.dataset.state == "wall"){
            cell.dataset.state = "unvisited";
        }
    })
})