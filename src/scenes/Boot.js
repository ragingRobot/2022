import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' })

  }

  preload() {
    this.ready = false;

    this.load.tilemapTiledJSON('level', 'assets/levels/level.json');
    this.load.image('gameTiles', 'assets/images/tiles.png');
    this.load.spritesheet('player', 'assets/images/guy.png', { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet('monster', 'assets/images/monster.png', { frameWidth: 285, frameHeight: 285 });
    this.load.spritesheet('cloud', 'assets/images/cloud.png', { frameWidth: 350, frameHeight: 250 });
    this.load.spritesheet('face', 'assets/images/face.png', { frameWidth: 350, frameHeight: 250 });
    this.load.spritesheet('rain', 'assets/images/rain.png', { frameWidth: 30, frameHeight: 54 });
    this.load.image('background', 'assets/images/background.png');
    this.load.image('background2', 'assets/images/background2.png');
    this.load.image('painting', 'assets/images/painting.png');
    this.load.image('fireball', 'assets/images/fireball.png');
    this.load.image('blueDot', 'assets/images/blueDot.png');
    this.load.image("bullet", "assets/images/star.png");
    this.load.audio('background', 'assets/sounds/bg.mp3');
    this.load.audio('boom', 'assets/sounds/boom.wav');
    this.load.audio('powerUp', 'assets/sounds/powerUp.wav');
    this.load.audio('powerDown', 'assets/sounds/powerDown.wav');
    this.fontsLoaded();
  }

  update() {
    if (this.ready) {

      this.scene.start('SplashScene')
    }
  }

  fontsLoaded() {
    this.ready = true
  }
}
