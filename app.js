const startButtonGame = document.querySelector('#start');
const screenGame = document.querySelectorAll('.screen');
const timeListGame = document.querySelector('#time-list');
const remainingTime = document.querySelector('#time');
const board = document.querySelector('#board');
const colorSqaures = ['#32CD32', '#8B008B', '#800000', '#00FFFF', '#000080'];
let time = 0;
let score = 0;

const startGame = () => {
    setInterval(decreaseTime, 1000);
    onSetTime(time);
    onCreateRandomCircle();
};

const decreaseTime = () => {
    if (time === 0) {
        onFinishGame()
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`
        }
        onSetTime(current)
    }

};

const onSetTime = (value) => {
    remainingTime.innerHTML = `00:${value}`;
};

const onFinishGame = () => {
    board.innerHTML = `<h1>Ваш счёт: <span class = "primary">${score}</span></h1>`;
    remainingTime.parentNode.classList.add('hide');
};

const onCreateRandomCircle = () => {
    const circle = document.createElement('div');
    const sizeCicrle = onGetRandomNumber(10, 60);
    const { width, height } = board.getBoundingClientRect();
    const x = onGetRandomNumber(0, width - sizeCicrle);
    const y = onGetRandomNumber(0, height - sizeCicrle);
    circle.classList.add('circle');
    circle.style.width = `${sizeCicrle}px`;
    circle.style.height = `${sizeCicrle}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    board.append(circle);
    onSetColor(circle);
};

const onGetRandomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
};

board.addEventListener('click', evt => {
    if (evt.target.classList.contains('circle')) {
        score++;
        evt.target.remove();
        onCreateRandomCircle();
    }
});

startButtonGame.addEventListener('click', (evt) => {
    evt.preventDefault();
    screenGame[0].classList.add('up');
});

timeListGame.addEventListener('click', evt => {
    if (evt.target.classList.contains('time-btn')) {
        time = parseInt(evt.target.getAttribute('data-time'));
        screenGame[1].classList.add('up');
        startGame();
    }
});

const onSetColor = (element) => {
    const colorCircle = onGetRandomColor();
    element.style.background = colorCircle;
};

const onGetRandomColor = () => {
    const indexColor = Math.floor(Math.random() * colorSqaures.length);
    return colorSqaures[indexColor];
};