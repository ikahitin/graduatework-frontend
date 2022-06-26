import ScrollToTop from "./ScrollToTop";
import {NavLink, useLocation} from "react-router-dom";
import {getNumberOfNights, getStars, getTotalPrice} from "../utils/helpers";
import React, {useState} from "react";

export default function ApartmentItems({currentItems, startDate, endDate, adults}) {
    const location = useLocation()
    const [bookingState, setBookingState] = useState()
    React.useEffect(() => {
        if (location.state !== null) {
            if (location.state.hasOwnProperty('booking')) {
                setBookingState({"booking": location.state.booking})
            }
        }
    }, []);
    return (
        <>
            {currentItems &&
                currentItems.map((item, key) => (
                    <div className="result-card-cover" key={key}>
                        <ScrollToTop/>
                        <div className="result-card">
                            <div className="image-side">
                                <div className="image-content"
                                     style={{backgroundImage: `url("${item.images && item.images[0]}")`}}>
                                    <div className="favourite">
                                        <img src={`${process.env.PUBLIC_URL}/heart.png`} alt="favourite"/>
                                    </div>
                                </div>
                            </div>
                            <div className="content-side">
                                <div className="top-part">
                                    <div className="name">
                                        <NavLink end={true} to={{pathname: `/booking/apartments/${item.id}`}}>
                                            {item.name}
                                        </NavLink>
                                    </div>
                                    <div className="location">
                                        <div className="location-city">
                                            <a href="src/views/apartment/ApartmentResult#">{item.city}</a>
                                        </div>
                                        <div className="show-on-map">
                                            <a href="src/views/apartment/ApartmentResult#">Показати на
                                                карті</a>
                                        </div>
                                        <div className="centre-distance">{item.distance_from_center} км від
                                            центру
                                        </div>
                                    </div>
                                </div>
                                <div className="bottom-part">
                                    <div className="room-desc">{item.short_description}
                                    </div>
                                    <div className="bottom-content">
                                        <div className="left-content">
                                            <div className="bed-desc">
                                                2 односпальні ліжка
                                            </div>
                                            <div className="room-rating">
                                                <span>{item.rating}</span>
                                                <div className="stars">
                                                    {getStars(item.rating)}
                                                </div>
                                            </div>
                                            <div className="reviews">
                                                {item.reviews.length > 0 &&
                                                    <div className="reviews-images">
                                                        <div className="img"
                                                             style={{backgroundImage: `url("/profile-pic.jpeg")`}}/>
                                                        <div className="img"
                                                             style={{backgroundImage: `url("/profile-pic2.jpeg")`}}/>
                                                        <div className="img"
                                                             style={{backgroundImage: `url("/profile-pic3.jpeg")`}}/>
                                                    </div>
                                                }
                                                <span>{item.reviews.length} відгуків</span>
                                            </div>
                                        </div>
                                        <div className="right-content">
                                            <div
                                                className="price">UAH {getTotalPrice(item.price, startDate, endDate)}</div>
                                            <div
                                                className="duration">{getNumberOfNights(startDate, endDate)} ночей, {adults} дорослих
                                            </div>
                                            <div className="book">
                                                <NavLink to={{
                                                    pathname: `/booking/apartments/${item.id}/booking`
                                                }} state={{startDate: startDate, endDate: endDate, ...bookingState}}
                                                         className="btn btn-light arrow">Забронювати</NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </>
    );
}