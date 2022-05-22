import {NavLink} from "react-router-dom";
import '../../styles/profile.css'
import React, {useState} from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import TripPanel from "../../components/trips/TripPanel";

export default function Trips() {
    const [tabIndex, setTabIndex] = useState(0);
    return (
        <div className="container col-10 search trips">
            <div className="heading fw-600">Інформація про ваші бронювання</div>
            <div className="trip-types">
                <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                    <TabList className="tablist">
                        <div className="nav nav-pills">
                            <Tab className="nav-item">
                                <button className="nav-link" aria-current="page">
                                    <span>Діючі подорожі</span>
                                </button>
                            </Tab>
                            <Tab className="nav-item">
                                <button className="nav-item nav-link">
                                    <span>Заплановані подорожі</span>
                                </button>
                            </Tab>
                        </div>
                        <NavLink to="chat" className="chat-link">
                            <img src={`${process.env.PUBLIC_URL}/chat.svg`} alt="chat"/>
                            Чат
                        </NavLink>
                    </TabList>
                    <TabPanel>
                        <TripPanel status={"active"}/>
                    </TabPanel>
                    <TabPanel>
                        <TripPanel status={"planned"}/>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    )
}