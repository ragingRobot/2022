import { gsap } from "gsap";
export default class Tv extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y) {

        var shapes = scene.cache.json.get('shapes');
        super(scene.matter.world, x, y, 'houseSprites', 1, {
            isSensor: true,
            shape: shapes.tv
        });
        this.startX = x;
        this.startY = y;
        this.scene = scene;
        this.isSensor = true;
        scene.add.existing(this);
        this.setStatic(true);

        this.isOn = false;
        scene.anims.create({
            key: 'tvon',
            frames: [{ key: 'houseSprites', frame: 9 }, { key: 'houseSprites', frame: 17 }],
            frameRate: 8,
            repeat: -1
        });

        scene.anims.create({
            key: 'tvoff',
            frames: [{ key: 'houseSprites', frame: 1 }],
            frameRate: 8
        });
    }

    PlayerAction = () => {
        if (this.isOn) {
            this.isOn = false;
            this.anims.play('tvoff', this);
            return true;
        }

        this.isOn = true;
        this.anims.play('tvon', this);
        return true;
    }
}