import Phaser from 'phaser'

import BootScene from './scenes/Boot'
import SplashScene from './scenes/Splash'
import StreetScene from './scenes/Street'

import config from './config'
import HouseOne from './scenes/HouseOne'
import HouseTwo from './scenes/HouseTwo'
import HouseThree from './scenes/HouseThree'
import HouseFour from './scenes/HouseFour'

const gameConfig = Object.assign(config, {
  scene: [BootScene, SplashScene, StreetScene, HouseOne, HouseTwo, HouseThree, HouseFour]
})

class Game extends Phaser.Game {
  constructor () {
    super(gameConfig)
  }
}

window.game = new Game();
