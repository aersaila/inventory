// 获取元素
const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const scoreDisplay = document.getElementById('score');

let isJumping = false;
let score = 0;

// 控制恐龙跳跃
function jump() {
    if (isJumping) return;
    isJumping = true;

    let jumpHeight = 0;
    const jumpInterval = setInterval(() => {
        if (jumpHeight >= 150) {
            clearInterval(jumpInterval);
            // 下落
            const fallInterval = setInterval(() => {
                if (jumpHeight <= 0) {
                    clearInterval(fallInterval);
                    isJumping = false;
                }
                jumpHeight -= 10;
                dino.style.bottom = jumpHeight + 50 + 'px';
            }, 20);
        }
        jumpHeight += 10;
        dino.style.bottom = jumpHeight + 50 + 'px';
    }, 20);
}

// 移动仙人掌
function moveCactus() {
    let cactusLeft = 400; // 初始位置
    const cactusInterval = setInterval(() => {
        if (cactusLeft < -30) {
            cactusLeft = 400;
            score++; // 通过一次，增加分数
            scoreDisplay.textContent = `分数：${score}`;
        }
        cactusLeft -= 5; // 移动速度
        cactus.style.left = cactusLeft + 'px';

        // 碰撞检测
        const dinoBottom = parseInt(window.getComputedStyle(dino).bottom);
        if (cactusLeft > 0 && cactusLeft < 80 && dinoBottom < 50) {
            alert(`游戏结束！你的分数是：${score}`);
            clearInterval(cactusInterval);
            location.reload();
        }
    }, 20);
}

// 监听键盘事件
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});

// 启动游戏
moveCactus();
