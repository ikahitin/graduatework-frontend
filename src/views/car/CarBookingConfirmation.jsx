import {NavLink, useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useState} from "react";
import ScrollToTop from "../../components/ScrollToTop";
import API from "../../api";
import {getTotalPrice} from "../../utils/helpers";

export default function CarBookingConfirmation() {
    const navigate = useNavigate();
    const location = useLocation()
    const {startDate, endDate, name, phone, email} = location.state

    const {car_id} = useParams();
    const [car, setCar] = useState({images: [], amenities: [], reviews: [], insurance: []});

    function handleBooking(e) {
        e.preventDefault()
        const url = `car/${car_id}/reservation`;
        const data = {
            "from_date": startDate,
            "to_date": endDate,
            "user_name": name,
            "user_phone": phone,
            "user_email": email,
            "car_id": Number(car_id)
        }
        const makeReservation = async () => {
            try {
                await API({
                    method: 'post',
                    url: url,
                    data: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                navigate("/payment", {state: bookingState});
            } catch (error) {
                console.log("error", error);
            }
        };
        makeReservation();
    }

    const [bookingState, setBookingState] = useState()

    React.useEffect(() => {
        if (location.state !== null) {
            if (location.state.hasOwnProperty('booking')) {
                setBookingState({"booking": location.state.booking})
            }
        }
        const url = `car/${car_id}`;

        const fetchData = async () => {
            try {
                const response = await API.get(url);
                const json = await response.data;
                setCar(json)
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, [car_id]);

    return (
        <div className="container col-10 search">
            <ScrollToTop/>
            <div className="breadcrumb">
                <NavLink end to="/">Головна</NavLink>
                <NavLink end={true} to="/booking/cars">Оренда автомобіля</NavLink>
                <NavLink end={true} to="/booking/cars/search">Результати пошуку</NavLink>
                <NavLink end={true} to={{
                    pathname: `/booking/cars/${car_id}/booking`
                }}>Бронювання</NavLink>
                <NavLink end={true} to={{
                    pathname: `/booking/cars/${car_id}/booking/confirmation`
                }}>Оплата</NavLink>
            </div>
            <div className="booking-info">
                <div className="apartment-info">
                    <div className="user-data-block">
                        <div className="user-data-info">
                            <div className="small-heading pb-0">Інформація про особу яка бронює</div>
                            <div className="info-text">
                                <img src={`${process.env.PUBLIC_URL}/yellow-exclamation.svg`} alt=""/>
                                Важливо! Буль ласка, введіть ім’я, яке вказано у вашому паспорті
                            </div>
                            <div className="acc-input-row">
                                <div className="acc-input">
                                    <div>Ім’я</div>
                                    <p>{name}</p>
                                </div>
                                <div className="acc-input">
                                    <div>E-mail</div>
                                    <p>{email}</p>
                                </div>
                                <div className="acc-input">
                                    <div>Номер телефону</div>
                                    <p>{phone}</p>
                                </div>
                            </div>
                        </div>
                        <div className="edit-data">
                            <NavLink to={{
                                pathname: `/booking/cars/${car.id}/booking`
                            }} state={{startDate, endDate, phone, email}}>Змінити
                                дані</NavLink>
                        </div>
                    </div>
                </div>
                <div className="price-info confirm">
                    <div className="small-heading fw-600">Інформація про оплату</div>
                    <div className="total-amount">
                        <img src={`${process.env.PUBLIC_URL}/price-amount.svg`} alt=""/>
                        <span>Загальна сума</span>
                        <span className="amount">UAH {getTotalPrice(car.price, startDate, endDate) + 1500}</span>
                    </div>
                    <div className="price-heading">Ціна включає в себе оплату за:</div>
                    <div className="price-details">
                        <div className="detail-row">
                            <img src={`${process.env.PUBLIC_URL}/yellow-apartment.svg`} alt=""/>
                            <div>
                                <div className="info-h">Автомобіль</div>
                                <div className="info-text">{car.name}</div>
                                <div className="detail-price">UAH {getTotalPrice(car.price, startDate, endDate)}</div>
                            </div>
                        </div>
                        <div className="detail-row">
                            <img src={`${process.env.PUBLIC_URL}/yellow-apartment.svg`} alt=""/>
                            <div>
                                <div className="info-h">Страхування</div>
                                <div className="info-text">На випадок крадіжки автомобіля/ДТП</div>
                                <div className="detail-price">UAH 1500</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="payment">
                    <div className="payment-info">
                        <form>
                            <div className="small-heading pb-0 pt-0">Дані про номер</div>
                            <div className="payments">
                                Спосіб оплати
                                <img src={`${process.env.PUBLIC_URL}/visa.svg`} alt="checkmark"/>
                                <img src={`${process.env.PUBLIC_URL}/mastercard.svg`} alt="checkmark"/>
                            </div>
                            <div className="acc-input-row pt-2">
                                <div className="acc-input">
                                    <div>Ім’я власника карти</div>
                                    <input type="text" className="form-control"></input>
                                </div>
                                <div className="acc-input">
                                    <div>Номер кредитної картки</div>
                                    <input type="text" className="form-control"></input>
                                </div>
                            </div>
                            <div className="acc-input-row">
                                <div className="acc-input">
                                    <div>Термін закінчення (мм/рр)</div>
                                    <div className="selects">
                                        <select name="arriving_time" id="month_expiry"
                                                className="form-control expiration">
                                            <option disabled selected value></option>
                                            <option value="h_14">14:00</option>
                                            <option value="h_15">15:00</option>
                                            <option value="h_16">16:00</option>
                                            <option value="h_17">17:00</option>
                                            <option value="later">Пізніше 17:00</option>
                                        </select>
                                        <select name="arriving_time" id="year_expiry"
                                                className="form-control expiration">
                                            <option disabled selected value></option>
                                            <option value="h_14">14:00</option>
                                            <option value="h_15">15:00</option>
                                            <option value="h_16">16:00</option>
                                            <option value="h_17">17:00</option>
                                            <option value="later">Пізніше 17:00</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="acc-input">
                                    <div>CVV код</div>
                                    <input type="text" name="cvv" className="form-control cvv"></input>
                                </div>
                            </div>

                        </form>

                    </div>
                    <div className="submit-block">
                        <div className="info-text">
                            <img src={`${process.env.PUBLIC_URL}/yellow-exclamation.svg`} alt=""/>
                            Настискаючи кнопку ”Підтвердити”, ви приймаєте умови бронювання, загальні положення, та
                            положення про конфіденційність.
                        </div>
                        <button type="submit" className="btn btn-blue" onClick={handleBooking}>Підтвердити</button>
                    </div>
                </div>
            </div>
        </div>
    )
}