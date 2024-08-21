#!/usr/bin/env node

import {input, select} from '@inquirer/prompts';
import * as path from "path";
import * as fs from "fs";
import {generateModuleReadMe} from "./stubs/generic/moduleReadme.js";
import {generateComponentsReadMe} from "./stubs/generic/componentsReadme.js";
import {generateComposablesReadMe} from "./stubs/generic/composablesReadme.js";
import {generatePagesReadMe} from "./stubs/generic/pagesReadme.js";
import {generateMiddlewareReadMe} from "./stubs/generic/middlewareReadme.js";
import {generateServicesReadMe} from "./stubs/generic/servicesReadme.js";
import {generateRoutesContent} from "./stubs/generic/routesContent.js";
import {generatePagesContent} from "./stubs/generic/pagesContent.js";
import {generateComponentsContent} from "./stubs/generic/componentsContent.js";
import {generateMiddlewareContent} from "./stubs/generic/middlewareContent.js";
import {generateStoreContent} from "./stubs/generic/storeContent.js";
import {generateTypesContent} from "./stubs/generic/typesContent.js";
import {generateComposablesContent} from "./stubs/generic/composablesContent.js";
import {generateServicesContent} from "./stubs/generic/servicesContent.js";
import {generateUtilsReadme} from "./stubs/generic/utilsReadme.js";
import {generateUtilsContent} from "./stubs/generic/utilsContent.js";
import {generateMainModuleRoutesContent} from "./stubs/generic/mainModuleRoutesContent.js";
import {formatKebabCaseModuleName} from "./stubs/utils/formatKebabCaseModuleName.js";


function getBaseModuleBaseDir(){
    return path.join(process.cwd(), 'src', 'modules');

}
function getModuleBaseDir(moduleName) {
    return path.join(process.cwd(), 'src', 'modules', moduleName);
}

function getSubmoduleBaseDir(mainModuleName, subModuleName){
    return path.join(process.cwd(), 'src', 'modules', mainModuleName, subModuleName);
}

const folders = [
    'components',
    'composables',
    'pages',
    'middleware',
    'services',
    'utils'
];

const selectedModuleType = await select({
    message: 'Select a module type',
    choices: [
        {
            name: 'Standalone Module',
            value: 'standalone',
            description: 'A self-contained module without submodules. It includes components, composables, pages, routes, middleware, services, README, store, and types.'
        },
        {
            name: 'Composite Module',
            value: 'composite',
            description: 'A module with submodules or all related files. It includes additional layers of submodules and their respective components.'
        },
        {
            name: 'Add submodule to existing module',
            value: 'addSubmoduleToExistingModule',
            description: 'Add new submodule to existing module.'
        },
    ],
});
if (selectedModuleType === 'standalone') {
    let moduleName = await input(
        {
            message: 'Enter module name',
            required: true,
            validate: (moduleName) => {
                const baseDir = getModuleBaseDir(moduleName.replace(/\s+/g, ''))
                if (fs.existsSync(baseDir)) {
                    return `Error: A module with the name "${moduleName}" already exists.`
                }
                return true;
            }
        }
    );

    moduleName = moduleName.replace(/\s+/g, '');
    const moduleBaseDir = getModuleBaseDir(moduleName);

    folders.forEach(folder => {
        const folderPath = path.join(moduleBaseDir, folder);
        fs.mkdirSync(path.join(folderPath), {recursive: true});
        moduleName = formatKebabCaseModuleName(moduleName);

        switch (folder) {
            case 'components':
                fs.writeFileSync(path.join(folderPath, 'README.md'), generateComponentsReadMe(moduleName));
                fs.writeFileSync(path.join(folderPath, capitalizeFirstLetter(moduleName) + 'ExampleComponent.vue'), generateComponentsContent());
                break;
            case 'composables':
                fs.writeFileSync(path.join(folderPath, 'README.md'), generateComposablesReadMe(moduleName));
                fs.writeFileSync(path.join(folderPath, moduleName + 'Composable.ts'), generateComposablesContent(capitalizeFirstLetter(moduleName)));
                break;
            case 'pages':
                fs.writeFileSync(path.join(folderPath, 'README.md'), generatePagesReadMe(moduleName));
                fs.writeFileSync(path.join(folderPath, capitalizeFirstLetter(moduleName) + 'Page.vue'), generatePagesContent(
                    moduleName,
                    capitalizeFirstLetter(moduleName) + 'Page',
                    capitalizeFirstLetter(moduleName) + 'ExampleComponent',
                    'use' + capitalizeFirstLetter(moduleName) + 'Store',
                    moduleName + capitalizeFirstLetter('store'),
                    'use' + capitalizeFirstLetter(moduleName) + 'Composable',
                    moduleName + 'Composable'
                ));
                break;
            case 'middleware':
                fs.writeFileSync(path.join(folderPath, 'README.md'), generateMiddlewareReadMe(moduleName));
                fs.writeFileSync(path.join(folderPath, 'setup' + capitalizeFirstLetter(moduleName) + 'Page' + '.ts'), generateMiddlewareContent(
                    'use' + capitalizeFirstLetter(moduleName) + 'Store',
                    'store',
                    'setup' + capitalizeFirstLetter(moduleName) + 'Page'
                ));

                break;
            case 'services':
                fs.writeFileSync(path.join(folderPath, 'README.md'), generateServicesReadMe(moduleName));
                fs.writeFileSync(path.join(folderPath, moduleName + 'Service.ts'), generateServicesContent());
                break;
            case 'utils':
                fs.writeFileSync(path.join(folderPath, 'README.md'), generateUtilsReadme(moduleName));
                fs.writeFileSync(path.join(folderPath, moduleName + 'Utils.ts'), generateUtilsContent());
                break;
            default:
                console.error('Unknown folder')
                process.exit(1);
        }

    });
    fs.writeFileSync(path.join(moduleBaseDir, 'routes.ts'), generateRoutesContent(moduleName,
        capitalizeFirstLetter(moduleName) + 'Page.vue', 'setup' + capitalizeFirstLetter(moduleName) + 'Page'));
    fs.writeFileSync(path.join(moduleBaseDir, 'README.md'), generateModuleReadMe(moduleName));
    fs.writeFileSync(path.join(moduleBaseDir, 'store.ts'), generateStoreContent(
        'use' + capitalizeFirstLetter(moduleName) + 'Store',
        moduleName + capitalizeFirstLetter('store'),
        capitalizeFirstLetter(moduleName) + 'StoreState',
        moduleName,
        moduleName + 'Service'));
    fs.writeFileSync(path.join(moduleBaseDir, 'types.ts'), generateTypesContent(capitalizeFirstLetter(moduleName) + 'StoreState'));
}

function capitalizeFirstLetter(str) {
    if (!str) return str; // Handle empty strings
    return str.charAt(0).toUpperCase() + str.slice(1);
}

if (selectedModuleType === 'composite') {

    const subModuleList = [];

    let subModuleListCompleted = false;
    let mainModuleName = await input({
        message: 'Enter your main module name',
        required: true,
        validate: (moduleName) => {
            const baseDir = getModuleBaseDir(moduleName.replace(/\s+/g, ''))
            if (fs.existsSync(baseDir)) {
                return `Error: A module with the name "${moduleName}" already exists.`
            }
            return true;
        }
    });

    mainModuleName = mainModuleName.replace(/\s+/g, '')


    while (!subModuleListCompleted) {

        let message =`(${mainModuleName}) Enter your sub module name`




        const subModuleName = await input({
            message: message,
            required: true,
            validate: (subModuleName) => {
                if(subModuleList.find(subModule => subModule === subModuleName.replace(/\s+/g, ''))){
                    return `Error: A submodule with the name "${subModuleName}" already exists.`
                }

                return true;
            }
        });
        subModuleList.push(subModuleName.replace(/\s+/g, ''));

        const defineMoreModules = await select({
            message: `Would you like to define another sub module? Currently entered: ${subModuleList}`,
            choices: [
                {
                    name: 'Yes',
                    value: true,
                },
                {
                    name: 'No',
                    value: false,
                },
            ],
        });

        if (!defineMoreModules) {
            subModuleListCompleted = true;
        }

    }


    subModuleList.forEach(submodule => {
        const subModuleBaseDir = getSubmoduleBaseDir(mainModuleName, submodule);

        folders.forEach(folder => {
            const folderPath = path.join(subModuleBaseDir, folder);
            fs.mkdirSync(path.join(folderPath), {recursive: true});
            submodule = formatKebabCaseModuleName(submodule);
            switch (folder) {
                case 'components':
                    fs.writeFileSync(path.join(folderPath, 'README.md'), generateComponentsReadMe(submodule));
                    fs.writeFileSync(path.join(folderPath, capitalizeFirstLetter(submodule) + 'ExampleComponent.vue'), generateComponentsContent());
                    break;
                case 'composables':
                    fs.writeFileSync(path.join(folderPath, 'README.md'), generateComposablesReadMe(submodule));
                    fs.writeFileSync(path.join(folderPath, submodule + 'Composable.ts'), generateComposablesContent(capitalizeFirstLetter(submodule)));
                    break;
                case 'pages':
                    fs.writeFileSync(path.join(folderPath, 'README.md'), generatePagesReadMe(submodule));
                    fs.writeFileSync(path.join(folderPath, capitalizeFirstLetter(submodule) + 'Page.vue'), generatePagesContent(
                        submodule,
                        capitalizeFirstLetter(submodule) + 'Page',
                        capitalizeFirstLetter(submodule) + 'ExampleComponent',
                        'use' + capitalizeFirstLetter(submodule) + 'Store',
                        submodule + capitalizeFirstLetter('store'),
                        'use' + capitalizeFirstLetter(submodule) + 'Composable',
                        submodule + 'Composable',
                        true
                    ));
                    break;
                case 'middleware':
                    fs.writeFileSync(path.join(folderPath, 'README.md'), generateMiddlewareReadMe(submodule));
                    fs.writeFileSync(path.join(folderPath, 'setup' + capitalizeFirstLetter(submodule) + 'Page' + '.ts'), generateMiddlewareContent(
                        'use' + capitalizeFirstLetter(submodule) + 'Store',
                        'store',
                        'setup' + capitalizeFirstLetter(submodule) + 'Page'
                    ));

                    break;
                case 'services':
                    fs.writeFileSync(path.join(folderPath, 'README.md'), generateServicesReadMe(submodule));
                    fs.writeFileSync(path.join(folderPath, submodule + 'Service.ts'), generateServicesContent(true));
                    break;
                case 'utils':
                    fs.writeFileSync(path.join(folderPath, 'README.md'), generateUtilsReadme(submodule));
                    fs.writeFileSync(path.join(folderPath, submodule + 'Utils.ts'), generateUtilsContent());
                    break;
                default:
                    console.error('Unknown folder')
                    process.exit(1);
            }

        });
        fs.writeFileSync(path.join(subModuleBaseDir, 'routes.ts'), generateRoutesContent(submodule,
            capitalizeFirstLetter(submodule) + 'Page.vue', 'setup' + capitalizeFirstLetter(submodule) + 'Page', true));
        fs.writeFileSync(path.join(subModuleBaseDir, 'README.md'), generateModuleReadMe(submodule));
        fs.writeFileSync(path.join(subModuleBaseDir, 'store.ts'), generateStoreContent(
            'use' + capitalizeFirstLetter(submodule) + 'Store',
            submodule + capitalizeFirstLetter('store'),
            capitalizeFirstLetter(submodule) + 'StoreState',
            submodule,
            submodule + 'Service'));
        fs.writeFileSync(path.join(subModuleBaseDir, 'types.ts'), generateTypesContent(capitalizeFirstLetter(submodule) + 'StoreState'));
    })


    const mainModuleDir = getModuleBaseDir(mainModuleName);
    fs.writeFileSync(path.join(mainModuleDir, 'routes.ts'), generateMainModuleRoutesContent(
        subModuleList.map(submodule => {
            return formatKebabCaseModuleName(submodule)
        }),
        formatKebabCaseModuleName(mainModuleName) + 'Routes'
    ));

    console.log(subModuleList);
}


if(selectedModuleType === 'addSubmoduleToExistingModule'){

    const modulesDir = getBaseModuleBaseDir();

    // Define the expected structure for standalone modules
    const standaloneFolders = [
        'components',
        'composables',
        'middleware',
        'pages',
        'services',
        'utils'
    ];

    const standaloneFiles = [
        'README.md',
        'routes.ts',
        'store.ts',
        'types.ts'
    ];

// Function to check if a path is a directory
    const isDirectory = (source) => fs.lstatSync(source).isDirectory();

// Function to check if a path is a file
    const isFile = (source) => fs.lstatSync(source).isFile();

// Function to get the directories within a given directory
    const getDirectories = (source) =>
        fs.readdirSync(source).map(name => path.join(source, name)).filter(isDirectory);

// Function to get the files within a given directory
    const getFiles = (source) =>
        fs.readdirSync(source).map(name => path.join(source, name)).filter(isFile);

// Function to check if a module has the standalone structure
    const isStandaloneModule = (modulePath) => {
        const subDirs = getDirectories(modulePath).map(dir => path.basename(dir));
        const files = getFiles(modulePath).map(file => path.basename(file));

        const hasAllFolders = standaloneFolders.every(folder => subDirs.includes(folder));
        const hasAllFiles = standaloneFiles.every(file => files.includes(file));

        return hasAllFolders && hasAllFiles;
    };

// Function to get composite modules
    const getCompositeModules = (modulesDir) => {
        const modules = getDirectories(modulesDir);
        const compositeModules = [];

        modules.forEach(module => {
            if (!isStandaloneModule(module)) {
                compositeModules.push({name: path.relative(modulesDir, module), value: path.relative(modulesDir, module)});
            }
        });

        return compositeModules;
    };

// Get the list of composite modules
    const compositeModules = getCompositeModules(modulesDir);

    const mainModuleName = await select({
        message: `Select module to add sub module to`,
        choices: compositeModules,
    });


    //copy paste starts

    const subModuleList = [];

    let subModuleListCompleted = false;
    while (!subModuleListCompleted) {

        let message =`(${mainModuleName}) Enter your sub module name`




        const subModuleName = await input({
            message: message,
            required: true,
            validate: (subModuleName) => {
                if(subModuleList.find(subModule => subModule === subModuleName.replace(/\s+/g, ''))){
                    return `Error: A submodule with the name "${subModuleName}" already exists.`
                }

                return true;
            }
        });
        subModuleList.push(subModuleName.replace(/\s+/g, ''));

        const defineMoreModules = await select({
            message: `Would you like to define another sub module? Currently entered: ${subModuleList}`,
            choices: [
                {
                    name: 'Yes',
                    value: true,
                },
                {
                    name: 'No',
                    value: false,
                },
            ],
        });

        if (!defineMoreModules) {
            subModuleListCompleted = true;
        }

    }


    subModuleList.forEach(submodule => {
        const subModuleBaseDir = getSubmoduleBaseDir(mainModuleName, submodule);

        submodule = formatKebabCaseModuleName(submodule);
        folders.forEach(folder => {

            const folderPath = path.join(subModuleBaseDir, folder);
            fs.mkdirSync(path.join(folderPath), {recursive: true});
            switch (folder) {
                case 'components':
                    fs.writeFileSync(path.join(folderPath, 'README.md'), generateComponentsReadMe(submodule));
                    fs.writeFileSync(path.join(folderPath, capitalizeFirstLetter(submodule) + 'ExampleComponent.vue'), generateComponentsContent());
                    break;
                case 'composables':
                    fs.writeFileSync(path.join(folderPath, 'README.md'), generateComposablesReadMe(submodule));
                    fs.writeFileSync(path.join(folderPath, submodule + 'Composable.ts'), generateComposablesContent(capitalizeFirstLetter(submodule)));
                    break;
                case 'pages':
                    fs.writeFileSync(path.join(folderPath, 'README.md'), generatePagesReadMe(submodule));
                    fs.writeFileSync(path.join(folderPath, capitalizeFirstLetter(submodule) + 'Page.vue'), generatePagesContent(
                        submodule,
                        capitalizeFirstLetter(submodule) + 'Page',
                        capitalizeFirstLetter(submodule) + 'ExampleComponent',
                        'use' + capitalizeFirstLetter(submodule) + 'Store',
                        submodule + capitalizeFirstLetter('store'),
                        'use' + capitalizeFirstLetter(submodule) + 'Composable',
                        submodule + 'Composable',
                        true
                    ));
                    break;
                case 'middleware':
                    fs.writeFileSync(path.join(folderPath, 'README.md'), generateMiddlewareReadMe(submodule));
                    fs.writeFileSync(path.join(folderPath, 'setup' + capitalizeFirstLetter(submodule) + 'Page' + '.ts'), generateMiddlewareContent(
                        'use' + capitalizeFirstLetter(submodule) + 'Store',
                        'store',
                        'setup' + capitalizeFirstLetter(submodule) + 'Page'
                    ));

                    break;
                case 'services':
                    fs.writeFileSync(path.join(folderPath, 'README.md'), generateServicesReadMe(submodule));
                    fs.writeFileSync(path.join(folderPath, submodule + 'Service.ts'), generateServicesContent(true));
                    break;
                case 'utils':
                    fs.writeFileSync(path.join(folderPath, 'README.md'), generateUtilsReadme(submodule));
                    fs.writeFileSync(path.join(folderPath, submodule + 'Utils.ts'), generateUtilsContent());
                    break;
                default:
                    console.error('Unknown folder')
                    process.exit(1);
            }

        });
        fs.writeFileSync(path.join(subModuleBaseDir, 'routes.ts'), generateRoutesContent(submodule,
            capitalizeFirstLetter(submodule) + 'Page.vue', 'setup' + capitalizeFirstLetter(submodule) + 'Page', true));
        fs.writeFileSync(path.join(subModuleBaseDir, 'README.md'), generateModuleReadMe(submodule));
        fs.writeFileSync(path.join(subModuleBaseDir, 'store.ts'), generateStoreContent(
            'use' + capitalizeFirstLetter(submodule) + 'Store',
            submodule + capitalizeFirstLetter('store'),
            capitalizeFirstLetter(submodule) + 'StoreState',
            submodule,
            submodule + 'Service'));
        fs.writeFileSync(path.join(subModuleBaseDir, 'types.ts'), generateTypesContent(capitalizeFirstLetter(submodule) + 'StoreState'));
    })

    const getExistingSubModules = (source) =>
        fs.readdirSync(source)
            .map(name => path.join(source, name))
            .filter(isDirectory)
            .map(dir => path.basename(dir));


    const subModuleBaseDir = getModuleBaseDir(mainModuleName);


    const directories = getExistingSubModules(subModuleBaseDir);




    const mainModuleDir = getModuleBaseDir(mainModuleName);
    fs.writeFileSync(path.join(mainModuleDir, 'routes.ts'), generateMainModuleRoutesContent(
        directories.map(directory => {
            return formatKebabCaseModuleName(directory)
        }),
        formatKebabCaseModuleName(mainModuleName) + 'Routes'
    ));

    //copy paste ends
}
