import React, {useRef, useState} from "react";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import '../../daterangepicker.css';
import {useLocation, useNavigate} from "react-router-dom"
import '@lion/input-stepper/define';


function CarSearchBlock() {
    const navigate = useNavigate();
    const location = useLocation()

    const [destination, setDestination] = useState();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const dateInput = useRef();

    const [stateObj, setStateObj] = useState(null);
    React.useEffect(() => {
        if (location.pathname.match('booking/one-step')){
            setStateObj({booking: [false, true, false, false]})
        }
    }, []);

    const handleApplyStartDate = (event, picker) => {
        picker.element.find('input:first').val(
            picker.startDate.format('dd, D MMMM, HH:mm')
        );
        setStartDate(picker.startDate.format('YYYY-MM-DDTHH:mm:ss'));
    };

    const handleApplyEndDate = (event, picker) => {
        picker.element.find('input:first').val(
            picker.endDate.format('dd, D MMMM, HH:mm')
        );
        setEndDate(picker.endDate.format('YYYY-MM-DDTHH:mm:ss'));
    };

    function handleFocus(e) {
        if (e.relatedTarget == null) {
            dateInput.current.focus();
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const loc = `location=${destination}`
        const dateRange = `&start=${startDate}&end=${endDate}`
        navigate(`/booking/cars/search?${loc}${dateRange}`, {state : stateObj});
    }

    return (
        <div className="search-block container px-0">
            <form className="row gx-3 gy-2 align-items-center" onSubmit={handleSubmit}>
                <div className="inputs inputs-search">
                    <div className="col-sm fill-width">
                        <div className="input-group">
                            <input className="form-control step-control with-icon car-icon" list="datalistOptions"
                                   placeholder="Місце отримання" size="1"
                                   onChange={e => setDestination(e.target.value)} required/>
                            <span className="dots one">···</span>
                            <datalist id="datalistOptions">
                                <option value="Одеса"/>
                                <option value="Славське"/>
                                <option value="Джарилгач"/>
                                <option value="Яремче"/>
                            </datalist>
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
                                onApply={handleApplyStartDate}>
                                <div className="input-group">
                                    <input type="text"
                                           className="form-control step-control with-icon calendar-icon small"
                                           placeholder="Отримання" required onBlur={handleFocus} ref={dateInput}
                                    />
                                    <span className="dots two">···</span>
                                    <span className="dots">···</span>
                                </div>
                            </DateRangePicker>
                        </div>
                    </div>
                    <div className="col-sm">
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
                                onApply={handleApplyEndDate}>
                                <div className="input-group">
                                    <input type="text"
                                           className="form-control step-control with-icon calendar-icon small"
                                           placeholder="Повернення"
                                    />
                                    <span className="dots two">···</span>
                                    <span className="dots">···</span>
                                </div>
                            </DateRangePicker>
                        </div>
                    </div>
                </div>
                <div className="col-auto inputs-search">
                    <button type="submit" className="btn btn-blue">Знайти</button>
                </div>
            </form>
        </div>
    )
}

export default CarSearchBlock;