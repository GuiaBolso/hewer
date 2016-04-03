var exports = module.exports = {}

exports.ConsoleWriter = function() {
    this.warn = function(msg, callback) {
        console.warn(msg)
        callback()
    }

    this.error = function(msg, callback) {
        console.error(msg)
        callback()
    }

    this.info = function(msg, callback) {
        console.info(msg);
        callback()
    }

    this.debug = function(msg, callback) {
        console.log(msg);
        callback()
    }
}
