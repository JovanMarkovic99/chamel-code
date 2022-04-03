import styled from 'styled-components';

export const SlideButton = styled.div`
    position: relative;
    display: block;
    width: 40px;
    height: 22px;
    border-radius: 100px;
    ${({ activated }) => (activated ? 
        "background-color: #3ba55c; background-color: var(--text-tertiary);" : 
        "background-color: rgba(112, 112, 112, 0.5); background-color: var(--nav-border);")}
    cursor: pointer;
    transition: background 0.2s ease;

    &:after {
        content: '';
        display: block;
        position: absolute;
        width: 20px;
        height: 20px;
        top: 1px;
        left: ${({ activated }) => (activated ? "19px" : "1px")};
        border-radius: 50%;
        background-color: #FAFAFA;
        background-color: var(--bg-secondary);
        transition: left 0.2s ease-in-out;
    }
`;

export default SlideButton;