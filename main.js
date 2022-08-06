

let canvas;
let ctx;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400; // 400px
canvas.height = 700; // 700px
document.body.appendChild(canvas); // html�� body�� child�� canvas�� �ٿ���

// Image ���� ����
let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameoverImage;

// ���ּ� ������
const spaceshipVelocity = 3;
const spaceshipPadding = 6;

// ���ּ� ��ǥ: ��� ���ϴ� ��
let spaceshipX = canvas.width / 2 - 32;
let spaceshipY = canvas.height - 64 - spaceshipPadding;

function loadImage () {
    backgroundImage = new Image();
    backgroundImage.src = "images/spaceBackground.png";

    spaceshipImage = new Image();
    spaceshipImage.src = "images/spaceship.png";

    bulletImage = new Image();
    bulletImage.src = "images/bullet.png";

    enemyImage = new Image();
    enemyImage.src = "images/ufo.png";

    gameoverImage = new Image();
    gameoverImage.src = "images/gameover.webp";
};

function render () {
    // drawImage(image, dx, dy, dWidth, dHeight)
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY); // ������ 64
};

let keysDown = {}

function setupKeyboardListener () {
    document.addEventListener("keydown", function (event) {
        // console.log("Which key is pressed?", event.keyCode); // ���� Ű�� �ڵ带 ���
        keysDown[event.keyCode] = true;
        console.log("Which value belongs to Object \"keysDown\"?", keysDown);
    });

    document.addEventListener("keyup", function (event) {
        delete keysDown[event.keyCode];
        console.log("Away from keyboard", keysDown)
    });
};

function update () {
    // right
    if (39 in keysDown && spaceshipX <= canvas.width - 64 - spaceshipPadding) {
        spaceshipX += spaceshipVelocity; // ���ּ� �ӵ�
    };

    // left
    if (37 in keysDown && spaceshipX >= spaceshipPadding) {
        spaceshipX -= spaceshipVelocity; 
    };

    // ��ǥ�� �������� ���� ����
    // if (spaceshipX <= 6) spaceshipX = 6;
    // if (spaceshipX >= canvas.width - 70) spaceshipX = canvas.width - 70;
}

function main () {
    update(); // ��ǥ���� ������Ʈ�ϰ�
    render(); // ������
    // console.log("animation calls main function");
    requestAnimationFrame(main); // Animation�� �����ϰ� render
}

loadImage();
setupKeyboardListener();
main();
