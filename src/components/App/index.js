import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './assets/logo.svg';
import * as S from './styles';
import './styles.css';

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
      <S.Wrapper>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Heidan</h1>
        
        <p>{joke}</p>

    </S.Wrapper>
      </header>
    </div>
  );
}

export default App;