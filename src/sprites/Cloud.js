import Phaser from 'phaser';
import ShaderManager from '../shaders/ShaderManager';
const Distance = Phaser.Math.Distance;
const WALK_SPEED = 100;
const OFFSET = 100;
export default class extends Phaser.Physics.Arcade.Sprite {
  constructor(game, x = 800, y = 1050) {
    super(game.scene.scene, x, y, 'cloud');
    this.game = game;
    this.scene = game.scene.scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.life = 10;
    this.canShoot = true;
    this.setSize(300, 160);
    this.setBounce(0);
    this.setCollideWorldBounds(true);
    this.setScale(.6, .6);
    this.setImmovable(true);
    this.body.setAllowGravity(false);

    this.face = new Phaser.Physics.Arcade.Sprite(game.scene.scene, this.x, this.y, 'face');
    this.face.setScale(.5, .5);
    this.scene.add.existing(this.face);

    this.body.checkCollision.left = false;
    this.body.checkCollision.right = false;
    this.body.checkCollision.down = false;


    this.scene.anims.create({
      key: 'cloudFaceIdle',
      frames: this.shuffle([{ key: 'face', frame: 0 }, { key: 'face', frame: 1 }, { key: 'face', frame: 0 }, { key: 'face', frame: 0 }, { key: 'face', frame: 0 }, { key: 'face', frame: 0 }, { key: 'face', frame: 0 }]),
      frameRate: 3,
      repeat: -1
    });


    this.scene.anims.create({
      key: 'cloudFaceSad',
      frames: this.shuffle([{ key: 'face', frame: 2 }]),
      frameRate: 3,
      repeat: -1
    });


    this.scene.anims.create({
      key: 'cloudIdle',
      frames: this.shuffle([{ key: 'cloud', frame: 0 }, { key: 'cloud', frame: 1 }, { key: 'cloud', frame: 2 }]),
      frameRate: 6,
      repeat: -1
    });



    var expl = this.scene.add.particles('rain');
    this.rain = expl.createEmitter({
      frame: [0, 1, 2, 3, 4, 5], // random frames
      quantity: 2,
      emitZone: { source: new Phaser.Geom.Line(-80, 0, 70, 0 )},
      lifespan: 1000,
      speedY: { min: 200, max: 400 },
      scale: { start: .5, end: .5 },
      on: false
    });

    this.rain.defaultPipeline = 'ColorSpotLight';


    this.face.play('cloudFaceIdle', this);
    this.anims.play('cloudIdle', this);

    this.depth = 1000;
    this.face.depth = 1001;

  }

  setSad(val = true) {
    if (val) {
      this.face.play('cloudFaceSad', this);
      // set emitter to position and explode
      this.rain.setPosition(this.x, this.y);
      this.rain.explode();

      setTimeout(() => {
        this.setSad(false);
      }, 500);
    } else {
      this.face.play('cloudFaceIdle', this);
    }
  }


  /**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
  shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }


  update() {

  }
}
