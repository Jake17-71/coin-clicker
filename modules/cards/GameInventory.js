import GameCardsMain from './GameCardsMain.js'

class GameInventory extends GameCardsMain {
  selectors = {
    inventory: '[data-js-inventory-list]',
    listItemSelector: '[data-js-list-item]',
  }

  constructor(scoreLogic, gameMain) {
    super(scoreLogic, gameMain)
    this.containerInventoryElement = document.querySelector(this.selectors.inventory)
    this.listItemElement = this.selectors.listItemSelector
    this.initInventory()
  }

  initInventory() {
    this.gameMain.purchasedCards.forEach((level, cardId) => {
      this.addCard(cardId, this.containerInventoryElement)
    })

    this.toggleEmptyMessage(this.containerInventoryElement)
  }
}

export default GameInventory