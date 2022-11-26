import React from 'react';
import { Route, Routes, NavLink, HashRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Dice from "./pages/Dice/Dice";
import Units from "./pages/Units/Units";
import './index.css';



const Main = () => {
    return (
        <HashRouter>
            <div>
                <ul className="header">
                    <li><p>Kalkulator</p></li>
                    <li><NavLink to='/'>Start</NavLink></li>
                    <li><NavLink to='/dice'>Kości</NavLink></li>
                    <li><NavLink to='/units'>Jednostki</NavLink></li>
                </ul>
                <div className='content'>
                        <Routes>
                            <Route exact path='/' element={<Home/>}></Route>
                            <Route exact path='/dice' element={<Dice/>}></Route>
                            <Route exact path='/units' element={<Units/>}></Route>
                        </Routes>
                </div>
                <ul className='footer'>
                    <li><p>Projekt by Damian Langowski</p></li>
                    <li><p><a href='https://github.com/Nekuskus/dice'>Hosted on Github</a></p></li>
                    <li><p><a href="https://www.freepik.com/free-vector/simple-gradient-background-vector-winter-blue-pink_15847326.htm#query=simple%20background&position=8&from_view=keyword">Tło by rawpixel.com na Freepik</a></p></li>
                </ul>
            </div>
        </HashRouter>
    );
}


export default Main;