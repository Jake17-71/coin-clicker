import GameCardsMain from './GameCardsMain.js'

class GameInventory extends GameCardsMain {

  selectors = {
    inventory: `[data-js-inventory-list]`
  }

  constructor(Main) {
    super()
    this.Main = Main
    this.containerElement = document.querySelector(this.selectors.inventory)
    this.initInventory()
  }

  initInventory() {

    this.updateDisplay(this.containerElement, 'Вы не купили улучшений :(')
  }
}

export default GameInventory