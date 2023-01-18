'use client';

import { useState } from 'react';


import * as React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import theme from '../src/theme';


import reportWebVitals from '../src/reportWebVitals';
import { StyledEngineProvider } from '@mui/material/styles';
import Dashboard from '../src/component/dashboard/Dashboard';

function Header({ title }:any) {
  return <h1>{title ? title : 'Default title'}</h1>;
}

export default function HomePage() {
  const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];
  const [likes, setLikes] = useState(0);

  function handleClick() {
    setLikes(likes + 1);
  }

  return (
    <div>
      <Header title="Develop. Preview. Ship. 🚀" />
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      <button onClick={handleClick}>Like ({likes})</button>      
      
      {/* <ThemeProvider theme={theme}>
        <CssBaseline />
        <StyledEngineProvider>
          <App />
        </StyledEngineProvider>
      </ThemeProvider> */}
    </div>
  );
}


