import React from 'react';
import styled from 'styled-components';
import CutOffContainer from '../CutOffContainer';
import logo from '../../images/logo.png';

const Footer = () => {
    return (
        <footer>
            <CutOffContainer height="500px" color="var(--text-black)" topCutOut={true}>
                <FooterContainer>
                    <div>
                        <p><span>Chamel</span>Code</p>
                        <img src={logo} alt="logo"/>
                    </div>
                    <p>Site design / logo © 2022 Jovan Markovic</p>
                </FooterContainer>
            </CutOffContainer>
        </footer>
    )
}

const FooterContainer = styled.div`
    width: 100%;
    padding: 10px 20px;
    margin: 30px auto 50px;
    text-align: center;

    & > div {
        display: flex;
        color: #167D47;
        color: var(--bg-primary);
        margin: 10px auto;

        & > p {
            display: block;
            font-size: 19px;
            font-weight: 700;
            margin: auto;
            margin-right: 5px;

            & > span {
                color: #3ba55c;
                color: var(--text-tertiary);
            }
        }

        & > img {
            width: 37px;
            height: 37px;
            margin-right: auto;
            margin-left: 5px;
        }
    }

    & > p {
        color: rgba(255, 255, 255, 0.7);
        color: var(--text-white-light);
        font-size: 14px;
        font-weight: 400;
        margin: 15px 0;
    }

    @media screen and (min-width: 1080px) {
        margin: 30px auto 90px;

        & > div {
            & > p {
                font-size: 22px;
            }
            & > img {
                width: 50px;
                height: 50px;
            }
        }

        & > p {
            font-size: 16px;
        }
    }
`;

export default Footer;
