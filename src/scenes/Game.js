/* globals __DEV__ */
import Phaser from 'phaser'

import Monster from '../sprites/Monster'
import Player from '../sprites/Player'
import Painting from '../sprites/Painting'
import ShaderManager from '../shaders/ShaderManager';
import SoundControl from '../SoundControl';
import Cloud from '../sprites/Cloud';


export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' })
    this.playerIsAlive = true;
    this.isShaking = false;
  }

  create() {
    if (!this.music) {
      this.music = this.sound.add("background");
      this.music.loop = true;
      SoundControl.setScene(this);
    }


    this.bullets = this.physics.add.group({
      defaultKey: 'bullet',
      maxSize: 10
    });

    this.fireballs = this.physics.add.group({
      defaultKey: 'fireball',
      maxSize: 10
    });

    this.music.play();

    this.background = this.add.tileSprite(0, 0, this.scale.canvas.clientWidth * 4, this.scale.canvas.clientHeight * 4, 'background');
    this.background.setTileScale(.75, .75);
    this.background.setOrigin(0, 0);
    this.background.setScrollFactor(.1);


    this.background2 = this.add.tileSprite(0, 0, this.scale.canvas.clientWidth * 4, this.scale.canvas.clientHeight * 4, 'background2');
    this.background2.setTileScale(.75, .75);
    this.background2.setOrigin(0, 0);
    this.background2.setScrollFactor(.12);

    this.paintings = this.add.group();
    this.clouds = this.add.group();
  
    // create the player sprite    
    this.player = new Player(this);

    // create the monster sprite    
    this.monster = new Monster(this);

    this.clouds.add(new Cloud(this));
    this.clouds.add(new Cloud(this, 1000, 900));


    this.setupLevel();


    this.physics.add.collider(this.player, this.clouds);

    this.physics.add.collider(this.groundLayer, this.player);
    this.physics.add.collider(this.groundLayer, this.monster);
    this.physics.add.collider(this.groundLayer, this.paintings);
    this.physics.add.collider(this.player, this.monster);

    this.physics.add.collider(this.bullets, this.monster);
    this.physics.add.collider(this.fireballs, this.player);

    this.cursors = this.input.keyboard.createCursorKeys();


    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    // make the camera follow the player
    this.cameras.main.startFollow(this.player, 0, 0.2);

    this.physics.add.overlap(this.player, this.lavaLayer);


    ShaderManager.reset();
    ShaderManager.setup(this.cameras.main, this.game, this.player, this);
    ShaderManager.colorSpotLight(this.background);
    ShaderManager.colorSpotLight(this.background2);
    ShaderManager.colorSpotLight(this.monster);
    this.clouds.children.each((cloud) =>{
      ShaderManager.colorSpotLight(cloud);
    });

    ShaderManager.colorSpotLight(this.groundLayer);

    for(let i= 1; i <= 5; i++){
      this.addPainting(this.paintings, i * 500, 1075);
    }

  }

  mute(shouldMute = true){
    this.music.mute = shouldMute;
    this.sound.mute = shouldMute;
  }

  addPainting(group, x, y){
    const painting = new Painting(this, x, y);
    ShaderManager.distort(painting);
    group.add(painting);
  }

  setupLevel() {
    this.map = this.add.tilemap('level');
    const tileset = this.map.addTilesetImage('tiles', 'gameTiles');
    this.groundLayer = this.map.createStaticLayer('Tile Layer 1', tileset);


    // the player will collide with this layer
    this.groundLayer.setCollisionByExclusion([-1]);

    this.physics.add.overlap(this.paintings, this.player, (sprite) => {
      this.player.updateLife(1, sprite);
      sprite.die(this.player);
    });


    this.physics.add.overlap(this.clouds, this.player, (sprite) => {
      sprite.setSad(true);
    });


    this.physics.add.overlap(this.player, this.monster, (sprite) => {
      if (this.player.updateLife() <= 0) {
        this.music.stop();
      }
    });

    this.physics.add.overlap(this.bullets, this.monster, (sprite) => {
      if (this.monster.updateLife() <= 0) {
        
      }
    });


    this.physics.add.overlap(this.fireballs, this.player, (player, sprite) => {
      sprite.setActive(false);
      sprite.setVisible(false);
      sprite.destroy();
      this.player.updateLife();
    });

    // set the boundaries of our game world
    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;
  }


  shake() {
    this.cameras.main.shake(400, 0.02, false, (camera, progressAmount) => {
      this.isShaking = progressAmount < 1;
    });
  }

  update() {
    ShaderManager.update(this.player);
    this.monster.update();
    this.player.update();
  }
}
