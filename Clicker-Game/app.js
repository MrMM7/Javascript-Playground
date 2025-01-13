const upgrades = document.querySelectorAll(".upgrade");

let cookiecount = document.getElementById("cookie-count");
const cookiebtn = document.querySelector(".cookie-btn");

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

function autoClicker() {
  setInterval(function () {
    cookies += increments;
    cookiecount.innerHTML = cookies;
  }, 1000);
  switch (increments) {
    case 0.25:
      cookies -= 20;
      break;
    case 1:
      cookies -= 50;
      break;
    case 5:
      cookies -= 100;
  }
}

function disabler(div) {
  div.classList.add("purchased");
  const button = div.lastElementChild;
  button.classList.add("disabled");
  button.disabled = true;
}

cookiebtn.addEventListener("click", function () {
  cookies++;
  cookiecount.innerHTML = cookies;

  if (cookies >= 20) upgrades[0].style.display = "inline";
  if (cookies >= 50) upgrades[1].style.display = "inline";
  if (cookies >= 100) upgrades[2].style.display = "inline";
  if (cookies >= 30) upgrades[3].style.display = "inline";
});

