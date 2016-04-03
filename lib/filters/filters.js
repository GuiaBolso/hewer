var exports = module.exports = {}

exports.IdentityFilter = function() {
    this.apply = (str) => str
}

exports.PatternFilter = function(pattern, replace) {
    this.pattern = pattern;
    this.apply = (str) => str.replace(pattern, replace)
}
