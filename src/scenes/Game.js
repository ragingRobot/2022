/* globals __DEV__ */
import Phaser from 'phaser'

import Ghost from '../sprites/Ghost';
import Player from '../sprites/Player';
import Background from '../sprites/Background';
import SoundControl from '../SoundControl';
import House from '../sprites/House';


export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' })
    this.playerIsAlive = true;
    this.isShaking = false;
  }

  create() {
    this.addItems();


    this.cursors = this.input.keyboard.createCursorKeys();
    this.matter.world.on("collisionstart", (event, bodyA, bodyB) => {
      if ((bodyA.gameObject == this.player && bodyB.gameObject == this.background) || (bodyB.gameObject == this.player && bodyA.gameObject == this.background)) {
       this.player.touchingGround = true;
      }
    });

    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, 2400, 600);
    this.cameras.main.setZoom(.5);
    // make the camera follow the player
    this.cameras.main.startFollow(this.player, 0, 0.2);
  }

  addItems() {
    this.matter.world.setBounds(0, 0, 2400, 1000);
    this.cameras.main.setBackgroundColor('#ffffff');

    new House(this, 500, 780, 1);
    new House(this, 900, 810, 2);
    new House(this, 1120, 795, 3);
    new House(this, 1960, 345, 4);


    this.background = new Background(this, 1532, 800);
    // create the player sprite    
    this.player = new Player(this);
    this.ghost = new Ghost(this);


    this.add.sprite(1500, 780, 'gate');
  }

  mute(shouldMute = true){
    this.music.mute = shouldMute;
    this.sound.mute = shouldMute;
  }



  shake() {
    this.cameras.main.shake(400, 0.02, false, (camera, progressAmount) => {
      this.isShaking = progressAmount < 1;
    });
  }

  update() {
    this.player.update();
  }
}
