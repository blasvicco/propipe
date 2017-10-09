let PackageInterface = require('./PackageInterface');
class PackageObj extends PackageInterface {
    init(state) {
        for (let attr in state) {
            this[attr] = state[attr];
        }
    }
}
module.exports = PackageObj;
