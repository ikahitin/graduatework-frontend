import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import moment from "moment/moment";
import API from "../../api";
import {getNumberOfNights} from "../../utils/helpers";

export default function TaxiTrip({status}) {
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem('accessToken');
    const [reservations, setReservations] = useState([]);

    React.useEffect(() => {
        let url = `reservation?reservation_status=${status}&reservation_type=taxi`;
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
            {reservations.map((taxi, key) =>
                <div className="reservation-block" key={key}>
                    <div className="general-info apartment-info taxi-info">
                        <div className="taxi-card">
                            <div className="taxi-type-block">
                                <div className="taxi-img">
                                    <img src={taxi.taxi.image_url} alt={taxi.type}/>
                                </div>
                                <div className="type">{taxi.taxi.type}</div>
                                <div className="taxi-desc">{taxi.taxi.description}</div>
                                <div className="taxi-capacity">
                                    <div className="people-capacity">
                                        <img src={`${process.env.PUBLIC_URL}/yellow_person.svg`}
                                             alt="person"/>
                                        {taxi.taxi.capacity}
                                    </div>
                                    <div className="luggage-capacity">
                                        <img src={`${process.env.PUBLIC_URL}/yellow_suitcase.svg`}
                                             alt="person"/>
                                        {taxi.taxi.luggage_capacity}
                                    </div>
                                </div>
                                <div className="price">UAH {taxi.ride_price}</div>
                            </div>
                        </div>
                        <div className="taxi-details">
                            <div className="up-content">
                                <div className="detail-row">
                                    <img src={`${process.env.PUBLIC_URL}/location-yellow.svg`} alt=""/>
                                    <div>
                                        <div className="info-h">Місце подачі</div>
                                        <div className="info-text">{taxi.start_address}</div>
                                    </div>
                                </div>
                                <div className="detail-row">
                                    <img src={`${process.env.PUBLIC_URL}/location-yellow.svg`} alt=""/>
                                    <div>
                                        <div className="info-h">Місце призначення</div>
                                        <div className="info-text">{taxi.end_address}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="down-content">
                                <div className="detail-row">
                                    <img src={`${process.env.PUBLIC_URL}/yellow-calendar.svg`} alt=""/>
                                    <div>
                                        <div className="info-h">Дата</div>
                                        <div className="info-text">{moment(taxi.from_date).format('ddd, D MMM. YYYY')}</div>
                                    </div>
                                </div>
                                <div className="detail-row">
                                    <img src={`${process.env.PUBLIC_URL}/yellow-clock.svg`} alt=""/>
                                    <div>
                                        <div className="info-h">Час</div>
                                        <div className="info-text">{moment(taxi.from_date).format('HH:mm')}</div>
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