import {NavLink, useNavigate, useSearchParams} from "react-router-dom";
import '../../styles/carresults.css'
import React, {useState} from "react";
import moment from "moment/moment";
import Filters from "../../components/Filters";
import DateRangePicker from "react-bootstrap-daterangepicker";
import ScrollToTop from "../../components/ScrollToTop";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import CarList from "../../components/CarList";
import Email from "../../components/Email";

export default function CarResult() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [carCategory, setCarCategory] = useState(0);

    const [location, setLocation] = useState(searchParams.get("location"));
    const [startDate, setStartDate] = useState(searchParams.get("start"));
    const [endDate, setEndDate] = useState(searchParams.get("end"));

    function handleStartCallback(start, end, label) {
        setStartDate(start.format('YYYY-MM-DD'));
    }

    function handleEndCallback(start, end, label) {
        setEndDate(end.format('YYYY-MM-DD'));
    }

    function handleSubmit(e) {
        e.preventDefault();
        // const dest = `destination=${destination}`
        // const dateRange = `&start=${startDate}&end=${endDate}`
        // const details = `&adults=${adults}&children=${children}&rooms=${rooms}`
        // navigate(`/booking/apartments/search?${dest}${dateRange}${details}`);
        window.location.reload(false);
    }

    return (
        <div className="container col-10 search">
            <ScrollToTop />
            <div className="breadcrumb">
                <NavLink end to="/">Головна</NavLink>
                <NavLink end={true} to="/booking/cars">Оренда автомобіля</NavLink>
                <NavLink end={true} to="/booking/cars/search">Результати пошуку</NavLink>
            </div>
            <div className="container d-flex p-0">
                <div className="filters">
                    <div className="filter">
                        <span className="lookup">Пошук автомобілів</span>
                        <div className="search-options">
                            <div className="input-block">
                                <span className="input-tip">Місце</span>
                                <input type="text" className="form-control simple location-icon-dark" defaultValue={location}
                                       list="datalistOptions" onChange={e => setLocation(e.target.value)}/>
                                <datalist id="datalistOptions">
                                    <option value="Одеса"/>
                                    <option value="Славське"/>
                                    <option value="Джарилгач"/>
                                    <option value="Яремче"/>
                                </datalist>
                            </div>
                            <div className="input-block">
                                <span className="input-tip">Дата та час отримання</span>
                                <DateRangePicker onCallback={handleStartCallback}
                                                 initialSettings={{
                                                     singleDatePicker: true,
                                                     timePicker: true,
                                                     timePicker24Hour: true,
                                                     startDate: moment(startDate).format('DD.MM.YYYY'),
                                                     locale: {
                                                         applyLabel: "Прийняти",
                                                         format: 'DD.MM.YYYY HH:mm'
                                                     }
                                                 }}>
                                    <input type="text" className="form-control simple calendar-icon-dark" placeholder="Вкажіть дату заїзду" onChange={e => setStartDate(e.target.value)}/>
                                </DateRangePicker>
                            </div>
                            <div className="input-block">
                                <span className="input-tip">Дата та час повернення</span>
                                <DateRangePicker
                                    onCallback={handleEndCallback}
                                    initialSettings={{
                                        singleDatePicker: true,
                                        timePicker: true,
                                        timePicker24Hour: true,
                                        startDate: moment(endDate).format('DD.MM.YYYY'),
                                        locale: {
                                            applyLabel: "Прийняти",
                                            format: 'DD.MM.YYYY HH:mm'
                                        }
                                    }}>
                                    <input type="text" className="form-control simple calendar-icon-dark" placeholder="Вкажіть дату виїзду"/>
                                </DateRangePicker>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-blue w-100" onClick={handleSubmit}>Знайти</button>
                    </div>
                    <Filters/>
                </div>
                <div className="car-results">
                    <div className="car-heading">Оберіть потрібну класифікацію</div>
                    <Tabs selectedIndex={carCategory} onSelect={category => setCarCategory(category)}>
                        <TabList>
                            <Tab>
                                <div className="car-category">
                                    <img src={`${process.env.PUBLIC_URL}/small_cars.png`} alt="" className="category-image"/>
                                    <span>Малолітражні автомобілі</span>
                                </div>
                            </Tab>
                            <Tab>
                                <div className="car-category">
                                    <img src={`${process.env.PUBLIC_URL}/middle_class.png`} alt="" className="category-image"/>
                                    <span>Автомобілі середнього класу</span>
                                </div>
                            </Tab>
                            <Tab>
                                <div className="car-category">
                                    <img src={`${process.env.PUBLIC_URL}/big_cars.png`} alt="" className="category-image"/>
                                    <span>Багатомісні автомобілі</span>
                                </div>
                            </Tab>
                            <Tab>
                                <div className="car-category">
                                    <img src={`${process.env.PUBLIC_URL}/universal.png`} alt="" className="category-image"/>
                                    <span>Універсали</span>
                                </div>
                            </Tab>
                            <Tab>
                                <div className="shadow"/>
                                <div className="car-category">
                                    <img src={`${process.env.PUBLIC_URL}/premium.png`} alt="" className="category-image"/>
                                    <span>Автомобілі преміум класу</span>
                                </div>
                            </Tab>
                            <Tab>
                                <div className="car-category">
                                    <img src={`${process.env.PUBLIC_URL}/suvs.png`} alt="" className="category-image"/>
                                    <span>Позашляховики</span>
                                </div>
                            </Tab>
                        </TabList>
                        <TabPanel>
                            <CarList category={"small_car"}/>
                        </TabPanel>
                        <TabPanel>
                            a
                        </TabPanel>
                        <TabPanel>
                            c
                        </TabPanel>
                        <TabPanel>
                            v
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
            <Email/>
        </div>
    )
}