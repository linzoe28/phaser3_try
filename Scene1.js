/**
 * 定義一個 scene，用成員變數儲存 scene 上面的物件
 * override preload, create, update 函式
 */
class Scene1 extends Phaser.Scene {
    constructor() {
        super();
        this.player = null;
        this.platforms = null;
        this.cursors = null;
        this.stars = null;
    }
    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.spritesheet('dude',
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
        this.load.image('star', 'assets/star.png');
        this.load.spritesheet('cat',
            'assets/cat.png',
            { frameWidth: 32, frameHeight: 40 }
        );
    }
    create() {
        this.add.image(400, 300, 'sky');
        //沒有狀態，不需控制的物件，如 platforms, stars，一般直接
        //在scene裏面建立就好
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        this.stars = this.physics.add.group({
            key: 'star', repeat: 11, setXY: { x: 12, y: 0, stepX: 70 }
        });
        this.stars.children.iterate(function (child) {
            child.setBounceY(0.3);
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });


        this.anims.create({
            key: 'catleft',
            frames: this.anims.generateFrameNumbers('cat', { start: 9, end: 16 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'catturn',
            frames: [{ key: 'cat', frame: 8 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'catright',
            frames: this.anims.generateFrameNumbers('cat', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        //主角、怪物等等通常會抽出去
        this.player = new Player(this, 100, 450);
        
        this.physics.add.collider(this.player, this.platforms);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
    }

    collectStar(player, star) {
        star.disableBody(true, true);
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('catleft', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('catright', true);
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('catturn');
        }
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }
}