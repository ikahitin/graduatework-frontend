import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import React, {useRef, useState} from "react";
import SimpleSlider from "../components/Slider";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import '../daterangepicker.css';
import {useNavigate} from "react-router-dom"
import Email from "../components/Email";
import '@lion/input-stepper/define';
import localization from 'moment/locale/uk'
import QuantityInputs from "../components/QuantityInputs";
import Header from "../components/Header";


function Apartment() {
    const navigate = useNavigate();

    const [detailQuantity, setDetailQuantity] = useState(['0', '0', '0']);
    const [detailsInputValue, setDetailsInputValue] = React.useState('')
    const [showResults, setShowResults] = React.useState(false)
    const [tabIndex, setTabIndex] = useState(0);
    const [destination, setDestination] = useState();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const quantityInputRef = useRef(null);
    const detailsInput = useRef(null);
    const dateInput = useRef(null);

    const onClick = () => setShowResults(true)

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
                const inputString = `${inputValues[0]} дорослих - ${inputValues[1]} дитина - ${inputValues[2]} номер`;
                setDetailsInputValue(inputString);
            }
            setShowResults(false);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const dest = `destination=${destination}`
        const dateRange = `&start=${startDate}&end=${endDate}`
        const details = `&adults=${detailQuantity[0]}&children=${detailQuantity[1]}&rooms=${detailQuantity[2]}`
        navigate(`/booking/apartments/search?${dest}${dateRange}${details}`);
    }

    return (
        <div className="container p-0 c-child">
            <div className="search-block">
                <form className="row gx-3 gy-2 align-items-center" onSubmit={handleSubmit}>
                    <div className="inputs inputs-search">
                        <div className="col-sm">
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
                                            monthNames: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
                                            firstDay: 1
                                        },
                                    }}
                                    onApply={handleApply}>
                                    <div className="input-group">
                                        <input type="text" className="form-control step-control with-icon calendar-icon"
                                               placeholder="Оберіть заплановану дату" required readOnly ref={dateInput}
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
                                       placeholder="Вкажіть кількість осіб" size="1" required readOnly
                                       ref={detailsInput} onBlur={handleDetailsBlur} onClick={onClick}
                                       value={detailsInputValue}/>
                                <span className="dots three">···</span>
                                <span className="dots">···</span>
                            </div>
                            {showResults ?
                                <QuantityInputs detailQuantity={detailQuantity} ref={quantityInputRef}/> : null}
                        </div>
                    </div>
                    <div className="col-auto inputs-search">
                        <button type="submit" className="btn btn-blue">Знайти</button>
                    </div>
                </form>
            </div>
            <div className="ideas">
                <span className="heading">Ідеї для вашої подорожі</span>
                <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)} forceRenderTabPanel={true}>
                    <TabList className="nav nav-pills">
                        <Tab className="nav-item">
                            <button className="nav-link" aria-current="page">
                                <span>Всі</span>
                            </button>
                        </Tab>
                        <Tab className="nav-item">
                            <button className="nav-item nav-link">
                                <span>Популярні</span>
                            </button>
                        </Tab>
                        <Tab className="nav-item">
                            <button className="nav-link">
                                <span>Регіони</span>
                            </button>
                        </Tab>
                        <Tab className="nav-item">
                            <button className="nav-link">
                                <span>Міста</span>
                            </button>
                        </Tab>
                    </TabList>
                    <TabPanel>
                        <SimpleSlider/>
                    </TabPanel>
                    <TabPanel>
                        <SimpleSlider order={"desc"}/>
                    </TabPanel>
                    <TabPanel>
                        <SimpleSlider location_type={"area"}/>
                    </TabPanel>
                    <TabPanel>
                        <SimpleSlider location_type={"city"}/>
                    </TabPanel>
                </Tabs>
            </div>
            <div className="random">
                <span className="heading">Випробуй долю</span>
                <p className="subheading">Наш генератор сам запропонує місце для відпочинку</p>
                <button className="random-button">
                    <img src={`${process.env.PUBLIC_URL}/ion_dice.svg`} alt="dice"/>
                </button>
                <div className="point"><img src={`${process.env.PUBLIC_URL}/Vector.svg`} alt=""/></div>
                <p className="subheading">Клікни на кубик</p>
                <div className="container random-slider slider">
                    <div className="card-cover third-layer">
                        <a href="">
                            <div className="card">
                                <div className="rating">
                                    <img src={`${process.env.PUBLIC_URL}/star.svg`} alt="star" className="star"/>
                                    <span>4.9</span>
                                </div>
                                <div className="card-img-top" style={{backgroundImage: `url("/118317.jpeg")`}}/>
                                <div className="card-body">
                                    <div className="location-icon"/>
                                    <div className="text-part">
                                        <p className="city">Одеса</p>
                                        <p className="region">Одеська область</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="slider-center-block">
                        <div className="card-cover second-layer left">
                            <a href="">
                                <div className="card">
                                    <div className="rating">
                                        <img src={`${process.env.PUBLIC_URL}/star.svg`} alt="star" className="star"/>
                                        <span>4.1</span>
                                    </div>
                                    <div className="card-img-top" style={{backgroundImage: `url("/truskavets.png")`}}/>
                                    <div className="card-body">
                                        <div className="location-icon"/>
                                        <div className="text-part">
                                            <p className="city">Трускавець</p>
                                            <p className="region">Львівська область</p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="card-cover second-layer right">
                            <a href="">
                                <div className="card">
                                    <div className="rating">
                                        <img src={`${process.env.PUBLIC_URL}/star.svg`} alt="star" className="star"/>
                                        <span>4.5</span>
                                    </div>
                                    <div className="card-img-top" style={{backgroundImage: `url("/dzh.png")`}}/>
                                    <div className="card-body">
                                        <div className="location-icon"/>
                                        <div className="text-part">
                                            <p className="city">Джарилгач</p>
                                            <p className="region">Херсонська область</p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="card-cover middle">
                            <a href="">
                                <div className="card">
                                    <div className="rating">
                                        <img src={`${process.env.PUBLIC_URL}/star.svg`} alt="star" className="star"/>
                                        <span>4.2</span>
                                    </div>
                                    <div className="card-img-top" style={{backgroundImage: `url("/slavske.png")`}}/>
                                    <div className="card-body">
                                        <div className="location-icon"/>
                                        <div className="text-part">
                                            <p className="city">Славське</p>
                                            <p className="region">Львівська область</p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="card-cover middle">
                            <a href="">
                                <div className="card">
                                    <div className="rating">
                                        <img src={`${process.env.PUBLIC_URL}/star.svg`} alt="star" className="star"/>
                                        <span>4.5</span>
                                    </div>
                                    <div className="card-img-top" style={{backgroundImage: `url("/sinevir.png")`}}/>
                                    <div className="card-body">
                                        <div className="location-icon"/>
                                        <div className="text-part">
                                            <p className="city">Синевір</p>
                                            <p className="region">Закарпатська область</p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="card-cover third-layer">
                        <a href="">
                            <div className="card">
                                <div className="rating">
                                    <img src={"./star.svg"} alt="star" className="star"/>
                                    <span>4.9</span>
                                </div>
                                <div className="card-img-top" style={{backgroundImage: `url("/118317.jpeg")`}}/>
                                <div className="card-body">
                                    <div className="location-icon"/>
                                    <div className="text-part">
                                        <p className="city">Одеса</p>
                                        <p className="region">Одеська область</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <Email/>
        </div>
    );
}

export default Apartment;