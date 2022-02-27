//setup onload

// var rows = 25
// var cols = 25
const table = document.getElementById('grid')

document.onload = setup(25,25);

function setup(cols,rows){
    //calculate amount of cols and rows fit for the screen 
    for (let i = 0; i < cols; i++) {
        const tableRow = document.createElement('tr')
        tableRow.dataset.row = i
        table.appendChild(tableRow);
        for (let j = 0; j < rows; j++) {
            const square = document.createElement('td')
            square.dataset.position = [i,j], square.dataset.state = "unvisted"
            if(square.dataset.position == [1,1]) square.dataset.state = "visited"; //refactor this later
            tableRow.appendChild(square)
        }
    }
}

function RecursiveBackTracking(){
    
}