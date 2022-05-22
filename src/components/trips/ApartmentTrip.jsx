import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import getStars from "../../utils/utils";
import moment from "moment/moment";
import API from "../../api";

export default function ApartmentTrip(data) {
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem('accessToken');
    const [reservations, setReservations] = useState([]);

    function getNumberOfNights(startDate, endDate) {
        if (startDate !== null && endDate !== null) {
            const timeDiff = Math.abs(moment(startDate).toDate().getTime() - moment(endDate).toDate().getTime());
            return Math.ceil(timeDiff / (1000 * 3600 * 24));
        }
    }

    React.useEffect(() => {
        let url = `reservation?reservation_status=${data["status"]}&reservation_type=apartment`;
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
    }, []);

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
                <div className="reservation-block">
                    <div className="apartment-info">
                        <div className="result-card-cover">
                            <div className="result-card">
                                <div className="image-side">
                                    <div className="image-content"
                                         style={{backgroundImage: `url("${item.apartment.images && item.apartment.images[0]}")`}}>
                                    </div>
                                </div>
                                <div className="content-side">
                                    <div className="top-part">
                                        <div className="name">
                                            <NavLink end={true} to={{
                                                pathname: `/booking/apartments/${item.apartment_id}`
                                            }}>{item.apartment.name}</NavLink>
                                        </div>
                                        <div className="location">
                                            <div className="location-city">
                                                <a href="#">{item.apartment.city}</a>
                                            </div>
                                            <div className="show-on-map">
                                                <a href="#">Показати на карті</a>
                                            </div>
                                            <div className="centre-distance">{item.apartment.distance_from_center} км
                                                від
                                                центру
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bottom-part">
                                        <div className="room-desc">{item.apartment.short_description}
                                        </div>
                                        <div className="bottom-content">
                                            <div className="left-content">
                                                <div className="bed-desc">
                                                    2 односпальні ліжка
                                                </div>
                                                <div className="room-rating">
                                                    <span>{item.apartment.rating}</span>
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
                    <div className="general-info-block">
                        <div className="gi-child details bottom-space">
                            <div className="up-content">
                                <div className="detail-row">
                                    <img src={`${process.env.PUBLIC_URL}/yellow-calendar.svg`} alt=""/>
                                    <div>
                                        <div className="info-h">Дата заїзду</div>
                                        <div
                                            className="info-text">{moment(item.from_date).format('ddd, D MMM. YYYY')}</div>
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
                                        <div
                                            className="info-text">{moment(item.to_date).format('ddd, D MMM. YYYY')}</div>
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
                        <div className="gi-child details without-edit">
                            <div className="up-content">
                                <div className="detail-row">
                                    <img src={`${process.env.PUBLIC_URL}/yellow-apartment.svg`} alt=""/>
                                    <div>
                                        <div className="info-h">Загальний термін перебування:</div>
                                        <div
                                            className="info-text">{getNumberOfNights(item.from_date, item.to_date)} ночей
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="down-content">
                                <div className="detail-row">
                                    <img src={`${process.env.PUBLIC_URL}/yellow-apartment.svg`} alt=""/>
                                    <div>
                                        <div className="info-h">Ви обрали</div>
                                        <div className="info-text">{item.apartment.short_description}</div>
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
                    <div className="cancel-block">
                        <button className="btn btn-light no-arrow">Скасувати</button>
                    </div>
                </div>
            )}
        </div>
    )
}