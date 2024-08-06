export function generateMiddlewareContent(useStore, store, functionName){
    return `import {${useStore}} from "../store";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore


export default async function ${functionName}({next}) {

  const ${store} = ${useStore}();

  ${store}.$reset();

  await ${store}.exampleStoreFunction();

  return next();
}`;
}