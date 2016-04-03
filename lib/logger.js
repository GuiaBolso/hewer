var Promise = require('promise')

var ConsoleWriter = require('./writers/writers').ConsoleWriter
var DefaultFormatter = require('./formatters/formatters').DefaultFormatter
var IdentityFilter = require('./filters/filters').IdentityFilter

function Log(meta, logger) {
    this.logger = logger;
    this.logLevel = {
        'DEBUG' : 'DEBUG',
        'INFO'  : 'INFO',
        'WARN'  : 'WARN',
        'ERROR' : 'ERROR'
    }

    this.meta = meta || {};

    this.with = function(key, value) {
        this.meta[key] = value;

        return this;
    }

    this.info = function(message) {
        return this.__commit__(message, this.logLevel.INFO);
    }

    this.warn = function(message) {
        return this.__commit__(message, this.logLevel.WARN);
    }

    this.error = function(message) {
        return this.__commit__(message, this.logLevel.ERROR);
    }

    this.debug = function(message) {
        return this.__commit__(message, this.logLevel.DEBUG);
    }

    this.__commit__ = function(message, level) {
        var logString = this.__getFormattedString__(message, level, this.meta);

        switch(level) {
            case this.logLevel.WARN:
            return Promise.all(logger.writers.map(function(w) {
                return new Promise(function(resolve, reject) {
                    w.warn(logString, function(e) {
                        return e ? reject(e) : resolve(logString);
                    });
                });
            }));

            case this.logLevel.ERROR:
            return Promise.all(logger.writers.map(function(w) {
                return new Promise(function(resolve, reject) {
                    w.error(logString, function(e) {
                        return e ? reject(e) : resolve(logString);
                    });
                });
            }));

            case this.logLevel.DEBUG:
            return Promise.all(logger.writers.map(function(w) {
                return new Promise(function(resolve, reject) {
                    w.debug(logString, function(e) {
                        return e ? reject(e) : resolve(logString);
                    });
                });
            }));

            case this.logLevel.INFO:
            var logPromises = logger.writers.map(function(w) {
                return new Promise(function(resolve, reject) {
                    w.info(logString, function(e) {
                        return e ? reject(e) : resolve(logString);
                    });
                });
            });
            return Promise.all(logPromises);
        }
    }

    this.__getFormattedString__ = function(message, level, meta) {
        return this.__applyFilters__(logger.formatter.format(message, level, meta));
    }

    this.__applyFilters__ = function(str) {
        return logger.filters.reduce(function(toBeFiltered, filter){
            return filter.apply(toBeFiltered);
        }, str);
    }
}

module.exports = function Logger(filters, writers, formatter) {
    debugger;
    this.filters = filters || [new IdentityFilter()];
    this.writers = writers || [new ConsoleWriter()];
    this.formatter = formatter || new DefaultFormatter();

    this.log = (meta) => new Log(meta, this);
    this.addFilter = (filter) => this.filters.push(filter);
    this.addWriter = (writer) => this.writers.push(writer);
}
