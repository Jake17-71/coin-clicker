class GameScoreLogic {

  selectors = {
    displaySelector: `[data-js-score-display]`
  }


  constructor(initialScore = 0) {
    this.score = initialScore
    this.clickPower = 1
    this.passiveScore = 0
    this.criticalClickChance = 0
    this.criticalMultiplier = 2
    this.displayElements = document.querySelectorAll(this.selectors.displaySelector)
  }

  addScore () {
    this.score += this.clickPower

    if (this.isCriticalClickActivate() === true) {
      this.score += this.clickPower * this.criticalMultiplier
    }

    this.updateDisplay(this.displayElements)
  }

  updateDisplay (displayElements) {
    displayElements.forEach(element => {
      element.textContent = this.score
    })
  }

  isEnoughScore (cardPrice) {
    return this.score >= cardPrice
  }

  spendScore (cardPrice) {
    this.score -= cardPrice
    this.updateDisplay(this.displayElements)
  }

  addClickPower (amount = 2) {
    this.clickPower *= amount
  }

  addPassiveScore (amount = 100) {
    this.passiveScore += amount
  }

  setPassiveIncome () {
    setInterval(() => {
      if (this.passiveScore > 0) {
        this.score += this.passiveScore
        this.updateDisplay(this.displayElements)
      }
    }, 5000)
  }

  addCriticalClickChance () {
    this.criticalClickChance += 10
  }

  isCriticalClickActivate () {
    const randomNumber = this.getRandomNumber()

    if (this.criticalClickChance === 0 ) return false
    else return randomNumber <= this.criticalClickChance;
  }

  getRandomNumber () {
    return Math.random() * 100
  }

  loadState (gameData) {
    this.score = gameData.score
    this.clickPower = gameData.clickPower
    this.passiveScore = gameData.passiveScore
    this.criticalClickChance = gameData.criticalClickChance
  }
}

export default GameScoreLogic