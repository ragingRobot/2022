import Phaser from 'phaser'

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' })

  }

  preload() {
    this.ready = false;
    this.load.spritesheet('player', 'assets/images/Player.png', { frameWidth: 140, frameHeight: 140 });
    this.load.spritesheet('ghost', 'assets/images/Ghost.png', { frameWidth: 140, frameHeight: 140 });
    this.load.image('background', 'assets/images/background.png');
    this.load.image('fireball', 'assets/images/fireball.png');
    this.ready = true
  }

  update() {
    if (this.ready) {
      this.scene.start('SplashScene')
    }
  }
}
