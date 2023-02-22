import QR from './QR';
import gsap from 'gsap';
class Controller {
  constructor() {
    this.action1 = false;
    this.action2 = false;
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.hasKey = false;

    //onscreen controlls?
    this.addEventsToButton(".jump", "action2");
    this.addEventsToButton(".shoot", "action1");
    this.addEventsToButton(".up", "up");
    this.addEventsToButton(".down", "down");
    this.addEventsToButton(".left", "left");
    this.addEventsToButton(".right", "right");

    if ("ontouchstart" in document.documentElement) {
      document.querySelector(".controls").classList.remove("hide");
    }

  }

  setKey(val = true){
    this.hasKey = val;
    this.socket.emit('keyFound', val);
  }
  addSocketEvents(scene) {
    if (!("ontouchstart" in document.documentElement)) {
      //QR code controlls
      this.scene = scene;
      this.socket = io();
      this.scene.textures.addBase64('qr', QR.getCode());

      this.wasd = this.scene.add.sprite(1850, 840, 'gamesprites', 'WASD.png');
      this.wasd.alpha = 0;
      this.socket.on('connect', () => {
        this.socket.emit('im a game view');
        this.qr = this.scene.add.sprite(2050, 840, 'qr');
        this.qr.alpha = 0;
        this.qr.setDepth(3);
        gsap.to([this.qr, this.wasd], { alpha: 1, duration: 1 });
      });
      this.socket.on('left', (msg) => {
        this.left = msg.value;
      });
      this.socket.on('right', (msg) => {
        this.right = msg.value;
      });
      this.socket.on('action', (msg) => {
        this.action1 = msg.value;
      });
      this.socket.on('jump', (msg) => {
        this.action2 = msg.value;
      });


      this.socket.on('controller connection', (msg) => {
        if (msg.numberOfPlayers) {
          //hide the qr code
          gsap.to([this.qr, this.wasd], { alpha: 0 });
        } else {
          gsap.to([this.qr, this.wasd], { alpha: 1 });
        }
      });
    }
  }
  toggle(name, value) {
    this[name] = value;
  }

  addEventsToButton(selector, toggle) {
    document.querySelector(selector).addEventListener("touchstart", this.toggle.bind(this, toggle, true));
    document.querySelector(selector).addEventListener("touchend", this.toggle.bind(this, toggle, false));
  }

}

export default new Controller();
