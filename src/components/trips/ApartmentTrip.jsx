import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import moment from "moment/moment";
import API from "../../api";
import {getNumberOfNights, getStars} from "../../utils/helpers";

export default function ApartmentTrip({status}) {
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem('accessToken');
    const [reservations, setReservations] = useState([]);

    React.useEffect(() => {
        let url = `reservation?reservation_status=${status}&reservation_type=apartment`;
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
                // <div className="reservation-block" key={key}>
                //     <div className="apartment-info">
                //         <div className="result-card-cover">
                //             <div className="result-card">
                //                 <div className="image-side">
                //                     <div className="image-content"
                //                          style={{backgroundImage: `url("${item.apartment.images && item.apartment.images[0]}")`}}>
                //                     </div>
                //                 </div>
                //                 <div className="content-side">
                //                     <div className="top-part">
                //                         <div className="name">
                //                             <NavLink end={true} to={{
                //                                 pathname: `/booking/apartments/${item.apartment_id}`
                //                             }}>{item.apartment.name}</NavLink>
                //                         </div>
                //                         <div className="location">
                //                             <div className="location-city">
                //                                 <NavLink to="#">{item.apartment.city}</NavLink>
                //                             </div>
                //                             <div className="show-on-map">
                //                                 <NavLink to="#">Показати на карті</NavLink>
                //                             </div>
                //                             <div className="centre-distance">
                //                                 {item.apartment.distance_from_center} км від центру
                //                             </div>
                //                         </div>
                //                     </div>
                //                     <div className="bottom-part">
                //                         <div className="room-desc">{item.apartment.short_description}
                //                         </div>
                //                         <div className="bottom-content">
                //                             <div className="left-content">
                //                                 <div className="bed-desc">
                //                                     2 односпальні ліжка
                //                                 </div>
                //                                 <div className="room-rating">
                //                                     <span>{item.apartment.rating}</span>
                //                                     <div className="stars">
                //                                         {getStars(item.apartment.rating)}
                //                                     </div>
                //                                 </div>
                //                                 <div className="reviews">
                //                                     <div className="reviews-images">
                //                                         <div className="img"
                //                                              style={{backgroundImage: `url("/profile-pic.jpeg")`}}/>
                //                                         <div className="img"
                //                                              style={{backgroundImage: `url("/profile-pic2.jpeg")`}}/>
                //                                         <div className="img"
                //                                              style={{backgroundImage: `url("/profile-pic3.jpeg")`}}/>
                //                                     </div>
                //                                     <span>18 відгуків</span>
                //                                 </div>
                //                             </div>
                //                         </div>
                //                     </div>
                //                 </div>
                //             </div>
                //         </div>
                //     </div>
                //     <div className="general-info-block">
                //         <div className="gi-child details bottom-space">
                //             <div className="up-content">
                //                 <div className="detail-row">
                //                     <img src={`${process.env.PUBLIC_URL}/yellow-calendar.svg`} alt=""/>
                //                     <div>
                //                         <div className="info-h">Дата заїзду</div>
                //                         <div
                //                             className="info-text">{moment(item.from_date).format('ddd, D MMM. YYYY')}</div>
                //                     </div>
                //                 </div>
                //                 <div className="detail-row">
                //                     <img src={`${process.env.PUBLIC_URL}/yellow-clock.svg`} alt=""/>
                //                     <div>
                //                         <div className="info-h">Час заїзду</div>
                //                         <div className="info-text">З 14:00</div>
                //                     </div>
                //                 </div>
                //             </div>
                //             <div className="down-content">
                //                 <div className="detail-row">
                //                     <img src={`${process.env.PUBLIC_URL}/yellow-calendar.svg`} alt=""/>
                //                     <div>
                //                         <div className="info-h">Дата заїзду</div>
                //                         <div
                //                             className="info-text">{moment(item.to_date).format('ddd, D MMM. YYYY')}</div>
                //                     </div>
                //                 </div>
                //                 <div className="detail-row">
                //                     <img src={`${process.env.PUBLIC_URL}/yellow-clock.svg`} alt=""/>
                //                     <div>
                //                         <div className="info-h">Час виїзду</div>
                //                         <div className="info-text">До 12:00</div>
                //                     </div>
                //                 </div>
                //             </div>
                //         </div>
                //         <div className="gi-child details without-edit">
                //             <div className="up-content">
                //                 <div className="detail-row">
                //                     <img src={`${process.env.PUBLIC_URL}/yellow-apartment.svg`} alt=""/>
                //                     <div>
                //                         <div className="info-h">Загальний термін перебування:</div>
                //                         <div
                //                             className="info-text">{getNumberOfNights(item.from_date, item.to_date)} ночей
                //                         </div>
                //                     </div>
                //                 </div>
                //             </div>
                //             <div className="down-content">
                //                 <div className="detail-row">
                //                     <img src={`${process.env.PUBLIC_URL}/yellow-apartment.svg`} alt=""/>
                //                     <div>
                //                         <div className="info-h">Ви обрали</div>
                //                         <div className="info-text">{item.apartment.short_description}</div>
                //                     </div>
                //                 </div>
                //             </div>
                //         </div>
                //         <div className="gi-child">
                //             <div className="apartment-location">
                //                 <img src={`${process.env.PUBLIC_URL}/location.svg`} alt="location"
                //                      className="location-icon"/>
                //                 16 Kamanina Street flor 23, Одеса, 65000, Україна
                //             </div>
                //             <div className="map">
                //                 <div className="blur"></div>
                //                 <NavLink to="#" className="show-map-btn">
                //                     Показати на карті
                //                 </NavLink>
                //             </div>
                //         </div>
                //     </div>
                //     <div className="cancel-block">
                //         <button className="btn btn-light no-arrow">Скасувати</button>
                //     </div>
                // </div>
                <div className={"trip-block"}>
                    <div className="left-trip-side">
                        <div className="trip-image-side">
                            <div className="image-content"
                                 style={{backgroundImage: `url("${item.apartment.images && item.apartment.images[0]}")`}}>
                            </div>
                        </div>
                        <div className="trip-content">
                            <div className="trip-status">
                                {status === "active" ?
                                    <div className="trip-status">Діюча подорож</div>
                                    :
                                    <div className="trip-status planned">Запланована подорож</div>
                                }
                            </div>
                            <div className="trip-info">
                                <div className="nav-icon house"/>
                                <span>Житло</span>
                                <div className="trip-unit-name">{item.apartment.name}</div>
                            </div>
                            <div className="trip-desc">
                                <span className="bold">Заїзд </span> {moment(item.from_date).format('ddd, D MMM.')} <span className="bold">з </span> {moment(item.from_date).format('hh:mm')}
                                <span className="bold"> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; </span>
                                <span className="bold"> Виїзд </span> {moment(item.to_date).format('ddd, D MMM.')} <span className="bold">до </span> {moment(item.to_date).format('hh:mm')}
                                <span className="bold"> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; </span>
                                {item.apartment.city}
                            </div>
                            <div className="trip-address">
                                <span className="bold">Адреса</span> {item.apartment.location}
                            </div>
                        </div>
                    </div>
                    <div className="trip-utils">
                        <div className="trip-menu">
                            <NavLink to="#"><img src={`${process.env.PUBLIC_URL}/trip_dots.svg`} alt=""/></NavLink>
                        </div>
                        <NavLink to="chat" className="chat-link">
                            <img src={`${process.env.PUBLIC_URL}/chat.svg`} alt="chat"/>
                            Чат
                        </NavLink>
                    </div>
                </div>
            )}
        </div>
    )
}