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

            const targetDirPath = `${currentPath}/pages/${fileName}`;
            const targetFilePath = `${targetDirPath}/index.tsx`;

            if (fs.existsSync(targetFilePath)) {
                return;
            }

            if (!fs.existsSync(targetDirPath)) {
                fs.mkdirSync(targetDirPath);
            }
            
            fs.writeFileSync(targetFilePath, templates.page(fileName));
        }
    }
}

commander.arguments("<action> <target> <name>").action((action, target, name) => {
    const selectedAction = actions[action][target];
    selectedAction(name);
}).parse(process.argv);