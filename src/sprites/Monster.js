import Phaser from 'phaser';
import ShaderManager from '../shaders/ShaderManager';
const Distance = Phaser.Math.Distance;
const WALK_SPEED = 100;
const OFFSET = 100;
export default class extends Phaser.Physics.Arcade.Sprite {
  constructor(game, x = 2000, y = 1000) {
    super(game.scene.scene, x, y, 'monster');
    this.game = game;
    this.scene = game.scene.scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.life = 10;
    this.canShoot = true;
    this.setSize(50, 280);
    this.setBounce(0);
    this.setCollideWorldBounds(true);
    this.setScale(.6, .6);
    this.setImmovable(true);
    setTimeout(this.pound.bind(this), 3000);


    this.scene.anims.create({
      key: 'monsterstand',
      frames: [{ key: 'monster', frame: 0 }],
      frameRate: 8
    });

    this.scene.anims.create({
      key: 'monsterfire',
      frames: [{ key: 'monster', frame: 1 }],
      frameRate: 2
    });


  }

  pound() {
    if (this.body && this.life > 0) {
      if (!this.playerIsLeft(400) && !this.playerIsRight(400)) {
        if (this.body) {
          this.body.setVelocityY(-300);
        }
        setTimeout(() => {
          this.game.shake();
          this.game.sound.play('boom');
          setTimeout(() => {
            this.shoot();
          }, 600);
        }, 600);
      }
      setTimeout(this.pound.bind(this), 3000);
    }
  }

  shoot() {
    if(this.canShoot && this.scene){
      this.canShoot = false;
      setTimeout(()=> {
        this.canShoot = true;
        this.anims.play('monsterstand', this);
      }, 400);
      const dir= this.flipX ? 10 : -10;
       var fireball = this.scene.fireballs.get(this.x + dir, this.y + 15);
       ShaderManager.fire(fireball);
       this.anims.play('monsterfire', this);
      if (fireball) {
        fireball.setActive(true);
        fireball.setVisible(true);
        fireball.flipX = this.flipX;
        fireball.body.setAllowGravity(false);
        const speed = this.flipX ? 500 : -500;
        fireball.body.velocity.x = speed;
        fireball.body.velocity.y = 0;
        fireball.die = () => {
          fireball.setActive(false);
          fireball.setVisible(false);
        }
      }
    }
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
