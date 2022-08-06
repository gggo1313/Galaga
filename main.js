

let canvas;
let ctx;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400; // 400px
canvas.height = 700; // 700px
document.body.appendChild(canvas); // html의 body의 child로 canvas를 붙여줌

// Image 변수 세팅
let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameoverImage;

// 우주선 설정값
const spaceshipVelocity = 3;
const spaceshipPadding = 6;

// 우주선 좌표: 계속 변하는 값
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
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY); // 원본이 64
};

let keysDown = {}

function setupKeyboardListener () {
    document.addEventListener("keydown", function (event) {
        // console.log("Which key is pressed?", event.keyCode); // 누른 키의 코드를 출력
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
        spaceshipX += spaceshipVelocity; // 우주선 속도
    };

    // left
    if (37 in keysDown && spaceshipX >= spaceshipPadding) {
        spaceshipX -= spaceshipVelocity; 
    };

    // 좌표값 고정으로 동작 정지
    // if (spaceshipX <= 6) spaceshipX = 6;
    // if (spaceshipX >= canvas.width - 70) spaceshipX = canvas.width - 70;
}

function main () {
    update(); // 좌표값을 업데이트하고
    render(); // 렌더링
    // console.log("animation calls main function");
    requestAnimationFrame(main); // Animation을 무한하게 render
}

loadImage();
setupKeyboardListener();
main();
