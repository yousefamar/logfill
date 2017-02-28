``#!/usr/bin/env node``

require! [ yargs ]

argv = yargs.usage 'Usage: $0 <command> [options]'
  .command 'auto', 'Automatically fill gaps with most likely'
  .example 'cat log-sparse.json | $0 auto > log-dense.json' 'Autofill gaps in log-sparse.json and write the results to log-dense.json'
  .command 'manual', 'Manually select what gaps are filled with with the aid of prompts'
  .example 'cat log-sparse.json | $0 manual -o log-dense.json' 'Go through log-sparse.json and manually fill gaps with prompts while results are written to log-dense.json'
  .demand-command!

  .alias \o \output-file
  .nargs \o 1
  .describe \o 'Output file directory needed for manual mode'

  .alias \t \threshold
  .nargs \t 1
  .describe \t 'A value in the range [0.0, 1.0] that controls aaaaaaa'

  .help \h
  .alias \h \help
  .epilog 'Happy logging, Captain!'
  .argv

log = []

process-entry = ->
  log.push it
  it

buffer = ''
process.stdin.on \readable ->
  chunk = process.stdin.read!

  return unless chunk?

  buffer += chunk

  while ~buffer.index-of \\n
    buffer .= split \\n
    # TODO: Handle malformed input
    buffer.shift! |> JSON.parse |> process-entry
    buffer .= join \\n

process.stdin.on \end !->
