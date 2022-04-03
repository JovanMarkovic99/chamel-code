import styled, { keyframes } from 'styled-components';
import { NavLink as NavLinkR } from 'react-router-dom';

const pageLoadSlideIn = keyframes`
    from {
        left: -340px
    }

    to {
        left: -300px;
    }
`;

export const SidebarNav = styled.div`
    position: fixed;
    display: block;
    width: 300px;
    height: 100vh;
    top: 0;
    left: -300px;
    background-color: #183A28;
    background-color: var(--bg-nav);
    z-index: 900;
    transition: transform 0.5s ease;
    animation: ${ pageLoadSlideIn } 0.5s ease 1;
    transform: ${({ isOpen }) => (isOpen ? "translateX(300px)" : "translateX(0)")};

    &:after {
        content: "";
        position: absolute;
        display: block;
        background-color: #183A28;
        background-color: var(--bg-nav);
        border-radius: 45%;
        top: 50%;
        width: 100px;
        height: 60px;
        left: 100%;
        margin-left: -60px;
        margin-top: -30px;
    }

    @media screen and (min-width: 850px) {
        transform: translateX(-60px);
    }
`;

export const SidebarButton = styled.button`
    position: absolute;
    opacity: 0;
    border-radius: 45%;
    top: 50%;
    width: 100px;
    height: 60px;
    left: 100%;
    margin-top: -30px;
    margin-left: -60px;
    z-index: 902;

    &:hover {
        cursor: pointer;
    }
`;

export const SidebarMenu = styled.ul`
    display: flex;
    flex-direction: column;
    position: absolute;
    height: 400px;
    width: 100%;
    top: 50%;
    margin-top: -200px;
    list-style-type: none;
`;

export const MenuItem = styled.li`
    display: flex;
    flex-direction: column;
    text-align: left;
    height: 50%;
    width: 80%;
    padding-left: 20px;
    border-top: 1px solid rgba(112, 112, 112, 0.5);
    border-top: 1px solid var(--nav-border);

    &:first-child {
        border: none;
    }
`;

export const MenuLink = styled(NavLinkR)`
    margin: 0 auto 15% 0;
    font-size: 2rem;
    color: #FFF;
    color: var(--text-white);
    text-decoration: none;
    white-space: nowrap;
    opacity: 0.8;
    border-bottom: 2px solid transparent;
    transition: all 0.2s;

    &:first-child {
        margin-top: auto;
    }

    &:last-child {
        margin-bottom: auto;
    }

    &:hover {
        font-weight: 500;
        opacity: 1;
    }

    &.active {
        border-bottom: 2px solid #3ba55c;
        border-bottom: 2px solid var(--text-tertiary);
        opacity: 1;
    }
`;

export const PageFade = styled.div`
    position: fixed;
    display: block;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: black;
    z-index: 899;
    opacity: ${({ isOpen }) => (isOpen ? "0.5" : "0")};
    visibility: ${({ isOpen }) => (isOpen ? "initial" : "hidden")};
    transition: opacity 0.5s ease 0.1s;

    @media screen and (min-width: 850px) {
        opacity: 0;
        pointer-events: none;
    }
`;

export const ProfileMenu = styled(SidebarMenu)`
    height: 100%;
    top: 0;
    margin-top: 0;
`;

export const ProfileMenuItem = styled(MenuItem)`
    height: auto;
    width: 100%;
    padding-top: 20px;
    margin-bottom: 20px;

    & > h3 {
        color: #FFF;
        color: var(--text-white);
        font-weight: 600;
        font-size: 22px;
        margin-top: 15px;
        margin-bottom: 5px;
    }

    & > h2 {
        color: #a8aaab;
        font-weight: 400;
        font-size: 18px;
    }

    @media screen and (max-height: 650px) {
        margin-bottom: 10px;
        padding-top: 10px;
    }

    @media screen and (max-height: 590px) {
        margin: 0;
        padding-top: 0;
    }
`;

export const ProfilePicture = styled.div`
    display: block;
    height: 60px;
    width: 60px;
    border-radius: 4px;
    background-color: #FAFAFA;
    background-color: var(--bg-white);
    border: 1px solid rgba(112, 112, 112, 0.5);
    border: 1px solid var(--nav-border);

    img {
        height: 100%;
        width: 100%;
        border-radius: 4px;
    }
`;

export const ProfileMenuLink = styled(NavLinkR)`
    display: block;
    position: relative;
    margin-left: -20px;
    padding: 14px 18px 14px 64px;
    color: #FFF;
    color: var(--text-white);
    text-decoration: none;
    white-space: nowrap;
    opacity: 0.8;
    transition: all 0.2s ease-in-out;
    
    h3, span {
        display: inline-block;
        vertical-align: middle;
        font-size: 22px;
        font-weight: 400;
        line-height: 18px;
    }
    
    h3 {
        margin-left: -44px;
    }
    
    svg {
        position: absolute;
        top: 15px;
        left: 20px;
        height: 27px;
    }

    svg > path {
        transition: all 0.2s;
    }
    
    &.active {
        border-left: 3px solid #3ba55c;
        border-left: 3px solid var(--text-tertiary);
        opacity: 1;

        svg > path {
            fill: #3ba55c;
            fill: var(--text-tertiary);
        }
    }

    &:hover {
        background-color: rgba(232, 232, 232, 0.08);
        background-color: var(--faded-gray);
        opacity: 1;
        
        span, h3 {
            font-weight: 500;
        }
    }
`;

export const ProfileMenuBottom = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 57px;
    width: 100%;
    margin-top: auto;
    border-top: 1px solid rgba(112, 112, 112, 0.5);
    border-top: 1px solid var(--nav-border);

    svg {
        height: 57px;
        width: 67px;
        padding: 15px 20px 15px 20px;
        border-radius: 20% / 50%;
        transition: background 0.2s ease-in-out;
    }

    & > svg:first-child {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        width: 72px;
        padding-right: 25px;
    }

    & > svg:last-child {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        width: 72px;
        padding-left: 25px;
    }

    svg: hover {
        background: rgba(232, 232, 232, 0.08);
        background: var(--faded-gray);
    }
`;