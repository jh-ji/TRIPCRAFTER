import {BrowserRouter,Route,Routes}from 'react-router-dom'
import './App.css';
import Main from './Main';
import Menu from './Menu';
import React from 'react';
import Friend from './Friend';
import Schedule from './Schedule';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/*" element={<Main />}></Route>
        <Route path="/Menu" element={<Menu />}></Route>
        <Route path="/Friend" element={<Friend />}></Route>
        <Route path='/Schedule' element={<Schedule/>}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
