import React, {useState} from "react";
import {NavLink, useLocation, useSearchParams} from "react-router-dom";
import API from "../api";
import ReactPaginate from "react-paginate";
import {getNumberOfDays} from "../utils/helpers";

export default function CarItems({category, itemsPerPage}) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [cars, setCars] = React.useState([]);
    const [searchParams] = useSearchParams();
    const [startDate] = useState(searchParams.get("start"));
    const [endDate] = useState(searchParams.get("end"));

    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [results, setResults] = useState()
    const location = useLocation()
    const [bookingState, setBookingState] = useState()

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % cars.length;
        window.scrollTo(0, 0);
        setItemOffset(newOffset);
    };

    function getTotalPrice(price) {
        return getNumberOfDays(startDate, endDate) * price
    }

    React.useEffect(() => {
        if (location.state !== null) {
            if (location.state.hasOwnProperty('booking')) {
                setBookingState({"booking": location.state.booking})
            }
        }
        let url = `car?car_classification=${category}`;
        const fetchData = async () => {
            try {
                const response = await API.get(url);
                const json = await response.data;
                setCars(json)
                const endOffset = itemOffset + itemsPerPage;
                setResults(json.slice(itemOffset, endOffset));
                setPageCount(Math.ceil(json.length / itemsPerPage));
                setIsLoading(false)
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, [itemOffset, itemsPerPage]);
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
                ????????????????: <span className="len">{cars.length} ??????????????????????</span>
            </div>
            {results.map((car, key) =>
                <div className="result-card-cover" key={key}>
                    <div className="result-card car-card">
                        <div className="image-side">
                            <div className="image-content"
                                 style={{backgroundImage: `url("${car.image_url}")`}}>
                            </div>
                            <div className="provider">
                                ????????????????????????
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
                                        ??????????????????????
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
                                        <div>??????????????</div>
                                        <div>
                                            <img src={`${process.env.PUBLIC_URL}/location2.svg`} alt="location"/>
                                            {car.location}
                                        </div>
                                    </div>
                                    <div className="car-mileage">
                                        <div>????????????</div>
                                        <div>
                                            <img src={`${process.env.PUBLIC_URL}/speedometer.svg`} alt="speedometer"/>
                                            ?????? ????????????????
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bottom-part">
                                <div className="bottom-content">
                                    <div className="left-content">
                                        <div className="price-addition">
                                            <div className="price-includes">?? ???????? ?????????????? </div>
                                            {car.insurance.theft &&
                                                <div className="insurance">
                                                    <img src={`${process.env.PUBLIC_URL}/green_checkmark.svg`} alt="ac"/>
                                                    ?????????????????????? ???? ?????????????? ???????????????? ????????????????????
                                                </div>
                                            }
                                            {car.insurance.road_accident &&
                                                <div className="insurance">
                                                    <img src={`${process.env.PUBLIC_URL}/green_checkmark.svg`} alt="ac"/>
                                                    ?????????????????????? ???? ?????????????? ??????
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="right-content">
                                        <div className="price">UAH {getTotalPrice(car.price)}</div>
                                        <div
                                            className="duration">???????? ???? {getNumberOfDays(startDate, endDate)} ????????
                                        </div>
                                        <div className="book">
                                            <NavLink to={{
                                                pathname: `/booking/cars/${car.id}/booking`
                                            }} state={{startDate: startDate, endDate: endDate, ...bookingState}}
                                                     className="btn btn-light arrow">??????????????????????</NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                className="pagination"
            />
        </div>
    )
}