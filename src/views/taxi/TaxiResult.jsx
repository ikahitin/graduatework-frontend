import {NavLink, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import '../../styles/taxiresults.css'
import React, {useState} from "react";
import moment from "moment/moment";
import DateRangePicker from "react-bootstrap-daterangepicker";
import ScrollToTop from "../../components/ScrollToTop";
import API from "../../api";

export default function TaxiResult() {
    const navigate = useNavigate();
    const location = useLocation()

    const [searchParams] = useSearchParams();
    const [startAddress, setStartAddress] = useState(searchParams.get("start_address"));
    const [endAddress, setEndAddress] = useState(searchParams.get("end_address"));
    const [reservationDate, setReservationDate] = useState(searchParams.get("date"));
    const [peopleQuantity, setPeopleQuantity] = useState(searchParams.get("people"));
    const [results, setResults] = useState([]);
    const {startLat, startLng, endLat, endLng} = location.state
    const [bookingState, setBookingState] = useState();

    function handleSubmit(e) {
        e.preventDefault()
        const form = e.target;
        const locationObj = {startLocation: {startLat: startLat, startLng: startLng}, endLocation: {endLat: endLat, endLng: endLng}}
        const stateObj = {
            reservationDate: reservationDate,
            startAddress: startAddress,
            endAddress: endAddress,
            locationObj: locationObj,
            appeal: form.appeal.value,
            name: form.first_name.value + " " + form.last_name.value,
            phone: form.phone.value,
            email: form.email.value,
            ...bookingState,
        };
        navigate(`/booking/taxi/search/${form.taxiType.value}/confirmation`, {state: stateObj});
    }

    function handleDateCallback(start, date) {
        setReservationDate(date.format('YYYY-MM-DD'));
    }

    React.useEffect(() => {
        if (location.state !== null) {
            if (location.state.hasOwnProperty('booking')) {
                setBookingState({"booking": location.state.booking})
            }
        }
        const url = `taxi`;

        const fetchData = async () => {
            try {
                const response = await API.get(url, {
                    params: {
                        start_latitude: startLat,
                        start_longitude: startLng,
                        end_latitude: endLat,
                        end_longitude: endLng,
                    }
                });
                const json = await response.data;
                setResults(json)
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData()
    }, [startLat, startLng, endLat, endLng]);

    return (
        <div className="container col-10 search">
            <ScrollToTop/>
            <div className="breadcrumb">
                <NavLink end to="/">Головна</NavLink>
                <NavLink end={true} to="/booking/taxi">Таксі</NavLink>
                <NavLink end={true} to="/booking/taxi/search">Результати пошуку</NavLink>
            </div>
            <div className="container d-flex p-0">
                <div className="filters">
                    <div className="filter">
                        <span className="lookup">Пошук таксі</span>
                        <div className="search-options">
                            <div className="input-block">
                                <span className="input-tip">Місце виїзду</span>
                                <input type="text" className="form-control simple house-icon-dark"
                                       defaultValue={startAddress} required
                                       onChange={e => setStartAddress(e.target.value)}/>
                            </div>
                            <div className="input-block">
                                <span className="input-tip">Місце призначення</span>
                                <input type="text" className="form-control simple house-icon-dark"
                                       defaultValue={endAddress} required
                                       onChange={e => setEndAddress(e.target.value)}/>
                            </div>
                            <div className="input-block">
                                <span className="input-tip">Дата  та час отримання</span>
                                <DateRangePicker
                                    onCallback={handleDateCallback}
                                    initialSettings={{
                                        singleDatePicker: true,
                                        timePicker: true,
                                        timePicker24Hour: true,
                                        startDate: moment(reservationDate).format('DD.MM.YYYY HH:mm'),
                                        locale: {
                                            applyLabel: "Прийняти",
                                            format: 'DD.MM.YYYY HH:mm'
                                        }
                                    }}>
                                    <input type="text" className="form-control simple calendar-icon-dark"
                                           placeholder="Вкажіть дату заїзду" required
                                           onChange={e => handleDateCallback(e.target.value)}/>
                                </DateRangePicker>
                            </div>
                            <div className="input-block">
                                <span className="input-tip">Кількість осіб</span>
                                <input className="form-control simple house-icon-dark"
                                       list="datalistOptionss"
                                       size="1"
                                       defaultValue={peopleQuantity}
                                       onChange={e => setPeopleQuantity(e.target.value)} required/>
                                <datalist id="datalistOptionss">
                                    <option value="1"/>
                                    <option value="2"/>
                                    <option value="3"/>
                                    <option value="5"/>
                                    <option value="6"/>
                                    <option value="7"/>
                                </datalist>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-blue w-100" onClick={handleSubmit}>Знайти</button>
                    </div>
                </div>
                <div className="taxi-results">
                    <div className="car-heading">Оберіть своє таксі</div>
                    {results.length > 0 &&
                        <div className="results">
                            <div className="apartment-additional-info mt-0">
                                <form onSubmit={handleSubmit}>
                                    <div className="taxi-type-radios">
                                        {results.map((taxi, key) =>
                                            <label className="taxi-type-label" key={key}>
                                                <input type="radio" name="taxiType" value={taxi.id}
                                                       defaultChecked={key === 0}/>
                                                <div className="taxi-type-block">
                                                    <div className="taxi-img">
                                                        <img src={taxi.image_url} alt={taxi.type}/>
                                                    </div>
                                                    <div className="type">{taxi.type}</div>
                                                    <div className="taxi-desc">{taxi.description}</div>
                                                    <div className="taxi-capacity">
                                                        <div className="people-capacity">
                                                            <img src={`${process.env.PUBLIC_URL}/yellow_person.svg`}
                                                                 alt="person"/>
                                                            {taxi.capacity}
                                                        </div>
                                                        <div className="luggage-capacity">
                                                            <img src={`${process.env.PUBLIC_URL}/yellow_suitcase.svg`}
                                                                 alt="person"/>
                                                            {taxi.luggage_capacity}
                                                        </div>
                                                    </div>
                                                    <div className="price">UAH {taxi.price_for_ride}</div>
                                                </div>
                                            </label>
                                        )}
                                    </div>
                                    <div className="apartment-form mt-4 pt-3">
                                        <div className="small-heading pb-0">Заповніть ваші дані</div>
                                        <div className="info-text">
                                            <img src={`${process.env.PUBLIC_URL}/yellow-exclamation.svg`} alt=""/>
                                            Введіть вашу дані українською або англійською
                                        </div>
                                        <div className="account-inputs">
                                            <div className="acc-input-row">
                                                <div className="acc-input with-select">
                                                    <div>Звернення</div>
                                                    <div className="selects">
                                                        <select name="appeal" id="appeal"
                                                                className="form-control">
                                                            <option value="пан" defaultValue>Пан</option>
                                                            <option value="пані">Пані</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="acc-input">
                                                    <div>Ім’я</div>
                                                    <input type="text" className="form-control" required
                                                           name="first_name"/>
                                                </div>
                                                <div className="acc-input">
                                                    <div>Прізвище</div>
                                                    <input type="text" className="form-control" required
                                                           name="last_name"/>
                                                </div>
                                            </div>
                                            <div className="acc-input-row">
                                                <div className="acc-input">
                                                    <div>E-mail</div>
                                                    <input type="email" name="email" className="form-control" required/>
                                                </div>
                                                <div className="acc-input">
                                                    <div>Номер телефону</div>
                                                    <input type="phone" name="phone" className="form-control" required/>
                                                </div>
                                            </div>
                                            <div className="acc-input-row pt-1">
                                                <div className="acc-input">
                                                    <div className="sub-text">Підтвердження бронювання буде відправлено
                                                        на цю
                                                        адресу
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="continue-booking">
                                        <button type="submit" className="btn btn-blue">Продовжити бронювання</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
