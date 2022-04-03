import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link as LinkR } from 'react-router-dom';

const ContainerElement = ({color, topCutOut, botCutOut, className, style, children}) => {
    const ref = useRef(null)

    return (
        <div ref={ref} className={`${className}`} 
        style={{ marginTop: topCutOut === undefined ? "0" : "9.3234vw", marginBottom: botCutOut === undefined ? "0" : "9.3234vw", ...style}}>
            { topCutOut !== undefined && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 180">
                <path fill="currentColor" d="M 0 180 C 0 179 0 178 0 178 C 0 134 30 104 84.9 99.27 C 218 92 659.38 82.03 1139.49 75.69 C 1508.26 70.81 1831.41 72.5 1852.6 66 C 1925.09 55.87 1919 6 1920 0 C 1920 6 1920 175 1920 180 C 1664 180 1024 180 0 180"></path>
            </svg>
            )}
            <div> { children } </div>
            { botCutOut !== undefined && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 180">
                <path fill="currentColor" d="M 1920 0 C 1920 1 1920 2 1920 2 C 1920 46 1890 76 1835.1 80.73 C 1702 88 1260.62 97.97 780.51 104.31 C 411.74 109.19 88.59 107.5 67.4 114 C -5.09 124.13 1 174 0 180 C 0 174 0 5 0 0 C 256 0 896 0 1920 0"></path>
            </svg>
            )}
        </div>
    )
}

export const Container = styled(ContainerElement)`
    display: flex;
    position: relative;
    width: 100%;
    background: ${({ color }) => color};
    color: ${({color}) => color};

    & > div {
        height: 100%;
        width: 100%;
    }

    & > svg {
        display: none;
        position: absolute;
        width: 100%;
    }

    & > svg:first-child {
        display: block;
        bottom: 100%;
        ${({topCutOut}) => topCutOut ? "" : "transform: scale(-1, 1)"}
        }
    }

    & > svg:last-child {
        display: block;
        top: 100%;
        ${({botCutOut}) => botCutOut ? "" : "transform: scale(-1, 1)"}
    }

`;

const mouseScrollWobble = keyframes`
    from {
        transform: translateY(0px);
    }

    to {
        transform: translateY(20px);
    }
`;

export const TopSection = styled.section`
    display: block;
    margin: 13px 19px;

    & > svg:first-child {
        display: block;
        width: 60%;
        margin: 50px auto 30px auto;
    }

    & > h1 {
        color: #FFF;
        color: var(--text-secondary);
        text-align: center;
        margin: 20px auto;
        margin-top: 40px;
        font-weight: 700;
        font-size: 24px;
    }

    & > h2 {
        color: #FFF;
        color: var(--text-secondary);
        text-align: center;
        margin: 20px auto;
        margin-bottom: 20%;
        font-weight: 400;
        font-size: 17px;
    }

    & > svg:last-child {
        display: none;
        color: var(--text-secondary);
    }

    @media screen and (min-width: 650px) {
        & > svg:first-child {
            width: 50%;
        }

        & > h1 {
            font-size: 35px;
            margin: 0;
        }

        & > h2 {
            font-size: 17px;
            margin-bottom: 12%;
        }
    }

    @media screen and (min-width: 920px) {
        & > svg:first-child {
            margin-top: 7%;
            width: 40%;
        }

        & > h1 {
            margin: 20px auto;
            margin-top: 40px;
        }

        & > h2 {
            margin-bottom: 13%;
        }

        & > svg:last-child {
            display: block;
            height: 80px;
            margin: 0 auto 5% auto;
            animation: ${ mouseScrollWobble } 1s infinite alternate;
        }
    }

    @media screen and (min-width: 1300px) {
        & > svg:first-child {
            width: 35%;
        }

        & > h1 {
            font-size: 45px;
        }

        & > h2 {
            font-size: 22px;
            margin-bottom: 10%;
        }
    }

    @media screen and (min-width: 1600px) {
        & > svg:first-child {
            width: 25%;
            margin: 120px auto 4% auto;
            margin-right: 40%;
        }
    }
`;

export const MiddleSection = styled.section`
    display: flex;
    background-color: #FAFAFA;
    background-color: var(--bg-secondary);

    @media screen and (min-width: 1080px) {
        padding: 7vw 0 5vw 0;
    }

    @media screen and (min-width: 1600px) {
        padding: 5vw 0 5vw 0;
    }
`;

export const InfoSection = styled.div`
    display: none;

    @media screen and (min-width: 1080px) {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 500px;
        text-align: center;
        padding: 20px 25px;
        margin-left: 5%;
        border-radius: 40px;
        background-color: #FAFAFA;
        background-color: var(--bg-surface);
        box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
        box-shadow: var(--google-shadow);

        &:last-child {
            margin-right: 5%;
        }

        & > h2 {
            display: block;
            width: 100%;
            font-size: 25px;
            font-weight: 700;
            color: rgba(0, 0, 0, 0.87);
            color: var(--text-primary);
            margin-bottom: 10px;
        }

        & > h3 {
            display: block;
            width: 100%;
            font-size: 15px;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.54);
            color: var(--text-primary-light);
        }

        & > img {
            display: block;
            margin: auto;
            margin-bottom: 0;
            padding: 10%;
            width: 100%;
        }
    }

    @media screen and (min-width: 1300px) {
        height: 600px;
        padding: 25px;

        & > h2 {
            font-size: 30px;
        }

        & > h3 {
            font-size: 18px;
        }

        & > img {
            width: 90%;
        }
    }

    @media screen and (min-width: 1600px) {
        height: 700px;
        padding: 35px;

        & > h2 {
            font-size: 35px;
        }

        & > h3 {
            font-size: 23px;
        }
    }
`;

export const BottomSection = styled.section`
    display: block;
    padding: 13px 20px;
    text-align: center;
    background-color: #FAFAFA;
    background-color: var(--bg-secondary);

    & > h2 {
        font-weight: 700;
        font-size: 24px;
        margin: 22px 0;
        color: rgba(0, 0, 0, 0.87);
        color: var(--text-primary);
    }

    @media screen and (min-width: 550px) {
        width: 70%;
        margin: 50px auto;

        & > h2 {
            font-size: 26px;
        }
    }

    @media screen and (min-width: 1300px) {
        & > h2 {
            margin-top: 100px;
            font-size: 30px;
        }
    }
`;

export const ButtonCTA = styled(LinkR)`
    display: block;
    width: 100%;
    margin: 3% auto 7%;
    padding: 12px;
    border-radius: 32px;
    background-color: #3ba55c;
    background-color: var(--text-tertiary);
    font-size: 24px;
    color: #FAFAFA;
    color: var(--text-secondary);
    text-decoration: none;
    box-shadow: 0px 10px 13px -10px #000000;
    box-shadow: var(--hover-shadow);

    &:hover {
        box-shadow: 0px 10px 13px -10px #000000, inset -1px 3px 8px 5px #167D47;
        box-shadow: var(--hover-shadow), var(--inset-shadow-primary);
    }

    @media screen and (min-width: 550px) {
        width: 70%;
        font-size: 26px;
    }

    @media screen and (min-width: 1300px) {
        width: 60%;
        font-size: 30px;
    }
`;