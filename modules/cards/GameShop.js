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
    this.gameMain = gameMain
    this.initShop()
  }

  buyCard(cardId) {
    if (this.gameMain.purchasedCards.has(cardId)) {
      this.scoreLogic.showAlert('warning', 'Этот предмет уже куплен')
      return
    }

    const card = this.getCardConfig(cardId)

    if (!this.scoreLogic.isEnoughScore(card.price)) {
      return
    }

    this.scoreLogic.spendScore(card.price)
    this.scoreLogic.showAlert('success', `${card.title} успешно куплен!`)
    this.gameMain.purchasedCards.add(cardId)

    this.applyCardEffect(cardId)

    this.removeCard(cardId, this.containerShopElement)
    this.addCard(cardId, this.containerInventoryElement)

    this.toggleEmptyMessage(this.containerShopElement)
    this.toggleEmptyMessage(this.containerInventoryElement)
  }

  applyCardEffect(cardId) {
    switch (cardId) {
      case 'card-1':
        this.scoreLogic.addClickPower()
        break
      case 'card-2':
        this.scoreLogic.addPassiveScore()
        break
      case 'card-3':
        this.scoreLogic.addCriticalClickChance()
        break
    }
  }

  abc () {
    this.buyCard('card-1')
  }

  initShop() {
    const allCardIds = Object.keys(this.cardsConfig)

    allCardIds.forEach(cardId => {
      if (!this.gameMain.purchasedCards.has(cardId)) {
        this.addCard(cardId, this.containerShopElement)
      }
    })

    this.toggleEmptyMessage(this.containerShopElement)

    document.querySelector(`[data-js-popup-confirm="buy"]`).addEventListener('click', evt => {
      this.abc()
    })
  }
}

export default GameShop