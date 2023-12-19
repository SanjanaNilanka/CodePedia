import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import AceEditor from 'react-ace';
import { Button } from '@nextui-org/react';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/theme-monokai';
import './Challenges.css'

const AttemptChallenge = ({ isDark }) => {
    const { challengeId, title, description, timerDurationInMinutes } = useParams();
    const [initialCode, setInitialCode] = useState('');
    const [timeRemaining, setTimeRemaining] = useState(timerDurationInMinutes * 60);
    const [timerExpired, setTimerExpired] = useState(false);

    useEffect(() => {
        // Start the timer countdown
        const timerInterval = setInterval(() => {
            if (timeRemaining > 0) {
                setTimeRemaining(timeRemaining - 1);
            } else {
                clearInterval(timerInterval); // Stop the timer when time is up
                setTimerExpired(true);
            }
        }, 1000);

        // Clean up the interval when the component unmounts
        return () => {
            clearInterval(timerInterval);
        };
    }, [timeRemaining]);

    // Format the remaining time as minutes and seconds
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    return (
        <div style={{ padding: '0 40px' }}>
            <div>
                <h1 style={{ textAlign: 'center', fontWeight: '900', fontSize: '70px', marginTop: '50px' }}>Begin Your Challenge!</h1>
            </div>

            <div className={`card ${isDark ? 'card-dark' : 'card-light'}`} style={{
                width: '100%',
                alignItems: 'center',
                padding: '16px',
                borderRadius: '8px',
            }}>
                <h3 style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    marginBottom: '10px',
                    textAlign: 'center'
                }}>{title}</h3>

                <p style={{
                    fontSize: '16px',
                    textAlign: 'center'
                }}>{description}</p>
            </div><br />

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                height: '80vh',
            }}>
                <div style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: isDark ? '#1f1f1f' : '#f0f2f5',
                    display: 'inline-block'
                }}>
                    <AceEditor
                        mode="java"
                        theme={`${isDark ? 'monokai' : 'xcode'}`}
                        name="code-editor"
                        editorProps={{ $blockScrolling: true }}
                        value={initialCode}
                        onChange={newValue => {
                            console.log('Code changed:', newValue);
                            if (!timerExpired) {
                                // Only allow code changes if the timer hasn't expired
                                setInitialCode(newValue);
                            }
                        }}
                        fontSize={15}
                        style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
                        readOnly={timerExpired}
                    />
                </div>
            </div>

            {timerExpired ? (
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999, background: 'rgba(255,255,255,0.9)', padding: '20px', borderRadius: '8px', color: isDark ? '#000000' : '#000000' }}>
                    <h2 style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        marginBottom: '10px',
                        textAlign: 'center'
                    }}>Time is Over</h2>
                    <p style={{
                        fontSize: '16px',
                        textAlign: 'justify'
                    }}>Your time for this challenge has expired.</p><br />
                    <center>
                        <Link to={`/challenges/leaderboard/${title}`}>
                            <Button style={{ zIndex: '0', backgroundColor: '#007BFF', color: isDark ? '#ffffff' : '#ffffff' }}>OK</Button>
                        </Link>
                    </center>
                </div>
            ) : (
                <div style={{
                    width: '30%',
                    backgroundColor: isDark ? '#1f1f1f' : '#f0f2f5',
                    padding: '20px',
                    textAlign: 'center',
                    position: 'absolute',
                    bottom: '3px',
                    right: '45px',
                }}>
                    <h4>Challenge Timer</h4>
                    <p style={{ fontSize: '16px', textAlign: 'center' }}>Time Remaining: {minutes} minutes {seconds} seconds</p><br />
                    <center>
                    <Link to={`/challenges/leaderboard/${title}`}>
                        <Button style={{ backgroundColor: '#007BFF', color: isDark ? '#ffffff' : '#ffffff' }}>Finish Attempt</Button>
                    </Link>
                    </center>
                </div>
            )}
        </div>
    )
}

export default AttemptChallenge;
