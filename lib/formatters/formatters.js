var exports = module.exports = {}

exports.DefaultFormatter = function() {
    this.format = (message, level, meta) => {
        var tzoffset = (new Date()).getTimezoneOffset() * 60000;
        var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0,-1);

        return `${localISOTime} ${level} ${message} ${JSON.stringify(meta)}`;
    }
}
