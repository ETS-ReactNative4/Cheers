import { NavLink as Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import styled from "styled-components";
import { BiDrink } from "react-icons/bi";

export const Nav = styled.nav`
  background: #3a3a3a;
  height: 70px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((80vw - 1000px) / 2);
  z-index: 10;
  box-shadow: 0px 5px 5px grey;
`;

export const NavLogo = styled(Link)`
  color: #fff;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-left: 24px;
  font-weight: bold;
  text-decoration: none;
`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  cursor: pointer;
  height: 1.6rem;

  :active {
    background-color: rgba(98, 98, 98, 0.5);
    border: 1px;
    border-radius: 10px;
  }
`;

export const MobileIcon = styled(FaBars)`
  display: none;
  color: #fff;

  @media screen and (max-width: 905px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: 36px;

  @media screen and (max-width: 905px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  margin-right: 24px;

  @media screen and (max-width: 905px) {
    display: none;
  }
`;

export const NavBtnForAboutPage = styled.nav`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  margin-left: -0.8rem;

  @media screen and (max-width: 770px) {
    justify-content: center;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 10px;
  background: #ff6f61;
  padding: 10px 22px;
  margin-left: 0.8rem;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.4s ease 0s;
  text-decoration: none;

  &:hover {
    transition: all 0.4s ease 0s;
    background: #ff8a80;
    color: #010606;
  }
`;

export const NavBtnLink2 = styled(Link)`
  border: 2rem;
  border-radius: 10px;
  background: #f2f2f2;
  padding: 10px 16px;
  margin-left: 0.8rem;
  color: #000;
  outline: none;
  cursor: pointer;
  transition: all 0.4s ease 0s;
  text-decoration: none;

  &:hover {
    transition: all 0.4s ease 0s;
    background: #808080;
    color: #fff;
  }
`;

export const NavIcon = styled(BiDrink)`
  margin-right: 0.5rem;
`;
