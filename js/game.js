var Game = function (xSize, ySize) {
    this.canStart = true;
    this.started = false;
    this.intervalId = null;
    this.countDownDate = new Date().getTime();
    this.pre_goal = 25;

    this.grid = new Grid(xSize, ySize);
    for (var i = 0; i < this.grid.length; i++)
        this.grid.cells[i].getElement().addEventListener('click', this.clickCell.bind(null, i), false);

    this.playTime = new ElementControl('play-time-text', 0, TimeFomatter);
    this.bestTime = new ElementControl('best-time-text', 0, TimeFomatter);
    this.target = new ElementControl('target-text', 0);
    this.goal = new ElementControl('goal-text', 25);
    this.restartButton = new ElementControl('restart-button', 'New Game');
    this.gobackButton = new ElementControl('goback-button', 'Back');
    this.gridCover = new ElementControl('grid-cover', '');

    this.goal.getElement().addEventListener('click', function () {
        if (!game.started)
            game.goal.setData(game.goal.getData() >= 100 ? 25 : game.goal.getData() + 25);
    }, false);

    this.restartButton.getElement().addEventListener('click', function () {
        if (game.canStart)
            if (game.started)
                game.stop();
            else
                game.start();
    }, false);

    this.gobackButton.getElement().addEventListener('click', function () {
        location.href = 'http://web.present.kim';
    }, false);

    document.getElementById('cheat-panel').addEventListener('click', function () {
        for (i = 0; i < game.grid.length; i++)
            if (game.target.getData() === game.grid.cells[i].getData()) {
                game.clickCell(i);
                break;
            }
    }, false);
};


Game.prototype.start = function () {
    if (this.intervalId == null)
        this.intervalId = setInterval(function () {
            if (this.started) {
                var time = new Date().getTime() - this.countDownDate;
                this.playTime.setData(time);
                if (this.bestTime.getData() === 0)
                    this.bestTime.setData(time);
            }
        }, 10);
    this.started = true;
    this.countDownDate = new Date().getTime();
    this.target.setData(1);

    var nums = [];
    while (nums.length < this.grid.length) {
        var rand = Math.ceil(Math.random() * 25);
        if (nums.indexOf(rand) === -1)
            nums[nums.length] = rand;
    }
    for (var i = 0; i < this.grid.length; i++) {
        var cell = this.grid.cells[i];
        cell.setData(nums[i]);
        cell.getElement().setAttribute('style', 'color: #777777; background: #' + (i % 2 ? 'e4dad0' : 'eee4da') + ';');
        cell.getElement().disabled = 'false';
    }

    this.restartButton.getElement().innerText = 'Stop';

    this.gridCover.getElement().style.animation = '';
    setTimeout(function () {
        game.gridCover.getElement().style.animation = 'cover-hide 1s forwards';
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
    this.restartButton.setData('NewGame');
    for (var i = 0; i < this.grid.length; i++)
        this.grid.cells[i].setData(0);
};

Game.prototype.clickCell = function (id) {
    if (game.started) {
        var cell = game.grid.cells[id];
        if (game.target.getData() == cell.getData()) {
            if (game.goal.getData() == game.pre_goal && cell.getData() <= game.pre_goal) {
                cell.getElement().disabled = 'true';
                cell.getElement().style.animation = '';
                cell.getElement().style.animation = 'cell-remove 2s forwards';
            } else {
                replace: while (true) {
                    var rand = Math.ceil(Math.random() * 25) + game.pre_goal;
                    for (var i = 0; i < game.grid.length; i++)
                        if (game.grid.cells[i].getData() == rand)
                            continue replace;
                    cell.setData(rand);
                    cell.getElement().disabled = 'true';
                    cell.getElement().style.animation = '';
                    setTimeout(function () {
                        cell.getElement().style.animation = 'cell-change 2s forwards';
                    }, 10);
                    break replace;
                }
            }

            if (game.target.getData() == game.pre_goal)
                game.pre_goal += 25;
            if (game.target.getData() == game.goal.getData()) {
                if (game.bestTime.getData() == 0 || game.bestTime.getData() > game.playTime.getData())
                    game.bestTime.setData(new Date().getTime() - game.countDownDate);
                game.gridCover.getElement().style.animation = '';
                setTimeout(function () {
                    game.gridCover.getElement().style.animation = 'cover-show 1s forwards';
                    game.gridCover.setData('End!');
                }, 10);
                game.stop();
            }
            game.target.setData(game.target.getData() + 1);
        }
    }
};