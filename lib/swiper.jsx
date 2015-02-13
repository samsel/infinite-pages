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

var SwipeState = {
  next: 'SlideNext',
  prev: 'SlidePrev'
};

function HTMLCollectionToArray(HTMLCollection) {
  return [].map.call(HTMLCollection, function(node) {
    return node;
  });
}

var pageOrder = [0, 1, 2, 3, 4];

function nextIndicesForActiveIndex(index) {

  // return two items to the right of index+1
  // example if index === 0, returns: [2, 3]
  // if index === 1, returns: [3, 4]
  // if index === 4, returns: [1, 2]

  var start;
  var end;

  start = index + 2;

  if (start >= pageOrder.length) {
    start = (start % pageOrder.length);
  }

  end = start + 2;

  if (end > pageOrder.length) {
    end = (end % pageOrder.length) - 1;
  }

  return pageOrder.slice(start, end);
}

function prevIndicesForActiveIndex(index) {
  return nextIndicesForActiveIndex(index).reverse();
}

function indexToLeftOf(index) {
  return (pageOrder.slice(index - 1))[0];
};

function indexToRightOf(index) {
  return (pageOrder.slice((index + 1) % pageOrder.length))[0];
};

function create(onSwipeCallback) {

  var options = {
    loop: true
  };

  var swiper = new Swiper('.swiper-container', options);

  Object.defineProperty(swiper, 'currentPageIndex', {
      value: 0,
      writable: true
  });

  Object.defineProperty(swiper, 'stateChanged', {
      value: false,
      writable: true
  });

  (function statePropClosure() {
    var _state;

    Object.defineProperty(swiper, 'isInitialState', {
      get: function() {
          return _state === undefined;
      }
    });

    Object.defineProperty(swiper, 'state', {

        get: function() {
            return _state;
        },

        set: function(state) {
          if (this.isInitialState) {
            this.stateChanged = false;
          }
          else {
            this.stateChanged = _state !== state;
          }

          state === SwipeState.next ? (this.currentPageIndex += 1) : (this.currentPageIndex -= 1);

          _state = state;
          this.dispatch();
        }
    });
  })();

  var proto = {

    reset: {
      value: function() {
        this.swipeTo(0, 0, false);
      },
      writable: false,
      enumerable: true
    },

    dispatch: {
      value: function() {

        //params: state, activeIndex, directionChanged
        // _this.state, _this.activeLoopIndex, stateChanged

        var indices;

        if (this.isInitialState) {
          indices = [0, 4, 3, 2, 1];
        }
        else if (this.state === SwipeState.next) {
          indices = nextIndicesForActiveIndex(this.activeLoopIndex);
        }
        else if (this.state === SwipeState.prev) {
          indices = prevIndicesForActiveIndex(this.activeLoopIndex);
        }
        else {
          throw new Error('unknown state. developer bug!');
        }

        onSwipeCallback(indices);
      },
      writable: false,
      enumerable: true
    }
  };

  return Object.create(swiper, proto);
}

module.exports = React.createClass({

  componentDidMount: function componentDidMount() {

    var swiper = create(this.props.onSwipe);
    swiper.dispatch();

    swiper.addCallback(SwipeState.next, function() {
      swiper.state = SwipeState.next;
    });

    swiper.addCallback(SwipeState.prev, function() {
      swiper.state = SwipeState.prev;
    });

    this.pages = this.computePages();
  },

  computePages: function pages() {

    function getElementsByClassName(className) {
      return document.getElementsByClassName(className);
    }

    return [
      classNames.page0,
      classNames.page1,
      classNames.page2,
      classNames.page3,
      classNames.page4
    ].map(getElementsByClassName).map(HTMLCollectionToArray);
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
