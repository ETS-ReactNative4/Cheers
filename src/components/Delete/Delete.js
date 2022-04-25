import React, { Fragment, useEffect, useState } from "react";
import styled from 'styled-components';
import Popover from '@mui/material/Popover';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography, makeStyles, Button } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles({
    button: {
        marginRight: "0.2rem"
    }
});

const Delete = ({ deleteEndpoint }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const handleDelete = () => {
        deletePost(deleteEndpoint);
        window.location.href = window.location.href;    // refresh page
    }

    return (
        <Fragment>
            <Button
                className={classes.button}
                variant="outlined"
                startIcon={<DeleteIcon />}
                size="small"
                onClick={handleClick}
            >
                Delete
            </Button>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                <DeleteContainer>
                    <Typography style={{ padding: "1rem" }}>
                        Are you sure you would like to delete this item?
                    </Typography>
                    <NavBtnLink
                        style={{ padding: "0.5rem" }}
                        onClick={handleDelete}
                    >
                        Permanently Delete
                    </NavBtnLink>
                </DeleteContainer>
            </Popover>

        </Fragment>
    );
}

export const DeleteContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 1.5rem;
    
`

export const NavBtnLink = styled.button`
  border-radius: 10px;
  background: #ff0000;
  padding: 10px 22px;
  margin-left: 0.8rem;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.4s ease 0s;
  text-decoration: none;
  font-size: 15px;


  &:hover {
    transition: all 0.4s ease 0s;
    background: #880808;
    color: #fff;
  }
`;

async function deletePost(endpoint) {
    const res = await axios({
        method: "delete",
        url: endpoint,
        headers: { "Content-Type": "application/json" },
    });
    return res.data;
}

export default Delete;
