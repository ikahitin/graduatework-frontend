import {NavLink, useLocation} from "react-router-dom";
import '../styles/apartmentbooking.css'
import React, {useState} from "react";
import ScrollToTop from "../components/ScrollToTop";

export default function PaymentLoading() {
    const location = useLocation()
    const [isLoading, setIsLoading] = useState(true);
    const [oneStepBooking, setOneStepBooking] = useState(false);
    const delay = ms => new Promise(res => setTimeout(res, ms));

    React.useEffect(() => {
        if (location.state !== null) {
            if (location.state.hasOwnProperty('booking')) {
                setOneStepBooking(true)
                const booking = location.state.booking
                if (booking[0] === true) {
                    localStorage.setItem('apartmentBooking', true);
                }
                if (booking[1] === true) {
                    localStorage.setItem('carBooking', true);
                }
                if (booking[2] === true) {
                    localStorage.setItem('taxiBooking', true);
                }
                if (booking[3] === true) {
                    localStorage.setItem('exchangeApartmentBooking', true);
                }
            }
        }
        const changeState = async () => {
            await delay(5000);
            setIsLoading(false);
        };

        changeState();
    }, []);
    if (!isLoading) {
        return <div className="container col-10 search">
            <div className="payment-confirmation waiting">
                <div className="confirmation">Оплата підтверджена</div>
                <img src={`${process.env.PUBLIC_URL}/confirmed.svg`} alt="confirmed" className="status"/>
                <div className="wait">Бажаємо гарного відпочинку!</div>
                {oneStepBooking ?
                    <div className="booking-buttons">
                        <NavLink to={{pathname: `/`}}>Завершити</NavLink>
                        <NavLink to={{pathname: `/booking/one-step`}} className="booking-continue">Продовжити бронювання</NavLink>
                    </div>
                    :
                    <NavLink to={{pathname: `/booking`}}>Продовжити бронювання</NavLink>
                }
            </div>
        </div>
    }
    return (
        <div className="container col-10 search">
            <ScrollToTop/>
            <div className="payment-confirmation waiting">
                <div className="confirmation">Підтвердження оплати</div>
                <div className="spinner-border text-primary status" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className="wait">Зачекайте <span>5</span> секунд</div>
            </div>
        </div>
    )
}
