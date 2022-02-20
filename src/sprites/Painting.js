import Phaser from 'phaser'
import ShaderManager from '../shaders/ShaderManager';
export default class extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'painting');
    this.game = scene.game;
    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.setBounce(0);
    this.setCollideWorldBounds(true);
    this.setImmovable(true);
    this.body.setAllowGravity(false);
    this.dead = false;
  }

  die(player) {
    this.destroy();
  }

  update() {
    if(this.emitter && this.player){
      this.emitter.x = this.player.x;
      this.emitter.y = this.player.y;
    }
  }
}
