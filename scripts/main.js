import {
  clearWalls,
  clearAll,
  recursiveBtMazeGen,
  randomPrimGen,
  randomMazeGen,
} from "./mazeGenerating.js";
import {
  setStartCell,
  clearPath,
  depthFirstSearch,
  dijkstra,
  aStar,
} from "./pathFinding.js";

//setup onload

var rows = 21;
var cols = 37;
var density = 0.35;
var drawing = false;
var cellNotChosen = true;
var setting = [false, ""];
var speed = 0;
var isboth = false;
const table = document.getElementById("grid");
var td = document.querySelectorAll("td");

document.onload = setup(rows, cols);

// if (confirm("Is this your first time using Algorthm?"))
//   $(".help-tab").toggleClass("ON");
// selectedTab();

// var gridSize = [document.getElementById("appCont").offsetWidth , document.getElementById("appCont").offsetHeight]
//window.addEventListener('resize', () => {var gridSize = [document.getElementById("appCont").offsetWidth , document.getElementById("appCont").offsetHeight]});

function setup(rows, cols) {
  //calculate amount of cols and rows fit for the screen
  for (let i = 0; i < rows; i++) {
    const tableRow = document.createElement("tr");
    tableRow.dataset.row = i;
    table.appendChild(tableRow);
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement("td");
      (cell.dataset.position = [i, j]), (cell.dataset.state = "unvisited");
      tableRow.appendChild(cell);
    }
  }
  eventListenerSetup();
}

function eventListenerSetup() {
  td = document.querySelectorAll("td");

  document.addEventListener("mousedown", () => {
    drawing = true;
  });
  document.addEventListener("mouseup", () => {
    drawing = false;
  });

  td.forEach((cell) => {
    cell.addEventListener("mouseover", () => {
      event.preventDefault();
      if (setting[0] == false) {
        if (drawing == true && cell.dataset.state == "unvisited") {
          cell.dataset.state = "wall";
        } else if (drawing == true && cell.dataset.state != "unvisited") {
          cell.dataset.state = "unvisited";
        }
      } else if (setting[0] == true && drawing == true) {
        cell.dataset.state = setting[1];
        setting = [false, ""];
        cellNotChosen = false;
        document.querySelectorAll("td").forEach((cell) => {
          cell.classList.remove("hover-start");
          cell.classList.remove("hover-end");
        });
        if (isboth) setStartEnd("end");
        isboth = false;
      }
    });

    cell.addEventListener("mousedown", () => {
      event.preventDefault();
      if (setting[0] == false) {
        if (cell.dataset.state == "unvisited") {
          cell.dataset.state = "wall";
        } else if (cell.dataset.state != "unvisited") {
          cell.dataset.state = "unvisited";
        }
      } else {
        cell.dataset.state = setting[1];
        setting = [false, ""];
        cellNotChosen = false;
        document.querySelectorAll("td").forEach((cell) => {
          cell.classList.remove("hover-start");
          cell.classList.remove("hover-end");
        });
        if (isboth) setStartEnd("end");
        isboth = false;
      }
    });
  });
}

document.querySelector("#generateMaze").onclick = () => {
  setSpeed();
  const aName = $(".algorithm-tab");
  try {
    const id = document
      .querySelector(".mazeGen-container")
      .querySelector(".active").id;
    //checks chosen algorithm and executes accordingly
    if (id == "randomMazeGen") {
      randomMazeGen(density);
    } else if (id == "recursiveBtMazeGen1") {
      recursiveBtMazeGen(rows, cols, "unvisited", speed);
    } else if (id == "recursiveBtMazeGen2") {
      recursiveBtMazeGen(rows, cols, "wall", speed);
    } else if (id == "randomPrim") {
      randomPrimGen(rows, cols, speed);
    }
    //changes pseudocode based on the executing algorithm
    aName.attr("id", id);
    changeAlgorithmPseudocode();
  } catch (err) {
    //catches an unchosen algorithm error
    window.alert("Please pick a Maze Generating Algorithm");
  } finally {
    //closes tabs for clarity
    document.querySelector(".tab").classList.remove("ON");
    selectedTab();
  }
};

document.querySelector("#findPath").onclick = () => {
  setSpeed();
  const aName = $(".algorithm-tab");
  try {
    const id = document
      .querySelector(".pathFind-container")
      .querySelector(".active").id;
    if (id == "depthFirstSearch") {
      depthFirstSearch(rows, cols, speed);
    } else if (id == "dijkstra") {
      dijkstra(rows, cols, speed);
    } else if (id == "aStar") {
      aStar(rows, cols, speed);
    }
    aName.attr("id", id);
    changeAlgorithmPseudocode();
  } catch (err) {
    window.alert("Please pick a Path Finding Algorithm");
  } finally {
    document.querySelector(".tab").classList.remove("ON");
    selectedTab();
  }
};

function setSpeed() {
  const id = document
    .querySelector(".speed-container")
    .querySelector(".active").id;
  if (id == "slow") {
    speed = 250;
  } else if (id == "medium") {
    speed = 50;
  } else if (id == "fast") {
    speed = 0;
  }
}

document.querySelector("#clearAll").onclick = () => {
  clearAll();
};
document.querySelector("button#clearAll").onclick = () => {
  clearAll();
};
document.querySelector("button#clearWalls").onclick = () => {
  clearWalls();
};
document.querySelector("button#clearPath").onclick = () => {
  clearPath();
};

document.querySelector("#setStartCell").onclick = () => {
  setStartEnd("start");
};
document.querySelector("#setEndCell").onclick = () => {
  setStartEnd("end");
};

document.querySelector("#setStartEnd").onclick = () => {
  isboth = true;
  setStartEnd("start");
};

function setStartEnd(node) {
  cellNotChosen = true;
  //adds hover state to all nodes
  document.querySelectorAll("td").forEach((cell) => {
    cell.classList.add(`hover-${node}`);
  });
  //sets variable for event listeners
  setting = [true, node];
  //closes the tab
  document.querySelector(".tab").classList.remove("ON");
  selectedTab();
  //remove previous start node
  try {
    document.querySelector(`[data-state = "${node}"]`).dataset.state =
      "unvisited";
  } catch (error) {}
  //loop until cell is chosen
}

document.querySelector(".color-tab .submit-button").onclick = () => {
  var root = document.querySelector(":root");
  var cName;
  //finds which theme is active
  if ($("#default").hasClass("active")) {
    cName = "default";
  } else if ($("#theme1").hasClass("active")) {
    cName = "theme1";
  } else if ($("#theme2").hasClass("active")) {
    cName = "theme2";
  } else {
    window.alert("Please pick a Theme");
  }
  //sets css variables in the root based on the theme
  root.style.setProperty(
    "--startColor",
    window
      .getComputedStyle(document.querySelector(`.${cName} .start-color`))
      .getPropertyValue("background-color")
  );
  root.style.setProperty(
    "--endColor",
    window
      .getComputedStyle(document.querySelector(`.${cName} .end-color`))
      .getPropertyValue("background-color")
  );
  root.style.setProperty(
    "--wallColor",
    window
      .getComputedStyle(document.querySelector(`.${cName} .wall-color`))
      .getPropertyValue("background-color")
  );
  root.style.setProperty(
    "--visitedColor",
    window
      .getComputedStyle(document.querySelector(`.${cName} .visited-color`))
      .getPropertyValue("background-color")
  );
  root.style.setProperty(
    "--unvisitedColor",
    window
      .getComputedStyle(document.querySelector(`.${cName} .unvisited-color`))
      .getPropertyValue("background-color")
  );
  root.style.setProperty(
    "--pathColor",
    window
      .getComputedStyle(document.querySelector(`.${cName} .path-color`))
      .getPropertyValue("background-color")
  );
};

function selectedTab() {
  $(".tab-button").removeClass("ON");
  if ($(".settings-tab").hasClass("ON")) {
    $("button.settings").addClass("ON");
  } else if ($(".color-tab").hasClass("ON")) {
    $("button.palette").addClass("ON");
  } else if ($(".grid-tab").hasClass("ON")) {
    $("button.grid").addClass("ON");
  } else if ($(".help-tab").hasClass("ON")) {
    $("button.help").addClass("ON");
  }
}

function isOdd(num) {
  return num % 2;
}

document.querySelector("#setGridSize").onclick = () => {
  cols = document.querySelector("input#columns").value;
  rows = document.querySelector("input#rows").value;
  if (cols > 100 || rows > 55)
    return alert("Grid Size exceeds the limit (55x100)");
  isOdd(cols) ? true : cols++;
  isOdd(rows) ? true : rows++;
  table.innerHTML = "";
  setup(rows, cols);
};

function changeAlgorithmPseudocode() {
  const aName = $(".algorithm-tab").attr("id");
  const heading = $(".algorithm-name");
  const pseudocode = $(".pseudocode");
  if (aName == "recursiveBtMazeGen1") {
    heading.text("Recursive Backtracking");
  } else if (aName == "recursiveBtMazeGen2") {
    heading.text("Reverse Recursive Backtracking");
  } else if (aName == "randomPrim") {
    heading.text("Random Prim's");
  } else if (aName == "randomMazeGen") {
    heading.text("Random Generator");
  } else if (aName == "depthFirstSearch") {
    heading.text("Depth First Search");
  } else if (aName == "dijkstra") {
    heading.text("Dijkstra's Algorithm");
  } else if (aName == "aStar") {
    heading.text("A* Search");
  } else {
    heading.text("Execute an Algorithm");
  }
  pseudocode.css(
    "background",
    "url(/assets/" + aName + ".png)no-repeat center top/contain"
  );
}

changeAlgorithmPseudocode();

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
