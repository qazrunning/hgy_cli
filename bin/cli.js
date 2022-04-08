#! /usr/bin/env node

import {program} from 'commander'
import chalk from 'chalk';
import createProject from './inquirer.js'
program
.version('1.0.0')
.command('create <name>')
.description('create a new project')
.action(name => { 
    // 打印命令行输入的值
    // 文本样式
    console.log("project name is " + chalk.bgHex('#e16c96').bold(name))
    createProject(name)
})

program.parse()
