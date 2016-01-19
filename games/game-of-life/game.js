/**
  Thomas Donohue
  Conway's Game of Life
  tdonohu1.me
**/
 var Mouse = { 
  x: 0,
  y: 0
}
var isMouseDown = false;
document.onmousedown = function() { isMouseDown = true  };
document.onmouseup   = function() { isMouseDown = false };
var game = {
  rows: 0,
  columns: 0,
  grid: [],
  cellsize: 0,
  generation: 0,
  running: false,

  init: function(){
    this.rows = Math.floor(context.canvas.height / cellSize);
    this.columns = Math.floor(context.canvas.width / cellSize);
    this.grid = Create2DGrid(this.rows, this.columns, 0);

    drawGrid(context, cellSize);

      canvas.onmousemove = function (event) {  
        event.preventDefault();
        if(isMouseDown) { 
          Mouse = {
            x: event.pageX - this.offsetLeft,
            y: event.pageY - this.offsetTop
          }

        var x = Math.floor(Mouse.x / cellSize);
        var y = Math.floor(Mouse.y / cellSize);

        game.updateGrid(x, y, 'mousemove');
        game.draw(x, y);
      }
    }

    canvas.onmousedown = function(event){
      Mouse = {
        x: event.pageX - this.offsetLeft,
        y: event.pageY - this.offsetTop
      }
        var x = Math.floor(Mouse.x / cellSize);
        var y = Math.floor(Mouse.y / cellSize);

        game.updateGrid(x, y, 'mousedown');
        game.draw(x, y);

      }


    },

    step: function(){
      this.generation++;
      document.getElementById("generation").innerHTML = "<p>" + "Generation " + this.generation + "</p>";

      var cells = [];
      var cellPos = [];

      for(var i = 0; i < this.grid.length; i++){
        for(var j = 0; j < this.grid[i].length; j++){
          var neighbors = getNeighbors(this.grid, i, j);
          var liveCount = getLiveNeighborCount(neighbors, i, j);
          var pos = {
              x: i,
              y: j
          };
          if(this.grid[i][j] == 1){
            if(liveCount > 3 || liveCount < 2){
              cells.push(2);
              cellPos.push(pos);
            }
          }else{
            if(liveCount == 3){
              cells.push(1);
              cellPos.push(pos);
            }
          }
        }
      }
      for(var i = 0; i < cellPos.length; i++){
        var p = cellPos[i];
        var x = p.x;
        var y = p.y;
        var cellVal = cells[i];
        this.grid[x][y] = cellVal;
        game.draw(x, y);
      }
    },

    updateGrid: function(x, y, action){
      var status = "dead";
      if(this.grid[x][y] == 1){
        status = "alive";
      }
      var neighbors = getNeighbors(this.grid, x, y);
      var liveCount = getLiveNeighborCount(neighbors, x, y);

      if(this.grid[x][y] == 0 || this.grid[x][y] == 2){
        this.grid[x][y] = 1;
      }else if(this.grid[x][y] == 1){
        if(action == 'mousedown'){
          this.grid[x][y] = 2;
        }
      }
    },

    createLife: function(pattern){
      game.clearGrid();
      if(pattern == 'gospergun'){
        this.grid[2][9] = 1;
        this.grid[2][10] = 1;
        this.grid[3][9] = 1;
        this.grid[3][10] = 1;

        this.grid[12][9] = 1;
        this.grid[12][10] = 1;
        this.grid[12][11] = 1;

        this.grid[13][8] = 1;
        this.grid[13][12] = 1;
        this.grid[14][7] = 1;
        this.grid[14][13] = 1;
        this.grid[15][7] = 1;
        this.grid[15][13] = 1;

        this.grid[16][10] = 1;
        this.grid[17][8] = 1;
        this.grid[17][12] = 1;
        this.grid[18][10] = 1;
        this.grid[18][9] = 1;
        this.grid[18][11] = 1;
        this.grid[19][10] = 1;
        this.grid[22][9] = 1;
        this.grid[23][9] = 1;
        this.grid[22][8] = 1;
        this.grid[23][8] = 1;
        this.grid[22][7] = 1;
        this.grid[23][7] = 1;
        this.grid[24][6] = 1;
        this.grid[24][10] = 1;
        this.grid[26][10] = 1;
        this.grid[26][6] = 1;
        this.grid[26][5] = 1;
        this.grid[26][11] = 1;
        this.grid[36][8] = 1;
        this.grid[36][7] = 1;
        this.grid[37][8] = 1;
        this.grid[37][7] = 1;

      }else if(pattern == 'random'){
        for(var i = 0; i < this.grid.length; i++){
          for(var j = 0; j < this.grid[i].length; j++){
            this.grid[i][j] =  Math.round(Math.random());
          }
        }
      }
      game.reset();
      game.drawGrid();
    },

    draw: function(x, y){
      var grid = this.grid;
      var color;

      if(grid[x][y] == 0){
        color = "white";
      }else if(grid[x][y] == 1){
        color = "blue";
      }else if(grid[x][y] == 2){
        color = "white";
      }

      fillSquare(context, x * cellSize + 1, y * cellSize + 1, cellSize, color);
    },

    drawGrid: function(){
      for(var i = 0; i < this.grid.length; i++){
        for(var j = 0; j < this.grid[i].length; j++){
          game.draw(i, j);
        }
      }
    },

    clearGrid: function(){
      for(var i = 0; i < this.grid.length; i++){
        for(var j = 0; j < this.grid[i].length; j++){
          this.grid[i][j] = 0;
        }
      }
    },

    reset: function(){
      this.generation = 0;
      this.running = false;
      document.getElementById("generation").innerHTML = "<p>" + "Generation " + this.generation + "</p>";
    }
  };
