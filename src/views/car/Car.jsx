import DateRangePicker from "react-bootstrap-daterangepicker";
import React, {useRef, useState} from "react";
import '../../styles/car.css'
import Slider from "react-slick";
import Email from "../../components/Email";
import {useNavigate} from "react-router-dom";

function Car() {
    const navigate = useNavigate();

    const [destination, setDestination] = useState();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const dateInput = useRef();

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
        navigate(`/booking/cars/search?${loc}${dateRange}`);
    }

    const sliderSettings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        cssEase: "linear",
        className: "slider"
    }

    return (
        <div className="container-xxl p-0 c-child">
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
            <div className="popular-companies container">
                <span className="heading">Популярні прокатні компанії</span>
                <Slider {...sliderSettings}>
                    <div className="company-card">
                        <div className="company-image-cover">
                            <img src={`${process.env.PUBLIC_URL}/company1.png`} alt="" className="company-image"/>
                        </div>
                    </div>
                    <div className="company-card">
                        <div className="company-image-cover">
                            <img src={`${process.env.PUBLIC_URL}/company2.png`} alt="" className="company-image"/>
                        </div>
                    </div>
                    <div className="company-card">
                        <div className="company-image-cover">
                            <img src={`${process.env.PUBLIC_URL}/company3.png`} alt="" className="company-image"/>
                        </div>
                    </div>
                    <div className="company-card">
                        <div className="company-image-cover">
                            <img src={`${process.env.PUBLIC_URL}/company4.png`} alt="" className="company-image"/>
                        </div>
                    </div>
                    <div className="company-card">
                        <div className="company-image-cover">
                            <img src={`${process.env.PUBLIC_URL}/company1.png`} alt="" className="company-image"/>
                        </div>
                    </div>
                </Slider>
            </div>
            <div className="car-service-features">
                <div className="features-list">
                    <div className="features container">
                        <div className="feature d-flex">
                            <img src={`${process.env.PUBLIC_URL}/support.svg`} alt="support"/>
                            <div className="f-txt">
                                <p className="f-text mb-0">Цілодобова служба підтримки</p>
                                <p className="sub-f-text mb-0">Цілодобова служба підтримки</p>
                            </div>
                        </div>
                        <div className="feature d-flex">
                            <img src={`${process.env.PUBLIC_URL}/checkmark.svg`} alt="checkmark"/>
                            <div className="f-txt">
                                <p className="f-text mb-0">Безкоштовне скасування</p>
                                <p className="sub-f-text mb-0">Діє для більшості автомобілів</p>
                            </div>
                        </div>
                        <div className="feature d-flex">
                            <img src={`${process.env.PUBLIC_URL}/reviews.svg`} alt="review"/>
                            <div className="f-txt">
                                <p className="f-text mb-0">Більше 1,5 млн відгуків</p>
                                <p className="sub-f-text mb-0">Перевірені відгуки реальних клієнтів</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="faq container">
                <div className="heading">Часто задавані питання</div>
                <div className="faq-content col-10">
                    <div className="questions">
                        <div className="questions-number">
                            01 - 05
                        </div>
                        <div className="accordion accordion-flush" id="accordionFlushExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingOne">
                                    <button className="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#flush-collapseOne"
                                            aria-expanded="false" aria-controls="flush-collapseOne">
                                        Що требе мати для того, щоб орендувати автомобіль?
                                    </button>
                                </h2>
                                <div id="flush-collapseOne" className="accordion-collapse collapse"
                                     aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        <p>При бронюванні автомобіля вам знадобиться лише кредитна або дебетова
                                            картка.</p>
                                        <p>У пункті прокату вам знадобляться такі документи:</p>
                                        Паспорт.<br/>
                                        Ваучер.<br/>
                                        Посвідчення водія для кожного з водіїв.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingTwo">
                                    <button className="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo"
                                            aria-expanded="false" aria-controls="flush-collapseTwo">
                                        З якого віку можна брати автомобіль в оренду?
                                    </button>
                                </h2>
                                <div id="flush-collapseTwo" className="accordion-collapse collapse"
                                     aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">Більшість прокатних компаній дає автомобілі в оренду
                                        водіям від 21 року (а іноді й молодше). Якщо вам менше 25 років, можливо,
                                        доведеться сплатити збір за молодого водія.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingThree">
                                    <button className="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#flush-collapseThree"
                                            aria-expanded="false" aria-controls="flush-collapseThree">
                                        Чи можу я орендувати автомобіль для іншої людини?
                                    </button>
                                </h2>
                                <div id="flush-collapseThree" className="accordion-collapse collapse"
                                     aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">Звісно. Просто введіть дані іншої людини під час
                                        бронювання в розділі «Інформація про водія».
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingFour">
                                    <button className="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#flush-collapseFour"
                                            aria-expanded="false" aria-controls="flush-collapseFour">
                                        Які є поради для вибору автомобіля?
                                    </button>
                                </h2>
                                <div id="flush-collapseFour" className="accordion-collapse collapse"
                                     aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">Дізнайтесь, що думають інші. На нашому сайті багато
                                        відгуків та оцінок, так що ви зможете дізнатися, що сподобалося та не
                                        сподобалося клієнтам різних прокатних компаній.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingFive">
                                    <button className="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#flush-collapseFive"
                                            aria-expanded="false" aria-controls="flush-collapseFive">
                                        Чи все включено у вартість оренди??
                                    </button>
                                </h2>
                                <div id="flush-collapseFive" className="accordion-collapse collapse"
                                     aria-labelledby="flush-headingFive" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">У вартість, яку ви бачите, входить автомобіль,
                                        обов'язкові страхові покриття (наприклад, Покриття на випадок ДТП та пошкоджень
                                        (CDW) та Покриття на випадок угону) та можливі збори, які зазвичай оплачуються
                                        при отриманні автомобіля (такі як збір за оренду в один бік) , аеропортовий збір
                                        та місцеві податки).
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="faq-images">
                        <img src={`${process.env.PUBLIC_URL}/car_img.png`} alt=""/>
                    </div>
                </div>
            </div>
            <Email/>
        </div>
    )
}

export default Car;