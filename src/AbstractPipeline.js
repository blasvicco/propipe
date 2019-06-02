module.exports = class AbstractPipeline {
  constructor() {
    const err = {
      100: 'Cannot construct Abstract/Interface instances directly',
      101: 'Must override method',
    };

    if (new.target === AbstractPipeline) {
      throw new TypeError(err[100]);
    }

    const required = ['flow'];
    for (let func of required) {
      const defined = eval('typeof this.' + func + ' === "function"');
      if (!defined) {
        throw new TypeError(`${err[101]} ${func}`);
      }
    }
  }

  pipe(Pipe) {
    return Pipe._setPromise(this.flow());
  }

  _setPromise(promise) {
    this.promise = promise;
    return this;
  }
};
