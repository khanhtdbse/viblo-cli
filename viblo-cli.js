#!/usr/bin/env node
const program = require('commander')
const figlet = require('figlet')

program
  .version('0.1.0')
  .description('Viblo CLI')
  .option('-p, --posts', 'Get newest posts')
  .parse(process.argv)

if (program.posts) require('./commands/posts-newest')()

console.log(figlet.textSync('Welcome to Viblo CLI!'))

program.outputHelp()
