import React from 'react';
import styled from 'styled-components';

export const CutOffContainerElement = ({color, topCutOut, botCutOut, className, style, children}) => {
    return (
        <div className={`${className}`} 
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

const CutOffContainer = styled(CutOffContainerElement)`
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

export default CutOffContainer;