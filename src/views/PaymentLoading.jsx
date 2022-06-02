import {NavLink} from "react-router-dom";
import '../styles/apartmentbooking.css'
import React, {useState} from "react";
import ScrollToTop from "../components/ScrollToTop";

export default function PaymentLoading() {
    const [isLoading, setIsLoading] = useState(true);
    const delay = ms => new Promise(res => setTimeout(res, ms));

    React.useEffect(() => {
        const changeState = async () => {
            await delay(15000);
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
                <NavLink to={{pathname: `/booking`}}>На головну</NavLink>
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
                <div className="wait">Зачекайте <span>15</span> секунд</div>
            </div>
        </div>
    )
}
