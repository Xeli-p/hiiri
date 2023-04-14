var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var lines = []; // Array to store the previous lines
var mouse = {
    x: 0,
    y: canvas.height / 2 // Start the mouse at the center of the canvas
};
var isLeft = false; // Flag to check if the mouse has moved left
var isKeyDownA = false; // Flags to check if the 'a' or 'd' keys are pressed
var isKeyDownD = false;
var isRight = false;
var color = '#000'; // Set the initial color to black
var prevLine = null;

canvas.addEventListener('mousemove', function(e) {
    if (e.clientX < mouse.x) {
        isLeft = true;
        isRight = false;
    } else if (e.clientX > mouse.x) {
        isRight = true;
        isLeft = false;
    }
    mouse.x = e.clientX;
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'a' ) {
        isKeyDownA = true;
    }
    else if (e.key === 'd') {
        isKeyDownD = true;
    }
});

document.addEventListener('keyup', function(e) {
    if (e.key === 'a' ) {
        isKeyDownA = false;
    }
});

document.addEventListener('keyup', function(e) {
    if ( e.key === 'd') {
        isKeyDownD = false;
    }
});

document.addEventListener('keyup', function(event) {
    if (event.code === 'KeyA') {
        isKeyDownA = false;
    }
});

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.lineWidth = 40;
    ctx.lineJoin = "miter"; // Set the line join style to round
    ctx.strokeStyle = color; // Set the stroke color to the current color

    // Check if the 'a' or 'd' keys are pressed
    if ((isKeyDownA && isLeft) || (isKeyDownD && isRight)) {
        color = '#0f0'; // Change the color to green if the mouse has moved in the right direction
    } else {
        color = '#000'; // Otherwise, set the color back to black
    }

    // Create a new line at the top of the canvas
    var newLine = {
        x: mouse.x,
        y: 0,
        color: color
    };
    lines.unshift(newLine);

    // Find the minimum y value of the lines drawn
    var minY = canvas.height;

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (line.y < minY) {
            minY = line.y;
        }
    }

    // Draw the previous lines and the line between the current point and the minimum y value
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        line.y += 7; // Update the vertical position of the line

        if (i > 0) {
            var prevLine = lines[i - 1];
            ctx.beginPath();
            ctx.moveTo(prevLine.x, prevLine.y);
            ctx.lineTo(line.x, line.y);
            ctx.strokeStyle = prevLine.color;
            ctx.stroke();
        }
        prevLine = line; // Save the current line as the previous line for the next iteration

    }

    // Remove the lines that have gone off the top of the canvas
    if (lines.length > 700) {
        lines.pop();
    }
    adada
}

animate();