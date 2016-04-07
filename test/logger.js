var assert = require('assert');
var hewer = require('../hewer');


describe('Testing default logger with meta data', function() {
    var Logger = new hewer.Logger();
    var testString = 'Testing hewer for logging',
    testObj = {
        'a' : '1',
        'b' : '2'
    };

    it('Logging INFO', function(done) {
        Logger.log(testObj)
        .with('c', '3')
        .info(testString)
        .then(function(msg) {
            assert.ok(msg[0].match(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3} INFO .+"a":"1".+"b":"2".+"c":"3"/));
            done();
        })
        .catch(done);
    });

    it('Logging WARN', function(done){
        Logger.log(testObj)
        .with('c', '3')
        .warn(testString)
        .then(function(msg) {
            assert.ok(msg[0].match(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3} WARN .+"a":"1".+"b":"2".+"c":"3"/));
            done();
        })
        .catch(done);
    });

    it('Loggin ERROR', function(done){
        Logger.log(testObj)
        .with('c', '3')
        .error(testString)
        .then(function(msg) {
            assert.ok(msg[0].match(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3} ERROR .+"c":"3"/));
            done();
        })
        .catch(done);
    });
    

    it('Logging DEBUG', function(done){
        Logger.log(testObj)
        .with('c', '3')
        .debug(testString)
        .then(function(msg) {
            assert.ok(msg[0].match(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3} DEBUG .+"c":"3"/));
            done();
        })
        .catch(done);
    });
});

describe('Testing default logger without any meta data', function() {
    var Logger = new hewer.Logger();
    var testString = 'Testing hewer for logging';

    it('Logging INFO', function(done) {
        Logger.log()
        .info(testString)
        .then(function(msg) {
            assert.ok(msg[0].match(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3} INFO .+ \{\}/))
            done();
        })
        .catch(done);
    });

    it('Logging WARN', function(done){
        Logger.log()
        .warn(testString)
        .then(function(msg) {
            assert.ok(msg[0].match(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3} WARN .+ \{\}/))
            done();
        })
        .catch(done);
    });

    it('Loggin ERROR', function(done){
        Logger.log()
        .error(testString)
        .then(function(msg) {
            assert.ok(msg[0].match(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3} ERROR .+ \{\}/))
            done();
        })
        .catch(done);
    });
    

    it('Logging DEBUG', function(done){
        Logger.log()
        .debug(testString)
        .then(function(msg) {
            assert.ok(msg[0].match(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3} DEBUG .+ \{\}/))
            done();
        })
        .catch(done);
    });
});


describe('Testing default logger with error', function(done) {
    function ErrorWriter() {
        this.warn = function(msg, callback) {
            callback(new Error('Warn'));
        }

        this.error = function(msg, callback) {
            callback(new Error('Error'));
        }

        this.info = function(msg, callback) {
            callback(new Error('Info'));
        }

        this.debug = function(msg, callback) {
            callback(new Error('Debug'));
        }
    }

    var Logger = new hewer.Logger(null, [new ErrorWriter()], null),
        testString = 'Some string for testing';

    it('Info', function(done) {
        Logger.log()
        .info(testString)
        .then(function(msg) {
            assert.fail(null, null, "Error didn't happen", null)
        })
        .catch(function(e) {
            assert.equal(e.message, 'Info')
            done();
        })
        .catch(done);
    });
    

    it('Warn', function(done) {
        Logger.log()
        .warn(testString)
        .then(function(msg) {
            assert.fail(null, null, "Error didn't happen", null)        
        }).catch(function(e) {
            assert.equal(e.message, 'Warn')
            done();
        }).catch(done);
    });

    it('Error', function(done) {
        Logger.log()
        .error(testString)        
        .then(function(msg) {
            assert.fail(null, null, "Error didn't happen", null)        
        }).catch(function(e) {
            assert.equal(e.message, 'Error')
            done();
        }).catch(done);
    });
    
    it('Debug', function(done) {
        Logger.log()
        .debug(testString)
        .then(function(msg) {
            assert.fail(null, null, "Error didn't happen", null)        
        }).catch(function(e) {
            assert.equal(e.message, 'Debug')
            done();
        }).catch(done);
    });
});