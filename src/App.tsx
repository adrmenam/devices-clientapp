import React from 'react';
import './App.css';
import {DevicesPage} from "./components/DevicesPage";

function App() {
  return (
    <div className="App">
      <div className="App">
        <header className="App-header">
          <div id="title">
            <span>DEVICES TASK</span>
          </div>
        </header>
        <main>
          <DevicesPage />
        </main>
      </div>
    </div>
  );
}

export default App;
