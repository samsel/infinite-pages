'use strict';

var util = require('./util');
var React = require('react');
var Swiper = require('swiper');

var classNames = {
  page0: 'swiper-slide page0',
  page1: 'swiper-slide page1',
  page2: 'swiper-slide page2',
  page3: 'swiper-slide page3',
  page4: 'swiper-slide page4'
};

var SwipeState = {
  next: 'SlideNext',
  prev: 'SlidePrev'
};

var pageOrder = (function pageOrderGenerator() {
  // returns: [0, 1, 2, 3, 4]
  return Object.keys(classNames).map(function(name, index) {
    return index;
  });
})();

var doublePageOrder = pageOrder.concat(pageOrder);

function nextIndicesForActiveIndex(index) {

  // return two items to the right of index+1
  // example if index === 0, returns: [2, 3]
  // if index === 1, returns: [3, 4]
  // if index === 4, returns: [1, 2]

  var start = index + 2;
  var end = start + 2;

  return doublePageOrder.slice(start, end);
}

function prevIndicesForActiveIndex(index) {
  return nextIndicesForActiveIndex(index).reverse();
}

function indexToLeftOf(index) {
  return (pageOrder.slice(index - 1))[0];
}

function indexToRightOf(index) {
  return (pageOrder.slice((index + 1) % pageOrder.length))[0];
}

function createPageSwiper(onSwipeCallback) {

  var props = {

    dispatch: {
      value: function(options) {

        var descriptors;
        var offsets;

        if (options && options.initial === true) {
          offsets = [this.currentPageIndex,
            this.currentPageIndex + 1,
            this.currentPageIndex + 2,
            this.currentPageIndex + 3,
            this.currentPageIndex - 1];

          descriptors = this.pages.map(function(nodes, index) {
            return {
              nodes: nodes,
              offset: offsets[index]
            };
          });
        }
        else if (this.state === SwipeState.next) {
          offsets = [this.currentPageIndex + 2,
            this.currentPageIndex + 3];

          descriptors = nextIndicesForActiveIndex(this.activeLoopIndex).map(function(pageIndex, index) {
            return {
              nodes: this.pages[pageIndex],
              offset: offsets[index]
            };
          }, this);

          if (this.stateChanged) {
            descriptors.push({
              nodes: this.pages[indexToRightOf(this.activeLoopIndex)],
              offset: this.currentPageIndex + 1
            });
          }
        }
        else if (this.state === SwipeState.prev) {
          offsets = [this.currentPageIndex - 2,
            this.currentPageIndex - 3];

          descriptors = prevIndicesForActiveIndex(this.activeLoopIndex).map(function(pageIndex, index) {
            return {
              nodes: this.pages[pageIndex],
              offset: offsets[index]
            };
          }, this);

          if (this.stateChanged) {
            descriptors.push({
              nodes: this.pages[indexToLeftOf(this.activeLoopIndex)],
              offset: this.currentPageIndex - 1
            });
          }
        }
        else {
          throw new Error('unknown state. developer bug!');
        }

        onSwipeCallback(descriptors);
      },
      writable: false,
      enumerable: true
    }
  };

  var proto = new Swiper('.swiper-container', {
    loop: true
  });

  var swiper = Object.create(proto, props);

  Object.defineProperty(swiper, 'currentPageIndex', {
      value: 0,
      writable: true
  });

  Object.defineProperty(swiper, 'stateChanged', {
      value: false,
      writable: true
  });

  (function statePropClosure() {
    // initial state
    var _state = SwipeState.next;

    Object.defineProperty(swiper, 'state', {

        get: function() {
          return _state;
        },

        set: function(state) {
          this.stateChanged = _state !== state;
          state === SwipeState.next ? (this.currentPageIndex += 1) : (this.currentPageIndex -= 1);
          _state = state;
          this.dispatch();
        }
    });
  })();

  (function pagesPropClosure() {
    var _pages;

    function getElementsByClassName(className) {
      return document.getElementsByClassName(className);
    }

    function computePages() {

      if (!_pages) {
        _pages = [
          classNames.page0,
          classNames.page1,
          classNames.page2,
          classNames.page3,
          classNames.page4
        ].map(getElementsByClassName).map(util.HTMLCollectionToArray);
      }

      return _pages;
    }

    Object.defineProperty(swiper, 'pages', {
      get: function() {
        return computePages();
      }
    });

  })();

  swiper.addCallback(SwipeState.next, function() {
    swiper.state = SwipeState.next;
  });

  swiper.addCallback(SwipeState.prev, function() {
    swiper.state = SwipeState.prev;
  });

  swiper.dispatch({
    initial: true
  });

  return swiper;
}

module.exports = React.createClass({

  componentDidMount: function componentDidMount() {
    createPageSwiper(this.props.onSwipe);
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
