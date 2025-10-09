import GameCardsMain from './GameCardsMain.js'

class GameInventory extends GameCardsMain {
  selectors = {
    inventory: '[data-js-inventory-list]'
  }

  constructor(scoreLogic, gameMain) {
    super(scoreLogic, gameMain)
    this.containerInventoryElement = document.querySelector(this.selectors.inventory)
    this.initInventory()
  }

  initInventory() {
    this.gameMain.purchasedCards.forEach(cardId => {
      this.addCard(cardId, this.containerInventoryElement)
    })

    this.toggleEmptyMessage(this.containerInventoryElement)
  }
}

export default GameInventory