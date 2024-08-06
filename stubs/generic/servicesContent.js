export function generateServicesContent(isNested = false){
    return`import {HttpMethod, useFetch} from "${isNested ? '../':''}../../shared/composables/fetch";


export async function getServerHealthCheckApi() {
const  {message} = await useFetch<{message: string}, null, null>({
    url: 'healthcheck',
    method: HttpMethod.GET,
});
  return message;
}
    `;
}