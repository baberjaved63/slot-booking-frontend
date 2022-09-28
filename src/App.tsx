import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import SlotsContainer from "./components/SlotsContainer";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="d-flex justify-content-center ms-3 mt-5 align-items-center">
        <SlotsContainer />
      </header>
    </div>
  );
}

export default App;
