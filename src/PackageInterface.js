class PackageInterface {
    constructor() {
        let err = {
            100: 'Cannot construct Abstract/Interface instances directly',
            101: 'Must override method',
        }
        if (new.target === PackageInterface) {
            throw new TypeError(err[100]);
        }
        let required = ['init', ];
        for (let func of required) {
            let defined = eval('typeof this.' + func + ' === "function"');
            if (!defined) {
                throw new TypeError(err[101] + ' ' + func);
            }
        }
    }
}
module.exports = PackageInterface;
