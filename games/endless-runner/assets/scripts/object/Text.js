// Text class.
// For drawing Text object.

class Text{
    constructor(x, y, text){
        this.x = x;
        this.y = y;

        this.text = text;
    }

    update(text){
        this.text = text;
    }

    draw(){
        ctx.beginPath()
        ctx.fillStyle = "#fff";
        ctx.font = "30px Calibri";
        ctx.fillText(this.text, this.x, this.y);
        ctx.closePath();
    }
}