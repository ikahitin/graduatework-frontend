import React, {useRef, useState} from "react";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import '../../daterangepicker.css';
import {useLocation, useNavigate} from "react-router-dom"
import '@lion/input-stepper/define';
import QuantityInputs from "../../components/QuantityInputs";


function ApartmentSearchBlock() {
    const navigate = useNavigate();

    const [detailQuantity, setDetailQuantity] = useState(['0', '0']);
    const [detailsInputValue, setDetailsInputValue] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [destination, setDestination] = useState();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const quantityInputRef = useRef(null);
    const detailsInput = useRef(null);
    const dateInput = useRef(null);
    const location = useLocation()

    const [stateObj, setStateObj] = useState(null);
    React.useEffect(() => {
        if (location.pathname.match('booking/one-step')){
            setStateObj({booking: [true, false, false, false]})
        }
    }, []);

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
        const dest = `destination=${destination}`
        const dateRange = `&start=${startDate}&end=${endDate}`
        const details = `&adults=${detailQuantity[0]}&children=${detailQuantity[1]}`
        navigate(`/booking/apartments/search?${dest}${dateRange}${details}`, {state : stateObj});
    }

    return (
        <div className="search-block">
            <form className="row gx-3 gy-2 align-items-center" onSubmit={handleSubmit}>
                <div className="inputs inputs-search">
                    <div className="col-sm min-width medium">
                        <div className="input-group">
                            <input className="form-control step-control with-icon house-icon" list="datalistOptions"
                                   placeholder="Куди бажаєте поїхати?" size="1"
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
                                    locale: {
                                        applyLabel: "Прийняти",
                                        cancelLabel: 'Скасувати',
                                        daysOfWeek: ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
                                        monthNames: ['Січень',
                                                    'Лютий',
                                                    'Березень',
                                                    'Квітень',
                                                    'Травень',
                                                    'Червень',
                                                    'Липень',
                                                    'Серпень',
                                                    'Вересень',
                                                    'Жовтень',
                                                    'Листопад',
                                                    'Грудень'],
                                        firstDay: 1
                                    },
                                }}
                                onApply={handleApply}>
                                <div className="input-group">
                                    <input type="text" className="form-control step-control with-icon calendar-icon"
                                           placeholder="Оберіть заплановану дату" required ref={dateInput}
                                           onBlur={handleFocus}/>
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

export default ApartmentSearchBlock;