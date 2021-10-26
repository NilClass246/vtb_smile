//=============================================================================
// 30FPS.js
//=============================================================================

/*:
 * @plugindesc Limits game refresh rate to 30FPS
 * @author ocean pollen
 *
 * @help This plugin does not provide plugin commands.
 */

;(function() {
    function extend(obj, name, func) {
      var orig = obj.prototype[name]
      obj.prototype[name] = function() {
        orig.call(this)
        func.call(this)
      }
    }
  
    extend(Game_CharacterBase, 'initialize', function() {
      this._moveSpeed++
    })
  
    var frameLimit = 1000/60,
        nextUpdate = 0,
        timeout = null
  
    SceneManager.requestUpdate = function() {
      if (!this._stopped) {
        var now = Date.now()
        if (now >= nextUpdate) {
          if (timeout) { clearTimeout(timeout); timeout = null }
          nextUpdate = now + frameLimit
          requestAnimationFrame(this.update.bind(this))
        } else {
          timeout = setTimeout((function() {
            nextUpdate = Date.now() + frameLimit
            requestAnimationFrame(this.update.bind(this))
          }).bind(this), nextUpdate - now)
        }
      }
    }
  
    /* test code; switch FPS and moveSpeed every 10 seconds
    var  is30 = true
    setInterval(function() {
      if (is30) { is30 = false; frameLimit = 1000/60; $gamePlayer._moveSpeed-- }
      else      { is30 = true;  frameLimit = 1000/30; $gamePlayer._moveSpeed++ }
    }, 10000)
    */
  
  })()