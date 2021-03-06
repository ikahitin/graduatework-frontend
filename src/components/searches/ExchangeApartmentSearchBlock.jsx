import React, {useRef, useState} from "react";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import '../../daterangepicker.css';
import {useNavigate} from "react-router-dom"
import '@lion/input-stepper/define';
import QuantityInputs from "../QuantityInputs";


function ExchangeApartmentSearchBlock() {
    const navigate = useNavigate();

    const [destination, setDestination] = useState();
    const [proposedCity, setProposedCity] = useState();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const quantityInputRef = useRef(null);
    const detailsInput = useRef(null);
    const [detailQuantity, setDetailQuantity] = useState(['0', '0']);
    const [detailsInputValue, setDetailsInputValue] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    const dateInput = useRef(null);

    const onClick = () => setShowDetails(true)

    const handleApply = (event, picker) => {
        picker.element.find('input:first').val(
            picker.startDate.format('dd, D MMMM') +
            ' - ' +
            picker.endDate.format('ddd, D MMMM')
        );
        setStartDate(picker.startDate.format('YYYY-MM-DD'));
        setEndDate(picker.endDate.format('YYYY-MM-DD'));
    };

    function handleFocus(e) {
        if (e.relatedTarget == null) {
            dateInput.current.focus();
        }
    }

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
            }
            setShowDetails(false);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const locations = `city=${destination}&proposed_city=${proposedCity}`
        const dateRange = `&start=${startDate}&end=${endDate}`
        const details = `&adults=${detailQuantity[0]}&children=${detailQuantity[1]}`
        navigate(`/booking/vacation/search?${locations}${dateRange}${details}`);
    }
    return (
        <div className="search-block container px-0">
            <form className="row gx-3 gy-2 align-items-center" onSubmit={handleSubmit}>
                <div className="inputs inputs-search p-0">
                    <div className="col-sm fill-width">
                        <div className="input-group">
                            <input className="form-control step-control with-icon location-icon-gray right-half"
                                   list="datalistOptions"
                                   placeholder="Бажане місце" size="1"
                                   onChange={e => setDestination(e.target.value)} required/>
                            <div className="vertical-line">&nbsp;</div>
                            <input className="form-control step-control with-icon location-icon-gray left-half"
                                   list="datalistOptions"
                                   placeholder="Запропоноване місце" size="1"
                                   onChange={e => setProposedCity(e.target.value)} required/>
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
                                    opens: 'center',
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
                                    <input type="text" className="form-control step-control with-icon calendar-icon"
                                           placeholder="Запланована дата" required onBlur={handleFocus}
                                           ref={dateInput}
                                    />
                                    <span className="dots two">···</span>
                                    <span className="dots">···</span>
                                </div>
                            </DateRangePicker>
                        </div>
                    </div>
                    <div className="col-sm position-relative">
                        <div className="input-group">
                            <input className="form-control step-control with-icon person-icon"
                                   placeholder="Вкажіть кількість осіб" size="1" required
                                   ref={detailsInput} onBlur={handleDetailsBlur} onClick={onClick}
                                   value={detailsInputValue}/>
                            <span className="dots three">···</span>
                            <span className="dots">···</span>
                        </div>
                        {showDetails ?
                            <QuantityInputs detailQuantity={detailQuantity} ref={quantityInputRef}/>
                            : null}
                    </div>
                </div>
                <div className="col-auto inputs-search">
                    <button type="submit" className="btn btn-blue">Знайти</button>
                </div>
            </form>
        </div>
    )
}

export default ExchangeApartmentSearchBlock;