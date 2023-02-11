import Phaser from 'phaser'
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";

export default {
  pixelArt: true,
  transparent: true,
  scale: {
    mode: Phaser.Scale.RESIZE,
    parent: 'content',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 4000,
    height: 800
  },
  physics: {
    default: "matter",
    matter: {
      gravity: { y: 5 },
      //debug: true
    }
  },
  plugins: {
    scene: [
      {
        plugin: PhaserMatterCollisionPlugin, // The plugin class
        key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
        mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision
      }
    ]
  },
  localStorageName: 'phaseres6webpack'
}
