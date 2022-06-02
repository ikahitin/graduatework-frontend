import {NavLink, useLocation, useNavigate, useParams} from "react-router-dom";
import '../../styles/apartmentbooking.css'
import React, {useState} from "react";
import ScrollToTop from "../../components/ScrollToTop";
import moment from "moment/moment";
import API from "../../api";
import '../../styles/carbooking.css'
import {getNumberOfNights, getTotalPrice} from "../../utils/helpers";

export default function CarBooking() {
    const navigate = useNavigate();
    const location = useLocation()
    const {startDate, endDate, phone, email} = location.state

    const {car_id} = useParams();
    const [car, setCar] = useState({images: [], amenities: [], reviews: [], insurance: []});

    function handleSubmit(e) {
        e.preventDefault()
        const form = e.target;
        const stateObj = {
            startDate: startDate,
            endDate: endDate,
            name: form.first_name.value + " " + form.last_name.value,
            phone: form.phone.value,
            email: form.email.value
        };

        navigate(`/booking/cars/${car_id}/booking/confirmation`, {state: stateObj});
    }

    React.useEffect(() => {
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
            </div>
            <div className="booking-info">
                <div className="apartment-info">
                    <div className="small-heading fw-600">Перевірте інформацію для бронювання</div>
                    <div className="result-card-cover">
                        <div className="result-card car-card">
                            <div className="image-side">
                                <div className="image-content"
                                     style={{backgroundImage: `url("${car.image_url}")`}}>
                                </div>
                                <div className="provider">
                                    Постачальник
                                    <img src={`${process.env.PUBLIC_URL}/avis.png`} alt="person"/>
                                </div>
                            </div>
                            <div className="content-side mt-4 mb-4">
                                <div className="top-part">
                                    <div className="name">
                                        <NavLink end={true} to={{
                                            pathname: `/booking/apartments/${car.id}`
                                        }}>{car.name}</NavLink>
                                    </div>
                                    <div className="car-category-name">
                                        {car.category}
                                    </div>
                                    <div className="car-specs">
                                        <div className="capacity">
                                            <img src={`${process.env.PUBLIC_URL}/yellow_person.svg`} alt="person"/>
                                            {car.capacity}
                                        </div>
                                        <div className="doors">
                                            <img src={`${process.env.PUBLIC_URL}/yellow_door.svg`} alt="door"/>
                                            {car.doors}
                                        </div>
                                        {car.ac_included && <div className="ac">
                                            <img src={`${process.env.PUBLIC_URL}/yellow_ac.svg`} alt="ac"/>
                                            Кондиціонер
                                        </div>}
                                        <div className="transmission">
                                            <img src={`${process.env.PUBLIC_URL}/yellow_transmission.svg`} alt="transmission"/>
                                            {car.transmission}
                                        </div>
                                    </div>
                                </div>
                                <div className="middle-part">
                                    <div className="location-and-mileage">
                                        <div className="car-location">
                                            <div>Локація</div>
                                            <div>
                                                <img src={`${process.env.PUBLIC_URL}/location2.svg`} alt="location"/>
                                                {car.location}
                                            </div>
                                        </div>
                                        <div className="car-mileage">
                                            <div>Пробіг</div>
                                            <div>
                                                <img src={`${process.env.PUBLIC_URL}/speedometer.svg`} alt="speedometer"/>
                                                Без обмежень
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bottom-part">
                                    <div className="bottom-content">
                                        <div className="left-content">
                                            <div className="price-addition">
                                                <div className="price-includes">У ціну входить </div>
                                                {car.insurance.theft &&
                                                    <div className="insurance">
                                                        <img src={`${process.env.PUBLIC_URL}/green_checkmark.svg`} alt="ac"/>
                                                        Страхування на випадок крадіжки автомобіля
                                                    </div>
                                                }
                                                {car.insurance.road_accident &&
                                                    <div className="insurance">
                                                        <img src={`${process.env.PUBLIC_URL}/green_checkmark.svg`} alt="ac"/>
                                                        Страхування на випадок ДТП
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="general-info">
                    <div className="small-heading fw-600">Основна інформація</div>
                    <div className="general-info-block">
                        <div className="gi-child details bottom-space">
                            <div className="up-content">
                                <div className="detail-row">
                                    <img src={`${process.env.PUBLIC_URL}/yellow-calendar.svg`} alt=""/>
                                    <div>
                                        <div className="info-h">Дата отримання</div>
                                        <div className="info-text">{moment(startDate).format('ddd, D MMM. YYYY')}</div>
                                    </div>
                                </div>
                                <div className="detail-row">
                                    <img src={`${process.env.PUBLIC_URL}/yellow-clock.svg`} alt=""/>
                                    <div>
                                        <div className="info-h">Час отримання</div>
                                        <div className="info-text">{moment(startDate).format('HH:mm')}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="down-content">
                                <div className="detail-row">
                                    <img src={`${process.env.PUBLIC_URL}/yellow-calendar.svg`} alt=""/>
                                    <div>
                                        <div className="info-h">Дата повернення</div>
                                        <div className="info-text">{moment(endDate).format('ddd, D MMM. YYYY')}</div>
                                    </div>
                                </div>
                                <div className="detail-row">
                                    <img src={`${process.env.PUBLIC_URL}/yellow-clock.svg`} alt=""/>
                                    <div>
                                        <div className="info-h">Час повернення</div>
                                        <div className="info-text">{moment(endDate).format('HH:mm')}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="gi-child details">
                            <div className="up-content">
                                <div className="detail-row">
                                    <img src={`${process.env.PUBLIC_URL}/yellow-apartment.svg`} alt=""/>
                                    <div>
                                        <div className="info-h">Загальний термін оренди:</div>
                                        <div className="info-text">{getNumberOfNights(startDate, endDate)} днів</div>
                                    </div>
                                </div>
                            </div>
                            <div className="down-content">
                                <div className="detail-row">
                                    <img src={`${process.env.PUBLIC_URL}/yellow-apartment.svg`} alt=""/>
                                    <div>
                                        <div className="info-h">Ви обрали</div>
                                        <div className="info-text edit">{car.name}</div>
                                        <NavLink to="/">Змінити вибір</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="gi-child">
                            <div className="apartment-location">
                                <img src={`${process.env.PUBLIC_URL}/location.svg`} alt="location"
                                     className="location-icon"/>
                                Avis.ua - Львів, центр міста
                            </div>
                            <div className="apartment-location">
                                <img src={`${process.env.PUBLIC_URL}/location.svg`} alt="location"
                                     className="location-icon"/>
                                Пн-Нд&nbsp;&nbsp;&nbsp;9:00-18:00
                            </div>
                            <div className="map">
                                <div className="blur"></div>
                                <a href="src/views/apartment/ApartmentBooking#" className="show-map-btn">
                                    Показати на карті
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="price-info">
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
                <div className="apartment-additional-info">
                    <div className="apartment-form">
                        <div className="small-heading pb-0">Доповнення</div>
                        <div className="apartment-details form">
                            <div className="input-row">
                                <div className="input-desc">
                                    <span>Booster seat</span>
                                    <span className="sub">125 UAH за оренду</span>
                                </div>
                                <lion-input-stepper max="10" min="0" name="count" value={0}>
                                </lion-input-stepper>
                            </div>
                            <div className="input-row">
                                <div className="input-desc">
                                    <span>Baby seat</span>
                                    <span className="sub">125 UAH за оренду</span>
                                </div>
                                <lion-input-stepper max="10" min="0" name="count" value={0}>
                                </lion-input-stepper>
                            </div>
                            <div className="input-row">
                                <div className="input-desc">
                                    <span>Child seat</span>
                                    <span className="sub">125 UAH за оренду</span>
                                </div>
                                <lion-input-stepper max="10" min="0" name="count" value={0}>
                                </lion-input-stepper>
                            </div>
                            <div className="input-row">
                                <div className="input-desc">
                                    <span>GPS</span>
                                    <span className="sub">125 UAH за оренду</span>
                                </div>
                                <lion-input-stepper max="10" min="0" name="count" value={0}>
                                </lion-input-stepper>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="apartment-additional-info mt-0">
                    <form onSubmit={handleSubmit}>
                        <div className="apartment-form mt-3">
                            <div className="small-heading pb-0">Заповніть ваші дані</div>
                            <div className="info-text">
                                <img src={`${process.env.PUBLIC_URL}/yellow-exclamation.svg`} alt=""/>
                                Введіть вашу дані українською або англійською
                            </div>
                            <div className="account-inputs">
                                <div className="acc-input-row">
                                    <div className="acc-input">
                                        <div>Ім’я</div>
                                        <input type="text" className="form-control" required name="first_name"/>
                                    </div>
                                    <div className="acc-input">
                                        <div>Прізвище</div>
                                        <input type="text" className="form-control" required name="last_name"/>
                                    </div>
                                </div>
                                <div className="acc-input-row">
                                    <div className="acc-input">
                                        <div>E-mail</div>
                                        <input type="email" name="email" className="form-control" required
                                               defaultValue={email}/>
                                    </div>
                                    <div className="acc-input">
                                        <div>Підтвердіть ваш E-mail</div>
                                        <input type="email" className="form-control" required defaultValue={email}/>
                                    </div>
                                </div>
                                <div className="acc-input-row pt-1">
                                    <div className="acc-input">
                                        <div className="sub-text">Підтвердження бронювання буде відправлено на цю
                                            адресу
                                        </div>
                                    </div>
                                </div>
                                <div className="acc-input-row">
                                    <div className="acc-input">
                                        <div>Номер телефону</div>
                                        <input type="phone" name="phone" className="form-control" required
                                               defaultValue={phone}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="continue-booking">
                            <button type="submit" className="btn btn-blue">Продовжити бронювання</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
