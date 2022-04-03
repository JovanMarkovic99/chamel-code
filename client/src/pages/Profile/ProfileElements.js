import styled from 'styled-components';

export const ProfileContainer = styled.div`
    display: flex;

    & > div:first-child {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    @media screen and (min-width: 1080px) {
        & > div:first-child > div > div {
            margin: 20px 0;
            width: 90%;
        }
    }
`;

export const ProfileSection = styled.div`
    display: none;

    @media screen and (min-width: 1080px) {
        position: relative;
        display: block;
        height: 320px;
        width: 330px;
        min-width: 330px;
        margin-top: 20px;
        margin-left: -20px;
        padding: 12px;
        border-radius: 10px;
        border: 1px solid #183A28;
        border: 1px solid var(--nav-border);
        background-color: #167D47;
        background-color: var(--bg-primary);

        &:before {
            content: "";
            display: block;
            position: absolute;
            width: 100%;
            height: 30%;
            top: 0;
            left: 0;
            border-radius: 10px 10px 0 0;
            background-color: var(--bg-nav);
        }

        & > h2 {
            color: #FFF;
            color: var(--text-white);
            font-size: 20px;
            font-weight: 500;
            margin: 5px 0 15px;

            & > span {
                color: #3ba55c;
                color: var(--text-tertiary);
            }
        }
        
        & > h3 {
            color: #FFF;
            color: var(--text-white);
            font-size: 22px;
            font-weight: 500;
            margin-top: 40px;
            margin-left: 10px;
        }
    }
`;

export const ProfileImage = styled.div`
    position: relative;
    width: 90px;
    height: 90px;
    margin-top: 20px;
    border-radius: 6px;
    background-color: #FAFAFA;
    background-color: var(--bg-white);
    border: 1px solid rgba(112,112,112,0.5);
    border: 1px solid var(--nav-border);

    & > img {
        height: 100%;
        width: 100%;
        border-radius: 6px;
        display: block;
    }

    & > label {
        position: absolute;
        width: 30px;
        height: 30px;
        bottom: 0;
        left: 75%;
        border-radius: 50%;
        background-color: #183A28;
        background-color: var(--bg-nav);
        color: rgba(255, 255, 255, 0.7);
        color: var(--text-white-light);

        & > svg {
            height: 100%;
            width: 100%;
            padding: 6px;
            transition: color 0.2s ease-in-out;
        }

        & > input {
            display: none;
        }

        &:hover {
            cursor: pointer;
            color: var(--bg-white);
        }
    }
`;