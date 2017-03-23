#!/usr/bin/env node
'use strict';

const program = require('commander');
const Path = require('path');
const fs = require('fs');
const sketch2json = require('sketch2json');

program
  .version('0.0.1')
  .option('-n, --name [name]', 'name of file will be generate')
  .command('parse <path>')
  .description('parse sketch file to json file')
  .action((path, options) => {

    if(!path){
      console.log('You must defined path');
    }

    fs.readFile(path, (err, data) => {

      if(err){
        console.log('err',err);
      }

      sketch2json(data).then(result => {

        const name = (typeof options.name === 'string') ? options.name : Path.parse(path).name;
        
        fs.writeFile(`${name}.json`, JSON.stringify(result, null, 4), (err) => {

          if (err) {
            return console.log('err', err);
          }

          process.exit();

        });
      })
    });
  });

program.parse(process.argv);