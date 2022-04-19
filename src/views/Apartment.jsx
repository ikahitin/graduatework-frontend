import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import React, {useState} from "react";
import SimpleSlider from "../components/Slider";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import '../daterangepicker.css';
import {useNavigate} from "react-router-dom"
import Email from "../components/Email";

function Apartment() {
    const [tabIndex, setTabIndex] = useState(0);
    const [destination, setDestination] = useState();
    const [dateRange, setDateRange] = useState();
    const navigate = useNavigate();

    const handleApply = (event, picker) => {
        picker.element.val(
            picker.startDate.format('MM/DD/YYYY') +
            ' - ' +
            picker.endDate.format('MM/DD/YYYY')
        );
        setDateRange(picker.startDate.format('MM/DD/YYYY'))
    };

    function handleClick() {
        navigate(`/apartments/results?destination=${destination}&daterange=${dateRange}`);
    }

    return (
        <div className="container p-0">
            <div className="search-block">
                <form className="row gx-3 gy-2 align-items-center">
                    <div className="inputs">
                        <div className="step one"/>
                        <div className="col-sm">
                            <div className="input-group">
                                <div className="nav-icon house-gray"/>
                                <input className="form-control no-icon" list="datalistOptions" id="exampleDataList"
                                       placeholder="Куди бажаєте поїхати?" size="1"
                                       onChange={e => setDestination(e.target.value)}/>
                                <datalist id="datalistOptions">
                                    <option value="Одеса"/>
                                    <option value="Славське"/>
                                    <option value="Джарилгач"/>
                                    <option value="Яремче"/>
                                </datalist>
                            </div>
                        </div>
                        <div className="step two"/>
                        <div className="col-sm">
                            <label className="visually-hidden" htmlFor="defaultValue"/>
                            <div className="input-group">
                                <div className="nav-icon event-gray rs-picker-toggle-caret rs-icon"/>
                                <DateRangePicker
                                    initialSettings={{
                                        autoUpdateInput: false,
                                        format: 'ddd DD MMMM',
                                        locale: {
                                            applyLabel: "Прийняти",
                                            cancelLabel: 'Скасувати',
                                            format: 'DD/MM/YY',
                                            fromLabel: "Fromm",
                                            daysOfWeek: ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
                                            monthNames: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
                                            firstDay: 1
                                        },
                                    }}
                                    onApply={handleApply}>
                                    <input type="text" className="form-control"
                                           defaultValue="Оберіть заплановану дату"/>
                                </DateRangePicker>
                            </div>
                        </div>
                        <div className="step three"/>
                        <div className="col-sm">
                            <div className="input-group">
                                <div className="nav-icon person-gray"/>
                                <label className="visually-hidden" htmlFor="specificSizeSelect">Preference</label>
                                <select className="form-select" id="specificSizeSelect">
                                    <option defaultValue>Вкажіть кількість осіб</option>
                                    <option value="1">2 дорослих - без дітей - 1 номер</option>
                                    <option value="2">2 дорослих - 2 дітей - 1 номер</option>
                                    <option value="3">2 дорослих - 2 дітей - 2 номери</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-blue" onClick={handleClick}>Знайти</button>
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
                    <img src={"./ion_dice.svg"} alt=""/>
                </button>
                <div className="point"><img src={"./Vector.svg"} alt=""/></div>
                <p className="subheading">Клікни на кубик</p>
                <div className="container random-slider slider">
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
                    <div className="slider-center-block">
                        <div className="card-cover second-layer left">
                            <a href="">
                                <div className="card">
                                    <div className="rating">
                                        <img src={"./star.svg"} alt="star" className="star"/>
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
                                        <img src={"./star.svg"} alt="star" className="star"/>
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
                                        <img src={"./star.svg"} alt="star" className="star"/>
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
                                        <img src={"./star.svg"} alt="star" className="star"/>
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