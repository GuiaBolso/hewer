# Hewer
[https://www.npmjs.com/package/hewer](https://www.npmjs.com/package/hewer "Hewer npm registry")

A small, flexible and easy-to-use logging library for node.js

# Index
* [Basic Usage](#basic-usage)
* [API](#api)
* [Filters](#filters)
* [Formatters](#formatters)
* [Writers](#writers)

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
A filter receives a formatted log message and then applies some string-transformation rule over it.

## Usage

```javascript
var hewer = require('hewer');
var PatternFilter = hewer.filters.PatternFilter;

var nameErasingFilter = new PatternFilter(/(\"name\"\:)(\".*?\")/, '$1[REDACTED]');

var Logger = new hewer.Logger([nameErasingFilter]);

Logger.log({ // A JSON of data to be logged
  'name'  : 'Aragorn',
  'class' : 'Ranger'
})
.with('level', '99') // Add more meta data
.with('kingdom', 'Gondor') // And a few more meta data
.info('Here comes the king');

// 2016-04-08T15:02:54.022 INFO Here comes the king {"name":[REDACTED],"class":"Ranger","level":"99","kingdom":"Gondor"}
```

## Built-in Filters

### class `IdentityFilter`
The default filter used in case you don't pick any. Just returns the string as it is.

#### Usage
```javascript
var IdentityFilter = require('hewer').filters.IdentityFilter;

var filter = new IdentityFilter();

console.log(filter.apply('You shall not pass!'));
//You shall not pass!
```

### class `PatternFilter(pattern, replacement)`
A filter that applies a pattern or substring and replaces it by a pattern or substring

#### Parameters
1. `pattern` : `STRING or REGEXP` - `MANDATORY` - The pattern for matching some string
2. `replacement` : `STRING` - `MANDATORY` - The string for which the pattern should be replaced

#### Usage
```javascript
var PatternFilter =  require('hewer').filters.PatternFilter;

var filter = new PatternFilter(/(Aragorn)/, '$1 (A.K.A Strider)');

console.log(filter.apply("I am Aragorn son of Arathorn"));
//I am Aragorn (A.K.A Strider) son of Arathorn
```

## Custom filter
A filter is simply a class that has an `apply` method that takes a string as parameter and returns a string

```javascript
var hewer = require('hewer');

function CustomFilter() {
	this.apply = function(str) {
		//Do something with the string
		return str + " That's what Bilbo Baggins hates!";
	}
}

var Logger = new hewer.Logger([new CustomFilter()])

Logger.log().warn('Smash the bottles and burn the corks!');
//2016-04-10T15:30:50.546 WARN Smash the bottles and burn the corks! {} That's what Bilbo Baggins hates!
Logger.log().warn('Chip the glasses and crack the plates!');
//2016-04-10T15:30:50.551 WARN Chip the glasses and crack the plates! {} That's what Bilbo Baggins hates!
```

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
