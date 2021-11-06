#!/usr/bin/env node
console.log(1);
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");

const isFile = (fileName) => fs.lstatSync(fileName).isFile();
const list = fs.readdirSync(__dirname).filter(isFile);

inquirer
    .prompt([{
        name: "fileName",
        type: "list",
        message: "Choose file:",
        choices: list,
    }])
    .then((answer) => {
        console.log(answer.fileName);
        const filePath = path.join(__dirname, answer.fileName);

        fs.readFile(filePath,'utf8', (err, data) => {
            console.log(data);
        });
    });

