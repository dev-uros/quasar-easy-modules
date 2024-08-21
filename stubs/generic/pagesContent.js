export function generatePagesContent(moduleName, pageName, exampleComponentName, useStore, store, useComposable, composable, isNested = false) {
    return `
<template>
  <PageContainer icon="edit_document" title="${pageName}">
    <template #content>
      <${exampleComponentName}/>
      <div class="row">
          <div class="col-12">
            Store
          </div>
          <q-btn label="add" @click="${store}.addCount"></q-btn>
          <q-btn label="subtract" @click="${store}.subtractCount"></q-btn>
          <q-avatar icon="arrow_forward">{{ ${store}.counter }}</q-avatar>
          <q-avatar icon="double_arrow">{{ doubleCounter }}</q-avatar>
      </div>
      
      <div class="row">
           <div class="col-12">
            Composable
          </div>
          <q-btn label="Generate random string" @click="generateRandomString()"></q-btn>
          <q-input readonly v-model="randomString"></q-input>
      </div>
      <div class="row">
           <div class="col-12">
            Service
          </div>
          <q-btn label="Init server health check" @click="initServerHealthCheck"></q-btn>
          <q-input readonly v-model="${store}.serverHealthCheck"></q-input>
      </div>
      <div class="row">
           <div class="col-12">
            Utils
          </div>
          <q-input label="Utils formatted counter" readonly v-model="formattedCounter"></q-input>
      </div>
    </template>
  </PageContainer>

</template>

<script setup lang="ts">
import {computed} from "vue";
import PageContainer from "${isNested ? '../':''}../../shared/components/PageContainer.vue";
import ${exampleComponentName} from "../components/${exampleComponentName}.vue"
import {${useStore}} from "../store";
import ${useComposable} from "../composables/${composable}"

const ${store} = ${useStore}();

const doubleCounter = computed(function() {
  return ${store}.getDoubleCount
})

const formattedCounter = computed(function() {
  return ${store}.getFormattedCounter
})
const {
    randomString,
    generateRandomString
} = ${useComposable}()


const initServerHealthCheck = async() => {
    await ${store}.getServerHealthCheck()
}
</script>
    `;
}