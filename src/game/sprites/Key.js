import Phaser from 'phaser'
import Controller from '../Controller';
import ShaderManager from '../shaders/ShaderManager';
export default class extends  Phaser.Physics.Matter.Sprite  {
  constructor(scene, x, y) {
    super(scene.matter.world, x, y, 'gamesprites', 'House4sprites-8.png');
    this.game = scene.game;
    this.scene = scene;
    this.scene.add.existing(this);
    this.setBounce(0);
  }

  onCollision(hitBy) {
    if (hitBy.gameObject.isPlayer) {
      hitBy.gameObject.hasKey = true;
      Controller.hasKey = true;
      this.destroy();
    }
  }
}
