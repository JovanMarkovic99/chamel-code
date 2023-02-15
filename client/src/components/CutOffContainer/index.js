import React from 'react';
import styled from 'styled-components';

import { ReactComponent as CutOutSvg } from '../../images/cut_out.svg';
import { ReactComponent as CutOutInverseSvg } from '../../images/cut_out_inverse.svg';

export const CutOffContainerElement = ({color, className, style, children, ...props}) => {
    const { topCutOut, botCutOut } = props

    return (
        <div className={`${className}`} style={{ marginTop: topCutOut ? "9.3234vw" : "0", marginBottom: botCutOut ? "9.3234vw" : "0", ...style}}>
            { topCutOut && <CutOutInverseSvg/> }
            <div> { children } </div>
            { botCutOut && <CutOutSvg/> }
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