(function() {
  var CELL_COUNT = 4;

  var gameList = (function() {
    var Game = function(name, link) {
      this.name = name;
      this.link = link;
    }

    var gameList = [];
    gameList[0] = new Game("1to25", "game/1to25/index.html");

    return gameList;
  })();

  var cellList = (function() {
    var Cell = function(index, game) {
      this.index = index;
      this.element = document.getElementById('cell-' + index);
      this.element.addEventListener('click', clickCell.bind(null, index), false);

      game = gameList[index];
      if (game != undefined) {
        this.element.disabled = 'false';
        this.element.setAttribute('style', 'color: #777777; background: #' + (i % 2 ? 'e4dad0' : 'eee4da') + ';');
        this.element.style.animation = 'wriggle 1.5s infinite';
        this.element.innerHTML = game.name;
      } else {
        this.element.disabled = 'true';
        this.element.setAttribute('style', 'color: #e4dad0; background: #b2a89e;');
        this.element.style.animation = '';
      }
    };

    var cellList = [];
    for (i = 0; i < CELL_COUNT; i++)
      cellList[i] = new Cell(i, gameList[i]);

    return cellList;
  })();

  var i;
  var cell, cellData, cellElement;

  function clickCell(index) {
    cell = cellList[index];
    game = gameList[index];
    if (game != undefined) {
      location.href = game.link;
    }
  }
})();
