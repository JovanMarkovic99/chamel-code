import styled from 'styled-components';
import { Link as LinkR, NavLink as NavLinkR } from 'react-router-dom';

export const Nav = styled.nav`
    margin: 0;
    padding: 0;
    position: fixed;
    background-color: #183A28;
    background-color: var(--bg-nav);
    width: 100vw;
    height: 3.5rem;
    top: 0;
    filter: drop-shadow(0 2px 0.5rem #183A28);
    filter: drop-shadow(0 2px 0.5rem var(--bg-nav));
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.4rem;
    font-weight: 400;
    z-index: 800;
`;

export const NavStart = styled.div`
    display: flex;
    align-items: center;
    height: 100%;

    @media screen and (min-width: 850px) {
        min-width: 336px;
    }
`;

export const NavLogoLink = styled(LinkR)`
    &:hover {
        cursor: pointer;
    }

    @media screen and (min-width: 850px) {
        margin-right: 24px;
    }
`;

export const NavLink = styled(NavLinkR)`
    display: ${props => props.hiddenon ? "none" : "flex"};
    align-items: center;
    height: 100%;
    margin: 0 10px;
    /* For the border-bottom */
    padding-top: 3px;
    text-decoration: none;
    white-space: nowrap;
    background-color: transparent;
    border-bottom: 3px solid transparent;
    transition: all 0.2s ease;

    &:hover {
        background-color: rgba(232, 232, 232, 0.08);
        background-color: var(--faded-gray);

        span {
            cursor: pointer;
            font-weight: 500;
            color: #3ba55c;
            color: var(--text-tertiary);
        }

        svg > path {
            fill: #3ba55c;
            fill: var(--text-tertiary);
        }
    }

    &.active {
        border-bottom: 3px solid #3ba55c;
        border-bottom: 3px solid var(--text-tertiary);

        svg > path {
            fill: #3ba55c;
            fill: var(--text-tertiary);
        }
    }

    @media screen and (min-width: 850px) {
        display: ${props => (!props.hiddenon || (props.hiddenon === "mobile")) ? "flex" : "none"};
    }

    @media screen and (min-width: 1060px) {
        display: flex;
    }

    & > * {
        display: inline;
        padding: 0 5px;
    }

    & * {
        transition: all 0.2s ease;
    }

    & > *:first-child {
        padding-left: 10px;
    }

    & > *:last-child {
        padding-right: 10px;
    }

    svg {
        height: 28px;
    }

    span {
        color: #FFF;
        color: var(--text-white);
    }
`;

export const NavCenter = styled.div`
    position: relative;
    max-width: 850px;
    width: 100%;
    display: flex;
    align-items: center;
    margin: auto 15px;

    @media screen and (min-width: 850px) {
        margin-right: 0;
    }
`;

export const NavSearchBar = styled.input`
    height: 2.3em;
    width: 100%;
    padding: 5px;
    background-color: #FAFAFA;
    background-color: var(--bg-white);
    border: 1px solid rgba(112, 112, 112, 0.5);
    border: 1px solid var(--nav-border);
    border-right: 0;
    border-radius: 4px 0 0 4px;

    &:focus + div {
        display: flex;
    }
`;

export const NavSearchBarHelp = styled.div`
    display: none;
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    height: 150px;
    border-radius: 5px;
    background-color: #FAFAFA;
    background-color: var(--bg-white);

    & > div {
        width: 50%;
        height: 100%;
        padding: 30px 10px 30px 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        & > p {
            color: rgba(0, 0, 0, 0.87);
            color: var(--text-black);
            font-size: 15px;

            & > span {
                color: rgba(0, 0, 0, 0.54);
                color: var(--text-black-light);
            }
        }
    }
`;

export const NavSearchButton = styled.button`
    height: 2.3em;
    width: 69px;
    background-color: #FAFAFA;
    background-color: var(--bg-white);
    border: 1px solid rgba(112, 112, 112, 0.5);
    border: 1px solid var(--nav-border);
    border-radius: 0 4px 4px 0;

    &:hover {
        cursor: pointer;
    }
`;

export const NavEnd = styled.div`
    height: 100%;
    display: none;
    justify-content: flex-end;
    align-items: center;

    @media screen and (min-width: 850px) {
        display: flex;
        margin: 0 15px;
        min-width: ${({ user }) => (user ? "145px" : "40px")};
    }

    @media screen and (min-width: 1060px) {
        margin: 0 24px;
        min-width: ${({ user }) => (user ? "322px" : "270px")};
    }
`;

export const NavLinkBordered = styled(LinkR)`
    display: none;
    color: #3ba55c;
    color: var(--text-tertiary);
    border: 2px solid #3ba55c;
    border: 2px solid var(--text-tertiary);
    font-weight: 500;
    border-radius: 3rem;
    text-decoration: none;
    white-space: nowrap;
    align-self: center;
    transition: box-shadow 0.2s ease, 
        background-color 0.2s ease,
        color 0.2s ease;

    &:hover {
        cursor: pointer;
        color: #FFF;
        color: var(--text-white);
        background-color: #3ba55c;
        background-color: var(--text-tertiary);
        box-shadow: 0px 10px 13px -10px #000000,  inset -1px 3px 8px 5px #167D47;
        box-shadow: var(--hover-shadow), var(--inset-shadow-primary);
    }

    @media screen and (min-width: 1060px) {
        display: inline;
        padding: 2px 16px;
        margin: auto 10px;
        box-shadow: 0px 10px 13px -10px #000000;
        box-shadow: var(--hover-shadow);
    }
`;

export const NavMenuButton = styled.button`
    display: none;
    transition: opacity 0.5s ease-out;

    &:hover {
        opacity: 0.2;
    }

    @media screen and (min-width: 850px) {
        display: block;
        position: absolute;
        left: ${props => props.exit ? "70px" : "calc(100vw - 56px)"};
        width: 42px;
        height: 42px;
        background-color: #167D47;
        background-color: var(--bg-primary);
        border-radius: 50%;
        opacity: 0.0;
    }   

    @media screen and (min-width: 1060px) {
        display: none;
    }
`;

export const NavbarTop = styled.div`
    position: fixed;
    display: block;
    border-radius: 50%;
    width: 500px;
    height: 500px;
    top: -200px;
    left: calc(100vw - 290px);
    background-color: #183A28;
    background-color: var(--bg-nav);
    transition: transform 0.5s ease-out;
    transform: scale(0);

    @media screen and (min-width: 850px) {  
        transform: ${({ isOpen }) => (isOpen ? "scale(1)" : "scale(0)")};
    }

    @media screen and (min-width: 1060px) {
        transform: scale(0);
    }
`;

export const NavbarMenu = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    list-style-type: none;
    position: absolute;
    top: 205px;
    left: 165px;
    height: 280px;
`;

export const MenuItem = styled.li`
    height: 100%;
`;

export const MenuLink = styled(LinkR)`
    color: #FFF;
    color: var(--text-white);
    text-decoration: none;

    &:hover {
        font-weight: 500;
        color: #3ba55c;
        color: var(--text-tertiary);
    }
`;

export const NavButtonLink = styled(NavLinkR)`
    display: flex;
    height: 80%;
    padding: 10px;
    margin: 0 8px;
    align-items: center;
    border-radius: 4px;
    transition: background 0.2s;

    &:hover {
        background: rgba(232, 232, 232, 0.08);
        background: var(--faded-gray);

        svg > path {
            fill: #3ba55c;
            fill: var(--text-tertiary);
        }
    }

    &.active > svg > path {
        fill: #3ba55c;
        fill: var(--text-tertiary);
    }

    & > svg {
        display: block;
        height: 19px;
    }

    & > svg > path {
        transition: fill 0.2s;    
    }
`;

export const NavProfile = styled.button`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80%;
    background: none;
    border-radius: 4px;
    border: 1px solid transparent;
    margin-left: 8px;
    padding: 1px 12px 1px 8px;

    & > svg {
        height: 70%;
        padding-bottom: 9px;
        margin-left: 12px;

        & > path {
            fill: #FFF;
            fill: var(--text-white);
        }
    }

    &:hover {
        cursor: pointer;
        border: 1px solid rgba(112, 112, 112, 0.5);
        border: 1px solid var(--nav-border);
    }

    .navmenu-opened > & {
        border: 1px solid rgba(112, 112, 112, 0.5);
        border: 1px solid var(--nav-border);
    }
`;  

export const ProfileInfo = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
`;

export const ProfilePicture = styled.div`
    display: block;
    height: 70%;
    border-radius: 4px;
    background-color: #FAFAFA;
    background-color: var(--bg-white);
    border: 1px solid rgba(112, 112, 112, 0.5);
    border: 1px solid var(--nav-border);

    img {
        height: 100%;
        border-radius: 4px;
    }
`;

export const ProfileText = styled.div`
    display: none;
    height: 100%;
    font-size: 13px;
    font-weight: 500;
    text-align: left;
    vertical-align: baseline;
    line-height: 20px;

    span {
        display: block;
        white-space: nowrap;
    }

    span:first-child {
        color: #FFF;
        color: var(--text-white);
    }

    span:last-child {
        color: #a8aaab;
        color: var(--text-gray);
    }

    @media screen and (min-width: 1060px) {
        display: block;
        margin-left: 5px;
        margin-right: 63px;
    }
`;

export const NavProfileMenu = styled.div`
    position: fixed;
    display: none;
    flex-direction: column;
    width: 244px;
    top: 49px;
    right: 15px;
    margin-top: -2px;
    padding-top: 8px;
    background-color: #183A28;
    background-color: var(--bg-nav);
    border: 1px solid rgba(112, 112, 112, 0.5);
    border: 1px solid var(--nav-border);
    border-top: none;

    & > *:last-child:after {
        content: '';
        position: absolute;
        display: block;
        width: 86%;
        height: 1px;
        top: 0px;
        left: 7%;
        background-color: rgba(112, 112, 112, 0.5);
        background-color: var(--nav-border);
    }

    .navmenu-opened & {
        display: flex;
    }

    & > * {
        width: 100%;
    }

    & > h3 {
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.5px;
        line-height: 12px;
        text-transform: uppercase;
        color: #a8aaab;
        margin: 10px 0 6px 14px;
    }

    @media screen and (min-width: 1060px) {
        right: 24px;
    }
`;

export const NavProfileLink = styled(NavLinkR)`
    display: block;
    position: relative;
    padding: 9px 18px 9px 54px;
    color: #FFF;
    color: var(--text-white);
    text-decoration: none;
    transition: color 0.2s, background-color 0.2s, border 0.2s;

    span {
        display: inline-block;
        vertical-align: middle;
        font-size: 15px;
        font-weight: 500;
        line-height: 18px;
    }
    
    svg {
        position: absolute;
        top: 14px;
        left: 20px;
        height: 19px;
    }

    svg > path {
        transition: all 0.2s;
    }
    
    &.active {
        border-left: 3px solid #3ba55c;
        border-left: 3px solid var(--text-tertiary);

        svg > path {
            fill: #3ba55c;
            fill: var(--text-tertiary);
        }
    }

    &:hover {
        background-color: rgba(232, 232, 232, 0.08);
        background-color: var(--faded-gray);
        color: #3ba55c;
        color: var(--text-tertiary);

        span {
            border-color: #3ba55c;
            border-color: var(--text-tertiary);
        }

        svg > path {
            fill: #3ba55c;
            fill: var(--text-tertiary);
        }
    }
`;

export const NavProfileSetting = styled.button`
    display: block;
    position: relative;
    height: 47px;
    padding: 14px 18px 14px 54px;
    background: none;
    border-width: 0;
    cursor: pointer;
    color: #FFF;
    color: var(--text-white);
    text-align: left;
    transition: color 0.2s, background 0.2s;

    span {
        display: inline-block;
        vertical-align: middle;
        font-size: 15px;
        font-weight: 500;
        line-height: 18px;
    }

    svg {
        position: absolute;
        top: 14px;
        left: 20px;
        height: 19px;
    }

    svg > path {
        transition: all 0.2s ease;
    }

    div {
        position: absolute;
        right: 17px;
        top: 12.5px;
    }

    &:hover {
        background: rgba(232, 232, 232, 0.08);
        background: var(--faded-gray);
        color: #3ba55c;
        color: var(--text-tertiary);

        svg > path {
            fill: #3ba55c;
            fill: var(--text-tertiary);
        }
    }
`;