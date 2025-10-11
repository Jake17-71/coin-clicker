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

  constructor(initialScore = 0, alertInstance = null, storageInstance = null, modalsInstance = null) {
    this.score = initialScore
    this.victoryScore = 10
    this.clickPower = this.gameConfig.clickPower
    this.passiveScore = this.gameConfig.passiveScore
    this.criticalClickChance = this.gameConfig.criticalClickChance
    this.criticalMultiplier = this.gameConfig.criticalMultiplier
    this.displayElements = document.querySelectorAll(this.selectors.displaySelector)
    this.alertInstance = alertInstance
    this.storageInstance = storageInstance
    this.modalsInstance = modalsInstance
    this.victoryShown = false
  }

  addScore() {
    const multiplier = this.isCriticalClickActivate() ? this.criticalMultiplier : 1
    this.score += this.clickPower * multiplier
    this.updateDisplay()
  }

  updateDisplay() {
    this.displayElements.forEach(element => {
      element.textContent = `${this.score}`
    })

    this.checkAndShowVictory()
  }

  checkAndShowVictory() {
    const isVictoryScoreReached = this.checkVictoryScoreAchieved(this.score)

    const wasVictoryShownInSession = this.victoryShown

    const wasVictoryAchievedBefore = this.storageInstance
      ? this.storageInstance.isVictoryAchieved()
      : false

    if (isVictoryScoreReached && !wasVictoryShownInSession && !wasVictoryAchievedBefore) {
      this.showVictoryModal()
    }
  }

  showVictoryModal() {
    this.victoryShown = true

    if (this.storageInstance) {
      this.storageInstance.markVictoryAchieved()
    }

    if (this.modalsInstance) {
      this.modalsInstance.showVictoryPopup()
    } else {
      console.warn('Modals instance not available for victory popup')
    }
  }

  showAlert(type, message) {
    if (!this.alertInstance) {
      console.log('Alert instance not provided')
      return
    }

    switch (type) {
      case 'success':
        this.alertInstance.showSuccess(message)
        break
      case 'error':
        this.alertInstance.showError(message)
        break
      case 'info':
        this.alertInstance.showInfo(message)
        break
      case 'warning':
        this.alertInstance.showWarning(message)
        break
      default:
        this.alertInstance.showInfo(message)
    }
  }

  isEnoughScore(cardPrice) {
    if (this.score < cardPrice) {
      this.showAlert('error', 'Недостаточно средств для покупки')
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

  checkVictoryScoreAchieved(score) {
    return score >= this.victoryScore
  }

  loadState(gameData) {
    this.score = gameData.score
    this.clickPower = gameData.clickPower
    this.passiveScore = gameData.passiveScore
    this.criticalClickChance = gameData.criticalClickChance
  }

  resetVictoryFlag() {
    this.victoryShown = false
  }
}

export default GameScoreLogic