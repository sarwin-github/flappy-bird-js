// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"game-objects/bird.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SCORE_S = document.getElementById("audio-score");
var FLAP = document.getElementById("audio-flap");
var HIT = document.getElementById("audio-hit");
var SWOOSHING = document.getElementById("audio-swoosh");
var DIE = document.getElementById("audio-die");
var DEGREE = Math.PI / 180;
var frames = 0;

var Bird =
/*#__PURE__*/
function () {
  function Bird(ctx, cvs, sprite, state) {
    _classCallCheck(this, Bird);

    this.ctx = ctx;
    this.sprite = sprite;
    this.state = state;
    this.cvs = cvs;
    this.animation = [{
      sX: 276,
      sY: 112
    }, {
      sX: 276,
      sY: 139
    }, {
      sX: 276,
      sY: 164
    }, {
      sX: 276,
      sY: 139
    }];
    this.x = 50;
    this.y = 150;
    this.w = 34;
    this.h = 26;
    this.radius = 12;
    this.frame = 0;
    this.gravity = 0.25;
    this.jump = 4.6;
    this.speed = 0;
    this.rotation = 0;
    this.fgh = 112;
  }

  _createClass(Bird, [{
    key: "draw",
    value: function draw() {
      var bird = this.animation[this.frame];
      this.ctx.save();
      this.ctx.translate(this.x, this.y);
      this.ctx.rotate(this.rotation);
      this.ctx.drawImage(this.sprite, bird.sX, bird.sY, this.w, this.h, -this.w / 2, -this.h / 2, this.w, this.h);
      this.ctx.restore();
    }
  }, {
    key: "flap",
    value: function flap() {
      this.speed = -this.jump;
    }
  }, {
    key: "update",
    value: function update() {
      // IF THE GAME STATE IS GET READY STATE, THE BIRD MUST FLAP SLOWLY
      this.period = this.state.current == this.state.getReady ? 10 : 5; // WE INCREMENT THE FRAME BY 1, EACH PERIOD

      this.frame += frames % this.period == 0 ? 1 : 0; // FRAME GOES FROM 0 To 4, THEN AGAIN TO 0

      this.frame = this.frame % this.animation.length;

      if (this.state.current == this.state.getReady) {
        this.y = 150; // RESET POSITION OF THE BIRD AFTER GAME OVER

        this.rotation = 0 * DEGREE;
      } else {
        this.speed += this.gravity;
        this.y += this.speed;

        if (this.y + this.h / 2 >= this.cvs.height - this.fgh) {
          this.y = this.cvs.height - this.fgh - this.h / 2;

          if (this.state.current == this.state.game) {
            this.state.current = this.state.over;
            DIE.play();
          }
        } // IF THE SPEED IS GREATER THAN THE JUMP MEANS THE BIRD IS FALLING DOWN


        if (this.speed >= this.jump) {
          this.rotation = 45 * DEGREE;
          this.frame = 1;
        } else {
          this.rotation = -25 * DEGREE;
        }
      }

      frames++;
    }
  }, {
    key: "speedReset",
    value: function speedReset() {
      this.speed = 0;
    }
  }]);

  return Bird;
}();

exports.default = Bird;
},{}],"game-objects/foreground.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Foreground =
/*#__PURE__*/
function () {
  function Foreground(ctx, cvs, sprite, state) {
    _classCallCheck(this, Foreground);

    this.ctx = ctx;
    this.state = state;
    this.sprite = sprite;
    this.sX = 276;
    this.sY = 0;
    this.w = 224;
    this.h = 112;
    this.x = 0;
    this.y = cvs.height - 112;
    this.dx = 2;
  }

  _createClass(Foreground, [{
    key: "draw",
    value: function draw() {
      this.ctx.drawImage(this.sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
      this.ctx.drawImage(this.sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    }
  }, {
    key: "update",
    value: function update() {
      if (this.state.current == this.state.game) {
        this.x = (this.x - this.dx) % (this.w / 6);
      }
    }
  }]);

  return Foreground;
}();

exports.default = Foreground;
},{}],"game-objects/game-over.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GameOver =
/*#__PURE__*/
function () {
  function GameOver(ctx, cvs, sprite, state) {
    _classCallCheck(this, GameOver);

    this.ctx = ctx;
    this.sprite = sprite;
    this.state = state;
    this.sX = 175;
    this.sY = 228;
    this.w = 225;
    this.h = 202;
    this.x = cvs.width / 2 - 225 / 2;
    this.y = 90;
  }

  _createClass(GameOver, [{
    key: "draw",
    value: function draw() {
      if (this.state.current == this.state.over) {
        this.ctx.drawImage(this.sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
      }
    }
  }]);

  return GameOver;
}();

exports.default = GameOver;
},{}],"game-objects/get-ready.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GetReady =
/*#__PURE__*/
function () {
  function GetReady(ctx, cvs, sprite, state) {
    _classCallCheck(this, GetReady);

    this.ctx = ctx;
    this.state = state;
    this.sprite = sprite;
    this.sX = 0;
    this.sY = 228;
    this.w = 173;
    this.h = 152;
    this.x = cvs.width / 2 - 173 / 2;
    this.y = 80;
  }

  _createClass(GetReady, [{
    key: "draw",
    value: function draw() {
      if (this.state.current == this.state.getReady) {
        this.ctx.drawImage(this.sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
      }
    }
  }]);

  return GetReady;
}();

exports.default = GetReady;
},{}],"game-objects/background.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Background =
/*#__PURE__*/
function () {
  function Background(ctx, cvs, sprite) {
    _classCallCheck(this, Background);

    this.ctx = ctx;
    this.sprite = sprite;
    this.sX = 0;
    this.sY = 0;
    this.w = 275;
    this.h = 226;
    this.x = 0;
    this.y = cvs.height - 226;
  }

  _createClass(Background, [{
    key: "draw",
    value: function draw() {
      this.ctx.drawImage(this.sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
      this.ctx.drawImage(this.sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    }
  }]);

  return Background;
}();

exports.default = Background;
},{}],"game-objects/pipes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SCORE_S = document.getElementById("audio-score");
var FLAP = document.getElementById("audio-flap");
var HIT = document.getElementById("audio-hit");
var SWOOSHING = document.getElementById("audio-swoosh");
var DIE = document.getElementById("audio-die");
var frames = 0;

var Pipes =
/*#__PURE__*/
function () {
  function Pipes(ctx, cvs, sprite, state, bird, score) {
    _classCallCheck(this, Pipes);

    this.ctx = ctx;
    this.sprite = sprite;
    this.state = state;
    this.bird = bird;
    this.score = score;
    this.cvs = cvs;
    this.position = [];
    this.top = {
      sX: 553,
      sY: 0
    };
    this.bottom = {
      sX: 502,
      sY: 0
    };
    this.w = 53;
    this.h = 400;
    this.gap = 95;
    this.maxYPos = -150;
    this.dx = 2;
  }

  _createClass(Pipes, [{
    key: "draw",
    value: function draw() {
      for (var i = 0; i < this.position.length; i++) {
        var p = this.position[i];
        var topYPos = p.y;
        var bottomYPos = p.y + this.h + this.gap; // top pipe

        this.ctx.drawImage(this.sprite, this.top.sX, this.top.sY, this.w, this.h, p.x, topYPos, this.w, this.h); // bottom pipe

        this.ctx.drawImage(this.sprite, this.bottom.sX, this.bottom.sY, this.w, this.h, p.x, bottomYPos, this.w, this.h);
      }
    }
  }, {
    key: "update",
    value: function update() {
      var bird = this.bird;
      var score = this.score;
      if (this.state.current !== this.state.game) return;

      if (frames % 100 == 0) {
        this.position.push({
          x: this.cvs.width,
          y: this.maxYPos * (Math.random() + 1)
        });
      }

      for (var i = 0; i < this.position.length; i++) {
        var p = this.position[i];
        var bottomPipeYPos = p.y + this.h + this.gap; // COLLISION DETECTION
        // TOP PIPE

        if (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > p.y && bird.y - bird.radius < p.y + this.h) {
          this.state.current = this.state.over;
          HIT.play();
        } // BOTTOM PIPE


        if (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > bottomPipeYPos && bird.y - bird.radius < bottomPipeYPos + this.h) {
          this.state.current = this.state.over;
          HIT.play();
        } // MOVE THE PIPES TO THE LEFT


        p.x -= this.dx; // if the pipes go beyond canvas, we delete them from the array

        if (p.x + this.w <= 0) {
          this.position.shift();
          score.value += 1;
          SCORE_S.play();
          score.best = Math.max(score.value, score.best);
          localStorage.setItem("best", score.best);
        }
      }

      frames++;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.position = [];
    }
  }]);

  return Pipes;
}();

exports.default = Pipes;
},{}],"game-objects/score.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Score =
/*#__PURE__*/
function () {
  function Score(ctx, cvs, state) {
    _classCallCheck(this, Score);

    this.ctx = ctx;
    this.cvs = cvs;
    this.state = state;
    this.best = parseInt(localStorage.getItem("best")) || 0;
    this.value = 0;
  }

  _createClass(Score, [{
    key: "draw",
    value: function draw() {
      this.ctx.fillStyle = "#FFF";
      this.ctx.strokeStyle = "#000";

      if (this.state.current == this.state.game) {
        this.ctx.lineWidth = 2;
        this.ctx.font = "35px Teko";
        this.ctx.fillText(this.value, this.cvs.width / 2, 50);
        this.ctx.strokeText(this.value, this.cvs.width / 2, 50);
      } else if (this.state.current == this.state.over) {
        // SCORE VALUE
        this.ctx.font = "25px Teko";
        this.ctx.fillText(this.value, 225, 186);
        this.ctx.strokeText(this.value, 225, 186); // BEST SCORE

        this.ctx.fillText(this.best, 225, 228);
        this.ctx.strokeText(this.best, 225, 228);
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this.value = 0;
    }
  }]);

  return Score;
}();

exports.default = Score;
},{}],"game-objects/input.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SCORE_S = document.getElementById("audio-score");
var FLAP = document.getElementById("audio-flap");
var HIT = document.getElementById("audio-hit");
var SWOOSHING = document.getElementById("audio-swoosh");
var DIE = document.getElementById("audio-die");

var Input = function Input(cvs, ctx, pipes, bird, score, state) {
  _classCallCheck(this, Input);

  // START BUTTON COORD
  var startBtn = {
    x: 120,
    y: 263,
    w: 83,
    h: 29
  }; // CONTROL THE GAME

  cvs.addEventListener("click", function (evt) {
    switch (state.current) {
      case state.getReady:
        state.current = state.game;
        SWOOSHING.play();
        break;

      case state.game:
        if (bird.y - bird.radius <= 0) return;
        bird.flap();
        FLAP.play();
        break;

      case state.over:
        var rect = cvs.getBoundingClientRect();
        var clickX = evt.clientX - rect.left;
        var clickY = evt.clientY - rect.top; // CHECK IF WE CLICK ON THE START BUTTON

        if (clickX >= startBtn.x && clickX <= startBtn.x + startBtn.w && clickY >= startBtn.y && clickY <= startBtn.y + startBtn.h) {
          pipes.reset();
          bird.speedReset();
          score.reset();
          state.current = state.getReady;
        }

        break;
    }
  });
};

exports.default = Input;
},{}],"game.js":[function(require,module,exports) {
"use strict";

var _bird = _interopRequireDefault(require("./game-objects/bird"));

var _foreground = _interopRequireDefault(require("./game-objects/foreground"));

var _gameOver = _interopRequireDefault(require("./game-objects/game-over"));

var _getReady = _interopRequireDefault(require("./game-objects/get-ready"));

var _background = _interopRequireDefault(require("./game-objects/background"));

var _pipes = _interopRequireDefault(require("./game-objects/pipes"));

var _score = _interopRequireDefault(require("./game-objects/score"));

var _input = _interopRequireDefault(require("./game-objects/input"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// SELECT CVS
var cvs = document.getElementById("bird");
var ctx = cvs.getContext("2d"); // LOAD SPRITE IMAGE

var sprite = document.getElementById("img-object");
var frames = 0; // GAME STATE

var state = {
  current: 0,
  getReady: 0,
  game: 1,
  over: 2
};
var bird = new _bird.default(ctx, cvs, sprite, state);
var foreground = new _foreground.default(ctx, cvs, sprite, state);
var getReady = new _getReady.default(ctx, cvs, sprite, state);
var background = new _background.default(ctx, cvs, sprite);
var gameOver = new _gameOver.default(ctx, cvs, sprite, state);
var score = new _score.default(ctx, cvs, state);
var pipes = new _pipes.default(ctx, cvs, sprite, state, bird, score);
var input = new _input.default(cvs, ctx, pipes, bird, score, state);

function draw() {
  ctx.fillStyle = "#70c5ce";
  ctx.fillRect(0, 0, cvs.width, cvs.height);
  background.draw();
  pipes.draw();
  bird.draw();
  foreground.draw();
  getReady.draw();
  gameOver.draw();
  score.draw();
}

function update() {
  bird.update();
  foreground.update();
  pipes.update();
}

function loop() {
  update();
  draw();
  frames++;
  requestAnimationFrame(loop);
}

loop();
},{"./game-objects/bird":"game-objects/bird.js","./game-objects/foreground":"game-objects/foreground.js","./game-objects/game-over":"game-objects/game-over.js","./game-objects/get-ready":"game-objects/get-ready.js","./game-objects/background":"game-objects/background.js","./game-objects/pipes":"game-objects/pipes.js","./game-objects/score":"game-objects/score.js","./game-objects/input":"game-objects/input.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51879" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","game.js"], null)
//# sourceMappingURL=/game.7bbe06d5.js.map