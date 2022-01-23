var SmileManager = SmileManager || {};

//====================

SmileManager.onEndingRepair = false;
SmileManager.lastRepairingSuccess = false;
SmileManager.onEndingRepairManager = false; 
SmileManager.isRepairingFinished  = false;

SmileManager.getGeneratorPositions = function(){
    var positions = [1];
    var results = [];
    for (var i = 0; i< 5; i++){
        if(positions.length>0){
            results.push(positions.splice(Math.random()*positions.length, 1)[0]);
        }else{
            break;
        }
    }
    return results;
}

function RepairGameManager(){
    this.initialize.apply(this, arguments);
}

RepairGameManager.prototype = Object.create(Sprite.prototype);
RepairGameManager.prototype.constructor = RepairGameManager;

RepairGameManager.prototype.initialize = function(ID){
    Sprite.prototype.initialize.call(this);
    this.maxProgress = 180;
    this.ID = ID;
    this.progress = $gameVariables.value(ID);
    this.progressBar = new RepairProgressBar();
    this.progressBar.setProgress(this.progress/this.maxProgress);
    this.addChild(this.progressBar);
    this.currentGame = null;
    this.isInGame = false;

    this.exitButton = new RepairExitButton(this);
    this.addChild(this.exitButton);
    this.renderRepairGame();
}

RepairGameManager.prototype.update = function(){
    Sprite.prototype.update.call(this);

    if(!this.isInGame){
        this.progress+=1;
        this.progressBar.setProgress(this.progress/this.maxProgress);
        if(this.progress==this.maxProgress){
            this.onSuccess();
        }
        //3%概率进入游戏
        if(SmileManager.randomnize(0.02)&&!SmileManager.onEndingRepair){
            this.renderRepairGame();
        }
    }

    if(SmileManager.onEndingRepair){
        if(SmileManager.lastRepairingSuccess){
            this.isInGame=false;
        }else{
            this.onFailure();
        }
        SmileManager.onEndingRepair = false;
    }

    if(SmileManager.GetHp()<=0){
        this.selfExiting();
    }

    if(TouchInput.isTriggered()){
        var t = this.isTouched(this.exitButton);
        console.log(t);
        if(t){
            this.selfExiting();
        }
        if(this.isInGame&&!t){
            this.currentGame.touch();
        }
    }

    if(Input.isTriggered("ok")){
        this.currentGame.touch();
    }

    if(Input.isTriggered("cancel")){
        this.selfExiting();
    }
}

RepairGameManager.prototype.selfExiting = function(){
    SmileManager.isRepairingFinished = false;
    SmileManager.isSelfExiting = true;
    SceneManager._scene.removeChild(this.currentGame);
    this.terminate();
}

RepairGameManager.prototype.onFailure = function(){
    SmileManager.isRepairingFinished = false;
    this.terminate();
}

RepairGameManager.prototype.onSuccess = function(){
    SmileManager.isRepairingFinished = true;
    this.terminate();
}

RepairGameManager.prototype.terminate = function(){
    SmileManager.onEndingRepairManager = true;
    this.isInGame = false;
    console.log(this.ID);
    $gameVariables.setValue(this.ID, this.progress);
    this.destroy();
}

RepairGameManager.prototype.renderRepairGame = function(){
    this.isInGame = true;
    this.currentGame = new RepairGame($gameVariables.value(56));
    SceneManager._scene.addChild(this.currentGame);

    this.currentText = new RepairText();
    this.currentText.move((Graphics.boxWidth-100)/2, 200);
    this.addChild(this.currentText);
}

RepairGameManager.prototype.isTouched = function(sprite){
    var cw = sprite.bitmap.width;
    var ch = sprite.bitmap.height;
    //console.log(cw);

    if (TouchInput.x < sprite.x) {return false};
    if (TouchInput.x > sprite.x + cw) {return false};
    if (TouchInput.y < sprite.y) {return false};
    if (TouchInput.y > sprite.y + ch) {return false};
    return true;	

}

function RepairGame(){
    this.initialize.apply(this, arguments);
}

RepairGame.prototype = Object.create(Sprite.prototype);
RepairGame.prototype.constructor = RepairGame;

/**
 * Performs a block transfer.
 *
 * @method blt
 * @param {Bitmap} source The bitmap to draw
 * @param {Number} sx The x coordinate in the source
 * @param {Number} sy The y coordinate in the source
 * @param {Number} sw The width of the source image
 * @param {Number} sh The height of the source image
 * @param {Number} dx The x coordinate in the destination
 * @param {Number} dy The y coordinate in the destination
 * @param {Number} [dw=sw] The width to draw the image in the destination
 * @param {Number} [dh=sh] The height to draw the image in the destination
 */
 //Bitmap.prototype.blt = function(source, sx, sy, sw, sh, dx, dy, dw, dh) {

RepairGame.prototype.initialize = function(difficulty){
    Sprite.prototype.initialize.call(this);
    var xrate = Graphics.boxWidth/375;
    var yrate = Graphics.boxHeight/812;
    var rate = (Graphics.boxWidth>Graphics.boxHeight)?yrate:xrate;
    this.anchor.x = 0.5;

    this.difficulty = difficulty;
    var length = Graphics.boxWidth-20*xrate;
    var height = 22*yrate;
    this.barFrame = new Sprite();
    var barFrameBitmap = new Bitmap(length+4, height);
    var barFrameSource = ImageManager.loadPicture("bar/BarFrame");
    barFrameBitmap.blt(barFrameSource, 0,0,8,22,0,0,8,height);
    barFrameBitmap.blt(barFrameSource, 8,0,132,22,8,0,length-8*2+4,height);
    barFrameBitmap.blt(barFrameSource, 140,0,8,22,length-8+4,0,8,height);
    this.barFrame.bitmap = barFrameBitmap;
    this.barFrame.x = -length/2-2;
    this.backgroundBar = new Sprite(ImageManager.loadPicture("bar/BarGrad"));
    this.backgroundBar.scale.x = length/120;
    this.backgroundBar.scale.y = (height-2*yrate)/250;
    this.backgroundBar.x = -length/2
    //this.backgroundBar.y +=2;

    this.amount = 100;
    this.current_amount = 0;
    this.selected_amount = 100*(1/this.difficulty);
    this.start_amount = (1-this.selected_amount/this.amount)*Math.random()*this.amount;
    this.foregroundBar = new Sprite(ImageManager.loadPicture("bar/BarGradSuccess"));
    this.foregroundBar.scale.x = (length*(this.selected_amount/this.amount))/120;
    this.foregroundBar.scale.y = (height-2*yrate)/250;
    this.foregroundBar.x = length*(this.start_amount/this.amount)-length/2;
    this.foregroundBar.y +=2;

    this.cursor = new Sprite(ImageManager.loadPicture("arrow/Gear"));
    this.cursor.anchor.x = 0.5;
    this.cursor.anchor.y = 0.5;
    this.cursor.scale.x = 0.5*rate;
    this.cursor.scale.y = 0.5*rate;

    this.addChild(this.backgroundBar);
    this.addChild(this.foregroundBar);
    this.addChild(this.barFrame);
    this.cursor.y = 10;
    this.cursor.x = -length/2;
    this.addChild(this.cursor);
    this.step = length*(1/this.amount);

    this.move(Graphics.boxWidth/2, Graphics.boxHeight+20);
    gsap.to(this, 1, {
        x: this.x,
        y: Graphics.boxHeight/2,
        ease: Power2.easeOut,
        onComplete: this.getReady()
    })

    this.isTouched = false;
    this.startdelay=40;
    this.opacity -=100;
}

RepairGame.prototype.update = function(){
    if(!this.exiting){
        if(this.ready){
            this.startdelay-=1;
            if(this.startdelay<=0){
                this.opacity = 255;
                if((this.isTouched||this.current_amount>=this.amount)){
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
            }
        }
    }else{
        if(!this.exited){
            if(SmileManager.lastRepairingSuccess){
                gsap.to(this, 1, {
                    x: this.x,
                    y: Graphics.boxHeight+20,
                    ease: Power2.easeOut,
                    onComplete: ()=>{
                        this.destroy();
                    }
                })
                //SoundManager.playOk();
                
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
            this.exited = true;
        }
    }
}

RepairGame.prototype.getReady = function(){
    this.ready= true;
}

RepairGame.prototype.touch = function(){
    this.isTouched = true;
}

function RepairText(){
    this.initialize.apply(this, arguments);
}

RepairText.prototype = Object.create(Sprite.prototype);
RepairText.prototype.constructor = RepairText;

RepairText.prototype.initialize = function(){
    Sprite.prototype.initialize.call(this);
    this.bitmap = new Bitmap(100, 72);
    this.progress = 0;
    // (text, x, y, maxWidth, lineHeight, align)
    this.bitmap.drawText("{repairing}", 0, 0, 100, 36, "center");
    this.move((Graphics.boxWidth-100)/2, 200)
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
        //console.log(this.opacity);
    }
}


RepairText.prototype.exit = function(){
    this.exiting = true;
    gsap.to(this, 1, {
        opacity: 0,
        ease: Elastic.easeOut.config(1, 0.3),
        onComplete: this.destroy()
    })
}

SmileManager.startRepairing = function(ID){
    this.RGM = new RepairGameManager(ID);
    SceneManager._scene.addChild(this.RGM);

}

function RepairProgressBar(){
    this.initialize.apply(this, arguments);
}

RepairProgressBar.prototype = Object.create(Sprite.prototype);
RepairProgressBar.prototype.constructor = RepairProgressBar;

RepairProgressBar.prototype.initialize = function(){
    Sprite.prototype.initialize.call(this);
    var xrate = Graphics.boxWidth/375;
    var yrate = Graphics.boxHeight/812;
    this.anchor.x = 0.5;
    this.move(Graphics.boxWidth/2, 150*yrate);

    var length = Graphics.boxWidth-20*xrate;
    this.barLength = length;
    var height = 22*yrate;
    this.barFrame = new Sprite();
    var barFrameBitmap = new Bitmap(length+4, height);
    var barFrameSource = ImageManager.loadPicture("bar/BarFrame");
    barFrameBitmap.blt(barFrameSource, 0,0,8,22,0,0,8,height);
    barFrameBitmap.blt(barFrameSource, 8,0,132,22,8,0,length-8*2+4,height);
    barFrameBitmap.blt(barFrameSource, 140,0,8,22,length-8+4,0,8,height);
    this.barFrame.bitmap = barFrameBitmap;
    this.barFrame.x = -length/2;
    this.backgroundBar = new Sprite(ImageManager.loadPicture("bar/BarGrad"));
    this.backgroundBar.scale.x = length/120;
    this.backgroundBar.scale.y = (height-2*yrate)/250;
    this.backgroundBar.x = -length/2;
    //this.backgroundBar.y+=2;

    this.foregroundBar = new Sprite(ImageManager.loadPicture("bar/BarGradSuccess"));
    this.foregroundBar.scale.x = 0;
    this.foregroundBar.scale.y = (height-2*yrate)/250;
    this.foregroundBar.x = -length/2;
    //this.foregroundBar.y+=2;


    this.addChild(this.backgroundBar);
    this.addChild(this.foregroundBar);
    this.addChild(this.barFrame);
}

RepairProgressBar.prototype.setProgress = function(rate){
    this.foregroundBar.scale.x = this.barLength*rate/120
}

//========================================
// 退出按钮
function RepairExitButton(){
    this.initialize.apply(this, arguments);
}

RepairExitButton.prototype = Object.create(Sprite.prototype);
RepairExitButton.prototype.constructor = RepairExitButton;

RepairExitButton.prototype.initialize = function(manager){
    Sprite.prototype.initialize.call(this);
    this.manager = manager;
    this.bitmap = ImageManager.loadPicture("button");
    this.y=Graphics.boxHeight-36;
}

SmileManager.isSelfExiting = false;

// RepairExitButton.prototype.update = function(){
//     Sprite.prototype.update.call(this);
// }

//========================================
// 跳过按钮
function SkipButton(){
    this.initialize.apply(this, arguments);
}

SkipButton.prototype = Object.create(Sprite.prototype);
SkipButton.prototype.constructor = SkipButton;

SkipButton.prototype.initialize = function(){
    Sprite.prototype.initialize.call(this);
    this.bitmap = ImageManager.loadPicture("skip_button");
    this.y = Graphics.boxHeight-36;
}

SkipButton.prototype.isTouched = function(){
    var cw = this.bitmap.width;
    var ch = this.bitmap.height;
    //console.log(cw);

    if (TouchInput.x < this.x) {return false};
    if (TouchInput.x > this.x + cw) {return false};
    if (TouchInput.y < this.y) {return false};
    if (TouchInput.y > this.y + ch) {return false};
    return true;
}

SkipButton.prototype.update = function(){
    Sprite.prototype.update.call(this);
    if(this.isTouched()){
        $gameSwitches.setValue(5, false);
        $gameSwitches.setValue(6, true);
    }
}
//========================================
// 追逐战！
SmileManager.isSensored = false;

SmileManager.randomnize = function(p){
    var r = Math.random()*100;
    return (r<p*100);
}

SmileManager.calcDistance = function(){
    var dx = $gameVariables.value(50);
    var dy = $gameVariables.value(51);
    return Math.floor(Math.sqrt(dx*dx+dy*dy));
}

SmileManager.findEmptySlot = function(){
    var playerX = $gamePlayer.x;
    var playerY = $gamePlayer.y;

    var slotList = this.generateSlots(playerX, playerY, 7, 5);
    var slot = slotList[Math.floor(Math.random()*slotList.length)];
    $gameVariables.setValue(48, slot[0]);
    $gameVariables.setValue(49, slot[1]);
}

SmileManager.generateSlots = function(x, y, r, t) {
    var x1 = x-r;
    var x2 = x+r;
    var xt1 = x-t;
    var xt2 = x+t
    var y1 = y-r;
    var y2 = y+r;
    var yt1 = y-t;
    var yt2 = y+t;

    var slotList = [];
    for(var i = x1; i < x2; i++){
        for(var j = y1; j<y2; j++){
            if((i>xt1)&&(i<xt2)&&(j>yt1)&&(j<yt2)){
                // pass
            }else{
                if($gameMap.isGenerallyPassable(i, j)){
                    slotList.push([i, j]);
                }
            }
        }
    }

    return slotList;
}

Game_Map.prototype.isGenerallyPassable = function(x, y) {
    return (this.isPassable(x, y, 2)&&this.isPassable(x, y, 4)&&this.isPassable(x, y, 6)&&this.isPassable(x, y, 8)&&x>0&&y>0&&x<75&&y<53);
};

SmileManager.temps = SmileManager.temps || {};

SmileManager.justMoved = false;


//========================================
// 电机随机生成函数

SmileManager.renderGenerator = function(){
    var list = [61,62,63,64,65,67,68,69,70,71,72,73,74,75,76,77];
    SmileManager.renderSwitches(list, 5);
}

//========================================
// 躲藏柜随机生成函数
SmileManager.renderCase = function(){
    var list = [21,22,23,24,25,26];
    SmileManager.renderSwitches(list, 2);
}

//========================================
// 随机生成函数

SmileManager.renderSwitches = function(list, n){
    var result = [];
    for(var i=0; i<n; i++){
        var r = Math.floor(Math.random()*list.length);
        result.push(list.splice(r,1));
    }

    for(var j=0; j<result.length; j++){
        $gameSwitches.setValue(result[j], true);
    }
}

//========================================
// 成就

SmileManager.achievements = {};
SmileManager.achievements.isSecondLap = true;

//========================================
// 结算界面

function Window_Score(){
    this.initialize.apply(this, arguments);
}

Window_Score.prototype = Object.create(Window_Base.prototype);
Window_Score.prototype.constructor = Window_Score;

Window_Score.prototype.initialize = function(){
    Window_Base.prototype.initialize.call(this,0,-Graphics.boxHeight,Graphics.boxWidth,Graphics.boxHeight);
    this.drawText("{repaired_generator}"+$gameVariables.value(47), 0, 0);
    this.drawText("{repaired_generator}"+$gameVariables.value(47), 0, 28);
    gsap.to(this, 1, {
        x: this.x,
        y: 0,
        ease: Elastic.easeOut.config(1, 0.4),
        onComplete: this.getReady()
    })
}


//========================================
// 计时器

function timeCounter(){
    this.initialize.apply(this.arguments);
}

timeCounter.prototype = Object.create(Sprite.prototype);
timeCounter.prototype.constructor = timeCounter;

timeCounter.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this._min = 0;
    this._sec = 0;
    this._frames = 0;;
    this.running = false;
}

timeCounter.prototype.update = function(){
    Sprite.prototype.update.call(this);
    if(this.running){
        this._frames+=1;
        if(this._frames>=60){
            this._sec+=1;
        }
        if(this._sec>=60){
            this._min+=1;
        }
    }
}

timeCounter.prototype.startCounting = function(){

}