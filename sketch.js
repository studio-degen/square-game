let grid;
let size = 80;
let cols, rows;
let colorNum = 6;
let colArray = [];
let rotator = {x: 360, y: 360};
let polys = [[[2, 2], [3, 2], [3, 3], [4, 3], [4, 4]], 
              [[4, 2], [5, 2], [5, 3], [6, 2]],
              [[2, 3], [2, 4], [3, 4], [3, 5]],
              [[2, 5], [2, 6], [3, 6], [4, 6]],
              [[4, 5], [5, 5], [5, 6], [6, 5], [6, 6]],
              [[5, 4], [6, 3], [6, 4]]
              ];
let colors = ['#4E944F', '#83BD75', '#E9EFC0', '#363062', '#827397', '#E9D5DA'];
let val1 = 1;
let val2 = 7;
let rightBtn = false;

function createBoard() {
  let squares = [[2, 2], [2, 3], [2, 4], [2, 5], [2, 6],
                [3, 2], [3, 3], [3, 4], [3, 5], [3, 6],
                [4, 2], [4, 3], [4, 4], [4, 5], [4, 6],
                [5, 2], [5, 3], [5, 4], [5, 5], [5, 6],
                [6, 2], [6, 3], [6, 4], [6, 5], [6, 6]
                ];
  let polyominoes = [[], [], [], [], [], []];
  let rand = floor(random(25));
  let first = squares[rand];
  //console.log(first);
  polyominoes[0].push(first);
  squares.splice(squares[rand], 1);
  let firstNeigh = [[first[0]-1, first[1]-1], [first[0], first[1]-1], [first[0]+1, first[1]-1],
                    [first[0], first[1]-1], [first[0], first[1]+1],
                    [first[0]-1, first[1]+1], [first[0], first[1]+1], [first[0]+1, first[1]+1]];
}

function make2DArray(cols, rows){
  let arr = new Array(cols);
  for(let i = 0; i < arr.length; i++){
    arr[i] = new Array(rows);
  }
  return arr;
}

function setup() {
  createCanvas(720, 720);

  cols = floor(width/size);
  rows = floor(height/size);
  grid = make2DArray(cols, rows);

  for (let i = 0; i < colorNum; i++) {
    colArray.push(color(random(255), random(255), random(255)));
  }

  for(let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i * size, j * size, size)
    }
  }

  polys.forEach((p, index) => {
    p.forEach((c) => {
        grid[c[0]][c[1]].col.push(colors[index]);
    })
  });

  createBoard();
  //scramble(10);
}

function mousePressed() {
  if(mouseX > 2*size && mouseX < width-2*size && mouseY > 2*size && mouseY < height-2*size){
    rotator.x = mouseX;
    rotator.y = mouseY;
  }
  if(val1 != 0){
    let rotatorMapX = map(val1, 0.5, 5.5, 2*size, width-2*size);
    let rotatorMapY = map(val2, 5.5, 10.5, 2*size, height-2*size);
    //console.log(rotatorMapX, rotatorMapY);
  }else{
    if(val2 == 10){
      rightBtn = true;
      val2 = 0;
    }
  }
  
}

function draw() {
  background(220);
  //console.log(map(floor(random(5)), 0, 4, 2, 6));
  //console.log(cols, rows);

  for(let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++) {
      grid[i][j].show();
      grid[i][j].rotatorCheck();
    }
  }

  fill(0);
  circle(rotator.x, rotator.y, 20);

}

setInterval(() => stepLoop(), 1000/15);


function stepLoop() {

  for(let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++) {
      //console.log('rot');
      if(grid[i][j].isRotator){
        if(grid[i][j].col.length > 1) {
          let myCol = grid[i][j].col[grid[i][j].col.length - 1];
          //console.log(myCol, grid[i][j].col);

          let newpol = [];
          if (keyIsDown(RIGHT_ARROW)) {          
            newpol = rotatomino(i, j, 'right', myCol);
            
          }

          if (keyIsDown(LEFT_ARROW)) {
            newpol = rotatomino(i, j, 'left', myCol);

          }

          //console.log(newpol);
          newpol.forEach((p) => {
            grid[p[0]][p[1]].col.push(myCol);
            //grid[p[0]][p[1]].filled = true;
          });
        }

       // console.log(myCol);
      }
      
    }
  }
}

let rotateRight = [[[-1, -1, 1, -1], //one
                  [0, -1, 1, 0],
                  [1, -1, 1, 1],
                  [1, 0, 0, 1],
                  [1, 1, -1, 1],
                  [0, 1, -1, 0],
                  [-1, 1, -1, -1],
                  [-1, 0, 0, -1]],

                  [[-2, -2, 2, -2], //two //top
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
                  [-2, -1, 1, -2],]];


let rotateLeft = [[[-1, -1, -1, 1], //one
                  [0, -1, -1, 0],
                  [1, -1, -1, -1],
                  [1, 0, 0, -1],
                  [1, 1, 1, -1],
                  [0, 1, 1, 0],
                  [-1, 1, 1, 1],
                  [-1, 0, 0, 1]],

                  [[-2, -2, -2, 2], //two //top
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
                  [-2, -1, -1, 2],]];

function rotatomino(i, j, dir, myCol) {
  let newpol = [];
  if(dir == 'right'){
    //1 cell away
    rotateRight[0].forEach((colrow) => {
      grid[i+colrow[0]][j+colrow[1]].col.forEach((c, index) => {
        if(c == myCol){
          grid[i+colrow[0]][j+colrow[1]].col.splice(index, 1);
          //grid[i-1][j-1].filled = false;
          let coord = [];
          coord.push(i+colrow[2]);
          coord.push(j+colrow[3]);
          newpol.push(coord);
        }
      });
    });

    //2 cell away
    rotateRight[1].forEach((colrow) => {
      grid[i+colrow[0]][j+colrow[1]].col.forEach((c, index) => {
        if(c == myCol){
          grid[i+colrow[0]][j+colrow[1]].col.splice(index, 1);
          //grid[i-1][j-1].filled = false;
          let coord = [];
          coord.push(i+colrow[2]);
          coord.push(j+colrow[3]);
          newpol.push(coord);
        }
      });
    }); 
    return newpol;

  }else if(dir == 'left'){
    //1 cell away
    rotateLeft[0].forEach((colrow) => {
      grid[i+colrow[0]][j+colrow[1]].col.forEach((c, index) => {
        if(c == myCol){
          grid[i+colrow[0]][j+colrow[1]].col.splice(index, 1);
          //grid[i-1][j-1].filled = false;
          let coord = [];
          coord.push(i+colrow[2]);
          coord.push(j+colrow[3]);
          newpol.push(coord);
        }
      });
    });

    //2 cell away
    rotateLeft[1].forEach((colrow) => {
      grid[i+colrow[0]][j+colrow[1]].col.forEach((c, index) => {
        if(c == myCol){
          grid[i+colrow[0]][j+colrow[1]].col.splice(index, 1);
          //grid[i-1][j-1].filled = false;
          let coord = [];
          coord.push(i+colrow[2]);
          coord.push(j+colrow[3]);
          newpol.push(coord);
        }
      });
    }); 
    return newpol;

  }

}

function scramble(num) {
  for(let i = 0; i < num; i++){
    let x = floor(random(5));
    let y = floor(random(5));
    let r = random(1);

    let mapX = map(x, 0, 4, 2, 6);
    let mapY = map(y, 0, 4, 2, 6);


    if(grid[mapX][mapY].col.length > 1) {
      let myCol = grid[mapX][mapY].col[grid[mapX][mapY].col.length - 1];
      //console.log(myCol, grid[i][j].col);

      let newpol = [];

      if(r < 0.5){
        newpol = rotatomino(mapX, mapY, 'right', myCol);

      }else{
        newpol = rotatomino(mapX, mapY, 'left', myCol);

      }

      //console.log(newpol);
      newpol.forEach((p) => {
        grid[p[0]][p[1]].col.push(myCol);
        //grid[p[0]][p[1]].filled = true;
      });
    } 

  }
}


class Cell {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.col = [255];
    this.isRotator = false;

  }

  show() {
    fill(this.col[this.col.length - 1]);
    rect(this.x, this.y, this.w, this.w);
    //fill(0);
    //text(this.col, this.x + 10, this.y + 45);
  }

  rotatorCheck() {
    if(rotator.x < this.x + this.w && 
        rotator.x > this.x && 
        rotator.y < this.y + this.w && 
        rotator.y > this.y) {
      this.isRotator = true;
      rotator.x = this.x + this.w/2;
      rotator.y = this.y + this.w/2;
    }else{
      this.isRotator = false;
    }

    if(this.isRotator) {

    }
  }

}