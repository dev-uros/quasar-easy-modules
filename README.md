# Quasar easy modules

With the help of this package, it is possible to easily set up the basic structure of the project and easily add new modules as well as add sub-modules to existing modules.

## Setup

- First you need to type `node index.js` in project terminal.


- Now you are asked to select a module type. You have 3 choices:
  #### -  Standalone Module
  #### -  Composite Module
  #### -  Add submodule to existing module



### Standalone Module

If you selected Standalone Module you are now asked to enter module name. After giving a name of your choice,
in the `src -> modules ` new folder is created. If you for example gave a name `auth`, your folder structure will
look like this:

- auth
    - `components` (folder with .vue component and README.md file inside)
    - `composables` (folder with .ts file and README.md file inside)
    - `middleware` (folder with .ts file and README.md file inside)
    - `pages` (folder with .vue component and README.md file inside)
    - `services` (folder with .ts file and README.md file inside)
    - `utils` (folder with .ts file and README.md file inside)
    - `README.md`
    - `routes.ts` (here is created default route for the page component)
    - `store.ts` (here is created default example store)
    - `types.ts` (here is created default example interface)

You can modify every of this file.


### Composite Module

If you selected Composite Module you are now asked to enter main module name. After giving a name of your choice,
you are now asked to enter your submodule name. Now you are asked if you would like to define another submodule,
and you can repeat that process. After you are finished in the `src -> modules ` new folder is created.
If you for example created main module named `administration` and submodules named `auth` and `user`
your folder structure will look like this:

- administration
    - auth
        - `components` (folder with .vue component and README.md file inside)
        - `composables` (folder with .ts file and README.md file inside)
        - `middleware` (folder with .ts file and README.md file inside)
        - `pages` (folder with .vue component and README.md file inside)
        - `services` (folder with .ts file and README.md file inside)
        - `utils` (folder with .ts file and README.md file inside)
        - `README.md`
        - `routes.ts` (here is created default route for the page component)
        - `store.ts` (here is created default example store)
        - `types.ts` (here is created default example interface)
    - user
        - `components` (folder with .vue component and README.md file inside)
        - `composables` (folder with .ts file and README.md file inside)
        - `middleware` (folder with .ts file and README.md file inside)
        - `pages` (folder with .vue component and README.md file inside)
        - `services` (folder with .ts file and README.md file inside)
        - `utils` (folder with .ts file and README.md file inside)
        - `README.md`
        - `routes.ts` (here is created default route for the page component)
        - `store.ts` (here is created default example store)
        - `types.ts` (here is created default example interface)
    - `routes.ts` (in this file will be places all the routes from submodules):
  ``` 
  export const adminRoutes: RouteRecordRaw[] = [
    ...authRoutes,
    ...userRoutes,];
  ```

###  Add submodule to existing module

If you selected  Add submodule to existing module you are now asked to select main module in which you want to add submodule.
You are now asked to enter your submodule name. Now you are asked if you would like to define another submodule,
and you can repeat that process.
If you for example selected main module named `administration` and entered submodules name `company`,
in the `src -> modules -> administration` new folder named `company`.

Your folder structure will now look like this:

- administration
    - auth
        - `components` (folder with .vue component and README.md file inside)
        - `composables` (folder with .ts file and README.md file inside)
        - `middleware` (folder with .ts file and README.md file inside)
        - `pages` (folder with .vue component and README.md file inside)
        - `services` (folder with .ts file and README.md file inside)
        - `utils` (folder with .ts file and README.md file inside)
        - `README.md`
        - `routes.ts` (here is created default route for the page component)
        - `store.ts` (here is created default example store)
        - `types.ts` (here is created default example interface)
    - user
        - `components` (folder with .vue component and README.md file inside)
        - `composables` (folder with .ts file and README.md file inside)
        - `middleware` (folder with .ts file and README.md file inside)
        - `pages` (folder with .vue component and README.md file inside)
        - `services` (folder with .ts file and README.md file inside)
        - `utils` (folder with .ts file and README.md file inside)
        - `README.md`
        - `routes.ts` (here is created default route for the page component)
        - `store.ts` (here is created default example store)
        - `types.ts` (here is created default example interface)
    - company
        - `components` (folder with .vue component and README.md file inside)
        - `composables` (folder with .ts file and README.md file inside)
        - `middleware` (folder with .ts file and README.md file inside)
        - `pages` (folder with .vue component and README.md file inside)
        - `services` (folder with .ts file and README.md file inside)
        - `utils` (folder with .ts file and README.md file inside)
        - `README.md`
        - `routes.ts` (here is created default route for the page component)
        - `store.ts` (here is created default example store)
        - `types.ts` (here is created default example interface)
    - `routes.ts` (in this file will be places all the routes from submodules)

*** Notice that your `routes.ts` has been updated, and now it contains routes for company submodule.
```
    export const adminRoutes: RouteRecordRaw[] = [
      ...authRoutes,
      ...userRoutes,
      ...companyRoutes,
  ];
```
