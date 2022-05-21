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
import Taxi from "./views/Taxi";
import ApartmentUnit from "./views/ApartmentUnit";
import CarResult from "./views/CarResults";
import ExchangeVacation from "./views/ExchangeVacation";
import ApartmentBooking from "./views/ApartmentBooking";
import ApartmentBookingConfirmation from "./views/apartment/ApartmentBookingConfirmation";
import PaymentLoading from "./views/PaymentLoading";
import Trips from "./views/profile/Trips";
import PrivateRouter from "./components/PrivateRouter";

const root = createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route path="booking" element={<Booking/>}>
                        <Route path="apartments" element={<Apartment/>}/>
                        <Route path="apartments/search" element={<ApartmentResult/>}/>
                        <Route path="apartments/:apartment_id" element={<ApartmentUnit/>}/>
                        <Route path="apartments/:apartment_id/booking" element={<ApartmentBooking/>}/>
                        <Route path="apartments/:apartment_id/booking/confirmation" element={<ApartmentBookingConfirmation/>}/>
                        <Route path="cars" element={<Car/>}/>
                        <Route path="cars/search" element={<CarResult/>}/>
                        <Route path="taxi" element={<Taxi/>}/>
                        <Route path="vacation" element={<ExchangeVacation/>}/>
                    </Route>
                    <Route path="profile" element={<PrivateRouter/>}>
                        <Route path="trips" element={<Trips/>}/>
                    </Route>
                    <Route path="payment" element={<PaymentLoading/>}/>
                    <Route
                    path="*"
                    element={
                        <main style={{padding: "1rem"}} className="pt-5 mt-5">
                            <h4>There's nothing here!</h4>
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
