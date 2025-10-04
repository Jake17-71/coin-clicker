import GameScoreLogic from './GameScoreLogic.js'
import GameClickHandler from './GameClickHandler.js'
import GameStorageLogic from './GameStorageLogic.js'

class GameMain {

  constructor() {
    this.scoreLogic = null
    this.clickHandler = null
    this.storageLogic = null
    this.init()
  }

  init() {
    this.startNewGame()
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

    this.scoreLogic.updateDisplay(this.scoreLogic.displayElements)
    this.scoreLogic.setPassiveIncome()
  }
}

export default GameMain