export default class House extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, houseNumber) {
        super(scene.matter.world, x, y, 'house' + houseNumber, 0, {
            isSensor: true
        });
        scene.add.existing(this);
        this.setStatic(true);
    }
}