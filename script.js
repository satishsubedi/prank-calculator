const displayElm = document.querySelector(".result");
let tobedisplay = "";
const operators = ["%", "/", "*", "+", "-"];
let lastOper = "";
const audio = new Audio("./sound.mp3");
// Capturing clicked button
const clickBtn = document.querySelectorAll(".btn");
clickBtn.forEach((btn) => {
  btn.addEventListener("mousedown", () => {
    btn.style.scale = "0.5";
  });
  btn.addEventListener("click", () => {
    btn.style.scale = "1";
    value = btn.innerText;
    btnAction(value);
  });
});
const display = (value) => {
  displayElm.innerText = value || "0.0";
};
const btnAction = (clickedkey) => {
  displayElm.classList.remove("prank");
  if (clickedkey === "AC") {
    tobedisplay = "";
    return display(tobedisplay);
  }
  if (clickedkey === "C") {
    tobedisplay = tobedisplay.slice(0, -1);
    return display(tobedisplay);
  }

  if (clickedkey === "=" || clickedkey === "Enter") {
    lastOper = "";
    const lastChar = tobedisplay[tobedisplay.length - 1];
    if (operators.includes(lastChar)) {
      tobedisplay = tobedisplay.slice(0, -1);
    }
    const extravalue = randValue();
    if (extravalue) {
      displayElm.classList.add("prank");
      audio.play();
    }
    const total = eval(tobedisplay) + extravalue;

    return display(total);
  }

  if (operators.includes(clickedkey)) {
    lastOper = clickedkey;
    const lastChar = tobedisplay[tobedisplay.length - 1];
    if (operators.includes(lastChar)) {
      tobedisplay = tobedisplay.slice(0, -1);
    }
  }
  if (clickedkey === ".") {
    const lastOperIndex = tobedisplay.lastIndexOf(lastOper);
    const numberSet = tobedisplay.slice(lastOperIndex);
    if (numberSet.includes(".")) {
      return;
    }
    if (!lastOper && tobedisplay.includes(".")) {
      return;
    }
  }
  firstChar = tobedisplay[0];
  if (operators.includes(firstChar)) {
    tobedisplay = tobedisplay.slice(1);
    // firstChar = "";
  }

  tobedisplay += value;
  display(tobedisplay);
};
const randValue = () => {
  const num = Math.round(Math.random() * 10);
  console.log(num);
  return num < 3 ? num : 0;
};

document.addEventListener("keypress", (e) => {
  if (e.code.includes("Key")) {
    return;
  }

  value = e.key;
  console.log(value);
  btnAction(value);
});
