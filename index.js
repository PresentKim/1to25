var cheat = function () {
  document.getElementById("cheat-panel").style.display = "block";
};

var Cell = function (index, data) {
  this.index = index;
  this.control = new ElementControl("cell-" + index, data, CellFomatter);
};

Cell.prototype.setData = function (data) {
  this.control.setData(data);
};

Cell.prototype.getData = function () {
  return this.control.getData();
};

Cell.prototype.getElement = function () {
  return this.control.element;
};

var Grid = function (xSize, ySize) {
  this.xSize = xSize;
  this.ySize = ySize;
  this.length = xSize * ySize;
  this.cells = [];

  var id = 0;
  var gridContainer = document.getElementById("grid-container");

  for (var x = 0; x < this.xSize; x++) {
    var gridRow = createElement("div", {
      class: "grid-row flex-row",
    });
    gridContainer.appendChild(gridRow);

    for (var y = 0; y < this.ySize; y++) {
      gridRow.appendChild(
        createElement("div", {
          id: "cell-" + id,
          class: "grid-cell",
        })
      );

      this.cells[id] = new Cell(id, 0);
      id++;
    }
  }
};

Grid.prototype.getCells = function () {
  return this.cells;
};

Grid.prototype.getCell = function (id) {
  return this.cells[id];
};

var Game = function (xSize, ySize) {
  this.canStart = true;
  this.started = false;
  this.intervalId = null;
  this.countDownDate = new Date().getTime();
  this.pre_goal = 25;

  this.grid = new Grid(xSize, ySize);
  for (var i = 0; i < this.grid.length; i++)
    this.grid.cells[i]
      .getElement()
      .addEventListener("click", this.clickCell.bind(null, i), false);

  this.playTime = new ElementControl("play-time-text", 0, TimeFomatter);
  this.bestTime = new ElementControl("best-time-text", 0, TimeFomatter);
  this.target = new ElementControl("target-current", 0);
  this.goal = new ElementControl("target-goal", 25);
  this.startButton = new ElementControl("start-button", "START");
  this.gridCover = new ElementControl("grid-cover", "");

  this.goal.getElement().addEventListener(
    "click",
    function () {
      if (!game.started)
        game.goal.setData(
          game.goal.getData() >= 100 ? 25 : game.goal.getData() + 25
        );
    },
    false
  );

  this.startButton.getElement().addEventListener(
    "click",
    function () {
      if (game.canStart)
        if (game.started) game.stop();
        else game.start();
    },
    false
  );

  document.getElementById("cheat-panel").addEventListener(
    "click",
    function () {
      for (i = 0; i < game.grid.length; i++)
        if (game.target.getData() === game.grid.cells[i].getData()) {
          game.clickCell(i);
          break;
        }
    },
    false
  );
};

Game.prototype.start = function () {
  if (this.intervalId == null)
    this.intervalId = setInterval(function () {
      if (game.started) {
        var time = new Date().getTime() - game.countDownDate;
        game.playTime.setData(time);
        if (game.bestTime.getData() === 0) game.bestTime.setData(time, false);
      }
    }, 10);
  this.started = true;
  this.countDownDate = new Date().getTime();
  this.target.setData(1);

  var nums = [];
  while (nums.length < this.grid.length) {
    var rand = Math.ceil(Math.random() * 25);
    if (nums.indexOf(rand) === -1) nums[nums.length] = rand;
  }
  for (var i = 0; i < this.grid.length; i++) {
    var cell = this.grid.cells[i];
    cell.setData(nums[i]);
    cell
      .getElement()
      .setAttribute(
        "style",
        "color: #777777; background: #" + (i % 2 ? "e4dad0" : "eee4da") + ";"
      );
    cell.getElement().disabled = "false";
  }

  this.startButton.getElement().innerText = "STOP";

  this.gridCover.getElement().style.animation = "";
  setTimeout(function () {
    game.gridCover.getElement().style.animation = "cover-hide 1s forwards";
  }, 10);
};

Game.prototype.stop = function () {
  if (this.intervalId != null) {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
  this.started = false;
  this.pre_goal = 25;

  this.target.setData(0);
  this.startButton.setData("START");
  for (var i = 0; i < this.grid.length; i++) this.grid.cells[i].setData(0);
};

Game.prototype.clickCell = function (id) {
  if (game.started) {
    var cell = game.grid.cells[id];
    if (game.target.getData() === cell.getData()) {
      if (
        game.goal.getData() === game.pre_goal &&
        cell.getData() <= game.pre_goal
      ) {
        cell.getElement().disabled = "true";
        cell.getElement().style.animation = "";
        cell.getElement().style.animation = "cell-remove 2s forwards";
      } else {
        replace: while (true) {
          var rand = Math.ceil(Math.random() * 25) + game.pre_goal;
          for (var i = 0; i < game.grid.length; i++)
            if (game.grid.cells[i].getData() === rand) continue replace;
          cell.setData(rand);
          cell.getElement().disabled = "true";
          cell.getElement().style.animation = "";
          setTimeout(function () {
            cell.getElement().style.animation = "cell-change 2s forwards";
          }, 10);
          break;
        }
      }

      if (game.target.getData() === game.pre_goal) game.pre_goal += 25;
      if (game.target.getData() === game.goal.getData()) {
        if (
          game.bestTime.getData() === 0 ||
          game.bestTime.getData() > game.playTime.getData()
        )
          game.bestTime.setData(new Date().getTime() - game.countDownDate);
        game.gridCover.getElement().style.animation = "";
        setTimeout(function () {
          game.gridCover.getElement().style.animation =
            "cover-show 1s forwards";
          game.gridCover.setData("End!");
        }, 10);
        game.stop();
        return;
      }
      game.target.setData(game.target.getData() + 1);
    }
  }
};

// Element Control
var ElementControl = function (elementId, data, fomatter) {
  this.element = document.getElementById(elementId);
  this.fomatter = isFunction(fomatter) ? fomatter : DefaultFomatter;
  this.setData(data ? data : 0);
};

ElementControl.prototype.setData = function (data, updateOnlyText, fomatter) {
  if (updateOnlyText !== false) {
    this.data = data;
  }
  this.element.innerText = isFunction(fomatter)
    ? fomatter(data)
    : this.fomatter(data);
};

ElementControl.prototype.getData = function () {
  return this.data;
};

ElementControl.prototype.getElement = function () {
  return this.element;
};

// Fomatters
var DefaultFomatter = function (data) {
  return data;
};

var CellFomatter = function (data) {
  return data === 0 ? "" : data;
};

var TimeFomatter = function (data) {
  var pad2 = function (number) {
    for (var result = number + ""; 2 > result.length; result = "0" + result);
    return result;
  };

  return (
    pad2(Math.floor((data % (1000 * 60 * 60)) / (1000 * 60))) +
    ":" +
    pad2(Math.floor((data % (1000 * 60)) / 1000)) +
    ":" +
    pad2(Math.floor((data % 1000) / 10))
  );
};

// other functions
function isFunction(v) {
  var getType = {};
  return v && getType.toString.call(v) === "[object Function]";
}

var createElement = function (tag, attributes) {
  var element = document.createElement(tag);
  if (attributes) {
    if (attributes.id !== undefined) element.setAttribute("id", attributes.id);
    if (attributes.class !== undefined)
      element.setAttribute("class", attributes.class);
  }
  return element;
};

var setProgress = function (progress) {
  const progressBar = document.getElementById("progress-bar");
  progressBar.style.setProperty("--progress", `${progress}%`);
};

var game = new Game(5, 5);

/** TEST CODES */
const progressBar = document.getElementById("progress-bar");
progressBar.addEventListener("click", (event) => {
  const box = progressBar.getBoundingClientRect();
  const clickX = event.clientX - box.x + box.width * 0.05; // Add padding of 5% of the width
  const progress = Math.min(100, Math.max(0, (clickX / box.width) * 100));
  setProgress(progress);
});
