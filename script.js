let typeEnd = false;
let wordList = [];
const textbox = document.getElementById('text')
let word = ""
let speed = document.getElementById('speed')
let c = 0
let gameOver = false
let start = null

async function loadtext() {
  const response = await fetch("word.txt");
  const text = await response.text();

  wordList = text.split(/\r?\n/)
  let words = [];
  for (let i = 0; i < 25; i++) {
    words.push(wordList[Math.floor(Math.random() * wordList.length)]);
  }
  word = words.join(" ");
  textbox.innerHTML = "";
  for (const ch of word) {
    const span = document.createElement("span");
    span.textContent = ch;
    span.classList.add("pending");
    textbox.appendChild(span);
  }
}

window.onload = async function() {
  await loadtext();
  intialize();
}


function intialize() {
  const letters = document.querySelectorAll('#text span')
  let index = 0;



  document.addEventListener("keydown", (e) => {

    if (gameOver || index >= letters.length) return;

    if (start === null) {
      start = Date.now();
      setTimeout(() => {
        gameOver = true;
        const elapsedMinutes = 5 / 60;
        speed.innerHTML = Math.round((c / 5) / elapsedMinutes);
        alert("Time's up");
      }, 5000);
    }


    if (e.key.length === 1) {
      if (e.key === letters[index].textContent) {
        letters[index].classList.replace("pending", "correct");
        c++;
      }
      else {
        letters[index].classList.replace("pending", "wrong");

      }
      index++;
    }
    if (e.key === "Backspace" && index > 0) {
      index--;
      letters[index].className = "pending";
    }
  })
}
