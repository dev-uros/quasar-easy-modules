export function generateTypesContent(interfaceName){
    return `export interface ${interfaceName}{
  counter: number
  serverHealthCheck: string
}
    `;
}