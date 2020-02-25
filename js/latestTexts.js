function toggleSidebar() {}
function reuseLatestText(index) {}

(function() {
  let sideBarVisible = false;
  toggleSidebar = function() {
    let latestTextsContainer = document.getElementById("latestTextsContainer");
    let sideBarButton = document.getElementById("sideMenuButton");
    let sideBarBackButton = document.getElementById("sideMenuBackButton");
    if (sideBarVisible) {
      latestTextsContainer.classList.add("hideLeft");
      sideBarVisible = false;
      sideBarButton.hidden = false;
      sideBarBackButton.hidden = true;
      return;
    }
    latestTextsContainer.classList.remove("hideLeft");
    sideBarVisible = true;
    sideBarButton.hidden = true;
    sideBarBackButton.hidden = false;
  };

  function hashString(stringToHash) {
    // may take some time
    let primeModulo = 10007;
    let hashValue = 0;
    for (let i = 0; i < stringToHash.length; i++) {
      hashValue += stringToHash.charCodeAt(i);
      hashValue = hashValue % primeModulo;
    }
    return hashValue;
  }

  function getLatestTexts() {
    let latestTexts = JSON.parse(window.localStorage.getItem("latestTexts"));
    if (latestTexts === null) return [];
    return latestTexts;
  }

  function updateLatestTexts(text) {
    let textHash = hashString(text);
    let latestTexts = getLatestTexts();
    for (let i = 0; i < latestTexts.length; i++) {
      if (latestTexts[i].hash === textHash) {
        latestTexts.splice(i, 1);
      }
    }
    latestTexts.unshift({hash: textHash, text: text});
    while (latestTexts.length > 5) {
      latestTexts.pop();
    }
    window.localStorage.setItem("latestTexts", JSON.stringify(latestTexts));
  }

  reuseLatestText = function(index) {
    let latestTexts = getLatestTexts();
    window.localStorage.setItem("currentText", latestTexts[index].text);
    location.href = "reader.html";
  };

  function updateSidebar() {
    let latestTexts = getLatestTexts();
    if (latestTexts.length !== 0) {
      document.getElementById("latestTextsNothing").hidden = true;
      for (let i = 0; i < latestTexts.length; i++) {
        let latestTextBlock = document.getElementById("latestText" + (i + 1));
        latestTextBlock.hidden = false;
        latestTextBlock.children[0].innerHTML = latestTexts[i].text;
      }
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    updateLatestTexts(window.localStorage.getItem("currentText"));
    updateSidebar();
  })

})();