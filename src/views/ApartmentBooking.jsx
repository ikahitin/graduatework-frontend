import {NavLink, useLocation, useNavigate, useParams} from "react-router-dom";
import '../styles/apartmentbooking.css'
import React, {useRef, useState} from "react";
import ScrollToTop from "../components/ScrollToTop";
import getStars from "../utils/utils";
import moment from "moment/moment";

export default function ApartmentBooking() {
    const location = useLocation()
    const {startDate, endDate} = location.state
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();

    const navigate = useNavigate();
    const {apartment_id} = useParams();
    const [apartment, setApartment] = useState({images: [], amenities: [], reviews: []});

    const emailInput = useRef();
    const phoneInput = useRef();

    function getNumberOfNights() {
        if (startDate !== null && endDate !== null) {
            const timeDiff = Math.abs(moment(startDate).toDate().getTime() - moment(endDate).toDate().getTime());
            return Math.ceil(timeDiff / (1000 * 3600 * 24));
        }
    }

    function getTotalPrice(price) {
        return getNumberOfNights() * price
    }

    React.useEffect(() => {
        const url = `http://127.0.0.1:8000/apartment/${apartment_id}`;

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
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
                }}>Бронювання</NavLink>
            </div>
            <div className="booking-info">
                <div className="apartment-info">
                    <div className="small-heading fw-600">Перевірте інформацію для бронювання</div>
                    <div className="result-card-cover">
                        <div className="result-card">
                            <div className="image-side">
                                <div className="image-content"
                                     style={{backgroundImage: `url("${apartment.images && apartment.images[0]}")`}}>
                                </div>
                            </div>
                            <div className="content-side">
                                <div className="top-part">
                                    <div className="name">
                                        <NavLink end={true} to={{
                                            pathname: `/booking/apartments/${apartment.id}`
                                        }}>{apartment.name}</NavLink>
                                    </div>
                                    <div className="location">
                                        <div className="location-city">
                                            <a href="#">{apartment.city}</a>
                                        </div>
                                        <div className="show-on-map">
                                            <a href="#">Показати на карті</a>
                                        </div>
                                        <div className="centre-distance">{apartment.distance_from_center} км від
                                            центру
                                        </div>
                                    </div>
                                </div>
                                <div className="bottom-part">
                                    <div className="room-desc">{apartment.short_description}
                                    </div>
                                    <div className="bottom-content">
                                        <div className="left-content">
                                            <div className="bed-desc">
                                                2 односпальні ліжка
                                            </div>
                                            <div className="room-rating">
                                                <span>{apartment.rating}</span>
                                                <div className="stars">
                                                    {getStars(2)}
                                                </div>
                                            </div>
                                            <div className="reviews">
                                                <div className="reviews-images">
                                                    <div className="img"
                                                         style={{backgroundImage: `url("/profile-pic.jpeg")`}}/>
                                                    <div className="img"
                                                         style={{backgroundImage: `url("/profile-pic2.jpeg")`}}/>
                                                    <div className="img"
                                                         style={{backgroundImage: `url("/profile-pic3.jpeg")`}}/>
                                                </div>
                                                <span>18 відгуків</span>
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
                                        <div className="info-h">Дата заїзду</div>
                                        <div className="info-text">{moment(startDate).format('ddd, D MMM. YYYY')}</div>
                                    </div>
                                </div>
                                <div className="detail-row">
                                    <img src={`${process.env.PUBLIC_URL}/yellow-clock.svg`} alt=""/>
                                    <div>
                                        <div className="info-h">Час заїзду</div>
                                        <div className="info-text">З 14:00</div>
                                    </div>
                                </div>
                            </div>
                            <div className="down-content">
                                <div className="detail-row">
                                    <img src={`${process.env.PUBLIC_URL}/yellow-calendar.svg`} alt=""/>
                                    <div>
                                        <div className="info-h">Дата заїзду</div>
                                        <div className="info-text">{moment(endDate).format('ddd, D MMM. YYYY')}</div>
                                    </div>
                                </div>
                                <div className="detail-row">
                                    <img src={`${process.env.PUBLIC_URL}/yellow-clock.svg`} alt=""/>
                                    <div>
                                        <div className="info-h">Час виїзду</div>
                                        <div className="info-text">До 12:00</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="gi-child details">
                            <div className="up-content">
                                <div className="detail-row">
                                    <img src={`${process.env.PUBLIC_URL}/yellow-apartment.svg`} alt=""/>
                                    <div>
                                        <div className="info-h">Загальний термін перебування:</div>
                                        <div className="info-text">{getNumberOfNights()} ночей</div>
                                    </div>
                                </div>
                            </div>
                            <div className="down-content">
                                <div className="detail-row">
                                    <img src={`${process.env.PUBLIC_URL}/yellow-apartment.svg`} alt=""/>
                                    <div>
                                        <div className="info-h">Ви обрали</div>
                                        <div className="info-text edit">{apartment.short_description}</div>
                                        <NavLink to="/">Змінити вибір</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="gi-child">
                            <div className="apartment-location">
                                <img src={`${process.env.PUBLIC_URL}/location.svg`} alt="location"
                                     className="location-icon"/>
                                16 Kamanina Street flor 23, Одеса, 65000, Україна
                            </div>
                            <div className="map">
                                <div className="blur"></div>
                                <a href="#" className="show-map-btn">
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
                <div className="apartment-additional-info">
                    <form>
                        <div className="apartment-form">
                            <div className="small-heading pb-0">Заповніть ваші дані</div>
                            <div className="info-text">
                                <img src={`${process.env.PUBLIC_URL}/yellow-exclamation.svg`} alt=""/>
                                Введіть вашу дані українською або англійською
                            </div>
                            <div className="account-inputs">
                                <div className="acc-input-row">
                                    <div className="acc-input">
                                        <div>Ім’я</div>
                                        <input type="text" className="form-control"></input>
                                    </div>
                                    <div className="acc-input">
                                        <div>Прізвище</div>
                                        <input type="text" className="form-control"></input>
                                    </div>
                                </div>
                                <div className="acc-input-row">
                                    <div className="acc-input">
                                        <div>E-mail</div>
                                        <input type="email" className="form-control" onChange={e => setEmail(e.target.value)}></input>
                                    </div>
                                    <div className="acc-input">
                                        <div>Підтвердіть ваш E-mail</div>
                                        <input type="email" className="form-control"></input>
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
                                        <div>Для кого бронюєте?</div>
                                        <div className="radio-booking">
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio"
                                                       name="inlineRadioOptions" id="inlineRadio1"
                                                       value="option1"></input>
                                                <label className="form-check-label" htmlFor="inlineRadio1">Для
                                                    себе</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio"
                                                       name="inlineRadioOptions" id="inlineRadio2"
                                                       value="option2"></input>
                                                <label className="form-check-label" htmlFor="inlineRadio2">Для іншої
                                                    особи</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="small-heading pb-0 pt-4">Дані про номер</div>
                                <div className="price-heading pb-0 pt-0">{apartment.short_description}</div>
                                <div className="info-text">
                                    <img src={`${process.env.PUBLIC_URL}/yellow-cross.svg`} alt=""/>
                                    Вартість скасування
                                    <div className="sub-text">(Скасування за тиждень до запланованого заселення
                                        безкоштовне)</div>
                                </div>
                                <div className="acc-input-row pt-2">
                                    <div className="acc-input">
                                        <div>Ім’я та прізвище гостя</div>
                                        <input type="email" className="form-control" required onChange={e => setName(e.target.value)}></input>
                                    </div>
                                    <div className="acc-input">
                                        <div>Номер телефону</div>
                                        <input type="phone" className="form-control" onChange={e => setPhone(e.target.value)}></input>
                                    </div>
                                </div>
                                <div className="acc-input-row pt-1">
                                    <div className="acc-input">
                                        <div className="sub-text">Бронювання номеру реєструється на данну особу</div>
                                    </div>
                                </div>
                                <div className="amenities">
                                    {apartment.amenities.map((item, key) =>
                                        <div key={key}>
                                            {item}
                                        </div>
                                    )}
                                </div>
                                <div className="textarea-row">
                                    <div className="input-heading">Напишіть свій коментар <span className="light">(за бажанням)</span>
                                    </div>
                                    <div className="acc-input">
                                        <textarea name="comment" id="comment" cols="65" rows="3"></textarea>
                                    </div>
                                </div>
                                <div className="small-heading pb-0 pt-4">Час прибуття</div>
                                <div className="info-text b-space">
                                    <img src={`${process.env.PUBLIC_URL}/green_checkmark.svg`} alt="checkmark"/>
                                    Ваш номер буде готовий для заїзду о 14:00
                                </div>
                                <div className="input-heading">Вкажіть орієнтовний час прибуття</div>
                                <div className="acc-input-row pt-0">
                                    <div className="acc-input wide">
                                        <select name="arriving_time" id="arriving_time" className="form-control">
                                            <option disabled selected value>Оберіть ...</option>
                                            <option value="h_14">14:00</option>
                                            <option value="h_15">15:00</option>
                                            <option value="h_16">16:00</option>
                                            <option value="h_17">17:00</option>
                                            <option value="later">Пізніше 17:00</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="continue-booking">
                            <NavLink to={{
                                pathname: `/booking/apartments/${apartment.id}/booking/confirmation`
                            }} state={{ startDate: startDate, endDate: endDate, name: name, phone: phone, email: email }}>
                                <button type="submit" className="btn btn-blue">Продовжити бронювання</button>
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
