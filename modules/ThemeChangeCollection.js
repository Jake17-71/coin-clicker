const rootSelector = '[data-js-theme-change]'
const bodyElement = document.body

class ThemeChange {
  selectors = {
    root: rootSelector,
    button: `[data-js-theme-button]`,
    toggle: `[data-js-theme-button-toggle]`,
  }

  stateClasses = {
    isActive: 'is-active',
    light: 'light',
  }

  constructor(rootElement) {
    this.rootElement = rootElement
    this.buttonElement = this.rootElement.querySelector(this.selectors.button)
    this.toggleElement = this.rootElement.querySelector(this.selectors.toggle)
    this.loadTheme()
    this.bindEvent()
  }

  onButtonClick() {
    bodyElement.classList.toggle(this.stateClasses.light)
    this.toggleElement.classList.toggle(this.stateClasses.isActive)

    const isLight = bodyElement.classList.contains(this.stateClasses.light)
    localStorage.setItem('theme', isLight ? 'light' : 'dark')
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('theme')

    if (savedTheme === this.stateClasses.light) {
      bodyElement.classList.add(this.stateClasses.light)
      this.toggleElement.classList.add(this.stateClasses.isActive)
    }
  }

  bindEvent() {
    this.buttonElement.addEventListener('click', () => this.onButtonClick())
  }

}

class ThemeChangeCollection {
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new ThemeChange(element)
    })
  }
}

export default ThemeChangeCollection
