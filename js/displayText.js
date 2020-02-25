function runReader() {}
function updateSpeed() {}

(function() {
  let currentText = window.localStorage.getItem("currentText");
  let splitText = currentText.split(" ");
  let currentWordIndex = 0;

  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("outputPreWord").innerHTML = "";
    document.getElementById("outputText").innerHTML = splitText[0];
    if (splitText.length > 1) {
      document.getElementById("outputPostWord").innerHTML = splitText[1];
    }

    document.addEventListener("keydown", event => {
      if (event.code !== "Space") {
        return;
      }
      runReader();
    });
  });

  function updatePlayPause(setPlay) {
    let playButton = document.getElementById("playButton");
    let pauseButton = document.getElementById("pauseButton");
    if (setPlay) {
      playButton.hidden = true;
      pauseButton.hidden = false;
      return;
    }
    playButton.hidden = false;
    pauseButton.hidden = true;
  }

  function getSpeed() {
    let wordFrequency = document.getElementById("speedInput").value;
    // calculate the period for every word in milliseconds
    return 1 / (wordFrequency / 60) * 1000;
  }

  function updateWord() {
    let nextIndex = currentWordIndex + 1;
    if (nextIndex >= splitText.length) {
      return false;
    }
    let wordDisplay = document.getElementById("outputText");
    wordDisplay.innerHTML = splitText[nextIndex];
    let preWord = document.getElementById("outputPreWord");
    if (nextIndex !== 0) preWord.innerHTML = splitText[nextIndex - 1];
    let postWord = document.getElementById("outputPostWord");
    postWord.innerHTML = splitText[nextIndex];
    if (nextIndex + 1 === splitText.length) {
      postWord.innerHTML = "";
    }
    currentWordIndex = nextIndex;
    return true;
  }

  let interval;
  let running = false;
  function displayWords() {
    if (currentWordIndex >= splitText.length - 1) {
      document.getElementById("outputText").innerHTML = splitText[0];
      currentWordIndex = 0;
      document.getElementById("outputPreWord").innerHTML = "";
      if (splitText.length > 1) {
        document.getElementById("outputPostWord").innerHTML = splitText[1];
      }
    }
    updatePlayPause(true);
    running = true;
    interval = window.setInterval(() => {
      if (!updateWord()) {
        updatePlayPause(false);
        running = false;
        window.clearInterval(interval);
      }
    }, getSpeed());
  }

  function stopWords() {
    updatePlayPause(false);
    window.clearInterval(interval);
    running = false;
  }

  runReader = function() {
    if (running) {
      stopWords();
      return;
    }
    displayWords();
  };

  updateSpeed = function() {
    let currentlyRunning = running;
    stopWords();
    if (currentlyRunning) displayWords();
  }
})();