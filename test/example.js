const { AbstractPipeline, Package, Pipeline } = require('../propipe');

class Step extends AbstractPipeline {
  constructor(step, msg) {
    super();
    this.step = step;
    this.msg = msg;
  }
  flow() {
    return new Promise((Resolve, Reject) => {
      this.promise.then((pkg) => {
        console.log('### Step Action ###');
        console.log(pkg);
        Resolve({
          step: this.step,
          msg: 'Step ' + this.msg,
        });
      }).catch((e) => Reject(e));
    });
  }
}

class StepWhatEver extends AbstractPipeline {
  constructor(errCode) {
    super();
    this.errCode = errCode;
  }
  flow() {
    return new Promise((Resolve, Reject) => {
      this.promise.then((pkg) => {
        console.log('### Whatever Action ###');
        console.log(pkg);
        console.log('////// We change the package obj as we want...');
        Resolve({
          err: this.errCode,
          msg: 'There is no really an error... we are just testing!',
        });
      }).catch((e) => Reject(e));
    });
  }
}

class StepErrHandler extends AbstractPipeline {
  flow() {
    return new Promise((Resolve, Reject) => {
      this.promise.then((pkg) => {
        console.log('### Error Handler Action ###');
        console.log(pkg);
        if (pkg.err == 1) Reject(pkg.msg);
        Resolve({
          step: 'N - 1',
          msg: '--> Step before N',
        });
      }).catch((e) => Reject(e));
    });
  }
}
/**
 * This is an example of how we can use the module.
 * After instantiate the PipelineFlow obj then we pipe steps
 * each step or pipe is an instance of AbstractPipeline
 * that has an implementation of the flow action.
 **/
function test(err) {
  console.log('########### Starting Pipe flow ' + ((err == 1) ? 'with' : 'without') + ' error ###########');
  let pkg = (new Package()).init({
    step: 0,
    msg: 'Initial state'
  });
  let PipelineFlow = new Pipeline(pkg);
  PipelineFlow
    .pipe(new Step(1, '--> First step msg'))
    .pipe(new Step(2, '--> Second step msg'))
    .pipe(new StepWhatEver(err)) //1 err, 0 no err
    .pipe(new StepErrHandler())
    .pipe(new Step('N', '--> N step msg'))
    .flow().then((pkg) => {
      console.log('////// Final package state');
      console.log(pkg);
      console.log('########### Pipe flow successfully ###########');
    }).catch((err) => {
      console.log(err);
      console.log('!!!!!!!!!!!! Broken Pipe !!!!!!!!!!!!');
    });
}
const myArgs = process.argv.slice(2);
test(myArgs[0]); //1 err, 0 no err
