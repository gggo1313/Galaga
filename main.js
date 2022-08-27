

let canvas;
let ctx;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400; // 400px
canvas.height = 700; // 700px
document.body.appendChild(canvas); // html의 body의 child로 canvas를 붙여줌

// Image 변수 세팅
let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameoverImage;
let gameOver = false; // true면 gameover
let score = 0;

// 우주선 설정값
const spaceshipVelocity = 3;
const spaceshipPadding = 6;

// 우주선 좌표: 계속 변하는 값
let spaceshipX = canvas.width / 2 - 32;
let spaceshipY = canvas.height - 64 - spaceshipPadding;

let bulletList = [];
let enemyList = [];

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
    ctx.fillText(`Score: ${score}`, 20, 30);
    ctx.fillStyle = "White";
    ctx.font = "20px Arial";

    for (let i = 0; i < bulletList.length; i++) {
        if (bulletList[i].alive) {
            ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y, 32, 32);
        };
    };

    for (let i = 0; i < enemyList.length; i++) {
        ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y, 48, 48);
    };
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

        if (event.keyCode == 32) {
            createBullet(); // 총알 생성

        };
    });
};

function bullet () {
    this.x = 0;
    this.y = 0;
    this.init = function () {
        this.x = spaceshipX + 16;
        this.y = spaceshipY;
        this.alive = true;

        bulletList.push(this);
    };

    this.update = function () {
        this.y -= 7;

        if (this.y < -32) this.alive = false;
    };

    this.checkHit = function () {
        for (let i = 0; i < enemyList.length; i++) {
            if (
                this.y <= enemyList[i].y &&
                this.x >= enemyList[i].x &&
                this.x <= enemyList[i].x + 64
            ) {
                score++;
                this.alive = false;
                enemyList.splice(i, 1);
            };
        };
    };
};

function generateRandomValue (min, max) {
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNum;
};

function enemy () {
    this.x = 0;
    this.y = 0;
    this.init = function () {
        this.y = 16;
        this.x = generateRandomValue(0, canvas.width - 48);
        enemyList.push(this);
    };

    this.update = function () {
        this.y += 2;

        if (this.y >= canvas.height - 48) {
            gameOver = true;

        }
    };
};

function createBullet () {
    let b = new bullet();
    b.init();
};

function createEnemy () {
    const interval = setInterval(() => {
        let e = new enemy();
        e.init();
    }, 1000);
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

    // 총알의 y좌표 업데이트
    for (let i =0; i < bulletList.length; i++) {
        if (bulletList[i].alive) {
            bulletList[i].update();
            bulletList[i].checkHit();
        };
    };

    for (let i = 0; i < enemyList.length; i++) {
        enemyList[i].update();
    };
};

function main () {
    if (!gameOver) {
        update(); // 좌표값을 업데이트하고
        render(); // 렌더링
        // console.log("animation calls main function");
        requestAnimationFrame(main); // Animation을 무한하게 render
    } else {
        ctx.drawImage(gameoverImage, 0, 100, 400, 400);
    }
    
};

// 총알 만들기
// 1. 스페이스바를 누르면 발사
// 2. 총알의 발사 = 총알의 y좌표가 감소
// 총알의 x값은 스페이스를 누른 순간의 우주선의 x좌표
// 3. 발사된 총알들은 배열에 저장
// 4. 총알들은 x, y 좌표값이 있어야 함
// 5. 총알 배열을 가지고 rendering

loadImage();
setupKeyboardListener();
createEnemy();
main();
