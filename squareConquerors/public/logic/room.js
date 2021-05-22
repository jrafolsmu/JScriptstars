const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const room = urlParams.get('id');
console.log("esto es room", room);


//Lógica del juego
document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll(".grid div");
    const grid = document.querySelector(".grid");
    const startBtn = document.querySelector(".start");
    const backBtn = document.querySelector(".back");

    const WIDTH = 30;

    let appleIndex;
    let appleIndex2;

    let currentSnake;
    let redSnake;
    let greenSnake;
    let yellowSnake;

    let direction;
    let redDirection;
    let greenDirection;
    let yellowDirection;

    let score = 0,
        redScore = 0,
        greenScore = 0,
        yellowScore = 0,
        lives,
        speed,
        intervalTime,
        interval,
        redInterval,
        greenInterval,
        yellowInterval,
        stopGame;

    lives = 2;

    //game start (host)
    const startGame = (users) => {
        socket.emit("new game", currentUser);

        intervalTime = 250;
        speed = 0.97;
        appleIndex = 0;
        stopGame = false;

        if (users.filter(user => user.usernumber === 0).length > 0) {
            clearInterval(interval);
            direction = 1;
            currentSnake = [32, 31, 30];
            interval = setInterval(moveOutcomes, intervalTime);
        }
        if (users.filter(user => user.usernumber === 1).length > 0) {
            clearInterval(redInterval);
            redDirection = 1;
            redSnake = [842, 841, 840];
            redInterval = setInterval(moveRedOutcomes, intervalTime);
        }
        if (users.filter(user => user.usernumber === 2).length > 0) {
            clearInterval(greenInterval);
            greenDirection = -1;
            greenSnake = [58, 59, 60];
            greenInterval = setInterval(moveGreenOutcomes, intervalTime);
        }
        if (users.filter(user => user.usernumber === 3).length > 0) {
            clearInterval(yellowInterval);
            yellowDirection = -1;
            yellowSnake = [868, 869, 870];
            yellowInterval = setInterval(moveYellowOutcomes, intervalTime);
        }
        //first apple
        randomApple(false);
    };

    //host user movement
    const moveOutcomes = () => {
        if ((currentSnake[0] + WIDTH >= WIDTH * WIDTH && direction === WIDTH) || (currentSnake[0] % WIDTH === 0 && direction === -1) || (currentSnake[0] % WIDTH === WIDTH - 1 && direction === 1) || (currentSnake[0] - WIDTH < 0 && direction === - WIDTH) || squares[currentSnake[0] + direction].classList.contains("snake")) {

            return clearInterval(interval);
        }

        const tail = currentSnake.pop();
        squares[tail].classList.remove("snake");
        currentSnake.unshift(currentSnake[0] + direction);

        // deals with snake getting apple
        if (squares[currentSnake[0]].classList.contains("apple")) {
            squares[currentSnake[0]].classList.remove("apple");
            if (squares[currentSnake[0]].classList.contains("apple2")) {
                squares[currentSnake[0]].classList.remove("apple2");
                score++;
            }
            socket.emit("eat apple", { appleIndex: currentSnake[0], room: currentUser.roomname, usernumber: 0 })
            squares[tail].classList.add("snake");
            currentSnake.push(tail);
            score++;
            intervalTime = intervalTime * speed;
            randomApple(true);
            clearInterval(interval);

            interval = setInterval(moveOutcomes, intervalTime);
        }
        //display snake
        socket.emit("display snake1", { snake: currentSnake, tail: tail, room: currentUser.roomname, score: score })
    };

    //second user movement
    const moveRedOutcomes = () => {
        if ((redSnake[0] + WIDTH >= WIDTH * WIDTH && redDirection === WIDTH) || (redSnake[0] % WIDTH === 0 && redDirection === -1) || (redSnake[0] % WIDTH === WIDTH - 1 && redDirection === 1) || (redSnake[0] - WIDTH < 0 && redDirection === - WIDTH) || squares[redSnake[0] + redDirection].classList.contains("snake2")) {

            return clearInterval(redInterval);
        }

        const tail = redSnake.pop();
        redSnake.unshift(redSnake[0] + redDirection);

        // deals with snake getting apple
        if (squares[redSnake[0]].classList.contains("apple")) {
            squares[redSnake[0]].classList.remove("apple");
            if (squares[redSnake[0]].classList.contains("apple2")) {
                squares[redSnake[0]].classList.remove("apple2");
                redScore++;
            }
            socket.emit("eat apple", { appleIndex: redSnake[0], room: currentUser.roomname, usernumber: 1 })
            squares[tail].classList.add("snake2");
            redSnake.push(tail);
            redScore++;
            intervalTime = intervalTime * speed;
            randomApple(true);
            clearInterval(redInterval);

            redInterval = setInterval(moveRedOutcomes, intervalTime);
        }
        //display snake
        socket.emit("display snake2", { snake: redSnake, tail: tail, room: currentUser.roomname, score: redScore })
    };

    //third user movement
    const moveGreenOutcomes = () => {
        if ((greenSnake[0] + WIDTH >= WIDTH * WIDTH && greenDirection === WIDTH) || (greenSnake[0] % WIDTH === 0 && greenDirection === -1) || (greenSnake[0] % WIDTH === WIDTH - 1 && greenDirection === 1) || (greenSnake[0] - WIDTH < 0 && greenDirection === - WIDTH) || squares[greenSnake[0] + greenDirection].classList.contains("snake3")) {

            return clearInterval(greenInterval);
        }

        const tail = greenSnake.pop();
        greenSnake.unshift(greenSnake[0] + greenDirection);

        // deals with snake getting apple
        if (squares[greenSnake[0]].classList.contains("apple")) {
            squares[greenSnake[0]].classList.remove("apple");
            if (squares[greenSnake[0]].classList.contains("apple2")) {
                squares[greenSnake[0]].classList.remove("apple2");
                greenScore++;
            }
            socket.emit("eat apple", { appleIndex: greenSnake[0], room: currentUser.roomname, usernumber: 1 })
            squares[tail].classList.add("snake3");
            greenSnake.push(tail);
            greenScore++;
            intervalTime = intervalTime * speed;
            randomApple(true);
            clearInterval(greenInterval);

            greenInterval = setInterval(moveGreenOutcomes, intervalTime);
        }
        //display snake
        socket.emit("display snake3", { snake: greenSnake, tail: tail, room: currentUser.roomname, score: greenScore })
    };

    //forth user movement
    const moveYellowOutcomes = () => {
        if ((yellowSnake[0] + WIDTH >= WIDTH * WIDTH && yellowDirection === WIDTH) || (yellowSnake[0] % WIDTH === 0 && yellowDirection === -1) || (yellowSnake[0] % WIDTH === WIDTH - 1 && yellowDirection === 1) || (yellowSnake[0] - WIDTH < 0 && yellowDirection === - WIDTH) || squares[yellowSnake[0] + yellowDirection].classList.contains("snake4")) {

            return clearInterval(yellowInterval);
        }

        const tail = yellowSnake.pop();
        yellowSnake.unshift(yellowSnake[0] + yellowDirection);

        // deals with snake getting apple
        if (squares[yellowSnake[0]].classList.contains("apple")) {
            squares[yellowSnake[0]].classList.remove("apple");
            if (squares[yellowSnake[0]].classList.contains("apple2")) {
                squares[yellowSnake[0]].classList.remove("apple2");
                yellowScore++;
            }
            socket.emit("eat apple", { appleIndex: yellowSnake[0], room: currentUser.roomname, usernumber: 1 })
            squares[tail].classList.add("snake4");
            yellowSnake.push(tail);
            yellowScore++;
            intervalTime = intervalTime * speed;
            randomApple(true);
            clearInterval(yellowInterval);

            yellowInterval = setInterval(moveYellowOutcomes, intervalTime);
        }
        //display snake
        socket.emit("display snake4", { snake: yellowSnake, tail: tail, room: currentUser.roomname, score: yellowScore })
    };


    //display snakes section
    const displaySnake = (snake, tail, score) => {
        console.log("score--", score);
        snake.forEach((index) => squares[index].classList.add("snake"));
        squares[tail].classList.remove("snake")
        document.getElementById("blue_score").textContent = score;
    }

    socket.on("display snake1", (data) => {
        displaySnake(data.snake, data.tail, data.score)
    })

    const displaySnake2 = (snake, tail, score) => {
        console.log("score2--", score);
        snake.forEach((index) => squares[index].classList.add("snake2"));
        squares[tail].classList.remove("snake2")
        document.getElementById("red_score").textContent = score;
    }

    socket.on("display snake2", (data) => {
        displaySnake2(data.snake, data.tail, data.score)
    })

    const displaySnake3 = (snake, tail, score) => {
        snake.forEach((index) => squares[index].classList.add("snake3"));
        squares[tail].classList.remove("snake3")
        document.getElementById("green_score").textContent = score;
    }

    socket.on("display snake3", (data) => {
        displaySnake3(data.snake, data.tail, data.score)
    })

    const displaySnake4 = (snake, tail, score) => {
        snake.forEach((index) => squares[index].classList.add("snake4"));
        squares[tail].classList.remove("snake4")
        document.getElementById("yellow_score").textContent = score;
    }

    socket.on("display snake4", (data) => {
        displaySnake4(data.snake, data.tail, data.score)
    })

    // control snakes section
    document.addEventListener("keydown", function (e) {
        if (e.keyCode >= 37 && e.keyCode <= 40)
            socket.emit("key press", { user: currentUser, pressedKey: e.keyCode })
    });

    socket.on('key press', (data) => {
        switch (data.user.usernumber) {
            case 0:
                control(data.pressedKey)
                break;
            case 1:
                redControl(data.pressedKey);
                break;
            case 2:
                greenControl(data.pressedKey);
                break;
            case 3:
                yellowControl(data.pressedKey);
                break;
            default:
                break;
        }
    })

    function control(key) {

        if (key === 39 && direction != -1)
            direction = 1;
        else if (key === 38 && direction != WIDTH)
            direction = - WIDTH;
        else if (key === 37 && direction != 1)
            direction = -1;
        else if (key === 40 && direction != - WIDTH)
            direction = WIDTH;

    }

    function redControl(key) {

        if (key === 39 && redDirection != -1)
            redDirection = 1;
        else if (key === 38 && redDirection != WIDTH)
            redDirection = - WIDTH;
        else if (key === 37 && redDirection != 1)
            redDirection = -1;
        else if (key === 40 && redDirection != - WIDTH)
            redDirection = WIDTH;

    }
    function greenControl(key) {

        if (key === 39 && greenDirection != -1)
            greenDirection = 1;
        else if (key === 38 && greenDirection != WIDTH)
            greenDirection = - WIDTH;
        else if (key === 37 && greenDirection != 1)
            greenDirection = -1;
        else if (key === 40 && greenDirection != - WIDTH)
            greenDirection = WIDTH;

    }
    function yellowControl(key) {

        if (key === 39 && yellowDirection != -1)
            yellowDirection = 1;
        else if (key === 38 && yellowDirection != WIDTH)
            yellowDirection = - WIDTH;
        else if (key === 37 && yellowDirection != 1)
            yellowDirection = -1;
        else if (key === 40 && yellowDirection != - WIDTH)
            yellowDirection = WIDTH;

    }
    // ///////////////

    //apple section
    //create new apple
    function randomApple(boolean) {
        if (score % 3 === 0 && boolean) {
            let apple;
            for (let index = 0; index < 2; index++) {
                do
                    apple = Math.floor(Math.random() * squares.length);
                while (squares[apple].classList.contains("snake"));
                if (index == 0)
                    appleIndex = apple;
                else
                    appleIndex2 = apple;
            }
            socket.emit("create apple", { appleIndex, appleIndex2, room: currentUser.roomname })
        }
        else {
            do
                appleIndex = Math.floor(Math.random() * squares.length);
            while (squares[appleIndex].classList.contains("snake"));
            socket.emit("create apple", { appleIndex, appleIndex2: null, room: currentUser.roomname })
        }
    }

    socket.on("create apple", (data) => {
        displayApple(data);
    })
    const displayApple = (data) => {
        if (data.appleIndex2) {
            squares[data.appleIndex2].classList.add("apple2");

            setTimeout(() => {
                squares[data.appleIndex2].classList.remove("apple2");
            }, 2000);
        }
        squares[data.appleIndex].classList.add("apple");
    }

    socket.on("eat apple", (data) => {
        removeApple(data.appleIndex)
    })
    const removeApple = (index) => {
        console.log("remove apple");
        squares[index].classList.remove("apple2");
        squares[index].classList.remove("apple");
    }

    //game start event
    startBtn.addEventListener("click", function () {
        socket.emit("game start", currentUser)
    });
    //game start(host)
    socket.on('game start', (data) => {
        startGame(data);
    })
    //new game
    socket.on("new game", () => {
        squares.forEach((element) => element.classList.remove("apple", "snake", "snake2", "snake3", "snake4"));
    })
    //exit game
    backBtn.addEventListener("click", function () {
        socket.emit("game end", currentUser);
        let datas = [];
        if (currentUser.usernumber === 0) {
            joinedUsers.map(user => {
                let data = {};
                switch (user.usernumber) {
                    case 0:
                        data = {
                            user: user.username,
                            score: score
                        }
                        break;
                    case 1:
                        data = {
                            user: user.username,
                            score: redScore
                        }
                        break;
                    case 2:
                        data = {
                            user: user.username,
                            score: greenScore
                        }
                        break;
                    case 3:
                        data = {
                            user: user.username,
                            score: yellowScore
                        }
                        break;
                    default:
                        break;
                }
                datas.push(data);
            })

            $.post("http://localhost:3000/api/score",
                {
                    data: datas,
                    room: currentUser.roomname
                })
        }
        goto();
    });
    socket.on('game end', (data) => {
        switch (data.usernumber) {
            case 0:
                clearInterval(interval);
                squares.forEach((element) => element.classList.remove("snake"));
                break;
            case 1:
                clearInterval(redInterval);
                squares.forEach((element) => element.classList.remove("snake2"));
                break;
            case 2:
                clearInterval(greenInterval);
                squares.forEach((element) => element.classList.remove("snake3"));
                break;
            case 3:
                clearInterval(yellowInterval);
                squares.forEach((element) => element.classList.remove("snake4"));
                break;
            default:
                break;
        }
    })

});

//Otras lógicas de room.pug


function logout() {
    localStorage.clear();
    location.assign("login.pug");
}

function goto() {
    window.location = "selectrooms.pug";
}

function getAvatar() {
    let username = window.localStorage.getItem('username');
    let avatar = window.localStorage.getItem('avatar');
    document.getElementById("avatar").setAttribute("src", avatar);
    if (avatar == null) {
        playersRegistered = window.localStorage.getItem('players');
        let savedPlayers = JSON.parse(playersRegistered);
        let playerLoggedIn = savedPlayers.find(player => player.username == username);
        avatar = playerLoggedIn.avatar;
        document.getElementById("avatar").setAttribute("src", avatar);
    }
}

function dinamicBackground() {
    if (room === 'reptilian') {
        document.body.style.backgroundImage = "url('../images/obama-reptiliano.jpeg')";
    }
    else if (room === 'simpsons') {
        document.body.style.backgroundImage = "url('../images/simpsonsall.jpeg')";
        document.querySelector("h3").setAttribute("style", "color: black!important");
    }
}


