var assert = require('assert');
require('mocha-sinon');

var hewer = require('../hewer');


describe('Testing logger log', function() {
    it('meta', function() {
        var Logger = new hewer.Logger();
        var testMeta = {
            'var1' : 'var1',
            'var2' : 'var2'
        }

        var log = Logger.log(testMeta);

        assert.deepEqual(log.meta, testMeta);
    });

    it('with', function() {
        var Logger = new hewer.Logger();
        var testMeta = {
            'var1' : 'var1',
            'var2' : 'var2'
        }

        var log = Logger.log(testMeta);
        log.with('var3', 'var3')

        assert.deepEqual(log.meta, {
            'var1' : 'var1',
            'var2' : 'var2',
            'var3' : 'var3'
        });
    })
});

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


describe('Testing default logger with error', function() {
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

describe('Testing logger writer adding', function() {
    var TestWriter = function() {
        this.warn = function(msg, callback) {
            callback()
        }

        this.error = function(msg, callback) {
            callback()
        }

        this.info = function(msg, callback) {
            callback()
        }

        this.debug = function(msg, callback) {
            callback()
        }  
    }

    it('addWriter must returns the logger instance', function(done) {
        var Logger = new hewer.Logger();
        var writer = new TestWriter();

        assert.equal(Logger.addWriter(writer), Logger);
        done();
    });
    
    it('Warn', function(done) {
        var writer = new TestWriter();
        var writer2 = new TestWriter();

        this.sinon.stub(writer, 'warn');
        this.sinon.stub(writer2, 'warn', function(){
            assert.ok(writer.warn.calledOnce);
            assert.ok(writer2.warn.calledOnce);
            done();
        });

        var Logger = new hewer.Logger();

        assert.equal(Logger.writers.length, 1);
        Logger.addWriter(writer);
        assert.equal(Logger.writers.length, 2);
        Logger.addWriter(writer2);
        assert.equal(Logger.writers.length, 3);

        Logger.log()
        .warn('Test')
        .catch(done);
    });

    it('Error', function(done) {
        var writer = new TestWriter();
        var writer2 = new TestWriter();

        this.sinon.stub(writer, 'error');
        this.sinon.stub(writer2, 'error', function(){
            assert.ok(writer.error.calledOnce);
            assert.ok(writer2.error.calledOnce);
            done();
        });

        var Logger = new hewer.Logger();

        assert.equal(Logger.writers.length, 1);
        Logger.addWriter(writer);
        assert.equal(Logger.writers.length, 2);
        Logger.addWriter(writer2);
        assert.equal(Logger.writers.length, 3);

        Logger.log()
        .error('Test')
        .catch(done);
    });

    it('Info', function(done) {
        var writer = new TestWriter();
        var writer2 = new TestWriter();

        this.sinon.stub(writer, 'info');
        this.sinon.stub(writer2, 'info', function(){
            assert.ok(writer.info.calledOnce);
            assert.ok(writer2.info.calledOnce);
            done();
        });

        var Logger = new hewer.Logger();

        assert.equal(Logger.writers.length, 1);
        Logger.addWriter(writer);
        assert.equal(Logger.writers.length, 2);
        Logger.addWriter(writer2);
        assert.equal(Logger.writers.length, 3);

        Logger.log()
        .info('Test')
        .catch(done);
    });

    it('Debug', function(done) {
        var writer = new TestWriter();
        var writer2 = new TestWriter();

        this.sinon.stub(writer, 'debug');
        this.sinon.stub(writer2, 'debug', function(){
            assert.ok(writer.debug.calledOnce);
            assert.ok(writer2.debug.calledOnce);
            done();
        });

        var Logger = new hewer.Logger();

        assert.equal(Logger.writers.length, 1);
        Logger.addWriter(writer);
        assert.equal(Logger.writers.length, 2);
        Logger.addWriter(writer2);
        assert.equal(Logger.writers.length, 3);

        Logger.log()
        .debug('Test')
        .catch(done);
    });
});

describe('Testing logger filter adding', function(done) {
    var TestFilter = function() {
        this.apply = function(msg) {
            return msg;
        }
    }

    it('addFilter must returns the logger instance', function(done) {
        var Logger = new hewer.Logger();
        var filter = new TestFilter();

        assert.equal(Logger.addFilter(filter), Logger);
        done();
    });
    
    it('Warn', function(done) {
        var filter = new TestFilter();
        var filter2 = new TestFilter();

        this.sinon.stub(filter, 'apply');
        this.sinon.stub(filter2, 'apply', function(){
            assert.ok(filter.apply.calledOnce);
            assert.ok(filter2.apply.calledOnce);
            done();
        });

        var Logger = new hewer.Logger();

        assert.equal(Logger.filters.length, 1);
        Logger.addFilter(filter);
        assert.equal(Logger.filters.length, 2);
        Logger.addFilter(filter2);
        assert.equal(Logger.filters.length, 3);

        Logger.log()
        .warn('Test')
        .catch(done);
    });

    it('Error', function(done) {
        var filter = new TestFilter();
        var filter2 = new TestFilter();

        this.sinon.stub(filter, 'apply');
        this.sinon.stub(filter2, 'apply', function(){
            assert.ok(filter.apply.calledOnce);
            assert.ok(filter2.apply.calledOnce);
            done();
        });

        var Logger = new hewer.Logger();

        assert.equal(Logger.filters.length, 1);
        Logger.addFilter(filter);
        assert.equal(Logger.filters.length, 2);
        Logger.addFilter(filter2);
        assert.equal(Logger.filters.length, 3);

        Logger.log()
        .error('Test')
        .catch(done);
    });

    it('Info', function(done) {
        var filter = new TestFilter();
        var filter2 = new TestFilter();

        this.sinon.stub(filter, 'apply');
        this.sinon.stub(filter2, 'apply', function(){
            assert.ok(filter.apply.calledOnce);
            assert.ok(filter2.apply.calledOnce);
            done();
        });

        var Logger = new hewer.Logger();

        assert.equal(Logger.filters.length, 1);
        Logger.addFilter(filter);
        assert.equal(Logger.filters.length, 2);
        Logger.addFilter(filter2);
        assert.equal(Logger.filters.length, 3);

        Logger.log()
        .info('Test')
        .catch(done);
    });

    it('Debug', function(done) {
        var filter = new TestFilter();
        var filter2 = new TestFilter();

        this.sinon.stub(filter, 'apply');
        this.sinon.stub(filter2, 'apply', function(){
            assert.ok(filter.apply.calledOnce);
            assert.ok(filter2.apply.calledOnce);
            done();
        });

        var Logger = new hewer.Logger();

        assert.equal(Logger.filters.length, 1);
        Logger.addFilter(filter);
        assert.equal(Logger.filters.length, 2);
        Logger.addFilter(filter2);
        assert.equal(Logger.filters.length, 3);

        Logger.log()
        .debug('Test')
        .catch(done);
    });
});

describe('Testing logger formatter setting', function() {
    var TestFormatter = function() {
        this.format = function(message, level, meta) {
            return 'foo'
        }
    }

    it('setFormatter must returns the logger instance', function(done) {
        var Logger = new hewer.Logger();
        var formatter = new TestFormatter(); 

        assert.equal(Logger.setFormatter(formatter), Logger);
        done();
    });

    it('info', function(done) {
        var Logger = new hewer.Logger();
        var formatter = new TestFormatter();

        this.sinon.stub(formatter, 'format', function() {
            assert.ok(formatter.format.calledOnce);
            done();
        })

        Logger.setFormatter(formatter);

        Logger.log()
        .info('Test')
        .catch(done);
    });

    it('debug', function(done) {
        var Logger = new hewer.Logger();
        var formatter = new TestFormatter();

        this.sinon.stub(formatter, 'format', function() {
            assert.ok(formatter.format.calledOnce);
            done();
        })

        Logger.setFormatter(formatter);

        Logger.log()
        .debug('Test')
        .catch(done);
    });

    it('warn', function(done) {
        var Logger = new hewer.Logger();
        var formatter = new TestFormatter();

        this.sinon.stub(formatter, 'format', function() {
            assert.ok(formatter.format.calledOnce);
            done();
        })

        Logger.setFormatter(formatter);

        Logger.log()
        .warn('Test')
        .catch(done);
    });

    it('error', function(done) {
        var Logger = new hewer.Logger();
        var formatter = new TestFormatter();

        this.sinon.stub(formatter, 'format', function() {
            assert.ok(formatter.format.calledOnce);
            done();
        })

        Logger.setFormatter(formatter);

        Logger.log()
        .error('Test')
        .catch(done);
    });
});