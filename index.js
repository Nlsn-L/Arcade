let blockSize = 25;
let row = 25;
let column = 25;
let canvas;
let ctx;
let snakeX = 300;
let snakeY = 300;
let pelletX = Math.floor(Math.random() * column) * blockSize;
let pelletY = Math.floor(Math.random() * row) * blockSize;
let velocityX = 0;
let velocityY = 0;


window.onload = function(){
    canvas = document.getElementById("canvas")
    canvas.height = row * blockSize;
    canvas.width = column * blockSize;
    ctx = canvas.getContext('2d');

    document.addEventListener('keydown' , changeDirection);

    function changeDirection(e) {
        if (e.keyCode == 37 && velocityX !== 1){
            // move left only if not already moving right
            velocityX = -1;
            velocityY = 0;
        } else if (e.keyCode == 39 && velocityX != -1){
            //move right only if not already moving left
            velocityX = 1;
            velocityY =0;
        } else if (e.keyCode == 38 && velocityY != 1){
            //move up only if not already moving down
            velocityX = 0;
            velocityY = -1;
        } else if (e.keyCode == 40 && velocityY != -1){
            // move down only if not already moving up
            velocityX = 0;
            velocityY = 1;
        }


    }

    setInterval(update,1000/30)
}


function update(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    main();
}

function main(){
    
    drawSnake();
    snakeX += velocityX * blockSize
    snakeY += velocityY * blockSize
    drawPellets();
    detectCollision();



}


function drawSnake(){
    ctx.fillStyle = 'red'
    ctx.fillRect(snakeX,snakeY,25,25);
}

function drawPellets(){
    ctx.fillStyle = 'white';
    ctx.fillRect(pelletX,pelletY,25,25)

}

function detectCollision(){

    if (snakeX == pelletX && snakeY == pelletY){
        drawPellets();
    }

}