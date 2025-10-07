class GameScoreLogic {
  selectors = {
    displaySelector: '[data-js-score-display]'
  }

  gameConfig = {
    score: 0,
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

  addScore() {
    const multiplier = this.isCriticalClickActivate() ? this.criticalMultiplier : 1
    this.score += this.clickPower * multiplier
    this.updateDisplay()
  }

  updateDisplay() {
    this.displayElements.forEach(element => {
      element.textContent = this.score
    })
  }

  showAlert(state) {
    console.log(state ? 'Success Alert' : 'Error Alert', state)
  }

  isEnoughScore(cardPrice) {
    if (this.score < cardPrice) {
      this.showAlert(false)
      return false
    }
    return true
  }

  spendScore(cardPrice) {
    this.score -= cardPrice
    this.updateDisplay()
  }

  addClickPower(amount = 2) {
    this.clickPower *= amount
  }

  addPassiveScore(amount = 100) {
    this.passiveScore += amount
  }

  setPassiveIncome() {
    setInterval(() => {
      if (this.passiveScore > 0) {
        this.score += this.passiveScore
        this.updateDisplay()
      }
    }, 5000)
  }

  addCriticalClickChance() {
    this.criticalClickChance += 10
  }

  isCriticalClickActivate() {
    if (this.criticalClickChance === 0) return false
    return Math.random() * 100 <= this.criticalClickChance
  }

  loadState(gameData) {
    this.score = gameData.score
    this.clickPower = gameData.clickPower
    this.passiveScore = gameData.passiveScore
    this.criticalClickChance = gameData.criticalClickChance
  }
}

export default GameScoreLogic