import React from 'react';
import { FaBars } from 'react-icons/fa';
import { Nav, NavLink, NavMenu, NavBtn, NavBtnLink, NavLogo, MobileIcon, NavIcon } from './NavbarElements'

function Navbar({ toggle }) {
    return (
        <>
            <Nav>
                <NavLogo to="/">
                    <NavIcon />
                    Cheers!
                </NavLogo>
                <MobileIcon onClick={toggle}>
                    <FaBars />
                </MobileIcon>
                <NavMenu>
                    <NavLink to="/" activeStlye>
                        Home
                    </NavLink>
                    <NavLink to="/signup" activeStlye>
                        Sign Up
                    </NavLink>
                    <NavLink to="/reports" activeStlye>
                        Reports
                    </NavLink>
                </NavMenu>
                {!localStorage.token && (
                    <NavBtn>
                        <NavBtnLink to="/login">Log In</NavBtnLink>
                    </NavBtn>
                )}
                {localStorage.token && (
                    <NavBtn>
                        <div style={{ color: "white" }}>Admin logged in</div>
                        <NavBtnLink to="/" onClick={() => logout()}>
                            Log Out
                        </NavBtnLink>
                    </NavBtn>
                )}
            </Nav>
        </>
    );
};

const logout = () => {
    localStorage.removeItem("token");
    window.location.href = window.location.href;
}

export default Navbar;
