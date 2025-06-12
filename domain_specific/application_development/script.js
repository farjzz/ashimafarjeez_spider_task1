const grid = document.getElementById("grid");
const currentDisplay = document.getElementById("current");
const blockDisplay = document.getElementById("block");
const timeDisplay = document.getElementById("time");
const display = document.getElementById("blockk");
let time = 20;
let current = "Red";
let block = "Yellow";
let place = false;
let blocked;
let over = false;
const direc = [[[0, 1], [0, -1]], [[1, 0], [-1, 0]], [[1, 1], [-1, -1]], [[1, -1], [-1, 1]]];
function drawGrid() {
    for (let i = 0; i < 6; i++) {
        const tr = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            const td = document.createElement("td");
            td.dataset.row = i;
            td.dataset.column = j;
            tr.appendChild(td);
        }
        grid.appendChild(tr);
    }
}
drawGrid();
grid.addEventListener("click", function (e) {
    if(over) return;
    let cols = colAvailable();
    if (cols.length == 0) {
        setTimeout(() => {
            alert(`Game Over!`)
            location.reload();
        }, 1000);
    }
    const cell = e.target;
    const col = parseInt(cell.dataset.column);
    if (col == undefined) return;
    if (!place && cols.includes(col) && cols.length > 1) {
        blocked = col;
        place = true;
        return;
    }
    for (let i = 5; i >= 0; i--) {
        const targetCell = document.querySelector(`td[data-row='${i}'][data-column='${col}']`);
        if (!targetCell.classList.contains("Red") && !targetCell.classList.contains("Yellow") && place && col != blocked && cols.includes(col)) {
            animate(col, i);
            targetCell.classList.add(current);
            if (won(i, col, current)) {
                over = true;
                const winner = current;
                setTimeout(() => {
                    alert(`${winner} won!!`)
                    location.reload();
                }, 1000);
            }
            cols = colAvailable();
            if (cols.length > 1) {
                place = false;
            }
            else {
                place = true;
                display.textContent = "Blocking is not possible";
            }
            blocked=null;
            switchh();
            break;
        }
    }
});
function switchh() {
    current = current == "Red" ? "Yellow" : "Red";
    block = current == "Red" ? "Yellow" : "Red";
    currentDisplay.textContent = current;
    blockDisplay.textContent = block;
    time = 20;
    timeDisplay.textContent = time;
}
function animate(c, r) {
    const disc = document.createElement("div");
    disc.classList.add("disc");
    disc.classList.add(current == "Red" ? "red" : "yellow");
    const gridRect = document.getElementById("grid");
    const target = document.querySelector(`td[data-row='${r}'][data-column='${c}']`);
    const cellRect = target.getBoundingClientRect();
    const gridRectt = gridRect.getBoundingClientRect();
    disc.style.left = (cellRect.left - gridRectt.left + 15) + "px";
    disc.style.top = "-60px";
    gridRect.appendChild(disc);
    setTimeout(() => {
        disc.style.top = (cellRect.top - gridRectt.top + 15) + "px";
    }, 10);
}
function colAvailable() {
    const available = [];
    for (let c = 0; c < 7; c++) {
        for (let r = 5; r >= 0; r--) {
            const cell = document.querySelector(`td[data-row='${r}'][data-column='${c}']`);
            if (!cell.classList.contains("Red") && !cell.classList.contains("Yellow")) {
                available.push(c);
                break;
            }
        }
    }
    if (available.length == 0) {
        setTimeout(() => {
            alert(`Game Over!`)
            location.reload();
        }, 1000);
    }
    return available;
}
function won(row, col, clr) {
    function countDisc(dr, dc) {
        let count = 0;
        let r = row + dr;
        let c = col + dc;
        while (r >= 0 && r < 6 && c >= 0 && c < 7) {
            const cell = document.querySelector(`td[data-row='${r}'][data-column='${c}']`);
            if (cell.classList.contains(clr)) {
                count++;
                r += dr;
                c += dc;
            }
            else break;
        }
        return count;
    }
    for (let d of direc) {
        let count = 1;
        for (let [dr, dc] of d) {
            count += countDisc(dr, dc);
        }
        if (count >= 4) return true;
    }
    return false;
}
setInterval(() => {
    time--;
    timeDisplay.textContent = time;
    if (time == 0) {
        switchh();
        location.reload();
        setTimeout(() => {
            alert(`${current} won !!`);
        }, 10);
        return;
    }
}, 1000);
