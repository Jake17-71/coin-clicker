const rootSelector = '[data-js-tabs-inner]'
const burgerButtonSelector = `[data-js-burger-button]`
const tabsCloseButtonSelector = `[data-js-tabs-close-button]`
const overlaySelector = '[data-js-tabs-overlay]'

class BurgerButton {
  selectors = {
    root: rootSelector,
    burgerButton: burgerButtonSelector,
    tabsCloseButton: tabsCloseButtonSelector,
    overlay: overlaySelector,
  }

  stateClasses = {
    isActive: 'is-active',
  }


  constructor(rootElement) {
    this.rootElement = rootElement
    this.burgerButtonElement = document.querySelector(this.selectors.burgerButton)
    this.overlayElement = document.querySelector(this.selectors.overlay)
    this.tabsCloseButtonElement = document.querySelector(this.selectors.tabsCloseButton)
    this.bindEvent()
  }

  toggle = () => {
    this.burgerButtonElement.classList.toggle(this.stateClasses.isActive)
    this.rootElement.classList.toggle(this.stateClasses.isActive)
    this.overlayElement.classList.toggle(this.stateClasses.isActive)
  }

  onBurgerButtonClick = () => {
    this.toggle()
  }

  onCloseButtonClick = () => {
    this.toggle()
  }

  onOverlayClick = () => {
    this.toggle()
  }

  bindEvent() {
    this.burgerButtonElement.addEventListener('click', this.onBurgerButtonClick)
    this.tabsCloseButtonElement.addEventListener('click', this.onCloseButtonClick)
    this.overlayElement.addEventListener('click', this.onOverlayClick)
  }
}

class BurgerButtonCollection {
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new BurgerButton(element)
    })
  }
}

export default BurgerButtonCollection