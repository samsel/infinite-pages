'use strict';

var React = require('react');
var Package = require('../package.json');

module.exports = React.createClass({

  render: function render() {

    return (
      <div>
        <div className='info-left'>
          <h1>{Package.name}</h1>
          <p>Proof of concept of an Infinite Scrolling Page Application with minimal DOM node set manipulation</p>
        </div>
        <div className='info-right'>
          <p>Swipe the Blue box left and right to see it in action</p>
        </div>
        <div className='info-bottom-left'>
          <p>Built with <a href='http://facebook.github.io/react/' target='_blank'>React</a> and <a href='http://www.idangero.us/swiper/' target='_blank'>Swiper</a>.</p>
        </div>
      </div>
    );
  }
});
