import React, { useState, useEffect } from 'react';
import './App.css';

const REACT_APP_SEARCH_API = process.env.REACT_APP_SEARCH_API;

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleOnChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`${REACT_APP_SEARCH_API}=${searchTerm}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else
        throw new Error('Search request failed');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <form style={{
        margin: '10% 5%',
        width: '100%'
      }} className='.form-container' onSubmit={handleOnSubmit}>
        <input placeholder='enter text here...' value={searchTerm} onChange={e => handleOnChange(e)} />
        <button type="submit" style={{
          backgroundColor: 'blue',
          color: 'white',
          margin: '10px',
        }}>Search</button>
        <div className='.search-container'>
          {searchResults.length > 0 && <div>
            {searchResults.length} results found
          </div>}
          {searchResults.length > 0 && (
            <ul>
              {searchResults.map((item: any, i) => {
                return (
                  <li key={i} style={{ color: 'black', fontSize: '20px' }}
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(item).replace(new RegExp(searchTerm, "gi"), (match: any) => `<mark style="background-color: yellow">${match}</mark>`)
                    }}
                  >
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </form >
    </div >
  );
}

export default App;
