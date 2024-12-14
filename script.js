const coinFeed = document.querySelector("#coin-feed")
const changeButton = document.querySelector("#change-button")
const itemButtons = document.querySelectorAll(".selections>button")
let hasMoney = false
const door = document.querySelector("#dispenser-door")
const closePopup = document.querySelector("#close-popup")
let drinkItem = 0
const popup = document.querySelector("#popup")
const drink = document.querySelector("#drink")
const cardTitle = document.querySelector("#popup h2")
const cardDesc = document.querySelector("#popup p")
const cardImg = document.querySelector("#popup img")
const cardRating = document.querySelector("#card-rating")
const hint = document.querySelector(".hint")
const root = document.documentElement
const drinks = [
  {
    drinkName: "White Sour",
    drinkImage: "./assets/cans/white_sour.png",
    drinkDesc: "A sweet refreshing dairy drink with some pleasant sour notes.",
    drinkRating: 4,
    backgroundColor: "#ffffff",
  },
  {
    drinkName: "Peach",
    drinkImage: "./assets/cans/peach.png",
    drinkDesc:
      "Enjoy the taste and aroma of a juicy White Peach in drink form.",
    drinkRating: 4,
    backgroundColor: "#fbe2de",
  },
  {
    drinkName: "Vitamin C Energy",
    drinkImage: "./assets/cans/energy.png",
    drinkDesc:
      "A refreshingly fizzing drink. Boost your mood with our Vitamin C Energy carbonated drink.",
    drinkRating: 5,
    backgroundColor: "#ffdb01",
  },
  {
    drinkName: "Yogurt Sour",
    drinkImage: "./assets/cans/yogurt_sour.png",
    drinkDesc:
      "Ever wanted a hard version of your favorite Japanese probiotic? Well now you can!",
    drinkRating: 5,
    backgroundColor: "#fee7bb",
  },
  {
    drinkName: "Lemon Orange",
    drinkImage: "./assets/cans/lemon_orange.png",
    drinkDesc:
      "Love citrus? Give this drink a try! Made with fresh lemons and mandarin oranges.",
    drinkRating: 3,
    backgroundColor: "#00b2de",
  },
  {
    drinkName: "Iced Tea Sour",
    drinkImage: "./assets/cans/iced_tea_sour.png",
    drinkDesc:
      "Savor the smoothness of our new Iced Tea Sour. Made with black tea, and sports a pleasant aftertaste.",
    drinkRating: 2,
    backgroundColor: "#db5808",
  },
  {
    drinkName: "Black Currant Orange",
    drinkImage: "./assets/cans/black_currant_orange.png",
    drinkDesc:
      "Try something a little more exotic with our Black Currant and Orange mix.",
    drinkRating: 4,
    backgroundColor: "#a5005c",
  },
  {
    drinkName: "White Grape",
    drinkImage: "./assets/cans/white_grape.png",
    drinkDesc:
      "Feeling for a particularly fruity drink? Grab a can of our White Grape drink today!",
    drinkRating: 3,
    backgroundColor: "#d2dc01",
  },
]

let itemCount = 0
let isClear = true

// Sounds!!
const fxCoinInsert = new Audio("./assets/sounds/coin-drop.wav")
const fxCoinReturn = new Audio("./assets/sounds/coin-return.wav")
const fxChangeButton = new Audio("./assets/sounds/change-return.wav")
const fxCanDrop = new Audio("./assets/sounds/can-drop.wav")
const fxDoorOpen = new Audio("./assets/sounds/door-creak.wav")
const fxSip = new Audio("./assets/sounds/sip.wav")

coinFeed.addEventListener("click", () => {
  if (!hasMoney && isClear) {
    // Play coin insert sound
    fxCoinInsert.play()
    coinFeed.setAttribute("disabled", true)
    hasMoney = true
    hint.classList.add("hidden")
    for (let itemButton of itemButtons) {
      itemButton.firstElementChild.classList.add("on")
      itemButton.removeAttribute("disabled")

      itemButton.addEventListener("click", dispenseSelf)
    }
  }
})

function dispenseSelf(e) {
  let temp = e.target
  if (e.target.nodeName == "SPAN") {
    drinkItem = Number(String(temp.parentNode.id).charAt(10))
  } else {
    drinkItem = Number(String(temp.id).charAt(10))
  }
  root.style.setProperty("--can-image", `url(${drinks[drinkItem].drinkImage})`)
  drink.classList.add("drop")
  fxCanDrop.play()
  drink.removeAttribute("disabled")

  setTimeout(() => {
    door.classList.add("open")
    fxDoorOpen.play()
  }, 500)

  isClear = false
  resetMachine()
}

changeButton.addEventListener("click", () => {
  // Play button push sound
  fxChangeButton.play()
  if (hasMoney) {
    // Play coin return sound
    fxCoinReturn.play()
  }

  resetMachine()
})

function resetMachine() {
  coinFeed.removeAttribute("disabled")
  hasMoney = false
  for (let itemButton of itemButtons) {
    itemButton.firstElementChild.classList.remove("on")
    itemButton.setAttribute("disabled", true)
  }
}

function clearMachine() {
  door.classList.remove("open")
  drink.classList.remove("drop")
  fxSip.play()
  drink.setAttribute("disabled", true)
}

drink.addEventListener("click", () => {
  clearMachine()
  isClear = true
  popup.classList.remove("hidden")
  cardImg.setAttribute("src", drinks[drinkItem].drinkImage)
  cardTitle.innerText = drinks[drinkItem].drinkName
  cardDesc.innerText = drinks[drinkItem].drinkDesc
  popup.style.setProperty("background-color", drinks[drinkItem].backgroundColor)
  while (cardRating.children.length > 0) {
    cardRating.replaceChildren()
  }

  for (let i = 0; i < drinks[drinkItem].drinkRating; i++) {
    cardRating.appendChild(document.createElement("li"))
  }
})

closePopup.addEventListener("click", () => {
  popup.classList.add("hidden")
})
