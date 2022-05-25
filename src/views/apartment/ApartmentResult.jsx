import {NavLink, useNavigate, useSearchParams} from "react-router-dom";
import '../../styles/apartmentresults.css'
import React, {useRef, useState} from "react";
import moment from "moment/moment";
import Filters from "../../components/Filters";
import DateRangePicker from "react-bootstrap-daterangepicker";
import ScrollToTop from "../../components/ScrollToTop";
import Email from "../../components/Email";
import API from "../../api";
import ReactPaginate from 'react-paginate';
import ApartmentItems from "../../components/ApartmentItems";
import QuantityInputs from "../../components/QuantityInputs";

export default function ApartmentResult({itemsPerPage}) {
    const navigate = useNavigate();

    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [items, setItems] = useState(null);

    const [searchParams] = useSearchParams();
    const quantityInputRef = useRef(null);
    const detailsInput = useRef(null);
    const [showResults, setShowResults] = useState(false)
    const [destination, setDestination] = useState(searchParams.get("destination"));
    const [startDate, setStartDate] = useState(searchParams.get("start"));
    const [endDate, setEndDate] = useState(searchParams.get("end"));
    const [adults, setAdults] = useState(searchParams.get("adults"));
    const [children, setChildren] = useState(searchParams.get("children"));
    const [results, setResults] = useState([]);
    const [detailsInputValue, setDetailsInputValue] = useState(`${adults} дорослих, ${children} дітей`)
    const [detailQuantity, setDetailQuantity] = useState([adults, children]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        window.scrollTo(0, 0);
        setItemOffset(newOffset);
    };

    function handleSubmit(e) {
        e.preventDefault();
        const dest = `destination=${destination}`
        const dateRange = `&start=${startDate}&end=${endDate}`
        const details = `&adults=${adults}&children=${children}`
        navigate(`/booking/apartments/search?${dest}${dateRange}${details}`);
        window.location.reload(false);
    }

    function handleStartCallback(date) {
        setStartDate(date.format('YYYY-MM-DD'));
    }

    function handleEndCallback(start, date) {
        setEndDate(date.format('YYYY-MM-DD'));
    }

    const onClick = () => setShowResults(true)

    function handleDetailsBlur(e) {
        if (e.relatedTarget !== null) {
            detailsInput.current.focus();
        } else {
            const isZero = (currentValue) => currentValue === '0';
            const inputValues = Object.values(quantityInputRef.current.getValues());
            setDetailQuantity(inputValues)
            if (inputValues.every(isZero)) {
                setDetailsInputValue('');
            } else {
                const inputString = `${inputValues[0]} дорослих - ${inputValues[1]} дитина`;
                setDetailsInputValue(inputString);
                setAdults(inputValues[0]);
                setChildren(inputValues[1])
            }
            setShowResults(false);
        }
    }

    React.useEffect(() => {
        const city = `city=${destination}`
        const dates = `start=${startDate}&end=${moment(endDate).format('YYYY-MM-DD')}`
        const details = `adults=${adults}&children=${children}`
        const url = `apartment?${city}&${dates}&${details}`;

        const fetchData = async () => {
            try {
                const response = await API.get(url);
                const json = await response.data;
                setItems(json)
                const endOffset = itemOffset + itemsPerPage;
                setResults(json.slice(itemOffset, endOffset));
                setPageCount(Math.ceil(json.length / itemsPerPage));
                console.log(json)
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData()


    }, [itemOffset, itemsPerPage]);

    return (
        <div className="container col-10 search">
            <ScrollToTop/>
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
                                <input type="text" className="form-control simple house-icon-dark"
                                       defaultValue={destination} required
                                       list="datalistOptions" onChange={e => setDestination(e.target.value)}/>
                                <datalist id="datalistOptions">
                                    <option value="Одеса"/>
                                    <option value="Славське"/>
                                    <option value="Джарилгач"/>
                                    <option value="Яремче"/>
                                </datalist>
                            </div>
                            <div className="input-block">
                                <span className="input-tip">Дата заїзду</span>
                                <DateRangePicker onCallback={handleStartCallback}
                                                 initialSettings={{
                                                     singleDatePicker: true,
                                                     startDate: moment(startDate).format('DD.MM.YYYY'),
                                                     locale: {
                                                         applyLabel: "Прийняти",
                                                         format: 'DD.MM.YYYY'
                                                     }
                                                 }}>
                                    <input type="text" className="form-control simple calendar-icon-dark"
                                           placeholder="Вкажіть дату заїзду" required
                                           onChange={e => setStartDate(e.target.value)}/>
                                </DateRangePicker>
                            </div>
                            <div className="input-block">
                                <span className="input-tip">Дата виїзду</span>
                                <DateRangePicker
                                    onCallback={handleEndCallback}
                                    initialSettings={{
                                        singleDatePicker: true,
                                        startDate: moment(endDate).format('DD.MM.YYYY'),
                                        locale: {
                                            applyLabel: "Прийняти",
                                            format: 'DD.MM.YYYY'
                                        }
                                    }}>
                                    <input type="text" className="form-control simple calendar-icon-dark"
                                           placeholder="Вкажіть дату виїзду" required/>
                                </DateRangePicker>
                            </div>
                            <div className="input-block">
                                <span className="input-tip">Кількість людей</span>
                                <input type="text" className="form-control simple person-icon-dark"
                                       placeholder="Вкажіть кількість осіб" size="1" required
                                       ref={detailsInput} onBlur={handleDetailsBlur} onClick={onClick}
                                       value={detailsInputValue}/>
                            </div>
                            {showResults ?
                                <QuantityInputs detailQuantity={detailQuantity} ref={quantityInputRef}/>
                                : null}
                        </div>
                        <button type="submit" className="btn btn-blue w-100" onClick={handleSubmit}>Знайти</button>
                    </div>
                    <Filters type={"apartment"}/>
                </div>
                {results.length > 0 &&
                    <div className="results">
                        <div className="results-len">
                            Знайдено: <span className="len">{items.length} результатів</span>
                        </div>
                        <div className="result-cards">
                            <ApartmentItems currentItems={results} startDate={startDate} endDate={endDate}
                                            adults={adults}/>
                        </div>
                    </div>
                }
            </div>
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
            <Email/>
        </div>
    )
}
