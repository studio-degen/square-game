//let grid;
let size = 80;
let cols, rows;
//let rotator = {x: 360, y: 360};
let polys = {
  player1: [
    [
      [2, 2],
      [3, 2],
      [3, 3],
      [4, 3],
      [4, 4],
    ],
    [
      [4, 2],
      [5, 2],
      [5, 3],
      [6, 2],
    ],
    [
      [2, 3],
      [2, 4],
      [3, 4],
      [3, 5],
    ],
  ],
  player2: [
    [
      [2, 5],
      [2, 6],
      [3, 6],
      [4, 6],
    ],
    [
      [4, 5],
      [5, 5],
      [5, 6],
      [6, 5],
      [6, 6],
    ],
    [
      [5, 4],
      [6, 3],
      [6, 4],
    ],
  ],
};
let colors = {
  player1: ["#4E944F", "#83BD75", "#E9EFC0"],
  player2: ["#363062", "#827397", "#E9D5DA"],
};
let serial; // variable to hold an instance of the serialport library
let portName = "/dev/tty.usbserial-1420"; // fill in your serial port name here
let inData; // for incoming serial data
let prevVal = -1;
let timeInterval = 200;
let startTime = 0;
let sqWidth = 80;

let val1 = -1;
let val2 = -2;
let pVal1 = -3;
let pVal2 = -4;
let turn = false;
let rightBtn = false;
let leftBtn = false;
let shared;
let me;

//FUTURE PROCEDURAL BOARD
// function createBoard() {
//   let squares = [[2, 2], [2, 3], [2, 4], [2, 5], [2, 6],
//                 [3, 2], [3, 3], [3, 4], [3, 5], [3, 6],
//                 [4, 2], [4, 3], [4, 4], [4, 5], [4, 6],
//                 [5, 2], [5, 3], [5, 4], [5, 5], [5, 6],
//                 [6, 2], [6, 3], [6, 4], [6, 5], [6, 6]
//                 ];
//   let polyominoes = [[], [], [], [], [], []];
//   let rand = floor(random(25));
//   let first = squares[rand];
//   //console.log(first);
//   polyominoes[0].push(first);
//   squares.splice(squares[rand], 1);
//   let firstNeigh = [[first[0]-1, first[1]-1], [first[0], first[1]-1], [first[0]+1, first[1]-1],
//                     [first[0], first[1]-1], [first[0], first[1]+1],
//                     [first[0]-1, first[1]+1], [first[0], first[1]+1], [first[0]+1, first[1]+1]];
// }

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function preload() {
  partyConnect("wss://deepstream-server-1.herokuapp.com", "sqg", "ar");

  shared = partyLoadShared("shared");
  me = partyLoadMyShared();
}

function setup() {
  createCanvas(720, 720);
  rectMode(CORNER);

  me.rotator = { x: 360, y: 360 };

  cols = floor(width / size);
  rows = floor(height / size);
  if (partyIsHost()) {
    shared.currentTurn = shared.currentTurn || "p1";
    shared.grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        shared.grid[i][j] = {
          x: i * size,
          y: j * size,
          w: size,
          col: [255],
          isRotator: false,
        };
      }
    }

    polys.player1.forEach((p, index) => {
      p.forEach((c) => {
        shared.grid[c[0]][c[1]].col.push(colors.player1[index]);
      });
    });
    polys.player2.forEach((p, index) => {
      p.forEach((c) => {
        shared.grid[c[0]][c[1]].col.push(colors.player2[index]);
      });
    });

    //createBoard();
    scramble(10);
  }

  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
}

function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    // console.log(i + portList[i]);
  }
}
function serverConnected() {
  console.log('connected to server.');
}
function portOpen() {
  console.log('the serial port opened.')
}
function serialEvent() {
  inData = Number(serial.read());
  calculateGridPos(inData);
}
function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}
function portClose() {
  console.log('The serial port closed.');
}

function calculateGridPos(inData){
  if(inData < 6){
    val1 = inData;
  }else if(inData >= 6){
    val2 = inData;
  }

  if(val1 !== pVal1 || val2 !== pVal2){
    console.log("new val1");
    console.log("1: "+val1+", "+pVal1);
    console.log("new val2");
    console.log("2: "+val2+", "+pVal2);
    //use vals data
    useVals(val1,val2);

    pVal1 = val1;
    pVal2 = val2;
  }
}

function useVals(val1,val2){
  if(val1 != 0){
    let rotatorMapX = map(val2, 5.5, 10.5, 2*size, height-2*size);
    let rotatorMapY = map(val1, 0.5, 5.5, 2*size, width-2*size);
    console.log(rotatorMapX, rotatorMapY);
    me.rotator.x = rotatorMapX;
    me.rotator.y = rotatorMapY;
  }

  if(val1 == 0 && val2 == 10){
    rightBtn = true;
    console.log(rightBtn);
    // setTimeout(()=>{
    //   rightBtn = false;
    // }, 1000);
  }else if(val1 == 0 && val2 == 9){
    leftBtn = true;
    // setTimeout(()=>{
    //   leftBtn = false;
    // }, 1000);
  }
  // else{
  //   leftBtn = false;
  //   rightBtn = false;
  // }
}

function mousePressed() {
  // console.log(rightBtn);
  if (
    mouseX > 2 * size &&
    mouseX < width - 2 * size &&
    mouseY > 2 * size &&
    mouseY < height - 2 * size
  ) {
    me.rotator.x = mouseX;
    me.rotator.y = mouseY;
  }
  if (val1 != 0) {
    // let rotatorMapX = map(val1, 0.5, 5.5, 2*size, width-2*size);
    // let rotatorMapY = map(val2, 5.5, 10.5, 2*size, height-2*size);
    //console.log(rotatorMapX, rotatorMapY);
  } else {
    if (val2 == 10) {
      rightBtn = true;
      val2 = 0;
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // grid[i][j].show();
      // grid[i][j].rotatorCheck();

      if (
        me.rotator.x < shared.grid[i][j].x + shared.grid[i][j].w &&
        me.rotator.x > shared.grid[i][j].x &&
        me.rotator.y < shared.grid[i][j].y + shared.grid[i][j].w &&
        me.rotator.y > shared.grid[i][j].y
      ) {
        shared.grid[i][j].isRotator = true;
        me.rotator.x = shared.grid[i][j].x + shared.grid[i][j].w / 2;
        me.rotator.y = shared.grid[i][j].y + shared.grid[i][j].w / 2;
      } else {
        shared.grid[i][j].isRotator = false;
      }
    }
  }
}

function draw() {
  background(220);
  stroke(0);

  //console.log(map(floor(random(5)), 0, 4, 2, 6));
  //console.log(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // grid[i][j].show();
      // grid[i][j].rotatorCheck();
      rectMode(CORNER);
      noStroke();
      for (let q = 1; q < shared.grid[i][j].col.length; q++) {
        let c = color(shared.grid[i][j].col[shared.grid[i][j].col.length - q]);
        c.setAlpha(180);
        fill(c);
        // fill(shared.grid[i][j].col[shared.grid[i][j].col.length - 1]);
        rect(
          shared.grid[i][j].x,
          shared.grid[i][j].y,
          shared.grid[i][j].w,
          shared.grid[i][j].w
        );
      }
      // let c = color(shared.grid[i][j].col[shared.grid[i][j].col.length - 1]);
      // c.setAlpha(80);
      // fill(c);
      // // fill(shared.grid[i][j].col[shared.grid[i][j].col.length - 1]);
      // rect(
      //   shared.grid[i][j].x,
      //   shared.grid[i][j].y,
      //   shared.grid[i][j].w,
      //   shared.grid[i][j].w
      // );
    }
  }

  //rectMode(CENTER);
  fill(0, 100);
  noStroke();
  ellipse(me.rotator.x, me.rotator.y, 20, 20);
}

// setInterval(() => stepLoop(), 1000/15);

// function keyReleased() {
//   if (keyCode === 32) {
//     if(shared.currentTurn == 'p1'){
//       shared.currentTurn = 'p2';
//     }else if(shared.currentTurn == 'p2'){
//       shared.currentTurn = 'p1';
//     }
//   }
// }

function keyPressed() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      //console.log('rot');

      if (shared.grid[i][j].isRotator) {
        if (shared.grid[i][j].col.length > 1) {
          let myCol = shared.grid[i][j].col[shared.grid[i][j].col.length - 1];
          //console.log(myCol, shared.grid[i][j].col);
          if (partyIsHost()) {
            colors.player1.forEach((c) => {
              if (c == myCol) {
                let newpol = [];
                if (keyIsDown(RIGHT_ARROW)|| rightBtn) {
                  rightBtn = false;
                  newpol = rotatomino(i, j, "right", myCol);
                } else if (keyIsDown(LEFT_ARROW) || leftBtn) {
                  newpol = rotatomino(i, j, "left", myCol);
                }

                //console.log(newpol);
                newpol.forEach((p) => {
                  shared.grid[p[0]][p[1]].col.push(myCol);
                  //grid[p[0]][p[1]].filled = true;
                });
              }
            });
          } else {
            colors.player2.forEach((c) => {
              if (c == myCol) {
                let newpol = [];
                if (keyIsDown(RIGHT_ARROW) || rightBtn) {
                  rightBtn = false;
                  newpol = rotatomino(i, j, "right", myCol);
                } else if (keyIsDown(LEFT_ARROW) || leftBtn) {
                  newpol = rotatomino(i, j, "left", myCol);
                }

                //console.log(newpol);
                newpol.forEach((p) => {
                  shared.grid[p[0]][p[1]].col.push(myCol);
                  //grid[p[0]][p[1]].filled = true;
                });
              }
            });
          }
        }

        // console.log(myCol);
      }
    }
  }
}

let rotateRight = [
  [
    [-1, -1, 1, -1], //one
    [0, -1, 1, 0],
    [1, -1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, -1, 1],
    [0, 1, -1, 0],
    [-1, 1, -1, -1],
    [-1, 0, 0, -1],
  ],

  [
    [-2, -2, 2, -2], //two //top
    [-1, -2, 2, -1],
    [0, -2, 2, 0],
    [1, -2, 2, 1],

    [2, -2, 2, 2], //right
    [2, -1, 1, 2],
    [2, 0, 0, 2],
    [2, 1, -1, 2],

    [2, 2, -2, 2], //bottom
    [1, 2, -2, 1],
    [0, 2, -2, 0],
    [-1, 2, -2, -1],

    [-2, 2, -2, -2], //left
    [-2, 1, -1, -2],
    [-2, 0, 0, -2],
    [-2, -1, 1, -2],
  ],
];

let rotateLeft = [
  [
    [-1, -1, -1, 1], //one
    [0, -1, -1, 0],
    [1, -1, -1, -1],
    [1, 0, 0, -1],
    [1, 1, 1, -1],
    [0, 1, 1, 0],
    [-1, 1, 1, 1],
    [-1, 0, 0, 1],
  ],

  [
    [-2, -2, -2, 2], //two //top
    [-1, -2, -2, 1],
    [0, -2, -2, 0],
    [1, -2, -2, -1],

    [2, -2, -2, -2], //right
    [2, -1, -1, -2],
    [2, 0, 0, -2],
    [2, 1, 1, -2],

    [2, 2, 2, -2], //bottom
    [1, 2, 2, -1],
    [0, 2, 2, 0],
    [-1, 2, 2, 1],

    [-2, 2, 2, 2], //left
    [-2, 1, 1, 2],
    [-2, 0, 0, 2],
    [-2, -1, -1, 2],
  ],
];

function rotatomino(i, j, dir, myCol) {
  let newpol = [];
  if (dir == "right") {
    //1 cell away
    rotateRight[0].forEach((colrow) => {
      shared.grid[i + colrow[0]][j + colrow[1]].col.forEach((c, index) => {
        if (c == myCol) {
          shared.grid[i + colrow[0]][j + colrow[1]].col.splice(index, 1);
          //grid[i-1][j-1].filled = false;
          let coord = [];
          coord.push(i + colrow[2]);
          coord.push(j + colrow[3]);
          newpol.push(coord);
        }
      });
    });

    //2 cell away
    rotateRight[1].forEach((colrow) => {
      shared.grid[i + colrow[0]][j + colrow[1]].col.forEach((c, index) => {
        if (c == myCol) {
          shared.grid[i + colrow[0]][j + colrow[1]].col.splice(index, 1);
          //grid[i-1][j-1].filled = false;
          let coord = [];
          coord.push(i + colrow[2]);
          coord.push(j + colrow[3]);
          newpol.push(coord);
        }
      });
    });
    return newpol;
  } else if (dir == "left") {
    //1 cell away
    rotateLeft[0].forEach((colrow) => {
      shared.grid[i + colrow[0]][j + colrow[1]].col.forEach((c, index) => {
        if (c == myCol) {
          shared.grid[i + colrow[0]][j + colrow[1]].col.splice(index, 1);
          //grid[i-1][j-1].filled = false;
          let coord = [];
          coord.push(i + colrow[2]);
          coord.push(j + colrow[3]);
          newpol.push(coord);
        }
      });
    });

    //2 cell away
    rotateLeft[1].forEach((colrow) => {
      shared.grid[i + colrow[0]][j + colrow[1]].col.forEach((c, index) => {
        if (c == myCol) {
          shared.grid[i + colrow[0]][j + colrow[1]].col.splice(index, 1);
          //grid[i-1][j-1].filled = false;
          let coord = [];
          coord.push(i + colrow[2]);
          coord.push(j + colrow[3]);
          newpol.push(coord);
        }
      });
    });
    return newpol;
  }
}

function scramble(num) {
  for (let i = 0; i < num; i++) {
    let x = floor(random(5));
    let y = floor(random(5));
    let r = random(1);

    let mapX = map(x, 0, 4, 2, 6);
    let mapY = map(y, 0, 4, 2, 6);

    if (shared.grid[mapX][mapY].col.length > 1) {
      let myCol =
        shared.grid[mapX][mapY].col[shared.grid[mapX][mapY].col.length - 1];
      //console.log(myCol, grid[i][j].col);

      let newpol = [];

      if (r < 0.5) {
        newpol = rotatomino(mapX, mapY, "right", myCol);
      } else {
        newpol = rotatomino(mapX, mapY, "left", myCol);
      }

      //console.log(newpol);
      newpol.forEach((p) => {
        shared.grid[p[0]][p[1]].col.push(myCol);
        //grid[p[0]][p[1]].filled = true;
      });
    }
  }
}
