class GameStorageLogic {
  constructor(scoreLogic) {
    this.scoreLogic = scoreLogic
    this.storageKey = 'game data'
  }

  saveData() {
    const gameData = {
      score: this.scoreLogic.score,
      clickPower: this.scoreLogic.clickPower,
      passiveScore: this.scoreLogic.passiveScore,
      criticalClickChance: this.scoreLogic.criticalClickChance,
    }

    const gameDataNormalize = JSON.stringify(gameData)
    localStorage.setItem(this.storageKey, gameDataNormalize)
  }

  loadStorage = () => {
   const gameDataNormalize = localStorage.getItem(this.storageKey)

    if (gameDataNormalize) {
      const gameData = JSON.parse(gameDataNormalize)
      this.scoreLogic.loadState(gameData)
    }
  }

  startAutoSave() {
    setInterval(() => {
      this.saveData()
    }, 5000)
  }

  clearStorage = () => {
    localStorage.removeItem(this.storageKey)
  }
}

export default GameStorageLogic