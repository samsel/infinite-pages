'use strict';

var React = require('react');
var Page = require('./page.jsx');
var Swiper = require('./swiper.jsx');

function onSwipe(data) {
  console.log(data);
}

React.render(<Swiper onSwipe={onSwipe}/>, document.body);

// component.pages().map(function(page, index) {
//   page.map(function(node) {
//     React.render(<Page pageNumber={index} />, node)
//   });
// });

