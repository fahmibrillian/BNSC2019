//Setting all config here.

let canvas = document.getElementById('board'),
    ctx = canvas.getContext('2d');

    //set canvas size = styled canvas size.
    canvas.width    = canvas.offsetWidth;
    canvas.height   = canvas.offsetHeight;

let WIDTH = canvas.width,
    HEIGHT = canvas.height;

    //init all dom variable
let btnStart     = document.getElementById('btnStart'),
    btnRestart  = document.getElementById('btnRestart'),
    btnExit     = document.getElementById('btnExit'),
    btnSubmit   = document.getElementById('btnSubmit'),
    startContainer   = document.getElementsByClassName('start-container')[0],
    pauseContainer   = document.getElementsByClassName('pause-container')[0],
    loseContainer   = document.getElementsByClassName('lose-container')[0],
    formHighscore   = document.getElementsByClassName('get-highscore')[0],
    gameover   = document.getElementsByClassName('gameover')[0],
    highscoreContainer = document.getElementsByClassName('highscore-container')[0],
    hname = document.getElementById('highscoreName'),
    hscore = document.getElementById('highscoreScore');

//setting game config
let LIVE        = 3;
let GRAVITY     = 3;
let HIGHSCORE   = localStorage.highscore || '';
let SPEED       = {
    fly : 6,
    bgBack : 2,
    bgMiddle : 4,
    bgFront : 6
};
