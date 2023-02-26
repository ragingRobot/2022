/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player';
import { gsap } from "gsap";

export default class extends Phaser.Scene {
  constructor(key) {
    super({ key: key })
    this.playerIsAlive = true;
    this.isShaking = false;
    this.houses = [];
    this.objects = [];
    this.pathname = '';
  }

  checkUrl(pathname) {
    if (pathname !== this.path) {
      this.player.target = this.house;
      if ("ontouchstart" in document.documentElement) {
        switch (pathname) {
          case '/software':
            this.scene.start('House1Scene');
            break;
          case '/art':
            this.scene.start('House2Scene');
            break;
          case '/contact':
            this.scene.start('House3Scene');
            break;
          case '/resume':
            this.scene.start('House4Scene');
            break;
          default:
            this.scene.start('StreetScene');
            break;
        }
        return;
      }
    }
  }

  init(data) {
    this.startPosition = data.startPosition;
    this.lastHouseNumber = data.houseNumber;
  }

  create() {
    window.game = this.game;
    this.matter.world.setBounds(0, 0, 2400, 1000);
    this.cameras.main.setBackgroundColor('#ffffff');
    this.addBackground();
    this.player = new Player(this);

    if (this.startPosition) {
      this.player.x = this.startPosition.x;
      this.player.y = this.startPosition.y;
      this.player.alpha = 0;
      this.background.alpha = 0;
      gsap.timeline().to([this.player, this.background], {
        duration: .5,
        alpha: 1,
        ease: "power2.inOut",
      });
    }
    this.addItems();


    window.changeHandler = (location) => {
      this.checkUrl(location.pathname);
    };
    this.checkUrl(window.pathname);


    this.fadeIn();
    this.cursors = this.input.keyboard.createCursorKeys();

    this.matterCollision.addOnCollideStart({
      objectA: this.player,
      objectB: this.background,
      callback: function (eventData) {
        const { bodyA, bodyB, gameObjectA, gameOaabjectB, pair } = eventData;
        this.player.touchingGround = true;

        if (bodyA.gameObject?.PlayerAction) {
          this.player.currentAction = bodyA.gameObject.PlayerAction;
        }


      },
      context: this // Optional context to apply to the callback function.
    });

    this.matter.world.on("collisionstart", (event, bodyA, bodyB) => {
      if (bodyA.gameObject?.onCollision) {
        bodyA.gameObject.onCollision(bodyB);
      }

      if (bodyB.gameObject?.onCollision) {
        bodyB.gameObject.onCollision(bodyA);
      }

      if (bodyA.gameObject?.PlayerAction && bodyB.gameObject == this.player) {
        this.player.currentAction = bodyA.gameObject.PlayerAction;
      } else if (bodyB.gameObject?.PlayerAction && bodyA.gameObject == this.player) {
        this.player.currentAction = bodyB.gameObject.PlayerAction;
      }
    });

    this.matter.world.on("collisionend", (event, bodyA, bodyB) => {
      if (bodyA.gameObject?.PlayerAction == this.player.currentAction && bodyB.gameObject == this.player) {
        this.player.currentAction = null;
      } else if (bodyB.gameObject?.PlayerAction == this.player.currentAction && bodyA.gameObject == this.player) {
        this.player.currentAction = null;
      }
    });
    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, 2400, 600);
    this.cameras.main.setZoom(.5);
    // make the camera follow the player
    this.cameras.main.startFollow(this.player, 0, 0.2);
  }

  addBackground() {

  }

  addItems() {

  }

  mute(shouldMute = true) {
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
  fadeIn() {
    const houses = this.houses.filter((house) => house.houseNumber !== this.lastHouseNumber);
    const itemsToFade = [this.player, this.background, ...houses, ...this.objects];

    itemsToFade.forEach(item => {
      item.alpha = 0;
    });
    gsap.timeline().to(itemsToFade, {
      duration: "ontouchstart" in document.documentElement ? 0 : .5,
      alpha: 1,
      ease: "power2.inOut",
    });
  }
  fadeAway(callBack) {
    var tl = gsap.timeline({ onComplete: callBack, defaults: { ease: "power2.inOut", duration: .5 } });
    tl.to([this.player, this.background, ...this.objects], {
      duration: .5,
      alpha: 0,
    });
  }
}
