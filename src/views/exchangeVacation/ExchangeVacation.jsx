import DateRangePicker from "react-bootstrap-daterangepicker";
import React, {useRef, useState} from "react";
import '../../styles/taxi.css'
import Email from "../../components/Email";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import SimpleSlider from "../../components/Slider";

function ExchangeVacation() {
    const [destination, setDestination] = useState();
    const [tabIndex, setTabIndex] = useState(0);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const dateInput = useRef();

    const handleApply = (event, picker) => {
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
                                               placeholder="Запланована дата" required onBlur={handleFocus}
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
                                <input className="form-control step-control with-icon car-icon" list="datalistOptionss"
                                       placeholder="Кількість осіб" size="1"
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
            <div className="flow">
                <div className="heading">Як це відбувається?</div>
                <img src={`${process.env.PUBLIC_URL}/flow2.svg`} alt="flow"/>
            </div>
            <Email/>
        </div>
    )
}

export default ExchangeVacation;