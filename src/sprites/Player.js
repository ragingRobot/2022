import Phaser from 'phaser'
import Controller from '../Controller.js'
import ShaderManager from '../shaders/ShaderManager.js';

const Distance = Phaser.Math.Distance;
const WALK_SPEED = 300;
const MAX_LIFE = 4;
export default class extends Phaser.Physics.Arcade.Sprite {
  constructor(scene) {
    super(scene, 0, 0, 'player');
    this.game = scene.game;
    this.scene = scene;
    this.activeBullet = [];
    this.life = 1;
    this.canShoot = true;
    this.isAlive = true;
    scene.physics.world.enable(this);
    scene.add.existing(this);
    this.setBounce(0);
    this.setCollideWorldBounds(true);

    this.left = scene.input.keyboard.addKey('A');  // Get key object
    this.right = scene.input.keyboard.addKey('D');  // Get key object
    this.up = scene.input.keyboard.addKey('W');  // Get key object


    scene.anims.create({
      key: 'left',
      frames: scene.anims.generateFrameNumbers('player', { start: 1, end: 4 }),
      frameRate: 8,
    });

    scene.anims.create({
      key: 'stop',
      frames: [{ key: 'player', frame: 0 }],
      frameRate: 8
    });

    scene.anims.create({
      key: 'right',
      frames: scene.anims.generateFrameNumbers('player', { start: 1, end: 4 }),
      frameRate: 8,
    });

    scene.anims.create({
      key: 'shoot',
      frames: scene.anims.generateFrameNumbers('player', { start: 8, end: 10 }),
      frameRate: 8
    });

    scene.anims.create({
      key: 'jump',
      frames: scene.anims.generateFrameNumbers('player', { start: 5, end: 7 }),
      frameRate: 8,
      repeat: 0
    });

    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  shoot() {
    if (this.canShoot) {
      this.canShoot = false;
      this.anims.play('shoot', this);
      setTimeout(() => {
        this.canShoot = true;
      }, 400);
    }
  }

  updateLife(amount = -1, updater = null) {
    if (this.life > 0 && !this.invincible) {
      this.invincible = true;

      if (this.life + amount < MAX_LIFE) {
        this.life += amount;
        ShaderManager.updatePulse(MAX_LIFE, updater);
      } else if (this.life + amount >= MAX_LIFE) {
        this.life = MAX_LIFE;
        ShaderManager.updatePulse(MAX_LIFE, updater);
      }

      if (amount > 0) {
        this.scene.sound.play("powerUp");
      } else {
        this.scene.sound.play("powerDown");
      }

      setTimeout(() => {
        this.invincible = false;
      }, 1000);
    }
    if (this.life <= 0) {
      this.die();
    }
    return this.life;
  }

  die() {
    if (this.isAlive) {
      this.visible = false;
      this.isAlive = false;
      //this.sound.play('death');
      setTimeout(() => {
        this.scene.scene.restart();
      }, 2100);
    }
  }


  update() {
    if (!this.body) {
      return;
    }

    if (!this.scene.playerIsAlive || (this.scene.isShaking && this.body.onFloor()) || !this.body) {
      this.body.setVelocityX(0);
      return;
    }


    if (this.left.isDown || this.cursors.left.isDown || Controller.left) // if the left arrow key is down
    {
      this.body.setVelocityX(-WALK_SPEED); // move left
      if (this.body.onFloor() && !this.cursors.space.isDown && !Controller.action1) {
        this.anims.play('left', this);
      }
      this.flipX = true;
    }
    else if (this.right.isDown || this.cursors.right.isDown || Controller.right) // if the right arrow key is down
    {
      this.body.setVelocityX(WALK_SPEED); // move right
      if (this.body.onFloor() && !this.cursors.space.isDown && !Controller.action1) {
        this.anims.play('right', this);
      }
      this.flipX = false;
    } else {
      this.body.setVelocityX(0);
    }

    if (this.cursors.space.isDown || Controller.action1) {
      this.shoot();
    }
    if ((this.up.isDown || this.cursors.up.isDown || Controller.action2) && (this.body.overlapY || this.body.onFloor())) {
      this.anims.play('jump', this);
      this.body.setVelocityY(-600); // jump up
    }

    if (this.body.onFloor() && this.body.velocity.x === 0 && !this.cursors.space.isDown && !Controller.action1 && !this.cursors.up.isDown && !this.up.isDown && !Controller.action2) {
      if (!this.anims.isPlaying) {
        this.anims.play('stop', this);
      }
    }
  }
}
