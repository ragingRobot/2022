export default class House4Background extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y) {
        var shapes = scene.cache.json.get('shapes');
        super(scene.matter.world, x, y, 'house4inside', 0, { shape: shapes.house4inside });
        scene.add.existing(this);
        this.setStatic(true);
        this.isBackground = true;
    }
}