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
    this.load.image('house1', 'assets/images/house1.png');
    this.load.image('house2', 'assets/images/house2.png');
    this.load.image('house3', 'assets/images/house3.png');
    this.load.image('house4', 'assets/images/house4.png');
    this.load.image('gate', 'assets/images/gate.png');
    this.load.json('shapes', 'assets/images/backgroundPhysicsShape.json');
    this.ready = true
  }

  update() {
    if (this.ready) {
      this.scene.start('SplashScene')
    }
  }
}
