//flipping function variables
let hasflipped = false;
let firstcard = document.getElementsByClassName("flipped")[0];
let secondcard = document.getElementsByClassName("flipped")[1];
let timeout;
let canStart = true;
//timer variables
let tens = document.getElementById("tens");
let seconds = document.getElementById("seconds");
let jtens = 0;
let jseconds = 0;
//cards variables
let myLi = document.getElementsByTagName("li");
let myCards = [];
let text = document.getElementsByClassName("text")[0];
let counter = 0;
//reset button
let reset = document.getElementsByClassName("reset")[0];
//levels variables
let level = document.getElementById("levels");
let levelValue = level.value;
let selectEasy = true;
let selectMedium = true;
let selectHard = true;
let firstRow = document.getElementById("first-row");
let secondRow = document.getElementById("second-row");
let extralis;
let extraArr = [];
//hint variables
let hint = document.getElementById("hint");
let canhint = true;
//////////////////////functions
//shufel function
function shufel(array) {
  let shufledArray = [];
  let usedIdex = [];
  let i = 0;
  while (i < array.length) {
    let randomnumber = Math.floor(Math.random() * array.length);
    if (!usedIdex.includes(randomnumber)) {
      shufledArray.push(array[randomnumber]);
      usedIdex.push(randomnumber);
      i++;
    }
  }
  for (let i = 0; i < array.length; i++) {
    array[i] = shufledArray[i];
  }
  return shufledArray;
}
//flipping function
function flip() {
  if (levelValue === "") {
    Swal.fire("Please pick a level to start");
  } else {
    this.classList.add("flipped");
    if (canStart === true) {
      timeout = setInterval(startTimer, 10);
      canStart = false;
    }
    if (!hasflipped) {
      hasflipped = true;
      firstcard = this;
      firstcard.removeEventListener("click", flip);
    } else {
      hasflipped = false;
      secondcard = this;
      match(firstcard, secondcard);
    }
  }
}
//clicking event
for (let i = 0; i < myLi.length; i++) {
  myLi[i].addEventListener("click", flip);
}
// match function
function match(first, second) {
  if (first !== second) {
    if (first.getAttribute("class") === second.getAttribute("class")) {
      setTimeout(() => {
        first.classList.add("currect");
        second.classList.add("currect");
      }, 500);
      counter++;
      win();
      for (let i = 0; i < myLi.length; i++) {
        if (myLi[i].classList.contains("currect")) {
          myLi[i].removeEventListener("click", flip);
        }
      }
    } else {
      setTimeout(() => {
        first.classList.remove("flipped");
        second.classList.remove("flipped");
      }, 500);
      first.addEventListener("click", flip);
    }
  }
}
//timer function
function startTimer() {
  jtens++;
  if (jtens < 9) {
    tens.innerHTML = "0" + jtens;
  }
  if (jtens > 9) {
    tens.innerHTML = jtens;
  }
  if (jtens > 99) {
    jseconds++;
    jtens = 0;
    if (jseconds <= 9) {
      seconds.innerHTML = "0" + jseconds;
    }
    if (jseconds > 9) {
      seconds.innerHTML = jseconds;
    }
  }
  if (levelValue === "easy") {
    if (counter === 4) {
      clearInterval(timeout);
    }
  } else if (levelValue === "medium") {
    if (counter === 6) {
      clearInterval(timeout);
    }
  } else if (levelValue === "hard") {
    if (counter === 8) {
      clearInterval(timeout);
    }
  }
  switch (levelValue) {
    case "easy":
      if (counter === 4) clearInterval(timeout);
      break;
    case "medium":
      if (counter === 6) clearInterval(timeout);
      break;
    case "hard":
      if (counter === 8) clearInterval(timeout);
      break;
  }
}
//win function
let canWin = false;
function win() {
  switch (levelValue) {
    case "easy":
      counter === 4 ? (canWin = true) : (canWin = false);
      break;
    case "medium":
      counter === 6 ? (canWin = true) : (canWin = false);
      break;
    case "hard":
      counter === 8 ? (canWin = true) : (canWin = false);
      break;
  }
  if (canWin) {
    clearInterval(timeout);
    text.innerHTML = `your time was ${jseconds},${jtens}seconds `;
    setTimeout(() => {
      Swal.fire({
        title: "YOU ARE A WINNER🎉🎊",
        width: 600,
        padding: "3em",
        color: "#716add",
        background: "#fff url(/images/Nightcitymini.jpg)",
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/partyparrot.gif")
          right top
          no-repeat`,
      });
    }, 250);
  }
}
//difficulty select
level.onchange = () => {
  levelValue = level.value;
  if (levelValue === "easy") {
    Swal.fire({
      title: "Are you sure?",
      text: "You will lose your advance",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        if (selectEasy) {
          for (let i = 0; i < myLi.length; i++) {
            myLi[i].classList.remove(myCards[i]);
          }
          if (extraArr.length !== 0) {
            for (let i = 0; i < 4; i++) {
              firstRow.removeChild(extraArr[i]);
            }
          }
          if (extraArr.length > 4) {
            for (let i = 4; i < 8; i++) {
              secondRow.removeChild(extraArr[i]);
            }
          }
          if (extraArr.length === 4) {
            for (let i = 0; i < 4; i++) {
              extraArr.pop();
            }
          }
          if (extraArr.length === 8) {
            for (let i = 0; i < 8; i++) {
              extraArr.pop();
            }
          }
          myCards = [
            "ballon",
            "ghost",
            "alien",
            "tongue",
            "ballon",
            "ghost",
            "alien",
            "tongue",
          ];
          shufel(myCards);
          for (let i = 0; i < myLi.length; i++) {
            myLi[i].classList.add(myCards[i]);
          }
          reStart();
          selectEasy = false;
          selectMedium = true;
          selectHard = true;
        }
      }
    });
  } else if (levelValue === "medium") {
    Swal.fire({
      title: "Are you sure?",
      text: "You will lose your advance",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        if (selectMedium) {
          for (let i = 0; i < myLi.length; i++) {
            myLi[i].classList.remove(myCards[i]);
          }
          if (extraArr.length !== 0) {
            for (let i = 0; i < 4; i++) {
              firstRow.removeChild(extraArr[i]);
            }
          }
          if (extraArr.length > 4) {
            for (let i = 4; i < 8; i++) {
              secondRow.removeChild(extraArr[i]);
            }
          }
          if (extraArr.length === 4) {
            for (let i = 0; i < 4; i++) {
              extraArr.pop();
            }
          } else if (extraArr.length === 8) {
            for (let i = 0; i < 8; i++) {
              extraArr.pop();
            }
          }
          for (let i = 0; i < 4; i++) {
            extralis = document.createElement("li");
            extraArr.push(extralis);
            firstRow.appendChild(extraArr[i]);
          }
          for (let i = 0; i < myLi.length; i++) {
            myLi[i].addEventListener("click", flip);
          }
          myCards = [
            "ballon",
            "ghost",
            "alien",
            "tongue",
            "key",
            "pill",
            "ballon",
            "ghost",
            "alien",
            "tongue",
            "key",
            "pill",
          ];
          shufel(myCards);
          for (let i = 0; i < myLi.length; i++) {
            myLi[i].classList.add(myCards[i]);
          }
          reStart();
          selectEasy = true;
          selectMedium = false;
          selectHard = true;
        }
      }
    });
  } else if (levelValue === "hard") {
    Swal.fire({
      title: "Are you sure?",
      text: "You will lose your advance",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        if (selectHard) {
          for (let i = 0; i < myLi.length; i++) {
            myLi[i].classList.remove(myCards[i]);
          }
          if (extraArr.length !== 0) {
            for (let i = 0; i < 4; i++) {
              firstRow.removeChild(extraArr[i]);
            }
          }
          if (extraArr.length === 4) {
            for (let i = 0; i < 4; i++) {
              extraArr.pop();
            }
          }
          for (let i = 0; i < 4; i++) {
            extralis = document.createElement("li");
            extraArr.push(extralis);
            firstRow.appendChild(extraArr[i]);
          }
          for (let i = 4; i < 8; i++) {
            extralis = document.createElement("li");
            extraArr.push(extralis);
            secondRow.appendChild(extraArr[i]);
          }
          for (let i = 0; i < myLi.length; i++) {
            myLi[i].addEventListener("click", flip);
          }
          myCards = [
            "ballon",
            "ghost",
            "alien",
            "tongue",
            "key",
            "pill",
            "cigarette",
            "guitar",
            "ballon",
            "ghost",
            "alien",
            "tongue",
            "key",
            "pill",
            "cigarette",
            "guitar",
          ];
          shufel(myCards);
          for (let i = 0; i < myLi.length; i++) {
            myLi[i].classList.remove;
            myLi[i].classList.add(myCards[i]);
          }
          reStart();
          selectEasy = true;
          selectMedium = true;
          selectHard = false;
        }
      }
    });
  }
};
//reset button
function clearCardClass() {
  for (let i = 0; i < myLi.length; i++) {
    if (myLi[i].classList.contains("flipped")) {
      myLi[i].classList.remove("flipped");
      myLi[i].addEventListener("click", flip);
    }
    if (myLi[i].classList.contains("currect")) {
      myLi[i].classList.remove("currect");
    }
  }
}
function clearTimeAndCounter() {
  counter = 0;
  clearInterval(timeout);
  canStart = true;
}
function reShufel() {
  for (let i = 0; i < myLi.length; i++) {
    myLi[i].classList.remove(myCards[i]);
  }
  shufel(myCards);
  for (let i = 0; i < myLi.length; i++) {
    myLi[i].classList.add(myCards[i]);
  }
}
function reStart() {
  clearCardClass();
  clearTimeAndCounter();
  setTimeout(() => {
    reShufel();
  }, 500);
  for (let i = 0; i < myLi.length; i++) {
    myLi[i].classList.add("flipped");
    setTimeout(() => {
      myLi[i].classList.remove("flipped");
    }, 200);
  }
  canWin = false;
  canhint = true;
  jtens = 0;
  jseconds = 0;
  tens.innerHTML = "0" + jtens;
  seconds.innerHTML = "0" + jseconds;
  text.innerHTML = ``;
  for (let i = 0; i < myLi.length; i++) {
    myLi[i].addEventListener("click", flip);
  }
}
reset.addEventListener("click", () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You will lose your advance",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      reStart();
    }
  });
});
//hint button
hint.addEventListener("click", () => {
  if (canhint) {
    canhint = false;
    for (let i = 0; i < myLi.length; i++) {
      if (!myLi[i].classList.contains("currect")) {
        myLi[i].classList.add("flipped");
        setTimeout(() => {
          myLi[i].classList.remove("flipped");
        }, 1000);
      }
    }
  }
});
