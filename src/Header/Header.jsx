import React, { useState, useEffect } from 'react';
import './Header.css'

export default function Header(props){
    const {onBurgerClick} = props

    const [isHidden, setIsHidden] = useState(false)
    const [lastScroll, setLastScroll] = useState(0)

    const scroll = () => {
        const currentScroll = window.scrollY;
        if(currentScroll > lastScroll && currentScroll > 50){
            setIsHidden(true)
        } else {
            setIsHidden(false)
        }
        setLastScroll(currentScroll)
    }

    useEffect(() => {
        window.addEventListener('scroll', scroll);
        return () => window.removeEventListener('scroll', scroll)
    })


    return (
        <header className={isHidden ? 'header background hidden' : 'header background'}>
            <p className="logo-name color">ALIST</p>
            <div className="burger-menu" onClick={onBurgerClick}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
        </header>
    )
}