var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100;

var lines = []; // Array to store the previous lines
var mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2 // Start the mouse at the center of the canvas
};
var isLeft = false; // Flag to check if the mouse has moved left
var isKeyDownA = false; // Flags to check if the 'a' or 'd' keys are pressed
var isKeyDownD = false;
var isRight = false;
var numBlackLines = 0; // Counter for black lines
var numGreenLines = 0; // Counter for green lines
var color = '#0f0'; // Set the initial color to green


// Add a div element to display the counter
var counter = document.createElement('div');
counter.id = 'counter';
document.body.appendChild(counter);

canvas.addEventListener('mousemove', function(e) {
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
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.lineWidth = 40;
    ctx.strokeStyle = color; // Set the stroke color to the current color

    // Check if the 'a' or 'd' keys are pressed
    if (((isKeyDownA && isLeft) || (isKeyDownD && isRight)) && !(isKeyDownA && isKeyDownD)) {
        color = '#0f0'; // Change the color to green if the mouse has moved in the right direction
    } else {
        color = '#000'; // Otherwise, set the color back to black
    }


    // Update the counter with the current count of black and green lines
    var pos = ((2-(numBlackLines + numGreenLines) / numGreenLines )*100);
    counter.innerHTML = "Black lines: " + numBlackLines + "<br>Green lines: " + numGreenLines + "<br>Sync%: " + pos;
    /*  if (pos < 90) {
          ctx.clear()
      }
  */
    // Create a new line at the top of the canvas

    var newLine = {
        x: canvas.width/3 + mouse.x/6,
        y: canvas.height/8,
        color: color
    };


    if (newLine.color === '#0f0') {
        numGreenLines++;
    } else {
        numBlackLines++;
    }

     lines.unshift(newLine);

    // Draw the previous lines and the line between the current point and the minimum y value
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        line.y += 3; // Update the vertical position of the line

        if (i > 0) {
            var prevLine = lines[i - 1];
            ctx.beginPath();
            ctx.lineTo(line.x, line.y);
            ctx.lineTo(prevLine.x, prevLine.y);
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.strokeStyle = prevLine.color;
            ctx.stroke();
        }
        prevLine = line; // Save the current line as the previous line for the next iteration
    }

    // Draw the object once per frame



    // Remove the lines that have gone off the top of the canvas
    if (lines.length > 1300) {
        lines.pop();
    }
}

animate();