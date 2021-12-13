import React from 'react';
import logo from './logo.svg';
import './App.css';
import {DevicesList} from "./components/DevicesList";

function App() {
  return (
    <div className="App">
      <div className="App">
        <header className="App-header">
          <div id="title">
            <span>Devices Task</span>
          </div>
        </header>
        <main>
          <DevicesList />
        </main>
      </div>
    </div>
  );
}

export default App;
