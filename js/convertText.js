function updateConvertButton() {}
function convertText() {}

(function() {
  function checkIfConvertible() {
    let inputText = document.getElementById("inputTextField").value;
    return inputText.length !== 0;
  }

  updateConvertButton = function() {
    let convertButtonClasses =
      document.getElementById("convertButton").classList;
    if (checkIfConvertible()) {
      convertButtonClasses.remove("disabled");
      return;
    }
    convertButtonClasses.add("disabled");
  };

  convertText = function() {
    let inputText = document.getElementById("inputTextField").value;
    if (!checkIfConvertible()) return;
    let trimmedText = inputText.replace(/\s+/g, " ").trim();
    window.localStorage.setItem("currentText", trimmedText);
    window.location.href = "reader.html";
  }
})();

window.addEventListener("load", updateConvertButton);

