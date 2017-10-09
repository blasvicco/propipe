class PipelineAbstract {
    constructor() {
        let err = {
            100: 'Cannot construct Abstract/Interface instances directly',
            101: 'Must override method',
        }
        if (new.target === PipelineAbstract) {
            throw new TypeError(err[100]);
        }
        let required = ['flow'];
        for (let func of required) {
            let defined = eval('typeof this.' + func + ' === "function"');
            if (!defined) {
                throw new TypeError(err[101] + ' ' + func);
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
}
module.exports = PipelineAbstract;
