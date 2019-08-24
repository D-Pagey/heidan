import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [joke, setJoke] = useState('joke incoming...');    

  const getJoke = async () => {
    const response = await axios.get('https://heidan.netlify.com/.netlify/functions/joke') // localhost if local, or heidan.netlfy.com if not local
    setJoke(response.data.msg);
  }

  useEffect(() => {
    getJoke();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hey Heidi {'<3'} you r beautiful</h1>
        
        
        <p>{joke}</p>


        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
