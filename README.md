# Hewer
[![wercker status](https://app.wercker.com/status/1530b3086576b34687fb4819b7a4ff4a/s "wercker status")](https://app.wercker.com/project/bykey/1530b3086576b34687fb4819b7a4ff4a)

[https://www.npmjs.com/package/hewer](https://www.npmjs.com/package/hewer "Hewer npm registry")

A small, flexible and easy-to-use logging library for node.js

# Index
* [Installation](#installation)
* [Basic Usage](#basic-usage)
* [API](#api)
* [Filters](#filters)
* [Formatters](#formatters)
* [Writers](#writers)
* [Contributing](#contributing)
* [License](#license)

# Installation

```
npm install --save hewer
```

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

// 2016-04-05T03:32:15.604 INFO Here comes the king {"name":"Aragorn","class":"Ranger","level":"99","kingdom":"Gondor"}
```
# API

## class `Logger(filters, writers, formatter)`

### Parameters
1. `filters`: `Array of Filter` - `OPTIONAL` - A list of filters that will be applied to the log message.
2. `writers`: `Array of Writer` - `OPTIONAL` - A list of writers that will be used to write the log message to some output. If no writer is provided then the `ConsoleWriter` will be used.
3. `formatter`: `Formatter` - `OPTIONAL` - A formatter that may transform and format the message before sending it to a writer. If no formatter is provided then the `DefaultFormatter` will be used.

## `Logger.log(meta)` returns [`Log`](#class-logmeta-logger)
Creates a new log instance with the optional provided meta data.

### Parameters
1. `meta` : `JSON` - `OPTIONAL` - A JSON with a any arbitrary meta.

## `Logger.addFilter(filter)`
Adds a [Filter](#filters) to the filters pool

### Parameters
1. `filter` : [`Filter`](#filters) - `MANDATORY` - 

## `Logger.addWriter(writer)` returns `Log`
Adds a [Writer](#writers) to the writers pool

### Parameters
1. `writer` : [`Writer`](#writers) - `MANDATORY` - 

## `Logger.setFormatter(formatter)`
Defines the [Formatter](#formatters) that's going to be used

### Parameters
1. `formatter` : [`Formatter`](#formatters) - `MANDATORY`

## class `Log(meta, logger)`

### Parameters
1. `meta` : `JSON` - `MANDATORY` - A JSON with a any arbitrary meta.
2. `logger` : [`Logger`](#logger) - `MANDATORY`

## `Log.with(key, value)` returns [`Log`](#class-logmeta-logger)
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

----

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

### API

#### interface `Filter()`

#### `Filter.apply(message)` returns `STRING`

##### Parameters
1. `message` : `STRING` - `MANDATORY` - The log string that will be sent to a writer

### Usage
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

## Built-in formatters

### class `DefaultFormatter()`

#### Usage

```javascript
var DefaultFormatter =  require('hewer').formatters.DefaultFormatter;

var formatter = new DefaultFormatter();

console.log(formatter.format("There is only one Lord of the Ring, only one who can bend it to his will", "INFO", {}));
//2016-04-10T16:16:13.763 INFO There is only one Lord of the Ring, only one who can bend it to his will {}
```

## Custom formatter
A formatter is simply a class that has a `format` method that receives some `message`, some `log level name`, and some `meta data` and returns a formatted string.

### API

#### interface `Formatter`

#### `Formatter.format(message, level, meta)` returns `STRING`

##### Parameters
1. `message` : `STRING` - `MANDATORY` - The log message
2. `level` : `STRING` - `MANDATORY` - Some log level name
3. `meta` : `JSON` - `MANDATORY` - Some meta data object

### Usage

```javascript
var hewer = require('hewer');

var function CustomFormatter() {
    this.format = function(message, level, meta) {
        return `${level} ${message} ${JSON.stringify(meta)}`;
    }
}

var Logger = new hewer.Logger(null, null, new CustomFormatter())

Logger.log({ titles : [
    'The gray',
    'The white'] })
    .info('Gandalf!');
// "INFO Gandalf! {"titles":["The gray","The white"]}"
```

# Writers
A writer is the final destiny of any log message. A writer is where the message is going to be printed to the console, be sent to a database etc.

## Built-in Writers

### class `ConsoleWriter()`
Writes the log message to the console

#### Usage
```javascript
var ConsoleWriter =  require('hewer').writers.ConsoleWriter;

var writer = new ConsoleWriter();


function saySomeElficWhisper() {
    console.log('Elfic whispering!');
}

writer.info('The world has changed', saySomeElficWhisper);
//The world has changed
//Elfic whispering

writer.debug('I feel it in the water', saySomeElficWhisper);
//I feel it in the water
//Elfic whispering

writer.warn('I feel it in the earth', saySomeElficWhisper);
//I feel it in the earth
//Elfic whispering

writer.error('I smell it in the air', saySomeElficWhisper);
//I smell it in the air
//Elfic whispering

```

####

## Custom writers

### API

#### interface `Writer`

#### `Writer.info(message, callback)`
Writes message with INFO log level

##### Parameters
1. `message` : `STRING` - `MANDATORY` - The log message
2. `callback` : `FUNCTION` - `MANDATORY` - A callback function to be called after the writer task has been executed

#### `Writer.debug(message, callback)` returns `Promise`
Just like [Writer.info](#info) but with DEBUG log level

#### `Writer.warn(message, callback)` returns `Promise`
Just like [Writer.info](#info) but with WARN log level

#### `Writer.error(message, callback)` returns `Promise`
Just like [Writer.info](#info) but with ERROR log level

## Asynchronous writers
To be documented

# Contributing
If you want to contribute to the project with new Filters, Formatters, Writers, fixes, functionalities, optimizations, documentation, issues etc. All you have to do is open an issue and, if needed, fork this project and make a pull request.

# License

```
The MIT License (MIT)

Copyright (c) 2016 Mateus Chagas

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
