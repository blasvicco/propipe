# propipe

This is a node module that implement a Pipeline Patter Design using Promise and OOP.

### Example:
Please refer to the [example](example/example.js) file to see a running example.

To run the example:
1. Clone the repository
2. Execute in console:
```BASH
node example/example.js
```
Or, in case you want to test a broken pipe
```BASH
node example/example.js 1
```

### General Usage
If you follow the example you will find how to use it but in general the idea is:
```JAVASCRIPT
//import the needed class definition
let [PackageObj, PipelineAbstract, Pipeline] = require('propipe');

//Define the pipe steps and its actions
class Pipe extends PipelineAbstract {
  //we can override the cosntructors if we need it
  cosntructor(something) {
    super();
    this.something = something;
  }
  
  //We need to implement the flow method
  //flow method always should return a Promise
  flow() {
    let that = this;
    return new Promise((Resolve, Reject) => {
        that.promise.then((pkg) => {
          //pkg is the package flowing through the pipe
          //we performe the actions we need here...
          pkg = {attr_1: 'whatever 1', attr_2: 'whatever 2'};
          Resolve(pkg);
        }).catch((e) => Reject(e));
    });
  }
}

class PipeAlt extends PipelineAbstract {
  flow() {
    let that = this;
    return new Promise((Resolve, Reject) => {
        that.promise.then((pkg) => {
          Resolve({attr_1: 'whatever 1', attr_new: 'whatever'});
        }).catch((e) => Reject(e));
    });
  }
}

//Pipeline chains will looks like
PackageObj.init({attr_1: 'val_1', attr_2: 'val_2'});
let PipelineFlow = new Pipeline(PackageObj);
PipelineFlow
  .pipe(new Pipe('wahtever 1'))
  .pipe(new Pipe('wahtever 2'))
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
