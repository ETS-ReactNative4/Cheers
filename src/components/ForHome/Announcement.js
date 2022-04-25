import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
//import Delete from '../Delete/Delete';
import axios from "axios";


const useStyles = makeStyles({
  buttonContainer: {
    marginTop: "0.2rem",
    paddingBottom: "0.3rem"
  },
  button: {
    marginRight: "0.2rem"
  }

});


const Announcement = ({ name, topic, message, date, id }) => {
  const classes = useStyles();
  const [isAdmin, setIsAdmin] = useState(0);

  useEffect(() => {
    async function fetchUser() {
      const currUser = await getUserFromDatabase();
      setIsAdmin(currUser[0].is_admin);
    }
    fetchUser();

  }, [])

  return (
    <CardStyled>
      <div className="content">
        {(localStorage.token && isAdmin === 1) && (
          <div className={classes.buttonContainer}>
            <Link
              to={`/announcementCreateView`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                size="small"
              >
                New Announcement
              </Button>
            </Link>
          </div>
        )}

        <h2>Announcement</h2>
        <h3>Topic: {topic}</h3>
        <h4>Date: {date}</h4>
        <p>
          <strong>Message from {name}:</strong> {message}
        </p>

      </div>

    </CardStyled>
  );
}

async function getUserFromDatabase() {
  const res = await axios({
    method: "get",
    url: "api/auth",
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
}

const CardStyled = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    z-index: 1;
    position: relative;
    backdrop-filter: blur(10px);
    border: 3px solid rgb(255, 111, 97, 0.8);
    background-clip: border-box;
    margin: 1.2rem 1.2rem;
    width: 80%;
    @media screen and (max-width: 770px) {
        grid-template-columns: 280px;
        grid-gap: 1rem;
    }
    

    .content {
        /* this will make its children flex-items */
        display: inline-flex;
        /* align-items items in column */
        flex-direction: column;
        /* center items vertically */
        justify-content: center;
        align-items: center;
        justify-items: center;

        width: 80%;

        @media screen and (max-width: 770px) {
            margin-bottom: 1.3rem;
            h2, h3 {
                text-align: center;
            }
        }
    }

    h2 {
        line-height: 1;           
        letter-spacing: 1.15;
        margin-top: 0.2rem;
    }

    h3 {
        line-height: 1.5;           
        letter-spacing: 1.15;
        font-size: 20px;
    }
    
    p {
        letter-spacing: 1;
        padding-top: 5px;
    }
    

`


export default Announcement;
