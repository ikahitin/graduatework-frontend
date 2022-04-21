import React from 'react';
import {createRoot} from "react-dom/client"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Apartment from "./views/Apartment";
import Booking from "./views/Booking";
import ApartmentResult from "./views/ApartmentResult";
import Car from "./views/Car";

const root = createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route path="booking" element={<Booking/>}>
                        <Route path="apartments" element={<Apartment/>}/>
                        <Route path="apartments/search" element={<ApartmentResult/>}/>
                        <Route path="cars" element={<Car/>}/>
                </Route>
                <Route
                    path="*"
                    element={
                        <main style={{padding: "1rem"}}>
                            <p>There's nothing here!</p>
                        </main>
                    }
                /></Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
