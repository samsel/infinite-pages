'use strict';

var React = require('react');
var Swiper = require('swiper');

var classNames = {
  page0: 'swiper-slide page0',
  page1: 'swiper-slide page1',
  page2: 'swiper-slide page2',
  page3: 'swiper-slide page3',
  page4: 'swiper-slide page4'
};

function HTMLCollectionToArray(HTMLCollection) {
  return [].map.call(HTMLCollection, function(node) {
    return node;
  });
}

module.exports = React.createClass({

  componentDidMount: function componentDidMount() {
    this.swiper = new Swiper('.swiper-container', {
      loop: true
    });
  },

  pages: function pages() {
    return [
      document.getElementsByClassName(classNames.page0),
      document.getElementsByClassName(classNames.page1),
      document.getElementsByClassName(classNames.page2),
      document.getElementsByClassName(classNames.page3),
      document.getElementsByClassName(classNames.page4)
    ].map(HTMLCollectionToArray);
  },

  render: function render() {

    return (
      <div className='swiper-container'>
        <div className='swiper-wrapper'>
          <div className={classNames.page0}/>
          <div className={classNames.page1}/>
          <div className={classNames.page2}/>
          <div className={classNames.page3}/>
          <div className={classNames.page4}/>
        </div>
      </div>
    );
  }

});
