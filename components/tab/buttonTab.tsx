import { ButtonTabProps } from "@/types/buttontab";
type buttonTabProp = {
    buttonTabProp: ButtonTabProps
}

export default function ButtonTab({ buttonTabProp }: buttonTabProp) {
    return <>
        <ul className={`tabRadioWrap`}>
            {
                buttonTabProp.buttonListItem.map((item, index) => {
                    return <>
                        <li key={item.value}>
                            <label className={`tabRadio`}>
                                <input type="radio"
                                    value={item.value}
                                    onChange={() => { buttonTabProp.clickEvent(item.value) }}
                                    checked={buttonTabProp.defaultValue ? item.value === buttonTabProp.defaultValue : false}>

                                </input>
                                <span>{item.title}</span>
                            </label>
                        </li>
                    </>
                })
            }

        </ul>
    </>
}