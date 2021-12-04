'use strict'

const makeDeployCommand = require('./deploy/_')
const makeQueryCommand = require('./query/_')
const makeTxCommand = require('./tx/_')

const commander = require('commander')
const program = new commander.Command()
program.version('0.0.1')

program.addCommand(makeDeployCommand())
program.addCommand(makeTxCommand())
program.addCommand(makeQueryCommand())

program.parse(process.argv)
