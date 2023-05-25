import style from "@/styles/components/tooltip/tooltip.module.scss"
import { useEffect, useRef, useState } from "react"

type tooltipProps = {
    tooltipText: String
}

export default function Tooltip({ tooltipText }: tooltipProps) {
    const tooltipIconRef = useRef<HTMLDivElement>(null)
    const [viewToolTip, setViewToolTip] = useState<boolean>(false)
    const tooltipOverHandler = (event: React.MouseEvent<HTMLElement>) => {
        setViewToolTip(true)
    }

    const tooltipOutHandler = (event: React.MouseEvent<HTMLElement>) => {
        setViewToolTip(false)
    }

    return <>
        <div className={style.tooltipWrap} ref={tooltipIconRef} onMouseOver={tooltipOverHandler} onMouseOut={tooltipOutHandler}>
            <span className={style.tooltipIcon}><i className="bi bi-question"></i></span>
            {viewToolTip ? <>
                <div className={style.tooltipElement} style={{ left: "25px" }}>{tooltipText}</div>
            </> : <></>}

        </div>
    </>
}