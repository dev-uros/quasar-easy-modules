export function generateModuleReadMe(moduleName) {
    return `# ${moduleName} module

---

This is command generated module and it consists of:

1. Pages folder
    - Here all main pages should be places (pages that are targeted by router)
2. Components folder
    - Here all components used by pages should be placed
3. Composables folder
    - Here all composable functions should be placed
4. Middleware folder
    - Here middleware functions should be placed (functions that are called before route navigate)
5. Services folder
    - Here service functions should be placed (like api calls) 
6. Routes.ts file
    - Here all routes for module should be placed and exported to be used in main router file
7. Store.ts
    - Here is defined Pinia store for module
8. Types.ts
    - Here are defined all types for module
`;
}