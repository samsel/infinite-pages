'use strict';

exports.HTMLCollectionToArray = function HTMLCollectionToArray(HTMLCollection) {
  return [].map.call(HTMLCollection, function(node) {
    return node;
  });
};
