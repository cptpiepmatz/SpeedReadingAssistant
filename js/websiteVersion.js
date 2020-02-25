(function() {
  document.addEventListener("DOMContentLoaded", () => {
    let versionElement = document.getElementById("websiteVersion");
    fetch(encodeURI('websiteVersion.json'))
      .then(response => response.json())
      .then(data => {
        versionElement.innerHTML = data.websiteVersion;
      })
      .catch(console.error);
  })
})();