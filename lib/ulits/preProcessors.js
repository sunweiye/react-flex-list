"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateDocIdByTime = void 0;
var currentTime = new Date().getTime();

var generateDocIdByTime = function generateDocIdByTime(item, index) {
  item._id = "".concat(currentTime + index);
};

exports.generateDocIdByTime = generateDocIdByTime;