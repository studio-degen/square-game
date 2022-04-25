let grid;
let size = 80;
let cols, rows;
let colorNum = 6;
let colArray = [];
let rotator = {x: 360, y: 360};
let polyminoes = [[[2, 2], [3, 2], [3, 3], [4, 3], [4, 4]], 
                  [[4, 2], [5, 2], [5, 3], [6, 2]],
                  [[2, 3], [2, 4], [3, 4], [3, 5]],
                  [[2, 5], [2, 6], [3, 6], [4, 6]],
                  [[4, 5], [5, 5], [5, 6], [6, 5], [6, 6]],
                  [[5, 4], [6, 3], [6, 4]]
                  ];
let colors = ['green', 'red', 'blue', 'pink', 'yellow', 'orange'];

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

  polyminoes.forEach((p, index) => {
    p.forEach((c) => {
        grid[c[0]][c[1]].col.push(colors[index]);
    })
  });
}

function draw() {
  background(220);

  for(let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++) {
      grid[i][j].show();
      grid[i][j].rotatorCheck();
    }
  }

  fill(0);
  circle(rotator.x, rotator.y, 20);

}

setInterval(() => rotatomino(), 1000/15);

function rotatomino() {

  for(let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++) {
      //console.log('rot');
      if(grid[i][j].isRotator){
        let myCol = grid[i][j].col[grid[i][j].col.length - 1];
        //console.log(myCol, grid[i][j].col);
        if (keyIsDown(RIGHT_ARROW)) {
          let newpol = [];

          //1 cell away
          grid[i-1][j-1].col.forEach((c, index) => {
            if(c == myCol){
              grid[i-1][j-1].col.splice(index, 1);
              //grid[i-1][j-1].filled = false;
              let coord = [];
              coord.push(i+1);
              coord.push(j-1);
              newpol.push(coord);
            }
          });

          grid[i-1][j-1].col.forEach((c, index) => {
            if(c == myCol){
              grid[i-1][j-1].col.splice(index, 1);
              //grid[i-1][j-1].filled = false;
              let coord = [];
              coord.push(i+1);
              coord.push(j-1);
              newpol.push(coord);
            }
          });

          grid[i][j-1].col.forEach((c, index) => {
            if(c == myCol){
              grid[i][j-1].col.splice(index, 1);
              //grid[i][j-1].filled = false;
              let coord = [];
              coord.push(i+1);
              coord.push(j);
              newpol.push(coord);
            }
          });
          
          grid[i+1][j-1].col.forEach((c, index) => {
            if(c == myCol){
              grid[i+1][j-1].col.splice(index, 1);
              //grid[i+1][j-1].filled = false;
              let coord = [];
              coord.push(i+1);
              coord.push(j+1);
              newpol.push(coord);
            }
          });         

          grid[i+1][j].col.forEach((c, index) => {
            if(c == myCol){
              grid[i+1][j].col.splice(index, 1);
              //grid[i+1][j].filled = false;
              let coord = [];
              coord.push(i);
              coord.push(j+1);
              newpol.push(coord);
            }
          });
          
          grid[i+1][j+1].col.forEach((c, index) => {
            if(c == myCol){
              grid[i+1][j+1].col.splice(index, 1);
              //grid[i+1][j+1].filled = false;
              let coord = [];
              coord.push(i-1);
              coord.push(j+1);
              newpol.push(coord);
            }
          });
          
          grid[i][j+1].col.forEach((c, index) => {
            if(c == myCol){
              grid[i][j+1].col.splice(index, 1);
              //grid[i][j+1].filled = false;
              let coord = [];
              coord.push(i-1);
              coord.push(j);
              newpol.push(coord);
            }
          });
          
          grid[i-1][j+1].col.forEach((c, index) => {
            if(c == myCol){
              grid[i-1][j+1].col.splice(index, 1);
              //grid[i-1][j+1].filled = false;
              let coord = [];
              coord.push(i-1);
              coord.push(j-1);
              newpol.push(coord);
            }
          });
          
          grid[i-1][j].col.forEach((c, index) => {
            if(c == myCol){
              grid[i-1][j].col.splice(index, 1);
              //grid[i-1][j].filled = false;
              let coord = [];
              coord.push(i);
              coord.push(j-1);
              newpol.push(coord);
            }
          });


          //2 cell away
          //top
          grid[i-2][j-2].col.forEach((c, index) => {
            if(c == myCol){
              grid[i-2][j-2].col.splice(index, 1);
              //grid[i-2][j-2].filled = false;
              let coord = [];
              coord.push(i+2);
              coord.push(j-2);
              newpol.push(coord);
            }
          });
          
          grid[i-1][j-2].col.forEach((c, index) => {
            if(c == myCol){
              grid[i-1][j-2].col.splice(index, 1);
              //grid[i-1][j-2].filled = false;
              let coord = [];
              coord.push(i+2);
              coord.push(j-1);
              newpol.push(coord);
            }
          });
          
          grid[i][j-2].col.forEach((c, index) => {
            if(c == myCol){
              grid[i][j-2].col.splice(index, 1);
              //grid[i][j-2].filled = false;
              let coord = [];
              coord.push(i+2);
              coord.push(j);
              newpol.push(coord);
            }
          });
          
          grid[i+1][j-2].col.forEach((c, index) => {
            if(c == myCol){
              grid[i+1][j-2].col.splice(index, 1);
              //grid[i+1][j-2].filled = false;
              let coord = [];
              coord.push(i+2);
              coord.push(j+1);
              newpol.push(coord);
            }
          });
          
          //right
          grid[i+2][j-2].col.forEach((c, index) => {
            if(c == myCol){
              grid[i+2][j-2].col.splice(index, 1);
              //grid[i+2][j-2].filled = false;
              let coord = [];
              coord.push(i+2);
              coord.push(j+2);
              newpol.push(coord);
            }
          });
          
          grid[i+2][j-1].col.forEach((c, index) => {
            if(c == myCol){
              grid[i+2][j-1].col.splice(index, 1);
              //grid[i+2][j-1].filled = false;
              let coord = [];
              coord.push(i+1);
              coord.push(j+2);
              newpol.push(coord);
            }
          });
          
          grid[i+2][j].col.forEach((c, index) => {
            if(c == myCol){
              grid[i+2][j].col.splice(index, 1);
              //grid[i+2][j].filled = false;
              let coord = [];
              coord.push(i);
              coord.push(j+2);
              newpol.push(coord);
            }
          });
          
          grid[i+2][j+1].col.forEach((c, index) => {
            if(c == myCol){
              grid[i+2][j+1].col.splice(index, 1);
              //grid[i+2][j+1].filled = false;
              let coord = [];
              coord.push(i-1);
              coord.push(j+2);
              newpol.push(coord);
            }
          });
          
          //bottom
          grid[i+2][j+2].col.forEach((c, index) => {
            if(c == myCol){
              grid[i+2][j+2].col.splice(index, 1);
              grid[i+2][j+2].filled = false;
              let coord = [];
              coord.push(i-2);
              coord.push(j+2);
              newpol.push(coord);
            }
          });
          
          grid[i+1][j+2].col.forEach((c, index) => {
            if(c == myCol){
              grid[i+1][j+2].col.splice(index, 1);
              //grid[i+1][j+2].filled = false;
              let coord = [];
              coord.push(i-2);
              coord.push(j+1);
              newpol.push(coord);
            }
          });
          
          grid[i][j+2].col.forEach((c, index) => {
            if(c == myCol){
              grid[i][j+2].col.splice(index, 1);
              grid[i][j+2].filled = false;
              let coord = [];
              coord.push(i-2);
              coord.push(j);
              newpol.push(coord);
            }
          });
          
          grid[i-1][j+2].col.forEach((c, index) => {
            if(c == myCol){
              grid[i-1][j+2].col.splice(index, 1);
              //grid[i-1][j+2].filled = false;
              let coord = [];
              coord.push(i-2);
              coord.push(j-1);
              newpol.push(coord);
            }
          });

          //left
          grid[i-2][j+2].col.forEach((c, index) => {
            if(c == myCol){
              grid[i-2][j+2].col.splice(index, 1);
              //grid[i-2][j+2].filled = false;
              let coord = [];
              coord.push(i-2);
              coord.push(j-2);
              newpol.push(coord);
            }
          });
          
          grid[i-2][j+1].col.forEach((c, index) => {
            if(c == myCol){
              grid[i-2][j+1].col.splice(index, 1);
              //grid[i-2][j+1].filled = false;
              let coord = [];
              coord.push(i-1);
              coord.push(j-2);
              newpol.push(coord);
            }
          });
          
          grid[i-2][j].col.forEach((c, index) => {
            if(c == myCol){
              grid[i-2][j].col.splice(index, 1);
              //grid[i-2][j].filled = false;
              let coord = [];
              coord.push(i);
              coord.push(j-2);
              newpol.push(coord);
            }
          });
          
          grid[i-2][j-1].col.forEach((c, index) => {
            if(c == myCol){
              grid[i-2][j-1].col.splice(index, 1);
              //grid[i-2][j-1].filled = false;
              let coord = [];
              coord.push(i+1);
              coord.push(j-2);
              newpol.push(coord);
            }
          });
          


          //console.log(newpol);
          newpol.forEach((p) => {
            grid[p[0]][p[1]].col.push(myCol);
            //grid[p[0]][p[1]].filled = true;
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
    this.col = [255];
    this.isRotator = false;

  }

  show() {
    fill(this.col[this.col.length - 1]);
    rect(this.x, this.y, this.w, this.w);
    fill(0);
    text(this.col, this.x + 10, this.y + 45);
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