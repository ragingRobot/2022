import { gsap } from "gsap";
export default class FirePlace extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y) {
        var shapes = scene.cache.json.get('shapes');
        super(scene.matter.world, x, y, 'houseSprites', 2, {
            isSensor: true,
            shape: shapes.fireplace
        });
        this.startX = x;
        this.startY = y;
        this.scene = scene;
        this.isSensor = true;
        scene.add.existing(this);
        this.setStatic(true);
        this.isOn = false;
        scene.anims.create({
            key: 'fireon',
            frames: [{ key: 'houseSprites', frame: 10 }, { key: 'houseSprites', frame: 18 }],
            frameRate: 8,
            repeat: -1
        });

        scene.anims.create({
            key: 'fireoff',
            frames: [{ key: 'houseSprites', frame: 2 }],
            frameRate: 8
        });
    }

    PlayerAction = () => {
        if (this.isOn) {
            this.isOn = false;
            this.anims.play('fireoff', this);
            return true;
        }

        this.isOn = true;
        this.anims.play('fireon', this);
        return true;
    }
}