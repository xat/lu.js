var expect = require('expect.js');
var lu = require('../lu.js');

describe('di', function() {

  it('should inject the services', function() {
    var container = lu();

    container.service('myService', function() {
      return {
        doSomething: function() {
          return 'test';
        }
      }
    });

    container.factory('myFactory', function() {
      return Math.random();
    });

    container.value('myVal', 5);

    container.value('myFn', function() {
      return 'something';
    });

    container(['myService', 'myVal', 'myFn'], function(myService, myVal, myFn) {
      expect(myService.doSomething()).to.equal('test');
      expect(myVal).to.equal(5);
      expect(myFn()).to.equal('something');
    });

    expect(container.get('myVal')).to.equal(5);
    expect(container.get('myFactory')).not.to.equal(container.get('myFactory'));
  });

});