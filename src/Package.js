const InterfacePackage = require('./InterfacePackage');
module.exports = class Package extends InterfacePackage {
  init(state) {
    return { ...this, ...state };
  }
};
