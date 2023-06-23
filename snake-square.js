let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let gameSize = 500;
let unitGame = 20;
ctx.fillStyle = "white";
ctx.fillRect(0,0,gameSize,gameSize);
let score = 0;
document.getElementById("score").innerHTML = "SCORE = " + score;

function Coordinates(x, y) {
    this.x = x;
    this.y = y;
}

function Snake() {
    this.bodySnake = [
        new Coordinates(unitGame * 10, unitGame * 10),
        new Coordinates(unitGame * 9, unitGame * 10)];

    this.unitMove = new Coordinates(1, 0);

    this.showSnake = function () {
        ctx.fillStyle = "red";
        ctx.fillRect(this.bodySnake[0].x, this.bodySnake[0].y, unitGame, unitGame)
        for (let i = 1; i < this.bodySnake.length; i++) {
            ctx.fillStyle = "blue";
            ctx.fillRect(this.bodySnake[i].x, this.bodySnake[i].y, unitGame, unitGame);
        }
    }

    this.clearSnake = function () {
        ctx.fillStyle = "white";
        for (let i = 0; i < this.bodySnake.length; i++) {
            ctx.fillRect(this.bodySnake[i].x, this.bodySnake[i].y, unitGame, unitGame);
        }
    }

    this.move = function () {
        this.clearSnake();

        for (let i = this.bodySnake.length - 1; i >=1; i--) {
            this.bodySnake[i].x = this.bodySnake[i - 1].x;
            this.bodySnake[i].y = this.bodySnake[i - 1].y;
        }
        this.bodySnake[0].x += this.unitMove.x * unitGame;
        this.bodySnake[0].y += this.unitMove.y * unitGame;
        this.showSnake();
    }

    this.eatFood = function (food) {
        if(food.x === this.bodySnake[0].x && food.y === this.bodySnake[0].y)
            return true;
    }

    this.updateSnake = function () {
        this.clearSnake();

        let addX = this.bodySnake[this.bodySnake.length - 1].x - this.bodySnake[this.bodySnake.length - 2].x;
        let addY = this.bodySnake[this.bodySnake.length - 1].y - this.bodySnake[this.bodySnake.length - 2].y;

        let newX = this.bodySnake[this.bodySnake.length - 1].x + addX;
        let newY = this.bodySnake[this.bodySnake.length - 1].y + addY;

        let newPart = new Coordinates(newX, newY);
        this.bodySnake.push(newPart);

        this.showSnake();
    }

    this.collision = function () {
        if(this.bodySnake[0].x < 0 || this.bodySnake[0].x > gameSize - unitGame || this.bodySnake[0].y < 0 || this.bodySnake[0].y > gameSize - unitGame) {
            return true;
        } else
        for (let i = 1; i < this.bodySnake.length; i++) {
            if (this.bodySnake[0].x === this.bodySnake[i].x && this.bodySnake[0].y === this.bodySnake[i].y) {
                return true;
            }
        }
    }
}

function Food(x, y) {
    this.x = x;
    this.y = y;

    this.showFood = function () {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, unitGame, unitGame);
    }

    this.clearFood = function () {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, unitGame, unitGame);
    }

    this.newFood = function () {
        this.clearFood();
        this.x = Math.floor(Math.floor((Math.random() * gameSize))/unitGame) * unitGame; //tao so nguyen ngau nhien trong tu 0 den gameSize
        this.y = Math.floor(Math.floor((Math.random() * gameSize))/unitGame) * unitGame; //math floor lay so nguyen thap hon gan nhat
        this.showFood();
    }

}

let snake = new Snake();
snake.showSnake();

let food = new Food();
food.newFood();

setInterval(() => {
    snake.move();
    if(snake.eatFood(food) === true) {
        snake.updateSnake();
        food.newFood();
        score += 1;
        document.getElementById("score").innerHTML = "SCORE = " + score;};
    if(snake.collision() === true) {
        snake.bodySnake = [];
        alert("END GAME" + "\n" + "YOUR SCORE = " + score);
        location.replace("index.html");
    }
},100);

let movingDirection = new Coordinates(1,0);

document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 37:        //left
            if(movingDirection.x === 1) break;
            snake.unitMove = new Coordinates(-1, 0);
            movingDirection = new Coordinates(-1,0);
            break;
        case 38:       //up
            if(movingDirection.y === 1) break;
            snake.unitMove = new Coordinates(0, -1);
            movingDirection = new Coordinates(0,-1);
            break;
        case 39:        //right
            if(movingDirection.x === -1) break;
            snake.unitMove = new Coordinates(1, 0);
            movingDirection = new Coordinates(1,0);
            break;
        case 40:        //down
            if(movingDirection.y === -1) break;
            snake.unitMove = new Coordinates(0, 1);
            movingDirection = new Coordinates(0,1);
            break;
        default:
            break;
    }
}