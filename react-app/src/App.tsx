import './App.css';
import * as React from 'react';
import Dashboard from './component/dashboard/Dashboard';
import { SnackbarProvider } from 'notistack';

export default function App() {
  return (
    <div className="App">
      <SnackbarProvider>
        <Dashboard/>
      </SnackbarProvider>
    </div>
  );
}
