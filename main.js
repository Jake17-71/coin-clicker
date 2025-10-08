import ThemeChangeCollection from './modules/ThemeChangeCollection.js'
import ParticleCollection from './modules/ParticalCollection.js'
import TabsCollection from './modules/TabsCollection.js'
import BurgerButtonCollection from './modules/BurgerButtonCollection.js'
import GameMain from './modules/GameMain.js'


new ThemeChangeCollection()
new ParticleCollection()
new TabsCollection()
new BurgerButtonCollection()
new GameMain()

const btn = document.querySelector(`[data-js-card-button-description]`)
const dialog = document.querySelector(`[data-js-popup='shop']`)