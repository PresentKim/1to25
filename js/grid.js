var Cell = function(index, data) {
  this.index = index;
  this.control = new ElementControl('cell-' + index, data, CellFomatter);
};

Cell.prototype.setData = function(data) {
  this.control.setData(data);
};

Cell.prototype.getData = function(data) {
  return this.control.getData();
};

Cell.prototype.getElement = function(data) {
  return this.control.element;
};

var Grid = function(xSize, ySize) {
  this.xSize = xSize;
  this.ySize = ySize;
  this.length = xSize * ySize;
  this.cells = [];

  var id = 0;
  var gridContainer = document.getElementById('grid-container');

  for (var x = 0; x < this.xSize; x++) {
    var gridRow = createElement('div', {
      class: 'grid-row flex-row'
    });
    gridContainer.appendChild(gridRow);

    for (var y = 0; y < this.ySize; y++) {
      gridRow.appendChild(createElement('div', {
        id: 'cell-' + id,
        class: 'grid-cell'
      }));

      this.cells[id] = new Cell(id, 0);
      id++;
    }
  }
};

Grid.prototype.getCells = function() {
  return this.cells;
}

Grid.prototype.getCell = function(id) {
  return this.cells[id];
}
