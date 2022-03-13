/* globals __DEV__ */
import Phaser from 'phaser'

import Ghost from '../sprites/Ghost';
import Player from '../sprites/Player';
import Background from '../sprites/Background';
import SoundControl from '../SoundControl';


export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' })
    this.playerIsAlive = true;
    this.isShaking = false;
  }

  create() {
    this.physics.world.setBounds(0,0,2400,600);
    this.cameras.main.setBackgroundColor('#ffffff');
    this.background = new Background(this, 1132, 350);
    // create the player sprite    
    this.player = new Player(this);
    this.ghost = new Ghost(this);
    this.cursors = this.input.keyboard.createCursorKeys();

    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, 2400, 600);
    this.cameras.main.setZoom(.5);
    // make the camera follow the player
    this.cameras.main.startFollow(this.player, 0, 0.2);
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
