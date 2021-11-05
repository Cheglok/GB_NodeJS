const fs = require("fs");
const path = require("path");
const inquirer = require('inquirer');

const isFile = fileName => {
    return fs.lstatSync(fileName).isFile();
}

const list = fs.readdirSync(__dirname).filter(isFile);