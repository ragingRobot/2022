import Phaser from 'phaser'

export default {
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.RESIZE,
    parent: 'content',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 4000,
    height: 1000
  },
  physics: {
    default: "matter",
    matter: {
      gravity: { y: 5 },
      //debug: true
    }
  },
  localStorageName: 'phaseres6webpack'
}
