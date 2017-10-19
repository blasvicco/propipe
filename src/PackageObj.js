let PackageInterface = require('./PackageInterface');
module.exports = class PackageObj extends PackageInterface {
    init(state) {
        for (let attr in state) {
            this[attr] = state[attr];
        }
        return this;
    }
}
