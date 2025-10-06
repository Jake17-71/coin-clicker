import GameCardsMain from './GameCardsMain.js'

class GameShop extends GameCardsMain {

  selectors = {
    shop: `[data-js-shop-list]`
  }

  constructor() {
    super()
    this.containerElement = document.querySelector(this.selectors.shop)
    this.initShop()
  }

  loadShopCards() {
    Object.values(this.cardsConfig).forEach((card) => {
      this.addCard(card.id, this.containerElement)
    })
  }

  initShop() {
    this.loadShopCards()

    this.removeCard('card-3', this.containerElement)

    this.updateDisplay(this.containerElement, 'В магазине нет улучшений :(')
  }
}

export default GameShop