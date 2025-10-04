class GameClickHandler {

  selectors = {
    buttonSelector: `[data-js-click-object]`,
    buttonResetSelector: `[data-js-reset-button]`
  }

  constructor(scoreLogic, storageLogic) {
    this.buttonElement = document.querySelector(this.selectors.buttonSelector)
    this.resetButtonElement = document.querySelector(this.selectors.buttonResetSelector)
    this.scoreLogic = scoreLogic
    this.storageLogic = storageLogic
    this.bindEvents()
  }

  onButtonClick = () => {
    this.scoreLogic.addScore()
  }

  onResetButtonClick = () => {
    this.storageLogic.clearStorage()

    this.scoreLogic.score = 0
    this.scoreLogic.clickPower = 1
    this.scoreLogic.passiveScore = 0
    this.scoreLogic.criticalClickChance = 0

    this.scoreLogic.updateDisplay(this.scoreLogic.displayElements)
    location.reload()
  }

  bindEvents() {
    this.buttonElement.addEventListener('click', this.onButtonClick)
    this.resetButtonElement.addEventListener('click', this.onResetButtonClick)
  }
}

export default GameClickHandler