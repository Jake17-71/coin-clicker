class GameStorageLogic {
  autoSaveConfig = {
    autoSaveTime: 3000,
  }

  constructor(scoreLogic, gameMain) {
    this.scoreLogic = scoreLogic
    this.gameMain = gameMain
    this.storageKey = 'game-data'
    this.firstVisitKey = 'game-first-visit'
    this.victoryAchievedKey = 'game-victory'
  }

  saveData() {
    try {
      const gameData = {
        score: this.scoreLogic.score,
        clickPower: this.scoreLogic.clickPower,
        passiveScore: this.scoreLogic.passiveScore,
        passiveIncomeInterval: this.scoreLogic.passiveIncomeInterval,
        criticalClickChance: this.scoreLogic.criticalClickChance,
        criticalDamageBonus: this.scoreLogic.criticalDamageBonus,
        purchasedCards: Array.from(this.gameMain.purchasedCards.entries()),
      }

      localStorage.setItem(this.storageKey, JSON.stringify(gameData))
    } catch (error) {
      console.error('Save error:', error)
    }
  }

  loadStorage() {
    try {
      const gameDataNormalize = localStorage.getItem(this.storageKey)

      if (gameDataNormalize !== null) {
        const gameData = JSON.parse(gameDataNormalize)
        this.scoreLogic.loadState(gameData)
        this.gameMain.purchasedCards = new Map(gameData.purchasedCards || [])
      }
    } catch (error) {
      console.error('Load error:', error)
    }
  }

  clearStorage() {
    try {
      localStorage.removeItem(this.storageKey)
      localStorage.removeItem(this.firstVisitKey)
      localStorage.removeItem(this.victoryAchievedKey)
    } catch (error) {
      console.error('Clear error:', error)
    }
  }

  startAutoSave() {
    setInterval(() => {
      this.saveData()
    }, this.autoSaveConfig.autoSaveTime)
  }

  isFirstVisit() {
    try {
      const visited = localStorage.getItem(this.firstVisitKey)
      return visited === null
    } catch (error) {
      console.error('First visit check error:', error)
      return false
    }
  }

  markAsVisited() {
    try {
      localStorage.setItem(this.firstVisitKey, 'true')
    } catch (error) {
      console.error('Mark visited error:', error)
    }
  }

  isVictoryAchieved() {
    try {
      const victoryAchieved = localStorage.getItem(this.victoryAchievedKey)
      return victoryAchieved !== null
    } catch (error) {
      console.error('Victory Check error:', error)
    }
  }

  markVictoryAchieved() {
    try {
      localStorage.setItem(this.victoryAchievedKey, 'true')
    } catch (error) {
      console.error('Mark visited error:', error)
    }
  }
}

export default GameStorageLogic