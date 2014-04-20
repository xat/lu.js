# lu.js

Lightweight dependency injection lib written in JavaScript.

## Usage

```javascript

var container = lu()

    // services are singletons
    .service('myService', function() {
        return {
            getFoo: function() {
                return 'foo';
            }
        }
    })

    // this is how dependencies get passed in
    .service('myOtherService', ['myService'], function(myService) {
        return myService.getFoo() + ' bar';
    })

    // you can also define values as dependencies
    .value('myVal', ' is a random value')

    // factories get always called when they
    // get injected.
    .factory('myFactory', ['myVal'], function(myVal) {
        return Math.random() + myVal;
    });

// get a registered dependency
var myService = container.get('myService');

// run some anonymous function and pass
// dependencies in
container(['myFactory', 'myVal'], function(myFactory, myVal) {
   console.log(myVal);
});


```

## Installation

### Node.JS

```npm install lu.js```

### Browser

```bower install lu```

## License
Copyright (c) 2014 Simon Kusterer
Licensed under the MIT license.