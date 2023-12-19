import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import axios from 'axios';
import './Challenges.css'

const ChallengeDetails = ({ isDark }) => {

  const { challengeId } = useParams();
  const [challengeDetails, setChallengeDetails] = useState({criteria: []});

  useEffect(() => {

    async function fetchChallengeDetails() {
      try {
        const response = await axios.get(`http://localhost:5000/adminApp/challengesRoutes/getById/${challengeId}`);
        const data = response.data;
        setChallengeDetails(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchChallengeDetails();
  }, [challengeId]);

  // Styles for the card
  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
      borderRadius: '5px',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '10px',
      textAlign: 'center'
    },
    subTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    description: {
      fontSize: '16px',
      textAlign: 'center'
    },
  };

  return (

    <>

      <div>
        <h1 style={{ textAlign: 'center', fontWeight: '900', fontSize: '70px', marginTop: '50px' }}>What You Have To Do?</h1>
      </div>

      <div className={`card ${isDark ? 'card-dark' : 'card-light'}`} style={styles.container}>

        <h2 style={styles.title}>{challengeDetails.title}</h2>

        <p style={styles.description}>{challengeDetails.description}</p><br />

        <hr style={{ backgroundColor: isDark ? '#000000' : '#ffffff' }} /><br />

        <h3 style={styles.subTitle}>Evaluation Criteria</h3>

        <ul style={{ fontSize: '16px', textAlign: 'justify', listStyleType: 'number', paddingLeft: '20px' }}>

          {challengeDetails.criteria.map((criterion, index) => (
            <li key={index} style={{ fontSize: '16px', marginBottom: '5px', textAlign: 'justify' }}>{criterion}</li>
          ))}

        </ul>

        <h3 style={styles.subTitle}>What is the time duration?</h3>

        <p style={styles.description}>{challengeDetails.timerDurationInMinutes} mins</p><br />

        <hr style={{ backgroundColor: isDark ? '#000000' : '#ffffff' }} /><br />

        <center>
          <Link to={`/challenges/attemptChallenge/${challengeDetails._id}/${challengeDetails.title}/${challengeDetails.description}/${challengeDetails.timerDurationInMinutes}`}>
            <Button style={{ zIndex: '0', backgroundColor: '#007BFF', color: isDark ? '#ffffff' : '#ffffff' }}>Attempt Now</Button>
          </Link>
        </center>

      </div>

    </>

  );
}

export default ChallengeDetails;
