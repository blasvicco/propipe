const AbstractPipeline = require('./AbstractPipeline');
module.exports = class Pipeline extends AbstractPipeline {
  constructor(pkg) {
    super();
    this.pkg = pkg;
  }

  flow() {
    const { pkg } = this;
    return new Promise((Resolve, Reject) => {
      try {
        Resolve(pkg);
      } catch (e) {
        Reject(e);
      }
    });
  }
};

