import { gsap } from "gsap";
export default class FancyChair extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y) {
        var shapes = scene.cache.json.get('shapes');
        super(scene.matter.world, x, y, 'gamesprites', 'House4sprites-10.png', {
            isSensor: true,
            shape: shapes.tub
        });
        this.startX = x;
        this.startY = y;
        this.scene = scene;
        this.isSensor = true;
        scene.add.existing(this);
        this.setStatic(true);
    }

    PlayerAction = () => {
        return true;
    }
}