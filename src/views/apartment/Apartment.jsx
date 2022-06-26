import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import React, {useState} from "react";
import SimpleSlider from "../../components/Slider";
import '../../daterangepicker.css';
import Email from "../../components/Email";
import '@lion/input-stepper/define';
import ApartmentSearchBlock from "../../components/searches/ApartmentSearchBlock";


function Apartment() {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <div className="container p-0 c-child">
            <ApartmentSearchBlock/>
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
                        <a href="src/views/apartment/Apartment">
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
                            <a href="src/views/apartment/Apartment">
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
                            <a href="src/views/apartment/Apartment">
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
                            <a href="src/views/apartment/Apartment">
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
                            <a href="src/views/apartment/Apartment">
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
                        <a href="src/views/apartment/Apartment">
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
                </div>
            </div>
            <Email/>
        </div>
    );
}

export default Apartment;