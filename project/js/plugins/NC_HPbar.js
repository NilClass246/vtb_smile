//=============================================================================
// NilCalss 插件 - 人物头顶血条
// NC_Shadow.js
//=============================================================================

var NC = NC || {}
NC.temps = NC.temps || {}

//=============================================================================
/*:
 * @plugindesc [人物头顶血条插件]
 * @author NilClass
 * 
 * @help
 * =============================================================================
 * +++ RM插件 - 人物头顶血条插件 +++
 * By NilClass
 * https://github.com/NilClass246
 * =============================================================================
 */

NC.temps.Spriteset_Map_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function () {
    NC.temps.Spriteset_Map_createTilemap.call(this);
    this._NC_HP_area = new Sprite();
    this._NC_HP_area.z = 3;
    this._tilemap.addChild(this._NC_HP_area);
}

NC.temps.Spriteset_Map_Update = Spriteset_Map.prototype.update;
Spriteset_Map.prototype.update = function () {
    NC.temps.Spriteset_Map_Update.call(this);
    this.NC_HP_updateHP();
};

Spriteset_Map.prototype.NC_HP_updateHP = function () {
    this._tilemap.removeChild(this._NC_HP_area);
    this._NC_HP_area = new Sprite();
    this._NC_HP_area.z = 3;
    this._tilemap.addChild(this._NC_HP_area);

    this.NC_HP_createHPBar();
};
Spriteset_Map.prototype.NC_HP_createHPBar = function() {
	var HPB = SmileManager.HPBarInstance;
	// if(!SmileManager.isHPBarShowing){
	// 	HPB.visible = false;
	// }else{
	// 	HPB.visible = true;
	// }

    HPB.x = $gamePlayer.screenX()-48;
    HPB.y = $gamePlayer.screenY() - 48-10;
	this._NC_HP_area.addChild(HPB);

}
//=============================================================================
// ** 状态控制
//=============================================================================

SmileManager = SmileManager || {};

SmileManager.isHPBarShowing = false;

SmileManager.reduceHP = function(value){
	SmileManager.HPBarInstance.show();
	SmileManager.HPBarInstance.changeValue(-value);
	SmileManager.isRegenerating = false;
}

SmileManager.isRegenerating = true;

SmileManager.GetHp = function(){
	return SmileManager.HPBarInstance.value;
}

//=============================================================================
// ** NC_HPBar 生命值条
//=============================================================================
function NC_HPBar(){
    this.initialize.apply(this, arguments);
}

NC_HPBar.prototype = Object.create(Sprite.prototype);
NC_HPBar.prototype.constructor = NC_HPBar;

NC_HPBar.prototype.initialize = function(){
    Sprite.prototype.initialize.call(this);
    this.value = 100;
	this.displayValue = this.value;
    this.maxValue = 100;

	this.gaugeBack = new PIXI.Graphics();
	this.gaugeBack.beginFill(0x000000);
	this.gaugeBack.drawRect(0, 0, 100, 10);
	this.gaugeBack.endFill();
	this.addChild(this.gaugeBack);

	var r = this.displayValue/this.maxValue;
	this.gaugeContent = new PIXI.Graphics();
	this.gaugeContent.beginFill(0x800000);
	this.gaugeContent.drawRect(2,2,r*96, 6);
	this.gaugeContent.endFill();
	this.addChild(this.gaugeContent);

	this.generatingCounter = 0;
	this.isShowing = false;
	this.opacity = 0;
}

NC_HPBar.prototype.update = function(){
	Sprite.prototype.update.call(this);
	if(SmileManager.isRegenerating){
		this.changeValue(0.1);
	}else{
		this.generatingCounter++;
		if(this.generatingCounter>=300){
			this.hide();
			this.generatingCounter=0;
			SmileManager.isRegenerating = true;
		}
	}
	if(this.displayValue!=this.value){
		this.displayValue+=(this.value-this.displayValue)/10;
	}
	this.gaugeContent.clear();
	var r = this.displayValue/this.maxValue;
	this.gaugeContent.beginFill(0x800000);
	this.gaugeContent.drawRect(2,2,r*96, 6);
	this.gaugeContent.endFill();
}

NC_HPBar.prototype.changeValue = function(value){
	this.value += value;
	this.value = this.value.clamp(0, 100);
}

NC_HPBar.prototype.show = function(){
	if(!this.isShowing){
		gsap.to(this, 1, {
			opacity: 255,
			ease: Power2.easeOut
		})
		this.isShowing = true;
	}
}

NC_HPBar.prototype.hide = function(){
	if(this.isShowing){
		gsap.to(this, 1, {
			opacity: 0,
			ease: Power2.easeIn
		})
		this.isShowing = false;
	}
}

SmileManager.HPBarInstance = new NC_HPBar();