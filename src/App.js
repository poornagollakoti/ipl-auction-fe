import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa'; // Import icons from Font Awesome

function App() {
  const [player, setPlayer] = useState('');
  const [team, setTeam] = useState('');
  const [type, setType] = useState('');
  const [nationality, setNationality] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [limit, setLimit] = useState('');
  const [auctionData, setAuctionData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const params = {};
      if (player) {
        params.player = player
      }
      if (team) {
        params.team = team
      }
      if (type) {
        params.type = type
      }
      if (nationality) {
        params.nationality = nationality
      }
      if (minPrice) {
        params.min_price = minPrice
      }
      if (maxPrice) {
        params.max_price = maxPrice
      }
      if (sortField) {
        params.sort_by = sortField
      }
      if (sortOrder) {
        params.sort_order = sortOrder
      }
      if (limit) {
        params.limit = limit
      }
      const response = await axios.get('http://localhost:8000/auction-data', {
        params
      });
      setAuctionData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [player, team, type, nationality, minPrice, maxPrice, sortField, sortOrder, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const renderSortIcon = (field) => {
    if (sortField === field) {
      return sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />;
    } else {
      return <FaSort />;
    }
  };

  return (
    <div className="container">
      <h1>IPL Auction Data</h1>
      <div className="form-group">
        <label>Player:</label>
        <input type="text" value={player} placeholder='Enter Player name' onChange={(e) => setPlayer(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Team:</label>
        <input type="text" value={team} placeholder='Enter Team name' onChange={(e) => setTeam(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Type:</label>
        <input type="text" value={type} placeholder='Enter Type' onChange={(e) => setType(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Nationality:</label>
        <input type="text" value={nationality} placeholder='Enter Nationality' onChange={(e) => setNationality(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Min Price:</label>
        <input type="number" value={minPrice} placeholder='Enter Min Price' onChange={(e) => setMinPrice(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Max Price:</label>
        <input type="number" value={maxPrice} placeholder='Enter Max Price' onChange={(e) => setMaxPrice(e.target.value)} />
      </div>
      {/* <div className="form-group">
        <label>Sort By:</label>
        <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
          <option value="">None</option>
          <option value="player">Player</option>
          <option value="team">Team</option>
          <option value="price">Price</option>
        </select>
        {sortField && ( // Conditionally render sort order dropdown only when sort field is selected
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        )}
      </div> */}
      {/* <div className="form-group">
        <label>Limit:</label>
        <input type="number" value={limit} placeholder='Enter Limit' onChange={(e) => setLimit(e.target.value)} />
      </div> */}

      <div className="form-group">
        <label>Limit:</label>
        <select value={limit} onChange={(e) => setLimit(e.target.value)}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </div>

      <table className="table">
        <thead>
          <tr>            
             <th onClick={() => handleSort('player')}>
              Player {renderSortIcon('player')}
            </th>
            <th onClick={() => handleSort('team')}>Team {renderSortIcon('team')}</th>
            <th>Type </th> {/* Assuming you have a 'Type' field */}
            <th>Nationality</th> {/* Assuming you have a 'Nationality' field */}
            <th onClick={() => handleSort('price')}>Price {renderSortIcon('price')}</th>
          </tr>
        </thead>
        <tbody>
          {auctionData.map((item, index) => (
            <tr key={index}>
              <td>{item.player}</td>
              <td>{item.team}</td>
              <td>{item.type}</td> {/* Replace 'type' with the actual field name */}
              <td>{item.nationality}</td> {/* Replace 'nationality' with the actual field name */}
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;