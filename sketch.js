let grid;
let size = 80;
let cols, rows;
let colorNum = 6;
let colArray = [];
let rotator = {x: 360, y: 360};
let polyomino = [[3, 2], [3, 3], [3, 4], [4, 3]];
let polyomino2 = [[5, 1], [5, 2], [6, 2], [6, 3], [7, 3]];

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

  polyomino.forEach((p) => {
    grid[p[0]][p[1]].col = 'green';
    grid[p[0]][p[1]].filled = true;
  })

  polyomino2.forEach((p) => {
    grid[p[0]][p[1]].col = 'red';
    grid[p[0]][p[1]].filled = true;
  })

}

function draw() {
  background(220);

  for(let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++) {
      grid[i][j].show();
      grid[i][j].rotatorCheck();
    }
  }


  // grid[3][2].col = 'green';
  // grid[3][3].col = 'green';
  // grid[3][4].col = 'green';
  // grid[4][3].col = 'green';

  // grid[3][2].filled = true;
  // grid[3][3].filled = true;
  // grid[3][4].filled = true;
  // grid[4][3].filled = true;

  fill(0);
  circle(rotator.x, rotator.y, 20);

  


}

setInterval(() => rotatomino(), 1000/15);

function rotatomino() {
  for(let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++) {
      if(grid[i][j].filled && grid[i][j].isRotator){
        let myCol = grid[i][j].col;
        if (keyIsDown(RIGHT_ARROW)) {
          let newpol = [];

          //1 cell away
          if(grid[i-1][j-1].col == myCol){
            grid[i-1][j-1].col = 255;
            grid[i-1][j-1].filled ==false;
            let coord = [];
            coord.push(i+1);
            coord.push(j-1);
            newpol.push(coord);
          }
          if(grid[i][j-1].col == myCol){
            grid[i][j-1].col = 255;
            grid[i][j-1].filled = false;
            let coord = [];
            coord.push(i+1);
            coord.push(j);
            newpol.push(coord);
          }
          if(grid[i+1][j-1].col == myCol){
            grid[i+1][j-1].col = 255;
            grid[i+1][j-1].filled = false;
            let coord = [];
            coord.push(i+1);
            coord.push(j+1);
            newpol.push(coord);
          }
          if(grid[i+1][j].col == myCol){
            grid[i+1][j].col = 255;
            grid[i+1][j].filled = false;
            let coord = [];
            coord.push(i);
            coord.push(j+1);
            newpol.push(coord);
          }
          if(grid[i+1][j+1].col == myCol){
            grid[i+1][j+1].col = 255;
            grid[i+1][j+1].filled = false;
            let coord = [];
            coord.push(i-1);
            coord.push(j+1);
            newpol.push(coord);
          }
          if(grid[i][j+1].col == myCol){
            grid[i][j+1].col = 255;
            grid[i][j+1].filled = false;
            let coord = [];
            coord.push(i-1);
            coord.push(j);
            newpol.push(coord);
          }
          if(grid[i-1][j+1].col == myCol){
            grid[i-1][j+1].col = 255;
            grid[i-1][j+1].filled = false;
            let coord = [];
            coord.push(i-1);
            coord.push(j-1);
            newpol.push(coord);
          }
          if(grid[i-1][j].col == myCol){
            grid[i-1][j].col = 255;
            grid[i-1][j].filled = false;
            let coord = [];
            coord.push(i);
            coord.push(j-1);
            newpol.push(coord);
          }

          //2 cell away
          //top
          if(grid[i-2][j-2].col == myCol){
            grid[i-2][j-2].col = 255;
            grid[i-2][j-2].filled = false;
            let coord = [];
            coord.push(i+2);
            coord.push(j-2);
            newpol.push(coord);
          }
          if(grid[i-1][j-2].col == myCol){
            grid[i-1][j-2].col = 255;
            grid[i-1][j-2].filled = false;
            let coord = [];
            coord.push(i+2);
            coord.push(j-1);
            newpol.push(coord);
          }
          if(grid[i][j-2].col == myCol){
            grid[i][j-2].col = 255;
            grid[i][j-2].filled = false;
            let coord = [];
            coord.push(i+2);
            coord.push(j);
            newpol.push(coord);
          }
          if(grid[i+1][j-2].col == myCol){
            grid[i+1][j-2].col = 255;
            grid[i+1][j-2].filled = false;
            let coord = [];
            coord.push(i+2);
            coord.push(j+1);
            newpol.push(coord);
          }
          //right
          if(grid[i+2][j-2].col == myCol){
            grid[i+2][j-2].col = 255;
            grid[i+2][j-2].filled = false;
            let coord = [];
            coord.push(i+2);
            coord.push(j+2);
            newpol.push(coord);
          }
          if(grid[i+2][j-1].col == myCol){
            grid[i+2][j-1].col = 255;
            grid[i+2][j-1].filled = false;
            let coord = [];
            coord.push(i+1);
            coord.push(j+2);
            newpol.push(coord);
          }
          if(grid[i+2][j].col == myCol){
            grid[i+2][j].col = 255;
            grid[i+2][j].filled = false;
            let coord = [];
            coord.push(i);
            coord.push(j+2);
            newpol.push(coord);
          }
          if(grid[i+2][j+1].col == myCol){
            grid[i+2][j+1].col = 255;
            grid[i+2][j+1].filled = false;
            let coord = [];
            coord.push(i-1);
            coord.push(j+2);
            newpol.push(coord);
          }
          //bottom
          if(grid[i+2][j+2].col == myCol){
            grid[i+2][j+2].col = 255;
            grid[i+2][j+2].filled = false;
            let coord = [];
            coord.push(i-2);
            coord.push(j+2);
            newpol.push(coord);
          }
          if(grid[i+1][j+2].col == myCol){
            grid[i+1][j+2].col = 255;
            grid[i+1][j+2].filled = false;
            let coord = [];
            coord.push(i-2);
            coord.push(j+1);
            newpol.push(coord);
          }
          if(grid[i][j+2].col == myCol){
            grid[i][j+2].col = 255;
            grid[i][j+2].filled = false;
            let coord = [];
            coord.push(i-2);
            coord.push(j);
            newpol.push(coord);
          }
          if(grid[i-1][j+2].col == myCol){
            grid[i-1][j+2].col = 255;
            grid[i-1][j+2].filled = false;
            let coord = [];
            coord.push(i-2);
            coord.push(j-1);
            newpol.push(coord);
          }
          //left
          if(grid[i-2][j+2].col == myCol){
            grid[i-2][j+2].col = 255;
            grid[i-2][j+2].filled = false;
            let coord = [];
            coord.push(i-2);
            coord.push(j-2);
            newpol.push(coord);
          }
          if(grid[i-2][j+1].col == myCol){
            grid[i-2][j+1].col = 255;
            grid[i-2][j+1].filled = false;
            let coord = [];
            coord.push(i-1);
            coord.push(j-2);
            newpol.push(coord);
          }
          if(grid[i-2][j].col == myCol){
            grid[i-2][j].col = 255;
            grid[i-2][j].filled = false;
            let coord = [];
            coord.push(i);
            coord.push(j-2);
            newpol.push(coord);
          }
          if(grid[i-2][j-1].col == myCol){
            grid[i-2][j-1].col = 255;
            grid[i-2][j-1].filled = false;
            let coord = [];
            coord.push(i+1);
            coord.push(j-2);
            newpol.push(coord);
          }


          //console.log(newpol);
          newpol.forEach((p) => {
            grid[p[0]][p[1]].col = myCol;
            grid[p[0]][p[1]].filled = true;
          })
        }
       // console.log(myCol);
      }
      
    }
  }
}

function mousePressed() {
  if(mouseX > 2*size && mouseX < width-2*size && mouseY > 2*size && mouseY < height-2*size){
    rotator.x = mouseX;
    rotator.y = mouseY;
  }
}


class Cell {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    //this.col = random(colArray);
    this.col = 255;
    this.filled = false;
    this.isRotator = false;

  }

  show() {
    fill(this.col);
    rect(this.x, this.y, this.w, this.w);
  }

  rotatorCheck() {
    if(rotator.x < this.x + this.w && 
        rotator.x > this.x && 
        rotator.y < this.y + this.w && 
        rotator.y > this.y) {
      this.isRotator = true;
      //console.log(this.x, this.y);
      rotator.x = this.x + this.w/2;
      rotator.y = this.y + this.w/2;
    }else{
      this.isRotator = false;
    }

    if(this.isRotator && this.filled) {
      
    }
  }

}