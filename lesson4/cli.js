#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");

const currentDirectory = process.cwd();
let directory = process.cwd();

const isFile = (fileName) => fs.lstatSync(fileName).isFile();
let list = fs.readdirSync(directory).filter(isFile);

inquirer
    .prompt([
        {
            name: "folderName",
            type: "input",
            message: "Type directory name, or press Enter to continue in current directory:",
        },
    ])
    .then((answer) => {
        if(answer.folderName) {
            directory = answer.folderName
            list = fs.readdirSync(directory);
        } else list = fs.readdirSync(directory);
        chooseFile(list, directory);
    });

function chooseFile (list, dir) {
    inquirer
    .prompt([
        {
            name: "fileName",
            type: "list",
            message: "Choose file or directory:",
            choices: list,
        }
    ])
        .then((answer) => {
            let name = dir + "/" + answer.fileName;
            console.log(name);
            if(fs.lstatSync(name).isFile()) {
                console.log("this is a file!");
                chooseSearchString(name);
            } else {
                console.log("this is a folder!")
                list = fs.readdirSync(name);
                chooseFile(list, name);
            }
        });
}

function chooseSearchString(file) {
    console.log("Сейчас будем читать" + file);
    inquirer
        .prompt([
            {
                name: "strings",
                type: "input",
                message: "Type strings for search with one space between or press enter for read file in console",
            }
        ])
        .then((answer) => {
            if(answer.strings) {
                const searchStrings = (answer.strings.split(' '));
                console.log("Ищем строки, содержащие: ", searchStrings);
                const reader = fs.createReadStream(file, 'utf-8');
                const lineReader = require('readline').createInterface({
                    input: reader,
                });
                reader.on('error', (err) => console.log(err));

                let writeStreams = [];

                searchStrings.forEach((string) => {
                    writeStreams[string] = fs.createWriteStream(currentDirectory + "/" + string + '.log',  { flags: 'a', encoding: 'utf8' });
                    writeStreams[string].on('error', (err) => console.log(err));
                });

                lineReader.on('line', (line) => {
                    searchStrings.forEach((string) =>{
                        if(line.includes(string)) {
                            writeStreams[string].write(line + '\n');
                        }
                    })
                })

                lineReader.on('close', () => console.log("Завершено чтение файла"));
                lineReader.on('error', (err) => console.log('err'));
            } else {
                fs.readFile(file, 'utf-8', (err, data) => {
                    if (err) console.log(err);
                    else console.log(data);
                });
            }
        })

}