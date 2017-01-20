'use strict';

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _FooBar = require('./FooBar');

var _FooBar2 = _interopRequireDefault(_FooBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

[1, 2, 3].map(function (n) {
  return n + 1;
});

console.log(_utils2.default.generateRandom()); //logs a random number
console.log(_utils2.default.sum(1, 2)); //3
console.log(_utils2.default.mark());

var foobar = new _FooBar2.default();
console.log(foobar.render());