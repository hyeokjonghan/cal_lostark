import ButtonTab from "@/components/tab/buttonTab"
import Tooltip from "@/components/tooltip/tooltip"
import style from "@/styles/page/gathering/cal.module.scss"
import { ButtonTabContent, ButtonTabProps } from "@/types/buttontab"
import { LifeItem } from "@/types/lifeItem"
import axios from "axios"
import Image from 'next/image'
import { useEffect, useState } from "react"
export default function GatheringCal(props: {lifeItem: LifeItem}) {
    const [gateringType, setGateringType] = useState<number>(1)
    const clickGateringTypeEvent = (value:number) => {
        setGateringType(value)
    }
    const buttonTabInfo:ButtonTabProps = {
        radioName:"gatering",
        defaultValue: gateringType,
        buttonListItem: [
            {
                value:1,
                title:"식물채집"
            },
            {
                value:2,
                title:"벌목"
            },
            {
                value:3,
                title:"채광"
            },
            {
                value:4,
                title:"낚시"
            },
            {
                value:5,
                title:"고고학"
            },
            {
                value:6,
                title:"수렵"
            },
        ],
        clickEvent:clickGateringTypeEvent
    }
    useEffect(() => {
        // 여기서 처리
        console.dir(props.lifeItem)
    },[gateringType])

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
                                <div>주간 최저가</div>
                                <div>현재 최저가</div>
                                <div>거래량</div>
                                <div>현재수량</div>
                                <div>목표수량</div>
                                <div>이득</div>
                            </div>

                            <div className={`responsibleTableRow`}>
                                <div className={`responsibleTableCol`}>
                                    <span className={`responsibleTableColTitle`}>아이템</span>
                                    <div className={`responsibleTableColData`}>
                                        <div className={`${style.itemWrap}`}>
                                            <Image src={`/image/sample/item/Battle_Item_01_72.png`} width={40} height={40} alt='배틀아이템'></Image>
                                            <span>고대 유물</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={`responsibleTableCol`}>
                                    <span className={`responsibleTableColTitle`}>묶음</span>
                                    <div className={`responsibleTableColData`}>
                                        100
                                    </div>
                                </div>
                                <div className={`responsibleTableCol`}>
                                    <span className={`responsibleTableColTitle`}>주간 최저가</span>
                                    <div className={`responsibleTableColData`}>
                                        41
                                    </div>
                                </div>
                                <div className={`responsibleTableCol`}>
                                    <span className={`responsibleTableColTitle`}>현재 최저가</span>
                                    <div className={`responsibleTableColData`}>
                                        41
                                    </div>
                                </div>
                                <div className={`responsibleTableCol`}>
                                    <span className={`responsibleTableColTitle`}>거래량</span>
                                    <div className={`responsibleTableColData`}>
                                        20200
                                    </div>
                                </div>
                                <div className={`responsibleTableCol`}>
                                    <span className={`responsibleTableColTitle`}>현재수량</span>
                                    <div className={`responsibleTableColData`}>
                                        <input type="number"></input>
                                    </div>
                                </div>
                                <div className={`responsibleTableCol`}>
                                    <span className={`responsibleTableColTitle`}>목표수량</span>
                                    <div className={`responsibleTableColData`}>
                                        <input type="number"></input>
                                    </div>
                                </div>
                                <div className={`responsibleTableCol`}>
                                    <span className={`responsibleTableColTitle`}>이득</span>
                                    <div className={`responsibleTableColData`}>
                                        100
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className={`${style.totalGatheringResultWrap}`}>

                            <div className={`${style.totalGateringTitle}`}>정산</div>

                            <div className={`${style.inputUseItemWrap}`}>

                                <div>
                                    <div>
                                        <div className={`${style.itemWrap}`}>
                                            <Image src={`/image/sample/item/Battle_Item_01_72.png`} width={40} height={40} alt='배틀아이템'></Image>
                                            <span className={`tooltipWrap`}>생기물약 회복량<Tooltip tooltipText={`마리샵 기준`}></Tooltip></span>
                                        </div>
                                    </div>
                                    <div>
                                        <input type="number"></input>
                                    </div>
                                </div>


                                <div>
                                    <div>
                                        <div className={`${style.itemWrap}`}>
                                            <Image src={`/image/sample/item/Battle_Item_01_72.png`} width={40} height={40} alt='배틀아이템'></Image>
                                            <span className={`tooltipWrap`}>도약의 정수</span>
                                        </div>
                                    </div>
                                    <div>
                                        <input type="number"></input>
                                    </div>
                                </div>
                            </div>


                            <div className={`${style.totalResultWrap}`}>
                                <div className={`${style.totalResultTitle}`}>총 수익</div>
                                <div className={`${style.totalResultContent}`}>
                                    <div className={`${style.totalResultFormula}`}>
                                        <span className={`goldIconWrap`}>
                                            <span className={`goldIcon`}></span>
                                            <span className={`d-flex align-center`}><span>100</span> <Tooltip tooltipText={`총 재료 수익`}></Tooltip></span>
                                        </span>
                                        <span>-</span>
                                        <span className={`goldIconWrap`}>
                                            <span className={`goldIcon`}></span>
                                            <span className={`d-flex align-center`}><span>100</span> <Tooltip tooltipText={`거래 수수료`}></Tooltip></span>
                                        </span>
                                        <span>-</span>
                                        <span className={`goldIconWrap`}>
                                            <span className={`goldIcon`}></span>
                                            <span className={`d-flex align-center`}><span>100</span> <Tooltip tooltipText={`생기물약`}></Tooltip></span>
                                        </span>
                                        <span>-</span>
                                        <span className={`goldIconWrap`}>
                                            <span className={`goldIcon`}></span>
                                            <span className={`d-flex align-center`}><span>100</span> <Tooltip tooltipText={`도약의 정수`}></Tooltip></span>
                                        </span>
                                    </div>
                                    <div>
                                        <div className={`goldIconWrap`}>
                                            <span className={`goldIcon`}></span>
                                            <span className={`d-flex align-center`}><span>100</span></span>
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
                                                <th scope="col">대성공 확률</th>
                                                <th scope="col">제작 수수료 감소율</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className={`table-group-divider`}>
                                                <td scope="row">
                                                    <div className={`inputFormRightIcon ${style.customWithIcon}`}>
                                                        <input type="number" className={``}></input>
                                                        <span>%</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className={`inputFormRightIcon ${style.customWithIcon}`}>
                                                        <input type="number"></input>
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
                            <div>현재 최저가</div>
                            <div>주간 최저가 구매제작 수익</div>
                            <div>현재가 구매제작 수익</div>
                            <div>거래량</div>
                        </div>

                        <div className={`responsibleTableRow`}>
                            <div className={`responsibleTableCol`}>
                                <span className={`responsibleTableColTitle`}>아이템</span>
                                <div className={`responsibleTableColData`}>
                                    <div className={`${style.itemWrap}`}>
                                        <Image src={`/image/sample/item/Battle_Item_01_72.png`} width={40} height={40} alt='배틀아이템'></Image>
                                        <span>고대 유물</span>
                                    </div>
                                </div>
                            </div>
                            <div className={`responsibleTableCol`}>
                                <span className={`responsibleTableColTitle`}>묶음</span>
                                <div className={`responsibleTableColData`}>
                                    <input type="number"></input>
                                </div>
                            </div>
                            <div className={`responsibleTableCol`}>
                                <span className={`responsibleTableColTitle`}>묶음</span>
                                <div className={`responsibleTableColData`}>
                                    100
                                </div>
                            </div>
                            <div className={`responsibleTableCol`}>
                                <span className={`responsibleTableColTitle`}>묶음</span>
                                <div className={`responsibleTableColData`}>
                                    100
                                </div>
                            </div>
                            <div className={`responsibleTableCol`}>
                                <span className={`responsibleTableColTitle`}>묶음</span>
                                <div className={`responsibleTableColData`}>
                                    100
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* 상세보기 모달 */}
                {/* <DefaultModal>
                    <CalDefault></CalDefault>
                </DefaultModal> */}
            </section>

        </main>
    </>
}

export async function getServerSideProps() {
    const SERVER_URI = process.env.NEXT_PUBLIC_SERVER_URI;
    let lifeItem: (LifeItem | null) = null

    try {
        const response = await axios.get(`${SERVER_URI}/lostark/item/life/list`)
        lifeItem = response.data
    } catch (error) {
        console.dir(error)
    }

    return {
        props: {
            lifeItem: lifeItem
        }
    }
}