import { gsap } from "gsap";
export default class Bed extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y) {
        var shapes = scene.cache.json.get('shapes');
        super(scene.matter.world, x, y, 'houseSprites', 3, {
            isSensor: true,
            shape: shapes.bed
        });
        this.startX = x;
        this.startY = y;
        this.scene = scene;
        this.isSensor = true;
        scene.add.existing(this);
        this.setStatic(true);
        this.isOn = false;
        scene.anims.create({
            key: 'bedon',
            frames: [{ key: 'houseSprites', frame: 11 }, { key: 'houseSprites', frame: 19 }, { key: 'houseSprites', frame: 27 }],
            frameRate: 6,
            repeat: -1
        });

        scene.anims.create({
            key: 'bedoff',
            frames: [{ key: 'houseSprites', frame: 3 }],
            frameRate: 8,
            repeat: 0
        });

    }

    PlayerAction = () => {
        if (this.isOn) {
            this.isOn = false;
            this.setSensor(false);
            this.anims.play('bedoff', this);
            return true;
        }

        this.isOn = true;
        this.setSensor(true);
        this.anims.play('bedon', this);
        return false;
    }
}