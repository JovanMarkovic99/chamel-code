import styled from 'styled-components';
import { NavLink as NavLinkR } from '../Navbar/NavbarElements';

export const Profilebar = styled.nav`
    position: absolute;
    top: 3.5rem;
    width: 100%;
    height: 3.5rem;
    background-color: #183A28;
    background-color: var(--bg-nav);  
    border-top: 1px solid rgba(112, 112, 112, 0.5);
    border-top: 1px solid var(--nav-border);
    border-bottom: 1px solid rgba(112, 112, 112, 0.5);
    border-bottom: 1px solid var(--nav-border);

    @media screen and (min-width: 400px) {
        padding: 0 24px;
    }
`;

export const ProfilebarContent = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    max-width: 1400px;
    margin: 0 auto;

    @media screen and (min-width: 850px) {
        padding: 0 50px;
        justify-content: flex-start;
    }
`;

export const ProfileLink = styled(NavLinkR)`
    margin: 0;
    color: #FFF;
    color: var(--text-white);

    &:nth-child(4), &:nth-child(5) {
        display: none;
    }

    & > span {
        text-transform: uppercase;
        font-weight: 400;
        font-size: 18px;
    }
    
    @media screen and (min-width: 450px) {
        &:nth-child(4) {
            display: flex;
        }
    }

    @media screen and (min-width: 550px) {
        &:nth-child(5) {
            display: flex;
        }
    }

    @media screen and (min-width: 615px) {
        margin: 0 10px;

        &:first-child {
            margin-left: 0;
        }
    }
`;