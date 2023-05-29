export function getItemBg(itemGrade: string) {
    switch (itemGrade) {
        case "일반":
            return 'grade0-bg';
        case "고급":
            return 'grade1-bg';
        case "희귀":
            return 'grade2-bg';
        case "영웅":
            return 'grade3-bg';
        case "전설":
            return 'grade4-bg';
        case "유물":
            return 'grade5-bg';
        case "신화":
            return 'grade6-bg';
    }
}

export function getItemColor(itemGrade: string) {
switch (itemGrade) {
        case "일반":
            return 'grade0-color';
        case "고급":
            return 'grade1-color';
        case "희귀":
            return 'grade2-color';
        case "영웅":
            return 'grade3-color';
        case "전설":
            return 'grade4-color';
        case "유물":
            return 'grade5-color';
        case "신화":
            return 'grade6-color';
    }
}

export default {getItemBg, getItemColor}