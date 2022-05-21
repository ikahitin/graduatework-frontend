import {NavLink, useLocation, useNavigate, useParams} from "react-router-dom";
import '../../styles/apartmentbooking.css'
import React, {useState} from "react";
import ScrollToTop from "../../components/ScrollToTop";
import moment from "moment/moment";
import API from "../../api";

export default function ApartmentBookingConfirmation() {
    const navigate = useNavigate();
    const location = useLocation()
    const {startDate, endDate, name, phone, email, comment, arrivingHour} = location.state

    const {apartment_id} = useParams();
    const [apartment, setApartment] = useState({images: [], amenities: [], reviews: []});

    function getNumberOfNights() {
        if (startDate !== null && endDate !== null) {
            const timeDiff = Math.abs(moment(startDate).toDate().getTime() - moment(endDate).toDate().getTime());
            return Math.ceil(timeDiff / (1000 * 3600 * 24));
        }
    }

    function getTotalPrice(price) {
        return getNumberOfNights() * price
    }

    function handleBooking(e) {
        e.preventDefault()
        const url = `http://127.0.0.1:8000/apartment/${apartment_id}/reservation`;
        const data = {
            "from_date": startDate,
            "to_date": endDate,
            "guest_name": name,
            "guest_phone": phone,
            "user_email": email,
            "comment": comment,
            "arriving_hour": arrivingHour,
            "apartment_id": Number(apartment_id)
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
                navigate("/payment");
            } catch (error) {
                console.log("error", error);
            }
        };
        makeReservation();
    }

    React.useEffect(() => {
        const url = `apartment/${apartment_id}`;

        const fetchData = async () => {
            try {
                const response = await API.get(url);
                const json = await response.data;
                setApartment(json)
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container col-10 search">
            <ScrollToTop/>
            <div className="breadcrumb">
                <NavLink end to="/">Головна</NavLink>
                <NavLink end={true} to="/booking/apartments">Житло</NavLink>
                <NavLink end={true} to="/booking/apartments/search">Результати пошуку</NavLink>
                <NavLink end={true} to={{
                    pathname: `/booking/apartments/${apartment_id}`
                }}>{apartment.name}</NavLink>
                <NavLink end={true} to={{
                    pathname: `/booking/apartments/${apartment_id}/booking`
                }} state={{startDate: startDate, endDate: endDate}}>Бронювання</NavLink>
                <NavLink end={true} to={{
                    pathname: `/booking/apartments/${apartment_id}/booking/confirmation`
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
                                pathname: `/booking/apartments/${apartment.id}/booking`
                            }} state={{startDate, endDate, name, phone, email, comment, arrivingHour}}>Змінити
                                данні</NavLink>
                        </div>
                    </div>
                </div>
                <div className="price-info confirm">
                    <div className="small-heading fw-600">Інформація про оплату</div>
                    <div className="total-amount">
                        <img src={`${process.env.PUBLIC_URL}/price-amount.svg`} alt=""/>
                        <span>Загальна сума</span>
                        <span className="amount">UAH {getTotalPrice(apartment.price) + 70}</span>
                    </div>
                    <div className="price-heading">Ціна включає в себе оплату за:</div>
                    <div className="price-details">
                        <div className="detail-row">
                            <img src={`${process.env.PUBLIC_URL}/yellow-apartment.svg`} alt=""/>
                            <div>
                                <div className="info-h">Номер</div>
                                <div className="info-text">{apartment.short_description}</div>
                                <div className="detail-price">UAH {getTotalPrice(apartment.price)}</div>
                            </div>
                        </div>
                        <div className="detail-row">
                            <img src={`${process.env.PUBLIC_URL}/yellow-apartment.svg`} alt=""/>
                            <div>
                                <div className="info-h">Туристичний збір</div>
                                <div className="info-text">{apartment.short_description}</div>
                                <div className="detail-price">UAH 70</div>
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