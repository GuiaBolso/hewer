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
