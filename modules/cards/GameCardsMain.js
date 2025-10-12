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
              <img
          src="/images/paw.png"
          alt=""
          width=""
          height=""
          loading="lazy"
        />
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