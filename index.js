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
let snakeBody = [];
let gameState = 2;


window.onload = function(){
    //creates a canvas
    //gets context for canvas 'ctx'
    canvas = document.getElementById("canvas")
    canvas.height = row * blockSize;
    canvas.width = column * blockSize;
    ctx = canvas.getContext('2d');

    //event listener for arrow key presses
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
    //update the canvas! at 20 times a second
    //10 is way too slow and 30 was a bit too fast 
    setInterval(update,1000/20)
   
}

// what draws the canvas and will be used to render
function update(){
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,canvas.width, canvas.height)

    main();
}


// the function that holds all functions 
function main(){
    
    console.log(gameState)
    if (gameState === 0){
    drawSnake();
    snakeX += velocityX * blockSize
    snakeY += velocityY * blockSize
    drawPellets();
    detectCollision();
    detectBorders();
    addToSnake();

    }else if (gameState === 1 ){
        gameOver();
    }else if (gameState === 2){
        menu();
    }






}

// draws the player
function drawSnake(){
    ctx.fillStyle = 'red'
    ctx.fillRect(snakeX,snakeY,25,25);
}

// draws pellets 'snake food'
function drawPellets(){
    ctx.fillStyle = 'white';
    ctx.fillRect(pelletX,pelletY,25,25) 

}


//detects if the player "eats" a pellet, and adds it to the snakebody array
// gives the new pellet random coordinates and draws it
function detectCollision(){

    if (snakeX == pelletX && snakeY == pelletY){
        snakeBody.push([pelletX,pelletY])    
        pelletX = Math.floor(Math.random() * column) * blockSize;
        pelletY = Math.floor(Math.random() * row) * blockSize;
        drawPellets();
    }

}

// checks perimeter of canvas to see if there is a game over
function detectBorders(){

    if (snakeX < -25|| snakeX > canvas.width || snakeY < -25 || snakeY > canvas.height){
        gameState = 1
    }


}
// counts the array body and gets the coordinates from the previous pellet
//draws them behind the snake head 
// second for loop makes sure the body doesnt split of during turns
//sets snakebody at index 0 equal to snakehead coordinates
function addToSnake(){

    for (let i = 0; i < snakeBody.length; i++){
        ctx.fillStyle = 'red';
        ctx.fillRect(snakeBody[i][0], snakeBody[i][1],25,25)
    
    }
    for (let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1]
    
     }
     if (snakeBody.length){
         snakeBody[0] = [snakeX,snakeY]
    }

}

function gameOver(){

    ctx.font = "100px Karmatic Arcade"
    ctx.fillStyle = 'white'
    ctx.fillText("Game Over!", 50,300)

}

function menu(){
    
     ctx.fillStyle = 'black'
     canvas.width = screen.width
     canvas.height = screen.height
     document.getElementById('canvas').style.marginTop = 0;
     document.getElementById('title').style.display = 'none'
     ctx.fillRect(0,0,canvas.width,canvas.height)
   
    ctx.font = '100px arial'
    ctx.fillStyle = 'white' 
    ctx.fillText('Snake',canvas.width/2 - 150,canvas.height/2 - 200)
    ctx.font = '40px arial'
    ctx.fillText("Classic",650,350)
    ctx.fillText("Arcade",650,425)

    document.addEventListener('click', checkClick)
    function checkClick(e){
        console.log(e.clientX, e.clientY)
        if ((e.clientY > 315 && e.clientY < 355)&&(e.clientX > 650 && e.clientX < 785)){
            gameState = 0
        }
        if ((e.clientY > 395 && e.clientY < 430)&&(e.clientX > 645 && e.clientX < 775)){
            gameState = 3
        }


    }

}