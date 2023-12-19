import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import './Challenges.css';

const Leaderboard = ({ isDark }) => {

    const { title } = useParams();
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {

        async function fetchLeaderboardData() {
            try {
                const response = await axios.get("");
                const data = response.data;
                setLeaderboardData(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchLeaderboardData();
    }, []);

    const sortedLeaderboard = [...leaderboardData].sort((a, b) => {
        if (a.elapsedTime < b.elapsedTime) return -1;
        if (a.elapsedTime > b.elapsedTime) return 1;
        if (a.marks > b.marks) return -1;
        if (a.marks < b.marks) return 1;
        return 0;
    });

    const sampleData = [
        { name: "User 1", elapsedTime: 120, marks: 95 },
        { name: "User 2", elapsedTime: 150, marks: 90 },
        { name: "User 3", elapsedTime: 180, marks: 85 },
        { name: "User 2", elapsedTime: 170, marks: 90 },
    ];

    const combinedData = [...sortedLeaderboard, ...sampleData];

    return (
        <div>
            <div>
                <h1 style={{ textAlign: 'center', fontWeight: '900', fontSize: '70px', marginTop: '50px' }}>Leaderboard</h1>
            </div>

            <div className={`card ${isDark ? 'card-dark' : 'card-light'}`} style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', borderRadius: '5px', alignItems: 'center' }} >
                <div>
                    <h4 style={{ textAlign: 'center', fontWeight: '600', fontSize: '40px', marginTop: '5px' }}>{title}</h4>
                </div>
                <table className={`leaderboard-results ${isDark ? 'leaderboard-results-dark' : 'leaderboard-results-light'}`} style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th >Place</th>
                            <th >Name</th>
                            <th >Elapsed Time</th>
                            <th >Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {combinedData.map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.elapsedTime} seconds</td>
                                <td>{user.marks}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
        </div>

    )
}

export default Leaderboard;
