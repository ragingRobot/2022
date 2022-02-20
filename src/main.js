import Phaser from 'phaser'

import BootScene from './scenes/Boot'
import SplashScene from './scenes/Splash'
import GameScene from './scenes/Game'

import config from './config'

const gameConfig = Object.assign(config, {
  scene: [BootScene, SplashScene, GameScene]
})

class Game extends Phaser.Game {
  constructor () {
    super(gameConfig)
  }
}

window.game = new Game();

const fullScreen = document.getElementById("fullScreen");
fullScreen.addEventListener("click", openFullscreen);

  /* When the openFullscreen() function is executed, open the video in fullscreen.
Note that we must include prefixes for different browsers, as they don't support the requestFullscreen method yet */
function openFullscreen () {
  document.documentElement.requestFullscreen();
}
