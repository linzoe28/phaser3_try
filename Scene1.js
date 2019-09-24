/**
 * 定義一個 scene，用成員變數儲存 scene 上面的物件
 * override preload, create, update 函式
 */
class Scene1 extends Phaser.Scene {

    constructor() {
        super();
        this.player = null;
        this.cursors = null;
        this.obstacle1s = null;
        this.obstacle2s = null;
        this.obstacle3s = null;
        this.tileSprite = null;
        this.animationKey="ufo_y";
    }
    preload() {
        this.load.image('bg', 'assets/background.png');
        this.load.image('obstacle1', 'assets/obstacle1.png');
        this.load.image('obstacle2', 'assets/obstacle2.png');
        this.load.image('obstacle3', 'assets/obstacle3.png');
        this.load.spritesheet('ufo',
            'assets/UFO2.png',
            { frameWidth: 82, frameHeight: 73 }
        );
    }
    create() {
        //this.add.image(400, 200, 'bg');
        this.tileSprite = this.add.tileSprite(0, 0, 1600, 800, "bg");
        //沒有狀態，不需控制的物件，如 obstacle3s，一般直接
        //在scene裏面建立就好

        this.obstacle1s = this.physics.add.group({
            key: 'obstacle1', repeat: 50, setXY: { x: 50, y: 100, stepX: 750, stepY: 2 }
        });
        this.obstacle2s = this.physics.add.group({
            key: 'obstacle2', repeat: 50, setXY: { x: 200, y: 350, stepX: 800 }
        });
        this.obstacle3s = this.physics.add.group({
            key: 'obstacle3', repeat: 50, setXY: { x: 150, y: 200, stepX: 800 }
        });

        this.player = new Player(this, 60, 350);

        this.anims.create({
            key: 'gameover',
            frames: this.anims.generateFrameNumbers('ufo', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'ufo_y',
            frames: [{ key: 'ufo', frame: 0 }],
            frameRate: 20
        });

        //主角、怪物等等通常會抽出去
        
        //this.player.setGravityX(100);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.overlap(this.player, this.obstacle1s, this.collision, null, this);
        this.physics.add.overlap(this.player, this.obstacle2s, this.collision, null, this);
        this.physics.add.overlap(this.player, this.obstacle3s, this.collision, null, this);
    }

    collision(player, obstacle) {
        obstacle.disableBody(true, true);
        this.animationKey="gameover";
    }

    update() {
        this.tileSprite.tilePositionX += 5;
        this.obstacle1s.setVelocityX(-100);
        this.obstacle2s.setVelocityX(-200);
        this.obstacle3s.setVelocityX(-200);

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-100);
            this.player.anims.play(this.animationKey, true);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(100);
            this.player.anims.play(this.animationKey, true);
        } else {
            this.player.anims.play(this.animationKey, true);
        }
    }


}
