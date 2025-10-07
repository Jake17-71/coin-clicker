import GameScoreLogic from './gameLogic/GameScoreLogic.js'
import GameClickHandler from './gameLogic/GameClickHandler.js'
import GameStorageLogic from './gameLogic/GameStorageLogic.js'
import GameShop from './cards/GameShop.js'
import GameInventory from './cards/GameInventory.js'

class GameMain {
  constructor() {
    this.purchasedCards = new Set()
    this.scoreLogic = null
    this.storageLogic = null
    this.clickHandler = null
    this.gameShop = null
    this.gameInventory = null

    this.init()
  }

  init() {
    this.startNewGame()
    this.gameShop = new GameShop(this.scoreLogic, this)
    this.gameInventory = new GameInventory(this.scoreLogic, this)
    this.clickHandler = new GameClickHandler(this.scoreLogic, this)
    this.logGameState()
  }

  startNewGame() {
    this.scoreLogic = new GameScoreLogic(0)
    this.storageLogic = new GameStorageLogic(this.scoreLogic, this)
    this.storageLogic.loadStorage()
    this.storageLogic.startAutoSave()
    this.scoreLogic.updateDisplay()
    this.scoreLogic.setPassiveIncome()
  }

  resetGame() {
    this.storageLogic.clearStorage()
    this.purchasedCards.clear()

    this.scoreLogic.score = this.scoreLogic.gameConfig.score
    this.scoreLogic.clickPower = this.scoreLogic.gameConfig.clickPower
    this.scoreLogic.passiveScore = this.scoreLogic.gameConfig.passiveScore
    this.scoreLogic.criticalClickChance = this.scoreLogic.gameConfig.criticalClickChance
    this.scoreLogic.updateDisplay()

    location.reload()
  }

  logGameState() {
    console.log('Game State:', {
      clickPower: this.scoreLogic.clickPower,
      passiveScore: this.scoreLogic.passiveScore,
      criticalClickChance: this.scoreLogic.criticalClickChance,
      criticalMultiplier: this.scoreLogic.criticalMultiplier,
      purchasedCards: Array.from(this.purchasedCards)
    })
  }
}

export default GameMain