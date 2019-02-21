document.getElementById("inputText").value = sessionStorage.getItem("convertText");
//keep text that needs to be converted

var textToConvert;
var wordArray;
var play = false;
currentWord = 0;
var wordsPerMinute = 300;
var cycleFunction;

var wordTimer = 1 / (wordsPerMinute / 60) * 1000;

function convertText() {
  textToConvert = document.getElementById("inputText").value;
  sessionStorage.setItem("convertText", textToConvert);
  isolateWords();
  play = true;
  currentWord = 0;
  clearInterval(cycleFunction);
  runReader();
}

function isolateWords() {
  wordArray = textToConvert.split(" ");
}

function runReader() {
  if(play) {
    cycleFunction = setInterval(outputWord, wordTimer);
  }
}

function outputWord() {
  document.getElementById("outputText").innerHTML = wordArray[currentWord];
  console.log(wordArray[currentWord]);
  currentWord++;
  if(currentWord >= wordArray.length) {
    clearInterval(cycleFunction);
  }
}
