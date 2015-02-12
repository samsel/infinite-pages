'use strict';

var React = require('react');
var Page = require('./page.jsx');
var Swiper = require('./swiper.jsx');

var component = React.render(<Swiper />, document.body);

component.pages().map(function(page) {
  page.map(function(node) {
    React.render(<Page />, node)
  });
});

