class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, "ufo");
        this.scene=scene;
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.setBounce(0.2);
        this.setCollideWorldBounds(true);
    }
}