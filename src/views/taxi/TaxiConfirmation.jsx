import {NavLink, useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useState} from "react";
import ScrollToTop from "../../components/ScrollToTop";
import API from "../../api";
import moment from "moment/moment";

export default function TaxiConfirmation() {
    const navigate = useNavigate();
    const location = useLocation()
    const {reservationDate, startAddress, endAddress, locationObj, appeal, name, phone, email} = location.state
    const {taxi_type} = useParams();
    const [taxi, setTaxi] = useState({});
    const [bookingState, setBookingState] = useState()

    function handleBooking(e) {
        e.preventDefault()
        const url = `taxi/${taxi_type}/reservation`;
        const data = {
            "from_date": reservationDate,
            "to_date": reservationDate,
            "start_address": startAddress,
            "end_address": endAddress,
            "user_name": name,
            "user_phone": phone,
            "user_email": email,
            "appeal": appeal,
            "taxi_id": Number(taxi_type),
            "location": {
                "start_latitude": locationObj.startLocation.startLat,
                "start_longitude": locationObj.startLocation.startLng,
                "end_latitude": locationObj.endLocation.endLat,
                "end_longitude": locationObj.endLocation.endLng,
            }
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

    React.useEffect(() => {
        if (location.state !== null) {
            if (location.state.hasOwnProperty('booking')) {
                setBookingState({"booking": location.state.booking})
            }
        }
        const url = `taxi/${taxi_type}`;

        const fetchData = async () => {
            try {
                const response = await API.get(url, {
                    params: {
                        start_latitude: locationObj.startLocation.startLat,
                        start_longitude: locationObj.startLocation.startLng,
                        end_latitude: locationObj.endLocation.endLat,
                        end_longitude: locationObj.endLocation.endLng,
                    }
                });
                const json = await response.data;
                setTaxi(json)
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, [locationObj, taxi_type]);

    return (
        <div className="container col-10 search">
            <ScrollToTop/>
            <div className="breadcrumb">
                <NavLink end to="/">Головна</NavLink>
                <NavLink end={true} to="/booking/taxi">Таксі</NavLink>
                <NavLink end={true} to="/booking/taxi/search">Результати пошуку</NavLink>
                <NavLink end={true} to={{
                    pathname: `/booking/taxi/search/${taxi_type}/confirmation`
                }}>Оплата</NavLink>
            </div>
            <div className="booking-info">
                <div className="small-heading fw-600">Основна інформація</div>
                <div className="general-info taxi-info">
                    <div className="taxi-card">
                        <div className="taxi-type-block">
                            <div className="taxi-img">
                                <img src={taxi.image_url} alt={taxi.type}/>
                            </div>
                            <div className="type">{taxi.type}</div>
                            <div className="taxi-desc">{taxi.description}</div>
                            <div className="taxi-capacity">
                                <div className="people-capacity">
                                    <img src={`${process.env.PUBLIC_URL}/yellow_person.svg`}
                                         alt="person"/>
                                    {taxi.capacity}
                                </div>
                                <div className="luggage-capacity">
                                    <img src={`${process.env.PUBLIC_URL}/yellow_suitcase.svg`}
                                         alt="person"/>
                                    {taxi.luggage_capacity}
                                </div>
                            </div>
                            <div className="price">UAH {taxi.price_for_ride}</div>
                        </div>
                    </div>
                    <div className="taxi-details">
                        <div className="up-content">
                            <div className="detail-row">
                                <img src={`${process.env.PUBLIC_URL}/location-yellow.svg`} alt=""/>
                                <div>
                                    <div className="info-h">Місце подачі</div>
                                    <div className="info-text">{startAddress}</div>
                                </div>
                            </div>
                            <div className="detail-row">
                                <img src={`${process.env.PUBLIC_URL}/location-yellow.svg`} alt=""/>
                                <div>
                                    <div className="info-h">Місце призначення</div>
                                    <div className="info-text">{endAddress}</div>
                                </div>
                            </div>
                        </div>
                        <div className="down-content">
                            <div className="detail-row">
                                <img src={`${process.env.PUBLIC_URL}/yellow-calendar.svg`} alt=""/>
                                <div>
                                    <div className="info-h">Дата</div>
                                    <div
                                        className="info-text">{moment(reservationDate).format('ddd, D MMM. YYYY')}</div>
                                </div>
                            </div>
                            <div className="detail-row">
                                <img src={`${process.env.PUBLIC_URL}/yellow-clock.svg`} alt=""/>
                                <div>
                                    <div className="info-h">Час</div>
                                    <div className="info-text">{moment(reservationDate).format('HH:mm')}</div>
                                </div>
                            </div>
                            <div className="detail-row">
                                <img src={`${process.env.PUBLIC_URL}/phone-yellow.svg`} alt=""/>
                                <div>
                                    <div className="info-h">Номер телефону водія</div>
                                    <div className="info-text">096 584 32 40</div>
                                </div>
                            </div>
                        </div>
                        <div className="edit-data">
                            <NavLink to="/">Змінити дані</NavLink>
                        </div>
                    </div>
                </div>
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
                                pathname: `/booking/taxi/${"taxi"}`
                            }}>Змінити
                                дані</NavLink>
                        </div>
                    </div>
                </div>
                <div className="price-info confirm">
                    <div className="small-heading fw-600">Інформація про оплату</div>
                    <div className="total-amount">
                        <img src={`${process.env.PUBLIC_URL}/price-amount.svg`} alt=""/>
                        <span>Вартість поїздки</span>
                        <span className="amount">UAH {taxi.price_for_ride}</span>
                    </div>
                </div>
                <div className="payment">
                    <div className="payment-info">
                        <form>
                            <div className="small-heading pb-0 pt-0">Деталі оплати</div>
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