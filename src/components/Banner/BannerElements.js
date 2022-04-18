import styled from 'styled-components'
import backgroundImg from '../../images/drinks.jpg'

export const InfoSec = styled.div`
    color: #fff;
    padding-top: 4rem;
    padding-bottom: 1rem;
    background-image: url(${backgroundImg});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    box-shadow: 0px 3px 5px grey;
`;

export const InfoRow = styled.div`
    display: flex;
    margin: 0 -15px -15px -15px;
    flex-wrap:wrap;
    align-items: center;
    flex-direction: ${({ imgStart }) => (imgStart ? 'row-reverse' : 'row')};
`;

export const InfoColumn = styled.div`
    margin-bottom: 15px;
    padding-right: 15px;
    padding-left: 15px;
    display: flex;
    justify-content: center;
    max-width: 100%;
    flex-basis: 100%;

    @media screen and (max-width: 768px) {
        max-width: 100%;
        flex-basis: 100%;
        display: flex;
        justify-content: center;
    }

`;

export const TextWrapper = styled.div`
    max-width: 800px;
    padding-top: 0;
    padding-bottom: 60px;
    
    @media screen and (max-width: 768px) {
        padding-bottom: 65px;
    }

`

export const TopLine = styled.div`
    color: ${({ lightTopLine }) => (lightTopLine ? '#fff' : '#4B59F7')};
    font-size: 35px;
    line-height: 16px;
    letter-spacing: 1.4px;
    margin-bottom: 30px;
    text-shadow: 2px 2px 5px grey;
    text-align: center;

`;

export const Heading = styled.h1`
    margin-bottom: 24px;
    font-size: 40px;
    line-height: 1.1;
    text-shadow: 2px 2px 5px grey;
    color: ${({ lightText }) => (lightText ? '#fafafa' : '#1c2237')};
    text-align: center;


`;

export const Subtitle = styled.p`
    margin-bottom: 35px;
    font-size: 20px;
    line-height: 24px;
    text-shadow: 2px 2px 5px grey;
    color: ${({ lightTextDesc }) => (lightTextDesc ? '#fafafa' : '#1c2237')};
    text-align: center;


`;



export const Img = styled.img`
    padding-right: 0;
    border: 0;
    max-width: 100%;
    vertical-align: middle;
    display: inline-block;
    max-height: 500px;
    border-radius: 48px;
    box-shadow: 2px 2px 8px #000;

`