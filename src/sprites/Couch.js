import { gsap } from "gsap";
export default class Couch extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y) {
        var shapes = scene.cache.json.get('shapes');
        super(scene.matter.world, x, y, 'houseSprites', 0, {
            isSensor: true,
            shape: shapes.couch
        });
        this.startX = x;
        this.startY = y;
        this.scene = scene;
        this.isSensor = true;
        scene.add.existing(this);
        this.setStatic(true);
        this.isOn = false;
        scene.anims.create({
            key: 'couchon',
            frames: [{ key: 'houseSprites', frame: 8 }],
            frameRate: 8,
            repeat: 0
        });

        scene.anims.create({
            key: 'couchoff',
            frames: [{ key: 'houseSprites', frame: 0 }],
            frameRate: 8,
            repeat: 0
        });
    }

    PlayerAction = () => {
        if (this.isOn) {
            this.isOn = false;
            this.setSensor(false);
            this.anims.play('couchoff', this);
            return true;
        }

        this.isOn = true;
        this.setSensor(true);
        this.anims.play('couchon', this);
        return false;
    }
}