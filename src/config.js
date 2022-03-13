import Phaser from 'phaser'

export default {
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.RESIZE,
    parent: 'content',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 4000,
    height: 600
  },
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 1000 },
        debug: false
    }
  },
  localStorageName: 'phaseres6webpack'
}
