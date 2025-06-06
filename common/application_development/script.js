const needle = document.getElementById("needle");
const hammer = document.getElementById("hammer");
const scoreDisplay = document.getElementById("score");
let angle = -89;
let angle2 = 0;
let speed = 0.5;
let d = 1;
let dr = -1;
let swing = true;
let score = 0;
function animate() {
    requestAnimationFrame(animate);
    if (swing) {
        angle += speed * d;
        if (angle >= 90 || angle <= -90) d = -d;
        needle.style.rotate = `${angle}deg`;
    }
}
function animateHam() {
    if (angle2 <= -45) dr = -dr;
    if (angle2 >= 0 && dr == 1) return;
    angle2 += 3.5 * dr;
    hammer.style.rotate = `${angle2}deg`;
    requestAnimationFrame(animateHam);
}
document.addEventListener("keydown", function (e) {
    if (e.code == "Space") {
        if (swing) {
            angle2 = 0;
            dr = -1;
            animateHam();
            updateScore();
        }
        swing = !swing;
    }
})
function updateScore() {
    let angle1;
    if (angle <= 0) angle1 = angle + 90;
    else angle1 = 90 - angle;
    score = angle1 * 10 / 9;
    scoreDisplay.textContent = score.toFixed(2);
    console.log(score);
    console.log(angle1);
}
animate();