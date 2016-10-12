Object.defineProperty(Object.prototype, 'cloneValues', {
  value: function() {
    console.log('this is');
    console.log(this);
    return JSON.stringify(JSON.parse(this));
  },
  writable: true,
  configurable: true,
  enumerable: false
});