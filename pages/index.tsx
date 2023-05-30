import ButtonTab from "@/components/tab/buttonTab"
import Tooltip from "@/components/tooltip/tooltip"
import style from "@/styles/page/gathering/cal.module.scss"
import { ButtonTabContent, ButtonTabProps } from "@/types/buttontab"
import { LifeItem, LifeItemList } from "@/types/lifeItem"
import axios from "axios"
import Image from 'next/image'
import { useEffect, useRef, useState } from "react"
import { formatNumberWithCommas, removeFrontZero } from "@/lib/textReplace"
import { getTotalItemRevenue, itemTargetAmount, getUseLifePotionToGold, getUseEssenceOfLeapToGold, buyCreateRevenue, calProduceTotalPrice, matarialTotalPrice } from "@/lib/gathering/gathering"
import { chargePrice } from "@/lib/auction"
import { ProduceItem, ProduceItemList } from "@/types/produceItem"
import { sortByNumber } from "@/lib/arrayObjectSort"
import DefaultModal from "@/components/modal/defaultModal"
import {getItemBg, getItemColor} from "@/lib/items"

export default function Home(props: { lifeItem: LifeItem, produceItemList: ProduceItemList }) {
    const [gateringType, setGateringType] = useState<string>("90200")
    const [lifeItemList, setLifeItemList] = useState<LifeItemList[] | undefined>(undefined)
    const [useLifePotion, setUseLifePotion] = useState<number>(0)
    const [useEssenceOfLeap, setUseEssenceOfLeap] = useState<number>(0)
    const [produceItemList, setProduceItemList] = useState<ProduceItemList>(props.produceItemList)
    const [goldCondition, setGoldCondition] = useState<number>(3000)        // 크리스탈 <=> 골드 시세. 일단 임시로 3000 고정, 추후에 실시간 동기화 해야 함
    const [greatSuccessRate, setGreatSuccessRate] = useState<number>(0)
    const [feeReductionRate, setFeeReductionRate] = useState<number>(0)
    const inputGreatSuccessRate = useRef<HTMLInputElement>(null)
    const inputFeeReductionRate = useRef<HTMLInputElement>(null)
    const [produceItemOrder, setProduceItemOrder] = useState({ index: '', order: '' })
    const [produceInfoModal, setProduceInfoModal] = useState<boolean>(false)
    const [produceModalItem, setProduceModalItem] = useState<ProduceItem | null>(null)


    const clickGateringTypeEvent = (value: string) => {
        setGateringType(value)
    }

    const buttonTabInfo: ButtonTabProps = {
        radioName: "gatering",
        defaultValue: gateringType,
        buttonListItem: [
            {
                value: "90200",
                title: "식물채집"
            },
            {
                value: "90300",
                title: "벌목"
            },
            {
                value: "90400",
                title: "채광"
            },
            {
                value: "90500",
                title: "수렵"
            },
            {
                value: "90600",
                title: "낚시"
            },
            {
                value: "90700",
                title: "고고학"
            },
        ],
        clickEvent: clickGateringTypeEvent
    }

    const setNowPrice = (price: number, index: number) => {
        if(price < 0 || isNaN(price)) {
            price = 0
        }
        if (lifeItemList) {
            setLifeItemList(current => {
                if (current) {
                    const newData = [...current]
                    newData[index].with_market_price.now_price = price
                    return newData
                } else {
                    return current
                }
            })
        }
    }

    const setHaveItemCount = (count: number, index: number) => {
        if(count < 0 || isNaN(count)) {
            count = 0
        }

        if (lifeItemList) {
            setLifeItemList(current => {
                if (current) {
                    const newData = [...current]
                    newData[index].have_item_count = count
                    return newData
                } else {
                    return current
                }
            })
        }
    }

    const setTargetItemCount = (count: number, index: number) => {
        if(count < 0 || isNaN(count)) {
            count = 0
        }

        if (lifeItemList) {
            setLifeItemList(current => {
                if (current) {
                    const newData = [...current]
                    newData[index].target_item_count = count
                    return newData
                } else {
                    return current
                }
            })
        }
    }

    const changeUseLifePotion = (input: number) => {
        if(input < 0 || isNaN(input)) {
            input = 0
        }
        setUseLifePotion(input)
    }

    const changeUseEssenceOfLeap = (input: number) => {
        
        if(input < 0 || isNaN(input)) {
            input = 0
        }
        setUseEssenceOfLeap(input)
    }

    const changeGreatSuccessRate = (percent: number) => {
        if (inputGreatSuccessRate.current) {
            let newPercent = percent
            if (!newPercent) {
                newPercent = 0
            }
            if (newPercent > 100) {
                newPercent = 100
            } else if (newPercent < 0) {
                newPercent = 0
            } else {
                newPercent = parseFloat(newPercent.toFixed(1))
            }

            setGreatSuccessRate(newPercent)
            inputGreatSuccessRate.current.value = newPercent.toString()
        }

    }

    const changeFeeReductionRate = (percent: number) => {
        if (inputFeeReductionRate.current) {
            let newPercent = percent
            if (!newPercent) {
                newPercent = 0
            }
            if (newPercent > 100) {
                newPercent = 100
            } else if (newPercent < 0) {
                newPercent = 0
            } else {
                newPercent = parseFloat(newPercent.toFixed(1))
            }

            setFeeReductionRate(newPercent)
            inputFeeReductionRate.current.value = newPercent.toString()
        }
    }

    const sortByNumberProduceItemList = (indexName: string) => {
        let sort = "desc"
        if (produceItemOrder.order === "desc") {
            sort = "asc"
        }

        const sortResult = sortByNumber(produceItemList, indexName, sort) as ProduceItemList
        setProduceItemList(sortResult)
        setProduceItemOrder({ index: indexName, order: sort })
    }

    const openProduceItemModal = (index: number) => {
        const initProduceItem = { ...produceItemList[index] }
        setProduceModalItem(initProduceItem)
        setProduceInfoModal(true)
    }

    useEffect(() => {
        // 테스트용
        const initProduceItem = { ...produceItemList[0] }
        setProduceModalItem(initProduceItem)
    }, [])

    useEffect(() => {
        // 여기서 처리
        setLifeItemList(props.lifeItem[gateringType])
        // console.log(produceItemList)
    }, [gateringType])

    useEffect(() => {
        const setBuyRevenuList = [...produceItemList]
        setBuyRevenuList.map((item) => {
            item.buy_create_revenu = buyCreateRevenue(item, greatSuccessRate, feeReductionRate)
        })

        setProduceItemList(setBuyRevenuList)
    }, [greatSuccessRate, feeReductionRate])


    return <>
        <main className={`${style.calWrap}`}>
            <section className={`pageHeaderImage`} style={{ backgroundImage: `url(/image/sample/background/page0.jpg)` }}></section>
            <section className={`container-xl ${style.calContentWrap}`}>
                <section className={`${style.gatheringContentWrap}`}>
                    <div className={`${style.gatheringContentTitle}`}>
                        <h2>생활 재료 계산기</h2>
                    </div>
                    <div className={`${style.gatheringContentTabWrap}`}>
                        <ButtonTab buttonTabProp={buttonTabInfo}></ButtonTab>
                    </div>

                    <div className={`${style.gatheringTableWrap}`}>
                        <div className={`responsibleTableWrap`}>
                            <div className={`responsibleTableHeader`}>
                                <div>아이템</div>
                                <div>묶음</div>
                                <div>현재 최저가</div>
                                <div>현재수량</div>
                                <div>목표수량</div>
                                <div>거래량</div>
                                <div>이득</div>
                            </div>

                            {
                                lifeItemList && lifeItemList?.map((item, index) => {
                                    return <>
                                        <div className={`responsibleTableRow`} key={item.item_code}>
                                            <div className={`responsibleTableCol`}>
                                                <span className={`responsibleTableColTitle`}>아이템</span>
                                                <div className={`responsibleTableColData`}>
                                                    <div className={`${style.itemWrap}`}>
                                                        <span className={`${getItemBg(item.item_grade)}`}><Image src={item.item_icon} width={40} height={40} alt='아이템 아이콘'></Image></span>
                                                        <span className={`${getItemColor(item.item_grade)}`}>{item.item_name}</span>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`responsibleTableCol`}>
                                                <span className={`responsibleTableColTitle`}>묶음</span>
                                                <div className={`responsibleTableColData`}>
                                                    {item.with_market_price.bundle_count}
                                                </div>
                                            </div>
                                            <div className={`responsibleTableCol`}>
                                                <span className={`responsibleTableColTitle`}>현재 최저가</span>
                                                <div className={`responsibleTableColData`}>
                                                    <input type="number" value={item.with_market_price.now_price} onChange={(e) => { e.target.value = removeFrontZero(e.target.value), setNowPrice(parseInt(e.target.value), index) }}></input>
                                                </div>
                                            </div>
                                            <div className={`responsibleTableCol`}>
                                                <span className={`responsibleTableColTitle`}>현재수량</span>
                                                <div className={`responsibleTableColData`}>
                                                    <input type="number" value={item.have_item_count} onChange={(e) => {e.target.value = removeFrontZero(e.target.value), setHaveItemCount(parseInt(e.target.value), index) }}></input>
                                                </div>
                                            </div>
                                            <div className={`responsibleTableCol`}>
                                                <span className={`responsibleTableColTitle`}>목표수량</span>
                                                <div className={`responsibleTableColData`}>
                                                    <input type="number" value={item.target_item_count} onChange={(e) => {e.target.value = removeFrontZero(e.target.value), setTargetItemCount(parseInt(e.target.value), index) }}></input>
                                                </div>
                                            </div>
                                            <div className={`responsibleTableCol`}>
                                                <span className={`responsibleTableColTitle`}>거래량</span>
                                                <div className={`responsibleTableColData`}>
                                                    {formatNumberWithCommas(item.with_market_price.y_trade_count)}
                                                </div>
                                            </div>
                                            <div className={`responsibleTableCol`}>
                                                <span className={`responsibleTableColTitle`}>이득</span>
                                                <div className={`responsibleTableColData`}>
                                                    {itemTargetAmount(item).toFixed(1)}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                })
                            }

                        </div>
                        <div className={`${style.totalGatheringResultWrap}`}>

                            <div className={`${style.totalGateringTitle}`}>정산</div>

                            <div className={`${style.inputUseItemWrap}`}>

                                <div>
                                    <div>
                                        <div className={`${style.itemWrap}`}>
                                            <Image src={`https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Shop_icon/shop_icon_2844.png`} width={40} height={40} alt='배틀아이템'></Image>
                                            <span className={`tooltipWrap`}>생기물약 회복량<Tooltip tooltipText={`마리샵 기준, 천단위로 입력해 주세요.`}></Tooltip></span>
                                        </div>
                                    </div>
                                    <div>
                                        <input type="number" value={useLifePotion} onChange={(e) => {e.target.value = removeFrontZero(e.target.value), changeUseLifePotion(parseInt(e.target.value)) }}></input>
                                    </div>
                                </div>


                                <div>
                                    <div>
                                        <div className={`${style.itemWrap}`}>
                                            <Image src={`https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Use/Use_9_156.png`} width={40} height={40} alt='배틀아이템'></Image>
                                            <span className={`tooltipWrap`}>도약의 정수</span>
                                        </div>
                                    </div>
                                    <div>
                                        <input type="number" value={useEssenceOfLeap} onChange={(e) => {e.target.value = removeFrontZero(e.target.value), changeUseEssenceOfLeap(parseInt(e.target.value))}}></input>
                                    </div>
                                </div>
                            </div>


                            <div className={`${style.totalResultWrap}`}>
                                <div className={`${style.totalResultTitle}`}>총 수익</div>
                                <div className={`${style.totalResultContent}`}>
                                    <div className={`${style.totalResultFormula}`}>
                                        <span className={`goldIconWrap`}>
                                            <span className={`goldIcon`}></span>
                                            <span className={`d-flex align-center`}><span>{lifeItemList && getTotalItemRevenue(lifeItemList).toFixed(1)}</span> <Tooltip tooltipText={`총 재료 수익`}></Tooltip></span>
                                        </span>
                                        <span>-</span>
                                        <span className={`goldIconWrap`}>
                                            <span className={`goldIcon`}></span>
                                            <span className={`d-flex align-center`}><span>{lifeItemList && chargePrice(getTotalItemRevenue(lifeItemList))}</span> <Tooltip tooltipText={`거래 수수료`}></Tooltip></span>
                                        </span>
                                        <span>-</span>
                                        <span className={`goldIconWrap`}>
                                            <span className={`goldIcon`}></span>
                                            <span className={`d-flex align-center`}><span>{lifeItemList && getUseLifePotionToGold(useLifePotion, goldCondition).toFixed(1)}</span> <Tooltip tooltipText={`생기물약`}></Tooltip></span>
                                        </span>
                                        <span>-</span>
                                        <span className={`goldIconWrap`}>
                                            <span className={`goldIcon`}></span>
                                            <span className={`d-flex align-center`}><span>{lifeItemList && getUseEssenceOfLeapToGold(useEssenceOfLeap, goldCondition).toFixed(1)}</span> <Tooltip tooltipText={`도약의 정수`}></Tooltip></span>
                                        </span>
                                    </div>
                                    <div>
                                        <div className={`goldIconWrap`}>
                                            <span className={`goldIcon`}></span>
                                            <span className={`d-flex align-center`}><span>{lifeItemList &&
                                                (getTotalItemRevenue(lifeItemList) -
                                                    chargePrice(getTotalItemRevenue(lifeItemList)) -
                                                    getUseLifePotionToGold(useLifePotion, goldCondition) -
                                                    getUseEssenceOfLeapToGold(useEssenceOfLeap, goldCondition)).toFixed(1)
                                            }</span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>


                </section>

                {/* 주요 제작 아이템 */}
                <section className={`${style.gatheringContentWrap}`}>
                    <div className={`${style.gatheringContentTitle}`}>
                        <h2>주요 제작 아이템</h2>
                    </div>

                    {/* 영지 효과 세팅 */}
                    {/* 아코디언 */}
                    <div className={`accordian ${style.groundEffectAccordion}`} id="groundEffectAccordion">
                        <div className={`accordion-item ${style.groundEffectWrap}`}>
                            <h2 className={`accordion-header ${style.groundEffectHeader}`} >
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#groundEffectAccordionBody" aria-expanded="true" aria-controls="groundEffectAccordionBody">영지효과</button>
                            </h2>
                            <div id="groundEffectAccordionBody" className={`accordion-collapse collapse show ${style.groundEffectContent}`} data-bs-parent="#groundEffectAccordion">
                                <div className={`accordion-body`}>
                                    <table className={`table ${style.groundEffectTable}`}>
                                        <thead>
                                            <tr>
                                                <th scope="col">대성공 추가 확률</th>
                                                <th scope="col">제작 수수료 감소율</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className={`table-group-divider`}>
                                                <td scope="row">
                                                    <div className={`inputFormRightIcon ${style.customWithIcon}`}>
                                                        <input type="number" defaultValue={greatSuccessRate} onChange={(e) => { changeGreatSuccessRate(parseFloat(e.target.value)) }} ref={inputGreatSuccessRate}></input>
                                                        <span>%</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className={`inputFormRightIcon ${style.customWithIcon}`}>
                                                        <input type="number" defaultValue={feeReductionRate} onChange={(e) => { changeFeeReductionRate(parseFloat(e.target.value)) }} ref={inputFeeReductionRate}></input>
                                                        <span>%</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 반응형 테이블 */}
                    {/* 아이템, 현재 최저가, 거래량, 주간 최저가 구매제작 수익, 현재가 구매제작 수익,  상세보기 */}
                    <div className={`responsibleTableWrap`}>
                        <div className={`responsibleTableHeader`}>
                            <div>아이템</div>
                            <div>필요활동력</div>
                            <div>현재 최저가</div>
                            <div>제작시간</div>
                            <div>제작비용</div>
                            <div>구매 제작 수익<span className={`curour-pointer order-pointer ${produceItemOrder.index === 'buy_create_revenu' ? produceItemOrder.order : ''}`}><i className={`bi bi-arrow-down-short orderPointer`} onClick={() => { sortByNumberProduceItemList('buy_create_revenu') }}></i></span></div>
                            <div>거래량<span className={`curour-pointer order-pointer ${produceItemOrder.index === 'y_trade_count' ? produceItemOrder.order : ''}`}><i className={`bi bi-arrow-down-short`} onClick={() => { sortByNumberProduceItemList('y_trade_count') }}></i></span></div>
                        </div>

                        {produceItemList && produceItemList.map((item, index) => {
                            return <>
                                <div className={`responsibleTableRow`}>
                                    <div className={`responsibleTableCol`}>
                                        <span className={`responsibleTableColTitle`}>아이템</span>
                                        <div className={`responsibleTableColData`}>

                                            <div className={`${style.itemWrap} curour-pointer`} onClick={() => { openProduceItemModal(index) }}>
                                                <span className={`${getItemBg(item.item_grade)}`}><Image src={item.item_icon} width={40} height={40} alt='아이템 아이콘'></Image></span>
                                                <span className={`${getItemColor(item.item_grade)}`}><span>{item.produce_item_name}</span></span>
                                            </div>

                                        </div>
                                    </div>
                                    <div className={`responsibleTableCol`}>
                                        <span className={`responsibleTableColTitle`}>필요 활동력</span>
                                        <div className={`responsibleTableColData`}>
                                            {item.produce_cost}
                                        </div>
                                    </div>
                                    <div className={`responsibleTableCol`}>
                                        <span className={`responsibleTableColTitle`}>현재 최저가</span>
                                        <div className={`responsibleTableColData`}>
                                            {item.now_price}
                                        </div>
                                    </div>
                                    <div className={`responsibleTableCol`}>
                                        <span className={`responsibleTableColTitle`}>제작시간</span>
                                        <div className={`responsibleTableColData`}>
                                            {item.produce_cost_time}
                                        </div>
                                    </div>
                                    <div className={`responsibleTableCol`}>
                                        <span className={`responsibleTableColTitle`}>제작비용</span>
                                        <div className={`responsibleTableColData`}>
                                            {calProduceTotalPrice(item, feeReductionRate).toFixed(1)}
                                        </div>
                                    </div>
                                    <div className={`responsibleTableCol`}>
                                        <span className={`responsibleTableColTitle`}>구매 제작 수익</span>
                                        <div className={`responsibleTableColData`}>
                                            <span className={buyCreateRevenue(item, greatSuccessRate, feeReductionRate) > 0 ? 'benefit' : 'loss'}>{item.buy_create_revenu ? item.buy_create_revenu.toFixed(1) : 0}</span>
                                        </div>
                                    </div>
                                    <div className={`responsibleTableCol`}>
                                        <span className={`responsibleTableColTitle`}>거래량</span>
                                        <div className={`responsibleTableColData`}>
                                            {formatNumberWithCommas(item.y_trade_count)}
                                        </div>
                                    </div>
                                </div>
                            </>
                        })}
                    </div>
                </section>
            </section>

            <DefaultModal modalCheck={produceInfoModal} closeBtnAction={() => { setProduceInfoModal(!produceInfoModal) }}>
                <section className={style.produceItemModalWrap}>
                    {produceModalItem && <>
                        <div className={style.produceItemModalHeader}>
                            <div className={`${style.itemWrap}`} style={{ justifyContent: "center" }}>
                                <Image src={produceModalItem?.item_icon} width={40} height={40} alt='아이템 아이콘'></Image>
                                <span>{produceModalItem.produce_item_name}</span>
                            </div>
                        </div>
                        <div className={style.produceItemModalContent}>
                            <table className="defaultTable t-a-c">
                                <thead>
                                    <tr>
                                        <th colSpan={6}>제작 재료</th>
                                    </tr>
                                    <tr>
                                        <th>아이템</th>
                                        <th>구매묶음</th>
                                        <th>현재가</th>
                                        <th>평균가</th>
                                        <th>필요수량</th>
                                        <th>총 비용</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {produceModalItem.with_item_material.map(item => {
                                        return <>
                                            <tr>
                                                <td>
                                                    <div className={`${style.itemWrap}`} style={{ justifyContent: "center" }}>
                                                        <Image src={item.item_icon} width={40} height={40} alt='아이템 아이콘'></Image>
                                                        <span>{item.item_name}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    {item.bundle_count}
                                                </td>
                                                <td>
                                                    <span className={`goldIconWrap`}>
                                                        <span className={`goldIcon`}></span>
                                                        <span className={`d-flex align-center`}><span>{item.now_price}</span></span>
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className={`goldIconWrap`}>
                                                        <span className={`goldIcon`}></span>
                                                        <span className={`d-flex align-center`}><span>{item.now_avg_price}</span></span>
                                                    </span>
                                                </td>
                                                <td style={{ textAlign: "center" }}>
                                                    {item.cost}
                                                </td>
                                                <td>
                                                    <span className={`goldIconWrap`}>
                                                        <span className={`goldIcon`}></span>
                                                        <span className={`d-flex align-center`}><span>{(item.cost * item.now_price / item.bundle_count).toFixed(1)}</span></span>
                                                    </span>
                                                </td>
                                            </tr>
                                        </>
                                    })}


                                </tbody>
                            </table>
                            <table className="defaultTable t-a-c">
                                <thead>
                                    <tr>
                                        <th>제작시 획득 아이템 수</th>
                                        <th>제작비용</th>
                                        <th>현재가</th>
                                        <th>평균가</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            {produceModalItem.production_number}
                                        </td>
                                        <td>
                                            
                                            <span className={`goldIconWrap`}>
                                                <span className={produceModalItem.produce_price_type === '0' ? 'goldIcon' : 'slingIcon'}></span>
                                                <span className={`d-flex align-center`}><span>{formatNumberWithCommas(produceModalItem.produce_price)}</span></span>
                                            </span>

                                        </td>
                                        <td>
                                            <span className={`goldIconWrap`}>
                                                <span className={`goldIcon`}></span>
                                                <span className={`d-flex align-center`}><span>{produceModalItem.now_price}</span></span>
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`goldIconWrap`}>
                                                <span className={`goldIcon`}></span>
                                                <span className={`d-flex align-center`}><span>{produceModalItem.now_avg_price}</span></span>
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="defaultTable t-a-c">
                                <thead>
                                    <tr>
                                        <th>
                                            제작시 수익
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>

                                            <div className={`${style.totalResultContent}`}>
                                                <div className={`${style.totalResultFormula}`}>
                                                    <span className={`goldIconWrap`}>
                                                        <span className={`goldIcon`}></span>
                                                        <span className={`d-flex align-center`}><span>{(produceModalItem.production_number * produceModalItem.now_price * (1.05 + (5*greatSuccessRate/10000))).toFixed(1)}</span> <Tooltip tooltipText={`판매시 수익(가격 * 제작된 갯수 * 대성공 확률)`}></Tooltip></span>
                                                    </span>
                                                    <span>-</span>
                                                    <span className={`goldIconWrap`}>
                                                        <span className={`goldIcon`}></span>
                                                        <span className={`d-flex align-center`}><span>{(chargePrice(produceModalItem.now_price) * produceModalItem.production_number * (1.05 + (5*greatSuccessRate/10000))).toFixed(1)}</span> <Tooltip tooltipText={`거래 수수료 * 제작된 개수 * 대성공 확률`}></Tooltip></span>
                                                    </span>
                                                    <span>-</span>
                                                    {produceModalItem.produce_price_type === '0' && <>
                                                    <span className={`goldIconWrap`}>
                                                        <span className={`goldIcon`}></span>
                                                        <span className={`d-flex align-center`}><span>{Math.floor(produceModalItem.produce_price * (1 - (feeReductionRate/100)))}</span> <Tooltip tooltipText={`제작비용, 소수점 내림`}></Tooltip></span>
                                                    </span>
                                                    <span>-</span>
                                                    </>}
                                                    

                                                    
                                                    <span className={`goldIconWrap`}>
                                                        <span className={`goldIcon`}></span>
                                                        <span className={`d-flex align-center`}><span>{matarialTotalPrice(produceModalItem).toFixed(1)}</span> <Tooltip tooltipText={`재료비용`}></Tooltip></span>
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className={`goldIconWrap`}>
                                                        <span className={`goldIcon`}></span>
                                                        <span className={`d-flex align-center`}><span className={produceModalItem.buy_create_revenu && produceModalItem.buy_create_revenu > 0 ? 'benefit' : 'loss'}>{produceModalItem.buy_create_revenu?.toFixed(1)}</span></span>
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>}
                </section>
            </DefaultModal>
        </main>
    </>
}

export async function getServerSideProps() {
    const SERVER_URI = process.env.NEXT_PUBLIC_SERVER_URI;
    let lifeItem: (LifeItem | null) = null
    let produceItemList: (ProduceItemList | null) = null

    try {
        const response = await axios.get(`${SERVER_URI}/lostark/item/life/list`)
        const produceItemResponse = await axios.get(`${SERVER_URI}/lostark/item/produce/list`)
        produceItemList = produceItemResponse.data
        lifeItem = response.data as LifeItem
        for (const key in lifeItem) {
            const array = lifeItem[key]
            for (let i = 0; i < array.length; i++) {
                array[i]['have_item_count'] = 0
                array[i]['target_item_count'] = 0
            }
        }
    } catch (error) {
        console.dir(error)
    }

    return {
        props: {
            lifeItem: lifeItem,
            produceItemList: produceItemList
        }
    }
}