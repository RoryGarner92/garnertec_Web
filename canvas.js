//creating a variable to be passed to the html as a container 
var canvas = document.querySelector('canvas');
//settting the size to the full width of the window 
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//c refers th the variable "content"
var c = canvas.getContext('2d');

//**********************************/
var maxRadius = 5;

var colourArray = [
    '#3B4A4F',
    '#5D85A8',
    '#5F94C6',
    '#ABD3E4',
    '#F6F7EA',
]

var mouse = {
    x: undefined,
    y: undefined
}

function changingImg(){
    document.getElementById("y").src="./images/test2.png";
}

//event listener 
window.addEventListener('mousemove',
    function (event) {
        //   console.log(event);
        mouse.x = event.x;
        mouse.y = event.y;
    })

//event listener 
window.addEventListener('resize',
    function (event) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    })

// Creating a circle object    
function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.colour = colourArray[Math.floor(Math.random() * colourArray.length)];

    this.draw = function () {
        c.beginPath();
        c.strokeStyle = "blue";
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.stroke();
        c.fillStyle = this.colour;
        c.fill();
    }

    this.update = function () {

        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        // interactivity 
        if (mouse.x - this.x < 50 && mouse.x - this.x > - 50
            && mouse.y - this.y < 50 && mouse.y - this.y > - 50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }

}

console.log(circleArray);
var circleArray = [];
function init() {
    circleArray = [];
    for (var index = 0; index < 1000; index++) {
        var radius = Math.random() * 1 + 1;
        var x = Math.random() * ((innerWidth - radius * 2) + radius);
        var y = Math.random() * ((innerHeight - radius * 2) + radius);
        var dy = Math.random() - 0.5 * 1;
        var dx = Math.random() - 0.5 * 1;

        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var index = 0; index < circleArray.length; index++) {
        circleArray[index].update();
    }
}

animate();
init();
