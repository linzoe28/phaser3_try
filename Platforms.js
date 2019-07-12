class Platforms extends Phaser.Physics.Arcade.StaticGroup{
    constructor(scene){
        super(scene.physics.world, scene);
        this.scene=scene;
        this.create(600, 400, 'ground');
        this.create(50, 250, 'ground');
        this.create(750, 220, 'ground');
        this.create(400, 568, 'ground').setScale(2).refreshBody();
    }
}