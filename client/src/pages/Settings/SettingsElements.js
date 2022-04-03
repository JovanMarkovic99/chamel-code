import styled from 'styled-components';

export const SettingsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    max-width: 1250px;
    margin: auto;
    background-color: #167D47;
    background-color: var(--bg-primary);

    & > h1 {
        font-size: 20px;
        font-weight: 700;
        padding: 20px;
        color: #FFF;
        color: var(--text-white);
        border-bottom: 1px solid  rgba(255, 255, 255, 0.7);
        border-bottom: 1px solid var(--text-white-light);
    }
`;

export const SettingsContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    max-width: 750px;
    padding: 20px;
`;

export const SettingsForm = styled.form`
    margin-top: 35px;

    & > h2 {
        font-size: 12px;
        font-weight: 600;
        color:  rgba(255, 255, 255, 0.7);
        color: var(--text-white-light);
        text-transform: uppercase;
        margin-bottom: 30px;
        padding-bottom: 6px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.7);
        border-bottom: 1px solid var(--text-white-light);
    }

    & > input {
        width: 100%;
        height: 35px;
        padding: 5px;
        margin: 10px 0 16px;
        border-radius: 4px;
        border: 1px solid rgba(0, 0, 0, 0.87);
        border: 1px solid var(--nav-border);
        background-color: #FAFAFA;
        background-color: var(--bg-white);
        color: rgba(0, 0, 0, 0.87);
        color: var(--text-black);
        font-weight: 500;
    }

    & > input[type="submit"] {
        height: 40px;
        padding: 10px;
        font-size: 15px;
        font-weight: 400;
        color: #FFF;
        color: var(--text-white);
        border: none;
        background-color: #3ba55c;
        background-color: var(--text-tertiary);
        box-shadow: rgb(50 50 93 / 25%) 0px 2px 5px -1px, rgb(0 0 0 / 30%) 0px 1px 3px -1px;
        box-shadow: var(--hard-bottom-shadow);

        &:hover {
            box-shadow: inset -1px 3px 8px 5px #167d47, rgb(50 50 93 / 25%) 0px 2px 5px -1px, rgb(0 0 0 / 30%) 0px 1px 3px -1px;
            box-shadow: var(--inset-shadow-primary), var(--hard-bottom-shadow);
        }

        @media screen and (min-width: 400px) {
            width: 230px;
        }
    }

    & > label {
        display: flex;
        align-items: center;
        width: 120px;
        height: 120px;
        margin: 10px 0 16px;
        padding: 5px;
        border-radius: 10px;
        border: 1px dashed #FFF;
        border: 1px dashed var(--text-white);
        background-color: var(--faded-gray);

        & > input {
            display: none;
        }

        & > svg {
            width: 40%;
            margin: auto;
            padding: 10px;
            border-radius: 50%;
            background-color: #183A28;
            background-color: var(--bg-nav);
            color: rgba(255, 255, 255, 0.7);
            color: var(--text-white-light);
            transition: color 0.2s ease-in-out;
        }

        &:hover {
            cursor: pointer;

            & > svg {
                color: #FFF;
                color: var(--text-white);
            }
        }
    }
`;

export const Descriptor = styled.div`
    margin-top: 5px;

    & > h2 {
        font-size: 17px;
        font-weight: 500;
        color: #FFF;
        color: var(--text-white);
        margin-bottom: 4px;
    }

    & > h3 {
        font-size: 13px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.7);
        color: var(--text-white-light);
        padding-bottom: 6px;
    }
`;