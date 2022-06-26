import DateRangePicker from "react-bootstrap-daterangepicker";
import React, {useRef, useState} from "react";
import '../../styles/taxi.css'
import Email from "../../components/Email";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import SimpleSlider from "../../components/Slider";
import QuantityInputs from "../../components/QuantityInputs";
import {useNavigate} from "react-router-dom";
import ExchangeApartmentSearchBlock from "../../components/searches/ExchangeApartmentSearchBlock";

function ExchangeVacation() {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <div className="container-xxl p-0 c-child">
            <ExchangeApartmentSearchBlock/>
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