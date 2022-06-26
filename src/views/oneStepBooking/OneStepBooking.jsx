import React, {useState} from "react";
import '../../styles/one_step.css'
import {NavLink, useNavigate} from "react-router-dom";
import ApartmentSearchBlock from "../../components/searches/ApartmentSearchBlock";
import CarSearchBlock from "../../components/searches/CarSearchBlock";
import TaxiSearchBlock from "../../components/searches/TaxiSearchBlock";
import ExchangeApartmentSearchBlock from "../../components/searches/ExchangeApartmentSearchBlock";

function OneStepBooking() {
    const navigate = useNavigate();
    const isApartmentBooked = localStorage.getItem('apartmentBooking');
    const isCarBooked = localStorage.getItem('carBooking');
    const isTaxiBooked = localStorage.getItem('taxiBooking');
    const isExchangeApartmentBooked = localStorage.getItem('exchangeApartmentBooking');

    const [isActive, setIsActive] = useState([!isApartmentBooked, false, false, false]);

    function nextStep(stepId) {
        let items = Array(4).fill(false)
        items[stepId] = true;
        if (stepId === 1) {
            localStorage.setItem('apartmentBooking', true);
        }
        if (stepId === 2) {
            localStorage.setItem('carBooking', true);
        }
        if (stepId === 3) {
            localStorage.setItem('taxiBooking', true);
        }
        if (stepId === 4) {
            localStorage.setItem('exchangeApartmentBooking', true);
        }
        setIsActive(items)
    }

    function openBooking(stepId) {
        let items = Array(4).fill(false)
        items[stepId] = true;
        setIsActive(items)
    }

    function removeBookings() {
        localStorage.removeItem('apartmentBooking');
        localStorage.removeItem('carBooking');
        localStorage.removeItem('taxiBooking');
        localStorage.removeItem('exchangeApartmentBooking');
    }

    return (
        <div className="container col-10 search">
            <div className="breadcrumb">
                <NavLink end to="/">Головна</NavLink>
                <NavLink end={true} to="/booking/one-step">Забронювати за один крок</NavLink>
            </div>
            <div className="step-title">Забрюнюй подорож за один крок </div>
            <div className="booking-process">
                <div className={"booking-step " + (isActive[0] ? 'active-step' : 'hidden') + (isApartmentBooked ? ' booked' : '')}>
                    <div className="step-number">1</div>
                    <div className="step-entity">
                       <div className="d-flex align-items-center">
                           <div className="nav-icon house"/>
                           <span>Житло</span>
                       </div>
                        {isApartmentBooked &&
                            <div className="edit-booking">
                                <img src={`${process.env.PUBLIC_URL}/green_checkmark.svg`} alt="dice"/>
                                Заброньовано
                                <div className="btn btn-light arrow">Редагувати</div>
                            </div>
                        }
                    </div>
                    <ApartmentSearchBlock/>
                    <div className="edit-data">
                        <div onClick={() => nextStep(1)}>Пропустити</div>
                    </div>
                </div>
                <div className="dots-space">
                    <img src={`${process.env.PUBLIC_URL}/three_dots.svg`} alt="dice"/>
                </div>
                <div className={"booking-step " + (isActive[1] ? 'active-step' : 'hidden') + (isCarBooked ? ' booked' : '')}>
                    <div className="step-number">2</div>
                    <div className="step-entity" onClick={() => openBooking(1)}>
                        <div className="d-flex align-items-center">
                            <div className="nav-icon car"/>
                            <span>Оренда автомобіля</span>
                        </div>
                        {isCarBooked &&
                            <div className="edit-booking">
                                <img src={`${process.env.PUBLIC_URL}/green_checkmark.svg`} alt="dice"/>
                                Заброньовано
                                <div className="btn btn-light arrow">Редагувати</div>
                            </div>
                        }
                    </div>
                    <CarSearchBlock/>
                    <div className="edit-data">
                        <div onClick={() => nextStep(2)}>Пропустити</div>
                    </div>
                </div>
                <div className="dots-space">
                    <img src={`${process.env.PUBLIC_URL}/three_dots.svg`} alt="dice"/>
                </div>
                <div className={"booking-step " + (isActive[2] ? 'active-step' : 'hidden') + (isTaxiBooked ? ' booked' : '')}>
                    <div className="step-number">3</div>
                    <div className="step-entity" onClick={() => openBooking(2)}>
                        <div className="d-flex align-items-center">
                            <div className="nav-icon taxi"/>
                            <span>Таксі</span>
                        </div>
                        {isTaxiBooked &&
                            <div className="edit-booking">
                                <img src={`${process.env.PUBLIC_URL}/green_checkmark.svg`} alt="dice"/>
                                Заброньовано
                                <div className="btn btn-light arrow">Редагувати</div>
                            </div>
                        }
                    </div>
                    <TaxiSearchBlock/>
                    <div className="edit-data">
                        <div onClick={() => nextStep(3)}>Пропустити</div>
                    </div>
                </div>
                <div className="dots-space">
                    <img src={`${process.env.PUBLIC_URL}/three_dots.svg`} alt="dice"/>
                </div>
                <div className={"booking-step " + (isActive[3] ? 'active-step' : 'hidden') + (isExchangeApartmentBooked ? ' booked' : '')}>
                    <div className="step-number">4</div>
                    <div className="step-entity" onClick={() => openBooking(3)}>
                        <div className="d-flex align-items-center">
                            <div className="nav-icon travel"/>
                            <span>Відпочинок за обміном</span>
                        </div>
                    </div>
                    <ExchangeApartmentSearchBlock/>
                    <div className="edit-data">
                        <div onClick={() => nextStep(4)}>Пропустити</div>
                    </div>
                </div>
                {(isTaxiBooked && isCarBooked && isTaxiBooked && isExchangeApartmentBooked) &&
                    <div className="booking-result">
                        <div className="message">
                            <img src={`${process.env.PUBLIC_URL}/yellow-exclamation.svg`} alt="dice"/>
                            <p>Ви успішно забронювали свій відпочинок!
                                Всі деталі бронювання були відправлені на вашу пошту
                                та на ваш особистий кабінет
                            </p>
                        </div>
                        <NavLink to={"/booking/apartments"} onClick={removeBookings}>На головну</NavLink>
                    </div>
                }
            </div>
        </div>
    )
}

export default OneStepBooking;