//automated track
let computertrack = []

//player's track
let playertrack = []

//list of colors
let colors = ["green", "red", "yellow", "blue"]

let level = 1
let check = true
let cnt = 0

$(window).on("keydown", (e) => {
  if (check) {
    $("#level-title").text(`level ${level}`)
    playrandom()
  }
  check = false
})

$(".btn").on("click", (e) => {
  let color = e.target.id
  playAudio(color)
  makePressed(color)
  //check clicked element is correct or not.

  if (checkCorrectOrNot(color)) {
    //game continue;
    if (cnt == computertrack.length) {
      cnt = 0
      level++
      $("#level-title").text(`level ${level}`)
      playrandom()
    }
  } else {
    //game over.
    $("#level-title").text("Game over, Press any key to restart.")
    $("body").addClass("red")
    setTimeout(() => {
      $("body").removeClass("red")
    }, 500)
    playAudio("wrong")
    check = true
    level = 1
    computertrack = []
    cnt = 0
  }
})
function playrandom() {
  setTimeout(() => {
    let random = Math.floor(Math.random() * 4)
    playAudio(colors[random])
    addItem(colors[random])
    $(`#${colors[random]}`).fadeOut(100).fadeIn(100)
  }, 1000)
}
function addItem(color) {
  computertrack.push(color)
}
function playAudio(song) {
  let audio = new Audio(`./sounds/${song}.mp3`)
  audio.play()
}
function makePressed(color) {
  $(`#${color}`).addClass("pressed")
  setTimeout(() => {
    $(`#${color}`).removeClass("pressed")
  }, 100)
}
function checkCorrectOrNot(color) {
  if (computertrack[cnt++] === color) {
    return true
  } else {
    false
  }
}
