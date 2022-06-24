import React, {useState} from "react";
import {NavLink, useLocation, useParams} from "react-router-dom";
import '../../styles/apartmentunit.css'
import API from "../../api";
import amenities from "../../utils/amenities.json"

export default function ExchangeApartmentUnit() {
    const location = useLocation()
    const {startDate, endDate} = location.state
    const {apartment_id} = useParams();
    const [apartment, setApartment] = useState({images: [], amenities: [], details: [], nearby: [], rooms: {room: {quantity: 0}, bathroom:{quantity: 0}}});
    const sliderSettings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        cssEase: "linear",
        className: "slider"
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
    }, [apartment_id]);
    return (
        <div className="container col-10 search">
            <div className="breadcrumb">
                <NavLink end to="/">Головна</NavLink>
                <NavLink end={true} to="/booking/vacation">Житло</NavLink>
                <NavLink end={true} to="/booking/vacation/search">Результати пошуку</NavLink>
                <NavLink end={true} to={{
                    pathname: `/booking/vacation/apartments/${apartment_id}`
                }}>{apartment.city}, Україна ID будинку: {apartment.id}</NavLink>
            </div>
            <div className="top-info">
                <div className="top-part">
                    <div className="name">{apartment.name}</div>
                    <div className="location">
                        <div className="location-city"><a href="src/views/apartment/ApartmentUnit#">{apartment.city}</a>
                        </div>
                        <div className="show-on-map"><a href="src/views/apartment/ApartmentUnit#">Показати на карті</a>
                        </div>
                    </div>
                </div>
                <div className="book">
                    <NavLink to={{
                        pathname: `/booking/vacation/${apartment.id}/confirmation`
                    }} state={{startDate: startDate, endDate: endDate}}
                             className="btn btn-light arrow">Забронювати</NavLink>
                </div>
            </div>
            {apartment.images !== null &&
                <div className="images">
                    {apartment.images.map((item, key) =>
                        <div className="apartment-img" key={key}>
                            <div className="apartment-img-inner" style={{backgroundImage: `url("${item}")`}}></div>
                        </div>
                    )}
                </div>
            }
            <div className="apartment-desc">
                <div className="desc">
                    <div className="small-heading">Опис</div>
                    <div className="ap-desc">{apartment.description}</div>
                    <div className="small-heading">Зручності</div>
                    <div className="amenities">
                        {apartment.amenities.map((item, key) =>
                            <div key={key} className="amenities-row">
                                <img src={`${process.env.PUBLIC_URL}/${amenities[item]}`} alt="amenity"/>
                                {item}
                            </div>
                        )}
                    </div>
                    <div className="small-heading mt-4">Зручності</div>
                    <div className="amenities">
                        {apartment.nearby.map((item, key) =>
                            <div key={key} className="amenities-row">
                                <img src={`${process.env.PUBLIC_URL}/green_checkmark.svg`} alt="amenity"/>
                                {item}
                            </div>
                        )}
                    </div>
                </div>
                <div className="details-specs">
                    <div className="apartment-specifics">
                        <div className="specifics">Інформація</div>
                        <div className="breakfast-info">
                            <div className="breakfast-h">Запропоноване місце обміну</div>
                            <div className="breakfast-spec">{apartment.city}, Україна</div>
                        </div>
                        <div className="breakfast-info">
                            <div className="breakfast-h">Бажане місце обміну</div>
                            {apartment.desired_city ?
                                <div className="breakfast-spec">{apartment.desired_city}, Україна</div>
                                :
                                <div className="breakfast-spec">відкритий для пропозицій</div>
                            }
                        </div>
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
                            <div className="breakfast-h">Тривалість обмінуу</div>
                            <div className="breakfast-spec">{apartment.exchange_duration}</div>
                        </div>
                        {apartment.details.map((item, key) =>
                            <div className="breakfast-spec ap-detail">
                                <img src={`${process.env.PUBLIC_URL}/${amenities[item]}`} alt="detail"/>
                                {item}
                            </div>
                            )}
                    </div>
                </div>
            </div>
            {/*{apartment.reviews.length > 0 &&*/}
            {/*    <div className="reviews-block">*/}
            {/*        <div className="small-heading w-100">Відгуки</div>*/}
            {/*        <Slider {...sliderSettings}>*/}
            {/*            {apartment.reviews.map((review, key) =>*/}
            {/*                <div className="review-wrap" key={key}>*/}
            {/*                    <div className="review">*/}
            {/*                        <div className="up-review-part">*/}
            {/*                            <div className="reviewer">*/}
            {/*                                <img src={`${process.env.PUBLIC_URL}/avatar.png`} alt="location"/>*/}
            {/*                                {review.user.first_name}*/}
            {/*                            </div>*/}
            {/*                            <div className="review-rating">{getStars(review.rating)}</div>*/}
            {/*                        </div>*/}
            {/*                        <div className="review-body">“{review.body}“</div>*/}
            {/*                        <div className="review-date">{moment(review.created_at).format('DD.MM.YYYY')}</div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            )}*/}
            {/*        </Slider>*/}
            {/*    </div>*/}
            {/*}*/}
        </div>
    )

}