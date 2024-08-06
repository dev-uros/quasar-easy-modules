export function generateStoreContent(useStoreFunction, storeName, stateTypes, moduleName, serviceName){
    return `import {acceptHMRUpdate, defineStore} from 'pinia';
import {${stateTypes}} from "./types";
import {getServerHealthCheckApi} from "./services/${serviceName}";
import {formatNumberToCurrency} from "./utils/${moduleName}Utils"


export const ${useStoreFunction} = defineStore('${storeName}', {
  state: (): ${stateTypes} => ({
    counter: 0,
    serverHealthCheck: ''
  }),
  getters: {
    getDoubleCount: (state) => state.counter * 2,
    getFormattedCounter: (state) => formatNumberToCurrency(state.counter)
  },
  actions: {
    exampleStoreFunction(){
        this.counter = 0;
        this.serverHealthCheck = ''
    },
    addCount() {
      this.counter = this.counter + 1;
    },
    subtractCount() {
      this.counter = this.counter - 1;
    },
    async getServerHealthCheck(){
        this.serverHealthCheck = await getServerHealthCheckApi();
    }
  }

})



if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(${useStoreFunction}, import.meta.hot))
}

    `;
}