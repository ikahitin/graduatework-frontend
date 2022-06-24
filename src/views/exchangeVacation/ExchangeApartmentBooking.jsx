import {NavLink, useLocation, useNavigate, useParams} from "react-router-dom";
import '../../styles/apartmentbooking.css'
import React, {useState} from "react";
import ScrollToTop from "../../components/ScrollToTop";
import moment from "moment/moment";
import API from "../../api";
import amenities from "../../utils/amenities.json";

export default function ExchangeApartmentBooking() {
    const navigate = useNavigate();
    const location = useLocation()
    const {startDate, endDate} = location.state

    const {apartment_id} = useParams();
    const [apartment, setApartment] = useState({images: [], amenities: [], reviews: [], details: [], user: {first_name:"", last_name: "", email: ""}, nearby: [], rooms: {room: {quantity: 0}, bathroom:{quantity: 0}}, people_quantity: {adults: {quantity: 0}, children:{quantity: 0}}});

    function handleBooking(e) {
        e.preventDefault()
        const form = e.target;
        const url = `exchange_apartment/${apartment_id}/reservation`;
        const data = {
            "from_date": startDate,
            "to_date": endDate,
            "guest_name": form.first_name.value + " " + form.last_name.value,
            "guest_phone": form.phone.value,
            "user_email": form.email.value,
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
        const url = `exchange_apartment/${apartment_id}`;

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
                <NavLink end={true} to="/booking/vacation">Житло</NavLink>
                <NavLink end={true} to="/booking/vacation/search">Результати пошуку</NavLink>
                <NavLink end={true} to={{
                    pathname: `/booking/vacation/apartments/${apartment_id}`
                }}>{apartment.city}, Україна ID будинку: {apartment.id}</NavLink>
                <NavLink end={true} to={{
                    pathname: `/booking/vacation/${apartment_id}/confirmation`
                }}>Бронювання</NavLink>
            </div>
            <div className="booking-info">
                <div className="apartment-info">
                    <div className="small-heading fw-600">Перевірте інформацію для бронювання</div>
                    <div className="result-card-cover exchange">
                        <div className="result-card">
                            <div className="image-side">
                                <div className="image-content"
                                     style={{backgroundImage: `url("${apartment.images && apartment.images[0]}")`}}>
                                    <div className="favourite">
                                        <img src={`${process.env.PUBLIC_URL}/heart.png`} alt="favourite"/>
                                    </div>
                                </div>
                            </div>
                            <div className="content-side">
                                <div className="top-part">
                                    <div className="name">
                                        <NavLink end={true} to={{pathname: `/booking/vacation/apartments/${apartment.id}`}}>
                                            {apartment.name}
                                        </NavLink>
                                    </div>
                                    <div className="location">
                                        <div className="location-city">
                                            <a href="src/views/apartment/ApartmentResult#">{apartment.city}</a>
                                        </div>
                                        <div className="show-on-map">
                                            <a href="src/views/apartment/ApartmentResult#">Показати на
                                                карті</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="middle-part">
                                    <div className="up-content">
                                        <div className="detail-row">
                                            <img src={`${process.env.PUBLIC_URL}/yellow-calendar.svg`} alt=""/>
                                            <div>
                                                <div className="info-h">Дата</div>
                                                <div className="info-text">відкритий для пропозицій</div>
                                            </div>
                                        </div>
                                        <div className="detail-row">
                                            <img src={`${process.env.PUBLIC_URL}/location-yellow.svg`} alt=""/>
                                            <div>
                                                <div className="info-h">Місце</div>
                                                {apartment.desired_city ?
                                                    <div className="info-text">{apartment.desired_city}</div>
                                                    :
                                                    <div className="info-text">відкритий для пропозицій</div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="down-content">
                                        <div className="detail-row">
                                            <img src={`${process.env.PUBLIC_URL}/yellow-calendar.svg`} alt=""/>
                                            <div>
                                                <div className="info-h">Тривалість</div>
                                                <div className="info-text">{apartment.exchange_duration}</div>
                                            </div>
                                        </div>
                                        <div className="detail-row">
                                            <img src={`${process.env.PUBLIC_URL}/yellow_person.svg`} alt=""/>
                                            <div>
                                                <div className="info-h">Кількість людей</div>
                                                <div className="info-text">до {apartment.people_quantity.adults.quantity} дорослих та {apartment.people_quantity.children.quantity} дітей</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bottom-part">
                                    <div className="room-desc">{apartment.short_description}
                                    </div>
                                    <div className="bottom-content">
                                        <div className="left-content">
                                        </div>
                                        <div className="right-content">
                                            <div className="book">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="edit-data">
                            <NavLink to={{
                                pathname: `/booking/apartments/${apartment.id}/booking`
                            }} state={{startDate, endDate}}>Змінити
                                дані</NavLink>
                        </div>
                    </div>
                </div>
                <div className="apartment-additional-info exchange-info">
                        <div className="apartment-form">
                            <div className="small-heading pb-0">Інформація про власника</div>
                            <div className="account-inputs">
                                <div className="acc-input-row">
                                    <div className="breakfast-info">
                                        <div className="breakfast-h">Ім’я</div>
                                        <div className="breakfast-spec">{apartment.user.first_name} {apartment.user.last_name}</div>
                                    </div>
                                    <div className="breakfast-info">
                                        <div className="breakfast-h">E-mail</div>
                                        <div className="breakfast-spec">{apartment.user.email}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="small-heading pb-0">Данні для обміну</div>
                            <div className="account-inputs">
                                <div className="acc-input-row">
                                    <div className="breakfast-info">
                                        <div className="breakfast-h">Запропоноване місце обміну</div>
                                        <div className="breakfast-spec">{apartment.city}, Україна</div>
                                    </div>
                                    <div className="breakfast-info">
                                        <div className="breakfast-h">Бажане місце обміну</div>
                                        {apartment.desired_city ?
                                            <div className="breakfast-spec">{apartment.desired_city}, Україна</div>
                                            :
                                            <div className="breakfast-spec green">відкритий для пропозицій</div>
                                        }
                                    </div>
                                </div>
                                <div className="acc-input-row">
                                    <div className="breakfast-info">
                                        <div className="breakfast-h">Апартаменти</div>
                                        <div className="breakfast-spec">
                                            <b>{apartment.rooms.room.quantity}</b> кімнат&nbsp;&nbsp;&nbsp;<b>{apartment.rooms.bathroom.quantity}</b> ванні кімнати
                                        </div>
                                    </div>
                                    <div className="breakfast-info">
                                        <div className="breakfast-h">Бажана дата обміну</div>
                                        <div className="breakfast-spec green">Відкритий до пропозицій</div>
                                    </div>
                                    <div className="breakfast-info">
                                        <div className="breakfast-h">Тривалість обміну</div>
                                        <div className="breakfast-spec">{apartment.exchange_duration}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="small-heading pb-0 mb-4">Важливі критерії</div>
                            {apartment.details.map((item, key) =>
                                <div className="breakfast-spec ap-detail">
                                    <img src={`${process.env.PUBLIC_URL}/${amenities[item]}`} alt="detail"/>
                                    {item}
                                </div>
                            )}
                        </div>
                </div>
                <div className="apartment-additional-info">
                    <form onSubmit={handleBooking}>
                        <div className="apartment-form">
                            <div className="small-heading pb-0">Заповніть ваші дані</div>
                            <div className="info-text">
                                <img src={`${process.env.PUBLIC_URL}/yellow-exclamation.svg`} alt=""/>
                                Ваш запит до обміну буде надісланий на пошту власника апартаментів. Після підтвердження запиту вам надійте повідомлення в чаті
                            </div>
                            <div className="account-inputs">
                                <div className="acc-input-row">
                                    <div className="acc-input">
                                        <div>Ім’я</div>
                                        <input type="text" className="form-control" name="first_name" required/>
                                    </div>
                                    <div className="acc-input">
                                        <div>Прізвище</div>
                                        <input type="text" className="form-control" name="last_name" required/>
                                    </div>
                                </div>
                                <div className="acc-input-row">
                                    <div className="acc-input">
                                        <div>E-mail</div>
                                        <input type="email" name="email" className="form-control" required/>
                                    </div>
                                    <div className="acc-input">
                                        <div>Номер телефону</div>
                                        <input type="phone" name="phone" className="form-control" required/>
                                    </div>
                                </div>
                                <div className="acc-input-row pt-1">
                                    <div className="acc-input">
                                        <div className="sub-text">Підтвердження бронювання буде відправлено на цю
                                            адресу
                                        </div>
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
