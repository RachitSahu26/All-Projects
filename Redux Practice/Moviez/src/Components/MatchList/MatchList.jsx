import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MatchList.scss'; // Import the SCSS file

const MatchList = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get('https://api.cricapi.com/v1/currentMatches?apikey=84ad49f7-6383-442c-932a-16d24669d01a&offset=0');
        setMatches(response.data.data);
        console.log(response.data); // Log the fetched data
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();
  }, []);

  // Add a conditional check to prevent mapping over undefined matches
  return (
    <div className="match-list-container">
      <h1>Current Matches</h1>
      <ul className="matches-list">
        {matches && matches.map((match, index) => (
          <li key={index} className="match-item">
            <p className="match-id">Match ID: {match.id}</p>
            <p className="match-name">Name: {match.name}</p>
            <p className="match-type">Match Type: {match.matchType}</p>
            <p className="match-status">Status: {match.status}</p>
            <p className="match-venue">Venue: {match.venue}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchList;
