/*:
 * @plugindesc v1.0.1 Plugin used to preload assets.
 * @author Dr.Yami
 *
 * @help
 * Open the Plugin with your favourite text editor and puts assets name there.
 * Videos preload only supports YSP - VideoPlayer
 */

var ysp = ysp || {};
ysp.Preloader = {};

// ----------------------------------------------------------------------------
// CONFIGURATION
// ----------------------------------------------------------------------------
ysp.Preloader.Config = {
    // Release MAP_BASED assets from memory when changing maps.
    releaseMapChange: true
};

// GLOBAL Preload, will be preloaded when start the game
ysp.Preloader.GLOBAL = {
    IMAGES: [
        'system/selected',
        "titles1/1",
        "titles1/2",
        "titles1/3",
        "titles1/4",
        "titles1/7",
        "titles1/8",
        "titles1/9",
        "system/Window_cyan",
        "system/Window_magenta",
        "system/Window_pink",
        "system/Window_purple",
        "system/Window_yellow",
        "faces/koyori",
        "faces/mashiro",
        "faces/mea",
        "faces/noe",
        "pictures/FishBanParticle",
    ],

    VIDEOS: [
    // webm is the only format supported.
    ]
};

// MAP_BASED Preload, will be preloaded for each map.
ysp.Preloader.MAP_BASED = {
    // TEMPLATE
    // ID: { IMAGES: [], VIDEOS: [] }
    8: {
        IMAGES: [
        // Insert something here
        "pictures/tachi/koyori_body",
        "pictures/tachi/koyori_normal",
        "pictures/tachi/koyori_o",
        "pictures/tachi/koyori_v",
        "pictures/tachi/noe_body",
        "pictures/tachi/noe_normal",
        "pictures/tachi/noe_o",
        "pictures/tachi/noe_v",
        "pictures/tachi/mashiro_body",
        "pictures/tachi/mashiro_normal",
        "pictures/tachi/mashiro_o",
        "pictures/tachi/mashiro_v",
        ],

        VIDEOS: [
        // Insert something here
        ]
    },

    1: {
        IMAGES: [
        // Insert something here
        "system/selected",
        "pictures/图",
        ],

        VIDEOS: [
        // Insert something here
        ]
    },

    9: {
        IMAGES: [
        // Insert something here
        "Map__charParticles/par_Rune3"
        ],

        VIDEOS: [
        // Insert something here
        ]
    },
    12:{
        IMAGES: [
            // Insert something here
            "pictures/FinalCG"
            ],
    
            VIDEOS: [
            // Insert something here
            ]
    }
    // END
};

// ----------------------------------------------------------------------------
// END CONFIGURATION
// ----------------------------------------------------------------------------

!function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var r={};e.m=t,e.c=r,e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=56)}([function(t,e){var r=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=r)},function(t,e,r){var n=r(21)("wks"),o=r(22),i=r(0).Symbol,u="function"==typeof i;(t.exports=function(t){return n[t]||(n[t]=u&&i[t]||(u?i:o)("Symbol."+t))}).store=n},function(t,e){var r=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=r)},function(t,e,r){t.exports=!r(16)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e,r){var n=r(11),o=r(19);t.exports=r(3)?function(t,e,r){return n.f(t,e,o(1,r))}:function(t,e,r){return t[e]=r,t}},function(t,e,r){var n=r(6);t.exports=function(t){if(!n(t))throw TypeError(t+" is not an object!");return t}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,r){var n=r(24),o=r(14);t.exports=function(t){return n(o(t))}},function(t,e){var r={}.hasOwnProperty;t.exports=function(t,e){return r.call(t,e)}},function(t,e){t.exports={}},function(t,e,r){var n=r(0),o=r(2),i=r(15),u=r(4),a=function(t,e,r){var c,f,s,l=t&a.F,p=t&a.G,d=t&a.S,v=t&a.P,y=t&a.B,h=t&a.W,_=p?o:o[e]||(o[e]={}),m=_.prototype,g=p?n:d?n[e]:(n[e]||{}).prototype;p&&(r=e);for(c in r)(f=!l&&g&&void 0!==g[c])&&c in _||(s=f?g[c]:r[c],_[c]=p&&"function"!=typeof g[c]?r[c]:y&&f?i(s,n):h&&g[c]==s?function(t){var e=function(e,r,n){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,r)}return new t(e,r,n)}return t.apply(this,arguments)};return e.prototype=t.prototype,e}(s):v&&"function"==typeof s?i(Function.call,s):s,v&&((_.virtual||(_.virtual={}))[c]=s,t&a.R&&m&&!m[c]&&u(m,c,s)))};a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,t.exports=a},function(t,e,r){var n=r(5),o=r(25),i=r(26),u=Object.defineProperty;e.f=r(3)?Object.defineProperty:function(t,e,r){if(n(t),e=i(e,!0),n(r),o)try{return u(t,e,r)}catch(t){}if("get"in r||"set"in r)throw TypeError("Accessors not supported!");return"value"in r&&(t[e]=r.value),t}},function(t,e){var r=Math.ceil,n=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?n:r)(t)}},function(t,e){var r={}.toString;t.exports=function(t){return r.call(t).slice(8,-1)}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,r){var n=r(20);t.exports=function(t,e,r){if(n(t),void 0===e)return t;switch(r){case 1:return function(r){return t.call(e,r)};case 2:return function(r,n){return t.call(e,r,n)};case 3:return function(r,n,o){return t.call(e,r,n,o)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,r){var n=r(21)("keys"),o=r(22);t.exports=function(t){return n[t]||(n[t]=o(t))}},function(t,e,r){var n=r(6),o=r(0).document,i=n(o)&&n(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,r){var n=r(0),o=n["__core-js_shared__"]||(n["__core-js_shared__"]={});t.exports=function(t){return o[t]||(o[t]={})}},function(t,e){var r=0,n=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++r+n).toString(36))}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,r){var n=r(13);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==n(t)?t.split(""):Object(t)}},function(t,e,r){t.exports=!r(3)&&!r(16)(function(){return 7!=Object.defineProperty(r(18)("div"),"a",{get:function(){return 7}}).a})},function(t,e,r){var n=r(6);t.exports=function(t,e){if(!n(t))return t;var r,o;if(e&&"function"==typeof(r=t.toString)&&!n(o=r.call(t)))return o;if("function"==typeof(r=t.valueOf)&&!n(o=r.call(t)))return o;if(!e&&"function"==typeof(r=t.toString)&&!n(o=r.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e,r){var n=r(31),o=r(23);t.exports=Object.keys||function(t){return n(t,o)}},function(t,e,r){var n=r(12),o=Math.min;t.exports=function(t){return t>0?o(n(t),9007199254740991):0}},function(t,e,r){var n=r(11).f,o=r(8),i=r(1)("toStringTag");t.exports=function(t,e,r){t&&!o(t=r?t:t.prototype,i)&&n(t,i,{configurable:!0,value:e})}},function(t,e,r){"use strict";var n=r(34),o=r(10),i=r(45),u=r(4),a=r(8),c=r(9),f=r(46),s=r(29),l=r(48),p=r(1)("iterator"),d=!([].keys&&"next"in[].keys()),v=function(){return this};t.exports=function(t,e,r,y,h,_,m){f(r,e,y);var g,x,w,O=function(t){if(!d&&t in S)return S[t];switch(t){case"keys":case"values":return function(){return new r(this,t)}}return function(){return new r(this,t)}},b=e+" Iterator",M="values"==h,P=!1,S=t.prototype,I=S[p]||S["@@iterator"]||h&&S[h],j=I||O(h),G=h?M?O("entries"):j:void 0,E="Array"==e?S.entries||I:I;if(E&&(w=l(E.call(new t)))!==Object.prototype&&(s(w,b,!0),n||a(w,p)||u(w,p,v)),M&&I&&"values"!==I.name&&(P=!0,j=function(){return I.call(this)}),n&&!m||!d&&!P&&S[p]||u(S,p,j),c[e]=j,c[b]=v,h)if(g={values:M?j:O("values"),keys:_?j:O("keys"),entries:G},m)for(x in g)x in S||i(S,x,g[x]);else o(o.P+o.F*(d||P),e,g);return g}},function(t,e,r){var n=r(8),o=r(7),i=r(32)(!1),u=r(17)("IE_PROTO");t.exports=function(t,e){var r,a=o(t),c=0,f=[];for(r in a)r!=u&&n(a,r)&&f.push(r);for(;e.length>c;)n(a,r=e[c++])&&(~i(f,r)||f.push(r));return f}},function(t,e,r){var n=r(7),o=r(28),i=r(33);t.exports=function(t){return function(e,r,u){var a,c=n(e),f=o(c.length),s=i(u,f);if(t&&r!=r){for(;f>s;)if((a=c[s++])!=a)return!0}else for(;f>s;s++)if((t||s in c)&&c[s]===r)return t||s||0;return!t&&-1}}},function(t,e,r){var n=r(12),o=Math.max,i=Math.min;t.exports=function(t,e){return t=n(t),t<0?o(t+e,0):i(t,e)}},function(t,e){t.exports=!0},function(t,e,r){var n=r(5),o=r(47),i=r(23),u=r(17)("IE_PROTO"),a=function(){},c=function(){var t,e=r(18)("iframe"),n=i.length;for(e.style.display="none",r(36).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write("<script>document.F=Object<\/script>"),t.close(),c=t.F;n--;)delete c.prototype[i[n]];return c()};t.exports=Object.create||function(t,e){var r;return null!==t?(a.prototype=n(t),r=new a,a.prototype=null,r[u]=t):r=c(),void 0===e?r:o(r,e)}},function(t,e,r){t.exports=r(0).document&&document.documentElement},function(t,e,r){var n=r(14);t.exports=function(t){return Object(n(t))}},function(t,e,r){var n=r(13),o=r(1)("toStringTag"),i="Arguments"==n(function(){return arguments}()),u=function(t,e){try{return t[e]}catch(t){}};t.exports=function(t){var e,r,a;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(r=u(e=Object(t),o))?r:i?n(e):"Object"==(a=n(e))&&"function"==typeof e.callee?"Arguments":a}},,function(t,e,r){t.exports={default:r(58),__esModule:!0}},function(t,e,r){r(42);for(var n=r(0),o=r(4),i=r(9),u=r(1)("toStringTag"),a=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],c=0;c<5;c++){var f=a[c],s=n[f],l=s&&s.prototype;l&&!l[u]&&o(l,u,f),i[f]=i.Array}},function(t,e,r){"use strict";var n=r(43),o=r(44),i=r(9),u=r(7);t.exports=r(30)(Array,"Array",function(t,e){this._t=u(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,r=this._i++;return!t||r>=t.length?(this._t=void 0,o(1)):"keys"==e?o(0,r):"values"==e?o(0,t[r]):o(0,[r,t[r]])},"values"),i.Arguments=i.Array,n("keys"),n("values"),n("entries")},function(t,e){t.exports=function(){}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,r){t.exports=r(4)},function(t,e,r){"use strict";var n=r(35),o=r(19),i=r(29),u={};r(4)(u,r(1)("iterator"),function(){return this}),t.exports=function(t,e,r){t.prototype=n(u,{next:o(1,r)}),i(t,e+" Iterator")}},function(t,e,r){var n=r(11),o=r(5),i=r(27);t.exports=r(3)?Object.defineProperties:function(t,e){o(t);for(var r,u=i(e),a=u.length,c=0;a>c;)n.f(t,r=u[c++],e[r]);return t}},function(t,e,r){var n=r(8),o=r(37),i=r(17)("IE_PROTO"),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),n(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},function(t,e,r){"use strict";var n=r(50)(!0);r(30)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,r=this._i;return r>=e.length?{value:void 0,done:!0}:(t=n(e,r),this._i+=t.length,{value:t,done:!1})})},function(t,e,r){var n=r(12),o=r(14);t.exports=function(t){return function(e,r){var i,u,a=String(o(e)),c=n(r),f=a.length;return c<0||c>=f?t?"":void 0:(i=a.charCodeAt(c),i<55296||i>56319||c+1===f||(u=a.charCodeAt(c+1))<56320||u>57343?t?a.charAt(c):i:t?a.slice(c,c+2):u-56320+(i-55296<<10)+65536)}}},function(t,e,r){var n=r(38),o=r(1)("iterator"),i=r(9);t.exports=r(2).getIteratorMethod=function(t){if(void 0!=t)return t[o]||t["@@iterator"]||i[n(t)]}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(t){window.ysp.VideoPlayer&&window.ysp.VideoPlayer.loadVideo(t)},o=function(t){window.ysp.VideoPlayer&&window.ysp.VideoPlayer.releaseVideo(t)},i=function(){return!window.ysp.VideoPlayer||window.ysp.VideoPlayer.isReady()};e.default={loadVideo:n,releaseVideo:o,isReady:i}},,function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(t){var e=t.split("/"),r=e.pop();return e.join("/")+"/"+encodeURIComponent(r)};e.default={encodeURIImageName:n}},,function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}var o=r(57),i=n(o),u=r(60),a=n(u),c=r(61),f=n(c),s=r(62),l=n(s),p=r(63),d=n(p);(0,i.default)(ImageCache),(0,a.default)(ImageManager),(0,f.default)(Scene_Boot),(0,l.default)(Scene_Base),(0,d.default)(Scene_Map),window.ysp=window.ysp||{},window.ysp.Preloader=window.ysp.Preloader||{}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(40),o=function(t){return t&&t.__esModule?t:{default:t}}(n);e.default=function(t){t.prototype.release=function(t){this._items[t]&&delete this._items[t]},t.prototype.addGroup=function(t,e){this._itemGroups=this._itemGroups||{},this._itemGroups[t]=this._itemGroups[t]||[],this._itemGroups[t].push(e)},t.prototype.releaseGroup=function(t){if(this._itemGroups=this._itemGroups||{},this._itemGroups[t]){var e=!0,r=!1,n=void 0;try{for(var i,u=(0,o.default)(this._itemGroups[t]);!(e=(i=u.next()).done);e=!0){var a=i.value;this.release(a)}}catch(t){r=!0,n=t}finally{try{!e&&u.return&&u.return()}finally{if(r)throw n}}delete this._itemGroups[t]}}}},function(t,e,r){r(41),r(49),t.exports=r(59)},function(t,e,r){var n=r(5),o=r(51);t.exports=r(2).getIterator=function(t){var e=o(t);if("function"!=typeof e)throw TypeError(t+" is not iterable!");return n(e.call(t))}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){t.releaseBitmap=function(t,e){var r=this._generateCacheKey(t,e);this._imageCache.release(r)},t.releaseGroup=function(t){this._imageCache.releaseGroup(t)};var e=t.loadNormalBitmap;t.loadNormalBitmap=function(t,r){var n=t,o=this._generateCacheKey(t,r);return this._imageCache.get(o)||this._imageCache.addGroup(n,o),e.call(this,t,r)}}},function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=r(40),i=n(o),u=r(52),a=n(u),c=r(54),f=n(c),s=function(){var t=!0,e=!1,r=void 0;try{for(var n,o=(0,i.default)(ysp.Preloader.GLOBAL.IMAGES);!(t=(n=o.next()).done);t=!0){var u=n.value,c="img/"+f.default.encodeURIImageName(u)+".png";ImageManager.reserveNormalBitmap(""+c,0,ImageManager._defaultReservationId)}}catch(t){e=!0,r=t}finally{try{!t&&o.return&&o.return()}finally{if(e)throw r}}var s=!0,l=!1,p=void 0;try{for(var d,v=(0,i.default)(ysp.Preloader.GLOBAL.VIDEOS);!(s=(d=v.next()).done);s=!0){var y=d.value;a.default.loadVideo(y)}}catch(t){l=!0,p=t}finally{try{!s&&v.return&&v.return()}finally{if(l)throw p}}};e.default=function(t){var e=t.loadSystemImages;t.loadSystemImages=function(){e.call(this),s()}}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(52),o=function(t){return t&&t.__esModule?t:{default:t}}(n);e.default=function(t){var e=t.prototype.isReady;t.prototype.isReady=function(){var t=o.default.isReady();return e.call(this)&&t}}},function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=r(40),i=n(o),u=r(52),a=n(u),c=r(54),f=n(c),s=function(t){if(ysp.Preloader.Config.releaseMapChange){var e=ysp.Preloader.MAP_BASED[t];if(e){var r=!0,n=!1,o=void 0;try{for(var u,c=(0,i.default)(e.IMAGES);!(r=(u=c.next()).done);r=!0){var f=u.value;ImageManager.releaseGroup("img/"+f+".png")}}catch(t){n=!0,o=t}finally{try{!r&&c.return&&c.return()}finally{if(n)throw o}}var s=!0,l=!1,p=void 0;try{for(var d,v=(0,i.default)(e.VIDEOS);!(s=(d=v.next()).done);s=!0){var y=d.value;a.default.releaseVideo(y)}}catch(t){l=!0,p=t}finally{try{!s&&v.return&&v.return()}finally{if(l)throw p}}}}},l=function(t){var e=ysp.Preloader.MAP_BASED[t];if(e){var r=!0,n=!1,o=void 0;try{for(var u,c=(0,i.default)(e.IMAGES);!(r=(u=c.next()).done);r=!0){var s=u.value,l="img/"+f.default.encodeURIImageName(s)+".png";ImageManager.reserveNormalBitmap(""+l,0,ImageManager._defaultReservationId)}}catch(t){n=!0,o=t}finally{try{!r&&c.return&&c.return()}finally{if(n)throw o}}var p=!0,d=!1,v=void 0;try{for(var y,h=(0,i.default)(e.VIDEOS);!(p=(y=h.next()).done);p=!0){var _=y.value;a.default.loadVideo(_)}}catch(t){d=!0,v=t}finally{try{!p&&h.return&&h.return()}finally{if(d)throw v}}}};e.default=function(t){var e=t.prototype.onMapLoaded;t.prototype.onMapLoaded=function(){s($gameMap.mapId()),e.call(this),l($gameMap.mapId())}}}]);
//# sourceMappingURL=YSP_Preloader.js.map