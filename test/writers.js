var assert = require('assert');
require('mocha-sinon');

var writers = require('../lib/writers/writers')

describe('Testing console writer', function() {
    var writer = new writers.ConsoleWriter();

    it('info', function(done) {
        var info = console.info;
        this.sinon.stub(console, 'info');
        writer.info("Test string", function() {
            assert.ok(console.info.calledOnce)
            done();
        });
    });

    it('debug', function(done) {
        var log = console.log;
        this.sinon.stub(console, 'log');
        writer.debug("Test string", function() {
            assert.ok(console.log.calledOnce)
            done();
        });
    });

    it('warn', function(done) {
        var warn = console.warn;
        this.sinon.stub(console, 'warn');
        writer.warn("Test string", function() {
            assert.ok(console.warn.calledOnce)
            done();
        });
    });

    it('error', function(done) {
        var error = console.error;
        this.sinon.stub(console, 'error');
        writer.error("Test string", function() {
            assert.ok(console.error.calledOnce)
            done();
        });
    });
});