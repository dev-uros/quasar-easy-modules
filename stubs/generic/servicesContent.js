export function generateServicesContent(isNested = false){
    return`import {HttpMethod, useFetch} from "${isNested ? '../':''}../../shared/utils/fetch";


export async function getServerHealthCheckApi() {
const  {message} = await useFetch<{message: string}, null, null>({
    url: 'healthcheck',
    method: HttpMethod.GET,
});
  return message;
}
    `;
}