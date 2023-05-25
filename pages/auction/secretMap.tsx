import ButtonTab from "@/components/tab/buttonTab";
import Tooltip from "@/components/tooltip/tooltip";
import NoImagePageLayout from "@/layout/noImagePageLayout";
import { ButtonTabProps } from "@/types/buttontab";
import Image from "next/image";
import { useEffect, useState } from "react";
import style from "@/styles/page/auction/secret.module.scss"
import axios from 'axios'
import { SecretMapList, WithDropItem, SecretMap } from "@/types/secretMap";
import {chargePrice, calDistributionPrice, calDifurcation, calAdequatePrice} from "@/lib/auction"


export default function SecretMap(props: { mapData: SecretMapList }) {
    const [checkSecrectMap, setCheckSecretMap] = useState<number>(2)
    const [dropItemList, setDropItemList] = useState<WithDropItem[] | undefined>(undefined)
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [userCount, setUserCount] = useState<number>(30)  // 추후 처리 당장은 고정

    const clickSecretMapType = (value: number) => {
        setCheckSecretMap(value)
    }

    const buttonTabInfo: ButtonTabProps = {
        buttonListItem: [
            {
                title: "파푸니카",
                value: 1
            },
            {
                title: "베른 남부",
                value: 2
            },
            {
                title: "볼다이크",
                value: 3
            },
        ],
        clickEvent: clickSecretMapType,
        radioName: "secret",
        defaultValue: checkSecrectMap
    }

    useEffect(() => {
        setDropItemList(props.mapData.find(obj => obj.map_id === checkSecrectMap)?.with_drop_item)
    }, [checkSecrectMap])

    useEffect(() => {
        let checkSum = 0
        dropItemList?.map((item) => {
            checkSum = checkSum + (item.now_price * item.drop_count)
        })

        setTotalPrice(checkSum)
    }, [dropItemList])

    return <>
        <NoImagePageLayout>
            <section className={style.secretMapWrap}>
                <section>
                    <ButtonTab buttonTabProp={buttonTabInfo}></ButtonTab>
                    <table className={`defaultTable ${style.mapInfoWrap}`}>
                        <thead>
                            <tr>
                                <th colSpan={2}>파푸니카 비밀지도</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>가격</td>
                                <td>
                                    <span className={`goldIconWrap`}>
                                        <span className={`goldIcon`}></span>
                                        <span className={`d-flex align-center`}>{totalPrice}</span>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>판매 수수료</td>
                                <td>
                                    <span className={`goldIconWrap`}>
                                        <span className={`goldIcon`}></span>
                                        <span className={`d-flex align-center`}>{chargePrice(totalPrice)}</span>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>분배금</td>
                                <td>
                                    <span className={`goldIconWrap`}>
                                        <span className={`goldIcon`}></span>
                                        <span className={`d-flex align-center`}>{calDistributionPrice(totalPrice, userCount)}</span>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>손익 분기점</td>
                                <td>
                                    <span className={`goldIconWrap`}>
                                        <span className={`goldIcon`}></span>
                                        <span className={`d-flex align-center`}>{calDifurcation(totalPrice, userCount)}</span>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>입찰 적정가</td>
                                <td>
                                    <span className={`goldIconWrap`}>
                                        <span className={`goldIcon`}></span>
                                        <span className={`d-flex align-center`}>{calAdequatePrice(totalPrice, userCount)}</span>
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <section className={style.secretMapResultWrap}>
                    <table className={`defaultTable`}>
                        <thead>
                            <tr>
                                <th>아이템</th>
                                <th>현재 최저가</th>
                                <th>드랍 수량<Tooltip tooltipText={`4인 기준`}></Tooltip></th>
                                <th>합계</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dropItemList && dropItemList.map((item) => {
                                return <>
                                    <tr key={item.item_code}>
                                        <td>
                                            <div className={`itemWrap`}>
                                                <Image src={`${item.item_icon}`} width={40} height={40} alt='배틀아이템'></Image>
                                                <span className={`tooltipWrap`}>
                                                        {item.item_code === '65021010' ? 'T3 1레벨 보석' : item.item_name}
                                                    </span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`goldIconWrap`}>
                                                <span className={`goldIcon`}></span>
                                                <span className={`d-flex align-center`}>{item.now_price}</span>
                                            </span>
                                        </td>
                                        <td>
                                            {item.drop_count}
                                        </td>
                                        <td>
                                            <span className={`goldIconWrap`}>
                                                <span className={`goldIcon`}></span>
                                                <span className={`d-flex align-center`}>{item.drop_count * item.now_price}</span>
                                            </span>
                                        </td>
                                    </tr>
                                </>
                            })}


                        </tbody>
                    </table>
                </section>
            </section>
        </NoImagePageLayout>
    </>
}

export async function getServerSideProps() {
    const SERVER_URI = process.env.NEXT_PUBLIC_SERVER_URI;
    let secretMapData: (SecretMapList | null) = null

    try {
        const response = await axios.get(`${SERVER_URI}/lostark/secret`)
        secretMapData = response.data
    } catch (error) {
        console.dir(error)
    }

    return {
        props: {
            mapData: secretMapData
        }
    }
}