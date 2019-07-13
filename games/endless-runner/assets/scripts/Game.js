// Game class.
// For game engine.

class Game{
    constructor() {
        let imgBgBack = [
            'assets/img/background/bg_back_A.png',
            'assets/img/background/bg_back_B.png',
            'assets/img/background/bg_back_A.png'];
        this.bgBack = new Background(SPEED.bgBack, imgBgBack);

        let imgBgMiddle = [
            'assets/img/background/bg_middle_A.png',
            'assets/img/background/bg_middle_B.png',
            'assets/img/background/bg_middle_C.png',
            'assets/img/background/bg_middle_A.png'
        ];
        this.bgMiddle = new Background(SPEED.bgMiddle, imgBgMiddle);

        let imgBgFront = [
            'assets/img/background/bg_front_ground_A.png',
            'assets/img/background/bg_front_ground_B.png',
            'assets/img/background/bg_front_ground_C.png',
            'assets/img/background/bg_front_ground_A.png'];
        this.bgFront = new Background(SPEED.bgFront, imgBgFront);

        let imgBgSuperFront = [
            'assets/img/background/bg_superFront_A.png',
            'assets/img/background/bg_superFront_B.png',
            'assets/img/background/bg_superFront_C.png',
            'assets/img/background/bg_superFront_A.png'];
        this.bgSuperFront = new Background(SPEED.bgFront, imgBgSuperFront);

        this.dragon = new Dragon();
        this.coin = new Coin();
        this.coin.generate(WIDTH + Math.floor(Math.random() * 400), 120 + Math.floor(Math.random() * 200));

        this.obstacle = new Obstacle();
        this.obstacle.generate(WIDTH + Math.floor(Math.random() * 200), true);

        this.textLive = new Text(30, 50, "Live : "+LIVE);
        this.textScore = new Text(200, 50, "Score : 0");

        // Setting game
        this.currentTime = new Date().getSeconds();
        this.time   = 0;
        this.score  = 0;
        this.live = LIVE;
        this.paused = false;

        if(localStorage.highest == "null"){
            localStorage.highest = 0;
        }
    }

    looping(){
        this.draw();
        if(this.live == 0){
            this.over();
            return;
        }

        this.checkCoinCollide();
        this.checkObstacleCollide();

        // Set time
        if(this.currentTime != new Date().getSeconds()){
            this.time++;
            if(this.time % 5 == 0){
                this.coin.generate(WIDTH + Math.floor(Math.random() * 400), 120 + Math.floor(Math.random() * 200));
            }

            if(this.time % 2 == 0) {
                this.obstacle.generate(WIDTH + Math.floor(Math.random() * 200), true);
            }

            if(this.time % 3 == 0){
                this.obstacle.generate(WIDTH + Math.floor(Math.random() * 500), false);
            }

            this.currentTime = new Date().getSeconds();
        }

        this.repeater = window.requestAnimationFrame(this.looping.bind(this));
    }

    draw(){
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        ctx.save();
        ctx.restore();

        this.bgBack.draw();
        this.bgMiddle.draw();
        this.bgFront.draw();

        this.coin.draw();
        this.obstacle.draw();
        this.dragon.draw();

        this.bgSuperFront.draw();

        this.textLive.draw();
        this.textScore.draw();
    }

    checkCoinCollide(){
        let gap = 35;

        for(let i = 0; i < this.coin.list.length; i++){
            if(this.coin.list[i].x - gap >= this.dragon.x
                && this.coin.list[i].x + gap <= this.dragon.x + this.dragon.size
                && this.coin.list[i].y - gap >= this.dragon.y
                && this.coin.list[i].y + gap <= this.dragon.y + this.dragon.size)
            {
                this.coin.list.splice(i, 1);
                this.score += 20;
                this.textScore.update("Score : "+this.score);
            }
        }
    }

    checkObstacleCollide(){
        let gap = 35;

        for(let i = 0; i < this.obstacle.list.length; i++){
            if(!this.obstacle.list[i].touched) {
                if(this.obstacle.list[i].y == 40) {
                    if (this.obstacle.list[i].x - gap >= this.dragon.x
                        && this.obstacle.list[i].x + gap <= this.dragon.x + this.dragon.size
                        && this.obstacle.list[i].y - gap + this.obstacle.height >= this.dragon.y
                        && this.obstacle.list[i].y + gap <= this.dragon.y + this.dragon.size)
                    {
                        this.obstacle.list[i].touched = true;
                        this.live -= 1;
                        this.textLive.update("Live : "+this.live);

                    }
                }else{
                    if (this.obstacle.list[i].x - gap >= this.dragon.x
                        && this.obstacle.list[i].x + gap <= this.dragon.x + this.dragon.size
                        && this.obstacle.list[i].y - gap + this.obstacle.height >= this.dragon.y
                        && this.obstacle.list[i].y + gap <= this.dragon.y + this.dragon.size)
                    {
                        this.obstacle.list[i].touched = true;
                        this.live -= 1;
                        this.textLive.update("Live : "+this.live);

                    }
                }
            }
        }
    }

    over(){
        window.cancelAnimationFrame(this.repeater);
        canvas.setAttribute('class', 'paused');
        loseContainer.setAttribute('class', 'pause-container');

        console.log()
        if(parseInt(localStorage.highest) < this.score){
            formHighscore.setAttribute('class', 'get-highscore');
        }else{
            gameover.setAttribute('class', 'gameover');
        }
    }

    pause(){
        if(!this.paused){
            window.cancelAnimationFrame(this.repeater);
            canvas.setAttribute('class', 'paused');
            pauseContainer.setAttribute('class', 'pause-container');

            this.paused = true;
        }else{
            this.looping();
            canvas.setAttribute('class', '');
            pauseContainer.setAttribute('class', 'pause-container hidden');

            this.paused = false;
        }
    }

    submit(){
        let name = document.getElementById('name');
        if(name.value == ''){
            alert("Insert your name please!");
        }else{
            localStorage.setItem('highscores', JSON.stringify({
                    name : name.value,
                    score : this.score
                }));

            localStorage.highest = this.score;
            alert("Data berhasil ditambahkan!");

            setTimeout(()=>{
                btnRestart.click();
            }, 3000);
        }
    }

    handleDown(){
        this.dragon.y -= SPEED.fly;
        this.up = window.requestAnimationFrame(this.handleDown.bind(this));
    }

    handleUp(){
        window.cancelAnimationFrame(this.up);
    }

    init(){
        this.looping();
    }
}