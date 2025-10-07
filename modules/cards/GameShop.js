import GameCardsMain from './GameCardsMain.js'

class GameShop extends GameCardsMain {
  selectors = {
    shop: `[data-js-shop-list]`,
    inventory: `[data-js-inventory-list]`,
  }

  constructor(scoreLogic, gameMain) {
    super(scoreLogic, gameMain)
    this.containerShopElement = document.querySelector(this.selectors.shop)
    this.containerInventoryElement = document.querySelector(this.selectors.inventory)
    this.initShop()
  }

  buyCard(cardId) {
    this.whichCardBought(cardId)
    this.removeCard(cardId, this.containerShopElement)
    this.addCard(cardId, this.containerInventoryElement)
    this.scoreLogic.purchasedCards.push(cardId)
  }

  initShop() {
    const allCardIds = Object.keys(this.cardsConfig)

    allCardIds.forEach(cardId => {
      if (!this.gameMain.purchasedCards.has(cardId)) {
        this.addCard(cardId, this.containerShopElement)
      }
    })

    this.updateDisplay(this.containerShopElement, 'В магазине нет улучшений :(')
  }
}

export default GameShop