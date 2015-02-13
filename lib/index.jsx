'use strict';

var React = require('react');
var Page = require('./page.jsx');
var Info = require('./info.jsx');
var Swiper = require('./swiper.jsx');

function onSwipe(descriptors) {

  // descriptors is an array of objects
  // with `nodes` and `offset` properties.
  console.log(descriptors);

  descriptors.map(function(descriptor, index) {
    descriptor.nodes.map(function(node) {
      React.render(<Page pageNumber={descriptor.offset} />, node);
    });
  });
}

React.render(<Swiper onSwipe={onSwipe}/>, document.getElementById('swiper'));
React.render(<Info />, document.getElementById('info'));
