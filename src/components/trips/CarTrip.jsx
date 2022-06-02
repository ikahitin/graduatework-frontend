import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import moment from "moment/moment";
import API from "../../api";
import {getNumberOfNights} from "../../utils/helpers";

export default function CarTrip({status}) {
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem('accessToken');
    const [reservations, setReservations] = useState([]);

    React.useEffect(() => {
        let url = `reservation?reservation_status=${status}&reservation_type=car`;
        const fetchData = async () => {
            try {
                const response = await API({
                    method: 'get',
                    url: url,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });
                const json = await response.data;
                setReservations(json)
                setIsLoading(false)
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, [status, token]);

    if (isLoading) {
        return (
            <div className="container d-flex justify-content-center pt-5">
                <div className="spinner-border text-secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <div>
            {reservations.map((item, key) =>
                <div className="reservation-block" key={key}>
                    <div className="apartment-info">
                        <div className="result-card-cover">
                            <div className="result-card car-card">
                                <div className="image-side">
                                    {item.car.image_url ?
                                        <div className="image-content"
                                             style={{backgroundImage: `url("${item.car.image_url}")`}}>
                                        </div>
                                        : null}
                                    <div className="provider">
                                        Постачальник
                                        <img src={`${process.env.PUBLIC_URL}/avis.png`} alt="person"/>
                                    </div>
                                </div>
                                <div className="content-side mt-4 mb-4">
                                    <div className="top-part">
                                        <div className="name">
                                            <NavLink end={true} to={{
                                                pathname: `/booking/apartments/${item.car.id}`
                                            }}>{item.car.name}</NavLink>
                                        </div>
                                        <div className="car-category-name">
                                            {item.car.category}
                                        </div>
                                        <div className="car-specs">
                                            <div className="capacity">
                                                <img src={`${process.env.PUBLIC_URL}/yellow_person.svg`} alt="person"/>
                                                {item.car.capacity}
                                            </div>
                                            <div className="doors">
                                                <img src={`${process.env.PUBLIC_URL}/yellow_door.svg`} alt="door"/>
                                                {item.car.doors}
                                            </div>
                                            {item.car.ac_included && <div className="ac">
                                                <img src={`${process.env.PUBLIC_URL}/yellow_ac.svg`} alt="ac"/>
                                                Кондиціонер
                                            </div>}
                                            <div className="transmission">
                                                <img src={`${process.env.PUBLIC_URL}/yellow_transmission.svg`} alt="transmission"/>
                                                {item.car.transmission}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="middle-part">
                                        <div className="location-and-mileage">
                                            <div className="car-location">
                                                <div>Локація</div>
                                                <div>
                                                    <img src={`${process.env.PUBLIC_URL}/location2.svg`} alt="location"/>
                                                    {item.car.location}
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
                                                    {item.car.insurance.theft &&
                                                        <div className="insurance">
                                                            <img src={`${process.env.PUBLIC_URL}/green_checkmark.svg`} alt="ac"/>
                                                            Страхування на випадок крадіжки автомобіля
                                                        </div>
                                                    }
                                                    {item.car.insurance.road_accident &&
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
                        <div className="general-info-block">
                            <div className="gi-child details bottom-space">
                                <div className="up-content">
                                    <div className="detail-row">
                                        <img src={`${process.env.PUBLIC_URL}/yellow-calendar.svg`} alt=""/>
                                        <div>
                                            <div className="info-h">Дата отримання</div>
                                            <div className="info-text">{moment(item.from_date).format('ddd, D MMM. YYYY')}</div>
                                        </div>
                                    </div>
                                    <div className="detail-row">
                                        <img src={`${process.env.PUBLIC_URL}/yellow-clock.svg`} alt=""/>
                                        <div>
                                            <div className="info-h">Час отримання</div>
                                            <div className="info-text">{moment(item.from_date).format('HH:mm')}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="down-content">
                                    <div className="detail-row">
                                        <img src={`${process.env.PUBLIC_URL}/yellow-calendar.svg`} alt=""/>
                                        <div>
                                            <div className="info-h">Дата повернення</div>
                                            <div className="info-text">{moment(item.to_date).format('ddd, D MMM. YYYY')}</div>
                                        </div>
                                    </div>
                                    <div className="detail-row">
                                        <img src={`${process.env.PUBLIC_URL}/yellow-clock.svg`} alt=""/>
                                        <div>
                                            <div className="info-h">Час повернення</div>
                                            <div className="info-text">{moment(item.to_date).format('HH:mm')}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="gi-child details without-edit">
                                <div className="up-content">
                                    <div className="detail-row">
                                        <img src={`${process.env.PUBLIC_URL}/yellow-apartment.svg`} alt=""/>
                                        <div>
                                            <div className="info-h">Загальний термін оренди:</div>
                                            <div className="info-text">{getNumberOfNights(item.from_date, item.to_date)} днів</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="down-content">
                                    <div className="detail-row">
                                        <img src={`${process.env.PUBLIC_URL}/yellow-apartment.svg`} alt=""/>
                                        <div>
                                            <div className="info-h">Ви обрали</div>
                                            <div className="info-text">{item.car.name}</div>
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
                    <div className="cancel-block">
                        <button className="btn btn-light no-arrow">Скасувати</button>
                    </div>
                </div>
            )}
        </div>
    )
}