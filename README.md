# Hewer
A small, flexible and easy-to-use logging library for node.js

# Basic Usage

```javascript
var hewer = require('hewer');

var Logger = new hewer.Logger();

Logger.log({ // A JSON of data to be logged
  'name'  : 'Aragorn',
  'class' : 'Ranger'
})
.with('level', '99') // Add more meta data
.with('kingdom', 'Gondor') // And a few more meta data
.info('Here comes the king');

// 2016-04-05T03:32:15.604Z INFO Here comes the king {"name":"Aragorn","class":"Ranger","level":"99","kingdom":"Gondor"}
```
# API

## class `Logger(filters, writers, formatter)`

### Parameters
1. `filters`: `Array of Filter` - `OPTIONAL` - A list of filters that will be applied to the log message.
2. `writers`: `Array of Writer` - `OPTIONAL` - A list of writers that will be used to write the log message to some output. If no writer is provided then the `ConsoleWriter` will be used.
3. `formatter`: `Formatter` - `OPTIONAL` - A formatter that may transform and format the message before sending it to a writer. If no formatter is provided then the `DefaultFormatter` will be used.

## `Logger.log(meta)` returns `Log`
Creates a new log instance with the optional provided meta data.

### Parameters
1. `meta` : `JSON` - `OPTIONAL` - A JSON with a any arbitrary meta.

## `Log.with(key, value)` returns `Log`
Appends some meta data to the log.

### Parameters
1. `key` : `STRING` - `MANDATORY` - The name of your meta data.
2. `value` : `ANY` - `MANDATORY` - Your actual data.

## `Log.info(message)` returns `Promise`
Commits the `message` and the `meta` provided to the set of writers with log level `INFO`.

### Parameters
1. `message` : `STRING` - `OPTIONAL - Some arbitrary log message.
 

## `Log.warn(message)` returns `Promise`
Just like `Log.info` but with log level `WARN`.
## `Log.error(message)` returns `Promise`
Just like `Log.info` but with log level `ERROR`.
## `Log.debug(message)` returns `Promise`
Just like `Log.info` but with log level `DEBUG`.

# Filters
To be documented

## Custom filter
To be documented

# Formatters
To be documented

## Custom formatter
To be documented

# Writers
To be documented

## Custom writers
To be documented

## Asynchonous writers
To be documented
