var fs = require('fs');
var path = require('path');
var ansi = require('ansi')(process.stdout);

module.exports = function(workingDir, options){
   var logFile = options.logFile;

   var logOK = function(logElement){
      ansi.black().bg.green().write('  OK  ').reset().write(' ');
      console.log(logElement);
      if( logFile !== null ){
         fs.appendFileSync(logFile, '[  OK  ] ', { encoding: 'utf8' });
         fs.appendFileSync(logFile, logElement + '\n', { encoding: 'utf8' });
      }
   };

   var logFAIL = function(logElement){
      ansi.brightWhite().bg.red().write(' FAIL ').reset().write(' ');
      console.log(logElement);
      if( logFile !== null ){
         fs.appendFileSync(logFile, '[ FAIL ] ', { encoding: 'utf8' });
         fs.appendFileSync(logFile, logElement + '\n', { encoding: 'utf8' });
      }
   };

   var logDUPE = function(logElement){
      ansi.brightCyan().bg.magenta().write(' DUPE ').reset().write(' ');
      console.log(logElement);
      if( logFile !== null ){
         fs.appendFileSync(logFile, '[ DUPE ] ', { encoding: 'utf8' });
         fs.appendFileSync(logFile, logElement + '\n', { encoding: 'utf8' });
      }
   };

   var logSKIP = function(logElement){
      ansi.brightGreen().bg.blue().write(' SKIP ').reset().write(' ');
      console.log(logElement);
      if( logFile !== null ){
         fs.appendFileSync(logFile, '[ SKIP ] ', { encoding: 'utf8' });
         fs.appendFileSync(logFile, logElement + '\n', { encoding: 'utf8' });
      }
   };

   var usedNames = [];
   var filenames = fs.readdirSync(workingDir);
   filenames.forEach(function(nextFilename){
      var fileLines = (function(fileDir, fileName){
         try {
            return fs.readFileSync(
               path.join(fileDir, fileName),
               { encoding: 'utf8' }
            ).split(/[\r\n]+/);
         } catch(e) {
            if( options.rusMode ){
               logFAIL([
                  'Файл ',
                  fileName,
                  ' не может быть прочитан.'
               ].join(''));
            } else {
               logFAIL([
                  'File ',
                  fileName,
                  ' cannot be read.'
               ].join(''));
            }
            return null;
         }
      })(workingDir, nextFilename);
      if( fileLines === null ) return;

      var firstLineParts = /^\s*[Aa][Rr][Ee][Aa]\s*:\s*(\S+)\s*$/.exec(
         fileLines[0]
      );
      if( firstLineParts === null ){
         if( options.rusMode ){
            logSKIP([
               'Файл ',
               nextFilename,
               ' не выглядит как рулесы. Пропущен.'
            ].join(''));
         } else {
            logSKIP([
               'File ',
               nextFilename,
               ' does not seem like a rules file. Skipped.'
            ].join(''));
         }
         return;
      }
      if(!( /^[A-Za-z0-9&._-]+$/.test(firstLineParts[1]) )){
         if( options.rusMode ){
            logSKIP([
               'Эхотаг ',
               firstLineParts[1],
               ' выглядит содержащим неверные символы. Пропущен.'
            ].join(''));
         } else {
            logSKIP([
               'Echotag ',
               firstLineParts[1],
               ' seem to contain wrong characters. Skipped.'
            ].join(''));
         }
         return;
      }
      var newName = firstLineParts[1].toUpperCase().replace(
         /\./g, '_'
      ) + '.rul';
      if( usedNames.indexOf(newName) > -1 ){
         if( options.rusMode ){
            logDUPE([
               'Имя ',
               newName,
               ' было использовано ранее. Файл ',
               nextFilename,
               ' не может быть переименован.'
            ].join(''));
         } else {
            logDUPE([
               'The name ',
               newName,
               ' was used already. File ',
               nextFilename,
               ' cannot be renamed.'
            ].join(''));
         }
         return;
      }

      var renamedFine = (function(fileDir, fileName, fileNewName){
         try {
            fs.renameSync(
               path.join(fileDir, fileName),
               path.join(fileDir, fileNewName)
            );
            return true;
         } catch(e) {
            if( options.rusMode ){
               logFAIL([
                  'Файл ',
                  fileName,
                  ' не может быть переименован в ',
                  fileNewName
               ].join(''));
            } else {
               logFAIL([
                  'File ',
                  fileName,
                  ' cannot be renamed to ',
                  fileNewName
               ].join(''));
            }
            return false;
         }
      })(workingDir, nextFilename, newName);
      if( renamedFine ){
         if( options.rusMode ){
            logOK([
               'Файл ',
               nextFilename,
               ' переименован в ',
               newName
            ].join(''));
         } else {
            logOK([
               'File ',
               nextFilename,
               ' is renamed to ',
               newName
            ].join(''));
         }
      }
   });
};