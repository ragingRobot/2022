import { gsap } from "gsap";
export default class Washer extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y) {
        var shapes = scene.cache.json.get('shapes');
        super(scene.matter.world, x, y, 'houseSprites', 6, {
            isSensor: true,
            shape: shapes.washer
        });
        this.startX = x;
        this.startY = y;
        this.scene = scene;
        this.isSensor = true;
        scene.add.existing(this);
        this.setStatic(true);
        this.isOn = false;
        scene.anims.create({
            key: 'washeron',
            frames: [{ key: 'houseSprites', frame: 14 }, { key: 'houseSprites', frame: 22 }],
            frameRate: 8,
            repeat: -1
        });

        scene.anims.create({
            key: 'washeroff',
            frames: [{ key: 'houseSprites', frame: 6 }],
            frameRate: 8
        });
    }

    PlayerAction = () => {
        if (this.isOn) {
            this.isOn = false;
            this.anims.play('washeroff', this);
            return true;
        }

        this.isOn = true;
        this.anims.play('washeron', this);
        return true;
    }
}