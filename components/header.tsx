import Link from "next/link";
import style from "@/styles/components/header.module.scss"
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
export default function Header() {
    const [selectMenu, setSelectMenu] = useState<number>(0)
    const router = useRouter();
    const menuWrap = useRef<HTMLUListElement>(null)
    const menuBar = useRef<HTMLDivElement>(null)
    const headerWrap = useRef<HTMLElement>(null)
    const menuList = [
        {
            name: "채집 생산 계산기",
            path: "/",
            hasImage: true
        },
        {
            name: "비밀 지도",
            path: "/auction/secretMap",
            hasImage: false
        },
        {
            name: "경매 계산기",
            path: "/auction/calculator",
            hasImage: false
        }
    ]

    const moveMenuBar = (menu: HTMLLIElement) => {
        const menuItem = menu as HTMLElement
        if (menuBar.current) {
            menuBar.current.style.width = menuItem.clientWidth + "px"
            menuBar.current.style.left = menuItem.offsetLeft + "px"
        }
    }

    useEffect(() => {
        menuList.map((item, index) => {
            if (item.path === router.route) {
                setSelectMenu(index)
            }
        })
    }, [router.route])

    useEffect(() => {
        // 변경 로직
        if (menuBar.current) {
            moveMenuBar(menuWrap.current?.children[selectMenu] as HTMLLIElement)
        }

        const handleMenuBackgroundColor = (event: Event) => {
            if (menuList[selectMenu].hasImage) {
                if (headerWrap.current) {
                    if (window.scrollY > 0) {
                        headerWrap.current.style.backgroundColor = "#212226"
                    } else {
                        headerWrap.current.style.backgroundColor = "rgba(0,0,0,0)"
                    }
                }
            }
        }

        window.addEventListener('scroll', handleMenuBackgroundColor)



        // 메뉴 바 처리
        const menuMouseEnter = (event: MouseEvent) => {
            const menuElement = event.target as HTMLLIElement
            moveMenuBar(menuElement)
        }

        const menuMouseLeave = () => {
            if (menuWrap.current) {
                moveMenuBar(menuWrap.current.children[selectMenu] as HTMLLIElement)
            }
        }

        if (menuWrap.current) {
            const menuElements = Array.from(menuWrap.current.children) as HTMLElement[]
            menuElements.forEach((menu) => {
                menu.addEventListener('mouseenter', menuMouseEnter)
            })
            menuWrap.current.addEventListener('mouseleave', menuMouseLeave)
        }

        return () => {
            if (menuWrap.current) {
                const menuElements = Array.from(menuWrap.current.children) as HTMLElement[]
                menuElements.forEach((menu) => {
                    menu.removeEventListener('mouseenter', menuMouseEnter)
                })

                menuWrap.current.removeEventListener('mouseleave', menuMouseLeave)
                window.removeEventListener('scroll', handleMenuBackgroundColor)
            }
        }
    }, [selectMenu])





    return <>
        <nav className={`${style.headerWrap} ${menuList[selectMenu].hasImage ? '' : style.pageNotImage}`} ref={headerWrap}>
            <div className={`container-xl ${style.headerMenu}`}>
                <ul className={`d-flex align-items-center flex-row`} ref={menuWrap}>
                    {
                        menuList.map((item, index) => {
                            return <>
                                <li key={item.path}><Link href={item.path}>{item.name}</Link></li>
                            </>
                        })
                    }
                </ul>

                {/* 메뉴 하단 표시 바 */}
                <div className={`${style.headerBar}`} ref={menuBar}></div>
            </div>
        </nav>
    </>
}