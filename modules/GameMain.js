import GameScoreLogic from './gameLogic/GameScoreLogic.js'
import GameClickHandler from './gameLogic/GameClickHandler.js'
import GameStorageLogic from './gameLogic/GameStorageLogic.js'
import GameShop from './cards/GameShop.js'
import GameInventory from './cards/GameInventory.js'

class GameMain {

  constructor() {
    this.scoreLogic = null
    this.clickHandler = null
    this.storageLogic = null
    this.gameShop = null
    this.gameInventory = null
    this.init()
  }

  init() {
    this.startNewGame()
    this.gameShop = new GameShop(this)
    this.gameInventory = new GameInventory(this)
    this.clickHandler = new GameClickHandler(this.scoreLogic, this.storageLogic)
    this.console()
  }

  console () {
    console.log('clickPower:', this.scoreLogic.clickPower)
    console.log('passiveScore:', this.scoreLogic.passiveScore)
    console.log('criticalClickChance:', this.scoreLogic.criticalClickChance)
    console.log('criticalMultiplier:', this.scoreLogic.criticalMultiplier)
  }

  startNewGame () {
    this.scoreLogic = new GameScoreLogic(0)

    this.storageLogic = new GameStorageLogic(this.scoreLogic)
    this.storageLogic.loadStorage()
    this.storageLogic.startAutoSave()

    this.scoreLogic.updateDisplay()
    this.scoreLogic.setPassiveIncome()
  }
}

export default GameMain