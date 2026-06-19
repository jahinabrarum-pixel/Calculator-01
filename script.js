let input = document.getElementById("inputBox");
let buttons = document.querySelectorAll("button");

let string = "";

// 🔊 Sounds
const clickSound = new Audio("click.mp3");
const equalSound = new Audio("equal.mp3");

// Play sounds
function playClick() {
  clickSound.currentTime = 0;
  clickSound.play();
}

function playEqual() {
  equalSound.currentTime = 0;
  equalSound.play();
}

// Format symbols
function formatInput(str) {
  return str
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/%/g, "/100");
}

// Button Click
buttons.forEach(button => {
  button.addEventListener("click", (e) => {
    let value = e.target.innerText;

    // 🎯 "=" ONLY beep
    if (value === "=") {
      try {
        let result = eval(formatInput(string));
        input.value = result;
        string = result.toString();

        playEqual(); // 🔥 ONLY beep

      } catch {
        input.value = "Error";
        string = "";
      }

    } else {
      playClick(); // 🔘 ALL OTHER BUTTONS click

      if (value === "AC") {
        string = "";
        input.value = "";

      } else if (value === "DEL") {
        string = string.slice(0, -1);
        input.value = string;

      } else {
        string += value;
        input.value = string;
      }
    }
  });
});

// ⌨️ Keyboard Support
document.addEventListener("keydown", (e) => {

  if ((e.key >= 0 && e.key <= 9) || ["+", "-", "*", "/", "."].includes(e.key)) {
    string += e.key;
    input.value = string;
    playClick();
  }

  if (e.key === "Enter") {
    try {
      let result = eval(formatInput(string));
      input.value = result;
      string = result.toString();

      playEqual(); // 🔥 ONLY beep

    } catch {
      input.value = "Error";
      string = "";
    }
  }

  if (e.key === "Backspace") {
    string = string.slice(0, -1);
    input.value = string;
    playClick();
  }

  if (e.key === "Escape") {
    string = "";
    input.value = "";
    playClick();
  }
});
