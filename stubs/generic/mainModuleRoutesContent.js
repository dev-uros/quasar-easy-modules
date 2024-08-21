import {formatKebabCaseModuleName} from "../utils/formatKebabCaseModuleName.js";

export function generateMainModuleRoutesContent(submodules, mainModuleRoutes) {
    return`import {RouteRecordRaw} from "vue-router";
${generateImports(submodules)}


export const ${mainModuleRoutes}: RouteRecordRaw[] = [
${generateSpreadSubmoduleRoutes(submodules)}
];
    `;
}

function generateImports(submodules){
    let importsString = '';
    submodules.forEach(submodule=> {
        importsString = importsString + `import {${formatKebabCaseModuleName(submodule)}Routes} from "./${submodule}/routes";\n`
    })
    return importsString;
}

function generateSpreadSubmoduleRoutes(submodules){
    let spreadSubmoduleRoutesString = '';
    submodules.forEach(submodule=> {
        spreadSubmoduleRoutesString = spreadSubmoduleRoutesString + `...${formatKebabCaseModuleName(submodule)}Routes,\n`
    })
    return spreadSubmoduleRoutesString;
}