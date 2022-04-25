import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { FaBars } from 'react-icons/fa';
import { Nav, NavLink, NavMenu, NavBtn, NavBtnLink, NavLogo, MobileIcon, NavIcon } from './NavbarElements'
import SettingsIcon from '@mui/icons-material/Settings';
import { Button } from "@material-ui/core";


function Navbar({ toggle }) {
    const [user, setUser] = useState({});
    useEffect(() => {
        async function fetchData() {
            // Get data
            const res = await getUserFromDatabase();
            setUser(res[0]);
        }
        if (localStorage.token) {
            fetchData();
        }
    }, []);

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


                    {!localStorage.token && (
                        <NavLink to="/signup" activeStlye>
                            Sign Up
                        </NavLink>
                    )}
                    {user.is_admin === 1 && (
                        <NavLink to="/reports" activeStlye>
                            Reports
                        </NavLink>
                    )}
                </NavMenu>
                {!localStorage.token && (
                    <NavBtn>
                        <NavBtnLink to="/login">Log In</NavBtnLink>
                    </NavBtn>
                )}
                {localStorage.token && (
                    <NavBtn>
                        <div style={{ color: "white" }}>{user ? `${user.user_name} logged in` : ""}</div>
                        <NavBtnLink to="/" onClick={() => logout()}>
                            Log Out
                        </NavBtnLink>
                        <Link
                            to={"/editUserView"}
                            style={{ textDecoration: "none", color: "white", padding: "1rem" }}
                        >
                            <Button
                                variant="outlined"
                                startIcon={<SettingsIcon />}

                                size="small"
                                style={{ backgroundColor: "#F0F0F0" }}
                            >
                                Settings
                            </Button>
                        </Link>
                    </NavBtn>
                )}

                {/* Settings button to change user password */}

            </Nav>
        </>
    );
};

async function getUserFromDatabase() {
    const res = await axios({
        method: "get",
        url: "/api/auth",
        headers: { "Content-Type": "application/json" },
    });
    return res.data;
}

const logout = () => {
    localStorage.removeItem("token");
    window.location.href = window.location.href;
}

export default Navbar;
