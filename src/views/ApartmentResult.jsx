import {NavLink, useSearchParams} from "react-router-dom";
import '../styles/apartmentresults.css'
import React from "react";
import moment from "moment/moment";
import Filters from "../components/Filters";
import DateRangePicker from "react-bootstrap-daterangepicker";
import ScrollToTop from "../components/ScrollToTop";

export default function ApartmentResult() {
    const [searchParams, setSearchParams] = useSearchParams();
    const destination = searchParams.get("destination");
    const startDate = searchParams.get("start");
    const endDate = searchParams.get("end");
    const adults = searchParams.get("adults")
    const children = searchParams.get("children")
    const rooms = searchParams.get("rooms")
    const quantity = `${adults} дорослих, ${rooms} номер`
    const [results, setResults] = React.useState([]);

    function getNumberOfNights() {
        if (startDate !== null && endDate !== null) {
            const timeDiff = Math.abs(moment(startDate).toDate().getTime() - moment(endDate).toDate().getTime());
            return Math.ceil(timeDiff / (1000 * 3600 * 24));
        }
    }

    function getTotalPrice(price) {
        return getNumberOfNights() * price
    }

    function getStars(rating) {
        if (rating % 1 === 0) {
            return [...Array(rating)].map((e, i) => <img src={`${process.env.PUBLIC_URL}/star.svg`} alt="star"/>)

        } else {
            const stars = [...Array(Math.floor(rating))].map((e, i) => <img src={`${process.env.PUBLIC_URL}/star.svg`}
                                                                            alt="star"/>)
            stars.push(<img src={`${process.env.PUBLIC_URL}/half-star-rating.svg`} alt="star"/>)
            return stars
        }
    }

    React.useEffect(() => {
        const city = `city=${destination}`
        const dates = `start=${startDate}&end=${moment(endDate).format('YYYY-MM-DD')}`
        const details = `adults=${adults}&children=${children}&rooms=${rooms}`
        const url = `http://127.0.0.1:8000/apartment?${city}&${dates}&${details}`;

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setResults(json)
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, []);

    return(
        <div className="container col-10 search">
            <ScrollToTop />
            <div className="breadcrumb">
                <NavLink end to="/">Головна</NavLink>
                <NavLink end={true} to="/booking/apartments">Житло</NavLink>
                <NavLink end={true} to="/booking/apartments/search">Результати пошуку</NavLink>
            </div>
            <div className="container d-flex p-0">
                <div className="filters">
                    <div className="filter">
                        <span className="lookup">Шукати</span>
                        <div className="search-options">
                            <div className="input-block">
                                <span className="input-tip">Місце</span>
                                <input type="text" className="form-control simple house-icon-dark" defaultValue={destination}
                                        list="datalistOptions"/>
                                <datalist id="datalistOptions">
                                    <option value="Одеса"/>
                                    <option value="Славське"/>
                                    <option value="Джарилгач"/>
                                    <option value="Яремче"/>
                                </datalist>
                            </div>
                            <div className="input-block">
                                <span className="input-tip">Дата заїзду</span>
                                <DateRangePicker
                                    initialSettings={{
                                        singleDatePicker: true,
                                        startDate: moment(startDate).format('DD.MM.YYYY'),
                                        locale: {
                                            applyLabel: "Прийняти",
                                            format: 'DD.MM.YYYY'
                                        }
                                    }}>
                                    <input type="text" className="form-control simple calendar-icon-dark" placeholder="Вкажіть дату заїзду"/>
                                </DateRangePicker>
                            </div>
                            <div className="input-block">
                                <span className="input-tip">Дата виїзду</span>
                                <DateRangePicker
                                    initialSettings={{
                                        singleDatePicker: true,
                                        startDate: moment(endDate).format('DD.MM.YYYY'),
                                        locale: {
                                            applyLabel: "Прийняти",
                                            format: 'DD.MM.YYYY'
                                        }
                                    }}>
                                    <input type="text" className="form-control simple calendar-icon-dark" placeholder="Вкажіть дату виїзду"/>
                                </DateRangePicker>
                            </div>
                            <div className="input-block">
                                <span className="input-tip">Кількість людей</span>
                                <input type="text" className="form-control simple person-icon-dark" placeholder="Вкажіть дату виїзду"
                                       defaultValue={quantity}/>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-blue w-100">Знайти</button>
                    </div>
                    <Filters/>
                </div>
                <div className="results">
                    <div className="results-len">
                        Знайдено: <span className="len">{results.length} результатів</span>
                    </div>
                        <div className="result-cards">
                            {results.map((item, key) =>
                            <div className="result-card-cover" key={key}>
                                <div className="result-card">
                                    <div className="image-side">
                                        <div className="image-content" style={{backgroundImage: `url("${item.images && item.images[0]}")`}}>
                                            {/*<div className="favourite">*/}
                                            {/*    <img src={`${process.env.PUBLIC_URL}/favourite.svg`} alt="favourite"/>*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                    <div className="content-side">
                                        <div className="top-part">
                                            <div className="name">{item.name}</div>
                                            <div className="location">
                                                <div className="location-city">
                                                    <a href="#">{item.city}</a>
                                                </div>
                                                <div className="show-on-map">
                                                    <a href="#">Показати на карті</a>
                                                </div>
                                                <div className="centre-distance">{item.distance_from_center} км від центру</div>
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
                                                        {/*<img src={`${process.env.PUBLIC_URL}/half-star-rating.svg`} alt="star"/>*/}
                                                    </div>
                                                    <div className="reviews">
                                                        <div className="reviews-images">
                                                            <div className="img" style={{backgroundImage: `url("/profile-pic.jpeg")`}}/>
                                                            <div className="img" style={{backgroundImage: `url("/profile-pic2.jpeg")`}}/>
                                                            <div className="img" style={{backgroundImage: `url("/profile-pic3.jpeg")`}}/>
                                                        </div>
                                                        <span>18 відгуків</span>
                                                    </div>
                                                </div>
                                                <div className="right-content">
                                                    <div className="price">UAH {getTotalPrice(item.price)}</div>
                                                    <div className="duration">{getNumberOfNights()} ночей, {adults} дорослих</div>
                                                    <div className="book">
                                                        <button className="btn btn-light arrow">Забронювати</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                )}
                        </div>
                </div>
            </div>
        </div>
    )
}
