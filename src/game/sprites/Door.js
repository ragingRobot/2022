import { gsap } from "gsap";
export default class Door extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y) {
        var shapes = scene.cache.json.get('shapes');
        super(scene.matter.world, x, y, 'houseSprites', 7, {
            shape: shapes.door,
            isSensor: true,
        });

        var block = scene.matter.add.image(0, 0, '');
        block.setStatic(true);
        block.x = this.x;
        block.y = this.y;
        block.alpha = 0;
        this.block = block;

        this.startX = x;
        this.startY = y;
        this.scene = scene;
        scene.add.existing(this);
        this.setStatic(true);
        this.isOn = false;
        scene.anims.create({
            key: 'dooropen',
            frames: [{ key: 'houseSprites', frame: 15 }],
            frameRate: 8,
            repeat: 0
        });

        scene.anims.create({
            key: 'doorclose',
            frames: [{ key: 'houseSprites', frame: 7 }],
            frameRate: 8,
            repeat: 0
        });
    }

    update() {
        console.log(this.body.isSensor);
    }

    PlayerAction = () => {
        if (this.isOn) {
            this.isOn = false;
            this.setSensor(!this.isOn);
            this.block.y = this.y;
            this.anims.play('doorclose', this);
            return true;
        }

        this.isOn = true;
        this.setSensor(!this.isOn);
        this.block.y = -400;
        this.anims.play('dooropen', this);
        return true;
    }
}