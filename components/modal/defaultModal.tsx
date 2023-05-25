import { ReactNode } from "react"
import style from "@/styles/components/modal/defaultModal.module.scss"
type DefaultModalProps = {
    children: ReactNode
    modalCheck: boolean
    closeBtnAction: Function
}

export default function DefaultModal({children, modalCheck, closeBtnAction}: DefaultModalProps) {
    const clickCloseBtn = () => {
        closeBtnAction()
    }
    
    return <>
        <section className={`${style.modalBg} ${modalCheck?style.modalOn:''}`}>
            <div className={style.modalWrap}>
                <div className={style.modalHeader}>
                    <div className={style.modalCloseBtn} onClick={clickCloseBtn}>
                        <i className="bi bi-x-lg"></i>
                    </div>
                </div>
                <div className={style.modalContent}>
                    {children}
                </div>
            </div>
        </section>
    </>
}