import './App.css';
import React from "react";
import {Outlet} from "react-router-dom";
import Footer from "./components/Footer";
import NavHeader from "./components/NavHeader";

function App() {
    return (
        <div className="App">
            <NavHeader/>
            <div className="section container">
                <div className="section-nav">
                    <Outlet/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
