var assert = require('assert');
require('mocha-sinon');

var writers = require('../lib/writers/writers')

describe('Testing console writer', function() {
    var writer = new writers.ConsoleWriter();

    it('info', function(done) {
        this.sinon.stub(console, 'info');
        var info = console.info;
        writer.info("Test string", function() {
            assert.ok(info.calledOnce)
            done();
        });
    });

    it('debug', function(done) {
        this.sinon.stub(console, 'log');
        var log = console.log;
        writer.debug("Test string", function() {
            assert.ok(log.calledOnce)
            done();
        });
    });

    it('warn', function(done) {
        this.sinon.stub(console, 'warn');
        var warn = console.warn;
        writer.warn("Test string", function() {
            assert.ok(warn.calledOnce)
            done();
        });
    });

    it('error', function(done) {
        this.sinon.stub(console, 'error');
        var error = console.error;
        writer.error("Test string", function() {
            assert.ok(error.calledOnce)
            done();
        });
    });
});