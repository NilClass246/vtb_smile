var SmileManager = SmileManager || {};

//====================

SmileManager.onEndingRepair = false;
SmileManager.lastRepairingSuccess = false;

function RepairGame(){
    this.initialize.apply(this, arguments);
}

RepairGame.prototype = Object.create(Sprite.prototype);
RepairGame.prototype.constructor = RepairGame;

RepairGame.prototype.initialize = function(difficulty){
    Sprite.prototype.initialize.call(this);
    var xrate = Graphics.boxWidth/375;
    var yrate = Graphics.boxHeight/812;
    this.anchor.x = 0.5;

    this.difficulty = difficulty;
    var length = Graphics.boxWidth-20*xrate;
    this.backgroundBar = new PIXI.Graphics()
    .beginFill(0xffffff)
    .drawRect(-length/2,0, length, 20)
    .endFill();
    this.addChild(this.backgroundBar);
    this.forgroundBar = new PIXI.Graphics();
    this.cursor = new Sprite(ImageManager.loadPicture("arrow/RepairCursor"));
    this.cursor.anchor.x = 0.5;
    this.cursor.anchor.y = 0.5;
    this.amount = 100;
    this.current_amount = 0;
    this.selected_amount = 100*(1/this.difficulty);
    this.start_amount = (1-this.selected_amount/this.amount)*Math.random()*this.amount;
    this.forgroundBar.beginFill(0xffff66)
    .drawRect(length*(this.start_amount/this.amount)-length/2, 0, length*(this.selected_amount/this.amount), 20)
    .endFill();
    this.addChild(this.forgroundBar);
    this.cursor.y = 10;
    this.cursor.x = -length/2;
    this.addChild(this.cursor);
    this.step = length*(1/this.amount);
}

RepairGame.prototype.update = function(){
    if(!this.exiting){
        if((Input.isTriggered('ok')||TouchInput.isTriggered()||this.current_amount>=this.amount)&&this.ready){
            if(this.current_amount>=this.start_amount&&this.current_amount<=this.start_amount+this.selected_amount){
                SmileManager.lastRepairingSuccess = true;
                this.exiting = true;
            }else{
                SmileManager.lastRepairingSuccess = false;
                this.exiting = true;
            }
            SmileManager.onEndingRepair = true;
        }
        this.current_amount+= 1;
        this.cursor.x += this.step
    }else{
        if(!this.exited){
            if(SmileManager.lastRepairingSuccess){
                gsap.to(this, 1, {
                    x: Graphics.boxWidth*3/2,
                    y: this.y,
                    ease: Power2.easeOut,
                    onComplete: ()=>{
                        this.destroy();
                    }
                })
                SoundManager.playOk();
                
            }else{
                gsap.to(this, 0.1, {
                    rotation: this.rotation+1*Math.random()-0.5,
                    ease: Back.easeIn.config(1.7),
                })

                gsap.to(this, 1, {
                    x: this.x,
                    y: Graphics.boxHeight*1.5,
                    rotation: this.rotation+2*Math.random()-1,
                    ease: Back.easeIn.config(1.7),
                    onComplete: ()=>{
                        this.destroy();
                    }
                })
                SoundManager.playBuzzer();
            }
            SmileManager.RT.exit();
            this.exited = true;
        }
    }
}

RepairGame.prototype.getReady = function(){
    this.ready= true;
}

function RepairText(){
    this.initialize.apply(this, arguments);
}

RepairText.prototype = Object.create(Sprite.prototype);
RepairText.prototype.constructor = Object.create(Sprite.prototype);

RepairText.prototype.initialize = function(){
    Sprite.prototype.initialize.call(this);
    this.bitmap = new Bitmap(100, 72);
    this.progress = 0;
    // (text, x, y, maxWidth, lineHeight, align)
    this.bitmap.drawText("{reparing}", 0, 0, 100, 36, "center");
    this.bitmap.drawText(this.progress+ "/5", 0, 36, 100, 36, "center");
    this.opacity = 0;
    this.direction = 1;
}

RepairText.prototype.update = function(){
    Sprite.prototype.update.call(this);
    if(!this.exiting){
        this.opacity+=this.direction*5;
        if(this.opacity>=255||this.opacity<=0){
            this.direction*=-1;
        }
    }
}

RepairText.prototype.refreshProgress = function(){
    this.progress = 5-$gameVariables.value(46);
    console.log($gameVariables.value(46));
    this.bitmap.clear();
    this.bitmap.drawText("{reparing}", 0, 0, 100, 36, "center");
    console.log(this.progress)
    console.log(this.progress+ "/5")
    this.bitmap.drawText(this.progress+ "/5", 0, 36, 100, 36, "center");
}

RepairText.prototype.exit = function(){
    this.exiting = true;
    gsap.to(this, 1, {
        opacity: 0,
        ease: Elastic.easeOut.config(1, 0.3),
        onComplete: this.destroy()
    })
}

SmileManager.startRepairing = function(){
    this.RG = new RepairGame(2);
    this.RG.move(0-Graphics.boxWidth/2, Graphics.boxHeight/2);
    SceneManager._scene.addChild(this.RG);
    gsap.to(this.RG, 1, {
        x: Graphics.boxWidth/2,
        y: this.RG.y,
        ease: Power2.easeOut,
        onComplete: this.RG.getReady()
    })

    this.RT = new RepairText();
    this.RT.move((Graphics.boxWidth-100)/2, 200);
    SceneManager._scene.addChild(this.RT);

}




//========================================
// 血条

function HPbar(){
    this.initialize.apply(this, arguments);
}

HPbar.prototype = Object.create(Window_Base.prototype);
HPbar.prototype.constructor = HPbar;

HPbar.prototype.initialize = function(){
    Window_Base.prototype.initialize.call(this);
    this.removeChildAt(0);
    this.amount = 100;

}

HPbar.prototype.update = function(){
    Window_Base.prototype.update.call(this);

}

//========================================
// 追逐战！
SmileManager.isSensored = false;

SmileManager.randomnize = function(p){
    var r = Math.random()*100;
    return r<p*100;
}

SmileManager.calcDistance = function(){

}

SmileManager.temps = SmileManager.temps || {};

SmileManager.justMoved = false;


