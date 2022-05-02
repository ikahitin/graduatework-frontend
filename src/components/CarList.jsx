import React, {useState} from "react";
import {NavLink, useSearchParams} from "react-router-dom";
import moment from "moment/moment";
import Email from "./Email";

export default function CarList(data) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [cars, setCars] = React.useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [startDate, setStartDate] = useState(searchParams.get("start"));
    const [endDate, setEndDate] = useState(searchParams.get("end"));

    function getNumberOfDays() {
        if (startDate !== null && endDate !== null) {
            console.log(startDate, endDate)
            const timeDiff = Math.abs(moment(startDate).toDate().getTime() - moment(endDate).toDate().getTime());
            return Math.ceil(timeDiff / (1000 * 3600 * 24));
        }

    }

    function getTotalPrice(price) {
        return getNumberOfDays() * price
    }

    React.useEffect(() => {
        let url = `http://127.0.0.1:8000/car?car_classification=${data["category"]}`;
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setCars(json)
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
    return(
        <div className="car-list">
            <div className="results-len">
                Знайдено: <span className="len">{cars.length} результатів</span>
            </div>
            {cars.map((car, key) =>
                <div className="result-card-cover" key={key}>
                    <div className="result-card car-card">
                        <div className="image-side">
                            <div className="image-content"
                                 style={{backgroundImage: `url("${car.image_url}")`}}>
                            </div>
                            <div className="provider">
                                Постачальник
                                <img src={`${process.env.PUBLIC_URL}/avis.png`} alt="person"/>
                            </div>
                        </div>
                        <div className="content-side">
                            <div className="top-part">
                                <div className="name">
                                    <NavLink end={true} to={{
                                        pathname: `/booking/apartments/${car.id}`
                                    }}>{car.name}</NavLink>
                                </div>
                                <div className="car-category-name">
                                    {car.category}
                                </div>
                                <div className="car-specs">
                                    <div className="capacity">
                                        <img src={`${process.env.PUBLIC_URL}/yellow_person.svg`} alt="person"/>
                                        {car.capacity}
                                    </div>
                                    <div className="doors">
                                        <img src={`${process.env.PUBLIC_URL}/yellow_door.svg`} alt="door"/>
                                        {car.doors}
                                    </div>
                                    {car.ac_included && <div className="ac">
                                        <img src={`${process.env.PUBLIC_URL}/yellow_ac.svg`} alt="ac"/>
                                        Кондиціонер
                                        </div>}
                                    <div className="transmission">
                                        <img src={`${process.env.PUBLIC_URL}/yellow_transmission.svg`} alt="transmission"/>
                                        {car.transmission}
                                    </div>
                                </div>
                            </div>
                            <div className="middle-part">
                                <div className="location-and-mileage">
                                    <div className="car-location">
                                        <div>Локація</div>
                                        <div>
                                            <img src={`${process.env.PUBLIC_URL}/location2.svg`} alt="location"/>
                                            {car.location}
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
                                            {car.insurance.theft &&
                                                <div className="insurance">
                                                    <img src={`${process.env.PUBLIC_URL}/green_checkmark.svg`} alt="ac"/>
                                                    Страхування на випадок крадіжки автомобіля
                                                </div>
                                            }
                                            {car.insurance.road_accident &&
                                                <div className="insurance">
                                                    <img src={`${process.env.PUBLIC_URL}/green_checkmark.svg`} alt="ac"/>
                                                    Страхування на випадок ДТП
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="right-content">
                                        <div className="price">UAH {getTotalPrice(car.price)}</div>
                                        <div
                                            className="duration">Ціна за {getNumberOfDays()} днів
                                        </div>
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
    )
}