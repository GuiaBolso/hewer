var assert = require('assert');
var filters = require('../lib/filters/filters');

describe('Testing IdentityFilter', function() {
    var filter = new filters.IdentityFilter()
    var inputStr = "Some string that shouldn't be filtered"

    it('Shoud not change anything', function() {
        assert.equal(filter.apply(inputStr), inputStr)
    });
});

describe('Testing PatternFilter', function() {
    var filter = new filters.PatternFilter(/filtered/gmi, '[REDACTED]')
    var inputStr = "Some string that should be filtered"

    it("Should filter the word 'filtered'", function() {
        assert.equal(filter.apply(inputStr), "Some string that should be [REDACTED]");
    });
});

describe('Testing KeyFilter', function() {
    var filter = new filters.KeyFilter('name', '[REDACTED]')

    it("For an empty object", function() {
        var inputStr = 'Some string that should be filtered {}'
        assert.equal(filter.apply(inputStr), 'Some string that should be filtered {}');
    });

    it("For simple key-value pair", function() {
        var inputStr = 'Some string that should be filtered {"name":"value"}'
        assert.equal(filter.apply(inputStr), 'Some string that should be filtered {"name":"[REDACTED]"}');
    });

    it("For simple key-value pair with value as empty string", function() {
        var inputStr = 'Some string that should be filtered {"name":""}'
        assert.equal(filter.apply(inputStr), 'Some string that should be filtered {"name":"[REDACTED]"}');
    });

    it("For multiple key-value pairs", function() {
        var inputStr = 'Some string that should be filtered {"name":"value","name2":"value2"}'
        assert.equal(filter.apply(inputStr), 'Some string that should be filtered {"name":"[REDACTED]","name2":"value2"}');
    });

    it("For value as one item array", function() {
        var inputStr = 'Some string that should be filtered {"name":["value1"]}'
        assert.equal(filter.apply(inputStr), 'Some string that should be filtered {"name":"[REDACTED]"}');
    });

    it("For value as two items array", function() {
        var inputStr = 'Some string that should be filtered {"name":["value1","value2"]}'
        assert.equal(filter.apply(inputStr), 'Some string that should be filtered {"name":"[REDACTED]"}');
    });

    it("For two values as arrays", function() {
        var inputStr = 'Some string that should be filtered {"name":["value1","value2"],"name2":[]}'
        assert.equal(filter.apply(inputStr), 'Some string that should be filtered {"name":"[REDACTED]","name2":[]}');
    });

    it("For value as number", function() {
        var inputStr = 'Some string that should be filtered {"name":1}'
        assert.equal(filter.apply(inputStr), 'Some string that should be filtered {"name":"[REDACTED]"}');
    });

    it("For value as float number", function() {
        var inputStr = 'Some string that should be filtered {"name":1.97}'
        assert.equal(filter.apply(inputStr), 'Some string that should be filtered {"name":"[REDACTED]"}');
    });

    it("For value as null", function() {
        var inputStr = 'Some string that should be filtered {"name":null}'
        assert.equal(filter.apply(inputStr), 'Some string that should be filtered {"name":"[REDACTED]"}');
    });

    it("For value as an empty object", function() {
        var inputStr = 'Some string that should be filtered {"name":{}}'
        assert.equal(filter.apply(inputStr), 'Some string that should be filtered {"name":"[REDACTED]"}');
    });

    it("For value as an object with a sigle key-value pair", function() {
        var inputStr = 'Some string that should be filtered {"name":{"k":"v"}}'
        assert.equal(filter.apply(inputStr), 'Some string that should be filtered {"name":"[REDACTED]"}');
    });

    it("For value as an object with two key-value pairs", function() {
        var inputStr = 'Some string that should be filtered {"name":{"k":"v","k2":"v2"}}'
        assert.equal(filter.apply(inputStr), 'Some string that should be filtered {"name":"[REDACTED]"}');
    });

    it("For two values as objects", function() {
        var inputStr = 'Some string that should be filtered {"name":{"k":"v","k2":"v2"},"name2":{}}'
        assert.equal(filter.apply(inputStr), 'Some string that should be filtered {"name":"[REDACTED]","name2":{}}');
    });

    it("For value as an object with a sigle key-value pair with value as array", function() {
        var inputStr = 'Some string that should be filtered {"name":{"k":["i1"]}}'
        assert.equal(filter.apply(inputStr), 'Some string that should be filtered {"name":"[REDACTED]"}');
    });
});
