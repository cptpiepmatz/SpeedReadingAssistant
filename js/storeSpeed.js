function saveSpeed() {}

(function() {
  document.addEventListener("DOMContentLoaded", () => {
    let storedSpeed = window.localStorage.getItem("speed");
    if (storedSpeed === null) storedSpeed = 300;
    document.getElementById("speedInput").value = storedSpeed;
  });

  saveSpeed = function() {
    let currentSpeed = document.getElementById("speedInput").value;
    window.localStorage.setItem("speed", currentSpeed);
  }
})();