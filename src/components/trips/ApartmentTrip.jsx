import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import moment from "moment/moment";
import API from "../../api";

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
                <div className={"trip-block"}>
                    <div className="left-trip-side">
                        <div className="trip-image-side">
                            <div className="image-content"
                                 style={{backgroundImage: `url("${item.apartment?.images && item.apartment?.images[0]}")`}}>
                            </div>
                        </div>
                        <div className="trip-content">
                            <div className="trip-status">
                                {status === "active" ?
                                    <div className="trip-status">?????????? ??????????????</div>
                                    :
                                    <div className="trip-status planned">?????????????????????? ??????????????</div>
                                }
                            </div>
                            <div className="trip-info">
                                <div className="nav-icon house"/>
                                <span>??????????</span>
                                <div className="trip-unit-name">{item.apartment?.name}</div>
                            </div>
                            <div className="trip-desc">
                                <span className="bold">?????????? </span> {moment(item?.from_date).format('ddd, D MMM.')} <span className="bold">?? </span> {moment(item?.from_date).format('hh:mm')}
                                <span className="bold"> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; </span>
                                <span className="bold"> ?????????? </span> {moment(item?.to_date).format('ddd, D MMM.')} <span className="bold">???? </span> {moment(item?.to_date).format('hh:mm')}
                                <span className="bold"> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; </span>
                                {item.apartment?.city}
                            </div>
                            <div className="trip-address">
                                <span className="bold">????????????</span> {item.apartment?.location}
                            </div>
                        </div>
                    </div>
                    <div className="trip-utils">
                        <div className="trip-menu">
                            <NavLink to="#"><img src={`${process.env.PUBLIC_URL}/trip_dots.svg`} alt=""/></NavLink>
                        </div>
                        <NavLink to="chat" className="chat-link">
                            <img src={`${process.env.PUBLIC_URL}/chat.svg`} alt="chat"/>
                            ??????
                        </NavLink>
                    </div>
                </div>
            )}
        </div>
    )
}