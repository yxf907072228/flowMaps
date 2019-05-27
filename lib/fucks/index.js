'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = fuck;

var _fuckNormal = require('./fuckNormal');

var _fuckNormal2 = _interopRequireDefault(_fuckNormal);

var _fuckStar = require('./fuckStar');

var _fuckStar2 = _interopRequireDefault(_fuckStar);

var _fuckPath = require('./fuckPath');

var _fuckPath2 = _interopRequireDefault(_fuckPath);

var _fuckFire = require('./fuckFire');

var _fuckFire2 = _interopRequireDefault(_fuckFire);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fuck(tapu, startNode, endNode) {
    var option = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var type = option.type;

    if (type == 'normal') {
        (0, _fuckNormal2.default)(tapu, startNode, endNode, option);
    } else if (type == 'star') {
        (0, _fuckStar2.default)(tapu, startNode, endNode, option);
    } else if (type == 'path') {
        (0, _fuckPath2.default)(tapu, startNode, endNode, option);
    } else if (type == 'fire') {
        (0, _fuckFire2.default)(tapu, startNode, endNode, option);
    }
}