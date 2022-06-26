import React, {useRef, useState} from "react";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import '../../daterangepicker.css';
import {useLocation, useNavigate} from "react-router-dom"
import '@lion/input-stepper/define';
import Autocomplete from "react-google-autocomplete";


function TaxiSearchBlock() {
    const navigate = useNavigate();
    const location = useLocation()

    const [startLocation, setStartLocation] = useState([]);
    const [endLocation, setEndLocation] = useState([]);
    const [startAddress, setStartAddress] = useState();
    const [endAddress, setEndAddress] = useState();
    const [reservationDate, setReservationDate] = useState(null);
    const [peopleQuantity, setPeopleQuantity] = useState();
    const dateInput = useRef();


    const [stepStateObj, setStateObj] = useState(null);
    React.useEffect(() => {
        if (location.pathname.match('booking/one-step')){
            setStateObj({booking: [false, false, true, false]})
        }
    }, []);

    const handleApply = (event, picker) => {
        picker.element.find('input:first').val(
            picker.startDate.format('dd, D MMMM, HH:mm')
        );
        setReservationDate(picker.startDate.format('YYYY-MM-DDTHH:mm:ss'));
    };

    function handleFocus(e) {
        if (e.relatedTarget == null) {
            dateInput.current.focus();
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const addresses = `start_address=${startAddress}&end_address=${endAddress}`
        const date = `&date=${reservationDate}`
        const people = `&people=${peopleQuantity}`
        const stateObj = {
            startLat: startLocation[0],
            startLng: startLocation[1],
            endLat: endLocation[0],
            endLng: endLocation[1],
            ...stepStateObj
        };
        navigate(`/booking/taxi/search?${addresses}${date}${people}`, {state : stateObj});
    }

    return (
        <div className="search-block container px-0">
            <form className="row gx-3 gy-2 align-items-center" onSubmit={handleSubmit}>
                <div className="taxi-type-row">
                    <div className="taxi-type">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1"
                               value="option1" checked/>
                        <label className="label" htmlFor="exampleRadios1">
                            Стандартний автомобіль
                        </label>
                    </div>
                    <div className="taxi-type">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2"
                               value="option2"/>
                        <label className="label" htmlFor="exampleRadios2">
                            Представницький автомобіль
                        </label>
                    </div>
                </div>
                <div className="d-flex row gx-3 gy-2 align-items-center">
                    <div className="inputs inputs-search p-0">
                        <div className="col-sm fill-width">
                            <div className="input-group">
                                <Autocomplete
                                    apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                                    onPlaceSelected={(place) => {
                                        const arr = place.formatted_address.split(',');
                                        arr.splice(arr.length - 3, 3);
                                        const address = arr.join(', ');
                                        setEndAddress(address);
                                        setEndLocation([
                                            place.geometry.location.lat(),
                                            place.geometry.location.lng()]);
                                    }}
                                    language="uk"
                                    options={{
                                        types: [],
                                        componentRestrictions: {country: "ua"},
                                    }}
                                    size="1"
                                    placeholder='Місце призначення'
                                    className='form-control step-control with-icon location-icon-gray right-half'
                                />
                                <div className="vertical-line">&nbsp;</div>
                                <Autocomplete
                                    apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                                    onPlaceSelected={(place) => {
                                        const arr = place.formatted_address.split(',');
                                        arr.splice(arr.length - 3, 3);
                                        const address = arr.join(', ');
                                        setStartAddress(address);
                                        setStartLocation([
                                            place.geometry.location.lat(),
                                            place.geometry.location.lng()]);
                                    }}
                                    options={{
                                        types: [],
                                        componentRestrictions: {country: "ua"},
                                    }}
                                    size="1"
                                    placeholder='Місце подачі'
                                    className='form-control step-control with-icon location-icon-gray left-half'
                                />
                                <span className="dots one">···</span>
                            </div>
                        </div>
                        <div className="col-sm">
                            <label className="visually-hidden" htmlFor="defaultValue"/>
                            <div className="input-group">
                                <DateRangePicker
                                    initialSettings={{
                                        autoUpdateInput: false,
                                        singleDatePicker: true,
                                        timePicker: true,
                                        opens: 'center',
                                        timePicker24Hour: true,
                                        locale: {
                                            applyLabel: "Прийняти",
                                            cancelLabel: 'Скасувати',
                                            daysOfWeek: ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
                                            monthNames: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
                                            firstDay: 1
                                        },
                                    }}
                                    onApply={handleApply}>
                                    <div className="input-group">
                                        <input type="text"
                                               className="form-control step-control with-icon calendar-icon"
                                               placeholder="Час отримання" required onBlur={handleFocus}
                                               ref={dateInput}
                                        />
                                        <span className="dots two">···</span>
                                        <span className="dots">···</span>
                                    </div>
                                </DateRangePicker>
                            </div>
                        </div>
                        <div className="col-sm min-width">
                            <div className="input-group">
                                <input className="extra-small form-control step-control with-icon car-icon"
                                       list="datalistOptionss"
                                       placeholder="1" size="1"
                                       onChange={e => setPeopleQuantity(e.target.value)} required/>
                                <span className="dots three">···</span>
                                <span className="dots">···</span>
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
                    </div>
                    <div className="col-auto inputs-search">
                        <button type="submit" className="btn btn-blue">Знайти</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default TaxiSearchBlock;