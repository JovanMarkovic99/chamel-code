import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: #FAFAFA;
    background-color: var(--bg-secondary);
    overflow: hidden;

    &:before {
        content: "";
        position: absolute;
        height: 1500px;
        width: 1500px;
        bottom: 72%;
        left: 50%;
        border-radius: 50%;
        background-image: linear-gradient(-45deg, #167D47 0%, #183A28 100%);
        background-image: linear-gradient(-45deg, var(--bg-primary) 0%, var(--bg-nav) 100%);
        transform: translateX(-50%);
        transition: 1.5s ease-in-out;
        z-index: 6;
    }

    @media screen and (min-width: 570px) {
        &:before {
            bottom: 68%;
            left: 30%;
        }
    }

    @media screen and (min-width: 870px) {
        min-height: 100vh;
        height: 100%;

        &: before {
            width: max(2000px, 200vh);
            height: max(2000px, 200vh);
            top: -10%;
            right: 48%;
            bottom: auto;
            bottom: initial;
            left: auto;
            left: initial;
            transform: translateY(-50%);
            transition: 1.6s ease-in-out;
        }
    }
`;

export const FormContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`; 

export const SignInUp = styled.div`
    position: absolute;
    display: flex;
    width: 100%;
    max-height: 65%;
    left: 50%;
    top: 95%;
    transform: translate(-50%, -100%);
    transition: 0.8s 0.2s ease-in-out;
    z-index: 5;

    @media screen and (min-width: 870px) {
        width: 50%;
        max-height: 100%;
        left: 75%;
        top: 50%;
        transform: translate(-50%, -50%);
        transition: 0.8s 0.2 ease-in-out;
    }
`; 

export const FormSignIn = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    overflow: hidden;
    transition: all 0.2s 0.7s;
    z-index: 2;

    @media screen and (min-width: 570px) {
        padding: 0 1.5rem;
    }
`; 

export const Title = styled.h2`
    font-size: 2.2rem;
    color: rgba(0, 0, 0, 0.87);
    color: var(--text-primary);
    margin-bottom: 10px;
`; 

export const InputField = styled.div`
    display: flex;
    width: 100%;
    max-width: 380px;
    height: 55px;
    margin: 10px 0;
    padding: 0 0.4rem;
    border-radius: 55px;
    background: #FAFAFA;
    background: var(--bg-surface);
    border: 1px solid transparent;
    box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
    box-shadow: var(--google-shadow);
`; 

export const Input = styled.input`
    width: 100%;
    background: none;
    line-height: 1;
    font-weight: 600;
    font-size: 1.1rem;
    color: rgba(0, 0, 0, 0.87);
    color: var(--text-primary);
`; 

export const InputSubmit = styled.input`
    width: 150px;
    height: 49px;
    margin: 10px 0;
    border-radius: 49px;
    text-transform: uppercase;
    font-weight: 600;
    background-color: #167D47;
    background-color: var(--bg-primary);
    box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
    box-shadow: var(--google-shadow);
    color: #FFF;
    color: var(--text-white);
    transition: all 0.5s;
    
    &:hover {
        cursor: pointer;
    }
`; 

export const FormSignUp = styled.form`
    display: flex;
    flex: 0;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    opacity: 0;
    transition: all 0.2s 0.7s;
    z-index: 1;

    @media screen and (min-width: 870px) {
        justify-content: center;
    }
`; 

export const PanelContainer = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media screen and (min-width: 870px) {
        flex-direction: row;
    }
`; 

export const Panel = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    padding: 2.5rem 8%;
    width: 100%;
    height: 33%;
    pointer-events: ${props => props.left ? "all" : "none"};
    z-index: 6;
    
    @media screen and (min-width: 870px) {
        flex-direction: column;
        padding: ${props => props.left ? "3rem 17% 2rem 12%" : "3rem 12% 2rem 17%"};
        width: 50%;
        height: 100%;
    }
`;

export const PanelContent = styled.div`
    color: #FFF;
    color: var(--text-white);
    padding: 0.5rem 1rem;
    transition: transform 0.9s ease 0.6s, opacity 0.4s ease-in 1s;

    @media screen and (min-width: 570px) {
        padding-right: 15%;
    }

    @media screen and (min-width: 870px) {
        padding: 0;
        transition: transform 0.9s ease-in-out 0.4s, 
            opacity 0.4s ease-in 1s;
    }
`;

export const PanelHeading = styled.h3`
    font-weight: 700;
    line-height: 1;
    font-size: 1.2rem;

    @media screen and (min-width: 870px) {
        font-size: 1.5rem;
    }
`;

export const PanelParagraph = styled.p`
    font-weight: 400;
    font-size: 0.7rem;
    padding: 0.5rem 0;

    @media screen and (min-width: 870px) {
        font-size: 0.95rem;
        padding: 0.7rem 0;
    }
`;

export const ButtonTransparent = styled.button`
    width: 110px;
    height: 35px;
    background: none;
    border-radius: 49px;
    border: 2px solid #FFF;
    border: 2px solid var(--text-white);
    color: #FFF;
    color: var(--text-white);
    text-transform: uppercase;
    font-size: 0.7rem;
    font-weight: 600;
    cursor: pointer;
    transition: 0.5s;

    @media screen and (min-width: 870px) {
        width: 130px;
        height: 41px;
        font-size: 0.8rem;
    }
`;