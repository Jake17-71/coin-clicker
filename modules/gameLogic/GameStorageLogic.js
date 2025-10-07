class GameStorageLogic {
  autoSaveConfig = {
    autoSaveTime: 3000,
  }

  constructor(scoreLogic, gameMain) {
    this.scoreLogic = scoreLogic
    this.gameMain = gameMain
    this.storageKey = 'game-data'
  }

  saveData() {
    try {
      const gameData = {
        score: this.scoreLogic.score,
        clickPower: this.scoreLogic.clickPower,
        passiveScore: this.scoreLogic.passiveScore,
        criticalClickChance: this.scoreLogic.criticalClickChance,
        purchasedCards: Array.from(this.gameMain.purchasedCards),
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
        this.gameMain.purchasedCards = new Set(gameData.purchasedCards || [])
      }
    } catch (error) {
      console.error('Load error:', error)
    }
  }

  clearStorage() {
    try {
      localStorage.removeItem(this.storageKey)
    } catch (error) {
      console.error('Clear error:', error)
    }
  }

  startAutoSave() {
    setInterval(() => {
      this.saveData()
    }, this.autoSaveConfig.autoSaveTime)
  }
}

export default GameStorageLogic