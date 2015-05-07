'use strict';

var startGameButton = document.querySelector('.start-game-button');
var canvas = document.querySelector('.canvas');
canvas.width = 640;
canvas.height = 480;
var ctx = canvas.getContext('2d');
var textStyle = '50px Helvetica';
var startTime;
var time;
var game = {
    state: '',
    text: '',
    beforeText: '',
    afterText: '',
    currentLetter: 0,
    previousLetter: null,
    nextLetter: null
};

var renderBeforeText = function () {
    ctx.font = textStyle;
    ctx.fillStyle = 'black';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    var offset = (canvas.width / 2) - (ctx.measureText(game.text[game.currentLetter]).width / 2);
    ctx.fillText(game.beforeText, offset, canvas.height / 2);
};

var renderCurrentLetter = function () {
    ctx.font = textStyle;
    ctx.fillStyle = 'green';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(game.text[game.currentLetter], canvas.width / 2, canvas.height / 2);
};

var renderAfterText = function () {
    ctx.font = textStyle;
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    var offset = (canvas.width / 2) + (ctx.measureText(game.text[game.currentLetter]).width / 2);
    ctx.fillText(game.afterText, offset, canvas.height / 2);
};

var renderGame = function () {
    renderBeforeText();
    renderCurrentLetter();
    renderAfterText();
};

var renderHighScore = function () {
    ctx.font = '80px Helvetica';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(time + ' seconds', canvas.width / 2, canvas.height / 2);
};

var main = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    switch (game.state) {
        case 'game':
            renderGame();
            break;

        case 'highScore':
            renderHighScore();
            break;
    }
    requestAnimationFrame(main);
};

var setGameTextIndex = function (i) {
    if (game.text[i] === ' ') {
        i++;
    }
    game.currentLetter = i;
    game.previousLetter = i - 1;
    game.nextLetter = i + 1;

    game.beforeText = game.text.slice(0, i);
    game.afterText = game.text.slice(game.nextLetter);
};

var startGame = function (text) {
    text = text.trim();
    game.state = 'game';
    game.text = text;
    setGameTextIndex(0);
    main();
};

var handleKeydown = function (e) {
    if (!game.text[game.nextLetter]) {
        var endTime = new Date().getTime();
        time = parseFloat(((endTime - startTime) / 1000).toFixed(2));
        document.removeEventListener('keydown', handleKeydown, false);
        game.state = 'highScore';
        return;
    }
    var key = e.which || e.keyCode;
    var letter = String.fromCharCode(key).toLowerCase();

    if (letter === game.text[game.currentLetter].toLowerCase()) {
        if (game.currentLetter === 0) {
            startTime = new Date().getTime();
        }
        setGameTextIndex(game.currentLetter + 1);
    }
};

var handleStartGameClick = function () {
    startGameButton.blur();
    var text = document.querySelector('.words-input').value;
    if (!text) {
        return;
    }

    document.addEventListener('keydown', handleKeydown, false);
    startGame(text);
};

startGameButton.addEventListener('click', handleStartGameClick, false);
