import React, { useState, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import styled from 'styled-components';

const ScrollToTopCTA = ({ className, showBellow }) => {
    const [show, setShow] = useState(showBellow ? false : true);


    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > showBellow) {
                if (!show)
                    setShow(true);
            } else {
                if (show)
                    setShow(false);
            }
        };

        if (showBellow) {
            window.addEventListener(`scroll`, handleScroll);
            return () => window.removeEventListener(`scroll`, handleScroll);
        }
    }, [showBellow, show]);

    const handleClick = () => {
        scroll.scrollToTop({ duration: 400, smooth: "easeInOutQuad"});
    };

    return (
        <svg className={`${className}${show ? " show" : ""}`} onClick={handleClick} aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path fill="currentColor" d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z" ></path>
        </svg>
    )
}

export const ScrollToTopCTADefault = styled(ScrollToTopCTA)`
    display: block;
    position: fixed;
    top: 100vh;
    right: 20px;
    width: 60px;
    height: 60px;
    padding: 5px;
    border-radius: 50%;
    background-color: #3ba55c;
    background-color: var(--text-tertiary);
    color: #FAFAFA;
    color: var(--bg-secondary);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    box-shadow: var(--hard-bottom-shadow);
    transition: transform 0.3s 0.1s ease-out;
    z-index: 100;

    & > path {
        transform-origin: 50% 50%;
        transform: scale(-1, -1) translateY(-100px);
    }

    
    &.show {
        transform: translateY(-140px);
    }
    
    &:hover.show {
        cursor: pointer;
        transform: scale(1.1) translateY(-120px);
    }

    @media screen and (min-width: 850px) {
        right: 60px;
    }

`;

export default ScrollToTopCTA;
