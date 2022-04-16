import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import React, {useState} from "react";
import SimpleSlider from "./Slider";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import '../daterangepicker.css';

function Apartment() {
    const [tabIndexx, setTabIndexx] = useState(0);
    const handleApply = (event, picker) => {
        picker.element.val(
            picker.startDate.format('MM/DD/YYYY') +
            ' - ' +
            picker.endDate.format('MM/DD/YYYY')
        );
    };

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
                                       placeholder="Куди бажаєте поїхати?" size="1"/>
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
                            <label className="visually-hidden" htmlFor="defaultValue">Username</label>
                            <div className="input-group">
                                <div className="nav-icon event-gray rs-picker-toggle-caret rs-icon"/>
                                {/*<input type="text" className="form-control" id="specificSizeInputGroupUsername"*/}
                                {/*       placeholder="Дата" value="чт, 10 березня - пн, 14 березня"/>*/}
                                <DateRangePicker
                                    initialSettings={{
                                        autoUpdateInput: false,
                                        format: 'ddd DD MMMM',
                                        locale: {
                                            applyLabel: "Прийняти",
                                            cancelLabel: 'Скасувати',
                                            // format: 'MM/dd/yyyy',
                                            format: 'DD/MM/YY',
                                            fromLabel: "Fromm",
                                            daysOfWeek: ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
                                            monthNames: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
                                            //monthNames: moment.months(),
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
                        <button type="submit" className="btn btn-blue">Знайти</button>
                    </div>
                </form>
            </div>
            <div className="ideas">
                <span className="heading">Ідеї для вашої подорожі</span>
                <Tabs selectedIndex={tabIndexx} onSelect={index => setTabIndexx(index)}>
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
                        <div className="container-md">
                            <SimpleSlider/>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="container-md">
                            <SimpleSlider/>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="container-md">
                            <SimpleSlider/>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="container-md">
                            <SimpleSlider/>
                        </div>
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
                    {/*<div className="card-cover col-3" key="1">*/}
                    {/*    <div className="card">*/}
                    {/*        <img src={"./mariupol.png"} className="card-img-top" alt="..."/>*/}
                    {/*        <div className="card-body">*/}
                    {/*            <div className="location-icon"/>*/}
                    {/*            <div className="text-part">*/}
                    {/*                <p className="city">Маріуполь</p><br/>*/}
                    {/*                <p className="region">Донецька область</p>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className="card-cover col-3" key="2">*/}
                    {/*    <div className="card">*/}
                    {/*        <img src={"./truskavets.png"} className="card-img-top" alt="..."/>*/}
                    {/*        <div className="card-body">*/}
                    {/*            <div className="location-icon"/>*/}
                    {/*            <div className="text-part">*/}
                    {/*                <p className="city">Трускавець</p>*/}
                    {/*                <p className="region">Львівська область</p>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                </div>
            </div>
            <div className="email">
                <span className="heading">Збережіть ваш час!</span>
                <p className="subheading">Підпишіться, і ми надішлемо вам найкращі пропозиції</p>
                <div className="email-block">
                    <img src={"./email-bg.svg"} alt="email-background" className="email-background"/>
                    <form action="" className="email-form">
                        <div className="input-group">
                            <div className="nav-icon email-gray"/>
                            <input type="text" className="form-control" id="emailSubscription"
                                   placeholder="Ваш e-mail"/>
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-blue">Підписатися</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Apartment;