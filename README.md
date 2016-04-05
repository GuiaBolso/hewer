# Hewer
A small, flexible and easy-to-use logging library for node.js

## Basic Usage

```JavaScript
var hewer = require('hewer');

var Logger = new hewer.Logger();

Logger.log({ // A JSON of data to be logged
  'name'  : 'Aragorn',
  'class' : 'Ranger'
})
.with('level', '99') // Add more meta data
.with('kingdom', 'Gondor')
.info('Here comes the king');

// 2016-04-05T03:32:15.604Z INFO Here comes the king {"name":"Aragorn","class":"Ranger","level":"99","kingdom":"Gondor"}
```

## Filters
To be documented

### Custom filter
To be documented

## Formatters
To be documented

### Custom formatter
To be documented

## Writers
To be documented

### Custom writers
To be documented

### Asynchonous writers
To be documented
