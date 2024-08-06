export function generateComposablesContent(moduleName){
    return`
import {ref} from "vue";

export default function use${moduleName}Composable(){

    function generateRandomString(length = 10) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        
        randomString.value = result;
    }
    
    const randomString = ref('ABCDEFGHIJ');
         
    return {
        randomString,
        generateRandomString    
    }
}
    `;
}