const rootSelector = '[data-js-particles]'

class Particle {
  selectors = {
    root: rootSelector,
  }

  constructor(rootElement) {
    this.rootElement = rootElement
    this.isInitialized = false
    this.checkAccessibilityPreferences()
    this.bindEvents()
  }

  checkAccessibilityPreferences() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      console.log('Particles disabled due to user motion preferences')
      return
    }

    this.initParticles()
  }

  initParticles() {
    if (typeof particlesJS === 'undefined') {
      console.warn('particles.js library not loaded')
      return
    }

    try {
      particlesJS.load('particles-js', '/paw-clicker/particles.json', () => {
        console.log('Particles.js config loaded successfully')
        this.isInitialized = true
        this.addAccessibilityAttributes()
      })
    } catch (error) {
      console.error('Failed to initialize particles:', error)
    }
  }

  addAccessibilityAttributes() {
    const canvas = this.rootElement.querySelector('canvas')
    if (canvas) {
      canvas.setAttribute('aria-hidden', 'true')
      canvas.setAttribute('role', 'presentation')
      canvas.style.pointerEvents = 'none'
      canvas.tabIndex = -1
    }
  }

  reduceMediaPreferences(event) {
    if (event.matches && this.isInitialized) {
      this.destroyParticles()
    } else if (!event.matches && !this.isInitialized) {
      this.initParticles()
    }
  }

  resizeWindowChangeParticles() {
    if (this.isInitialized) {
      clearTimeout(this.resizeTimeout)
      this.resizeTimeout = setTimeout(() => {
        if (window.pJSDom && window.pJSDom[0]) {
          window.pJSDom[0].pJS.fn.particlesRefresh()
        }
      }, 250)
    }
  }

  destroyParticles() {
    if (this.isInitialized && window.pJSDom && window.pJSDom[0]) {
      window.pJSDom[0].pJS.fn.vendors.destroypJS()
      this.isInitialized = false
      console.log('Particles destroyed')
    }
  }

  bindEvents() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    mediaQuery.addEventListener('change', (event) => this.reduceMediaPreferences(event))

    window.addEventListener('resize', () => this.resizeWindowChangeParticles())
  }
}

class ParticleCollection {
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new Particle(element)
    })
  }
}

export default ParticleCollection