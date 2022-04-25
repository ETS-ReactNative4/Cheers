import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Typography, makeStyles, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";
//import Delete from '../Delete/Delete';

const useStyles = makeStyles({
  buttonContainer: {
    marginTop: "0.2rem",
    paddingBottom: "0.3rem"
  },
  button: {
    marginRight: "0.2rem"
  }

});


const Announcement = ({ name, topic, date, id }) => {
  const classes = useStyles();

  const [message, setMessage] = useState([]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    async function fetchUser() {
      const resUser = await getUserFromDatabase();
      setUser(resUser[0]);
    }
    if (localStorage.token) {
      fetchUser();
    }

    async function fetchData() {
      // Get all messages in DB in order from latest to oldest
      const resMessages = await getMessagesFromDatabase(); 
      setMessage(resMessages[0]); // Only display latest announcement
    }
    fetchData();
  }, []);

  async function getMessagesFromDatabase() {
    const res = await axios({
      method: "get",
      url: "/api/messages",
      headers: { "Content-Type": "application/json" },
    });
    let posts = res.data
    return posts;
  }

  async function getUserFromDatabase() {
    const res = await axios({
      method: "get",
      url: "/api/auth",
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  }

  return (
    <CardStyled>
      <div className="content">
        {(localStorage.token && user.is_admin === 1) && (
          <div className={classes.buttonContainer}>
            {/* <Delete deleteEndpoint={`/api/about/${id}`} /> */}
            <Link
              to={`/announcementCreateView`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                size="small"
                onClick={() => {
                  console.log("edit");
                }}
              >
                New Announcement
              </Button>
            </Link>
          </div>
        )}

        <h2>Announcement</h2>
        <h3>{message.title}</h3>
        <h4>{new Date(message.time_posted).toDateString()}</h4>
        <p>
          <strong>Message from {message.user_name}:</strong> {message.content}
        </p>

      </div>

    </CardStyled>
  );
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
