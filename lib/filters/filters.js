var exports = module.exports = {}

var IdentityFilter;
exports.IdentityFilter = IdentityFilter = function() {
    this.apply = (str) => str
}

var PatternFilter;
exports.PatternFilter = PatternFilter = function(pattern, replace) {
    this.pattern = pattern;
    this.apply = (str) => str.replace(pattern, replace)
}

var KeyFilter;
exports.KeyFilter = KeyFilter = function(key, replace) {
    this.filter = new PatternFilter(new RegExp(`(\"${key}\"\:)((([a-zA-Z0-9.]*)|(\".*?\")|(\\[.*?\\])|(\{.*?\})))(?=(\,.*$)|(?=}$))`,'gmi'), `$1"${replace}"`);
    this.apply = (str) => this.filter.apply(str);
}
