#!/usr/bin/env node

var thisAPI = require('./fe2h-api.js');

var params = [].concat(process.argv);
params.shift(); // 'node'
params.shift(); // 'rules-fe2hpt'

var rusMode = false;
var logFile = null;
params = params.filter(function(nextParam){
   if( nextParam.toLowerCase() === '--rus' ){
      rusMode = true;
      return false;
   } else if( nextParam.indexOf('--log=') === 0 ){
      logFile = nextParam.slice('--log='.length);
      return false;
   }

   return true;
});

thisAPI(process.cwd(), {
   rusMode: rusMode,
   logFile: logFile
});
