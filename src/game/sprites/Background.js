export default class Background extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y) {
        var shapes = scene.cache.json.get('shapes');
        super(scene.matter.world, x, y, 'background', 0, { shape: shapes.background });
        scene.add.existing(this);
        this.setStatic(true);
        this.isBackground = true;
    }
}