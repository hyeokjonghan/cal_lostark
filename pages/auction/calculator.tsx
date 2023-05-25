import ButtonTab from "@/components/tab/buttonTab"
import NoImagePageLayout from "@/layout/noImagePageLayout"
import style from "@/styles/page/auction/calculator.module.scss"
import { ButtonTabProps } from "@/types/buttontab"
import { ChangeEventHandler, useEffect, useState } from "react"
import {chargePrice, calDistributionPrice, calDifurcation, calAdequatePrice} from "@/lib/auction"

export default function Calculator() {
    const [userCount, setUserCount] = useState<number>(8)
    const [price, setPrice] = useState<number>(0)
    const changeUserCount = (count: number) => {
        setUserCount(count)
    }

    const buttonTabInfo:ButtonTabProps = {
        radioName:"usercount",
        buttonListItem: [
            {
                value: 4,
                title:"4인"
            },
            {
                value: 8,
                title:"8인"
            }
        ],
        clickEvent: changeUserCount,
        defaultValue: userCount
    }

    useEffect(() => {
        // 연산 처리
        
    }, [userCount, price])

    const changeUserCountInput:ChangeEventHandler<HTMLInputElement> = (event) => {
        if(parseInt(event.target.value) > 0) {
            setUserCount(parseInt(event.target.value))
        } else {
            setUserCount(0)
        }
    }

    const clickPriceClear = () => {
        setPrice(0)
    }

    const changePrice:ChangeEventHandler<HTMLInputElement> = (event) => {
        setPrice(parseInt(event.target.value))
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
                <table className={`table defaultTable ${style.calculatorResultWrap}`}>
                    <tr>
                        <th colSpan={2}>결과</th>
                    </tr>
                    <tr>
                        <td>판매 수수료</td>
                        <td>
                            <span className={`goldIconWrap`}>
                                <span className={`goldIcon`}></span>
                                <span className={`d-flex align-center`}>{price? chargePrice(price):0}</span>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>분배금</td>
                        <td>
                            <span className={`goldIconWrap`}>
                                <span className={`goldIcon`}></span>
                                <span className={`d-flex align-center`}>{price && userCount? calDistributionPrice(price,userCount) : 0}</span>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>손익 분기점</td>
                        <td>
                            <span className={`goldIconWrap`}>
                                <span className={`goldIcon`}></span>
                                <span className={`d-flex align-center`}>{price && userCount? calDifurcation(price, userCount): 0}</span>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>입찰 적정가</td>
                        <td>
                            <span className={`goldIconWrap`}>
                                <span className={`goldIcon`}></span>
                                <span className={`d-flex align-center`}>{price && userCount? calAdequatePrice(price, userCount): 0}</span>
                            </span>
                        </td>
                    </tr>
                </table>
            </section>
        </NoImagePageLayout>
    </>
}