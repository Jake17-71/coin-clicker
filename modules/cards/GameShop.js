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
    const config = this.getCardConfig(cardId)
    const price = this.calculateNextLevelPrice(cardId)

    if (!this.scoreLogic.isEnoughScore(price)) {
      return
    }

    this.scoreLogic.spendScore(price)
    this.scoreLogic.showAlert('success', `${config.title} успешно куплен!`)

    this.gameMain.purchasedCards.set(cardId, 1)

    this.applyCardEffect(cardId, 1)

    this.removeCard(cardId, this.containerShopElement)
    this.addCard(cardId, this.containerInventoryElement)

    this.toggleEmptyMessage(this.containerShopElement)
    this.toggleEmptyMessage(this.containerInventoryElement)
  }

  upgradeCard(cardId) {
    const config = this.getCardConfig(cardId)
    const currentLevel = this.getCardLevel(cardId)

    if (this.isMaxLevel(cardId)) {
      this.scoreLogic.showAlert('warning', 'Достигнут максимальный уровень карточки')
      return
    }

    if (currentLevel === 0) {
      this.scoreLogic.showAlert('error', 'Карточка не куплена')
      return
    }

    const price = this.calculateNextLevelPrice(cardId)

    if (!this.scoreLogic.isEnoughScore(price)) {
      return
    }

    this.scoreLogic.spendScore(price)

    const newLevel = currentLevel + 1
    this.gameMain.purchasedCards.set(cardId, newLevel)

    this.applyCardEffect(cardId)

    this.scoreLogic.showAlert('success', `${config.title} улучшен до уровня ${newLevel}!`)

    this.updateCardUI(cardId, this.containerInventoryElement)
  }

  applyCardEffect(cardId) {
    const config = this.getCardConfig(cardId)
    const effectIncrease = config.effectMultiplier

    switch (config.effectType) {
      case 'clickPower':
        this.scoreLogic.addClickPower(effectIncrease)
        break
      case 'passiveIncome':
        this.scoreLogic.addPassiveScore(effectIncrease)
        break
      case 'criticalChance':
        this.scoreLogic.addCriticalClickChance(effectIncrease)
        break
      case 'criticalDamage':
        this.scoreLogic.addCriticalDamageBonus(effectIncrease)
        break
      case 'passiveIncomeSpeed':
        this.scoreLogic.addPassiveIncomeSpeedBonus(effectIncrease)
        this.scoreLogic.updatePassiveIncomeInterval()
        break
    }
  }

  initShop() {
    const allCardIds = Object.keys(this.cardsConfig)

    allCardIds.forEach(cardId => {
      if (!this.gameMain.purchasedCards.has(cardId)) {
        this.addCard(cardId, this.containerShopElement)
      }
    })

    this.toggleEmptyMessage(this.containerShopElement)
  }
}

export default GameShop