import DateRangePicker from "react-bootstrap-daterangepicker";
import React, {useRef, useState} from "react";
import '../styles/taxi.css'
import Email from "../components/Email";

function Taxi() {
    const [destination, setDestination] = useState();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const dateInput = useRef();

    const handleApply = (event, picker) => {
        console.log(picker)
        picker.element.find('input:first').val(
            picker.startDate.format('dd, D MMMM, HH:mm')
        );
        setStartDate(picker.startDate.format('dd, D MMMM, HH:mm'));
    };

    function handleFocus(e) {
        if (e.relatedTarget == null) {
            dateInput.current.focus();
        }
    }

    return (
        <div className="container-xxl p-0 c-child">
            <div className="search-block container px-0">
                <form className="row gx-3 gy-2 align-items-center">
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
                                <input className="form-control step-control with-icon location-icon-gray right-half" list="datalistOptions"
                                       placeholder="Місце подачі" size="1"
                                       onChange={e => setDestination(e.target.value)} required/>
                                <div className="vertical-line">&nbsp;</div>
                                <input className="form-control step-control with-icon location-icon-gray left-half" list="datalistOptions"
                                       placeholder="Місце призначення" size="1"
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
                                    onApply={handleApply}>
                                    <div className="input-group">
                                        <input type="text" className="form-control step-control with-icon calendar-icon"
                                               placeholder="Час отримання" required onBlur={handleFocus} ref={dateInput}
                                        />
                                        <span className="dots two">···</span>
                                        <span className="dots">···</span>
                                    </div>
                                </DateRangePicker>
                            </div>
                        </div>
                        <div className="col-sm min-width">
                            <div className="input-group">
                                <input className="extra-small form-control step-control with-icon car-icon" list="datalistOptionss"
                                       placeholder="1" size="1"
                                       onChange={e => setDestination(e.target.value)} required/>
                                <span className="dots three">···</span>
                                <span className="dots">···</span>
                                <datalist id="datalistOptionss">
                                    <option value="1"/>
                                    <option value="2"/>
                                    <option value="3"/>
                                    <option value="4"/>
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
                                        До неї включені всі податки та збори, у тому числі плата за користування платними ділянками дороги та чайові
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
                                        Оплата таксі відбувається при оформленні онлайн бронювання. Це означає, що поїздка підтверджена заздалегідь, і вам не потрібно турбуватися про непередбачені обставини або зняття готівки після прильоту.
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
                                        Так. Бронювання можна скасувати безкоштовно до 24 годин до запланованого часу подачі автомобіля. Деякі наші партнери встановлюють короткі терміни безкоштовного скасування
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