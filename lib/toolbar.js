'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = render;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _toolbar = require('./jsx/toolbar.js');

var _toolbar2 = _interopRequireDefault(_toolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
constructor(props){
       super(props);
       this.state={
       	activeBtn:'default'
       }
   }*/

function render() {
	return _toolbar2.default.bind(this)();
}