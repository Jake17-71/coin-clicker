class GameClickHandler {
  selectors = {
    buttonSelector: '[data-js-click-object]',
    buttonResetSelector: '[data-js-reset-button]',
    resetPopupSelector: '[data-js-popup="reset"]',
    confirmResetSelector: '[data-js-popup-confirm="reset"]',
    popupCloseButtonSelector: '[data-js-popup-close]',
    cardDescriptionButtonSelector: '[data-js-card-button-description]',
  }

  particlesConfig = {
    baseParticleSpeed: 1.2,
    speedBoostMultiplier: 15,
    speedBoostDuration: 3000,
  }

  constructor(scoreLogic, gameMain) {
    this.buttonElement = document.querySelector(this.selectors.buttonSelector)
    this.resetButtonElement = document.querySelector(this.selectors.buttonResetSelector)
    this.resetPopupElement = document.querySelector(this.selectors.resetPopupSelector)
    this.confirmResetElement = document.querySelector(this.selectors.confirmResetSelector)
    this.popupCloseButtonElements = document.querySelectorAll(this.selectors.popupCloseButtonSelector)
    this.cardDescriptionButtonElement = document.querySelector(this.selectors.cardDescriptionButtonSelector)

    this.scoreLogic = scoreLogic
    this.gameMain = gameMain

    this.baseParticleSpeed = this.particlesConfig.baseParticleSpeed
    this.speedBoostMultiplier = this.particlesConfig.speedBoostMultiplier
    this.speedBoostDuration = this.particlesConfig.speedBoostDuration

    this.bindEvents()
  }

  boostParticleSpeed() {
    if (!window.pJSDom?.[0]) return

    const pJS = window.pJSDom[0].pJS
    const targetSpeed = this.baseParticleSpeed * this.speedBoostMultiplier
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / this.speedBoostDuration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentSpeed = targetSpeed - (targetSpeed - this.baseParticleSpeed) * easeOut

      pJS.particles.move.speed = currentSpeed

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        pJS.particles.move.speed = this.baseParticleSpeed
      }
    }

    animate()
  }

  onButtonClick = () => {
    this.scoreLogic.addScore()
    this.boostParticleSpeed()
  }

  onResetButtonClick = () => {
    this.resetPopupElement?.showModal()
  }

  onConfirmReset = () => {
    this.gameMain.resetGame()
    this.resetPopupElement?.close()
  }

  onClosePopupButtonClick = () => {
    this.resetPopupElement?.close()
  }

  onDescriptionButtonClick = () => {
    console.log("BLABLABLA")
  }

  bindEvents() {
    this.buttonElement?.addEventListener('click', this.onButtonClick)
    this.cardDescriptionButtonElement?.addEventListener('click', this.onDescriptionButtonClick)
    this.popupCloseButtonElements?.forEach((element) => {
      element.addEventListener('click', this.onClosePopupButtonClick)
    })
    this.resetButtonElement?.addEventListener('click', this.onResetButtonClick)
    this.confirmResetElement?.addEventListener('click', this.onConfirmReset)
  }
}

export default GameClickHandler