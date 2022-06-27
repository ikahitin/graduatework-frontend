import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import moment from "moment/moment";
import API from "../../api";

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
                <div className="trip-block car">
                    <div className="left-trip-side">
                        <div className="trip-image-side">
                            <div className="image-content"
                                                         style={{backgroundImage: `url("${item.car?.image_url}")`}}>
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
                                <div className="nav-icon car"/>
                                <span>Оренда автомобіля</span>
                                <div className="trip-unit-name">{item?.car?.name}</div>
                            </div>
                            <div className="trip-desc">
                                <span className="bold">Отримання </span> {moment(item?.from_date).format('ddd, D MMM.')}
                                <span className="bold">з </span> {moment(item?.from_date).format('hh:mm')}
                                <span className="bold"> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; </span>
                                <span className="bold"> Повернення </span> {moment(item?.to_date).format('ddd, D MMM.')} <span
                                className="bold">до </span> {moment(item?.to_date).format('HH:mm')}
                            </div>
                            <div className="trip-address">
                                <span className="bold">Адреса</span> Avis.ua - Львів центр міста
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