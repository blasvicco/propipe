# propipe

This is a node module that implement a Pipeline Patter Design using Promise and OOP.

### Example:
Please refer to the [example](test/example.js) file to see a running example.

To run the example:
1. Clone the repository
2. Execute in console:
```BASH
node test/example.js
```
Or, in case you want to test a broken pipe
```BASH
node test/example.js 1
```

### General Usage
If you follow the example you will find how to use it but in general the idea is:
```JAVASCRIPT
//import the needed class definition
const { AbstractPipeline, Package, Pipeline } = require('propipe');

//Define the pipe steps and its actions
class Pipe extends AbstractPipeline {
  //we can override the cosntructors if we need it
  cosntructor(something) {
    super();
    this.something = something;
  }

  //We need to implement the flow method
  //flow method always should return a Promise
  flow() {
    return new Promise((Resolve, Reject) => {
      this.promise.then((pkg) => {
        //pkg is the package flowing through the pipe
        //we performe the actions we need here...
        pkg = {attr1: 'whatever 1', attr2: 'whatever 2'};
        Resolve(pkg);
      }).catch((e) => Reject(e));
    });
  }
}

class PipeAlt extends AbstractPipeline {
  flow() {
    return new Promise((Resolve, Reject) => {
      this.promise.then((pkg) => {
        Resolve({attr1: 'whatever 1', attrNew: 'whatever'});
      }).catch((e) => Reject(e));
    });
  }
}

//Pipeline chains will looks like
let pkg = (new Package()).init({attr1: 'val_1', attr2: 'val_2'});
let PipelineFlow = new Pipeline(pkg);
PipelineFlow
  .pipe(new Pipe('whatever 1'))
  .pipe(new Pipe('whatever 2'))
  .pipe(new PipeAlt())
  .flow()
  .then((pkg) => {
    //Final package state
    console.log('########### Pipe flow successfully ###########');
  })
  .catch((err) => {
      console.log(err);
      console.log('!!!!!!!!!!!! Broken Pipe !!!!!!!!!!!!')
  });
```
