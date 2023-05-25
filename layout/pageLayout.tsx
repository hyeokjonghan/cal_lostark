import { ReactNode } from "react";
import style from "@/styles/layout/pageLayout.module.scss"
type PageLayoutProps = {
    children: ReactNode
}
export default function PageLayout({children}: PageLayoutProps) {
    return <>
        <div className={`${style.pageLayout}`}>
            {children}
        </div>
    </>
}