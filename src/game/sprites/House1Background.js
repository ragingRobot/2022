export default class House1Background extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y) {
        var shapes = scene.cache.json.get('shapes');
        super(scene.matter.world, x, y, 'house1inside', 0, { shape: shapes.house1inside });
        scene.add.existing(this);
        this.setStatic(true);
        this.isBackground = true;
    }
}