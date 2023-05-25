export interface ButtonTabProps {
    buttonListItem: ButtonTabContent[],
    clickEvent: Function,
    radioName:string,
    defaultValue?:string | number
}

export interface ButtonTabContent {
    title:string,
    value:string | number
}