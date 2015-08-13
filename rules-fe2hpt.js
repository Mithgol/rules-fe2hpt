#!/usr/bin/env node

var thisAPI = require('./fe2h-api.js');

var params = [].concat(process.argv);
params.shift(); // 'node'
params.shift(); // 'rules-fe2hpt'

var rusMode = false;
params = params.filter(function(nextParam){
   if( nextParam.toLowerCase() === '--rus' ){
      rusMode = true;
      return false;
   }

   return true;
});

thisAPI(process.cwd(), { rusMode: rusMode });
