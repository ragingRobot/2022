export default class Background extends Phaser.GameObjects.Image {
    constructor(scene, x, y, ) {
        super(scene, x, y, 'background');
        scene.add.existing(this);
    }
}