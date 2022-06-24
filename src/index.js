import React from 'react';
import {createRoot} from "react-dom/client"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Apartment from "./views/apartment/Apartment";
import Booking from "./views/Booking";
import ApartmentResult from "./views/apartment/ApartmentResult";
import Car from "./views/car/Car";
import Taxi from "./views/taxi/Taxi";
import ApartmentUnit from "./views/apartment/ApartmentUnit";
import CarResult from "./views/car/CarResults";
import ExchangeVacation from "./views/exchangeVacation/ExchangeVacation";
import ApartmentBooking from "./views/apartment/ApartmentBooking";
import ApartmentBookingConfirmation from "./views/apartment/ApartmentBookingConfirmation";
import PaymentLoading from "./views/PaymentLoading";
import Trips from "./views/profile/Trips";
import PrivateRouter from "./components/PrivateRouter";
import localization from 'moment/locale/uk'
import moment from "moment";
import CarBooking from "./views/car/CarBooking";
import CarBookingConfirmation from "./views/car/CarBookingConfirmation";
import TaxiResult from "./views/taxi/TaxiResult";
import TaxiConfirmation from "./views/taxi/TaxiConfirmation";
import ExchangeVacationResult from "./views/exchangeVacation/ExchangeVacationResult";
import ExchangeApartmentUnit from "./views/exchangeVacation/ExchangeApartmentUnit";
import ExchangeApartmentBooking from "./views/exchangeVacation/ExchangeApartmentBooking";

moment().locale("uk", localization).format('LLL')
const root = createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route path="booking" element={<Booking/>}>
                        <Route path="apartments" element={<Apartment/>}/>
                        <Route path="apartments/search" element={<ApartmentResult itemsPerPage={8}/>}/>
                        <Route path="apartments/:apartment_id" element={<ApartmentUnit/>}/>
                        <Route path="apartments/:apartment_id/booking" element={<ApartmentBooking/>}/>
                        <Route path="apartments/:apartment_id/booking/confirmation" element={<ApartmentBookingConfirmation/>}/>
                        <Route path="cars" element={<Car/>}/>
                        <Route path="cars/search" element={<CarResult/>}/>
                        <Route path="cars/:car_id/booking" element={<CarBooking/>}/>
                        <Route path="cars/:car_id/booking/confirmation" element={<CarBookingConfirmation/>}/>
                        <Route path="taxi" element={<Taxi/>}/>
                        <Route path="taxi/search" element={<TaxiResult/>}/>
                        <Route path="taxi/search/:taxi_type/confirmation" element={<TaxiConfirmation/>}/>
                        <Route path="vacation" element={<ExchangeVacation/>}/>
                        <Route path="vacation/apartments/:apartment_id" element={<ExchangeApartmentUnit/>}/>
                        <Route path="vacation/search" element={<ExchangeVacationResult itemsPerPage={8}/>}/>
                        <Route path="vacation/:apartment_id/confirmation" element={<ExchangeApartmentBooking/>}/>
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
