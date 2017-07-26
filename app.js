#!/usr/bin/env node
'use strict';

const program = require('commander');
const Path = require('path');
const { writeFile, readFile } = require('fs');
const chalk = require('chalk')
const sketch2json = require('sketch2json');

program
  .command('* <path>')
  .description('parse sketch file to json file')
  .action((path) => {

    if(!path){
      console.log('You must defined path');
    }

    readFile(path, (err, data) => {

      if(err){
        console.log(chalk.bold.red(`❌  ${err}`));
      }

      sketch2json(data).then(result => {

        const name = Path.parse(path).name;


        writeFile(`${name}.json`, JSON.stringify(result, null, 4), (err) => {

          if (err) {
            return console.log(chalk.bold.red(`❌  ${err}`));
          }

          console.log(chalk.bold.green(`✓ ${name}.json created`));
          process.exit();

        });
      })
    });
  });

program.parse(process.argv);