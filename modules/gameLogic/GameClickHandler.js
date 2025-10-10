class GameClickHandler {
  selectors = {
    buttonSelector: '[data-js-click-object]',
  }

  particlesConfig = {
    baseParticleSpeed: 1.2,
    speedBoostMultiplier: 15,
    speedBoostDuration: 3000,
  }

  constructor(scoreLogic, gameMain) {
    this.buttonElement = document.querySelector(this.selectors.buttonSelector)
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

  bindEvents() {
    this.buttonElement?.addEventListener('click', this.onButtonClick)
  }
}

export default GameClickHandler