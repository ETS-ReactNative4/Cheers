import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: 'Source Sans Pro', sans-serif;
        position: relative;
    }

`;

export const Container = styled.div`
    z-index: 1;
    width: 100%auto;
    max-width: 1300px;
    margin-right: auto;
    margin-left: auto;
    padding-right: 50px;
    padding-left: 50px;

    @media screen and (max-width: 991px) {
        padding-right: 30px;
        padding-left: 30px;
    }
`;

export const Button = styled.button`
    border-radius: 8px;
    background: ${({ primary }) => (primary ? '#2E8B57' : '#fff')};
    white-space: nowrap;
    padding: ${({ big }) => (big ? '12px 48px' : '10px 20px')};
    color: #fff;
    font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
    outline: none;
    border: none;
    cursor: pointer;
    box-shadow: 1px 1px 3px #010101;


    &:hover {
        transition: all 0.4s ease 0s;
        background: ${({ primary }) => (primary ? '#21540F' : '#808080')};
        color: ${({ primary }) => (primary ? '#010606' : '#fff')};
    }

    @media screen and (max-width: 960px) {
        width: 100%;
    }
`;

export default GlobalStyle;