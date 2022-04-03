import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CarouselComponent = ({ color, className, children }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [childrenMatrix, setChildrenMatrix] = useState([])
    
    const maxActiveIndex = Math.ceil(React.Children.count(children) / 2) - 1;

    useEffect(() => {
        const _array = React.Children.toArray(children);
        const _matrix = _array.reduce(function (rows, key, index) { 
            return (index % 2 === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows;
        }, []);
        setChildrenMatrix(_matrix);
        setActiveIndex(0);
    },[children]);

    const checkStatus = (index) => {
        if (index === activeIndex) {
            return "active";
        }
        if (index + 1 === activeIndex || (index === maxActiveIndex && activeIndex === 0)) {
            return "pre-active";
        }
        if (index - 1 === activeIndex || (index === 0 && activeIndex === maxActiveIndex)) {
            return "post-active";
        }
        return "unactive";
    };

    const incrementIndex = () => {
        if (activeIndex === maxActiveIndex) {
            return setActiveIndex(0);
        }
        return setActiveIndex(activeIndex + 1);
    }

    const decrementIndex = () => {
        if (activeIndex === 0) {
            return setActiveIndex(maxActiveIndex);
        }
        return setActiveIndex(activeIndex - 1);
    }

    return (
        <div className={className} >
            <svg onClick={incrementIndex} aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
            </svg>
            { childrenMatrix && childrenMatrix.map((children_pair, index) => (
                <div key={index} className={checkStatus(index)}>
                    { children_pair && children_pair.map((child, child_index) => (
                        React.cloneElement(child, {style: {...child.props.style}})
                    ))}
                </div>
            ))}
            <svg onClick={decrementIndex} aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
            </svg>
        </div>
    )
};

const Carousel = styled(CarouselComponent)`
    display: flex;
    position: relative;
    width: 300px;
    height: 400px;
    margin: 10% auto;
    color: ${({ color }) => color};

    & > svg {
        position: absolute;
        height: 40px;
        top: 50%;
        margin-top: -20px;
        z-index: 50;
    }

    & > svg:first-child {
        transform: rotate(90deg);
    }

    & > svg:last-child {
        right: 0;
        transform: rotate(-90deg);
    }

    & > div {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;

        & > div {
            display: block;
            width: 270px;
            position: absolute;
            top: 25px;
            left: 50%;
            margin-left: -135px;
            text-align: center;
            opacity: 0;
            transition: opacity 0.2s ease-out;

            & > h2 {
                font-weight: 700;
                font-size: 22px;
                margin-bottom: 10px;
                color: rgba(0, 0, 0, 0.87);
                color: var(--text-primary);
            }

            & > h3 {
                font-weight: 500;
                font-size: 13px;
                color: rgba(0, 0, 0, 0.54);
                color: var(--text-primary-light);
            }
        }

        & > img {
            position: absolute;
            bottom: 15%;
            left: 50%;
            width: 50%;
            height: 30%;
            margin-left: -25%;
            padding: 20px;
            background: ${({ color }) => color};
            border-radius: 15%;
            box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
            box-shadow: var(--google-shadow);
            opacity: 0;
            z-index: 0;
            transition: transform 0.5s ease-out, opacity 0.2s ease-in;
        }
    }

    & > div.pre-active {
        & > img {
            opacity: 0.5;
            transform: translateX(-100px) scale(0.5);
            transition: all 0.5s ease-in;
        }
    }

    & > div.post-active {
        & > img {
            opacity: 0.5;
            transform: translateX(100px) scale(0.5);
            transition: all 0.5s ease-in;
        }
    }

    & > div.active {
        & > div {
            opacity: 1;
            transition: opacity 0.2s ease-in 0.2s;
        }

        & > img {
            opacity: 1;
            z-index: 1;
            transition: opacity 0.5s ease-out, transform 0.5s ease-out, z-index 0s 0.25s;
        }
    }

    @media screen and (min-width: 550px) {
        width: 500px;
        height: 500px;

        & > div {
            & > div {
                width: 500px;
                margin-left: -250px;
                top: 40px;

                & > h2 {
                    font-size: 25px;
                    margin-bottom: 20px;
                }

                & > h3 {
                    font-size: 16px;
                }
            }

            & > img {
                width: 250px;
                height: 200px;
                margin-left: -125px;
                bottom: 30px;
            }
        }
    }

    @media screen and (min-width: 850px) {
        width: 650px;
        height: 550px;
        margin: 5% auto;

        & > svg {
            height: 60px;
            margin-top: -30px;
        }

        & > div {
            & > div {
                top: 20px;
                width: 700px;
                margin-left: -350px;

                & > h2 {
                    font-size: 29px;
                }

                & > h3 {
                    font-size: 19px;
                }
            }

            & > img {
                width: 280px;
                height: 224px;
                margin-left: -140px;
            }
        }
    }

    @media screen and (min-width: 1080px) {
        display: none;
    }
`;

export default Carousel;