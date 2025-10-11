class GameCardsMain {
  cardsConfig = {
    'card-1': {
      id: 'card-1',
      image: '/images/1.png',
      title: 'Сила Клика',
      price: 10,
      description: 'Увеличивает силу клика в 2 раза',
    },
    'card-2': {
      id: 'card-2',
      image: '/images/2.png',
      title: 'Пассивный Доход',
      price: 100,
      description: 'Добавляет пассивный доход +100 каждые 5 секунд',
    },
    'card-3': {
      id: 'card-3',
      image: '/images/3.png',
      title: 'Шанс Критического Клика',
      price: 100,
      description: 'Увеличивает шанс критического клика на 10%',
    }
  }

  selectors = {
    listItemSelector: '[data-js-list-item]',
    emptyMessageSelector: '[data-js-empty-message]',
  }

  constructor(scoreLogic, gameMain) {
    this.scoreLogic = scoreLogic
    this.gameMain = gameMain
    this.listItemElement = this.selectors.listItemSelector
    this.emptyMessageElement = this.selectors.emptyMessageSelector
    this.activeCards = new Map()
  }

  getCardConfig(cardId) {
    return this.cardsConfig[cardId]
  }

  createCardElement(cardId) {
    const config = this.getCardConfig(cardId)

    if (!config) {
      console.log(`Card with ${cardId} not found`)
      return null
    }

    const li = document.createElement('li')
    li.className = 'list__item'
    li.dataset.jsListItem = ''
    li.dataset.jsCardId = cardId

    li.innerHTML = `
      <div 
        class="card" 
        data-js-card
      >
        <div class="card__image-inner">
          <img
            class="card__image"
            src="${config.image}"
            alt="${config.title}"
            width="96"
            height="96"
            loading="lazy"
            data-js-card-image
          />
        </div>
        <h4 
          class="card__title" 
          data-js-card-title
        >
          ${config.title}
        </h4>
        <div class="card__description">
          <div class="card__price">
            <div class="card__price-image">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <span 
              class="card__price-digit" 
              data-js-card-price-digit
            >
              ${config.price}
            </span>
          </div>
          <button
            type="button"
            class="button button-popup-link card__button"
            data-js-card-button-description
          >
            Описание
          </button>
        </div>
      </div>
    `

    return li
  }

  createEmptyMessage(message) {
    const emptyDiv = document.createElement('div')
    emptyDiv.className = 'list__empty-message'
    emptyDiv.dataset.jsEmptyMessage = ''
    emptyDiv.textContent = message
    return emptyDiv
  }

  removeCard(cardId, containerElement) {
    if (!containerElement) {
      console.log('Container not found')
      return
    }

    const cardElement = containerElement.querySelector(`[data-js-card-id="${cardId}"]`)

    if (cardElement) {
      containerElement.removeChild(cardElement)
      this.activeCards.delete(cardId)
    }
  }

  addCard(cardId, containerElement) {
    if (!containerElement) {
      console.log('Container not found')
      return
    }

    if (this.activeCards.has(cardId)) {
      console.log(`Card with ${cardId} already exists`)
      return
    }

    const cardElement = this.createCardElement(cardId)
    if (cardElement) {
      containerElement.appendChild(cardElement)
      this.activeCards.set(cardId, cardElement)
    }
  }

  toggleEmptyMessage(containerElement) {
    if (!containerElement) return

    const cardItems = containerElement.querySelectorAll(this.listItemElement)
    const emptyMessage = containerElement.querySelector(this.emptyMessageElement)

    if (!emptyMessage) {
      console.log('Empty message element not found in container')
      return
    }

    const hasCards = cardItems.length > 0
    if (hasCards === true) {
      emptyMessage.style.display = 'none'
    } else {
      emptyMessage.style.display = 'block'
    }
  }
}

export default GameCardsMain