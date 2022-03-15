export default class House extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, houseNumber, isExit) {
        super(scene.matter.world, x, y, 'house' + houseNumber, 0, {
            isSensor: true
        });
        this.isExit = isExit;
        this.scene = scene;
        this.houseNumber = houseNumber;
        scene.add.existing(this);
        this.setStatic(true);
    }

    PlayerAction = () => {
        if(this.isExit){
            this.scene.scene.start('StreetScene');
            return;
        }
        this.scene.scene.start('House' + this.houseNumber + 'Scene');
    }
}