module.exports = class InterfacePackage {
  constructor() {
    const err = {
      100: 'Cannot construct Abstract/Interface instances directly',
      101: 'Must override method',
    };

    if (new.target === InterfacePackage) {
      throw new TypeError(err[100]);
    }

    const required = ['init'];
    for (let func of required) {
      const defined = eval('typeof this.' + func + ' === "function"');
      if (!defined) {
        throw new TypeError(`${err[101]} ${func}`);
      }
    }
  }
};
