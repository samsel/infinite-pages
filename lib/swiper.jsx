'use strict';

var React = require('react');
var Swiper = require('swiper');

module.exports = React.createClass({

  componentDidMount: function componentDidMount() {
    var swiper = new Swiper(this.refs.container.getDOMNode(), {
      loop: true
    });
  },

  render: function render() {

    return (
      <div ref='container' className='swiper-container'>
        <div className='swiper-wrapper'>
          <div className='swiper-slide page0'><div></div></div>
          <div className='swiper-slide page1'><div></div></div>
          <div className='swiper-slide page2'><div></div></div>
          <div className='swiper-slide page3'><div></div></div>
          <div className='swiper-slide page4'><div></div></div>
        </div>
      </div>
    );
  }

});
