import Phaser from 'phaser'
import Controller from '../Controller';
import ShaderManager from '../shaders/ShaderManager';
export default class extends  Phaser.Physics.Matter.Sprite  {
  constructor(scene, x, y) {
    super(scene.matter.world, x, y, 'gamesprites', 'House4sprites-6.png');
    this.game = scene.game;
    this.scene = scene;
    this.setSensor(true);
    scene.add.existing(this);
    this.setStatic(true);
  }

  onCollision(hitBy) {
    if (hitBy.gameObject.isPlayer) {
      hitBy.gameObject.hasGold = true;
      Controller.setGold();
      setTimeout(()=>{
        this.destroy();
      }, 1000);
    }
  }
}
