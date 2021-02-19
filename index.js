#! /usr/bin/env node
const commander = require('commander');
const fs = require('fs');
const _ = require('lodash');
const templates = require('./templates');

const actions = {
    create: {
        page: (name) => {
            const currentPath = process.cwd();
            const fileName = _.chain(name).camelCase().upperFirst().value();

            const targetDirPath = `${currentPath}/pages`;
            const targetFilePath = `${targetDirPath}/${fileName}.tsx`;

            if (fs.existsSync(targetFilePath)) {
                return;
            }

            fs.mkdirSync(targetDirPath)
            fs.writeFileSync(targetFilePath, templates.page(fileName));
        }
    }
}

commander.arguments("<action> <target> <name>").action((action, target, name) => {
    const selectedAction = actions[action][target];
    selectedAction(name);
}).parse(process.argv);