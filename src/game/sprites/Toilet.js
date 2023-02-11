import { gsap } from "gsap";
export default class Toilet extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y) {
        var shapes = scene.cache.json.get('shapes');
        super(scene.matter.world, x, y, 'houseSprites', 5, {
            isSensor: true,
            shape: shapes.toilet
        });
        this.startX = x;
        this.startY = y;
        this.scene = scene;
        this.isSensor = true;
        scene.add.existing(this);
        this.setStatic(true);
        this.isOn = false;
        scene.anims.create({
            key: 'toileton',
            frames: [{ key: 'houseSprites', frame: 13 }],
            frameRate: 6,
            repeat: 0
        });

        scene.anims.create({
            key: 'toiletoff',
            frames: [{ key: 'houseSprites', frame: 5 }],
            frameRate: 8,
            repeat: 0
        });

    }

    PlayerAction = () => {
        if (this.isOn) {
            this.isOn = false;
            this.setSensor(false);
            this.anims.play('toiletoff', this);
            return true;
        }

        this.isOn = true;
        this.setSensor(true);
        this.anims.play('toileton', this);
        return false;
    }
}