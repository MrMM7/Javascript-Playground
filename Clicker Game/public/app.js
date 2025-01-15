const upgrades = document.querySelectorAll(".upgrade");

let cookiecount = document.getElementById("cookie-count");
const cookiebtn = document.querySelector(".cookie-btn");
cookiecount.innerHTML = 0;

let cookies = 0;

let increments = 0;

upgrades[0].addEventListener("click", function () {
  if (cookies >= 20) {
    increments = 0.25;
    autoClicker();
    disabler(upgrades[0]);
  }
});
upgrades[1].addEventListener("click", function () {
  if (cookies >= 50) {
    increments = 1;
    autoClicker();
    disabler(upgrades[1]);
  }
});
upgrades[2].addEventListener("click", function () {
  if (cookies >= 100) {
    increments = 5;
    autoClicker();
    disabler(upgrades[2]);
  }
});
upgrades[3].addEventListener("click", function () {
  if (cookies >= 30) {
    cookies++;
    disabler(upgrades[3]);
  }
});
upgrades[4].addEventListener("click", function () {
  if (cookies >= 1000) {
    cookies = 0;
    increments = 0;
    cookiecount.innerHTML = 0;
    clearInterval();
    enabler();
    console.log("Game finished");
  }
});

let autoClickerInterval = null; // Variable to store the interval ID

function autoClicker() {
  // Clear any existing interval
  if (autoClickerInterval) {
    clearInterval(autoClickerInterval);
  }

  // Start a new interval
  autoClickerInterval = setInterval(function () {
    cookies += increments;
    cookiecount.innerHTML = cookies;
  }, 1000);

  // Deduct the appropriate cookie cost
  switch (increments) {
    case 0.25:
      cookies -= 20;
      break;
    case 1:
      cookies -= 50;
      break;
    case 5:
      cookies -= 100;
      break;
  }
}

function disabler(div) {
  div.classList.add("purchased");
  const button = div.lastElementChild;
  button.classList.add("disabled");
  button.disabled = true;
}
function enabler() {
  upgrades.forEach(function (div) {
    div.classList.remove("purchased");
    const button = div.lastElementChild;
    button.classList.remove("disabled");
    button.disabled = false;
  });
}

cookiebtn.addEventListener("click", function () {
  cookies++;
  cookiecount.innerHTML = cookies;

  if (cookies >= 20) upgrades[0].style.display = "inline";
  if (cookies >= 50) upgrades[1].style.display = "inline";
  if (cookies >= 100) upgrades[2].style.display = "inline";
  if (cookies >= 30) upgrades[3].style.display = "inline";
});
