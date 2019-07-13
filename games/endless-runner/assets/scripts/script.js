//  Game script for Controller.
let game = new Game();

window.addEventListener('keydown', (e) =>{
    switch(e.keyCode){
        case 80 : // key P
            game.pause();
            break;
        case 13 : // key enter
            if(e.target == document.getElementById("name"))
                game.submit();
            break;
    }
});

canvas.addEventListener('mousedown', ()=>{
    game.handleDown();
});

canvas.addEventListener('mouseup', ()=>{
    game.handleUp();
});

btnStart.addEventListener('click', () => {
    startContainer.setAttribute('class', 'start-container hidden');
    game.init();
});

btnRestart.addEventListener('click', () => {
    game = new Game();
    game.init();

    canvas.setAttribute('class', '');
    loseContainer.setAttribute('class', 'lose-container hidden');
    formHighscore.setAttribute('class', 'get-highscore hidden');
    gameover.setAttribute('class', 'gameover hidden');

    if(localStorage.highest == 0){
        highscoreContainer.setAttribute('class', 'highscore-container hidden');
    }else{
        highscoreContainer.setAttribute('class', 'highscore-container');
        let data = JSON.parse(localStorage.getItem('highscores'));
        hname.innerText = data.name;
        hscore.innerText = data.score;
    }
});

btnSubmit.addEventListener('click', () => {
    game.submit();
});

if(localStorage.highest == 0){
    highscoreContainer.setAttribute('class', 'highscore-container hidden');
}else{
    highscoreContainer.setAttribute('class', 'highscore-container');
    let data = JSON.parse(localStorage.getItem('highscores'));
    hname.innerText = data.name;
    hscore.innerText = data.score;
}
