class ModalsMain {
  selectors = {
    cardButtonDescription: '[data-js-card-button-description]',
    popupClose: '[data-js-popup-close]',
    popupConfirm: '[data-js-popup-confirm]',
    shopList: '[data-js-shop-list]',
    inventoryList: '[data-js-inventory-list]',
    resetButton: '[data-js-reset-button]',
  }

  confettiConfig = {
    duration: 5000,
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
  }

  popupTemplates = {
    reset: () => `
      <div class="popup__content">
        <button
          type="button"
          class="popup__close"
          aria-label="Закрыть диалоговое окно"
          data-js-popup-close
        ></button>
  
        <div class="popup__header">
          <h2 class="popup__title" id="popup-title-reset">
            Подтвердите действие
          </h2>
        </div>
  
        <div class="popup__body">
          <p class="popup__description">
            Вы уверены, что хотите сбросить весь прогресс?
          </p>
        </div>
  
        <div class="popup__footer">
          <button
            type="button"
            class="popup__button popup__button--secondary"
            data-js-popup-close
          >
            Нет
          </button>
          <button
            type="button"
            class="popup__button popup__button--primary"
            data-js-popup-confirm="reset"
          >
            Да
          </button>
        </div>
      </div>
    `,

    firstLoad: () => `
      <div class="popup__content">
        <button
          type="button"
          class="popup__close"
          aria-label="Закрыть диалоговое окно"
          data-js-popup-close
        ></button>
  
        <div class="popup__header">
          <h2 class="popup__title" id="popup-title-reset">
            Привет!
          </h2>
        </div>
  
        <div class="popup__body">
          <p class="popup__description popup__description--centered-text">
            Цель данной игры достигнуть 1.000.000 очков! <br><br>
            Более подробно ознакомится с механиками игры можно во вкладке "Правила". <br>
          </p>
        </div>
  
        <div class="popup__footer">
          <button
            type="button"
            class="popup__button popup__button--primary"
            data-js-popup-close
          >
            Понятно
          </button>
        </div>
      </div>
    `,

    shop: (config) => `
      <div class="popup__content popup__content--card">
        <button
          type="button"
          class="popup__close"
          aria-label="Закрыть диалоговое окно"
          data-js-popup-close
        ></button>
  
        <div class="popup__card-image">
          <img
            class="popup__image"
            src="${config.image}"
            alt="${config.title}"
            width="120"
            height="120"
            loading="lazy"
          />
        </div>
  
        <div class="popup__card-header">
          <h2 class="popup__title" id="popup-title-shop">
            ${config.title}
          </h2>
        </div>
  
        <div class="popup__card-price">
          <span class="popup__price-label">Цена:</span>
          <div class="popup__price">
            <div class="popup__price-icon">
              <img
                            src="/images/paw.png"
                            alt=""
                            width=""
                            height=""
                            loading="lazy"
                          />
            </div>
            <span class="popup__price-value">${config.basePrice}</span>
          </div>
        </div>
  
        <div class="popup__card-body">
          <div class="popup__description">
            ${config.description}
          </div>
        </div>
  
        <div class="popup__footer popup__footer--card">
          <button
            type="button"
            class="popup__button popup__button--secondary"
            data-js-popup-close
          >
            Отмена
          </button>
          <button
            type="button"
            class="popup__button popup__button--primary"
            data-js-popup-confirm="buy"
          >
            Купить
          </button>
        </div>
      </div>
    `,

    inventory: (config, currentLevel, nextPrice, isMaxLevel) => `
      <div class="popup__content popup__content--card">
        <button
          type="button"
          class="popup__close"
          aria-label="Закрыть диалоговое окно"
          data-js-popup-close
        ></button>
  
        <div class="popup__card-image">
          <img
            class="popup__image"
            src="${config.image}"
            alt="${config.title}"
            width="120"
            height="120"
            loading="lazy"
          />
        </div>
  
        <div class="popup__card-header">
          <h2 class="popup__title" id="popup-title-inventory">
            ${config.title}
          </h2>
        </div>
  
        ${!isMaxLevel ? `
        <div class="popup__card-price">
          <div class="popup__price-inner">
            <span class="popup__price-label">Цена улучшения:</span>
            <div class="popup__price">
                <div class="popup__price-icon">
                  <img
                    src="/images/paw.png"
                    alt=""
                    width=""
                    height=""
                    loading="lazy"
                  />
                </div>
                <span class="popup__price-value">${nextPrice}</span>
              </div>
          </div>
          <div class="popup__level-inner">
            <span class="popup__price-label">Уровень: </span>
            <div class="popup__price-level-budge popup__price">
              ${currentLevel}/${config.maxLevel}
            </div>
          </div>
        </div>
        ` : `
        <div class="popup__max-level popup__card-price">
          <span class="popup__max-level-text">Достигнут максимальный уровень</span>
        </div>
        `}
  
        <div class="popup__card-body">
          <div class="popup__description">
            ${config.description}
          </div>
          <div class="popup__current-effect">
            Текущий эффект: <strong>${this.gameCardsMain.formatEffectValue(config.effectMultiplier * currentLevel)}</strong>
          </div>
          ${!isMaxLevel ? `
          <div class="popup__next-effect">
            После улучшения: <strong>${this.gameCardsMain.formatEffectValue(config.effectMultiplier * (currentLevel + 1))}</strong>
          </div>
          ` : ''}
        </div>
  
        <div class="popup__footer popup__footer--card">
          ${!isMaxLevel ? `
          <button
            type="button"
            class="popup__button popup__button--secondary"
            data-js-popup-close
          >
            Отмена
          </button>
          <button
            type="button"
            class="popup__button popup__button--primary"
            data-js-popup-confirm="upgrade"
          >
            Улучшить
          </button>
          ` : `
          <button
            type="button"
            class="popup__button popup__button--primary"
            data-js-popup-close
          >
            Закрыть
          </button>
          `}
        </div>
      </div>
    `,

    victory: () => `
      <div class="popup__content">
        <button
          type="button"
          class="popup__close"
          aria-label="Закрыть диалоговое окно"
          data-js-popup-close
        ></button>
    
        <div class="popup__header">
          <h2 class="popup__title" id="popup-title-victory">
            Поздравляем!
          </h2>
        </div>
    
        <div class="popup__body">
          <p class="popup__description popup__description--centered-text">
            Вы достигли цели в 1.000.000 очков!<br><br>
            Вы можете продолжить накапливать очки или начать новую игру.
          </p>
        </div>
    
        <div class="popup__footer">
          <button
            type="button"
            class="popup__button popup__button--secondary"
            data-js-popup-close
          >
            Продолжить игру
          </button>
          <button
            type="button"
            class="popup__button popup__button--primary"
            data-js-popup-confirm="reset"
          >
            Начать заново
          </button>
        </div>
      </div>
    `,
  }

  constructor(gameCardsMainInstance, gameShopInstance, gameMainInstance) {
    this.gameCardsMain = gameCardsMainInstance
    this.gameShop = gameShopInstance
    this.gameMain = gameMainInstance
    this.activePopup = null
    this.currentCardId = null
    this.currentPlace = null
    this.confettiInterval = null

    this.shopListElement = document.querySelector(this.selectors.shopList)
    this.inventoryListElement = document.querySelector(this.selectors.inventoryList)

    this.bindEvents()
  }

  createPopup(cardId, place) {
    const config = this.gameCardsMain.getCardConfig(cardId)

    if (!config && place !== 'reset' && place !== 'firstLoad' && place !== 'victory') {
      console.error(`Card config not found for ${cardId}`)
      return null
    }

    const popup = document.createElement('dialog')
    popup.className = `popup popup--${['reset', 'firstLoad', 'victory'].includes(place) ? place : 'card'}`
    popup.dataset.jsPopup = place
    popup.dataset.jsCardId = cardId || ''

    let template

    if (place === 'inventory') {
      const currentLevel = this.gameCardsMain.getCardLevel(cardId)
      const nextPrice = this.gameCardsMain.calculateNextLevelPrice(cardId)
      const isMaxLevel = this.gameCardsMain.isMaxLevel(cardId)
      template = this.popupTemplates[place](config, currentLevel, nextPrice, isMaxLevel)
    } else {
      template = this.popupTemplates[place]
      template = template ? template(config)
        : ''
    }

    popup.innerHTML = template

    return popup
  }

  startConfetti() {
    if (typeof confetti === 'undefined') {
      console.log('canvas-confetti library not loaded')
      return
    }

    const { startVelocity, spread, ticks, zIndex } = this.confettiConfig
    const defaults = { startVelocity, spread, ticks, zIndex }

    const randomInRange = (min, max) => Math.random() * (max - min) + min

    const fireConfetti = () => {
      const particleCount = 50

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    }

    fireConfetti()
    this.confettiInterval = setInterval(fireConfetti, 250)
  }

  stopConfetti() {
    if (this.confettiInterval) {
      clearInterval(this.confettiInterval)
      this.confettiInterval = null
    }
  }

  openPopup(cardId, place) {
    this.closeActivePopup()

    const popup = this.createPopup(cardId, place)
    if (!popup) return

    document.body.appendChild(popup)

    this.activePopup = popup
    this.currentCardId = cardId
    this.currentPlace = place

    this.bindPopupEvents(popup, place)

    popup.showModal()

    if (place === 'victory') {
      this.startConfetti()
    }
  }

  closeActivePopup() {
    if (this.activePopup) {
      if (this.currentPlace === 'victory') {
        this.stopConfetti()
      }

      this.activePopup.close()
      this.activePopup.remove()
      this.activePopup = null
      this.currentCardId = null
      this.currentPlace = null
    }
  }

  handleConfirm(action) {
    if (action === 'buy' && this.currentCardId) {
      this.gameShop.buyCard(this.currentCardId)
    }

    if (action === 'upgrade' && this.currentCardId) {
      this.gameShop.upgradeCard(this.currentCardId)
    }

    if (action === 'reset') {
      this.gameMain.resetGame()
    }

    this.closeActivePopup()
  }

  bindPopupEvents(popup, place) {
    const closeButtons = popup.querySelectorAll(this.selectors.popupClose)
    closeButtons.forEach(btn => {
      btn.addEventListener('click', () => this.closeActivePopup())
    })

    const confirmButtons = popup.querySelectorAll(this.selectors.popupConfirm)
    confirmButtons.forEach(btn => {
      const action = btn.dataset.jsPopupConfirm
      btn.addEventListener('click', () => this.handleConfirm(action))
    })

    const isVictoryPopup = place === 'victory'

    if (!isVictoryPopup) {
      popup.addEventListener('click', (evt) => {
        const rect = popup.getBoundingClientRect()
        const isClickOutside = (
          evt.clientX < rect.left ||
          evt.clientX > rect.right ||
          evt.clientY < rect.top ||
          evt.clientY > rect.bottom
        )

        if (isClickOutside) {
          this.closeActivePopup()
        }
      })
    }
  }

  onCardDescriptionClick = (evt) => {
    const button = evt.target.closest(this.selectors.cardButtonDescription)
    if (!button) return

    const cardElement = button.closest('[data-js-card-id]')
    if (!cardElement) return

    const cardId = cardElement.dataset.jsCardId

    const isInShop = this.shopListElement?.contains(cardElement)
    const place = isInShop ? 'shop' : 'inventory'

    this.openPopup(cardId, place)
  }

  onResetButtonClick = () => {
    this.openPopup(null, 'reset')
  }

  showFirstLoadPopup() {
    this.openPopup(null, 'firstLoad')
  }

  showVictoryPopup() {
    this.openPopup(null, 'victory')
  }

  bindEvents() {
    this.shopListElement?.addEventListener('click', this.onCardDescriptionClick)

    this.inventoryListElement?.addEventListener('click', this.onCardDescriptionClick)

    const resetButton = document.querySelector(this.selectors.resetButton)
    resetButton?.addEventListener('click', this.onResetButtonClick)
  }
}

export default ModalsMain