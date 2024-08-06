export function generateRoutesContent (moduleName, indexPageName, middlewareName, isNested = false){
    return `
import {RouteRecordRaw} from "vue-router";

import auth from "${isNested ? '../':''}../shared/middleware/auth";
    
import ${middlewareName} from "./middleware/${middlewareName}"

export const ${moduleName}Routes: RouteRecordRaw[] = [
  {
    path: '${moduleName}',
    component: () => import('./pages/${indexPageName}'),
    name: '${moduleName}.index',
    meta: {middleware: [auth, ${middlewareName}]}
  }
];
    `;
}