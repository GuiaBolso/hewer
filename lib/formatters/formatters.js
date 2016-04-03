var exports = module.exports = {}

exports.DefaultFormatter = function() {
    this.format = (message, level, meta) =>
        `${new Date().toISOString()} ${level} ${message} ${JSON.stringify(meta)}`;
}
