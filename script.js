"use strict";

let score = 0;
let width = 99;
let shrinkSpeed = 50;
let interval;
let highScore = 0;

const clickButton = document.querySelector(".btn-click");
const currentScore = document.querySelector(".current-score");
const bar = document.getElementById("bar");
const highScoreEL = document.getElementById("high-score");

// Start: Shrinking Interval
function startShrinking() {
  if (interval) clearInterval(interval); // Clear any existing interval
  interval = setInterval(shrinkBar, shrinkSpeed); // Start a new interval
}

// Shrinkbar
function shrinkBar() {
  if (width > 0 && width <= 100) {
    width -= 1;
    bar.style.width = width + "%";
  } else {
    endGame();
  }
}
//Click function
function handleClick() {
  if (width < 100) {
    score += 1;
    currentScore.textContent = score;
    width = Math.min(width + 10, 100); // Prevent width from exceeding 100%
    bar.style.width = width + "%";

    // Check if score is a multiple of 10 to increase speed
    if (score % 10 === 0) {
      shrinkSpeed = Math.max(10, shrinkSpeed - 5); // Decrease interval duration, but not below 10ms
      startShrinking(); // Restart the interval with the new speed
    }
  }
  if (width >= 100) {
    endGame();
  }
}
//High Score

//END
function endGame() {
  clearInterval(interval); // Stop the shrinking interval
  clickButton.removeEventListener("click", handleClick); // Disable clicks
  alert(`Game Over! Final Score: ${score}`);
}

// Initialize the game
startShrinking();
clickButton.addEventListener("click", handleClick);
