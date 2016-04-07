var assert = require('assert');
var formatters = require('../lib/formatters/formatters');


describe('Testing DefaultFormatter', function() {
    var formatter = new formatters.DefaultFormatter();

    it('Should format the string correctly', function() {
        assert.ok(formatter.format('SOME MESSAGE', 'WHATEVER', {"K":"V"}).match(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3} WHATEVER SOME MESSAGE .+K.+V/))
    })
});