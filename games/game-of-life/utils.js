function drawGrid(context, cellsize) {
    for (var x = 0; x < context.canvas.width + 1;x += cellsize) {
      context.moveTo(x, 0);
      context.lineTo(x, context.canvas.height);
    }
    for (var y = 0; y < context.canvas.height + 1; y += cellsize) {
      context.moveTo(0, y);
      context.lineTo(context.canvas.width, y);
    }
    
    context.strokeStyle = "#ddd";
    context.stroke();
    context.stroke();
}

function fillSquare(context, x, y, cellsize, color){
    context.fillStyle = color;
    context.fillRect(x,y,cellsize-1,cellsize-1);
}

function Create2DGrid(rows, cols, defaultValue){
  var arr = [];
  for(var i = 0; i < cols; i++){
    arr.push([]);

    arr[i].push( new Array(rows));

    for(var j = 0; j < rows; j++){
      arr[i][j] = defaultValue;
    }
  }

  return arr;
}

function getNeighbors(grid, x, y){
  var neighbors = [];
  var rows = grid[0].length;
  var cols = grid.length;
  if(x > 0){
    neighbors.push(grid[x - 1][y]);
    if(y > 0) neighbors.push(grid[x - 1][y - 1]);
    if(y < rows - 1) neighbors.push(grid[x - 1][y + 1]);
  }
  if(x < cols - 1){
    neighbors.push(grid[x + 1][y]);
    if(y > 0) neighbors.push(grid[x + 1][y - 1]);
    if(y < rows - 1) neighbors.push(grid[x + 1][y + 1]);
  }
  if(y > 0){
    neighbors.push(grid[x][y - 1]);
  }
  if(y < rows - 1){
    neighbors.push(grid[x][y + 1]);
  }
  return neighbors;
}

function getLiveNeighborCount(neighbors){
  var count = 0
  for(var i = 0; i < neighbors.length; i++){
    if(neighbors[i] == 1){
      count++;
    }
  }
  return count;
}

function sleepFor(sleepDuration){
  var now = new Date().getTime();
  while(new Date().getTime() < now + sleepDuration){} 
}
