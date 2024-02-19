import { gsap } from "gsap";
import Controller from "../Controller";
import Gold from "./Gold";
export default class Chest extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y) {
        var shapes = scene.cache.json.get('shapes');
        super(scene.matter.world, x, y, 'gamesprites', 'House4sprites-3.png');
        this.startX = x;
        this.startY = y;
        this.scene = scene;
        this.isSensor = true;
        scene.add.existing(this);
        this.setStatic(true);
        this.setSensor(true);
        this.isOn = false;
        scene.anims.create({
            key: 'chestOpen',
            frames: [{ key: 'gamesprites', frame: 'House4sprites-4.png' }],
            frameRate: 8,
            repeat: 0
        });
    }

    PlayerAction = () => {
        if (!this.isOn && Controller.hasKey) {
            this.isOn = true;
            this.anims.play('chestOpen', this);
            const gold = new Gold(this.scene, this.x, this.y - 15);
            gold.setDepth(this.depth + 1);
            return true;
        }
        return true;
    }
}