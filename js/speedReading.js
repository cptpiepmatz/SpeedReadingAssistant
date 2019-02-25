document.getElementById("inputText").value = sessionStorage.getItem("convertText");
document.getElementById("readingSpeed").value = localStorage.getItem("readingSpeed").trim();
//paste in saved data
if(Number(localStorage.getItem("readingSpeed")) == 0) {
  //if no speed is saved
  document.getElementById("readingSpeed").value = 200;
}

//global variables
var wordArray;
var currentWord;
var loopFunction;
var play;

function wordsPerMinute() {
  if (document.getElementById("readingSpeed").value == "") {
    //test for an empty reading speed input
    alert("No reading Speed");
    return;
  }
  let wordsPerMinute = document.getElementById("readingSpeed").value.trim();
  localStorage.setItem("readingSpeed", wordsPerMinute);
  //remember reading speed of user
  return wordsPerMinute;
}

function wordTimer(wordsPerMinute) {
  let wordsPerSecond = (wordsPerMinute / 60);
  //get words per second
  let secondsPerWord = 1 / wordsPerSecond;
  //get time for each word in seconds
  let milisecondsPerWord = secondsPerWord * 1000;
  //get time for each word in miliseconds
  return milisecondsPerWord;
}

function convertText() {
  let textToConvert = document.getElementById("inputText").value;
  sessionStorage.setItem("convertText", textToConvert);
  //keep text that needs to be converted for a session
  wordArray = textToConvert.split(/\s+/);

  clearInterval(loopFunction);

  play = false;
  currentWord = 0;

  selectPlayPause();
  //focuses the button to pause via space
}

function displayWord() {
  document.getElementById("outputText").innerHTML = wordArray[currentWord];
  currentWord++;
}

function runReader() {
  displayWord();

  if(currentWord >= wordArray.length) {
    //cancels reader when text is finished
    playPauseReader();
    //document.getElementById("playPauseButton").classList.replace("fa-pause", "fa-play");
  }
}

function selectPlayPause() {
  document.getElementById("playPauseButton").focus();
}

function playPauseReader() {
  var playPauseButton = document.getElementById("playPauseButton");
  if (play) {
    //pauses the reader
    play = false;
    clearInterval(loopFunction);
    playPauseButton.classList.replace("fa-pause", "fa-play");
  }
  else {
    //continues the reader
    play = true;
    if(currentWord >= wordArray.length) {
      currentWord = 0;
    }
    loopFunction = setInterval(runReader, wordTimer(wordsPerMinute()));
    playPauseButton.classList.replace("fa-play", "fa-pause");
  }
}
