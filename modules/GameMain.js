import GameScoreLogic from './gameLogic/GameScoreLogic.js'
import GameClickHandler from './gameLogic/GameClickHandler.js'
import GameStorageLogic from './gameLogic/GameStorageLogic.js'
import GameShop from './cards/GameShop.js'
import GameInventory from './cards/GameInventory.js'
import AlertCollection from './AlertCollection.js'
import ModalsMain from './Modals.js'

class GameMain {
  constructor() {
    this.purchasedCards = new Set()
    this.alertCollection = null
    this.scoreLogic = null
    this.storageLogic = null
    this.clickHandler = null
    this.gameShop = null
    this.gameInventory = null
    this.modals = null

    this.init()
  }

  init() {
    this.alertCollection = new AlertCollection()
    this.startNewGame()
    this.gameShop = new GameShop(this.scoreLogic, this)
    this.gameInventory = new GameInventory(this.scoreLogic, this)
    this.modals = new ModalsMain(this.gameShop, this.gameShop, this)
    this.scoreLogic.modalsInstance = this.modals
    this.clickHandler = new GameClickHandler(this.scoreLogic, this)
    this.checkFirstVisit()
    this.logGameState()
  }

  startNewGame() {
    this.scoreLogic = new GameScoreLogic(0, this.alertCollection, null, null)
    this.storageLogic = new GameStorageLogic(this.scoreLogic, this)
    this.scoreLogic.storageInstance = this.storageLogic
    this.storageLogic.loadStorage()
    this.storageLogic.startAutoSave()
    this.scoreLogic.updateDisplay()
    this.scoreLogic.setPassiveIncome()
  }

  checkFirstVisit() {
    if (this.storageLogic.isFirstVisit()) {
      this.modals.showFirstLoadPopup()
      this.storageLogic.markAsVisited()
    }
  }

  resetGame() {
    this.storageLogic.clearStorage()
    this.purchasedCards.clear()

    this.scoreLogic.score = this.scoreLogic.gameConfig.score
    this.scoreLogic.clickPower = this.scoreLogic.gameConfig.clickPower
    this.scoreLogic.passiveScore = this.scoreLogic.gameConfig.passiveScore
    this.scoreLogic.criticalClickChance = this.scoreLogic.gameConfig.criticalClickChance
    this.scoreLogic.resetVictoryFlag()
    this.scoreLogic.updateDisplay()

    this.alertCollection.showInfo('Прогресс сброшен')

    setTimeout(() => {
      location.reload()
    }, 2000)
  }

  logGameState() {
    console.log('Game State:', {
      clickPower: this.scoreLogic.clickPower,
      passiveScore: this.scoreLogic.passiveScore,
      criticalClickChance: this.scoreLogic.criticalClickChance,
      criticalMultiplier: this.scoreLogic.criticalMultiplier,
      purchasedCards: Array.from(this.purchasedCards),
      victoryAchieved: this.storageLogic.isVictoryAchieved(),
      currentScore: this.scoreLogic.score
    })
  }
}

export default GameMain