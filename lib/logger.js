var ConsoleWriter = require('./writers/writers').ConsoleWriter
var DefaultFormatter = require('./formatters/formatters').DefaultFormatter
var IdentityFilter = require('./filters/filters').IdentityFilter

function Log(meta, logger) {
    this.logger = logger;
    this.logLevel = {
        'DEBUG' : 'debug',
        'INFO'  : 'info',
        'WARN'  : 'warn',
        'ERROR' : 'error'
    }

    this.meta = meta || {};

    this.with = function(key, value) {
        this.meta[key] = value;

        return this;
    }

    this.info = (message) =>
        this.__commit__(message, this.logLevel.INFO);

    this.warn = (message) =>
        this.__commit__(message, this.logLevel.WARN);

    this.error = (message) =>
        this.__commit__(message, this.logLevel.ERROR);

    this.debug = (message) =>
        this.__commit__(message, this.logLevel.DEBUG);

    this.__commit__ = (message, level) => {
        var logString = this.__getFormattedString__(message, level, this.meta);

        return Promise.all(logger.writers.map((w) => 
            new Promise((resolve, reject) => 
                w[level](logString, (e) => e ? reject(e) : resolve(logString)))));
    }

    this.__getFormattedString__ = (message, level, meta) =>
        this.__applyFilters__(logger.formatter.format(message, level.toUpperCase(), meta));

    this.__applyFilters__ = (str) =>
        logger.filters.reduce((toBeFiltered, filter) => filter.apply(toBeFiltered), str);
}

module.exports = function Logger(filters, writers, formatter) {
    this.filters = filters || [new IdentityFilter()];
    this.writers = writers || [new ConsoleWriter()];
    this.formatter = formatter || new DefaultFormatter();

    this.log = (meta) => new Log(meta, this);
    
    this.addFilter = (filter) => { 
        this.filters.push(filter);
        return this;
    };

    this.addWriter = (writer) => { 
        this.writers.push(writer);
        return this;
    };

    this.setFormatter = (formatter) => { 
        this.formatter = formatter;
        return this;
    };
}
