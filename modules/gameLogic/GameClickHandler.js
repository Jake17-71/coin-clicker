class GameClickHandler {

  selectors = {
    buttonSelector: `[data-js-click-object]`,
    buttonResetSelector: `[data-js-reset-button]`
  }

  particlesConfig = {
    baseParticleSpeed: 1.2,
    speedBoostMultiplier: 15,
    speedBoostDuration: 3000,
  }

  constructor(scoreLogic, storageLogic) {
    this.buttonElement = document.querySelector(this.selectors.buttonSelector)
    this.resetButtonElement = document.querySelector(this.selectors.buttonResetSelector)
    this.scoreLogic = scoreLogic
    this.storageLogic = storageLogic

    this.baseParticleSpeed = this.particlesConfig.baseParticleSpeed
    this.speedBoostMultiplier = this.particlesConfig.speedBoostMultiplier
    this.speedBoostDuration = this.particlesConfig.speedBoostDuration

    this.bindEvents()
  }

  boostParticleSpeed() {
    if (!window.pJSDom || !window.pJSDom[0]) {
      return
    }

    const pJS = window.pJSDom[0].pJS
    const targetSpeed = this.baseParticleSpeed * this.speedBoostMultiplier
    const startSpeed = pJS.particles.move.speed
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
    this.storageLogic.clearStorage()

    this.scoreLogic.score = this.scoreLogic.gameConfig.score
    this.scoreLogic.clickPower = this.scoreLogic.gameConfig.clickPower
    this.scoreLogic.passiveScore = this.scoreLogic.gameConfig.passiveScore
    this.scoreLogic.criticalClickChance = this.scoreLogic.gameConfig.criticalClickChance

    this.scoreLogic.updateDisplay()
    location.reload()
  }

  bindEvents() {
    this.buttonElement.addEventListener('click', this.onButtonClick)
    this.resetButtonElement.addEventListener('click', this.onResetButtonClick)
  }
}

export default GameClickHandler