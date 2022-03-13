import Phaser from 'phaser';
import ShaderManager from '../shaders/ShaderManager';
const Distance = Phaser.Math.Distance;
const WALK_SPEED = 100;
const OFFSET = 100;
export default class extends Phaser.Physics.Arcade.Sprite {
  constructor(game, x = 0, y = 0) {
    super(game.scene.scene, x, y, 'ghost');
    this.game = game;
    this.scene = game.scene.scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.life = 3;
    this.canShoot = true;
    this.setBounce(0);
    this.setCollideWorldBounds(true);
    this.setImmovable(true);


    this.scene.anims.create({
      key: 'ghostIdle',
      frames: this.scene.anims.generateFrameNumbers('ghost', { start: 0, end: 2 }),
      frameRate: 8,
      repeat: -1,
    });

    this.scene.anims.play('ghostIdle', this);

  }

  playerIsLeft(offset = 0) {
    return this.game.player.x < this.x - offset;
  }

  playerIsRight(offset = 0) {
    return this.game.player.x > this.x + offset;
  }

  updateLife(amount = -1) {
    if (this.life > 0) {
      this.life += amount;
    }
    if (this.life <= 0) {
      this.die();
    }
    return this.life;
  }

  die() {
    if (this.life <= 0) {
      this.game.player.updateLife(5);
      this.destroy();
    }
  }

  update() {
    if (this.body && this.life > 0) {
      this.die();
      if (Math.abs(Distance.Between(this.x, this.y, this.game.player.x, this.game.player.y)) < 500) {
        if (this.playerIsLeft(OFFSET)) {
          if(this.body.blocked.left){
            this.body.setVelocityY(-500); // jump up
          }
          this.body.setVelocityX(-WALK_SPEED); // move left
          //this.anims.play('left', true);
          this.flipX = false;
        }
        else if (this.playerIsRight(OFFSET)) {
          if(this.body.blocked.right){
            this.body.setVelocityY(-500); // jump up
          }
          this.body.setVelocityX(WALK_SPEED); // move right
          //this.anims.play('right', true);
          this.flipX = true;
        } else {
          this.game.player.x < this.x ? this.flipX = false : this.flipX = true;
          this.body.setVelocityX(0);
        }
      }
    }
  }
}
