class GameScoreLogic {

  selectors = {
    displaySelector: `[data-js-score-display]`
  }

  gameConfig = {
    score: null,
    clickPower: 1,
    passiveScore: 0,
    criticalClickChance: 0,
    criticalMultiplier: 2,
  }

  constructor(initialScore = 0) {
    this.score = initialScore
    this.clickPower = this.gameConfig.clickPower
    this.passiveScore = this.gameConfig.passiveScore
    this.criticalClickChance = this.gameConfig.criticalClickChance
    this.criticalMultiplier = this.gameConfig.criticalMultiplier
    this.displayElements = document.querySelectorAll(this.selectors.displaySelector)
  }

  addScore () {

    if (this.isCriticalClickActivate() === true) {
      this.score += this.clickPower * this.criticalMultiplier
    } else this.score += this.clickPower

    this.updateDisplay()
  }

  updateDisplay () {
    this.displayElements.forEach(element => {
      element.textContent = this.score
    })
  }

  isEnoughScore (cardPrice) {
    return this.score >= cardPrice
  }

  spendScore (cardPrice) {
    this.score -= cardPrice
    this.updateDisplay()
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