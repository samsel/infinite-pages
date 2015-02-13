'use strict';

var React = require('react');

module.exports = React.createClass({

  render: function render() {

    return (
      <div className='page'>
        <div className='content'>
          <h1>Page {this.props.pageNumber}</h1>
        </div>
      </div>
    );
  }

});
