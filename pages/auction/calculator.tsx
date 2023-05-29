import ButtonTab from "@/components/tab/buttonTab"
import NoImagePageLayout from "@/layout/noImagePageLayout"
import style from "@/styles/page/auction/calculator.module.scss"
import { ButtonTabProps } from "@/types/buttontab"
import { ChangeEventHandler, useEffect, useState } from "react"
import { chargePrice, calDistributionPrice, calDifurcation } from "@/lib/auction"
import { formatNumberWithCommas, removeFrontZero } from "@/lib/textReplace"

export default function Calculator() {
    const [userCount, setUserCount] = useState<number>(8)
    const [price, setPrice] = useState<number>(0)
    const changeUserCount = (count: number) => {
        setUserCount(count)
    }

    const buttonTabInfo: ButtonTabProps = {
        radioName: "usercount",
        buttonListItem: [
            {
                value: 4,
                title: "4인"
            },
            {
                value: 8,
                title: "8인"
            }
        ],
        clickEvent: changeUserCount,
        defaultValue: userCount
    }

    useEffect(() => {
        // 연산 처리

    }, [userCount, price])

    const changeUserCountInput: ChangeEventHandler<HTMLInputElement> = (event) => {
        event.target.value = removeFrontZero(event.target.value)
        if (parseInt(event.target.value) > 0) {
            setUserCount(parseInt(event.target.value))
        } else {
            setUserCount(0)
        }
    }

    const clickPriceClear = () => {
        setPrice(0)
    }

    const changePrice: ChangeEventHandler<HTMLInputElement> = (event) => {
        event.target.value = removeFrontZero(event.target.value)
        let checkPrice = parseInt(event.target.value)
        if(checkPrice < 0 || isNaN(checkPrice)) {
            checkPrice = 0
        }
        setPrice(checkPrice)
    }

    return <>
        <NoImagePageLayout>
            <section className={style.calculatorWrap}>
                <div className={`inputFormRightIcon ${style.customWithIcon}`}>
                    <input type="number" className={``} value={price} onChange={changePrice}></input>
                    <span><i className="bi bi-x-circle-fill" onClick={clickPriceClear}></i></span>
                </div>
                <div className={`${style.inputUserWrap}`}>
                    <ButtonTab buttonTabProp={buttonTabInfo}></ButtonTab>
                    <div className={style.inputUser}>
                        <input type="number" value={userCount} onChange={changeUserCountInput}></input>
                    </div>

                </div>
                <table className={`defaultTable ${style.calculatorResultWrap}`}>
                    <thead>
                        <tr>
                            <th colSpan={2}>결과</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>판매 수수료</td>
                            <td>
                                <span className={`goldIconWrap`}>
                                    <span className={`goldIcon`}></span>
                                    <span className={`d-flex align-center`}>{price ? formatNumberWithCommas(chargePrice(price)) : 0}</span>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>분배금</td>
                            <td>
                                <span className={`goldIconWrap`}>
                                    <span className={`goldIcon`}></span>
                                    <span className={`d-flex align-center`}>{price && userCount ? formatNumberWithCommas(calDistributionPrice(price, userCount)) : 0}</span>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td><span className="bold loss">손익 분기점</span></td>
                            <td>
                                <span className={`goldIconWrap`}>
                                    <span className={`goldIcon`}></span>
                                    <span className={`d-flex align-center bold loss`}>{price && userCount ? formatNumberWithCommas(calDifurcation(price, userCount, null)) : 0}</span>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td><span className="bold grade2-color">입찰 적정가</span></td>
                            <td>
                                <span className={`goldIconWrap`}>
                                    <span className={`goldIcon`}></span>
                                    <span className={`d-flex align-center bold grade2-color`}>{price && userCount ? formatNumberWithCommas(Math.floor(calDifurcation(price, userCount, null) / 1.1)) : 0}</span>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </NoImagePageLayout>
    </>
}