import DateRangePicker from "react-bootstrap-daterangepicker";
import React, {useRef, useState} from "react";
import '../../styles/taxi.css'
import Email from "../../components/Email";
import Autocomplete from "react-google-autocomplete";
import {useNavigate} from "react-router-dom";

function Taxi() {
    const navigate = useNavigate();

    const [startLocation, setStartLocation] = useState([]);
    const [endLocation, setEndLocation] = useState([]);
    const [startAddress, setStartAddress] = useState();
    const [endAddress, setEndAddress] = useState();
    const [reservationDate, setReservationDate] = useState(null);
    const [peopleQuantity, setPeopleQuantity] = useState();
    const dateInput = useRef();

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
        };
        navigate(`/booking/taxi/search?${addresses}${date}${people}`, {state: stateObj});
    }

    return (
        <div className="container-xxl p-0 c-child">
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
                                            setEndAddress(place.formatted_address);
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
                                        apiKey="AIzaSyDmSC4qZInakAyKd1UqdrbZlu0qg8RGzSw"
                                        onPlaceSelected={(place) => {
                                            setStartAddress(place.formatted_address);
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
            <div className="flow">
                <div className="heading">Як це відбувається?</div>
                <img src={`${process.env.PUBLIC_URL}/flow.svg`} alt="flow"/>
            </div>
            <div className="faq container">
                <div className="heading">Часто задавані питання</div>
                <div className="faq-content col-10">
                    <div className="questions">
                        <div className="questions-number">
                            01 - 03
                        </div>
                        <div className="accordion accordion-flush" id="accordionFlushExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingOne">
                                    <button className="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#flush-collapseOne"
                                            aria-expanded="false" aria-controls="flush-collapseOne">
                                        Що входить у вартість?
                                    </button>
                                </h2>
                                <div id="flush-collapseOne" className="accordion-collapse collapse"
                                     aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        До неї включені всі податки та збори, у тому числі плата за користування
                                        платними ділянками дороги та чайові
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingTwo">
                                    <button className="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo"
                                            aria-expanded="false" aria-controls="flush-collapseTwo">
                                        Як проводитися оплата?
                                    </button>
                                </h2>
                                <div id="flush-collapseTwo" className="accordion-collapse collapse"
                                     aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        Оплата таксі відбувається при оформленні онлайн бронювання. Це означає, що
                                        поїздка підтверджена заздалегідь, і вам не потрібно турбуватися про
                                        непередбачені обставини або зняття готівки після прильоту.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingThree">
                                    <button className="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#flush-collapseThree"
                                            aria-expanded="false" aria-controls="flush-collapseThree">
                                        Чи можу я скасувати замовлення?
                                    </button>
                                </h2>
                                <div id="flush-collapseThree" className="accordion-collapse collapse"
                                     aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        Так. Бронювання можна скасувати безкоштовно до 24 годин до запланованого часу
                                        подачі автомобіля. Деякі наші партнери встановлюють короткі терміни
                                        безкоштовного скасування
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="faq-images">
                        <img src={`${process.env.PUBLIC_URL}/taxi_faq.png`} alt=""/>
                    </div>
                </div>
            </div>
            <Email/>
        </div>
    )
}

export default Taxi;