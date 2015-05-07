'use strict';

var canvas = document.querySelector('.canvas');
canvas.width = 640;
canvas.height = 480;
var ctx = canvas.getContext('2d');
var textStyle = '50px Helvetica';
var game = {
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
    var offset = (canvas.width / 2) - ctx.measureText(game.text[game.currentLetter]).width;
    ctx.fillText(game.beforeText, offset, canvas.height / 2);
};

var renderCurrentLetter = function () {
    ctx.font = textStyle;
    ctx.fillStyle = 'green';
    ctx.textAlign = 'middle';
    ctx.textBaseline = 'middle';
    ctx.fillText(game.text[game.currentLetter], canvas.width / 2, canvas.height / 2);
};

var renderAfterText = function () {
    ctx.font = textStyle;
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    var offset = (canvas.width / 2);
    ctx.fillText(game.afterText, offset, canvas.height / 2);
};

var render = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderBeforeText();
    renderCurrentLetter();
    renderAfterText();
};

var main = function () {
    render();
    requestAnimationFrame(main);
};

var setGameTextIndex = function (i) {
    if (game.text[i] === ' ') {
        i++;
    }
    game.currentLetter = i;
    game.previousLetter = i - 1;
    game.nextLetter = i + 1;

    if (game.previousLetter >= 0) {
        game.beforeText = game.text.slice(0, i);
    } else {
        game.beforeText = '';
    }
    game.afterText = game.text.slice(game.nextLetter);
};

var startGame = function (text) {
    game.text = text;
    setGameTextIndex(0);
    main();
};

var handleKeydown = function (e) {
    var key = e.which || e.keyCode;
    var letter = String.fromCharCode(key).toLowerCase();

    if (letter === game.text[game.currentLetter].toLowerCase()) {
        setGameTextIndex(game.currentLetter + 1);
    }
};
var handleStartGameClick = function () {
    var text = document.querySelector('.words-input').value;
    if (!text) {
        return;
    }
    startGame(text);
};

document.addEventListener('keydown', handleKeydown, false);
document.querySelector('.start-game-button')
    .addEventListener('click', handleStartGameClick, false);
