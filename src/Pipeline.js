let PipelineAbstract = require('./PipelineAbstract');
class Pipeline extends PipelineAbstract {
    constructor(pkg) {
        super();
        this.pkg = pkg;
    }
    flow() {
        let that = this;
        return new Promise((Resolve, Reject) => {
            try {
                Resolve(that.pkg);
            } catch (e) {
                Reject(e);
            }
        });
    }
}
module.exports = Pipeline;
