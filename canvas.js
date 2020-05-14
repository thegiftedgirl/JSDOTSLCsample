var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;  
var c = canvas.getContext('2d');
// c.fillStyle = 'rgba(255,0,0,0.1';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(40,0,0, 0.3)';
// c.fillRect(200, 200, 200, 200);
// c.fillStyle = 'rgba(90, 0, 0, 0.5)';
// c.fillRect(300, 300, 300, 300);
// c.fillRect(400,400,400,400);
// console.log(canvas);

// // Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.strokeStyle = '#fa3400'
// c.stroke();

// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = 'pink';
// c.stroke();

// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = 'pink';
// c.stroke();


// for( var i = 0; i < 90; i++){
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = 'black';
//     c.stroke();
// }
 var mouse = {
     x: undefined,
     y: undefined,
     
 }
 var maxRadius= 40;
//  var minRadius= 2;
 var colorArray =[
     '#AB5EFF',
     '#7456E8',
     '#7456E8',
     '#5686E8',
     '#5686E8',
     '#'
 ]
window.addEventListener('mousemove', 
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
        console.log(mouse);
    
})
 window.addEventListener('resize', function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;   
        
        init();
});

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // c.strokeStyle = 'blue';
        // c.stroke();
        c.fillStyle= this.color
        c.fill();
       
    }

    this.update = function(){
        if (this.x + this.radius > innerWidth || 
            this.x - radius < 0){
            this.dx = -this.dx;
           }
        
           if (this.y + this.radius > innerHeight || 
                this.y - radius < 0){
                this.dy = -this.dy;
           }
           this.x += this.dx;
           this.y += this.dy;

           //interactivity
           if (mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 &&
            mouse.y - this.y > -50
            )  {
                if (this.radius < maxRadius) {
                this.radius += 1;
            }
           } else if (this.radius > this.minRadius) {
               this.radius -= 1;
           }
           this.draw();
        }
        
    }


 var circleArray =[];
function init() {
    
    circleArray = [];
    for (var i= 0; i < 800; i++) {
        var radius = Math.random() * 3 + 1;
        var x = Math.random() * (innerWidth - radius *2) ;
        var y = Math.random() * (innerHeight - radius * 2);
        var dx =  (Math.random() - 0.5) ;
        var dy =  (Math.random() - 0.5) ;
        
        circleArray.push(new Circle(x, y, dx, dy, radius));
}
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);  

    for (var i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }

}
init();

animate();  