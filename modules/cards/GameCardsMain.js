class GameCardsMain {
  cardsConfig = {
    'card-1': {
      id: 'card-1',
      image: 'images/1.png',
      title: 'Сила Клика',
      basePrice: 25,              // Базовая цена (уровень 1)
      priceMultiplier: 1.7,       // Множитель цены за уровень
      effectMultiplier: 5,        // Прирост эффекта за уровень
      maxLevel: 10,               // Максимальный уровень
      effectType: 'clickPower',   // Тип эффекта
      description: 'Увеличивает силу клика на +5 за уровень.',
    },
    'card-2': {
      id: 'card-2',
      image: 'images/2.png',
      title: 'Пассивный Доход',
      basePrice: 300,
      priceMultiplier: 1.7,
      effectMultiplier: 150,
      maxLevel: 10,
      effectType: 'passiveIncome',
      description: 'Добавляет +150 пассивного дохода за уровень.',
    },
    'card-3': {
      id: 'card-3',
      image: 'images/3.png',
      title: 'Шанс Крита',
      basePrice: 1000,
      priceMultiplier: 1.7,
      effectMultiplier: 5,
      maxLevel: 10,
      effectType: 'criticalChance',
      description: 'Увеличивает шанс критического клика на +5% за уровень.',
    },
    'card-4': {
      id: 'card-4',
      image: 'images/4.png',
      title: 'Критический Урон',
      basePrice: 700,
      priceMultiplier: 1.8,
      effectMultiplier: 20,
      maxLevel: 10,
      effectType: 'criticalDamage',
      description: 'Увеличивает урон критического удара на 20 за уровень.',
    },
    'card-5': {
      id: 'card-5',
      image: 'images/5.png',
      title: 'Ускорение Дохода',
      basePrice: 1500,
      priceMultiplier: 1.6,
      effectMultiplier: 0.5,
      maxLevel: 10,
      effectType: 'passiveIncomeSpeed',
      description: 'Уменьшает интервал пассивного дохода на 0.5 сек за уровень (макс. 1 сек).',
    },
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

  getCardLevel(cardId) {
    return this.gameMain.purchasedCards.get(cardId) || 0
  }

  calculateNextLevelPrice(cardId) {
    const config = this.getCardConfig(cardId)
    const currentLevel = this.getCardLevel(cardId)

    if (currentLevel === 0) {
      return config.basePrice
    }
    // Формула: basePrice * (priceMultiplier ^ currentLevel)
    return Math.ceil(config.basePrice * Math.pow(config.priceMultiplier, currentLevel))
  }

  isMaxLevel(cardId) {
    const currentLevel = this.getCardLevel(cardId)
    const config = this.getCardConfig(cardId)
    return currentLevel >= config.maxLevel
  }

  formatEffectValue(value, decimals = 1) {
    const fixed = parseFloat(value.toFixed(decimals))

    if (fixed % 1 === 0) {
      return Math.floor(fixed)
    }

    return fixed
  }

  createCardElement(cardId) {
    const config = this.getCardConfig(cardId)
    const currentLevel = this.getCardLevel(cardId)
    const price = this.calculateNextLevelPrice(cardId)

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
                src="images/paw.png"
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
              ${price}
            </span>
          </div>
          <span class="card__level" data-js-card-level>Ур. ${currentLevel}/${config.maxLevel}</span>
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

  updateCardUI(cardId, containerElement) {
    if (!containerElement) return

    const cardElement = containerElement.querySelector(`[data-js-card-id="${cardId}"]`)
    if (!cardElement) return

    const config = this.getCardConfig(cardId)
    const currentLevel = this.getCardLevel(cardId)
    const price = this.calculateNextLevelPrice(cardId)

    const priceElement = cardElement.querySelector('[data-js-card-price-digit]')
    if (priceElement) {
      priceElement.textContent = price
    }

    const levelTextElement = cardElement.querySelector('[data-js-card-level]')
    if (levelTextElement) {
      levelTextElement.textContent = `Ур. ${currentLevel}/${config.maxLevel}`
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