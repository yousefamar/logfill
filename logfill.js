#!/usr/bin/env node
(function(){
  var yargs, argv, log, processEntry, buffer;
  yargs = require('yargs');
  argv = yargs.usage('Usage: $0 <command> [options]').command('auto', 'Automatically fill gaps with most likely').example('cat log-sparse.json | $0 auto > log-dense.json', 'Autofill gaps in log-sparse.json and write the results to log-dense.json').command('manual', 'Manually select what gaps are filled with with the aid of prompts').example('cat log-sparse.json | $0 manual -o log-dense.json', 'Go through log-sparse.json and manually fill gaps with prompts while results are written to log-dense.json').demandCommand().alias('o', 'output-file').nargs('o', 1).describe('o', 'Output file directory needed for manual mode').alias('t', 'threshold').nargs('t', 1).describe('t', 'A value in the range [0.0, 1.0] that controls aaaaaaa').help('h').alias('h', 'help').epilog('Happy logging, Captain!').argv;
  log = [];
  processEntry = function(it){
    log.push(it);
    return it;
  };
  buffer = '';
  process.stdin.on('readable', function(){
    var chunk, results$ = [];
    chunk = process.stdin.read();
    if (chunk == null) {
      return;
    }
    buffer += chunk;
    while (~buffer.indexOf('\n')) {
      buffer = buffer.split('\n');
      processEntry(
      JSON.parse(
      buffer.shift()));
      results$.push(buffer = buffer.join('\n'));
    }
    return results$;
  });
  process.stdin.on('end', function(){});
}).call(this);
