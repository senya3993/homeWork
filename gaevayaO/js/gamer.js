"use strict";
var kol1 = window.location.href.split("=")[4].split("*")[0];
var kol2 = window.location.href.split("*")[1].split("&")[0];
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
function resize(){
var canvasRatio = canvas.height / canvas.width;
var windowRatio = window.innerHeight / window.innerWidth;
var width;
var height;
if (windowRatio < canvasRatio) {
    height = window.innerHeight - 100;
    width = height / canvasRatio;
} else {
    width = window.innerWidth;
    height = width * canvasRatio;
}

canvas.style.width = width + 'px';
canvas.style.height = height + 'px';
};

window.addEventListener('resize', resize, false);
    var ballRadius = 20;
    var x = canvas.width/2;
    var y = canvas.height-20;
    var dx = 2;
    var dy = -2;
    var style0 = window.location.href.split("=")[3].split("&")[0];
    var style1 = new Image();
    style1.src = style0+'1.jpg';  
var style2 = new Image();
style2.src = style0+'2.png'; 
var style3 = new Image();
style3.src = style0+'3.jpg'; 
    var paddleHeight = 10;
    var paddleWidth = 100;
    var paddleX = canvas.width-paddleWidth;
    var rightPressed = false;
    var leftPressed = false;
    var brickRowCount = kol1;
    var brickColumnCount = kol2;
    var brickWidth = 55;
    var brickHeight = 20;
    var brickPadding = 10;
    var brickOffsetTop = 30;
    var brickOffsetLeft = 20;
    var score = 0;
    var lives = 4;

    var bricks = [];
    for(var c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(var r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);

    function keyDownHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = true;
        }
        else if(e.keyCode == 37) {
            leftPressed = true;
        }
    }
    function keyUpHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = false;
        }
        else if(e.keyCode == 37) {
            leftPressed = false;
        }
    }
    function mouseMoveHandler(e) {
        var relativeX = e.clientX - canvas.offsetLeft-paddleWidth/2;
        if(relativeX > 0 && relativeX < canvas.width - paddleWidth) {
            paddleX = relativeX;
        }
    }
    function collisionDetection() {
        for(var c=0; c<brickColumnCount; c++) {
            for(var r=0; r<brickRowCount; r++) {
                var b = bricks[c][r];
                if(b.status == 1) {
                    if(x > b.x && x < b.x+brickWidth*1.5 && y > b.y && y < b.y+brickHeight*1.5) {
                        dy = -dy;
                        b.status = 0;
                        score++;
                        if(score == brickRowCount*brickColumnCount) {
                            alert("YOU WIN, CONGRATS! YOUR SCORE  " + score);
                            var snd=new Audio("win.mp3");
                            snd.play();
                            document.location.reload();
                        }
                    }
                }
            }
        }
    }

    function drawBall() {
        ctx.drawImage(style2,x, y, 25, ballRadius);
        
    }

    function drawPaddle() {
       var paddle= ctx.drawImage(style1, paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);

    }
    function drawBricks(){
 
 for(c=0;c<brickColumnCount;++c){
   for(r=0;r<brickRowCount;++r){
      if(bricks[c][r].status==1){
        var brickX=(c*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY=(r*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x=brickX;
        bricks[c][r].y=brickY;
        ctx.drawImage(style3, brickX,brickY,brickWidth,brickHeight);
     }
   }
 }

}
    function drawScore() {
        ctx.font = "24px Arial";
        ctx.fillStyle = "#F5F5F5";
        ctx.strokeStyle = "black";
        ctx.strokeText("Score: "+score, 10, 21);
        ctx.fillText("Score: "+score, 8, 20);
    }
    function drawLives() {
        ctx.font = "24px Arial";
        ctx.fillStyle = "#F5F5F5";
        ctx.strokeStyle = "black";
        ctx.strokeText("Lives: "+lives, canvas.width-93, 21);
        ctx.fillText("Lives: "+lives, canvas.width-95, 20);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        drawLives();
        collisionDetection();

if (isMobile.any()) {
  imgElem.ontouchstart=TouchStart;
  imgElem.ontouchmove=TouchMove;
  imgElem.ontouchend=TouchEnd;

  var touchShiftX=0;
  function TouchStart(EO) {
    EO.preventDefault();
    var touchInfo=EO.targetTouches[0];
    touchShiftX=touchInfo.pageX-imgElem.offsetLeft;
  }

  function TouchEnd(EO) {
    EO.preventDefault();
  }

  function TouchMove(EO) {
    EO.preventDefault();
    var touchInfo=EO.targetTouches[0];
    paddleX = (touchInfo.pageX-touchShiftX)/1.5;
  }
}
        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if(y + dy < ballRadius) {
            dy = -dy;
        }
        else if(y + dy > canvas.height-3-ballRadius) {
            if(x > paddleX-15 && x < paddleX + paddleWidth+15) {
                dy = -dy;
            }
            else {
                lives--;
                if(!lives) {
                    alert("GAME OVER");
                    document.location.reload();
                }
                else {
                    x = canvas.width/2;
                    y = canvas.height-30;
                    dx = 3;
                    dy = -3;
                    paddleX = (canvas.width-paddleWidth)/2;
                }
            }
        }

        if(rightPressed && paddleX < canvas.width-paddleWidth) {
            paddleX += 7;
        }
        else if(leftPressed && paddleX > 0) {
            paddleX -= 7;
        }

        x += dx;
        y += dy;
        requestAnimationFrame(draw);
    }


