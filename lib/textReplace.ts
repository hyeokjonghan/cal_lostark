export function formatNumberWithCommas(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function removeFrontZero(input : string) {
    return input.replace(/^0+/,'')
}

export default {formatNumberWithCommas}