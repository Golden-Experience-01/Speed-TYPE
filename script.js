let typeEnd = false;
let wordList = [];
const textbox = document.getElementById('text')
let word = ""
async function loadtext() {
  const response = await fetch("word.txt");
  const text = await response.text();

  wordList = text.split(/\r?\n/)
  let words = [];
  for (let i = 0; i < 25; i++) {
    words.push(wordList[Math.floor(Math.random() * wordList.length)]);
  }
  word = words.join(" ");
  textbox.innerHTML = word;
}

window.onload = async function() {
  await loadtext();
  intialize();
}


function intialize() {

}
