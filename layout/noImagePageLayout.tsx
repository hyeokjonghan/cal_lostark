import { CSSProperties, ReactNode } from "react";
type PageLayoutProps = {
    children: ReactNode
}

export default function NoImagePageLayout({children} : PageLayoutProps) {
    const noImagePageLayoutStyle:CSSProperties = {
        padding: "70px 0 0 0"
    }
    
    return <>
        <section style={noImagePageLayoutStyle}>
            {children}
        </section>
    </>
}