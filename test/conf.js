exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  defaultTimeoutInterval: 50000,
  specs: ['backCasting.js'],
  
  jasmineNodeOpts: {defaultTimeoutInterval: 80000}
}
jasmineNodeOpts: {defaultTimeoutInterval: 80000}