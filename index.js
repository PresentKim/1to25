/**
 * Wrapper for HTMLElement to control data
 *
 * @template T
 * @typedef {Object} Adaptor<T>
 * @property {(element: HTMLElement) => T} read
 * @property {(element: HTMLElement, data: T) => void} write
 */
class DataElement {
  /**
   * @template T
   * @param {string} selector - The CSS selector for the element to control
   * @param {T} data - The data to control
   * @param {Adaptor<T>} adaptor - The adaptor for the data getter and setter
   */
  constructor(selector, data, adaptor) {
    this.element = document.querySelector(selector);
    this.adaptor = adaptor || TextAdaptor;
    this.data = data;
  }

  /**
   * Get the data controlled by this DataElement
   * @returns {T} The data controlled by this DataElement
   */
  get data() {
    return this.adaptor.read(this.element);
  }

  /**
   * Set the data controlled by this DataElement
   * @param {T} data - The data to set
   */
  set data(data) {
    this.adaptor.write(this.element, data);
  }
}

/**
 * Text Adaptor (Adapts innerText to string)
 * @type {Adaptor<string>}
 */
const TextAdaptor = {
  /**
   * @param {HTMLElement} element
   * @returns {string}
   */
  read(element) {
    return element.innerText;
  },

  /**
   * @param {HTMLElement} element
   * @param {string} text
   */
  write(element, text) {
    element.innerText = text;
  },
};

/**
 * Number Adaptor (Adapts innerText to number)
 * @type {Adaptor<number>}
 */
const NumberAdaptor = {
  /**
   * @param {HTMLElement} element
   * @returns {number}
   */
  read(element) {
    return parseInt(element.innerText) || 0;
  },

  /**
   * @param {HTMLElement} element
   * @param {number} text
   */
  write(element, text) {
    element.innerText = text || 0;
  },
};

/**
 * Cell number Adaptor (Adapts innerText to number, But convert zero to empty string)
 * @type {Adaptor<number>}
 */
const CellAdaptor = {
  ...NumberAdaptor,

  /**
   * @param {HTMLElement} element
   * @param {number} text
   */
  write(element, text) {
    element.innerText = text || "";
  },
};

/**
 * Time Adaptor (Adapts innerText to number, But convert zero to "--:--:--")
 * @type {Adaptor<number>}
 */
const TimeAdaptor = {
  /**
   * @param {HTMLElement} element
   * @returns {number}
   */
  read(element) {
    const time = element.innerText;
    if (time === "--:--:--") {
      return 0;
    }

    const part = time.split(":");
    return (
      parseInt(part[0]) * 3600 + parseInt(part[1]) * 60 + parseInt(part[2])
    );
  },

  /**
   * @param {HTMLElement} element
   * @param {number} time
   */
  write(element, time) {
    if (!time) {
      element.innerText = "--:--:--";
      return;
    }

    const part = (mode, div) => {
      return Math.floor((time % mode) / div)
        .toString()
        .padStart(2, "0");
    };

    element.innerText =
      part(1000 * 60 * 60, 1000 * 60) +
      ":" +
      part(1000 * 60, 1000) +
      ":" +
      part(1000, 10);
  },
};

/**
 * Game Grid
 * @property {number} xSize - The number of cells in the x direction
 * @property {number} ySize - The number of cells in the y direction
 * @property {DataElement[]} cells - The cells of the grid
 */
class Grid {
  constructor(xSize, ySize) {
    this.xSize = xSize;
    this.ySize = ySize;
    this.cells = [];

    // Clear the cell container
    const cellContainer = document.getElementById("cell-container");

    // Create the grid
    for (let x = 0; x < this.xSize; x++) {
      const gridRow = createElement("div", {
        class: "grid-row flex-row",
      });
      cellContainer.appendChild(gridRow);

      for (let y = 0; y < this.ySize; y++) {
        const id = "cell-" + this.cells.length;
        gridRow.appendChild(
          createElement("button", {
            id,
            class: "grid-cell frame slot",
          })
        );

        this.cells.push(new DataElement("#" + id, 0, CellAdaptor));
      }
    }
  }
}

class Game {
  constructor(xSize, ySize) {
    // Register data elements
    this["#play-time"] = new DataElement("#play-time", 0, TimeAdaptor);
    this["#best-time"] = new DataElement("#best-time", 0, TimeAdaptor);
    this["#target"] = new DataElement("#target", 0, NumberAdaptor);
    this["#goal"] = new DataElement("#goal", 25, NumberAdaptor);
    this["#started"] = new DataElement("body", false, {
      read: (element) => element.hasAttribute("data-game-start"),
      write: (element, data) =>
        data
          ? element.setAttribute("data-game-start", "")
          : element.removeAttribute("data-game-start"),
    });
    this["#progress"] = new DataElement("#progress-bar", 1, {
      read: (element) =>
        parseFloat(getComputedStyle(element).getPropertyValue("--progress")) ||
        0,
      write: (element, data) => element.style.setProperty("--progress", data),
    });
    this.startButton = new DataElement("#start-button", "START");

    // Initialize game data
    this.intervalId = null;
    this.countDownDate = new Date().getTime();
    this.preGoal = 25;

    // Initialize grid
    this.grid = new Grid(xSize, ySize);
    for (const cell of this.grid.cells) {
      cell.element.addEventListener("click", () => this.clickCell(cell));
    }

    // Register click event listeners
    this["#goal"].element.addEventListener(
      "click",
      () => {
        if (!this.started) {
          this.goal = this.goal >= 100 ? 25 : this.goal + 25;
        }
      },
      false
    );

    this.startButton.element.addEventListener(
      "click",
      () => {
        if (this.started) this.stop();
        else this.start();
      },
      false
    );

    document.getElementById("cheat-panel").addEventListener(
      "click",
      () => {
        const cell = this.grid.cells.find((cell) => cell.data === this.target);
        if (cell) {
          this.clickCell(cell);
        }
      },
      false
    );
  }

  get started() {
    return this["#started"].data;
  }

  set started(data) {
    this["#started"].data = data;
  }

  get playTime() {
    return this["#play-time"].data;
  }

  set playTime(data) {
    this["#play-time"].data = data;
  }

  get bestTime() {
    return this["#best-time"].data;
  }

  set bestTime(data) {
    this["#best-time"].data = data;
  }

  get target() {
    return this["#target"].data;
  }

  set target(data) {
    this["#target"].data = data;
  }

  get goal() {
    return this["#goal"].data;
  }

  set goal(data) {
    this["#goal"].data = data;
  }

  get progress() {
    return this["#progress"].data;
  }

  set progress(data) {
    this["#progress"].data = data;
  }

  start() {
    // If the game is already started, do nothing
    if (this.started.data) {
      return;
    }

    // Start the game
    if (this.intervalId == null)
      this.intervalId = setInterval(() => {
        if (this.started) {
          const time = new Date().getTime() - this.countDownDate;
          this.playTime = time;
        }
      }, 10);
    this.started = true;
    this.countDownDate = new Date().getTime();
    this.target = 1;
    this.progress = 0;
    this.startButton.data = "STOP";

    // Generate random index
    const randomIndex = Array.from(
      { length: this.grid.cells.length },
      (_, i) => i
    ).sort(() => Math.random() - 0.5);

    // Set the numbers in the grid
    for (const i in this.grid.cells) {
      const cell = this.grid.cells[i];
      cell.data = randomIndex[i] + 1;
      cell.element.disabled = false;
    }

    // Set random hue
    setRandomHue();
  }

  stop() {
    // If the game is not started, do nothing
    if (!this.started) {
      return;
    }

    // Stop the interval
    if (this.intervalId != null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    // Reset the game
    this.started = false;
    this.target = 0;
    this.preGoal = 25;
    this.playTime = 0;
    this.progress = 1;
    this.startButton.data = "START";

    // Reset the grid
    for (const cell of this.grid.cells) {
      cell.data = 0;
      cell.element.disabled = true;
    }
  }

  clickCell(cell) {
    // If the game is not started, do nothing
    if (!this.started) {
      return;
    }

    // If the target is not the cell, do nothing
    if (this.target !== cell.data) {
      return;
    }

    // If the goal is the preGoal and the cell is less than the preGoal, disable the cell
    if (this.goal === this.preGoal && cell.data <= this.preGoal) {
      cell.element.disabled = false;
      cell.element.disabled = true;
    } else {
      // Replace the cell with a random number
      replace: while (true) {
        const rand = Math.ceil(Math.random() * 25) + this.preGoal;
        // Check if the random number is already in the grid
        for (const cell of this.grid.cells) {
          // If the random number is already in the grid, continue the loop
          if (cell.data === rand) continue replace;
        }

        // Set the random number to the cell
        cell.data = rand;
        cell.element.setAttribute("data-change", "");

        // Remove the data-change attribute when the animation ends
        const reset = () => {
          cell.element.removeAttribute("data-change");
          cell.element.removeEventListener("animationend", reset);
        };
        cell.element.addEventListener("animationend", reset);
        break;
      }
    }

    // Increase the goal
    if (this.target === this.preGoal) this.preGoal += 25;

    // If the target is the goal, stop the game
    if (this.target === this.goal) {
      console.log(this.bestTime, this.playTime);
      if (this.bestTime === 0 || this.bestTime > this.playTime) {
        this.bestTime = new Date().getTime() - this.countDownDate;
      }
      this.stop();
      return;
    }

    // Update the progress bar
    this.progress = this.target / this.goal;
    this.target = this.target + 1;
  }
}

function createElement(tag, attributes) {
  const element = document.createElement(tag);
  if (attributes) {
    if (attributes.id !== undefined) element.setAttribute("id", attributes.id);
    if (attributes.class !== undefined)
      element.setAttribute("class", attributes.class);
  }
  return element;
}

const game = new Game(5, 5);

// Set the number of particles based on device width
const BACKGROUND_PARTICLE_COUNT = Math.min(
  300,
  Math.floor(window.innerWidth / 2)
);

// Generate Background Floating Particles
const background = document.getElementById("background");
function createParticle(initial) {
  const duration = Math.random() * 10 + 30;
  const div = createElement("div");
  const round10 = (x) => Math.round(x * 10) / 10;
  div.style.setProperty("--duration", round10(duration) + "s");
  div.style.setProperty("--x", round10(Math.random() * 100) + "%");
  div.style.setProperty("--rotate", round10(Math.random() * 720) + "deg");
  if (initial) {
    // Set minus animationDelay to make particles start at random time
    div.style.animationDelay = round10(-duration * Math.random()) + "s";
  }
  background.appendChild(div);
}

for (let i = 0; i < BACKGROUND_PARTICLE_COUNT; i++) {
  createParticle(true);
}

// Set random hue on body
function setRandomHue() {
  document.body.style.setProperty("--hue", Math.random() * 360);
}
setRandomHue();
