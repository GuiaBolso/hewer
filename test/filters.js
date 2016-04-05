var assert = require('assert');
var filters = require('../lib/filters/filters');

describe('Testing IdentityFilter', function() {
    var filter = new filters.IdentityFilter()
    var inputStr = "Some string that shouldn't be filtered"

    it('Shoud not change anything', function() {
        assert.equal(filter.apply(inputStr), inputStr)
    });
});
    

