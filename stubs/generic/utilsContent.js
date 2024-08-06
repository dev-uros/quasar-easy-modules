export function generateUtilsContent(){
    return `export function formatNumberToCurrency(number: number) {

    return new Intl.NumberFormat('sr-RS', {
        style: 'currency',
        currency: 'RSD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number);
}`;
}