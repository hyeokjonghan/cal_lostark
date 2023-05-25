import style from "@/styles/components/footer.module.scss"
import Link from "next/link"

export default function Footer() {
    return <>
        <div className={`${style.footerWrap}`}>
            <div className={`container-xl`}>
                <ul className={`d-flex ${style.footerInfoWrap}`}>
                    <li><span>Contact - </span>jjong2028@gmail.com</li>
                    <li><Link href="https://jjong-factory.tistory.com" target="_blank">Blog</Link></li>
                </ul>
            </div>
        </div>
    </>
}