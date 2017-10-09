PackageObj = new(require('./src/PackageObj'))();
PipelineAbstract = require('./src/PipelineAbstract');
Pipeline = require('./src/Pipeline');

module.exports = [PackageObj, PipelineAbstract, Pipeline];
