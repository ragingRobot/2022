import Phaser from 'phaser'

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' })

  }

  preload() {
    this.ready = false;
    this.load.spritesheet('player', 'assets/images/Player.png', { frameWidth: 140, frameHeight: 140 });
    this.load.spritesheet('ghost', 'assets/images/Ghost.png', { frameWidth: 140, frameHeight: 140 });
    this.load.spritesheet('houseSprites', 'assets/images/houseSprites.png', { frameWidth: 250, frameHeight: 250 });
    this.load.multiatlas('gamesprites', 'assets/images/gamesprites.json', 'assets/images/');
    this.load.image('background', 'assets/images/background.png');
    this.load.image('house1', 'assets/images/house1.png');
    this.load.image('house2', 'assets/images/house2.png');
    this.load.image('house3', 'assets/images/house3.png');
    this.load.image('house4', 'assets/images/house4.png');
    this.load.image('house1inside', 'assets/images/house1inside.png');
    this.load.image('house4inside', 'assets/images/house4inside.png');
    this.load.image('gate', 'assets/images/gate.png');
    this.load.json('shapes', 'assets/images/backgroundPhysicsShape.json');
    this.ready = true;
  }

  update() {
    if (this.ready) {
      switch (window.location.pathname) {
        case '/software':
          this.scene.start('House1Scene');
          break;
        case '/art':
          this.scene.start('House2Scene');
          break;
        case '/contact':
          this.scene.start('House3Scene');
          break;
        case '/resume':
          this.scene.start('House4Scene');
          break;
        default:
          this.scene.start('StreetScene');
          break;
      }
    }
  }
}
