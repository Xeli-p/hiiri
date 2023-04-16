let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth - 30;
canvas.height = window.innerHeight - 100;
ctx.font = "50px Arial";
ctx.fillStyle = "#FFD700";

let lines = [];
let mouse = {
    x: 1000,
    y: canvas.height / 2
};
let isLeft = false;
let isKeyDownA = false;
let isKeyDownD = false;
let isRight = false;
let syncP = 0;
let numGreenLines = 0;
let numBlackLines = 0;
let color = '#0f0';
let animationPaused = true;

ctx.fillText("Press spacebar to start", canvas.width/2.8, canvas.height/2);
let counter = document.createElement('div');
counter.id = 'counter';
counter.style.fontSize = '50px';
counter.style.fontFamily = 'Arial'
document.body.appendChild(counter);

document.addEventListener('mousemove', function(e) {
    if (e.clientX < mouse.x) {
        isLeft = true;
        isRight = false;
    } else if (e.clientX > mouse.x) {
        isRight = true;
        isLeft = false;
    } else  if (e.clientX === mouse.x){
        isRight = false;
        isLeft = false;
    }
    mouse.x = e.clientX;
});

document.addEventListener('keydown', function(e) {
    if (e.key.toLowerCase() === 'a' ){
        isKeyDownA = true;
    }
    else if (e.key.toLowerCase() === 'd') {
        isKeyDownD = true;
    }
    else if (e.code === 'Space') {
        animationPaused = !animationPaused;

        ctx.fillText("Press spacebar to restart",  canvas.width/2.8 , canvas.height/2);
        if (!animationPaused) {
            lines = [];
            numBlackLines = 0;
            numGreenLines = 0;
            animate();
        }
    }
});

document.addEventListener('keyup', function(e) {
    if ( e.key.toLowerCase() === 'd') {
        isKeyDownD = false;
    }
    if (e.key.toLowerCase() === 'a') {
        isKeyDownA = false;
    }
});


function animate() {

    if (animationPaused) {
        return;
    }

    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 40;

    if (((isKeyDownA && isLeft) || (isKeyDownD && isRight)) && !(isKeyDownA && isKeyDownD)) {
        color = '#0f0';
    } else {
        color = '#000';
    }

    syncP = (numGreenLines/lines.length)*100;
    counter.innerHTML =
        "Sync%: " + Math.round(syncP);

    //
    // new line
    let newLine = {
        x: canvas.width/2.8 + mouse.x/4,
        y: canvas.height/8,
        color: color
    };


    if (newLine.color === '#0f0') {
        numGreenLines++;
    } else {
        numBlackLines++;
    }

    let size = lines.unshift(newLine);

    for (let i = 0; i < size; i++) {
        let line = lines[i];
        line.y += 1.5;

        if (i > 0) {
            let prevLine = lines[i - 1];
            ctx.beginPath();
            ctx.lineTo(line.x, line.y);
            ctx.lineTo(prevLine.x, prevLine.y);
            ctx.lineCap = 'round';
            ctx.strokeStyle = line.color;
            ctx.stroke();
        }
    }

    if (lines.length > 600) {

        let deleted = lines.pop();
        if (deleted.color === '#0f0') {
            numGreenLines--;
        } else {
            numBlackLines--;
        }
    }
}

