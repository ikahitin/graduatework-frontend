import React, {useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import '../styles/apartmentunit.css'
import Slider from "react-slick";
import getStars from "../utils/utils";
import moment from "moment/moment";

export default function ApartmentUnit() {
    const {apartment_id} = useParams();
    const [apartment, setApartment] = useState({images: [], amenities: [], reviews: []});

    const sliderSettings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        cssEase: "linear",
        className: "slider"
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
            <div className="breadcrumb">
                <NavLink end to="/">Головна</NavLink>
                <NavLink end={true} to="/booking/apartments">Житло</NavLink>
                <NavLink end={true} to="/booking/apartments/search" >Результати пошуку</NavLink>
                <NavLink end={true} to={{
                    pathname: `/booking/apartments/${apartment_id}`
                }}>{apartment.name}</NavLink>
            </div>
            <div className="top-info">
                <div className="top-part">
                    <div className="name">{apartment.name}</div>
                    <div className="location">
                        <div className="location-city"><a href="#">{apartment.city}</a></div>
                        <div className="show-on-map"><a href="#">Показати на карті</a></div>
                        <div className="centre-distance">{apartment.distance_from_center} км від центру</div>
                    </div>
                </div>
                <div className="book">
                    <button className="btn btn-light arrow">Забронювати</button>
                </div>
            </div>
            <div className="images">
                {apartment.images.map((item, key) =>
                    <div className="apartment-img" key={key}>
                        <div className="apartment-img-inner" style={{backgroundImage: `url("${item}")`}}></div>
                    </div>
                )}
            </div>
            <div className="apartment-desc">
                <div className="desc">
                    <div className="small-heading">Опис</div>
                    <div className="ap-desc">{apartment.description}</div>
                    <div className="small-heading">Зручності</div>
                    <div className="amenities">
                        {apartment.amenities.map((item, key) =>
                            <div key={key}>
                                {item}
                            </div>
                        )}
                        </div>
                </div>
                <div className="details-specs">
                    <div className="apartment-specifics">
                        <div className="specifics">Особливості помешкання</div>
                        <div className="specifics-desc">Ідеально підходить для того, щоб гарно відпочити</div>
                        <div className="apartment-location">
                            <img src={`${process.env.PUBLIC_URL}/location.svg`} alt="location" className="location-icon"/>
                            16 Kamanina Street flor 23, Одеса, 65000, Україна </div>
                        <div className="breakfast-info">
                            <div className="breakfast-h">Інформація про сніданок</div>
                            <div className="breakfast-spec">Американський</div>
                        </div>
                    </div>
                    <div className="map">
                        <div className="blur"></div>
                        <a href="#"  className="show-map-btn">
                            Показати на карті
                        </a>
                    </div>
                </div>
            </div>
            {apartment.reviews.length > 0 &&
                <div className="reviews">
                    <div className="small-heading w-100">Відгуки</div>
                    <Slider {...sliderSettings}>
                        {apartment.reviews.map((review, key) =>
                            <div className="review-wrap">
                                <div className="review">
                                    <div className="up-review-part">
                                        <div className="reviewer">
                                            <img src={`${process.env.PUBLIC_URL}/avatar.png`} alt="location"/>
                                            {review.user.first_name}
                                        </div>
                                        <div className="review-rating">{getStars(review.rating)}</div>
                                    </div>
                                    <div className="review-body">“{review.body}“</div>
                                    <div className="review-date">{moment(review.created_at).format('DD.MM.YYYY')}</div>
                                </div>
                            </div>
                        )}
                    </Slider>
                </div>
            }
        </div>
    )

}