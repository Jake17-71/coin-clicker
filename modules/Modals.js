class ModalsMain {
  selectors = {
    cardButtonDescription: '[data-js-card-button-description]',
    popupClose: '[data-js-popup-close]',
    popupConfirm: '[data-js-popup-confirm]',
    shopList: '[data-js-shop-list]',
    inventoryList: '[data-js-inventory-list]',
    resetButton: '[data-js-reset-button]',
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
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <span class="popup__price-value">${config.price}</span>
          </div>
        </div>
  
        <div class="popup__card-body">
          <p class="popup__description">
            ${config.description}
          </p>
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

    inventory: (config) => `
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
  
        <div class="popup__card-price">
          <span class="popup__price-label">Цена:</span>
          <div class="popup__price">
            <div class="popup__price-icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <span class="popup__price-value">${config.price}</span>
          </div>
        </div>
  
        <div class="popup__card-body">
          <p class="popup__description">
            ${config.description}
          </p>
        </div>
  
        <div class="popup__footer popup__footer--card">
          <button
            type="button"
            class="popup__button popup__button--primary"
            data-js-popup-close
          >
            Закрыть
          </button>
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
            Поздравляю!
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

    const template = this.popupTemplates[place]
    popup.innerHTML = template ? template(config) : ''

    return popup
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
  }

  closeActivePopup() {
    if (this.activePopup) {
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