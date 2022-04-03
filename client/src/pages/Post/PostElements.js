import React, { useState } from 'react';
import styled from 'styled-components';

export const PostHeader = styled.div`
    display: flex;
    
    & > h1 {
        font-size: 24px;
        font-weight: 500;
        margin-bottom: 40px;
        color: rgba(0, 0, 0, 0.87);
        color: var(--text-primary);
    
        @media screen and (min-width: 650px) {
            font-size: 27px;
            margin: 25px 0 35px 0;
        }
    }

    & > img {
        display: none;
    }

    @media screen and (min-width: 1100px) {
        & > img {
            display: block;
            width: 200px;
            margin-left: 20px;
            margin-bottom: -13px;
        }
    }
`;

export const Heading = styled.h1`

`;

export const PostContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    @media screen and (min-width: 900px) {
        flex-direction: row;
    }
`;

const HelpPanelElement = ({ className, heading, children }) => {
    const [panelOpened, setPanelOpened] = useState(false);

    return (
        <div className={`${className} ${panelOpened ? 'panel-opened' : 'panel-closed'}`}>
            <button onClick={() => { setPanelOpened(!panelOpened); }}>
                <h2>{ heading }</h2>
                <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                </svg>
            </button>
            <div>
                { children }
            </div>
        </div>
    )
}

export const HelpPanelStep = styled(HelpPanelElement)`
    background: none;

    & > button {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 45px;
        padding: 15px;
        background: #167D47;
        background: var(--bg-primary);
        border: 1px solid rgba(112, 112, 112, 0.5);
        border: 1px solid var(--nav-border);
        color: #FFF;
        color: var(--text-white);
        transition: all 0.2s ease-in-out;

        & > h2 {
            font-size: 14px;
            font-weight: 500;
        }

        & > svg {
            width: 17px;
            transition: transform 0.2s ease-in-out;

            & > path {
                fill: #FFF;
                fill: var(--text-white);
            }
        }

        &:hover {
            cursor: pointer;
            border: 1px solid rgba(0, 0, 0, 0.87);
            border: 1px solid var(--text-primary);
        }
    }

    & > div {
        max-height: 0;
        background-color: #3ba55c;
        background-color: var(--text-tertiary);
        overflow: hidden;
        color: #FFF;
        color: var(--text-white);
        transition: all 0.35s ease-out;

        & > h3 {
            font-size: 13px;
            font-weight: 400;
            padding: 15px;
        }
    }

    &.panel-opened {
        & > button > svg {
            transform: rotate(180deg);
        }

        & > div {
            max-height: 1000px;
            transition: all 0.35s ease-in;
        }
    }

    @media screen and (min-width: 650px) {
        & > button {
            height: 49px;

            & > h3 {
                font-size: 15.4px; 
            }
        }

        & > div {
            font-size: 14.3px;
        }
    }
`;

export const HelpPanel = styled(HelpPanelStep)`
    border-radius: 10px;
    box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
    box-shadow: var(--google-shadow);

    & > button {
        background-color: #183A28;
        background-color: var(--bg-nav);
        border-radius: 10px;
        border: 2px solid #183A28;
        border: 2px solid var(--bg-nav);
        color: #FFF;
        color: var(--text-white);
        transition: border-radius 0.2s ease-in-out 0.35s, border 0.2s ease-in-out;

        & > h2 {
            font-size: 14px;
            font-weight: 400;
        }

        &:hover {
            border: 2px solid rgba(0, 0, 0, 0.87);
            border: 2px solid var(--text-primary);
        }
    }

    & > div > h3 {
        background-color: #167D47; 
        background-color: var(--bg-primary);
    }

    &.panel-opened {
        & > button {
            border-radius: 10px 10px 0 0;
            transition: all 0.2s ease-in-out;
        }

        & > div {
            border-radius: 0 0 10px 10px;
        }
    }

    @media screen and (min-width: 650px) {
        & > button > h2 {
            font-size: 15.4px;
        }
    }

    @media screen and (min-width: 900px) {
        & {
            & > button {
                border-radius: 10px 10px 0 0;
                transition: all 0.2s ease-in-out;

                & > svg {
                    display: none;
                }
            }
    
            & > div {
                max-height: 1000px;
                transition: all 0.35s ease-in;
            }
        }
    }
`;

// A dummy container necessary for the overflow trick to work
export const HelpDiv = styled.div`
    @media screen and (min-width: 900px) {
        margin-left: 30px;
        flex: 0 0 400px;
        order: 2;
    }
`;

export const DiscussionPanel = styled.form`
    display: block;
    max-width: 850px;

    @media screen and (min-width: 900px) {
        min-width: 0;
        order: 1;
    }
`;

const DisscussionCategoryElement = ({ id, className, children, passedValue, handleChange}) => {
    return (
        <div className={className}>
            <select id={id} value={passedValue} onChange={e => handleChange(e.target.value)}>
                { children }
            </select>
            <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
            </svg>
        </div>
    )
}

export const DiscussionCategory = styled(DisscussionCategoryElement)`
    position: relative;
    display: block;
    width: 100%;
    height: 45px;
    margin: 60px 0 20px;

    & > select {
        display: block;
        width: 100%;
        height: 100%;
        padding: 10px 15px;
        border-radius: 10px;
        border: 2px solid transparent;
        appearance: none;
        background-color: #167D47;
        background-color: var(--bg-primary);
        font-size: 14px;
        font-weight: 400;
        color: #FFF;
        color: var(--text-white);
        box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
        box-shadow: var(--google-shadow);

        &:focus {
            border-radius: 10px 10px 0 0;
            border: 2px solid rgba(0, 0, 0, 0.87);
            border: 2px solid var(--text-primary);
        }

        & > option {
            background-color: #3ba55c; 
            background-color: var(--text-tertiary);
        }
    }

    & > svg {
        position: absolute;
        width: 17px;
        right: 17px;
        top: 50%;
        margin-top: -8.5px;
        color: #FFF;
        color: var(--text-white);
        transition: transform 0.2s ease-in-out;
    }

    & > select:focus + svg {
        transform: rotate(180deg);
    }

    @media screen and (min-width: 650px) {
        height: 49px;

        & > select {
            font-size: 15.4px;
        }
    }

    @media screen and (min-width: 900px) {
        margin-top: 0;
    }
`;

export const DiscussionContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
    padding-top: 0;
    border-radius: 10px;
    background-color: #167D47;
    background-color: var(--bg-primary);
    box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
    box-shadow: var(--google-shadow);
    color: #FFF;
    color: var(--text-white);

    & > h3 {
        font-size: 15px;
        font-weight: 600;
        margin-top: 20px;
    }

    & > h4 {
        font-size: 12px;
        font-weight: 400;
        margin-bottom: 4px;
    }

    @media screen and (min-width: 650px) {
        & > h3 {
            font-size: 16.5px;
            margin-top: 22px;
        }

        & > h4 {
            font-size: 13.2px;
        }
    }
`;

export const Input = styled.input`
    display: block;
    width: 100%;
    height: 35px;
    padding: 8px 9px;
    border-radius: 4px;
    border: 1px solid rgba(112, 112, 112, 0.5);
    border: 1px solid var(--nav-border);
    background-color: #FAFAFA;
    background-color: var(--bg-white);
    color: rgba(0, 0, 0, 0.87);
    color: var(--text-black);
    font-size: 13px;
    font-weight: 600;

    @media screen and (min-width: 650px) {
        font-size: 14.3px;
        height: 38px;
    }
`;

export const SubmitDiscussion = styled.input`
    width: 100%;
    height: 50px;
    margin: 30px 0;
    padding: 10px;
    border-radius: 4px;
    background-color: #3ba55c;
    background-color: var(--text-tertiary);
    font-size: 15px;
    color: #FFF;
    color: var(--text-white);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    box-shadow: var(--hard-bottom-shadow);

    &:hover {
        cursor: pointer;
        box-shadow: inset -1px 3px 8px 5px #167D47, rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        box-shadow: var(--inset-shadow-primary), var(--hard-bottom-shadow);
    }

    @media screen and (min-width: 600px) {
        width: 230px;
    }
`;